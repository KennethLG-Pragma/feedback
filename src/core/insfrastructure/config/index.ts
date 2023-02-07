export default {
  COMMENTS_TABLE: process.env.COMMENTS_TABLE ?? '',
  APP_SCRIPT: {
    URL: process.env.APP_SCRIPT_URL ?? '',
    API_KEY: process.env.API_KEY ?? ''
  },
  BITACORA: {
    URL: process.env.BITACORA_URL ?? '',
    AUTH_URL: process.env.BITACORA_AUTH_URL ?? '',
    AUTHORIZATION: process.env.BITACORA_AUTHORIZATION ?? '',
    CLIENT_ID: process.env.CLIENT_ID,
    SCOPE: process.env.SCOPE
  },
  IMAGE_CLOUD: {
    URL: process.env.IMAGE_CLOUD_URL ?? ''
  }
}
