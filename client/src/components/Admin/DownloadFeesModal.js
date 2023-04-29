import React, { useState} from "react";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import fileSaver from "file-saver";

export default function DownloadFees(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onExport = () => {
    const formData=new FormData();
    formData.append("fee_id",props.fee_id)


    Axios.post("/get-fee-in-excel", formData,{
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
            "Fee_Details";
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
          className="focus:outline-none w-1/2 text-gray-900 bg-gray-200 border border-black-700 hover:bg-gray-400 focus:ring-4 focus:ring-cyan-300 inline-flex items-center justify-center rounded-lg text-sm  px-2 py-1 text-center sm:w-auto"
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
      
        </button>
      </Tooltip>

    </div>
  );
}
