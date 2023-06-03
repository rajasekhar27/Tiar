import Link from "next/link";
import { FiGift } from "react-icons/fi";

const InviteFriends = (props) => {
  return (
    <Link href={"/referal"}>
      <div
        className="w-full h-[61px] bg-gradient-to-r from-ownOrange via-ownOrange to-transparent rounded-lg my-5 p-3 flex items-center space-x-3 justify-center"
        style={{
          webkitBoxShadow: "-3px 0px 20px -1px rgba(128,128,128,1)",
          mozBoxShadow: "-3px 0px 20px -1px rgba(128,128,128,1)",
          boxShadow: "-3px 0px 20px -1px rgba(128,128,128,1)",
        }}
      >
        <FiGift size={32} color="white" />
        <h1 className="text-white text-[16px]">
          Invite <span className="font-bold ">FRIENDS</span> to{" "}
          <span className="font-bold ">WIN REWARDS</span>
        </h1>
      </div>
    </Link>
  );
};

export default InviteFriends;
