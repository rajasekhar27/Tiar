import { useRouter } from "next/router";
import { BsChevronLeft, BsSearch } from "react-icons/bs";
import { Tab } from "@headlessui/react";
import FollowersTab from "./FollowersTab";
import FollowingTab from "./FollowingTab";
import FriendsTab from "./FriendsTab";
import { useEffect } from "react";
import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openSearchFriendPopup } from "../../../../store/slices/profile";

const SocialContactTabs = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    if (id === "followers") {
      setSelectedIndex(0);
    }

    if (id === "following") {
      setSelectedIndex(1);
    }

    if (id === "friends") {
      setSelectedIndex(2);
    }
  }, [id]);

  const handleChange = (id) => {
    if (id === 0) {
      router.push("/profile/social/info/followers");
    }

    if (id === 1) {
      router.push("/profile/social/info/following");
    }

    if (id === 2) {
      router.push("/profile/social/info/friends");
    }
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="">
        <div className="relative text-center w-full py-5 flex justify-between items-center px-5">
          <div className="flex items-center space-x-3">
            <BsChevronLeft
              color="white"
              onClick={() => router.push("/profile")}
            />
            {/* <FiHome color="white" onClick={() => router.push("/")} /> */}
          </div>
          <h5 className="font-semibold text-[16px] text-white uppercase">
            {router.query.id}
          </h5>

          <BsSearch
            color="white"
            onClick={() => dispatch(openSearchFriendPopup())}
          />
        </div>

        <Tab.Group
          as={"div"}
          className="text-white w-full"
          selectedIndex={selectedIndex}
          onChange={handleChange}
        >
          <Tab.List
            className={
              "flex overflow-x-scroll justify-between text-[14px] px-5 bg-white/10 py-2"
            }
          >
            <Tab className={"focus:outline-none"}>
              {({ selected }) => (
                <p
                  className={`${
                    selected &&
                    "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
                  } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
                >
                  Followers
                </p>
              )}
            </Tab>
            <Tab className={"focus:outline-none"}>
              {({ selected }) => (
                <p
                  className={`${
                    selected &&
                    "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
                  } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
                >
                  Following
                </p>
              )}
            </Tab>

            <Tab className={"focus:outline-none"}>
              {({ selected }) => (
                <p
                  className={`${
                    selected &&
                    "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
                  } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
                >
                  Friends
                </p>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <FollowersTab />
            </Tab.Panel>
            <Tab.Panel>
              <FollowingTab />
            </Tab.Panel>
            <Tab.Panel>
              <FriendsTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default SocialContactTabs;
