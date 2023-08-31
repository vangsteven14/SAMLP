// form elements
const forms = {
    login: document.getElementById("login-form"),
    signUp: document.getElementById("sign-up-form"),
    forgotPw: document.getElementById("forgot-pw-form"),
};

// buttons
const buttons = {
    login: document.getElementById("login-btn"),
    signUp: document.getElementById("sign-up-btn"),
    forgotPw: document.getElementById("forgot-pw-btn"),
    cancelPwReset: document.getElementById("cancel-pw-reset-btn"),
};

// inputs

const inputs = {
    loginEmail: document.getElementById("login-email"),
    loginPassword: document.getElementById("login-password"),
    SignUpFirstName: document.getElementById("sign-up-first-name"),
    SignUpLastName: document.getElementById("sign-up-last-name"),
    SignUpEmail: document.getElementById("sign-up-email"),
    SignUpPassword: document.getElementById("sign-up-password"),
    SignUpPasswordConfirm: document.getElementById("sign-up-password-confirm"),
    forgotPwEmail: document.getElementById("forget-pw-email"),
};

// switch to active form
function switchForm(formToRemove, formToAdd){
    /*clearInputsandErrors(); */
    formToRemove.classList.remove("active");
    setTimeout(() => { formToAdd.classList.add("active");}, 50);
};

// switch form event listeners
buttons.signUp.addEventListener("click", () => switchForm(forms.login, forms.signUp));

buttons.forgotPw.addEventListener("click", () => switchForm(forms.login, forms.forgotPw));

buttons.cancelPwReset.addEventListener("click", () => switchForm(forms.forgotPw, forms.login));

buttons.login.addEventListener("click", () => switchForm(forms.signUp, forms.login));

// show and hide error messages
function showError(input, message){
    const errorMsg = document.getElementById(`${input.id}-error`);
    errorMsg.textContent = message;
    errorMsg.style.display = "black";
}

function hideError(input, message){
    const errorMsg = document.getElementById(`${input.id}-error`);
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
}

// clear inputs and errors when switching between forms
function clearInputsandErrors(){
    for(const inputKey in inputs){
        const input = inputs[inputKey];
        input.value = "";
        hideError(input);
    }
}

// validate email
function validateEmail(input){
    const emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(input.value.length > 0 && !emailRegex.test(input.value)){
        showError(input, "Please enter a valid email address");
        return;
    }

    hideError(input);
}

// validate password is 8 characters or more
function validatePasswordLength(input){
    if(input.value.length > 0 && input.value.length < 8){
        showError(input, "Password must be longer than 8 characters");
        return;
    }

    hideError(input);
}

// check passwords match on signup
function validatePasswordsMatch(){
    const password = inputs.SignUpPassword.value;
    const passwordConfirm = inputs.SignUpPasswordConfirm.value;

    if(password.length >= 0 && passwordConfirm.length > 0){
        if(password !== passwordConfirm){
            showError(inputs.SignUpPassword, "Password does not match! Try Again.");
            return;
        }

        hideError(inputs.SignUpPassword);
    }
}

// check user has entered first and last name on signup
function validateNameField(input){
    const error = input.id.toLowerCase().includes("first") ? "Please enter your first name" : "Please enter your last name";
    if(input.value.length === 0){
        showError(input, error);
        return;
    }

    hideError(input);
}

// use the blur event (when input loses focus) to check for errors

inputs.loginEmail.addEventListener("blur", () => validateEmail(inputs.loginEmail));

inputs.SignUpEmail.addEventListener("blur", () => validateEmail(inputs.SignUpEmail));

inputs.forgotPwEmail.addEventListener("blur", () => validateEmail(inputs.forgotPwEmail));

inputs.loginPassword.addEventListener("blur", () => validateEmail(inputs.loginPassword));

inputs.SignUpPassword.addEventListener("blur", () => {
    validatePasswordLength(inputs.SignUpPassword);
    validatePasswordsMatch()});

inputs.SignUpFirstName.addEventListener("blur", () => validateNameField(inputs.SignUpFirstName));

inputs.SignUpLastName.addEventListener("blur", () => validateNameField(inputs.SignUpLastName));