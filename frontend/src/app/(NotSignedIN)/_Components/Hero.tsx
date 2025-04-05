"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const codeSample = `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`;

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const codeEditorVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const floatingBadgeVariants = {
   initial: { y: 0 },
   animate: {
    y: [0, -7, 0],
    transition: {
     duration: 2,
     repeat: Infinity,
     ease: "easeInOut"
    }
   }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-28 pb-20 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
           <motion.div
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ duration: 0.6 }}
             className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500 to-teal-500/20 text-white-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
           >
             Master Coding Skills
           </motion.div>
           
           <motion.h1
             variants={itemVariants}
             className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-cyan-200"
           >
             Practice coding challenges.
             <br />
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-gray-200">
            Ace your interviews.
             </span>
           </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-2 text-sm text-gray-400"
            >
              Created by Vishwas and Saumya.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-700 hover:to-teal-800 flex items-center gap-2 text-base py-6 px-8 shadow-lg hover:shadow-teal-500/20 transform hover:scale-105 transition-all duration-300"
                >
                  Get started for free
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  className="bg-black/80 backdrop-blur-sm text-base py-6 px-8 border-teal-200 hover:bg-black hover:border-teal-300 flex items-center gap-2"
                >
                  <Play size={18} />
                  Watch how it works
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4"
            >
              <motion.div 
                className="flex -space-x-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&auto=format&crop=faces&fit=crop",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&auto=format&crop=faces&fit=crop",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&auto=format&crop=faces&fit=crop"
                ].map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-black object-cover"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="text-sm text-gray-300"
              >
                <span className="font-semibold text-cyan-500">2,000+</span> people joined this week
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/10 rounded-full"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-black/10 rounded-full"
            />

            <motion.div
              variants={codeEditorVariants}
              animate={isHovered ? "hover" : "idle"}
              className="relative p-1 bg-gradient-to-tr from-orange-100 to-black rounded-xl shadow-xl overflow-hidden backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-teal-900 to-black rounded-lg p-4 overflow-hidden">
                <div className="flex items-center gap-1.5 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-red-500"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-yellow-500"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-green-500"
                  />
                  <div className="ml-2 text-xs text-gray-400 font-mono">twoSum.js</div>
                </div>
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white text-sm font-mono overflow-x-auto"
                >
                  <code>{codeSample}</code>
                </motion.pre>
              </div>
            </motion.div>

            <motion.div
              variants={floatingBadgeVariants}
              initial="initial"
              animate="animate"
              className="absolute -right-4 bottom-16 glass rounded-lg px-4 py-2 shadow-lg border border-white/20 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="h-8 w-8 bg-cyan-100 rounded-full flex items-center justify-center text-teal-600"
                >
                  ✓
                </motion.div>
                <div>
                  <p className="text-xs font-semibold">Problem Solved!</p>
                  <p className="text-xs text-gray-500">Runtime: 56ms (faster than 96%)</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;