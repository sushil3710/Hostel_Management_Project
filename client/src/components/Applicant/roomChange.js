import React from "react";
import PersonalInfo from "./PersonalInfo";
import CommunicationDetails from "./CommunicationDetails";
import DashboardNavBar from "./DashboardNavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../images/default-profile-picture.svg";

export default function Profile() {

    
  return (
    <>
      <DashboardNavBar currentFlag={2} />

    </>
  );
}
