/* Taken from https://www.thekenoguide.com/keno-payout-schedules.html */
var paytable = {
  1: {
    1: 3,
  },
  2: {
    1: 1,
    2: 9,
  },
  3: {
    1: 1,
    2: 2,
    3: 16,
  },
  4: {
    1: 0.5,
    2: 2,
    3: 6,
    4: 12,
  },
  5: {
    1: 0.5,
    2: 1,
    3: 3,
    4: 15,
    5: 50,
  },
  6: {
    1: 0.5,
    2: 1,
    3: 2,
    4: 3,
    5: 30,
    6: 75,
  },
  7: {
    1: 0.5,
    2: 0.5,
    3: 1,
    4: 6,
    5: 12,
    6: 36,
    7: 100,
  },
  8: {
    1: 0.5,
    2: 0.5,
    3: 1,
    4: 3,
    5: 6,
    6: 19,
    7: 90,
    8: 720,
  },
  9: {
    1: 0.5,
    2: 0.5,
    3: 1,
    4: 2,
    5: 4,
    6: 8,
    7: 20,
    8: 80,
    9: 1200,
  },
  10: {
    2: 0.5,
    3: 1,
    4: 2,
    5: 3,
    6: 5,
    7: 10,
    8: 30,
    9: 600,
    10: 1800,
  },
  11: {
    2: 0.5,
    3: 1,
    4: 1,
    5: 2,
    6: 6,
    7: 15,
    8: 25,
    9: 180,
    10: 1000,
    11: 3000,
  },
  12: {
    3: 0.5,
    4: 1,
    5: 2,
    6: 4,
    7: 24,
    8: 72,
    9: 250,
    10: 500,
    11: 2000,
    12: 4000,
  },
  13: {
    3: 0.5,
    4: 0.5,
    5: 3,
    6: 4,
    7: 5,
    8: 20,
    9: 80,
    10: 240,
    11: 500,
    12: 3000,
    13: 6000,
  },
  14: {
    3: 0.5,
    4: 0.5,
    5: 2,
    6: 3,
    7: 5,
    8: 12,
    9: 50,
    10: 150,
    11: 500,
    12: 1000,
    13: 2000,
    14: 7500,
  },
  15: {
    3: 0.5,
    4: 0.5,
    5: 1,
    6: 2,
    7: 5,
    8: 15,
    9: 50,
    10: 150,
    11: 300,
    12: 600,
    13: 1200,
    14: 2500,
    15: 10000,
  },
};

var payoutTable = document.getElementById("payout-table");

let headers = document.createElement("thead");
let headerRow1 = document.createElement("tr");
let headerRow2 = document.createElement("tr");
let tempHeader;

tempHeader = document.createElement("td");
tempHeader.setAttribute("colspan", "18");
tempHeader.appendChild(document.createTextNode("# Spots Hit"));
headerRow1.appendChild(tempHeader);

headerRow2.appendChild(document.createElement("th"));
headerRow2.appendChild(document.createElement("th"));

for (let i = 0; i <= 15; i++) {
  tempHeader = document.createElement("th");
  tempHeader.appendChild(document.createTextNode(i));
  headerRow2.appendChild(tempHeader);
}

headers.appendChild(headerRow1);
headers.appendChild(headerRow2);

let body = document.createElement("tbody");
let row;

let yAxisTitle = document.createElement("td");
yAxisTitle.setAttribute("rowspan", "16");
// yAxisTitle.style.writingMode = "vertical-rl";
// yAxisTitle.style.textOrientation = "mixed";
yAxisTitle.style.transform = "rotate(270deg)";

yAxisTitle.appendChild(document.createTextNode("# Spots Selected"));

for (let j = 1; j <= 15; j++) {
  row = document.createElement("tr");
  j === 1 ? row.appendChild(yAxisTitle) : null;
  tempItem = document.createElement("td");
  tempItem.appendChild(document.createTextNode(j));
  row.appendChild(tempItem);
  for (let i = 0; i <= 15; i++) {
    itemText = paytable[j].hasOwnProperty(i) ? paytable[j][i] : "";

    tempItem = document.createElement("td");
    tempItem.appendChild(document.createTextNode(itemText));
    row.appendChild(tempItem);
  }
  body.appendChild(row);
}

payoutTable.appendChild(headers);
payoutTable.appendChild(body);
