import Modal from "../../UI/Modal";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeChooseNetworkPopup } from "../../../store/slices/wallet";

const ChooseNetworkPopup = (props) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.wallet.chooseNetworkPopup.status
  );

  return (
    <Modal isOpen={popupStatus} parentClasses={"bg-black/40 flex items-end"}>
      <div className="bg-white text-black rounded-t-md w-full p-5 animate__animated animate__slideInUp animate__faster">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-medium text-[20px] text-ownOrange">
              Choose Network
            </p>
            <p className="text-[12px]">Lorem ipsum dolor sit amet</p>
          </div>

          <FaTimes onClick={() => dispatch(closeChooseNetworkPopup())} />
        </div>

        <div>
          <div className="font-medium text-[16px] py-2 border-b border-black">
            <p>Bitcoin</p>
          </div>
          <div className="font-medium text-[16px] py-2 border-b border-black">
            <p>Ethereum (ERC 20)</p>
          </div>
          <div className="font-medium text-[16px] py-2 border-b border-black">
            <p>Polygon</p>
          </div>
          <div className="font-medium text-[16px] py-2 border-b border-black">
            <p>BNB smart chain (BEP20)</p>
          </div>
        </div>

        <div className="grid place-items-center py-5 mt-3">
          <button className="w-[124px] h-[37px] bg-ownOrange rounded-md text-white">
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChooseNetworkPopup;
