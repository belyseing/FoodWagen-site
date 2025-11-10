"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Meal } from "@/types/meal";
import { IoEllipsisVertical } from "react-icons/io5";
import { handleDeleteFood } from "@/lib/actions/handleDeleteFood";

export default function MealCard({ meal }: { meal: Meal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOpen = meal.status === "Open";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const mealImage = meal.image?.trim() ? meal.image : "/images/default-meal.jpg";
  const restaurantLogo = meal.restaurantLogo?.trim()
    ? meal.restaurantLogo
    : "/images/default-logo.jpg";

  return (
    <div className="bg-white rounded-2xl shadow p-6 relative">
      {/* Meal image */}
      <div className="relative">
        <Image
          src={mealImage}
          alt=""
          width={210}
          height={150}
          className="rounded-2xl object-cover"
        />
        <div className="absolute top-2 left-2 bg-[#F17228] text-white text-sm px-6 py-1 rounded-md">
          {meal.price}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={restaurantLogo} alt="" width={64} height={64} />
            <div>
              <p className="text-[15px] font-semibold mt-1">{meal.name}</p>
              <p className="text-yellow-500 text-sm">⭐ {meal.rating}</p>
            </div>
          </div>

          {/* Menu icon */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <IoEllipsisVertical className="text-gray-600 text-xl" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    alert(`Edit ${meal.name}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    if (confirm(`Are you sure you want to delete ${meal.name}?`)) {
                      handleDeleteFood(meal.id, () => {
                        alert(`${meal.name} deleted successfully!`);
                      });
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status button */}
        <button
          className={`mt-3 px-2.5 py-1 text-xs rounded-[10px] font-medium ${isOpen ? "bg-[#79B93C33] text-[#79B93C]" : "bg-[#F1722833] text-[#F17228]"
            }`}
        >
          {meal.status}
        </button>
      </div>
    </div>
  );
}
