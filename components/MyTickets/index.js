import MyTicketsTabs from "./MyTicketsTabs";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";

const MyTickets = (props) => {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="px-3 flex items-center space-x-3 text-white py-5">
        <BsChevronLeft size={24} onClick={() => router.back()} />
        <p className="text-[18px] font-medium">My Tickets</p>
      </div>
      <MyTicketsTabs />
    </div>
  );
};

export default MyTickets;
