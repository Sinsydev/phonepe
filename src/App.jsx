import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaListAlt, FaCreditCard, FaShieldAlt, FaUndoAlt, FaCheckCircle } from "react-icons/fa";

export default function PaymentPage() {
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [amount, setAmount] = useState(1299);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        if (minutes === 0) {
          clearInterval(timer);
          return 0;
        }
        setMinutes((m) => m - 1);
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes]);

  function handleContinue(provider) {
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Simulated payment flow: ${provider} — Amount: ₹${amount}`);
      setIsProcessing(false);
    }, 900);
  }

  const paymentOptions = [
    { icon: "📱", label: "PhonePe" },
    { icon: "💰", label: "Paytm" },
    { icon: "🅿️", label: "Google Pay" },
    { icon: "💳", label: "All UPI" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-8">
      {/* Header */}
      <header className="flex flex-col items-center justify-center w-full mb-8">
        <h2 className="text-4xl font-bold font-sans text-purple-600 mb-4">
          Payments
        </h2>

        {/* Step Icons */}
        <div className="relative w-full max-w-2xl mb-6 px-6">
          <div className="absolute left-8 right-8 top-1/2 transform -translate-y-1/2 h-px bg-blue-200"></div>
          <div className="relative z-10 flex w-full items-center justify-around">
            <StepIcon icon={<FaMapMarkerAlt />} label="Address" isActive={false} />
            <StepIcon icon={<FaListAlt />} label="Order Summary" isActive={false} />
            <StepIcon icon={<FaCreditCard />} label="Payment" isActive={true} />
          </div>
        </div>

        {/* Logo */}
        <div className="w-full h-[65vh] overflow-hidden">
          <img
            src="/bg.png"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Timer */}
      <div className="my-4 flex justify-center">
        <div className="w-32 text-center">
          <div className="text-xs text-blue-500">Time left</div>
          <div className="mt-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 rounded-md text-sm font-bold">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Payment Section */}
       <section className="w-full mt-6 flex flex-col gap-2">
  {paymentOptions
    .filter(opt => opt.label !== "Google Pay") // remove Google Pay
    .map((opt) => (
      <div
        key={opt.label}
        onClick={() => setSelectedOption(opt.label)}
        className={`flex items-center w-full p-4 cursor-pointer rounded
          ${selectedOption === opt.label ? "bg-blue-100 border-l-4 border-blue-500" : "bg-gray-100"}`}
      >
        <span className="text-2xl mr-3">{opt.icon}</span>
        <span className="font-medium">{opt.label}</span>
      </div>
    ))
  }

  {selectedOption && (
    <button
      onClick={() => handleContinue(selectedOption)}
      disabled={isProcessing}
      className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
    >
      {isProcessing ? "Processing..." : `Pay ₹${amount} with ${selectedOption}`}
    </button>
  )}
</section>


{/* Price Details Section */}
 {/* Price Details Section */}
<section className="w-full bg-gray-100 rounded-lg p-4 mt-6 flex flex-col gap-4">
  <h3 className="text-lg font-semibold text-purple-600">Price Details</h3>

  {/* Price rows */}
  <div className="w-full flex flex-col gap-2 text-sm">
    <div className="flex justify-between w-full">
      <span>Price Item</span>
      <span className="font-medium">0.00 €</span>
    </div>
    <div className="flex justify-between w-full">
      <span>Delivery Charges</span>
      <span className="font-medium text-green-600">Free</span>
    </div>
    <div className="flex justify-between w-full border-t border-gray-300 pt-2 font-semibold">
      <span>Amount Payable</span>
      <span>0.00 €</span>
    </div>
  </div>

  {/* Icons section */}
  <div className="flex justify-between items-center w-full text-gray-600 text-sm mt-4">
    <div className="flex flex-col items-center w-1/3">
      <FaCheckCircle className="text-green-600 text-xl mb-1" />
      <span className="text-center">Authentic Product</span>
    </div>
    <div className="flex flex-col items-center w-1/3">
      <FaShieldAlt className="text-blue-600 text-xl mb-1" />
      <span className="text-center">Secure Payment</span>
    </div>
    <div className="flex flex-col items-center w-1/3">
      <FaUndoAlt className="text-yellow-600 text-xl mb-1" />
      <span className="text-center">Easy Return</span>
    </div>
  </div>
    {/* Image section */}
  <div className="w-full mt-4 rounded-lg overflow-hidden">
    <img
      src="/image1.png"
      alt="Payment illustration"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>
</section>

</div>
  );
}

// StepIcon helper component
function StepIcon({ icon, label, isActive }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-white border-2 border-blue-600 text-blue-600"
        }`}
      >
        {React.cloneElement(icon, { className: "text-2xl" })}
      </div>
      <span className="mt-2 text-base font-semibold text-purple-600">{label}</span>
    </div>
    
  );
}




