(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[399],{5845:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/member/[slug]",function(){return r(8505)}])},8505:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return M}});var n=r(5944),i=r(3366),a=r(7462),o=r(7294),u=r(6010),l=r(917),s=r(7192);function c(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function h(t){return parseFloat(t)}var f=r(1796),d=r(948),m=r(7623),p=r(8979);function g(t){return(0,p.Z)("MuiSkeleton",t)}(0,r(6087).Z)("MuiSkeleton",["root","text","rectangular","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var b=r(5893);const v=["animation","className","component","height","style","variant","width"];let y,w,S,O,Z=t=>t;const C=(0,l.F4)(y||(y=Z`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),k=(0,l.F4)(w||(w=Z`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),j=(0,d.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],!1!==r.animation&&e[r.animation],r.hasChildren&&e.withChildren,r.hasChildren&&!r.width&&e.fitContent,r.hasChildren&&!r.height&&e.heightAuto]}})((({theme:t,ownerState:e})=>{const r=c(t.shape.borderRadius)||"px",n=h(t.shape.borderRadius);return(0,a.Z)({display:"block",backgroundColor:(0,f.Fq)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===e.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${r}/${Math.round(n/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===e.variant&&{borderRadius:"50%"},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})}),(({ownerState:t})=>"pulse"===t.animation&&(0,l.iv)(S||(S=Z`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),C)),(({ownerState:t,theme:e})=>"wave"===t.animation&&(0,l.iv)(O||(O=Z`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(90deg, transparent, ${0}, transparent);
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),k,e.palette.action.hover)));var _=o.forwardRef((function(t,e){const r=(0,m.Z)({props:t,name:"MuiSkeleton"}),{animation:n="pulse",className:o,component:l="span",height:c,style:h,variant:f="text",width:d}=r,p=(0,i.Z)(r,v),y=(0,a.Z)({},r,{animation:n,component:l,variant:f,hasChildren:Boolean(p.children)}),w=(t=>{const{classes:e,variant:r,animation:n,hasChildren:i,width:a,height:o}=t,u={root:["root",r,n,i&&"withChildren",i&&!a&&"fitContent",i&&!o&&"heightAuto"]};return(0,s.Z)(u,g,e)})(y);return(0,b.jsx)(j,(0,a.Z)({as:l,ref:e,className:(0,u.Z)(w.root,o),ownerState:y},p,{style:(0,a.Z)({width:d,height:c},h)}))})),x=r(8996),A=r(1163),E=r(4287),P=r(2726),X=r(7278),N=r(5920);function R(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function $(t){return function(t){if(Array.isArray(t))return R(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return R(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return R(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var M=(0,x.X)((function(){var t,e=(0,o.useState)(null),r=e[0],i=e[1],a=(0,o.useState)([]),u=a[0],l=a[1],s=(0,o.useContext)(P.I).auth,c=(0,A.useRouter)(),h=new E.Z,f=null===(t=c.query.slug)||void 0===t?void 0:t.toString();return(0,o.useEffect)((function(){f&&h.getBySlug(f).then((function(t){return i(t)})).catch((function(t){return l($(u).concat([t]))}))}),[f]),r?(0,n.BX)("div",{children:[u.length>0&&(0,n.tZ)(N.j,{errors:u}),(0,n.tZ)(X.W_,{member:r,setMember:i,auth:s,errors:u,setErrors:l})]}):(0,n.BX)(n.HY,{children:[(0,n.tZ)(_,{variant:"text"}),(0,n.tZ)(_,{variant:"circular",width:40,height:40}),(0,n.tZ)(_,{variant:"rectangular",width:210,height:118})]})}))},5920:function(t,e,r){"use strict";r.d(e,{j:function(){return u}});var n=r(5944),i=r(1737);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}var u=function(t){var e=t.errors,r=o(t,["errors"]);return(0,n.tZ)(i.Z,function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})))),n.forEach((function(e){a(t,e,r[e])}))}return t}({variant:"outlined",severity:"error"},r,{children:(0,n.tZ)("ul",{children:e&&e.map((function(t){return(0,n.tZ)("li",{children:t})}))})}))}}},function(t){t.O(0,[406,996,774,888,179],(function(){return e=5845,t(t.s=e);var e}));var e=t.O();_N_E=e}]);