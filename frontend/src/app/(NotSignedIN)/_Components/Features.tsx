"use client"
import { Code, Database, CheckCircle, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
 {
 title: "Curated Problem Set",
 description: "Access 2,000+ coding challenges across 20+ categories, carefully selected to cover all common interview patterns.",
 icon: <Database className="w-6 h-6" />,
 color: "from-cyan-500 to-blue-500",
 },
 {
 title: "Dynamic Layout Code Editor",
 description: "Experience a seamless coding experience with our dynamic layout editor that adapts to your workflow and supports 15+ programming languages.",
 icon: <Code className="w-6 h-6" />,
 color: "from-cyan-500 to-blue-500",
 },
 {
 title: "Detailed Solutions",
 description: "Learn multiple approaches to solve each problem with step-by-step explanations and complexity analysis.",
 icon: <CheckCircle className="w-6 h-6" />,
 color: "from-cyan-500 to-blue-500",
 },
 {
 title: "Progress Tracking",
 description: "Monitor your improvement with detailed statistics and identify areas that need more focus.",
 icon: <Layout className="w-6 h-6" />,
 color: "from-cyan-500 to-blue-500",
 }
];

const Features = () => {
 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.2
   }
  }
 };

 const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
   opacity: 1,
   y: 0,
   transition: {
    duration: 0.5
   }
  }
 };

  return (
  <section className="py-20 relative bg-black/40 backdrop-blur-md">
   <motion.div 
   initial="hidden"
   animate="visible"
   variants={containerVariants}
   className="container mx-auto px-4"
   >
   <motion.div 
   variants={itemVariants}
   className="text-center max-w-3xl mx-auto mb-16 relative z-10"
   >
   <h2 className="text-4xl font-bold mb-4 text-teal-300 glow">
   Everything you need to ace technical interviews
   </h2>
   <p className="text-orange-100 text-lg glow">
   Our platform is designed to help you master data structures, algorithms, and system design concepts that are frequently tested in technical interviews.
   </p>
   </motion.div>

   <div className="relative max-w-4xl mx-auto">
   <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-500/30 via-cyan-500/30 to-white/30">
   </div>
   
   {features.map((feature, index) => (
   <motion.div 
   key={index}
   variants={itemVariants}
   className="flex items-center gap-8 mb-16 relative"
   >
   <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 order-2'}`}>
   <motion.h3 
   whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
   className="text-xl font-semibold mb-2 text-cyan-300 glow"
   >
   {feature.title}
   </motion.h3>
   <p className="text-white glow">{feature.description}</p>
   </div>
   
   <motion.div 
   whileHover={{ scale: 1.2, rotate: 360 }}
   className="absolute left-1/2 transform -translate-x-1/2 z-10"
   >
   <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white`}>
   {feature.icon}
   </div>
   </motion.div>
   
   <div className={`w-1/2 ${index % 2 === 0 ? 'order-2 pl-12' : 'pr-12'}`}>
  <motion.div 
   whileHover={{ y: -5, scale: 1.2 }}
   className="bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-cyan-500/10 border border-teal-500/20 group"
  >
   <div className="h-32 rounded-lg bg-gradient-to-br from-black to-cyan-950/50 flex items-center justify-center overflow-hidden relative">
   <motion.div
    animate={{ opacity: [0.9, 1, 0.9], scale: [0.3] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="text-lg md:text-xl lg:text-2xl text-cyan-400/70 glow p-4 rounded-lg bg-black/40 text-center font-mono tracking-wide"
   >
    {[
    `function twoSum(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (map.has(target - nums[i]))\n      return [map.get(target - nums[i]), i];\n    map.set(nums[i], i);\n  }\n}`,
    `function reverseList(head) {\n  let prev = null;\n  while (head) {\n    [head.next, prev, head] = [prev, head, head.next];\n  }\n  return prev;\n}`,
    `function isValid(s) {\n  let stack = [];\n  for (let char of s) {\n    if (\")]}\".includes(char)) {\n      if (stack.pop() !== {\"(\":\")\", \"[\":\"]\", \"{\":\"}\"}[char])\n        return false;\n    } else stack.push(char);\n  }\n  return !stack.length;\n}`,
    `function binarySearch(arr, target) {\n  let [l, r] = [0, arr.length - 1];\n  while (l <= r) {\n    let m = Math.floor((l + r) / 2);\n    if (arr[m] === target) return m;\n    arr[m] < target ? (l = m + 1) : (r = m - 1);\n  }\n  return -1;\n}`,
    `function mergeTwoLists(l1, l2) {\n  if (!l1 || !l2) return l1 || l2;\n  if (l1.val < l2.val) {\n    l1.next = mergeTwoLists(l1.next, l2);\n    return l1;\n  }\n  l2.next = mergeTwoLists(l1, l2.next);\n  return l2;\n}`,
    `function searchRange(nums, target) {\n  const result = [-1, -1];\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === target) {\n      if (result[0] === -1) result[0] = i;\n      result[1] = i;\n    }\n  }\n  return result;\n}`
    ][index % 6].split('\n').map((line, i) => (
    <span key={i} className="text-cyan-300">{line}</span>
    ))}
   </motion.div>

   <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
    className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-teal-200 to-transparent"
   />
   <motion.div
    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
    className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-200/20 to-transparent"
   />
   </div>
  </motion.div>
  </div>

   </motion.div>
   ))}
   </div>
   </motion.div>
  </section>
  );
 };
 export default Features;