import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../../../../../components/UI/Loader";

import SendViaTiarNetwork from "../../../../../components/Wallet/SendViaTiarNetwork";
import { useValidateAddressQuery } from "../../../../../store/apis/restApi";

const WithDrawTiarDetailsPage = (props) => {
  const router = useRouter();

  const { id } = router.query;

  const {
    data: addressValidationData,
    isFetching: addressValidationFetching,
    error,
  } = useValidateAddressQuery({
    address: id,
  });

  useEffect(() => {
    if (!addressValidationData) return;
    if (addressValidationData?.message === false) {
      router.push("/wallet");
    }
  }, [addressValidationData]);

  if (error) {
    router.push("/wallet");
  }

  if (addressValidationFetching) {
    return <Loader />;
  }

  return (
    <div>
      <SendViaTiarNetwork address={id} />
    </div>
  );
};

export default WithDrawTiarDetailsPage;
