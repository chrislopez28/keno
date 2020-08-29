let svgns = "http://www.w3.org/2000/svg";
let viewBoxWidth = 100;
let viewBoxHeight = 80;
let rows = 8;
let cols = 10;
let strokeWidth = 2.5 / rows;
let spacing = 5;
let rounding = 0.25;

gridX = viewBoxWidth/cols;
gridY = viewBoxHeight/rows;

var currentNum = 1;

for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
  	let g = document.createElementNS(svgns, 'g');
    g.setAttributeNS(null, 'font-size', 4);
    g.setAttributeNS(null, 'id', `${i}${j}`);
    g.setAttributeNS(null, 'class', `rect-group`);
    
    let rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', j * gridX + spacing * strokeWidth);
    rect.setAttributeNS(null, 'y', i * gridY + spacing * strokeWidth);
    rect.setAttributeNS(null, 'height', gridY - spacing * strokeWidth);
    rect.setAttributeNS(null, 'width', gridX - spacing * strokeWidth);
    rect.setAttributeNS(null, 'fill', 'none');
    rect.setAttributeNS(null, 'stroke', 'black');
    rect.setAttributeNS(null, 'stroke-width', strokeWidth);
    rect.setAttributeNS(null, 'rx', rounding);
    rect.setAttributeNS(null, 'pointer-events', 'all');
    rect.setAttributeNS(null, 'class', 'rect');
    rect.setAttributeNS(null, 'id', `rect_${i}${j}`);

    let text = document.createElementNS(svgns, 'text');
    text.setAttributeNS(null, 'x', j * gridX + spacing * strokeWidth + (gridX - spacing * strokeWidth)/2);
    text.setAttributeNS(null, 'y', i * gridY + spacing * strokeWidth + (gridY - spacing * strokeWidth)/1.5);
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.setAttributeNS(null, 'class', 'text');
    text.setAttributeNS(null, 'id', `text_${i}${j}`);
    text.innerHTML = currentNum;

    g.appendChild(rect);
    g.appendChild(text);
    document.getElementById('grid').appendChild(g);
    currentNum++;
  }
}

svg = document.getElementById('grid');

clicked = (event) => {
	let m = oMousePosSVG(event);
  console.log(m.y, m.x);
  updateSelectStatus(Math.floor(m.y / gridY), Math.floor(m.x / gridX));
}

var grid = [];
var credits = 1000;
var count = 1;
var pickSound = new Audio("./sounds/click.wav");
var matchSound = new Audio("./sounds/ding.wav");
var creditSound = new Audio("./sounds/bell.wav");
creditSound.volume = 0.6;

for (let i = 0; i < rows; i++) {
	grid.push([])
	for (let j = 0; j < cols; j++) {
  	grid[i].push({
    	color: "",
      selected: false,
      drawn: false,
      value: count,
      neighbors: 0,
      id: `${i}${j}`
    });
    if (grid[i][j].selected) {
      document.getElementById(`${i}${j}`).classList.add("selected");
    } else {
      document.getElementById(`${i}${j}`).classList.remove("selected");
      count++;
  }
  }
}

const kenoNums = Array.from(Array(80), (_, i) => i + 1);
var matches = [];

shuffle = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
  	randNum = Math.floor(Math.random() * i);
    temp = arr[randNum];
    arr[randNum] = arr[i];
    arr[i] = temp;
  }
}

getCoords = (num) => {
	return {
  	i: Math.floor( (num - 1) / 10),
    j: ((num - 1) % 10)
  };
}

var playerNumbers = {};
var drawnNumbers = [];
var drawingActive = false;

pickNums = () => {
	for (let i = 0; i < 20; i++) {
        pick = getCoords(kenoNums[i])
        console.log(kenoNums[i], pick)
        document.getElementById(`rect_${pick.i}${pick.j}`).classList.add('drawn');
        grid[pick.i][pick.j].drawn = true;
        drawnNumbers.push(kenoNums[i]);
    }
    document.getElementById('drawn').innerHTML = drawnNumbers;
}

