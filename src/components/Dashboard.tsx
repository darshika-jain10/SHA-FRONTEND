"use client"

import { useState } from "react"
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd"
import { PlusCircle, Settings, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModuleCard } from "@/components/module-card"
import { AddModuleDialog } from "@/components/add-module-dialog"
import { EditModuleDialog } from "@/components/edit-module-dialog"
import { useLocalStorage } from "@/hooks/use-local-storage"

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


export default function Dashboard() {
  const [modules, setModules] = useLocalStorage<Module[]>("dashboard-modules", [
    {
      id: "switch-1",
      type: "switch",
      name: "Living Room Light",
      state: false,
      position: 0,
    },
    {
      id: "temperature-1",
      type: "temperature",
      name: "Living Room Temperature",
      value: 72,
      unit: "°F",
      position: 1,
    },
    {
      id: "gesture-1",
      type: "gesture",
      name: "Gesture Control",
      actions: [
        { gesture: "swipe-left", action: "Turn Off All Lights" },
        { gesture: "swipe-right", action: "Turn On All Lights" },
        { gesture: "swipe-up", action: "Increase Temperature" },
        { gesture: "swipe-down", action: "Decrease Temperature" },
      ],
      position: 2,
    },
    {
      id: "smoke-1",
      type: "smoke",
      name: "Smoke Detector",
      status: "clear",
      position: 3,
    },
  ])

  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(modules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      position: index,
    }))

    setModules(updatedItems)
  }

  const handleModuleStateChange = (id: string, newState: any) => {
    // Use functional update to avoid stale state issues
    setModules((prevModules) => {
      // Check if the state is actually different to avoid unnecessary updates
      const moduleToUpdate = prevModules.find((module) => module.id === id)
      if (moduleToUpdate && JSON.stringify(moduleToUpdate.state) === JSON.stringify(newState)) {
        return prevModules // No change needed
      }

      return prevModules.map((module) => (module.id === id ? { ...module, state: newState } : module))
    })
  }

  const handleAddModule = (moduleType: ModuleType) => {
    const newId = `${moduleType}-${modules.length + 1}`
    let newModule: Module

    switch (moduleType) {
      case "switch":
        newModule = {
          id: newId,
          type: "switch",
          name: "New Switch",
          state: false,
          position: modules.length,
        }
        break
      case "temperature":
        newModule = {
          id: newId,
          type: "temperature",
          name: "New Temperature Sensor",
          value: 70,
          unit: "°F",
          position: modules.length,
        }
        break
      case "gesture":
        newModule = {
          id: newId,
          type: "gesture",
          name: "New Gesture Control",
          actions: [
            { gesture: "swipe-left", action: "Custom Action 1" },
            { gesture: "swipe-right", action: "Custom Action 2" },
          ],
          position: modules.length,
        }
        break
      case "smoke":
        newModule = {
          id: newId,
          type: "smoke",
          name: "New Smoke Detector",
          status: "clear",
          position: modules.length,
        }
        break
    }

    setModules([...modules, newModule])
    setIsAddModuleOpen(false)
  }

  const handleEditModule = (module: Module) => {
    setEditingModule(module)
  }

  const handleUpdateModule = (updatedModule: Module) => {
    setModules(modules.map((module) => (module.id === updatedModule.id ? updatedModule : module)))
    setEditingModule(null)
  }

  const handleDeleteModule = (id: string) => {
    setModules(modules.filter((module) => module.id !== id))
    setEditingModule(null)
  }

  // Sort modules by position
  const sortedModules = [...modules].sort((a, b) => a.position - b.position)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Smart Home Dashboard</h1>
        <div className="flex gap-2">
          {isEditMode ? (
            <Button variant="default" onClick={() => setIsEditMode(false)} className="flex items-center gap-2">
              <Save size={18} />
              Save Layout
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditMode(true)} className="flex items-center gap-2">
              <Settings size={18} />
              Edit Dashboard
            </Button>
          )}
          {isEditMode && (
            <Button onClick={() => setIsAddModuleOpen(true)} className="flex items-center gap-2">
              <PlusCircle size={18} />
              Add Module
            </Button>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sortedModules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  isEditMode={isEditMode}
                  onStateChange={handleModuleStateChange}
                  onEdit={handleEditModule}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddModuleDialog
        isOpen={isAddModuleOpen}
        onClose={() => setIsAddModuleOpen(false)}
        onAddModule={handleAddModule}
      />

      {editingModule && (
        <EditModuleDialog
          module={editingModule}
          isOpen={!!editingModule}
          onClose={() => setEditingModule(null)}
          onUpdate={handleUpdateModule}
          onDelete={handleDeleteModule}
        />
      )}
    </div>
  )
}
