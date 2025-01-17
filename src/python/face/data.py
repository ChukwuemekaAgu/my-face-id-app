from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from deepface import DeepFace 
import os
import base64
import uuid
import cv2
import json
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)

BASE_DIR = "faces"
CASCADE_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

def save_image(base64_image, user_id, filename):
    user_dir = os.path.join(BASE_DIR, user_id)
    os.makedirs(user_dir, exist_ok=True)
    image_path = os.path.join(user_dir, filename)

    image_data = base64.b64decode(base64_image.split(",")[1])
    with open(image_path, "wb") as f:
        f.write(image_data)

    return image_path

def validate_face(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return len(faces) > 0

def add_user_details(user_id, username, password):
        user_metadata_path = os.path.join(BASE_DIR, "user.json")
        os.makedirs(BASE_DIR, exist_ok=True)

        all_users = { }

        if os.path.exists(user_metadata_path):
            with open(user_metadata_path, "r") as f:
                try:
                    all_users = json.load(f)
                except json.JSONDecodeError:
                    pass

        all_users[user_id] = {"user_id": user_id, "username": username, "password": password}

        with open(user_metadata_path, "w") as f:
            json.dump(all_users, f, indent=4)

        print(f"User {username} with ID {user_id} added successfully!")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    face_image = data.get('faceImage')

    if not username or not password or not face_image:
        return jsonify({"message": "Invalid input"}), 400
    
    user_id = str(uuid.uuid4())
    user_dir = os.path.join(BASE_DIR, user_id)
    os.makedirs(user_dir, exist_ok=True)
    image_path = save_image(face_image, user_id, "registration.jpg")

    if not validate_face(image_path):
        os.remove(image_path)
        return jsonify({"message": "No face detected. Please try again."}), 400
    
    add_user_details(user_id, username, password)

    return jsonify({"message": "Registration successful!", "userId": user_id}), 200

@app.route('/', methods=['POST'])
def signin():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"message": "Username and password are required."}), 400
    
    user_metadata_path = os.path.join(BASE_DIR, "user.json")


    if not os.path.exists(user_metadata_path):
        return jsonify({"message": "No users found. Please sign up first."}), 404


    with open(user_metadata_path, "r") as f:
        try:
            all_users = json.load(f)
        except json.JSONDecodeError:
            return jsonify({"message": "Error reading user data."}), 500

 
    user = next((u for u in all_users.values() if u["username"] == username), None)

    if not user:
        return jsonify({"message": "User not found."}), 404

  
    if user["password"] != password:
        return jsonify({"message": "Incorrect password."}), 401

    return jsonify({"message": "Authentication successful.", "isAuthenticated": True}), 200

@app.route('/faceauth', methods=['POST'])
def face_auth():
    data = request.json
    username = data.get('username')
    face_image = data.get('faceImage')

    if not username or not face_image:
        return jsonify({"message": "Invalid input for face authentication."}), 400

  
    user_metadata_path = os.path.join(BASE_DIR, "user.json")
    if not os.path.exists(user_metadata_path):
        return jsonify({"message": "No users found. Please sign up first."}), 404

    try:
        with open(user_metadata_path, "r") as f:
            all_users = json.load(f)
    except json.JSONDecodeError:
        return jsonify({"message": "Error reading user data."}), 500


    user = next((u for u in all_users.values() if u["username"] == username), None)
    if not user:
        return jsonify({"message": "User not found for face authentication."}), 404

    user_id = user["user_id"]
    user_dir = os.path.join(BASE_DIR, user_id)
    registered_image_path = os.path.join(user_dir, "registration.jpg")

    if not os.path.exists(registered_image_path):
        return jsonify({"message": "Registered face not found. Please sign up again."}), 404

    signin_image_path = os.path.join(user_dir, "signin_temp.jpg")
    image_data = base64.b64decode(face_image.split(",")[1])
    with open(signin_image_path, "wb") as f:
        f.write(image_data)


    if not validate_face(signin_image_path):
        os.remove(signin_image_path)
        return jsonify({"message": "No face detected in the provided image. Please try again."}), 400

    try:
        
        result = DeepFace.verify(
            img1_path=signin_image_path,
            img2_path=registered_image_path,
            model_name="Facenet",
            enforce_detection=True
        )

        if result["verified"]:
            return jsonify({"message": "Face authentication successful!", "isAuthenticated": True}), 200
        else:
            return jsonify({"message": "Face authentication failed."}), 401

    except Exception as e:
        return jsonify({"message": f"Error during face verification: {str(e)}"}), 500
    finally:
        if os.path.exists(signin_image_path):
            os.remove(signin_image_path)
 
if __name__ == '__main__':
    app.run(port=5000, debug=True)
