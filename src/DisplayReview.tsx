import axios from "axios";
import { APIurl } from "./const";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
("use client");
import React from "react";
import "./index.css";
import { toNext, toPrevious } from "./redux/offsetSlice";

interface Review {
  id: string;
  title: string;
  url: string;
  reviewer: string;
  review: string;
  detail: string;
}

const DisplayReview: React.FC = () => {
  const [reviewobjects, setReviewObjects] = useState<Review[]>([]);
  const offset = useSelector((state: RootState) => state.offset.offsetNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${APIurl}/public/books?offset=${offset}`)
      .then((res) => {
        console.log(res.data);
        setReviewObjects(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("レビュー一覧を取得できませんでした");
      });
  }, [offset]);

  const ReviewCard = reviewobjects.map((card, index) => (
    <div
      className="card carousel-item mx-4 w-2/5 rounded-none bg-base-100 shadow-2xl"
      key={index}
    >
      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        <div className="flex">
          <span>URL：</span>
          <a className="link link-primary" href={card.url}>
            こちらをクリック
          </a>
        </div>
        <p>レビュワー：{card.reviewer}</p>
        <p>レビュー：{card.review}</p>
        <p>詳細：{card.detail}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  ));

  const addOffset = () => {
    dispatch(toNext());
  };
  const reduceOffset = () => {
    dispatch(toPrevious());
  };

  return (
    <>
      <div className="carousel  w-[90%]">{ReviewCard}</div>
      <div className="join mt-8 grid grid-cols-2">
        <button
          onClick={() => reduceOffset()}
          className="btn btn-outline join-item"
        >
          «
        </button>
        <button
          onClick={() => addOffset()}
          className="btn btn-outline join-item"
        >
          »
        </button>
      </div>
    </>
  );
};

export default DisplayReview;
