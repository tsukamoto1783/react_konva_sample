type Props = {
  boxSize?: number;
  boxFillColor?: string;
  leftBoxSize?: number;
  leftBoxFillColor?: string;
  rightBoxSize?: number;
  rightBoxFillColor?: string;
};

export const createSvgString = ({
  boxSize = 100,
  boxFillColor = "white",
  leftBoxSize = 40,
  leftBoxFillColor = "white",
  rightBoxSize = 40,
  rightBoxFillColor = "white",
}: Props): string => {
  return `<svg
    width="${boxSize}"
    height="${boxSize}"
    viewBox="0 0 ${boxSize} ${boxSize}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="${boxSize - 1}" height="${
    boxSize - 1
  }" fill="${boxFillColor}" stroke="black" />

    <rect x="6.5" y="7.5" width="${leftBoxSize}" height="${leftBoxSize}" fill="${leftBoxFillColor}" stroke="black" />

    <rect x="54.5" y="53.5" width="${rightBoxSize}" height="${rightBoxSize}" fill="${rightBoxFillColor}" stroke="black" />
  </svg>`;
};
