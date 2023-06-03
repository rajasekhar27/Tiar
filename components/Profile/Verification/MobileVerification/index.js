import { useRouter } from "next/router";
import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import {
  useRequestMobileVerificationOtpMutation,
  useVerifyMobileNumberMutation,
} from "../../../../store/apis/restApi";

const MobileVerification = (props) => {
  const router = useRouter();

  const [phone, setPhone] = useState();

  return (
    <div className="min-h-screen flex flex-col pt-3">
      <div className="px-5 flex items-center relative justify-center py-2">
        <BsChevronLeft
          color="white"
          onClick={() => router.back()}
          className="absolute left-5"
        />
        <h1 className="text-white text-[18px] font-bold uppercase ">
          Verification
        </h1>
      </div>
      {phone ? (
        <OTPInputScreen phone={phone} />
      ) : (
        <MobileInputScreen handlePhone={setPhone} />
      )}
    </div>
  );
};

const MobileInputScreen = ({ handlePhone }) => {
  const [phone, setPhone] = useState("");

  const [requestMobileVerificationOtp] =
    useRequestMobileVerificationOtpMutation();

  const handlePhoneInput = (e) => {
    if (
      (/[0-9]/.test(e.target.value) || e.target.value === "") &&
      e.target.value.toString().length <= 10
    ) {
      setPhone(e.target.value);
    }
  };

  const handleSendOtp = () => {
    if (!phone) return;

    if (phone.toString().length < 10) {
      toast.error("mobile number should not be less than 10 digits");
      return;
    }

    requestMobileVerificationOtp({
      phone: phone,
    }).then((res) => {
      if (res.data) {
        toast.success("OTP sent");
        handlePhone(phone);
      }

      if (res.error) {
        toast.error(JSON.stringify(res.error.data));
      }
    });
  };

  return (
    <div className="flex flex-col justify-between h-full flex-1 pb-10 px-5">
      <div>
        <h4 className="text-[18px] font-bold text-white mb-4">
          Enter your mobile number
        </h4>
        <div>
          <p className="text-[16px] font-medium text-white/50">Mobile</p>
          <input
            type="number"
            className="h-[48px] bg-transparent w-full bg-[url('/images/frame_14.svg')] px-3 text-white"
            placeholder="Ex: 9234567890"
            value={phone}
            onChange={handlePhoneInput}
          />
        </div>
      </div>

      <button
        className="bg-ownOrange h-[48px] w-full rounded-md text-[16px] font-medium text-white"
        onClick={handleSendOtp}
      >
        Send OTP
      </button>
    </div>
  );
};

const OTPInputScreen = ({ phone }) => {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const [verifyMobileNumber] = useVerifyMobileNumberMutation();

  const handleOtp = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    if (otp.length !== 4) return;

    verifyMobileNumber({
      phone: phone,
      otp: otp,
    }).then((res) => {
      if (res.data) {
        toast.success("Verified Successfully");
        router.push("/profile");
      }

      if (res.error) {
        toast.error(`something went wrong. ${JSON.stringify(res.error.data)}`);
      }
    });
  };

  return (
    <div className="text-white flex flex-col justify-between h-full flex-1 pb-10 px-5">
      <div>
        <h4 className="text-[18px] font-bold my-2">Enter OTP</h4>
        <p className="text-white/50 text-[14px]">
          We’ve have sent you a One Time Password to your mobile number
        </p>
        <p className="font-bold text-[14px] mb-2 mt-5">Enter OTP</p>
        <OtpInput
          value={otp}
          onChange={handleOtp}
          numInputs={4}
          isInputNum={true}
          separator={<span></span>}
          containerStyle={"space-x-5 justify-center"}
          inputStyle={
            "bg-[url('/images/frame_15.svg')] rounded-md !w-[46px] h-[46px] bg-transparent text-white"
          }
        />
      </div>

      <button
        className="bg-ownOrange h-[48px] w-full rounded-md text-[16px] font-medium text-white"
        onClick={handleVerify}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default MobileVerification;
