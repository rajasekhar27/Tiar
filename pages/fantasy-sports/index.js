import FantasySports from "../../components/FantasySports";
import { FiBell } from "react-icons/fi";
import { useGetUserProfileDetailsQuery } from "../../store/apis/restApi";

const FantasySportsPage = (props) => {
  const { data: userData } = useGetUserProfileDetailsQuery();

  return (
    <div className="px-5">
      <div className="flex justify-end items-center h-[30px] my-7 relative">
        <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/images/tiar_logo_1.svg" alt="" className="h-[12px]" />
          <p className="font-semibold text-[18px] text-white">Fantasy Sports</p>
        </div>

        <div className="flex space-x-3 items-center">
          <FiBell
            size={19}
            color="white"
            onClick={() => router.push("/notifications")}
          />
          <div
            className="w-[35px] h-[35px] overflow-hidden rounded-full"
            onClick={() => router.push("/profile")}
          >
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                userData?.user_profile?.image
                  ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                  : `/images/profile_default_1.svg`
              }
              className="w-full h-full bg-white"
              alt=""
            />
          </div>
        </div>
      </div>

      <FantasySports />

      <div className="h-[100px]"></div>
    </div>
  );
};

export default FantasySportsPage;
