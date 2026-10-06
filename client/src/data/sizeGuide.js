export const SIZE_GUIDE = {
  women: {
    label: "Women",
    columns: ["Size", "Chest", "Waist", "Hip", "Shoulder", "Inseam"],
    rows: [
      ["XS", 80, 62, 88, 36, 76],
      ["S", 84, 66, 92, 37, 76],
      ["M", 88, 70, 96, 38, 77],
      ["L", 94, 76, 102, 39.5, 77],
      ["XL", 100, 82, 108, 41, 78],
    ],
  },
  men: {
    label: "Men",
    columns: ["Size", "Chest", "Waist", "Hip", "Shoulder", "Inseam"],
    rows: [
      ["XS", 88, 74, 90, 42, 79],
      ["S", 92, 78, 94, 43.5, 80],
      ["M", 98, 84, 100, 45, 81],
      ["L", 104, 90, 106, 46.5, 82],
      ["XL", 110, 96, 112, 48, 83],
    ],
  },
};

export const NUMERIC_SIZES = {
  columns: ["Size", "Waist", "Hip", "Inseam"],
  rows: [
    ["28", 71, 92, 80],
    ["30", 76, 97, 81],
    ["32", 81, 102, 82],
    ["34", 86, 107, 82],
    ["36", 91, 112, 83],
  ],
};

export const MEASURING_STEPS = [
  {
    title: "Chest",
    text: "Measure around the fullest part, keeping the tape level under your arms.",
  },
  {
    title: "Waist",
    text: "Measure around your natural waist, just above the navel.",
  },
  {
    title: "Hip",
    text: "Measure around the widest part of your hips and seat.",
  },
  {
    title: "Inseam",
    text: "Measure from the top of your inner thigh to the ankle bone.",
  },
];
