import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Login from "../../../components/login";
import Otp from "../../../components/login/Otp";
import Loader from "../../../components/UI/Loader";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const email = useSelector((state) => state.login.email);

  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="bg-[url('/images/tiar_logo_2.svg')] bg-no-repeat bg-left-bottom">
      {email ? <Otp /> : <Login />}
      {/* <img
          src="/images/tiar_logo_2.svg"
          alt=""
          className="fixed left-0 bottom-0 z-[0]"
        /> */}
    </div>
  );
};

export default LoginPage;
