import{r as f,j as s,S as n}from"./index-ac86e50b.js";import{B as z}from"./Row-1a16fe8d.js";import{M as c}from"./ProductPreview-a4a1c3c1.js";function M({sizes:m,selectedSize:i,handleSizeSelect:x,component:t}){const[N,u]=f.useState(!1),[b]=f.useState(()=>{let r=!1;return m.map(a=>{for(const e in a){const o=a[e];o<=3&&!(o===0)&&(r=!0)}}),r}),j=()=>u(!1),y=()=>u(!0),p=()=>{const r=[];return m.map(a=>{for(const e in a){const o=a[e],l=o===0,d=o<=3;t==="Product"?r.push(s.jsx(z,{variant:"outline-dark",id:e,className:`${l?"disabled":""} ${e===i?"selected":""} py-2 min-width-80px rounded-0`,onClick:h=>x(h),children:s.jsx(n,{direction:"horizontal",className:"justify-content-center",children:s.jsxs(n,{direction:"horizontal",children:[d&&!l?s.jsx("i",{className:"bi bi-circle-fill text-danger fs-8 me-1 mt-1"}):null," ",s.jsx("span",{children:e})]})})},e)):t==="Favorites"&&r.push(s.jsx("button",{id:e,className:`${l?"disabled":""} 
                 `,onClick:h=>{x(h),j()},children:s.jsxs(n,{direction:"horizontal",className:"justify-content-between sizes p-3",children:[s.jsx("span",{children:e}),d?s.jsx("span",{className:"fs-7 text-danger",children:"Zostało tylko kilka sztuk!"}):null," "]})},e))}}),r};return s.jsxs(s.Fragment,{children:[t==="Product"?s.jsxs(n,{direction:"horizontal",className:"mb-2 justify-content-between",children:[s.jsx("div",{children:i!=="Wybierz rozmiar"?s.jsx("span",{children:"Rozmiary"}):s.jsx("span",{className:"text-danger",children:"Wybierz rozmiar"})}),b?s.jsxs(n,{direction:"horizontal",className:"fs-7",children:[s.jsx("i",{className:"bi bi-circle-fill text-danger me-1 fs-8"}),s.jsx("span",{children:"Zostało tylko kilka sztuk!"})]}):null]}):null,s.jsx(n,{direction:"horizontal",className:"flex-wrap",gap:3,children:t==="Product"?p():s.jsxs(s.Fragment,{children:[s.jsx(z,{variant:i==="Wybierz rozmiar"?"outline-danger":i?"outline-dark":"outline-secondary",className:"rounded-0 text-center p-2 px-3",onClick:r=>y(),children:s.jsx("span",{className:`${i?"fw-bold":""}`,children:i||"Wybierz rozmiar"})}),s.jsxs(c,{fullscreen:"lg-down",show:N,onHide:j,dialogClassName:"sizes-modal",children:[s.jsx(c.Header,{closeButton:!0,className:"p-4",children:s.jsx(c.Title,{children:s.jsx("h6",{className:"m-0",children:"Wybierz rozmiar"})})}),s.jsx(c.Body,{className:"p-3",children:s.jsx(n,{children:p()})})]})]})})]})}export{M as S};