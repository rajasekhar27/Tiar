import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useEnterContestMutation,
  useGetContestDetailsQuery,
  useJoinContestDirectlyAfterTeamCreationMutation,
  useJoinContestDirectlyMutation,
} from "../../store/apis/restApi";
import { setCurrentScreen } from "../../store/slices/cricket";
import {
  closeConfirmPaymentPopup,
  openPaymentConfirmationPopup,
} from "../../store/slices/games";
import Modal from "../UI/Modal";
import { reset } from "../../store/slices/cricket";

const ConfirmPaymentPopup = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const popupStatus = useSelector(
    (state) => state.games.confirmPaymentPopup.status
  );
  const helperData = useSelector(
    (state) => state.games.confirmPaymentPopup.helperData
  );

  const [
    joinContestDirectlyAfterTeamCreation,
    {
      isFetching: joinContestDirectlyAfterTeamCreationFetching,
      isLoading: joinContestDirectlyAfterTeamCreationLoading,
    },
  ] = useJoinContestDirectlyAfterTeamCreationMutation();

  const [
    joinContestDirectly,
    {
      isFetching: joinContestDirectlyFetching,
      isLoading: joinContestDirectlyLoading,
    },
  ] = useJoinContestDirectlyMutation();

  const [
    enterContest,
    { isFetching: enterContestFetching, isLoading: enterContestLoading },
  ] = useEnterContestMutation();

  const { data: contestData } = useGetContestDetailsQuery(
    { slug: helperData?.slug },
    { skip: helperData?.slug ? false : true }
  );

  const count = helperData?.count ? helperData?.count : 1;

  const handleJoinContest = () => {
    if (
      joinContestDirectlyAfterTeamCreationFetching ||
      joinContestDirectlyFetching ||
      enterContestFetching
    )
      return;

    if (helperData?.status === 1) {
      joinContestDirectlyAfterTeamCreation(helperData?.data).then((res) => {
        if (res.data) {
          dispatch(openPaymentConfirmationPopup());
          router.push(`/games/cricket/${helperData?.matchSlug}`);
        }

        if (res.error) {
          toast.error(res.error?.data?.message);
          if (res.error?.data?.insufficient === `False`) {
            router.push(`/wallet/deposit/crypto`);
          }
          // if (res.error?.data?.non_field_errors?.[0]) {
          //   // dispatch(setCurrentScreen(3));
          //   dispatch(reset());
          //   // router.push(`/games/cricket/contest/${router?.query?.contest}`);
          // }
        }

        dispatch(closeConfirmPaymentPopup());
      });

      return;
    }

    if (helperData?.status === 2) {
      joinContestDirectly({ slug: helperData?.data?.slug, data: {} }).then(
        (res) => {
          if (res.data) {
            dispatch(openPaymentConfirmationPopup());
          }

          if (res.error) {
            toast.error("something went wrong");
            if (res.error?.data?.insufficient === `False`) {
              router.push(`/wallet/deposit/crypto`);
            }
          }

          dispatch(closeConfirmPaymentPopup());
        }
      );

      return;
    }

    if (helperData?.status === 3) {
      enterContest(helperData?.data).then((res) => {
        if (res.data) {
          dispatch(openPaymentConfirmationPopup());
          router.push("/games/cricket");
        }

        if (res.error) {
          toast.error(res.error.data.message);
          if (res.error?.data?.insufficient === `False`) {
            router.push(`/wallet/deposit/crypto`);
          }
        }

        dispatch(closeConfirmPaymentPopup());
      });
    }
  };

  return (
    <Modal
      isOpen={popupStatus}
      parentClasses="bg-black/50 grid place-items-center"
      close={() => dispatch(closeConfirmPaymentPopup())}
    >
      <div
        className="bg-ownBlue1 w-[300px] rounded-lg text-white h-[400px] p-3 flex flex-col items-center justify-between pb-10 animate__animated animate__zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between w-full">
          <p>CONFIRMATION</p>
          <p onClick={() => dispatch(closeConfirmPaymentPopup())}>x</p>
        </div>

        <div className="w-full uppercase">
          <div className="flex justify-between w-full">
            <p>Entry</p>
            <p>
              {contestData?.discount_entry_fee} {contestData?.coin}
            </p>
          </div>
          <div className="h-[0.5px] bg-white my-2"></div>
          <div className="flex justify-between w-full">
            <p>To Pay</p>
            <p>
              {contestData?.discount_entry_fee * count} {contestData?.coin}
            </p>
          </div>
        </div>

        <div>
          <button
            className="bg-ownOrange px-5 py-1 rounded-md flex flex-col justify-center items-center"
            onClick={handleJoinContest}
            disabled={
              joinContestDirectlyFetching ||
              joinContestDirectlyAfterTeamCreationFetching ||
              enterContestFetching ||
              joinContestDirectlyAfterTeamCreationLoading ||
              joinContestDirectlyLoading ||
              enterContestLoading
            }
          >
            {joinContestDirectlyFetching ||
            joinContestDirectlyAfterTeamCreationFetching ||
            enterContestFetching ||
            joinContestDirectlyAfterTeamCreationLoading ||
            joinContestDirectlyLoading ||
            enterContestLoading ? (
              <div
                className="refresh-loader"
                style={{ color: "white", width: "20px" }}
              ></div>
            ) : (
              "Join Contest"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPaymentPopup;
