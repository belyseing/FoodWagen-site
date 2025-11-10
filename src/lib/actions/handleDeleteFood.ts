export const handleDeleteFood = async (
  mealId: string,
  onSuccess: () => void,
  onError?: (error: any) => void
) => {
  try {
    await fetch(`https://6852821e0594059b23cdd834.mockapi.io/Food/${mealId}`, {
      method: "DELETE",
    });
    onSuccess();
  } catch (error) {
    console.error("Error deleting meal:", error);
    if (onError) onError(error);
  }
};
