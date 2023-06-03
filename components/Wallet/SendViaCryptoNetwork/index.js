import { AiOutlineLeft } from "react-icons/ai";
import {
  useGetUserWalletBalanceQuery,
  useInitiateTransactionMutation,
  useRaiseWithdrawRequestMutation,
} from "../../../store/apis/restApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import { getWalletType } from "../../../helpers/getWalletType";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import QrReader from "react-qr-scanner";
import Modal from "../../UI/Modal";
import { BsChevronLeft } from "react-icons/bs";

const SendViaCryptoNetwork = ({ walletId, coin }) => {
  const [disable, setDisable] = useState(false);
  const [amount, setAmount] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm();

  const router = useRouter();
  const { id } = router.query;

  const { data: balanceData } = useGetUserWalletBalanceQuery(
    {
      wallet_id: id,
    },
    { skip: id ? false : true }
  );

  const [raiseWithdrawRequest] = useRaiseWithdrawRequestMutation();

  const consentValue = watch("consent", false);

  const handleAmountInput = (e) => {
    if (/[0-9]/.test(e.target.value) || e.target.value == "") {
      setAmount(e.target.value);
    }
  };

  const handleMax = () => {
    setValue("amount", balanceData?.balance);
  };

  const handleScanner = () => {
    setShowScanner(true);
  };

  const handleInitiateTransaction = (data) => {
    // if (!amount) return;
    console.log(data);
    setDisable(true);
    raiseWithdrawRequest({
      data: { amount: data.amount, to_address: data.address },
      coin: balanceData?.coin,
      // user_wallet: walletId,
    }).then((res) => {
      if (res.data) {
        toast.success(
          "request initiated successfully.transfer will be done after admin's approval"
        );
        router.push("/wallet");
      }

      if (res.error) {
        toast.error(res.error.data?.message);
      }

      setDisable(false);
    });
  };

  // const handleInitiateTransaction = (data) => {
  //   setDisable(true);
  //   initiateTransaction({
  //     walletID: walletId,
  //     password: data.password,
  //     coin: coin,
  //     amount: data.amount,
  //     toAddress: data.address,
  //   }).then((res) => {
  //     if (res.data) {
  //       router.push("/transaction/sucess");
  //     }
  //     if (res.error) {
  //       toast.error(res.error.data.message);
  //     }

  //     setDisable(false);
  //   });
  // };

  const previewStyle = {
    height: "100vh",
    width: "100%",
  };

  const handleScan = (data) => {
    if (data) {
      setShowScanner(false);
      setValue("address", data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleInitiateTransaction)}
        className="py-5 text-white flex flex-col justify-between min-h-screen "
      >
        <div className="flex flex-col space-y-5 px-5">
          <div className="flex items-center space-x-3 mb-5">
            <AiOutlineLeft color="white" onClick={() => router.back()} />
            <p className="text-[18px] font-semibold">
              Withdraw {getWalletType(balanceData?.coin)?.name}
            </p>
          </div>

          <div>
            <p className="font-medium text-[16px] mb-1">Destination Address</p>
            <div className="bg-white/20 mt-2 border border-white focus-within:border-0 focus-within:bg-[url('/images/frame_1.svg')] rounded-md flex items-center space-x-2 pr-2">
              <input
                type="text"
                className="w-full h-[43px] bg-transparent p-3  focus-visible:ring-0 border-0 focus:ring-0 focus-visible:outline-none"
                {...register("address", { required: true })}
                placeholder="Enter Address or Scan QR"
              />
              <MdOutlineQrCodeScanner size={24} onClick={handleScanner} />
            </div>
          </div>

          {/* <div>
        <p className="font-medium text-[16px] mb-1">Password</p>
        <input
          type="password"
          className="bg-transparent border w-full h-[43px] p-3"
          {...register("password", { required: true })}
        />
      </div> */}

          <div className="w-full h-[1px] bg-white/50"></div>

          {/* <div>
        <p className="font-medium text-[16px] mb-1">Available Amount</p>
        <p className="font-medium text-[16px] mb-1 uppercase">
          {parseFloat(balanceData?.balance).toFixed(5)} {balanceData?.coin}
        </p>
      </div> */}

          {/* <div>
        <p className="font-medium text-[16px] mb-1">Amount</p>
        <input
          type="number"
          className="w-full h-[43px] bg-transparent p-3 mt-2 rounded-md bg-[url('/images/frame_1.svg')]"
          // {...register("amount", { required: true })}
          onChange={handleAmountInput}
          value={amount}
          step={0.00000001}
        />
      </div> */}

          <div>
            <p className="font-medium text-[16px] mb-1">
              {balanceData?.coin?.toUpperCase()} Amount
            </p>
            <p className="text-[10px] font-semibold">
              (Avl Blc:{" "}
              <span className="text-ownOrange uppercase">
                {parseFloat(balanceData?.balance).toFixed(5)}{" "}
                {balanceData?.coin}
              </span>
              )
            </p>
            <div className="bg-white/20 mt-2 border border-white focus-within:border-0 focus-within:bg-[url('/images/frame_1.svg')] rounded-md flex items-center space-x-2 pr-2">
              <input
                type="number"
                className="w-full h-[43px] bg-transparent p-3  focus-visible:ring-0  focus:ring-0 focus-visible:outline-none border-0"
                step={0.000000000001}
                {...register("amount", { required: true, valueAsNumber: true })}
                placeholder={`Min:0.00000${balanceData?.coin?.toUpperCase()}`}
              />
              <button
                className="bg-ownOrange font-semibold text-[14px] p-2 py-1 rounded-md"
                onClick={handleMax}
              >
                Max
              </button>
            </div>
          </div>

          {/* <div>
            <p className="font-medium text-[16px] mb-1">Remark(Optional)</p>
            <div className="bg-white/20 mt-2 border border-white focus-within:border-0 focus-within:bg-[url('/images/frame_1.svg')] rounded-md flex items-center space-x-2 pr-2">
              <input
                type="text"
                className="w-full h-[43px] bg-transparent p-3  focus-visible:ring-0 border-0 focus:ring-0 focus-visible:outline-none"
                {...register("remark", { required: true })}
              />
            </div>
          </div> */}

          {/* <div className="font-medium text-[14px]">
        <p className="mb-2 text-[16px]">Tips</p>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
      </div> */}
        </div>

        <div className="">
          <div className="flex items-start space-x-2 border-b border-white p-3 px-5">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] rounded-md bg-transparent text-ownOrange"
              {...register("consent", { required: true })}
            />
            <p className="text-[14px] text-white/50">
              I hereby confirm that I am withdrawing these crypto assets either
              to my own crypto wallet or to a third party crypto wallet without
              any consideration in return.
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
                className={`${
                  consentValue ? "bg-ownOrange" : "bg-[#A6A6A6]"
                } py-1 rounded-md w-full m-auto flex flex-col h-[37px] justify-center items-center`}
                type="submit"
                disabled={disable}
              >
                {disable ? (
                  <div
                    className="refresh-loader"
                    style={{ color: "white", width: "20px" }}
                  ></div>
                ) : (
                  "Withdraw"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {showScanner && (
        <Modal isOpen={true}>
          <div className="relative bg-gray-400">
            <QrReader
              delay={100}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />

            <div
              className="absolute top-5 left-5 text-white flex items-center space-x-2 z-10"
              onClick={() => setShowScanner(false)}
            >
              <BsChevronLeft />
              <p className="text-[16px] font-semibold">Back</p>
            </div>

            <div className="absolute top-0 bottom-0 left-0 right-0 grid place-items-center bg-black/30">
              <div className="mix-blend-overlay bg-white">
                <img src="/images/frame_20.svg" alt="" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SendViaCryptoNetwork;
