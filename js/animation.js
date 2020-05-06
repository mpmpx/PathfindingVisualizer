function searchAnimation(visited, shortest) {
    document.getElementsByTagName('html')[0].style['pointer-events'] = 'none';
    var i = 0;
    var searching = setInterval(function() {
        i++;
        if (i === visited.length - 2) {
            clearInterval(searching);
            var j = 0;
            var showPath = setInterval(function() {
                j++;
                if (j === shortest.length - 2) {
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