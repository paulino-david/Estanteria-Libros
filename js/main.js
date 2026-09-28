import { cargar, guardar } from "./storage.js";
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
    pintar()
}

const pintar = () => {
    ui.pintarLista(libros, acciones)
    ui.pintarContador(contarLeidos(libros), libros.length)
}

const form = document.getElementById("form-libro")
const msg = document.getElementById("msg")

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

pintar()