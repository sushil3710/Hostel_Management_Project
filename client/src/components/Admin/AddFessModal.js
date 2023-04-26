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

export default function AddFeesModal() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        onClose();
        setOpen(false);
    };
    const onClose = () => {
        reset();
    };

    const onSubmit = (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("fees_type", data.fees_type);
        formData.append("year", data.year);
        formData.append("semester", data.semester);
        formData.append("amount", data.amount);
        Axios.post("/add-fees-record", formData, {
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
            <Tooltip title="Add">
                <button
                    type="button"
                    onClick={handleOpen}
                    className="focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                >
                    <svg
                        className="-ml-1 mr-2 h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Add Fee Record
                </button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div
                        id="modal-modal-description"
                        className="relative w-full max-w-2xl h-full md:h-auto"
                    >
                        <div className="bg-white rounded-lg shadow relative">
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold">Add Fees Record</h3>
                                <button
                                    onClick={handleClose}
                                    type="button"
                                    className="text-gray-400 bg-transparent focus:outline-none hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                                                htmlFor="fees_type"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Fees Type
                                            </label>

                                            <select
                                                id="fees_type"
                                                {...register("fees_type")}
                                                required
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            >
                                                <option value="">Select</option>
                                                <option value="Mess">Mess</option>
                                                <option value="Hostel">Hostel</option>
                                                <option value="HEF">HEF</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="year"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Year
                                            </label>
                                            <input
                                                type="number"
                                                {...register("year")}
                                                id="year"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="semester"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Semester
                                            </label>
                                            <input
                                                type="number"
                                                {...register("semester")}
                                                id="semester"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="amount"
                                                className="text-sm font-medium text-gray-900 block mb-2"
                                            >
                                                Amount
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                id="amount"
                                                {...register("amount")}
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                                                    <div className="w-25 h-5 mx-5 my-2.5">
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