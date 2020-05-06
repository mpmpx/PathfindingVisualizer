
//Initialize the board
function boardInit() {
    var table = '';
    var offsetHeight = document.getElementsByClassName('nav-header')[0].offsetHeight;
    var height = window.innerHeight - offsetHeight * 3.4;
    var width = window.innerWidth;
    for (i = 0; i < height / 26; i++) {
        table += `<tr id='row${i}' >`;
        for (j = 0; j < width / 26; j++) {
            table += `<td id='${i}-${j}' class='unvisited'><//td>`;
        }
        table += `<//tr>`;
    }


    document.getElementById("board").innerHTML=table;
    startPos = `${Math.floor(height / 26 / 2)}-${Math.floor(width / 26 / 3.5)}`;
    goalPos = `${Math.floor(height / 26 / 2)}-${Math.floor(width / 26 / 1.5)}`;    
    document.getElementById(startPos).className = 'start';
    document.getElementById(goalPos).className = 'goal';
}

window.addEventListener('load', boardInit());


function clearBoard() {
    var start = document.getElementsByClassName('start')[0].id;
    var goal = document.getElementsByClassName('goal')[0].id;
    
    var td = document.getElementsByTagName('td');
    for (i = 0; i < td.length; i++) {
        if (td[i].className !== 'wall') {
            
        
        td[i].className = 'unvisited';
    
        }
    }
    document.getElementById(start).className = 'start';
    document.getElementById(goal).className = 'goal';
}


//Bind events to buttons
var algoButtons = document.getElementById('algo-menu').children;
for (i = 0; i < algoButtons.length; i++) {
    algoButtons[i].onmousedown = function() {
        var visualButton = document.getElementById('visualization-button');
        visualButton.innerHTML = 'Visualize ' + this.innerHTML;
        visualButton.classList.remove(visualButton.classList[1]);
        visualButton.classList.add(this.id);
    };
}

function Board() {
    this.start = document.getElementsByClassName('start')[0].id;
    this.goal = document.getElementsByClassName('goal')[0].id;
    this.unvisited = new Set();
    var unvisitedClass = document.getElementsByClassName('unvisited');
    for (i = 0; i < unvisitedClass.length; i++) {
        this.unvisited.add(unvisitedClass[i].id);
    }
    this.wall = [];
    var wallElements = document.getElementsByClassName('wall');
    for (i = 0; i < wallElements.length; i++) {
        this.wall.push(wallElements[i].id);
    }
}


function runAlgorithm(onAnimation) {
    clearBoard();
    var board = new Board();
    switch (document.getElementById('visualization-button').classList[1]) {
        case 'no-algorithm':
            this.innerHTML = 'Select an algorithm';
            break;
        case 'dfs':
            DFS(board, onAnimation);
            break;
        case 'bfs':
            BFS(board, onAnimation);
            break;
        case 'dijkstra':
            alert('dijkstra');
            break;
        case 'astar':
            alert('astar');
    }
}

var isAlgoSelected = false;

document.getElementById('visualization-button').onclick = function() {
    isAlgoSelected = true;
    runAlgorithm(onAnimation=true);
};

//Animation for cells
var isMouseDown = false;
var isStartSelected = false;
var isGoalSelected = false;

function changeCellColor(cell) {
    classList = ['unvisited', 'shortest-path', 'shortest-path-no-animation', 'search', 'search-no-animation']
    if (isMouseDown) {
        if (classList.includes(cell.className)) {
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
                
                if (isAlgoSelected) {
                    
                    runAlgorithm(onAnimatio=false);
                }
                else {
                    this.className = 'start';
                }
            }
            if (isGoalSelected && this.className !== 'start') {
                document.getElementsByClassName('goal')[0].className = 'unvisited';
                this.className = 'goal';
                if (isAlgoSelected) {
                    runAlgorithm(onAnimation=false);
                }
            }
            changeCellColor(this);
        };
    }
}


