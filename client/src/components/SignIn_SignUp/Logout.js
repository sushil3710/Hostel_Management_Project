import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "./Sessions";
import { removeAdminType } from "../Admin/AdminTypes";

export default function Logout() {
  const navigate = useNavigate();

  const signout = () => {
    removeUserSession();
    removeAdminType();
    navigate("/");
  };

  useEffect(() => {
    signout();
  });

  return <></>;
}
