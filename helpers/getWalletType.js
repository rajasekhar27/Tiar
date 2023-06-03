import {
  Bitcoin,
  Ethereum,
  Matic,
  Solana,
  Tiar,
  Usdt,
  Tezos,
} from "../data/wallet";

export const getWalletType = (coin) => {
  if (!coin) return;

  coin = coin.toLowerCase();

  if (coin === "gteth" || coin === "eth") {
    return Ethereum;
  }

  if (coin === "tbtc" || coin === "btc") {
    return Bitcoin;
  }

  if (coin === "tiar") {
    return Tiar;
  }

  if (coin === "solana" || coin === "sol" || coin === "tsol") {
    return Solana;
  }

  if (coin === "usdt") {
    return Usdt;
  }

  if (coin === "matic") {
    return Matic;
  }

  if (coin === "xtz" || coin === "txtz") {
    return Tezos;
  }
};
