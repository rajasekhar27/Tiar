import dynamic from "next/dynamic";
import { AiOutlineLeft } from "react-icons/ai";
import { TiArrowSortedUp } from "react-icons/ti";
import _ from "lodash";
import { useGetAllWalletsOfUserQuery } from "../../../store/apis/restApi";
import { useDispatch, useSelector } from "react-redux";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { getWalletType } from "../../../helpers/getWalletType";
import { useRouter } from "next/router";
import {
  openChooseNetworkPopup,
  openWithdrawPopup,
  setNetwork,
} from "../../../store/slices/wallet";
import { useGetCryptoGraphQuery } from "../../../store/apis/cryptoApi";
import Loader from "../../UI/Loader";

const WithdrawCrypto = (props) => {
  const authToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const { data: walletsData, isFetching: walletsFetching } =
    useGetAllWalletsOfUserQuery({}, { skip: !authToken });

  if (walletsFetching) return <Loader />;

  return (
    <div className="p-5 text-white">
      <div className="flex items-center space-x-3 mb-5">
        <AiOutlineLeft color="white" onClick={() => router.push("/wallet")} />
        <p className="text-[18px] font-semibold">Withdraw Crypto</p>
      </div>

      <p className="font-semibold text-[18px] my-3">
        Select Crypto To Withdraw
      </p>

      {walletsData &&
        (walletsData?.length === 0 ? (
          <p>No wallets founds</p>
        ) : (
          walletsData?.map((w) => {
            return <WithdrawCard key={w?.deposit_address} data={w} />;
          })
        ))}
    </div>
  );
};

const WithdrawCard = ({ data }) => {
  const dispatch = useDispatch();

  const walletType = getWalletType(data.coin);

  const { data: cryptoGraphData } = useGetCryptoGraphQuery({
    currency: "usd",
    days: 1,
    coin: walletType?.meta?.id,
  });

  const series = [
    {
      name: "Coin",
      data: cryptoGraphData ? cryptoGraphData?.map((c) => c[2]) : [0],
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
      width: 2,
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

  const handleNetwork = () => {
    dispatch(openWithdrawPopup({ address: data?.deposit_address }));
  };

  return (
    <div
      className="h-[176px] bg-[#89899C]/40 rounded-md text-white p-3 relative flex flex-col justify-between my-3 animate__animated animate__zoomIn"
      onClick={handleNetwork}
    >
      <div className="flex items-center  space-x-2 z-[1]">
        <div className="w-[36px] h-[36px] rounded-full bg-white grid place-items-center overflow-hidden shrink-0">
          <img
            src={walletType?.img}
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            alt=""
            className="max-w-[35px] max-h-[35px] object-contain"
          />
        </div>

        <div>
          <p className="font-medium text-[16px]">{walletType?.name}</p>
          <p className="text-[12px] uppercase">{walletType?.coin}/USD</p>
        </div>
      </div>

      <div className="absolute bottom-6 w-full left-0">
        <Chart
          options={options}
          series={series}
          type="line"
          height={"75%"}
          width={"100%"}
        />
      </div>

      <div className="flex justify-between">
        <p className="font-semibold text-[18px] uppercase">
          {parseFloat(data.balance).toFixed(5)} {data.coin}
        </p>
        {/* <div className="flex items-center space-x-1 text-ownGreen2">
          <TiArrowSortedUp />
          <p>11.75%</p>
        </div> */}
      </div>
    </div>
  );
};

export default WithdrawCrypto;
