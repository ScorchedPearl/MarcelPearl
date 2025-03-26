import { useDraggable, useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { ChevronRight, Code2, FileText, GitGraph, MessageSquare, Timer } from 'lucide-react';

const navItems = {
  Problem: { icon: FileText, name: "problem" },
  Constraints: { icon: Timer, name: "constraints" },
  Solutions: { icon: Code2, name: "solution" },
  Submissions: { icon: GitGraph, name: "sampleOutput" },
  Editorial: { icon: MessageSquare, name: "Editorial" }
};

const problemStatement = {
  problem: "Two Sum",
  ProblemDescription: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]"
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]"
    }
  ]
};

export default function ProblemStatement({id,itemId}:{id:string,itemId:number}) {
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: id,
  });
  const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform } = useDraggable({
    id: itemId,
  });
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full m-2"
    >
      {/* <div ref={setDroppableNodeRef} className='h-full w-full'>
        <div   ref={setDraggableNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className='h-full w-full'> */}
      <div className="backdrop-blur-sm bg-black/50 border border-orange-500 rounded-xl overflow-hidden shadow-lg shadow-orange-500/20 max-h-screen overflow-y-auto" >
        <div 
        className="flex items-center border-b border-orange-500 bg-black/70 px-4">
            <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(navItems).map(([key, value], index) => {
              const Icon = value.icon;
              return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-1 px-2 py-3 text-white hover:text-orange-400 transition-colors text-xs"
              >
                <Icon className="w-4 h-4" />
                {key}
                <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                initial={false}
                />
              </motion.button>
              );
            })}
            </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-orange-400" />
              {problemStatement.problem}
            </h1>
            <p className="text-gray-300 leading-relaxed">
              {problemStatement.ProblemDescription}
            </p>
          </motion.div>

          {/* Examples */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-orange-400" />
              Examples
            </h2>
            <div className="space-y-6">
              {problemStatement.examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className="bg-black/50  rounded-lg p-4 backdrop-blur-md shadow-md shadow-orange-500/30"
                >
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <span className="text-orange-400 font-medium">Input:</span>
                      <div className="bg-black/70 border border-orange-500 rounded-md p-3 font-mono text-white shadow-inner shadow-orange-500/10">
                        {example.input}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-orange-400 font-medium">Output:</span>
                      <div className="bg-orange-900/30 border border-orange-500 rounded-md p-3 font-mono text-orange-300 shadow-inner shadow-orange-500/10">
                        {example.output}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </motion.div>
  );
}