import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./components/SignIn_SignUp/Sessions";
import Logout from "./components/SignIn_SignUp/Logout";
import HomePage from "./components/Landing/HomePage";
import ContactUs from "./components/Landing/ContactUs";
import FAQs from "./components/Landing/FAQs";
import Error from "./components/Landing/Error";
import WithHeaderFooter from "./components/Landing/WithHeaderFooter";
import Profile from "./components/Applicant/Profile";
import SignUpStartPage from "./components/SignIn_SignUp/SignUpStartPage";
import SignInStartPage from "./components/SignIn_SignUp/SignInStartPage";
import ForgotPasswordPage from "./components/SignIn_SignUp/ForgotPasswordPage";
import ApplicantHomePage from "./components/Applicant/ApplicantHomePage";
import Info from "./components/Landing/Info";

// Admin
import ManageAdmins from "./components/Admin/ManageAdmins";
import WithNavbarAndSidebar from "./components/Admin/WithNavbarAndSidebar";
import AdminProfile from "./components/Admin/AdminProfile";

function App() {
  // Pages that can only be accessed if you are logged in
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = getToken();

    if (isAuthenticated) {
      return children;
    }

    return <Navigate to="error" />;
  };

  // Login page can only be accessed if you are logged out
  const SpecialRoute = ({ children }) => {
    const isAuthenticated = getToken();

    if (isAuthenticated) {
      return <Navigate to="/home" />;
    }

    return children;
  };

  return (
    <BrowserRouter className="font-cereal-font">
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <ApplicantHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
       
        <Route element={<WithNavbarAndSidebar />}>
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/admin/manage-admins/"
            element={
              <PrivateRoute>
                <ManageAdmins />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<WithHeaderFooter />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/faqs" element={<FAQs />}></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route
            path="/sign-in"
            element={
              <SpecialRoute>
                <SignInStartPage />
              </SpecialRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <SpecialRoute>
                <SignUpStartPage />
              </SpecialRoute>
            }
          />
                    <Route
            path="/forgot-password"
            element={
              <SpecialRoute>
                <ForgotPasswordPage />
              </SpecialRoute>
            }
          />
          <Route path="/*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
