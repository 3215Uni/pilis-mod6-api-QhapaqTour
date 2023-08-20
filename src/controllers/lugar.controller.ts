import { Request, Response } from 'express';
import { Lugar } from './../entities/lugar.entity';
import { REGIONES } from './../utils/regiones.enum';
import { Recorrido } from '../entities/recorrido.entity';
interface LugarBody {
  nombre: string;
  latitud: string;
  longitud: string;
  precio: number;
  regiones: REGIONES;
  url: string;
}


// Definición de las regiones y sus lugares
const regionesYlugares = {
  [REGIONES.PUNA]: [
    "ABRA PAMPA",
    "BARRANCAS (ABDÓN CASTRO TOLAY)",
    "SUSQUES",
    "CABRERIA",
    "SUSQUES",
    "CABRERIA",
    "CASABINDO",
    "COCHINOCA",
    "CUSI CUSI",
    "EL MORENO",
    "LA QUIACA",
    "RINCONADA",
    "RINCONADILLAS",
    "SAN FRANCISCO DE ALFARCITO",
    "SAN JUAN_Y_OROS",
    "SANTA CATALINA",
    "SANTUARIO DE TRES POZOS",
    "SAUSALITO",
    "YAVI",
  ],
    [REGIONES.QUEBRADA]: [
    "ABRA PAMPA",
    "BARRANCAS",
    "SUSQUES",
    "CABRERÍA",
    "CASABINDO",
    "COCHINOCA",
    "CUSI CUSI",
    "EL MORENO",
    "LA QUIACA",
    "RINCONADA",
    "RINCONADILLAS",
    "SAN FRANCISCO DE AFARCITO",
    "SAN JUAN Y OROS",
    "SANTA CATALINA",
    "SANTUARIO DE TRES POZOS",
    "SAUSALITO",
    "YAVI",
  ],
  [REGIONES.VALLE]: [
    "ANGOSTO DE JAIRO",
    "EL CARMEN",
    "SAN SALVADOR DE JUJUY",
    "YALA",    
    "LOZANO",
    "OCLOYAS",
    "PALPALÁ",
    "PERICO",
    "SAN ANTONIO",
    "TIRAXI",
    "VILLA JARDIN DE REYES",    
  ],
  [REGIONES.YUNGA]: [
    "SAN FRANCISCO",
    "VILLAMONTE",
    "CALILEGUA",
    "ECOPORTAL DE PIEDRA",
    "LIBERTADOR GENERAL SAN MARTÍN",
    "PAMPICHUELA",
    "SAN PEDRO DE JUJUY",
    "VALLE GRANDE",
  ],
};

export const createLugar = async (req: Request, res: Response) => {
    try {
      const { nombre, latitud, longitud, precio, regiones, url }: LugarBody = req.body;
  
      const lugar = new Lugar();
      lugar.nombre = nombre;
      lugar.latitud = latitud;
      lugar.longitud = longitud;
      lugar.precio = precio;
      lugar.regiones = regiones;
      lugar.url = url;
  
      // Verificar si la región es válida y existe en el objeto
      if (regionesYlugares[regiones]) {
        const recorridos = regionesYlugares[regiones].map(nombreRecorrido => {
          const recorrido = new Recorrido();
          recorrido.precio = lugar.precio; // Por ejemplo, puedes asignar el mismo precio al recorrido
          // Otras propiedades del recorrido
          recorrido.lugar = lugar; // Asociar el lugar al recorrido
          return recorrido;
        });
        lugar.recorridos = recorridos;
      }
  
      await lugar.save();
      return res.json(lugar);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const getLugares = async (req: Request, res: Response) => {
    try {
      const lugares = await Lugar.find();
      return res.json(lugares);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const getLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;      
      const lugar = await Lugar.findOneBy({ id: parseInt(id) });
      if (!lugar) return res.status(404).json({ message: "Lugar not found" });
  
      return res.json(lugar);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
};


export const updateLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const lugar = await Lugar.findOneBy({ id: parseInt(id) });
  
      if (!lugar) return res.status(404).json({ message: "Lugar not found" });
  
      // Actualizar los datos del lugar según el cuerpo de la solicitud
      const { nombre, latitud, longitud, precio, regiones, url }: LugarBody = req.body;
      lugar.nombre = nombre;
      lugar.latitud = latitud;
      lugar.longitud = longitud;
      lugar.precio = precio;
      lugar.regiones = regiones;
      lugar.url = url;
  
      // No es necesario actualizar los recorridos ya que no estamos creando nuevos recorridos aquí
  
      await lugar.save();
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  


  export const deleteLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await Lugar.delete(id);
  
      if (result.affected === 0)
        return res.status(404).json({ message: "Lugar not found" });
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };