import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getAvatarName, getRandomBG } from "../../utils/index";

const OrderList = ({ order }) => {
  const isReady = order.orderStatus === "Ready";

  return (
    <div className="flex items-center gap-4 mb-3 bg-[#252525] p-3 rounded-xl hover:bg-[#2a2a2a] transition-colors cursor-pointer group">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-md"
        style={{ backgroundColor: getRandomBG() }}
      >
        {getAvatarName(order.customerDetails.name)}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold text-sm">{order.customerDetails.name}</h3>
          <span className="text-xs text-gray-500 font-mono">#{order._id.slice(-4)}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-400">{order.items.length} Items • Table {order.table?.tableNo}</p>
          <div className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${isReady ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
            }`}>
            {isReady ? <FaCheckDouble /> : <FaCircle className="text-[6px]" />}
            {order.orderStatus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
