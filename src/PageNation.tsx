import { useDispatch } from "react-redux";
import { toNext, toPrevious } from "./redux/offsetSlice";

const PageNation = () => {
  const dispatch = useDispatch();
  const addOffset = () => {
    dispatch(toNext());
  };
  const reduceOffset = () => {
    dispatch(toPrevious());
  };
  return (
    <>
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

export default PageNation;
