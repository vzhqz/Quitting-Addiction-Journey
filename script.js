const addDayBtn = document.getElementById("addDay");
const daysList = document.getElementById("daysList");
let dayCount = 0;
let startDate = new Date('2025-01-28'); // Starting date for Day 1

loadDays();

function createDay(text = `Day ${++dayCount}`, isDone = false, date = getNextDate()) {
    const leftSideContainer = document.createElement("div");

    const doneBtn = document.createElement("input");
    doneBtn.type = "checkbox";
    doneBtn.className = "doneBtn";
    doneBtn.checked = isDone;

    const dayText = document.createElement("span");
    dayText.className = "dayText";
    dayText.textContent = `${text} - ${date}`;

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
    createDay(undefined, false, getNextDate());
    saveDays();
});

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getNextDate() {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayCount);
    return formatDate(currentDate);
}

function saveDays() {
    const days = [];
    const listItems = daysList.querySelectorAll("li");
    listItems.forEach(item => {
        const dayText = item.querySelector(".dayText").textContent;
        const isDone = item.querySelector(".doneBtn").checked;
        const date = dayText.split(" - ")[1];
        days.push({ text: dayText.split(" - ")[0], date: date, isDone });
    });

    localStorage.setItem("days", JSON.stringify(days));
    localStorage.setItem("dayCount", dayCount);
}

function loadDays() {
    const days = JSON.parse(localStorage.getItem("days")) || [];
    dayCount = parseInt(localStorage.getItem("dayCount")) || 0;
    days.forEach(day => {
        createDay(day.text, day.isDone, day.date);
    });
}
