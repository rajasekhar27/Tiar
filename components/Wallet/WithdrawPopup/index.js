import Modal from "../../UI/Modal";
import { FaTimes } from "react-icons/fa";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { closeWithdrawPopup } from "../../../store/slices/wallet";

const WithdrawPopup = (props) => {
  const [selected, setSelected] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const popupStatus = useSelector((state) => state.wallet.withdrawPopup.status);
  const helperData = useSelector(
    (state) => state.wallet.withdrawPopup.helperData
  );

  const handleSelection = (val) => {
    // if (val === "1") {
    //   router.push(`/wallet/withdraw/crypto/${helperData?.address}`);
    // } else {
    //   router.push(`/wallet/withdraw/tiar/${helperData?.address}`);
    // }

    setSelected(val);

    // dispatch(closeWithdrawPopup());
  };

  const handleProceed = () => {
    if (!selected) return;
    if (selected === "1") {
      router.push(`/wallet/withdraw/crypto/${helperData?.address}`);
    } else {
      router.push(`/wallet/withdraw/tiar/${helperData?.address}`);
    }

    dispatch(closeWithdrawPopup());
  };

  return (
    <Modal isOpen={popupStatus} parentClasses={"bg-black/40 flex items-end"}>
      <div className="bg-ownBlue1 text-white rounded-t-md w-full p-5 animate__animated animate__slideInUp animate__faster pb-5 max-w-[450px]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-medium text-[20px]">Withdraw</p>
          </div>

          <FaTimes onClick={() => dispatch(closeWithdrawPopup())} />
        </div>

        <div>
          <RadioGroup value={selected} onChange={(val) => handleSelection(val)}>
            <RadioGroup.Option value={"1"}>
              {({ checked }) => (
                <div
                  className={`flex items-center space-x-3 ${
                    "" // checked && "text-ownGreen2"
                  }`}
                >
                  {checked ? (
                    <BsCircleFill className="text-ownOrange" />
                  ) : (
                    <BsCircle />
                  )}
                  <div>
                    <p className="font-medium text-[14px]">
                      Send via Crypto Network
                    </p>
                    <p className="text-[8px]">
                      send to a known crypto address via crypto network
                    </p>
                  </div>
                </div>
              )}
            </RadioGroup.Option>

            <div className="w-full h-[1px] bg-white my-3"></div>
            <RadioGroup.Option value={"2"}>
              {({ checked }) => (
                <div
                  className={`flex items-center space-x-3 ${
                    "" // checked && "text-ownGreen2"
                  }`}
                >
                  {checked ? (
                    <BsCircleFill className="text-ownOrange" />
                  ) : (
                    <BsCircle />
                  )}
                  <div>
                    <p className="font-medium text-[14px]">
                      Send via TIAR Network (Email ID)
                    </p>
                    <p className="text-[8px]">
                      send to TIAR user, Easy, Instant, 0 fee
                    </p>
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>

        <div className="grid place-items-center py-5 mt-3">
          <button
            className="w-full h-[37px] bg-ownOrange rounded-md text-white"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawPopup;
