import{j as e,q as d,r as l,s as g,w,O as u,n as j,P as p}from"./index-197bf5fe.js";import{b as r,a as y}from"./ProductPreview-760965be.js";import{R as m}from"./Row-72177947.js";import{u as N}from"./MathUtils-a71e7da3.js";const P=()=>e.jsxs(d,{className:"last-viewed-placeholder glow",xs:8,sm:6,md:5,lg:3,xl:2,children:[e.jsx(r,{bg:"secondary",xs:12,className:"d-flex justify-content-center opacity-25",children:e.jsx("i",{className:"bi bi-camera last-viewed-placeholder__img opacity-75"})}),e.jsx(r,{bg:"secondary",size:"lg",className:"opacity-25",xs:12})]}),L=({productId:s})=>{const c=g(),t=w(u),{data:x,isLoading:h,isSuccess:n}=j(),[o,f]=l.useState([]);if(l.useEffect(()=>{c(p({id:s}))},[]),l.useEffect(()=>{n&&f(t.filter(a=>a!==s).map(a=>x.find(i=>{if(i.id===a)return{id:i.id,image:i.image,title:i.title}})).filter(Boolean))},[n]),t.length>0)return h?e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"mb-3",children:"Ostatnio oglądane"}),e.jsx(m,{className:"flex-nowrap my-5 py-5",style:{overflowX:"auto"},children:t.map(a=>e.jsx(P,{},a))})]}):n&&o.length>0?e.jsxs("section",{className:"my-5 py-5",children:[e.jsx("h5",{className:"mb-3",children:"Ostatnio oglądane"}),e.jsx(m,{className:"flex-nowrap",children:o.map(a=>e.jsx(d,{xs:8,sm:6,md:5,lg:3,xl:2,children:e.jsx(y,{product:a,component:"LastVieved"})},a.id))})]}):null},O=l.memo(L);function R(s,c){const t=s.category==="men's clothing"||s.category==="women's clothing"?{sizes:c}:{available:Number(s.id)+3};return{...s,price:N(s.price),...t}}export{O as L,R as c};