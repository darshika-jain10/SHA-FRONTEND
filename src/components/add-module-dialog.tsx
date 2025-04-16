"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ModuleType } from "@/types/module"
import { Thermometer, ToggleLeft, Hand, AlertTriangle } from "lucide-react"

interface AddModuleDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddModule: (moduleType: ModuleType) => void
}

export function AddModuleDialog({ isOpen, onClose, onAddModule }: AddModuleDialogProps) {
  const moduleTypes: { type: ModuleType; name: string; icon: any; description: string }[] = [
    {
      type: "switch",
      name: "Switch Control",
      icon: ToggleLeft,
      description: "Toggle lights, fans, and other appliances on/off",
    },
    {
      type: "temperature",
      name: "Temperature Display",
      icon: Thermometer,
      description: "Show current room temperature with thermostat control",
    },
    {
      type: "gesture",
      name: "Gesture Control",
      icon: Hand,
      description: "Control your home with hand gestures",
    },
    {
      type: "smoke",
      name: "Smoke Detection",
      icon: AlertTriangle,
      description: "Real-time smoke status alerts and warnings",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Module</DialogTitle>
          <DialogDescription>Select a module type to add to your dashboard</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {moduleTypes.map((module) => (
            <Button
              key={module.type}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => onAddModule(module.type)}
            >
              <module.icon className="h-8 w-8 mb-2" />
              <span className="font-medium">{module.name}</span>
              <span className="text-xs text-gray-500 text-center mt-1">{module.description}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
