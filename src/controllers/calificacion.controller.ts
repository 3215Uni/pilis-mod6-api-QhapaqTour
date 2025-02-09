import { Request, Response } from "express";
import { Usuario } from "../entities/usuario.entity";
import { Calificacion } from "../entities/calificacion.entity";
import { Recorrido } from "../entities/recorrido.entity";

// FALTA COMPLETAR EL ABM RECORRIDO PARA PODER USAR ESTÁ PETICIÓN
export const createCalificacion = async (req:Request,res:Response) => {
    try {
        const {note,comentario} = req.body;
        // const recorrido = await Recorrido.findOneOrFail({where: {id: Number(id)}});
        // if(!recorrido)
        //     return res.status(404).json({message: "No se encontro el recorrido"});
        const usuario = await Usuario.findOneOrFail({ where: {id: req.idUser}});
        if(!usuario)
            return res.status(404).json({message:"Usuario no encontrado"});
        const calificacion = Calificacion.create();
        calificacion.note = note;
        calificacion.comentario = comentario;
        calificacion.fecha = new Date(Date.now());
        calificacion.usuario = usuario;
        await calificacion.save();
        res.status(200).json({message: "calificacion guardado"});
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
    }
}

export const deleteCalificacion = async (req: Request, res:Response) => {
    try {
        const id = req.params.id;        
        const usuario = await Usuario.findOne({where: {id: req.idUser}});
        if(!usuario)
            return res.status(404).json({message: "Usuario no encontrado"});
        const calificacion = await Calificacion.findOne({where: {id: Number(id)}});
        
            if(!calificacion)
                return res.status(404).json({message: "Calificacion no encontrada"});
            
                await Calificacion.delete(id);
            
            res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message})
    }
}

// FALTA COMPLETAR EL ABM RECORRIDO PARA PODER USAR ESTÁ PETICIÓN
export const getClasificacionRecorrido = async (req: Request,res: Response) => {
    try {
        const id = req.params.id;
        // const recorrido = await Recorrido.findOneOrFail({where: {id: Number(id)}});
        // if(!recorrido)
        //     return res.status(404).json({message: "No se encontro el recorrido"});
        const calificacion = await Calificacion.createQueryBuilder('clasificacion')
        .where('clasificacion.usuarioId = :usuario',{usuario: id})
        .getMany();

        return res.status(200).json(calificacion)
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}