document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document
    .getElementById("data-table")
    .getElementsByTagName("tbody")[0];

  function fetchData() {
    const apiUrl = "http://localhost:3000/results";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        updateTable(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function updateTable(data) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    data.forEach((item, index) => {
      let row = tableBody.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.textContent = index + 1;
      cell2.textContent = item.name;
      cell3.textContent = item.last;
      cell4.textContent = item.buy;
      cell5.textContent = item.sell;
    });
  }

  function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;

    const timerInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
        fetchData();
      }
    }, 1000);
  }

  const tenSeconds = 59;
  const display = document.querySelector("#timer");
  startTimer(tenSeconds, display);

  fetchData();

  setInterval(() => {
    fetchData();
  }, 10000);
});
