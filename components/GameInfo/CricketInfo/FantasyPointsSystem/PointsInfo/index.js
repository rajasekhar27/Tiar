import { Disclosure } from "@headlessui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import PointsTable from "../PointsTable";

const PointsInfo = ({ data }) => {
  return (
    <div className="">
      {data?.additionalInfo && (
        <div>
          <h6 className={"text-ownOrange font-medium"}>
            {data?.additionalInfo?.title}:
          </h6>
          <ul className="list-disc pl-5 flex flex-col space-y-3 my-3 text-white">
            {data?.additionalInfo?.info.map((i) => (
              <li key={i.id}>{i.desc}</li>
            ))}
          </ul>
        </div>
      )}

      {data?.dropDown?.map((d) => (
        <DropDownInfo
          key={d.id}
          title={d.dropDownName}
          subtitle={d?.dropDownSubtitle}
        >
          <div className="text-[10px]">
            {/* <img
              src={d?.img}
              alt=""
              className="h-[200px] w-full object-cover"
            /> */}
            <PointsTable points={d.points} />
            {d?.additionalData && (
              <ul className="list-disc px-3 pl-5 my-5">
                {d?.additionalData?.map((i) => (
                  <li className="mt-3" key={i.id}>
                    {i.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DropDownInfo>
      ))}
    </div>
  );
};

function DropDownInfo({ title, children, subtitle }) {
  return (
    <Disclosure as={"div"} className="mb-2 rounded-md bg-white overflow-hidden">
      {({ open }) => (
        <>
          <Disclosure.Button className={`w-full ${open && "border-b"}`}>
            <div className="p-3 w-full text-start text-[14px] font-medium flex justify-between items-center">
              <p>{title}</p>
              {open ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            <p className="text-[#767676] text-[14px] text-start px-3">
              {subtitle}
            </p>
          </Disclosure.Button>
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default PointsInfo;
