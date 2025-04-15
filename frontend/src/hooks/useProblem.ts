"use client"
import { Problem } from "@/app/providers/problemProvider";
import { allProblemFetcher,allProblemFetcherByDifficulty,allProblemFetcherByTopic,allProblemFetcherByTopicDifficulty } from "@/lib/problemUtils";
import { useEffect, useState } from "react";

export const useProblems=()=>{
 const [problems, setProblems] = useState<Problem[]>([{
  id: "",
  problemName: "",
  problemStatement: "",
  difficuly: "Easy",
  editorial: "",
  hint: "",
 }]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const problems = await allProblemFetcher();
        if (problems) {
          setProblems(problems);
        }
      } catch (error) {
        console.error("Error fetching problems data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProblems();
  }, []);

  return { problems, isLoading };
}

export const useProblemsByDifficulty=(difficulty:"Easy"|"Hard"|"Medium")=>{
 const [problems, setProblems] = useState<Problem[]>([{
  id: "",
  problemName: "",
  problemStatement: "",
  difficuly: "Easy",
  editorial: "",
  hint: "",
 }]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const problems = await allProblemFetcherByDifficulty(difficulty);
        if (problems) {
          setProblems(problems);
        }
      } catch (error) {
        console.error("Error fetching problems data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProblems();
  }, []);

  return { problems, isLoading };
}


export const useProblemsByTopic=(topic:string)=>{
 const [problems, setProblems] = useState<Problem[]>([{
  id: "",
  problemName: "",
  problemStatement: "",
  difficuly: "Easy",
  editorial: "",
  hint: "",
 }]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const problems = await allProblemFetcherByTopic(topic);
        if (problems) {
          setProblems(problems);
        }
      } catch (error) {
        console.error("Error fetching problems data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProblems();
  }, []);

  return { problems, isLoading };
}


export const useProblemsByTopicAndDifficulty=(topic:string,difficulty:"Easy"|"Hard"|"Medium")=>{
 const [problems, setProblems] = useState<Problem[]>([{
  id: "",
  problemName: "",
  problemStatement: "",
  difficuly: "Easy",
  editorial: "",
  hint: "",
 }]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const problems = await allProblemFetcherByTopicDifficulty(difficulty,topic);
        if (problems) {
          setProblems(problems);
        }
      } catch (error) {
        console.error("Error fetching problems data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProblems();
  }, []);

  return { problems, isLoading };
}
