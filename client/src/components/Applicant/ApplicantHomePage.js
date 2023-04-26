import DashboardNavBar from "./DashboardNavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import noDataPic from "../../images/no-data.svg";
import screenSpinner from "../../images/2300-spinner.gif";

export default function ApplicantHomePage() {
  

  // useEffect(() => {
  //   axios
  //     .get("/get-open-positions", {
  //       headers: {
  //         Authorization: getToken(),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data === 1) {
  //         navigate("/logout");
  //       } else {
  //         setApplications(response.data);
  //         setIsFetching(false);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);



  // useEffect(() => {
  //   axios
  //     .get("/get-applications", {
  //       headers: {
  //         Authorization: getToken(),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data === 1) {
  //         navigate("/logout");
  //       } else {
  //         setApps(response.data);
  //         setIsFetching(false);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, [navigate]);



  // useEffect(() => {
  //   axios
  //     .get("/get-profile-info", {
  //       headers: {
  //         Authorization: getToken(),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data === 1) {
  //         navigate("/logout");
  //       } else {
  //         if (
  //           response.data.full_name &&
  //           response.data.communication_address &&
  //           response.data.board_10th
  //         ) {
  //           setProfileComplete(3);
  //         } else {
  //           setProfileComplete(1);
  //         }
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);



  return (
    <>
      <DashboardNavBar currentFlag={1} />
    </>
  );
}
