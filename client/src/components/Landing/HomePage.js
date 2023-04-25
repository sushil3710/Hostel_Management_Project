import React, { useState, useEffect } from "react";
import iit_ropar_pic from "../../images/iit-ropar.jpg";
import pic from "../../images/iit-ropar-logo.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";

function HomePage() {

  // useEffect(() => {
  //   Axios.get("/get-cycle-duration")
  //     .then((response) => {
  //       if (response.data === 1) {
  //         setIsCyclePresent(false);
  //       } else {
  //         setCycleDuration(response.data);
  //         setIsCyclePresent(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="w-full">
      <div className=" flex bg-white" style={{ height: "690px" }}>
        <div className="flex-auto items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2 sm:pt-8">
          <div>
            <div className="flex items-center justify-center">
              <img
                alt="iit-ropar-logo"
                className="h-86 w-48 xl:ml-10 xl:mb-5"
                src={pic}
              />
            </div>
            <h1 className="text-center text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline  leading-normal">IIT Ropar</span>{" "}
              <br />
              <span
                style={{ fontSize: 45 }}
                className="block text-black xl:inline font-bold tracking-normal"
              >
                {" "}
                Hostel Management Portal
              </span>
            </h1>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/sign-in"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-black md:py-4 md:text-lg md:px-10"
                >
                  Log-in
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/sign-up"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-black md:py-4 md:text-lg md:px-10"
                >
                  Sign-up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block lg:w-3/5">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={iit_ropar_pic}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
