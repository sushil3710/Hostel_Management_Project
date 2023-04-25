import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SignIn";
import Otp from "./Otp";
import { setUserSession } from "./Sessions";
import { setAdminType } from "../Admin/AdminTypes";
import { useNavigate, Link } from "react-router-dom";

function SignInStartPage() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [msg_signin, setMsgSignin] = useState(
    "Enter Email and Password"
  );
  const [colorEmail, setColorEmail] = useState(0);
  const [colorPass, setColorPass] = useState(0);
   const [isLoadingEmail, setIsLoadingEmail] = useState(false);


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePass = (e) => {
    setPass(e.target.value);
  };


  const handleSubmit = () => {
    console.log("handleSubmit called");
   setIsLoadingEmail(true);
    axios
      .post("/auth/signin/verify", {
        email: email,
        password: pass
      }) 
      .then((response) => {
        setIsLoadingEmail(false);
        if (response.data.result === 1) {
          setUserSession(response.data.token);
          navigate("/home");
        } else if (
          response.data.result === 4 ||
          response.data.result === 5 ||
          response.data.result === 3
        ) {
          setUserSession(response.data.token);
          setAdminType(response.data.admin_type);
          navigate("/admin/profile");
        } else if (response.data.result === 2) {
          setMsgSignin("Email not registered, Sign-Up first.");
          setColorEmail(1);
          setColorPass(1);
          setIsLoadingEmail(false);
         }
         else {
          setMsgSignin("Incorrect Password");
          setColorPass(1);
          setIsLoadingEmail(false);
        }
        }
      );
  };

  return (
    <div className="pt-28 sm:pt-2 bg-gray-100">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center w-4/5 mx-auto sm:w-3/5 md:w-3/5">
        <div className="relative sm:max-w-md w-full">
          {/* <div className="flex absolute justify-center items-center content-center bg-gradient-to-br from-[#6F8BD6] to-[#1E3A8A]   shadow-md hover:shadow-lg h-48 w-48 -left-24 -top-24 rounded-full fill-current text-white">
            <span className="relative -top-4 -left-4 font-josefin-sans text-2xl font-extrabold ">
              Log In
            </span>
          </div> */}
          <div className="card bg-[#000000] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-[#6F8BD6] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="p-16 relative w-full rounded-3xl bg-white shadow-md">
            <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
              Welcome to IIT Ropar
            </label>

            <p className="text-center mt-2 text-sm text-gray-500">
              Please sign-in to submit your applications for admission.
            </p>

            <div className="mt-5">
              <div>
                {(
                  <SignIn
                    onClick={handleSubmit}
                    updateEmail={updateEmail}
                    updatePassword={updatePass}
                    msg={msg_signin}
                    colorChange={colorEmail} 
                    isLoading={isLoadingEmail}
                  />
                )}

              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="mt-7">
              <div className="flex justify-center items-center">
                  {/* <label className="mr-2">Do not have an account? </label> */}
                  <Link
                    to="/forgot-password"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Forgot Password
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <label className="mr-2">Do not have an account? </label>
                  <Link
                    to="/sign-up"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Sign-up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInStartPage;
