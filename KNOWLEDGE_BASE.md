# VideoStudio Pro — 知识库

> AI 影视创作平台，支持文本扩写、图片生成、视频概念设计  
> 在线地址：`https://wensansan666.github.io/ai-media-vedio/`  
> 最后更新：2026-06-16

---

## 1. 项目概览

| 项目 | 说明 |
|---|---|
| 技术栈 | React 19 + Vite 8 + Tailwind CSS 4 |
| 部署方式 | GitHub Pages（前端） + Cloudflare Workers（后端中转） |
| AI 模型 | OpenRouter（文本 Llama / DeepSeek）+ Flux（图片） |
| 版本管理 | Git + GitHub，标签 v1 → v2 → v3 |

---

## 2. 目录结构

```
├── src/
│   ├── App.jsx                    # 主应用（画布、节点、工具栏）
│   ├── main.jsx                   # React 入口
│   ├── index.css                  # 全局样式 + Tailwind
│   ├── VideoStudioAssistant.jsx   # AI 视觉导演助手（右侧悬浮面板）
│   └── PricingModal.jsx           # 充值算力弹窗
├── worker.js                      # Cloudflare Worker（API 中转）
├── wrangler.toml                  # Cloudflare 部署配置
├── vite.config.js                 # Vite 构建配置
├── dist/                          # 构建产物
└── .claude/settings.json          # Claude Code 配置
```

---

## 3. 核心功能

### 3.1 无限画布
- 节点式工作流：文本 → 图像 → 视频
- 拖拽连线创建节点关系
- Alt + 滚轮缩放（10% ~ 500%）
- 右侧纵向滑条上下滚动
- 迷你地图导航（右下角）

### 3.2 AI 生成
| 功能 | 触发方式 | API |
|---|---|---|
| 扩写大纲 | 文本节点 → "扩写大纲" 按钮 | DeepSeek Chat |
| 润色剧本 | 文本节点 → "润色" 按钮 | DeepSeek Chat |
| 转英文提示词 | 文本节点 → "转提示词" 按钮 | DeepSeek Chat |
| 生成图片 | 图像节点 → 底部输入框 → 生成箭头 | Flux Klein 4B |
| 并发生成 3 张 | 文本节点 → "并发生成 3 张 AI 画面" | Flux ×3 |

### 3.3 AI 视觉导演助手
- 右侧紫色 ✨ 按钮打开
- 模型选择器（Image / Video / Text 三栏）
- 技能管线选择（广告创意/故事短片/分镜等）
- 快捷按钮：推荐短片选题 / 查找画面参考 / 创作视频开场白
- 积分消耗显示

### 3.4 充值系统
- 顶部 ⚡ 积分数字 → 打开充值面板
- 个人中心 → 积分余额 → 快速充值
- 四档方案：Basic ¥9.90 / Pro ¥29.00 / Premium ¥68.00 / Max ¥168.00

---

## 4. 部署架构

```
用户浏览器
    │
    ▼
GitHub Pages (前端)
    │
    │ POST /api/text  或  /api/image
    ▼
Cloudflare Worker (ai-media-vedio-api.wensansan.workers.dev)
    │
    │ Bearer OPENROUTER_API_KEY
    ▼
OpenRouter API
    ├─ DeepSeek Chat (文本)
    └─ Flux Klein 4B (图片)
```

---

## 5. 常用命令

### 5.1 前端
```bash
# 开发
npm run dev

# 构建
npm run build

# 本地预览
npx vite preview --port 4173
```

### 5.2 Worker
```bash
# 部署
npx wrangler deploy

# 查看 Secret
npx wrangler secret list

# 设置 Secret
npx wrangler secret put OPENROUTER_API_KEY

# 查看日志
npx wrangler tail
```

### 5.3 部署到 GitHub Pages
```bash
git add -f dist
git commit -m "deploy"
git push origin $(git subtree split --prefix dist main):gh-pages --force
git reset --soft HEAD~1 && git reset HEAD dist
```

---

## 6. 环境变量

| 变量 | 位置 | 说明 |
|---|---|---|
| `OPENROUTER_API_KEY` | Cloudflare Worker Secret | OpenRouter API 密钥 |
| `WORKER_URL` | `src/App.jsx:110` | Worker 地址 |
| `base` | `vite.config.js` | 构建路径 `/ai-media-vedio/` |

---

## 7. 模型映射

| 前端显示名 | OpenRouter 模型 ID |
|---|---|
| Llama 3.1 8B | `meta-llama/llama-3.1-8b-instruct` |
| DeepSeek Chat | `deepseek/deepseek-chat` |
| Flux Klein 4B | `black-forest-labs/flux.2-klein-4b` |

---

## 8. 版本历史

| 标签 | 内容 |
|---|---|
| `v1` | 初版，基础画布 |
| `v2` | Alt+滚轮缩放，base 路径修复 |
| `v2-api` | 接入 OpenRouter + Cloudflare Worker |
| `v3` | AI 导演助手 + 模型面板 + 充值系统 + 节点分离 |

---

## 9. 常见问题

### Q: 生成失败 "failed to fetch"
1. 确认 Worker 已部署：`npx wrangler deploy`
2. 确认 `OPENROUTER_API_KEY` Secret 存在：`npx wrangler secret list`
3. 确认 OpenRouter 账户有余额：https://openrouter.ai/credits

### Q: 文本节点显示 "result"
已修复（v3）。原因是 `<img alt="Result">` 覆盖了文本节点的 textarea。给 completed 状态加了 `node.type !== 'text'` 条件。

### Q: 图片生成返回文字而不是图片
Flux 模型对提示词敏感。尝试：
- 用更具体的英文描述
- 点"转提示词"按钮先生成英文 prompt

---

## 10. 维护者

GitHub: [wensansan666/ai-media-vedio](https://github.com/wensansan666/ai-media-vedio)
