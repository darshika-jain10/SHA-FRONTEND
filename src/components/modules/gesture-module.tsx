"use client"

import { useEffect, useRef, useState } from "react"
import { Fingerprint, Hand } from "lucide-react"
import type { Module } from "@/types/module"
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import { Button } from "@/components/ui/button"

interface GestureModuleProps {
  module: Module
}

export function GestureModule({ module }: GestureModuleProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null)
  const [actionTriggered, setActionTriggered] = useState<string | null>(null)
  const [model, setModel] = useState<handpose.HandPose | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load the handpose model
  const loadModel = async () => {
    setIsLoading(true)
    try {
      await tf.ready()
      const loadedModel = await handpose.load()
      setModel(loadedModel)
      setIsLoading(false)
    } catch (error) {
      console.error("Could not load handpose model:", error)
      setIsLoading(false)
    }
  }

  // Start the gesture recognition
  const startGestureRecognition = async () => {
    if (!model) {
      await loadModel()
    }

    if (videoRef.current && navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 300, height: 200 },
        })
        videoRef.current.srcObject = stream
        setIsActive(true)
        // Remove the detectHands() call from here
      } catch (error) {
        console.error("Error accessing camera:", error)
      }
    }
  }

  // Stop the gesture recognition
  const stopGestureRecognition = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsActive(false)
    setDetectedGesture(null)
  }

  // Detect hands and gestures
  const detectHands = async () => {
    if (!model || !videoRef.current || !canvasRef.current || !isActive) return

    try {
      const predictions = await model.estimateHands(videoRef.current)

      if (predictions.length > 0) {
        const hand = predictions[0]
        const landmarks = hand.landmarks

        // Simple gesture detection based on finger positions
        const gesture = detectGesture(landmarks)

        // Only update state if the gesture has changed
        if (gesture !== detectedGesture) {
          setDetectedGesture(gesture)

          // Find matching action
          const matchingAction = module.actions?.find((a) => a.gesture === gesture)
          if (matchingAction) {
            setActionTriggered(matchingAction.action)
            setTimeout(() => setActionTriggered(null), 2000)
          }
        }

        // Draw hand landmarks
        drawHand(landmarks)
      } else {
        clearCanvas()
        if (detectedGesture !== null) {
          setDetectedGesture(null)
        }
      }
    } catch (error) {
      console.error("Error detecting hands:", error)
    }

    if (isActive) {
      // Use requestAnimationFrame for smoother animation and to prevent excessive updates
      requestAnimationFrame(detectHands)
    }
  }

  // Simple gesture detection
  const detectGesture = (landmarks: number[][]) => {
    // Calculate finger positions
    const palmBase = landmarks[0]
    const indexTip = landmarks[8]
    const thumbTip = landmarks[4]

    // Horizontal movement detection
    const horizontalDiff = indexTip[0] - palmBase[0]
    const verticalDiff = indexTip[1] - palmBase[1]

    if (Math.abs(horizontalDiff) > 50 && Math.abs(horizontalDiff) > Math.abs(verticalDiff)) {
      return horizontalDiff > 0 ? "swipe-right" : "swipe-left"
    } else if (Math.abs(verticalDiff) > 50 && Math.abs(verticalDiff) > Math.abs(horizontalDiff)) {
      return verticalDiff > 0 ? "swipe-down" : "swipe-up"
    }

    return null
  }

  // Draw hand landmarks on canvas
  const drawHand = (landmarks: number[][]) => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    clearCanvas()

    // Draw landmarks
    for (let i = 0; i < landmarks.length; i++) {
      const [x, y] = landmarks[i]
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = "#22c55e"
      ctx.fill()
    }

    // Connect landmarks with lines
    ctx.beginPath()
    ctx.moveTo(landmarks[0][0], landmarks[0][1])
    for (let i = 1; i < landmarks.length; i++) {
      ctx.lineTo(landmarks[i][0], landmarks[i][1])
    }
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Clear canvas
  const clearCanvas = () => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  // Clean up on mount
  useEffect(() => {
    // Don't set up animation frame if not active or no model
    if (!isActive || !model) return

    let animationFrameId: number | null = null
    let isDetecting = false

    const runDetection = async () => {
      if (isDetecting) return // Prevent overlapping detections

      isDetecting = true

      if (isActive && model && videoRef.current && canvasRef.current) {
        try {
          const predictions = await model.estimateHands(videoRef.current)

          if (predictions.length > 0) {
            const hand = predictions[0]
            const landmarks = hand.landmarks

            // Simple gesture detection based on finger positions
            const gesture = detectGesture(landmarks)

            // Only update state if the gesture has changed
            if (gesture !== detectedGesture) {
              setDetectedGesture(gesture)

              // Find matching action
              const matchingAction = module.actions?.find((a) => a.gesture === gesture)
              if (matchingAction) {
                setActionTriggered(matchingAction.action)
                // Clear action triggered after 2 seconds
                setTimeout(() => {
                  setActionTriggered(null)
                }, 2000)
              }
            }

            // Draw hand landmarks
            drawHand(landmarks)
          } else {
            clearCanvas()
            if (detectedGesture !== null) {
              setDetectedGesture(null)
            }
          }
        } catch (error) {
          console.error("Error detecting hands:", error)
        }
      }

      isDetecting = false

      // Only request next frame if still active
      if (isActive) {
        animationFrameId = requestAnimationFrame(runDetection)
      }
    }

    // Start the detection loop
    animationFrameId = requestAnimationFrame(runDetection)

    // Clean up function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isActive, model, detectedGesture, module.actions])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        {isActive ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
            <canvas ref={canvasRef} width={300} height={200} className="absolute inset-0 w-full h-full" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Hand className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {isLoading ? "Loading gesture recognition..." : "Gesture recognition inactive"}
            </p>
          </div>
        )}

        {actionTriggered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
              <p className="font-medium">{actionTriggered}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between w-full">
        {detectedGesture && (
          <div className="flex items-center">
            <Fingerprint className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-sm">Detected: {detectedGesture}</span>
          </div>
        )}

        <Button
          variant={isActive ? "destructive" : "default"}
          size="sm"
          onClick={isActive ? stopGestureRecognition : startGestureRecognition}
          className="ml-auto"
        >
          {isLoading ? "Loading..." : isActive ? "Stop Camera" : "Start Camera"}
        </Button>
      </div>

      <div className="w-full">
        <h4 className="text-sm font-medium mb-2">Available Gestures:</h4>
        <div className="text-xs space-y-1">
          {module.actions?.map((action, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium">{action.gesture}</span>
              <span className="text-gray-500">{action.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
