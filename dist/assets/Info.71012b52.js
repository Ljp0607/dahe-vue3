/* empty css              *//* empty css              *//* empty css              */import"./index.24f2b48f.js";import"./index.45c30aaf.js";import{C as $,_ as L}from"./05.db96815a.js";import{_ as S,z as U,E as f,y as j,r as I,G as D,I as T,at as A,o as h,l as w,a as g,p as n,ad as r,aX as u,F,s as G,ae as B,q as E,C as M,D as R,T as i,A as W}from"./index.4a3d8a83.js";import{_ as X}from"./08.5962a5d4.js";import{D as q}from"./index.e9a9b215.js";import"./index.68f2ff4e.js";import"./use-id.ea8c8a7a.js";import"./use-route.323992c4.js";import"./use-tab-status.a8e54c32.js";const s=p=>(M("data-v-754673d0"),p=p(),R(),p),P={class:"Info"},H=s(()=>n("div",{class:"empty"},null,-1)),J={class:"form"},K=s(()=>n("div",{class:"message"},"1.\u9009\u62E9\u8981\u7533\u8BF7\u7684\u5C0F\u7EC4",-1)),O=s(()=>n("div",{class:"message"},"2.\u53D1\u8868\u7533\u8BF7\u7559\u8A00",-1)),Q=s(()=>n("div",{class:"introduces"}," \u53EF\u4EE5\u8C08\u8C08\u5BF9\u8BE5\u5C0F\u7EC4\u7684\u4E2A\u4EBA\u4F18\u52BF\uFF0C\u8D44\u6E90\u7B49\uFF0C\u60A8\u7684\u7559\u8A00\u5C06\u4F9B\u5DE5\u4F5C\u4EBA\u5458\u53C2\u8003\uFF0C\u4F5C\u4E3A\u5BA1\u6838\u7684\u91CD\u8981\u4F9D\u636E ",-1)),Y=s(()=>n("div",{class:"message"},"3.\u586B\u5199\u7533\u8BF7\u4FE1\u606F",-1)),Z=s(()=>n("img",{class:"image",src:L,alt:""},null,-1)),tt=s(()=>n("div",{class:"introduce"}," \u60A8\u63D0\u4F9B\u7684\u4FE1\u606F\u4EC5\u4F9B\u5927\u6CB3\u62A5\xB7\u8C6B\u89C6\u9891\u5BA1\u6838\u53C2\u8003\u53CA\u5F00\u8BBE\u8D26\u53F7\uFF0C\u76F8\u5173\u4FE1\u606F\u5C06\u4E25\u683C\u4FDD\u5BC6\u3002 ",-1)),et={class:"title"},ot=["onUpdate:modelValue","placeholder"],at={class:"expert"},nt=s(()=>n("div",{class:"county"},"\u6240\u5728\u5730\u533A",-1)),it=s(()=>n("div",{class:"empty",style:{height:"80px"}},null,-1)),st={__name:"Info",setup(p){const y=U(),d=f(!1),c=f(""),_=j().proxy.$axios,v=f(""),e=I({accountName:"",realName:"",authName:"",idCard:"",phone:"",authType:"5",provinceId:"",countyId:"",cityId:"",fileList:[]}),l=I({message:[{type:"input",name:"\u771F\u5B9E\u59D3\u540D",value:"",pattern:/^[\u4e00-\u9fa5]{2,4}$/,fileList:[]},{type:"input",name:"\u8EAB\u4EFD\u8BC1\u53F7",value:"",pattern:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,fileList:[]},{type:"input",name:"\u8054\u7CFB\u624B\u673A",value:"",pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,fileList:[]}]});function x(){_({method:"GET",url:"https://news.dahebao.cn/dahe/app/announce/countyList"}).then(o=>{if(o.status==200){for(let t of o.data)for(let m of t.children)delete m.children;l.options=o.data}else i(o.status)},o=>{i(o)})}function b({selectedOptions:o}){d.value=!1,v.value=o.map(t=>t.text).join("/"),e.cityId=c.value.toString(),e.provinceId=c.value.toString().slice(0,2)+"0000"}function k(){for(let o of l.message)if(o.value==""||!o.pattern.test(o.value)){i("\u8BF7\u68C0\u67E5"+o.name+"\u4FE1\u606F");return}if(e.accountName==""){i("\u8BF7\u586B\u5199\u7533\u8BF7\u7684\u5C0F\u7EC4");return}else if(e.realName==""){i("\u8BF7\u586B\u5199\u7533\u8BF7\u7559\u8A00");return}else if(e.provinceId==""){i("\u8BF7\u9009\u62E9\u6240\u5728\u5730\u533A");return}else if(e.countyId==""){i("\u8BF7\u68C0\u67E5\u8BE6\u7EC6\u5730\u5740");return}else e.authName=l.message[0].value,e.idCard=l.message[1].value,e.phone=l.message[2].value;_({method:"post",url:`https://news.dahebao.cn/dahe/app/accountAuthRecord/saveAccountAuthRecord?userId=${y.$state.userId}`,data:[e]}).then(o=>{if(o.state=1){q({message:"\u4FE1\u606F\u5DF2\u63D0\u4EA4\u6210\u529F\uFF0C\u8BF7\u7B49\u5F85\u5BA1\u6838\uFF0C\u901A\u8FC7\u540E\u5C06\u6709\u5DE5\u4F5C\u4EBA\u5458\u8054\u7CFB\u60A8\u3002",theme:"round-button"});for(let t of l.message)t.value="";e.fileList.length=0,v.value="",e.countyId="",e.accountName="",e.realName=""}else i(o.data)},o=>{i(o)})}return D(()=>{x()}),(o,t)=>{const m=T,z=$,N=A;return h(),w("div",P,[H,g(m,{class:"icon",color:"white",size:"30px",name:"arrow-left"}),n("div",J,[K,r(n("input",{class:"inputGroup",type:"text",placeholder:"\u7F8E\u98DF\uFF0C\u8FD0\u52A8\uFF0C\u9605\u8BFB\u7B49","onUpdate:modelValue":t[0]||(t[0]=a=>e.accountName=a)},null,512),[[u,e.accountName]]),O,Q,r(n("textarea",{class:"inputWord","onUpdate:modelValue":t[1]||(t[1]=a=>e.realName=a)},null,512),[[u,e.realName]]),Y,Z,tt,(h(!0),w(F,null,G(l.message,(a,C)=>(h(),w("div",{class:"main",key:C},[n("div",et,W(a.name),1),r(n("input",{class:"input",type:"text","onUpdate:modelValue":V=>a.value=V,placeholder:a.placeholder},null,8,ot),[[u,a.value]])]))),128)),n("div",at,[nt,r(n("input",{class:"province",readonly:"","onUpdate:modelValue":t[2]||(t[2]=a=>v.value=a),onClick:t[3]||(t[3]=a=>d.value=!0),type:"text"},null,512),[[u,v.value]]),r(n("input",{class:"province_more",placeholder:"\u8BE6\u7EC6\u5730\u5740",type:"text","onUpdate:modelValue":t[4]||(t[4]=a=>e.countyId=a)},null,512),[[u,e.countyId]]),r(n("img",{onClick:t[5]||(t[5]=a=>d.value=!0),class:"county_img",src:X,alt:""},null,512),[[B,!v.value]])]),g(N,{show:d.value,"onUpdate:show":t[8]||(t[8]=a=>d.value=a),round:"",position:"bottom"},{default:E(()=>[g(z,{modelValue:c.value,"onUpdate:modelValue":t[6]||(t[6]=a=>c.value=a),title:"\u8BF7\u9009\u62E9\u6240\u5728\u5730\u533A",options:l.options,onClose:t[7]||(t[7]=a=>d.value=!1),onFinish:b},null,8,["modelValue","options"])]),_:1},8,["show"]),n("button",{class:"submit",onClick:k},"\u63D0\u4EA4\u4FE1\u606F")]),it])}}};var It=S(st,[["__scopeId","data-v-754673d0"]]);export{It as default};
