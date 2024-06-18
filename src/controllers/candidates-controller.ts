import { Request, Response } from 'express';
import { Candidate } from '../models/candidate';

const candidatesController = {
    index: async (req: Request, res: Response): Promise<void> => {
        try {
            const candidates = await Candidate.findAll();
            res.json(candidates);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    save: async (req: Request, res: Response): Promise<void> => {
        const { name, email, phone } = req.body;

        try {
            const candidate = await Candidate.create({
                name,
                email,
                phone,
            });

            res.status(201).json(candidate);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },

    show: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const candidate = await Candidate.findByPk(id);
            if (!candidate) {
                res.status(404).json({ message: 'Candidate not found' });
                return;
            }
            res.json(candidate);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        try {
            const [affectedRows, candidates] = await Candidate.update(
                {
                    name,
                    email,
                    phone,
                },
                {
                    where: { id },
                    returning: true,
                }
            );

            if (affectedRows === 0) {
                res.status(404).json({ message: 'Candidate not found' });
                return;
            }

            res.json(candidates[0]);
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deletedRowCount = await Candidate.destroy({
                where: { id },
            });

            if (deletedRowCount === 0) {
                res.status(404).json({ message: 'Candidate not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            console.error(error); // Log the error for debugging purposes
            res.status(400).json({ message: error.message });
        }
    },
};

export { candidatesController };