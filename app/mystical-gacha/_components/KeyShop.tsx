'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, ShoppingCart, Wallet, Package, Gift, Crown } from 'lucide-react';
import { KeyPackage } from '../types/chest';
import { keyPackages } from '../data/chests';
import KeyPurchaseConfirmModal from './KeyPurchaseConfirmModal';

export default function KeyShop() {
  const [selectedPackage, setSelectedPackage] = useState<KeyPackage | null>(
    null
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const handleBuyClick = (pkg: KeyPackage) => {
    setSelectedPackage(pkg);
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedPackage) {
      if (balance < selectedPackage.price) {
        alert('Insufficient balance!');
        return;
      }

      const newBalance = balance - selectedPackage.price;
      setBalance(newBalance);
      localStorage.setItem('balance', String(newBalance));

      const keyBalances = JSON.parse(
        localStorage.getItem('keyBalances') ||
          '{"Bronze":0,"Silver":0,"Gold":0,"Legend":0}'
      );
      keyBalances[selectedPackage.type] += selectedPackage.amount;
      localStorage.setItem('keyBalances', JSON.stringify(keyBalances));

      setShowConfirmModal(false);
      setSelectedPackage(null);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold mb-4 text-white tracking-tight">
          Key <span className="text-mysteria-cyan">Shop</span>
        </h1>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-mysteria-cyan to-transparent mb-4" />
        <p className="text-white/60 max-w-2xl mx-auto">
          Purchase keys to unlock treasure chests and discover rare NFTs. The
          more keys you buy, the better the discount!
        </p>
      </div>

      {/* Balance */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl">
          <Wallet className="w-5 h-5 text-mysteria-cyan" />
          <span className="text-white/60">Balance:</span>
          <span className="text-mysteria-cyan font-mono text-lg">
            {balance} ETH
          </span>
        </div>
      </div>

      {/* Key Package Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {['Bronze', 'Silver', 'Gold', 'Legend'].map((type) => {
          const packages = keyPackages.filter((pkg) => pkg.type === type);
          const color =
            type === 'Bronze'
              ? 'rgb(176, 141, 87)'
              : type === 'Silver'
              ? 'rgb(192, 192, 192)'
              : type === 'Gold'
              ? 'rgb(255, 215, 0)'
              : 'rgb(148, 0, 211)';

          return (
            <div key={type} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                {type === 'Bronze' ? (
                  <Package className="w-5 h-5" style={{ color }} />
                ) : type === 'Silver' ? (
                  <Gift className="w-5 h-5" style={{ color }} />
                ) : type === 'Gold' ? (
                  <Key className="w-5 h-5" style={{ color }} />
                ) : (
                  <Crown className="w-5 h-5" style={{ color }} />
                )}
                <h2 className="text-lg font-medium text-white">{type} Keys</h2>
              </div>

              <div className="space-y-4">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"
                      style={{ backgroundColor: color }}
                    />

                    <div className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Key className="w-4 h-4" style={{ color }} />
                            <span className="text-white font-medium">
                              {pkg.amount}x Keys
                            </span>
                          </div>
                          {pkg.discount > 0 && (
                            <div
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: `${color}20`,
                                color: color,
                                border: `1px solid ${color}40`,
                              }}
                            >
                              Save {pkg.discount}%
                            </div>
                          )}
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="space-y-1">
                            <p className="text-white/40 text-sm">Price</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-white text-xl font-medium">
                                {pkg.price}
                              </span>
                              <span className="text-white/60 text-sm">ETH</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleBuyClick(pkg)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                            style={{
                              backgroundColor: `${color}20`,
                              color: color,
                              border: `1px solid ${color}40`,
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Purchase Confirmation Modal */}
      {selectedPackage && (
        <KeyPurchaseConfirmModal
          isOpen={showConfirmModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmPurchase}
          keyPackage={selectedPackage}
          balance={balance}
        />
      )}
    </div>
  );
}
