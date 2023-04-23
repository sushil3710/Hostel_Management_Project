import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

function ComplaintCard({ id, name, description, date }) {

    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/complaints/${id}`);
                const complaint = response.data[0];
                console.log(response.data[0].complaint_status);
                setIsSolved(complaint.complaint_status === "done");
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    const handleSolvedClick = async (id) => {
        console.log(id);
        try {
            const response = await axios.post(`/complaints/solve/${id}`);
            console.log(response.data);
            setIsSolved(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
