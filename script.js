const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hidden"),450));

const body=document.body;
const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("mohit-theme");
if(savedTheme==="light") body.classList.add("light");
themeToggle.textContent=body.classList.contains("light")?"☾":"☼";
themeToggle.addEventListener("click",()=>{
  body.classList.toggle("light");
  const mode=body.classList.contains("light")?"light":"dark";
  localStorage.setItem("mohit-theme",mode);
  themeToggle.textContent=mode==="light"?"☾":"☼";
});

const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>{
  const open=body.classList.toggle("menu-open");
  navLinks.style.display=open?"flex":"";
  menuToggle.setAttribute("aria-expanded",String(open));
});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  body.classList.remove("menu-open");
  navLinks.style.display="";
  menuToggle.setAttribute("aria-expanded","false");
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const backTop=document.getElementById("backTop");
window.addEventListener("scroll",()=>backTop.classList.toggle("show",window.scrollY>500),{passive:true});

const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const closeLightbox=()=>{lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");lightboxImage.src="";document.body.style.overflow="";};
document.querySelectorAll("[data-lightbox]").forEach(btn=>btn.addEventListener("click",()=>{
  lightboxImage.src=btn.dataset.lightbox;
  lightboxImage.alt=btn.querySelector("img")?.alt||"Gallery image";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}));
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&lightbox.classList.contains("open"))closeLightbox();});
