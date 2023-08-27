import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({element: Component, isLoggedIn, ...props }) {
  return (isLoggedIn ? 
    <Component {...props}/>
  : 
    <Navigate to="/signin" replace />
  );
  
}

// export default function ProtectedRoute({isEmail, isLoggedIn, ...props }) {
//   return ( isLoggedIn ? 
//     <>
//       <Header isEmail={isEmail}></Header>
//       <Main name="main" {...props} />
//     </>
//       : 
//     <Navigate to="/sign-in" replace />
//   )
// }



