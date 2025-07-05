const savedData = {
  "Name": "John Doe",
  "Location": "Seattle",
  "Job Role": "AABB",
  "Company": "XYZ, Co.",
  "Email": "abcdef@gmail.com",
"Phone": "XXYY", 
"Linkedin": "www.linkedin.com/in/xxyyzz/"	
};

const fieldsTypedIn = new WeakSet(); // Track fields where typing started

function removeExistingDropdowns() {
  document.querySelectorAll(".autofill-dropdown").forEach(el => el.remove());
}

function showSuggestions(input) {
  if (fieldsTypedIn.has(input)) return; // Do not show again for this field

  removeExistingDropdowns();

  const dropdown = document.createElement("div");
  dropdown.className = "autofill-dropdown";

  Object.entries(savedData).forEach(([label, value]) => {
    const option = document.createElement("div");
    option.innerText = `${label}: ${value}`;
    option.className = "autofill-option";
    option.onclick = () => {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      removeExistingDropdowns();
    };
    dropdown.appendChild(option);
  });

  document.body.appendChild(dropdown);

  const rect = input.getBoundingClientRect();
  dropdown.style.position = "absolute";
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.width = `${rect.width}px`;

  // 🆕 Mark this field as "typed in" if user starts typing
  const onType = () => {
    fieldsTypedIn.add(input);
    removeExistingDropdowns();
    input.removeEventListener("input", onType);
  };
  input.addEventListener("input", onType);
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if ((target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
    showSuggestions(target);
  } else {
    removeExistingDropdowns();
  }
});
