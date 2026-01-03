//{{RAX}}
import user from "/Module/User.js";
import { getSectionByName} from "/Module/Section.js";
import { version } from "/Module/Priya.js";
import { root } from "/Module/Web.js";

let main = {};

main.init = () => {
    const route = "{{route.get('index-main')}}";
    window.history.pushState(route, route, route);

    const user_login = getSectionByName("user-login");
    if(user_login){
        user_login.remove();
    }
};

ready(() => {
    require(
        [
            root() + 'Dialog/Css/Dialog.css?' + version(),
            root() + 'Dialog/Css/Dialog.Debug.css?' + version(),
            root() + 'Index/Css/Main.css?' + version()
        ],
        () => {
            main.init();
        });
});
