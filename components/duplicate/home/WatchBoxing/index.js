import Link from "next/link";

const WatchBoxing = (props) => {
  return (
    <div>
      <h1 className="text-white mb-2 mt-2 text-[16px] font-semibold">
        Watch Boxing
      </h1>

      <div className="flex overflow-x-auto space-x-4 items-center">
        <Card
          link={"/articles/videos/1"}
          title={"Hellsbay Teaser"}
          img="/images/banner_6.png"
        />

        <Card
          link={"/articles/videos/2"}
          title={"Hellsbay After Movie"}
          img="/images/banner_34.png"
        />
      </div>
    </div>
  );
};

const Card = ({ img, title, link }) => {
  return (
    <Link href={link}>
      <div className="relative w-[200px] h-[123px] bg-[url('/images/frame_3.svg')] overflow-hidden rounded-md p-1 flex-shrink-0 text-[10px] font-semibold">
        <img src={img} alt="" className="w-full h-full" />

        <div className="absolute bottom-0 left-0 w-full glass-1 text-white p-2 rounded-t-md">
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default WatchBoxing;
