var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight,
    count = 0;

randomColors = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

getRndColor = () => {
    return 'hsl(' + (360 * Math.random()) + ',50%,50%)'; // H,S,L
}


createMemo = () => {
    var posx = Math.floor(Math.random() * x) - 100;
    var posy = Math.floor(Math.random() * y) - 100;

    var _divId = 'block-' + count;
    var iDiv = document.createElement('div');

    iDiv.id = _divId;
    iDiv.className = 'block';
    iDiv.style.background = randomColors();
    iDiv.style.position = "absolute";
    iDiv.style.top = posx + 'px';
    iDiv.style.left = posy + 'px';
    iDiv.style.border = '1px dashed ' + getRndColor();
    iDiv.innerHTML = `<span class="close" onClick='bar("${_divId}")'><b> x </b></span><h4>Task/Memo ${count}</h4><textarea>Hello</textarea><h6 id="move-${count}" class="move">MOVE</h6>`;
    iDiv.onclick = () => { increaseZIndex(_divId) }; 
    // or iDiv.addEventListener('click', (e)=>{increaseZIndex('id')}, true);
    document.getElementsByTagName('body')[0].appendChild(iDiv);
    addListeners(`move-${count}`, _divId);
    ++count;
}

bar = (id) => {
    document.getElementById(id).remove();
}

increaseZIndex = (id) => {
    var ele = document.getElementById(id);
    if (ele)
        ele.style.zIndex = (parseInt(ele.style.zIndex) || 0) + 2;
}

function addListeners(moveId, divId) {
    document.getElementById(moveId).addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    function mouseUp() {
        window.removeEventListener('mousemove', divMove, true);
    }

    function mouseDown(e) {
        window.addEventListener('mousemove', divMove, true);
    }

    function divMove(e) {
        var div = document.getElementById(divId);
        div.style.position = 'absolute';
        div.style.top = e.clientY + 'px';
        div.style.left = e.clientX + 'px';
    }

}

