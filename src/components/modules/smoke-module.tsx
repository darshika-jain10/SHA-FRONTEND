"use client"

import { useState, useEffect, useRef } from "react"
import { AlertTriangle, CheckCircle } from "lucide-react"
import type { Module } from "@/types/module"

interface SmokeModuleProps {
  module: Module
}

export function SmokeModule({ module }: SmokeModuleProps) {
  const [status, setStatus] = useState(module.status as string)
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  )

  // Use refs to avoid state updates triggering re-renders
  const statusRef = useRef(module.status as string)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update the ref when state changes
  useEffect(() => {
    statusRef.current = status
  }, [status])

  // Simulate random smoke detection for demo purposes
  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

    // Set up interval for random smoke detection
    intervalRef.current = setInterval(() => {
      // 10% chance of smoke detection
      if (Math.random() < 0.1 && statusRef.current !== "detected") {
        setStatus("detected")
        setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

        // Clear after 5 seconds
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setStatus("clear")
          setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        }, 5000)
      }
    }, 15000)

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`w-full h-32 rounded-lg flex flex-col items-center justify-center transition-all duration-500 ${
          status === "detected" ? "bg-red-100 dark:bg-red-900/30 animate-pulse" : "bg-green-100 dark:bg-green-900/30"
        }`}
      >
        {status === "detected" ? (
          <>
            <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
            <p className="font-bold text-red-600 dark:text-red-400">SMOKE DETECTED!</p>
          </>
        ) : (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <p className="font-medium text-green-600 dark:text-green-400">All Clear</p>
          </>
        )}
      </div>

      <div className="w-full flex justify-between text-sm">
        <span className="text-gray-500">Last checked:</span>
        <span className="font-medium">{currentTime}</span>
      </div>

      <div className="w-full text-xs text-gray-500">
        {status === "detected"
          ? "Alert: Smoke has been detected. Please check your home immediately."
          : "No smoke detected. Your home is safe."}
      </div>
    </div>
  )
}
