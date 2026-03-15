// === VizEngine: Visualization toolkit for physics ===
class VizEngine {
    constructor(container, opts = {}) {
        const containerWidth = container.clientWidth ? container.clientWidth - 32 : 0;
        const defaultWidth = containerWidth > 560 ? Math.min(containerWidth, 900) : 560;
        this.width = opts.width || defaultWidth;
        this.height = opts.height || Math.round(this.width * 0.65);
        this.scale = opts.scale || 40;
        this.originX = opts.originX ?? this.width / 2;
        this.originY = opts.originY ?? this.height / 2;

        const dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        container.appendChild(this.canvas);

        this.colors = {
            bg:'#0c0c20', grid:'#1a1a40', axis:'#4a4a7a', text:'#8b949e',
            white:'#f0f6fc', blue:'#58a6ff', teal:'#3fb9a0', orange:'#f0883e',
            green:'#3fb950', purple:'#bc8cff', red:'#f85149', yellow:'#d29922', pink:'#f778ba'
        };
        this.draggables = [];
        this.animationId = null;
        this._dragBound = false;
        this.dragState = null;
    }

    toScreen(x, y) { return [this.originX + x * this.scale, this.originY - y * this.scale]; }
    toMath(sx, sy) { return [(sx - this.originX) / this.scale, (this.originY - sy) / this.scale]; }

    clear() {
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawGrid(spacing = 1) {
        const ctx = this.ctx;
        const minX = Math.floor(-this.originX / this.scale / spacing) * spacing;
        const maxX = Math.ceil((this.width - this.originX) / this.scale / spacing) * spacing;
        const minY = Math.floor(-(this.height - this.originY) / this.scale / spacing) * spacing;
        const maxY = Math.ceil(this.originY / this.scale / spacing) * spacing;
        ctx.strokeStyle = this.colors.grid; ctx.lineWidth = 0.5;
        for (let x = minX; x <= maxX; x += spacing) {
            const [sx] = this.toScreen(x, 0);
            ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, this.height); ctx.stroke();
        }
        for (let y = minY; y <= maxY; y += spacing) {
            const [, sy] = this.toScreen(0, y);
            ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(this.width, sy); ctx.stroke();
        }
    }

    drawAxes(labelX, labelY) {
        const ctx = this.ctx;
        ctx.strokeStyle = this.colors.axis; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, this.originY); ctx.lineTo(this.width, this.originY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(this.originX, 0); ctx.lineTo(this.originX, this.height); ctx.stroke();
        ctx.fillStyle = this.colors.text; ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        const minX = Math.ceil(-this.originX / this.scale), maxX = Math.floor((this.width - this.originX) / this.scale);
        for (let x = minX; x <= maxX; x++) { if (x === 0) continue; const [sx] = this.toScreen(x, 0); ctx.fillText(x, sx, this.originY + 4); }
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        const minY = Math.ceil(-(this.height - this.originY) / this.scale), maxY = Math.floor(this.originY / this.scale);
        for (let y = minY; y <= maxY; y++) { if (y === 0) continue; const [, sy] = this.toScreen(0, y); ctx.fillText(y, this.originX - 6, sy); }
        if (labelX) { ctx.fillStyle = this.colors.white; ctx.textAlign = 'right'; ctx.textBaseline = 'top'; ctx.font = '13px -apple-system,sans-serif'; ctx.fillText(labelX, this.width - 8, this.originY + 6); }
        if (labelY) { ctx.fillStyle = this.colors.white; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.font = '13px -apple-system,sans-serif'; ctx.fillText(labelY, this.originX + 8, 8); }
    }

