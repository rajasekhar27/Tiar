import DropdownSelect from "../../../UI/DropDownSelect";
import Modal from "../../../UI/Modal";

const ChessMatchFiltersPopup = (props) => {
  return (
    <Modal isOpen={true} parentClasses={"bg-black/30 grid place-items-center"}>
      <div className="bg-ownBlue1 w-[335px] h-[300px] rounded-md px-3 py-10 flex flex-col space-y-3">
        <DropdownSelect />
        <DropdownSelect />
        <DropdownSelect />

        <button className="w-full">CONFIRM</button>
      </div>
    </Modal>
  );
};

export default ChessMatchFiltersPopup;
