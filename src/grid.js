let viewBoxWidth = 100;
let viewBoxHeight = 80;
let rows = 8;
let cols = 10;
let strokeWidth = 2.5 / rows;
let spacing = 5;
let rounding = 0.25;

const gridX = viewBoxWidth / cols;
const gridY = viewBoxHeight / rows;

function createSvgGrid(rows, cols, svgns = "http://www.w3.org/2000/svg") {
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
        i * gridY +
          spacing * strokeWidth +
          (gridY - spacing * strokeWidth) / 1.5
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
}

createSvgGrid(rows, cols);

function createGrid(rows, cols) {
  let grid = [];
  let count = 1;

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

  return grid;
}

var playerNumbers = {};

let svg = document.getElementById("grid");

function getPlayerNumbers(playerNumbers) {
  return playerNumbers;
}

const clicked = (event) => {
  let viewBoxWidth = 100;
  let viewBoxHeight = 80;
  let rows = 8;
  let cols = 10;
  const gridX = viewBoxWidth / cols;
  const gridY = viewBoxHeight / rows;

  let m = oMousePosSVG(event);
  console.log(m.y, m.x, playerNumbers);
  updateSelectStatus(grid, Math.floor(m.y / gridY), Math.floor(m.x / gridX));
};

const oMousePosSVG = (e) => {
  svg = document.getElementById("grid");
  let p = svg.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  let ctm = svg.getScreenCTM().inverse();
  p = p.matrixTransform(ctm);
  return p;
};

function updateSelectStatus(grid, i, j) {
  console.log(i, j);
  grid[i][j].selected = !grid[i][j].selected;
  if (grid[i][j].selected) {
    document.getElementById(`rect_${i}${j}`).classList.add("selected");
    playerNumbers[grid[i][j].value] = true;
    document.getElementById("player-nums").innerHTML = Object.keys(
      playerNumbers
    );
    document.getElementById("num-selected").innerHTML = Object.keys(
      playerNumbers
    ).length;
  } else {
    document.getElementById(`rect_${i}${j}`).classList.remove("selected");
    delete playerNumbers[grid[i][j].value];
    document.getElementById("player-nums").innerHTML = Object.keys(
      playerNumbers
    );
    document.getElementById("num-selected").innerHTML = Object.keys(
      playerNumbers
    ).length;
  }
}

let grid = createGrid(rows, cols);

svg.addEventListener("click", clicked);
