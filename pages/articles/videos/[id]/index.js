import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import EventDetails from "../../../../components/HellsBayTabs/EventsTab/EventDetails";
import Loader from "../../../../components/UI/Loader";

const VideoFeedPage = (props) => {
  const router = useRouter();
  const { status } = useSession();

  const { id } = router.query;

  const articleFinder = (id) => {
    switch (id) {
      // ?? Hellsbay teaser
      case "1":
        return {
          id: "3bf454161005742a7e9b0118cac20727",
          title: "Hellsbay Teaser",
          subtitle: null,
        };

      // ?? Hellsbay after movie
      case "2":
        return {
          id: "b9340a2ba51d9ebea63a0ae8c34cdd3f",
          title: "Hellsbay After Movie",
          subtitle: null,
        };

      // ?? Hellsbay Matches
      // 1
      case "3":
        return {
          id: "57c0b49540c0290507191c9376c10727",
          title: "AKASHDEEP SINGH vs SABARI J",
          subtitle: "LIGHT WEIGHT",
        };
      // 2
      case "4":
        return {
          id: "0d49ef6da06f366797391f7ae4a85096",
          title: "KARTHIK SATHISH KUMAR vs HERU PURWANTO",
          subtitle: "LIGHT WEIGHT",
        };
      // 3
      case "5":
        return {
          id: "591ee4232380458c99b2b7fcfbee7991",
          title: "ASAD ASIG KHAN vs NASORO MADIMBA",
          subtitle: "FEATHER WEIGHT",
        };
      // 4
      case "6":
        return {
          id: "f2200833b6f5f6b4bf79cbd4d53d2140",
          title: "GURPREETH SINGH vs LOKESH DANGI",
          subtitle: "LIGHT WEIGHT",
        };
      // 5
      case "7":
        return {
          id: "fb4cef281ba3905194fe638d9214ee17",
          title: "MANIKANDAN V vs MAZHAR HUSSAIN",
          subtitle: "SUPER BANTAM",
        };

      // IBC Matches
      // 1
      case "8":
        return {
          id: "b615a2415332e29814dd1b244b9406c5",
          title: "AKASHDEEP SINGH vs NICHOLAS MWANGA",
          subtitle: null,
        };
      // 2
      case "9":
        return {
          id: "17f45f120243f407bce6699141baa420",
          title: "PUSHKAR BHOSLE vs NORBERTO TANO",
          subtitle: null,
        };
      // 3
      case "10":
        return {
          id: "9db1257a58016b07ccb50c19a65f0ea3",
          title: "DIGARI MAHESH vs VIKRAMJEET SINGH",
          subtitle: null,
        };
      // 4
      case "11":
        return {
          id: "d37793d488cb5d9e040b965dcc7bcd2e",
          title: "RUPINDER KAUR vs THIDARAT MUENGWONG",
          subtitle: null,
        };
      // 5
      case "12":
        return {
          id: "7afba8bc3c635853668157409385e442",
          title: "HARSH PUROHIT vs SAPARBAY AIDAROV",
          subtitle: null,
        };
      // 6
      case "13":
        return {
          id: "32c7f0517a8750a4ae52203390f94c3b",
          title: "ASAD ASIF vs AKSAR NURMAKHANEBTO",
          subtitle: null,
        };
      // 7
      case "14":
        return {
          id: "21ba90f070446bd7de1a934d51aa2a32",
          title: "GURPREET SINGH vs RICARDO HIRAMAN",
          subtitle: null,
        };
      // 8
      case "15":
        return {
          id: "1464a3fb70281805b3a47416a3f5b86b",
          title: "KAMLA ROKA vs ANAHIT AROYAN",
          subtitle: null,
        };
      // 9
      case "16":
        return {
          id: "40625bea2401b1fbc3b2f4f29eca818d",
          title: "RAMANDEEP KAUR vs ANITA MAURYA",
          subtitle: null,
        };
      // 10
      case "17":
        return {
          id: "f8ac9d5a7c578e75a6003114935cb0c2",
          title: "SUBHAM SHARM vs ALLAHDAD RAHIMI",
          subtitle: null,
        };

      default:
        break;
    }
  };

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="">
      <EventDetails data={articleFinder(id)} />

      {/* tiar watermark */}
      <img
        src="/images/tiar_logo_2.svg"
        alt=""
        className="fixed bottom-0 left-0 z-[-1]"
      />
    </div>
  );
};

export default VideoFeedPage;
