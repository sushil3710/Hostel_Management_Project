import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";


function RoomCard({id,  email_id, prevRoom, reqRoom, reason ,comment ,admin_comment, phone, isexchange, exchange_id, request_status, reqDate}) {

    const [isSolved, setIsSolved] = useState(false);
    const [url , setUrl] = useState('');
    const [name , setName] = useState('');

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


    useEffect(() => {
        axios
          .get("/get-user-info", {
            headers: {
              Authorization: getToken(),
            },
          })
          .then((response) => {
            // console.log(response.data);
            setUrl(response.data.profile_image_url);
            setName(response.data.full_name);
            if (response.data === 1) {
            } else {
            }
          });
      });

    // const handleSolvedClick = async (id) => {
    //     console.log(id);
    //     try {
    //         const response = await axios.post(`/complaints/solve/${id}`);
    //         console.log(response.data);
    //         setIsSolved(true);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div  class="p-10">
    <div class=" w-full lg:max-w-full lg:flex">
      <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
      </div>
      <div class=" border-b border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal my-2">
        
        <div class="mb-8">
          <h1 class="text-sm text-red-600 flex items-center">
            {request_status.toUpperCase()}
          </h1>
          <div class="text-gray-900 font-bold text-xl mb-2">Room change request From {prevRoom} to {reqRoom}</div>
          
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
            {
                isexchange === 'yes' ? (<>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Exchange with : 
                </td>
                <td class="px-6 py-4">
                    {exchange_id}
                </td>
            </tr>
                
                </>) : (<></>)
            }
        </tbody>
    </table>
</div>

          <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
        </div>
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-4" src={url} alt="Avatar of Writer"/>
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
