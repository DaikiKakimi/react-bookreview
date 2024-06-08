import { useParams } from "react-router";
import axios from "axios";
import { APIurl } from "./const";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Review {
  id: string;
  title: string;
  url: string;
  reviewer: string;
  review: string;
  detail: string;
  isMine: boolean;
}

const Detail = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { book_id } = useParams();
  const [cookies] = useCookies();
  const [review, setReview] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${APIurl}/books/${book_id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setReview(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `ユーザー情報の取得に失敗しました。 ${err.response.data.ErrorMessageJP}`,
        );
        setLoading(false);
      });
  }, [book_id, cookies.token]);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center ">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <h3 className="mb-6 text-center text-2xl font-medium">
            <div className="m-10">タイトル：{review.title}</div>
            <div className="m-10">詳細：{review.detail}</div>
          </h3>
          <p className="text-red-500">{errorMessage}</p>
          <p className="m-4 text-center text-indigo-600 hover:text-indigo-800 ">
            <Link to="/">return Home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Detail;
