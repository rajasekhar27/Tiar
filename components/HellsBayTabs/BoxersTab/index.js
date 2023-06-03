import { useViewportSize } from "@mantine/hooks";
import { useLazyGetAllBoxersQuery } from "../../../store/apis/restApi";
import BoxerCard from "./BoxerCard";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import Loader from "../../UI/Loader";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";

const categories = [
  {
    id: 1,
    title: "View All",
    value: "",
  },
  {
    id: 2,
    title: "Superbantam",
    value: "SUPERBANTAM",
  },
  {
    id: 3,
    title: "Light Weight",
    value: "LIGHTWEIGHT",
  },
  {
    id: 4,
    title: "Middle Weight",
    value: "MIDDLEWEIGHT",
  },
];

const BoxersTab = (props) => {
  const { height: windowHeight } = useViewportSize();
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h6 className="mb-3 font-semibold text-[18px]">HFL Fighters</h6>

        <div className={"text-ownOrange relative"}>
          <div
            onClick={() => setShow(!show)}
            className="flex items-center space-x-2 "
          >
            <p>View</p>
            <FiFilter />
          </div>

          {show && (
            <div
              className="p-3 bg-[#20234B] absolute right-0 top-[30px] z-[1] rounded-md pr-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* <p>View</p> */}
              <RadioGroup value={category} onChange={setCategory}>
                {categories?.map((c) => (
                  <RadioGroup.Option
                    key={c.id}
                    value={c.value}
                    className="mt-2"
                  >
                    {({ checked }) => (
                      <div
                        className="flex items-center space-x-2"
                        onClick={() => setShow(false)}
                      >
                        {checked ? (
                          <MdOutlineCheckBox size={20} />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank size={20} />
                        )}

                        <p className="text-white text-[16px] whitespace-nowrap">
                          {c?.title}
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
        lazyHook={useLazyGetAllBoxersQuery}
        hookParams={{ category: category }}
        customEnd={<></>}
        customLoader={<Loader />}
        height={windowHeight - 78 - 60 - 29 - 24 - 50 - 20}
      >
        <BoxerCard />
      </AuthInfiniteScrollComponent>
    </div>
  );
};

export default BoxersTab;
