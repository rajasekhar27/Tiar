import { globalConfig } from "../../../../data/gameInfoConfig";

const OtherImportantPoints = (props) => {
  return (
    <div className="p-5 text-white text-[12px]">
      <ul className="list-disc pl-5 mb-2">
        <li className="text-ownOrange">Rules about substitutes:</li>
        <div className="pl-3 flex flex-col space-y-3">
          <li>
            The announced Concussion, COVID-19, X-Factor or Impact Player
            substitutes will get{" "}
            <span className={`${globalConfig?.primaryTextColor}`}>
              0 points
            </span>
            for being announced. Out of the announced substitutes, ONLY those
            that will play will be awarded{" "}
            <span className={`${globalConfig?.primaryTextColor}`}>
              4 points
            </span>{" "}
            in addition to the points for all the contributions they make as per
            the Fantasy Point System.
          </li>
          <li>
            Substitutes apart from Concussion, COVID-19, X-Factor or Impact
            Player substitutes will not be awarded points for any contribution
            they make
          </li>
          <li>
            If a player gets replaced by an X-Factor or Impact Player
            substitute, but later comes back on field, they will get points for
            their contributions. However, if a player, who was not a part of the
            announced lineups, comes to the field as a substitute, they will not
            get points for any of their contributions (except Concussion,
            COVID-19, X-Factor and Impact Player substitutes).
          </li>
        </div>
      </ul>
      <ul className="list-disc pl-5 flex flex-col space-y-3">
        <li>
          A player who has been transferred from one team to the other might
          still be available for selection for his older team until the next
          scheduled team update on Fantasy Cricket. However, no points will be
          attributed to the player in such a situation.
        </li>
        <li>
          If a player is announced in the starting eleven of a team but later is
          unable to start the match, he/she will not score any points. The
          player who plays as the replacement, however, will earn points for the
          match (including starting points).
        </li>
        <li>
          No points will be awarded for any actions during a Super Over or a
          Super Five.
        </li>
        <li>
          Data is provided by reliable sources and once the match has been
          marked as completed i.e., winners have been declared, no further
          adjustments will be made. Points awarded live in-game are subject to
          change as long as the match status is 'In progress' or 'Waiting for
          review'.
        </li>
        <li>
          More than 11 players from either team are allowed to play in Other
          OD/Other T20/Other Test matches. No points will be awarded for Strike
          rate, Economy rate, or Maidens in ‘The Hundred’.
        </li>
        <li>
          As per official sources, runs scored off a ‘Mystery Ball’ will not be
          credited to the batter’s score and a batter will not get points for
          runs scored on this delivery for 6ixty.
        </li>
        <li>
          As per official sources, runs and wickets scored off a ‘Mystery Ball’
          will not be credited to the bowler’s figure and a bowler will not get
          or lose points for runs scored on this delivery for 6ixty.
        </li>
      </ul>
    </div>
  );
};

export default OtherImportantPoints;
