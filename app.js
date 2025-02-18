const resultEl = document.getElementById("password"); // The area where the generated password will be displayed  
const lengthEl = document.getElementById("length"); // Input for password length  
const uppercaseEl = document.getElementById("uppercase"); // Checkbox for including uppercase letters  
const lowercaseEl = document.getElementById("lowercase"); // Checkbox for including lowercase letters  
const numbersEl = document.getElementById("numbers"); // Checkbox for including numbers  
const symbolsEl = document.getElementById("symbols"); // Checkbox for including symbols  
const generateEl = document.getElementById("generate"); // Button to generate the password  
const lengthError = document.getElementById("length-error"); // HTML element for displaying length error message

//Random Functions Object
const randomFunc = {  
    lower: getRandomLower,  
    upper: getRandomUpper,  
    number: getRandomNumber,  
    symbol: getRandomSymbol,  
  };

 // Generate Button Event Listener
  generateEl.addEventListener("click", () => {  
    const length = +lengthEl.value; // Get the password length from input  
    const hasLower = lowercaseEl.checked; // Check if lowercase is selected  
    const hasUpper = uppercaseEl.checked; // Check if uppercase is selected  
    const hasNumber = numbersEl.checked; // Check if numbers are selected  
    const hasSymbol = symbolsEl.checked; // Check if symbols are selected  
  
    // Validations  
    if (  
      hasLower == false &&  
      hasUpper == false &&  
      hasNumber == false &&  
      hasSymbol == false  
    ) {  
      alert("Please select at least one option"); // Alert if no options are selected  
    } else if (length < 6) {  
      lengthError.classList.remove("hidden"); // Show length error if password is too short  
    } else {  
      lengthError.classList.add("hidden");  
      resultEl.value = generatePassword(  
        hasLower,  
        hasUpper,  
        hasNumber,  
        hasSymbol,  
        length  
      ); // Generate the password  
    }  
  });

//Password Generation Function
  function generatePassword(lower, upper, number, symbol, length) {  
    let generatedPassword = "";  
    const typesCount = lower + upper + number + symbol; // Count of selected character types  
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(  
      (item) => Object.values(item)[0]  
    ); // Array of selected types  
  
    if (typesCount === 0) {  
      return ""; // Return empty if no types are selected  
    }  
    for (let i = 0; i < length; i += typesCount) {  
      typesArr.forEach((type) => {  
        const funcName = Object.keys(type)[0];  
        generatedPassword += randomFunc[funcName](); // Add a random character  
      });  
    }  
    const finalPassword = generatedPassword.slice(0, length); // Slice to the desired length  
    return finalPassword; // Return the final password  
  }

//Random Character Generation Functions
  function getRandomLower() {  
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Lowercase letter  
  }  
  
  function getRandomUpper() {  
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Uppercase letter  
  }  
  
  function getRandomNumber() {  
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // Number  
  }  
  
  function getRandomSymbol() {  
    const symbols = "!@#$%^&*()~{}[]=<>?_-\/,.";  
    return symbols[Math.floor(Math.random() * symbols.length)]; // Random symbol  
  }