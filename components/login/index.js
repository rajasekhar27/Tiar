import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useForm } from "react-hook-form";
import { setEmail } from "../../store/slices/login";
import { useDispatch } from "react-redux";
import { useEmailLoginOtpMutation } from "../../store/apis/restApi";
import { toast } from "react-toastify";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const Login = (props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [emailLoginOtp, { isLoading: emailLoginOtpLoading }] =
    useEmailLoginOtpMutation();

  const onSubmit = (data) => {
    emailLoginOtp({ email: data.email }).then((res) => {
      if (res.data) {
        dispatch(setEmail(data.email));
        toast.success("Successfully sent to email");
      }

      if (res.error) {
        toast.error(JSON.stringify(res.error?.data?.message?.[0]));
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-20 px-5 flex flex-col justify-between min-h-screen"
    >
      <div>
        <FaAngleLeft
          color="#FB6D3A"
          size={25}
          onClick={() => router.back()}
          className="mb-4"
        />

        <h1 className="text-ownOrange font-bold text-[24px]">
          Enter your Email to login
        </h1>
        <h6 className="font-light text-white mt-5">
          We will send you confirmation code
        </h6>
      </div>

      {/* <PhoneInputWithCountry
        name="phoneInputWithCountrySelect"
        control={control}
        defaultCountry="IN"
        className="bg-white w-full h-[51px] rounded-md px-3 font-medium"
        rules={{ required: true }}
      /> */}

      {/* <div className="flex w-full bg-white rounded-md overflow-hidden">
        <div className="p-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
            alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
            className="w-[30px]"
          />
        </div>
        <input
          type="number"
          className="w-full px-3 text-lg"
          {...register("phone", { required: true })}
        />
      </div> */}
      <div className="mt-5">
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Enter Your Email ID"
          className="w-full h-[43px] bg-transparent text-white p-3 mt-2 rounded-md bg-[url('/images/frame_1.svg')]"
        />
      </div>

      <div className="flex flex-col items-center space-y-5 text-white">
        <button
          className="w-[150px] h-[37px] bg-ownOrange rounded-sm flex flex-col justify-center items-center"
          disabled={emailLoginOtpLoading}
        >
          {emailLoginOtpLoading ? (
            <div
              className="refresh-loader"
              style={{ color: "white", width: "20px" }}
            ></div>
          ) : (
            "Send OTP"
          )}
        </button>
      </div>
    </form>
  );
};

export default Login;
