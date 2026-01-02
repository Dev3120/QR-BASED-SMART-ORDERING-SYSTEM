import React from "react";
import { FaCheckDouble, FaLongArrowAltRight, FaClock, FaReceipt } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName, getRandomBG } from "../../utils/index";

const OrderCard = ({ order }) => {
  const isReady = order.orderStatus === "Ready";
  const initials = getAvatarName(order.customerDetails.name);

  return (
    <div className="w-full bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] hover:border-yellow-400/30 transition-all duration-300 shadow-xl group relative overflow-hidden">

      {/* Status Indicator Strip */}
      <div className={`absolute top-0 left-0 w-1.5 h-full ${isReady ? "bg-green-500" : "bg-yellow-500"}`}></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6 pl-2">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg"
            style={{ backgroundColor: getRandomBG() }}
          >
            {initials}
          </div>
          <div>
            <h2 className="text-white text-lg font-bold tracking-wide">{order.customerDetails.name}</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <span className="bg-[#2a2a2a] px-2 py-0.5 rounded text-gray-300">Dine in</span>
              <span>•</span>
              <span>#{order._id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isReady ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}>
          {isReady ? <FaCheckDouble /> : <FaCircle className="animate-pulse text-[8px]" />}
          {order.orderStatus}
        </div>
      </div>

      {/* Table Info */}
      <div className="flex items-center justify-between bg-[#252525] rounded-xl p-4 mb-6 ml-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Table</span>
          <span className="text-white font-bold text-xl">{order.table?.tableNo || "N/A"}</span>
        </div>
        <FaLongArrowAltRight className="text-gray-600 text-xl" />
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Items</span>
          <span className="text-white font-bold text-xl">{order.items.length}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a] ml-2">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <FaClock />
          {formatDateAndTime(order.orderDate)}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Total:</span>
          <span className="text-yellow-400 font-bold text-xl">₹{order.bills.totalWithTax.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
};

export default OrderCard;
