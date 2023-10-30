import { useState, useEffect } from "react";

const useProgressBarTimer = ({stories, navigation}) => {
  const [intervalId, setIntervalId] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [resumeProgress, setResumeProgress] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    
    useEffect(() => {
        progressBarTimer(0);
        return () => clearInterval(intervalId);
    }, [currentStoryIndex])
    
    const nextStory = () => {
        clearInterval(intervalId);
        if (currentStoryIndex < stories.length -1) {
          setCurrentStoryIndex(prevCurrentStoryIndex => prevCurrentStoryIndex + 1);
          setProgressBar(0);
        } else {
          setTimeout(() => {
            navigation.goBack();
          }, 50)
        }
      };
    
      const handlePause = () => {
        setResumeProgress(progressBar);
        clearInterval(intervalId);
      };
    
      const handleResume = () => {
        progressBarTimer(resumeProgress);
      };
    
      const progressBarTimer = () => {
        const id = setInterval(() => {
          setProgressBar((lastProgressBar) => {
            if (lastProgressBar > 1) {
              clearInterval(id);
              nextStory();
              return 0;
            } else {
              return lastProgressBar + 0.01;
            }
          });
        }, 100);
    
        setIntervalId(id);
      };

      return { 
        progressBarTimer,
        handleResume, 
        handlePause, 
        nextStory, 
        currentStoryIndex, 
        progressBar
      }
}

export default useProgressBarTimer