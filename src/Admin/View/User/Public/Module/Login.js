import user from "/Module/User.js";
import { getSectionByName} from "/Module/Section.js";

let login = {};

login.get = (attribute) => {
    return _('login').collection(attribute);
}

login.has = (attribute) => {
    return _('login').collection('has', attribute);
}

login.set = (attribute, value) => {
    _('login').collection(attribute, value);
}

login.url = (url) => {
    if(url){
        login.set('url', url);
    }
    return login.get('url');
}

login.data = (data) => {
    if(data){
        _('login').collection(data);
    } else {
        return _('login').collection();
    }
}

login.show = () => {
    let section = getSectionByName('user-login');
    section.css('delete', 'display');
    section.attribute('delete', 'style');
}

login.forgot = () => {
    const forgot = select('button.password-forgot');
    if(forgot){
        forgot.on('click', function(event){
            forgot.request();
        });
    }
}

login.focus = () => {
    const email = select('input[name="email"]');
    if(email){
        email.focus();
    }
}

login.loader = (type) => {
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

login.form = () => {
    const form = select('form[name="user_login"]');
    if(form) {
        form.on('submit', (event) => {
            event.preventDefault();
            login.post(event);
        });
    }
}

login.post = (event) => {
    const form = event.target.closest('form');
    const data = form.data('serialize');
    //loading
    login.loader('start');
    form.request(data, null, (url, response) => {
        //end loading
        login.loader('end');
        console.log(response);
        if(
            !is.empty(response.class) &&
            response.class === 'Raxon\\Exception\\ErrorException'
        ){
            if(!is.empty(response.code)){
                const code = response.code;
                switch(code){
                    case 400 :
                        const route_blocked = login.get('route.frontend.blocked');
                        if(route_blocked){
                            setTimeout(function(){
                                request(route_blocked);
                            }, 1000);
                        }
                        break;
                }
            }
            const error = form.select('.user-login-error');
            if(error){
                error.html(response.message);
            }
        }
        else if(!is.empty(response.node)){
            const error = form.select('.user-login-error');
            if(error){
                error.html('');
            }
            const route = login.get('route.frontend.start');
            console.log(route);
            localStorage.setItem('token', response.node?.token);
            localStorage.setItem('refreshToken', response.node?.refreshToken);
            const node = response.node;
            delete node.token;
            delete node.refreshToken;
            user.data(node);
            if(route){
                window.history.pushState(route, route, route);
                request(route, response);
            }
        }

    });
}

login.init = (data) => {
    login.show();
    login.data(data);
    login.form();
    login.forgot();
    login.focus();
}

export default login;