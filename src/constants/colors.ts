// Primary and secondary colors
export const primaryColor = '#4CAF50'; // Green
export const secondaryColor = '#FFC107'; // Yellow

// Utility functions for handling color contrast
export const getContrastColor = (color: string, light: string, dark: string): string => {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 4), 16);
  const c_b = parseInt(hex.substring(4, 6), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;

  return brightness > 125 ? dark : light;
};

export const getContrastTextColor = (color: string): string => {
  return getContrastColor(color, '#000000', '#FFFFFF');
};

export const getContrastBackgroundColor = (color: string): string => {
  return getContrastColor(color, '#FFFFFF', '#000000');
};