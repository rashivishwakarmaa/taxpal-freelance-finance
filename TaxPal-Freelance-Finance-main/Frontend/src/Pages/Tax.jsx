import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../utils/api';

function formatCurrency(n) {
  if (n == null || isNaN(n)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function Tax() {
  const [estimate, setEstimate] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('GET', '/tax/estimate')
      .then((data) => {
        setEstimate(data.estimate);
        setCountryName(data.estimate?.countryName || data.country || '');
      })
      .catch(() => setEstimate(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Tax Estimate</h1>
          <div className="glass-card rounded-2xl p-8 text-center text-slate-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  const breakdown = estimate?.breakdown || [];
  const hasBreakdown = breakdown.length > 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Tax Estimate</h1>
          <p className="text-slate-400 mt-1">
            Based on your income and deductible expenses this year
            {countryName ? ` (${countryName})` : ''}. Change country in Settings.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <p className="text-slate-500 text-sm mb-4">For illustrative purposes only. Consult a tax professional for accurate filing.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(estimate?.totalIncome)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Deductible Expenses</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(estimate?.totalDeductibleExpenses)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Net Business Income</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(estimate?.netBusinessIncome)}</p>
            </div>
            {hasBreakdown ? (
              breakdown.map((item) => (
                <div key={item.label}>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">{formatCurrency(item.amount)}</p>
                </div>
              ))
            ) : (
              <>
                {estimate?.selfEmploymentTax != null && (
                  <div>
                    <p className="text-slate-400 text-sm">Self-Employment Tax (15.3%)</p>
                    <p className="text-2xl font-bold text-amber-400 mt-1">{formatCurrency(estimate.selfEmploymentTax)}</p>
                  </div>
                )}
                {(estimate?.federalIncomeTax != null || estimate?.incomeTax != null) && (
                  <div>
                    <p className="text-slate-400 text-sm">{estimate?.federalIncomeTax != null ? 'Federal Income Tax' : 'Income Tax'}</p>
                    <p className="text-2xl font-bold text-amber-400 mt-1">
                      {formatCurrency(estimate?.federalIncomeTax ?? estimate?.incomeTax)}
                    </p>
                  </div>
                )}
              </>
            )}
            <div>
              <p className="text-slate-400 text-sm">Estimated Total Tax</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{formatCurrency(estimate?.estimatedTotalTax)}</p>
            </div>
          </div>
          {estimate?.effectiveRate != null && estimate.totalIncome > 0 && (
            <p className="mt-6 text-slate-400 text-sm">Effective rate: {estimate.effectiveRate}% of income</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
