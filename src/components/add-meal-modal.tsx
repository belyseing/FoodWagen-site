"use client"

import type React from "react"

import { useState } from "react"

interface AddMealModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddMealModal({ isOpen, onClose }: AddMealModalProps) {
  const [formData, setFormData] = useState({
    foodName: "",
    foodRating: "",
    foodImage: "",
    restaurantName: "",
    restaurantLogo: "",
    restaurantStatus: "open",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()


    const newErrors: { [key: string]: string } = {}
    if (!formData.foodName.trim()) {
      newErrors.foodName = "Food name is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log("Form submitted:", formData)

  
    setFormData({
      foodName: "",
      foodRating: "",
      foodImage: "",
      restaurantName: "",
      restaurantLogo: "",
      restaurantStatus: "open",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-amber-500 mb-6">Add a meal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div>
            <input
              type="text"
              name="foodName"
              placeholder="Food name"
              value={formData.foodName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.foodName && <p className="text-red-500 text-sm mt-1">{errors.foodName}</p>}
          </div>

          {/* Food Rating */}
          <input
            type="number"
            name="foodRating"
            placeholder="Food rating"
            value={formData.foodRating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

         
          <input
            type="url"
            name="foodImage"
            placeholder="Food image (link)"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant name"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

         
          <input
            type="url"
            name="restaurantLogo"
            placeholder="Restaurant logo (link)"
            value={formData.restaurantLogo}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

         
          <select
            name="restaurantStatus"
            value={formData.restaurantStatus}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg transition"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-amber-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
