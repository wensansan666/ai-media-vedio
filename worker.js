export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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

      // ========== 图片生成：Flux Klein 4B（≈¥0.10/张）==========
      if (type === 'image') {
        const apiResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'black-forest-labs/flux.2-klein-4b',
            messages: [{ role: 'user', content: prompt }],
            modalities: ['image'],
          }),
        });

        const data = await apiResp.json();

        if (!apiResp.ok || data.error) {
          return new Response(JSON.stringify({
            success: false,
            error: data.error?.message || JSON.stringify(data.error || data),
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // 提取 base64 图片
        const images = data.choices?.[0]?.message?.images || [];
        if (images.length > 0) {
          return new Response(JSON.stringify({
            success: true,
            image: images[0].image_url?.url || images[0],
            text: '',
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({
          success: false,
          error: 'No image returned',
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // ========== 文本生成：Llama 3.1 8B（≈¥0.00001/次） ==========
      if (type === 'text') {
        const systemPrompts = {
          expand: `你是一位专业的影视编剧。请把下面的故事大纲扩写成详细的剧本片段，包含场景描述、人物动作和环境细节。只输出改写结果。`,
          polish: `你是一位专业的文字编辑。请润色下面的剧本段落，优化语气和节奏，保持原意但让文字更有画面感。只输出改写结果。`,
          english_prompt: `你是一个专业的AI绘图提示词专家。请把下面的中文创意描述，提炼成一段高质量的英文图片生成提示词。使用专业摄影/绘画术语。只输出英文提示词，不要解释。`,
        };
        const sysPrompt = systemPrompts[actionType] || systemPrompts.expand;

        const apiResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.1-8b-instruct',
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: prompt },
            ],
          }),
        });

        const data = await apiResp.json();

        if (!apiResp.ok || data.error) {
          return new Response(JSON.stringify({
            success: false,
            error: `[${apiResp.status}] ${JSON.stringify(data.error || data)}`,
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const text = data.choices?.[0]?.message?.content || '';
        return new Response(JSON.stringify({ success: true, text }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Invalid type' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
