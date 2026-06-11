import React from 'react';
import { X, Sparkles, Check, Zap } from 'lucide-react';

const PLANS = [
  {
    name: 'Basic',
    price: '¥ 9.90',
    credits: '450',
    unit: '¥ 0.022',
    output: '约可生成 20 张高清分镜图',
    features: ['标准画质输出', '基础风格预设', '单人使用'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '¥ 29.00',
    credits: '1,500',
    unit: '¥ 0.019',
    output: '约可生成 70 张分镜或 1 条视频微调',
    features: ['高清画质输出', '全风格预设', '3 人团队', '品牌风格管理器 x5'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '¥ 68.00',
    credits: '3,800',
    unit: '¥ 0.018',
    output: '约调用 10 次品牌风格管理器及分层重绘',
    features: ['4K 超清输出', 'AI 智能推荐风格', '10 人团队', '品牌管理器 x30', '分层重绘无限'],
    popular: false,
  },
  {
    name: 'Max',
    price: '¥ 168.00',
    credits: '10,800',
    unit: '¥ 0.016',
    output: '约可生成 500+ 张高清分镜或完整短片',
    features: ['4K + RAW 格式', '私有模型训练', '无限团队', '全部功能无限', '专属客服'],
    popular: false,
  },
];

export default function PricingModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[8000] flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[960px] animate-fade-in overflow-hidden">
        {/* 头部 */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">充值算力积分</h2>
            <p className="text-[13px] text-gray-400 mt-0.5">选择适合你的方案 · 算力点长期有效</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* 方案列表 - 横排 */}
        <div className="p-6 flex gap-4">
          {PLANS.map((plan) => (
            <button
              key={plan.name}
              onClick={() => { if (onSelect) onSelect(plan); }}
              className={`flex-1 text-left rounded-2xl border-2 transition-all group p-5 ${
                plan.popular
                  ? 'border-indigo-300 bg-gradient-to-b from-indigo-50/60 to-purple-50/30 hover:border-indigo-400 hover:shadow-xl shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'
              }`}
            >
              {/* 方案名 + 推荐 */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[20px] font-extrabold text-gray-900">{plan.name}</span>
                {plan.popular && (
                  <span className="text-[10px] font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-full flex items-center">
                    <Sparkles size={10} className="mr-1" />推荐
                  </span>
                )}
              </div>

              {/* 价格 */}
              <div className="mb-1">
                <span className="text-2xl font-extrabold text-gray-900">{plan.price}</span>
              </div>

              {/* 算力点 */}
              <div className="flex items-center space-x-2 text-[13px] mb-4">
                <Zap size={14} className="text-amber-500" />
                <span className="font-bold text-gray-900">{plan.credits} <span className="text-gray-400 font-medium">算力点</span></span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400">单价 {plan.unit}</span>
              </div>

              {/* 预期产出 */}
              <p className="text-[13px] font-medium text-indigo-600 bg-indigo-50/60 rounded-xl px-4 py-2.5 mb-4 leading-relaxed">
                {plan.output}
              </p>

              {/* 功能列表 */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Check size={13} className="text-green-500 shrink-0" />
                    <span className="text-[12px] text-gray-500">{f}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
