/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip, Typography } from "@mui/material";
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
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "8px",
    padding: "5px",
    outline: state.isFocused ? "none" : "",
    border: "1px solid rgb(229 231 235)",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  }),
};



export default function UploadExcelModal() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(0);
  const { register, reset } = useForm();
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileName, setExcelFilename] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("excelfile", excelFile);
    formData.append("excelname",excelFileName)
    console.log(formData)


    Axios.post("/add-excel", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else if (response.data === 2) {
          setError(1);
          setIsLoading(false);
        } else {
          sessionStorage.setItem("alert", "1");
          setError(0);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
    handleClose();
  };


  return (<div>
<Tooltip title={
  <Typography>
    Excel File Should Contain These Columns: <br />
    Email_ID, <br />
    Name, <br />
    Entry_Number, <br />
    Hostel_ID, <br />
    Room_Number
  </Typography>
}>
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
        Upload Excel
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
          className="relative w-full max-w-2xl h-full md:h-auto" >
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Upload File</h3>
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
            <form onSubmit={onSubmit} >
              <div className="px-6 pt-6 pb-2 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Upload Excel file</h3>
                  <div className="flex flex-col items-center">

                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      id="excelFile"
                      name="excelFile"
                      onChange={(event) =>  { const file = event.target.files[0]; 
                        setExcelFile(file);
                        setExcelFilename(file.name)}}
                      className="block w-full p-2 text-sm border border-gray-300 rounded-md"
                    />
                    <div className="p-3 border-t border-gray-200 rounded-b">
                      {!isLoading ? (
                        <button
                          className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                          type="submit"
                        >
                          <div className="w-20 h-5 mx-5 my-2.5">
                            <p>Upload</p>
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
                </div>
              </div>
            </form>
          </div>
        </div>

      </Box>
    </Modal>
  </div>
  );
}
