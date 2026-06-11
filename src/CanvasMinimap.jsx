import React, { useRef, useEffect, useState } from 'react';

export default function CanvasMinimap({ nodes, pan, zoom, onNavigate }) {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const BOX_W = 160, BOX_H = 120;

  // 计算所有节点的包围盒
  const bounds = React.useMemo(() => {
    if (!nodes.length) return { x: 0, y: 0, w: 1, h: 1 };
    const xs = nodes.map(n => n.x);
    const ys = nodes.map(n => n.y);
    const minX = Math.min(...xs) - 200;
    const minY = Math.min(...ys) - 200;
    const maxX = Math.max(...xs.map((x, i) => x + 480)) + 200;
    const maxY = Math.max(...ys.map((y, i) => y + (nodes[i].type === 'text' ? 540 : 480))) + 200;
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }, [nodes]);

  const scale = Math.min(BOX_W / bounds.w, BOX_H / bounds.h, 0.5);
  const viewW = (window.innerWidth / zoom) / scale * scale;
  const viewH = (window.innerHeight / zoom) / scale * scale;

  // 视口在画布中的位置（反向推 pan）
  const vx = (-pan.x / zoom - bounds.x) * scale;
  const vy = (-pan.y / zoom - bounds.y) * scale;

  const handleMouseDown = (e) => {
    setDragging(true);
    updatePan(e);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    updatePan(e);
  };

  const handleMouseUp = () => setDragging(false);

  const updatePan = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = mx / scale + bounds.x;
    const cy = my / scale + bounds.y;
    const pw = window.innerWidth;
    const ph = window.innerHeight;
    onNavigate({ x: -(cx * zoom - pw / 2), y: -(cy * zoom - ph / 2) });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="relative bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl shadow-lg overflow-hidden cursor-crosshair"
      style={{ width: BOX_W, height: BOX_H }}
    >
      {/* 节点缩略点 */}
      {nodes.map(n => {
        const nx = (n.x - bounds.x) * scale;
        const ny = (n.y - bounds.y) * scale;
        const nw = 480 * scale;
        const nh = (n.type === 'text' ? 540 : 480) * scale;
        return (
          <div
            key={n.id}
            className="absolute rounded"
            style={{
              left: nx, top: ny, width: nw, height: nh,
              background: n.type === 'text' ? 'rgba(99,102,241,0.25)' :
                         n.type === 'video' ? 'rgba(239,68,68,0.25)' :
                         n.type === 'image' ? 'rgba(34,197,94,0.25)' : 'rgba(168,85,247,0.25)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
        );
      })}

      {/* 当前视口框 */}
      <div
        className="absolute border-2 border-indigo-500 bg-indigo-500/10 rounded pointer-events-none"
        style={{
          left: Math.max(0, Math.min(vx, BOX_W - viewW * scale * scale)),
          top: Math.max(0, Math.min(vy, BOX_H - viewH * scale * scale)),
          width: Math.min(viewW * scale * scale, BOX_W),
          height: Math.min(viewH * scale * scale, BOX_H),
        }}
      />
    </div>
  );
}
