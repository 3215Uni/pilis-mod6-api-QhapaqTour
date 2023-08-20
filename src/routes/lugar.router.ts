import { Router } from 'express';
import { 
   createLugar, 
   getLugares, 
   getLugar, 
   deleteLugar, 
   updateLugar
} from './../controllers/lugar.controller';

const router = Router();

router.post('/lugar', createLugar);
router.get('/lugares', getLugares);
router.get('/lugar/:id', getLugar);
router.put('/lugar/:id', updateLugar);
router.delete('/lugar/:id', deleteLugar);

export default router;
