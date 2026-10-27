const rowsEl = document.getElementById("rows");

function render(rules) {
  rowsEl.innerHTML = "";
  rules.forEach((r, i) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML =
      '<input class="from" placeholder="Hello"><span class="arrow">→</span>' +
      '<input class="to" placeholder="Boing"><button class="del" title="Remove">×</button>';
    row.querySelector(".from").value = r.from;
    row.querySelector(".to").value = r.to;
    row.querySelector(".del").onclick = () => {
      rules.splice(i, 1);
      save(rules);
    };
    rowsEl.appendChild(row);
  });
}

function read() {
  return [...rowsEl.querySelectorAll(".row")].map((row) => ({
    from: row.querySelector(".from").value,
    to: row.querySelector(".to").value,
  }));
}

function save(rules) {
  chrome.storage.sync.set({ rules }, () => render(rules));
}

rowsEl.addEventListener("input", () => chrome.storage.sync.set({ rules: read() }));

document.getElementById("add").onclick = () => {
  const rules = read();
  rules.push({ from: "", to: "" });
  render(rules);
  rowsEl.lastElementChild.querySelector(".from").focus();
};

document.getElementById("reset").onclick = () => save(DEFAULT_RULES.map((r) => ({ ...r })));

chrome.storage.sync.get({ rules: DEFAULT_RULES }, ({ rules }) => render(rules));
