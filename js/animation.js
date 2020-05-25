function searchAnimation(visited, shortest) {
    var start = document.getElementsByClassName('start')[0];
    var goal = document.getElementsByClassName('goal')[0];
    
    if (start === undefined) {
        start = document.getElementsByClassName("start-shortest-path")[0];
    }
    if (goal === undefined) {
        goal = document.getElementsByClassName("goal-shortest-path")[0];
    }
    
    goal.className = 'goal';
    document.getElementsByTagName('html')[0].style['pointer-events'] = 'none';
    start.className = 'start-search'

    var i = 0;
    var searching = setInterval(function() {    
        i++;
        if (i === visited.length - 2) {
            goal.className = 'goal-search';
            clearInterval(searching);
            
            document.getElementsByClassName('start-search')[0].className = 'start-shortest-path';
            var j = 0;
            var showPath = setInterval(function() {
                j++;
                if (shortest.length < 2 || j === shortest.length - 2) {
                    document.getElementsByClassName('goal-search')[0].className = 'goal-shortest-path';
                    clearInterval(showPath);
                    document.getElementsByTagName('html')[0].style['pointer-events'] = 'auto';
                }
                
                document.getElementById(shortest[j]).className = 'shortest-path';
            }, 20);
        }
        document.getElementById(visited[i]).className = 'search';

    }, 5);
}

function searchNoAnimation(visited, shortest) {
    for (i = 0; i < visited.length; i++) {
        if (i === 0) {
            continue;
        }
        
        if (i === visited.length - 1) {
            continue;
        }
        document.getElementById(visited[i]).className = 'search-no-animation';
    }
    
    for (i = 0; i < shortest.length; i++) {
        if (i === 0) {
            continue;
        }
        
        if (i === shortest.length - 1) {
            continue;
        }
        document.getElementById(shortest[i]).className = 'shortest-path-no-animation';
    }
}