import { Fragment } from "react";
import ReactPlayer from "react-player";
import PlayerTable from "./playerTable";
import { BiBulb } from "react-icons/bi";

export default function CreatingYourTeam() {
  return (
    <Fragment>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        playing={false}
        volume={1}
        width="100%"
        height="100%"
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
        onReady={() => console.log("ready now")}
        muted
        loop
      />

      <div
        className="m-auto mt-5 mb-5 shadow-lg"
        style={{
          width: "166px",
          height: "282px",
          borderRadius: "10px!important",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          className=" shadow-lg"
          url="/videos/team.mp4"
          style={{
            objectFit: "contain",
            objectPosition: "center",
            borderRadius: "10px!important",
          }}
          muted
          playing={true}
          loop
        />
      </div>

      <div className="mt-2">
        <h3 className="font-semibold">Player Combinations</h3>
        <ul>
          <li className="font-thin">
            Your Fantasy Cricket team has to be within the 100{" "}
            <span>Credit Cap</span>
          </li>
        </ul>
      </div>
      <PlayerTable />

      <div className="w-100%">
        <h1 className="font-bold text-black text-lg">
          Captain and Vice-Captain Points
        </h1>
        <div
          className="m-auto mt-5 mb-5"
          style={{ width: "166px", height: "282px" }}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            url="/videos/captain.mp4"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              borderRadius: "8px",
            }}
            muted
            playing={true}
            loop
          />
        </div>
      </div>

      <p>description.............</p>

      <div
        className="w-100% rounded-md bg-slate-100 mt-3 mb-3"
        style={{ border: "1px solid #F97F4E" }}
      >
        <p className="mb-2">
          The Captained By (% C By) and Vice-Captained By (% VC By) stats help
          you understand how other players have chosen their teams.
        </p>
        <p>
          Choose a popular pick as captain, or find a differential to score big
          against your competition.
        </p>
      </div>

      <p className="text-black text-xs">
        For a detailed point system, check below:
      </p>
    </Fragment>
  );
}
