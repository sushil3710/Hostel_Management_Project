import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";

function ComplaintCard({ id, name, description, date, hostel, room }) {
    const navigate = useNavigate();
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        axios.get(`/complaints/${id}`)
            .then((response) => {
                const complaint = response.data[0];
                console.log(response.data[0].complaint_status);
                setIsSolved(complaint.complaint_status === "done");
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    

    const handleSolvedClick = async (id) => {
        console.log(id);
        try {
            const response = await axios.post(`/complaints/solve/${id}`);
            setIsSolved(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="max-w-5xl mx-auto px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{date}</span>
                    {isSolved ? (
                        <Button variant="success" disabled>Solved</Button>
                    ) : (
                        <Button variant="danger" onClick={() => handleSolvedClick(id)} style={{ color: 'black' }} >Unsolved</Button>
                    )}
                </div>

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">{name}</a>
                    <br></br><br></br>
                    <label class="hostel-label font-bold">Hostel:</label>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{hostel}</p>
                    <br></br>
                    <label class="hostel-label font-bold">Room:</label>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{room}</p>
                    <br></br>
                    <label class="hostel-label font-bold">Description:</label>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
                </div>

                <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplaintCard;
