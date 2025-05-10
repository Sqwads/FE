import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

interface DeadlineAlertProps {
  daysLeft: number;
  onClose: () => void;
  projectName?: string; // Optional: to make the message more specific
}

const DeadlineAlert: React.FC<DeadlineAlertProps> = ({ daysLeft, onClose, projectName }) => {
  if (daysLeft < 0) return null; // Or handle overdue differently

  let message = `Your project is due in ${daysLeft} day${daysLeft === 1 ? '' : 's'}. Kindly review and finalize tasks to stay on track.`;
  if (projectName) {
    message = `The project "${projectName}" is due in ${daysLeft} day${daysLeft === 1 ? '' : 's'}. Kindly review and finalize tasks to stay on track.`;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-md rounded-md relative max-w-sm w-full">
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertTriangle className="h-6 w-6 text-yellow-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-yellow-800">Upcoming Deadline Alert!</p>
          <p className="text-sm text-yellow-700 mt-1">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex bg-yellow-50 rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
            >
              <span className="sr-only">Dismiss</span>
              <FiX className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineAlert;

