import axios from "axios";
import { APIurl } from "./const";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
("use client");
import React from "react";
import "./index.css";
import { setReviews } from "./redux/bookSlice";
import { Link } from "react-router-dom";
import PageNation from "./PageNation";
import { FiEdit } from "react-icons/fi";
import { useCookies } from "react-cookie";

interface Review {
  id: string;
  title: string;
  url: string;
  reviewer: string;
  review: string;
  detail: string;
  isMine: boolean;
}

const DisplayReview: React.FC = () => {
  const offset = useSelector((state: RootState) => state.offset.offsetNumber);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies();

  const dispatch = useDispatch();
  const reviews: Review[] = useSelector(
    (state: RootState) => state.book.reviews,
  );

  useEffect(() => {
    axios
      .get(`${APIurl}/books?offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        dispatch(setReviews(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("レビュー一覧を取得できませんでした");
        setLoading(false);
      });
  }, [dispatch, offset, cookies.token]);

  const sendLog = (selectBookId: string) => {
    axios
      .post(
        `${APIurl}/logs`,
        { selectBookId },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ReviewCard = reviews.map((card) => (
    <div className="card carousel-item mx-4 w-2/5  bg-base-100" key={card.id}>
      <div className="card-body">
        <div className="card-actions justify-end">
          {card.isMine && (
            <Link to={`/edit/${card.id}`} aria-label="Edit Review">
              <FiEdit size={20} fill="none" stroke="currentColor" />
            </Link>
          )}
        </div>
        <h2 className="card-title">{card.title}</h2>
        <div className="flex">
          <span>URL：</span>
          <a className="link link-primary" target="_blank" href={card.url}>
            こちらをクリック
          </a>
        </div>
        <p>レビュワー：{card.reviewer}</p>
        <p>レビュー：{card.review}</p>
        <div className="items-center">
          <div className="card-actions justify-end">
            <Link
              to={`/detail/${card.id}`}
              className="btn btn-primary"
              onClick={() => sendLog(card.id)}
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));

  if (loading) {
    return (
      <>
        <div className="flex h-screen flex-col items-center justify-center ">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="carousel  w-[90%]">{ReviewCard}</div>
      <PageNation />
    </>
  );
};

export default DisplayReview;
