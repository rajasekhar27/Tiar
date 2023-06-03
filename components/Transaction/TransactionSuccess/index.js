import { Player, Controls } from "@lottiefiles/react-lottie-player";

const TransactionSuccess = (props) => {
  return (
    <div className="min-h-screen grid place-items-center px-5">
      <div className="flex flex-col items-center space-y34">
        <Player
          autoplay
          loop
          src="/files/success.json"
          style={{ height: "300px", width: "300px" }}
        >
          <Controls visible={false} />
        </Player>

        <p className="text-white text-center text-[20px] font-semibold mt-6">
          Done! Your transaction has been successfully processed!
        </p>
      </div>
    </div>
  );
};

export default TransactionSuccess;
