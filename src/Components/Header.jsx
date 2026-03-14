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
className="relative text-white bg-cover bg-center min-h-[80vh]"
style={{
backgroundImage:`linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url(${bg})`
}}
>

{/* CATEGORIES BAR */}

<div className="border-b border-orange-500/40">

<div className="max-w-2xl mx-auto px-2 flex items-center justify-between">

{/* logo */}



{/* menu hamburger mobile */}

<div
className="md:hidden text-2xl cursor-pointer"
onClick={()=>setMenuOpen(!menuOpen)}
>
<FaBars/>
</div>

{/* categories desktop */}

<div className="hidden md:flex gap-8 text-sm font-medium">

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

{/* mobile menu */}

{menuOpen && (

<div className="md:hidden bg-black/90 flex flex-col items-center gap-6 py-6">

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

</div>


{/* HERO SECTION */}

<div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">

{/* texte */}

<div>

<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">

Achetez et vendez  

au Cameroun


</h1>

<p className="mt-6 text-gray-200 max-w-md">

Trouvez les meilleurs produits ou vendez facilement les vôtres partout au Cameroun.

</p>

{/* boutons */}

<div className="flex flex-col sm:flex-row gap-4 mt-8">

<button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition">

Commencez vos achats

</button>

<button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">

Vendez vos produits

</button>

</div>

</div>


{/* image produits */}

<div className="flex justify-center lg:justify-end">

<img
src={products}
alt="produits"
className="w-full max-w-[420px] hover:scale-105 transition duration-300"
/>

</div>

</div>

</div>

)
}