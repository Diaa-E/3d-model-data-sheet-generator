(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var s=e.g.document;if(!t&&s&&(s.currentScript&&(t=s.currentScript.src),!t)){var n=s.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSI0OCIKICAgd2lkdGg9IjQ4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc0IgogICBzb2RpcG9kaTpkb2NuYW1lPSJhZGQuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoYjBhODQ4NjU0MSwgMjAyMi0xMi0wMSkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczgiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjE2LjE2NjY2NyIKICAgICBpbmtzY2FwZTpjeD0iMTkuNzYyODg3IgogICAgIGlua3NjYXBlOmN5PSIyNCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iOTc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii0xMSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQiIC8+CiAgPHBhdGgKICAgICBkPSJNMjIuNSAzOFYyNS41SDEwdi0zaDEyLjVWMTBoM3YxMi41SDM4djNIMjUuNVYzOFoiCiAgICAgaWQ9InBhdGgyIgogICAgIHN0eWxlPSJmaWxsOiMwMGFkYjU7ZmlsbC1vcGFjaXR5OjEiIC8+Cjwvc3ZnPgo=",s="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSIzNiIKICAgd2lkdGg9IjMyIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc0IgogICBzb2RpcG9kaTpkb2NuYW1lPSJkZWxldGUuc3ZnIgogICBpbmtzY2FwZTpleHBvcnQtZmlsZW5hbWU9ImRlbGV0ZS5zdmciCiAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSI5NiIKICAgaW5rc2NhcGU6ZXhwb3J0LXlkcGk9Ijk2IgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3NSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIgLz4KICA8ZGVmcwogICAgIGlkPSJkZWZzOCIgLz4KICA8cGF0aAogICAgIGQ9Im0gOS4yMDU5NzQ3LDI5LjA4NTkyNyBxIC0wLjc3NTU3MzcsMCAtMS4zMTg0NzUzLC0wLjUzNDU0OCBRIDcuMzQ0NTk3OCwyOC4wMTY4MyA3LjM0NDU5NzgsMjcuMjUzMTg4IFYgOS44NDIxNTUgSCA2LjA3MjY1NyBWIDguMDA5NDE1MyBoIDUuODMyMzE0IFYgNy4wOTMwNDUxIGggOC4xOTAwNTggdiAwLjkxNjM3MDIgaCA1LjgzMjMxNCBWIDkuODQyMTU1IGggLTEuMjcxOTQxIHYgMTcuNDExMDMzIHEgMCwwLjczMzA5NiAtMC41NTg0MTIsMS4yODI5MTkgLTAuNTU4NDE0LDAuNTQ5ODIgLTEuMzAyOTY0LDAuNTQ5ODIgeiBNIDIyLjc5NDAyNiw5Ljg0MjE1NSBIIDkuMjA1OTc0NyBWIDI3LjI1MzE4OCBIIDIyLjc5NDAyNiBaIG0gLTEwLjI5OTYyLDE0Ljc4NDEwNyBoIDEuODYxMzc4IFYgMTIuNDM4NTM3IGggLTEuODYxMzc4IHogbSA1LjE0OTgxLDAgaCAxLjg2MTM3OCBWIDEyLjQzODUzNyBIIDE3LjY0NDIxNiBaIE0gOS4yMDU5NzQ3LDkuODQyMTU1IHYgMTcuNDExMDMzIHoiCiAgICAgaWQ9InBhdGgyIgogICAgIHN0eWxlPSJmaWxsOiNmNTQ3NDg7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNjE1NjY4IiAvPgo8L3N2Zz4K",n="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSI0OCIKICAgd2lkdGg9IjQ4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc0IgogICBzb2RpcG9kaTpkb2NuYW1lPSJib2x0LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKGIwYTg0ODY1NDEsIDIwMjItMTItMDEpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3NiIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxNi4xNjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjE1LjkyNzgzNSIKICAgICBpbmtzY2FwZTpjeT0iMjQiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk3NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc0IiAvPgogIDxwYXRoCiAgICAgZD0iTSAyMC4yNDYwNTYsNDAuNjk5MyAyMi4xNDc5MiwyNy42MTgxODIgaCAtNi43NzI0OTQgcSAtMC41MTAyNTYsMCAtMC43NDIxOTEsLTAuNDYzODcgLTAuMjMxOTM0LC0wLjQ2Mzg2OSAwLC0wLjg4MTM1MiBMIDI1Ljk5ODAzNyw3LjMwMDcwMDMgaCAxLjkwMTg2NCBMIDI1Ljk5ODAzNywyMC4zMzU0MzEgaCA2LjY3OTcxOSBxIDAuNTEwMjU3LDAgMC43NjUzODUsMC40NjM4NyAwLjI1NTEyOCwwLjQ2Mzg2OSAwLjAyMzE5LDAuODgxMzUyIEwgMjIuMTQ3OTIsNDAuNjk5MyBaIgogICAgIGlkPSJwYXRoMiIKICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuOTI3NzM5O2ZpbGw6I2ZmYzYwMDtmaWxsLW9wYWNpdHk6MSIgLz4KPC9zdmc+Cg==",o="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSI0OCIKICAgd2lkdGg9IjQ4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc0IgogICBzb2RpcG9kaTpkb2NuYW1lPSJjb3B5LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKGIwYTg0ODY1NDEsIDIwMjItMTItMDEpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3NiIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIxNi4xNjY2NjciCiAgICAgaW5rc2NhcGU6Y3g9IjE5LjgyNDc0MiIKICAgICBpbmtzY2FwZTpjeT0iMjQiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk3NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc0IiAvPgogIDxwYXRoCiAgICAgZD0ibSAxMy42MzU1MzcsMzcuMzI3ODA1IHEgLTAuODAyNjY5LDAgLTEuNDA0NjcsLTAuNjAyMDAxIC0wLjYwMjAwMSwtMC42MDIwMDIgLTAuNjAyMDAxLC0xLjQwNDY3IFYgMTUuMTU0MDkzIGggMi4wMDY2NzEgdiAyMC4xNjcwNDEgaCAxNS44NTI2OTggdiAyLjAwNjY3MSB6IG0gNC4wMTMzNDEsLTQuMDEzMzQyIHEgLTAuODAyNjY4LDAgLTEuNDA0NjY5LC0wLjYwMjAwMSAtMC42MDIwMDIsLTAuNjAyMDAxIC0wLjYwMjAwMiwtMS40MDQ2NjkgViAxMi41Nzg4NjYgcSAwLC0wLjgwMjY2OCAwLjYwMjAwMiwtMS40MDQ2NyAwLjYwMjAwMSwtMC42MDIwMDEgMS40MDQ2NjksLTAuNjAyMDAxIGggMTQuNzE1NTg1IHEgMC44MDI2NjksMCAxLjQwNDY3LDAuNjAyMDAxIDAuNjAyMDAxLDAuNjAyMDAyIDAuNjAyMDAxLDEuNDA0NjcgdiAxOC43Mjg5MjcgcSAwLDAuODAyNjY4IC0wLjYwMjAwMSwxLjQwNDY2OSAtMC42MDIwMDEsMC42MDIwMDEgLTEuNDA0NjcsMC42MDIwMDEgeiBtIDAsLTIuMDA2NjcgSCAzMi4zNjQ0NjMgViAxMi41Nzg4NjYgSCAxNy42NDg4NzggWiBtIDAsMCBWIDEyLjU3ODg2NiBaIgogICAgIGlkPSJwYXRoMiIKICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuNjY4ODk7ZmlsbDojMDBhZGI1O2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K",c=e.p+"b38401d6db24a40a4921.svg",l={addClasses:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(0===t.length)return;t.forEach((function(t){e.classList.add(t)}))},removeClasses:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(0===t.length)return;t.forEach((function(t){e.classList.remove(t)}))}};function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function i(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);"Object"===s&&e.constructor&&(s=e.constructor.name);if("Map"===s||"Set"===s)return Array.from(e);if("Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,n=new Array(t);s<t;s++)n[s]=e[s];return n}function d(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function g(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?d(Object(s),!0).forEach((function(t){u(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):d(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function u(e,t,s){return(t=function(e){var t=function(e,t){if("object"!==a(e)||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var n=s.call(e,t||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===a(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function I(e){e=g({id:"",for:"",text:"Default text",classes:[]},e);var t=document.createElement("label");return t.textContent=e.text,t.setAttribute("for",e.for),t.id=e.id,l.addClasses(t,e.classes),t}function C(e){e=g({id:"",name:"",cols:30,rows:10,placeholder:"Write text",classes:[],required:!1},e);var t=document.createElement("textarea");return t.id=e.id,t.name=e.name,t.cols=e.cols,t.rows=e.rows,t.placeholder=e.placeholder,t.required=e.required,l.addClasses(t,e.classes),{element:t,getContent:function(){return t.value}}}function m(e){e=g({icon:t,btnClasses:[],iconClasses:[],type:"button",id:"",clickFunction:function(){}},e);var s=document.createElement("button");s.type=e.type,s.id=e.id,l.addClasses(s,e.btnClasses);var n=new Image;return n.src=e.icon,l.addClasses(n,e.iconClasses),s.addEventListener("click",(function(t){e.clickFunction(t)})),s.append(n),s}function p(e){e=g({min:"",max:"",classes:[],id:"",name:"",placeholder:"",required:!1,errorMsg:"Invalid Input"},e);var t=document.createElement("input");return t.type="number",t.name=e.name,""!==e.min&&(t.min=e.min),""!==e.max&&(t.max=e.max),t.id=e.id,t.required=e.required,t.placeholder=e.placeholder,l.addClasses(t,e.classes),{element:t,getContent:function(){return t.value},isValid:function(){return t.checkValidity()},getError:function(){return e.errorMsg},clearContent:function(){t.value=""}}}function b(e){e=g({minLength:"",maxLength:"",classes:[],id:"",name:"",placeholder:"",required:!1,errorMsg:"Invalid Input"},e);var t=document.createElement("input");return t.name=e.name,t.id=e.id,""!==e.maxLength&&(t.maxLength=e.maxLength),""!==e.minLength&&(t.minLength=e.minLength),t.placeholder=e.placeholder,t.required=e.required,l.addClasses(t,e.classes),{element:t,getContent:function(){return t.value},isValid:function(){return t.checkValidity()},getError:function(){return e.errorMsg},clearContent:function(){t.value=""}}}function h(e){e=g({id:"",classes:[],children:[]},e);var t=document.createElement("div");return t.id=e.id,l.addClasses(t,e.classes),e.children.length>0&&e.children.forEach((function(e){t.append(e)})),t}function A(e){e=g({id:"",classes:[],text:"Default text"},e);var t=document.createElement("p");return t.id=e.id,t.textContent=e.text,l.addClasses(t,e.classes),t}function M(e){e=g({classes:[],type:"button",text:"click here",id:"",clickFunction:function(){}},e);var t=document.createElement("button");return t.textContent=e.text,t.id=e.id,l.addClasses(t,e.classes),t.addEventListener("click",(function(t){t.preventDefault(),e.clickFunction(t)})),t}function y(e){e=g({lblText:"Default text",id:"",Classes:[],choiceClasses:[],labelClasses:[],choices:["Default option 1","Default option 2"],selectedClasses:[],minChoices:0,optionClasses:[]},e);for(var t=[],s=0;s<e.choices.length;s++)t.push(M({text:e.choices[s],classes:i(e.optionClasses),clickFunction:c})),s<e.minChoices&&l.addClasses(t[s],e.selectedClasses);var n=h({id:"".concat(e.id,"Choices"),classes:e.choiceClasses,children:[].concat(t)}),o=I({text:e.lblText,classes:e.labelClasses});function c(t){var s=t.target.parentNode.children;if(0===e.minChoices)a(t);else{for(var n=0,o=0;o<s.length;o++)s[o].classList.contains(e.selectedClasses[0])&&n++;t.target.classList.contains(e.selectedClasses[0])&&n===e.minChoices||a(t)}}function a(t){t.target.classList.contains(e.selectedClasses[0])?l.removeClasses(t.target,e.selectedClasses):l.addClasses(t.target,e.selectedClasses)}return{element:h({id:e.id,classes:e.classes,children:[o,n]}),getSelected:function(){for(var s=[],n=0;n<t.length;n++)t[n].classList.contains(e.selectedClasses[0])&&s.push(t[n].textContent);return s}}}function N(e){e=g({lblText:"Default text",id:"",Classes:[],choiceClasses:[],optionClasses:[],labelClasses:[],choices:["Default option 1","Default option 2"],selectedClasses:[],defaultChoice:0},e);for(var t=[],s=0;s<e.choices.length;s++)t.push(M({text:e.choices[s],classes:i(e.optionClasses),clickFunction:c})),s===e.defaultChoice&&l.addClasses(t[s],e.selectedClasses);var n=h({id:"".concat(e.id,"Choices"),classes:e.choiceClasses,children:[].concat(t)}),o=I({text:e.lblText,classes:e.labelClasses});function c(t){for(var s=t.target.parentNode.children,n=0;n<s.length;n++)l.removeClasses(s[n],e.selectedClasses);l.addClasses(t.target,e.selectedClasses)}return{element:h({id:e.id,classes:e.classes,children:[o,n]}),getSelected:function(){for(var s=0;s<t.length;s++)if(t[s].classList.contains(e.selectedClasses[0]))return t[s].textContent}}}function w(e){for(var t=e.target.parentNode,s=0;!t.classList.contains("option")&&s<10;)t=t.parentNode,s++;t.parentNode.removeChild(t)}function D(e,t,n){return h({id:n,classes:["option"],children:[A({text:e,classes:["item-name"]}),A({text:t,classes:["item-name","item-count"]}),m({icon:s,btnClasses:["button"],iconClasses:["button-icon"],clickFunction:w})]})}function j(e){var t=h({classes:["error"],id:e});return{element:t,showError:function(e){l.removeClasses(t,["info"]),t.textContent=e},clearError:function(){l.removeClasses(t,["info"]),t.textContent=""},showInfo:function(e){l.addClasses(t,["info"]),t.textContent=e}}}(function(){var e=function(){var e=new Image;e.src=c,l.addClasses(e,["logo"]);var t=document.createElement("h1");t.textContent="3D Model Datasheet Generator";var s=document.createElement("h2");return s.textContent="Your datasheet is only a few clicks away",{logo:e,header:t,slogan:s}}(),s=function(){var e=I({for:"details",text:"Model Description",classes:["label"]}),t=C({id:"details",placeholder:"Describe your model...",classes:["text-area"]});function s(){return{details:t.getContent()}}return{component:h({id:"modelDetails",classes:["card"],children:[e,t.element]}),getData:s}}(),a=function(){var e=I({text:"Model Contents",classes:["label"]}),s=I({text:"Item's Name",classes:["label-input"],for:"itemName"}),n=b({name:"itemName",id:"itemName",classes:["text-input"],placeholder:"Item's name",required:!0,errorMsg:"Any item must have a name"}),o=h({classes:["input-container"],children:[s,n.element]}),c=I({text:"Item's Count",classes:["label-input"],for:"itemCount"}),l=p({name:"itemCount",id:"itemCount",classes:["text-input"],min:"1",placeholder:"How many of it included",required:!0,errorMsg:"There has to be at least 1 of the item"}),a=h({classes:["input-container"],children:[c,l.element]}),i=m({icon:t,btnClasses:["button"],iconClasses:["button-icon"],clickFunction:u}),r=j("addItemError"),d=h({children:[o,a,i],classes:["option","add"]}),g=h({id:"modelContents",classes:["card"],children:[e,r.element,d]});function u(){n.isValid()?l.isValid()?(g.append(D(n.getContent(),"x ".concat(l.getContent()),"modelItem")),l.clearContent(),n.clearContent(),M()):A(l.getError()):A(n.getError())}function C(){var e=document.querySelectorAll("#modelContents>#modelItem"),t=[];return e.forEach((function(e){var s=e.querySelectorAll("p");t.push("".concat(s[1].textContent," ").concat(s[0].textContent))})),{items:t}}function A(e){r.showError(e)}function M(){r.clearError()}return{component:g,getData:C,showError:A,clearError:M}}(),i=function(){var e=I({text:"Mesh Details",classes:["label"]}),t=N({id:"meshType",lblText:"Mesh Type",choices:["Polygon Mesh","Triangulated Polygon Mesh","Quad Mesh"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),s=N({id:"polyTier",lblText:"Polycount Tier",choices:["Lowpoly","Highpoly"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),n=N({id:"gameready",lblText:"Model is game-ready",choices:["NO","YES"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),o=N({id:"subdivision",lblText:"Model is subdivision-ready",choices:["NO","YES"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),c=N({id:"edgeSplit",lblText:"Edge splits",choices:["Sharp edges only","All edges","Based on angle","None"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),l=N({id:"realWorldScale",lblText:"Model is scaled to real world dimensions",choices:["NO","YES"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),a=N({id:"rigged",lblText:"Model is rigged",choices:["NO","YES"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]});function i(){return{meshType:t.getSelected(),polyTier:s.getSelected(),gameReady:n.getSelected(),subdivision:o.getSelected(),edgeSplit:c.getSelected(),realWorldScale:l.getSelected(),rigged:a.getSelected()}}return{component:h({id:"meshDetails",classes:["card"],children:[e,t.element,s.element,n.element,o.element,c.element,l.element,a.element]}),getData:i}}(),r=function(){var e=I({text:"Poly Count",classes:["label"]}),t=I({text:"Number of Triangles",classes:["label-input"],for:"tris"}),s=p({name:"tris",id:"tris",classes:["text-input"],min:"1",placeholder:"How many triangles is your model?",required:!0,errorMsg:"Any model must consist of at least 1 polygon"});s.element.addEventListener("input",(function(){s.isValid()?g():d(s.getError())}));var n=h({classes:["input-container"],children:[t,s.element]}),o=I({text:"Number of vertices",classes:["label-input"],for:"verts"}),c=p({name:"verts",id:"verts",classes:["text-input"],min:"1",placeholder:"How many vertices is your model?",required:!0,errorMsg:"Any model must consist of at least 1 vertex"});c.element.addEventListener("input",(function(){c.isValid()?g():d(c.getError())}));var l=h({classes:["input-container"],children:[o,c.element]}),a=h({children:[n,l],classes:["option","add","no-button"]}),i=j("polycountError");function r(){return{tris:s.getContent(),verts:c.getContent()}}function d(e){i.showError(e)}function g(){i.clearError()}return{component:h({id:"polyCount",classes:["card"],children:[e,i.element,a]}),getData:r,showError:d,clearError:g}}(),d=function(){var e=I({text:"Materials",classes:["label"]}),s=I({text:"Texture set",classes:["label-input"],for:"materialName"}),n=b({name:"materialName",id:"materialName",classes:["text-input"],placeholder:"Texture set's name",required:!0,errorMsg:"Any texture set must have a name"}),o=h({classes:["input-container"],children:[s,n.element]}),c=I({text:"Texture Resolution",classes:["label-input"],for:"resolution"}),l=p({name:"resolution",id:"resolution",classes:["text-input"],min:"1",placeholder:"What are the texture's dimensions?",required:!0,errorMsg:"The texture must be at least 1 x 1 pixels"}),a=h({classes:["input-container"],children:[c,l.element]}),i=m({icon:t,btnClasses:["button"],iconClasses:["button-icon"],clickFunction:u}),r=j("addMaterialError"),d=h({children:[o,a,i],classes:["option","add"]}),g=h({id:"materials",classes:["card"],children:[e,r.element,d]});function u(){n.isValid()?l.isValid()?(g.append(D(n.getContent(),"".concat(l.getContent()," x ").concat(l.getContent()," Pixels"),"textureSet")),l.clearContent(),n.clearContent(),M()):A(l.getError()):A(n.getError())}function C(){var e=document.querySelectorAll("#materials>#textureSet"),t=[];return e.forEach((function(e){var s=e.querySelectorAll("p");t.push("".concat(s[0].textContent," (").concat(s[1].textContent,")"))})),{materials:t}}function A(e){r.showError(e)}function M(){r.clearError()}return{component:g,getData:C,showError:A,clearError:M}}(),g=function(){var e=I({text:"Texture Details",classes:["label"]}),t=y({lblText:"Texture format",id:"textureExt",choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],choices:[".PNG",".EXR",".JPEG"],minChoices:1,optionClasses:["button-choice"]}),s=y({id:"workflow",lblText:"Texture Workflow",choices:["PBR Metallic Roughness","PBR Specular Gloss","Non-PBR"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],minChoices:1,optionClasses:["button-choice"]}),n=y({id:"uvs",lblText:"UV Mapping",choices:["Overlapping (Mirrored)","Overlapping (Duplicate/Array/Thickness)","Non-Overlapping (unique)"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]}),o=y({id:"maps",lblText:"Texture Maps",choices:["Base Color","Base Color + Alpha Opacity","Normal GL","Normal DX","Height/Bump","Opacity","Metallic","Glossiness","Roughness","Specular","Ambient Occlusion","Packed RGB (AO + Roughness + Metallic)","ID Map","Emissive","Packed Normal GL + Height","Packed Normal DX + Height"].sort(),choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],minChoices:1,optionClasses:["button-choice"]});function c(){return{format:t.getSelected(),workflow:s.getSelected(),uv:n.getSelected(),maps:o.getSelected()}}return{component:h({id:"textureDetails",classes:["card"],children:[e,t.element,s.element,n.element,o.element]}),getData:c}}(),u=function(){var e=I({text:"Target Website",classes:["label"]}),t=N({id:"websites",lblText:"Generate Sheet For",choices:["CGTrader","Sketchfab"],choiceClasses:["choices-container"],labelClasses:["label-input"],classes:["option","add","select"],selectedClasses:["selected"],optionClasses:["button-choice"]});function s(){return{target:t.getSelected()}}return{component:h({id:"targetSite",classes:["card"],children:[e,t.element]}),getData:s}}(),A=function(){var e=I({text:"Datasheet",classes:["label"]}),t=j("submitError"),s=C({id:"sheet",classes:["text-area"],placeholder:"Click the bolt to generate a sheet...\nCopy the generated sheet to your target site..."});s.element.readOnly=!0;var c=m({icon:n,btnClasses:["button"],iconClasses:["button-icon"],type:"submit"});c.formNoValidate=!0;var l=m({icon:o,btnClasses:["button"],iconClasses:["button-icon"],clickFunction:u}),a=h({classes:["sheet-controls"],children:[c,l]}),i=h({id:"datasheet",classes:["option","add","data-sheet"],children:[s.element,a]});function r(e){t.showError(e)}function d(){t.clearError()}function g(e){s.element.value=e}function u(){""===s.getContent()?t.showError("Sheet is empty, nothing was copied to clipboard"):(navigator.clipboard.writeText(s.getContent()),t.showInfo("Sheet copied to clipboard"))}return{component:h({id:"datasheet",classes:["card"],children:[e,t.element,i]}),showError:r,clearError:d,writeSheet:g}}();function M(){var e=s.getData(),t=a.getData(),n=i.getData(),o=r.getData(),c=d.getData(),l=g.getData(),u="N/A";return{details:e.details,items:t.items,mesh:{meshType:n.meshType,polyTier:n.polyTier,gameReady:n.gameReady,subdivision:n.subdivision,edgeSplit:n.edgeSplit,realWorldScale:n.realWorldScale,rigged:n.rigged},polyCount:{tris:o.tris,verts:o.verts},materials:c.materials.length>0?c.materials:[u],textures:{format:c.materials.length>0?l.format:[u],workflow:c.materials.length>0?l.workflow:[u],uv:l.uv.length>0?l.uv:[u],maps:c.materials.length>0?l.maps:[u]}}}return{start:function(){var t=document.querySelector("#content");document.body.insertBefore(e.logo,t),document.body.insertBefore(e.header,t),document.body.insertBefore(e.slogan,t),t.append(s.component,a.component,i.component,r.component,d.component,g.component,u.component,A.component),t.addEventListener("submit",(function(e){var t,s,n,o;(e.preventDefault(),function(){var e="There is an error at:";if(!a.getData().items.length>0)a.showError("A model must include at least 1 item"),A.showError("".concat(e," model contents"));else{if(""!==r.getData().tris&&""!==r.getData().verts)return a.clearError(),r.clearError(),A.clearError(),!0;r.showError("Any model must have a polygon and vertex count"),A.showError("".concat(e," polycount"))}return!1}())&&(M(),t=function(){var e={boldOpen:"",boldClose:"",italicOpen:"",italicClose:"",list:""};switch(u.getData().target){case"Sketchfab":e.boldOpen="**",e.boldClose="**",e.list="* ",e.italicOpen="*",e.italicClose="*";break;case"CGTrader":e.boldOpen="**",e.boldClose="**",e.list="- ",e.italicOpen="_",e.italicClose="_"}return e}(),s=M(),n="",o=", ",n+="".concat(t.boldOpen).concat(s.details).concat(t.boldClose,"\n"),n+="\n".concat(t.boldOpen,"Model Contents:").concat(t.boldClose,"\n\n"),s.items.forEach((function(e){n+="".concat(t.list).concat(e,"\n")})),n+="\n".concat(t.boldOpen,"Mesh:").concat(t.boldClose,"\n\n"),n+="".concat(t.list,"Mesh Type: ").concat(s.mesh.meshType,"\n"),n+="".concat(t.list,"Tier: ").concat(s.mesh.polyTier,"\n"),n+="".concat(t.list,"Model is Game-ready: ").concat(s.mesh.gameReady,"\n"),n+="".concat(t.list,"Model is Subdivision-ready: ").concat(s.mesh.subdivision,"\n"),n+="".concat(t.list,"Edge Split: ").concat(s.mesh.edgeSplit,"\n"),n+="".concat(t.list,"Model is Scaled to Real World Scale: ").concat(s.mesh.realWorldScale,"\n"),n+="".concat(t.list,"Model is Rigged: ").concat(s.mesh.rigged,"\n"),n+="\n".concat(t.boldOpen,"PolyCount:").concat(t.boldClose,"\n\n"),n+="".concat(t.list,"Triangles: ").concat(s.polyCount.tris,"\n"),n+="".concat(t.list,"Vertices: ").concat(s.polyCount.verts,"\n"),n+="\n".concat(t.boldOpen,"Materials:").concat(t.boldClose,"\n\n"),s.materials.forEach((function(e){n+="".concat(t.list).concat(e,"\n")})),n+="\n".concat(t.boldOpen,"Textures:").concat(t.boldClose,"\n\n"),n+="".concat(t.list,"Texture File Format(s): ").concat(s.textures.format.join(o),"\n"),n+="".concat(t.list,"Texture Workflow(s): ").concat(s.textures.workflow.join(o),"\n"),n+="".concat(t.list,"UV Mapping: ").concat(s.textures.uv.join(o),"\n"),n+="\n".concat(t.boldOpen,"Texture Maps:").concat(t.boldClose,"\n\n"),s.textures.maps.forEach((function(e){n+="".concat(t.list).concat(e,"\n")})),A.writeSheet(n))}))}}})().start()})();