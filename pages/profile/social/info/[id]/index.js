import { useRouter } from "next/router";
import { useEffect } from "react";
import SocialContactTabs from "../../../../../components/Profile/SocialInfo/SocialContactTabs";

const MySocialInfo = (props) => {
  const router = useRouter();

  const { id } = router.query;

  const infoTypes = {
    followers: true,
    following: true,
    friends: true,
  };

  useEffect(() => {
    if (!id) return;
    if (infoTypes[id] === undefined) {
      router.push("/profile");
      return;
    }
  }, [id]);

  return (
    <div>
      <SocialContactTabs />
    </div>
  );
};

export default MySocialInfo;
