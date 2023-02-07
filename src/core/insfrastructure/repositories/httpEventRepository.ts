import axios from 'axios'
import { EventEntity } from 'src/core/domain/entities/eventEntity'
import { EventRepository } from 'src/core/domain/repositories/eventRepository'
import config from '../config'

export class HttpEventRepository implements EventRepository {
  async getEvents(): Promise<EventEntity[] | null> {
    try {
      const {
        APP_SCRIPT: { API_KEY, URL }
      } = config
      const { data } = await axios({
        method: 'POST',
        url: URL,
        data: {
          API_KEY,
          RESOURCE: 'EVENTS'
        }
      })

      const { status } = data

      if (status !== 200) {
        return null
      }

      return data.data
    } catch (error) {
      return null
    }
  }
}
