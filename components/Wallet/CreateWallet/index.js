import { AiOutlineLeft } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  useCreateWalletMutation,
  useGetAllWalletCreationRequestsQuery,
} from "../../../store/apis/restApi";
import { toast } from "react-toastify";

const CreateWallet = (props) => {
  const { handleSubmit, register } = useForm();

  const { data: walletCreationRequestsData } =
    useGetAllWalletCreationRequestsQuery();

  const [createWallet] = useCreateWalletMutation();

  const onSubmit = (val) => {
    const { walletName, password, coin } = val;

    createWallet({
      wallet_lable: walletName,
      wallet_password: password,
      wallet_coin: coin,
    }).then((res) => {
      if (res.data) {
        toast.success("wallet creation requested successfully");
      }

      if (res.error) {
        toast.error("something went wrong");
      }
    });
  };

  return (
    <div className="text-white p-5">
      <div className="flex items-center space-x-3">
        <AiOutlineLeft color="white" />
        <p className="text-[18px] font-semibold">Create Wallet</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 mt-5"
      >
        <div>
          <p className="font-medium text-[16px] mb-1">Wallet Name</p>
          <input
            type="text"
            className="bg-transparent border w-full h-[43px] p-3"
            {...register("walletName", { required: true })}
          />
        </div>

        <div>
          <p className="font-medium text-[16px] mb-1">Password</p>
          <input
            type="password"
            className="bg-transparent border w-full h-[43px] p-3"
            {...register("password", { required: true })}
          />
        </div>

        <div>
          <p className="font-medium text-[16px] mb-1">Coin</p>
          <select
            className="bg-transparent border w-full h-[43px] p-3"
            {...register("coin", { required: true })}
          >
            <option value="">----------------</option>
            <option value="gteth">Etherium</option>
            <option value="tbtc">BitCoin</option>
          </select>
        </div>

        <div>
          <button
            className="w-[150px] h-[37px] rounded-md bg-ownOrange"
            type="submit"
          >
            Create Wallet
          </button>
        </div>
      </form>

      <div className="mt-5 flex overflow-x-auto space-x-3">
        {walletCreationRequestsData?.results.map((w) => {
          return (
            <div
              key={w.id}
              className="bg-[#434343]/40 rounded-md w-[150px] text-[12px] p-3"
            >
              <p>{w.user}</p>
              <p>{w.wallet_lable}</p>
              <p>{w.wallet_coin}</p>
              <p>{w.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateWallet;
