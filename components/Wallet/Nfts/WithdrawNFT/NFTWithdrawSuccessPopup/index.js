import Modal from "../../../../UI/Modal";
import { MdOutlineClose } from "react-icons/md";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { closeNFTTransactionSuccessPopup } from "../../../../../store/slices/wallet";

const NFTWithdrawSuccessPopup = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.wallet.nftTransactionSuccessPopup.status
  );

  const handleClose = () => {
    router.push("/wallet");
    dispatch(closeNFTTransactionSuccessPopup());
  };

  return (
    <Modal
      isOpen={popupStatus}
      parentClasses={"grid place-items-center px-3 bg-black/50"}
    >
      <div className="max-w-[450px] w-full bg-ownBlue1 rounded-md p-3 text-white flex flex-col space-y-3 pb-5">
        <div className="self-end" onClick={handleClose}>
          <MdOutlineClose size={24} />
        </div>

        <Player
          autoplay
          loop
          src="/files/success.json"
          style={{ height: "300px", width: "250px" }}
        >
          <Controls visible={false} />
        </Player>

        <h4 className="text-[20px] font-[600] text-center">
          Done! Your transaction has been successfully processed!
        </h4>

        <button
          className="w-full bg-ownOrange h-[37px] rounded-md"
          onClick={handleClose}
        >
          Back to Wallet
        </button>
      </div>
    </Modal>
  );
};

export default NFTWithdrawSuccessPopup;
