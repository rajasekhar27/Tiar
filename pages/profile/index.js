// import { signOut } from "next-auth/react";
// import { useDispatch } from "react-redux";
// import { removeTokens } from "../../store/slices/auth";
// import restApi, {
//   useGetUserEarnedAmountQuery,
//   useGetUserOverallBalanceQuery,
//   useGetUserProfileDetailsQuery,
//   useUpdateProfileDataMutation,
//   useUpdateProfilePictureMutation,
//   useUserRecentlyPlayedContestsQuery,
// } from "../../store/apis/restApi";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { AiOutlineLeft } from "react-icons/ai";
// import { FaEdit } from "react-icons/fa";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRef } from "react";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import Link from "next/link";
// import CricketContestCard from "../../components/CricketContestCard";
// import Loader from "../../components/UI/Loader";

// const ProfilePage = (props) => {
//   const [edit, setEdit] = useState(false);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { status, data } = useSession();
//   const imgRef = useRef(null);

//   const handleSignOut = () => {
//     signOut({ callbackUrl: `${window.location.origin}`, redirect: false }).then(
//       () => {
//         dispatch(restApi.util.resetApiState());
//       }
//     );
//     dispatch(removeTokens());
//   };

//   const [updateProfileData] = useUpdateProfileDataMutation();
//   const [updateProfilePicture] = useUpdateProfilePictureMutation();
//   const { data: userProfileData } = useGetUserProfileDetailsQuery();
//   const { data: recentlyPlayedContestsData } =
//     useUserRecentlyPlayedContestsQuery({
//       limit: 10,
//       offset: 0,
//     });

//   const { data: overallBalanceData } = useGetUserOverallBalanceQuery();
//   const { data: userEarningsData } = useGetUserEarnedAmountQuery();

//   const { handleSubmit, register, setValue } = useForm({
//     defaultValues: {
//       name: userProfileData?.user_profile?.name,
//       // phone: data?.user?.phone,
//       email: userProfileData?.email,
//     },
//   });

//   useEffect(() => {
//     if (!userProfileData) return;

//     setValue("name", userProfileData?.user_profile?.name);
//     setValue("email", userProfileData?.email);
//   }, [userProfileData]);

//   const onSubmit = (values) => {
//     updateProfileData({ slug: userProfileData?.slug, data: values }).then(
//       (res) => {
//         if (res.data) {
//           toast.success("successfully updated details");
//         }

//         if (res.error) {
//           toast.error(
//             `something went wrong. ${JSON.stringify(res?.error?.data?.message)}`
//           );
//         }

//         setEdit(false);
//       }
//     );
//   };

//   const handleImgChange = (e) => {
//     const img = e.target.files[0];
//     if (!img) return;

//     const formData = new FormData();

//     formData.append("image", img);

//     updateProfilePicture({
//       slug: userProfileData?.slug,
//       data: formData,
//     }).then((res) => {
//       if (res.data) {
//         toast.success("updated profile image successfully");
//       }

//       if (res.error) {
//         toast.error(
//           `something went wrong. ${JSON.stringify(res?.error?.data?.message)}`
//         );
//       }
//     });
//   };

//   if (status === "unauthenticated") {
//     router.push("/auth");
//   }

//   if (status === "loading") {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen p-5 text-white">
//       <div className="flex items-center space-x-3">
//         <AiOutlineLeft color="white" onClick={() => router.back()} />
//         <h5>Profile</h5>
//       </div>

//       <div className="flex items-start space-x-5 mt-5">
//         <div className="flex-shrink-0 relative">
//           <input
//             type="file"
//             className="hidden"
//             ref={imgRef}
//             onChange={handleImgChange}
//           />
//           <img
//             src={
//               userProfileData?.user_profile?.image
//                 ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userProfileData?.user_profile?.image}`
//                 : `/images/profile_default_1.svg`
//             }
//             alt=""
//             className="bg-white w-[70px] h-[70px] rounded-full object-cover"
//             onClick={() => imgRef.current.click()}
//           />
//           {/* <div className="absolute right-0 bottom-0 text-ownOrange">
//             <FaEdit onClick={() => imgRef.current.click()} />
//           </div> */}
//         </div>

//         <form className="text-[18px] w-full" onSubmit={handleSubmit(onSubmit)}>
//           {!edit ? (
//             <>
//               <h6 className="font-semibold">
//                 {userProfileData?.user_profile?.name}
//               </h6>
//               {/* <p>{data?.user?.phone}</p> */}
//               <p>{userProfileData?.email}</p>
//             </>
//           ) : (
//             <>
//               <input
//                 type="text"
//                 className="rounded-md bg-transparent border border-ownOrange p-1 px-2 mb-2"
//                 {...register("name", { required: true })}
//               />
//               {/* <input
//                 type="number"
//                 className="rounded-md bg-transparent border border-ownOrange my-2 p-1 px-2"
//                 {...register("phone", { required: true })}
//               /> */}
//               {/* <input
//                 type="email"
//                 className="rounded-md bg-transparent border border-ownOrange p-1 px-2"
//                 {...register("email", { required: true })}
//               /> */}
//             </>
//           )}

