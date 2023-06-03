import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
// import { upcomingEvents } from "../../../data/hellsbayData";
// import {
//   useGetHFLEventsQuery,
//   useGetHflFightLeaguesQuery,
//   useGetTitleMatchesQuery,
// } from "../../../store/apis/restApi";
import HellsbayFightNight from "../../duplicate/hfl/HellsbayFightNight";
import IBCFightNight from "../../duplicate/hfl/IbcFightNight";

const EventsTab = (props) => {
  // const router = useRouter();

  const handleDragStart = (e) => e.preventDefault();

  const handleEventClick = () => {
    // router.push(`/hellsbay/events/event`);
  };

  const items = [
    <div className="px-2">
      <img
        src="/images/banner_24.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_25.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_26.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_27.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_28.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_29.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_30.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,

    <div className="px-2">
      <img
        src="/images/banner_31.jpeg"
        onDragStart={handleDragStart}
        className="w-full max-h-[199px] object-cover rounded-lg"
        onClick={handleEventClick}
      />
    </div>,
  ];

  // const { data: hflEventsData } = useGetHFLEventsQuery({
  //   limit: 10,
  //   offset: 0,
  // });

  // const { data: hflFightLeaguesData } = useGetHflFightLeaguesQuery({
  //   limit: 20,
  //   offset: 0,
  // });

  // const { data: titleMatchesData } = useGetTitleMatchesQuery({
  //   limit: 20,
  //   offset: 0,
  // });

  return (
    <div className="pt-2 pb-[80px]">
      <div className="block-swipe-tabs">
        <AliceCarousel
          mouseTracking
          items={items}
          disableDotsControls={true}
          disableButtonsControls={true}
          responsive={{
            0: { items: 1 },
            568: { items: 2 },
            1024: { items: 3 },
          }}
          // paddingLeft={25}
          // paddingRight={25}
          autoPlay={true}
          autoPlayInterval={2000}
          infinite
        />
      </div>

      <div className="pl-5 flex flex-col space-y-3 mt-3">
        <HellsbayFightNight />
        <IBCFightNight />

        {/* <Section
          hideText2={false}
          data={hflFightLeaguesData?.results}
          title={"Hellsbay Fight Night"}
        /> */}
        {/* <Section
          hideText2={true}
          data={titleMatchesData?.results}
          title={"IBC Fight Night"}
        /> */}
      </div>
    </div>
  );
};

export default EventsTab;
