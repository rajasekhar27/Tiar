import { RadioGroup } from "@headlessui/react";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import {
  useGetAllSeriesQuery,
  useLazyGetAllContestsWinnersQuery,
} from "../../../store/apis/restApi";
import WinnerCard from "./WinnerCard";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import Loader from "../../UI/Loader";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";

const WinnersTab = (props) => {
  const [series, setSeries] = useState("");
  const [activeIndex, setActiveIndex] = useState("");
  const [show, setShow] = useState(false);
  const [activeTitle, setActiveTitle] = useState("Recent Matches");

  const { height: windowHeight } = useViewportSize();

  const { data: allSeriesData, isFetching: seriesDataFetching } =
    useGetAllSeriesQuery();

  const handleChange = (data) => {
    data === ""
      ? setActiveTitle("Recent Matches")
      : setActiveTitle(allSeriesData?.results[data]?.name);
    data === "" ? setSeries("") : setSeries(allSeriesData?.results[data]?.id);
    setActiveIndex(data);
    setShow(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-semibold text-[12px] py-1">
            Mega Contest Winners
          </h6>
          <p className="mb-2 truncate w-[90%] text-[10px] text-[#787878]">
            {activeTitle}
          </p>
        </div>

        <div className={"text-ownOrange relative"}>
          <div
            onClick={() => setShow(!show)}
            className="flex items-center space-x-2 "
          >
            <p className="text-[10px]">Filter By Series</p>
            <FiFilter size={14} />
          </div>

          {show && (
            <div
              className="p-3 bg-[#20234B] absolute right-0 top-[30px] z-[1] rounded-md pr-10 w-[250px] h-[300px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <RadioGroup value={activeIndex} onChange={handleChange}>
                <RadioGroup.Option value="" className="mt-2">
                  {({ checked }) => (
                    <div className="flex items-center space-x-2">
                      {checked ? (
                        <MdOutlineCheckBox size={20} className="shrink-0" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          size={20}
                          className="shrink-0"
                        />
                      )}

                      <p className="text-white text-[16px] whitespace-nowrap truncate">
                        No Filters
                      </p>
                    </div>
                  )}
                </RadioGroup.Option>
                {seriesDataFetching && <p className="my-5">Fetching Data...</p>}
                {allSeriesData?.results?.map((c, idx) => (
                  <RadioGroup.Option key={c.id} value={idx} className="mt-2">
                    {({ checked }) => (
                      <div className="flex items-center space-x-2">
                        {checked ? (
                          <MdOutlineCheckBox size={20} className="shrink-0" />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank
                            size={20}
                            className="shrink-0"
                          />
                        )}

                        <p className="text-white text-[16px] whitespace-nowrap truncate">
                          {c?.name}
                        </p>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </div>

      <AuthInfiniteScrollComponent
        lazyHook={useLazyGetAllContestsWinnersQuery}
        hookParams={{ series: series }}
        customEnd={<></>}
        customLoader={<Loader />}
        height={windowHeight - 30 - 44 - 120 - 80}
        emptyHandler={
          <div className="flex flex-col items-center text-[12px] text-ownOrange animate__animated animate__zoomIn">
            <img src="/images/team.svg" alt="" />
            <p>No Data Found</p>
          </div>
        }
      >
        <WinnerCard />
      </AuthInfiniteScrollComponent>
      {/* {contestsWinnersData?.results?.map((w) => (
        <WinnerCard key={w.id} data={w} />
      ))} */}
    </div>
  );
};

export default WinnersTab;
