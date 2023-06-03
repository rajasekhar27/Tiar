import { useRouter } from "next/router";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { useEmailRegistrationOtpVerificationMutation } from "../../../store/apis/restApi";
import { FaAngleLeft } from "react-icons/fa";
import { clearEmail } from "../../../store/slices/login";
import { useDispatch } from "react-redux";

const Otp = ({ email, handleSetDetails }) => {
  const [isLoader, setIsLoader] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [emailRegistrationOtpVerification] =
    useEmailRegistrationOtpVerificationMutation();

  const handleOtp = (value) => {
    setOtp(value);
  };

  const handleSubmit = () => {
    if (!otp) return;
    if (otp.length < 4) return;
    setIsLoader(true);
    setDisabled(true);

    emailRegistrationOtpVerification({
      data: {
        email: email,
        otp: otp,
      },
    }).then((res) => {
      if (res.data) {
        setIsLoader(false);
        toast.success("otp verified");
        handleSetDetails(true);
      }

      if (res.error) {
        setIsLoader(false);
        toast.error(`Please enter Valid OTP`);
      }

      setDisabled(false);
    });
  };

  const handleBack = () => {
    dispatch(clearEmail());
    router.back();
  };

  return (
    <div className="py-20 px-5 flex flex-col justify-between min-h-screen">
      <div>
        <FaAngleLeft
          color="#FB6D3A"
          size={25}
          onClick={handleBack}
          className="mb-5"
        />

        <h1 className="text-ownOrange font-bold text-[24px]">Enter Code</h1>
        <h6 className="font-light text-white mt-5">
          Enter the code sent on your email
        </h6>
      </div>

      <OtpInput
        value={otp}
        onChange={handleOtp}
        numInputs={4}
        isInputNum={true}
        separator={<span></span>}
        containerStyle={"space-x-5 justify-center"}
        inputStyle={
          "bg-transparent rounded-md !w-[46px] h-[46px] border-[1px] border-white text-white"
        }
      />

      <div className="flex flex-col items-center space-y-5 text-white">
        <button
          className="w-[150px] h-[37px] bg-ownOrange rounded-sm flex flex-col justify-center items-center"
          onClick={handleSubmit}
          disabled={isLoader}
        >
          {isLoader ? (
            <div
              className="refresh-loader"
              style={{ color: "white", width: "20px" }}
            ></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default Otp;
