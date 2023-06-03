import { TiArrowSortedUp } from "react-icons/ti";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getWalletType } from "../../../../helpers/getWalletType";
import { useGetCryptoGraphQuery } from "../../../../store/apis/cryptoApi";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TokenCard = ({ data }) => {
  const walletType = getWalletType(data?.coin);

  const router = useRouter();

  const { data: cryptoGraphData } = useGetCryptoGraphQuery({
    currency: "usd",
    days: 1,
    coin: walletType?.name.toLowerCase(),
  });

  const series = [
    {
      name: "Coin",
      data: cryptoGraphData ? cryptoGraphData?.map((c) => c[2]) : [],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      max: _.max(series[0].data),
    },
  };

  return (
    <div
      className="w-[157px] h-[155px] bg-[#89899C]/40 rounded-md p-3 flex flex-col justify-between relative"
      onClick={() => router.push(`/wallet/${data?.slug}/transactions`)}
    >
      <div className="absolute bottom-5 left-0">
        <Chart
          options={options}
          series={series}
          type="line"
          height={"70%"}
          width={"100%"}
        />
      </div>

      <div className="flex items-center  space-x-2">
        <div className="w-[36px] h-[36px] rounded-full grid place-items-center">
          <img
            src={walletType?.img}
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            alt=""
            className="w-[36px] h-[36px]"
          />
        </div>

        <div>
          <p className="font-medium text-[16px]">{walletType?.name}</p>
          {/* <p className="text-[12px] text-gray-400">TIAR/USD</p> */}
        </div>
      </div>

      <div className="flex justify-between text-[10px]">
        <p className="font-semibold text-[14px]">
          {parseFloat(data.balance)?.toFixed(7)} {data.coin}
        </p>
        {/* <div className="flex items-center space-x-1 text-ownGreen2">
          <TiArrowSortedUp />
          <p>11.75%</p>
        </div> */}
      </div>
    </div>
  );
};

// const TokenCard = ({ data }) => {
//   return (
//     <div className="w-full bg-[#292B40] flex justify-between items-center rounded-xl p-3 font-medium">
//       <div className="flex space-x-2">
//         <img
//           src={data.coin_img}
//           alt=""
//           className="w-[40px] h-[40px] rounded-full"
//         />
//         <div>
//           <p className="text-[14px]">{data?.conversion}</p>
//           <p className="text-[10px]">{data?.coin_name}</p>
//         </div>
//       </div>

//       <div className="flex flex-col items-end">
//         <p className="text-[14px]">{data?.price}</p>
//         <div
//           className={`p-1 rounded-md
//         ${data?.gainOrLoss[0] === "-" ? "bg-ownRed1/20" : "bg-ownGreen1/20"}`}
//         >
//           <p
//             className={`text-[10px] ${
//               data?.gainOrLoss[0] === "-" ? "text-ownRed1" : "text-ownGreen1"
//             }`}
//           >
//             {data?.gainOrLoss}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

export default TokenCard;
