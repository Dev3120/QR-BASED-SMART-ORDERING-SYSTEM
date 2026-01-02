import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index";
import { enqueueSnackbar } from "notistack"

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const filteredOrders = resData?.data.data.filter((order) => {
    if (status === "all") return true;
    if (status === "progress") return order.orderStatus === "In Progress";
    if (status === "ready") return order.orderStatus === "Ready";
    if (status === "completed") return order.orderStatus === "Completed";
    return true;
  });


  return (
    <section className="bg-[#121212] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-10 py-6 bg-[#1b1b1b] border-b border-[#2a2a2a]">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-3xl font-bold tracking-wide">
            Orders
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-[#1f1f1f] p-1.5 rounded-xl">
          {["all", "progress", "ready", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`px-6 py-2.5 text-sm font-bold transition-all rounded-lg capitalize ${status === tab
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20"
                  : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                }`}
            >
              {tab === "progress" ? "In Progress" : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order) => {
              return <OrderCard key={order._id} order={order} />;
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-xl">No orders found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
