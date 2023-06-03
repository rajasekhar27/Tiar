import { Listbox, Transition } from "@headlessui/react";
import { ImAlarm } from "react-icons/im";
import DropdownSelect from "../../../UI/DropDownSelect";

const OneVOneChess = () => {
  return (
    <div className="text-white px-5 flex flex-col space-y-3">
      <div className="flex items-center space-x-2 bg-white/20 rounded-md px-3 py-2 justify-between">
        <img
          src="/images/chess_logo_1.svg"
          alt=""
          srcset=""
          className="w-[29px]"
        />
        <p className="text-[18px] font-semibold">Play One-V-One Chess</p>

        <img
          src="/images/chess_logo_1.svg"
          alt=""
          srcset=""
          className="w-[29px] invisible"
        />
      </div>

      <div className="flex space-x-3 justify-center">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-[#F97F4E] to-[#E00A14] w-[119px] h-[44px] rounded-md justify-center">
          <ImAlarm size={25} />
          <p className="text-[16px] font-semibold">5 mins</p>
        </div>

        <div className="flex items-center space-x-2 bg-white/10 w-[119px] h-[44px] rounded-md justify-center">
          <ImAlarm size={25} />
          <p className="text-[16px] font-semibold">10 mins</p>
        </div>
      </div>

      <div className="grid place-items-center">
        <DropdownSelect parentClasses={"w-[254px]"} />
      </div>

      <div className="grid place-items-center">
        <button className="bg-ownOrange w-[254px] h-[32px] m-auto rounded-xl text-[18px] font-semibold">
          START GAME
        </button>
      </div>
    </div>
  );
};

export default OneVOneChess;
