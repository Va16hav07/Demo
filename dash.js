const calendarGrid = document.getElementById("calendar-grid");
const monthYearDisplay = document.getElementById("month-year");
const taskList = document.getElementById("task-list");

let currentDate = new Date();

// Initialize the calendar
function loadCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYearDisplay.textContent = `${date.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarGrid.innerHTML = "";

  // Fill empty cells for days of the previous month
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-cell");
    calendarGrid.appendChild(emptyCell);
  }

  // Fill actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell");
    cell.textContent = day;
    cell.addEventListener("dragover", (e) => e.preventDefault());
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const task = document.querySelector(".dragging");
      cell.appendChild(task);
    });
    calendarGrid.appendChild(cell);
  }
}

// Drag and Drop Functionality
document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
});

// Navigation Controls
document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar(currentDate);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar(currentDate);
});

// Initial Load
loadCalendar(currentDate);
