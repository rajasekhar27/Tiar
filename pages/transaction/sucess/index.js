import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import TransactionSuccess from "../../../components/Transaction/TransactionSuccess";
import Loader from "../../../components/UI/Loader";

const SuccessTransactionPage = (props) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <TransactionSuccess />
    </div>
  );
};

export default SuccessTransactionPage;
