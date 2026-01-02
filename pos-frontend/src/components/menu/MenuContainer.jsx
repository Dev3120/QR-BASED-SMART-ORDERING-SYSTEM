import React, { useState } from 'react';
import { menus } from '../../constants/index';
import { GrRadialSelected } from 'react-icons/gr';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';

const MenuContainer = ({ selectedAllergens = [] }) => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCounts, setItemCounts] = useState({});
  const dispatch = useDispatch();

  const resetCounts = () => {
    setItemCounts({});
  };

  const increment = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 10),
    }));
  };

  const decrement = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = itemCounts[item.id] || 0;
    if (quantity === 0) return;

    const { name, price } = item;

    const newObj = {
      id: item.id,
      name,
      pricePerQuantity: price,
      quantity,
      price: price * quantity,
    };

    dispatch(addItems(newObj));

    setItemCounts((prev) => {
      const newState = { ...prev };
      delete newState[item.id];
      return newState;
    });
  };

  const filteredItems = selected?.items?.filter(item => {
    if (selectedAllergens.length === 0) return true;
    if (!item.allergens) return true;
    const hasAllergen = item.allergens.some(allergen => selectedAllergens.includes(allergen));
    return !hasAllergen;
  });

  return (
    <>
      {/* --- Category Section --- */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => {
              setSelected(menu);
              resetCounts();
            }}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && (
                <GrRadialSelected className="text-white" size={20} />
              )}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">
              {menu.items.length} items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* --- Selected Category Items Section --- */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {filteredItems?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
          >
            <div className="flex items-start justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {item.name}
              </h1>

              <button
                onClick={() => handleAddToCart(item)}
                className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"
              >
                <FaShoppingCart size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-[#f5f5f5] text-xl font-bold">₹ {item.price}</p>

              <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6">
                <button
                  onClick={() => decrement(item.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &minus;
                </button>
                <span className="text-white">{itemCounts[item.id] || 0}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &#43;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContainer;
