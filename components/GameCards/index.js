import { gamesData } from "../../data/gamesData";
import GameCard from "../GameCard";

const GameCards = ({ type }) => {
  const finalData =
    type === 1
      ? gamesData?.filter((g) => g.type === 1)
      : type === 2
      ? gamesData?.filter((g) => g.type === 2)
      : gamesData;

  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-2 w-full gap-y-5 gap-5 justify-between">
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
    </div>
  );
};

export default GameCards;
