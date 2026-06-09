import React, { useState, useEffect, useRef } from 'react';
import { 
  AlignLeft, Image as ImageIcon, Activity, Upload, 
  Settings, MessageSquare, Home, Star, Sparkles,
  Mic, ArrowUp, Plus, X, Bold, Italic, List, Maximize2, Minimize2,
  Play, Download, CheckCircle2, Users, User, UserPlus, Mail,
  ChevronDown, Aperture, Zap, Layout, FolderOpen,
  AlertCircle, Sliders, Camera as CameraIcon,
  Command, RefreshCw, Sun, Hexagon, Copy, MousePointer, ArrowRight,
  PlusCircle, BoxSelect, History, PlaySquare, AudioWaveform, Key,
  Monitor, BarChart2, Eraser, FlipHorizontal, LayoutGrid, ListTree, FileOutput,
  DownloadCloud, UserCircle
} from 'lucide-react';

// --- 悬浮工具栏组件 ---
const FloatingTextToolbar = () => (
  <div onMouseDown={(e) => e.stopPropagation()} className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center space-x-4 shadow-lg z-20 animate-fade-in cursor-auto pointer-events-auto">
    <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-sm"></div>
    <div className="w-px h-4 bg-gray-200"></div>
    <span className="text-gray-400 text-xs font-mono hover:text-gray-900 cursor-pointer transition-colors">H1</span>
    <span className="text-gray-400 text-xs font-mono hover:text-gray-900 cursor-pointer transition-colors">H2</span>
    <span className="text-gray-400 text-xs font-mono hover:text-gray-900 cursor-pointer transition-colors">H3</span>
    <AlignLeft size={14} className="text-gray-900 cursor-pointer" strokeWidth={1.5} />
    <div className="w-px h-4 bg-gray-200"></div>
    <Bold size={14} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" strokeWidth={2} />
    <Italic size={14} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" strokeWidth={2} />
    <List size={14} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" strokeWidth={2} />
    <div className="w-px h-4 bg-gray-200"></div>
    <Maximize2 size={14} className="text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" strokeWidth={1.5} />
  </div>
);

const FloatingImageToolbar = ({ status }) => (
  <div onMouseDown={(e) => e.stopPropagation()} className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center space-x-4 shadow-lg z-30 animate-fade-in-down cursor-auto whitespace-nowrap pointer-events-auto">
    <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors group">
      <Layout size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
      <span>全景</span>
      <span className="bg-cyan-50 border border-cyan-100 text-cyan-600 text-[9px] px-1.5 py-0.5 rounded-md transform scale-90 font-bold tracking-wide">NEW</span>
    </button>
    <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors group">
      <RefreshCw size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
      <span>多角度</span>
    </button>
    <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors group">
      <BoxSelect size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
      <span>局部重绘</span>
    </button>
    <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors group">
      <Sun size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
      <span>打光</span>
    </button>
    <div className="w-px h-4 bg-gray-200"></div>
    <button className="flex items-center space-x-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors group">
      <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 group-hover:bg-gray-100 transition-colors">
        <span className="font-bold text-gray-500 text-[9px]">HD</span>
        <span>高清</span>
      </div>
      <ChevronDown size={12} className="text-gray-400 ml-0.5" />
    </button>
    {status === 'completed' && (
      <React.Fragment>
        <div className="w-px h-4 bg-gray-200"></div>
        <div className="flex items-center space-x-3.5 text-gray-400">
          <button className="hover:text-gray-900 transition-colors" title="局部擦除"><Eraser size={15} /></button>
          <button className="hover:text-gray-900 transition-colors" title="镜像翻转"><FlipHorizontal size={15} /></button>
          <button className="hover:text-gray-900 transition-colors" title="下载资源"><Download size={15} /></button>
          <button className="hover:text-gray-900 transition-colors" title="全屏扩展"><Maximize2 size={15} /></button>
        </div>
      </React.Fragment>
    )}
  </div>
);

const renderApiIcon = (apiName) => {
  if (!apiName) return <span className="mr-1.5">✨</span>;
  if (apiName.includes('Seedream')) return <Activity size={14} className="mr-1.5" />;
  if (apiName.includes('Midjourney')) return <span className="mr-1.5">⛵</span>;
  if (apiName.includes('Banana')) return <span className="mr-1.5">🍌</span>;
  if (apiName.includes('Minimax')) return <Aperture size={14} className="mr-1.5" />;
  if (apiName.includes('Mureka V8')) return <span className="mr-1.5">💖</span>;
  if (apiName.includes('Mureka O2')) return <span className="mr-1.5">💼</span>;
  if (apiName.includes('Happy Horse')) return <span className="mr-1.5 text-[14px]">🎠</span>;
  if (apiName.includes('Kling')) return <Aperture size={14} className="mr-1.5" />;
  if (apiName.includes('Wan')) return <Hexagon size={14} className="mr-1.5" />;
  return <span className="mr-1.5">✨</span>; 
};

