import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "../Admin/ComplaintCard";
import { getToken } from "../SignIn_SignUp/Sessions";
import DashboardNavBar from "./DashboardNavBar";
import { useNavigate, useParams, Link } from "react-router-dom";

const MyComplaint = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get(`/getmycomplaints`, {
                headers: {
                    Authorization: getToken(),
                },
            })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    console.log(response);
                    setComplaints(response.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleFilterClick = (filterStatus) => {
        setFilter(filterStatus);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <DashboardNavBar currentFlag={4} />
            <div>
                <div class="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
                    <button onClick={() => handleFilterClick('all')} class="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        All
                    </button>

                    <button onClick={() => handleFilterClick('solved')} class="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Solved
                    </button>

                    <button onClick={() => handleFilterClick('unsolved')} class="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Unsolved
                    </button>
                </div>
                <br></br>
                
                <div>
                    {complaints
                        .filter((complaint) => {
                            if (filter === "all" || (filter === "solved" && complaint.complaint_status === "done") || (filter === "unsolved" && complaint.complaint_status !== "done")) {
                                return complaint.name.toLowerCase().includes(searchTerm.toLowerCase());
                            } else {
                                return false;
                            }
                        })
                        .map((complaint) => (
                            <ComplaintCard
                                key={complaint.complaint_id}
                                id={complaint.complaint_id}
                                name={complaint.name}
                                description={complaint.complaint_details}
                                date={complaint.complaint_date}
                                hostel={complaint.hostel_name}
                                room={complaint.room_number}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default MyComplaint;
