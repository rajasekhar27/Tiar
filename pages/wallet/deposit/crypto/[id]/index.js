import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../../../../../components/UI/Loader";

import Deposit from "../../../../../components/Wallet/Deposit";
import { useValidateAddressQuery } from "../../../../../store/apis/restApi";

const CryptoDepositDetails = (props) => {
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
      <Deposit address={id} />
    </div>
  );
};

export default CryptoDepositDetails;
