import { Request, Response } from 'express';
import { Company } from '../models/company';

const companiesController = {
    index: async (req: Request, res: Response): Promise<void> => {
        try {
            const companies = await Company.findAll();
            res.json(companies);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    save: async (req: Request, res: Response): Promise<void> => {
        const { name, bio, website, email } = req.body;

        try {
            const company = await Company.create({
                name,
                bio,
                website,
                email,
            });

            res.status(201).json(company);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },

    show: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const company = await Company.findByPk(id);
            if (!company) {
                res.status(404).json({ message: 'Company not found' });
                return;
            }
            res.json(company);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, bio, website, email } = req.body;

        try {
            const [affectedRows, companies] = await Company.update(
                {
                    name,
                    bio,
                    website,
                    email,
                },
                {
                    where: { id },
                    returning: true,
                }
            );

            if (affectedRows === 0) {
                res.status(404).json({ message: 'Company not found' });
                return;
            }

            res.json(companies[0]);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deletedRowCount = await Company.destroy({
                where: { id },
            });

            if (deletedRowCount === 0) {
                res.status(404).json({ message: 'Company not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },
};

export { companiesController };