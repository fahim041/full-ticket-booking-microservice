import { Publisher, Subjects, TicketUpdatedEvent } from '@fasticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}