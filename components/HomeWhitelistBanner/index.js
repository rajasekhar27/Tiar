import { useDispatch } from "react-redux";
import { useGetWardroidsWhitelistCountQuery } from "../../store/apis/restApi";
import { openWhitelistConfirmationPopup } from "../../store/slices/whitelist";

const HomeWhitelistBanner = (props) => {
  const dispatch = useDispatch();

  const { data: wardroidsWhitelistCountData } =
    useGetWardroidsWhitelistCountQuery();

  const handleWhitelist = () => {
    dispatch(openWhitelistConfirmationPopup());
  };

  return (
    <div className="grid place-items-center my-5 relative">
      <div className="px-5">
        <img src="/images/whitelist_banner_1.png" alt="" />
      </div>

      <div className="absolute bottom-0 flex flex-col space-y-2 items-center mb-5">
        <h5 className="text-ownOrange font-bold text-[20px] mt-3">
          {wardroidsWhitelistCountData
            ? `${wardroidsWhitelistCountData?.filled} / ${wardroidsWhitelistCountData?.total_count} Claimed!`
            : "X / X Claimed!"}
        </h5>

        <a
          href="https://discord.com/invite/qv8sNb57mW"
          rel="noopener noreferrer"
          target="_blank"
        >
          <button
            className="text-white bg-[url('/images/frame_12.svg')] w-[219px] h-[35px] font-semibold text-[18px] m-auto mt-2"
            // onClick={handleWhitelist}
          >
            Get Whitelisted Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default HomeWhitelistBanner;
