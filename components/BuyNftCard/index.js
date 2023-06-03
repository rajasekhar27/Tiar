const BuyNftCard = ({ img, title, creatorName, crypto, currency }) => {
  return (
    <div
      className={`background w-full h-[203px] rounded-md flex place-items-end p-3`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="h-[70px] rounded-lg bg-black/80 flex justify-between items-center p-3 w-full">
        <div className="font-medium ">
          <h5 className="text-[16px]">{title}</h5>
          <p className="text-[10px]">{creatorName}</p>
        </div>

        <div className="bg-ownOrange flex flex-col items-center w-[104px] h-[40px] text-[12px] rounded-lg">
          <p className="font-semibold ">{crypto}</p>
          <p>({currency})</p>
        </div>
      </div>
    </div>
  );
};

export default BuyNftCard;