slowPick = () => {
  if (!drawingActive) {
    useCredit(); 
    clearDrawing(); 
    shuffle(kenoNums); 
    drawingActive = true;
    document.getElementById('message').innerHTML = 'Drawing Numbers...';
    let counter = 0;
    let pickInterval = setInterval( () => {
        matches = [];
        pick = getCoords(kenoNums[counter])
  
        console.log(kenoNums[counter], pick)
        document.getElementById(`rect_${pick.i}${pick.j}`).classList.add('drawn');
        grid[pick.i][pick.j].drawn = true;
        drawnNumbers.push(kenoNums[counter]);
  
        document.getElementById('drawn').innerHTML = drawnNumbers;
  
        Object.keys(playerNumbers).forEach( element => {
            if (drawnNumbers.includes(parseInt(element))) {
                matches.push(element);
            }
            if (playerNumbers[grid[pick.i][pick.j].value]) {
              matchSound.play();
            } else {
              pickSound.play();
            }
        })
        document.getElementById('matches').innerHTML = `${matches.length}`;
  
        counter++;
        if (counter == 20) {
          drawingActive = false;
          clearInterval(pickInterval);
          matches = checkNums(playerNumbers, drawnNumbers); 
          awardCredit()
        }
    }, 750)
  }
}

useCredit = () => {
    if (credits >=1) {
        credits--
        document.getElementById('credits').innerHTML = credits;
    } 
}

awardCredit = () => {
  let numSelected = Object.keys(playerNumbers).length;
  if (paytable[numSelected]) {
    let numHit = matches.length;
    if (paytable[numSelected][numHit]) {
      document.getElementById('message').innerHTML = `You won ${ paytable[numSelected][numHit] } credits`;
      if (paytable[numSelected][numHit] == 0.5) {
        credits += 0.5;
        creditSound.currentTime = 0.12;
        creditSound.play();
        document.getElementById('credits').innerHTML = credits;
      } else {
        let counter = 0;
        let awardInterval = setInterval( () => {
          credits += 1;
          creditSound.currentTime = 0.12;
          creditSound.play();
          document.getElementById('credits').innerHTML = credits;
          counter++;
          if (counter >= paytable[numSelected][numHit]) {
            clearInterval(awardInterval);
          }
        }, 28)  
      }
    } else {
      document.getElementById('message').innerHTML = 'Game Over. Push Play to Draw Again.';
    }
  } 
  document.getElementById('credits').innerHTML = credits;
}

clearDrawing = () => {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
     	if (grid[i][j].drawn == true) {
      	document.getElementById(`rect_${i}${j}`).classList.remove('drawn');
        grid[i][j].drawn = false;
      }
    }
  }
  drawnNumbers = [];
  document.getElementById('drawn').innerHTML = "";
}

const clearSelection = () => {
  clearDrawing();
  matches = [];
  document.getElementById('matches').innerHTML = `${matches.length}`;
  for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
     	if (playerNumbers[grid[i][j].value]) {
        document.getElementById(`rect_${i}${j}`).classList.remove('selected');
        delete playerNumbers[grid[i][j].value];
        document.getElementById('player-nums').innerHTML = Object.keys(playerNumbers);
        document.getElementById('num-selected').innerHTML = Object.keys(playerNumbers).length;
      }
    }
  }
}

const updateSelectStatus = (i, j) => {
	
  console.log(i, j);
  grid[i][j].selected = !grid[i][j].selected; 
  if (grid[i][j].selected) {
  	document.getElementById(`rect_${i}${j}`).classList.add('selected');
    playerNumbers[grid[i][j].value] = true;
    document.getElementById('player-nums').innerHTML = Object.keys(playerNumbers);
    document.getElementById('num-selected').innerHTML = Object.keys(playerNumbers).length;
  } else {
  	document.getElementById(`rect_${i}${j}`).classList.remove("selected");
    delete playerNumbers[grid[i][j].value];
    document.getElementById('player-nums').innerHTML = Object.keys(playerNumbers);
    document.getElementById('num-selected').innerHTML = Object.keys(playerNumbers).length;
  }
}

checkNums = (playerNumbers, drawnNumbers) => {
    matches = []
    Object.keys(playerNumbers).forEach( element => {
        if (drawnNumbers.includes(parseInt(element))) {
            matches.push(element);
        }
    })
    document.getElementById('matches').innerHTML = `${matches.length}`;
    return matches;
}

oMousePosSVG = (e) => {
	let p = svg.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  let ctm = svg.getScreenCTM().inverse();
  p = p.matrixTransform(ctm);
  return p;
}

svg.addEventListener("click", clicked);

