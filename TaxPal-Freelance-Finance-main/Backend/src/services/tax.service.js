/**
 * Country-specific tax estimation for freelancers.
 * Simplified rules for illustration only - not tax advice.
 * All amounts in USD for consistency; local currency rules approximated.
 */

const SELF_EMPLOYMENT_TAX_RATE = 0.153;
const SELF_EMPLOYMENT_DEDUCTION = 0.9235;

// US 2024 federal brackets (single filer)
const US_BRACKETS = [
  { min: 0, max: 11600, rate: 0.1 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];
const US_STANDARD_DEDUCTION = 14600;

function usFederalTax(taxableIncome) {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  for (const b of US_BRACKETS) {
    if (taxableIncome <= b.min) break;
    const inBracket = Math.min(taxableIncome, b.max) - b.min;
    if (inBracket > 0) tax += inBracket * b.rate;
  }
  return Math.round(tax * 100) / 100;
}

function estimateTaxUS(totalIncome, totalDeductibleExpenses) {
  const netBusinessIncome = Math.max(0, totalIncome - totalDeductibleExpenses);
  const seTaxable = netBusinessIncome * SELF_EMPLOYMENT_DEDUCTION;
  const selfEmploymentTax = Math.round(seTaxable * SELF_EMPLOYMENT_TAX_RATE * 100) / 100;
  const seDeduction = selfEmploymentTax * 0.5;
  const taxableIncome = Math.max(0, netBusinessIncome - US_STANDARD_DEDUCTION - seDeduction);
  const federalIncomeTax = usFederalTax(taxableIncome);
  const estimatedTotalTax = Math.round((selfEmploymentTax + federalIncomeTax) * 100) / 100;
  return {
    country: "US",
    countryName: "United States",
    totalIncome,
    totalDeductibleExpenses,
    netBusinessIncome,
    selfEmploymentTax,
    federalIncomeTax,
    estimatedTotalTax,
    effectiveRate: totalIncome > 0 ? Math.round((estimatedTotalTax / totalIncome) * 10000) / 100 : 0,
    breakdown: [
      { label: "Self-Employment Tax (15.3%)", amount: selfEmploymentTax },
      { label: "Federal Income Tax", amount: federalIncomeTax },
    ],
  };
}

// India: simplified new regime (FY 2024-25) - flat rates, no standard deduction in same form
// Approximated in USD
const IN_SLABS_NEW = [
  { min: 0, max: 3000, rate: 0 },
  { min: 3000, max: 7500, rate: 0.05 },
  { min: 7500, max: 11250, rate: 0.1 },
  { min: 11250, max: 15000, rate: 0.15 },
  { min: 15000, max: 18750, rate: 0.2 },
  { min: 18750, max: Infinity, rate: 0.3 },
];

function incomeTaxFromSlabs(income, slabs) {
  if (income <= 0) return 0;
  let tax = 0;
  for (const s of slabs) {
    if (income <= s.min) break;
    const inSlab = Math.min(income, s.max) - s.min;
    if (inSlab > 0) tax += inSlab * s.rate;
  }
  return Math.round(tax * 100) / 100;
}

function estimateTaxIN(totalIncome, totalDeductibleExpenses) {
  const netBusinessIncome = Math.max(0, totalIncome - totalDeductibleExpenses);
  const incomeTax = incomeTaxFromSlabs(netBusinessIncome, IN_SLABS_NEW);
  const estimatedTotalTax = incomeTax;
  return {
    country: "IN",
    countryName: "India",
    totalIncome,
    totalDeductibleExpenses,
    netBusinessIncome,
    incomeTax,
    estimatedTotalTax,
    effectiveRate: totalIncome > 0 ? Math.round((estimatedTotalTax / totalIncome) * 10000) / 100 : 0,
    breakdown: [{ label: "Income Tax (New Regime slabs)", amount: incomeTax }],
  };
}

// UK: simplified 2024-25 - personal allowance, then basic/higher rate (GBP approximated in USD)
const UK_PERSONAL_ALLOWANCE = 12570 * 1.27;
const UK_BASIC_RATE = 0.2;
const UK_HIGHER_RATE = 0.4;
const UK_BASIC_LIMIT = 50270 * 1.27;

function estimateTaxGB(totalIncome, totalDeductibleExpenses) {
  const netBusinessIncome = Math.max(0, totalIncome - totalDeductibleExpenses);
  const taxable = Math.max(0, netBusinessIncome - UK_PERSONAL_ALLOWANCE);
  let incomeTax = 0;
  if (taxable > UK_BASIC_LIMIT) {
    incomeTax = (UK_BASIC_LIMIT - 0) * UK_BASIC_RATE + (taxable - UK_BASIC_LIMIT) * UK_HIGHER_RATE;
  } else {
    incomeTax = taxable * UK_BASIC_RATE;
  }
  incomeTax = Math.round(incomeTax * 100) / 100;
  return {
    country: "GB",
    countryName: "United Kingdom",
    totalIncome,
    totalDeductibleExpenses,
    netBusinessIncome,
    incomeTax,
    estimatedTotalTax: incomeTax,
    effectiveRate: totalIncome > 0 ? Math.round((incomeTax / totalIncome) * 10000) / 100 : 0,
    breakdown: [{ label: "Income Tax (Basic/Higher rate)", amount: incomeTax }],
  };
}

// Canada: simplified federal + rough provincial (average)
const CA_BRACKETS = [
  { min: 0, max: 15705, rate: 0.15 },
  { min: 15705, max: 53359, rate: 0.205 },
  { min: 53359, max: 106717, rate: 0.26 },
  { min: 106717, max: 165430, rate: 0.29 },
  { min: 165430, max: Infinity, rate: 0.33 },
];
const CA_BASE_CREDIT = 15705 * 0.15;

function estimateTaxCA(totalIncome, totalDeductibleExpenses) {
  const netBusinessIncome = Math.max(0, totalIncome - totalDeductibleExpenses);
  let federalTax = 0;
  for (const b of CA_BRACKETS) {
    if (netBusinessIncome <= b.min) break;
    const inBracket = Math.min(netBusinessIncome, b.max) - b.min;
    if (inBracket > 0) federalTax += inBracket * b.rate;
  }
  federalTax = Math.max(0, Math.round((federalTax - CA_BASE_CREDIT) * 100) / 100);
  const provincialApprox = federalTax * 0.5;
  const estimatedTotalTax = Math.round((federalTax + provincialApprox) * 100) / 100;
  return {
    country: "CA",
    countryName: "Canada",
    totalIncome,
    totalDeductibleExpenses,
    netBusinessIncome,
    federalTax,
    provincialTax: provincialApprox,
    estimatedTotalTax,
    effectiveRate: totalIncome > 0 ? Math.round((estimatedTotalTax / totalIncome) * 10000) / 100 : 0,
    breakdown: [
      { label: "Federal Tax", amount: federalTax },
      { label: "Provincial (approx.)", amount: provincialApprox },
    ],
  };
}

const COUNTRY_HANDLERS = {
  US: estimateTaxUS,
  IN: estimateTaxIN,
  GB: estimateTaxGB,
  CA: estimateTaxCA,
};

function estimateTax(totalIncome, totalDeductibleExpenses, country = "US") {
  const code = (country || "US").toUpperCase();
  const fn = COUNTRY_HANDLERS[code] || estimateTaxUS;
  return fn(totalIncome, totalDeductibleExpenses);
}

function getSupportedCountries() {
  return [
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
  ];
}

module.exports = { estimateTax, getSupportedCountries };
