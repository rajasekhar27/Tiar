import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";
import { ImInfo } from "react-icons/im";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import { useGetUserProfileDetailsQuery } from "../../../store/apis/restApi";
import { profileShuffle } from "../../../helpers/profileShuffle";
import OneVOneChess from "./OneVOneChess";
import TournamentChess from "./TournamentChess";

const GameSelection = (props) => {
  return (
    <div className="">
      <Header />

      <OneVOneChess />

      <div className="w-[calc(100%-2.5rem)] m-auto my-5 px-5 h-[2px] bg-white/50"></div>

      <TournamentChess />

      <img src="/images/chess_1.svg" alt="" className="fixed bottom-0" />
    </div>
  );
};

const Header = () => {
  const router = useRouter();

  const { data: userData } = useGetUserProfileDetailsQuery();

  return (
    <div className="px-5 my-5">
      <div className="flex justify-between items-center h-[30px]  relative">
        <div className="flex space-x-3">
          <BsChevronLeft color="white" onClick={() => router.back()} />
        </div>

        <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <img src="/images/tiar_logo_1.svg" alt="" className="h-[12px]" />
          </Link>
          <p className="font-semibold text-[18px] text-white">Chess</p>
        </div>

        <div className="flex space-x-3 items-center">
          <FiBell
            size={19}
            color="white"
            onClick={() => router.push("/notifications")}
          />
          <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                userData?.user_profile?.image
                  ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                  : profileShuffle()
              }
              className="w-full h-full bg-white"
              alt=""
              onClick={() => router.push(`/profile`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
