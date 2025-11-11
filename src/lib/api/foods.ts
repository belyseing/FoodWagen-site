// ✅ lib/api/foods.ts
const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io"




async function handleResponse(response: Response) {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    console.error("API Error:", data || response.statusText)
    throw new Error(data?.message || "API request failed")
  }
  return data
}


export async function getFoods(searchParam?: string): Promise<Food[]> {
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

// ✅ Create a new food item
export async function createFood(food: Food): Promise<Food> {
  try {
    const payload = { ...food, rating: Number(food.rating) }
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


export async function updateFood(id: string, food: Food): Promise<Food> {
  if (!id) throw new Error("Food ID is required for update")
  try {
    const payload = { ...food, rating: Number(food.rating) }
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
