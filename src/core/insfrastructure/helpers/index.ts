import axios from 'axios'
import config from '../config'

export async function getToken(): Promise<string | null> {
  try {
    const {
      BITACORA: { AUTH_URL, AUTHORIZATION, CLIENT_ID, SCOPE }
    } = config

    const { status, data } = await axios.post<{ token: string }>(AUTH_URL, null, {
      headers: {
        authorization: AUTHORIZATION,
        client_id: CLIENT_ID,
        scope: SCOPE
      }
    })

    if (status !== 200) {
      return null
    }

    return data.token
  } catch (error) {
    return null
  }
}
