import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getToken } from "../SignIn_SignUp/Sessions";
import Profile1 from "../../images/profilepic (1).jpg";



function AdminRoomCard({ id, email_id, prevRoom, reqRoom, reason, comment, admin_comment, phone, isexchange, exchange_id, request_status, reqDate }) {
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState('User name');
    const [email, setEmail] = useState('not defined');
    const [show, setShow] = useState(false);
    useEffect(() => {
        axios
            .get(`/getAllInfo/${email_id}`, {
                headers: {
                    Authorization: getToken(),
                },
            })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    setUrl(response.data.profile_image_url);
                    setName(response.data.full_name);
                }
            })
        .catch ((error) => {
            console.log(error);
            alert("Some error has occured while processinng this request.");
        })
}, []);
const acceptIt = () => {
    var adminComment;
    adminComment = prompt('Any special message for student ? Write NA for no comment');
    const data = {
        option: 'accept',
        adminComment: adminComment
    }
    if (!adminComment) {

    } else {
        axios.post(`/updateStatus/${id}/`, data, {
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    alert("Status : room request accepted");
                }

            }).catch((error) => {
                console.log(error);
                alert("Some error has occured while processinng this request.");
            })
    }
}
const rejectIt = () => {
    var adminComment;
    adminComment = prompt('Any special message for student ? Write NA for no comment');
    const data = {
        option: 'reject',
        adminComment: adminComment
    }
    if (!adminComment) {

    } else {
        axios.post(`/updateStatus/${id}/`, data, {
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    alert("Status : room request rejected");
                }
            }).catch((error) => {
                console.log(error);
                alert("Some error has occured while processinng this request.");
            })
    }
}

return (
    <div class="p-10">
        <div class=" w-full lg:max-w-full lg:flex">
            <div class=" border-b border-gray-400 border-r border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal my-2">
                <div class="mb-8">
                    {request_status === 'pending' ? (<>
                        <h1 class="text-sm text-red-600 flex items-center">
                            {request_status.toUpperCase()}
                            <span style={{ marginLeft: '0.5rem' }}></span>
                        </h1>

                    </>) : (<>
                        {request_status === 'accept' ? (<>
                            <h1 class="text-sm text-green-600 flex items-center">
                                {request_status.toUpperCase()}
                                <span style={{ marginLeft: '0.5rem' }}></span>
                            </h1>
                        </>) : (<>
                            <h1 class="text-sm text-red-600 flex items-center">
                                {request_status.toUpperCase()}
                                <span style={{ marginLeft: '0.5rem' }}></span>
                            </h1>

                        </>)}
                    </>)}
                    {
                        request_status === 'pending' ? (
                            <>
                                <div style={{ display: 'flex' }}>
                                    <div class="text-gray-900 font-bold text-xl mb-2">Room change request From {prevRoom} to {reqRoom}</div>
                                    <span style={{ marginLeft: '1rem' }}></span>

                                    <div>
                                        <button style={{ color: 'green', padding: '0.3rem', border: '0.3px solid green' }} onClick={acceptIt}>Accept</button>
                                        <span style={{ marginLeft: '1rem' }}></span>
                                        <button style={{ color: 'red', padding: '0.3rem', border: '0.3px solid red' }} onClick={rejectIt}>Reject</button>
                                    </div>
                                </div>
                            </>
                        ) : (<></>)
                    }
                    {show ? (<>
                        <button style={{ fontSize: 'small', textDecoration: 'underline' }} onClick={() => { setShow(false) }}>Hide</button>
                        <div class="relative overflow-x-auto shadow-md ">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr class="bg-white  dark:bg-gray-900">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Reason for room change
                                        </td>
                                        <td class="px-6 py-4">
                                            {reason}
                                        </td>
                                    </tr>
                                    <tr class="bg-white  dark:bg-gray-900">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Comment by {name}
                                        </td>
                                        <td class="px-6 py-4">
                                            {comment}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>) : (<>
                        <button style={{ fontSize: 'small', textDecoration: 'underline' }} onClick={() => { setShow(true) }}>Show more details</button>

                    </>)}
                    <br />
                    {
                        request_status === 'pending' ? (<>
                            <p class="text-gray-700 text-base">You may reply to this request by student. Accept/Reject it. You may add a comment for student.</p>
                        </>) : (<>
                            <p class="text-gray-700 text-base">You have already responded to this room change request. To update, ask student to request again.</p>
                        </>)
                    }
                </div>
                <div class="flex items-center">
                {/* {url===null ? (
  <img src={url} alt="Profile" />) : (
  <img src={FaceIcon} alt="Profile" />
)} */}
                               <img
                                   src={url? url: Profile1} alt="ProfilePic" 
                                   style={{ width: '150px', height: '150px' }}/>
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

export default AdminRoomCard;
