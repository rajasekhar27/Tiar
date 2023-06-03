import { AiOutlineLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../../store/slices/cricket";
import GameInfo from "../../GameInfo";
import { FiBell } from "react-icons/fi";
import { useGetUserProfileDetailsQuery } from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import { profileShuffle } from "../../../helpers/profileShuffle";
import Link from "next/link";

const PointSystem = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: userData } = useGetUserProfileDetailsQuery();

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-7">
        <Link href={"/"}>
          <img src="/images/tiar_logo_1.svg" alt="" className="max-w-[50px]" />
        </Link>
      </div>

      <div className="flex items-center text-ownOrange space-x-3 w-full p-3 py-5 justify-between ">
        <AiOutlineLeft
          color="white"
          size={25}
          onClick={() => dispatch(setCurrentScreen(3))}
        />

        <div className="flex space-x-3 items-center">
          <FiBell size={19} onClick={() => router.push("/notifications")} />

          <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                userData?.user_profile?.image
                  ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                  : profileShuffle()
              }
              className="w-full h-full bg-white"
              alt=""
              onClick={() => router.push("/profile")}
            />
          </div>
        </div>
      </div>
      <GameInfo />
    </div>
  );
};

// const PointSystem = (props) => {
//   const dispatch = useDispatch();

//   return (
//     <div className="text-white p-5">
//       <div className="flex items-center text-ownOrange space-x-3 mb-5">
//         <AiOutlineLeft
//           color="white"
//           size={25}
//           onClick={() => dispatch(setCurrentScreen(3))}
//         />
//         <h5 className="font-semibold text-[18px]">Point System</h5>
//       </div>

//       <div className="w-full h-[219px] rounded-md overflow-clip">
//         <img
//           src="https://www.cricket.com.au/-/media/News/2022/05/10nikitarasthumb.ashx"
//           alt=""
//           onError={(e) =>
//             !e.target.onerror
//               ? (e.target.src = "/images/tiar_logo_3.svg")
//               : null
//           }
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="mt-10">
//         <DropDownTab
//           title={"Create Your Team"}
//           description={"Just Create It"}
//         />
//         <DropDownTab
//           title={"Fantasy Points System"}
//           description={"Just Create It"}
//         />
//         <DropDownTab
//           title={"Other Important Points"}
//           description={"Just Create It"}
//         />
//       </div>
//     </div>
//   );
// };

// const DropDownTab = ({ title, description }) => {
//   return (
//     <Disclosure as={"div"} className="border-b-2 border-white pb-3">
//       <Disclosure.Button className="py-2 w-full flex justify-between items-start">
//         {title}
//         <BiChevronDown size={30} />
//       </Disclosure.Button>
//       <Disclosure.Panel className="text-gray-500">
//         {description}
//       </Disclosure.Panel>
//     </Disclosure>
//   );
// };

export default PointSystem;
