"use strict"
import { router } from "./router";
import URL from "url-polyfill";
if (!window.URL) {
    window.URL = URL;
}

require("./style.css");

router();
window.addEventListener('hashchange', () => {
    router();
})

console.log(`%c⚠ 警告`, 'color: #ffff93; font-size: xx-large; font-family: MiSans, Arial, Helvetica, sans-serif; background-color: #840D23;padding:1rem;border-radius:.8rem;');
console.log(`%c使用此控制台可能会给攻击者可乘之机，让其利用 Self-XSS（自跨站脚本）攻击来冒充您并窃取您的信息。请勿输入或粘贴来历不明的代码。\n要了解更多信息，可参考：https://zh.wikipedia.org/wiki/Self-XSS`, 'color: #fff; font-size: large; font-family: MiSans, Arial, Helvetica, sans-serif; background-color: #4a4a4a;padding:.7rem;border-radius:.4rem;margin:0.4rem 0;');