import ReactPlayer from "react-player";
import {
  createTeamConfig,
  globalConfig,
} from "../../../../data/gameInfoConfig";

const CreateYourTeam = (props) => {
  return (
    <div className="px-5 flex flex-col items-center space-y-7 text-white text-[14px] my-5">
      {/* <div className="rounded-xl overflow-hidden">
        <ReactPlayer
          url={createTeamConfig?.video1}
          width={"279px"}
          height={"132px"}
        />
      </div> */}

      {/* <img
        src={createTeamConfig?.img1}
        alt=""
        className="w-[166px] h-[282px] rounded-md m-auto object-cover"
      /> */}

      <ul className="list-disc list-inside">
        <li>
          Every Cricket team you build on Fantasy Cricket must have{" "}
          <span className={`${globalConfig?.primaryTextColor}`}>
            11 players.
          </span>
        </li>
        <li>
          A maximum of{" "}
          <span className={`${globalConfig?.primaryTextColor}`}>7 players</span>{" "}
          can be selected from any one of the teams
        </li>
      </ul>

      <div>
        <h6 className={`${globalConfig?.primaryTextColor}`}>
          Players Combinations
        </h6>
        <ul className="list-disc list-inside">
          <li>
            Your Fantasy Cricket team has to be within the
            <span className={`${globalConfig?.primaryTextColor}`}>
              {" "}
              100 credit cap
            </span>
          </li>
          <li>Your team can have different combinations of players</li>
        </ul>
      </div>

      <p>Your team must qualify the following team selection criteria</p>

      {/* <img
        src={createTeamConfig?.img2}
        alt=""
        className="w-[279px] h-[182px] rounded-md"
      /> */}

      <h5
        className={`font-medium text-[18px] ${globalConfig?.primaryTextColor} self-start`}
      >
        Captain and Vice - Captain Points
      </h5>

      {/* <img
        src={createTeamConfig?.img3}
        alt=""
        className="w-[166px] h-[282px] object-cover rounded-md"
      /> */}

      <div className="flex flex-col space-y-3">
        <p>
          Once you have selected your 11 players, you will have to assign a
          captain and vice-captain for your team.
        </p>
        <p>
          The captain will give you{" "}
          <span className={`${globalConfig?.primaryTextColor}`}>2x points</span>{" "}
          scored by them in the actual match.
        </p>
        <p>
          The vice-captain will give you{" "}
          <span className={`${globalConfig?.primaryTextColor}`}>
            1.5x points
          </span>{" "}
          scored by them in the actual match
        </p>
      </div>

      <div
        className={`w-[279px] h-[200px] border-2 rounded-xl p-5 ${globalConfig?.primaryTextColor} ${globalConfig?.primaryBorder}`}
      >
        <p>
          The Captained By (% C By) and Vice-Captained By (% VC By) stats help
          you understand how other players have chosen their teams.
        </p>
        <p className="mt-3">
          Choose a popular pick as captain, or find a differential to score big
          against your competition.
        </p>
      </div>

      <p className="self-start">For a detailed point system, check below:</p>
    </div>
  );
};

export default CreateYourTeam;
