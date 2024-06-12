import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "./redux/store";
import { signOut } from "./redux/authSlice";
import { useCookies } from "react-cookie";
import axios from "axios";
import { APIurl } from "./const";
import { useEffect } from "react";
import { setUserName, setIconUrl } from "./redux/userSlice";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.isSignIn);

  const location = useLocation();

  const linkClasses = (path: string) =>
    `mx-0 inline-block w-full py-2 text-left font-medium ${
      location.pathname === path ? "text-black" : "text-gray-700"
    } hover:text-black md:mx-2 md:w-auto md:px-0 md:text-center lg:mx-3`;

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
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
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
        //ログインしてるとき
        <div className="container relative mx-auto flex h-24 items-center justify-between overflow-hidden border-b border-gray-200 font-medium sm:px-4 md:overflow-visible md:px-2 lg:justify-center lg:px-0">
          <div className="flex items-center">
            <Link
              to="/profile"
              className="flex items-center space-x-2 py-4 font-extrabold text-gray-900 md:py-0"
            >
              <span className="flex size-12 items-center justify-center rounded-full text-white">
                <div className="avatar">
                  <div className=" rounded-full">
                    <img src={iconUrl} alt="usericon" />
                  </div>
                </div>
              </span>
              <span>{userName}</span>
            </Link>
          </div>
          <div className="flex w-full justify-center md:w-2/3">
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link to="/profile" className={linkClasses("/profile")}>
              Edit Profile
            </Link>
            <Link to="/new" className={linkClasses("/new")}>
              Post Review
            </Link>
          </div>
          <div className="flex items-center">
            <button onClick={handleSignOut} className="mr-0 p-2 text-gray-700 ">
              SignOut
            </button>

            <Link
              to="/login"
              className="mr-0 px-6 py-2 text-gray-700 md:mr-2 lg:mr-3"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="inline-flex bg-gray-900 px-6 py-3 text-sm font-medium leading-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 md:rounded-full md:focus:ring-2"
            >
              SignUp
            </Link>
          </div>
        </div>
      ) : (
        //ログインしてないとき(現在は表示されない)
        <>
          <div className="container relative mx-auto flex h-24 items-center justify-between overflow-hidden border-b border-gray-200 font-medium sm:px-4 md:overflow-visible md:px-2 lg:justify-center lg:px-0">
            <div className="flex items-center">
              <a className="flex items-center space-x-2 py-4 font-extrabold text-gray-900 md:py-0">
                <span>UserName</span>
              </a>
            </div>
            <div className="flex w-full flex-col items-start justify-center space-x-6 text-center md:mt-0 md:w-2/3 md:flex-row md:items-center lg:space-x-8">
              <Link to="/" className="text-3xl">
                Book Review
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="mr-0 px-6 py-2 text-gray-700 md:mr-2 lg:mr-3"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex bg-gray-900 px-6 py-3 text-sm font-medium leading-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 md:rounded-full md:focus:ring-2"
              >
                SignUp
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
