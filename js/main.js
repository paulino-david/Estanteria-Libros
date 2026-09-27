import { cargar,guardar } from "./storage.js";
import crearLibro from "./libros.js";
import { alternarLeidos,contarLeidos,eliminarLibro } from "./libros.js";
import * as ui from './ui.js'

let libros=cargar()
console.log(libros)

const acciones={
    alternar: id=>actualizar(alternarLeidos(libros,id)),
    borrar: id=> actualizar(eliminarLibro(libros,id))
}

const actualizar=(nuevos)=>{
    libros=nuevos
    guardar(libros)
    pintar()
}

const pintar=()=>{
    ui.pintarLista(libros,acciones)
    ui.pintarContador(contarLeidos(libros), libros.lenght)
}

const form= document.getElementById("form-libro")

form.addEventListener("submit",evento=>{
    evento.preventDefault()
    const titulo=form.querySelector("#titulo").value.trim()
    const autor=form.querySelector("#autor").value.trim()
    actualizar([...libros,crearLibro(titulo,autor)])
    form.reset()
})

pintar()