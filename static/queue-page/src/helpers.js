export const capitaliseFirstLetterCase = (words) => {
  const str = words?.split(" ");
  return str
    ?.map((word) => {
      return word[0]?.toUpperCase() + word?.substring(1)?.toLowerCase();
    })
    .join(" ");
};

export const ensureArray = (arr) => {
  if(!arr) return [];
  return Array.isArray(arr) ? arr : [arr];
};
