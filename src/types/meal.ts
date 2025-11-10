// types/meal.ts
export interface Meal {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  restaurant: string;
  restaurantLogo: string;
  status: "Open" | "Closed";
}

export interface MealFormData {
  name: string;
  image: string; 
  price: string;
  rating: number;
  restaurant: string;
  restaurantLogo: string;
  status: "Open" | "Closed";
  description?: string;
  category?: string;
  season?: string;
  serves?: number;
  cookingTime?: number;
  ingredients?: string[];
}