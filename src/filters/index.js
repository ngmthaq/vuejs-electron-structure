export const uppercase = value => {
  if (!value || typeof value !== "string") return "";
  return value.toUpperCase();
};

export const lowercase = value => {
  if (!value || typeof value !== "string") return "";
  return value.toLowerCase();
};

export const capitalize = value => {
  if (!value || typeof value !== "string") return "";

  let words = value.split(" ");
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  return words.join(" ");
};

export const capitalizeFirst = value => {
  if (!value || typeof value !== "string") return "";

  let words = value.split(" ");
  words = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return word;
  });

  return words.join(" ");
};
