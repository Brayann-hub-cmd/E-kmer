import { useState } from "react"
import { FaBars } from "react-icons/fa"

import bg from "../assets/images/bg Header.png"
import products from "../assets/images/products.png"

export default function Header(){

const [active,setActive] = useState("Electronique")
const [menuOpen,setMenuOpen] = useState(false)

const categories = [
"Electronique",
"Vehicule",
"Mode",
"Immobilier",
"Services",
"Produits Agricoles"
]

return(


<div 
className="relative text-white"
style={{
backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="relative text-white">

{/* BARRE CATEGORIES */}

<div className="border-b border-orange-500">

<div className="max-w-7xl mx-auto flex items-center justify-between px-4">

{/* MENU MOBILE */}

<div 
className="md:hidden text-2xl cursor-pointer py-3"
onClick={()=>setMenuOpen(!menuOpen)}
>
<FaBars/>
</div>

{/* CATEGORIES DESKTOP */}

<div className="hidden md:flex gap-10 text-sm font-medium">

{categories.map((cat)=>(

<div
key={cat}
onClick={()=>setActive(cat)}
className="relative cursor-pointer py-4"
>

<span className={active===cat ? "text-orange-500" : "hover:text-orange-400"}>
{cat}
</span>

{active===cat && (
<div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500"></div>
)}

</div>

))}

</div>

</div>

{/* MENU MOBILE DEROULE */}

{menuOpen && (

<div className="md:hidden bg-black/90 flex flex-col items-center gap-4 py-4">

{categories.map((cat)=>(

<div
key={cat}
onClick={()=>setActive(cat)}
className="cursor-pointer text-lg hover:text-orange-500"
>
{cat}
</div>

))}

</div>

)}

{/* HERO CONTENT */}

<div className="max-w-7xl mx-auto grid grid-cols-2 items-center py-16">

<div>

<h1 className="text-5xl font-bold leading-tight">

Achetez et vendez  
<br/>

au Cameroun

</h1>

<div className="flex gap-4 mt-8">

<button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold">

Commencez vos achats

</button>

<button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">

Vendez vos produits

</button>

</div>

</div>
{/* IMAGE */}

<div className="flex justify-end">

<img 
src={products}
className="w-[450px]"
/>

</div>

</div>

</div>
</div> </div>

)
}