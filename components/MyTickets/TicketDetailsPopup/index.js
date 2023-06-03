import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ISTFormat3 from "../../../helpers/ISTFormat3";
import { useGetTicketDetailsQuery } from "../../../store/apis/restApi";
import { closeTicketDetailsPopup } from "../../../store/slices/support";
import Modal from "../../UI/Modal";

const TicketDetailsPopup = (props) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.support.ticketDetailsPopup.status
  );
  const helperData = useSelector(
    (state) => state.support.ticketDetailsPopup.helperData
  );

  const handleClose = () => {
    dispatch(closeTicketDetailsPopup());
  };

  const { data: ticketDetailsData } = useGetTicketDetailsQuery(
    {
      slug: helperData?.slug,
    },
    { skip: helperData?.slug ? false : true }
  );

  const statusCodes = {
    PENDING: {
      title: "Pending",
      colorPrimary: "bg-[#FF9F43]",
      textPrimary: "text-[#FF9F43]",
      colorSecondary: "bg-[#FF9F43]/30",
    },
    APPROVED: {
      title: "Assigned",
      colorPrimary: "bg-[#428BC1]",
      textPrimary: "text-[#428BC1]",
      colorSecondary: "bg-[#428BC1]/30",
    },
    PROCESSING: {
      title: "Inprogress",
      colorPrimary: "bg-[#FF9F43]",
      textPrimary: "text-[#FF9F43]",
      colorSecondary: "bg-[#FF9F43]/30",
    },
    COMPLETED: {
      title: "Completed",
      colorPrimary: "bg-[#28C76F]",
      textPrimary: "text-[#28C76F]",
      colorSecondary: "bg-[#28C76F]/30",
    },
  };

  return (
    <Modal
      parentClasses="bg-black/50 grid place-items-center"
      isOpen={popupStatus}
      close={handleClose}
    >
      <div
        className="text-white p-5 px-3 flex flex-col justify-between bg-ownBlue1 rounded-md animate__animated animate__zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex justify-end">
            <IoClose size={24} onClick={handleClose} />
          </div>

          <h1 className="text-center text-[24px] font-montserrat font-medium">
            Ticket Details
          </h1>

          <div className="flex justify-end mt-3">
            <div
              className={`${
                statusCodes[ticketDetailsData?.status]?.colorSecondary
              } ${
                statusCodes[ticketDetailsData?.status]?.textPrimary
              } px-3 py-1 rounded-full`}
            >
              <p>{statusCodes[ticketDetailsData?.status]?.title}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-5 mt-10">
            <div className="flex justify-between space-x-4 text-[14px]">
              <p className="flex-1 font-semibold">Ticket ID</p>
              <p>-</p>
              <p className="flex-1 text-ownOrange font-semibold">
                {ticketDetailsData?.ticket_id}
              </p>
            </div>

            <div className="flex justify-between space-x-4 text-[14px]">
              <p className="flex-1 font-semibold">Date & Time</p>
              <p>-</p>
              <p className="flex-1">
                {ISTFormat3(new Date(ticketDetailsData?.date_created))}
              </p>
            </div>

            <div className="flex justify-between space-x-4 text-[14px]">
              <p className="flex-1 font-semibold">Mobile Number</p>
              <p>-</p>
              <p className="flex-1">{ticketDetailsData?.owner?.phone_number}</p>
            </div>

            <div className="flex justify-between space-x-4 text-[14px]">
              <p className="flex-1 font-semibold">Email</p>
              <p>-</p>
              <p className="flex-1">{ticketDetailsData?.owner?.email}</p>
            </div>

            <div className="flex justify-between space-x-4 text-[14px]">
              <p className="flex-1 font-semibold">Ticket Description</p>
              <p>-</p>
              <p className="flex-1">{ticketDetailsData?.message}</p>
            </div>

            <div className="flex justify-between space-x-4 text-[14px]">
              <p className="flex-1 font-semibold">Ticket Solution</p>
              <p>-</p>
              <p className="flex-1">{ticketDetailsData?.solution}</p>
            </div>
          </div>
        </div>

        <div className="grid place-items-center mt-10">
          <button
            className="w-[69px] h-[38px] bg-ownGreen3 rounded-md"
            onClick={handleClose}
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TicketDetailsPopup;
