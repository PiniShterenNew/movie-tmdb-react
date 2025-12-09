import React from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  }
  
  export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    action,
  }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md">{description}</p>
  
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
        >
          {action.label}
        </button>
      )}
    </div>
  );
  