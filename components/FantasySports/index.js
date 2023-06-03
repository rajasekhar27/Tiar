import GameCard from "./GameCard";
import { gamesData } from "../../data/gamesData";

const FantasySports = (props) => {
  const finalData = gamesData?.filter((g) => g.type === 1);

  return (
    <div className=" flex flex-col space-y-5">
      {finalData?.map((g) => {
        return (
          <GameCard
            key={g.id}
            gameName={g.title}
            img={g.img}
            playerCount={g.playerCount}
            route={g.route}
            isLive={g.isLive}
          />
        );
      })}
    </div>
  );
};

export default FantasySports;
