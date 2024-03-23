export const formatDate = (dateString: unknown): string => {
  try {
    // Convert the date string to a JavaScript Date object
    const date = new Date(dateString as string);

    // Check if the converted date is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return ""; // Return an empty string for invalid dates
    }

    // Return the date in the desired format
    return date.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // Return an empty string if formatting fails
  }
};
