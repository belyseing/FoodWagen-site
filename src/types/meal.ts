
export interface Meal {
  id: string;
  name: string;
  image?: string;               
  food_image?: string;         
  price?: string;              
  Price?: string;               
  rating?: number;
  food_rating?: string;         
  restaurant?: string;         
  restaurantName?: string;      
  logo?: string;                
  restaurantLogo?: string;    
  restaurant_logo?: string;   
  status?: "Open" | "Closed";   
}


export interface MealFormData {
  name: string;
  image?: string;
  price?: string;
  rating?: number;
  restaurant?: string;
  restaurantLogo?: string;
  status?: "Open" | "Closed";
  description?: string;
  category?: string;
  season?: string;
  serves?: number;
  cookingTime?: number;
  ingredients?: string[];
}