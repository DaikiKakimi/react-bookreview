import { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { APIurl } from "./const";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { signIn } from "./redux/authSlice";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    axios
      .post(`${APIurl}/signin`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        console.log(cookies);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `ログインに失敗しました。 ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <div className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 px-7 py-10 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-medium">ログイン</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-red-500">{errorMessage}</p>
              <label>
                メールアドレス
                <input
                  type="email"
                  className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="例：book@review.com"
                  {...register("email", {
                    required: "メールアドレスを入力してください",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "正しいメールアドレスを入力してください",
                    },
                  })}
                />
              </label>
              <label>
                パスワード
                <input
                  type="password"
                  className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="6文字以上のパスワードを入力"
                  {...register("password", {
                    required: "パスワードを入力してください",
                    minLength: {
                      value: 6,
                      message: "パスワードは6文字以上で入力してください",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="block">
                <button
                  className="w-full rounded-lg bg-[#9117f5] px-3 py-4 font-medium text-white"
                  type="submit"
                >
                  ログイン
                </button>
              </div>
            </form>
            <p className="m-4 text-center text-indigo-600 hover:text-indigo-800 ">
              <Link to="/signup">新規作成</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
