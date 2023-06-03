import Head from "next/head";
import dynamic from "next/dynamic";
import jwt from "jsonwebtoken";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import {
  useDispatch,
  Provider as ReduxProvider,
  useSelector,
} from "react-redux";
import { useEffect } from "react";

import Layout from "../components/Layout";
import UserSelectedTeamsPopup from "../components/UserContests/UserSelectedTeamsPopup";
import SwitchTeamsPopup from "../components/UserContests/SwitchTeamsPopup";
import DesktopPreview from "../components/DesktopPreview";
import OtherTeamPreview from "../components/Cricket/OtherTeamPreview";
import ConfirmPaymentPopup from "../components/ComfirmPaymentPopup";
import store from "../store/store";
import { addUserData, addTokens, removeTokens } from "../store/slices/auth";
const PaymentConfirmationPopup = dynamic(
  () => import("../components/PaymentConfirmationPopup"),
  { ssr: false }
);

import "../styles/globals.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-phone-number-input/style.css";
import "tippy.js/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import "../scripts/wdyr";
import restApi, {
  useSendUserInteractionSignalMutation,
} from "../store/apis/restApi";
import WhitelistConfirmationPopup from "../components/WhitelistConfirmationPopup";
import WhitelistGreetingPopup from "../components/WhitelistGreetingPopup";
import axios from "axios";
import Loader from "../components/UI/Loader";
import ReminderPopup from "../components/Notifications/ReminderPopup";
import SearchFriendPopup from "../components/Profile/SearchFriendPopup";
import QRScannerPopup from "../components/QRScannerPopup";
import TicketDetailsPopup from "../components/MyTickets/TicketDetailsPopup";
import ChatUsersPopup from "../components/Chat/ChatUsersPopup";
import "animate.css";
import { useMediaQuery } from "@mantine/hooks";
import NFTWithdrawSuccessPopup from "../components/Wallet/Nfts/WithdrawNFT/NFTWithdrawSuccessPopup";

function MyApp({ Component, pageProps }) {
  const { data, status } = useSession();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  const matches = useMediaQuery("(min-width: 768px)");

  const [sendUserInteractionSignal] = useSendUserInteractionSignalMutation();

  useEffect(() => {
    if (data?.accessToken) {
      sendUserInteractionSignal({ status: true });
    }
  }, [token]);

  useEffect(() => {
    if (status === "loading") return;

    const localVersion = localStorage.getItem("version");

    const logCheck = async () => {
      if (status === "authenticated" && data.user && data.accessToken) {
        let serverVersion = "";
        try {
          const response = await axios.get("/api/version");
          serverVersion = response.data.version;
          localStorage.setItem("SER: ", serverVersion);
        } catch (err) {
          console.log(err);
          return;
        }

        if (!localVersion) {
          localStorage.setItem("version", serverVersion);
          // signOut();

          dispatch(addUserData(data.user));
          dispatch(
            addTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );

          dispatch(restApi.util.resetApiState());
          return;
        }

        if (localVersion !== serverVersion) {
          localStorage.setItem("version", serverVersion);
          signOut();
          return;
        }

        if (jwt.decode(data.accessToken).exp < Date.now() / 1000) {
          dispatch(removeTokens());
          signOut();
          return;
        }

        dispatch(addUserData(data.user));
        dispatch(
          addTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );

        dispatch(restApi.util.resetApiState());
      }
    };
    logCheck();

    if (status === "unauthenticated") {
      dispatch(removeTokens());
    }
  }, [status]);

  // useEffect(() => {
  //   if (status === "authenticated" && data.user && data.accessToken) {
  //     if (jwt.decode(data.accessToken).exp < Date.now() / 1000) {
  //       dispatch(removeTokens());
  //       signOut();
  //       return;
  //     }
  //     dispatch(addUserData(data.user));
  //     dispatch(
  //       addTokens({
  //         accessToken: data.accessToken,
  //         refreshToken: data.refreshToken,
  //       })
  //     );
  //     dispatch(restApi.util.resetApiState());
  //   }
  //   if (status === "unauthenticated") {
  //     dispatch(removeTokens());
  //   }
  // }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {matches ? (
        <DesktopPreview>
          <Layout extraClasses="w-full max-w-[450px]">
            <Component {...pageProps} />
          </Layout>
        </DesktopPreview>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

function App(props) {
  return (
    <SessionProvider session={props.session}>
      <ReduxProvider store={store}>
        <Loader global={true} />
        <SearchFriendPopup />
        <UserSelectedTeamsPopup />
        <SwitchTeamsPopup />
        <PaymentConfirmationPopup />
        <ConfirmPaymentPopup />
        <OtherTeamPreview />
        <WhitelistConfirmationPopup />
        <WhitelistGreetingPopup />
        <ReminderPopup />
        <TicketDetailsPopup />
        <ChatUsersPopup />
        <NFTWithdrawSuccessPopup />
        <MyApp {...props} />
      </ReduxProvider>
    </SessionProvider>
  );
}

export default App;
