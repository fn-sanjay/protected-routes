import React, { useEffect, useRef } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000, onClose }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleAutoClose = () => {
      if (timerRef.current) {
        onClose();
      }
    };

    timerRef.current = setTimeout(handleAutoClose, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg flex items-center justify-between gap-4 ${typeStyles[type]}`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close Notification"
        className="text-white text-lg font-bold hover:text-gray-300 focus:outline-none"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
