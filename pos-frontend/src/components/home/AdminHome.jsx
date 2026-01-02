import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaDollarSign, FaClipboardList, FaTable, FaUtensils, FaClock } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getOrders, getTables } from '../../https/index';

const AdminHome = () => {
    // Fetch real orders
    const { data: ordersData } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            return await getOrders();
        },
        refetchInterval: 10000, // Refresh every 10 seconds
    });

    // Fetch real tables
    const { data: tablesData } = useQuery({
        queryKey: ['tables'],
        queryFn: async () => {
            return await getTables();
        },
        refetchInterval: 10000,
    });

    const orders = ordersData?.data?.data || [];
    const tables = tablesData?.data?.data || [];

    // Calculate real statistics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0);
    const activeOrders = orders.filter(o => o.orderStatus === 'In Progress' || o.orderStatus === 'Ready').length;
    const completedOrders = orders.filter(o => o.orderStatus === 'Completed').length;
    const bookedTables = tables.filter(t => t.status === 'Booked').length;
    const availableTables = tables.filter(t => t.status === 'Available').length;

    // Recent orders for quick view
    const recentOrders = orders.slice(0, 5);

    const stats = [
        { title: 'Total Revenue', value: `₹${totalRevenue.toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-green-500' },
        { title: 'Active Orders', value: activeOrders, icon: <FaClipboardList />, color: 'bg-blue-500' },
        { title: 'Completed Today', value: completedOrders, icon: <FaUtensils />, color: 'bg-purple-500' },
        { title: 'Tables Occupied', value: `${bookedTables}/${tables.length}`, icon: <FaTable />, color: 'bg-yellow-500' },
    ];

    return (
        <div className="p-6 text-white min-h-screen bg-[#121212]">
            {/* Admin Dashboard Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Restaurant Manager Dashboard</h1>
                <p className="text-gray-400">Monitor operations and manage your restaurant efficiently</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg flex items-center gap-4 border border-gray-800 hover:border-yellow-400/30 transition"
                    >
                        <div className={`p-4 rounded-full text-white ${stat.color} text-xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">{stat.title}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Orders */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-2">
                        <FaClipboardList className="text-blue-400" /> Recent Orders
                    </h2>
                    <div className="space-y-3">
                        {recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                                <div key={order._id} className="bg-[#2a2a2a] p-4 rounded-lg flex justify-between items-center hover:bg-[#333] transition">
                                    <div>
                                        <p className="text-white font-semibold">{order.customerDetails.name}</p>
                                        <p className="text-gray-400 text-sm">Table {order.table?.tableNo || 'N/A'} • {order.items.length} items</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-yellow-400 font-bold">₹{order.bills?.totalWithTax.toFixed(2)}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${order.orderStatus === 'Ready' ? 'bg-green-500/20 text-green-400' :
                                                order.orderStatus === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No recent orders</p>
                        )}
                    </div>
                </div>

                {/* Table Status Overview */}
                <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-2">
                        <FaTable className="text-yellow-400" /> Table Status
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center">
                            <p className="text-green-400 text-sm mb-1">Available</p>
                            <h3 className="text-3xl font-bold text-green-400">{availableTables}</h3>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-center">
                            <p className="text-red-400 text-sm mb-1">Occupied</p>
                            <h3 className="text-3xl font-bold text-red-400">{bookedTables}</h3>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {tables.slice(0, 6).map((table) => (
                            <div key={table._id} className="flex justify-between items-center bg-[#2a2a2a] p-3 rounded-lg">
                                <span className="text-white font-semibold">Table {table.tableNo}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${table.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {table.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Business Growth Chart */}
            <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-2">
                    <FaChartLine className="text-yellow-400" /> Weekly Revenue
                </h2>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {/* Simple CSS Bar Chart */}
                    {[40, 60, 30, 80, 50, 90, 70].map((height, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                        >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition">
                                ₹{(height * 100).toFixed(0)}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-gray-400 text-sm">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
