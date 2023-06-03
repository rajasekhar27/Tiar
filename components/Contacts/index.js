import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";
import ContactsTabs from "./ContactsTabs";

const Contacts = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="px-5">
        <div className="relative text-center w-full py-5">
          <div className="absolute left-0">
            <BsChevronLeft color="white" onClick={() => router.back()} />
          </div>
          <h5 className="font-semibold text-[16px]">MY CONTACTS</h5>
        </div>
      </div>

      <ContactsTabs />
    </>
  );
};

export default Contacts;
