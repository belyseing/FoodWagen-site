"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FoodFormModal } from "./food-form-modal"
import { createFood, type Food } from "@/lib/api/foods"


export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAddMeal = async (data: Food) => {
    setIsLoading(true)
    try {
      await createFood(data)
      router.refresh()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error adding meal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <header className="bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          
          <div className="flex items-center">
            <Image
              src="/images/Mask.png"
              alt="FoodWagen Logo"
              width={28}
              height={30}
            />
            <span className="ml-3 text-2xl font-bold text-[#F17228]">
              Food
              <span className="text-[#FFB30E]">Wagen</span>
            </span>
          </div>

          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 rounded-[14px] bg-linear-to-r from-[#FFB30E] to-[#eca712] text-white text-sm font-bold shadow-xl shadow-orange-100 transition hover:opacity-90"
          >
            {isLoading ? "Processing..." : "Add Meal"}
          </button>
        </div>
      </header>

      
      <FoodFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMeal}
        title="Add a Meal"
        submitLabel="Add"
        isLoading={isLoading}
      />
    </>
  )
}

export default Header