const addDayBtn = document.getElementById("addDay");
const daysList = document.getElementById("daysList");
let dayCount = 0;

loadDays();

function createDay(text = `Day ${++dayCount}`, isDone = false) {
    const leftSideContainer = document.createElement("div");

    const doneBtn = document.createElement("input");
    doneBtn.type = "checkbox";
    doneBtn.className = "doneBtn";
    doneBtn.checked = isDone;

    const dayText = document.createElement("span");
    dayText.className = "dayText";
    dayText.textContent = text;

    if (isDone) {
        dayText.style.textDecoration = "line-through";
    }

    leftSideContainer.appendChild(doneBtn);
    leftSideContainer.appendChild(dayText);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    const listItem = document.createElement("li");
    listItem.appendChild(leftSideContainer);
    listItem.appendChild(deleteBtn);
    daysList.appendChild(listItem);

    const allDeleteButtons = document.querySelectorAll(".deleteBtn");
    allDeleteButtons.forEach(btn => (btn.style.display = "none"));
    deleteBtn.style.display = "block";
    
    doneBtn.addEventListener("change", () => {
        dayText.style.textDecoration = doneBtn.checked ? "line-through" : "none";
        saveDays();
    });

    deleteBtn.addEventListener("click", () => {
        daysList.removeChild(listItem);
        dayCount--;
        saveDays();

        const lastDeleteBtn = daysList.querySelector("li:last-child .deleteBtn");
        if (lastDeleteBtn) {
            lastDeleteBtn.style.display = "block";
        }
    });

    saveDays();
}


addDayBtn.addEventListener("click", () => {
    createDay();
    saveDays();
});

function saveDays() {
    const days = [];
    const listItems = daysList.querySelectorAll("li");
    listItems.forEach(item => {
        const dayText = item.querySelector(".dayText").textContent;
        const isDone = item.querySelector(".doneBtn").checked;
        days.push({ text: dayText, isDone });
    });

    localStorage.setItem("days", JSON.stringify(days));
    localStorage.setItem("dayCount", dayCount);
}

function loadDays() {
    const days = JSON.parse(localStorage.getItem("days")) || [];
    dayCount = parseInt(localStorage.getItem("dayCount")) || 0;
    days.forEach(day => {
        createDay(day.text, day.isDone);
    });
}