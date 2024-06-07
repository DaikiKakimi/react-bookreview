import { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { APIurl } from "./const";
import Header from "./Header";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

const PostReview = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post(`${APIurl}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log("レビューの投稿に成功しました。", res.data);
        alert("レビューの投稿に成功しました。");
        navigate("/");
        setErrorMessage("");
        reset();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `レビューの投稿に失敗しました。 ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <h3 className="m-6 text-center text-4xl font-medium">Post Review</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="h-auto">
            <p className="text-red-500">{errorMessage}</p>
            <label>
              Title
              <input
                type="text"
                className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="タイトルを入力してください"
                {...register("title", {
                  required: "タイトルを入力してください",
                })}
              />
            </label>
            <label>
              URL
              <input
                type="text"
                className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.url ? "border-red-500" : ""
                }`}
                placeholder="URLを入力してください"
                {...register("url", {
                  required: "URLを入力してください",
                })}
              />
            </label>
            <label>
              Detale
              <textarea
                rows={5}
                className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.detail ? "border-red-500" : ""
                }`}
                placeholder="詳細を入力してください"
                {...register("detail", {
                  required: "詳細を入力してください",
                })}
              ></textarea>
            </label>
            <label>
              Review
              <textarea
                rows={5}
                className={`mb-4 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.review ? "border-red-500" : ""
                }`}
                placeholder="レビューを入力してください"
                {...register("review", {
                  required: "レビューを入力してください",
                })}
              />
            </label>

            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
            {errors.detail && (
              <p className="text-red-500">{errors.detail.message}</p>
            )}
            {errors.review && (
              <p className="text-red-500">{errors.review.message}</p>
            )}
            <div className="block">
              <button
                className="w-full rounded-lg bg-[#9117f5] px-3 py-4 font-medium text-white"
                type="submit"
              >
                Post Your Review
              </button>
            </div>
          </form>
          <p className="link link-primary m-4 text-center">
            <Link to="/">return Home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PostReview;
