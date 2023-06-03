import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { closeWhitelistGreetingPopup } from "../../store/slices/whitelist";
import Modal from "../UI/Modal";

const WhitelistGreetingPopup = (props) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.whitelist.whitelistGreetingPopup.status
  );
  return (
    <Modal
      isOpen={popupStatus}
      parentClasses="bg-black/40 grid place-items-center"
    >
      <div className="w-[320px] rounded-lg relative text-white flex flex-col items-center p-5 bg-[url('/images/wardroids_frame_2.svg')]">
        <h1 className="text-ownOrange font-bold text-[24px] text-center mb-3">
          CONFIRMATION
        </h1>
        <div className="absolute right-5 top-7">
          <ImCross
            color="white"
            onClick={() => dispatch(closeWhitelistGreetingPopup())}
          />
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

        <div className=" text-[16px] mt-4 w-full">
          <p className="text-ownOrange font-semibold text-[16px]">
            Next Steps:
          </p>
          <ul className="list-disc pl-5">
            <li>
              You will be added to a private group which is exclusive to the NFT
              holders
            </li>
            <li>
              HFL Governing Council will share regular updates regarding the
              league
            </li>
            <li>You are invited to HFL’s launch party</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default WhitelistGreetingPopup;
