const BoxerBio = ({ data }) => {
  return (
    <div className="p-5 px-10">
      <h1 className="bg-gradient-to-r from-[#FF3D53] to-ownPurple1 bg-clip-text text-transparent max-w-min text-[20px] font-[700]">
        BIO
      </h1>

      <div className="mt-5">
        <DetailsRow title={"Status"} stat={"Active"} />
        <DetailsRow title={"Hometown"} stat={data?.boxer?.native_place} />
        <DetailsRow title={"Trains at"} stat={data?.boxer?.gym_traying} />
        <DetailsRow
          title={"Fighting Style"}
          stat={data?.boxer?.boxing_stance}
        />
        <div className="flex justify-between p-2 border-b font-[600] border-[#8C8C8C] py-4">
          <div className="flex flex-col items-center ">
            <p className="text-white">AGE</p>
            <p className="uppercase text-ownPurple1">{data?.boxer?.age}</p>
          </div>
          <div className="flex flex-col items-center ">
            <p className="text-white">HEIGHT</p>
            <p className="uppercase text-ownPurple1">{data?.height}</p>
          </div>
          <div className="flex flex-col items-center ">
            <p className="text-white">WEIGHT</p>
            <p className="uppercase text-ownPurple1">{data?.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailsRow = ({ title, stat }) => {
  return (
    <div className="flex justify-between text-[14px] p-2 border-b font-[600] border-[#8C8C8C] py-4 w-full">
      <p className="text-white whitespace-nowrap ">{title}</p>
      <p className="uppercase text-ownPurple1 inline max-w-[50%] text-end">
        {stat}
      </p>
    </div>
  );
};

export default BoxerBio;
