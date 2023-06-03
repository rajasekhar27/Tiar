import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEmailRegistrationMutation } from "../../../store/apis/restApi";
import { signIn } from "next-auth/react";
import { FaAngleLeft } from "react-icons/fa";

const DetailsCollection = ({ handleReset, email }) => {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [phone, setPhone] = useState("");

  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const [emailRegistration] = useEmailRegistrationMutation();

  const onSubmit = (values) => {
    let backendFormat = {
      name: values.name,
      email: email,
    };

    if (values.referal_code) {
      backendFormat = {
        ...backendFormat,
        referal_code: values?.referal_code,
      };
    }

    if (phone) {
      backendFormat = {
        ...backendFormat,
        phone: phone,
      };
    }

    setDisableSubmit(true);

    // emailRegistration({ data: backendFormat }).then((res) => {
    //   if (res.data) {
    //     toast.success("user created successfully.login to continue");

    //     console.log("reg data: ", res.data);
    //     handleReset();
    //     router.push("/auth/login");
    //   }

    //   if (res.error) {
    //     toast.error(`something went wrong, ${res?.error?.data?.message}`);
    //   }

    //   setDisableSubmit(false);
    // });

    signIn("otp-login", {
      signup: JSON.stringify(backendFormat),
      redirect: false,
    })
      .then((data) => {
        // handleReset();
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        toast.success("Successfully registered");
        router.push("/");
      })
      .catch((er) => {
        toast.error("something went wrong");
      })
      .finally(() => setDisableSubmit(false));
  };

  const handlePhoneInput = (e) => {
    if (
      (/[0-9]/.test(e.target.value) || e.target.value === "") &&
      e.target.value.toString().length <= 10
    ) {
      setPhone(e.target.value);
    }
  };

  return (
    <form
      className="py-20 px-5 flex flex-col justify-between min-h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-white">
        <FaAngleLeft
          color="#FB6D3A"
          size={25}
          onClick={() => router.back()}
          className="mb-4"
        />

        <h1 className="text-ownOrange font-bold text-[24px]">Register</h1>

        <div className="mt-5">
          <p className="font-medium text-[16px]">
            Name <span className="text-ownOrange text-[20px]">*</span>
          </p>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter Your Name"
            className="w-full h-[43px] bg-transparent p-3 mt-2 rounded-md bg-[url('/images/frame_1.svg')]"
          />
        </div>
        <div className="mt-5">
          <p className="font-medium text-[16px]">
            Phone <span className="font-light text-[10px]">(Optional)</span>
          </p>
          <input
            type="number"
            placeholder="Enter Your Phone number"
            className="w-full h-[43px] bg-transparent p-3 mt-2 rounded-md bg-[url('/images/frame_1.svg')]"
            onChange={handlePhoneInput}
            value={phone}
          />
        </div>

        <div className="mt-5">
          <p className="font-medium text-[16px]">
            Referral Code{" "}
            <span className="font-light text-[10px]">(Optional)</span>
          </p>
          <input
            {...register("referal_code")}
            type="string"
            placeholder="Enter Referral Code"
            className="w-full h-[43px] bg-transparent p-3 mt-2 rounded-md bg-[url('/images/frame_1.svg')]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5 text-white">
        <button
          type="submit"
          className="w-[150px] h-[37px] bg-ownOrange rounded-sm flex flex-col justify-center items-center"
          disabled={disableSubmit}
        >
          {disableSubmit ? (
            <div
              className="refresh-loader"
              style={{ color: "white", width: "20px" }}
            ></div>
          ) : (
            "Register Now"
          )}
        </button>
      </div>
    </form>
  );
};

export default DetailsCollection;
