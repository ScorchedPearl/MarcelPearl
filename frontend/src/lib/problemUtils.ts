import axios from "axios";

export const allProblemFetcher = async () => {
 try {
   const token="Bearer "+localStorage.getItem('__Pearl_Token') || '';
   console.log(token)
   const problem = await axios.get("http://localhost:8080/api/v1/problems", {
     headers: {
       Authorization: token,
     },
   });
   if (problem.status === 200) {
     return problem.data;
   } else {
     console.log("Error fetching user data");
   }
 } catch (error) {
   console.error("Error fetching user data:", error);
 }
};


export const allProblemFetcherByDifficulty = async (difficulty:"Easy"|"Hard"|"Medium") => {
 try {
   const token="Bearer "+localStorage.getItem('__Pearl_Token') || '';
   console.log(token)
   const problem = await axios.get("http://localhost:8080/api/v1/problems/by-difficulty", {
     headers: {
       Authorization: token,
     },
     params:{
      difficulty:difficulty
     }
   });
   if (problem.status === 200) {
     return problem.data;
   } else {
     console.log("Error fetching user data");
   }
 } catch (error) {
   console.error("Error fetching user data:", error);
 }
};


export const allProblemFetcherByTopic = async (topicName:string) => {
 try {
   const token="Bearer "+localStorage.getItem('__Pearl_Token') || '';
   console.log(token)
   const problem = await axios.post("http://localhost:8080/api/v1/problems/by-topic",
    {topicName}, 
    {
     headers: { 
       Authorization: token,
     },
   });
   if (problem.status === 200) {
     return problem.data;
   } else {
     console.log("Error fetching user data");
   }
 } catch (error) {
   console.error("Error fetching user data:", error);
 }
};


export const allProblemFetcherByTopicDifficulty = async (difficulty:"Easy"|"Hard"|"Medium",topic:string) => {
 try {
   const token="Bearer "+localStorage.getItem('__Pearl_Token') || '';
   console.log(token)
   const problem = await axios.post("http://localhost:8080/api/v1//by-topic-and-difficulty",{
    topicName:topic,
   },{
     headers: {
       Authorization: token,
     },
     params:{
      difficulty:difficulty,
     }
   });
   if (problem.status === 200) {
     return problem.data;
   } else {
     console.log("Error fetching user data");
   }
 } catch (error) {
   console.error("Error fetching user data:", error);
 }
};




