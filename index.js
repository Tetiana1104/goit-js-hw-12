import{a as w,S as $}from"./assets/vendor-D-2KlEIR.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const H="46879645-5baa1dadd9c91ee84aac66fac",S="https://pixabay.com/api/",P=15;async function m(t,s=1){const a=`${S}?key=${H}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${P}&page=${s}`,o=await w.get(a);if(o.status!==200)throw new Error("Failed to fetch images");return{images:o.data.hits.map(({webformatURL:e,largeImageURL:r,tags:l,likes:b,comments:L,views:v,downloads:E})=>({webformatURL:e,largeImageURL:r,tags:l,likes:b,comments:L,views:v,downloads:E})),totalHits:o.data.totalHits}}function h(t,s=!1){const a=document.querySelector(".gallery"),o=t.map(e=>`
    
        <div class="image-card">
            <a href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            </a>
            <div class="image-info">
                <span>💖 ${e.likes}</span>
                <span>👀 ${e.views}</span>
                <span>💬 ${e.comments}</span>
                <span>📥 ${e.downloads}</span>
            </div>
        </div>
    `).join("");s?a.insertAdjacentHTML("beforeend",o):a.innerHTML=o}function d(t){iziToast.error({title:"Error",message:t,position:"topRight",color:"red"})}const y=document.querySelector("#search-form"),p=document.querySelector(".gallery"),u=document.getElementById("loader"),n=document.createElement("button");n.textContent="Load more";n.classList.add("load-more");p.insertAdjacentElement("afterend",n);let g=new $(".gallery a"),c="",i=1,f=0;y.addEventListener("submit",async t=>{var s;if(t.preventDefault(),c=(s=y.elements.imageSearch)==null?void 0:s.value.trim(),!c){d("Please enter a valid search query");return}i=1,n.style.display="none",p.innerHTML="",u.style.display="block";try{const{images:a,totalHits:o}=await m(c,i);f=o,h(a),g.refresh(),f>i*15&&(n.style.display="block")}catch(a){d(a.message)}finally{u.style.display="none"}});n.addEventListener("click",async()=>{i+=1,u.style.display="block";try{const{images:t}=await m(c,i);h(t,!0),g.refresh(),i*15>=f?(n.style.display="none",d("We're sorry, but you've reached the end of search results.")):q()}catch(t){d(t.message)}finally{u.style.display="none"}});function q(){const{height:t}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
