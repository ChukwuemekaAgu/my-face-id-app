// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { SignIn } from './src/pages/SignIn/index';
// import { SignUp } from './src/pages/SignUp/Index';
// const App: React.FC = () => {
//   return (
//     <Router>
//         <Routes>
//             <Route path="/" element={<Navigate to="/sign-in" />} />
//             <Route path="/sign-in" element={<SignIn />} />
//             <Route path="/sign-up" element={<SignUp />} />
//         </Routes>
//     </Router>
    // <div style={{ textAlign: 'center', marginTop: '50px' }}>
    //   <h1>Welcome to React + Electron + Vite + TypeScript</h1>
    //   <p>Edit this component to start building your app!</p>
    // </div>
//   );
// };

// export default App;
import React from "react";
import { MainApp } from "./src/routes/index";

const App: React.FC = () => {
  return <MainApp />;
};

export default App;
