import Modal from "../../../UI/Modal";

const SendChargesCryptoNetworkPopup = (props) => {
  return (
    <Modal isOpen={true} parentClasses={"bg-black/40 flex items-end"}>
      <div className="bg-white text-black rounded-t-md w-full p-5 animate__animated animate__slideInUp animate__faster pb-20">
        <div className="flex items-center space-x-3 text-[12px]">
          <p className="font-medium w-[90px]">Receive Amount</p>
          <p>: 00.00 USDT</p>
        </div>

        <div className="flex items-center space-x-3 text-[12px] mt-5">
          <p className="font-medium w-[90px]">Network fee</p>
          <p>: 00.00 USDT</p>
        </div>

        <button className="w-[124px] h-[37px] bg-ownOrange rounded-md text-white mt-5">
          Withdraw
        </button>
      </div>
    </Modal>
  );
};

export default SendChargesCryptoNetworkPopup;
