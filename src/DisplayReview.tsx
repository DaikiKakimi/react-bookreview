import axios from "axios";
import { APIurl } from "./const";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
("use client");
import React from "react";
import "./index.css";
import { setReviews } from "./redux/bookSlice";
import { Link } from "react-router-dom";
import PageNation from "./PageNation";

interface Review {
  id: string;
  title: string;
  url: string;
  reviewer: string;
  review: string;
  detail: string;
}

const DisplayReview: React.FC = () => {
  const offset = useSelector((state: RootState) => state.offset.offsetNumber);

  const dispatch = useDispatch();
  const reviews: Review[] = useSelector(
    (state: RootState) => state.book.reviews,
  );

  useEffect(() => {
    axios
      .get(`${APIurl}/public/books?offset=${offset}`)
      .then((res) => {
        dispatch(setReviews(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert("レビュー一覧を取得できませんでした");
      });
  }, [dispatch, offset]);

  const sendLog = () => {
    console.log("ログを送信！");
  };

  const ReviewCard = reviews.map((card) => (
    <div className="card carousel-item mx-4 w-2/5  bg-base-100" key={card.id}>
      <div className="card-body">
        {/* 削除アイコン
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div> */}
        <h2 className="card-title">{card.title}</h2>
        <div className="flex">
          <span>URL：</span>
          <a className="link link-primary" target="_blank" href={card.url}>
            こちらをクリック
          </a>
        </div>
        <p>レビュワー：{card.reviewer}</p>
        <p>レビュー：{card.review}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/detail/${card.id}`}
            className="btn btn-primary"
            onClick={sendLog}
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="carousel  w-[90%]">{ReviewCard}</div>
      <PageNation />
    </>
  );
};

export default DisplayReview;
