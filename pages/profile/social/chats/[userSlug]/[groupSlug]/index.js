import { useRouter } from "next/router";
import CustomerSupport from "../../../../../../components/CustomerSupport";

const PersonalChatPage = (props) => {
  const router = useRouter();
  const { userSlug, groupSlug } = router.query;
  // console.log(userSlug, groupSlug);
  console.log(router.query);
  return (
    <div>
      <CustomerSupport userSlug={userSlug} groupSlug={groupSlug} />
    </div>
  );
};

export default PersonalChatPage;
