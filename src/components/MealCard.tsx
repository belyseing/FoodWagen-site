"use client"

import { useState, useRef, useEffect } from "react"
import type { Meal } from "@/types/meal"
import { LuTag } from "react-icons/lu"
import Image from "next/image"

interface MealCardProps {
  meal: Meal
  onEdit?: () => void
  onDelete?: () => void
}

const isValidImageUrl = (url?: string): boolean => {
  if (!url) return false
  if (url.includes("/placeholder")) return false
  try {
    const parsed = new URL(url)
    const hasImageExtension = /\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff)$/i.test(parsed.pathname)
    const isFromImageHost = [
      "images.unsplash.com",
      "plus.unsplash.com",
      "images.immediate.co.uk",
      "res.cloudinary.com",
      "images.pexels.com",
      "cdn.jsdelivr.net",
      "avatars.githubusercontent.com",
      "tse2.mm.bing.net",
      "encrypted-tbn0.gstatic.com",
    ].some((domain) => parsed.hostname.includes(domain))
    return hasImageExtension || isFromImageHost
  } catch {
    return false
  }
}

const createMealPlaceholder = () =>
  `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="160" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial" font-size="14" fill="#9ca3af">Food Image</text>
    </svg>
  `)}`

const createLogoPlaceholder = () =>
  `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial" font-size="10" fill="#9ca3af">Logo</text>
    </svg>
  `)}`

export function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [mealImageError, setMealImageError] = useState(false)
  const [logoImageError, setLogoImageError] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(" Meal object:", meal)
    console.log(" Price fields:", {
      price: meal.price,
      allKeys: Object.keys(meal),
    })
  }, [meal])

  const getDisplayPrice = () => {
    if (typeof meal.price === "number" && !isNaN(meal.price)) {
      return meal.price
    }
    return 0
  }

  const displayPrice = getDisplayPrice()

  const hasValidMealImage = isValidImageUrl(meal.image) && !mealImageError
  const mealImageSrc: string = hasValidMealImage ? (meal.image as string) : createMealPlaceholder()

  const hasValidLogo = isValidImageUrl(meal.restaurant?.logo) && !logoImageError
  const restaurantLogo: string = hasValidLogo ? (meal.restaurant!.logo as string) : createLogoPlaceholder()

  const restaurantName = meal.restaurant?.name || "Unknown Restaurant"
  const restaurantStatus = meal.restaurant?.status || "Closed"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="sm:rounded-full p-4">
      <div className="relative">
        <Image
          src={mealImageSrc}
          alt={meal.name}
          width={300}
          height={160}
          className="w-full h-32 sm:h-40 object-cover rounded-2xl"
          onError={() => setMealImageError(true)}
        />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1">
          <span className="font-bold">
            <LuTag />
          </span>
          $ {displayPrice.toFixed(2)}
        </div>
      </div>

      <div className="pt-3">
        <div className="flex items-center justify-between mb-2 gap-2 min-w-0">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Image
              src={restaurantLogo}
              alt={restaurantName}
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg bg-blue-100 object-cover shrink-0"
              onError={() => setLogoImageError(true)}
            />
            <div className="flex-1 min-w-0">
              <h3 className="food-name font-semibold text-gray-900 text-xs sm:text-sm truncate">{meal.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-2xl">★</span>
                <span className="food-rating text-xs text-gray-600">{meal.rating ?? "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Open menu"
            >
              ⋮
            </button>

            {(onEdit || onDelete) && showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50 origin-top-right">
                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit()
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    data-test-id="food-edit-btn"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => {
                      onDelete()
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    data-test-id="food-delete-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          className={`px-4 py-1 rounded-2xl font-bold text-sm ${
            restaurantStatus === "Open"
              ? "bg-[#79B93C33] text-[#79B93C] hover:bg-green-200"
              : "bg-[#F1722833] text-[#F17228] hover:bg-orange-200"
          }`}
        >
          <span className="restaurant-status">{restaurantStatus}</span>
        </button>
      </div>
    </div>
  )
}

