import { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Compressor from "compressorjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type Inputs = {
  name: string;
  email: string;
  password: string;
  profileImage: FileList;
};

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    axios
      .post("https://railway.bookreview.techtrain.dev/users", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `サインアップに失敗しました。 ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <div className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 px-7 py-10 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-medium">新規作成</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-red-500">{errorMessage}</p>
              <label>
                ユーザー名
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
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                {/* プロフィール画像
                <input
                  type="file"
                  className="mb-4"
                  {...register("profileImage")}
                /> */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">プロフィール画像</Label>
                  <Input type="file" />
                </div>
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
              <div className="block">
                <button
                  className="w-full rounded-lg bg-[#9117f5] px-3 py-4 font-medium text-white"
                  type="submit"
                >
                  アカウント作成
                </button>
              </div>
            </form>
            <p className="m-4 text-center text-indigo-600 hover:text-indigo-800 ">
              <Link to="/login">ログインへ</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
