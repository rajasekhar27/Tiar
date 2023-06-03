const NFTTab = (props) => {
  return (
    <div className="bg-white px-5 grid grid-cols-2 gap-y-4 w-full gap-x-5 pt-2">
      {new Array(10).fill(0).map((_, idx) => {
        return <NFTCard key={idx} />;
      })}
    </div>
  );
};

const NFTCard = () => {
  return (
    <div className="text-black text-[12px] w-[143px]">
      <img
        src="https://hellsbay.tiar.io/images/fight5.png"
        alt=""
        onError={(e) =>
          !e.target.onerror ? (e.target.src = "/images/tiar_logo_3.svg") : null
        }
        className="w-full h-[156px]"
      />

      <div className="flex justify-between mt-1">
        <div>
          <p className="font-medium">Wardroids</p>
          <p>by TIAR</p>
        </div>

        <div className="bg-ownOrange w-[50px] rounded-md flex flex-col items-center text-white">
          <p>0.35</p>
          <p>ETH</p>
        </div>
      </div>
    </div>
  );
};

export default NFTTab;
