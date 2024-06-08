import { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { APIurl } from "./const";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

interface Review {
  id: string;
  title: string;
  url: string;
  reviewer: string;
  review: string;
  detail: string;
}

const EditReview = () => {
  const reviews: Review[] = useSelector(
    (state: RootState) => state.book.reviews,
  );
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const [Pre_title, setPre_title] = useState("");
  const [Pre_url, setPre_url] = useState("");
  const [Pre_detail, setPre_detail] = useState("");
  const [Pre_review, setPre_review] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      title: Pre_title,
      url: Pre_url,
      detail: Pre_detail,
      review: Pre_review,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .put(`${APIurl}/books/${book_id}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log("レビューの更新に成功しました。", res.data);
        alert("レビューの更新に成功しました。");
        navigate("/");
        setErrorMessage("");
        reset();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `レビューの更新に失敗しました。 ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <h3 className="m-6 text-center text-4xl font-medium">Edit Review</h3>
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
                Update Your Review
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

export default EditReview;
