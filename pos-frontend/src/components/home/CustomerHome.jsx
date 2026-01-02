import React from 'react';
import { motion } from 'framer-motion';
import RecentOrders from './RecentOrders';
import PopularDishes from './PopularDishes';

const CustomerHome = () => {
    return (
        <div className="p-6 text-white min-h-screen">
            {/* Ads Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 mb-8 shadow-lg relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Special Offer!</h1>
                    <p className="text-gray-900 text-xl">Get 20% off on all main courses today.</p>
                    <button className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
                        Order Now
                    </button>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white opacity-20 rounded-full"></div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-[3]">
                    <RecentOrders />
                </div>
                <div className="flex-[2]">
                    <PopularDishes />
                </div>
            </div>
        </div>
    );
};

export default CustomerHome;
