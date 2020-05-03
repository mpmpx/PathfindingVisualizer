
//Initialize the board
function boardInit() {
    var table = '';
    for (i = 0; i < window.innerHeight / 26; i++) {
        table += `<tr id='row${i}' >`;
        for (j = 0; j < window.innerWidth / 26; j++) {
            table += `<td id='${i}-${j}' class='unvisited'><//td>`;
        }
        table += `<//tr>`;
    }
    document.getElementById("board").innerHTML=table;
}

window.addEventListener('load', boardInit());
document.getElementById("10-10").className = 'start';
document.getElementById("10-30").className = 'goal';


//Bind events to buttons
var algoButtons = document.getElementById('algo-menu').children;
for (i = 0; i < algoButtons.length; i++) {
    algoButtons[i].onmousedown = function() {
        document.getElementById('visualization-button').innerHTML = 'Visualize ' + this.innerHTML;
    }
}


//Animation for cells
var isMouseDown = false;
var isStartSelected = false;
var isGoalSelected = false;

function changeCellColor(cell) {
    if (isMouseDown) {
        if (cell.className === 'unvisited') {
            cell.className = 'wall';
        } 
        else if (cell.className === 'wall') {
            cell.className = 'unvisited';
        }
    }
}

var rollNum = document.getElementById("board").rows.length;
var colNum = document.getElementById("board").rows[0].cells.length;

for (i = 0; i < rollNum; i++) {
    for (j = 0; j < colNum; j++) {
        document.getElementById(`${i}-${j}`).onmousedown = function() {
            isMouseDown = true;
            if (this.className === 'start') {
                isStartSelected = true;
            }
            if (this.className === 'goal') {
                isGoalSelected = true;
            }
            else {
                changeCellColor(this);
            }
        };
        document.getElementById(`${i}-${j}`).onmouseup =  function() {
            isStartSelected = false;
            isGoalSelected = false;
            isMouseDown = false;
        };
        document.getElementById(`${i}-${j}`).onmouseenter = function() {
            if (isStartSelected && this.className !== 'goal') {
                document.getElementsByClassName('start')[0].className = 'unvisited';
                this.className = 'start';
            }
            if (isGoalSelected && this.className !== 'start') {
                document.getElementsByClassName('goal')[0].className = 'unvisited';
                this.className = 'goal';
            }
            changeCellColor(this);
        };
    }
}


