import React, { useState } from 'react';
import { useCartel } from '../../context/CartelContext';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const GTDModal: React.FC = () => {
  const { isGtdModalOpen, setIsGtdModalOpen, setNotificationMessage } = useCartel();
  const [handle, setHandle] = useState('');
  const [wallet, setWallet] = useState('');
  const [contributionField, setContributionField] = useState('Research & Market Analysis');
  const [statement, setStatement] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isGtdModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle || !wallet) return;

    setIsSubmitted(true);
    setNotificationMessage('GTD Clearance application recorded. Squad captains will evaluate on Robinhood Chain testnet.');
    setTimeout(() => {
      setIsSubmitted(false);
      setIsGtdModalOpen(false);
      setHandle('');
      setWallet('');
      setStatement('');
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gtd-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-[#1a1a1a] border border-[#2d2d2d] rounded-sm p-6 sm:p-8 shadow-2xl text-[#E6DFD1]">
        <button
          onClick={() => setIsGtdModalOpen(false)}
          className="absolute top-5 right-5 text-[#A39E92] hover:text-[#F4F0E8] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 size={48} className="mx-auto text-[#B69A67] animate-pulse" />
            <h3 className="text-xl font-display font-bold text-[#F4F0E8]">APPLICATION FILED</h3>
            <p className="text-xs text-[#A39E92] max-w-sm mx-auto leading-relaxed">
              Your dossier for GTD Clearance has been logged for Squad Commander review. All spots are vetted manually based on proof-of-merit and discipline.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-2 text-[#B69A67]">
              <ShieldCheck size={18} />
              <span className="text-[11px] font-mono tracking-widest uppercase">Cartel Vanguard Vetting</span>
            </div>
            <h2 id="gtd-modal-title" className="text-xl font-display font-bold text-[#F4F0E8]">
              APPLY FOR GTD CLEARANCE
            </h2>
            <p className="text-xs text-[#A39E92] mt-1.5 mb-6 leading-relaxed">
              Guaranteed mint access is reserved for independent builders, analysts, and protectors who stand ready to strengthen the alliance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  X / Discord Handle <span className="text-[#B69A67]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full bg-[#141414] border border-[#292929] focus:border-[#B69A67] px-3.5 py-2.5 text-xs text-[#F4F0E8] outline-none transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  EVM Wallet Address <span className="text-[#B69A67]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-[#141414] border border-[#292929] focus:border-[#B69A67] px-3.5 py-2.5 text-xs font-mono text-[#F4F0E8] outline-none transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  Primary Domain of Contribution
                </label>
                <select
                  value={contributionField}
                  onChange={(e) => setContributionField(e.target.value)}
                  className="w-full bg-[#141414] border border-[#292929] focus:border-[#B69A67] px-3.5 py-2.5 text-xs text-[#F4F0E8] outline-none transition-colors rounded-sm"
                >
                  <option value="Research & Market Analysis">Research & Market Analysis</option>
                  <option value="Technical Development & Tooling">Technical Development & Tooling</option>
                  <option value="Squad Leadership & Mentorship">Squad Leadership & Mentorship</option>
                  <option value="Editorial, Writing & Arts">Editorial, Writing & Arts</option>
                  <option value="Community Welfare">Community Welfare</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  Statement of Intent / Relevant Experience
                </label>
                <textarea
                  rows={3}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="How will your presence bolster the Cartel's collective intelligence and economic leverage?"
                  className="w-full bg-[#141414] border border-[#292929] focus:border-[#B69A67] px-3.5 py-2 text-xs text-[#F4F0E8] outline-none transition-colors rounded-sm resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsGtdModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#A39E92] hover:text-[#E6DFD1] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] transition-colors rounded-sm cursor-pointer shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
