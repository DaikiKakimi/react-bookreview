import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "./redux/store";
import { signOut } from "./redux/authSlice";
import { useCookies } from "react-cookie";
import axios from "axios";
import { APIurl } from "./const";
import { useEffect, useState } from "react";
import { setUserName, setIconUrl } from "./redux/userSlice";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.isSignIn);

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };

  const userName = useSelector((state: RootState) => state.user.userName);
  const iconUrl = useSelector((state: RootState) => state.user.iconUrl);

  useEffect(() => {
    axios
      .get(`${APIurl}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setUserName(res.data.name));
        dispatch(setIconUrl(res.data.iconUrl));
      })
      .catch(() => {
        alert("ユーザー情報の取得に失敗しました。");
      });
  }, [cookies, dispatch]);

  return (
    <>
      {auth ? (
        <div className="container relative mx-auto flex h-24 items-center justify-between overflow-hidden border-b border-gray-200 font-medium sm:px-4 md:overflow-visible md:px-2 lg:justify-center lg:px-0">
          <div className="flex items-center">
            <Link
              to="/profile"
              className="flex items-center space-x-2 py-4 font-extrabold text-gray-900 md:py-0"
            >
              <span className="flex size-12 items-center justify-center rounded-full text-white">
                <div className="avatar">
                  <div className=" rounded-full">
                    <img src={iconUrl} />
                  </div>
                </div>
              </span>
              <span>{userName}</span>
            </Link>
          </div>
          <div className="flex w-full flex-col items-start justify-center space-x-6 text-center md:mt-0 md:w-2/3 md:flex-row md:items-center lg:space-x-8">
            <div className="text-3xl">Book Review</div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleSignOut}
              className="mr-0 px-6 py-2 text-gray-700 "
            >
              サインアウト
            </button>

            <Link
              to="/login"
              className="mr-0 px-6 py-2 text-gray-700 md:mr-2 lg:mr-3"
            >
              ログイン
            </Link>

            <Link
              to="/signup"
              className="inline-flex bg-gray-900 px-6 py-3 text-sm font-medium leading-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 md:rounded-full md:focus:ring-2"
            >
              新規登録
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="container relative mx-auto flex h-24 items-center justify-between overflow-hidden border-b border-gray-200 font-medium sm:px-4 md:overflow-visible md:px-2 lg:justify-center lg:px-0">
            <div className="flex items-center">
              <a
                href="#_"
                className="flex items-center space-x-2 py-4 font-extrabold text-gray-900 md:py-0"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-white">
                  <svg
                    className="h-5 w-auto -translate-y-px"
                    viewBox="0 0 69 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m31.2 12.2-3.9 12.3-13.4.5-13.4.5 10.7 7.7L21.8 41l-3.9 12.1c-2.2 6.7-3.8 12.4-3.6 12.5.2.2 5-3 10.6-7.1 5.7-4.1 10.9-7.2 11.5-6.8.6.4 5.3 3.8 10.5 7.5 5.2 3.8 9.6 6.6 9.8 6.4.2-.2-1.4-5.8-3.6-12.5l-3.9-12.2 8.5-6.2c14.7-10.6 14.8-9.6-.4-9.7H44.2L40 12.5C37.7 5.6 35.7 0 35.5 0c-.3 0-2.2 5.5-4.3 12.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>userName</span>
              </a>
            </div>
            <div className="flex w-full flex-col items-start justify-center space-x-6 text-center md:mt-0 md:w-2/3 md:flex-row md:items-center lg:space-x-8">
              <div className="text-3xl">Book Review</div>
              {/* <a
              href="#_"
              className="mx-0 ml-6 inline-block w-full py-2 text-left font-medium text-black md:mx-2 md:ml-0 md:w-auto md:px-0 md:text-center lg:mx-3"
            >
              Home
            </a>
            <a
              href="#_"
              className="mx-0 inline-block w-full py-2 text-left font-medium text-gray-700 hover:text-black md:mx-2 md:w-auto md:px-0 md:text-center lg:mx-3"
            >
              Features
            </a>
            <a
              href="#_"
              className="mx-0 inline-block w-full py-2 text-left font-medium text-gray-700 hover:text-black md:mx-2 md:w-auto md:px-0 md:text-center lg:mx-3"
            >
              Blog
            </a>
            <a
              href="#_"
              className="mx-0 inline-block w-full py-2 text-left font-medium text-gray-700 hover:text-black md:mx-2 md:w-auto md:px-0 md:text-center lg:mx-3"
            >
              Contact
            </a>
            <a
              href="#_"
              className="absolute left-0 top-0 ml-10 mr-2 mt-6 hidden py-2 text-gray-600 md:relative md:ml-2 md:mt-0 lg:mx-3 lg:inline-block"
            >
              <svg
                className="inline size-5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </a> */}
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="mr-0 px-6 py-2 text-gray-700 md:mr-2 lg:mr-3"
              >
                ログイン
              </Link>

              <Link
                to="/signup"
                className="inline-flex bg-gray-900 px-6 py-3 text-sm font-medium leading-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 md:rounded-full md:focus:ring-2"
              >
                新規登録
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;