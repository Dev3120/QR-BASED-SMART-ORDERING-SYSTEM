import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getRandomBG } from "../../utils"
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (name) => {
    if (status === "Booked") return;

    const table = { tableId: id, tableNo: name }
    dispatch(updateTable({ table }))
    navigate(`/menu`);
  };

  return (
    <div onClick={() => handleClick(name)} key={id} className="w-full relative group cursor-pointer">
      <div className={`
            h-48 w-full rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 transform group-hover:-translate-y-1 shadow-xl
            ${status === "Booked"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] border border-gray-800 group-hover:border-yellow-400/50"}
        `}>
        <div className="flex justify-between items-start">
          <div className="bg-black/40 p-3 rounded-xl backdrop-blur-sm">
            <h1 className="text-white text-xl font-bold">Table {name}</h1>
            <p className="text-xs text-gray-400 mt-1">{seats} Seats</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status === "Booked" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"
            }`}>
            {status}
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          {status === "Booked" ? (
            <div className="text-center w-full">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Reserved For</p>
              <div className="bg-yellow-400/10 py-2 px-4 rounded-lg border border-yellow-400/20">
                <h2 className="text-yellow-400 font-bold text-lg truncate">{initials || "Guest"}</h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center opacity-30 group-hover:opacity-60 transition duration-300">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center mb-2">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-sm font-bold tracking-widest">TAP TO BOOK</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
