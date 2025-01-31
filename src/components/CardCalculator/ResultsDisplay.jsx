import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ResultsDisplay = ({ results, selectedMethod }) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]';

  if (!results) return null;

  const formatCurrency = (value) => {
    return value !== undefined && value !== null
      ? `$${Number(value).toFixed(2)}`
      : '$0.00';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className={`${textColor}`}>Expected Value (before fees)</span>
        <span className={`${textColor} font-medium`}>
          {formatCurrency(results.totalEV)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className={`${textColor}`}>Total Costs (Raw + Grading + Shipping)</span>
        <span className={`${textColor} font-medium`}>
          {formatCurrency(results.totalCosts)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className={`${textColor}`}>
          Net Expected Value ({selectedMethod})
        </span>
        <span className={`${textColor} font-medium`}>
          {formatCurrency(results.netEV)}
        </span>
      </div>
    </div>
  );
};

export default ResultsDisplay;