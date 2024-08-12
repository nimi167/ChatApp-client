// src/utils/messageUtils.js
import dayjs from 'dayjs';

export const formatDate = (date) => {
  const today = dayjs().startOf('day');
  const messageDate = dayjs(date).startOf('day');
  if (messageDate.isSame(today, 'day')) return 'Today';
  return messageDate.format('DD MMMM YYYY');
};

export const groupMessagesByDate = (messages) => {
  return messages.reduce((acc, msg) => {
    const date = dayjs(msg.timestamp).startOf('day').format('YYYY-MM-DD');
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});
};
