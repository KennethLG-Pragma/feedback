import { UserImageEntity } from './userImageEntity'

export enum UserStatus {
  Estudiando = 'Estudiando',
  Onboarding = 'Onboarding',
  Disponible = 'Disponible',
  Presentado = 'Presentado',
  Asignado = 'Asignado',
  Apuesta = 'Apuesta'
}

export interface UserEntity {
  email: string
  id: string
  fullname: string
  capacity: string
  TPEntryDate: string
  status: UserStatus
  images: UserImageEntity[] | null
}
