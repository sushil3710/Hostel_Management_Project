import React, { useState } from "react";
import { useEffect } from "react";
import DeleteExcelModal from "./DeleteExcelModal";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";
import adminsPic from "../../images/manage-admins.svg";
import UploadExcelModal from "./UploadExcelModal";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddStudentModal from "./AddStudentModal";

export default function AddStudents() {
  const navigate = useNavigate();
  const [excelList, setExcelList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // 0 -> show nothing, 1 -> success message
  const [error, setError] = useState(null);
  const [reRender, setReRender] = useState(0);
  if (sessionStorage.getItem("alert") !== "1") {
    sessionStorage.setItem("alert", "0");
  }


  useEffect(() => {
    Axios.get("/get-excel", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setExcelList(response.data);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const add_students = (fileurl) => {

   
    const formData = new FormData();
    formData.append("fileurl", fileurl);
    console.log(formData)
    Axios.post("/add-students", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else if (response.data === 0) {
          // eslint-disable-next-line no-undef
          setError(1);
        } else {
          // eslint-disable-next-line no-undef
          setError(0);

          window.location.reload();


        }
      })
      .catch((err) => console.log(err));
  }
  const ViewExcel = (fileurl) => {

    const formData = new FormData();

    formData.append("fileurl", fileurl);
    console.log(formData)
    Axios.post("/view-excel", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else if (response.data === 0) {
          // eslint-disable-next-line no-undef
          setError(1);
        } else {
          // eslint-disable-next-line no-undef
          setError(0);


        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="p-10 bg-gray-100">
      {sessionStorage.getItem("alert") !== "0" ? (
        <div
          id="alert"
          className="flex p-4 mb-4 bg-green-100 rounded-b-lg dark:bg-green-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
            <p>Excel File added successfully</p>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("alert", 0);
              window.location.reload();
            }}
            className="ml-auto focus:outline-none -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
            data-collapse-toggle="alert"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
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
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <></> 
      )
      }

      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 xl:p-8 min-h-screen">
        <div className="flex justify-between">
          <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
            List of Excels
          </h3>
          <div className="flex space-x-4">
            <AddStudentModal />
            <div className="mx-1"></div>
            <UploadExcelModal />
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  File Name
                </th>
                {/* <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                
                </th> */}
                <th className="bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {excelList.map((excel) => (
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-4 text-left">
                    {excel.name}
                  </th>

                  <td className="border-t-0 pl-16 pr-4 align-middle text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div className="flex gap-2 justify-end">
                      <form onSubmit={(event) => {
                        //event.preventDefault(); // prevent the default form submission
                        add_students(excel.file_url); // call the SendMail function with the file_url parameter
                      }}>
                        <button
                          className={`text-white focus:outline-none block w-30 h-15 font-medium rounded-lg text-sm text-center mr-2 
  ${excel.status === 1 ? ' bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200' : 'bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200'}`}
                          type="submit"
                          disabled={excel.status === 1}
                        >
                          <div className={"w-20 h-5 mx-5 my-2.5 "}>
                            <p>{excel.status === 1 ? "ADDED" : "ADD STUDENTS"}</p>
                          </div>
                        </button>


                      </form>
                      <form onSubmit={(event) => {
                        //event.preventDefault(); // prevent the default form submission
                        ViewExcel(excel.file_url); // call the SendMail function with the file_url parameter
                      }}>

                        <button
                          className="text-white focus:outline-none block w-20 h-15 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center mr-2"
                          type="submit">
                          <div className="w-15 h-5 mx-2 my-2.5">
                            <VisibilityIcon size="2xl" />
                          </div>
                        </button>

                      </form>
                      <div className="flex gap-2 justify-end">
                        <DeleteExcelModal
                          fileurl={excel.file_url}
                          setReRender={setReRender}
                        />
                      </div>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
          {isFetching ? (
            <img
              className="mx-auto h-[200px] w-[200px]"
              alt="Spinner"
              src={screenSpinner}
            />
          ) : (
            excelList.length === 0 && (
              <div className="bg-white">
                <div className="w-3/5 mx-auto my-50 text-center">
                  <div className="h-5" />
                  <img alt="No Excels added yet" src={adminsPic} />
                  <p className="text-2xl font-semibold">No Files Added yet!</p>
                  <div className="h-6"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
