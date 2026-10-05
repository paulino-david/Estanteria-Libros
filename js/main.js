import { buscar, cargar, guardar } from "./storage.js";
import crearLibro from "./libros.js";
import { alternarLeidos, contarLeidos, eliminarLibro } from "./libros.js";
import * as ui from './ui.js'

let libros = cargar()
console.log(libros)

const acciones = {
    alternar: id => actualizar(alternarLeidos(libros, id)),
    borrar: id => actualizar(eliminarLibro(libros, id))
}

const actualizar = (nuevos) => {
    libros = nuevos
    guardar(libros)
    pintar(libros)
}

const pintar = (libros) => {
    ui.pintarLista(libros, acciones)
    ui.pintarContador(contarLeidos(libros), libros.length)
}

const form = document.getElementById("form-libro")
const msg = document.getElementById("msg")
const input_buscar= document.getElementById("buscar")
const filtro= document.getElementById("filtro")
const cancelarMenu = document.getElementById("cancelarMenu")
const menuMovil = document.getElementById("menuMovil")
const verMenu = document.getElementById("verMenu")

filtro.addEventListener("click",()=>{
    input_buscar.placeholder=`Buscar por ${filtro.value}`
})

input_buscar.addEventListener("input",()=>{
    pintar(buscar(input_buscar.value,filtro.value))
})

form.addEventListener("submit", evento => {
    evento.preventDefault()
    const titulo = form.querySelector("#titulo").value.trim()
    const autor = form.querySelector("#autor").value.trim()

    if (titulo && autor) {
        msg.innerHTML = `         
            <i class="fa-solid fa-circle-check"></i> Libro registrado correctamente
            `
        msg.style.color = "green"
        setTimeout(() => {
            msg.innerHTML = ``
        }, 4000)
        actualizar([...libros, crearLibro(titulo, autor)])
        form.reset()
    }
    else {
        msg.style.color = "red"

        msg.innerHTML = `         
             <i class="fa-solid fa-circle-xmark"></i> Debe completar el formulario
            `
        setTimeout(() => {

            msg.innerHTML = ``
        }, 4000)
    }

})

verMenu.addEventListener("click",()=>{
    menuMovil.style.display="flex"
})

cancelarMenu.addEventListener("click",()=>{
    menuMovil.style.display="none"
})

pintar(libros)