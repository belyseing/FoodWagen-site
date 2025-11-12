"use client"

import { useState, useEffect } from "react"
import { MealCard } from "./MealCard"
import { FoodFormModal } from "./food-form-modal"
import { createFood, updateFood, deleteFood, getFoods } from "@/lib/api/foods"
import type { Meal } from "@/types/meal"
import { GrFormNext } from "react-icons/gr"

export function FeaturedMeals() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null)

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    setIsLoading(true)
    try {
      const data = await getFoods()
      setMeals(data)
    } catch (error) {
      console.error("Error loading meals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddMeal = async (data: Meal) => {
    setIsLoading(true)
    try {
      const newMeal = await createFood(data)
      
      setMeals((prev) => [newMeal, ...prev])
      setIsAddModalOpen(false)
    } catch (error) {
      console.error("Error adding meal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal)
    setIsEditModalOpen(true)
  }

  const handleDeleteConfirm = (mealId: string) => {
    setDeletingMealId(mealId)
    setIsDeleteConfirmOpen(true)
  }

  const handleDeleteMeal = async () => {
    if (!deletingMealId) return
    setIsLoading(true)
    try {
      await deleteFood(deletingMealId)
 
      setMeals((prev) => prev.filter((meal) => meal.id !== deletingMealId))
      setIsDeleteConfirmOpen(false)
      setDeletingMealId(null)
    } catch (error) {
      console.error("Error deleting meal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateMeal = async (data: Meal) => {
    if (!editingMeal?.id) return
    setIsLoading(true)
    try {
      const updatedMeal = await updateFood(editingMeal.id, data)
    
      setMeals((prev) =>
        prev.map((meal) => (meal.id === editingMeal.id ? updatedMeal : meal))
      )
      setIsEditModalOpen(false)
      setEditingMeal(null)
    } catch (error) {
      console.error("Error updating meal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="w-full mb-8 sm:mb-12 flex justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Featured Meals
            </h2>
          </div>

          {meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <div className="empty-state-message text-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  No Meal available
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Add a new meal to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {meals.map((meal: Meal) => (
                <div key={meal.id} className="food-meal-wrapper">
                  <MealCard
                    meal={meal}
                    onEdit={() => handleEdit(meal)}
                    onDelete={() => handleDeleteConfirm(meal.id!)}
                  />
                </div>
              ))}
            </div>
          )}

          {meals.length > 0 && (
            <div className="flex justify-center mt-6">
              <button className="flex items-center gap-2 bg-[#FFBA26] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#e0a00d] transition">
                Load more
                <span className="text-lg">
                  <GrFormNext />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>


      <FoodFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMeal}
        title="Add a meal"
        submitLabel="Add"
        isLoading={isLoading}
      />

      <FoodFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingMeal(null)
        }}
        onSubmit={handleUpdateMeal}
        initialData={editingMeal || undefined}
        title="Edit Meal"
        submitLabel="Save"
        isLoading={isLoading}
      />

    
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-4 text-center">
              Delete Meal
            </h2>
            <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
              Are you sure you want to delete this meal? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleDeleteMeal}
                disabled={isLoading}
                className="flex-1 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-gray-900 font-semibold py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
              >
                {isLoading ? "Deleting..." : "Yes"}
              </button>
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false)
                  setDeletingMealId(null)
                }}
                disabled={isLoading}
                className="flex-1 border-2 border-amber-400 text-gray-900 font-semibold py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
