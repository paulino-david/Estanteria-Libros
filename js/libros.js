export default function crearLibro(titulo, autor) { return { id: Date.now(), titulo: titulo, autor: autor, leido: false } }

export const alternarLeidos = (libros, id) => {
    libros.find(libro => libro.id === id).leido=!libros.find(libro => libro.id === id).leido
    return libros
}
// console.log(alternarLeidos)

export const eliminarLibro = (libro, id) => libro.filter(libro => libro.id !== id)

export const contarLeidos = libros => libros.filter(libro => libro.leido === true).length