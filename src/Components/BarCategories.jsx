import { useState } from "react"

export default function CategoriesBar() {

const [active,setActive] = useState("Electronique")

const categories = [
"Electronique",
"Vehicule",
"Mode",
"Immobilier",
"Services",
"Produits Agricoles"
]

return (

<div className="w-full bg-black/70 backdrop-blur-sm">

<div className="max-w-7xl mx-auto flex justify-center gap-10 text-white text-sm font-medium">

{categories.map((cat)=>(
    
<div
key={cat}
onClick={()=>setActive(cat)}
className="relative cursor-pointer py-3"
>

<span className={active===cat ? "text-orange-500" : "hover:text-orange-400"}>

{cat}

</span>

{/* ligne orange */}

{active===cat && (

<div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500"></div>

)}

</div>

))}

</div>

</div>

)

}