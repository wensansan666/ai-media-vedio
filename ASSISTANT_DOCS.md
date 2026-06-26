# VideoStudio Pro 悬浮助手 — 知识库

---

## Q1: 在哪里看前端代码？

打开 `src/VideoStudioAssistant.jsx`，在 VS Code 里按 **Ctrl+P** → 输入 `VideoStudio` → 回车。

关键行号：

| 行号 | 内容 |
|---|---|
| 79-87 | `callWorker()` — 调 Worker 的统一函数 |
| 89-97 | `handleQuickAction()` — 3 个快捷按钮 |
| 100-134 | `handleSend()` — 核心：发消息 → 调 API → 显示结果 |

搜索（Ctrl+F）`callWorker` 快速定位。

---

## Q2: 生成按钮需要消耗 token 吗？

会消耗 **OpenRouter 的 API 调用次数**，但费用很低：

| 类型 | 模型 | 费用 |
|---|---|---|
| 📝 文本 | DeepSeek Chat | ≈¥0.00005/次 |
| 🖼️ 图片 | Flux Klein 4B | ≈¥0.10/张 |
| 🎬 视频 | 未接入 API | 暂不消耗 |

---

## Q3: API 调用流程是什么？

```
用户输入 → handleSend() → callWorker() → POST Worker
                                              │
                                    ┌─────────▼──────────┐
                                    │ /api/text → DeepSeek │
                                    │ /api/image → Flux    │
                                    └─────────┬──────────┘
                                              │
React setMessages ← Worker 返回 JSON ← OpenRouter 响应
```

**前端（VideoStudioAssistant.jsx）：**
```js
const callWorker = async (type, payload) => {
  const endpoint = type === 'image' ? '/api/image' : '/api/text';
  const resp = await fetch(workerUrl + endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return resp.json();
};
```

**后端（worker.js）：**
```js
// POST /api/text → OpenRouter → DeepSeek Chat
const apiResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
      { role: 'system', content: sysPrompt },
      { role: 'user', content: prompt },
    ],
  }),
});
```

---

## Q4: 在哪里部署？电脑关了能访问吗？

网站部署在 **GitHub Pages**，后端在 **Cloudflare Workers**，都不依赖你的电脑。

| 部署位置 | 地址 | 依赖你的电脑？ |
|---|---|---|
| 前端 | `https://wensansan666.github.io/ai-media-vedio/` | ❌ 不依赖 |
| 后端 | `https://ai-media-vedio-api.wensansan.workers.dev` | ❌ 不依赖 |

**有网络就能用**，手机/平板/任何电脑都能打开。

---

## Q5: 前端 Worker 要单独部署吗？

是的。Worker 在 `e:\3Agent\vscode\projects\多模态视频demo\` 目录。

**CMD 终端：**
```bash
cd /d e:\3Agent\vscode\projects\多模态视频demo
npx wrangler deploy
```

---

## Q6: 模型名称在哪里配置？

**前端（VideoStudioAssistant.jsx）** 第33-53行 `MODEL_DATA`：

```js
const MODEL_DATA = {
  Image: [
    { name: 'Nano Banana Pro', desc: '...' },
    { name: 'Nano Banana 2',   desc: '...' },
    { name: 'Seedream 4.6',    desc: '...' },
    { name: 'Seedream 5.0 Lite', desc: '...' },
  ],
  Video: [
    { name: 'Happy Horse 1.0', desc: '...' },
    { name: 'Kling O3',        desc: '...' },
    { name: 'Seedance 2.0',    desc: '...' },
    { name: 'Seedance 2.0 Fast', desc: '...' },
  ],
  Text: [
    { name: 'Gemini Flash',  desc: '...' },
    { name: 'Gemini Pro',    desc: '...' },
  ],
};
```

**后端（worker.js）** 实际调用 OpenRouter 的模型 ID：
```js
model: 'deepseek/deepseek-chat',        // 文本
model: 'black-forest-labs/flux.2-klein-4b',  // 图片
```

---

## Q7: 充值方案是什么？

| 方案 | 价格 | 积分 |
|---|---|---|
| Basic | ¥9.90 | 450点 |
| Pro | ¥29.00 | 1,500点 |
| Premium | ¥68.00 | 3,800点 |
| Max | ¥168.00 | 10,800点 |

---

## Q8: 画布上视频节点的模型列表哪里改？

`src/App.jsx` 第843-851行附近，搜索 `Happy Horse` 定位。只有视频模型，不含 Seedream（那是图像模型）。

```
🎬 视频节点模型列表
├─ Happy Horse 1.0
├─ Kling O3
├─ Kling 3.0
├─ Wan 2.7
├─ Kling O1
├─ Seedance 2.0
└─ Seedance 2.0 Fast
```

---

## Q9: "提示词"在代码里对应什么字段？

| 位置 | 变量名 |
|---|---|
| 底线输入框 | `prompt`（state） |
| 发送给 Worker | `payload.prompt` |
| Worker 收到 | `body.prompt` |
| 发给 OpenRouter | `messages[1].content` |

---

## Q10: 快捷按钮的提示词在哪里？

`src/VideoStudioAssistant.jsx` 第89-97行：

```js
const handleQuickAction = (action) => {
  const prompts = {
    topic:     '推荐一个短视频选题，要求有创意、适合TVC广告风格',
    reference: '帮我查找并描述几个适合以下画面的视觉参考图',
    opening:   '帮我创作一个引人入胜的视频开场白，适合广告短片',
  };
  setChatInput(prompts[action] || '');
};
```
