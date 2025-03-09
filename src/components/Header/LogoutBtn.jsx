import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useState } from "react";

function LogoutBtn() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    setError(null);
    try {
      await authService.logout();
      dispatch(logout());
    } catch (err) {
      console.error(err);
      setError("Failed to logout.Please tyr again!");
    }
  };
  return (
    <>
      <button
        className="inline-block px-6 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        Logout
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </>
  );
}

export default LogoutBtn;
