import Modal from "../../../UI/Modal";

const SendChargesTiarNetworkPopup = (props) => {
  return (
    <Modal isOpen={true} parentClasses={"bg-black/40 flex items-end"}>
      <div className="bg-white text-black rounded-t-md w-full p-5 animate__animated animate__slideInUp animate__faster pb-20">
        <div className="flex items-center space-x-3 text-[12px]">
          <p className="font-medium">Total Amount</p>
          <p>: 00.00USDT</p>
        </div>

        <div className="text-[12px] mt-3">
          <p>*No fees</p>
        </div>

        <button className="w-[124px] h-[37px] bg-ownOrange rounded-md text-white mt-5">
          Send
        </button>
      </div>
    </Modal>
  );
};

export default SendChargesTiarNetworkPopup;
