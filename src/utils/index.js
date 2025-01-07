export const capitalizeFirstLetter = (string) => {
  if (!string) {
    return ""; // Handle empty or null strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const entryRange = (limit, offset) => {
  return {
    limit: limit,
    offset: offset,
  };
};

export const Regions = {
ALL: entryRange(-1, 0),
KANTO: entryRange(151, 0),
JOHTO: entryRange(100, 151),
HOENN: entryRange(135, 251),
SINNOH: entryRange(107, 386),
UNOVA: entryRange(156, 493),
KALOS: entryRange(72, 649),
ALOLA: entryRange(88, 721),
GALAR: entryRange(96, 809),
PALDEA: entryRange(120, 905),
MEGA: entryRange(58, 1057),
ALOLA_form: entryRange(25, 1115),
GALAR_form: entryRange(20, 1185),
GMAX: entryRange(34, 1219),
HISUI_form: entryRange(16, 1253)
};