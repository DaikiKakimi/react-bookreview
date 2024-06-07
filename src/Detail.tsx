import { useParams } from "react-router";
import axios from "axios";
import { APIurl } from "./const";
import { useCookies } from "react-cookie";
import { useState } from "react";

const Detail = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { book_id } = useParams();
  const [cookies] = useCookies();
  //const reviews = useSelector((state: RootState) => state.book.reviews);

  axios
    .get(`${APIurl}/books/${book_id}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      setErrorMessage(
        `ユーザー情報の取得に失敗しました。 ${err.response.data.ErrorMessageJP}`,
      );
    });

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <h3 className="mb-6 text-center text-2xl font-medium">SignUp</h3>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    </>
  );
};

export default Detail;
