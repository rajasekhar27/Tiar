import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { profileShuffle } from "../../../helpers/profileShuffle";
import {
  useGetUserProfileDetailsQuery,
  useUpdateProfileDataMutation,
  useUpdateProfilePictureMutation,
  useGetAllProfileStatsQuery,
} from "../../../store/apis/restApi";
import { openSearchFriendPopup } from "../../../store/slices/profile";

const ProfileStats = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  const imgRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [updateProfilePicture] = useUpdateProfilePictureMutation();
  const [updateProfileData] = useUpdateProfileDataMutation();
  const { data: userProfileData } = useGetUserProfileDetailsQuery();
  const { data: profileStats } = useGetAllProfileStatsQuery();

  useEffect(() => {
    setName(userProfileData?.user_profile?.name);
  }, [userProfileData]);

  const handleSave = () => {
    updateProfileData({
      slug: userProfileData?.slug,
      data: {
        name: name,
      },
    }).then((res) => {
      if (res.data) {
        toast.success("Your profile has been updated");
      }

      if (res.error) {
        toast.error(
          `something went wrong. ${JSON.stringify(res?.error?.data?.message)}`
        );
      }

      setEdit(false);
    });
  };

  const handleImgChange = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const formData = new FormData();

    formData.append("image", img);

    updateProfilePicture({
      slug: userProfileData?.slug,
      data: formData,
    }).then((res) => {
      if (res.data) {
        toast.success("Your profile has been updated");
      }

      if (res.error) {
        toast.error(
          `something went wrong. ${JSON.stringify(res?.error?.data?.message)}`
        );
      }
    });
  };

  return (
    <div className="w-full h-[135px] bg-white rounded-md p-3 flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <div
          className="relative"
          onClick={() => (edit ? imgRef.current.click() : {})}
        >
          <div className="w-[67px] h-[67px] overflow-hidden rounded-full">
            <input
              type="file"
              className="hidden"
              ref={imgRef}
              onChange={handleImgChange}
            />
            <img
              src={
                userProfileData?.user_profile?.image
                  ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userProfileData?.user_profile?.image}`
                  : profileShuffle()
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {edit && (
            <BsPencil
              color="#FB6D3A"
              size={13}
              className="absolute right-0 bottom-1"
            />
          )}
        </div>

        <div
          className="flex flex-col items-center"
          onClick={() => router.push("/profile/social/info/followers")}
        >
          <h3 className="font-semibold text-[18px]">
            {profileStats?.followers}
          </h3>
          <p className="text-[12px]">Followers</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.push("/profile/social/info/following")}
        >
          <h3 className="font-semibold text-[18px]">
            {profileStats?.following}
          </h3>
          <p className="text-[12px]">Following</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => router.push("/profile/social/info/friends")}
        >
          <h3 className="font-semibold text-[18px]">{profileStats?.friends}</h3>
          <p className="text-[12px]">Friends</p>
        </div>
      </div>

      <div className="flex justify-between mt-1">
        {!edit ? (
          <h5 className="text-ownOrange text-[16px] font-semibold mt-2 max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {userProfileData?.user_profile?.name}
          </h5>
        ) : (
          <input
            className="w-[40%] border border-ownOrange rounded-md px-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <div className="flex space-x-2 max-w-[70%]">
          {!edit ? (
            <>
              <button
                className="border-ownOrange bg-transparent rounded-md border-2 w-[171px] h-[32px] text-ownOrange flex items-center justify-center space-x-2"
                onClick={() => dispatch(openSearchFriendPopup())}
              >
                <FiSearch size={13} />
                <p className="text-[12px] font-medium">Find People</p>
              </button>
              <button
                className="bg-ownOrange rounded-md w-[171px] h-[32px] text-white flex items-center justify-center space-x-2"
                onClick={() => setEdit(true)}
              >
                <BsPencil size={13} />
                <p className="text-[12px] font-medium">Edit Profile</p>
              </button>
            </>
          ) : (
            <>
              <button
                className="border-ownOrange bg-transparent rounded-md border-2 w-[80px] h-[32px] text-ownOrange flex items-center justify-center space-x-2"
                onClick={handleSave}
              >
                <p className="text-[12px] font-medium">Save</p>
              </button>
              <button
                className="bg-ownOrange rounded-md w-[80px] h-[32px] text-white flex items-center justify-center space-x-2"
                onClick={() => setEdit(false)}
              >
                <p className="text-[12px] font-medium">Cancel</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
