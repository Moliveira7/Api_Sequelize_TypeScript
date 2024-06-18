import express from 'express';
import { companiesController } from './controllers/companies-controller';
import { jobsController } from './controllers/jobsController';

const router = express.Router();

// Rota para buscar os Jobs de uma Company específica
router.get('/companies/:companyId/jobs', jobsController.getJobsByCompany);

// Rotas existentes para Companies
router.get('/companies', companiesController.index);
router.post('/companies', companiesController.save);
router.get('/companies/:id', companiesController.show);
router.put('/companies/:id', companiesController.update);
router.delete('/companies/:id', companiesController.delete);

// Rotas existentes para Jobs
router.get('/jobs', jobsController.index);
router.post('/jobs', jobsController.save);
router.get('/jobs/:id', jobsController.show);
router.put('/jobs/:id', jobsController.update);
router.delete('/jobs/:id', jobsController.delete);

export { router };