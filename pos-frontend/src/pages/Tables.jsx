import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants/index";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");
  useEffect(() => {
    document.title = "POS | Tables"
  }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });
  
  if(isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }

  console.log(resData);

  return (
    <section className="bg-[#121212] h-[calc(100vh-5rem)] overflow-hidden text-white">
      {/* Header Section */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a2a] bg-[#1b1b1b]">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            Tables
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-[#1f1f1f] rounded-xl p-1">
          <button
            onClick={() => setStatus("all")}
            className={`px-5 py-2 text-sm font-medium transition-all rounded-lg ${
              status === "all"
                ? "bg-[#3a3a3a] text-white shadow-md"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`px-5 py-2 text-sm font-medium transition-all rounded-lg ${
              status === "booked"
                ? "bg-[#3a3a3a] text-white shadow-md"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className='p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-13rem)] overflow-y-auto scrollbar-hide'>
        {
          resData?.data.data.map((table) => {
            return (
              <TableCard id = {table._id} name={table.tableNo} status={table.status} initials = {table?.currentOrder?.customerDetails.name} seats={table.seats}/>
            )
          })
      }
      </div>
  
      <BottomNav />
    </section>
  );
};

export default Tables;


