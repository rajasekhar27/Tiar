import { FiShoppingCart } from "react-icons/fi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { GoLinkExternal } from "react-icons/go";
import { BsChevronLeft } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useRouter } from "next/router";
import {
  useGetNFTMetadataQuery,
  useGetNFTTransactionsQuery,
  useLazyGetNFTTransactionsQuery,
} from "../../store/apis/restApi";
import { getWalletType } from "../../helpers/getWalletType";
import { useClipboard } from "@mantine/hooks";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthInfiniteScrollComponent from "../Generic/AuthInfiniteScrollComponent";
import { Disclosure } from "@headlessui/react";
import moment from "moment/moment";

const NFTDetails = (props) => {
  const router = useRouter();
  const clipboard = useClipboard({ timeout: 500 });

  const { slug } = router.query;

  const { data: nftMetadata } = useGetNFTMetadataQuery(
    {
      slug: slug,
    },
    { skip: slug ? false : true }
  );

  const { data: nftTransactionsData } = useGetNFTTransactionsQuery(
    {
      slug: slug,
    },
    { skip: slug ? false : true }
  );

  const handleCopy = (data) => {
    clipboard.copy(data);
    toast.success("Copied Successfully");
  };

  const handleWithdraw = () => {
    router.push(`/wallet/withdraw/nft/${slug}`);
  };

  return (
    <div className="">
      <div className="flex items-center space-x-3 absolute left-5 top-5">
        <BsChevronLeft color="white" size={20} onClick={() => router.back()} />
      </div>

      <div className="w-full h-[346px]">
        <img
          src={nftMetadata?.meta_data_details[0]?.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-5 flex flex-col">
        <div className="flex justify-between">
          <h5 className="font-medium text-[18px] px-3">
            {nftMetadata?.meta_data_details[0]?.name}
          </h5>
          {/* <div className="flex items-center space-x-2">
            <AiOutlineHeart />
            <p className="text-[14px]">399</p>
          </div> */}
        </div>

        <div className="flex items-center justify-between px-3">
          <div className="flex items-center space-x-3 font-medium text-[20px] my-5">
            <h5 className="text-ownOrange">Price: </h5>
            <h5 className="font-montserrat uppercase">
              {nftMetadata?.amount} {nftMetadata?.collections[0]?.coin}
            </h5>
          </div>

          <button
            className="px-3 bg-ownOrange py-1 rounded-sm text-[14px] font-medium"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>

        {/* <div className="flex flex-col space-y-3">
          <h6 className="text-ownOrange text-[18px] font-medium">Details</h6>
        </div> */}

        <DropDownComponent title={"About Wardroids"}>
          <p className="font-medium text-[12px] font-montserrat  p-3">
            {nftMetadata?.meta_data_details[0]?.description}
          </p>
        </DropDownComponent>

        <DropDownComponent title={"Properties"}>
          <div className="flex flex-col">
            {nftMetadata?.attributes?.map((a, idx) => (
              <div
                key={a.id}
                className="flex items-center justify-between border-y border-white/50 px-3 py-2"
              >
                <div>
                  <p className="text-[16px] font-medium">Property {idx + 1}</p>
                  <p className="text-[14px] mt-1">{a.trait_type}</p>
                </div>

                <p className="text-[16px]">{a.trait_count}</p>
              </div>
            ))}
          </div>
        </DropDownComponent>

        <DropDownComponent title={"Details"}>
          <div className="p-3 flex flex-col space-y-3">
            <div className="flex justify-between items-center text-[14px] font-medium space-x-2">
              <p className="whitespace-nowrap">Contract Address</p>
              <div className="max-w-[60%] flex items-center space-x-2">
                <p className="overflow-ellipsis truncate">
                  {nftMetadata?.token_address}
                </p>
                <FaRegCopy
                  size={20}
                  color={clipboard.copied ? "white" : "#F97F4E"}
                  onClick={handleCopy}
                />
              </div>
            </div>
            <div className="flex justify-between items-center text-[14px] font-medium">
              <p>Token ID</p>
              <p>{nftMetadata?.token_id}</p>
            </div>
            <div className="flex justify-between items-center text-[14px] font-medium">
              <p>Token Standard</p>
              <p>{nftMetadata?.collections[0]?.contract_type}</p>
            </div>
            <div className="flex justify-between items-center text-[14px] font-medium">
              <p>Blockchain</p>
              <p>{getWalletType(nftMetadata?.collections[0]?.coin)?.name}</p>
            </div>
          </div>
        </DropDownComponent>

        {/* Item Activity */}

        <h6 className="text-ownOrange text-[18px] font-medium my-3 px-3">
          Item Activity
        </h6>

        {nftTransactionsData?.map((t) => (
          <ItemDropDown
            title={"Sale"}
            date={moment(t?.date_created).fromNow()}
            amount={t?.amount}
            from={t?.from_address}
            to={t?.to_address}
            usd={t?.usd_value}
          />
        ))}
      </div>
    </div>
  );
};

const DropDownComponent = ({ title, children }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`bg-[#27294B] text-[18px] font-medium flex items-center justify-between px-3 py-2 ${
              open && "text-ownOrange"
            }`}
          >
            <p>{title}</p>
            {open ? <BiChevronUp /> : <BiChevronDown />}
          </Disclosure.Button>
          <Disclosure.Panel className="bg-[#313355]">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const ItemDropDown = ({ title, date, from, to, amount, usd }) => {
  return (
    <Disclosure as={"div"} className="w-full">
      {({ open }) => (
        <>
          <Disclosure.Button className="bg-[#27294B] text-[18px] font-medium flex items-center justify-between px-3 py-2 w-full">
            <div className="flex items-center space-x-2">
              <FiShoppingCart />
              <div>
                <h5 className="text-[16px] font-medium">{title}</h5>
                <p className="text-[14px] bg-[#D9D9D9]/10 px-2 rounded-sm">
                  {open ? "- Less" : "+ More"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h5 className="text-[16px] font-medium">{amount} ETH</h5>
              <p className="text-[14px] text-white/50">{date}</p>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="bg-[#313355] py-2 flex items-center justify-between px-3">
            <div className="text-[14px] flex flex-col items-center">
              <p className="font-medium text-white/50">USD Price</p>
              <p>${usd}</p>
            </div>
            {/* <div className="text-[14px] flex flex-col items-center">
              <p className="font-medium text-white/50">Quality</p>
              <p>1</p>
            </div> */}
            <div className="text-[14px] flex flex-col items-center">
              <p className="font-medium text-white/50">From</p>
              <p className=" truncate text-ellipsis max-w-[100px]">{from}</p>
            </div>
            <div className="text-[14px] flex flex-col items-center">
              <p className="font-medium text-white/50">To</p>
              <p className=" truncate text-ellipsis max-w-[100px]">{to}</p>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const TransactionCard = ({ data }) => {
  return (
    <tr className="text-[12px] border-b border-white w-full">
      <td className="flex items-start space-x-2 my-2">
        <TbArrowsLeftRight />
        <div>
          <p>Transfer</p>
          <div className="flex items-center space-x-2">
            <img
              src="/images/crypto_coin_logos/ethereum.svg"
              alt=""
              className="max-h-[15px]"
            />
            <p>8.5</p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-2">
          <p className="truncate text-ellipsis w-[50px]">{data.from_address}</p>{" "}
          - <p className="truncate text-ellipsis w-[50px]">{data.to_address}</p>
        </div>
      </td>
      <td className="flex items-center justify-between">
        <p>5 days ago</p>

        <GoLinkExternal size={20} />
      </td>
    </tr>
  );
};

export default NFTDetails;