//           <div className="flex space-x-3">
//             {!edit ? (
//               <button
//                 className="w-full h-[32px] mt-3 text-white bg-ownOrange rounded-md text-[12px]"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setEdit(true);
//                 }}
//                 type={"button"}
//               >
//                 Edit
//               </button>
//             ) : (
//               <button
//                 className="w-full h-[32px] mt-3 text-white bg-ownOrange rounded-md text-[12px]"
//                 type="submit"
//               >
//                 Update
//               </button>
//             )}

//             <Link href={"/referal"}>
//               <button
//                 className="w-full h-[32px] mt-3 text-white bg-ownOrange rounded-md text-[12px]"
//                 onClick={() => {}}
//               >
//                 Invite
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>

//       <div className="flex space-x-5 m-auto justify-between w-full items-center my-5 mt-10">
//         <div className="text-center font-semibold w-1/2">
//           <h5 className="whitespace-nowrap text-[14px] mb-2">Total Balance</h5>
//           <h4 className="text-[18px] text-ownOrange">
//             $ {overallBalanceData?.balance}
//           </h4>
//         </div>

//         <div className="h-[30px] w-[2px]">
//           <img src="/images/line_1.svg" alt="" />
//         </div>

//         <div className="text-center font-semibold w-1/2">
//           <h5 className="whitespace-nowrap text-[14px] mb-2">Amount Earned</h5>
//           <h4 className="text-[18px] text-ownOrange">
//             $ {userEarningsData?.total_earned_amount}
//           </h4>
//         </div>
//       </div>

//       {/* <div className="flex w-full space-x-2">
//         <button
//           className="w-full h-[35px] text-white bg-ownOrange rounded-md"
//           onClick={() => router.push(`/`)}
//         >
//           Home
//         </button>

//         <button
//           className="w-full h-[35px] text-white bg-red-500 rounded-md"
//           onClick={handleSignOut}
//         >
//           Logout
//         </button>
//       </div> */}

//       <div>
//         <div className="flex items-center justify-between my-3">
//           <p className="text-[16px]">Recently Played Contests</p>
//           <Link href={"/recent-contests"}>
//             <p className="text-ownOrange text-[12px]">View All ></p>
//           </Link>
//         </div>

//         <div className="flex overflow-x-auto overflow-y-hidden">
//           {recentlyPlayedContestsData?.results?.map((i, idx) => (
//             <div
//               onClick={() => router.push(`/games/my-contests/${i?.slug}`)}
//               key={i?.id}
//               className="flex-shrink-0 mx-3"
//             >
//               <CricketContestCard
//                 highestPoints={i?.highest_points?.highest_points}
//                 teamName={i?.highest_points?.team_name}
//                 team1Img={i?.team_1?.image_url}
//                 team2Img={i?.team_2?.image_url}
//                 team1Name={i?.team_1?.team_s_name}
//                 team2Name={i?.team_2?.team_s_name}
//                 teamsCreated={i?.teams_created}
//                 status={i?.status}
//                 date={i?.match_ist_time}
//                 enteredContests={i?.no_of_times_entered}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-10 flex space-x-3">
//         <Link href={"/"}>
//           <button className="w-full h-[32px]  text-white bg-ownOrange rounded-md text-[12px]">
//             Home
//           </button>
//         </Link>

//         <button
//           className="w-full h-[32px]  text-white bg-red-500 rounded-md text-[12px]"
//           onClick={handleSignOut}
//         >
//           Logout
//         </button>
//       </div>

//       {/* tiar watermark */}
//       <img
//         src="/images/tiar_logo_2.svg"
//         alt=""
//         className="fixed bottom-0 left-0 z-[-1]"
//       />
//     </div>
//   );
// };

// export default ProfilePage;

// ** New Version **

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetUserEarnedAmountQuery,
  useGetUserOverallBalanceQuery,
  useGetUserProfileDetailsQuery,
  useUpdateProfileDataMutation,
  useUpdateProfilePictureMutation,
  useUserRecentlyPlayedContestsQuery,
} from "../../store/apis/restApi";
import CricketContestCard from "../../components/CricketContestCard";
import Profile from "../../components/Profile";
import Loader from "../../components/UI/Loader";

const ProfilePage = (props) => {
  const [edit, setEdit] = useState(false);

  const router = useRouter();
  const { status, data } = useSession();
  const imgRef = useRef(null);

  const [updateProfileData] = useUpdateProfileDataMutation();
  const { data: userProfileData } = useGetUserProfileDetailsQuery();
  const { data: recentlyPlayedContestsData } =
    useUserRecentlyPlayedContestsQuery({
      limit: 10,
      offset: 0,
    });

  const { data: overallBalanceData } = useGetUserOverallBalanceQuery();
  const { data: userEarningsData } = useGetUserEarnedAmountQuery();

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      name: userProfileData?.user_profile?.name,
      email: userProfileData?.email,
    },
  });

  useEffect(() => {
    if (!userProfileData) return;

    setValue("name", userProfileData?.user_profile?.name);
    setValue("email", userProfileData?.email);
  }, [userProfileData]);

  const onSubmit = (values) => {
    updateProfileData({ slug: userProfileData?.slug, data: values }).then(
      (res) => {
        if (res.data) {
          toast.success("successfully updated details");
        }

        if (res.error) {
          toast.error(
            `something went wrong. ${JSON.stringify(res?.error?.data?.message)}`
          );
        }

        setEdit(false);
      }
    );
  };

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return <Profile />;
};

export default ProfilePage;
