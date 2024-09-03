import React, { useState } from 'react';

interface Mortgage {
  id: string;
  provider: string;
  maxAmount: string;
  term: number;
  interestRate: number;
  totalCollateral: number;
  initialCollateral: number;
  walletAddress: string;
}

const MortgagesPage: React.FC = () => {
  const [mortgages, setMortgages] = useState<Mortgage[]>([]);
  const [newMortgage, setNewMortgage] = useState<Partial<Mortgage>>({
    provider: '',
    maxAmount: '',
    term: '',
    interestRate: '',
    totalCollateral: '',
    initialCollateral: '',
    walletAddress: '',
  });
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert string values to numbers
    const convertedNewMortgage: Mortgage = {
      ...newMortgage,
      term: Number(newMortgage.term),
      interestRate: Number(newMortgage.interestRate),
      totalCollateral: Number(newMortgage.totalCollateral),
      initialCollateral: Number(newMortgage.initialCollateral),
      id: `M${String(mortgages.length + 1).padStart(3, '0')}`,
      maxAmount: newMortgage.maxAmount || '',
      provider: newMortgage.provider || '',
      walletAddress: newMortgage.walletAddress || '',
    } as Mortgage;

    setMortgages([...mortgages, convertedNewMortgage]);
    setIsListingFormOpen(false);
    setNewMortgage({
      provider: '',
      maxAmount: '',
      term: '',
      interestRate: '',
      totalCollateral: '',
      initialCollateral: '',
      walletAddress: '',
    });
  };

  return (
    <div>
      {/* Form and other components */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="provider">Provider</label>
          <input
            id="provider"
            type="text"
            value={newMortgage.provider || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, provider: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="maxAmount">Max Amount</label>
          <input
            id="maxAmount"
            type="text"
            value={newMortgage.maxAmount || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, maxAmount: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="term">Term (years)</label>
          <input
            id="term"
            type="number"
            value={newMortgage.term || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, term: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="interestRate">Interest Rate (%)</label>
          <input
            id="interestRate"
            type="number"
            step="0.1"
            value={newMortgage.interestRate || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, interestRate: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="totalCollateral">Total Collateral (%)</label>
          <input
            id="totalCollateral"
            type="number"
            value={newMortgage.totalCollateral || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, totalCollateral: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="initialCollateral">Initial Collateral (%)</label>
          <input
            id="initialCollateral"
            type="number"
            value={newMortgage.initialCollateral || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, initialCollateral: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="walletAddress">Wallet Address</label>
          <input
            id="walletAddress"
            type="text"
            value={newMortgage.walletAddress || ''}
            onChange={(e) => setNewMortgage({ ...newMortgage, walletAddress: e.target.value })}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* List and other components */}
    </div>
  );
};

export default MortgagesPage;
