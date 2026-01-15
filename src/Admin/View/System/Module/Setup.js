//{{RAX}}

import setup from "/System/Module/Setup.js";
import { version } from "/Module/Priya.js";
import { root } from "/Module/Web.js";
ready(() => {
    require(
    [
    root() + 'System/Css/Setup.css?' + version(),
    root() + 'Application/Desktop/Css/Desktop.css?' + version(),
    ],
    () => {
        setup.url("{{route.get('system-setup')}}");
        setup.init({
            "route" : {
                "frontend" : {
                    "start" : "{{route.get('index')}}"
                }
            }
        });
    });
});
