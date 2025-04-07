import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
  const items = [{ label: 'Platform Fee', amount: '₹49.00' }];
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    }

    if (!/^\d{3,4}$/.test(cvc)) {
      newErrors.cvc = 'CVC must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardHolderNameChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    value = value.slice(0, 19);
    setCardHolderName(value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    setExpiry(value);
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    setCvc(value.slice(0, 4));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate payment processing with a 2-second delay
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        // Show success message for 2 seconds, then navigate
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }, 2000);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  // Show success message
  if (isSuccess) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto p-6">
      {/* Payment Details Section - Left Side */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index === items.length - 1 && <hr className="my-2" />}
            <div
              className={`flex justify-between mb-2 ${
                index === items.length - 1 ? 'font-bold' : ''
              }`}
            >
              <span>{item.label}</span>
              <span>{item.amount}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Card Input Form - Right Side */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-6"
      >
        <div className="flex justify-center mb-4">
          <img src="/stripe-logo.png" alt="Payment Logo" className="h-10 w-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Card Holder Name</label>
          <input
            type="text"
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            placeholder="Full Name on Card"
            maxLength="19"
            className={`w-full p-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.cardHolderName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={`w-full p-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <FaCreditCard className="absolute right-3 top-3 text-gray-400" />
          </div>
          {errors.cardNumber && (
            <span className="text-red-500 text-xs mt-1">{errors.cardNumber}</span>
          )}
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength="5"
              className={`w-full p-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.expiry ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiry && (
              <span className="text-red-500 text-xs mt-1">{errors.expiry}</span>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={handleCvcChange}
              placeholder="123"
              maxLength="4"
              className={`w-full p-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.cvc ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cvc && (
              <span className="text-red-500 text-xs mt-1">{errors.cvc}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;