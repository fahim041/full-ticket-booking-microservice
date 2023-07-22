import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthroziedError,
  BadRequestError,
} from '@fasticket/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    //check if ticket exists
    if (!ticket) {
      throw new NotFoundError();
    }

    //check if ticket is owned by the user
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthroziedError();
    }

    // update the ticket
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    res.send({});
  }
);

export { router as updateTicketRouter };
