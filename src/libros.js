import {pool} from './database.js';

class LibroController{

  async  getAll(req, res){
        const [result] = await pool.query('Select * FROM libros');
        res.json(result);
    }


async add(req, res){
    const libro = req.body;
    const [result] = await pool.query('INSERT INTO libros(nombre,autor,categoria,anoPublicacion,isbn) VALUES (?,?,?,?,?)', 
        [libro.nombre, 
        libro.autor,
        libro.categoria,
        libro.anoPublicacion,
        libro.isbn]); 
    res.json({"Id insertado": result.insertId});
}

async delete(req, res){
  const libro = req.body;
  const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]);
  res.json({"Registros eliminados":result.affectedRows});
}

async update (req, res){
    const libro = req.body;
    const [result] = await pool.query(`UPDATE  libros SET nombre=(?), autor=(?), anoPublicacion=(?), isbn=(?) WHERE id=(?)`,
         [libro.nombre, 
            libro.autor,
            libro.categoria,
            libro.anoPublicacion,
            libro.isbn]);
    res.json({"Registros Actualizados":result.changedRows});
  }

}

export const libro = new LibroController();