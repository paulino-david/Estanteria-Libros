const CLAVE="estanteria"

// Funcion normal
export const cargar=()=> localStorage.getItem(CLAVE) ? JSON.parse(localStorage.getItem(CLAVE)) : []

// Procedimiento
export const  guardar=(libros)=> localStorage.setItem(CLAVE,JSON.stringify(libros))

//Buscar libros
export const buscar = (nombre,filtro) => cargar().filter(libro=>libro[filtro].toLowerCase().startsWith(nombre.toLowerCase()))