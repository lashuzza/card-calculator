import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CardPricesForm from './CardPricesForm';
import GradeProbabilitiesForm from './GradeProbabilitiesForm';
import SellingMethodsForm from './SellingMethodsForm';
import ResultsDisplay from './ResultsDisplay';
import { calculateGradingScenario } from './calculations';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const CardCalculator = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState('ebay');
  const [inputs, setInputs] = useState({
    rawPrice: 64.42,
    gradingFee: 17,
    psa10Price: 175,
    psa9Price: 95,
    psa8Price: 64,
    psa10Rate: 48,
    psa9Rate: 27,
    psa8Rate: 0,
    ebayFee: 13.25,
    ebayShipping: 5,
    resellerPercent: 75,
    resellerShipping: 0.5,
    consignerHighPercent: 88,
    consignerLowExtra: 5,
    consignerFlatFee: 5.99
  });

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value:`, value);
    
    // Handle PSA grade rate changes
    if (field.includes('Rate')) {
      const currentInputs = { ...inputs };
      currentInputs[field] = value;
      const totalRate = 
        Number(field === 'psa10Rate' ? value : currentInputs.psa10Rate) +
        Number(field === 'psa9Rate' ? value : currentInputs.psa9Rate) +
        Number(field === 'psa8Rate' ? value : currentInputs.psa8Rate);

      if (totalRate > 100) {
        return;
      }
    }

    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const results = React.useMemo(() => {
    return calculateGradingScenario(inputs, selectedMethod);
  }, [inputs, selectedMethod]);

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
          Card Grading Calculator
        </h1>
        <button
          onClick={() => navigate('/best-method')}
          className={`px-4 py-2 ${isDark ? 'bg-[#334155]' : 'bg-[#1E293B]'} text-[#F1F5F9] rounded-md hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
        >
          Best Method
        </button>
      </div>

      {/* Main Analysis Section */}
      <Card className={`shadow-md ${isDark ? 'bg-[#1E293B] border-[#334155]' : ''}`}>
        <CardContent className="p-6">
          <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Grading Analysis
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <CardPricesForm inputs={inputs} onInputChange={handleInputChange} isDark={isDark} />
            </div>
            <div>
              <GradeProbabilitiesForm inputs={inputs} onInputChange={handleInputChange} isDark={isDark} />
            </div>
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

          <SellingMethodsForm inputs={inputs} onInputChange={handleInputChange} isDark={isDark} />
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

export default CardCalculator;