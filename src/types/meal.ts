
export interface Meal {
  id: string;
  name: string;
  image?: string;               
  food_image?: string;         
  price?: number;                          
  rating?: number;
  food_rating?: string;         
  restaurant?: {
    name: string;
    logo?: string;
    status?: "Open" | "Closed";
  };
  restaurantName?: string;      
  logo?: string;                
  restaurantLogo?: string;    
  restaurant_logo?: string;   
  status?: "Open" | "Closed";   
}

export interface MealFormData {
  name: string;
  image?: string;
  price?: number;
  rating?: number;
  restaurant?: {
    name: string;
    logo?: string;
    status?: "Open" | "Closed";
  };
  restaurantLogo?: string;
  status?: "Open" | "Closed";
  description?: string;
  category?: string;
  season?: string;
  serves?: number;
  cookingTime?: number;
  ingredients?: string[];
}