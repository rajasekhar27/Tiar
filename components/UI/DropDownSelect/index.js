import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiChevronDown } from "react-icons/hi";
import { useRef } from "react";
import { useEffect } from "react";

const people = [
  { id: 1, name: "$5", unavailable: false },
  { id: 2, name: "$10", unavailable: false },
];

const DropdownSelect = ({ parentClasses }) => {
  const [selected, setSelected] = useState(people[0]);
  const [containerWidth, setContainerWidth] = useState("100%");

  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef?.current?.clientWidth);
    }
  }, [containerRef?.current]);

  return (
    <Listbox
      value={selected}
      onChange={setSelected}
      className={`text-white ${parentClasses}`}
      ref={containerRef}
    >
      <div className="relative w-full">
        <Listbox.Button
          className={
            "w-full h-[49px] bg-white/10 rounded-md flex items-center justify-between px-2 "
          }
        >
          <div className="flex items-center space-x-2">
            <RiMoneyDollarCircleLine size={25} />
            <p className="text-[16px] font-semibold">Select Stakes</p>
          </div>
          <HiChevronDown size={25} />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`glass-5 absolute mt-1 overflow-auto rounded-md`}
            style={{
              width: containerWidth,
            }}
          >
            {people.map((person) => (
              <Listbox.Option
                key={person.id}
                value={person}
                disabled={person.unavailable}
                className="border-b border-white py-2 px-5"
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DropdownSelect;
