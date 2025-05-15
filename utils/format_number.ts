const format_number = (num) => {
  if (!num) return 0;
  if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
};

export default format_number;
