const Flag = ({ country }) => {
  let text;

  if (/^[a-zA-Z]{2}$/.test(country)) {
    text = country.toLowerCase();
  }

  const codePoints = [...country].map((c) => c.codePointAt(0));
  const isFlag = codePoints.every((cp) => cp >= 0x1f1e6 && cp <= 0x1f1ff);

  if (isFlag) {
    text = codePoints
      .map((cp) => String.fromCharCode(cp - 0x1f1e6 + 65))
      .join("")
      .toLowerCase();
  }

  return <img src={`https://flagcdn.com/24x18/${text}.png`} alt="flag" />;
};

export default Flag;
