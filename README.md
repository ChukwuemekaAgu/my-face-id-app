**Face Recognition App with React, Electron Forge, Vite, and TypeScript**

**Overview**
This project is a Face Recognition Desktop App designed to authenticate users securely using facial recognition. 
Built with React, Electron Forge, Vite, and TypeScript, the app combines modern web technologies and AI to create a seamless user experience.

**What It Does**
**1. Sign-Up (Face Registration)**
    Users enter their username and password on the sign-up page and click "Next."
    This takes them to the Face Registration Page, where their face is captured using a webcam.
    The app then saves the username, password, and facial data to a local JSON file for future use.

**2. Sign-In (Face Authentication)**
    Users enter their username and password on the sign-in page and click "Next."
    They are taken to the Face Authentication Page, where the app captures their face with a webcam.
    The captured face is compared with the stored face data.
    If the details match, the user is granted access to the Dashboard.
  
**3. Dashboard**
    The dashboard serves as the main interface that users can access after successful authentication.
  
**Features**
  **User-Friendly Registration:** Easy-to-use sign-up page where users register their details and face data.
  **Secure Authentication:** Combines traditional username/password validation with AI-powered facial recognition.
  **Webcam Integration:** Enables face capturing directly from the app.
  **AI-Powered Matching:** Ensures high accuracy in comparing stored face data with new images.
  **Local Data Storage:** Stores user credentials and facial data securely in a JSON file.

**Tech Stack**
  **React:** Builds the user interface.
  **Electron Forge:** Packages the app as a cross-platform desktop application.
  **Vite:** Speeds up the development and build processes.
  **TypeScript:** Ensures type safety and cleaner code.
  **JSON Storage:** Saves user details locally for authentication.

**How It Works**
**Sign-Up Workflow**
1. Enter your **username** and **password** on the sign-up page.
2. Click "Next" to go to the face registration page.
3. The app captures your face using a webcam and saves it alongside your username and password.

**Sign-In Workflow**
1. Enter your username and password on the sign-in page.
2. Click "Next" to go to the face authentication page.
3. The app captures your face using a webcam and compares it with your registered face.
4. If the match is successful, you are redirected to the dashboard.

**Getting Started**
1. Clone the Repository
   git clone https://github.com/ChukwuemekaAgu/my-face-id-app.git
   cd my-face-id-app
   
2. Install Dependencies
   npm install

3. Run the App
   npm start

4. Build the App
   npm run build

5. Package the App
   Use Electron Forge to package the app:
   npm run make

**Future Improvements**
  Support for cloud-based storage to enable data backup and multi-device access.
  Advanced AI models for faster and more accurate face recognition.
  Enhanced security features, including multi-factor authentication (MFA).

**License**
  This project is licensed under the MIT License. Feel free to use it in your own projects.
