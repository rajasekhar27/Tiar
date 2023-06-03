import { useSelector } from "react-redux";
import InfiniteScrollComponent from "../InfiniteScrollComponent";

const AuthInfiniteScrollComponent = ({ children, ...remainingProps }) => {
  // ** Specify token path
  const token = useSelector((state) => state.auth.accessToken);

  if (!token) return null;

  return (
    <InfiniteScrollComponent {...remainingProps}>
      {children}
    </InfiniteScrollComponent>
  );
};

export default AuthInfiniteScrollComponent;
