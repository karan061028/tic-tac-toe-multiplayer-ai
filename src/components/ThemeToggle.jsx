import { useState } from "react";

const ThemeToggle = () => {

  const themes = ["normal","dark","neon","glass","luxury"];
  const [index,setIndex] = useState(0);

  const toggleTheme = () => {

    const nextIndex = (index + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    document.body.classList.remove("normal","dark","neon","glass");
    document.body.classList.add(nextTheme);

    setIndex(nextIndex);
  };

  return (
    <button onClick={toggleTheme}>
      Change Theme
    </button>
  );
};

export default ThemeToggle;