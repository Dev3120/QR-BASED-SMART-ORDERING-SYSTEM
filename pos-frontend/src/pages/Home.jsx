import React from 'react';
import { useSelector } from 'react-redux';
import CustomerHome from '../components/home/CustomerHome';
import WaiterHome from '../components/home/WaiterHome';
import AdminHome from '../components/home/AdminHome';
import BottomNav from '../components/shared/BottomNav';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const role = user?.role || 'Customer';

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {role === 'Customer' && <CustomerHome />}
        {role === 'Waiter' && <WaiterHome />}
        {role === 'Admin' && <AdminHome />}
      </div>
      <BottomNav />
    </section>
  )
}

export default Home