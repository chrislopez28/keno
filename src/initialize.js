let svgns = "http://www.w3.org/2000/svg";
let viewBoxWidth = 100;
let viewBoxHeight = 80;
let rows = 8;
let cols = 10;
let strokeWidth = 2.5 / rows;
let spacing = 5;
let rounding = 0.25;

const gridX = viewBoxWidth / cols;
const gridY = viewBoxHeight / rows;

var currentNum = 1;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let g = document.createElementNS(svgns, "g");
    g.setAttributeNS(null, "font-size", 4);
    g.setAttributeNS(null, "id", `${i}${j}`);
    g.setAttributeNS(null, "class", `rect-group`);

    let rect = document.createElementNS(svgns, "rect");
    rect.setAttributeNS(null, "x", j * gridX + spacing * strokeWidth);
    rect.setAttributeNS(null, "y", i * gridY + spacing * strokeWidth);
    rect.setAttributeNS(null, "height", gridY - spacing * strokeWidth);
    rect.setAttributeNS(null, "width", gridX - spacing * strokeWidth);
    rect.setAttributeNS(null, "fill", "none");
    rect.setAttributeNS(null, "stroke", "black");
    rect.setAttributeNS(null, "stroke-width", strokeWidth);
    rect.setAttributeNS(null, "rx", rounding);
    rect.setAttributeNS(null, "pointer-events", "all");
    rect.setAttributeNS(null, "class", "rect");
    rect.setAttributeNS(null, "id", `rect_${i}${j}`);

    let text = document.createElementNS(svgns, "text");
    text.setAttributeNS(
      null,
      "x",
      j * gridX + spacing * strokeWidth + (gridX - spacing * strokeWidth) / 2
    );
    text.setAttributeNS(
      null,
      "y",
      i * gridY + spacing * strokeWidth + (gridY - spacing * strokeWidth) / 1.5
    );
    text.setAttributeNS(null, "text-anchor", "middle");
    text.setAttributeNS(null, "class", "text");
    text.setAttributeNS(null, "id", `text_${i}${j}`);
    text.innerHTML = currentNum;

    g.appendChild(rect);
    g.appendChild(text);
    document.getElementById("grid").appendChild(g);
    currentNum++;
  }
}

export const svg = document.getElementById("grid");

var grid = [];
var count = 1;

for (let i = 0; i < rows; i++) {
  grid.push([]);
  for (let j = 0; j < cols; j++) {
    grid[i].push({
      color: "",
      selected: false,
      drawn: false,
      value: count,
      neighbors: 0,
      id: `${i}${j}`,
    });
    if (grid[i][j].selected) {
      document.getElementById(`${i}${j}`).classList.add("selected");
    } else {
      document.getElementById(`${i}${j}`).classList.remove("selected");
      count++;
    }
  }
}

export const Grid = grid;
