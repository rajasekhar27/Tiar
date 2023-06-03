import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetMatchScoreBySlugQuery } from "../../../../store/apis/restApi";
import Scrollbars from "react-custom-scrollbars-2";
import { useViewportSize } from "@mantine/hooks";

const ScoreCard = ({ slug }) => {
  const { height: windowHeight } = useViewportSize();

  const { data: matchScoreData } = useGetMatchScoreBySlugQuery(
    {
      slug: slug,
    },
    {
      pollingInterval: 60000, // 1 min
    }
  );

  return (
    <Scrollbars style={{ height: windowHeight - 34 - 35 - 136 - 20 }}>
      {matchScoreData?.data?.map((m) => (
        <TeamScore key={m?.t_name} data={m} />
      ))}
    </Scrollbars>
  );
};

const TeamScore = ({ data }) => {
  return (
    <Disclosure>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button
              className={`${
                open ? "bg-white" : "bg-[#FDE7DF]"
              } w-full text-[16px] py-3 flex justify-between items-center p-5`}
            >
              <div>
                <h6>{data?.t_name}</h6>
              </div>

              <div className="flex items-center space-x-3 ">
                <p className="text-[10px] text-black/60">
                  ({data?.overs} Overs)
                </p>
                <h6 className="font-medium">
                  {" "}
                  {data?.runs}/{data?.wickets}
                </h6>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className={"px-5 bg-white"}>
              <BattersTable data={data?.batting} />

              <BowlersTable data={data?.bowling} />
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};

const BattersTable = ({ data }) => {
  return (
    <table className="bg-white w-full">
      <tr className="text-[12px] font-normal text-black/50 border-b-2 border-black/40">
        <th className="text-start pb-2">Batter</th>
        <th className="text-center">R</th>
        <th className="text-center">B</th>
        <th className="text-center">4s</th>
        <th className="text-center">6s</th>
        <th className="text-end">S/R</th>
      </tr>

      {data?.map((d) => {
        return (
          <tr className="text-[12px] border-b border-black/40">
            <td className="py-2">
              <div>
                <p>{d?.p_name}</p>
                <p className="text-[10px] text-black/50">
                  {d?.out_by ? d?.out_by : "not out"}
                </p>
              </div>
            </td>
            <td className="text-center">{d?.runs}</td>
            <td className="text-center">{d?.balls}</td>
            <td className="text-center">{d?.fours}</td>
            <td className="text-center">{d?.sixes}</td>
            <td className="text-end">{d?.strike_rate}</td>
          </tr>
        );
      })}
    </table>
  );
};

const BowlersTable = ({ data }) => {
  return (
    <table className="bg-white w-full mt-3">
      <tr className="text-[12px] font-normal text-black/50 border-b border-black/40">
        <th className="text-start py-2">Bowler</th>
        <th className="text-center">O</th>
        <th className="text-center">M</th>
        <th className="text-center">R</th>
        <th className="text-center">W</th>
        <th className="text-end">Eco</th>
      </tr>

      {data?.map((d) => {
        return (
          <tr className="text-[12px] border-b border-black/50">
            <td className="py-2">
              <div>
                <p>{d?.p_name}</p>
              </div>
            </td>
            <td className="text-center">{d?.overs}</td>
            <td className="text-center">{d?.maiden}</td>
            <td className="text-center">{d?.runs}</td>
            <td className="text-center">{d?.wickets}</td>
            <td className="text-end">{d?.economy}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default ScoreCard;
