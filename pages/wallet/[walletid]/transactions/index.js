import { useRouter } from "next/router";

import CoinTransaction from "../../../../components/Wallet/CoinTransaction";

const WalletTransactions = (props) => {
  const router = useRouter();

  const { walletid } = router.query;

  return (
    <div>
      <CoinTransaction walletId={walletid} />
    </div>
  );
};

export default WalletTransactions;
