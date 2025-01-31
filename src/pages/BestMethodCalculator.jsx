import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { calculateGradingScenario } from '../components/CardCalculator/calculations';
import ResultsDisplay from '../components/CardCalculator/ResultsDisplay';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const BestMethodCalculator = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState('ebay');
  const [itemPrice, setItemPrice] = useState(100);
  const [inputs, setInputs] = useState({
    ebayFee: 13.25,
    ebayShipping: 5,
    resellerPercent: 75,
    resellerShipping: 0.5,
    consignerHighPercent: 88,
    consignerLowExtra: itemPrice < 100 ? 5 : 0,
    consignerFlatFee: 5.99
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update consigner fee when item price changes
  React.useEffect(() => {
    setInputs(prev => ({
      ...prev,
      consignerLowExtra: itemPrice < 100 ? 5 : 0
    }));
  }, [itemPrice]);

  // Calculate results using the item price for all PSA grades
  const results = React.useMemo(() => {
    const calculationInputs = {
      ...inputs,
      rawPrice: itemPrice,
      psa10Price: itemPrice,
      psa9Price: itemPrice,
      psa8Price: itemPrice,
      psa10Rate: 100,
      psa9Rate: 0,
      psa8Rate: 0,
      gradingFee: 0
    };
    return calculateGradingScenario(calculationInputs, selectedMethod);
  }, [inputs, selectedMethod, itemPrice]);

  const getBestMethod = () => {
    if (!results?.sellingMethods) return '';
    return Object.entries(results.sellingMethods).reduce((a, b) => 
      results.sellingMethods[a] > results.sellingMethods[b[0]] ? a : b[0]
    );
  };

  const bestMethod = getBestMethod();

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
          Best Selling Method Calculator
        </h1>
        <button
          onClick={() => navigate('/calculator')}
          className={`px-4 py-2 ${isDark ? 'bg-[#334155]' : 'bg-[#1E293B]'} text-[#F1F5F9] rounded-md hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
        >
          Full Calculator
        </button>
      </div>

      {/* Price Slider Section */}
      <Card className={`shadow-md ${isDark ? 'bg-[#1E293B] border-[#334155]' : ''}`}>
        <CardContent className="p-6">
          <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Item Price
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="1000"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
                className="flex-1 h-2 bg-[#64748B] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>$</span>
                <input
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                  className={`w-24 px-2 py-1 border rounded text-right focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                    isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                  }`}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-[#64748B]">
              <span>$1</span>
              <span>$500</span>
              <span>$1000</span>
            </div>
            {itemPrice < 100 && (
              <div className="text-sm text-[#00E5FF] font-medium">
                Note: Consigner has an additional $5 fee for items under $100
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selling Methods Section */}
      <Card className={`shadow-md ${isDark ? 'bg-[#1E293B] border-[#334155]' : ''}`}>
        <CardContent className="p-6">
          <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Selling Methods
          </h2>
          
          {/* Selling Method Selection */}
          <div className="mb-6">
            <h3 className={`font-medium mb-3 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Select Selling Method
            </h3>
            <div className="flex gap-6">
              {[
                { id: 'ebay', display: 'eBay' },
                { id: 'reseller', display: 'Reseller' },
                { id: 'consigner', display: 'Consigner' }
              ].map(({ id, display }) => (
                <label
                  key={id}
                  className={`
                    flex items-center gap-2 cursor-pointer
                    ${id === bestMethod ? 'text-[#00E5FF] font-medium' : isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}
                  `}
                >
                  <input
                    type="radio"
                    name="sellingMethod"
                    value={id}
                    checked={selectedMethod === id}
                    onChange={() => setSelectedMethod(id)}
                    className="w-4 h-4 accent-[#00E5FF]"
                  />
                  <span>{display}</span>
                  {id === bestMethod && (
                    <span className="text-sm text-[#00E5FF]">(Best)</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Fee Structure */}
          <div>
            <h3 className={`font-medium mb-3 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Fee Structure
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {/* eBay Column */}
              <div className="space-y-2">
                <div className={`font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>eBay</div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#64748B]">Fee (%)</label>
                  <input
                    type="number"
                    value={inputs.ebayFee}
                    onChange={(e) => handleInputChange('ebayFee', parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#64748B]">Shipping ($)</label>
                  <input
                    type="number"
                    value={inputs.ebayShipping}
                    onChange={(e) => handleInputChange('ebayShipping', parseFloat(e.target.value))}
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
                  <label className="text-sm text-[#64748B]">Percent (%)</label>
                  <input
                    type="number"
                    value={inputs.resellerPercent}
                    onChange={(e) => handleInputChange('resellerPercent', parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#64748B]">Shipping ($)</label>
                  <input
                    type="number"
                    value={inputs.resellerShipping}
                    onChange={(e) => handleInputChange('resellerShipping', parseFloat(e.target.value))}
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
                  <label className="text-sm text-[#64748B]">High % Rate</label>
                  <input
                    type="number"
                    value={inputs.consignerHighPercent}
                    onChange={(e) => handleInputChange('consignerHighPercent', parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#64748B]">Low Extra ($)</label>
                  <input
                    type="number"
                    value={inputs.consignerLowExtra}
                    onChange={(e) => handleInputChange('consignerLowExtra', parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#64748B]">Flat Fee ($)</label>
                  <input
                    type="number"
                    value={inputs.consignerFlatFee}
                    onChange={(e) => handleInputChange('consignerFlatFee', parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className={`shadow-md ${isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-[#1E293B]/5'}`}>
        <CardContent className="p-6">
          <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Expected Value Results
          </h2>
          <ResultsDisplay 
            results={results}
            selectedMethod={selectedMethod}
            ebayFee={inputs.ebayFee}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BestMethodCalculator; 