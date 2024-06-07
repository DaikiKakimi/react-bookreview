import { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";
import { APIurl } from "./const";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { signIn } from "./redux/authSlice";

type Inputs = {
  name: string;
  email: string;
  password: string;
  profileImage: FileList;
};

const SignUp = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, name, password, profileImage } = data;

    axios
      .post(`${APIurl}/users`, {
        name,
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        console.log(cookies);

        console.log("ユーザー作成完了", res.data);
        setErrorMessage("");

        if (profileImage.length > 0) {
          const imageFile = profileImage[0];

          //画像ファイルのフォーマット確認
          if (imageFile.size > 1048576) {
            setErrorMessage("ファイルサイズは1MB以下にしてください");
            return;
          }

          const validExtensions = ["image/jpeg", "image/png"];
          if (!validExtensions.includes(imageFile.type)) {
            setErrorMessage("画像の拡張子はjpgまたはpngのみ許可されています");
            return;
          }

          //Compressor.jsを使用して圧縮処理
          new Compressor(imageFile, {
            quality: 0.6,
            success(result) {
              const formData = new FormData();
              formData.append("icon", result, imageFile.name);

              axios
                .post(`${APIurl}/uploads`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((uploadRes) => {
                  console.log("Image uploaded:", uploadRes.data);
                  setErrorMessage("");
                  alert("サインアップに成功しました！");
                  reset();
                  navigate("/login");
                })
                .catch((err) => {
                  console.log(err);
                  setErrorMessage(
                    `画像のアップロードに失敗しました。 ${err.response.data.ErrorMessageJP}`,
                  );
                });
            },
            error(err) {
              console.log(err.message);
              setErrorMessage("画像の圧縮に失敗しました。");
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `サインアップに失敗しました。 ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <div className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 px-7 py-10 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-medium">SignUp</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-red-500">{errorMessage}</p>
              <label>
                Username
                <input
                  type="text"
                  className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="ユーザー名を入力"
                  {...register("name", {
                    required: "ユーザー名を入力してください",
                  })}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="例：book@review.com"
                  {...register("email", {
                    required: "メールアドレスを入力してください",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "正しいメールアドレスを入力してください",
                    },
                  })}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="6文字以上のパスワードを設定"
                  {...register("password", {
                    required: "パスワードを入力してください",
                    minLength: {
                      value: 6,
                      message: "パスワードは6文字以上で入力してください",
                    },
                  })}
                />
              </label>
              <label>
                Profile image
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-md mb-4 block w-full  max-w-xs"
                  {...register("profileImage")}
                />
              </label>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              {errors.profileImage && (
                <p className="text-red-500">{errors.profileImage.message}</p>
              )}
              <div className="block">
                <button
                  className="w-full rounded-lg bg-[#9117f5] px-3 py-4 font-medium text-white"
                  type="submit"
                >
                  SignUp
                </button>
              </div>
            </form>
            <p className="link link-primary m-4 text-center">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
