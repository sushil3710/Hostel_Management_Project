import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import spinner from "../../images/SpinnerWhite.gif";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 5,
};

export default function PayFeesModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        onClose();
        setOpen(false);
    };
    const handleFileSubmit1 = (e, maxSize, setVariable) => {
        const file = e.target.files[0];

        if (
            file.type !== "fees/pdf"
        ) {
            e.target.value = null;
            alert("File format not followed! Allowed formats: .pdf");
            return;
        }

        if (file.size > maxSize * 1000000) {
            e.target.value = null;
            const error =
                "File size cannot exceed more than " + maxSize.toString() + "MB";
            alert(error);
        } else {
            setVariable(file);
        }
    };

    function changeDateFormat(date_of_transaction) {
        let date = new Date(date_of_transaction);

        let month = date.getMonth() + 1;
        let day = String(date.getDate());
        if (day.length === 1) day = "0" + day;
        if (month.length === 1) month = "0" + month;

        date = date.getFullYear() + "-0" + month + "-" + day;

        return date;
    }

    const onClose = () => {
        reset();
    };

    const onSubmit = (data) => {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("full_name", data.full_name);
        formData.append("fees_type", data.fees_type);
        formData.append("entry_number", data.entry_number);
        formData.append("remarks", data.remarks);
        formData.append("date_of_transaction", data.date_of_transaction);

        Axios.post("/save-fees-details", formData, {
            headers: {
                Authorization: getToken(),
            },
        })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Tooltip title="Fill Details">
                <button
                    type="button"
                    onClick={handleOpen}
                    className="focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                >
                    <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/25/null/external-fees-automotive-dealership-flaticons-lineal-color-flat-icons-2.png" />               </button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div
                        className="relative w-full max-w-2xl h-full md:h-auto"
                        id="modal-modal-description"
                    >
                        <div className="bg-white rounded-lg shadow relative">
                            <div className="flex items-start justify-between px-5 py-4 border-b rounded-t">
                                <h2 className="text-3xl font-bold">Fees Details</h2>
                                <button
                                    onClick={handleClose}
                                    type="button"
                                    className="text-gray-400 focus:outline-none bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 pt-6 pb-2 space-y-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="full_name"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={props.full_name}
                                                id="full_name"
                                                readOnly
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="entry_number"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Entry Number
                                            </label>
                                            <input
                                                type="text"
                                                {...register("entry_number")}
                                                id="entry_number"
                                                pattern="([A-Z]+, *)*[A-Z]+$"
                                                title="Comma-separated Gate codes(in capital alphabets)"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="email_id"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Email Id
                                            </label>
                                            <input
                                                type="text"
                                                value={props.email}
                                                id="email_id"
                                                readOnly
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="fees_type"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Fees Category
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                value={props.fees_type}
                                                id="fees_type"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="amount"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Amount Paid
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                value={props.amount}
                                                id="amount"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="date_of_transaction"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Date of Transaction
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                id="date_of_transaction"
                                                {...register("date_of_transaction")}
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            />
                                        </div>
                                        <div className="col-span-full sm:col-span-full">
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                                htmlFor="profile_picture"
                                            >
                                                Upload Fees Transaction Slip
                                                <span style={{ color: "#ff0000" }}> *</span>
                                            </label>
                                            <input
                                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                aria-describedby="profile-picture-desc"
                                                id="profile_picture"
                                                type="file"
                                                required
                                                accept=".pdf"
                                                // onChange={(e) =>
                                                //     // handleFileSubmit1(e, 2, setProfileImage)
                                                // }
                                            />
                                            <div
                                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                id="profile-picture-desc"
                                            >
                                                <span className="font-semibold">
                                                    Maximum file size:
                                                </span>{" "}
                                                2 MB,{" "}
                                                <span className="font-semibold">
                                                    Allowed file formats:
                                                </span>{" "}
                                                .pdf
                                                <br />
                                                <div className="mt-1">
                                                    <span className="font-semibold">
                                                        Recommended File Name Format:
                                                    </span>
                                                    <span>
                                                        {" "}
                                                        Fees_Entry_Number&lt;your_email_id&gt;{" "}
                                                        <br />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label
                                                htmlFor="remarks"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Remarks
                                            </label>
                                            <textarea
                                                {...register("remarks")}
                                                id="remarks"
                                                rows={1}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 items-start h-[1px] bg-gray-200" />
                                    <div className="flex justify-between">
                                        <div className="p-3 border-t border-gray-200 rounded-b">
                                            {!isLoading ? (
                                                <button
                                                    className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                                                    type="submit"
                                                >
                                                    <div className="w-20 h-5 mx-5 my-2.5">
                                                        <p>Submit</p>
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                                                    type="submit"
                                                    disabled
                                                >
                                                    <div className="w-20 h-5 mx-5 my-2.5">
                                                        <img
                                                            className="h-5 w-5 mx-auto"
                                                            alt="spinner"
                                                            src={spinner}
                                                        />
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