// ==========================================
// 主应用组件
// ==========================================
export default function App() {
  const [credits, setCredits] = useState(12850);
  const [activeNode, setActiveNode] = useState('node-1');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('写实摄影'); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [dynamicCredits, setDynamicCredits] = useState(14);
  
  const [textApiModel, setTextApiModel] = useState('Gemini 3.5 Flash'); 
  const [imageApiModel, setImageApiModel] = useState('Seedream 4.6'); 
  const [videoApiModel, setVideoApiModel] = useState('Kling O3'); 
  const [audioApiModel, setAudioApiModel] = useState('Minimax-speech-2.8-hd'); 

  const [openModelDropdownId, setOpenModelDropdownId] = useState(null); 
  const [openBatchDropdownId, setOpenBatchDropdownId] = useState(null); 
  const [proModeNodeId, setProModeNodeId] = useState(null); 

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [viewMode, setViewMode] = useState('canvas'); 
  
  const [activeSidebar, setActiveSidebar] = useState('nodes');
  const [assetTab, setAssetTab] = useState('all');
  const [historyTab, setHistoryTab] = useState('all');
  const [isAssetExpanded, setIsAssetExpanded] = useState(false); 

  const [batchSize, setBatchSize] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [cameraMotion, setCameraMotion] = useState('推镜头');
  const [videoDuration, setVideoDuration] = useState(5); 
  const [videoRes, setVideoRes] = useState('1080p');

  const [splashState, setSplashState] = useState('entering'); 
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('general');
  const [isApprovalFlowOn, setIsApprovalFlowOn] = useState(true);

  const [isBrandStyleModalOpen, setIsBrandStyleModalOpen] = useState(false);
  const [brandScenario, setBrandScenario] = useState('高端产品广告');
  const [brandStrength, setBrandStrength] = useState(80);
  const [brandStability, setBrandStability] = useState(70);
  const [brandPreserve, setBrandPreserve] = useState(90);
  const [analyzingTags, setAnalyzingTags] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicCredits(Math.floor(Math.random() * (28 - 12 + 1)) + 12);
    }, 4500); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isBrandStyleModalOpen) {
      setAnalyzingTags(true);
      const timer = setTimeout(() => setAnalyzingTags(false), 600);
      return () => clearTimeout(timer);
    }
  }, [brandScenario, isBrandStyleModalOpen]);

  useEffect(() => {
    const timer1 = setTimeout(() => setSplashState('visible'), 100);
    const timer2 = setTimeout(() => setSplashState('leaving'), 2000); 
    const timer3 = setTimeout(() => setSplashState('hidden'), 2700); 
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  const getScenarioTags = (scenario) => {
    const map = {
      'TVC 广告': ['广告级打光', '电影感', '色彩饱和', '高级动态'],
      '电商短视频': ['极简商业', '高亮主图', '快节奏', '视觉中心'],
      '小红书种草': ['日系柔光', '氛围感', '生活化', '微颗粒感'],
      '高端产品广告': ['Apple 风', '高级灰', '极简构图', '慢镜头'],
      '国风': ['东方美学', '水墨留白', '低饱和度', '对称构图'],
      '日系': ['胶片质感', '青蓝冷调', '自然光影', '生活呼吸感'],
      '科技感': ['赛博霓虹', '高对比度', '冷色温', '几何切割']
    };
    return map[scenario] || ['智能适配', '高质量解析'];
  };

  const [pan, setPan] = useState({ x: 0, y: 0 }); 
  const panRef = useRef({ x: 0, y: 0 });
  const startPanRef = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const isPanningRef = useRef(false);
  const [draggingNodeId, setDraggingNodeId] = useState(null); 
  const draggingNodeRef = useRef(null);
  const startNodePosRef = useRef({ startX: 0, startY: 0, nodeX: 0, nodeY: 0 });

  const [nodes, setNodes] = useState([
    { id: 'node-1', type: 'text', title: '脚本设定', content: '在一个废弃的火星基地上，一名孤独的侦探正在检查闪烁的全息投影，镜头缓慢推近...', status: 'idle', x: 100, y: 100, parentId: null },
    { id: 'node-2', type: 'image', title: '视觉参考', content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', prompt: '[写实摄影] 孤独侦探背影', status: 'completed', x: 660, y: 100, parentId: 'node-1' },
    { id: 'node-3', type: 'video', title: '受控视频流', content: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000', prompt: '缓慢推镜头，光影闪烁', status: 'completed', x: 1220, y: 100, parentId: 'node-2' }
  ]);
  const nodesRef = useRef(nodes); 
  useEffect(() => { nodesRef.current = nodes; }, [nodes]);

  const [frames, setFrames] = useState([]);
  const [drawingLink, setDrawingLink] = useState(null); 
  const drawingLinkRef = useRef(null);
  const [dropMenu, setDropMenu] = useState(null);

  const getCenterY = (type) => type === 'text' ? 270 : 240;

  useEffect(() => {
    if (viewMode !== 'canvas') return; 
    const handleGlobalMouseMove = (e) => {
      if (isPanningRef.current) {
        const newX = e.clientX - startPanRef.current.x;
        const newY = e.clientY - startPanRef.current.y;
        setPan({ x: newX, y: newY });
        panRef.current = { x: newX, y: newY };
      } else if (draggingNodeRef.current) {
        const dx = e.clientX - startNodePosRef.current.startX;
        const dy = e.clientY - startNodePosRef.current.startY;
        setNodes(prev => prev.map(n => n.id === draggingNodeRef.current ? { ...n, x: startNodePosRef.current.nodeX + dx, y: startNodePosRef.current.nodeY + dy } : n));
      } else if (drawingLinkRef.current) {
        drawingLinkRef.current = {
          ...drawingLinkRef.current,
          endX: e.clientX - panRef.current.x,
          endY: e.clientY - panRef.current.y
        };
        setDrawingLink({ ...drawingLinkRef.current });
      }
    };
    const handleGlobalMouseUp = () => {
      isPanningRef.current = false; setIsPanning(false);
      draggingNodeRef.current = null; setDraggingNodeId(null);
      if (drawingLinkRef.current) {
        const sourceNode = nodesRef.current.find(n => n.id === drawingLinkRef.current.sourceNodeId);
        if (sourceNode) {
          const sourceCenterY = getCenterY(sourceNode.type);
          const dx = drawingLinkRef.current.endX - (sourceNode.x + 480);
          const dy = drawingLinkRef.current.endY - (sourceNode.y + sourceCenterY);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 15) {
            setDropMenu({ sourceNodeId: sourceNode.id, x: sourceNode.x + 520, y: sourceNode.y + sourceCenterY });
          } else {
            setDropMenu({ sourceNodeId: sourceNode.id, x: drawingLinkRef.current.endX, y: drawingLinkRef.current.endY });
          }
        }
        drawingLinkRef.current = null;
        setDrawingLink(null);
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [viewMode, nodes]);

  const showMessage = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const closeAllMenus = () => {
    setDropMenu(null); 
    setOpenModelDropdownId(null); 
    setOpenBatchDropdownId(null); 
    setProModeNodeId(null);
  };

  const handleCanvasMouseDown = (e) => {
    closeAllMenus();
    if (e.target.id === 'canvas-bg' || e.target.tagName.toLowerCase() === 'svg') {
      isPanningRef.current = true; setIsPanning(true);
      startPanRef.current = { x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y };
    }
  };

  const handleNodeMouseDown = (e, id) => {
    e.stopPropagation(); 
    setActiveNode(id);
    closeAllMenus();
    draggingNodeRef.current = id; setDraggingNodeId(id);
    const node = nodes.find(n => n.id === id);
    startNodePosRef.current = { startX: e.clientX, startY: e.clientY, nodeX: node.x, nodeY: node.y };
  };

  const resetView = () => { setPan({ x: 0, y: 0 }); panRef.current = { x: 0, y: 0 }; showMessage("视角已重置回原点"); };

  const handleAutoGroup = () => {
    if (nodes.length === 0) return;
    const minX = Math.min(...nodes.map(n => n.x));
    const minY = Math.min(...nodes.map(n => n.y));
    const maxX = Math.max(...nodes.map(n => n.x + 480)); 
    const maxY = Math.max(...nodes.map(n => n.y + (n.type === 'text' ? 540 : 480))); 
    const newFrame = { id: `frame-${Date.now()}`, title: `镜头 ${String(frames.length + 1).padStart(2, '0')}: 开场场景`, x: minX - 80, y: minY - 100, width: (maxX - minX) + 160, height: (maxY - minY) + 180 };
    setFrames([...frames, newFrame]);
    showMessage(`已成功框选并生成 [${newFrame.title}] 镜头组`, "success");
  };

  const handleAddNode = (sourceNodeId, type, targetX, targetY) => {
    const newNodeId = `node-${Date.now()}`;
    let title = type === 'text' ? '文本' : type === 'image' ? '图像' : type === 'video' ? '视频流' : '音效配乐';
    let newX = sourceNodeId ? (targetX ?? nodes.find(n => n.id === sourceNodeId)?.x + 560) : 150 - pan.x;
    let newY = sourceNodeId ? (targetY ?? nodes.find(n => n.id === sourceNodeId)?.y) - (targetY ? getCenterY(type) : 0) : (nodes.length > 0 ? Math.max(...nodes.map(n => n.y)) : 100) + 520;
    
    setNodes([...nodes, { id: newNodeId, type, title, content: null, status: 'empty', x: newX, y: newY, parentId: sourceNodeId || null }]);
    setActiveNode(newNodeId);
  };

  const handleDeleteNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
    if (activeNode === id) setActiveNode(nodes[0]?.id || null);
  };

  const handleGenerate = () => {
    if (isGenerating) return;
    if (isApprovalFlowOn && nodes.find(n => n.id === activeNode)?.type === 'video') {
      showMessage("受控视频流属于高阶算力消耗，需甲方确认后渲染。", "error");
      return;
    }
    if (!prompt.trim()) { showMessage("请先在指令区输入提示词！", "error"); return; }
    const targetNodeIndex = nodes.findIndex(n => n.id === activeNode && n.status === 'empty');
    if (targetNodeIndex === -1) { showMessage("操作中断：当前节点非空，请先添加一个空白节点接收结果。", "error"); return; }
    
    setIsGenerating(true);
    const newNodes = [...nodes];
    newNodes[targetNodeIndex].status = 'generating';
    setNodes(newNodes);
    setPrompt('');
    setCredits(prev => prev - (nodes[targetNodeIndex].type === 'video' ? 50 : 10));
    
    const finalPrompt = `[${selectedStyle}] ${prompt}`; 
    setTimeout(() => {
      const updatedNodes = [...nodes];
      const resImg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
      updatedNodes[targetNodeIndex] = { ...newNodes[targetNodeIndex], status: 'completed', content: resImg, prompt: finalPrompt };
      setNodes(updatedNodes);
      setIsGenerating(false);
      showMessage("资产渲染完毕，已自动归档至项目库。", "success");
    }, 2500);
  };

  const handleAITextAction = (nodeId, actionType) => {
    showMessage(`正在调用 AI 算力 ${actionType}...`, "info");
    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
          let newContent = n.content || '';
          if (actionType === '智能扩写大纲') {
            newContent = `【故事梗概】\n隐藏在全息投影背后的古老阴谋。\n\n【主要人物】\n1. K (侦探)：右眼佩戴着战损版义眼。\n2. 艾拉 (AI投影)：掌握着核心密钥。`;
          } else if (actionType === '提炼英文提示词') {
            newContent = "Masterpiece, solitary detective, abandoned Mars base, slow push-in camera, 8k resolution, photorealistic.";
          } else if (actionType === '润色剧本语气') {
            newContent = "【悬疑氛围】" + newContent.replace('孤独的侦探', '目光深邃的调查员');
          }
          return { ...n, content: newContent };
        }
        return n;
      }));
      showMessage(`AI ${actionType} 完成！`, "success");
    }, 1500);
  };

  let drawingPath = null;
  if (drawingLink) {
    const sourceNode = nodes.find(n => n.id === drawingLink.sourceNodeId);
    if (sourceNode) {
      const startX = sourceNode.x + pan.x + 480; 
      const startY = sourceNode.y + pan.y + getCenterY(sourceNode.type);
      const endX = drawingLink.endX + pan.x;
      const endY = drawingLink.endY + pan.y;
      const controlPointX = startX + (endX - startX) / 2;
      drawingPath = `M ${startX} ${startY} C ${controlPointX} ${startY}, ${controlPointX} ${endY}, ${endX} ${endY}`;
    }
  }

  const storyboardShots = React.useMemo(() => {
    if (!nodes || nodes.length === 0) return [];
    try {
      const paths = [];
      const getPaths = (currentId, currentPath) => {
        const children = nodes.filter(n => n.parentId === currentId);
        const currentNode = nodes.find(n => n.id === currentId);
        if (!currentNode) return;
        const newPath = [...currentPath, currentNode];
        if (children.length === 0) {
          paths.push(newPath);
        } else {
          children.forEach(child => getPaths(child.id, newPath));
        }
      };
      const roots = nodes.filter(n => !n.parentId || !nodes.find(p => p.id === n.parentId));
      roots.forEach(root => getPaths(root.id, []));

      return paths.map((path, index) => {
        const textNode = path.find(n => n.type === 'text');
        const imageNode = [...path].reverse().find(n => n.type === 'image'); 
        const videoNode = path.find(n => n.type === 'video');
        const audioNode = path.find(n => n.type === 'audio');
        
        const styleMatchRegex = new RegExp('\\[(.*?)\\]');
        const styleMatch = (imageNode?.prompt || textNode?.prompt || '').match(styleMatchRegex);
        const style = styleMatch ? styleMatch[1] : (textNode ? '剧本默认' : '未指定');
        
        const isGenerating = path.some(n => n.status === 'generating');
        const isCompleted = path.every(n => n.status === 'completed' || n.status === 'idle');

        return {
          id: `shot-${index}`,
          shotNumber: String(index + 1).padStart(2, '0'),
          visualContent: videoNode?.content || imageNode?.content || "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1000&auto=format&fit=crop", 
          visualType: videoNode?.status === 'completed' ? 'video' : (imageNode?.status === 'completed' ? 'image' : 'empty'),
          camera: videoNode ? '按设定运镜' : '静止全景 (Static)',
          style: style,
          text: textNode?.content || '（暂无旁白或画面描述）',
          audioStatus: audioNode ? (audioNode.status === 'completed' ? '已挂载音效/旁白' : '等待渲染音频...') : '（未挂载音频轨道）',
          duration: videoNode ? '4.0s' : (imageNode ? '2.0s' : '0s'),
          status: isGenerating ? 'generating' : (isCompleted ? 'ready' : 'pending')
        };
      });
    } catch (e) {
      return [];
    }
  }, [nodes]);

  // ========================================================
  // DOM 渲染区域 (绝对扁平化防遮挡重构版)
  // ========================================================
  return (
    <div className="fixed inset-0 bg-[#F8F9FA] text-gray-900 font-sans overflow-hidden selection:bg-indigo-500/20">
      
      {/* -------------------------------------
          第 1 模块: 启动动画 (Z: 9999)
      ------------------------------------- */}
      {splashState !== 'hidden' && (
        <div className={`fixed inset-0 flex flex-col items-center justify-center bg-[#05050A] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${splashState === 'leaving' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`} style={{ zIndex: 9999 }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[120px] animate-blob1 mix-blend-screen"></div>
            <div className="absolute bottom-[10%] right-[20%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[140px] animate-blob2 mix-blend-screen" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] animate-blob1 mix-blend-screen" style={{ animationDelay: '4s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-0 tech-grid opacity-50 mask-radial-fade"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-36 h-36 mb-12 group transform transition-all duration-700 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-[40px] rounded-full opacity-60"></div>
              <div className="absolute w-20 h-20 left-2 top-2 rounded-full bg-gradient-to-tr from-[#FF6B6B] via-[#845EC2] to-[#4FACFE] animate-spin-slow shadow-[0_0_30px_rgba(132,94,194,0.5)]" style={{ animationDuration: '10s' }}></div>
              <div className="absolute w-20 h-20 left-2 top-2 rounded-full bg-gradient-to-br from-[#FF9A9E]/60 to-transparent mix-blend-overlay"></div>
              <div className="absolute w-[6.5rem] h-[6.5rem] right-1 bottom-1 rounded-full bg-white/10 backdrop-blur-xl border-t border-l border-white/40 border-b border-r border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                <svg viewBox="0 0 24 24" className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse relative z-10">
                  <path d="M 12 0 C 12 10, 14 12, 24 12 C 14 12, 12 14, 12 24 C 12 14, 10 12, 0 12 C 10 12, 12 10, 12 0 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-3xl font-bold text-white tracking-tight animate-reveal-up opacity-0" style={{ animationDelay: '0.2s' }}>
                VideoStudio <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A9E] via-[#A18CD1] to-[#00C9FF]">Pro</span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------
          第 2 模块: 全局消息通知 (Z: 9000)
      ------------------------------------- */}
      {toast.show && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-fade-in-down pointer-events-none" style={{ zIndex: 9000 }}>
          <div className="flex items-center px-4 py-2.5 rounded-full shadow-xl border backdrop-blur-md bg-gray-900/90 border-gray-800 text-white">
            {toast.type === 'error' ? <AlertCircle size={16} className="mr-2 text-red-400" /> : toast.type === 'success' ? <CheckCircle2 size={16} className="mr-2 text-green-400" /> : <Sparkles size={16} className="mr-2 text-indigo-400" />}
            <span className="text-[13px] font-medium tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}

      {/* -------------------------------------
          第 3 模块: 主内容区 (Z: 0)
      ------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* === 视图 A: 无限画布 === */}
        {viewMode === 'canvas' && (
          <React.Fragment>
            {/* 画布底板交互区 */}
            <div id="canvas-bg" onMouseDown={handleCanvasMouseDown} className={`absolute inset-0 w-full h-full dot-pattern pointer-events-auto ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`} style={{ backgroundPosition: `${pan.x}px ${pan.y}px` }}>
              
              {/* 框选边框 */}
              <div className="absolute inset-0 pointer-events-none">
                {frames.map((frame) => (
                  <div key={frame.id} className="absolute border-2 border-dashed border-indigo-400/50 bg-indigo-50/20 transition-all duration-300 rounded-[2.5rem]" style={{ left: frame.x + pan.x, top: frame.y + pan.y, width: frame.width, height: frame.height, boxShadow: 'inset 0 0 50px rgba(99, 102, 241, 0.05)' }}>
                    <div className="absolute -top-4 left-8 bg-white border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center"><BoxSelect size={14} className="mr-1.5 opacity-70"/>{frame.title}</div>
                  </div>
                ))}
              </div>

              {/* 连线 SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {nodes.map((node) => {
                  if (!node.parentId) return null; 
                  const prevNode = nodes.find(n => n.id === node.parentId);
                  if (!prevNode) return null;
                  const startX = prevNode.x + pan.x + 480; 
                  const startY = prevNode.y + pan.y + getCenterY(prevNode.type); 
                  const endX = node.x + pan.x;
                  const endY = node.y + pan.y + getCenterY(node.type); 
                  const controlPointX = startX + (endX - startX) / 2;
                  const path = `M ${startX} ${startY} C ${controlPointX} ${startY}, ${controlPointX} ${endY}, ${endX} ${endY}`;
                  return (
                    <g key={`link-${node.id}`}>
                      <path d={path} stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
                      <circle cx={startX} cy={startY} r="4" fill="#fff" stroke="#94A3B8" strokeWidth="2" />
                      <circle cx={endX} cy={endY} r="4" fill="#fff" stroke="#94A3B8" strokeWidth="2" />
                    </g>
                  );
                })}
                {drawingPath && (
                  <g>
                    <path d={drawingPath} stroke="#6366F1" strokeWidth="3" strokeDasharray="6,4" fill="none" className="animate-pulse" />
                    <circle cx={drawingLink.endX + pan.x} cy={drawingLink.endY + pan.y} r="5" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                  </g>
                )}
              </svg>

              {/* 节点实体 */}
              {nodes.map((node) => {
                const isDraggingThis = draggingNodeId === node.id;
                const isActive = activeNode === node.id;
                let scale = 1; if (isDraggingThis) scale = 1.03; else if (isActive) scale = 1.02;

                const isMediaNode = node.type === 'image' || node.type === 'video';
                const isAudioNode = node.type === 'audio';
                let currentApi = node.type === 'video' ? videoApiModel : node.type === 'image' ? imageApiModel : node.type === 'audio' ? audioApiModel : textApiModel;

                const isThisModelDropdownOpen = openModelDropdownId === node.id;
                const isThisBatchDropdownOpen = openBatchDropdownId === node.id;
                const isThisProModeOpen = proModeNodeId === node.id;

                return (
                  <div 
                    key={node.id} 
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    className={`absolute w-[480px] ${node.type === 'text' ? 'min-h-[540px]' : 'h-[480px]'} flex flex-col cursor-move group/pipeline rounded-[1.5rem] pointer-events-auto ${isActive ? 'border-2 border-gray-900 bg-white' : 'border border-gray-200 bg-white/90 backdrop-blur hover:border-gray-300'}`}
                    style={{ 
                      transform: `translate(${node.x + pan.x}px, ${node.y + pan.y}px) scale(${scale})`,
                      transition: isDraggingThis ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s',
                      boxShadow: isDraggingThis ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : isActive ? '0 12px 40px rgba(0,0,0,0.08)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                      zIndex: isDraggingThis ? 80 : (isActive ? 70 : 50)
                    }}
                  >
                    {/* 悬浮工具栏 */}
                    {isActive && node.type === 'image' && <FloatingImageToolbar status={node.status} />}
                    {isActive && node.type === 'text' && <FloatingTextToolbar />}

                    {/* 节点标题 */}
                    <div className="absolute -top-8 left-0 flex items-center space-x-2 text-gray-400 pointer-events-none">
                      <div className="w-4 h-px bg-gray-300"></div><span className="text-[11px] uppercase tracking-wider font-mono font-semibold text-gray-500">{node.title}</span>
                    </div>
                    
                    {/* 删除按钮 */}
                    {nodes.length > 1 && (
                      <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }} className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all opacity-0 group-hover/pipeline:opacity-100 shadow-sm cursor-pointer z-50"><X size={12} strokeWidth={2.5} /></button>
                    )}

                    {/* 节点内容 */}
                    <div className="flex-1 w-full h-full p-8 relative overflow-hidden flex flex-col">
                      {node.type === 'text' && (
                        <div className="flex flex-col h-full w-full">
                          <textarea onMouseDown={(e) => e.stopPropagation()} value={node.content || ''} onChange={(e) => { const val = e.target.value; setNodes(prev => prev.map(n => n.id === node.id ? { ...n, content: val } : n)); }} className="flex-1 w-full bg-transparent text-gray-800 text-[16px] leading-relaxed resize-none focus:outline-none placeholder-gray-300 custom-scrollbar font-medium cursor-text min-h-[220px]" placeholder="在这里输入您的创意脚本或描述..." />
                          
                          <div className="mt-2 mb-3 flex flex-col" onMouseDown={(e) => e.stopPropagation()}>
                            <div className="flex items-center text-[12px] font-bold text-indigo-500 mb-2.5"><Star size={14} className="mr-1.5" /><span>画面风格</span></div>
                            <div className="flex flex-wrap gap-2">
                              {['写实摄影', '赛博朋克', '极简3D', '水墨国风', '日系动漫', '复古胶片', 'TVC广告'].map(style => (
                                <button key={style} onClick={() => setSelectedStyle(style)} className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${selectedStyle === style ? 'bg-indigo-500 text-white shadow-sm border border-indigo-500' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}>{style}</button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2.5 mt-2 pb-4" onMouseDown={(e) => e.stopPropagation()}>
                             <button onClick={() => handleAITextAction(node.id, '智能扩写大纲')} className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[12px] font-bold hover:bg-indigo-100 transition-colors shadow-sm"><Sparkles size={14} className="mr-1.5"/>扩写大纲</button>
                             <button onClick={() => handleAITextAction(node.id, '提炼英文提示词')} className="flex items-center px-3 py-2 bg-cyan-50 text-cyan-600 rounded-xl text-[12px] font-bold hover:bg-cyan-100 transition-colors shadow-sm"><Aperture size={14} className="mr-1.5"/>转提示词</button>
                             <button onClick={() => handleAITextAction(node.id, '润色剧本语气')} className="flex items-center px-3 py-2 bg-purple-50 text-purple-600 rounded-xl text-[12px] font-bold hover:bg-purple-100 transition-colors shadow-sm"><AlignLeft size={14} className="mr-1.5"/>润色</button>
                          </div>

                          {node.content && node.content.trim().length > 0 && (
                            <div className="mt-auto pt-4 border-t border-gray-100 bg-white" onMouseDown={(e) => e.stopPropagation()}>
                              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">下一步 (NEXT STEPS)</span>
                              <div className="grid grid-cols-1 gap-2">
                                 <button onClick={() => {
                                     const startX = node.x + 560; const yOffsets = [-520, 0, 520]; const newNodesToCreate = [];
                                     for (let i = 0; i < 3; i++) { newNodesToCreate.push({ id: `node-${Date.now()}-${i}`, type: 'image', title: `画面方案 0${i + 1}`, content: null, status: 'generating', x: startX, y: node.y + yOffsets[i], parentId: node.id }); }
                                     setNodes(prev => [...prev, ...newNodesToCreate]); setDropMenu(null); showMessage(`已触发 AI 并发，正在生成 3 个不同视角/风格的画面方案...`, "info"); setCredits(prev => prev - 30);
                                     const mockResults = [ { img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000', prompt: '方案 A' }, { img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000', prompt: '方案 B' }, { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000', prompt: '方案 C' } ];
                                     newNodesToCreate.forEach((n, index) => { setTimeout(() => { setNodes(currentNodes => currentNodes.map(cn => cn.id === n.id ? { ...cn, status: 'completed', content: mockResults[index].img, prompt: `[${selectedStyle}] ${mockResults[index].prompt}` } : cn)); }, 2000 + (index * 800)); });
                                   }} className="flex items-center justify-center space-x-2 bg-[#1A1A24] text-white text-[13px] py-3.5 rounded-xl hover:bg-black transition-colors shadow-md font-bold w-full"><ImageIcon size={16}/> <span>并发生成 3 张平行画面</span>
                                 </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* 媒体节点空状态 */}
                      {node.status === 'empty' && node.type !== 'text' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center pointer-events-auto">
                          {node.type === 'image' && !node.parentId ? (
                            <React.Fragment>
                              <button onMouseDown={(e) => e.stopPropagation()} onClick={() => { const updatedNodes = [...nodes]; const targetNodeIndex = updatedNodes.findIndex(n => n.id === node.id); updatedNodes[targetNodeIndex] = { ...updatedNodes[targetNodeIndex], status: 'completed', content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', prompt: '本地上传的参考图片' }; setNodes(updatedNodes); }} className="w-20 h-20 border border-dashed border-gray-300 rounded-3xl flex items-center justify-center mb-4 bg-gray-50 transition-colors hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer group/upload">
                                <Upload size={32} className="text-gray-400 group-hover/upload:text-indigo-500 hidden group-hover/upload:block"/>
                                <div className="group-hover/upload:hidden"><ImageIcon size={32} className="text-gray-400"/></div>
                              </button>
                              <span className="text-sm font-medium text-gray-500">点击上传独立的参考图</span>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className="w-20 h-20 border border-dashed border-gray-300 rounded-3xl flex items-center justify-center mb-4 bg-gray-50">
                                {node.type === 'image' ? <ImageIcon size={32} className="text-gray-400"/> : node.type === 'video' ? <PlaySquare size={32} className="text-gray-400"/> : <Activity size={32} className="text-gray-400"/>}
                              </div>
                              <span className="text-sm font-medium text-gray-500">等待输入或执行生成指令</span>
                            </React.Fragment>
                          )}
                        </div>
                      )}

                      {node.status === 'generating' && (
                        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 rounded-full border-[3px] border-gray-100 border-t-indigo-600 animate-spin mb-6 shadow-sm"></div>
                          <span className="text-sm font-bold text-gray-800 animate-pulse font-mono tracking-widest uppercase">Rendering...</span>
                        </div>
                      )}
                      
                      {node.status === 'completed' && (
                        <div className="absolute inset-0 bg-gray-100 group/result overflow-hidden" style={{ borderRadius: 'calc(1.5rem - 2px)' }}>
                          <img draggable={false} src={node.content} alt="Result" className="w-full h-full object-cover select-none" />
                        </div>
                      )}
                    </div>
                    
                    {/* 右侧连线锚点 (+) */}
                    <button onMouseDown={(e) => { e.stopPropagation(); drawingLinkRef.current = { sourceNodeId: node.id, endX: e.clientX - pan.x, endY: e.clientY - pan.y }; setDrawingLink({ ...drawingLinkRef.current }); setDropMenu(null); }} className={`absolute top-1/2 -right-6 -translate-y-1/2 w-8 h-8 rounded-full border bg-white flex items-center justify-center transition-all shadow-md cursor-grab hover:scale-110 z-40 ${drawingLink?.sourceNodeId === node.id || dropMenu?.sourceNodeId === node.id ? 'border-indigo-500 text-indigo-600' : 'border-gray-200 text-gray-400'}`}>
                      <Plus size={16} strokeWidth={2} />
                    </button>

                    {/* 节点控制栏 (底部) */}
                    {isActive && (
                      <div onMouseDown={(e) => e.stopPropagation()} className="absolute top-[calc(100%+14px)] left-[-2px] w-[480px] bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-2xl p-4 shadow-2xl flex flex-col cursor-auto animate-slide-up-node z-50 pointer-events-auto">
                        
                        {node.type === 'video' && (
                          <div className="flex items-center mb-3">
                            <div className="flex items-center bg-gray-50 border border-gray-200/80 rounded-xl p-1 shadow-sm">
                              <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 shadow-sm rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"><MousePointer size={16} strokeWidth={1.5} /></button>
                              <div className="w-px h-4 bg-gray-300 mx-1.5"></div>
                              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200 transition-colors bg-transparent"><Plus size={18} strokeWidth={2} /></button>
                              <ArrowRight size={14} className="text-gray-400 mx-1" strokeWidth={1.5} />
                              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200 transition-colors bg-transparent"><Plus size={18} strokeWidth={2} /></button>
                            </div>
                          </div>
                        )}

                        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }} placeholder={node.type === 'video' ? "描述任何你想要生成的内容..." : (node.type === 'text' ? "补充附加指令..." : "输入画面或运动描述指令...")} className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-[15px] p-2 resize-none focus:outline-none custom-scrollbar font-medium" rows={2} style={{ minHeight: '52px', maxHeight: '140px' }} />
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="flex-1 pr-3">
                            <div className="relative w-full">
                              <div onClick={() => setOpenModelDropdownId(isThisModelDropdownOpen ? null : node.id)} className="h-[36px] w-full flex items-center justify-between text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 px-3 transition-colors text-[13px] font-bold cursor-pointer shadow-sm rounded-lg">
                                <span className="flex items-center">{renderApiIcon(currentApi)}<span className="ml-1 truncate w-[130px]">{currentApi}</span></span>
                                <ChevronDown size={14} strokeWidth={2} className="text-gray-400 ml-1" />
                              </div>

                              {/* 动态渲染 API 下拉选项 */}
                              {isThisModelDropdownOpen && (
                                <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden flex flex-col py-1.5 max-h-[280px] overflow-y-auto custom-scrollbar animate-fade-in-down z-[100]">
                                  {isMediaNode ? (
                                    <React.Fragment>
                                      {node.type === 'video' && (
                                        <React.Fragment>
                                          <div onClick={() => { setVideoApiModel('Happy Horse 1.0'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><span className="mr-2 text-[14px]">🎠</span> <span>Happy Horse 1.0</span></div>
                                          <div onClick={() => { setVideoApiModel('Kling O3'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><Aperture size={14} className="text-gray-400 mr-2" /> <span>Kling O3</span></div>
                                          <div onClick={() => { setVideoApiModel('Kling 3.0'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><Aperture size={14} className="text-gray-400 mr-2" /> <span>Kling 3.0</span></div>
                                          <div onClick={() => { setVideoApiModel('Wan 2.7'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><Hexagon size={14} className="text-gray-400 mr-2" /> <span>Wan 2.7</span></div>
                                          <div onClick={() => { setVideoApiModel('Kling O1'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><Aperture size={14} className="text-gray-400 mr-2" /> <span>Kling O1</span></div>
                                          <div className="w-full h-px bg-gray-100 my-1"></div>
                                        </React.Fragment>
                                      )}
                                      <div onClick={() => { setImageApiModel('Seedream 4.6'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><Activity size={14} className="text-gray-400 mr-2" /> <span>Seedream 4.6</span></div>
                                      <div onClick={() => { setImageApiModel('Seedream 5.0 Lite'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><Activity size={14} className="text-gray-400 mr-2" /> <span>Seedream 5.0 Lite</span></div>
                                      <div onClick={() => { setImageApiModel('Midjourney V7'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><span className="mr-2">⛵</span> <span>Midjourney V7</span></div>
                                      <div onClick={() => { setImageApiModel('Nano Banana Pro'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><span className="mr-2">🍌</span> <span>Nano Banana Pro</span></div>
                                      <div onClick={() => { setImageApiModel('Nano Banana 2'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><span className="mr-2">🍌</span> <span>Nano Banana 2</span></div>
                                    </React.Fragment>
                                  ) : isAudioNode ? (
                                    <React.Fragment>
                                      <div onClick={() => { setAudioApiModel('Minimax-speech-2.8-hd'); setOpenModelDropdownId(null); }} className="px-4 py-3 cursor-pointer flex flex-col hover:bg-gray-50 border-b border-gray-50"><div className="flex items-center space-x-2 text-[13px] font-bold text-gray-800"><Aperture size={14} className="text-gray-500" /><span>Minimax-speech-2.8-hd</span></div></div>
                                      <div onClick={() => { setAudioApiModel('Mureka V8'); setOpenModelDropdownId(null); }} className="px-4 py-3 cursor-pointer flex flex-col hover:bg-gray-50 border-b border-gray-50"><div className="flex items-center space-x-2 text-[13px] font-bold text-gray-800"><span className="text-[14px]">💖</span><span>Mureka V8</span></div></div>
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <div onClick={() => { setTextApiModel('Gemini 3.5 Flash'); setOpenModelDropdownId(null); }} className="px-4 py-2.5 text-[13px] font-bold cursor-pointer flex items-center hover:bg-gray-50"><span className="mr-2">✨</span> <span>Gemini 3.5 Flash</span></div>
                                    </React.Fragment>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center h-[36px] bg-gray-50 rounded-lg p-0.5 border border-gray-100 shrink-0 relative">
                            <button className="flex items-center justify-center w-8 h-full rounded-md transition-all text-gray-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm" title="语音输入"><Mic size={16} strokeWidth={2} /></button>
                            <div className="w-px h-5 bg-gray-200 mx-1"></div>

                            {isMediaNode && (
                              <div className="relative flex items-center h-full">
                                <button onClick={() => setProModeNodeId(isThisProModeOpen ? null : node.id)} className={`flex items-center justify-center w-8 h-full rounded-md transition-all ${isThisProModeOpen ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-800 hover:bg-white hover:shadow-sm'}`} title="基础参数配置"><Sliders size={16} strokeWidth={2} /></button>
                                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                                <button onClick={() => setOpenBatchDropdownId(isThisBatchDropdownOpen ? null : node.id)} className="flex items-center px-2 h-full text-[13px] font-bold text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all" title="生成批次数量">
                                  <span className="flex items-baseline"><span className="text-[10px] mr-[1px]">x</span>{batchSize}</span><ChevronDown size={14} className="ml-1 opacity-50"/>
                                </button>
                                
                                {isThisBatchDropdownOpen && (
                                  <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden flex flex-col py-1 w-16 animate-fade-in-down z-[100]">
                                    {[1, 2, 4].map(num => (<div key={num} onClick={() => { setBatchSize(num); setOpenBatchDropdownId(null); }} className="px-3 py-2.5 text-[13px] font-bold cursor-pointer flex items-center justify-center hover:bg-gray-100">x{num}</div>))}
                                  </div>
                                )}
                                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                              </div>
                            )}

                            <div className="flex items-center px-2 h-full text-[13px] font-bold text-gray-600 cursor-help" title={`预估消耗 ${dynamicCredits} 算力`}>
                              <Zap size={14} className="mr-1 text-gray-400 fill-gray-400" />
                              <span>{dynamicCredits}</span>
                            </div>
                            <div className="w-px h-5 bg-gray-200 mx-1"></div>
                            <button onClick={handleGenerate} className={`w-9 h-full rounded-md flex items-center justify-center transition-all duration-300 shadow-sm ${isGenerating ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-black cursor-pointer'}`} title="执行生成任务"><ArrowUp size={16} strokeWidth={2.5} /></button>
                          </div>
                        </div>

                        {/* 高级参数配置面板 */}
                        {isThisProModeOpen && isMediaNode && (
                          <div onMouseDown={(e) => e.stopPropagation()} className="absolute top-[-2px] left-[calc(100%+20px)] w-[350px] bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-slide-up-node z-50 pointer-events-auto">
                            <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/80">
                              <div className="flex items-center space-x-1.5"><Sliders size={16} className="text-indigo-600"/><span className="text-[14px] font-bold text-gray-900">基础参数控制</span></div>
                              <button onClick={() => setProModeNodeId(null)} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={14} strokeWidth={2.5}/></button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6 space-y-6 custom-scrollbar">
                              <div className="space-y-2.5">
                                <label className="text-[12px] font-bold text-gray-700">比例</label>
                                <div className="flex bg-gray-100/80 border border-gray-200/50 rounded-2xl p-1">
                                  {['16:9', '4:3', '1:1', '3:4', '9:16'].map(ratio => {
                                    const ratioIcons = { '16:9': { w: 16, h: 9 }, '4:3': { w: 14, h: 10.5 }, '1:1': { w: 12, h: 12 }, '3:4': { w: 10.5, h: 14 }, '9:16': { w: 9, h: 16 } };
                                    return (
                                    <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${aspectRatio === ratio ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                      <div className="border-[1.5px] border-current rounded-[3px] mb-1.5 opacity-80" style={{ width: ratioIcons[ratio].w, height: ratioIcons[ratio].h }}></div>
                                      <span className="text-[10px] font-bold">{ratio}</span>
                                    </button>
                                  )})}
                                </div>
                              </div>
                              <div className="space-y-2.5">
                                <label className="text-[12px] font-bold text-gray-700">分辨率</label>
                                <div className="flex bg-gray-100/80 border border-gray-200/50 rounded-2xl p-1">
                                  {['480p', '720p', '1080p'].map(res => (
                                    <button key={res} onClick={() => setVideoRes(res)} className={`flex-1 py-2.5 text-[12px] font-bold rounded-xl transition-all ${videoRes === res ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{res}</button>
                                  ))}
                                </div>
                              </div>
                              {node.type === 'video' && (
                                <React.Fragment>
                                  <div className="space-y-2.5">
                                    <div className="flex justify-between items-center">
                                      <label className="text-[12px] font-bold text-gray-700">生成时长</label>
                                      <span className="text-[11px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">{videoDuration} 秒</span>
                                    </div>
                                    <input type="range" min="5" max="10" step="1" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className="w-full accent-indigo-600" />
                                    <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1"><span>5s</span><span>10s</span></div>
                                  </div>
                                  <div className="space-y-3">
                                    <label className="text-[12px] font-bold text-gray-700 flex items-center"><CameraIcon size={14} className="mr-1.5 text-gray-400"/> 运镜控制</label>
                                    <div className="grid grid-cols-2 gap-2 bg-gray-100/80 border border-gray-200/50 rounded-2xl p-1.5">
                                      {['推镜头', '拉镜头', '向右平移', '静止画面'].map(cam => (
                                        <button key={cam} onClick={() => setCameraMotion(cam)} className={`py-2.5 text-[12px] font-bold rounded-xl transition-all ${cameraMotion === cam ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{cam}</button>
                                      ))}
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* 画布内放置节点的浮动菜单 */}
              {dropMenu && (
                <div onMouseDown={(e) => e.stopPropagation()} className="absolute bg-white border border-gray-200/80 shadow-2xl rounded-xl p-1.5 flex flex-col animate-fade-in backdrop-blur-xl pointer-events-auto z-[200]" style={{ left: dropMenu.x + pan.x + 20, top: dropMenu.y + pan.y - 60, width: '140px' }}>
                  <div className="px-2 py-1.5 border-b border-gray-100 mb-1"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">放置后续节点</span></div>
                  <button onClick={() => { handleAddNode(dropMenu.sourceNodeId, 'image', dropMenu.x, dropMenu.y); setDropMenu(null); }} className="flex items-center p-2 hover:bg-gray-50 rounded-lg text-left group transition-colors"><ImageIcon size={14} className="text-gray-400 group-hover:text-indigo-600 mr-2" /> <span className="text-[12px] font-bold text-gray-700 group-hover:text-gray-900">生成图像</span></button>
                  <button onClick={() => { handleAddNode(dropMenu.sourceNodeId, 'video', dropMenu.x, dropMenu.y); setDropMenu(null); }} className="flex items-center p-2 hover:bg-gray-50 rounded-lg text-left group transition-colors"><PlaySquare size={14} className="text-gray-400 group-hover:text-indigo-600 mr-2" /> <span className="text-[12px] font-bold text-gray-700 group-hover:text-gray-900">受控视频流</span></button>
                  <button onClick={() => { handleAddNode(dropMenu.sourceNodeId, 'audio', dropMenu.x, dropMenu.y); setDropMenu(null); }} className="flex items-center p-2 hover:bg-gray-50 rounded-lg text-left group transition-colors"><AudioWaveform size={14} className="text-gray-400 group-hover:text-indigo-600 mr-2" /> <span className="text-[12px] font-bold text-gray-700 group-hover:text-gray-900">音效配乐</span></button>
                </div>
              )}
            </div>
            
            {/* 左侧悬浮面板 (UI 层) */}
            <div className="absolute top-24 left-6 z-[100] flex items-start space-x-3 pointer-events-none">
              
              {/* 主侧边栏 */}
              <div className="w-16 bg-white border border-gray-100 py-4 flex flex-col items-center shadow-xl pointer-events-auto min-h-[460px] rounded-[2rem]">
                <button onClick={() => setActiveSidebar(activeSidebar === 'nodes' ? null : 'nodes')} className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all mb-4 ${activeSidebar === 'nodes' ? 'bg-indigo-600 text-white shadow-xl scale-110' : 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white hover:scale-105 shadow-lg'}`} title="添加节点">
                  <PlusCircle size={44} strokeWidth={1.5} />
                </button>
                <div className="flex flex-col space-y-3 w-full px-2 items-center">
                   <button onClick={() => setActiveSidebar(activeSidebar === 'assets' ? null : 'assets')} className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-colors ${activeSidebar === 'assets' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm' : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-50'}`} title="资产库"><FolderOpen size={22} strokeWidth={1.5}/></button>
                   <button onClick={() => setActiveSidebar(activeSidebar === 'history' ? null : 'history')} className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-colors ${activeSidebar === 'history' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm' : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-50'}`} title="生成历史"><RefreshCw size={22} strokeWidth={1.5}/></button>
                </div>
                <div className="w-8 border-b border-gray-100 my-4"></div>
                <button onClick={() => setIsTeamModalOpen(true)} className="w-11 h-11 rounded-[14px] flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-gray-50 transition-colors pointer-events-auto" title="团队沟通"><MessageSquare size={22} strokeWidth={1.5}/></button>
                <div className="mt-auto pt-4 border-t border-gray-100 w-full flex flex-col items-center space-y-3 px-2">
                  <button onClick={() => setIsProfileModalOpen(true)} className="w-11 h-11 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-gray-50 transition-colors pointer-events-auto" title="个人中心"><UserCircle size={24} strokeWidth={1.5}/></button>
                  <button onClick={() => setIsSettingsModalOpen(true)} className="w-11 h-11 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors pointer-events-auto" title="设置"><Settings size={18}/></button>
                </div>
              </div>

              {/* 扩展面板: 添加节点 */}
              {activeSidebar === 'nodes' && (
                <div className="w-[300px] bg-white border border-gray-100 rounded-[28px] p-6 shadow-2xl flex flex-col pointer-events-auto backdrop-blur-xl animate-fade-in h-fit">
                  <div className="mb-5"><span className="text-[15px] font-bold text-gray-500">添加节点</span></div>
                  <div className="space-y-1">
                    <button onClick={() => handleAddNode(null, 'text')} className="flex items-center p-2.5 rounded-2xl hover:bg-gray-50 transition-colors group text-left w-full border border-transparent"><div className="w-14 h-14 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center mr-4 group-hover:bg-white group-hover:shadow-sm transition-all"><AlignLeft size={24} className="text-gray-600 group-hover:text-indigo-600" strokeWidth={1.5}/></div><div className="flex flex-col"><span className="text-[16px] font-bold text-gray-800">文本</span><span className="text-[12px] text-gray-400 mt-1 font-medium tracking-wide">剧本、创意文案</span></div></button>
                    <button onClick={() => handleAddNode(null, 'image')} className="flex items-center p-2.5 rounded-2xl hover:bg-gray-50 transition-colors group text-left w-full border border-transparent"><div className="w-14 h-14 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center mr-4 group-hover:bg-white group-hover:shadow-sm transition-all"><ImageIcon size={24} className="text-gray-600 group-hover:text-indigo-600" strokeWidth={1.5}/></div><div className="flex flex-col"><span className="text-[16px] font-bold text-gray-800">图像</span><span className="text-[12px] text-gray-400 mt-1 font-medium tracking-wide">关键帧分镜、参考图</span></div></button>
                    <button onClick={() => handleAddNode(null, 'video')} className="flex items-center p-2.5 rounded-2xl hover:bg-gray-50 transition-colors group text-left w-full border border-transparent"><div className="w-14 h-14 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center mr-4 group-hover:bg-white group-hover:shadow-sm transition-all"><PlaySquare size={24} className="text-gray-600 group-hover:text-indigo-600" strokeWidth={1.5}/></div><span className="text-[16px] font-bold text-gray-800">视频流</span></button>
                    <button onClick={() => handleAddNode(null, 'audio')} className="flex items-center p-2.5 rounded-2xl hover:bg-gray-50 transition-colors group text-left w-full border border-transparent"><div className="w-14 h-14 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center mr-4 group-hover:bg-white group-hover:shadow-sm transition-all"><AudioWaveform size={24} className="text-gray-600 group-hover:text-indigo-600" strokeWidth={1.5}/></div><span className="text-[16px] font-bold text-gray-800">音效配乐</span></button>
                  </div>
                </div>
              )}
              
              {/* 扩展面板: 资产库 */}
              {activeSidebar === 'assets' && (
                <div className={`bg-white border border-gray-200/80 rounded-[28px] shadow-2xl flex flex-col pointer-events-auto backdrop-blur-xl transition-all duration-500 ease-in-out overflow-hidden ${isAssetExpanded ? 'fixed left-[4%] top-[8%] w-[92%] h-[84%] z-[2000]' : 'w-[300px] h-[520px] relative animate-fade-in'}`}>
                  <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center space-x-2"><span className="text-[15px] font-bold text-gray-800 tracking-wider">资产库 (Assets)</span></div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setIsAssetExpanded(!isAssetExpanded)} className="text-gray-400 hover:text-indigo-600 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm">
                        {isAssetExpanded ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
                      </button>
                      {isAssetExpanded && <button onClick={() => {setActiveSidebar(null); setIsAssetExpanded(false);}} className="text-gray-400 hover:text-red-500 border border-gray-200 bg-white p-1.5 rounded-lg ml-1"><X size={16}/></button>}
                    </div>
                  </div>
                  <div className={`p-3 border-b border-gray-100 flex items-center ${isAssetExpanded ? 'px-8 py-4 space-x-4' : 'space-x-1.5'}`}>
                    <button onClick={() => setAssetTab('all')} className={`text-[11px] px-3 py-1.5 rounded-md font-bold ${assetTab === 'all' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200/60'}`}>全部</button>
                    <button onClick={() => setAssetTab('roles')} className={`text-[11px] px-3 py-1.5 rounded-md font-bold flex items-center ${assetTab === 'roles' ? 'bg-indigo-500 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200/60'}`}><UserCircle size={12} className="mr-1.5"/>角色</button>
                    <button onClick={() => setAssetTab('scene')} className={`text-[11px] px-3 py-1.5 rounded-md font-bold ${assetTab === 'scene' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200/60'}`}>分镜</button>
                    <button onClick={() => setAssetTab('video')} className={`text-[11px] px-3 py-1.5 rounded-md font-bold flex items-center ${assetTab === 'video' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200/60'}`}><PlaySquare size={12} className="mr-1.5"/>视频</button>
                  </div>
                  <div className={`flex-1 overflow-y-auto custom-scrollbar ${isAssetExpanded ? 'p-8' : 'p-3'}`}>
                    <div className={`grid gap-4 ${isAssetExpanded ? 'grid-cols-4 md:grid-cols-5 lg:grid-cols-6' : 'grid-cols-1'}`}>
                      {(assetTab === 'all' || assetTab === 'roles') && (
                        <div className="group border border-gray-200 rounded-2xl p-3 hover:border-indigo-500 bg-white cursor-pointer relative overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200" alt="role" className="w-full h-32 object-cover rounded-xl mb-3 shadow-inner" />
                          <h3 className="text-[13px] font-bold text-gray-800">侦探_K</h3><p className="text-[10px] text-gray-400 mt-1">IP-Adapter 模型</p>
                        </div>
                      )}
                      {(assetTab === 'all' || assetTab === 'video') && (
                        <div className="group border border-gray-200 rounded-2xl p-3 hover:border-indigo-500 bg-white cursor-pointer relative">
                          <div className="relative mb-3">
                            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200" alt="video" className="w-full h-32 object-cover rounded-xl" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10 rounded-xl"><div className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white"><Play size={14} className="text-gray-900 ml-0.5 fill-gray-900" /></div></div>
                          </div>
                          <h3 className="text-[13px] font-bold text-gray-800">全息投影_动态特效</h3><p className="text-[10px] text-gray-400 mt-1">视频流资产 · 2.0s</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 扩展面板: 生成历史 */}
              {activeSidebar === 'history' && (
                <div className="w-[300px] bg-white border border-gray-100 rounded-[28px] p-4 shadow-2xl flex flex-col pointer-events-auto backdrop-blur-xl h-[520px] animate-fade-in">
                  <div className="px-2 py-2 border-b border-gray-100 mb-2 flex justify-between items-center">
                    <span className="text-[13px] font-bold text-gray-800 tracking-wider">生成历史</span>
                    <button onClick={() => showMessage("历史记录已清空")} className="text-[11px] text-gray-400 hover:text-red-500 transition-colors font-medium">清空</button>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 px-1">
                     <div onClick={() => showMessage("已将历史结果恢复至画布", "success")} className="flex space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=100" alt="h" className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm flex-shrink-0" />
                        <div className="flex-1 flex flex-col justify-center">
                           <p className="text-[11px] font-medium text-gray-800 line-clamp-2 leading-tight">全息投影骤然闪烁，映射在侦探的瞳孔中...</p>
                           <div className="flex items-center mt-1.5 space-x-2">
                             <span className="inline-flex items-center bg-indigo-50 text-indigo-600 text-[9px] px-1.5 py-0.5 rounded font-bold border border-indigo-100"><PlaySquare size={10} className="mr-0.5"/>视频</span>
                             <span className="text-[9px] font-mono text-gray-400 mt-0.5">10分钟前 · <span className="text-red-400">-50 pts</span></span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* 左下角视口控制 */}
            <div className="absolute bottom-6 left-6 flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-full p-1.5 shadow-lg pointer-events-auto z-[100]">
              <button onClick={handleAutoGroup} className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition-colors font-bold text-xs"><BoxSelect size={14} strokeWidth={2} /><span>框选编组</span></button>
              <div className="w-px h-4 bg-gray-200 mx-1"></div>
              <button onClick={resetView} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"><Home size={14}/></button>
            </div>
          </React.Fragment>
        )}

        {/* === 视图 B: 故事板 === */}
        {viewMode === 'storyboard' && (
          <div className="absolute inset-0 z-10 pt-24 px-12 pb-12 overflow-y-auto bg-[#F8F9FA] custom-scrollbar animate-fade-in pointer-events-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">故事板视图 (Storyboard)</h2>
                  <p className="text-sm text-gray-500 mt-1">已将画布节点结构化为您熟悉的 5 列工业分镜表，方便预览与汇报。</p>
                </div>
                <button onClick={() => showMessage("正在生成高清 PDF 格式的分镜报告...", "success")} className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  <FileOutput size={16} strokeWidth={2.5} /><span>导出汇报 PDF</span>
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-t-2xl shadow-sm grid grid-cols-12 gap-4 p-4 font-bold text-gray-500 text-sm tracking-wider uppercase">
                <div className="col-span-1 text-center">镜头号</div>
                <div className="col-span-3">核心画面 (Visual)</div>
                <div className="col-span-2">景别与运镜</div>
                <div className="col-span-4">旁白与脚本描述 (Audio/Text)</div>
                <div className="col-span-2 text-center">估算时长</div>
              </div>
              
              <div className="bg-white border-x border-b border-gray-200 rounded-b-2xl shadow-sm flex flex-col divide-y divide-gray-100 mb-20">
                {storyboardShots.length === 0 ? (
                  <div className="p-16 flex flex-col items-center justify-center text-gray-400">
                    <ListTree size={48} className="mb-4 opacity-30" strokeWidth={1.5} />
                    <p className="font-medium">画布中暂无完整的工作流，无法生成故事板</p>
                  </div>
                ) : (
                  storyboardShots.map((shot) => (
                    <div key={shot.id} className="grid grid-cols-12 gap-4 p-6 items-start hover:bg-gray-50/50 transition-colors">
                      <div className="col-span-1 flex justify-center pt-2">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-900 text-sm border border-gray-200">
                          {shot.shotNumber}
                        </span>
                      </div>
                      
                      <div className="col-span-3">
                        <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative flex items-center justify-center">
                          {shot.visualType === 'empty' ? (
                            <span className="text-xs text-gray-400 font-medium">等待生成画面...</span>
                          ) : (
                            <React.Fragment>
                              <img src={shot.visualContent} alt="分镜" className="w-full h-full object-cover" />
                              {shot.visualType === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
                                  <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white">
                                    <Play size={16} className="text-gray-900 ml-0.5 fill-gray-900" />
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-2 space-y-2 pt-1 text-sm text-gray-700">
                        <p><span className="font-bold text-indigo-600">运镜：</span> {shot.camera}</p>
                        <p><span className="font-bold text-indigo-600">视效：</span> {shot.style}</p>
                      </div>
                      
                      <div className="col-span-4 space-y-3 pt-1">
                        <div className="text-sm text-gray-800 leading-relaxed font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                          {shot.text}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <AudioWaveform size={14} className={shot.audioStatus.includes('等待') ? 'text-amber-400 animate-pulse' : 'text-indigo-400'} />
                          <span className={shot.audioStatus.includes('等待') ? 'text-amber-600 font-medium' : ''}>{shot.audioStatus}</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex flex-col items-center pt-2 space-y-2">
                        <span className="text-xl font-mono font-bold text-gray-900">{shot.duration}</span>
                        {shot.status === 'ready' && <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-md font-bold border border-green-200">生成已就绪</span>}
                        {shot.status === 'generating' && <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md font-bold border border-amber-200 animate-pulse flex items-center"><RefreshCw size={10} className="mr-1 animate-spin"/> 渲染中</span>}
                        {shot.status === 'pending' && <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md font-bold border border-gray-200">等待完善</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* -------------------------------------
          层级 4: 全局顶级导航栏 (Header)
      ------------------------------------- */}
      <header className="absolute top-0 left-0 w-full h-16 px-6 flex items-center justify-between z-[1000] pointer-events-none">
        
        {/* Header Left */}
        <div className="flex items-center space-x-3 cursor-pointer group pointer-events-auto">
          <div className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-300">
            <div className="absolute w-[1.35rem] h-[1.35rem] left-0 top-0 rounded-full bg-gradient-to-tr from-[#FF6B6B] via-[#845EC2] to-[#4FACFE]"></div>
            <div className="absolute w-[1.65rem] h-[1.65rem] right-0 bottom-0 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white relative z-10 drop-shadow-sm"><path d="M 12 0 C 12 10, 14 12, 24 12 C 14 12, 12 14, 12 24 C 12 14, 10 12, 0 12 C 10 12, 12 10, 12 0 Z" fill="currentColor" /></svg>
            </div>
          </div>
          <h1 className="text-sm font-semibold text-gray-800 group-hover:text-black transition-colors ml-1">VideoStudio Pro</h1>
        </div>

        {/* Header Center */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-200/80 pointer-events-auto">
          <button onClick={() => { setViewMode('canvas'); showMessage("已切换至 无边界创意画布"); }} className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'canvas' ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
            <LayoutGrid size={14} strokeWidth={2} /><span>无限画布</span>
          </button>
          <button onClick={() => { setViewMode('storyboard'); showMessage("已切换至 工业级故事板分镜表"); }} className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'storyboard' ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
            <ListTree size={14} strokeWidth={2} /><span>故事板视图</span>
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          {/* 品牌风格管理器按钮 */}
          <button onClick={() => setIsBrandStyleModalOpen(true)} className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isBrandStyleModalOpen ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
            <Command size={14} strokeWidth={2.5} /><span>品牌风格管理器</span>
          </button>
        </div>
        
        {/* Header Right */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-full px-3 py-1.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Zap size={14} className="text-indigo-500" strokeWidth={1.5} />
            <span className="text-xs font-mono font-bold text-gray-700">{credits.toLocaleString()}</span>
          </div>
          <button onClick={() => setIsTeamModalOpen(true)} className="flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-full px-4 py-1.5 shadow-sm hover:bg-gray-50 hover:text-indigo-600 transition-colors group">
            <Users size={14} className="text-gray-500 group-hover:text-indigo-600 transition-colors" strokeWidth={1.5} />
            <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">团队协作</span>
          </button>
        </div>
      </header>

      {/* -------------------------------------
          层级 5: 全局操作弹窗 (最高覆盖层)
      ------------------------------------- */}
      
      {/* 偏好设置 Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsSettingsModalOpen(false)}></div>
          <div className="relative bg-white w-[640px] shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fade-in-up" style={{ borderRadius: '2rem' }}>
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"><Settings size={16} strokeWidth={2.5}/></div>
                <h2 className="text-[15px] font-bold text-gray-800">系统偏好设置</h2>
              </div>
              <button onClick={() => setIsSettingsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1 bg-white rounded-full hover:bg-gray-100"><X size={18} strokeWidth={2}/></button>
            </div>
            <div className="flex h-[420px]">
              <div className="w-48 bg-gray-50/50 border-r border-gray-100 p-4 space-y-1.5 flex flex-col">
                 <button onClick={() => setSettingsTab('general')} className={`w-full flex items-center text-left px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${settingsTab === 'general' ? 'bg-white text-indigo-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}><Sliders size={14} className="mr-2"/> 通用设置</button>
                 <button onClick={() => setSettingsTab('api')} className={`w-full flex items-center text-left px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${settingsTab === 'api' ? 'bg-white text-indigo-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}><Key size={14} className="mr-2"/> 密钥与节点</button>
                 <button onClick={() => setSettingsTab('export')} className={`w-full flex items-center text-left px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${settingsTab === 'export' ? 'bg-white text-indigo-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}><DownloadCloud size={14} className="mr-2"/> 导出偏好</button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-white">
                {settingsTab === 'general' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-[13px] font-bold text-gray-800 block mb-2">默认工作区模型</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[13px] text-gray-700 font-medium outline-none focus:border-indigo-500 transition-colors" value={textApiModel} onChange={(e) => setTextApiModel(e.target.value)}>
                        <option value="Gemini 3.5 Flash">Gemini 3.5 Flash (系统推荐)</option>
                        <option value="Gemini 3.1 Pro">Gemini 3.1 Pro</option>
                      </select>
                    </div>
                  </div>
                )}
                {settingsTab === 'api' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-[13px] font-bold text-gray-800 block mb-2">OpenAI API Key</label>
                      <input type="password" defaultValue="sk-xxxxxxxxx" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[13px] text-gray-700 font-mono outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                  </div>
                )}
                {settingsTab === 'export' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-[13px] font-bold text-gray-800 block mb-2">默认导出分辨率</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[13px] text-gray-700 font-medium outline-none focus:border-indigo-500 transition-colors">
                        <option>1080P (1920x1080) - 推荐</option>
                        <option>4K (3840x2160)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 团队协作 Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm animate-fade-in" onClick={() => setIsTeamModalOpen(false)}></div>
          <div className="relative bg-white w-[540px] shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fade-in-up" style={{ borderRadius: '2rem' }}>
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><Users size={16} strokeWidth={2.5}/></div>
                <h2 className="text-[15px] font-bold text-gray-800">项目协同与权限管理</h2>
              </div>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1 bg-white rounded-full hover:bg-gray-100"><X size={18} strokeWidth={2}/></button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-gray-700 flex items-center"><UserPlus size={14} className="mr-1.5 text-gray-400"/> 邀请协作者</label>
                <div className="flex space-x-2">
                  <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                    <Mail size={16} className="text-gray-400 mr-2"/>
                    <input type="text" placeholder="输入协作者邮箱..." className="bg-transparent border-none outline-none text-[13px] w-full text-gray-700 font-medium" />
                  </div>
                  <button onClick={() => showMessage("邀请邮件已发送", "success")} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-black">发送</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 个人中心 Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsProfileModalOpen(false)}></div>
          <div className="relative bg-white w-[640px] shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fade-in-up" style={{ borderRadius: '2rem' }}>
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white"><UserCircle size={16} strokeWidth={2.5}/></div>
                <h2 className="text-[15px] font-bold text-gray-800">个人中心 & 账户资产</h2>
              </div>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1 bg-white rounded-full hover:bg-gray-100"><X size={18} strokeWidth={2}/></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center p-4 bg-gray-50/80 border border-gray-100 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold">李</div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-900">李导</h3>
                  <p className="text-xs text-gray-500 mt-0.5">li.director@studio.com</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="flex items-center space-x-2 mb-3 relative z-10"><Zap size={16} className="text-indigo-500"/><span className="text-[13px] font-bold text-gray-700">可用算力</span></div>
                  <div className="flex items-baseline space-x-1 mb-2 relative z-10"><span className="text-3xl font-mono font-bold text-gray-900">{credits.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 品牌风格管理器 Modal */}
      {isBrandStyleModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsBrandStyleModalOpen(false)}></div>
          
          <div className="relative bg-white w-full max-w-[800px] shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-fade-in-up" style={{ borderRadius: '2.5rem' }}>
            <button onClick={() => setIsBrandStyleModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-2 bg-gray-50 rounded-full hover:bg-gray-100 z-50"><X size={18} strokeWidth={2.5}/></button>

            <div className="px-10 pt-10 pb-6 border-b border-gray-100 bg-gray-50/30 flex items-center space-x-4">
               <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                 <Command size={26} strokeWidth={2}/>
               </div>
               <div>
                 <h2 className="text-[22px] font-bold text-gray-900 tracking-wide">品牌风格管理器</h2>
                 <p className="text-[12px] text-gray-500 font-medium mt-1">Brand Style & Intelligence Control</p>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
               <div className="space-y-4">
                 <div className="flex items-center space-x-2">
                   <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                   <h3 className="text-[15px] font-bold text-gray-800">STEP 1 选择应用场景</h3>
                 </div>
                 <div className="flex flex-wrap gap-2.5">
                   {['TVC 广告', '电商短视频', '小红书种草', '高端产品广告', '国风', '日系', '科技感'].map(s => (
                     <button
                       key={s}
                       onClick={() => setBrandScenario(s)}
                       className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-sm ${
                         brandScenario === s
                           ? 'bg-gray-900 text-white scale-[1.02]'
                           : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200/80 hover:text-gray-800'
                       }`}
                     >
                       {s}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="w-full h-px bg-gray-100"></div>

               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <label className="text-[13px] font-bold text-gray-800 flex items-center">
                     系统智能分析的风格标签 
                     {analyzingTags && <RefreshCw size={14} className="ml-2 text-indigo-500 animate-spin" />}
                   </label>
                   <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">已智能组装底层工作流</span>
                 </div>
                 
                 <div className={`flex flex-wrap gap-2 pt-1 transition-opacity duration-300 ${analyzingTags ? 'opacity-30' : 'opacity-100'}`}>
                   {getScenarioTags(brandScenario).map(tag => (
                     <span key={tag} className="px-3 py-1.5 bg-white text-gray-800 border border-gray-200/80 rounded-lg text-[12px] font-bold shadow-sm">{tag}</span>
                   ))}
                 </div>
                 <div className="p-4 mt-3 bg-gray-50/80 border border-gray-100 rounded-[1rem] relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                   <p className="text-[11px] text-gray-500 leading-relaxed font-medium pl-2">系统已自动深度分析：色彩、光影、镜头语言、构图、颗粒感、运动节奏等核心底层特征。后台已为您自动配置相关参数并挂载 ControlNet，您只需专注于创意，体验将会非常高级。</p>
                 </div>
               </div>

               <div className="w-full h-px bg-gray-100"></div>

               <div className="space-y-6">
                 <div className="flex items-center space-x-2 mb-4">
                   <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                   <h3 className="text-[15px] font-bold text-gray-800">STEP 2 画面微调设置</h3>
                 </div>

                 <div className="space-y-3">
                   <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                     <span>风格强度 <span className="text-gray-400 font-normal ml-1 text-[11px]">(取代繁琐的 LoRA Weight)</span></span>
                     <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{brandStrength}%</span>
                   </div>
                   <input type="range" min="0" max="100" value={brandStrength} onChange={(e) => setBrandStrength(e.target.value)} className="w-full accent-gray-900" />
                   <div className="flex justify-between text-[11px] text-gray-400 font-bold px-1"><span>弱</span><span>强</span></div>
                 </div>

                 <div className="space-y-3 pt-2">
                   <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                     <span>风格稳定性 <span className="text-gray-400 font-normal ml-1 text-[11px]">(控制生成随机性与发散度)</span></span>
                     <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{brandStability}%</span>
                   </div>
                   <input type="range" min="0" max="100" value={brandStability} onChange={(e) => setBrandStability(e.target.value)} className="w-full accent-gray-900" />
                   <div className="flex justify-between text-[11px] text-gray-400 font-bold px-1"><span>自由</span><span>稳定</span></div>
                 </div>

                 <div className="space-y-3 pt-2">
                   <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                     <span>保留原始内容 <span className="text-gray-400 font-normal ml-1 text-[11px]">(适合固定品牌产品、人脸等 Identity Control)</span></span>
                     <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{brandPreserve}%</span>
                   </div>
                   <input type="range" min="0" max="100" value={brandPreserve} onChange={(e) => setBrandPreserve(e.target.value)} className="w-full accent-gray-900" />
                   <div className="flex justify-between text-[11px] text-gray-400 font-bold px-1"><span>低</span><span>高</span></div>
                 </div>
               </div>

               <div className="pt-4 pb-2">
                 <button 
                   onClick={() => { setIsBrandStyleModalOpen(false); showMessage(`【${brandScenario}】风格引擎已激活应用至工作流`, "success"); }} 
                   className="w-full py-4 bg-gray-900 text-white text-[14px] font-bold rounded-xl shadow-lg hover:bg-black transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                 >
                   <Sparkles size={16}/><span>确认应用并自动配置镜头</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .dot-pattern { background-image: radial-gradient(rgba(0, 0, 0, 0.06) 1.5px, transparent 1.5px); background-size: 32px 32px; }
        .custom-scrollbar::-webkit-scrollbar { height: 0px; width: 0px; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUpNode { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-node { animation: slideUpNode 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        .animate-fade-in-down { animation: fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .tech-grid { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px); animation: panGrid 10s linear infinite; }
        .mask-radial-fade { mask-image: radial-gradient(circle at center, black 20%, transparent 80%); -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%); }
        @keyframes panGrid { from { background-position: 0 0; } to { background-position: -40px -40px; } }
        @keyframes blob1 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(8vw, -8vh) scale(1.1); } 66% { transform: translate(-4vw, 4vh) scale(0.9); } }
        @keyframes blob2 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(-8vw, 8vh) scale(1.2); } 66% { transform: translate(4vw, -4vh) scale(0.8); } }
        .animate-blob1 { animation: blob1 12s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-blob2 { animation: blob2 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes revealUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-reveal-up { animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes progressLine { 0% { transform: scaleX(0); } 40% { transform: scaleX(0.7); } 100% { transform: scaleX(1); } }
        .animate-progress-line { animation: progressLine 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}