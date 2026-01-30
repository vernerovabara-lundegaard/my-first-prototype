import { createTheme, MantineColorsTuple } from "@mantine/core";

// JerryPoj-inspired: warm, trustworthy, clean (blues/greens + friendly accent)
const brand: MantineColorsTuple = [
  "#e6f4f7",
  "#cce9ef",
  "#99d3df",
  "#66bdcf",
  "#33a7bf",
  "#0091af",
  "#00748c",
  "#005769",
  "#003b46",
  "#001e23",
];

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand,
  },
  fontFamily: "var(--font-sans)",
  headings: {
    fontFamily: "var(--font-sans)",
  },
  defaultRadius: "md",
});
