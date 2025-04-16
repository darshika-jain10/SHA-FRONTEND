"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CreateTemplateModal() {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [hardware, setHardware] = useState("ESP32");
  const [connectionType, setConnectionType] = useState("WiFi");
  const [isHardwareOpen, setIsHardwareOpen] = useState(false);
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const hardwareOptions = ["ESP32", "ESP8266", "Raspberry Pi", "Arduino Uno"];
  const connectionOptions = ["WiFi", "Ethernet", "Bluetooth"];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
    setSuccess("");
  };

  const toggleHardwareDropdown = () => {
    setIsHardwareOpen(!isHardwareOpen);
    setIsConnectionOpen(false);
  };

  const toggleConnectionDropdown = () => {
    setIsConnectionOpen(!isConnectionOpen);
    setIsHardwareOpen(false);
  };

  const selectHardware = (option: string) => {
    setHardware(option);
    setIsHardwareOpen(false);
  };

  const selectConnection = (option: string) => {
    setConnectionType(option);
    setIsConnectionOpen(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (name.trim().length === 0) {
      setError("Name is required.");
      return;
    }
    if (name.length > 50) {
      setError("Name cannot exceed 50 characters.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      setIsSaving(false);
      setSuccess("Template saved successfully!");
      setShowModal(false); // close modal after success
      window.location.replace("/DashboardPage"); // redirect to dashboard
    }, 1500);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Template</h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <div className="mb-4">
          <label className="block uppercase text-gray-700 text-sm font-medium mb-2">Name</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              maxLength={50}
              className="w-full border border-gray-300 p-2 focus:outline-none"
              placeholder="Template Name"
            />
            <span className="absolute right-2 top-2 text-gray-400 text-sm">
              {name.length} / 50
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block uppercase text-gray-700 text-sm font-medium mb-2">Hardware</label>
            <div className="relative">
              <button
                onClick={toggleHardwareDropdown}
                className="w-full border border-gray-300 p-2 text-left flex justify-between items-center focus:outline-none"
              >
                {hardware}
                <ChevronDown className="h-4 w-4" />
              </button>

              {isHardwareOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1">
                  {hardwareOptions.map((option) => (
                    <div
                      key={option}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectHardware(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block uppercase text-gray-700 text-sm font-medium mb-2">Connection Type</label>
            <div className="relative">
              <button
                onClick={toggleConnectionDropdown}
                className="w-full border border-gray-300 p-2 text-left flex justify-between items-center focus:outline-none"
              >
                {connectionType}
                <ChevronDown className="h-4 w-4" />
              </button>

              {isConnectionOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1">
                  {connectionOptions.map((option) => (
                    <div
                      key={option}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectConnection(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8 space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
