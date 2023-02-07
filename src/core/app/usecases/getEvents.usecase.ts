import { EventEntity } from 'src/core/domain/entities/eventEntity'
import { EventRepository } from 'src/core/domain/repositories/eventRepository'

export class GetEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async invoke(): Promise<EventEntity[]> {
    const result = await this.eventRepository.getEvents()

    if (!result) {
      throw new Error('could not send a request')
    }

    return result
  }
}
