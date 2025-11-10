import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";

export default function Hero() {
  return (
    <section className="bg-[#FFB30E] text-white min-h-[450px] relative overflow-hidden">
      <div className="max-w-6xl mx-auto pt-16 px-4">
        <div className="mb-6">
          <h1 className="text-6xl font-bold mb-4">Are you starving?</h1>
          <p className="">Within a few slides, find meals that are accessible next year</p>
        </div>
        <div className="mb-6">
          <SearchCard />
        </div>
      </div>
      
      <div className="absolute right-0 bottom-0">
        <Image
          src="/images/plate.png"
          alt="hero image"
          width={604}
          height={505}
          className="object-contain"
        />
      </div>
    </section>
  );
}

export function SearchCard() {
  return (
    <section className="max-w-2xl rounded-2xl p-6 bg-white">
      {/* Buttons */}
      <div className="flex gap-6 mb-4">
        <button className="font-bold text-[#F17228] bg-[#F172281A] px-6 py-2 flex gap-2 rounded-lg">
          <Image
            src="/images/Icon.png"
            alt="FoodWagen Logo"
            width={23}
            height={18}
          />
          Delivery
        </button>

        <button className="font-bold text-[#757575] px-6 py-2 flex gap-2 rounded-lg">
          <Image
            src="/images/Icon2.png"
            alt="FoodWagen Logo"
            width={18}
            height={16}
          />
          Pickup
        </button>
      </div>

      <hr className="border-t border-gray-200 -mx-6 my-4" />

      <div className="flex justify-between">
        <div className="flex items-center gap-3 bg-[#F5F5F5] text-[#9E9E9E] rounded-lg px-4 py-3 w-full mr-3">
          <CiSearch className="text-[#F17228] text-2xl" />
          <input
            type="text"
            placeholder="What do you like to eat today?"
            className="bg-transparent outline-none w-full text-gray-700 placeholder:text-[#9E9E9E]"
          />
        </div>

        <button className="flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-lg bg-linear-to-r from-[#ee3e3e] to-[#f37227] text-white text-sm font-bold shadow-xl shadow-orange-100">
          <IoMdSearch className="text-white text-lg" />
          <span>Find food</span>
        </button>
      </div>
    </section>
  );
}