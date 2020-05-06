function genericSearch(board, openList) {
    var visited = [];
    var firstState = [board.start, [board.start]];
    openList.push(firstState);
    
    while (!openList.isEmpty()) {
        do {
            if (openList.isEmpty()) {
                return [visited, []];    
            }
            var currentState = openList.pop();
        } while(visited.includes(currentState[0]) || board.wall.includes(currentState[0]));
        
        visited.push(currentState[0]);
        if (currentState[0] === board.goal) {
            return [visited, currentState[1]];
        }
        
        var successors = getSuccessors(currentState[0]);        
        for (i = 0; i < successors.length; i++) {
            if (document.getElementById(successors[i]) && !visited.includes(successors[i])) {
                var newPath = [...currentState[1]];
                newPath.push(successors[i]);
                var newState = [successors[i], newPath];
                openList.push(newState);
            }
        }
    }
    return [visited, []];
}

function DFS(board, onAnimation=true) {
    var result = genericSearch(board, new Stack());
    if (onAnimation) {
        searchAnimation(result[0], result[1]);
    }
    else {
        searchNoAnimation(result[0], result[1]);
    }
}

function BFS(board, onAnimation=true) {
    var result = genericSearch(board, new Queue());
    if (onAnimation) {
        searchAnimation(result[0], result[1]);
    }
    else {
        searchNoAnimation(result[0], result[1]);
    }
}


