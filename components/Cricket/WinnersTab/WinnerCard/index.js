import { useRouter } from "next/router";
import { IoTrophyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { profileShuffle } from "../../../../helpers/profileShuffle";

const WinnerCard = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white w-full rounded-md text-black pb-2 animate__animated animate__zoomIn"
      onClick={() => router.push(`/games/cricket/winners/${data?.slug}`)}
    >
      <div className="flex text-[10px] px-3 justify-between py-2">
        <p className="text-[#787878] truncate w-[80%]">{data?.description}</p>
        <p>{data?.date?.split("T")[0]}</p>
      </div>

      <div className="flex justify-between items-center px-3 bg-[#EFEFEF] py-2">
        <TeamView
          name={data?.team_1?.team_name}
          sName={data?.team_1?.team_s_name}
          img={data?.team_1?.image_url}
        />
        <p className="text-[10px]">VS</p>
        <TeamView
          right={true}
          name={data?.team_2?.team_name}
          sName={data?.team_2?.team_s_name}
          img={data?.team_2?.image_url}
        />
      </div>

      <div>
        <div className="flex items-center space-x-1 text-[14px] font-semibold px-2 pt-2">
          <IoTrophyOutline />
          <h6>{data?.contest_details?.price}</h6>
        </div>

        <div className="flex overflow-x-auto space-x-2 p-2">
          {data?.contest_details?.winners?.[0]?.user?.map((i, idx) => (
            <WinnerProfile key={idx} data={i} rank={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamView = ({ right, name, sName, img }) => {
  return (
    <div className="text-[14px] w-[40%] shrink-0 truncate">
      <h6 className={`${right && "text-end"}`}>{name}</h6>
      <div
        className={`flex  items-center space-x-2 ${
          right && "flex-row-reverse space-x-reverse"
        }`}
      >
        <img src={img} alt="" className="max-w-[33px]" />
        <h6 className="font-semibold">{sName}</h6>
      </div>
    </div>
  );
};

const WinnerProfile = ({ data, rank }) => {
  const router = useRouter();
  const loggedUserSlug = useSelector((state) => state.auth.user.user_slug);

  const handleRedirect = (e) => {
    e.stopPropagation();
    if (loggedUserSlug === data?.slug) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/user/${data?.slug}`);
  };

  return (
    <div
      className="w-[95px] h-[122px] rounded-md bg-white shadow-2xl overflow-hidden flex flex-col justify-between shrink-0"
      onClick={handleRedirect}
    >
      <div className="p-1">
        <h5 className="text-[14px] font-medium">Rank #{rank}</h5>
        <p className="truncate text-[11px]">{data?.name}</p>
      </div>

      <div className="w-[50px] h-[50px] rounded-full overflow-hidden m-auto">
        <img
          src={
            data?.image
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data?.image}`
              : profileShuffle()
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-[#f97f4e] text-center py-[2px]">
        <h6 className="text-[14px] font-semibold">Won {data?.won_amount}</h6>
      </div>
    </div>
  );
};

export default WinnerCard;
