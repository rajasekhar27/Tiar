import { useRouter } from "next/router";

const CreateTeam = ({ matchSlug }) => {
  return (
    <div className=" flex flex-col items-center mt-4 space-y-7 text-white">
      <div className="h-[356px] w-full grid place-items-center bg-[url('/images/team.svg')] bg-no-repeat bg-cover bg-center relative rounded-md overflow-hidden">
        <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-black/40"></div>
        <h5 className="font-bold text-[18px] z-[1]">
          You haven't created a team yet
        </h5>
      </div>

      <div className="flex flex-col items-center space-y-3">
        {/* <p className="text-[14px] font-medium">
          Click here to create your team
        </p> */}
        {/* <button
          className="bg-ownOrange w-[150px] h-[37px] rounded-sm text-[13px]"
          onClick={() => router.push(`/games/cricket/${matchSlug}/create-team`)}
        >
          Create Team
        </button> */}
      </div>
    </div>
  );
};

export default CreateTeam;
