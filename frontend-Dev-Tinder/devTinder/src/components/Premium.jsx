import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Premium = () => {

    const handlePremiumButton = async (type) => {
        const order = await axios.post(`${BASE_URL}/payment/create`, {membershipType:  type},{withCredentials:true});

        const {amount, currency, orderId, razorpaykeyId,notes} = order.data;

        var options = {
            key: razorpaykeyId, 
            amount: amount, 
            currency: currency,
            name: "DevTinder Premium Subscription",
            description: `Subscription for ${type} membership`,
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.email,
            },
            theme: {
                color: "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


  return (
    // top se 20 px niche 2 proper cards side by side with gap of 10px siler and gold with alot of attractive colors in details with some text and a button to subscribe silver for blue tick and gold for golden tick and some extra features
    <div className="premium-container flex flex-col items-center justify-center mt-5 gap-10">
      <h1 className="text-3xl font-bold text-gray-1000">Upgrade to DevTinder Premium</h1>
      <div className="premium-cards flex gap-10">
        {/* Silver Card */}
        <div className="premium-card bg-gray-200 p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Silver Plan</h2>
          <p className="mb-4 text-gray-800">Get a blue tick on your profile and access to basic features.</p>
          <ul className="mb-4 list-disc list-inside text-gray-800">
            <li>Blue Tick Verification</li>
            <li>Access to Basic Features</li>
            <li>Priority Support</li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300" onClick={()=>{handlePremiumButton("silver")}}>Subscribe for $9.99/month</button>
        </div>
        {/* Gold Card */}
        <div className="premium-card bg-yellow-200 p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Gold Plan</h2>
          <p className="mb-4 text-gray-800">Get a golden tick on your profile and access to all premium features.</p>
          <ul className="mb-4 list-disc list-inside text-gray-800">
            <li>Golden Tick Verification</li>
            <li>Access to All Premium Features</li>
            <li>Priority Support</li>
            <li>Exclusive Profile Badge</li>
          </ul>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300" onClick={()=>{handlePremiumButton("gold")}}>Subscribe for $19.99/month</button>
        </div>
      </div>
    </div>


  )
}

export default Premium
