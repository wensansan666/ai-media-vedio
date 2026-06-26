export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    const json = (data, status = 200) => new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    })

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      })
    }

    if (url.pathname === "/") return new Response("OK")
    if (url.pathname === "/api/test") return new Response("API WORKS")

    // ===== AI 图片生成 =====
    if (url.pathname === "/api/image" && request.method === "POST") {
      const { prompt } = await request.json().catch(() => ({}))
      if (!prompt) return json({ success: false, error: '请输入画面描述' })

      try {
        const apiResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'black-forest-labs/flux.2-klein-4b',
            messages: [{ role: 'user', content: (prompt || '').slice(0, 2000) }],
            modalities: ['image'],
            max_tokens: 500,
          }),
        })
        const data = await apiResp.json()

        if (!apiResp.ok || data.error) {
          const msg = data.error?.message || ''
          if (msg.includes('rate')) return json({ success: false, error: '请求过于频繁，请稍后再试' })
          if (msg.includes('auth') || msg.includes('key')) return json({ success: false, error: 'API Key 认证失败，请检查 OpenRouter 账户' })
          if (msg.includes('endpoint')) return json({ success: false, error: '模型暂时不可用，请稍后重试' })
          return json({ success: false, error: msg || '图片生成服务异常，请重试' })
        }

        const images = data.choices?.[0]?.message?.images || []
        if (images.length > 0) {
          const img = images[0].image_url?.url || images[0]
          // 验证是否为有效 base64 图片
          if (typeof img === 'string' && img.startsWith('data:image')) {
            return json({ success: true, image: img })
          }
          if (typeof img === 'string' && img.startsWith('http')) {
            return json({ success: true, image: img })
          }
          return json({ success: false, error: '生成的图片格式异常，请尝试更换提示词' })
        }

        // Flux 可能返回文字而不是图片
        const text = data.choices?.[0]?.message?.content || ''
        if (text) {
          return json({ success: false, error: '图片模型返回了文字而非图片，请优化提示词后重试：\n' + text.slice(0, 200) })
        }

        return json({ success: false, error: '图片生成失败，请尝试用更具体的英文描述' })
      } catch (err) {
        return json({ success: false, error: '网络异常，请检查连接后重试' })
      }
    }

    // ===== AI 文本生成 =====
    if (url.pathname === "/api/text" && request.method === "POST") {
      const { prompt, actionType } = await request.json().catch(() => ({}))
      if (!prompt) return json({ success: false, error: '请输入文本内容' })

      try {
        const systemPrompts = {
          expand: '你是一位专业的影视编剧。请把下面的故事大纲扩写成详细的剧本片段，包含场景描述、人物动作和环境细节。只输出改写结果。',
          polish: '你是一位专业的文字编辑。请润色下面的剧本段落，优化语气和节奏，保持原意但让文字更有画面感。只输出改写结果。',
          english_prompt: '你是一个专业的AI绘图提示词专家。请把下面的中文创意描述，提炼成英文图片生成提示词。只输出英文，不要解释。',
        }
        const sysPrompt = systemPrompts[actionType] || systemPrompts.expand

        const apiResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-chat',
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: (prompt || '').slice(0, 2000) },
            ],
            max_tokens: 2000,
            temperature: 0.7,
          }),
        })
        const data = await apiResp.json()

        if (!apiResp.ok || data.error) {
          const msg = data.error?.message || ''
          if (msg.includes('rate')) return json({ success: false, error: '请求过于频繁，请稍后再试' })
          if (msg.includes('auth')) return json({ success: false, error: 'API Key 认证失败' })
          return json({ success: false, error: msg || '文本生成服务异常，请重试' })
        }

        const text = (data.choices?.[0]?.message?.content || '').trim()
        if (!text) return json({ success: false, error: '模型返回为空，请重试' })
        // 过滤乱码：如果非中英文比例过低，拒绝返回
        const clean = text.replace(/[^一-龥a-zA-Z0-9\s.,;:!?，。；：！？、\n]/g, '')
        if (clean.length < text.length * 0.6) return json({ success: false, error: '模型输出异常，请重试' })

        return json({ success: true, text: clean })
      } catch (err) {
        return json({ success: false, error: '网络异常，请检查连接后重试' })
      }
    }

    return new Response("Not Found", { status: 404 })
  }
}
