import { useViewportSize } from "@mantine/hooks";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { getWalletType } from "../../../helpers/getWalletType";
import { useGetCryptoGraphQuery } from "../../../store/apis/cryptoApi";
import { useGetAllWalletsOfUserQuery } from "../../../store/apis/restApi";
import TokenCard from "./TokenCard";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TokenTab = (props) => {
  const authToken = useSelector((state) => state.auth.accessToken);
  const { height: windowHeight } = useViewportSize();

  const { data: walletsData, isFetching: walletsFetching } =
    useGetAllWalletsOfUserQuery({}, { skip: !authToken });

  return (
    <>
      <Scrollbars
        style={{ height: `${windowHeight - 30 - 100 - 29 - 110 - 100}px` }}
      >
        <div className="my-3  flex flex-col space-y-2">
          {/* className="my-3 grid grid-cols-2 gap-3 place-items-center m-auto" */}
          {/* {walletsData?.map((t) => {
            return <TokenCard key={t?.slug} data={t} />;
          })} */}

          {walletsData?.map((t) => {
            return <WalletCard key={t?.slug} data={t} />;
          })}

          {/* <Link href={"/wallet/create"}>
          <div className="w-full max-w-[157px] h-[155px] bg-[#89899C]/40 rounded-md p-3 grid place-items-center">
            <BsPlusCircleDotted size={35} />
          </div>
        </Link> */}
          {/* <DummyCard coin={"tiar"} /> */}
          <DummyCard coin={"usdt"} />
        </div>
      </Scrollbars>
    </>
  );
};

const DummyCard = ({ coin }) => {
  const walletType = getWalletType(coin);

  return (
    <div className="bg-white/10 rounded-md w-full bg-[url(/images/frame_1.svg)] p-2 px-3 flex items-center justify-between space-x-2 h-[63px] animate__animated animate__flipInX">
      <div className="flex items-center space-x-2">
        <div className="w-[36px] h-[36px]">
          <img
            src={walletType?.img}
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            alt=""
            className="w-full h-full"
          />
        </div>
        <div>
          <p className="text-[16px] font-semibold">{walletType?.name}</p>
          <p className="text-[12px] text-white/60 uppercase">
            {walletType?.coin}/USD
          </p>
        </div>
      </div>

      <div>
        <p>Coming Soon</p>
      </div>
    </div>
  );
};

const WalletCard = ({ data }) => {
  const walletType = getWalletType(data?.coin);
  const router = useRouter();

  const { data: cryptoGraphData } = useGetCryptoGraphQuery({
    currency: "usd",
    days: 1,
    coin: walletType?.meta?.id,
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
      className="bg-white/10 rounded-md w-full bg-[url(/images/frame_1.svg)] p-2 px-3 flex items-center justify-between space-x-2 h-[65px] animate__animated animate__flipInX"
      onClick={() => router.push(`/wallet/${data?.slug}/transactions`)}
    >
      <div className="flex items-center space-x-2">
        <div className="w-[36px] h-[36px]">
          <img
            src={walletType?.img}
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            alt=""
            className="w-full h-full"
          />
        </div>
        <div>
          <p className="text-[16px] font-semibold">{walletType?.name}</p>
          <p className="text-[12px] text-white/60 uppercase">
            {walletType?.coin}
            /USD
          </p>
        </div>
      </div>

      <div className="max-w-[35%]">
        <Chart
          options={options}
          series={series}
          height={"70%"}
          type="line"
          width={"100%"}
        />
      </div>

      <div className="flex flex-col items-center">
        <p className="font-bold text-[11px] whitespace-nowrap">
          $
          {typeof data?.usd_value?.wallets_balance === "number" &&
            parseFloat(data?.usd_value?.wallets_balance).toFixed(3)}
        </p>
        <p className="font-bold text-[11px] uppercase whitespace-nowrap">
          {parseFloat(data?.balance)?.toFixed(5)} {data?.coin}
        </p>
        <p className="text-[8px] whitespace-nowrap">
          Price ${data?.usd_value?.one_eth_value}
        </p>
      </div>
    </div>
  );
};

export default TokenTab;
