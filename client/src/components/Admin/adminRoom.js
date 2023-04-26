import React from "react";
import { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import spinner from "../../images/SpinnerWhite.gif";
import { getToken } from "../SignIn_SignUp/Sessions";
import "../Applicant/roomChange.css";
import axios from "axios";
import AdminRoomCard from "../Admin/AdminRoomCard";

import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../images/default-profile-picture.svg";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [myData, setMyData] = useState([]);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    prevRoom: "",
    reqRoom: "",
    reason: "",
    phone: "",
    exchange: "",
    exchangeId: "",
    comment: "",
  });
  const [filter, setFilter] = useState('pending');
  const [activeComponent, setActiveComponent] = useState("guide");

  useEffect(() => {
    // console.log(id);
    axios.get(`/getAllRequest/`).then((response) => {
      console.log("ye wala" + JSON.stringify(response.data));
      setMyData(response.data);
    });
  });


  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="part1" style={{ width: "33.33%" }}>
          <Button
            style={{ width: "100%", borderRadius: "0px" }}
            className={activeComponent === "guide" ? "activeButton" : "myBtn"}
            onClick={() => {
              setActiveComponent("guide");
              setFilter('pending');
            }}
          >
            Pending requests
          </Button>
        </div>
        <div style={{ width: "33.33%" }} className="part2">
          <Button
            style={{ width: "100%", borderRadius: "0px" }}
            className={
              activeComponent === "my-requests" ? "activeButton" : "myBtn"
            }
            onClick={() => {
              setActiveComponent("my-requests");
              setFilter('accept');
            }}
          >
            Accepted
          </Button>
        </div>
        <div style={{ width: "33.33%" }} className="part3">
          <Button
            style={{ width: "100%", borderRadius: "0px" }}
            className={activeComponent === "form" ? "activeButton" : "myBtn"}
            onClick={() => {
              setActiveComponent("form");
              setFilter('reject');
            }}
          >
            Rejected requests
          </Button>
        </div>
      </div>

      <div className="mt-5 md:mt-0 md:col-span-2">
        {myData
        .filter((data)=>{
          return data.request_status == filter ;
        })
        .map((data) => (
          <AdminRoomCard
          email_id = {data.email_id}
            id={data.id}
            prevRoom={data.prev_room}
            reqRoom={data.req_room}
            reason={data.reason}
            isexchange={data.isexchange}
            exchange_id={data.exchange_id}
            request_status={data.request_status}
            comment={data.comments}
            admin_comment={data.admin_comment}
            reqDate={data.request_date}
          />
        ))}
      </div>
    </>
  );
}
