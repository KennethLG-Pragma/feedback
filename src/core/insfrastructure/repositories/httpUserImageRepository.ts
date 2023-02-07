import axios from 'axios'
import { UserImageEntity } from '../../../core/domain/entities/userImageEntity'
import { UserImageRepository } from '../../../core/domain/repositories/userImageRepository'
import config from '../config'
import { getToken } from '../helpers'

export class HttpUserImageRepository implements UserImageRepository {
  token: string | null = null

  async getUserImages(email: string): Promise<UserImageEntity[] | null> {
    try {
      const {
        BITACORA: { URL }
      } = config
      const url = `${URL}/pdn/pragma/perfil/usuarios/correo?correo=${email}`
      const token = this.token ?? (await getToken())
      if (!token) {
        return null
      }

      this.token = token
      const { status, data } = await axios.get<{
        message: string
        dato: { fotografias: UserImageEntity[] }
      }>(url, {
        headers: {
          Authorization: token,
          identification: token
        }
      })

      if (status !== 200) {
        return null
      }

      return data.dato.fotografias
    } catch (error) {
      return null
    }
  }
}
