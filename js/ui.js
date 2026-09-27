const lista=document.getElementById("lista")
const contador=document.getElementById("contador")

const crearBoton=(texto,alPulsar)=>{
    const boton=document.createElement("btn-add")
    boton.textContent=texto
    boton.style.color=boton.textContent=="Borrar"?"red":""
    boton.style.backgroundColor=boton.textContent=="Borrar"?"#e4040412":""
    boton.addEventListener("click",alPulsar)
    return boton
}

const crearItem=(libro,acciones)=>{
    const li=document.createElement("li")
    li.classList.toggle("leido",libro.leido)
    const book=document.createElement("book")
    const span=document.createElement("span")
    span.textContent=`${libro.titulo} - ${libro.autor}`
    span.style.fontSize="large"
    const botones=document.createElement("botones")
    const alternar=()=>acciones.alternar(libro.id)
    const borrar=()=> acciones.borrar(libro.id)

    botones.append(
        crearBoton(libro.leido?"Pendiente":"Leido",alternar),
        crearBoton("Borrar",borrar)
    )
    li.append(
        book,
        span,botones
    )
    return li
}


export const pintarLista=(libros,acciones)=>{
    const items = libros.map(libro=> crearItem(libro,acciones))
    lista.replaceChildren(...items)
    // let items=[]
    // libros.forEach(libro => {
    //     crearItem(libro,acciones)
    // });
    // return items
}

export const pintarContador=(leidos,total)=>{
    contador.textContent=`Has leido ${leidos} de ${total} libros`
}

