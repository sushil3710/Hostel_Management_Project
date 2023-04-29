import DashboardNavBar from "./DashboardNavBar";
import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import screenSpinner from "../../images/2300-spinner.gif";
import PayFeesModal from "./PayFeesModal";

function FeesSection(props) {
    const navigate = useNavigate();
    const [startCount, setStartCount] = useState(1);
    const [isFetching, setIsFetching] = useState(true);
    const [user, setUser] = useState({});
    const [limit, setLimit] = useState(5);
    const [fees_records, setFeesRecords] = useState([]);

    
    function range(start, end) {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    }

    const increaseStartCount = () => {
        if (startCount + limit <= fees_records.length) {
            setStartCount(startCount + limit);
        }
    };

    const decreaseStartCount = () => {
        setStartCount(Math.max(startCount - limit, 1));
    };

    useEffect(() => {
    axios
      .get("/get-fees-info", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setFeesRecords(response.data.results);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
    }, []);
    
    useEffect(() => {
    axios
      .get("/get-user-info", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
            setUser(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

    return (
        <>
            <DashboardNavBar currentFlag={2} />
            <div style={{ display: 'flex' }}>
                <div className="sidebar bg-gray-900 text-white w-64 flex flex-col min-h-screen" style={{ flex: '1 1 20%' }}>
                    <div className="sidebar-header py-4 px-6 bg-gray-800">
                        <h2 className="text-lg font-bold">Fees Section</h2>
                    </div>
                    <div className="sidebar-menu flex-1 overflow-y-auto">
                        <ul className="py-4">
                            <li className="mb-4">
                                <a href="" className="block py-2 px-6 hover:bg-gray-700">Pending Fees</a>
                            </li>
                            <li className="mb-4">
                                <a href="/fees-section-fees-history" className="block py-2 px-6 hover:bg-gray-700">Fees History</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{ flex: '1 1 80%' }}>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="align-middle inline-block min-w-full">
                                <div className="shadow overflow-hidden">
                                    <table className="table-fixed min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    S.No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Fees Type
                                                </th>
                                                <th scope="col" className="p-4"></th>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Year
                                                </th>
                                                <th scope="col" className="p-4"></th>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Semester
                                                </th>
                                                <th scope="col" className="p-4"></th>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Amount
                                                </th>
                                                <th scope="col" className="p-4"></th>
                                            </tr>
                                        </thead>

                                        {fees_records.length !== 0 && (
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[
                                                    ...range(
                                                        startCount - 1,
                                                        Math.min(startCount + limit - 1, fees_records.length) - 1
                                                    ),
                                                ].map((i) => (
                                                    <tr key={fees_records[i].fees_id}>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                            {fees_records[i].fees_id}
                                                        </td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                            {fees_records[i].fees_type}
                                                        </td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                            {fees_records[i].year}
                                                        </td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                            {fees_records[i].semester}
                                                        </td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                                                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                            {fees_records[i].fees_amount}
                                                        </td>
                                                        <td className="p-6 whitespace-nowrap space-x-2 flex">
                                                            <PayFeesModal
                                                                full_name={user.full_name}
                                                                email={user.email_id}
                                                                entry_number={user.entry_numb}
                                                                fees_id={fees_records[i].fees_id}
                                                                fees_type={fees_records[i].fees_type}
                                                                year={fees_records[i].year}
                                                                semester={fees_records[i].semester}
                                                                amount={fees_records[i].fees_amount}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>

                                    {isFetching ? (
                                        <img
                                            className="mx-auto h-[200px] w-[200px]"
                                            alt="Spinner"
                                            src={screenSpinner}
                                        />
                                    ) : (
                                        fees_records.length === 0 && (
                                            <div className="bg-white">
                                                <div className="w-3/5 mx-auto my-50 text-center">
                                                        <div className="h-5" />
                                                        <img alt="No data" src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1682545936~exp=1682546536~hmac=dbf6914fbc7f8438ab0f087b3c594dacb7bfc726f627e8a800067b24ec8e21da" />

                                                    <p className="text-2xl font-semibold">
                                                        No Pending Fees Left !
                                                    </p>
                                                    <div className="h-6" />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <button
                                onClick={decreaseStartCount}
                                className="text-gray-500 focus:outline-none hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={increaseStartCount}
                                className="text-gray-500 focus:outline-none hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <span className="text-sm font-normal text-gray-500">
                                Showing{" "}
                                <span className="text-gray-900 font-semibold">
                                    {startCount}-{Math.min(startCount + limit - 1, fees_records.length)}
                                </span>{" "}
                                of
                                <span className="text-gray-900 font-semibold">
                                    {" "}
                                    {fees_records.length}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={decreaseStartCount}
                                className="flex-1 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                            >
                                <svg
                                    className="-ml-1 mr-1 h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Previous
                            </button>
                            <button
                                onClick={increaseStartCount}
                                className="flex-1 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                            >
                                Next
                                <svg
                                    className="-mr-1 ml-1 h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeesSection;
