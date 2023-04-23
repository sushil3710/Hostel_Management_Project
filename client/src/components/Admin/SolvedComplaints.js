import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "./ComplaintCard";


const SolvedComplaint = () => {


    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        axios.get("/admin/solvedcomplaints")
            .then((response) => {
                setComplaints(response.data);
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