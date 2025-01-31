import React from 'react';

const CardPricesForm = ({ inputs, onInputChange, isDark }) => {
  return (
    <div className="space-y-4">
      <h3 className={`font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Card Prices</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Raw Price ($)</label>
          <input
            type="number"
            value={inputs.rawPrice}
            onChange={(e) => onInputChange('rawPrice', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>PSA 10 Price ($)</label>
          <input
            type="number"
            value={inputs.psa10Price}
            onChange={(e) => onInputChange('psa10Price', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>PSA 9 Price ($)</label>
          <input
            type="number"
            value={inputs.psa9Price}
            onChange={(e) => onInputChange('psa9Price', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>PSA 8 Price ($)</label>
          <input
            type="number"
            value={inputs.psa8Price}
            onChange={(e) => onInputChange('psa8Price', parseFloat(e.target.value))}
            className={`w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
              isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPricesForm;