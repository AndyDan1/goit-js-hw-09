!function(){var t,e=document.querySelectorAll("button");function n(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),e[0].disabled=!0,e[1].disabled=!1}e[1].disabled=!0,e[0].addEventListener("click",(function(e){t=setInterval(n,500),n()})),e[1].addEventListener("click",(function(n){clearInterval(t),e[0].disabled=!1,e[1].disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.ceab4543.js.map