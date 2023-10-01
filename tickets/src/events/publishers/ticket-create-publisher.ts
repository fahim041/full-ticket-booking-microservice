import { Publisher, Subjects, TicketCreatedEvent } from '@fasticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;

}