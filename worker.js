export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS 允许前端跨域调用
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const { prompt, type, actionType } = body;

      let model, apiBody;

      if (type === 'image') {
        // ===== Nano Banana 2 图片生成 =====
        model = 'gemini-3.1-flash-image-preview';
        apiBody = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        };
      } else if (type === 'text' && actionType === 'english_prompt') {
        // ===== 图片提示词翻译/优化 =====
        model = 'gemini-2.0-flash';
        apiBody = {
          contents: [{
            parts: [{
              text: `你是一个专业的AI绘图提示词专家。请把下面这段中文创意描述，提炼成一段高质量的英文图片生成提示词。要求：细节丰富、使用专业摄影/绘画术语、适合输入到AI绘画模型。只需返回英文提示词，不要加任何解释。

中文描述：${prompt}
英文提示词：`
            }],
          }],
        };
      } else if (type === 'text') {
        // ===== Gemini 文本生成（扩写/润色）=====
        model = 'gemini-2.0-flash';
        const systemPrompts = {
          expand: `你是一位专业的影视编剧。请把下面的故事大纲扩写成详细的剧本片段，包含场景描述、人物动作和环境细节。`,
          polish: `你是一位专业的文字编辑。请润色下面的剧本段落，优化语气和节奏，保持原意但让文字更有画面感。`,
        };
        const sysPrompt = systemPrompts[actionType] || systemPrompts.expand;
        apiBody = {
          contents: [{ parts: [{ text: `${sysPrompt}\n\n原文：${prompt}\n\n改写结果：` }] }],
        };
      } else {
        return new Response(JSON.stringify({ error: 'Invalid type' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 调用 Google AI API
      const apiResp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiBody),
        }
      );

      const data = await apiResp.json();

      if (!apiResp.ok) {
        return new Response(JSON.stringify({
          success: false,
          error: data.error?.message || `API request failed`,
        }), {
          status: apiResp.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 解析结果
      const parts = data.candidates?.[0]?.content?.parts || [];

      if (type === 'image') {
        // 找图片数据
        const imgPart = parts.find(p => p.inlineData);
        const textPart = parts.find(p => p.text);
        if (imgPart) {
          return new Response(JSON.stringify({
            success: true,
            image: `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`,
            text: textPart?.text || '',
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        // 可能只有 text（被安全过滤了）
        return new Response(JSON.stringify({
          success: false,
          error: textPart?.text || '未生成图片',
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // 文本结果
      const text = parts.map(p => p.text).filter(Boolean).join('\n');
      return new Response(JSON.stringify({ success: true, text }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
