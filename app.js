async function list() {
  document.querySelector("table").innerHTML = `
  <tr>
    <th>name</th>
    <th>last run time</th>
  </tr>`;

  const params = new URLSearchParams({
    page: 1,
    pageSize: 100,
    search: "",
    group: "profile",
    user: "",
    language: "all",
    kernelType: "all",
    outputType: "all",
    sortBy: "dateRun",
    dataset: "",
    competition: "",
    parentKernel: "",
  });

  document.querySelector("button").disabled = true;
  document.querySelector("button").style.backgroundColor = "var(--secondary-background-color)";

  const response = await fetch("https://www.kaggle.com/api/v1/kernels/list?" + params, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa("dr12ak:773fd7859414f4437a58e6d806baad44"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Swagger-Codegen/1/python",
    },
  });
  const json = await response.json();
  json.forEach((notebook) => {
    document.querySelector("table").append(createNotebookItem(notebook.title, new Date(notebook.lastRunTime)));
  });
  if (response.ok) {
    document.querySelector("button").disabled = false;
    document.querySelector("button").style.backgroundColor = "";
  } else document.querySelector("button").style.backgroundColor = "var(--error)";
}

function createNotebookItem(name, date) {
  const item = document.createElement("tr");
  if (name === "[Private Notebook]")
    item.innerHTML = `
    <td>${name}</td>
    <td onclick="timeSince('${date.toISOString()}');">${date.toISOString().replace("T", "<br>").split(".")[0]}</td>`;
  else
    item.innerHTML = `
    <td><a href="https://www.kaggle.com/dr12ak/${name}" target="_blank" rel="noopener noreferrer">${name}</a></td>
    <td onclick="timeSince('${date.toISOString()}');">${date.toISOString().replace("T", "<br>").split(".")[0]}</td>`;
  return item;
}

function timeSince(date) {
  const difference = Math.abs(Date.now() - new Date(date));
  const days = Math.round(difference / (1000 * 60 * 60 * 24));
  const hours = Math.round(difference / (1000 * 60 * 60)) % 24;
  const minutes = Math.round(difference / (1000 * 60)) % 60;
  const seconds = Math.round(difference / 1000) % 60;
  alert(days + "d " + hours + "h " + minutes + "m " + seconds + "s ago");
}
