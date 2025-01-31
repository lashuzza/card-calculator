import React from 'react';

const GradeProbabilitiesForm = ({ inputs, onInputChange, isDark }) => {
  return (
    <div className="space-y-4">
      <h3 className={`font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Grade Probabilities</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Grading Fee ($)</label>
          <input
            type="number"
            value={inputs.gradingFee}
            onChange={(e) => onInputChange('gradingFee', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>PSA 10 Rate (%)</label>
          <input
            type="number"
            value={inputs.psa10Rate}
            onChange={(e) => onInputChange('psa10Rate', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>PSA 9 Rate (%)</label>
          <input
            type="number"
            value={inputs.psa9Rate}
            onChange={(e) => onInputChange('psa9Rate', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>PSA 8 Rate (%)</label>
          <input
            type="number"
            value={inputs.psa8Rate}
            onChange={(e) => onInputChange('psa8Rate', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default GradeProbabilitiesForm;