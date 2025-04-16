"use client"
import { Draggable } from "@hello-pangea/dnd"
import { Edit, Grip } from "lucide-react"
import { memo } from "react"


import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

import { SmokeModule } from "./modules/smoke-module"
import { GestureModule } from "./modules/gesture-module"
import { TemperatureModule } from "./modules/temperature-module"
import { SwitchModule } from "./modules/switch-module"
import { Button } from "./ui/button"


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


interface ModuleCardProps {
  module: Module
  index: number
  isEditMode: boolean
  onStateChange: (id: string, newState: any) => void
  onEdit: (module: Module) => void
}

export const ModuleCard = memo(function ModuleCard({
  module,
  index,
  isEditMode,
  onStateChange,
  onEdit,
}: ModuleCardProps) {
  const renderModuleContent = () => {
    switch (module.type) {
      case "switch":
        return <SwitchModule module={module} onStateChange={(newState) => onStateChange(module.id, newState)} />
      case "temperature":
        return <TemperatureModule module={module} />
      case "gesture":
        return <GestureModule module={module} />
      case "smoke":
        return <SmokeModule module={module} />
      default:
        return <div>Unknown module type</div>
    }
  }

  return (
    <Draggable draggableId={module.id} index={index} isDragDisabled={!isEditMode}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="transition-all duration-300 hover:shadow-lg"
        >
          <Card className="h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <div className="flex items-center gap-2">
                {isEditMode && (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(module)} className="h-8 w-8">
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <div {...provided.dragHandleProps} className="cursor-grab">
                      <Grip size={16} />
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>{renderModuleContent()}</CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
})
