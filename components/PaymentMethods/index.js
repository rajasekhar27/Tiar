import {
  cardPaymentMethods,
  upiPaymentMethods,
} from "../../data/paymentMethods";
import { AiOutlineLeft } from "react-icons/ai";

const PaymentMethods = (props) => {
  return (
    <div className="p-5 text-white">
      <div className="flex items-center text-ownOrange space-x-3 mb-5">
        <AiOutlineLeft color="white" size={25} />
        <h5 className="font-semibold text-[18px]">Add Funds in INR</h5>
      </div>

      <div className="flex items-center justify-between text-[18px] mb-10">
        <p className="font-semibold whitespace-nowrap">Amount to add:</p>
        <input
          type="number"
          className="p-3 w-[120px] text-[12px]"
          placeholder="Enter Amount"
        />
      </div>

      <PaymentMethod title={"UPI Payment"} methods={upiPaymentMethods} />
      <PaymentMethod title={"Debit/Credit Card"} methods={cardPaymentMethods} />
    </div>
  );
};

const PaymentMethod = ({ title, methods }) => {
  return (
    <div className="mt-5">
      <p className="font-medium text-[18px] border-b-[2px] py-2">{title}</p>

      <div className="flex flex-col space-y-3 mt-3">
        {methods?.map((m) => {
          return (
            <div
              key={m.id}
              className="flex items-center space-x-3 text-[16px] "
            >
              <img
                src={m.img}
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                alt=""
                className="w-[46px] h-[46px] rounded-md bg-white"
              />
              <p>{m.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
