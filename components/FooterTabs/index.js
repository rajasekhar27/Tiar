import { footerTabsData } from "../../data/footerTabsData";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSendUserInteractionSignalMutation } from "../../store/apis/restApi";

const FooterTabs = ({ extraClasses }) => {
  return (
    <div
      className={`fixed bottom-0 h-[78px] w-full bg-[#3A3C64] rounded-t-2xl flex items-center justify-evenly shadow-black shadow-2xl z-[5] ${extraClasses}`}
    >
      {footerTabsData?.map((f) => {
        return (
          <Tab
            key={f.id}
            title={f.title}
            selectedImg={f.selectedImg}
            unselectedImg={f.unselectedImg}
            path={f.path}
          />
        );
      })}
    </div>
  );
};

const Tab = ({ title, path, selectedImg, unselectedImg }) => {
  const router = useRouter();
  const [sendUserInteractionSignal] = useSendUserInteractionSignalMutation();

  const handleClick = () => {
    if (title === "Wallet") {
      sendUserInteractionSignal({ status: true, wallet: true });
    }
  };

  return (
    <Link href={path}>
      <div className="w-full flex flex-col items-center" onClick={handleClick}>
        <img
          src={router.pathname === path ? selectedImg : unselectedImg}
          alt=""
          onError={(e) =>
            !e.target.onerror
              ? (e.target.src = "/images/tiar_logo_3.svg")
              : null
          }
          className="h-[30px] w-[30px]"
        />
        <p
          className={`text-[10px] ${
            router.pathname === path ? "text-ownOrange" : "text-white"
          }`}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default FooterTabs;
