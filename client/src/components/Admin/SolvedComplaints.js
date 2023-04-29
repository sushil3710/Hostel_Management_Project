import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "./ComplaintCard";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";


const SolvedComplaint = () =>  {
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    useEffect(() => {
        axios.get("/admin/solvedcomplaints", {
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    setComplaints(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div>
                {complaints.map((complaint) => (
                    <ComplaintCard
                        key={complaint.id}
                        name={complaint.name}
                        description={complaint.complaint_details}
                        date={complaint.complaint_date}
                    />
                ))}
            </div>
        </>
    );

};

export default SolvedComplaint;