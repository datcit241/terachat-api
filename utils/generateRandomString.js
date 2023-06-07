module.exports = (length) => {
  const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
      {length},
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  return randomArray.join("");
};