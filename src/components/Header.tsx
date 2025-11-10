import Image from 'next/image';

function Header() {
  return (
    <header>
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <Image
            src="/images/Mask.png"
            alt="FoodWagen Logo"
            width={28}
            height={29.98}
          />
          <span className="ml-3 text-2xl font-bold text-[#F17228]">
            Food
            <span className="text-[#FFB30E]">Wagen</span>
          </span>
        </div>
        <button className="px-6 py-2 rounded-[14px] bg-linear-to-r from-[#FFB30E] to-[#eca712] text-white text-sm font-bold shadow-xl shadow-orange-100">
          Add Meal
        </button>

      </div>
    </header>
  );
}

export default Header;
