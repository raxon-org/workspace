import create from "/Module/Create.js";
import user from "/Module/User.js";
import { object } from "/Module/Object.js";

let application = {};

application.data = {
    data : {
    },
    set : (attribute, value) => {
        object.set(attribute, value, application.data.data);
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
        return object.get(attribute, application.data.data);
    },
    has : (attribute) => {
        return object.has(attribute, application.data.data);
    },
    delete : (attribute) => {
        return object.delete(attribute, application.data.data);
    }
};

application.init = (init) => {
    console.log('application init');



    let page = 1;
    let limit = 1;
    let url = init.url;
    let filter_name = 'Navigation';
    let request_url = url +
        '?page=' +
        page +
        '&limit=' +
        limit +
        '&filter[name]=' +
        filter_name +
        '&parse=true';
    header('Authorization', 'Bearer ' + user.token());
    request(request_url,
        null,
        (url, response) => {
            console.log(response);
            if(
                response?.list &&
                !is.empty(response.list[0])
            ){
                application.data.set(filter_name, response.list[0]);
            }
        }
    );
    /*


    let page = 1;
    let limit = 4096;
    let filter_url = 'admin.workandtravel.world/application/navigation';
    header('Authorization', 'Bearer ' + user.token());
    request(
        'https://api.workandtravel.local/Node/Keyboard?page=' +
        page +
        '&limit=' +
        limit +
        '&filter[url]=' +
        filter_url +
        '&sort[url]=ASC' +
        '&sort[command]=ASC',
        null,
        (url, response) => {
            console.log(response);
            if(
                response?.list
            ){
                for(let i = 0; i < response.list.length; i++){
                    keyboard.data.set(response.list[i].url + ':' + response.list[i].command, response.list[i]);
                    console.log(keyboard);
                }
                console.log(response);
                console.log(keyboard.data.data);
            }
        }
    );
    document.removeEventListener('keydown', (event) => {keyboard.down(event, input)});
    document.addEventListener('keydown', (event) => {keyboard.down(event, input)});
    */

    /*
    document.addEventListener('keydown', (event) => {
        let command;
        switch(event.key){
            case 'Enter':
                break;
            case 'Control':
                break;
            case 'Shift':
                break;
            case 'Alt':
                break;
            case 'Tab':
                break;
            case 'CapsLock':
                break;
            case 'Escape':
                break;
            case 'ArrowLeft':
                break;
            case 'ArrowRight':
                break;
            case 'ArrowUp':
                break;
            case 'ArrowDown':
                break;
            case 'Delete':
                break;
            case 'Insert':
                break;
            case 'Home':
                break;
            case 'End':
                break;
            case 'PageUp':
                break;
            case 'PageDown':
                break;
            case 'F1':
                break;
            case 'F2':
                break;
            case 'F3':
                break;
            case 'F4':
                break;
            case 'F5':
                break;
            case 'F6':
                break;
            case 'F7':
                break;
            case 'F8':
                break;
            case 'F9':
                break;
            case 'F10':
                break;
            case 'F11':
                break;
            case 'F12':
                break;
            case 'PrintScreen':
                break;
            case 'ScrollLock':
                break;
            case 'Pause':
                break;
            case 'OS':
                break;
            case 'ContextMenu':
                break;
            case 'Meta':
                event.preventDefault();
                if(event.ctrlKey){
                    //menu
                    let start = select('section[name="navigation"] img.start');
                    if(start){
                        start.click();
                    }
                }
                break;
            case 'Clear':
                break;
            case 'NumLock':
                break;
            case 'Backspace':
                input.value = input.value.slice(0, -1);
                break;
            default:
                if(event.ctrlKey && event.shiftKey){
                    event.preventDefault();
                    command = 'ctrl+shift+' + event.key;
                }
                else if(event.ctrlKey && event.altKey){
                    event.preventDefault();
                    command = 'ctrl+alt+' + event.key;
                }
                else if(event.ctrlKey){
                    event.preventDefault();
                    command = 'ctrl+' + event.key;
                }
                else if(event.shiftKey && event.altKey){
                    event.preventDefault();
                    command = 'shift+alt+' + event.key;
                }
                else if(event.shiftKey){
                    event.preventDefault();
                    command = 'shift+' + event.key;
                }
                else if(event.altKey){
                    event.preventDefault();
                    command = 'alt+' + event.key;
                } else {
                    input.value += event.key;
                }
                break;
        }
        console.log(command);
        console.log(event);
    });
     */
};

/*
ready(() => {
    keyboard.init();
});
 */

export { application };