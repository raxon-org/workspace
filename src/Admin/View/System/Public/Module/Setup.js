import user from "/Module/User.js";
import { getSectionByName} from "/Module/Section.js";

let setup = {};

setup.get = (attribute) => {
    return _('setup').collection(attribute);
}

setup.has = (attribute) => {
    return _('setup').collection('has', attribute);
}

setup.set = (attribute, value) => {
    _('setup').collection(attribute, value);
}

setup.url = (url) => {
    if(url){
        setup.set('url', url);
    }
    return setup.get('url');
}

setup.data = (data) => {
    if(data){
        _('setup').collection(data);
    } else {
        return _('setup').collection();
    }
}

setup.show = () => {
    let section = getSectionByName('system-setup');
    section.css('delete', 'display');
    section.attribute('delete', 'style');
}

setup.focus = () => {
    const email = select('input[name="email"]');
    if(email){
        email.focus();
    }
}

setup.loader = (type) => {
    switch (type){
        case 'start' :
            const submit = select('button[type="submit"]');
            if(submit){
                submit.html(submit.html() + '<i class="fas fa-spinner fa-spin"></i>');
            }
            break;
        case 'end' :
            const load = select('button[type="submit"] i');
            if(load){
                load.remove();
            }
            break;
    }
}

setup.form = () => {
    const form = select('form[name="system_setup"]');
    if(form) {
        form.on('submit', (event) => {
            event.preventDefault();
            setup.post(event);
        });
    }
}

setup.post = (event) => {
    const form = event.target.closest('form');
    const data = form.data('serialize');
    //loading
    setup.loader('start');
    form.request(data, null, (url, response) => {
        //end loading
        setup.loader('end');
        console.log(response);
        if(
            !is.empty(response.class) &&
            response.class === 'Raxon\\Exception\\ErrorException'
        ){
            const error = form.select('.system-setup-error');
            if(error){
                error.html(response.message);
            }
        }
        else if(!is.empty(response.node)){
            const error = form.select('.user-login-error');
            if(error){
                error.html('');
            }
            const route = setup.get('route.frontend.start');
            console.log(route);
            localStorage.setItem('token', response.node?.token);
            localStorage.setItem('refreshToken', response.node?.refreshToken);
            const node = response.node;
            delete node.token;
            delete node.refreshToken;
            setup.data(node);
            if(route){
                window.history.pushState(route, route, route);
                request(route, response);
            }
        }

    });
}

setup.init = (data) => {
    setup.show();
    setup.data(data);
    setup.form();
    setup.forgot();
    setup.focus();
}

export default setup;