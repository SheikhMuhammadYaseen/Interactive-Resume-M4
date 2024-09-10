var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var educationInput = document.getElementById("education");
var workExperienceInput = document.getElementById("work-experience");
var skillsInput = document.getElementById("skills");
var profilePicInput = document.getElementById("profile-pic");
var displayName = document.getElementById("display-name");
var displayEmail = document.getElementById("display-email");
var displayEducation = document.getElementById("display-education");
var displayWorkExperience = document.getElementById("display-work-experience");
var displaySkills = document.getElementById("display-skills");
var displayPic = document.getElementById("display-pic");
function makeEditable(displayElement, inputType) {
    if (inputType === void 0) { inputType = "text"; }
    displayElement.addEventListener("click", function () {
        var input = document.createElement("input");
        input.type = inputType;
        input.value = displayElement.textContent || "";
        displayElement.replaceWith(input);
        input.focus();
        input.addEventListener("blur", function () {
            saveEdit(displayElement, input);
        });
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                saveEdit(displayElement, input);
            }
        });
    });
}
function saveEdit(displayElement, input) {
    var updatedValue = input.value.trim();
    displayElement.textContent = updatedValue || displayElement.textContent;
    input.replaceWith(displayElement);
    updateFormFromResume();
}
makeEditable(displayName, "text");
makeEditable(displayEmail, "email");
makeEditable(displayEducation, "text");
makeEditable(displayWorkExperience, "text");
displaySkills.addEventListener("click", function () {
    var skillsText = [].map.call(displaySkills.querySelectorAll("li"), function (li) { return li.textContent; })
        .join(", ");
    var input = document.createElement("input");
    input.type = "text";
    input.value = skillsText;
    displaySkills.replaceWith(input);
    input.focus();
    input.addEventListener("blur", function () { return saveSkillsEdit(input); });
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveSkillsEdit(input);
        }
    });
});
function saveSkillsEdit(input) {
    var skillsArray = input.value.split(",").map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill; });
    displaySkills.innerHTML = "";
    skillsArray.forEach(function (skill) {
        var li = document.createElement("li");
        li.textContent = skill;
        displaySkills.appendChild(li);
    });
    input.replaceWith(displaySkills);
    updateFormFromResume();
}
function updateFormFromResume() {
    nameInput.value = displayName.textContent || "";
    emailInput.value = displayEmail.textContent || "";
    educationInput.value = displayEducation.textContent || "";
    workExperienceInput.value = displayWorkExperience.textContent || "";
    skillsInput.value = [].map.call(displaySkills.querySelectorAll("li"), function (li) { return li.textContent; })
        .join(", ");
}
nameInput.addEventListener("input", updateResumeFromInputs);
emailInput.addEventListener("input", updateResumeFromInputs);
educationInput.addEventListener("input", updateResumeFromInputs);
workExperienceInput.addEventListener("input", updateResumeFromInputs);
skillsInput.addEventListener("input", updateResumeFromInputs);
function updateResumeFromInputs() {
    displayName.textContent = nameInput.value || "Your Name";
    displayEmail.textContent = emailInput.value || "Your Email";
    displayEducation.textContent = educationInput.value || "Your Education";
    displayWorkExperience.textContent = workExperienceInput.value || "Your Work Experience";
    var skillsArray = skillsInput.value.split(",").map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill; });
    displaySkills.innerHTML = "";
    skillsArray.forEach(function (skill) {
        var li = document.createElement("li");
        li.textContent = skill;
        displaySkills.appendChild(li);
    });
}
profilePicInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            displayPic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
