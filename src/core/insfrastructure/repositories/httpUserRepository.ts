import axios from 'axios'
import config from '../config'
import { UserEntity } from 'src/core/domain/entities/userEntity'
import { UserRepository } from 'src/core/domain/repositories/userRepository'
import { AppScriptResponseDto } from '../dto/appScriptResponseDto'
import { getToken } from '../helpers'

export class HttpUserRepository implements UserRepository {
  async getUserInfo(email: string): Promise<Record<string, unknown> | null> {
    try {
      const {
        BITACORA: { URL }
      } = config
      const url = `${URL}/pdn/pragma/perfil/usuarios/correo?correo=${email}`
      const token = await getToken()

      const { status, data } = await axios.get<{
        message: string
        dato: Record<string, unknown>
      }>(url, {
        headers: {
          Authorization: token,
          identification: token
        }
      })

      if (status !== 200) {
        return null
      }

      return data.dato
    } catch (error) {
      return null
    }
  }

  async getUserByEmail(user: string): Promise<UserEntity | null> {
    const {
      APP_SCRIPT: { API_KEY, URL }
    } = config
    const appUrl = `${URL}?email=${user}`
    const { data } = await axios.post<AppScriptResponseDto<UserEntity>>(appUrl, {
      API_KEY,
      RESOURCE: 'USER'
    })
    const { status } = data

    if (![404, 200].includes(status)) {
      throw new Error('request failed')
    }

    if (status === 404) {
      return null
    }

    return data.data
  }

  async getUsers(
    page: string,
    limit: string,
    user?: string
  ): Promise<{ users: UserEntity[]; length: number } | null> {
    try {
      const {
        APP_SCRIPT: { API_KEY, URL }
      } = config
      const appUrl = `${URL}?&pag=${page}&limit=${limit}${
        user ? '&user='.concat(user) : ''
      }`

      const { data } = await axios<AppScriptResponseDto<UserEntity[]>>({
        method: 'POST',
        url: appUrl,
        data: { API_KEY, RESOURCE: 'USERS' }
      })
      const { status } = data

      if (status !== 200) {
        return null
      }

      return {
        users: data.data,
        length: data.length
      }
    } catch (error) {
      return null
    }
  }

  async getUsersByGroup(
    group: string,
    page: string,
    limit: string,
    user?: string
  ): Promise<{ users: UserEntity[]; length: number } | null> {
    try {
      const {
        APP_SCRIPT: { API_KEY, URL }
      } = config
      const { data } = await axios<AppScriptResponseDto<UserEntity[]>>({
        method: 'POST',
        url: `${URL}?group=${group}&pag=${page}&limit=${limit}${
          user ? '&user=' + user : ''
        }`,
        data: { API_KEY, RESOURCE: 'USERS' }
      })

      const { status } = data
      if (status !== 200) {
        return null
      }

      return {
        users: data.data,
        length: data.length
      }
    } catch (error) {
      return null
    }
  }
}
