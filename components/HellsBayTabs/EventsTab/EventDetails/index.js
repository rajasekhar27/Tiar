import ReactPlayer from "react-player";
import { upcomingEvents } from "../../../../data/hellsbayData";
import Section from "../Section/index";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import { Stream } from "@cloudflare/stream-react";
import { useState } from "react";
import { Skeleton } from "@mantine/core";
import AllEventsVideos from "../../../duplicate/hfl/AllEventsVideos";
import { useEffect } from "react";

const EventDetails = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  return (
    <div className="relative text-white">
      <div className="p-5 flex items-center space-x-3 bg-black">
        <FiChevronLeft size={30} onClick={() => router.back()} />
        <p>Video Gallery</p>
      </div>

      {/* <div className="absolute top-5 left-5 text-white rounded-full bg-gray-400/50 z-[2]">
        <FiChevronLeft size={30} />
      </div> */}

      {loading && <Skeleton height={266} />}

      {/* <div className="rounded-xl overflow-hidden"> */}
      <Stream
        controls
        src={data?.id}
        height={"266px"}
        // poster={
        //   "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320&fm=webp"
        // }
        onLoadStart={() => setLoading(false)}
      />
      {/* </div> */}

      <div className="px-5 py-3 pb-5 bg-gradient-to-b from-black via-black to-transparent">
        {loading ? (
          <div className="flex flex-col space-y-2">
            <Skeleton height={18} />
            <Skeleton height={16} />
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-[18px]">{data?.title}</h3>
            {data?.subtitle && <p className="text-[14px]">{data?.subtitle}</p>}
          </>
        )}
      </div>

      <AllEventsVideos />
    </div>
  );
};

export default EventDetails;
