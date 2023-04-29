import React, { useState } from "react";
import { useEffect } from "react";
import DeleteStudentModal from "./DeleteStudentModal";
import DownloadList from "./DownloadList";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";
import adminsPic from "../../images/manage-admins.svg";

export default function AddStudents() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  if (sessionStorage.getItem("alert") !== "1") {
    sessionStorage.setItem("alert", "0");
  }
  function renderHostel(param) {
    switch (param) {
      case 1:
        return "SATLUJ";
      case 2:
        return "BEAS";
      case 3:
        return "CHENAB";
      case 4:
        return "RAAVI";
      case 5:
        return "BRAHMAPUTRA";
      case 6:
        return "JHELUM";
      default:
        return "BEAS";
    }
  }

  function renderHostelStyles(param) {
    switch (param) {
      case 1:
        return "py-2 text-center rounded-lg font-semibold bg-yellow-50 text-yellow-900 border border-yellow-200";
      case 2:
        return "py-2 text-center rounded-lg font-semibold bg-red-50 text-red-900 border border-red-200";
      case 3:
        return "py-2 text-center rounded-lg font-semibold bg-green-50 text-green-900 border border-green-200";
      case 4:
        return "py-2 text-center rounded-lg font-semibold bg-purple-50 text-purple-900 border border-purple-200";
      case 5:
        return "py-2 text-center rounded-lg font-semibold bg-blue-50 text-blue-900 border border-blue-200";
      case 6:
        return "py-2 text-center rounded-lg font-semibold bg-pink-50 text-pink-900 border border-pink-200";
      default:
        return "py-2 text-center rounded-lg font-semibold bg-green-50 text-green-900 border border-green-200";
    }
  }

  useEffect(() => {
    Axios.get("/get-students", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setStudentList(response.data);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div className="p-10 bg-gray-100">

      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 xl:p-8 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
            Registered Students
          </h3>
          <div className="flex space-x-4">
            <DownloadList />
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Student Name
                </th>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Entry Number
                </th>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Email ID
                </th>
                <th className="text-center px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Hostel
                </th>

                <th className="bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" />
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">
              {studentList.map((student) => (
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-1 text-left">
                    {student.full_name}
                  </th>
                  <th className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-1 text-left">
                    {student.entry_numb}
                  </th>
                  <td className="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-1">
                    {student.email_id}
                  </td>
                  <td className="border-t-0 align-middle text-sm font-normal text-gray-900 whitespace-nowrap py-1">
                    <div className={renderHostelStyles(student.hostel_id)}>
                      {renderHostel(student.hostel_id)}
                    </div>
                  </td>
                  <td className="border-t-0 pl-16 pr-4 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-1">
                    <div className="flex gap-2 justify-end">
                      <DeleteStudentModal
                        email_id={student.email_id}
                      />
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
            studentList.length === 0 && (
              <div className="bg-white">
                <div className="w-3/5 mx-auto my-50 text-center">
                  <div className="h-5" />
                  <img alt="No Excels added yet" src={adminsPic} />
                  <p className="text-2xl font-semibold">No Students yet!</p>
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
