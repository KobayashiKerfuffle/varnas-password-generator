// Variables
var generateBtn = document.querySelector("#generate");
var passwordDialog = document.querySelector("#passwordDialog");
var passwordStrengthIndicator = document.querySelector("#strengthIndicator");
var passwordLengthDisplay = document.querySelector("#passwordLengthDisplay");
var passwordLengthSlider = document.querySelector("#passwordLengthSlider");
var lowercaseButton = document.querySelector("#lowercaseButton");
var uppercaseButton = document.querySelector("#uppercaseButton");
var numericButton = document.querySelector("#numericButton");
var specialButton = document.querySelector("#specialButton");
var submitButton = document.querySelector("#submit");
var cancelButton = document.querySelector("#cancel");
var errorDialog = document.querySelector("#errorDialog");
var errorOkButton = document.querySelector("#errorOkButton");

const charset = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  special: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

// Check if at least one character type is selected
function isAnyCharTypeSelected() {
  return [lowercaseButton, uppercaseButton, numericButton, specialButton].some(button => button.dataset.selected === "true");
}

function generatePassword() {
  let characters = '';
  let password = '';

  if (lowercaseButton.dataset.selected === "true") characters += charset.lowercase;
  if (uppercaseButton.dataset.selected === "true") characters += charset.uppercase;
  if (numericButton.dataset.selected === "true") characters += charset.numbers;
  if (specialButton.dataset.selected === "true") characters += charset.special;

  for (let i = 0; i < passwordLengthSlider.value; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  return password;
}

function calculatePasswordStrength() {
  let strength = 0;

  if (lowercaseButton.dataset.selected === "true") strength++;
  if (uppercaseButton.dataset.selected === "true") strength++;
  if (numericButton.dataset.selected === "true") strength++;
  if (specialButton.dataset.selected === "true") strength++;
  if (passwordLengthSlider.value >= 15) strength++;

  return strength;
}

function updateStrengthIndicator() {
  const strengths = ["Very Weak", "Weak", "Average", "Strong", "Very Strong"];
  const strength = calculatePasswordStrength();
  console.log("Password Strength Value:", strength);
  
  passwordStrengthIndicator.innerText = strengths[Math.min(strength, strengths.length - 1)];
}

generateBtn.addEventListener("click", function() {
  passwordDialog.style.display = "block";
  updateStrengthIndicator();
});

[lowercaseButton, uppercaseButton, numericButton, specialButton].forEach(button => {
  button.addEventListener("click", function() {
    button.dataset.selected = button.dataset.selected === "true" ? "false" : "true";
    updateStrengthIndicator();
  });
});

passwordLengthSlider.addEventListener("input", function() {
  passwordLengthDisplay.innerText = passwordLengthSlider.value;
  updateStrengthIndicator();
});

submitButton.addEventListener("click", function() {
  if (isAnyCharTypeSelected()) {
    const password = generatePassword();
    document.querySelector("#password").value = password;
    passwordDialog.style.display = "none";
  } else {
    errorDialog.style.display = "block";
    passwordDialog.style.display = "none";
  }
});

cancelButton.addEventListener("click", function() {
  passwordDialog.style.display = "none";
});

errorOkButton.addEventListener("click", function() {
  errorDialog.style.display = "none";
  passwordDialog.style.display = "block";
});
