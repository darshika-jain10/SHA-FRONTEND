"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Module } from "@/types/module"

interface SwitchModuleProps {
  module: Module
  onStateChange: (newState: boolean) => void
}

export function SwitchModule({ module, onStateChange }: SwitchModuleProps) {
  const [isOn, setIsOn] = useState(module.state as boolean)

  const handleToggle = (checked: boolean) => {
    setIsOn(checked)
    onStateChange(checked)
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor={`switch-${module.id}`} className="text-base">
          Status
        </Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`switch-${module.id}`} className="text-sm text-gray-500">
            {isOn ? "ON" : "OFF"}
          </Label>
          <Switch id={`switch-${module.id}`} checked={isOn} onCheckedChange={handleToggle} />
        </div>
      </div>
      <div className="h-24 flex items-center justify-center">
        <div
          className={`w-20 h-20 rounded-full transition-all duration-500 flex items-center justify-center ${
            isOn ? "bg-amber-100 text-amber-600 shadow-lg shadow-amber-100" : "bg-gray-200 text-gray-400"
          }`}
        >
          <span className="text-4xl">{isOn ? "🔆" : "⚪"}</span>
        </div>
      </div>
    </div>
  )
}
