const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const inputGroup = [username, email, password, password2];

// Show input error message
function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// Show success outline
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

//Check email validity
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Enter a valid email")
    }
    return re.test(String(email).toLowerCase());
}

//Check input length
function checkLength (input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

//Check if valid password
function checkPassword(input) {
    const mediumRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$");

    if(input.value.trim() === "") {
        showError(input, `${getFieldName(input)} is required`);
    } else if (!input.value.match(mediumRegex)) {
        showError(input, "Invalid password")
    } else {
        showSuccess(input);
    }
}

//check if passwords match
function checkPasswordMatch (input1, input2) {
    if (input2.value.trim() === "" & input2.value !== input1.value || input2.value !== input1.value) {
        showError(input2, "Passwords do not match");
    } else if(input2.value.trim() === "") {
        showError(input2, `${getFieldName(input2)} is required`);
    } else {
        showSuccess(input2);
    }
}

//Get field names
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listener
// form.addEventListener("keyup", (e) => {
//     checkLength(username, 3, 15);
//     checkEmail(email);
//     checkPassword(password);
//     checkPasswordMatch(password, password2);
// });

let timer,
    timeoutVal = 800; // time it takes to wait for user to stop typing in ms

// Username live validation
username.addEventListener('keypress', () => {window.clearTimeout(timer)});
username.addEventListener('keyup', () => {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
  timer = window.setTimeout(() => {
      checkLength(username, 3, 15)
  }, timeoutVal)
});

// Email live validation
email.addEventListener('keypress', () => {window.clearTimeout(timer)});
email.addEventListener('keyup', () => {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
  timer = window.setTimeout(() => {
      checkEmail(email)
  }, timeoutVal)
});

// Live password validation
password.addEventListener('keypress', () => {window.clearTimeout(timer)});
password.addEventListener('keyup', () => {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
  timer = window.setTimeout(() => {
      checkPassword(password)
  }, timeoutVal)
});

// Live password confirmation
password2.addEventListener('keypress', () => {window.clearTimeout(timer)});
password2.addEventListener('keyup', () => {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
  timer = window.setTimeout(() => {
      checkPasswordMatch(password, password2)
  }, timeoutVal)
});