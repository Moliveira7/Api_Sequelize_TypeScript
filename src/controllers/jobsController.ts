import { Request, Response } from 'express';
import { Job } from '../models';

// Definindo um tipo genérico para os parâmetros da requisição
type ReqParams = Record<string, any>;

// Definindo um tipo genérico para os dados da resposta
interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export const jobsController = {
  index: async (req: Request<ReqParams, ApiResponse<Job[]>>, res: Response<ApiResponse<Job[]>>) => {
    try {
      const jobs = await Job.findAll();
      res.json({ status: 200, data: jobs });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: 400, message: error.message });
      } else {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
    }
  },

  save: async (req: Request<ReqParams, ApiResponse<Job>>, res: Response<ApiResponse<Job>>) => {
    // Implementar a lógica para salvar um Job
  },

  show: async (req: Request<{ id: string }, ApiResponse<Job>>, res: Response<ApiResponse<Job>>) => {
    const { id } = req.params;
    try {
      const job = await Job.findByPk(id);
      if (!job) {
        res.status(404).json({ status: 404, message: 'Job not found' });
      } else {
        res.json({ status: 200, data: job });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: 400, message: error.message });
      } else {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
    }
  },

  update: async (req: Request<{ id: string }, ApiResponse<Job>>, res: Response<ApiResponse<Job>>) => {
    const { id } = req.params;
    try {
      const [affectedRows, updatedJobs] = await Job.update(req.body, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0 || !updatedJobs?.[0]) {
        res.status(404).json({ status: 404, message: 'Job not found' });
      } else {
        res.json({ status: 200, data: updatedJobs[0] });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: 400, message: error.message });
      } else {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
    }
  },

  delete: async (req: Request<{ id: string }, ApiResponse<void>>, res: Response<ApiResponse<void>>) => {
    const { id } = req.params;
    try {
      const deletedCount = await Job.destroy({ where: { id } });
      if (deletedCount === 0) {
        res.status(404).json({ status: 404, message: 'Job not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: 400, message: error.message });
      } else {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
    }
  },

  getJobsByCompany: async (req: Request<{ companyId: string }, ApiResponse<Job[]>>, res: Response<ApiResponse<Job[]>>) => {
    const { companyId } = req.params;
    try {
      const jobs = await Job.findAll({ where: { companyId } });
      res.json({ status: 200, data: jobs });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ status: 400, message: error.message });
      } else {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
    }
  },
};