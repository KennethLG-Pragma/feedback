import { GroupRepository } from 'src/core/domain/repositories/groupRepository'
import { GroupEntity } from '../../domain/entities/groupEntity'

export class GetGroupsUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async invoke(): Promise<GroupEntity[]> {
    const groups = await this.groupRepository.getGroups()
    return groups
  }
}
