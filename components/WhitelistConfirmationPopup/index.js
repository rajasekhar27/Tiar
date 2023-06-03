import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import { ImCross } from "react-icons/im";
import {
  closeWhitelistConfirmationPopup,
  openWhitelistGreetingPopup,
} from "../../store/slices/whitelist";
import {
  useGetWhitelistPayDetailsQuery,
  useRequestWhitelistSpotMutation,
} from "../../store/apis/restApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const WhitelistConfirmationPopup = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const popupStatus = useSelector(
    (state) => state.whitelist.whitelistConfirmationPopup.status
  );

  const { data: whitelistPayDetailsData } = useGetWhitelistPayDetailsQuery();
  const [requestWhitelistSpot] = useRequestWhitelistSpotMutation();

  const handleClose = () => {
    dispatch(closeWhitelistConfirmationPopup());
  };

  const handleConfirm = () => {
    requestWhitelistSpot({}).then((res) => {
      if (res.data) {
        dispatch(openWhitelistGreetingPopup());
      }

      if (res.error) {
        toast.error("something went wrong");
        router.push("/wallet");
      }
      handleClose();
    });
  };

  return (
    <Modal
      isOpen={popupStatus}
      parentClasses="bg-black/40 grid place-items-center"
    >
      <div className="w-[320px] rounded-lg py-4 px-5 bg-[url('/images/wardroids_frame_2.svg')] relative text-white flex flex-col items-center z-[-1]">
        <h1 className="text-ownOrange font-bold text-[24px] text-center mb-3">
          CONFIRMATION
        </h1>
        <div className="absolute right-6 top-6">
          <ImCross color="white" onClick={handleClose} />
        </div>

        <div className="w-[171px] h-[220px] rounded-lg overflow-hidden bg-gradient-to-br from-[#FF3D54] via-[#D74FA3] to-[#000000] p-[2px]">
          <img src="/images/wardroids_hidden.svg" alt="" />
          <div className="h-full bg-[#313054] flex flex-col items-center">
            <p className="text-[16px] text-ownOrange font-semibold">
              Wardroids #0
            </p>
            <p className="text-[14px]">Wardroids by TIAR</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-[16px] mt-4 w-full">
          <p>Price</p>
          <p>${whitelistPayDetailsData?.price}</p>
        </div>
        <div className="flex justify-between items-center text-[16px] mt-3 w-full">
          <p>Your Balance</p>
          <p>${whitelistPayDetailsData?.wallet_balance}</p>
        </div>

        <div className="text-[16px] flex items-center justify-between border-t border-white/50 pt-2 mt-5 w-full">
          <p className="font-medium">To Pay</p>
          <p className=" font-bold text-[#04DC00]">
            ${whitelistPayDetailsData?.to_pay}
          </p>
        </div>
        <div className="m-auto flex items-center flex-col space-y-2 mt-4">
          <button
            className="w-full px-5 h-[43px] rounded-md bg-[#7b7d7d] font-semibold text-[18px]"
            // onClick={handleConfirm}
          >
            SALE STARTING SOON
          </button>
          <button
            className="w-[168px] h-[43px] rounded-lg font-semibold text-[18px]"
            onClick={handleClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WhitelistConfirmationPopup;
