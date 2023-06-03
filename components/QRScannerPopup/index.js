import { useState } from "react";
import QrReader from "react-qr-scanner";
// import { QrReader } from "react-qr-reader";
import { BsChevronLeft } from "react-icons/bs";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeQRScannerPopup } from "../../store/slices/wallet";

const QRScannerPopup = ({ handleQR }) => {
  // const [result, setResult] = useState();
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.wallet.QRScannerPopup.status
  );

  const previewStyle = {
    height: "100vh",
    width: "100%",
  };

  const handleScan = (data) => {
    // console.log("rrr: ", data);
    // setResult(data.text);
    if (data) {
      handleQR(data.text);
      dispatch(closeQRScannerPopup());
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Modal isOpen={popupStatus}>
      <div className="relative bg-gray-400">
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />

        <div
          className="absolute top-5 left-5 text-white flex items-center space-x-2 z-10"
          onClick={() => dispatch(closeQRScannerPopup())}
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
  );
};

export default QRScannerPopup;
