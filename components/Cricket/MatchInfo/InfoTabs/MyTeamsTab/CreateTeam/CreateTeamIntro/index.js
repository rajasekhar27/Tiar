import { FiArrowRight } from "react-icons/fi";
import { AiOutlineLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../../../../../../store/slices/cricket";
import { useGetMatchDetailsQuery } from "../../../../../../../store/apis/restApi";
import { useRouter } from "next/router";

const CreateTeamIntro = (props) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { id } = router.query;

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

  return (
    <div className="p-5 ">
      <AiOutlineLeft
        color="white"
        size={25}
        className="mb-5"
        onClick={() => router.back()}
      />

      <div className="text-white flex flex-col item-center  space-y-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-[18px] text-ownOrange">
            Ready to create your team?
          </h1>
          <p className="font-medium text-[13px] mt-3">
            You will score points based on your selected player's real-life
            performance in this match
          </p>
        </div>

        <div className="flex items-center flex-col font-medium text-[12px] space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={matchDetailsData?.team1_flag}
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              alt=""
              className="max-h-[100px]"
            />
            <h5 className="uppercase mt-1">{matchDetailsData?.team1}</h5>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[24px] text-ownOrange">vs</p>
            {/* <p className="text-[12px]">1:30 pm</p> */}
          </div>

          <div className="flex flex-col items-center">
            <img
              src={matchDetailsData?.team2_flag}
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              alt=""
              className="max-h-[100px]"
            />
            <h5 className="uppercase mt-1">{matchDetailsData?.team2}</h5>
          </div>
        </div>

        <div className="bg-white rounded-md overflow-hidden text-black p-3 text-[14px] font-medium">
          <div className="p-3 flex flex-col space-y-2">
            <p>
              1 run = <span className="text-ownOrange">1 point</span>
            </p>
            <p>
              1 wicket = <span className="text-ownOrange">25 points</span>
            </p>
            <p>
              1 catch = <span className="text-ownOrange">8 points</span>
            </p>
          </div>

          <div className="w-full h-[2px] bg-gray-400"></div>

          <div className="flex items-center justify-between p-3">
            <p>View full point system</p>
            <FiArrowRight
              color="#FB6D3A"
              size={25}
              onClick={() => dispatch(setCurrentScreen(2))}
            />
          </div>
        </div>

        {matchDetailsData && matchDetailsData?.match_status !== "ONGOING" && (
          <button
            className="bg-ownOrange h-[40px] rounded-sm w-[200px] m-auto"
            onClick={() => dispatch(setCurrentScreen(3))}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTeamIntro;
