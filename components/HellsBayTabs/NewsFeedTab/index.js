import AliceCarousel from "react-alice-carousel";
import Section from "./Section";
import { nanoid } from "nanoid";
import { hflUpdates, upcomingEvents } from "../../../data/hellsbayData";
import {
  useGetAllFeedQuery,
  useGetFeedQuery,
  useGetHflFightLeaguesQuery,
  useGetHflUpdatesQuery,
  useGetUpcomingEventsQuery,
} from "../../../store/apis/restApi";
import ReactPlayer from "react-player/lazy";
import { useRef } from "react";
import { useEffect } from "react";
import HellsbayUpdates from "../../duplicate/hfl/HellsbayUpdates";
import HellsbayFights from "../../duplicate/hfl/hellsbayFights";

const NewsFeedTab = (props) => {
  // const { data: feedData } = useGetAllFeedQuery({
  //   limit: 10,
  //   offset: 0,
  // });

  const videoRef = useRef(null);

  // const { data: feedData } = useGetFeedQuery({
  //   limit: 5,
  //   offset: 0,
  // });

  // const { data: hflUpdatesData } = useGetHflUpdatesQuery({
  //   limit: 20,
  //   offset: 0,
  // });

  // const { data: upcomingEventsData } = useGetUpcomingEventsQuery({
  //   limit: 20,
  //   offset: 0,
  // });

  // const items = [
  //   <CarouselCard key={nanoid()} />,
  //   <CarouselCard key={nanoid()} />,
  //   <CarouselCard key={nanoid()} />,
  // ];

  // const items = feedData
  //   ? feedData?.results.map((f) => <CarouselCard key={nanoid()} data={f} />)
  //   : [];

  useEffect(() => {
    if (!videoRef) return;

    videoRef.current.play();
  }, [videoRef]);

  const items = [
    <div>
      <ReactPlayer
        width={"100%"}
        url="/videos/video1.mp4"
        style={{
          width: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
        muted
        playing
        loop
      />
    </div>,
  ];

  return (
    <div className="mt-2 h-full">
      <div>
        {/* <AliceCarousel
          mouseTracking
          items={items}
          disableButtonsControls={true}
        /> */}
        {/* <ReactPlayer
          width={"100%"}
          url="/videos/video1.mp4"
          muted
          playing
          loop

        /> */}
        <video autoPlay muted ref={videoRef} loop>
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="pl-5 pb-[80px] my-7">
        <HellsbayUpdates />

        <HellsbayFights />

        {/* <Section
          title={"Hellsbay Updates"}
          hideText2={true}
          data={hflUpdatesData?.results}
        /> */}

        {/* <Section
          title={"Watch Hellsbay Fights"}
          hideText2={true}
          data={upcomingEventsData?.results}
        /> */}
      </div>
    </div>
  );
};

const CarouselCard = ({ data }) => {
  return (
    <div
      className="h-[303px] w-full relative z-0"
      style={{
        background: `url('${data?.image}')`,
        // https://pbs.twimg.com/media/FGJj1r6VUAIGV1R?format=jpg&name=medium
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black opacity-50 -z-10"></div>

      <div className="grid place-items-center w-full h-full">
        <div className="flex  flex-col items-center space-y-14">
          <p className="max-w-[80%] text-[12px] text-center">{data?.title}</p>

          <button className="bg-ownPurple1 w-[150px] h-[37px] rounded-sm text-[14px]">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedTab;
