_('dialog').run = (id) => {
    const section = _('dialog').getSection(id);
    section.removeClass('display-none');
    _('dialog').close(section);
    _('dialog').minimize(section);
    _('dialog').bind(section);
    _('dialog').index(section);
    _('dialog').body(section);
    _('dialog').footer(section);
}

_('dialog').element = (type, id) => {
    let name;
    let section;
    let menu;
    switch(type){
        case 'section' :
            name = _('dialog').collection('section.name');
            section = select('section[name="' + name + '"]');
            if (section) {
                return section;
            }
            break;
        case 'menu' :
            section = _('dialog').getSection(id);
            if(!section){
                return;
            }
            menu = section.select('.menu');
            if(menu){
                return menu;
            }
            break;
        default :
            console.warn('dialog element (' + type + ') undefined...');
    }
}

_('dialog').getSection = (id) => {
    let section = _('dialog').element('section');
    if(!section){
        return;
    }
    if(is.nodeList(section)) {
        if (id) {
            section = _('dialog').select(section, id);
            if (!section) {
                return;
            }
        }
    }
    return section;
}

_('dialog').select = (nodeList, id) => {
    let index;
    for(index=0; index < nodeList.length; index++){
        let node = nodeList[index];
        if(typeof node.attribute === 'function'){
            if(node.attribute('id') === id){
                return node;
            }
        }
    }
}

_('dialog').bind = (section) => {
    const id = section.attribute('id');
    if(is.empty(id)){
        console.warn('section (' + section.attribute('name') + ') needs an id');
        return;
    }
    let dialog = section.select('.dialog');
    if(is.nodeList(dialog)){
        dialog = dialog[dialog.length];
    }
    const head = section.select('.head');
    if(
        id &&
        head &&
        dialog
    ){
        _(id).drag(head, dialog, (event) => {
            if(typeof _('navigation').close === 'function'){
                _('navigation').close();
            }
            _('dialog').index(section);
        });
    }
}

_('dialog').index = (section) => {
    const dialog = select('.dialog');
    let index = 0;
    let zIndex;
    let maxZIndex = 0;
    if(is.nodeList(dialog)){
        for(index=0; index < dialog.length; index++){
            let node = dialog[index];
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
    }
}

_('dialog').close = (section) => {
    const close = section.select('.close');
    if(close){
        close.on('click', (event) => {
            if(typeof _('task.bar').delete === 'function'){
                _('task.bar').delete(section.attribute('id'));
            }
            section.remove();
        });
    }
}

_('dialog').minimize = (section) => {
    const minimize = section.select('.minimize');
    if(minimize){
        minimize.on('click', (event) => {
            section.addClass('display-none');
        });
    }
}

_('dialog').click = (section, target) => {
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

_('dialog').body = (section) => {
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

_('dialog').footer = (section) => {
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


