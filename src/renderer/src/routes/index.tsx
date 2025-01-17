import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaceAuthPage, FaceRegisterPage, SignInPage, SignUpPage, DashboardPage } from "../routes/routes";


// export { SignUpPage } from './routes';
// export { FaceAuthPage } from './routes';

export const MainApp = ()=>{
    return (
   
        <Router>
          <Routes>
            <Route path={SignInPage.path} element={SignInPage.element} />
            <Route path={FaceAuthPage.path} element={FaceAuthPage.element} />
            <Route path={FaceRegisterPage.path} element={FaceRegisterPage.element} />
            <Route path={SignUpPage.path} element={SignUpPage.element} />
            <Route path={DashboardPage.path} element={DashboardPage.element} />
          </Routes>
        </Router>
    )
}