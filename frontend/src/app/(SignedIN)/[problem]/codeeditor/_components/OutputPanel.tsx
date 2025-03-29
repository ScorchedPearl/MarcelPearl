import React, { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Play, Timer, Cpu, LayoutGrid, LineChart, ArrowRight } from "lucide-react";
// import { useDraggable, useDroppable } from "@dnd-kit/core";

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  userOutput?: string;
  status?: "passed" | "failed" | "pending";
  executionTime?: number;
  memoryUsage?: string;
}

interface TestCasesProps {
  className?: string;
}

export default function TestCases({className}: TestCasesProps) {
  //  const { setNodeRef } = useDroppable({
  //     id: id,
  //   });
  const [activeView, setActiveView] = useState<"cases" | "results" | `case-${string}`>("cases");
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: "1",
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
      status: "pending",
    },
    {
      id: "2",
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
      status: "pending",
    },
    {
      id: "3",
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
      status: "pending",
    },
  ]);

  const [results, setResults] = useState({
    totalTests: 3,
    passedTests: 0,
    failedTests: 0,
    averageTime: 0,
    averageMemory: "0MB",
  });

  const runTestCase = (id: string) => {
    const executionTime = Math.random() * 100 + 50;
    const memoryUsage = `${Math.floor(Math.random() * 5 + 1)}MB`;

    setTestCases((prev) =>
      prev.map((tc) =>
        tc.id === id
          ? {
              ...tc,
              userOutput: tc.expectedOutput,
              status: "passed",
              executionTime,
              memoryUsage,
            }
          : tc
      )
    );

    updateResults();
  };

  const runAllTestCases = () => {
    setTestCases((prev) =>
      prev.map((tc) => {
        const executionTime = Math.random() * 100 + 50;
        const memoryUsage = `${Math.floor(Math.random() * 5 + 1)}MB`;
        return {
          ...tc,
          userOutput: tc.expectedOutput,
          status: "passed",
          executionTime,
          memoryUsage,
        };
      })
    );

    updateResults();
  };

  const updateResults = () => {
    // Calculate actual metrics from test cases
    const passedTests = testCases.filter(tc => tc.status === "passed").length;
    const failedTests = testCases.filter(tc => tc.status === "failed").length;
    
    const totalExecutionTime = testCases.reduce((acc, tc) => acc + (tc.executionTime || 0), 0);
    const averageTime = totalExecutionTime / (passedTests || 1);
    
    const totalMemory = testCases.reduce((acc, tc) => {
      const memory = tc.memoryUsage ? parseFloat(tc.memoryUsage) : 0;
      return acc + memory;
    }, 0);
    const averageMemory = `${(totalMemory / (passedTests || 1)).toFixed(1)}MB`;

    setResults({
      totalTests: testCases.length,
      passedTests,
      failedTests,
      averageTime,
      averageMemory,
    });
  };

  // useEffect(() => {
  //   updateResults();
  // }, [testCases]);
  // const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform } = useDraggable({
  //   id: itemId,
  // });

  // const style = transform
  //   ? {
  //       transform: `translate(${transform.x}px, ${transform.y}px)`,
  //     }
  //   : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-4/12 flex flex-col backdrop-blur-md bg-black/40 border border-[#ff9240]/30 rounded-xl overflow-hidden ${className}`}
    >
      {/* <div ref={setNodeRef} className='h-full w-full'>
        <div   ref={setDraggableNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className='h-full w-full'> */}
      {/* Header with Test Controls */}
      <div className="bg-black/40 border-b border-[#ff9240]/20 ">
        <div 
        className="px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/20 rounded-lg ">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("cases")}
                className={`px-3 py-1 rounded-lg flex items-center gap-2 transition-colors ${
                  activeView === "cases"
                  ? "bg-[#ff9240]/20 text-white shadow-[0_0_10px_rgba(255,146,64,0.3)]"
                  : "text-white/50 hover:text-orange"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Test Cases
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("results")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                  activeView === "results"
                  ? "bg-[#ff9240]/20 text-white shadow-[0_0_10px_rgba(255,146,64,0.3)]"
                  : "text-white/50 hover:text-orange"
                }`}
              >
                <LineChart className="w-4 h-4" />
                Results
              </motion.button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={runAllTestCases}
            className="flex items-center gap-2 px-4 py-1 rounded-lg bg-[#ff9240]/10 border border-[#ff9240]/30 text-white hover:bg-[#ff9240]/20 transition-colors"
          >
            <Play className="w-4 h-4" />
            Run All Tests
          </motion.button>
        </div>
      </div>
      {/* Header for Test Cases */}
      <div className="bg-black/30 border-b border-[#ff9240]/20">
        <div className="px-3 py-0.5 flex items-center gap-2 overflow-x-auto">
          {testCases.map((testCase) => (
        <motion.button
          key={testCase.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveView(`case-${testCase.id}`)}
          className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-colors text-xs ${
            activeView === `case-${testCase.id}`
          ? "bg-[#ff9240]/20 text-white shadow-[0_0_10px_rgba(255,146,64,0.3)]"
          : "text-white/50 hover:text-orange"
          }`}
        >
          Test {testCase.id}
          {testCase.status === "passed" && (
            <CheckCircle className="h-3 w-3 text-green-500" />
          )}
          {testCase.status === "failed" && (
            <XCircle className="h-3 w-3 text-red-500" />
          )}
        </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeView === "cases" ? (
        <motion.div
          key="test-cases"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="h-full overflow-y-auto p-1.5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {testCases.map((testCase, index) => (
          <motion.div
            key={testCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-[#ff9240]/20 rounded-lg bg-black/20"
          >
            <div className="flex items-center justify-between bg-black/30 px-3 py-2 border-b border-[#ff9240]/20">
              <div className="text-white/90 font-medium text-sm">
            Test Case {testCase.id}
              </div>
              <div className="flex items-center gap-2">
            {testCase.status === "passed" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
            {testCase.status === "failed" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <XCircle className="h-4 w-4 text-red-500" />
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => runTestCase(testCase.id)}
              className="px-2 py-1 rounded-lg bg-[#ff9240]/10 border border-[#ff9240]/30 text-white hover:bg-[#ff9240]/20 transition-colors flex items-center gap-1 text-xs"
            >
              <Play className="w-3 h-3" />
              Run
            </motion.button>
              </div>
            </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-sm text-white/70 mb-1">Input:</div>
                        <div className="bg-black/30 border border-[#ff9240]/20 rounded-lg p-3 font-mono text-white/90 text-sm">
                          {testCase.input}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-white/70 mb-1">Expected Output:</div>
                        <div className="bg-black/30 border border-[#ff9240]/20 rounded-lg p-3 font-mono text-white/90 text-sm">
                          {testCase.expectedOutput}
                        </div>
                      </div>

                      <AnimatePresence>
                        {testCase.userOutput && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-sm text-white/70 mb-1">Your Output:</div>
                            <div
                              className={`border rounded-lg p-3 font-mono text-sm ${
                                testCase.status === "passed"
                                  ? "bg-green-900/20 border-green-500/30 text-green-400"
                                  : testCase.status === "failed"
                                  ? "bg-red-900/20 border-red-500/30 text-red-400"
                                  : "bg-black/30 border-[#ff9240]/20 text-white/90"
                              }`}
                            >
                              {testCase.userOutput}
                            </div>
                            
                            {testCase.executionTime && testCase.memoryUsage && (
                              <div className="mt-3 flex items-center gap-4 text-xs text-white/70">
                                <div className="flex items-center gap-1">
                                  <Timer className="h-3 w-3" />
                                  {testCase.executionTime.toFixed(2)}ms
                                </div>
                                <div className="flex items-center gap-1">
                                  <Cpu className="h-3 w-3" />
                                  {testCase.memoryUsage}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            ) : activeView.startsWith("case-") ? (
            <motion.div
              key="single-test-case"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto p-4"
            >
              <div className="max-w-2xl mx-auto">
              {testCases
                .filter((testCase) => `case-${testCase.id}` === activeView)
                .map((testCase) => (
                <div key={testCase.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                  <div className="text-white text-lg font-medium">
                    Test Case {testCase.id}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => runTestCase(testCase.id)}
                    className="px-3 py-1 rounded-lg bg-[#ff9240]/10 border border-[#ff9240]/30 text-white hover:bg-[#ff9240]/20 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Run Test
                  </motion.button>
                  </div>
                  
                  <div>
                  <div className="text-xs text-white/70 mb-1">Input:</div>
                  <div className="bg-black/30 border border-[#ff9240]/20 rounded-lg p-3 font-mono text-white/90 text-sm">
                    {testCase.input}
                  </div>
                  </div>
                  
                  <div>
                  <div className="text-xs text-white/70 mb-1">Expected Output:</div>
                  <div className="bg-black/30 border border-[#ff9240]/20 rounded-lg p-3 font-mono text-white/90 text-sm">
                    {testCase.expectedOutput}
                  </div>
                  </div>
                  
                  {testCase.userOutput && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Your Output:</div>
                    <div
                    className={`border rounded-lg p-3 font-mono text-sm ${
                      testCase.status === "passed"
                      ? "bg-green-900/20 border-green-500/30 text-green-400"
                      : testCase.status === "failed"
                      ? "bg-red-900/20 border-red-500/30 text-red-400"
                      : "bg-black/30 border-[#ff9240]/20 text-white/90"
                    }`}
                    >
                    {testCase.userOutput}
                    </div>
                    
                    {testCase.executionTime && testCase.memoryUsage && (
                    <div className="mt-3 flex items-center gap-6 text-xs text-white/70">
                      <div className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      <span>{testCase.executionTime.toFixed(2)}ms</span>
                      </div>
                      <div className="flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      <span>{testCase.memoryUsage}</span>
                      </div>
                    </div>
                    )}
                  </div>
                  )}
                  
                  {testCase.status === "passed" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mt-3 flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-400 font-medium text-sm">Test passed successfully!</span>
                  </motion.div>
                  )}
                  
                  {testCase.status === "failed" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mt-3 flex items-center gap-3"
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-400 font-medium text-sm">Test failed! Expected output does not match actual output.</span>
                  </motion.div>
                  )}
                </div>
                ))}
              </div>
            </motion.div>
            ) : (
            <motion.div
              key="test-results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto p-4"
            >
              <div className="max-w-2xl mx-auto space-y-5">
              <div className="text-white text-lg font-medium">Test Results</div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="backdrop-blur-md bg-black/40 border border-[#ff9240]/40 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="text-white/70 text-xs mb-1">Total Tests</div>
                <div className="text-white text-xl font-semibold">{results.totalTests}</div>
                </div>
                
                <div className="backdrop-blur-md bg-black/40 border border-[#ff9240]/40 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="text-green-400/70 text-xs mb-1">Passed</div>
                <div className="text-green-400 text-xl font-semibold">{results.passedTests}</div>
                </div>
                
                <div className="backdrop-blur-md bg-black/40 border border-[#ff9240]/40 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="text-red-400/70 text-xs mb-1">Failed</div>
                <div className="text-red-400 text-xl font-semibold">{results.failedTests}</div>
                </div>
                
                <div className="backdrop-blur-md bg-black/40 border border-[#ff9240]/40 rounded-xl p-3 flex flex-col items-center justify-center">
                <div className="text-white/70 text-xs mb-1">Success Rate</div>
                <div className="text-white text-xl font-semibold">
                  {results.totalTests > 0 
                  ? `${Math.round((results.passedTests / results.totalTests) * 100)}%` 
                  : "0%"}
                </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="backdrop-blur-md bg-black/40 border border-[#ff9240]/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Timer className="h-4 w-4 text-white/70" />
                  <span className="text-white/90 font-medium text-sm">Performance</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Average Execution Time</span>
                    <span className="text-white">{results.averageTime.toFixed(2)}ms</span>
                  </div>
                  <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, results.averageTime / 2)}%` }}
                    className="h-full bg-[#ff9240] rounded-full"
                    />
                  </div>
                  </div>
                  
                  <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Average Memory Usage</span>
                    <span className="text-white">{results.averageMemory}</span>
                  </div>
                  <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, parseFloat(results.averageMemory) * 20)}%` }}
                    className="h-full bg-[#ff9240] rounded-full"
                    />
                  </div>
                  </div>
                </div>
                </div>
                
                <div className="backdrop-blur-md bg-black/40 border border-[#ff9240]/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <LineChart className="h-4 w-4 text-white/70" />
                  <span className="text-white/90 font-medium text-sm">Test Details</span>
                </div>
                
                <div className="space-y-2">
                  {testCases.map((testCase) => (
                  <motion.div
                    key={testCase.id}
                    whileHover={{ x: 2 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-black/20 cursor-pointer"
                    onClick={() => setActiveView(`case-${testCase.id}`)}
                  >
                    <div className="flex items-center gap-2">
                    {testCase.status === "passed" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : testCase.status === "failed" ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-[#ff9240]/30 animate-pulse-gentle" />
                    )}
                    <span className="text-white/90 text-sm">Test Case {testCase.id}</span>
                    </div>
                    <div className="flex items-center text-xs text-white/60">
                    {testCase.executionTime && <span>{testCase.executionTime.toFixed(1)}ms</span>}
                    <ArrowRight className="h-3 w-3 ml-2" />
                    </div>
                  </motion.div>
                  ))}
                </div>
                </div>
              </div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* </div>
        </div> */}
      </motion.div>
  );
};

