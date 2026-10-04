let user = {};

user.init = (init) => {
    console.log('user init');
    user.data(init);
}

user.get = (attribute) => {
    return _('user').collection(attribute);
}

user.set = (attribute, value) => {
    _('user').collection(attribute, value);
}

user.data = (data) => {
    if(data){
        _('user').collection(data);
    } else {
        return _('user').collection();
    }
}

user.url = {
    login : (url) => {
        if(url){
            user.set('frontend.url.login', url);
        }
        return user.get('frontend.url.login');
    },
    refresh : (url) => {
        if(url){
            user.set('backend.url.refresh', url);
        }
        return user.get('backend.url.refresh');
    },
    current : (url) => {
        if(url){
            user.set('backend.url.current', url);
        }
        return user.get('backend.url.current');
    }
}

user.refreshToken = (refreshToken) => {
    if(refreshToken){
        localStorage.setItem('refreshToken', refreshToken);
    } else {
        return localStorage.getItem('refreshToken')
    }
}

user.token = (token) => {
    if(token){
        localStorage.setItem('token', token);
    } else {
        return localStorage.getItem('token')
    }
}

user.getActive = () => {
    let data = user.data();
    if(data?.uuid){
        return data;
    }
    return null;
}

user.authorization = (closure) => {
    console.log('user.authorization');
    const url = user.url.refresh();
    if(is.empty(url)){
        return;
    }
    const refreshToken = user.refreshToken();
    if(is.empty(refreshToken)){
        return;
    }
    header("Authorization", 'Bearer ' + refreshToken);
    request(url, null, (url, response) => {
        const login_url = user.url.login();
        if(
            response?.class &&
            login_url
        ) {
            redirect(login_url);
        } else {
            if(closure){
                closure(url, response);
            }
        }
    });
}

export default user;