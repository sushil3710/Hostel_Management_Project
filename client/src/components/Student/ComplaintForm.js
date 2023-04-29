import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavBar from "./DashboardNavBar";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate, useParams, Link } from "react-router-dom";
export default function Water(props) {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [emailid, setEmailId] = useState('');
    const [hostel, setHostel] = useState('');
    const [wing, setWing] = useState('');
    const [room, setRoom] = useState('');
    const [floor, setFloor] = useState('');
    const [complainttype, setComplaintType] = useState('');
    const [complaint, setComplaint] = useState('');

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
                    console.log(response.data);
                    setEmailId(response.data.email_id);
                    setUserName(response.data.full_name);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        const formData = {
            username,
            emailid,
            hostel,
            wing,
            room,
            floor,
            complainttype,
            complaint,
        };
        axios.post("/complaintSection/savedata", formData, {
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    console.log(response.data);
                    alert("Complaint submitted successfully!");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Error submitting complaint. Please try again later.");
            });
    };

    return (
        <>
            <DashboardNavBar currentFlag={3} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" >
                    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Complaint Form</h2>

                    <form onSubmit={handleSubmit}>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
                                <input id="username" type="text" required value={username} onChange={(e) => setUserName(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                                <input id="emailAddress" readonly type="email" required value={emailid} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="username">Hostel Name</label>
                                <input id="hostelname" type="text" required value={hostel} onChange={(e) => setHostel(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="username">Wing Side</label>
                                <input id="wing" type="text" required value={wing} onChange={(e) => setWing(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="username">Room Number</label>
                                <input id="room" type="text" required value={room} onChange={(e) => setRoom(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="username">Floor Number</label>
                                <input id="floor" type="text" required value={floor} onChange={(e) => setFloor(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label class="text-gray-700 dark:text-gray-200" for="complaintType">Type of Complaint</label>
                                <select id="complaintType" name="complaintType" required value={complainttype} onChange={(e) => setComplaintType(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                    <option value="" disabled selected>Select a type</option>
                                    <option value="water">Water Related</option>
                                    <option value="electricity">Electricity Related</option>
                                    <option value="furniture">Furniture Related</option>
                                    <option value="equipments">Electrical Equipments</option>
                                    <option value="general">General</option>
                                </select>
                            </div>

                        </div>
                        <br></br>
                        <label htmlFor="experience" >Enter your Complaint:</label>
                        <textarea id="experience" name="experience" required value={complaint} onChange={(e) => setComplaint(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
                        <div class="flex justify-end mt-6">
                            <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
