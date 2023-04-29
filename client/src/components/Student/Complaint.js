import React from "react";
import { useState, useEffect } from "react";
import "../css/complaint.css";
import DashboardNavBar from "./DashboardNavBar";


const Complaint = () => {

    const [activeComplaint, setActiveComplaint] = useState(null);

    const tips = [
        {
            title: "Water leakage",
            description:
                "Water leakage from taps, pipes, or other sources can cause damage to the hostel property and pose a safety hazard to the students. The hostel can quickly respond to complaints of water leakage and take necessary measures to fix the issue.",
        },
        {
            title: "Low water pressure",
            description:
                "Low water pressure can make it difficult for students to perform routine tasks such as taking a shower or washing clothes. Hostel management can address this issue by checking the water supply system and making necessary repairs or adjustments.",
        },
        {
            title: "Hot water",
            description: "Lack of hot water can be a significant inconvenience for students, especially during cold weather. The hostel can ensure that the water heaters are functioning correctly and repair them if necessary."
        },
        {
            title: "Dirty water",
            description:
                "Dirty water can be a health hazard and should be addressed immediately. The hostel can investigate the cause of the dirty water and take measures to ensure that the water is clean and safe for use."
        },
        {
            title: "Water scarcity",
            description:
                " In some cases, the hostel may face water scarcity due to low supply or other factors. In such situations, the hostel can take measures to conserve water and ensure that students have access to the essential amount of water required for their daily needs."
        },

    ];

    const topQuestions = [
        {
            question: "Power outage",
            answer:
                "Power outages can occur due to various reasons such as a fault in the power supply system, overloading of circuits, or damage to electrical equipment. The hostel can investigate the cause of the power outage and take necessary measures to restore power."
        },
        {
            question: "Electrical shock or sparks",
            answer:
                "Electrical shocks or sparks can be hazardous and should be addressed immediately. The hostel can inspect the electrical system and equipment to identify the source of the problem and take necessary measures to prevent such incidents."
        },
        {
            question: "Tripping of circuit breakers",
            answer:
                "Circuit breakers can trip due to overloading or short circuits. The hostel can investigate the cause of the tripping and take necessary measures to prevent it from happening again."
        },
        {
            question: "Poor lighting",
            answer:
                "Inadequate or poor lighting can cause discomfort and affect the students' health and well-being. The hostel can ensure that the lighting systems are functioning correctly and replace or repair faulty bulbs or fixtures."
        },

    ];

    const sampleque = [
        {
            question: "Damaged furniture",
            answer: "Furniture can get damaged due to wear and tear or mishandling. The hostel can inspect the damaged furniture and repair or replace it as necessary.",
        },
        {
            question: "Inadequate furniture",
            answer: "Inadequate furniture such as insufficient storage space or study tables can affect the students' productivity and efficiency. The hostel can provide additional furniture to meet the students' needs.",
        },
        {
            question: "Dirty or stained furniture",
            answer: "Dirty or stained furniture can affect the hygiene and cleanliness of the living space. The hostel can clean or replace such furniture to ensure a clean and hygienic environment.",
        },

    ];

    // Add more sample questions and answers as needed



    const interviewprocess = [
        {
            step: "Inadequate or faulty lighting",
            description: [
                "Inadequate or faulty lighting can affect the students' productivity and efficiency. The hostel can ensure that the lighting systems are functioning correctly and replace or repair faulty bulbs or fixtures."
            ],
        },
        {
            step: "Non-functional electrical outlets",
            description: [
                " Non-functional electrical outlets can cause inconvenience and affect the students' ability to charge their devices or use electrical equipment. The hostel can inspect the electrical system and repair or replace the non-functional outlets."
            ],
        },
        {
            step: "Malfunctioning geyser",
            description: [
                "Geyser that are not functioning correctly can cause discomfort and affect the students' health and well-being. The hostel can inspect geyser and repair or replace the malfunctioning equipment."
            ],
        },
    ]

    const handleComplaintForm = (complaintType) => {
        window.location.href = `/complaintform`;
    }


    return (

        <>
            <DashboardNavBar currentFlag={3} />
            <div style={{ display: 'flex' }}>
                <div className="sidebar bg-gray-900 text-white w-64 flex flex-col min-h-screen" style={{ flex: '1 1 20%', position:'fixed'}}  >
                    <div className="sidebar-header py-4 px-6 bg-gray-800">
                        <h2 className="text-lg font-bold">Complaint Section</h2>
                    </div>
                    <div className="sidebar-menu flex-1 overflow-y-auto">
                        <ul className="py-4">
                            <li className="mb-4">
                                <a href="#interview-tips" className="block py-2 px-6 hover:bg-gray-700">Water Related</a>
                            </li>
                            <li className="mb-4">
                                <a href="#top-asked-questions" className="block py-2 px-6 hover:bg-gray-700">Electricity Related</a>
                            </li>
                            <li className="mb-4">
                                <a href="#sample-questions" className="block py-2 px-6 hover:bg-gray-700">Furniture Related</a>
                            </li>
                            <li className="mb-4">
                                <a href="#interview-process" className="block py-2 px-6 hover:bg-gray-700">Electrical Equipments</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{ flex: '1 1 80%' }}>
                    <div id="interview-tips" className="interview-tips-container">
                        {/* Interview Tips section */}
                        <h3 className="interview-tips-title">Water Related</h3>
                        <br></br>
                        <button onClick={() => {
                            // setActiveComplaint("water");
                            handleComplaintForm("water");
                        }} class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            Complaint Here
                        </button>
                        <div className="interview-tips-list">
                            {tips.map((tip, index) => (
                                <div className="interview-tips-item" key={index}>
                                    <h2 className="interview-tips-item-title">{tip.title}</h2>
                                    <p className="interview-tips-item-description">
                                        {tip.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="top-asked-questions" className="interview-tips-container">
                        {/* Top Asked Questions section */}
                        <h1 className="top-asked-questions-title">Electricity Related</h1>
                        <br></br>
                        <button onClick={() => {
                            // setActiveComplaint("electricity");
                            handleComplaintForm("electricity");
                        }} class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            Complaint Here
                        </button>
                        <div className="top-asked-questions-list">
                            {topQuestions.map((question, index) => (
                                <div className="top-asked-questions-item" key={index}>
                                    <h5 className="top-asked-questions-item-title">
                                        {question.question}
                                    </h5>
                                    <p className="top-asked-questions-item-answer">
                                        {question.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="sample-questions" className="interview-tips-container">
                        {/* Sample Questions section */}
                        <h1 className="top-asked-questions-title">Furniture Related</h1>
                        <br></br>
                        <button onClick={() => {
                            // setActiveComplaint("furniture");
                            handleComplaintForm("furniture");
                        }} class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            Complaint Here
                        </button>
                        <div className="top-asked-questions-list">
                            {sampleque.map((question, index) => (
                                <div className="top-asked-questions-item" key={index}>
                                    <h5 className="top-asked-questions-item-title">
                                        {question.question}
                                    </h5>
                                    <p className="top-asked-questions-item-answer">
                                        {question.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Add content for sample questions section */}
                    </div>

                    <div id="interview-process" className="interview-tips-container">
                        {/* Interview Process section */}
                        <h1 className="top-asked-questions-title">Electrical Equipments</h1>
                        <br></br>
                        <button onClick={() => {
                            // setActiveComplaint("equipments");
                            handleComplaintForm("equipments");
                        }} class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            Complaint Here
                        </button>
                        <div className="top-asked-questions-list">
                            {interviewprocess.map((question, index) => (
                                <div className="top-asked-questions-item" key={index}>
                                    <h5 className="top-asked-questions-item-title">
                                        {question.step}
                                    </h5>
                                    <p className="top-asked-questions-item-answer">
                                        {question.description}
                                    </p>
                                </div>
                            ))}
                        </div>


                        {/* Add content for interview process section */}
                    </div>
                </div>
            </div>
        </>
    );

};

export default Complaint;