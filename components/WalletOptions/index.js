import { useRouter } from "next/router";

const WalletOptions = ({ tabIndex }) => {
  const router = useRouter();

  const handleDeposit = () => {
    const route = tabIndex === 0 ? "wallet/deposit/crypto" : "wallet"; // "wallet/deposit/nft"
    router.push(route);
  };

  const handleWithdraw = () => {
    const route = tabIndex === 0 ? "wallet/withdraw/crypto" : "wallet"; // "wallet/crypto/nft"

    router.push(route);
  };

  const handleBuy = () => {
    router.push("/wallet/buy/crypto");
  };

  return (
    <div className="flex space-x-3 px-5 items-center fixed bottom-[88px] w-full bg-[#0a0c32] pt-3  md:max-w-[450px]">
      <button
        className="bg-white h-[37px] text-ownOrange w-[33.33%] px-5 rounded-sm"
        onClick={handleDeposit}
      >
        Deposit
      </button>
      <button
        className="bg-ownOrange h-[37px] text-white w-[33.33%] px-5 rounded-sm whitespace-nowrap"
        onClick={handleBuy}
      >
        Buy Crypto
      </button>
      <button
        className="text-ownOrange bg-white h-[37px] w-[33.33%] px-5 rounded-sm"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </div>
  );
};

export default WalletOptions;
