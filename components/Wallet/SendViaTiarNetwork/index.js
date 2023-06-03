import { AiOutlineLeft } from "react-icons/ai";
import { useForm, UseForm } from "react-hook-form";
import {
  useCreateLocalTransactionEmailMutation,
  useCreateLocalTransactionMutation,
  useGetUserWalletBalanceQuery,
} from "../../../store/apis/restApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openQRScannerPopup } from "../../../store/slices/wallet";

const SendViaTiarNetwork = (props) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const router = useRouter();

  const { id } = router.query;
  const dispatch = useDispatch();

  const consentValue = watch("consent", false);

  // const [createLocalTransaction] = useCreateLocalTransactionMutation();
  const [createLocalTransaction, { isLoading }] =
    useCreateLocalTransactionEmailMutation();

  const { data: balanceData } = useGetUserWalletBalanceQuery(
    {
      wallet_id: id,
    },
    { skip: id ? false : true }
  );

  const handleMax = () => {
    setValue("amount", balanceData?.balance);
  };

  const handleScanner = () => {
    dispatch(openQRScannerPopup());
  };

  const onSubmit = (values) => {
    delete values["consent"];
    const backendData = {
      ...values,
      coin: balanceData?.coin,
    };
    createLocalTransaction(backendData).then((res) => {
      if (res.data) {
        toast.success("transaction successfully");
        router.push("/wallet");
      }

      if (res.error) {
        toast.error(res.error.data.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-5 text-white flex flex-col justify-between min-h-screen"
    >
      <div className="flex flex-col space-y-5 px-5">
        <div className="flex items-center space-x-3 mb-5">
          <AiOutlineLeft color="white" onClick={() => router.back()} />
          <p className="text-[18px] font-semibold">Send TIAR Network</p>
        </div>

        <div>
          <p className="font-medium text-[16px] mb-1">Email ID (TIAR)</p>
          <div className="bg-white/20 mt-2 border overflow-hidden border-white focus-within:border-0 focus-within:bg-[url('/images/frame_1.svg')] rounded-md flex items-center space-x-2">
            <input
              type="email"
              className="w-full h-[43px] bg-transparent p-3  focus-visible:ring-0 border-0 focus:ring-0 focus-visible:outline-none"
              {...register("email", { required: true })}
              // placeholder="Enter Here or Scan QR code"
              placeholder="Enter Here"
            />

            {/* <MdOutlineQrCodeScanner size={24} onClick={handleScanner} /> */}
          </div>
          {/* <p className="text-[12px]">*Lorem ipsum</p> */}
        </div>

        <div>
          <p className="font-medium text-[16px] mb-1">
            {balanceData?.coin?.toUpperCase()} Amount
          </p>
          <p className="text-[10px] font-semibold">
            (Avl Blc:{" "}
            <span className="text-ownOrange uppercase">
              {parseFloat(balanceData?.balance).toFixed(5)} {balanceData?.coin}
            </span>
            )
          </p>
          <div className="bg-white/20 mt-2 border border-white focus-within:border-0 focus-within:bg-[url('/images/frame_1.svg')] rounded-md flex items-center space-x-2 pr-2">
            <input
              type="number"
              className="w-full h-[43px] bg-transparent p-3  focus-visible:ring-0  focus:ring-0 focus-visible:outline-none border-0"
              step={0.000000000001}
              {...register("amount", { required: true, valueAsNumber: true })}
              placeholder={`Min:0.00000${balanceData?.coin}`}
            />
            <button
              className="bg-ownOrange font-semibold text-[14px] p-2 py-1 rounded-md"
              onClick={handleMax}
            >
              Max
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex items-start space-x-2 border-b border-white p-3 px-5">
          <input
            type="checkbox"
            className="w-[18px] h-[18px] rounded-md bg-transparent text-ownOrange"
            {...register("consent", { required: true })}
          />
          <p className="text-[14px] text-white/50">
            I hereby confirm that I am withdrawing these crypto assets either to
            my own crypto wallet or to a third party crypto wallet without any
            consideration in return.
          </p>
        </div>

        <div className="flex items-end space-x-2 p-3 px-5">
          <div className="w-1/2 text-[14px] text-white/50">
            <p className="">Receive Amount</p>
            <h3 className="text-[24px] text-white flex items-center font-semibold">
              0{" "}
              <span className="text-[16px] uppercase ml-2">
                {balanceData?.coin}
              </span>
            </h3>
            <p className="uppercase">FEE: 0.00000{balanceData?.coin}</p>
          </div>

          <div className="w-1/2">
            <button
              type="submit"
              className={`${
                consentValue ? "bg-ownOrange" : "bg-[#A6A6A6]"
              } py-1 rounded-md w-full m-auto flex flex-col h-[37px] justify-center items-center`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div
                  className="refresh-loader"
                  style={{ color: "white", width: "20px" }}
                ></div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SendViaTiarNetwork;
