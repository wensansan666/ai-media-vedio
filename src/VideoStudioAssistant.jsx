import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, ChevronDown, ArrowUp, X, Zap, Eraser, Box, Image, PlaySquare, Hexagon
} from 'lucide-react';

const SKILLS = [
  { id: 'ad', name: '广告创意', desc: '商业级产品展示与营销视觉' },
  { id: 'short', name: '故事短片', desc: '结构完整的微电影与短片叙事' },
  { id: 'storyboard', name: '分镜故事板', desc: '工业级镜头拆解与画面规划' },
  { id: 'onetake', name: '一镜到底视频', desc: '流畅无缝的长镜头动态生成' },
  { id: 'drama', name: '剧情故事', desc: '强叙事冲突与角色情感演绎' },
  { id: 'free', name: '自由创作', desc: '无拘无束的开放式探索与尝试' }
];

/**
 * 极简纯白 AI 视觉总监助手组件
 * @param {boolean} isOpen - 控制面板是否滑出
 * @param {function} onClose - 点击关闭按钮触发的回调
 * @param {function} onDeploy - 点击"部署"按钮触发的回调，向父组件传递生成的参数
 */
export default function VideoStudioAssistant({ isOpen, onClose, onDeploy, workerUrl }) {
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 菜单状态
  const [showSkillMenu, setShowSkillMenu] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Skill');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro');
  const [modelTab, setModelTab] = useState('Image');
  const [autoMode, setAutoMode] = useState(false);

  const MODEL_DATA = {
    Image: [
      { name: 'Nano Banana Pro', desc: 'Gemini 3 Pro 驱动，4K 输出，主体一致性', best: true },
      { name: 'Nano Banana 2', desc: 'Gemini 3.1 Flash，高速生成，多参考图' },
      { name: 'Seedream 4.6', desc: '字节跳动，编辑一致性，人像优化' },
      { name: 'Seedream 5.0 Lite', desc: '轻量版，快速出图，性价比高' },
    ],
    Video: [
      { name: 'Happy Horse 1.0', desc: 'SOTA 视频生成，高动态范围' },
      { name: 'Kling O3', desc: '可灵旗舰，电影级画质与运镜' },
      { name: 'Kling 3.0', desc: '稳定版本，长视频支持' },
      { name: 'Wan 2.7', desc: '开源模型，本地可部署' },
      { name: 'Kling O1', desc: '第一代可灵，性价比之选' },
      { name: 'Seedance 2.0', desc: '字节跳动旗舰视频模型' },
      { name: 'Seedance 2.0 Fast', desc: '轻量快速版，高性价比' },
    ],
    Text: [
      { name: 'Gemini Flash', desc: 'Google 多模态，中文出色，1500次/天免费' },
      { name: 'Gemini Pro', desc: 'Google 旗舰文本模型，深度推理，长文写作' },
    ],
  };

  // 内部聊天状态
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      role: 'ai',
      type: 'text',
      content: '你好！我是 AI 视觉导演助手。输入创意描述，选择模型后发送，我会帮你生成视觉方案。'
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const closeMenus = () => { setShowSkillMenu(false); setShowModelMenu(false); };
    window.addEventListener('click', closeMenus);
    return () => window.removeEventListener('click', closeMenus);
  }, []);

  const callWorker = async (type, payload) => {
    const resp = await fetch(workerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...payload }),
    });
    return resp.json();
  };

  // 真实 API 调用
  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', type: 'text', content: userText }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const isImage = modelTab === 'Image';
      const isVideo = modelTab === 'Video';

      if (isVideo) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `【${selectedModel}】视频生成暂未接入 API，敬请期待。` }]);
      } else if (isImage) {
        // 图片生成
        const result = await callWorker('image', { prompt: userText });
        if (result.success && result.image) {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'image', content: result.image, text: `${selectedModel} · ${selectedSkill}` }]);
        } else {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `生成失败：${result.error || '未知错误'}` }]);
        }
      } else {
        // 文本生成
        const result = await callWorker('text', { prompt: userText, actionType: 'expand', model: selectedModel });
        if (result.success) {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'control_card', content: result.text, cardData: { intensity: 85, motion: '缓慢推镜头' } }]);
        } else {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `生成失败：${result.error || '未知错误'}` }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `请求失败：${err.message}` }]);
    }
    setIsTyping(false);
  };

  return (
    <>
      {/* 侧边栏主体：固定在屏幕最右侧，占满全高 */}
      <div
        className={`fixed top-0 right-0 w-[400px] bg-white h-full border-l border-gray-100 flex flex-col transition-transform duration-300 z-[5000] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* 顶部 Header */}
        <div className="h-16 px-5 flex items-center justify-between shrink-0 bg-white border-b border-gray-50">
          <div className="flex items-center space-x-2.5">
            <span className="text-[14px] font-bold text-gray-900 tracking-wide">🎬 TVC视觉导演</span>
            <div className="flex items-center space-x-1.5 bg-green-50 px-2 py-0.5 rounded-full border border-green-100/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-green-700 font-medium tracking-wide">正在待命</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMessages([{ id: 'm1', role: 'ai', type: 'text', content: '上下文已清空。' }])}
              className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              title="清空对话"
            >
              <Eraser size={15} strokeWidth={2}/>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              title="收起面板"
            >
              <X size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>

        {/* 聊天瀑布流区域 */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-6 custom-scrollbar bg-white">
          {messages.map(msg => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[95%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>

                {msg.role === 'ai' && <span className="text-[10px] font-bold text-gray-300 mb-1.5 font-mono">10:42 AM</span>}

                {msg.type === 'image' ? (
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={msg.content} alt="AI Generated" className="max-w-full h-auto" />
                    {msg.text && <p className="text-[11px] text-gray-400 px-3 py-2 bg-gray-50">{msg.text}</p>}
                  </div>
                ) : (
                  <div className={`text-[13px] leading-relaxed font-medium ${msg.role === 'user' ? 'bg-[#FAFAFA] border border-gray-100 text-gray-800 px-4 py-2.5 rounded-[20px] rounded-tr-sm shadow-sm' : 'text-gray-800 whitespace-pre-wrap'}`}>
                    {msg.content}
                  </div>
                )}

                {/* 内嵌控制台卡片 */}
                {msg.type === 'control_card' && msg.cardData && (
                  <div className="mt-3 bg-white border border-gray-100 rounded-2xl p-4 w-full space-y-4 animate-fade-in shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px] font-bold">
                        <span className="text-gray-500">美学调性一致率</span>
                        <span className="text-indigo-600 bg-indigo-50 px-1.5 rounded">{msg.cardData.intensity}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100"
                        value={msg.cardData.intensity}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMessages(messages.map(m => m.id === msg.id ? { ...m, cardData: { ...m.cardData, intensity: val } } : m));
                        }}
                        className="w-full h-1 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-600 outline-none"
                      />
                    </div>
                    {/* 调用外部传入的 onDeploy 方法 */}
                    <button
                      onClick={() => {
                        if (onDeploy) onDeploy({ ...msg.cardData, skill: selectedSkill });
                      }}
                      className="w-full py-2.5 bg-[#FAFAFA] border border-gray-200 hover:bg-white hover:border-gray-300 text-gray-800 text-[11px] font-bold rounded-xl transition-all shadow-sm"
                    >
                      部署智能决策至画布
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="text-[11px] text-gray-400 font-bold animate-pulse flex items-center space-x-1.5 pl-1 py-2">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              <span>AI 思考中...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 底部高级输入区 */}
        <div className="p-5 bg-white shrink-0">
          <div className="bg-white border border-gray-200 rounded-[20px] p-2.5 flex flex-col shadow-[0_2px_15px_rgba(0,0,0,0.03)] focus-within:border-gray-300 focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all relative">

            <div className="w-full relative">
              <textarea
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                className="w-full bg-transparent border-none outline-none text-[14px] text-gray-800 font-medium px-1.5 py-1.5 resize-none min-h-[44px] max-h-[120px] custom-scrollbar leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 relative">

              <div className="flex items-center space-x-1.5">
                <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"><Plus size={18} strokeWidth={2}/></button>
                <div className="w-px h-3.5 bg-gray-200 mx-1"></div>

                {/* 技能 Skill 悬浮菜单 */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowSkillMenu(!showSkillMenu); }}
                    className={`flex items-center px-2 py-1 text-gray-800 rounded-lg transition-colors group ${showSkillMenu ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  >
                    <Zap size={14} className="mr-1 text-gray-600" />
                    <span className="text-[12px] font-extrabold tracking-wide">{selectedSkill}</span>
                    <ChevronDown size={14} className="ml-0.5 text-gray-400" />
                  </button>

                  {/* Skill 下拉弹窗 */}
                  {showSkillMenu && (
                    <div
                      className="absolute bottom-[calc(100%+12px)] left-0 w-[240px] bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[20px] p-2 z-[100] animate-fade-in origin-bottom-left"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">选择生成管线</div>
                      <div className="max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
                        {SKILLS.map(skill => (
                          <button
                            key={skill.id}
                            onClick={() => { setSelectedSkill(skill.name); setShowSkillMenu(false); }}
                            className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors group mb-1 border border-transparent hover:border-gray-100"
                          >
                            <div className="text-[13px] font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{skill.name}</div>
                            <div className="text-[11px] text-gray-400 mt-1 leading-snug">{skill.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 模型选择 */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowModelMenu(!showModelMenu); }}
                    className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
                    title="模型偏好设置"
                  >
                    <Box size={16} strokeWidth={2} />
                  </button>
                  {showModelMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] w-[360px] animate-fade-in overflow-hidden" onClick={e => e.stopPropagation()}>

                      {/* 顶部：标签栏 + 自动开关 */}
                      <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                          {['Image', 'Video', 'Text'].map(tab => (
                            <button
                              key={tab}
                              onClick={() => setModelTab(tab)}
                              className={`px-3.5 py-1.5 text-[12px] font-bold rounded-md transition-all ${modelTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setAutoMode(!autoMode)}
                          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${autoMode ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                        >
                          <span>Auto</span>
                          <div className={`w-6 h-3 rounded-full transition-colors ${autoMode ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-transform mt-[1px] ${autoMode ? 'translate-x-3' : 'translate-x-0.5'}`} />
                          </div>
                        </button>
                      </div>

                      {/* 模型列表卡片 */}
                      <div className="px-3 pb-3 pt-1 space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar">
                        {(MODEL_DATA[modelTab] || []).map(m => (
                          <button
                            key={m.name}
                            onClick={() => { setSelectedModel(m.name); setShowModelMenu(false); }}
                            className={`w-full text-left p-3 rounded-xl transition-all border ${selectedModel === m.name ? 'bg-indigo-50/30 border-indigo-200 shadow-sm' : 'bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <span className="text-[13px] font-bold text-gray-800">{m.name}</span>
                              {m.best && <span className="text-[9px] font-bold bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md">推荐</span>}
                            </div>
                            <p className="text-[11px] text-gray-400 mt-1">{m.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="flex items-center space-x-3 mr-1">
                <span className="text-[11px] font-bold text-gray-400">消耗 <span className="text-indigo-600">2 积分</span></span>
                <button
                  onClick={handleSend}
                  disabled={!chatInput.trim()}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${!chatInput.trim() ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#982973] text-white hover:bg-[#7D1E5B] shadow-md hover:-translate-y-0.5'}`}
                >
                  <ArrowUp size={16} strokeWidth={2.5} className="mt-[1px]"/>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
