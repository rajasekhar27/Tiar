import { buyNftData } from "../../data/buyNftData";
import BuyNftCard from "../BuyNftCard";

const BuyNftCards = (props) => {
  return (
    <div className="my-7">
      <h1 className="font-semibold text-[18px] mb-4">Buy NFTs</h1>

      <div className="flex flex-col space-y-5 items-center">
        {buyNftData?.map((n) => {
          return (
            <BuyNftCard
              key={n.id}
              title={n.title}
              creatorName={n.creatorName}
              crypto={n.crypto}
              currency={n.currency}
              img={n.img}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BuyNftCards;
