const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};

const dateFind = (dbDate) => {
  if (!dbDate) {
    return 'Just Now';
  }

  const currentDate = new Date();
  const messageDate = new Date(dbDate);

  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return { day: 'Today', time: formatTime(messageDate) };
  }

  const timeDifference = currentDate - messageDate;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (days === 1) {
    return { day: 'Yesterday', time: formatTime(messageDate) };
  }

  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  return { day: messageDate.toLocaleDateString('en-US', { weekday: 'long' }), time: formatTime(messageDate) };
};

export default dateFind;
