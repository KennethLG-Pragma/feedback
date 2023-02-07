import axios from 'axios'
import { GroupEntity } from 'src/core/domain/entities/groupEntity'
import { GroupRepository } from 'src/core/domain/repositories/groupRepository'
import config from '../config'
import { AppScriptResponseDto } from '../dto/appScriptResponseDto'

export class HttpGroupRepository implements GroupRepository {
  async getGroups(): Promise<GroupEntity[]> {
    const {
      APP_SCRIPT: { API_KEY, URL }
    } = config
    const { data } = await axios.post<AppScriptResponseDto<GroupEntity[]>>(URL, {
      RESOURCE: 'GROUPS',
      API_KEY
    })
    const { status, error } = data

    if (status !== 200) {
      throw new Error(error)
    }

    return data.data
  }
}
