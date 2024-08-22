import config from "./config";
import { home } from "./pages/home";
import { host } from "./pages/host";
import { fallback } from "./pages/fallback";
import { list } from "./pages/list";
import * as utils from './utils'

export function router() {
    let path = location.hash || '#/'
    path = path.replace('#', '');
    console.log(path);

    config.base.innerHTML = '';
    switch (path.split('/')[1]) {
        case '': {
            home();
            break;
        }
        case 'host': {
            host();
            break;
        }
        case 'list': {
            list();
            break;
        }
        default: {
            fallback();
            break;
        }
    }
    utils.resize();
}