"use client"

import { useState } from "react"
import Image from "next/image"
import { CiSearch } from "react-icons/ci"
import { IoMdSearch } from "react-icons/io"

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    console.log(`Searching for "${searchQuery}" via ${activeTab}`)
  }

  return (
    <section className="bg-[#FFB30E] text-white min-h-[450px] relative overflow-hidden">
      <div className="max-w-6xl mx-auto pt-16 px-4">
        {/* Text Section */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Are you starving?
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            Within a few clicks, find meals that are accessible near you
          </p>
        </div>

        {/* Search Card */}
        <div className="mb-8">
          <SearchCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* ✅ Show plate image below only on small screens */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Image
            src="/images/plate.png"
            alt="hero image"
            width={250}
            height={200}
            className="object-contain w-[220px]"
          />
        </div>
      </div>

      {/* ✅ Keep original desktop hero image exactly as before */}
      <div className="hidden sm:block absolute right-20 -bottom-9">
        <Image
          src="/images/plate.png"
          alt="hero image"
          width={390}
          height={300}
          className="object-contain"
        />
      </div>
    </section>
  )
}

interface SearchCardProps {
  activeTab: "delivery" | "pickup"
  setActiveTab: (tab: "delivery" | "pickup") => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  onSearch: () => void
}

export function SearchCard({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchCardProps) {
  return (
    <section className="max-w-2xl rounded-2xl p-6 bg-white text-black">
      {/* Tabs */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab("delivery")}
          className={`font-bold px-6 py-2 flex gap-2 rounded-lg ${
            activeTab === "delivery" ? "text-[#F17228] bg-[#F172281A]" : "text-[#757575]"
          }`}
        >
          <Image src="/images/delivery.png" alt="Delivery" width={23} height={18} />
          Delivery
        </button>

        <button
          onClick={() => setActiveTab("pickup")}
          className={`font-bold px-6 py-2 flex gap-2 rounded-lg ${
            activeTab === "pickup" ? "text-[#F17228] bg-[#F172281A]" : "text-[#757575]"
          }`}
        >
          <Image src="/images/pick.png" alt="Pickup" width={18} height={16} />
          Pickup
        </button>
      </div>

      <hr className="border-t border-gray-200 -mx-6 my-4" />

      {/* Search Input + Button */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-3 bg-[#F5F5F5] text-[#9E9E9E] rounded-lg px-4 py-3 w-full">
          <CiSearch className="text-[#F17228] text-2xl" />
          <input
            type="text"
            placeholder="What do you like to eat today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700 placeholder:text-[#9E9E9E]"
          />
        </div>

        <button
          onClick={onSearch}
          className="flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 rounded-lg bg-linear-to-r from-[#ee3e3e] to-[#f37227] text-white text-sm font-bold shadow-xl shadow-orange-100"
        >
          <IoMdSearch className="text-white text-lg" />
          <span>Find food</span>
        </button>
      </div>
    </section>
  )
}
