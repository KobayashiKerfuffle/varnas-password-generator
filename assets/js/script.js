// Character Arrays
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numbers = "0123456789".split("");
var specialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/\\`~".split("");  // A list of common special characters

// Generate Password Function
function generatePassword() {
  // Prompt for password length
  var passwordLength = parseInt(prompt("Enter the desired password length (between 8 to 128 characters):"));

  // Validate password length
  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    alert("Please enter a valid number between 8 and 128.");
    return "";
  }

  // Confirm inclusion of character types
  var includeLowercase = confirm("Include lowercase letters?");
  var includeUppercase = confirm("Include uppercase letters?");
  var includeNumbers = confirm("Include numbers?");
  var includeSpecial = confirm("Include special characters?");

  // Ensure at least one character type is selected
  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) {
    alert("At least one character type should be selected!");
    return "";
  }

  // Combine selected character types
  var allCharacters = [];
  if (includeLowercase) allCharacters = allCharacters.concat(lowercaseLetters);
  if (includeUppercase) allCharacters = allCharacters.concat(uppercaseLetters);
  if (includeNumbers) allCharacters = allCharacters.concat(numbers);
  if (includeSpecial) allCharacters = allCharacters.concat(specialCharacters);

  // Generate password
  var password = "";
  for (var i = 0; i < passwordLength; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  return password;
}

// Write Password to the Textarea
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Event Listener for Generate Button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);
