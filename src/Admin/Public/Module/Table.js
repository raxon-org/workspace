let table = {};
table.resize = ( node, style, sticky=false) => {
    if(is.nodeList(node)){
        let index;
        for(index=0; index < node.length; index++){
            table.resize(node[index], style, sticky);
        }
        return;
    }
    const row = node.getElementsByTagName('tr')[0],
        cols = row ? row.children : undefined;
    if (!cols){
        return;
    }
    //table.style.overflow = 'hidden';
    const tableHeight = node.offsetHeight;
    if(typeof style == 'undefined'){
        style = '2px solid #0000ff';
    }
    for (var i=0;i<cols.length;i++){
        let div = createDiv(tableHeight);
        cols[i].appendChild(div);
        if(sticky){
            cols[i].style.position = 'sticky';
        } else {
            cols[i].style.position = 'relative';
        }
        setListeners(div, style);
    }
    function setListeners(div, style){
        let pageX,curCol,nxtCol,curColWidth,nxtColWidth;
        div.addEventListener('mousedown', function (e) {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;
            let padding = paddingDiff(curCol);
            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol)
                nxtColWidth = nxtCol.offsetWidth - padding;
        });
        div.addEventListener('mouseover', function (e) {
            e.target.style.borderRight = style;
        })
        div.addEventListener('mouseout', function (e) {
            e.target.style.borderRight = '';
        })
        document.addEventListener('mousemove', function (e) {
            if (curCol) {
                let diffX = e.pageX - pageX;
                if (nxtCol){
                    nxtCol.style.width = (nxtColWidth - (diffX))+'px';
                }
                curCol.style.width = (curColWidth + diffX)+'px';
            }
        });

        document.addEventListener('mouseup', function (e) {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined
        });
    }

    function createDiv(height){
        const div = document.createElement('div');
        div.style.top = 0;
        div.style.right = '0px';
        div.style.width = '5px';
        div.style.paddingRight = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = height + 'px';
        return div;
    }

    function paddingDiff(col){
        if (getStyleVal(col,'box-sizing') == 'border-box'){
            return 0;
        }
        const padLeft = getStyleVal(col,'padding-left');
        const padRight = getStyleVal(col,'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));
    }

    function getStyleVal(element,css){
        return (window.getComputedStyle(element, null).getPropertyValue(css))
    }
};

export { table };