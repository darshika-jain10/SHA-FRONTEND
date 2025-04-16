"use client"

import { useState, memo, useCallback } from "react"
import { Thermometer, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Module } from "@/types/module"

interface TemperatureModuleProps {
  module: Module
}

export const TemperatureModule = memo(function TemperatureModule({ module }: TemperatureModuleProps) {
  const [temperature, setTemperature] = useState(module.value as number)
  const [unit, setUnit] = useState(module.unit as string)

  const increaseTemperature = useCallback(() => {
    setTemperature((prev) => prev + 1)
  }, [])

  const decreaseTemperature = useCallback(() => {
    setTemperature((prev) => prev - 1)
  }, [])

  const toggleUnit = useCallback(() => {
    setUnit((prevUnit) => {
      if (prevUnit === "°F") {
        // Convert to Celsius
        const celsius = Math.round(((temperature - 32) * 5) / 9)
        setTemperature(celsius)
        return "°C"
      } else {
        // Convert to Fahrenheit
        const fahrenheit = Math.round((temperature * 9) / 5 + 32)
        setTemperature(fahrenheit)
        return "°F"
      }
    })
  }, [temperature])

  // Determine temperature color
  const getTemperatureColor = () => {
    const temp = unit === "°F" ? temperature : (temperature * 9) / 5 + 32
    if (temp < 65) return "text-blue-500"
    if (temp > 80) return "text-red-500"
    return "text-amber-500"
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center w-full">
        <Thermometer className={`h-6 w-6 mr-2 ${getTemperatureColor()}`} />
        <span className="text-lg font-medium">Current Temperature</span>
      </div>

      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={decreaseTemperature} className="rounded-full">
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div
          className={`mx-4 text-4xl font-bold ${getTemperatureColor()} transition-colors duration-300`}
          onClick={toggleUnit}
        >
          {temperature}
          {unit}
        </div>

        <Button variant="outline" size="icon" onClick={increaseTemperature} className="rounded-full">
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-sm text-gray-500">Tap temperature to change units</div>
    </div>
  )
})
