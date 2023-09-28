// Variables for DOM Elements
var generateBtn = document.querySelector("#generate");
var passwordDialog = document.querySelector("#passwordDialog");
var passwordStrengthIndicator = document.querySelector("#strengthIndicator");
var passwordLengthDisplay = document.querySelector("#passwordLengthDisplay");
var passwordLengthSlider = document.querySelector("#passwordLengthSlider");
var lowercaseSlider = document.querySelector("#lowercaseSlider");
var uppercaseSlider = document.querySelector("#uppercaseSlider");
var numericSlider = document.querySelector("#numericSlider");
var specialSlider = document.querySelector("#specialSlider");
var submitButton = document.querySelector("#submit");
var cancelButton = document.querySelector("#cancel");
var errorDialog = document.querySelector("#errorDialog");
var errorOkButton = document.querySelector("#errorOkButton");

// Character sets
const charset = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  special: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

// Function to check if at least one character type is selected
function isAnyCharTypeSelected() {
  return [lowercaseSlider, uppercaseSlider, numericSlider, specialSlider].some(slider => slider.checked);
}

// Function to generate the password
function generatePassword() {
  let characters = '';
  let password = '';

  if (lowercaseSlider.checked) characters += charset.lowercase;
  if (uppercaseSlider.checked) characters += charset.uppercase;
  if (numericSlider.checked) characters += charset.numbers;
  if (specialSlider.checked) characters += charset.special;

  for (let i = 0; i < passwordLengthSlider.value; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  return password;
}

// Function to calculate password strength based on selected criteria
function calculatePasswordStrength() {
  let strength = 0;

  if (lowercaseSlider.checked) strength++;
  if (uppercaseSlider.checked) strength++;
  if (numericSlider.checked) strength++;
  if (specialSlider.checked) strength++;
  if (passwordLengthSlider.value >= 15) strength++;

  return strength;
}

// Function to update the password strength indicator based on the calculated strength
function updateStrengthIndicator() {
  const strengths = ["Very Weak", "Weak", "Average", "Strong", "Very Strong"];
  const strength = calculatePasswordStrength();

  passwordStrengthIndicator.innerText = strengths[Math.min(strength, strengths.length - 1)];
}

// Event Listeners
generateBtn.addEventListener("click", function() {
  passwordDialog.style.display = "block";
  updateStrengthIndicator();
});

[lowercaseSlider, uppercaseSlider, numericSlider, specialSlider].forEach(slider => {
  slider.addEventListener("change", updateStrengthIndicator);
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
