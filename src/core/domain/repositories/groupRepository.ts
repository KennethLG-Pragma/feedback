import { GroupEntity } from "../entities/groupEntity";

export interface GroupRepository {
    getGroups: () => Promise<GroupEntity[]>
}