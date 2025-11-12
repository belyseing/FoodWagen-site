
import type { Meal } from '@/types/meal'

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io"

async function handleResponse(response: Response) {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    console.error("API Error:", data || response.statusText)
    throw new Error(data?.message || "API request failed")
  }
  return data
}

export async function getFoods(searchParam?: string): Promise<Meal[]> {
  try {
    const url = searchParam
      ? `${API_BASE_URL}/Food?name=${searchParam}`
      : `${API_BASE_URL}/Food`
    const response = await fetch(url)
    return handleResponse(response)
  } catch (error) {
    console.error("Error fetching foods:", error)
    throw error
  }
}

export async function createFood(meal: Meal): Promise<Meal> {
  try {
    const payload = { 
      ...meal, 
      rating: Number(meal.rating) || 0,
      price: Number(meal.price) || 0 
    }
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error creating food:", error)
    throw error
  }
}

export async function updateFood(id: string, meal: Meal): Promise<Meal> {
  if (!id) throw new Error("Food ID is required for update")
  try {
    const payload = { 
      ...meal, 
      rating: Number(meal.rating) || 0,
      price: Number(meal.price) || 0 
    }
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error updating food:", error)
    throw error
  }
}

export async function deleteFood(id: string): Promise<void> {
  if (!id) throw new Error("Food ID is required for deletion")
  try {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  } catch (error) {
    console.error("Error deleting food:", error)
    throw error
  }
}