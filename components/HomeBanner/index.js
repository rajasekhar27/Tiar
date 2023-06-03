import Link from "next/link";
import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
const HomeBanner = (props) => {
  const items = [
    <CarouselCard
      title={"Women's Premier League 2023: Win ETH & BTC"}
      description={"September, 2022"}
      img={"/images/banner_44.jpg"}
      handleClick={() => {}}
      link={"/games/cricket"}
    />,
    <CarouselCard
      title={"Refer and Win Upto $5000"}
      description={"September, 2022"}
      img={"/images/banner_41.png"}
      handleClick={() => {}}
      link={"/referal"}
    />,
  ];

  return (
    <div className="mb-8">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlayControls={false}
        disableButtonsControls={true}
      />
    </div>
  );
};
const CarouselCard = ({ title, description, img, handleClick, link }) => {
  return (
    <Link href={link}>
      <div
        className={`h-[283px] flex flex-col justify-end items-center relative`}
      >
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
        {/* <div className="absolute bottom-5 text-white font-[600] font-poppins text-[14px] glass-5 p-2 border border-ownOrange !rounded-full px-5">
          <p>{title}</p>
        </div> */}
      </div>
    </Link>
  );
};
export default HomeBanner;

// import Link from "next/link";
// import AliceCarousel from "react-alice-carousel";

// const HomeBanner = (props) => {
//   const items = [
//     <CarouselCard
//       title={"Big Bash League 2022: Win ETH & BTC"}
//       description={"September, 2022"}
//       img={"/images/banner_44.png"}
//       handleClick={() => {}}
//       link={"#"}
//     />,
//     <CarouselCard
//       title={"Refer and Win Upto $5000"}
//       description={"September, 2022"}
//       img={"/images/banner_41.png"}
//       handleClick={() => {}}
//       link={"/referal"}
//     />,
//     // <CarouselCard
//     //   title={"FIFA World Cup 2022: Fantasy Football"}
//     //   description={"September, 2022"}
//     //   img={"/images/banner_43.png"}
//     //   handleClick={() => {}}
//     //   link={"#"}
//     // />,
//   ];

//   return (
//     <div className="mb-8">
//       <AliceCarousel
//         mouseTracking
//         items={items}
//         autoPlayControls={false}
//         disableButtonsControls={true}
//         renderDotsItem={CustomDots}
//       />
//     </div>
//   );
// };

// const CustomDots = ({ isActive, ...items }) => {
//   console.log(items);
//   return (
//     <div
//       className={`w-[25px] h-[3px] ${
//         isActive === "__active" ? "bg-white" : "bg-white/50"
//       }`}
//     ></div>
//   );
// };

// const CarouselCard = ({ title, description, img, handleClick, link }) => {
//   return (
//     <Link href={link}>
//       <div
//         className={`h-[283px] rounded-b-[30px] flex flex-col justify-end overflow-hidden items-center relative`}
//       >
//         <img src={img} alt="" className="w-full h-full object-cover" />

//         {/* <div className="absolute bottom-5 text-white font-[600] font-poppins text-[14px] glass-5 p-2 border border-ownOrange !rounded-full px-5">
//           <p>{title}</p>
//         </div> */}

//         <div className="w-full absolute bottom-0 min-h-[66px] glass-5">
//           <div className="w-3/4 text-[16px] font-semibold text-white p-2 px-5">
//             <p>{title}</p>
//           </div>
//           <div className="w-1/4"></div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default HomeBanner;
