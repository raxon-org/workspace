//{{RAX}}

import login from "/User/Module/Login.js";
import { version } from "/Module/Priya.js";
import { root } from "/Module/Web.js";
ready(() => {
    require(
    [
    root() + 'User/Css/Login.css?' + version(),
    root() + 'User/Css/Password.Forgot.css?' + version(),
    root() + 'Index/Css/Main.css?' + version(),
    ],
    () => {
        console.log("{{route.prefix()}}-user-login")
        console.log("{{route.get('user-login')}}");
        login.url("{{route.get('user-login')}}");
        login.init({
            "route" : {
                "frontend" : {
                    "blocked" : "{{route.get('user-login-blocked')}}",
                    "start" : "{{route.get('index')}}"
                }
            }
        });
    });
});
