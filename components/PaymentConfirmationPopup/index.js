import { useDispatch, useSelector } from "react-redux";
import { closePaymentConfirmationPopup } from "../../store/slices/games";
import Modal from "../UI/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PaymentConfirmationPopup = (props) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.games.paymentConfirmationPopup.status
  );

  return (
    <Modal
      isOpen={popupStatus}
      parentClasses="grid place-items-center bg-black/50"
      close={() => dispatch(closePaymentConfirmationPopup())}
    >
      <div
        className="relative bg-ownBlue1 m-auto p-5 rounded-lg py-10 animate__animated animate__zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3">
          <AiOutlineCloseCircle
            color="#FB6D3A"
            size={25}
            onClick={() => dispatch(closePaymentConfirmationPopup())}
          />
        </div>

        <img src="/images/payment_confirmation.svg" alt="" />
        <h1 className="text-[24px] font-semibold text-ownOrange mt-10 text-center">
          Joined Successfully!
        </h1>
      </div>
    </Modal>
  );
};

export default PaymentConfirmationPopup;
