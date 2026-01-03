import { getSectionById } from "/Module/Section.js";
import { taskbar } from "/Application/Desktop/Module/Taskbar.js";
import { navigation } from "/Application/Desktop/Module/Navigation.js";

let dialog = {};

dialog.init = (id) => {
    const section = getSectionById(id);
    if(!section){
        return;
    }
    section.removeClass('display-none');
    dialog.close(section);
    dialog.minimize(section);
    dialog.bind(section);
    dialog.index(section);
    dialog.body(section);
    dialog.footer(section);
}

dialog.close = (section) => {
    const close = section.select('.close');
    if(close){
        close.on('click', (event) => {
            taskbar.delete(section.attribute('id'));
            section.remove();
        });
    }
}

dialog.minimize = (section) => {
    const minimize = section.select('.minimize');
    if(minimize){
        minimize.on('click', (event) => {
            section.addClass('display-none');
        });
    }
}

dialog.index = (section) => {
    const nodeList = select('.dialog');
    let index = 0;
    let zIndex;
    let maxZIndex = 0;
    if(is.nodeList(nodeList)){
        for(index=0; index < nodeList.length; index++){
            let node = nodeList[index];
            node.removeClass('dialog-active');
            zIndex = parseInt(node.css('z-index'));
            if(
                !zIndex ||
                zIndex === NaN
            ){
                zIndex = index + 1;
                node.css('z-index', zIndex);
            }
            if(zIndex > maxZIndex){
                maxZIndex = zIndex;
            }
        }
    }
    if(section){
        let node = section.select('.dialog');
        node.css('z-index', ++maxZIndex);
        node.addClass('dialog-active');
        node = section.select('.context-menu');
        if(node) {
            node.css('z-index', ++maxZIndex);
        }
    }
}

dialog.bind = (section) => {
    const id = section.attribute('id');
    if(is.empty(id)){
        console.warn('section (' + section.attribute('name') + ') needs an id');
        return;
    }
    let node;
    let nodeList = section.select('.dialog');
    if(is.nodeList(nodeList)){
        node = nodeList[nodeList.length];
    } else {
        node = nodeList;
    }
    const head = section.select('.head');
    if(
        id &&
        head &&
        node
    ){
        _(id).drag(head, node, (event) => {
            navigation.close();
            dialog.index(section);
        });
    }
}

dialog.body = (section) => {
    const body = section.select('.body');
    if(body){
        body.on('click', (event) => {
            const head = section.select('.head');
            if(head){
                head.trigger('mousedown');
            }
        });
    }
}

dialog.footer = (section) => {
    const footer = section.select('.footer');
    if(footer){
        footer.on('click', (event) => {
            const head = section.select('.head');
            if(head){
                head.trigger('mousedown');
            }
        });
    }
}

dialog.click = (section, target) => {
    const element = section.select(target);
    if(element){
        element.on('click', (event) => {
            const head = section.select('.head');
            if(head){
                head.trigger('mousedown');
            }
        });
    }
}

export { dialog }