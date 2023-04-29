import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "./ComplaintCard";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";

const SeeComplaint = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [filter, setFilter] = useState("all"); 
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("/admin/getcomplaints", {
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

    const handleFilterClick = (filterStatus) => {
        setFilter(filterStatus);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div>
                <div class="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
                    <button style={{width : '33.33%'}}onClick={() => handleFilterClick('all')} class="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        All
                    </button>

                    <button style={{width : '33.33%'}} onClick={() => handleFilterClick('solved')} class="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Solved
                    </button>

                    <button style={{width : '33.33%'}} onClick={() => handleFilterClick('unsolved')} class="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                        Unsolved
                    </button>
                </div>
                <br></br>
                <div style={{display : 'flex', justifyContent : 'center'}}>
                    <div>

                    <label for="username" class="block mx-auto text-sm text-gray-500 dark:text-gray-300">Search By Name :</label>
                    </div>
                    <div>

                    <input type="text" placeholder="Search by name" onChange={handleSearch} class="block  mt-2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                </div>
                {/* <div>
                    <input type="text" placeholder="Search by name" onChange={handleSearch} />
                </div> */}
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

export default SeeComplaint;
