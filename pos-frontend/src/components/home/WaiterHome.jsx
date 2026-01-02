import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaBell, FaClock, FaUser, FaUtensils } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus } from '../../https/index';
import { enqueueSnackbar } from 'notistack';

const WaiterHome = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isVerifyOpen, setIsVerifyOpen] = useState(false);
    const queryClient = useQueryClient();

    // Fetch real orders
    const { data: ordersData } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            return await getOrders();
        },
        refetchInterval: 5000, // Refresh every 5 seconds for real-time updates
    });

    const orders = ordersData?.data?.data || [];

    // Filter orders by status
    const readyOrders = orders.filter(order => order.orderStatus === 'Ready');
    const inProgressOrders = orders.filter(order => order.orderStatus === 'In Progress');

    // Mutation to update order status
    const updateStatusMutation = useMutation({
        mutationFn: ({ orderId, orderStatus }) => updateOrderStatus({ orderId, orderStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            enqueueSnackbar('Order status updated!', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('Failed to update order status', { variant: 'error' });
        }
    });

    const handleVerifyClick = (order) => {
        setSelectedOrder(order);
        setIsVerifyOpen(true);
    };

    const handleConfirmServe = () => {
        if (selectedOrder) {
            updateStatusMutation.mutate({
                orderId: selectedOrder._id,
                orderStatus: 'Completed'
            });
        }
        setIsVerifyOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="p-6 text-white min-h-screen bg-[#121212]">
            {/* Waiter Dashboard Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Waiter Dashboard</h1>
                <p className="text-gray-400">Manage orders and serve customers efficiently</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1f1f1f] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500/20 p-3 rounded-lg">
                            <FaClock className="text-yellow-400 text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">In Progress</p>
                            <h3 className="text-2xl font-bold">{inProgressOrders.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1f1f1f] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-3 rounded-lg">
                            <FaCheckCircle className="text-green-400 text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Ready to Serve</p>
                            <h3 className="text-2xl font-bold">{readyOrders.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1f1f1f] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                            <FaUtensils className="text-blue-400 text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Orders</p>
                            <h3 className="text-2xl font-bold">{orders.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ready Orders Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-3">
                    <FaBell className="animate-pulse" /> Ready to Serve ({readyOrders.length})
                </h2>

                {readyOrders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {readyOrders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-[#1f1f1f] border-l-4 border-green-500 rounded-xl p-6 shadow-lg relative hover:shadow-2xl transition"
                            >
                                <div className="absolute top-4 right-4 text-green-500 text-2xl">
                                    <FaCheckCircle className="animate-pulse" />
                                </div>

                                {/* Customer Info */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaUser className="text-yellow-400" />
                                        <h3 className="text-xl font-bold text-white">{order.customerDetails.name}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">Table {order.table?.tableNo || 'N/A'} • {order.customerDetails.guests} Guests</p>
                                </div>

                                <div className="bg-[#2a2a2a] rounded-lg p-3 mb-4">
                                    <p className="text-xs text-gray-500 mb-2">ORDER #{order._id.slice(-6).toUpperCase()}</p>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        {order.items.slice(0, 3).map((item, idx) => (
                                            <li key={idx} className="flex justify-between">
                                                <span>• {item.name}</span>
                                                <span className="text-gray-500">x{item.quantity}</span>
                                            </li>
                                        ))}
                                        {order.items.length > 3 && (
                                            <li className="text-yellow-400 text-xs">+{order.items.length - 3} more items</li>
                                        )}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => handleVerifyClick(order)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                                >
                                    Serve to Customer
                                </button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#1f1f1f] rounded-xl p-12 text-center border border-gray-800">
                        <FaCheckCircle className="text-gray-600 text-5xl mx-auto mb-4" />
                        <p className="text-gray-400">No orders ready to serve at the moment</p>
                    </div>
                )}
            </div>

            {/* In Progress Orders Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-3">
                    <FaClock /> In Kitchen ({inProgressOrders.length})
                </h2>

                {inProgressOrders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {inProgressOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-[#1f1f1f] border-l-4 border-yellow-500 rounded-xl p-4 shadow-lg"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <FaUser className="text-yellow-400 text-sm" />
                                    <h4 className="text-white font-bold">{order.customerDetails.name}</h4>
                                </div>
                                <p className="text-gray-400 text-xs mb-2">Table {order.table?.tableNo || 'N/A'}</p>
                                <p className="text-yellow-400 text-xs">🍳 Being prepared...</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#1f1f1f] rounded-xl p-8 text-center border border-gray-800">
                        <p className="text-gray-400">No orders in kitchen</p>
                    </div>
                )}
            </div>

            {/* Verify & Serve Dialog */}
            <AnimatePresence>
                {isVerifyOpen && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-[#2a2a2a] p-8 rounded-2xl max-w-md w-full text-center shadow-2xl border-2 border-yellow-400"
                        >
                            <FaUtensils className="text-yellow-400 text-5xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-4">Confirm Service</h3>
                            <div className="bg-[#1f1f1f] rounded-xl p-4 mb-6">
                                <p className="text-gray-300 mb-2">
                                    Customer: <span className="text-yellow-400 font-bold">{selectedOrder.customerDetails.name}</span>
                                </p>
                                <p className="text-gray-300">
                                    Table: <span className="text-yellow-400 font-bold">{selectedOrder.table?.tableNo}</span>
                                </p>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Is the customer present and ready to receive the order?
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => setIsVerifyOpen(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition"
                                >
                                    Not Present
                                </button>
                                <button
                                    onClick={handleConfirmServe}
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition"
                                >
                                    Serve Now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WaiterHome;
