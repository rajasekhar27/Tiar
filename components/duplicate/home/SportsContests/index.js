import moment from "moment";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import { getWalletType } from "../../../../helpers/getWalletType";
import { useGetMegaContestsQuery } from "../../../../store/apis/restApi";

const SportsContests = (props) => {
  const { data: megaContestsData } = useGetMegaContestsQuery({
    limit: 20,
    offset: 0,
  });

  return (
    <div>
      <h1 className="text-white mb-2 mt-2 text-[16px] font-semibold">
        Fantasy Sports Contests
      </h1>

      <Scrollbars style={{ width: "100%", height: "120px" }}>
        <div className="flex space-x-3">
          {megaContestsData?.results.map((c, idx) => (
            <Card key={idx} odd={idx % 2 === 0 ? false : true} data={c} />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

const Card = ({ odd, data }) => {
  const router = useRouter();

  const getDay = (id) => {
    const days = {
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
      7: "SUN",
    };

    return days[id];
  };

  return (
    <div
      className={`w-[144px] h-[93px] relative shrink-0 bg-[url('/images/frame_11.svg')] flex bg-cover animate__animated animate__zoomIn`}
      onClick={() => router.push(`/games/cricket/contest/${data?.slug}`)}
    >
      <div className="w-[29px] h-[29px] bg-white rounded-md absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
        <p className="text-[10px] font-medium">
          {moment(`20${data?.match?.ist_time.split(" ")[0]}`).date()}
        </p>
        <p className="text-[8px]">
          {data?.match?.ist_time &&
            getDay(moment(`20${data?.match?.ist_time.split(" ")[0]}`).day())}
        </p>
      </div>

      <div className="w-[102px] h-[22px] rounded-md overflow-hidden bg-ownOrange absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center ">
        <div
          className="bg-[#E10E16] w-1/2 text-white text-[10px] font-medium grid place-items-center h-full"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
        >
          <p>MEGA</p>
        </div>

        <div className="w-1/2 grid place-items-center">
          <div className="font-medium text-[10px] text-white flex items-center space-x-1">
            <img
              src={getWalletType(data?.coin)?.img}
              alt=""
              className="max-h-[10px]"
            />
            <p>{data?.prize_pool}</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 grid place-items-center relative">
        <div
          className={`w-[50px] h-[50px] ${
            odd ? "bg-ownOrange" : "bg-red-600"
          } rounded-2xl blur-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
        ></div>
        <div className="flex flex-col items-center text-[10px] font-medium text-white z-[1]">
          <img
            src={data?.match?.team1_image}
            alt=""
            className="w-[31px] h-[27px] object-cover"
          />
          <p>{data?.match?.team1}</p>
        </div>
      </div>

      <div className="w-1/2 grid place-items-center relative">
        <div
          className={`w-[50px] h-[50px] ${
            odd ? "bg-ownOrange" : "bg-red-600"
          } rounded-2xl blur-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
        ></div>
        <div className="flex flex-col items-center text-[10px] font-medium text-white z-[1]">
          <img
            src={data?.match?.team2_image}
            alt=""
            className="w-[31px] h-[27px]  object-cover"
          />
          <p className="">{data?.match?.team2}</p>
        </div>
      </div>
    </div>
  );
};

export default SportsContests;
