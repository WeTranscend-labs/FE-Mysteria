import { motion } from 'framer-motion';
import { X, Key, CreditCard, Package, ArrowRight } from 'lucide-react';
import type { KeyPackage } from '../types/chest';

interface KeyPurchaseConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    keyPackage: KeyPackage;
    balance: number;
}

export default function KeyPurchaseConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    keyPackage,
    balance,
}: KeyPurchaseConfirmModalProps) {
    if (!isOpen) return null;

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const color = keyPackage.type === 'Bronze' ? 'rgb(176, 141, 87)' :
        keyPackage.type === 'Silver' ? 'rgb(192, 192, 192)' :
            keyPackage.type === 'Gold' ? 'rgb(255, 215, 0)' : 'rgb(148, 0, 211)';

    const canAfford = balance >= keyPackage.price;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
            onClick={handleBackgroundClick}
        >
            <div className="relative w-full max-w-lg mx-4 cursor-default">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 text-center border-b border-white/10">
                        <h2 className="text-2xl font-light text-white mb-2">
                            Confirm Purchase
                        </h2>
                        <p className="text-white/60">
                            Review your key purchase details
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Package Details */}
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            <div
                                className="w-16 h-16 rounded-lg flex items-center justify-center"
                                style={{
                                    backgroundColor: `${color}20`,
                                    border: `1px solid ${color}40`
                                }}
                            >
                                <Package className="w-8 h-8" style={{ color }} />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1">{keyPackage.name}</h3>
                                <div className="flex items-center gap-2 text-white/60">
                                    <Key className="w-4 h-4" />
                                    <span>{keyPackage.amount} Keys</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Details */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white/60">Price per Key</span>
                                <span className="text-white">{(keyPackage.price / keyPackage.amount).toFixed(2)} USDT</span>
                            </div>
                            {keyPackage.discount > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60">Discount</span>
                                    <span className="text-mysteria-cyan">-{keyPackage.discount}%</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="text-white">Total Price</span>
                                <span className="text-lg font-medium text-white">{keyPackage.price} USDT</span>
                            </div>
                        </div>

                        {/* Balance Warning */}
                        {!canAfford && (
                            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                <CreditCard className="w-4 h-4 flex-shrink-0" />
                                <p>Insufficient balance. You need {keyPackage.price - balance} more USDT.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10">
                        <button
                            onClick={onConfirm}
                            disabled={!canAfford}
                            className="w-full py-3 flex items-center justify-center gap-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: `${color}20`,
                                color: color,
                                borderColor: `${color}40`,
                                borderWidth: 1,
                            }}
                        >
                            <span>Confirm Purchase</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}