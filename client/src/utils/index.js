export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        if (img.complete) {
            resolve(true);
        } else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        }
    });
};