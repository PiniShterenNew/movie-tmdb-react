import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  error: unknown;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) {
      const msg = err.message;

      if (msg.includes("401")) return "בעיית הרשאה — בדוק את הגדרות ה־API.";
      if (msg.includes("429")) return "יותר מדי בקשות — נסה שוב בעוד כמה רגעים.";
      if (msg.includes("Network Error")) return "אין חיבור לאינטרנט או שהשרת לא מגיב.";
      
      return "משהו השתבש — נסה שוב מאוחר יותר.";
    }

    return "שגיאה לא ידועה.";
  };

  return (
    <div className="bg-red-900/30 border border-red-500/20 rounded-xl p-6 text-center space-y-4">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
      <h3 className="text-xl font-bold text-red-300">אופס! משהו השתבש</h3>
      <p className="text-red-200">{getErrorMessage(error)}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
        >
          נסה שוב
        </button>
      )}
    </div>
  );
};
