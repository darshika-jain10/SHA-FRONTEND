"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Module } from "@/types/module"
import { Trash2 } from "lucide-react"

interface EditModuleDialogProps {
  module: Module
  isOpen: boolean
  onClose: () => void
  onUpdate: (module: Module) => void
  onDelete: (id: string) => void
}

export function EditModuleDialog({ module, isOpen, onClose, onUpdate, onDelete }: EditModuleDialogProps) {
  const [name, setName] = useState(module.name)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const handleSubmit = () => {
    onUpdate({
      ...module,
      name,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>

          {module.type === "gesture" && (
            <div className="col-span-4">
              <p className="text-sm text-gray-500 mb-2">Gesture actions can be customized in the module settings</p>
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between items-center">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsConfirmingDelete(true)}
            className="flex items-center gap-1"
          >
            <Trash2 size={16} />
            {isConfirmingDelete ? "Confirm Delete" : "Delete"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
