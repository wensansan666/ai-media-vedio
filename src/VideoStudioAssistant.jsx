import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, ChevronDown, ArrowUp, X, Zap, Eraser, Box, Image, PlaySquare, Hexagon,
  Sparkles, Search, Clapperboard, Activity
} from 'lucide-react';

// ==========================================
// 1. 技能管线 — 底部闪电图标的 6 个选项
// ==========================================
const SKILLS = [
  { id: 'ad', name: '广告创意', desc: '商业级产品展示与营销视觉' },
  { id: 'short', name: '故事短片', desc: '结构完整的微电影与短片叙事' },
  { id: 'storyboard', name: '分镜故事板', desc: '工业级镜头拆解与画面规划' },
  { id: 'onetake', name: '一镜到底视频', desc: '流畅无缝的长镜头动态生成' },
  { id: 'drama', name: '剧情故事', desc: '强叙事冲突与角色情感演绎' },
  { id: 'free', name: '自由创作', desc: '无拘无束的开放式探索与尝试' }
];

// ==========================================
// 2. 组件主体
//    props: isOpen(开关) onClose(关闭回调) onDeploy(部署回调) workerUrl(API地址)
// ==========================================
export default function VideoStudioAssistant({ isOpen, onClose, onDeploy, workerUrl }) {
  // --- 核心状态 ---
  const [chatInput, setChatInput] = useState('');           // 输入框文字
  const [isTyping, setIsTyping] = useState(false);          // AI 思考中动画
  const [showSkillMenu, setShowSkillMenu] = useState(false); // 技能下拉开关
  const [selectedSkill, setSelectedSkill] = useState('Skill'); // 当前选中技能
  const [showModelMenu, setShowModelMenu] = useState(false); // 模型面板开关
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro'); // 当前模型
  const [modelTab, setModelTab] = useState('Image');        // 模型面板当前标签
  const [autoMode, setAutoMode] = useState(false);          // 自动模式开关
  const [textTask, setTextTask] = useState('assistant');    // 文本任务类型

  // ==========================================
  // 3. 模型数据 — 立方体图标打开的三栏面板
  // ==========================================
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

  // --- 聊天消息 ---
  const [messages, setMessages] = useState([
    {
      id: 'm1', role: 'ai', type: 'text',
      content: '你好！我是 AI 视觉导演助手。输入创意描述，选择模型后发送，我会帮你生成视觉方案。'
    }
  ]);

  const chatEndRef = useRef(null);

  // 自动滚到最新消息
  useEffect(() => {
    if (chatEndRef.current) { chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); }
  }, [messages, isTyping]);

  // 点击空白关闭弹出菜单
  useEffect(() => {
    const closeMenus = () => { setShowSkillMenu(false); setShowModelMenu(false); };
    window.addEventListener('click', closeMenus);
    return () => window.removeEventListener('click', closeMenus);
  }, []);

  // ==========================================
  // 4. callWorker — 调后端 Cloudflare Worker
  //    /api/image → 图片生成
  //    /api/text  → 文本生成
  // ==========================================
  const callWorker = async (type, payload) => {
    const endpoint = type === 'image' ? '/api/image' : '/api/text';
    const resp = await fetch(workerUrl + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return resp.json();
  };

  // ==========================================
  // 5. 3 个快捷按钮 — 输入框上方的圆角标签
  // ==========================================
  const handleQuickAction = (action) => {
    const prompts = {
      topic: '推荐一个短视频选题，要求有创意、适合TVC广告风格',
      reference: '帮我查找并描述几个适合以下画面的视觉参考图',
      opening: '帮我创作一个引人入胜的视频开场白，适合广告短片',
    };
    setModelTab('Text');
    setSelectedModel('Gemini Pro');
    setTextTask(action);
    setChatInput(prompts[action] || '');
  };

  // ==========================================
  // 6. handleSend — 核心：发消息 → 调 API → 显示结果
  // ==========================================
  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    // 把用户消息加到聊天气泡
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', type: 'text', content: userText }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const isImage = modelTab === 'Image';
      const isVideo = modelTab === 'Video';

      if (isVideo) {
        // 视频暂未接入
        setMessages(prev => [...prev, {
          id: Date.now() + 1, role: 'ai', type: 'text',
          content: `【${selectedModel}】视频生成暂未接入 API，敬请期待。`
        }]);
      } else if (isImage) {
        // --- 图片生成 ---
        const result = await callWorker('image', { prompt: userText });
        if (result.success && result.image) {
          setMessages(prev => [...prev, {
            id: Date.now() + 1, role: 'ai', type: 'image',  // type: 'image' → 渲染 img 标签
            content: result.image,
            text: `${selectedModel} · ${selectedSkill}`
          }]);
        } else {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `生成失败：${result.error || '未知错误'}` }]);
        }
      } else {
        // --- 文本生成 ---
        const result = await callWorker('text', { prompt: userText, actionType: textTask });
        if (result.success) {
          setMessages(prev => [...prev, {
            id: Date.now() + 1, role: 'ai', type: 'text',  // type: 'text' → 显示文字气泡
            content: result.text
          }]);
        } else {
          setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `生成失败：${result.error || '未知错误'}` }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', type: 'text', content: `请求失败：${err.message}` }]);
    }
    setTextTask('assistant');
    setIsTyping(false);
  };

  // ==========================================
  // 7. JSX 渲染 — 从上到下：头部 / 聊天区 / 快捷按钮 / 输入栏
  // ==========================================
  return (
    <>
      <div className={`fixed top-0 right-0 w-[440px] bg-[#F4F6FB] h-full border-l border-slate-200/80 flex flex-col transition-transform duration-300 z-[5000] shadow-[-30px_0_90px_rgba(15,23,42,0.16)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* ---------- 7a. 顶部 ---------- */}
        <div className="px-5 pt-5 pb-6 flex items-start justify-between shrink-0 bg-white/95 text-slate-900 border-b border-slate-200/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-16 -right-12 w-40 h-40 rounded-full bg-indigo-100/80 blur-3xl pointer-events-none" />
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-[15px] bg-gradient-to-br from-indigo-400 to-violet-600 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(99,102,241,0.42)]"><Clapperboard size={19} /></div>
            <div>
              <div className="flex items-center gap-2"><div className="text-[15px] font-extrabold tracking-wide text-slate-900">AI Director</div><span className="px-1.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[9px] font-bold text-indigo-600">BETA</span></div>
              <div className="text-[11px] text-slate-400 font-medium mt-1">你的分镜、画面与视频创意工作台</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setMessages([{ id: 'm1', role: 'ai', type: 'text', content: '上下文已清空。' }])}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors" title="清空对话">
              <Eraser size={15} strokeWidth={2}/>
            </button>
            <button onClick={onClose}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors" title="收起面板">
              <X size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>

        {/* AI 导演快捷工作台 */}
        <div className="px-5 -mt-3 relative z-10 shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-[22px] p-3.5 shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
            <div className="flex items-center justify-between px-1 mb-3">
              <div className="flex items-center gap-2"><Activity size={13} className="text-indigo-600"/><span className="text-[11px] font-extrabold text-slate-800 tracking-wide">快捷创作</span></div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>系统在线</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleQuickAction('topic')} className="director-action-card group">
                <span className="director-action-icon bg-indigo-50 text-indigo-600"><Sparkles size={15}/></span>
                <span>推荐选题</span>
              </button>
              <button onClick={() => handleQuickAction('reference')} className="director-action-card group">
                <span className="director-action-icon bg-sky-50 text-sky-600"><Search size={15}/></span>
                <span>画面参考</span>
              </button>
              <button onClick={() => handleQuickAction('opening')} className="director-action-card group">
                <span className="director-action-icon bg-violet-50 text-violet-600"><Clapperboard size={15}/></span>
                <span>视频开场</span>
              </button>
            </div>
          </div>
        </div>

        {/* ---------- 7b. 聊天瀑布流 ---------- */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 custom-scrollbar bg-[#F4F6FB]">
          {messages.map(msg => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[95%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.role === 'ai' && <span className="text-[10px] font-bold text-gray-300 mb-1.5 font-mono">10:42 AM</span>}

                {/* 图片消息 → 渲染 img */}
                {msg.type === 'image' ? (
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={msg.content} alt="AI Generated" className="max-w-full h-auto" />
                    {msg.text && <p className="text-[11px] text-gray-400 px-3 py-2 bg-gray-50">{msg.text}</p>}
                  </div>
                ) : (
                  /* 文本消息 → 气泡 */
                  <div className={`text-[13px] leading-relaxed font-medium ${msg.role === 'user'
                    ? 'bg-indigo-600 border border-indigo-600 text-white px-4 py-3 rounded-[18px] rounded-tr-sm shadow-[0_8px_22px_rgba(79,70,229,0.22)]'
                    : 'bg-white border border-slate-200/80 text-slate-700 whitespace-pre-wrap px-4 py-3.5 rounded-[18px] rounded-tl-sm shadow-[0_8px_24px_rgba(15,23,42,0.06)]'}`}>
                    {msg.content}
                  </div>
                )}

                {/* 控制卡片（保留，但当前已不用） */}
                {msg.type === 'control_card' && msg.cardData && (
                  <div className="mt-3 bg-white border border-gray-100 rounded-2xl p-4 w-full space-y-4 animate-fade-in shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px] font-bold">
                        <span className="text-gray-500">美学调性一致率</span>
                        <span className="text-indigo-600 bg-indigo-50 px-1.5 rounded">{msg.cardData.intensity}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={msg.cardData.intensity}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMessages(messages.map(m => m.id === msg.id ? { ...m, cardData: { ...m.cardData, intensity: val } } : m));
                        }}
                        className="w-full h-1 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-600 outline-none"
                      />
                    </div>
                    <button onClick={() => { if (onDeploy) onDeploy({ ...msg.cardData, skill: selectedSkill }); }}
                      className="w-full py-2.5 bg-[#FAFAFA] border border-gray-200 hover:bg-white hover:border-gray-300 text-gray-800 text-[11px] font-bold rounded-xl transition-all shadow-sm">
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

        {/* ---------- 7d. 底部输入栏 ---------- */}
        <div className="p-5 pt-2 bg-[#F4F6FB] shrink-0">
          <div className="bg-white border border-slate-200 rounded-[22px] p-3 flex flex-col shadow-[0_18px_45px_rgba(15,23,42,0.10)] focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100/60 transition-all">
            {/* 输入框 */}
            <div className="w-full relative">
              <textarea value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                className="w-full bg-transparent border-none outline-none text-[14px] text-slate-800 font-medium px-2 py-2 resize-none min-h-[48px] max-h-[120px] custom-scrollbar leading-relaxed placeholder:text-slate-400"
                placeholder="输入你想要生成的内容描述..."
              />
            </div>

            {/* 底部工具栏 */}
            <div className="flex items-center justify-between mt-2 pt-2 relative">
              <div className="flex items-center space-x-1.5">
                <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50">
                  <Plus size={18} strokeWidth={2}/>
                </button>
                <div className="w-px h-3.5 bg-gray-200 mx-1"></div>

                {/* --- 技能下拉 --- */}
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowSkillMenu(!showSkillMenu); }}
                    className={`flex items-center px-2 py-1 text-gray-800 rounded-lg transition-colors group ${showSkillMenu ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                    <Zap size={14} className="mr-1 text-gray-600" />
                    <span className="text-[12px] font-extrabold tracking-wide">{selectedSkill}</span>
                    <ChevronDown size={14} className="ml-0.5 text-gray-400" />
                  </button>
                  {showSkillMenu && (
                    <div className="absolute bottom-[calc(100%+12px)] left-0 w-[240px] bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[20px] p-2 z-[100] animate-fade-in"
                      onClick={e => e.stopPropagation()}>
                      <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">选择生成管线</div>
                      <div className="max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
                        {SKILLS.map(skill => (
                          <button key={skill.id} onClick={() => { setSelectedSkill(skill.name); setShowSkillMenu(false); }}
                            className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors group mb-1 border border-transparent hover:border-gray-100">
                            <div className="text-[13px] font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{skill.name}</div>
                            <div className="text-[11px] text-gray-400 mt-1 leading-snug">{skill.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* --- 模型选择 --- */}
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowModelMenu(!showModelMenu); }}
                    className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50" title="模型偏好设置">
                    <Box size={16} strokeWidth={2} />
                  </button>
                  {showModelMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] w-[360px] animate-fade-in overflow-hidden"
                      onClick={e => e.stopPropagation()}>
                      {/* Image / Video / Text 标签栏 */}
                      <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                          {['Image', 'Video', 'Text'].map(tab => (
                            <button key={tab} onClick={() => setModelTab(tab)}
                              className={`px-3.5 py-1.5 text-[12px] font-bold rounded-md transition-all ${modelTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                              {tab}
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setAutoMode(!autoMode)}
                          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${autoMode ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}>
                          <span>Auto</span>
                          <div className={`w-6 h-3 rounded-full transition-colors ${autoMode ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-transform mt-[1px] ${autoMode ? 'translate-x-3' : 'translate-x-0.5'}`} />
                          </div>
                        </button>
                      </div>
                      {/* 模型卡片列表 */}
                      <div className="px-3 pb-3 pt-1 space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar">
                        {(MODEL_DATA[modelTab] || []).map(m => (
                          <button key={m.name} onClick={() => { setSelectedModel(m.name); setShowModelMenu(false); }}
                            className={`w-full text-left p-3 rounded-xl transition-all border ${selectedModel === m.name ? 'bg-indigo-50/30 border-indigo-200 shadow-sm' : 'bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}>
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

              {/* 积分 + 发送按钮 */}
              <div className="flex items-center space-x-3 mr-1">
                <span className="text-[11px] font-bold text-gray-400">消耗 <span className="text-indigo-600">2 积分</span></span>
                <button onClick={handleSend} disabled={!chatInput.trim()}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${!chatInput.trim() ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_8px_20px_rgba(79,70,229,0.28)] hover:-translate-y-0.5'}`}>
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
