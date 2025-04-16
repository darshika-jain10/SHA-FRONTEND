export type ModuleType = "switch" | "temperature" | "gesture" | "smoke"

export interface Module {
  id: string
  type: ModuleType
  name: string
  position: number
  state?: boolean
  value?: number
  unit?: string
  status?: string
  actions?: { gesture: string; action: string }[]
}
