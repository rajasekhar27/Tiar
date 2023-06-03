import { AiOutlineLeft } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { QRCodeCanvas } from "qrcode.react";
import { useClipboard } from "@mantine/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Deposit = ({ address }) => {
  const clipboard = useClipboard({ timeout: 500 });
  const router = useRouter();

  const handleQRDownload = () => {
    const canvas = document.getElementById("qr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${address}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Crypto Deposit Address",
          url: address,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      // fallback
      toast.warning(
        "Looks Like Sharing is not supported in your device.use copy instead"
      );
    }
  };

  const handleCopy = () => {
    clipboard.copy(address);
    toast.success("Copied Address Successfully");
  };

  return (
    <div className="p-5 text-white min-h-screen flex flex-col justify-between pb-10">
      <div>
        <div className="flex items-center space-x-3">
          <AiOutlineLeft color="white" onClick={() => router.back()} />
          <p className="text-[18px] font-semibold">Deposit Crypto</p>
        </div>

        <div className="flex flex-col items-center mt-5 space-y-5">
          <div className="flex items-center space-x-2">
            <p className="text-white/50 text-[14px]">Network -</p>
            <h3 className="text-[24px] font-semibold">ERC 20</h3>
          </div>

          <div className="w-[231px] h-[228px] p-5 bg-white animate__animated animate__zoomIn">
            <QRCodeCanvas
              value={address ? address : "https://tiar.io/"}
              style={{ height: "100%", width: "100%" }}
              id="qr"
            />
          </div>

          <p className="text-center text-[12px]">
            Send only Crypto to this deposit address.This address does not
            support deposit of non-fungible token,please go to NFT page to
            deposit NFT
          </p>

          <div className="flex items-center justify-between w-full py-5 z-[3]">
            <div>
              <p className="text-[16px] font-medium">Crypto Deposit Address</p>
              <p className="text-[13px]">{address}</p>
            </div>

            <IoCopyOutline
              color={clipboard.copied ? "green" : "white"}
              size={20}
              onClick={handleCopy}
            />
          </div>

          {/* <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[16px] font-medium">Network</p>
            <p className="text-[14px]">Ethereum (ERC 20)</p>
          </div>

          <TbNetwork size={20} />
        </div>

        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[16px] font-medium">Selected Wallet</p>
            <p className="text-[14px]">Spot Wallet</p>
          </div>
        </div> */}
        </div>
      </div>

      <div className="flex justify-between w-full space-x-2 mt-10">
        <button
          className="bg-ownOrange w-[145px] h-[43px] rounded-md"
          onClick={handleQRDownload}
        >
          Save Image
        </button>

        <button
          className="bg-transparent border-white border-2 w-[145px] h-[43px] text-white rounded-md"
          onClick={handleShare}
        >
          Share Address
        </button>
      </div>
    </div>
  );
};

export default Deposit;
