import { AiOutlineLeft } from "react-icons/ai";

const AddFunds = (props) => {
  return (
    <div className="p-5 text-white">
      <div className="flex items-center text-ownOrange space-x-3 mb-5">
        <AiOutlineLeft color="white" size={25} />
        <h5 className="font-semibold text-[18px]">Add Funds</h5>
      </div>

      <div className="flex justify-between items-center font-semibold text-[18px] mb-3">
        <h5>Current Balance</h5>
        <h5>₹ 00</h5>
      </div>

      <div className="text-[14px] mb-1 border-b-2 flex flex-col space-y-2 pb-2">
        <div className="flex justify-between items-center">
          <h5>Current Balance</h5>
          <h5>₹ 00</h5>
        </div>
        <div className="flex justify-between items-center ">
          <h5>Current Balance</h5>
          <h5>₹ 00</h5>
        </div>
      </div>

      <div className="flex justify-between items-center font-medium text-[14px]">
        <h5 className="text-ownOrange">Join this contest by adding</h5>
        <h5>₹ 00</h5>
      </div>

      <div className="font-bold text-[18px] flex justify-between mt-10">
        <h5>Amount to add:</h5>

        <p className="border-b">₹ 00</p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <button className="bg-ownOrange w-[142px] h-[37px] rounded-md text-[13px]">
          Add Crypto
        </button>
        <button className="bg-ownOrange w-[142px] h-[37px] rounded-md text-[13px]">
          Add INR
        </button>
      </div>
    </div>
  );
};

export default AddFunds;
