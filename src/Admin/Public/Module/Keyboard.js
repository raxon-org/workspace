import create from "/Module/Create.js";
import user from "/Module/User.js";
import { object } from "/Module/Object.js";
import { application } from "/Module/Application.js";

let keyboard = {};

keyboard.data = {
    data : {
    },
    set : (attribute, value) => {
        object.set(attribute, value, keyboard.data.data);
        /*
        if(typeof attribute === 'object'){
            for(let attr in attribute){
                object.set(attr, attribute[attr], keyboard.data.data);
            }
        } else {

        }
         */
    },
    get : (attribute) => {
        return object.get(attribute, keyboard.data.data);
    },
    has : (attribute) => {
        return object.has(attribute, keyboard.data.data);
    },
    delete : (attribute) => {
        return object.delete(attribute, keyboard.data.data);
    }
};

keyboard.down = (event, input) => {
    let command = '';
    if(
        event.altKey &&
        event.ctrlKey &&
        event.meta &&
        event.shiftKey
    ){
        command = command + 'alt+ctrl+meta+shift+';
    }
    if(
        event.altKey &&
        event.ctrlKey &&
        event.meta
    ){
        command = command + 'alt+ctrl+meta+';
    }
    if(
        event.altKey &&
        event.ctrlKey &&
        event.shiftKey
    ){
        command = command + 'alt+ctrl+shift+';
    }
    if(
        event.altKey &&
        event.meta &&
        event.shiftKey
    ){
        command = command + 'alt+meta+shift+';
    }
    if(
        event.ctrlKey &&
        event.meta &&
        event.shiftKey
    ){
        command = command + 'ctrl+meta+shift+';
    }
    if(event.altKey && event.ctrlKey){
        command = command + 'alt+ctrl+';
    }
    if(event.altKey && event.meta){
        command = command + 'alt+meta+';
    }
    if(event.altKey && event.shiftKey){
        command = command + 'alt+shift+';
    }
    if(event.ctrlKey && event.meta){
        command = command + 'ctrl+meta+';
    }
    if(event.ctrlKey && event.shiftKey){
        command = command + 'ctrl+shift+';
    }
    if(event.meta && event.shiftKey){
        command = command + 'meta+shift+';
    }
    if(event.altKey){
        command = command + 'alt+';
    }
    if(event.ctrlKey){
        command = command + 'ctrl+';
    }
    if(event.meta){
        command = command + 'meta+';
    }
    if(event.shiftKey){
        command = command + 'shift+';
    }
    if(event.key.toLowerCase() === 'alt' && command !== 'alt+'){
        command = command + 'alt';
    }
    else if(event.key.toLowerCase() === 'control' && command !== 'ctrl+'){
        command = command + 'ctrl';
    }
    else if(event.key.toLowerCase() === 'meta' && command !== 'meta+'){
        command = command + 'meta';
    }
    else if(event.key.toLowerCase() === 'shift'  && command !== 'shift+'){
        command = command + 'shift';
    }
    else {
        if(event.key.toLowerCase() === 'control'){
            command = command + 'ctrl';
        } else {
            command = command + event.key.toLowerCase();
        }
    }
    let commands = command.split('+');
    let unique = [...new Set(commands)];
    let is_alt = false;
    let is_ctrl = false;
    let is_meta = false;
    let is_shift = false;
    let item = '';
    for(let i=0; i < unique.length; i++){
        let key = unique[i];
        if(key === 'alt'){
            is_alt = true;
        }
        else if(key === 'ctrl'){
            is_ctrl = true;
        }
        else if(key === 'meta'){
            is_meta = true;
        }
        else if(key === 'shift'){
            is_shift = true;
        } else {
            item = key;
            break;
        }
    }
    if(is_alt && is_ctrl && is_meta && is_shift){
        command = 'alt+ctrl+meta+shift+';
    }
    else if(is_alt && is_ctrl && is_meta){
        command = 'alt+ctrl+meta+';
    }
    else if(is_alt && is_meta && is_shift){
        command = 'alt+meta+shift+';
    }
    else if(is_alt && is_ctrl){
        command = 'alt+ctrl+';
    }
    else if(is_alt && is_meta){
        command = 'alt+meta+';
    }
    else if(is_alt && is_shift){
        command = 'alt+shift+';
    }
    else if(is_alt){
        command = 'alt+';
    }
    else if(is_ctrl && is_meta && is_shift){
        command = 'ctrl+meta+shift+';
    }
    else if(is_ctrl && is_meta){
        command = 'ctrl+meta+';
    }
    else if(is_ctrl && is_shift){
        command = 'ctrl+shift+';
    }
    else if(is_ctrl){
        command = 'ctrl+';
    }
    else if(is_meta && is_shift){
        command = 'meta+shift+';
    }
    else if(is_meta){
        command = 'meta+';
    }
    else if(is_shift){
        command = 'shift+';
    }
    if(item){
        if(command !== item){
            command = command + item;
        }
    } else {
        command = command.substring(0, command.length -1);
    }
    switch(command){
        case 'f12':
        case 'f5':
            //leave those function keys intact
            break;
        default:
            break;
    }
    /*
    let active = 'Navigation';
    let app = application.data.get(active);
    if(is.array(app.keyboard)){
        let index;
        for(index=0; index < app.keyboard.length; index++){
            let item = app.keyboard[index];
            if(item?.command === command){
                if(item && is.array(item?.function)){
                    let i;
                    for(i=0; i < item.function.length; i++){
                        let func = item.function[i];
                        console.log(func);
                        navigation.active();
                    }
                }
                break;
            }
        }
    }
     */
    let active = 'Navigation';
    let previous = keyboard.data.get('previous') ?? [];
    let previous_command = keyboard.data.get('command');
    if(previous_command){
        previous.push(previous_command);
    }
    keyboard.data.set('command', command);
    keyboard.data.set('previous', previous);
    let app = application.data.get(active);
    if(
        !is.empty(app) &&
        is.array(app.keyboard)
    ){
        let index;
        for(index=0; index < app.keyboard.length; index++){
            let item = app.keyboard[index];
            if(item?.command === command){
                if(item && is.array(item?.function)){
                    event.preventDefault();
                    let i;
                    let name;
                    for(i=0; i < item.function.length; i++) {
                        console.log(item.function[i]);
                        let func = trim(item.function[i],';');
                        let split = func.split('(');
                        if(split.length === 2){
                            let funcs = split[0].split('.');
                            if(funcs.length === 3){
                                name = funcs[0];
                                func = funcs[1] + '.' + funcs[2];
                            }
                            else if(funcs.length === 2) {
                                name = funcs[0];
                                func = funcs[1];
                            } else {
                                console.warn('Not implemented...');
                                return;
                            }
                            let method = keyboard.data.get('object.' + name);
                            let argument = split[1].substring(0, split[1].length -1);
                            let args = [];
                            let y;
                            let is_single_quoted = false;
                            let is_double_quoted = false;
                            let curly_brace = 0;
                            let square_brace = 0;
                            let prev = false;
                            for(y=0; y < argument.length; y++){
                                let char = argument[y];
                                if(y > 0){
                                    prev = argument[y-1];
                                }
                                if(
                                    char === '"' &&
                                    is_double_quoted === false &&
                                    prev !== '\\' &&
                                    curly_brace === 0 &&
                                    square_brace === 0
                                ){
                                    is_double_quoted = true;
                                }
                                else if(
                                    char === '"' &&
                                    is_double_quoted === true &&
                                    prev !== '\\' &&
                                    curly_brace === 0 &&
                                    square_brace === 0
                                ){
                                    is_double_quoted = false;
                                }
                                if(
                                    char === '\'' &&
                                    is_single_quoted === false &&
                                    prev !== '\\' &&
                                    curly_brace === 0 &&
                                    square_brace === 0
                                ){
                                    is_single_quoted = true;
                                }
                                else if(
                                    char === '\'' &&
                                    is_single_quoted === true &&
                                    prev !== '\\' &&
                                    curly_brace === 0 &&
                                    square_brace === 0
                                ){
                                    is_single_quoted = false;
                                }
                                if(
                                    is_single_quoted === false &&
                                    is_double_quoted === false &&
                                    char === '{'
                                ){
                                    curly_brace++;
                                }
                                else if(
                                    is_single_quoted === false &&
                                    is_double_quoted === false &&
                                    char === '}'
                                ){
                                    curly_brace--;
                                }
                                else if(
                                    is_single_quoted === false &&
                                    is_double_quoted === false &&
                                    char === '['
                                ){
                                    square_brace++;
                                }
                                else if(
                                    is_single_quoted === false &&
                                    is_double_quoted === false &&
                                    char === ']'
                                ){
                                    square_brace--;
                                }
                                else if(
                                    is_single_quoted === false &&
                                    is_double_quoted === false &&
                                    char === ',' &&
                                    curly_brace === 0 &&
                                    square_brace === 0
                                ){
                                    args.push(argument.substring(0, y));
                                    argument = argument.substring(y+1);
                                    y = 0;
                                }
                            }
                            if(y>0){
                                args.push(argument);
                            }
                            method[func](...args);
                        }
                    }
                }
                break;
            }
        }
    }
}

keyboard.init = (objects) => {
    console.log('keyboard init');

    let section = select('section[name="keyboard"]');
    if (!section) {
        section = create('section');
        section.attribute('name', 'keyboard');
        let body = select('body');
        body.append(section);
    }
    let input = section.select('#keyboard');
    if (!input) {
        // <input type="text" name="keyboard" id="keyboard" value="" readOnly/>
        input = create('input');
        input.attribute('type', 'text');
        input.attribute('name', 'keyboard');
        input.attribute('id', 'keyboard');
        input.attribute('value', '');
        input.attribute('readOnly', true);
        section.append(input);
    }
    keyboard.data.set('object', objects);
    document.removeEventListener('keydown', (event) => {
        keyboard.down(event, input)
    });
    document.addEventListener('keydown', (event) => {
        keyboard.down(event, input)
    });
    console.log(objects);
}

export { keyboard };