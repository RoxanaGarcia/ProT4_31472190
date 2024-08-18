import {pool} from './database.js';

class LibroController{
  
  //  listado de libros
  async  getAll(req, res){
    try{
        const [result] = await pool.query('Select * FROM libros' );
        res.json(result);

      }catch(error){
        res.status(500).json({error: 'SR: Usuario se produjo un error al Listar libros', detalle: error});
    }
    }

    // Lista un libro pasado como parametro el id de libros
    async getOne (req, res){
      const libro = req.body;
      const {id} = req.params;
      try {
         const [result] = await pool.query(`Select * FROM libros WHERE id= ?`, [id]);
         if(result.lenght === 0){
          res.status(404).json({message:"Libro encontrado"});
          }else{
            res.json(result[0]);
          }
          
        }catch (error) {
            res.status(500).json({message: 'Error al obtener el libro', error});
  
      }
  }

  // Para agregar libros
async add(req, res){
  const libro = req.body;
  const { nombre, autor, categoria, año_publicacion, ISBN} = req.body;
    if (!nombre || !autor || !categoria || !año_publicacion || !ISBN ){
      return res.status(400).json({error: 'Todos los campos son obligatorios'});
     }
try {
  const [result] = await pool.query('INSERT INTO libros(nombre,autor,categoria,año_publicacion,ISBN) VALUES (?,?,?,?,?)', 
      [libro.nombre, 
      libro.autor,
      libro.categoria,
      libro.año_publicacion,
      libro.ISBN]); 
  res.json({"Sr:Usuario Libro inscorporado con éxito": result.insertId,
 
    });

} catch (error) {
  res.status(500).json({ message: "Sr:Usuario se produjo un error al agregar el libro" });
}
 }

// Para eliminar libro pasadndo el ISBN del libro a eliminar, conciderando que este es un codigo unico de libros
async delete(req, res){
 try {
  const libro = req.body;
  const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=?`, [libro.ISBN]);
  if(result.affectedRows > 0){
     res.json({"Registros eliminados":result.affectedRows});
     }else{
     res.status(404).json({ mensaje: 'SR:Usuario no se encuentra su libro en la base de datos para ser eliminado.'});
    }

  } catch (error) {
    console.error('Error al eliminar el libro:', error.message);
    res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
}

// Actualizar libro pasando el id del libro a modificar
async update (req, res){
 
    try {
      const libro = req.body;
      const [result] =await pool.query(`UPDATE libros SET nombre=?, autor=?, categoria=?, año_publicacion=?, ISBN=? WHERE id=?`,
        [libro.nombre,
        libro.autor,
        libro.categoria,
        libro.año_publicacion,
        libro.ISBN,
        libro.id]);
      res.json({"Sr: Usuario  se actualizo con exito su registro": result.changedRows}); 
    } catch (error) {
      console.error('Sr: Usuario se produjo un error al actualizar el libro:', error);
      res.status(500).json({ mensaje: 'Sr: Usuario ocurrió un error al intentar actualizar el libro.' });
    }
  }
}
export const libro = new LibroController();