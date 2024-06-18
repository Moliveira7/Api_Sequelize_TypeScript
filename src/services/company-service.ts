// src/services/company-service.ts

import { Company } from '../models';
import { Job } from '../models';

export async function getJobsByCompany(companyId: number) {
  try {
    const company = await Company.findByPk(companyId, {
      include: Job, // Inclui os trabalhos associados à empresa
    });

    if (!company) {
      throw new Error(`Empresa com ID ${companyId} não encontrada.`);
    }

    return company.jobs; // Retorna os trabalhos associados à empresa
  } catch (error) {
    console.error(`Erro ao buscar os trabalhos da empresa ${companyId}:`, error);
    throw error; // Lança o erro para ser tratado em um nível superior
  }
}