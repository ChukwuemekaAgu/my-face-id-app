// src/routes/routes.tsx

import React from "react";
import { SignIn } from "../pages/SignIn/index";
import { FaceAuth } from "../pages/FaceAuth";
import { FaceRegister } from "../pages/FaceRegister";
import { SignUp } from "../pages/SignUp/Index";
import { Dashboard } from "../pages/Dashboard";

interface RouteComponent {
    path: string,
    element: any
}

// import { SignIn, FaceAuth, FaceRegister, SignUp, Dashboard } from 

export const SignInPage:RouteComponent = {
    path:"/", element: <SignIn/>
}

export const FaceAuthPage:RouteComponent = {
    path:"/faceauth", element: <FaceAuth/>
}

export const FaceRegisterPage:RouteComponent = {
    path:"/faceregister", element: <FaceRegister/>
}

export const SignUpPage:RouteComponent = {
   path:"/signup", element:<SignUp />
}

export const DashboardPage:RouteComponent = {
    path:"/dashboard", element:<Dashboard />
 }