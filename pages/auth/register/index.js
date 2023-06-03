import { useState } from "react";

import Register from "../../../components/Register";
import DetailsCollection from "../../../components/Register/DetailsCollection";
import Otp from "../../../components/Register/Otp";

const RegisterPage = (props) => {
  const [otp, setOtp] = useState(false);
  const [details, setDetails] = useState(false);
  const [email, setEmail] = useState(null);

  const handleSetOtp = (value) => {
    setOtp(value);
  };

  const handleSetDetails = (value) => {
    setDetails(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handleReset = () => {
    setOtp(false);
    setDetails(false);
    setEmail("");
  };

  return (
    <div className="bg-[url('/images/tiar_logo_2.svg')] bg-no-repeat bg-left-bottom">
      {!otp ? (
        <Register handleSetOtp={handleSetOtp} handleEmail={handleEmail} />
      ) : !details ? (
        <Otp handleSetDetails={handleSetDetails} email={email} />
      ) : (
        <DetailsCollection handleReset={handleReset} email={email} />
      )}

      {/* <img
        src="/images/tiar_logo_2.svg"
        alt=""
        className="fixed left-0 bottom-0 z-[-1]"
      /> */}
    </div>
  );
};

export default RegisterPage;
