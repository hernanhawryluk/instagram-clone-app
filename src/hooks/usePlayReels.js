import { useEffect, useState } from 'react';

const usePlayReels = ({videoRefs, focusedScreen}) => {
    const [isMuted, setMuted] = useState(false);
    const [playingVideo, setPlayingVideo] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [progressBarValue, setProgressBarValue] = useState(0.0);
    const [muteButtonVisible, setMuteButtonVisible] = useState(false);
    
    useEffect(() => {
        if (currentIndex !== null) {
          if (!focusedScreen) {
            setPlayingVideo(false);
            videoRefs.current[currentIndex].pauseAsync();
          } else {
            setPlayingVideo(true);
            videoRefs.current[currentIndex].playAsync();
          }
        } 
      }, [focusedScreen]);
    
    useEffect(() => {
    if (videoRefs.current[currentIndex] !== undefined) {
        const statusInterval = setInterval(() => {
        videoRefs.current[currentIndex].getStatusAsync().then((status) => {
            const positionRatio = (status.positionMillis * 1) / status.durationMillis;
            const clampedValue = Math.min(1, Math.max(0, positionRatio));
            const value = parseFloat(clampedValue.toFixed(3));
            setProgressBarValue(value);
        });
        }, 100);
        return () => clearInterval(statusInterval);
    }
    }, [currentIndex]);

    const handleLongPress = () => {
        if (videoRefs.current[currentIndex]) {
            videoRefs.current[currentIndex].pauseAsync();
        }
    };

    const handlePressOut = () => {
        if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].playAsync();
        }
    };

    const handlePress = () => {
        videoRefs.current[currentIndex].setIsMutedAsync(!isMuted)
        setMuted(!isMuted);
        setMuteButtonVisible(true);
        setTimeout(() => {
        setMuteButtonVisible(false);
        }, 1000);
    };


    return {
        playingVideo,
        setCurrentIndex,
        progressBarValue,
        muteButtonVisible,
        isMuted,
        handleLongPress,
        handlePressOut,
        handlePress
    }
}

export default usePlayReels