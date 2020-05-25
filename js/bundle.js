function Board() {
    this.start = () => {
        if (document.getElementsByClassName('start')[0] !== undefined) {
            return document.getElementsByClassName('start')[0].id;
        }
        else {
            return document.getElementsByClassName('start-shortest-path')[0].id;
        }
    };
    this.goal = () => {
        if (document.getElementsByClassName('goal')[0] !== undefined) {
            return document.getElementsByClassName('goal')[0].id;
        }
        else {
            return document.getElementsByClassName('goal-shortest-path')[0].id;
        }
    };
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
    var classList = ['start', 'goal', 'start-shortest-path', 'goal-shortest-path', 'wall'];
    var td = document.getElementsByTagName('td');
    
    for (i = 0; i < td.length; i++) {
        if (!classList.includes(td[i].className)) {
            td[i].className = 'unvisited';
        }
    }
}

var isAlgoSelected = false;

document.getElementById('visualization-button').onclick = function() {
    isAlgoSelected = true;
    runAlgorithm(onAnimation=true);
};


document.getElementById('clear-wall-button').addEventListener('click', function() {
    var td = document.getElementsByTagName('td');
    for (i = 0; i < td.length; i++) {
        if (td[i].className === 'wall') {
            td[i].className = 'unvisited';
        }
    }
});

document.getElementById('clear-path-button').addEventListener('click', function() {
    var td = document.getElementsByTagName('td');
    var classList = ['shortest-path', 'shortest-path-no-animation', 'search', 'search-no-animation'];
    for (i = 0; i < td.length; i++) {
        if (classList.includes(td[i].className)) {
            td[i].className = 'unvisited';
        }
    }
    
    document.getElementsByClassName('start-shortest-path')[0].className = "start";
    document.getElementsByClassName('goal-shortest-path')[0].className = "goal";
    isAlgoSelected = false;
});

document.getElementById('restart-button').addEventListener('click', function() {
    var visualButton = document.getElementById('visualization-button');
    var td = document.getElementsByTagName('td');
    
    for (i = 0; i < td.length; i++) {
        td[i].className = 'unvisited';
    }
    visualButton.classList.remove(visualButton.classList[1]);
    visualButton.classList.add("no-algorithm");
    visualButton.innerHTML = "Visualize";
    isAlgoSelected = false;
    
    var offsetHeight = document.getElementsByClassName('nav-header')[0].offsetHeight;
    var height = window.innerHeight - offsetHeight * 3.4;
    var width = window.innerWidth;
    startPos = `${Math.floor(height / 26 / 2)}-${Math.floor(width / 26 / 3.5)}`;
    goalPos = `${Math.floor(height / 26 / 2)}-${Math.floor(width / 26 / 1.5)}`;    
    document.getElementById(startPos).className = 'start';
    document.getElementById(goalPos).className = 'goal';
});

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

function runAlgorithm(onAnimation) {
    clearBoard();
    var board = new Board();
    switch (document.getElementById('visualization-button').classList[1]) {
        case 'no-algorithm':
            document.getElementById('visualization-button').innerHTML = 'Select an algorithm';
            break;
        case 'dfs':
            DFS(board, onAnimation);
            break;
        case 'bfs':
            BFS(board, onAnimation);
            break;
        case 'astar':
            Astar(board, onAnimation);
    }
}



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
var isTempCovered = false;
var startList = ["start", "start-search", "start-shortest-path"];
var goalList = ["goal", "goal-search", "goal-shortest-path"];

for (i = 0; i < rollNum; i++) {
    for (j = 0; j < colNum; j++) {
        document.getElementById(`${i}-${j}`).onmousedown = function() {
            isMouseDown = true;
            
            if (startList.includes(this.className)) {
                isStartSelected = true;
            }
            else if (goalList.includes(this.className)) {
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
            if (isStartSelected && !goalList.includes(this.className)) {
                var start = 'start';
                if (document.getElementsByClassName("start-shortest-path")[0] !== undefined) {
                    start = "start-shortest-path";
                }
                
                if (isTempCovered) {
                    document.getElementsByClassName(start)[0].className = 'wall';
                    isTempCovered = false;
                }
                else {
                    document.getElementsByClassName(start)[0].className = 'unvisited';
                }
                
                if(this.className === 'wall') {
                    isTempCovered = true;
                }
                
                this.className = start;
                if (isAlgoSelected) {
                    runAlgorithm(onAnimation=false);
                }
            }
            if (isGoalSelected && !startList.includes(this.className)) {
                var goal = 'goal';
                if (document.getElementsByClassName("goal-shortest-path")[0] !== undefined) {
                    goal = "goal-shortest-path";
                }
                
                if (isTempCovered) {
                    document.getElementsByClassName(goal)[0].className = 'wall';
                    isTempCovered = false;
                }
                else {
                    document.getElementsByClassName(goal)[0].className = 'unvisited';
                }
                
                if(this.className === 'wall') {
                    isTempCovered = true;
                }
                
                this.className = goal;
                if (isAlgoSelected) {
                    runAlgorithm(onAnimation=false);
                }
            }
            changeCellColor(this);
        };
    }
}


