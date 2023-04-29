import React, { useState, useEffect } from "react";
import ProfileSettingsImage from "../../images/Asset 7.svg";
import ProfileSettingsImageMobile from "../../images/admin-profile.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import screenSpinner from "../../images/2300-spinner.gif";
import spinner from "../../images/SpinnerWhite.gif";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import HostelIcon from '@mui/icons-material/Apartment';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import DashboardNavBar from "./DashboardNavBar";

export default function StudentHomepage() {
  const [profile, setProfile] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/get-user-info", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setProfile(response.data);
          setProfileName(response.data.name);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DashboardNavBar currentFlag={1} />
      {isFetching ? (
        <img
          className="mx-auto my-40 h-[200px] w-[200px]"
          alt="Spinner"
          src={screenSpinner}
        />
      ) : (
        <div className="max-w-4xl flex items-center h-auto my-28 flex-wrap mx-auto">
          {/*Main Col*/}
          <div
            id="profile"
            className="w-full lg:w-1/2 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              {/* Image for mobile view*/}
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${ProfileSettingsImageMobile})`,
                }}
              />
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                  {profile.full_name}
                </h1>
              </div>


              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />


              <p className="pt-4 text-base  flex items-center justify-center lg:justify-start">
                <EmailIcon
                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />{" "}
                {profile.email_id}
              </p>



              <p className="pt-4 text-base flex items-center justify-center lg:justify-start">
                <WorkIcon
                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />{" "}
                {profile.entry_numb}
              </p>
              <p className="pt-4 text-base  flex items-center justify-center lg:justify-start">
                <HostelIcon
                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />{" "}
                {profile.hostel_name}
              </p>

              <p className="pt-4 text-base  flex items-center justify-center lg:justify-start">
                <RoomPreferencesIcon

                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />{" "}
                {profile.room_numb}
              </p>

            </div>
          </div>
          {/*Img Col*/}
          <div className="w-full lg:w-2/5">
            {/* Big profile image for side bar (desktop) */}
            <img
              src={
                profile.profile_image_url
                  ? profile.profile_image_url
                  : ProfileSettingsImage
              }
              // src={ProfileSettingsImage}

              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt="Spinner"
            style={{ width: "600px", height: "350px" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
