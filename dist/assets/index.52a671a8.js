import{g as _}from"./wx-share.257d08d6.js";import{r as y}from"./request.e54a2d6e.js";/* empty css              *//* empty css              *//* empty css              */import{_ as x,d as B,E as k,y as C,r as F,G as D,a$ as c,o as v,l as h,p as e,A as a,x as d,T as u,C as A,D as I,H as z}from"./index.4a3d8a83.js";const E=i=>y.get("appActivityNews/findNewsDetail",i,"");var T={findNewsDetail:E};const s=i=>(A("data-v-9ebee862"),i=i(),I(),i),N={key:0,class:"content"},$={class:"title"},S={class:"office"},q=["src"],R={class:"source"},H={class:"name"},M={class:"time"},j={class:"news_editor"},L=s(()=>e("a",{target:"_blank",href:"https://news.dahebao.cn/appdownload/index.html?Type=100"},[e("div",{class:"download"})],-1)),V={class:"comment"},G=s(()=>e("input",{class:"input",type:"text",placeholder:"\u5199\u8BC4\u8BBA..."},null,-1)),P={key:1,class:"error"},U=s(()=>e("a",{target:"_blank",href:"https://news.dahebao.cn/appdownload/index.html?Type=100"},[e("img",{class:"erroe_img",src:"https://imgcdn.dahebao.cn/20221115/20221115112201798656.png"})],-1)),J=s(()=>e("div",{style:{"text-align":"center"}},"\u70B9\u51FB\u524D\u5F80\u8C6B\u89C6\u9891,\u67E5\u770B\u66F4\u591A\u65B0\u95FB",-1)),K=[U,J],O=B({__name:"index",setup(i){var l;const r=k(null),p=(l=C())==null?void 0:l.appContext.config.globalProperties.$viewerApi,t=F({show:!0,news:{}});function g(){const n=document.getElementsByTagName("img");if(n.length>1)for(let o=0;o<n.length-1;o++)n[o+1].onclick=m}function m(n){p({images:[n.target.currentSrc]})}function f(){T.findNewsDetail({news_id:c.currentRoute.value.query.news_id}).then(n=>{if(!n.news_id){t.show=!1;return}t.news=n,r.value&&(r.value.innerHTML=n.news_content.replace(/<p>/g,"<div style='margin-top:15px'>").replace(/<\/p>/g,"</div>").replace(/<img/g,"<img style='max-width:100%'"))}).then(()=>{t.show&&(g(),b(),_({news_id:c.currentRoute.value.query.news_id,type:3,share_url:t.news.news_url}))})}function b(){z({method:"post",url:"https://news.dahebao.cn/dahe/appsubscribenumber/subscribenumberdetailold",headers:{"Content-Type":"application/json;charset=UTF-8"},params:{sign:"637586292ebf2c5fabab863734fc6a12",data:{communityId:t.news.community_id}}}).then(n=>{t.news.communityImg=n.data.banner.communityImg})}return D(()=>{c.currentRoute.value.query.news_id?f():t.show=!1}),(n,o)=>t.show?(v(),h("div",N,[e("div",$,a(t.news.news_title),1),e("div",S,[e("img",{src:t.news.communityImg,alt:""},null,8,q),e("div",R,[e("div",H,a(t.news.news_source),1),e("div",M,a(t.news.news_create_time),1)])]),e("div",{class:"header",ref_key:"headerRef",ref:r},null,512),e("div",j," \u6765\u6E90: "+a(t.news.news_source)+" \u7F16\u8F91:"+a(t.news.news_editor),1),e("div",{class:"praise",onClick:o[0]||(o[0]=w=>d(u)("\u8BF7\u524D\u5F80\u8C6B\u89C6\u9891\u5BA2\u6237\u7AEF\u70B9\u8D5E"))}),e("div",{class:"number",onClick:o[1]||(o[1]=w=>d(u)("\u8BF7\u524D\u5F80\u8C6B\u89C6\u9891\u5BA2\u6237\u7AEF\u70B9\u8D5E"))},a(t.news.news_thumbs_up)+"\u8D5E ",1),L,e("div",V,[G,e("button",{class:"button",onClick:o[2]||(o[2]=w=>d(u)("\u8BF7\u524D\u5F80\u8C6B\u89C6\u9891\u5BA2\u6237\u7AEF\u53D1\u8868\u8BC4\u8BBA"))}," \u53D1\u9001 ")])])):(v(),h("div",P,K))}});var te=x(O,[["__scopeId","data-v-9ebee862"]]);export{te as default};
