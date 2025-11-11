// export const handleGetFood = async (
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setMeals: React.Dispatch<React.SetStateAction<any[]>>
// ) => {
//   try {
//     const response = await fetch("https://6852821e0594059b23cdd834.mockapi.io/Food", {
//       method: "GET",
//     });

//     const data = await response.json(); 
//     setMeals(data);
//     setIsLoading(false);
//   } catch (error) {
//     console.error("Error fetching food data:", error);
//     setIsLoading(false);
//   }
// };
