import { EventEntity } from '../entities/eventEntity'

export interface EventRepository {
  getEvents: () => Promise<EventEntity[] | null>
}
