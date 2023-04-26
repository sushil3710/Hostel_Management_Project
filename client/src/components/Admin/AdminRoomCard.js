import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";

function AdminRoomCard({id,  email_id, prevRoom, reqRoom, reason ,comment ,admin_comment, phone, isexchange, exchange_id, request_status, reqDate}) {
    const [isSolved, setIsSolved] = useState(false);
    const [url , setUrl] = useState('User name');
    const [name , setName] = useState('User name');
    const [email, setEmail] = useState('not defined');
    const [show, setShow] = useState(false);
    const [option, setOption] = useState('');
    const isRoomAvailable = ()=>{
        axios.post("/checkRoomAvailability", prevRoom)
        .then((response)=>{
            console.log("Room available");
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(() => {
        axios
          .get(`/getAllInfo/${email_id}`, {
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data === 1) {
            } else {
                setUrl(response.data.profile_image_url);
                setName(response.data.full_name);
            }
          });
      }, [email]);

    
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
    const acceptIt = ()=>{
        var adminComment ;
         adminComment = prompt('Any special message for student ? Write NA for no comment');
        const data = {
            option : 'accept',
            adminComment : adminComment
        }
        if(!adminComment){

        }else{
            axios.post(`/updateStatus/${id}/`, data)
            .then((response)=>{
                alert("Status : room request accepted");
            }).catch((error)=>{
                console.log(error);
                alert("Some error has occured while processinng this request.");
    
            })
        }
    }
    const rejectIt = ()=>{
        var adminComment ;
         adminComment = prompt('Any special message for student ? Write NA for no comment');
        const data = {
            option : 'reject',
            adminComment : adminComment
        }
        if(!adminComment){

        }else{
            axios.post(`/updateStatus/${id}/`, data)
            .then((response)=>{
                alert("Status : room request accepted");
            }).catch((error)=>{
                console.log(error);
                alert("Some error has occured while processinng this request.");
    
            })
        }

    }

    return (
        <div  class="p-10">
    <div class=" w-full lg:max-w-full lg:flex">
      {/* <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
      </div> */}
      <div class=" border-b border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal my-2">   
        <div class="mb-8">
            {request_status === 'pending' ? (<>
                <h1 class="text-sm text-red-600 flex items-center">
                    {request_status.toUpperCase()}
                    <span style={{marginLeft : '0.5rem'}}></span>
                </h1>
            
            </>) : (<>
                {request_status === 'accept' ? (<>
                    <h1 class="text-sm text-green-600 flex items-center">
                    {request_status.toUpperCase()}
                    <span style={{marginLeft : '0.5rem'}}></span>
                </h1>
                </>) : (<>
                    <h1 class="text-sm text-red-600 flex items-center">
                    {request_status.toUpperCase()}
                    <span style={{marginLeft : '0.5rem'}}></span>
                </h1>
                
                </>)}
            </>)}
            {
                request_status === 'pending' ? (
                <>
                    <div style={{display : 'flex'}}>
                     <div class="text-gray-900 font-bold text-xl mb-2">Room change request From {prevRoom} to {reqRoom}</div>
                     <span style={{marginLeft : '1rem'}}></span>

                    <div>
                        <button style = {{color : 'green', padding : '0.3rem', border : '0.3px solid green' }} onClick={acceptIt}>Accept</button>
                        <span style={{marginLeft : '1rem'}}></span>
                        <button style = {{color : 'red', padding : '0.3rem', border : '0.3px solid red'}}onClick={rejectIt}>Reject</button>
                    </div>
                    </div>      
               </>
                ) : (<></>)
            }
          {show ? (<>
            <button style={{fontSize : 'small', textDecoration : 'underline'}} onClick={()=>{setShow(false)}}>Hide</button>
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
            <button style={{fontSize : 'small', textDecoration : 'underline'}} onClick={()=>{setShow(true)}}>Show more details</button>

          </>)}
            <br/>
            {
                request_status === 'pending' ? (<>
          <p class="text-gray-700 text-base">You may reply to this request by student. Accept/Reject it. You may add a comment for student.</p>
                </>) : (<>
          <p class="text-gray-700 text-base">You have already responded to this room change request. To update, ask student to request again.</p>
                </>)
            }
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

export default AdminRoomCard;
