import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const Detail = () => {
  const reviews = useSelector((state: RootState) => state.book.reviews);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <div className="mt-16 w-full md:mt-0 md:w-2/5">
          <div className="relative z-10 h-auto overflow-hidden rounded-lg border-b-2 border-gray-300 bg-white p-8 px-7 py-10 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-medium">SignUp</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
