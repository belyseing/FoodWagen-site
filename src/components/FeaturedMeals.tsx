"use client";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import type { Meal } from "@/types/meal";
import { handleGetFood } from "@/lib/actions/handleGetFood";

export default function FeaturedMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetFood(setIsLoading, setMeals); 
  }, []);

  console.log(meals);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
          Featured Meals
        </h2>

        {isLoading ? (
          <p className="text-center">Loading food...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button className="bg-[#FFBA26] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e0a00d]">
                Load more →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
