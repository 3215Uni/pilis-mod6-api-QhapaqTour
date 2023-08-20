import { Request, Response } from 'express';
import { Vehiculo } from './../entities/vehiculo.entity'; // Ajusta la ruta hacia tu entidad Vehiculo
import { TIPO_VEHICULOS } from './../utils/vehiculos.enum'; // Ajusta la ruta hacia tu enum


interface VehiculoBody {
  asientos: number;
  tipo: TIPO_VEHICULOS;
  guiaId: number; // Supongo que esta es la forma en que vinculas un vehículo con una guía
}


//el metodo para crear el vehiculo
export const createVehiculo = async (req: Request, res: Response) => {
  try {
    const { asientos, tipo, guiaId }: VehiculoBody = req.body;

    const vehiculo = new Vehiculo();
    vehiculo.asientos = asientos;
    vehiculo.tipo = tipo;

    const guia = await Guia.findOne(guiaId);
    if (!guia) return res.status(404).json({ message: "Guia not found" });

    vehiculo.guia = guia;

    await vehiculo.save();
    return res.json(vehiculo);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//trae todos los elementos
export const getVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculos = await Vehiculo.find();
    return res.json(vehiculos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//traer un objeto
export const getVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findOne(id);

    if (!vehiculo) return res.status(404).json({ message: "Vehiculo not found" });

    return res.json(vehiculo);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//modifica los datos de vehiculo con el id
export const updateVehiculo = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const vehiculo = await Vehiculo.findOne(id, { relations: ["guia"] });
  
      if (!vehiculo) return res.status(404).json({ message: "Vehiculo not found" });
  
      const { asientos, tipo, guiaId }: VehiculoBody = req.body;
  
      vehiculo.asientos = asientos;
      vehiculo.tipo = tipo;
  
      const guia = await Guia.findOne(guiaId);
      if (!guia) return res.status(404).json({ message: "Guia not found" });
  
      vehiculo.guia = guia;
  
      await vehiculo.save();
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  //elimina vehiculo con el id
export const deleteVehiculo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Vehiculo.delete(id);

    if (result.affected === 0)
      return res.status(404).json({ message: "Vehiculo not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
/**pedir ayuda por el tema de guia */