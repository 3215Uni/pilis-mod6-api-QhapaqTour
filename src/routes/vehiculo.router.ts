import { Router } from 'express';
import { 
   createVehiculo, 
   deleteVehiculo, 
   getVehiculo, 
   getVehiculos, 
   updateVehiculo
} from './../controllers/vehiculo.controller';

const router = Router();

router.post('/vehiculo', createVehiculo);
router.get('/vehiculo', getVehiculo);
router.get('/vehiculo/:id', getVehiculos);
router.put('/vehiculo/:id', updateVehiculo);
router.delete('/vehiculo/:id', deleteVehiculo);

export default router;
