export const calculateGradingScenario = (inputs, selectedMethod = 'ebay') => {
  console.log('Starting calculation with inputs:', inputs);

  // Validate inputs
  if (!inputs) {
    console.error('No inputs provided to calculateGradingScenario');
    return null;
  }

  // Ensure all inputs are numbers with default values
  const rawPrice = Number(inputs.rawPrice) || 0;
  const gradingFee = Number(inputs.gradingFee) || 0;
  const ebayShipping = Number(inputs.ebayShipping) || 0;
  const psa10Price = Number(inputs.psa10Price) || 0;
  const psa9Price = Number(inputs.psa9Price) || 0;
  const psa8Price = Number(inputs.psa8Price) || 0;
  const psa10Rate = Number(inputs.psa10Rate) || 0;
  const psa9Rate = Number(inputs.psa9Rate) || 0;
  const psa8Rate = Number(inputs.psa8Rate) || 0;
  const ebayFee = Number(inputs.ebayFee) || 0;
  const resellerPercent = Number(inputs.resellerPercent) || 0;
  const resellerShipping = Number(inputs.resellerShipping) || 0;
  const consignerHighPercent = Number(inputs.consignerHighPercent) || 0;
  const consignerLowExtra = Number(inputs.consignerLowExtra) || 0;
  const consignerFlatFee = Number(inputs.consignerFlatFee) || 0;

  // Calculate expected values
  const psa10EV = (psa10Price * psa10Rate) / 100;
  const psa9EV = (psa9Price * psa9Rate) / 100;
  const psa8EV = (psa8Price * psa8Rate) / 100;

  // Calculate total expected value
  const totalEV = psa10EV + psa9EV + psa8EV;

  // Calculate costs
  const totalCosts = rawPrice + gradingFee + ebayShipping;

  // Calculate selling method fees and net values
  const sellingMethods = {
    ebay: totalEV - (totalEV * ebayFee / 100) - ebayShipping,
    reseller: (totalEV * resellerPercent / 100) - resellerShipping,
    consigner: totalEV >= 100 
      ? (totalEV * consignerHighPercent / 100) - consignerFlatFee
      : (totalEV * consignerHighPercent / 100) - consignerLowExtra - consignerFlatFee
  };

  const result = {
    totalEV,
    totalCosts,
    netEV: sellingMethods[selectedMethod],
    sellingMethods
  };

  console.log('Final results:', result);
  return result;
};

export const calculateSellingMethods = (totalEV, inputs) => {
  // eBay calculation
  const ebayFee = totalEV * (Number(inputs.ebayFee) / 100);
  const ebayNet = totalEV - ebayFee - Number(inputs.ebayShipping);

  // Reseller calculation
  const resellerNet = (totalEV * (Number(inputs.resellerPercent) / 100)) - Number(inputs.resellerShipping);

  // Consigner calculation
  const consignerNet = totalEV >= 100
    ? (totalEV * (Number(inputs.consignerHighPercent) / 100)) - Number(inputs.consignerFlatFee)
    : (totalEV * (Number(inputs.consignerHighPercent) / 100)) - Number(inputs.consignerLowExtra) - Number(inputs.consignerFlatFee);

  return {
    ebay: ebayNet,
    reseller: resellerNet,
    consigner: consignerNet
  };
};