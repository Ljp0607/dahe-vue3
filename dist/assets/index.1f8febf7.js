import{c as w,m as z,X as S,t as E,d as C,E as u,R as L,V as m,aY as R,G as B,a1 as N,W as V,a as o,a5 as Y,Z as _,Y as y,aw as F,w as G}from"./index.4a3d8a83.js";import{u as H}from"./use-tab-status.a8e54c32.js";const[I,r,M]=w("list"),U={error:Boolean,offset:z(300),loading:Boolean,disabled:Boolean,finished:Boolean,errorText:String,direction:S("down"),loadingText:String,finishedText:String,immediateCheck:E};var W=C({name:I,props:U,emits:["load","update:error","update:loading"],setup(e,{emit:c,slots:i}){const l=u(e.loading),f=u(),h=u(),s=H(),g=L(f),n=()=>{Y(()=>{if(l.value||e.finished||e.disabled||e.error||(s==null?void 0:s.value)===!1)return;const{offset:t,direction:d}=e,a=_(g);if(!a.height||y(f))return;let v=!1;const x=_(h);d==="up"?v=a.top-x.top<=t:v=x.bottom-a.bottom<=t,v&&(l.value=!0,c("update:loading",!0),c("load"))})},b=()=>{if(e.finished){const t=i.finished?i.finished():e.finishedText;if(t)return o("div",{class:r("finished-text")},[t])}},T=()=>{c("update:error",!1),n()},k=()=>{if(e.error){const t=i.error?i.error():e.errorText;if(t)return o("div",{role:"button",class:r("error-text"),tabindex:0,onClick:T},[t])}},P=()=>{if(l.value&&!e.finished&&!e.disabled)return o("div",{class:r("loading")},[i.loading?i.loading():o(F,{class:r("loading-icon")},{default:()=>[e.loadingText||M("loading")]})])};return m(()=>[e.loading,e.finished,e.error],n),s&&m(s,t=>{t&&n()}),R(()=>{l.value=e.loading}),B(()=>{e.immediateCheck&&n()}),N({check:n}),V("scroll",n,{target:g,passive:!0}),()=>{var t;const d=(t=i.default)==null?void 0:t.call(i),a=o("div",{ref:h,class:r("placeholder")},null);return o("div",{ref:f,role:"feed",class:r(),"aria-busy":l.value},[e.direction==="down"?d:a,P(),b(),k(),e.direction==="up"?d:a])}}});const j=G(W);export{j as L};
