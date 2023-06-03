import { useDispatch } from "react-redux";
import ISTFormat from "../../../../helpers/ISTFormat";
import { openTicketDetailsPopup } from "../../../../store/slices/support";

const TicketCard = ({ data, status }) => {
  const dispatch = useDispatch();

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

  const handleDetails = () => {
    dispatch(openTicketDetailsPopup({ slug: data.slug }));
  };

  return (
    <div className="w-full bg-white/10 rounded-xl p-3 animate__animated animate__zoomIn">
      <div className="flex items-center justify-between">
        <div
          className={` w-[32px] h-[32px] rounded-full grid place-items-center ${statusCodes[status]?.colorSecondary}`}
        >
          {(status === "PENDING" || status === "PROCESSING") && (
            <img src="/images/ticket1.svg" alt="" />
          )}
          {status === "APPROVED" && <img src="/images/ticket2.svg" alt="" />}
          {status === "COMPLETED" && <img src="/images/ticket3.svg" alt="" />}
        </div>
        <div
          className={` ${statusCodes[status]?.colorSecondary} ${statusCodes[status]?.textPrimary} px-3 py-1 rounded-full `}
        >
          <p>{statusCodes[status]?.title}</p>
        </div>
      </div>

      <div className="flex space-x-3 items-end">
        <div className="flex-[2] flex flex-col space-y-2 mt-3                                                                                                                                     ">
          <h5 className="text-[14px] text-white">
            <span className="text-white/50">Ticket ID: </span> {data?.ticket_id}
          </h5>
          <h5 className="text-[14px] text-white">
            <span className="text-white/50">Department: </span>{" "}
            {data?.department}
          </h5>
          <h5 className="text-[14px] text-white">
            <span className="text-white/50">Created Date: </span>
            {/*09 Feb,2023 */}
            {ISTFormat(new Date(data?.date_created))}
          </h5>
        </div>

        <div className="flex-1">
          <button
            className="bg-ownOrange text-white px-2 whitespace-nowrap py-1 rounded-md
          "
            onClick={handleDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
