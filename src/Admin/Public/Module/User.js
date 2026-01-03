let user = {};

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

user.loginUrl = (url) => {
    if(url){
        user.set('login.url', url);
    }
    return user.get('login.url');
}

user.refreshUrl = (url) => {
    if(url){
        user.set('refresh.url', url);
    }
    return user.get('refresh.url');
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

user.authorization = (closure) => {
    const url = user.refreshUrl();
    if(is.empty(url)){
        return;
    }
    const refreshToken = user.refreshToken();
    if(is.empty(refreshToken)){
        return;
    }
    header("Authorization", 'Bearer ' + refreshToken);
    request(url, null, (url, response) => {
        const login_url = user.loginUrl();
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