
  // Get all required HTML elements
  const categoryEl = document.getElementById("category");
  const fromUnitEl = document.getElementById("fromUnit");
  const toUnitEl = document.getElementById("toUnit");
  const inputEl = document.getElementById("inputValue");
  const resultEl = document.getElementById("result");

  // Units dictionary (like categories with their available units)
  const units = {
    length: ["meter", "kilometer", "centimeter", "inch", "foot"],
    weight: ["kilogram", "gram", "pound", "ounce"],
    volume: ["liter", "milliliter", "gallon"],
    temperature: ["celsius", "fahrenheit", "kelvin"]
  };

  // Function to convert values
  function convert(value, from, to, category) {
    value = parseFloat(value); // change input to number
    if (isNaN(value)) return "--"; // if not a number → return --

    // Length conversion
    if (category === "length") {
      const factor = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        inch: 0.0254,
        foot: 0.3048
      };
      return (value * factor[from] / factor[to]).toFixed(4);
    }

    // Weight conversion
    if (category === "weight") {
      const factor = {
        kilogram: 1,
        gram: 0.001,
        pound: 0.453592,
        ounce: 0.0283495
      };
      return (value * factor[from] / factor[to]).toFixed(4);
    }

    // Volume conversion
    if (category === "volume") {
      const factor = {
        liter: 1,
        milliliter: 0.001,
        gallon: 3.78541
      };
      return (value * factor[from] / factor[to]).toFixed(4);
    }

    // Temperature conversion
    if (category === "temperature") {
      let celsius;
      // First convert everything to Celsius
      if (from === "celsius") celsius = value;
      if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
      if (from === "kelvin") celsius = value - 273.15;

      // Then convert Celsius to required unit
      if (to === "celsius") return celsius.toFixed(2);
      if (to === "fahrenheit") return ((celsius * 9 / 5) + 32).toFixed(2);
      if (to === "kelvin") return (celsius + 273.15).toFixed(2);
    }
  }

  // Function to fill unit dropdowns
  function fillUnits(category) {
    fromUnitEl.innerHTML = "";
    toUnitEl.innerHTML = "";
    units[category].forEach(unit => {
      fromUnitEl.add(new Option(unit, unit));
      toUnitEl.add(new Option(unit, unit));//Option ek built-in constructor function (class jaisa) hai JavaScript me.
    });
  }

  // When Convert button clicked
  document.getElementById("convertBtn").addEventListener("click", () => {
    const answer = convert(inputEl.value, fromUnitEl.value, toUnitEl.value, categoryEl.value);
    resultEl.textContent = answer;
  });

  // When Clear button clicked
  document.getElementById("clearBtn").addEventListener("click", () => {
    inputEl.value = "";
    resultEl.textContent = "--";
  });

  // When Category changes → update unit dropdowns
  categoryEl.addEventListener("change", () => fillUnits(categoryEl.value));
  // By default show "Length" units first
  fillUnits("length");