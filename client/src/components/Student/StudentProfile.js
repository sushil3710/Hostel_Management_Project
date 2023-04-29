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
  const navigate = useNavigate();
  
  const [profileInfo, setProfileInfo] = useState(0);
  const [localProfileInfo, setLocalProfileInfo] = useState(0);

  function emptyFile(key) {
    let copy = { ...localProfileInfo };
    assign(copy, key, null);
    setLocalProfileInfo(copy);
  }

  function syncLocalGlobalData() {
    let copy = { ...profileInfo };
    setLocalProfileInfo(copy);
  }

  function assign(obj, prop, value) {
    if (typeof prop === "string") prop = prop.split(".");

    if (prop.length > 1) {
      var e = prop.shift();
      assign(
        (obj[e] =
          Object.prototype.toString.call(obj[e]) === "[object Object]"
            ? obj[e]
            : {}),
        prop,
        value
      );
    } else obj[prop[0]] = value;
  }

  useEffect(() => {
    axios
      .get("/get-profile-info", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          let copy = { ...response.data };

          for (const key in copy) {
            if (copy[key] === null || copy[key] === "null") {
              copy[key] = "";
            }
          }

          let copy2 = { ...response.data };
          for (const key in copy2) {
            if (copy2[key] === null || copy2[key] === "null") {
              copy2[key] = "";
            }
          }

          let copy3 = { ...response.data };
          for (const key in copy3) {
            if (copy3[key] === null || copy3[key] === "null") {
              copy3[key] = "";
            }
          }

          setProfileInfo(copy);
          setLocalProfileInfo(copy2);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLocalChange = (event, key) => {
    let copy = { ...localProfileInfo };
    assign(copy, key, event.target.value);
    setLocalProfileInfo(copy);
  };


  const onChangeNationality = (val) => {
    let copy = { ...localProfileInfo };
    assign(copy, "nationality", val);
    setLocalProfileInfo(copy);
  };

  return (
    <>
      <DashboardNavBar currentFlag={6} />
      <div className="flex">
        <div className="flex-2 my-20 mx-20 block">
          <img
            className="ring-2 h-40 w-40 ring-gray-700 rounded-full border border-black"
            src={
              profileInfo.profile_image_url
                ? profileInfo.profile_image_url
                : DefaultProfilePicture
            }
            alt="Profile"
          />
        </div>

        <div className="mr-20 mt-4 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex space-x-3 px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Details
            </h3>

            <PersonalInfo
              onChangeNationality={onChangeNationality}
              localProfileInfo={localProfileInfo}
              onChange={handleLocalChange}
              emptyFile={emptyFile}
              syncLocalGlobalData={syncLocalGlobalData}
            />

            <div
              id="tooltip-animation"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
            >
              Edit Details
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div className="border-t border-gray-300">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.full_name
                    ? profileInfo.full_name
                    : "Your Full Name"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">
                  Father's Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.fathers_name
                    ? profileInfo.fathers_name
                    : "Your Father's Name"}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.date_of_birth
                    ? profileInfo.date_of_birth
                    : "Your Date of Birth"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.gender ? profileInfo.gender : "Your Gender"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Nationality
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.nationality
                    ? profileInfo.nationality
                    : "Your Nationality"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.category
                    ? profileInfo.category
                    : "Your Category"}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Aadhaar Card Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.aadhar_card_number
                    ? profileInfo.aadhar_card_number
                    : "Your Aadhar Card Number"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Belongs to PWD
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.is_pwd ? profileInfo.is_pwd : "Your PWD Status"}
                </dd>
              </div>

            </dl>
          </div>
        </div>
      </div>

      <div className="flex my-10 mx-20">
        <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex space-x-3 px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Communication Details
            </h3>

            <CommunicationDetails
              localProfileInfo={localProfileInfo}
              onChange={handleLocalChange}
              syncLocalGlobalData={syncLocalGlobalData}
            />
          </div>
          <div className="border-t border-gray-300">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Address for communication
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.communication_address
                    ? profileInfo.communication_address
                    : "Your Communication Address"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.communication_city
                    ? profileInfo.communication_city
                    : "Your City"}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.communication_state
                    ? profileInfo.communication_state
                    : "Your State"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.communication_pincode
                    ? profileInfo.communication_pincode
                    : "Your Pincode"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Permanent Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.permanent_address
                    ? profileInfo.permanent_address
                    : "Your Permanent Address"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.permanent_city
                    ? profileInfo.permanent_city
                    : "Your City"}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.permanent_state
                    ? profileInfo.permanent_state
                    : "Your State"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.permanent_pincode
                    ? profileInfo.permanent_pincode
                    : "Your Pincode"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.email_id
                    ? profileInfo.email_id
                    : "Your Email ID"}
                </dd>

                <dt className="text-sm font-medium text-gray-500">
                  Mobile Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profileInfo.mobile_number
                    ? profileInfo.mobile_number
                    : "Your Mobile Number"}
                </dd>
              </div>

              {profileInfo.alternate_mobile_number && (
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Alternate Mobile Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profileInfo.alternate_mobile_number
                      ? profileInfo.alternate_mobile_number
                      : "Your Mobile Number"}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
