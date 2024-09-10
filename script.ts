const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const educationInput = document.getElementById("education") as HTMLInputElement;
const workExperienceInput = document.getElementById("work-experience") as HTMLInputElement;
const skillsInput = document.getElementById("skills") as HTMLInputElement;
const profilePicInput = document.getElementById("profile-pic") as HTMLInputElement;

const displayName = document.getElementById("display-name")!;
const displayEmail = document.getElementById("display-email")!;
const displayEducation = document.getElementById("display-education")!;
const displayWorkExperience = document.getElementById("display-work-experience")!;
const displaySkills = document.getElementById("display-skills")!;
const displayPic = document.getElementById("display-pic") as HTMLImageElement;

function makeEditable(displayElement: HTMLElement, inputType: string = "text") {
    displayElement.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = inputType;
        input.value = displayElement.textContent || "";
        displayElement.replaceWith(input);
        input.focus();

        input.addEventListener("blur", () => {
            saveEdit(displayElement, input);
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveEdit(displayElement, input);
            }
        });
    });
}

function saveEdit(displayElement: HTMLElement, input: HTMLInputElement) {
    const updatedValue = input.value.trim();
    displayElement.textContent = updatedValue || displayElement.textContent;
    input.replaceWith(displayElement);
    updateFormFromResume(); 
}

makeEditable(displayName, "text");
makeEditable(displayEmail, "email");
makeEditable(displayEducation, "text");
makeEditable(displayWorkExperience, "text");

displaySkills.addEventListener("click", () => {
    const skillsText = [].map.call(displaySkills.querySelectorAll("li"), (li: HTMLLIElement) => li.textContent)
        .join(", ");
    const input = document.createElement("input");
    input.type = "text";
    input.value = skillsText;
    displaySkills.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => saveSkillsEdit(input));
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveSkillsEdit(input);
        }
    });
});

function saveSkillsEdit(input: HTMLInputElement) {
    const skillsArray = input.value.split(",").map((skill) => skill.trim()).filter((skill) => skill);
    displaySkills.innerHTML = "";
    skillsArray.forEach((skill) => {
        const li = document.createElement("li");
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
    skillsInput.value = [].map.call(displaySkills.querySelectorAll("li"), (li: HTMLLIElement) => li.textContent)
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

    const skillsArray = skillsInput.value.split(",").map((skill) => skill.trim()).filter((skill) => skill);
    displaySkills.innerHTML = ""; 
    skillsArray.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        displaySkills.appendChild(li);
    });
}

profilePicInput.addEventListener("change", function (event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayPic.src = e.target!.result as string;
        };
        reader.readAsDataURL(file);
    }
});
