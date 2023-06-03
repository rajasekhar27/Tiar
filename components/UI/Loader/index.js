import { useSelector } from "react-redux";

const Loader = ({ global }) => {
  const loaderStatus = useSelector((state) => state.ui.loader);

  if (global) {
    if (loaderStatus) {
      return (
        <div className="fixed w-full h-full top-0 bottom-0 right-0 left-0 grid place-items-center bg-black/50 z-20">
          <span className="loader"></span>
        </div>
      );
    } else return null;
  }

  return (
    <div className="fixed w-full h-full top-0 bottom-0 right-0 left-0 grid place-items-center bg-black/50 z-20">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
