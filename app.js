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
    document.querySelector("table").append(createNotebookItem(notebook.title, notebook.lastRunTime));
  });
  if (response.ok) {
    document.querySelector("button").disabled = false;
    document.querySelector("button").style.backgroundColor = "";
  } else document.querySelector("button").style.backgroundColor = "var(--error)";
}

function createNotebookItem(name, date) {
  const item = document.createElement("tr");
  item.innerHTML = `<td>${name}</td><td>${date}</td>`;
  return item;
}
