import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button className="bg-blue-600 text-white rounded-[5px] py-4 px-6">
        Submit
      </button>
    </form>
  );
};
export default CheckoutForm;