    drawVector(x1, y1, x2, y2, color, label, lw = 2) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1);
        const [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return;
        const angle = Math.atan2(dy, dx);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2 - Math.cos(angle) * 10, sy2 - Math.sin(angle) * 10); ctx.stroke();
        ctx.fillStyle = color; ctx.beginPath();
        ctx.moveTo(sx2, sy2);
        ctx.lineTo(sx2 - 12 * Math.cos(angle - Math.PI / 6), sy2 - 12 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(sx2 - 12 * Math.cos(angle + Math.PI / 6), sy2 - 12 * Math.sin(angle + Math.PI / 6));
        ctx.closePath(); ctx.fill();
        if (label) {
            const ux = -dy / len, uy = dx / len;
            ctx.fillStyle = color; ctx.font = 'bold 14px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, (sx1 + sx2) / 2 + ux * 16, (sy1 + sy2) / 2 + uy * 16);
        }
    }

    drawPoint(x, y, color, label, r = 5) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        if (label) { ctx.fillStyle = color; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(label, sx + r + 4, sy - r); }
    }

    drawLine(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 0.1) return;
        const ux = dx / len, uy = dy / len, ext = Math.max(this.width, this.height) * 2;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1 - ux * ext, sy1 - uy * ext); ctx.lineTo(sx2 + ux * ext, sy2 + uy * ext); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawSegment(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawPolygon(points, fill, stroke, lw = 1) {
        const ctx = this.ctx; ctx.beginPath();
        points.forEach(([x, y], i) => { const [sx, sy] = this.toScreen(x, y); i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy); });
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawCircle(cx, cy, r, fill, stroke, lw = 1) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.beginPath(); ctx.arc(sx, sy, r * this.scale, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawEllipse(cx, cy, rx, ry, angle, fill, stroke) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.save(); ctx.translate(sx, sy); ctx.rotate(-angle);
        ctx.beginPath(); ctx.ellipse(0, 0, rx * this.scale, ry * this.scale, 0, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.restore();
    }

    drawText(text, x, y, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, sx, sy);
    }

    screenText(text, px, py, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx;
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, px, py);
    }

    drawFunction(f, xMin, xMax, color, lw, steps) {
        const ctx = this.ctx;
        steps = steps || 200;
        lw = lw || 2;
        const dx = (xMax - xMin) / steps;
        ctx.strokeStyle = color || this.colors.blue;
        ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const x = xMin + i * dx;
            const y = f(x);
            if (!isFinite(y)) { started = false; continue; }
            const [sx, sy] = this.toScreen(x, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
    }

    drawBar(x, yBottom, yTop, barWidth, fill, stroke) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x - barWidth / 2, yBottom);
        const [sx2, sy2] = this.toScreen(x + barWidth / 2, yTop);
        const w = sx2 - sx1;
        const h = sy1 - sy2;
        if (fill) { ctx.fillStyle = fill; ctx.fillRect(sx1, sy2, w, h); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.strokeRect(sx1, sy2, w, h); }
    }

    // --- Physics-specific helpers ---

    // Draw a spring between two points (screen coords)
    drawSpring(x1, y1, x2, y2, coils, amplitude, color) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1);
        const [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return;
        const ux = dx / len, uy = dy / len;
        const nx = -uy, ny = ux;
        coils = coils || 8;
        amplitude = amplitude || 10;
        ctx.strokeStyle = color || this.colors.text;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        const segLen = len / (coils * 2 + 2);
        var cx = sx1 + ux * segLen, cy = sy1 + uy * segLen;
        ctx.lineTo(cx, cy);
        for (var i = 0; i < coils * 2; i++) {
            var sign = (i % 2 === 0) ? 1 : -1;
            cx += ux * segLen;
            cy += uy * segLen;
            ctx.lineTo(cx + nx * sign * amplitude, cy + ny * sign * amplitude);
        }
        cx += ux * segLen;
        cy += uy * segLen;
        ctx.lineTo(cx, cy);
        ctx.stroke();
    }

    // Draw a force arrow with label (physics convention: starts at application point)
    drawForce(x, y, fx, fy, color, label, scale) {
        scale = scale || 1;
        this.drawVector(x, y, x + fx * scale, y + fy * scale, color, label, 2.5);
    }

    // Draw a mass (filled rectangle or circle)
    drawMass(x, y, size, color, label) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(x, y);
        const s = size * this.scale;
        ctx.fillStyle = color || this.colors.blue;
        ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
        ctx.strokeStyle = this.colors.white + '44';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx - s / 2, sy - s / 2, s, s);
        if (label) {
            ctx.fillStyle = this.colors.white;
            ctx.font = 'bold ' + Math.max(12, Math.round(s * 0.4)) + 'px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, sx, sy);
        }
    }

    // Draw a trajectory path from array of [x,y] points
    drawTrajectory(points, color, lw, dashed) {
        if (!points || points.length < 2) return;
        const ctx = this.ctx;
        ctx.strokeStyle = color || this.colors.teal;
        ctx.lineWidth = lw || 2;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath();
        points.forEach(([x, y], i) => {
            const [sx, sy] = this.toScreen(x, y);
            i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        });
        ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    // Draw a ground/surface with hatching
    drawGround(x1, y, x2, color) {
        const ctx = this.ctx;
        const [sx1, sy] = this.toScreen(x1, y);
        const [sx2] = this.toScreen(x2, y);
        ctx.strokeStyle = color || this.colors.text;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(sx1, sy); ctx.lineTo(sx2, sy); ctx.stroke();
        ctx.lineWidth = 1;
        for (var i = sx1; i < sx2; i += 12) {
            ctx.beginPath();
            ctx.moveTo(i, sy);
            ctx.lineTo(i - 8, sy + 10);
            ctx.stroke();
        }
    }

    // Draw a pulley
    drawPulley(x, y, radius, color) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(x, y);
        const r = radius * this.scale;
        ctx.strokeStyle = color || this.colors.text;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = this.colors.bg;
        ctx.beginPath(); ctx.arc(sx, sy, r * 0.3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = color || this.colors.text;
        ctx.beginPath(); ctx.arc(sx, sy, r * 0.3, 0, Math.PI * 2); ctx.stroke();
    }

    // Draw an angle arc between two directions
    drawAngle(cx, cy, angle1, angle2, radius, color, label) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(cx, cy);
        const r = radius * this.scale;
        ctx.strokeStyle = color || this.colors.yellow;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, r, -angle2, -angle1);
        ctx.stroke();
        if (label) {
            var midAngle = -(angle1 + angle2) / 2;
            ctx.fillStyle = color || this.colors.yellow;
            ctx.font = '12px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, sx + (r + 12) * Math.cos(midAngle), sy + (r + 12) * Math.sin(midAngle));
        }
    }

    // Draw a wave pattern
    drawWave(xStart, yCenter, wavelength, amplitude, phase, numWaves, color, lw) {
        const ctx = this.ctx;
        ctx.strokeStyle = color || this.colors.blue;
        ctx.lineWidth = lw || 2;
        var steps = numWaves * 50;
        var totalLen = numWaves * wavelength;
        ctx.beginPath();
        for (var i = 0; i <= steps; i++) {
            var x = xStart + (i / steps) * totalLen;
            var y = yCenter + amplitude * Math.sin(2 * Math.PI * (x - xStart) / wavelength + phase);
            var p = this.toScreen(x, y);
            i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
    }

    // Draw electric field lines between two charges
    drawFieldLine(x1, y1, x2, y2, color, numArrows) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1);
        const [sx2, sy2] = this.toScreen(x2, y2);
        ctx.strokeStyle = color || this.colors.yellow;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
        numArrows = numArrows || 1;
        var dx = sx2 - sx1, dy = sy2 - sy1;
        var angle = Math.atan2(dy, dx);
        for (var i = 1; i <= numArrows; i++) {
            var t = i / (numArrows + 1);
            var ax = sx1 + dx * t, ay = sy1 + dy * t;
            ctx.fillStyle = color || this.colors.yellow;
            ctx.beginPath();
            ctx.moveTo(ax + 6 * Math.cos(angle), ay + 6 * Math.sin(angle));
            ctx.lineTo(ax + 6 * Math.cos(angle - 2.5), ay + 6 * Math.sin(angle - 2.5));
            ctx.lineTo(ax + 6 * Math.cos(angle + 2.5), ay + 6 * Math.sin(angle + 2.5));
            ctx.closePath(); ctx.fill();
        }
    }

    // Draw a charge (+ or -)
    drawCharge(x, y, sign, color, radius) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(x, y);
        radius = radius || 12;
        ctx.fillStyle = color || (sign > 0 ? this.colors.red : this.colors.blue);
        ctx.beginPath(); ctx.arc(sx, sy, radius, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = this.colors.white;
        ctx.font = 'bold 16px -apple-system,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(sign > 0 ? '+' : '\u2212', sx, sy);
    }

    // Draw a resistor symbol (screen coords)
    drawResistor(sx1, sy1, sx2, sy2, color) {
        const ctx = this.ctx;
        var dx = sx2 - sx1, dy = sy2 - sy1;
        var len = Math.sqrt(dx * dx + dy * dy);
        var ux = dx / len, uy = dy / len;
        var nx = -uy, ny = ux;
        ctx.strokeStyle = color || this.colors.text;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        var margin = len * 0.15;
        ctx.moveTo(sx1, sy1);
        ctx.lineTo(sx1 + ux * margin, sy1 + uy * margin);
        var zigLen = (len - 2 * margin);
        var segs = 6;
        var segL = zigLen / segs;
        var cx = sx1 + ux * margin, cy = sy1 + uy * margin;
        for (var i = 0; i < segs; i++) {
            var sign = (i % 2 === 0) ? 1 : -1;
            cx += ux * segL;
            cy += uy * segL;
            ctx.lineTo(cx + nx * sign * 6, cy + ny * sign * 6);
        }
        ctx.lineTo(sx2, sy2);
        ctx.stroke();
    }

    addDraggable(id, x, y, color, radius = 8, onDrag) {
        const d = { id, x, y, color, radius: radius || 8, onDrag };
        this.draggables.push(d);
        if (!this._dragBound) {
            this._dragBound = true;
            const getPos = (e) => {
                const r = this.canvas.getBoundingClientRect();
                const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
                const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
                return this.toMath(cx, cy);
            };
            const startDrag = (e) => {
                const [wx, wy] = getPos(e);
                for (const dr of this.draggables) {
                    if (Math.sqrt((wx - dr.x) ** 2 + (wy - dr.y) ** 2) < dr.radius / this.scale * 2.5) {
                        this.dragState = dr; e.preventDefault(); break;
                    }
                }
            };
            const moveDrag = (e) => {
                if (!this.dragState) return;
                e.preventDefault();
                const [wx, wy] = getPos(e);
                this.dragState.x = wx; this.dragState.y = wy;
                if (this.dragState.onDrag) this.dragState.onDrag(wx, wy);
            };
            const endDrag = () => { this.dragState = null; };
            this.canvas.addEventListener('mousedown', startDrag);
            this.canvas.addEventListener('mousemove', moveDrag);
            this.canvas.addEventListener('mouseup', endDrag);
            this.canvas.addEventListener('mouseleave', endDrag);
            this.canvas.addEventListener('touchstart', startDrag, { passive: false });
            this.canvas.addEventListener('touchmove', moveDrag, { passive: false });
            this.canvas.addEventListener('touchend', endDrag);
        }
        return d;
    }

    drawDraggables() {
        for (const d of this.draggables) {
            const [sx, sy] = this.toScreen(d.x, d.y);
            const ctx = this.ctx;
            ctx.fillStyle = d.color + '33'; ctx.beginPath(); ctx.arc(sx, sy, d.radius + 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = d.color; ctx.beginPath(); ctx.arc(sx, sy, d.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffffff44'; ctx.beginPath(); ctx.arc(sx - 2, sy - 2, d.radius * 0.3, 0, Math.PI * 2); ctx.fill();
        }
    }

    animate(drawFrame) {
        const loop = (t) => { drawFrame(t); this.animationId = requestAnimationFrame(loop); };
        this.animationId = requestAnimationFrame(loop);
    }

    stopAnimation() { if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; } }

    static createSlider(container, label, min, max, val, step, onChange) {
        const g = document.createElement('div'); g.className = 'viz-slider-group';
        const l = document.createElement('span'); l.className = 'viz-slider-label'; l.textContent = label;
        const s = document.createElement('input'); s.type = 'range'; s.className = 'viz-slider';
        s.min = min; s.max = max; s.value = val; s.step = step || 0.1;
        const v = document.createElement('span'); v.className = 'viz-slider-value'; v.textContent = parseFloat(val).toFixed(1);
        s.addEventListener('input', () => { v.textContent = parseFloat(s.value).toFixed(1); onChange(parseFloat(s.value)); });
        g.appendChild(l); g.appendChild(s); g.appendChild(v); container.appendChild(g);
        return s;
    }

    static createButton(container, label, onClick) {
        const b = document.createElement('button');
        b.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
        b.textContent = label; b.addEventListener('click', onClick); container.appendChild(b); return b;
    }

    static matVec(M, v) { return [M[0][0]*v[0]+M[0][1]*v[1], M[1][0]*v[0]+M[1][1]*v[1]]; }
    static matMul(A, B) { return [[A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]], [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]]; }
    static det2(M) { return M[0][0]*M[1][1]-M[0][1]*M[1][0]; }
    static normalize(v) { const l = Math.sqrt(v[0]*v[0]+v[1]*v[1]); return l < 1e-10 ? [0,0] : [v[0]/l, v[1]/l]; }
    static vecLen(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]); }
    static dot(u, v) { return u[0]*v[0]+u[1]*v[1]; }
    static lerp(a, b, t) { return a + (b - a) * t; }
}
window.VizEngine = VizEngine;
