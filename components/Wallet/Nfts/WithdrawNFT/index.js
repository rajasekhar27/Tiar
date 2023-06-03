import { AiOutlineLeft } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import { useWithdrawNFTMutation } from "../../../../store/apis/restApi";
import { openNFTTransactionSuccessPopup } from "../../../../store/slices/wallet";
import { useDispatch } from "react-redux";

const WithdrawNFT = () => {
  const [disable, setDisable] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;

  const consentValue = watch("consent", false);

  const [withdrawNFT] = useWithdrawNFTMutation();

  const handleInitiateTransaction = (data) => {
    withdrawNFT({
      slug: slug,
      data: {
        to_address: data.address,
      },
    }).then((res) => {
      if (res.data) {
        // toast.success("Withdraw Successful");
        dispatch(openNFTTransactionSuccessPopup());
      }

      if (res.error) {
        toast.error(JSON.stringify(res.error.data));
      }
    });
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
            <p className="text-[18px] font-semibold">Withdraw NFT</p>
          </div>

          <div>
            <p className="font-medium text-[16px] mb-1">Address</p>
            <div className="bg-white/20 mt-2 border border-white focus-within:border-0 focus-within:bg-[url('/images/frame_1.svg')] rounded-md overflow-hidden">
              <input
                type="text"
                className="w-full h-[43px] bg-transparent p-3  focus-visible:ring-0 border-0 focus:ring-0 focus-visible:outline-none"
                {...register("address", { required: true })}
                placeholder="Enter Ethereum Address"
              />
            </div>

            <p className="text-[12px] text-white/60 mt-1">* Ethereum Address</p>
          </div>

          {/* <div className="w-full h-[1px] bg-white/50"></div>

          <div>
            <p className="font-medium text-[16px] mb-1">Amount</p>
            <p className="text-[10px] font-semibold">
              (Avl Blc: <span className="text-ownOrange uppercase">0</span>)
            </p>
          </div>

          <div>
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
          <div className="flex items-start space-x-2 p-3 px-5">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] rounded-md bg-transparent text-ownOrange"
              {...register("consent", { required: true })}
            />
            <p className="text-[14px] text-white/50">
              I hereby confirm that I am withdrawing these NFT assets either to
              my own crypto wallet or to a third party crypto wallet without any
              consideration in return.
            </p>
          </div>

          <div className="flex items-end space-x-2 p-3 px-5">
            <button
              className={`${
                consentValue ? "bg-ownOrange" : "bg-[#A6A6A6]"
              } py-1 rounded-md w-full m-auto flex flex-col h-[37px] justify-center items-center`}
              type="submit"
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
      </form>
    </>
  );
};

export default WithdrawNFT;
