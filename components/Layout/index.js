import FooterTabs from "../FooterTabs";
import { useRouter } from "next/router";
import { showFooterTabs } from "../../data/footerTabsData";
import { useEffect, useState } from "react";

const Layout = ({ children, extraClasses }) => {
  const router = useRouter();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showFooterTabs.filter((p) => p === router.pathname).length !== 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router.pathname]);

  return (
    <>
      <main>{children}</main>
      {show && <FooterTabs extraClasses={extraClasses} />}
    </>
  );
};

export default Layout;
