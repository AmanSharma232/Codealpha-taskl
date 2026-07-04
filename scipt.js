const form = document.getElementById("ageForm");
const result = document.getElementById("result");
const error = document.getElementById("error");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const day = Number(document.getElementById("day").value);
  const month = Number(document.getElementById("month").value);
  const year = Number(document.getElementById("year").value);

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  if (!day || !month || !year) {
    showError("Please enter day, month, and year.");
    return;
  }

  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    showError("Please enter a valid date.");
    return;
  }

  if (birthDate > today) {
    showError("Date of birth cannot be in the future.");
    return;
  }

  let ageYears = today.getFullYear() - year;
  let ageMonths = today.getMonth() - (month - 1);
  let ageDays = today.getDate() - day;

  if (ageDays < 0) {
    ageMonths--;
    const previousMonthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    ageDays += previousMonthDays;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  error.textContent = "";
  result.textContent = `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
});

function showError(message) {
  error.textContent = message;
  result.textContent = "";
}