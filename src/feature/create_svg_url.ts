export const createSvgUrl = (svgString: string): string => {
  // NOTE: escape関数やunescape関数は非推奨なので注意。
  const encodedSvgString = encodeURIComponent(svgString);
  const svgBase64 = window.btoa(decodeURIComponent(encodedSvgString));

  const imageSrc = `data:image/svg+xml;base64,${svgBase64}`;
  return imageSrc;
};
