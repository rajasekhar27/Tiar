import { FaMobileAlt } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { RiContactsBook2Line } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useGetMobileVerificationStatusQuery } from "../../../store/apis/restApi";
import Router, { useRouter } from "next/router";

const ConnectWithFriends = (props) => {
  const { data: mobileVerificationData } =
    useGetMobileVerificationStatusQuery();

  const router = useRouter();

  const handleMobileVerification = () => {
    if (!mobileVerificationData) return;

    if (mobileVerificationData?.verified_status) return;

    router.push("/profile/verification/mobile");
  };

  return (
    <div className="mt-5">
      <h1 className="text-[16px] font-bold text-white mb-2">
        Connect with Friends:
      </h1>

      <div className="w-full glass-1 rounded-lg flex items-center justify-between p-3">
        <div
          className="flex flex-col items-center space-y-2 "
          onClick={handleMobileVerification}
        >
          <FaMobileAlt
            size={30}
            color={
              mobileVerificationData?.verified_status ? "#FB6D3A" : "white"
            }
          />
          <p
            className={`text-[12px]  ${
              mobileVerificationData?.verified_status
                ? "text-ownOrange"
                : "text-white"
            }`}
          >
            {mobileVerificationData?.verified_status ? "Verified" : "Verify"}
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 ">
          <FiFacebook size={30} color={"white"} />
          <p className="text-[12px] text-ownOrange">Connect</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <RiContactsBook2Line size={30} color={"white"} />
          <p className="text-[12px] text-ownOrange">My Contacts</p>
        </div>
        <div
          className="flex flex-col items-center space-y-2"
          onClick={() => router.push("/referal")}
        >
          <BsFillPersonPlusFill size={30} color={"white"} />
          <p className="text-[12px] text-ownOrange">Invite</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithFriends;
