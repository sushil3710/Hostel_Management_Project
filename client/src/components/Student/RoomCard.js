import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";

function RoomCard({
  id,
  email_id,
  prevRoom,
  reqRoom,
  reason,
  comment,
  admin_comment,
  phone,
  isexchange,
  exchange_id,
  request_status,
  reqDate,
}) {
  const [show, setShow] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [url, setUrl] = useState("User name");
  const [name, setName] = useState("User name");

  useEffect(() => {
    axios
      .get("/get-user-info", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data === 1) {
        } else {
          setUrl(response.data.profile_image_url);
          setName(response.data.full_name);
        }
      });
  });

  return (
    <div class="p-10">
      <div class=" w-full lg:max-w-full lg:flex">
        {/* <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          title="Mountain"
        ></div> */}
        <div class=" border-b border-l border-r border-gray-400  lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal my-2">
          <div class="mb-8">
            {request_status === "pending" ? (
              <>
                <h1 class="text-sm text-red-600 flex items-center">
                  {request_status.toUpperCase()}
                  <span style={{ marginLeft: "0.5rem" }}></span>
                  <h1>(No reply from admin yet)</h1>
                </h1>
              </>
            ) : (
              <>
                {request_status === "accept" ? (
                  <>
                    <h1
                      style={{ bondWeight: "1000" }}
                      class="text-sm text-green-600 flex items-center"
                    >
                      {request_status.toUpperCase()} 🙂
                      <span style={{ marginLeft: "1.5rem" }}></span>
                      <i style={{ textDecoration: "italic" }}>
                        Message from admin : {admin_comment}
                      </i>
                    </h1>
                  </>
                ) : (
                  <>
                    <h1
                      style={{ bondWeight: "1000" }}
                      class="text-sm text-red-600 flex items-center"
                    >
                      {request_status.toUpperCase()} 🥲
                      <span style={{ marginLeft: "1.5rem" }}></span>
                      <i style={{ textDecoration: "italic" }}>
                        Message from admin : {admin_comment}
                      </i>
                    </h1>
                  </>
                )}
              </>
            )}

            <div class="text-gray-900 font-bold text-xl mb-2">
              Room change request From {prevRoom} to {reqRoom}
            </div>
            {show ? (
              <>
                <button
                  style={{ fontSize: "small", textDecoration: "underline" }}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Hide
                </button>

                <div class="relative overflow-x-auto shadow-md ">
                  <table class="items-center w-full bg-transparent border-collapse">
                    <tbody class = "divide-y divide-gray-100">
                      <tr class="text-gray-500 border-b border-gray-100">
                        <td
                          scope="row"
                          class="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-2"
                        >
                          Reason for room change
                        </td>
                        <td class="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-2">{reason}</td>
                      </tr>
                      <tr class="text-gray-500 border-b border-gray-100">
                        <td
                          scope="row"
                          class="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-2"
                        >
                          Comment by {name}
                        </td>
                        <td class="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-2">{comment}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <button
                  style={{ fontSize: "small", textDecoration: "underline" }}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Show more details
                </button>
              </>
            )}
            <br />
            {request_status === "pending" ? (
              <>
                <p class="text-gray-700 text-base">
                  Your request has been sent and we will try to get back to you
                  within few days. Contact hostel administrator office for more
                  details. Contact hours : Monday to Friday (9am - 6pm)
                </p>
              </>
            ) : (
              <>
                <p class="text-gray-700 text-base">
                  Your request has been reviewd by administrator. You are
                  requested to follow details mentioned by admin. For any
                  clarification, you may contact us. Contact hours : Monday to
                  Friday (9am - 6pm)
                </p>
              </>
            )}
          </div>
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src={url}
              alt="Avatar of Writer"
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none">{name}</p>
              <p class="text-gray-600">{reqDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
