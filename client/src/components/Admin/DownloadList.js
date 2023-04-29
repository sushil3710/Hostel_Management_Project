import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import fileSaver from "file-saver";

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

export default function DownloadList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onExport = () => {
    Axios.get("/get-list-in-excel", {
      responseType: "arraybuffer",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          var blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          let fileName =
            "Student_List";
          fileSaver.saveAs(blob, fileName);
          setIsLoading(false);
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tooltip title="List Download">
        <button
          onClick={onExport}
          type="button"
          className="focus:outline-none w-1/2 text-gray-900 bg-purple-300 border border-purple-700 hover:bg-purple-500 focus:ring-4 focus:ring-cyan-300 font-medium inline-flex items-center justify-center rounded-lg text-sm my-3 px-3 py-2 text-center sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
          Download List
        </button>
      </Tooltip>
    </div>
  );
}
