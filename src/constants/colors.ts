/**
 * Primary color used for the main theme or prominent elements in the application.
 * Example: #4CAF50
 */
export const primaryColor = "#4CAF50";

/**
 * Secondary color used for complementary or secondary elements in the application.
 * Example: #FFC107
 */
export const secondaryColor = "#FFC107";

/**
 * Determines the contrast color based on the provided color.
 * If the brightness of the color is greater than a threshold, it returns the dark color; otherwise, it returns the light color.
 * @param {string} color Hexadecimal color code (e.g., #4CAF50).
 * @param {string} light Hexadecimal color code for the light contrast color.
 * @param {string} dark Hexadecimal color code for the dark contrast color.
 * @returns {string} Hexadecimal color code for the contrast color.
 */
export const getContrastColor = (color: string, light: string, dark: string) => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 4), 16);
  const c_b = parseInt(hex.substring(4, 6), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 125 ? dark : light;
};

/**
 * Determines the contrast text color based on the provided color.
 * @param {string} color Hexadecimal color code (e.g., #4CAF50).
 * @returns {string} Hexadecimal color code for the contrast text color.
 */
export const getContrastTextColor = (color: string) => {
  return getContrastColor(color, "#000000", "#FFFFFF");
};

/**
 * Determines the contrast background color based on the provided color.
 * @param {string} color Hexadecimal color code (e.g., #4CAF50).
 * @returns {string} Hexadecimal color code for the contrast background color.
 */
export const getContrastBackgroundColor = (color: string) => {
  return getContrastColor(color, "#FFFFFF", "#000000");
};
