import React from 'react';

const SellingMethodsForm = ({ inputs, onInputChange, isDark }) => {
  return (
    <div>
      <h3 className={`font-medium mb-3 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Fee Structure</h3>
      <div className="grid grid-cols-3 gap-4">
        {/* eBay Column */}
        <div className="space-y-2">
          <div className={`font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>eBay</div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Fee (%)</label>
            <input
              type="number"
              value={inputs.ebayFee}
              onChange={(e) => onInputChange('ebayFee', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Shipping ($)</label>
            <input
              type="number"
              value={inputs.ebayShipping}
              onChange={(e) => onInputChange('ebayShipping', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
        </div>

        {/* Reseller Column */}
        <div className="space-y-2">
          <div className={`font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Reseller</div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Percent (%)</label>
            <input
              type="number"
              value={inputs.resellerPercent}
              onChange={(e) => onInputChange('resellerPercent', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Shipping ($)</label>
            <input
              type="number"
              value={inputs.resellerShipping}
              onChange={(e) => onInputChange('resellerShipping', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
        </div>

        {/* Consigner Column */}
        <div className="space-y-2">
          <div className={`font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Consigner</div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>High % Rate</label>
            <input
              type="number"
              value={inputs.consignerHighPercent}
              onChange={(e) => onInputChange('consignerHighPercent', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Low Extra ($)</label>
            <input
              type="number"
              value={inputs.consignerLowExtra}
              onChange={(e) => onInputChange('consignerLowExtra', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Flat Fee ($)</label>
            <input
              type="number"
              value={inputs.consignerFlatFee}
              onChange={(e) => onInputChange('consignerFlatFee', parseFloat(e.target.value))}
              className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingMethodsForm;