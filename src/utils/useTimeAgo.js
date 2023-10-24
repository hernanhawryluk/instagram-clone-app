const useTimeAgo = () => {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const timeAgo = (fullSeconds) => {
        const currentTime = new Date().getTime() / 1000;
        const seconds = (fullSeconds - currentTime) * -1;

        if (seconds < 60) return `${Math.floor(seconds)}s`;

        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}m`;

        const hours = seconds / 3600;
        if (hours < 24) return `${Math.floor(hours)}h`;

        const days = seconds / 86400;
        if (days < 7) return `${Math.floor(days)}d`;

        const weeks = seconds / 604800;
        return `${Math.floor(weeks)}w`;
      };

      const timeAgoLong = (fullSeconds) => {
        const currentTime = new Date().getTime() / 1000;
        const seconds = (fullSeconds - currentTime) * -1;

        if (seconds < 60) return `${Math.floor(seconds)} seconds ago`;

        const minutes = seconds / 60;
        if (minutes < 2) return `${Math.floor(minutes)} minute ago`;
        if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;

        const hours = seconds / 3600;
        if (hours < 2) return `${Math.floor(hours)} hour ago`;
        if (hours < 24) return `${Math.floor(hours)} hours ago`;

        const days = seconds / 86400;
        if (days < 2) return `${Math.floor(days)} day ago`;
        if (days < 7) return `${Math.floor(days)} days ago`;

        const weeks = seconds / 604800;
        if (weeks < 2) return `${Math.floor(weeks)} week ago`;
        if (weeks < 4) return `${Math.floor(weeks)} weeks ago`;

        const date = new Date(fullSeconds * 1000);
        const day = date.getDate();
        const month = monthNames[date.getMonth()];

        return `${month} ${day}`;
      };
      
    return { timeAgo, timeAgoLong }
}

export default useTimeAgo