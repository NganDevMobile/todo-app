export const hexToRGB = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};

export const colors = {
  emerald: '#00A862',
  jungleGreen: '#00874A',
  jungle24Green: 'rgba(0, 135, 74, 0.24)',
  jungle24Green2: 'rgba(0, 168, 98, 0.24)',
  darkBlueGreen: '#1E3932',
  yellow: '#F8E71C',
  sandyBrown: '#C2A661',
  sandyBrownDark: '#887035',
  white100Primary: '#FFFFFF',
  pageBackground: '#F7F7F7',
  white70Secondary: 'rgba(255, 255, 255, 0.7)',
  black87Primary: 'rgba(0, 0, 0, 0.87)',
  black20Primary: 'rgba(0, 0, 0, 0.2)',
  black56Secondary: 'rgba(0, 0, 0, 0.56)',
  black58Secondary: 'rgba(0, 0, 0, 0.58)',
  black12Border: 'rgba(0, 0, 0, 0.12)',
  black24Border: 'rgba(0, 0, 0, 0.24)',
  warning: '#D62B1F',
  warning24: 'rgba(214, 43, 31, 0.24)',
  warmBlack: '#2D2926',
  transparent: 'transparent',
  white10Third: 'rgba(255, 255, 255, 0.1)',
  emerald53Primary: 'rgba(0, 168, 98, 0.53)',
  sandyBrown53Primary: 'rgba(194, 166, 97, 0.53)',
  sandyBrown24Primary: 'rgba(194, 166, 97, 0.24)',
  white30Opacity: 'rgba(255, 255, 255, 0.5)',
  lightGreen: '#D5EEE0',
  houseGreen: '#1E3932',
  starbucksGreen: '#006241',
  cooper: '#FAF6EE',
  primary: '#8687E7',
  gray: '#363636',
  black: '#000000',
  error: '#dc3545',
  placeHolder: '#f5f5f5',
  border: '#979797',
};
