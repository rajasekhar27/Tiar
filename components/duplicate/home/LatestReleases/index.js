import Link from "next/link";

const LatestReleases = (props) => {
  return (
    <div>
      <h1 className="text-white mb-2 mt-2 text-[16px] font-semibold">
        Latest Releases
      </h1>

      <div className="flex overflow-x-auto space-x-4 items-center ">
        <Card
          title={"Wardroids: Mint Soon"}
          img="/images/wardroids_1.png"
          link="/wardroids"
        />

        <Card
          title={"Hellsbay Fight League: Intro.."}
          img="/images/banner_4.png"
          link="/articles/1"
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

export default LatestReleases;
