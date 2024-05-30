import Header from "./Header";
import axios from "axios";
import { APIurl } from "./const";
import { useState, useEffect } from "react";
("use client");
import React from "react";
import "./index.css";
interface Review {
  id: string;
  title: string;
  url: string;
  reviewer: string;
  review: string;
  detail: string;
}

const Home: React.FC = () => {
  // const [detail, setDetail] = useState("");
  // const [id, setId] = useState("");
  // const [review, setReview] = useState("");
  // const [reviewer, setReviwer] = useState("");
  // const [title, setTitle] = useState("");
  //const [url, setUrl] = useState("");
  const [reviewobjects, setReviewObjects] = useState<Review[]>([]);

  useEffect(() => {
    axios
      .get(`${APIurl}/public/books?offset=20`)
      .then((res) => {
        console.log(res.data);
        setReviewObjects(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("レビュー一覧を取得できませんでした");
      });
  }, []);

  const ReviewCard = reviewobjects.map((card, index) => (
    <div
      className="card carousel-item mx-4 w-96 rounded-none bg-base-100 shadow-2xl"
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

  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center">
        <div className="carousel  w-[90%]">{ReviewCard}</div>
      </div>
      <div className="join flex justify-center">
        <button className="btn join-item">«</button>
        <button className="btn join-item">Page 22</button>
        <button className="btn join-item">»</button>
      </div>
    </>
  );
};

export default Home;
