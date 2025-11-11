"use client"

import React, { useState, useEffect } from "react"
import  type { Food } from "@/lib/api/foods"


interface FoodFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Food) => Promise<void>
  initialData?: Food
  title: string
  submitLabel: string
  isLoading?: boolean
}

export function FoodFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  submitLabel,
  isLoading = false,
}: FoodFormModalProps) {
  const [formData, setFormData] = useState<Food>(() => ({
    name: initialData?.name ?? "",
    price: initialData?.price ?? "",
    image: initialData?.image ?? "",
    rating: initialData?.rating ?? 0,
    restaurant: {
      logo: initialData?.restaurant?.logo ?? "",
      status: initialData?.restaurant?.status ?? "Open",
    },
  }))

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name ?? "",
        price: initialData?.price ?? "",
        image: initialData?.image ?? "",
        rating: initialData?.rating ?? 0,
        restaurant: {
          logo: initialData?.restaurant?.logo ?? "",
          status: initialData?.restaurant?.status ?? "Open",
        },
      })
      setErrors({})
    }
  }, [initialData, isOpen])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors["food_name"] = "Food name is required"
    if (!formData.image.trim()) newErrors["food_image"] = "Food image (link) is required"
    if (formData.rating < 1 || formData.rating > 5) newErrors["food_rating"] = "Food rating must be between 1 and 5"
    if (!formData.restaurant.logo.trim()) newErrors["restaurant_logo"] = "Restaurant logo (link) is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.startsWith("restaurant_")) {
      const key = name.replace("restaurant_", "") as keyof Food["restaurant"]
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          [key]: value,
        },
      }))
    } else if (name === "food_rating") {
      setFormData((prev) => ({
        ...prev,
        rating: value ? Number.parseFloat(value) : 0,
      }))
    } else {
      const fieldName = name.replace("food_", "") as keyof Omit<Food, "restaurant">
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }))
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
  
      setFormData({
        name: "",
        price: "",
        image: "",
        rating: 0,
        restaurant: {
          logo: "",
          status: "Open",
        },
      })
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-center text-2xl font-bold text-amber-500 mb-6">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Food name</label>
            <input
              id="food_name"
              type="text"
              name="food_name"
              placeholder="Food name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
            />
            {errors["food_name"] && <p className="text-red-500 text-sm mt-1">{errors["food_name"]}</p>}
          </div>

          {/* Food Rating */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Food rating</label>
            <input
              id="food_rating"
              type="number"
              name="food_rating"
              placeholder="Food rating"
              value={formData.rating || ""}
              onChange={handleChange}
              step="0.1"
              min="1"
              max="5"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
            />
            {errors["food_rating"] && <p className="text-red-500 text-sm mt-1">{errors["food_rating"]}</p>}
          </div>

          {/* Food Image */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Food image (link)</label>
            <input
              id="food_image"
              type="url"
              name="food_image"
              placeholder="Food image (link)"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
            />
            {errors["food_image"] && <p className="text-red-500 text-sm mt-1">{errors["food_image"]}</p>}
          </div>


        
          <div>
            <label className="block text-sm text-gray-600 mb-1">Restaurant logo (link)</label>
            <input
              id="restaurant_logo"
              type="url"
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
              value={formData.restaurant.logo}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
            />
            {errors["restaurant_logo"] && <p className="text-red-500 text-sm mt-1">{errors["restaurant_logo"]}</p>}
          </div>

        
          <div>
            <label className="block text-sm text-gray-600 mb-1">Restaurant status</label>
            <select
              id="restaurant_status"
              name="restaurant_status"
              value={formData.restaurant.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex-1 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-gray-900 font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting || isLoading ? "Processing..." : submitLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isLoading}
              className="flex-1 border-2 border-amber-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
