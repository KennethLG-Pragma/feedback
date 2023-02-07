export interface AppScriptResponseDto<T> {
  data: T
  length: number
  status: number
  error?: string
}
