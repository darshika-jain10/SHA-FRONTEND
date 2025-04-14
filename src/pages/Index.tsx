
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, ShieldCheck, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section 1: Hero Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Welcome to Smart Era
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transforming your home with intelligent solutions. Control everything from lights to security with a single touch.
            </p>
          </div>
        </div>
        
        {/* Section 2: Feature Cards */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-white mb-10">Smart Home Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Smart Energy Card */}
            <Card className="bg-blue-800/40 border-blue-700/50 hover:bg-blue-800/60 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Zap size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Energy</h3>
                <p className="text-gray-200">
                  Monitor and optimize your energy consumption in real-time to save costs
                </p>
              </CardContent>
            </Card>
            
            {/* Security Card */}
            <Card className="bg-green-800/40 border-green-700/50 hover:bg-green-800/60 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Home Security</h3>
                <p className="text-gray-200">
                  Advanced security systems with instant alerts and remote monitoring
                </p>
              </CardContent>
            </Card>
            
            {/* Smart Living Card */}
            <Card className="bg-purple-800/40 border-purple-700/50 hover:bg-purple-800/60 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                  <HomeIcon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Living</h3>
                <p className="text-gray-200">
                  Personalize your home experience with automated routines and scenes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
