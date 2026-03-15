window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch02',
  number: 2,
  title: 'Projectile Motion',
  subtitle: 'Two-Dimensional Motion Under Gravity',
  sections: [

    // ─── SECTION 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch02-sec01',
      title: '1. Horizontal Projectile Motion',
      content: `
<div class="env-block intuition"><div class="env-title">From One Dimension to Two</div><div class="env-body"><p>In Chapter 1, you studied motion along a straight line: objects speeding up, slowing down, or falling vertically. But what happens when an object is launched horizontally off a cliff? It moves forward <em>and</em> falls downward at the same time. This is projectile motion, and the key insight is that the horizontal and vertical components of the motion are completely independent of each other.</p></div></div>

<h2>Horizontal Projectile Motion</h2>
<p class="section-roadmap"><em>In this section, you will learn how an object launched horizontally behaves: constant speed sideways, free fall downward, and the resulting parabolic path.</em></p>

<div class="definition">
<strong>Horizontal Projectile</strong>: An object launched with an initial horizontal velocity \\(v_0\\) and no initial vertical velocity. It experiences only gravitational acceleration \\(g\\) downward (air resistance neglected).
</div>

<h3>The Independence Principle</h3>
<p>The most important concept in projectile motion is that <strong>horizontal and vertical motions are independent</strong>. Gravity only affects the vertical component; it does not slow down or speed up the horizontal component.</p>

<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
<thead>
<tr style="background:#1a1a40;">
<th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Component</th>
<th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Horizontal (x)</th>
<th style="padding:8px;border:1px solid #30363d;color:#f0883e;">Vertical (y)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:8px;border:1px solid #30363d;">Acceleration</td>
<td style="padding:8px;border:1px solid #30363d;">\\(a_x = 0\\)</td>
<td style="padding:8px;border:1px solid #30363d;">\\(a_y = g = 9.8\\,\\text{m/s}^2\\) (downward)</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #30363d;">Velocity</td>
<td style="padding:8px;border:1px solid #30363d;">\\(v_x = v_0\\) (constant)</td>
<td style="padding:8px;border:1px solid #30363d;">\\(v_y = gt\\)</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #30363d;">Position</td>
<td style="padding:8px;border:1px solid #30363d;">\\(x = v_0 t\\)</td>
<td style="padding:8px;border:1px solid #30363d;">\\(y = \\tfrac{1}{2}gt^2\\)</td>
</tr>
</tbody>
</table>

<div class="env-block remark"><div class="env-title">Sign Convention</div><div class="env-body"><p>Here we take the launch point as the origin, with \\(x\\) pointing in the direction of launch and \\(y\\) pointing downward. Under this convention, both \\(y\\) and \\(v_y\\) are positive as the object falls.</p></div></div>

<h3>Trajectory Equation</h3>
<p>To find the path shape, eliminate \\(t\\) from the position equations. From the horizontal equation, \\(t = x / v_0\\). Substituting into the vertical equation:</p>
\\[
y = \\frac{g}{2v_0^2}\\,x^2
\\]
<p>This is a <strong>parabola</strong>, confirming that the trajectory of a horizontal projectile is a parabolic curve.</p>

<div class="env-block example"><div class="env-title">Example: Ball Rolling Off a Table</div><div class="env-body">
<p>A ball rolls off a 1.25 m high table with a horizontal speed of 3.0 m/s. Find (a) the time to hit the ground and (b) the horizontal distance from the table edge.</p>
<p><strong>Solution:</strong></p>
<p>(a) Using \\(y = \\tfrac{1}{2}gt^2\\) with \\(y = 1.25\\) m:</p>
\\[t = \\sqrt{\\frac{2y}{g}} = \\sqrt{\\frac{2 \\times 1.25}{9.8}} \\approx 0.505\\,\\text{s}\\]
<p>(b) Horizontal distance: \\(x = v_0 t = 3.0 \\times 0.505 \\approx 1.52\\,\\text{m}\\)</p>
</div></div>

<h3>Velocity at Any Instant</h3>
<p>The resultant velocity has magnitude and direction:</p>
\\[
v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{v_0^2 + (gt)^2}
\\]
<p>The angle \\(\\alpha\\) below the horizontal satisfies:</p>
\\[
\\tan\\alpha = \\frac{v_y}{v_x} = \\frac{gt}{v_0}
\\]

<div class="env-block warning"><div class="env-title">Common Mistake</div><div class="env-body"><p>The velocity direction is <em>not</em> the same as the displacement direction. The velocity vector is always tangent to the trajectory at each point, while the displacement vector points from the origin to the current position.</p></div></div>

<div class="viz-placeholder" data-viz="viz-horizontal-projectile"></div>

<div class="viz-placeholder" data-viz="viz-independence-demo"></div>
`,
      visualizations: [
        {
          id: 'viz-horizontal-projectile',
          title: 'Horizontal Projectile Trajectory',
          description: 'Adjust the launch speed to see how it affects the trajectory. The object is launched horizontally from the top-left.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 400, scale: 35,
              originX: 60, originY: 50
            });
            let v0 = 5;
            const g = 9.8;
            const hSlider = VizEngine.createSlider(controls, 'v\u2080 (m/s)', 1, 12, v0, 0.5, val => { v0 = val; draw(); });

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              // draw grid and axes
              ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
              for (let i = 0; i <= 14; i++) {
                const sx = 60 + i * 35;
                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, 400); ctx.stroke();
              }
              for (let j = 0; j <= 10; j++) {
                const sy = 50 + j * 35;
                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(560, sy); ctx.stroke();
              }
              // axes
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(60, 50); ctx.lineTo(560, 50); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(60, 50); ctx.lineTo(60, 400); ctx.stroke();
              // labels
              ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'top';
              for (let i = 1; i <= 13; i++) ctx.fillText(i, 60 + i * 35, 54);
              ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
              for (let j = 1; j <= 9; j++) ctx.fillText(j, 55, 50 + j * 35);
              ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
              ctx.textAlign = 'right'; ctx.textBaseline = 'top';
              ctx.fillText('x (m)', 555, 54);
              ctx.textAlign = 'left'; ctx.textBaseline = 'top';
              ctx.fillText('y (m) [down]', 65, 385);

              // trajectory
              ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2.5;
              ctx.beginPath();
              let first = true;
              const maxT = 2.0;
              for (let i = 0; i <= 200; i++) {
                const t = (i / 200) * maxT;
                const x = v0 * t;
                const y = 0.5 * g * t * t;
                const sx = 60 + x * 35;
                const sy = 50 + y * 35;
                if (sy > 395) break;
                if (first) { ctx.moveTo(sx, sy); first = false; }
                else ctx.lineTo(sx, sy);
              }
              ctx.stroke();

              // draw time markers
              for (let k = 1; k <= 8; k++) {
                const t = k * 0.2;
                const x = v0 * t;
                const y = 0.5 * g * t * t;
                const sx = 60 + x * 35;
                const sy = 50 + y * 35;
                if (sy > 395) break;
                ctx.fillStyle = viz.colors.orange;
                ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();
                // velocity vector
                const vx = v0;
                const vy = g * t;
                const vScale = 0.12;
                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(sx, sy);
                ctx.lineTo(sx + vx * vScale * 35, sy + vy * vScale * 35); ctx.stroke();
              }

              // launch point
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath(); ctx.arc(60, 50, 6, 0, Math.PI * 2); ctx.fill();

              // info
              const tGround = Math.sqrt(2 * 9 / g);
              const range = v0 * tGround;
              viz.screenText('Time to fall 9 m: ' + tGround.toFixed(2) + ' s', 350, 25, viz.colors.text, 12);
              viz.screenText('Horizontal range: ' + range.toFixed(2) + ' m', 350, 12, viz.colors.blue, 12);
            }
            draw();
            return viz;
          }
        },
        {
          id: 'viz-independence-demo',
          title: 'Independence of Horizontal and Vertical Motion',
          description: 'Two balls are released simultaneously: one is dropped straight down, the other is launched horizontally. Watch how they hit the ground at the same time!',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 380, scale: 40,
              originX: 80, originY: 40
            });
            let running = false;
            let t = 0;
            const g = 9.8;
            const v0 = 4;
            const h = 7; // height in meters (displayed as screen units)

            VizEngine.createButton(controls, 'Drop Both', () => {
              t = 0; running = true;
            });
            VizEngine.createButton(controls, 'Reset', () => {
              t = 0; running = false; drawFrame(0);
            });

            function drawFrame() {
              viz.clear();
              const ctx = viz.ctx;
              const sc = 40;
              const ox = 80, oy = 40;

              // ground
              ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
              const groundY = oy + h * sc;
              ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(560, groundY); ctx.stroke();
              ctx.lineWidth = 1;
              for (let i = 0; i < 560; i += 12) {
                ctx.beginPath(); ctx.moveTo(i, groundY); ctx.lineTo(i - 8, groundY + 10); ctx.stroke();
              }

              // cliff
              ctx.fillStyle = '#1a1a40';
              ctx.fillRect(ox - 30, oy, 30, h * sc);
              ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1.5;
              ctx.strokeRect(ox - 30, oy, 30, h * sc);

              // labels
              viz.screenText('Dropped', ox - 15, oy - 12, viz.colors.red, 12);
              viz.screenText('Launched', ox + 30, oy - 12, viz.colors.blue, 12);

              // calculate positions
              const yFall = 0.5 * g * t * t;
              const clampY = Math.min(yFall, h);

              // dropped ball (red) - falls straight down at the cliff edge
              const droppedSx = ox - 15;
              const droppedSy = oy + clampY * sc;
              ctx.fillStyle = viz.colors.red;
              ctx.beginPath(); ctx.arc(droppedSx, droppedSy, 10, 0, Math.PI * 2); ctx.fill();

              // launched ball (blue) - moves right and falls
              const xLaunch = v0 * t;
              const launchedSx = ox + xLaunch * sc;
              const launchedSy = oy + clampY * sc;
              if (launchedSx < 550) {
                ctx.fillStyle = viz.colors.blue;
                ctx.beginPath(); ctx.arc(launchedSx, launchedSy, 10, 0, Math.PI * 2); ctx.fill();
              }

              // horizontal dashed line connecting them
              if (clampY < h) {
                ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath(); ctx.moveTo(droppedSx, droppedSy);
                ctx.lineTo(Math.min(launchedSx, 550), launchedSy); ctx.stroke();
                ctx.setLineDash([]);
              }

              // time display
              viz.screenText('t = ' + t.toFixed(2) + ' s', 300, 20, viz.colors.white, 14);

              if (clampY >= h) {
                viz.screenText('Both land at the same time!', 300, groundY + 25, viz.colors.green, 14);
                running = false;
              }
            }

            drawFrame();
            viz.animate(function() {
              if (running) t += 0.016;
              drawFrame();
            });
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A stone is thrown horizontally with a speed of 10 m/s from the edge of a 20 m high cliff. How long does it take to reach the ground? (Use \\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'The vertical motion is independent of horizontal. Use \\(h = \\tfrac{1}{2}gt^2\\).',
          solution: 'From \\(h = \\tfrac{1}{2}gt^2\\): \\(t = \\sqrt{2h/g} = \\sqrt{2 \\times 20 / 10} = 2.0\\) s.'
        },
        {
          question: 'In the previous problem, how far from the base of the cliff does the stone land?',
          hint: 'Use \\(x = v_0 t\\) with the time you found.',
          solution: '\\(x = v_0 t = 10 \\times 2.0 = 20\\) m from the base of the cliff.'
        },
        {
          question: 'A ball is launched horizontally at 5 m/s from a height of 45 m. What is the magnitude of its velocity just before hitting the ground? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Find \\(v_y = gt\\) first, then use \\(v = \\sqrt{v_x^2 + v_y^2}\\).',
          solution: 'Time to fall: \\(t = \\sqrt{2 \\times 45/10} = 3\\) s. Vertical velocity: \\(v_y = 10 \\times 3 = 30\\) m/s. Resultant: \\(v = \\sqrt{5^2 + 30^2} = \\sqrt{925} \\approx 30.4\\) m/s.'
        },
        {
          question: 'At what angle below the horizontal does the velocity vector point when the ball in the previous problem hits the ground?',
          hint: 'Use \\(\\tan\\alpha = v_y / v_x\\).',
          solution: '\\(\\tan\\alpha = 30/5 = 6\\), so \\(\\alpha = \\arctan(6) \\approx 80.5^\\circ\\) below the horizontal.'
        },
        {
          question: 'Two identical balls are released from the same height at the same instant. Ball A is dropped from rest. Ball B is thrown horizontally at 20 m/s. Which ball hits the ground first?',
          hint: 'Think about the independence of horizontal and vertical motion.',
          solution: 'They hit the ground at the same time. The vertical motion is independent of the horizontal motion, so both balls experience the same free-fall time regardless of horizontal speed.'
        }
      ]
    },

    // ─── SECTION 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch02-sec02',
      title: '2. General Projectile Motion',
      content: `
<h2>General Projectile Motion</h2>
<p class="section-roadmap"><em>In this section, you will study the general case where an object is launched at an angle above the horizontal, decompose the initial velocity into components, and derive the equations of motion for the full parabolic trajectory.</em></p>

<div class="definition">
<strong>General Projectile</strong>: An object launched with initial speed \\(v_0\\) at angle \\(\\theta\\) above the horizontal. The initial velocity components are:
\\[v_{0x} = v_0 \\cos\\theta, \\qquad v_{0y} = v_0 \\sin\\theta\\]
</div>

<h3>Equations of Motion</h3>
<p>Taking the launch point as the origin, with \\(x\\) horizontal and \\(y\\) upward:</p>

<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
<thead>
<tr style="background:#1a1a40;">
<th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Quantity</th>
<th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Horizontal</th>
<th style="padding:8px;border:1px solid #30363d;color:#f0883e;">Vertical</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:8px;border:1px solid #30363d;">Acceleration</td>
<td style="padding:8px;border:1px solid #30363d;">\\(a_x = 0\\)</td>
<td style="padding:8px;border:1px solid #30363d;">\\(a_y = -g\\)</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #30363d;">Velocity</td>
<td style="padding:8px;border:1px solid #30363d;">\\(v_x = v_0\\cos\\theta\\)</td>
<td style="padding:8px;border:1px solid #30363d;">\\(v_y = v_0\\sin\\theta - gt\\)</td>
</tr>
<tr>
<td style="padding:8px;border:1px solid #30363d;">Position</td>
<td style="padding:8px;border:1px solid #30363d;">\\(x = v_0 t\\cos\\theta\\)</td>
<td style="padding:8px;border:1px solid #30363d;">\\(y = v_0 t\\sin\\theta - \\tfrac{1}{2}gt^2\\)</td>
</tr>
</tbody>
</table>

<h3>Trajectory Equation</h3>
<p>Eliminating \\(t\\) from the position equations (using \\(t = x/(v_0\\cos\\theta)\\)):</p>
\\[
y = x\\tan\\theta - \\frac{g}{2v_0^2\\cos^2\\theta}\\,x^2
\\]
<p>This confirms the trajectory is a <strong>parabola</strong> opening downward (when \\(y\\) points upward).</p>

<div class="env-block intuition"><div class="env-title">Reading the Trajectory Equation</div><div class="env-body">
<p>The first term \\(x\\tan\\theta\\) represents where the projectile would be without gravity (a straight line). The second term \\(-\\frac{g}{2v_0^2\\cos^2\\theta}x^2\\) is the downward correction due to gravity. The parabola bends down from the straight-line path.</p>
</div></div>

<h3>Symmetry of Projectile Motion</h3>
<p>For a projectile launched and landing at the same height:</p>
<ul>
<li>The trajectory is <strong>symmetric</strong> about the highest point.</li>
<li>The time to rise equals the time to fall.</li>
<li>The speed at any height during ascent equals the speed at the same height during descent.</li>
<li>The launch angle equals the landing angle (measured from horizontal).</li>
</ul>

<div class="env-block warning"><div class="env-title">When Symmetry Breaks</div><div class="env-body"><p>Symmetry only holds when the launch and landing heights are the same, and air resistance is neglected. For projectiles launched from a cliff or with air drag, the ascending and descending paths are not mirror images.</p></div></div>

<div class="viz-placeholder" data-viz="viz-general-projectile"></div>
`,
      visualizations: [
        {
          id: 'viz-general-projectile',
          title: 'General Projectile Motion Explorer',
          description: 'Adjust the launch angle and speed. The blue curve shows the trajectory; orange dots mark equal time intervals. The green dashed line shows the path without gravity.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 600, height: 400, scale: 12,
              originX: 40, originY: 360
            });
            let v0 = 20, theta = 45;
            const g = 9.8;

            VizEngine.createSlider(controls, 'v\u2080 (m/s)', 5, 35, v0, 1, val => { v0 = val; draw(); });
            VizEngine.createSlider(controls, '\u03B8 (deg)', 5, 85, theta, 1, val => { theta = val; draw(); });

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              const sc = 12, ox = 40, oy = 360;
              const rad = theta * Math.PI / 180;
              const vx = v0 * Math.cos(rad);
              const vy = v0 * Math.sin(rad);

              // grid
              ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
              for (let i = 0; i <= 50; i++) {
                const sx = ox + i * sc;
                if (sx > 600) break;
                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, 400); ctx.stroke();
              }
              for (let j = 0; j <= 30; j++) {
                const sy = oy - j * sc;
                if (sy < 0) break;
                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(600, sy); ctx.stroke();
              }

              // axes
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(600, oy); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, 0); ctx.stroke();
              // tick labels
              ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'top';
              for (let i = 5; i <= 45; i += 5) {
                const sx = ox + i * sc;
                if (sx > 590) break;
                ctx.fillText(i, sx, oy + 4);
              }
              ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
              for (let j = 5; j <= 30; j += 5) {
                const sy = oy - j * sc;
                if (sy < 10) break;
                ctx.fillText(j, ox - 4, sy);
              }
              ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText('x (m)', 595, oy + 18);
              ctx.textAlign = 'left';
              ctx.fillText('y (m)', ox + 6, 12);

              // no-gravity line (dashed green)
              const tFlight = 2 * vy / g;
              const endX = vx * tFlight;
              const endYNoG = vy * tFlight;
              ctx.strokeStyle = viz.colors.green + '66'; ctx.lineWidth = 1;
              ctx.setLineDash([6, 4]);
              ctx.beginPath();
              ctx.moveTo(ox, oy);
              const ngEndSx = ox + Math.min(endX, 45) * sc;
              const ngEndSy = oy - Math.min(endYNoG, 30) * sc;
              ctx.lineTo(ngEndSx, ngEndSy);
              ctx.stroke();
              ctx.setLineDash([]);

              // trajectory curve
              ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
              ctx.beginPath();
              let started = false;
              for (let i = 0; i <= 300; i++) {
                const t = (i / 300) * tFlight;
                const x = vx * t;
                const y = vy * t - 0.5 * g * t * t;
                if (y < -0.5) break;
                const sx = ox + x * sc;
                const sy = oy - y * sc;
                if (sx > 600) break;
                if (!started) { ctx.moveTo(sx, sy); started = true; }
                else ctx.lineTo(sx, sy);
              }
              ctx.stroke();

              // time dots
              const numDots = 12;
              const dt = tFlight / numDots;
              for (let k = 0; k <= numDots; k++) {
                const t = k * dt;
                const x = vx * t;
                const y = vy * t - 0.5 * g * t * t;
                if (y < -0.5) break;
                const sx = ox + x * sc;
                const sy = oy - y * sc;
                if (sx > 600) break;
                ctx.fillStyle = viz.colors.orange;
                ctx.beginPath(); ctx.arc(sx, sy, 3.5, 0, Math.PI * 2); ctx.fill();
              }

              // velocity vector at launch
              const vScale = 0.5;
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(ox, oy);
              ctx.lineTo(ox + vx * vScale * sc, oy - vy * vScale * sc);
              ctx.stroke();
              // arrowhead
              const aLen = Math.sqrt((vx * vScale * sc) ** 2 + (vy * vScale * sc) ** 2);
              const aAngle = Math.atan2(-vy * vScale * sc, vx * vScale * sc);
              const tipX = ox + vx * vScale * sc;
              const tipY = oy - vy * vScale * sc;
              ctx.fillStyle = viz.colors.red;
              ctx.beginPath();
              ctx.moveTo(tipX, tipY);
              ctx.lineTo(tipX - 10 * Math.cos(aAngle - Math.PI / 6), tipY - 10 * Math.sin(aAngle - Math.PI / 6));
              ctx.lineTo(tipX - 10 * Math.cos(aAngle + Math.PI / 6), tipY - 10 * Math.sin(aAngle + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // angle arc
              ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(ox, oy, 30, -rad, 0);
              ctx.stroke();
              ctx.fillStyle = viz.colors.yellow; ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
              ctx.fillText(theta + '\u00B0', ox + 34, oy - 14);

              // stats
              const maxH = (vy * vy) / (2 * g);
              const range = (v0 * v0 * Math.sin(2 * rad)) / g;
              viz.screenText('Range: ' + range.toFixed(1) + ' m', 450, 15, viz.colors.blue, 12);
              viz.screenText('Max height: ' + maxH.toFixed(1) + ' m', 450, 30, viz.colors.teal, 12);
              viz.screenText('Flight time: ' + tFlight.toFixed(2) + ' s', 450, 45, viz.colors.orange, 12);

              // launch point
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath(); ctx.arc(ox, oy, 5, 0, Math.PI * 2); ctx.fill();
            }
            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A ball is launched at 20 m/s at an angle of 30 degrees above the horizontal. Find the horizontal and vertical components of the initial velocity.',
          hint: 'Use \\(v_{0x} = v_0\\cos\\theta\\) and \\(v_{0y} = v_0\\sin\\theta\\).',
          solution: '\\(v_{0x} = 20\\cos 30^\\circ = 20 \\times 0.866 = 17.3\\) m/s. \\(v_{0y} = 20\\sin 30^\\circ = 20 \\times 0.5 = 10.0\\) m/s.'
        },
        {
          question: 'A projectile is fired at 30 m/s at 60 degrees above the horizontal. How long is it in the air before returning to launch height? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Total flight time is \\(T = 2v_0\\sin\\theta / g\\).',
          solution: '\\(T = 2v_0\\sin\\theta / g = 2 \\times 30 \\times \\sin 60^\\circ / 10 = 2 \\times 30 \\times 0.866 / 10 = 5.20\\) s.'
        },
        {
          question: 'For the projectile in the previous problem, what is the velocity at the highest point of the trajectory?',
          hint: 'At the highest point, the vertical velocity is zero. What about the horizontal velocity?',
          solution: 'At the highest point, \\(v_y = 0\\). The horizontal velocity is constant: \\(v_x = 30\\cos 60^\\circ = 15\\) m/s. So the speed at the top is 15 m/s (directed horizontally).'
        },
        {
          question: 'Explain why the time dots in the visualization are equally spaced horizontally but not vertically.',
          hint: 'Think about the type of motion in each direction.',
          solution: 'Horizontally, the velocity is constant (\\(v_x = v_0\\cos\\theta\\)), so equal time intervals produce equal horizontal displacements. Vertically, the motion is uniformly accelerated (deceleration going up, acceleration going down), so the vertical spacings are unequal.'
        },
        {
          question: 'A projectile is launched at 25 m/s at 53 degrees (\\(\\sin 53^\\circ \\approx 0.8\\), \\(\\cos 53^\\circ \\approx 0.6\\)). Find its position and velocity at \\(t = 2\\) s. (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Compute \\(x\\), \\(y\\), \\(v_x\\), and \\(v_y\\) separately.',
          solution: '\\(v_{0x} = 25 \\times 0.6 = 15\\) m/s, \\(v_{0y} = 25 \\times 0.8 = 20\\) m/s. Position: \\(x = 15 \\times 2 = 30\\) m, \\(y = 20 \\times 2 - \\tfrac{1}{2}(10)(4) = 40 - 20 = 20\\) m. Velocity: \\(v_x = 15\\) m/s, \\(v_y = 20 - 10 \\times 2 = 0\\) m/s. So at \\(t=2\\) s, the projectile is at (30, 20) m with speed 15 m/s (at the peak).'
        }
      ]
    },

    // ─── SECTION 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch02-sec03',
      title: '3. Range and Maximum Height',
      content: `
<h2>Range and Maximum Height</h2>
<p class="section-roadmap"><em>In this section, you will derive closed-form expressions for the range, maximum height, and time of flight, and explore how the launch angle affects each quantity.</em></p>

<h3>Time of Flight</h3>
<p>For a projectile launched at angle \\(\\theta\\) with speed \\(v_0\\) and landing at the same height, the flight time \\(T\\) is found by setting \\(y = 0\\):</p>
\\[
0 = v_0 T \\sin\\theta - \\tfrac{1}{2}gT^2 \\quad \\Rightarrow \\quad T = \\frac{2v_0\\sin\\theta}{g}
\\]

<h3>Maximum Height</h3>
<p>The projectile reaches its peak when \\(v_y = 0\\), which occurs at \\(t = v_0\\sin\\theta / g\\). Substituting:</p>
\\[
H = \\frac{v_0^2 \\sin^2\\theta}{2g}
\\]

<div class="env-block remark"><div class="env-title">Maximum Height is Proportional to \\(\\sin^2\\theta\\)</div><div class="env-body"><p>Doubling the launch angle from 30 to 60 degrees increases \\(\\sin^2\\theta\\) from 0.25 to 0.75, tripling the maximum height (for the same launch speed). A 90-degree launch gives the greatest height: \\(H_{\\max} = v_0^2/(2g)\\).</p></div></div>

<h3>Range</h3>
<p>The horizontal range \\(R\\) is the horizontal distance when the projectile returns to launch height:</p>
\\[
R = v_0 T \\cos\\theta = \\frac{v_0^2 \\sin(2\\theta)}{g}
\\]

<div class="env-block theorem"><div class="env-title">Range Equation</div><div class="env-body">
\\[R = \\frac{v_0^2 \\sin(2\\theta)}{g}\\]
<p>For a given launch speed, the range depends only on \\(\\sin(2\\theta)\\). Since \\(\\sin(2\\theta)\\) is maximized when \\(2\\theta = 90^\\circ\\), i.e., \\(\\theta = 45^\\circ\\), the maximum range is:</p>
\\[R_{\\max} = \\frac{v_0^2}{g}\\]
</div></div>

<h3>Complementary Angle Property</h3>
<p>Since \\(\\sin(2\\theta) = \\sin(180^\\circ - 2\\theta)\\), two complementary angles \\(\\theta\\) and \\(90^\\circ - \\theta\\) give the <strong>same range</strong> (but different maximum heights and flight times).</p>

<div class="env-block example"><div class="env-title">Example: Comparing 30 and 60 Degrees</div><div class="env-body">
<p>A ball is kicked at 20 m/s. Compare launches at 30 and 60 degrees. (\\(g = 10\\,\\text{m/s}^2\\))</p>
<table style="width:100%;border-collapse:collapse;margin:0.5rem 0;">
<thead>
<tr style="background:#1a1a40;">
<th style="padding:6px;border:1px solid #30363d;color:#58a6ff;">Quantity</th>
<th style="padding:6px;border:1px solid #30363d;color:#3fb9a0;">30 degrees</th>
<th style="padding:6px;border:1px solid #30363d;color:#f0883e;">60 degrees</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:6px;border:1px solid #30363d;">Range</td><td style="padding:6px;border:1px solid #30363d;">\\(\\frac{400\\sin 60^\\circ}{10} = 34.6\\) m</td><td style="padding:6px;border:1px solid #30363d;">\\(\\frac{400\\sin 120^\\circ}{10} = 34.6\\) m</td></tr>
<tr><td style="padding:6px;border:1px solid #30363d;">Max Height</td><td style="padding:6px;border:1px solid #30363d;">\\(\\frac{400 \\times 0.25}{20} = 5.0\\) m</td><td style="padding:6px;border:1px solid #30363d;">\\(\\frac{400 \\times 0.75}{20} = 15.0\\) m</td></tr>
<tr><td style="padding:6px;border:1px solid #30363d;">Flight Time</td><td style="padding:6px;border:1px solid #30363d;">\\(\\frac{2 \\times 20 \\times 0.5}{10} = 2.0\\) s</td><td style="padding:6px;border:1px solid #30363d;">\\(\\frac{2 \\times 20 \\times 0.866}{10} = 3.46\\) s</td></tr>
</tbody>
</table>
<p>Same range, but the 60-degree launch is three times higher and takes 73% longer!</p>
</div></div>

<div class="viz-placeholder" data-viz="viz-range-angle"></div>
`,
      visualizations: [
        {
          id: 'viz-range-angle',
          title: 'Range vs. Launch Angle Optimizer',
          description: 'Drag the slider to see how the range changes with launch angle. The red dot marks the current angle on the R vs. theta curve. Notice the maximum at 45 degrees and the symmetry of complementary angles.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 600, height: 420, scale: 1,
              originX: 0, originY: 0
            });
            let v0 = 25;
            let theta = 45;
            const g = 9.8;

            VizEngine.createSlider(controls, 'v\u2080 (m/s)', 10, 40, v0, 1, val => { v0 = val; draw(); });
            VizEngine.createSlider(controls, '\u03B8 (deg)', 1, 89, theta, 1, val => { theta = val; draw(); });

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              const rad = theta * Math.PI / 180;

              // === Left panel: trajectory ===
              const lw = 300, lh = 420;
              const maxR = v0 * v0 / g;
              const maxH = v0 * v0 / (2 * g);
              const pScale = Math.min((lw - 60) / maxR, (lh - 80) / maxH);
              const pOx = 30, pOy = lh - 40;

              // ground
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(pOx, pOy); ctx.lineTo(lw, pOy); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(pOx, pOy); ctx.lineTo(pOx, 20); ctx.stroke();

              // trajectory for current angle
              const R = v0 * v0 * Math.sin(2 * rad) / g;
              const H = v0 * v0 * Math.sin(rad) * Math.sin(rad) / (2 * g);
              const T = 2 * v0 * Math.sin(rad) / g;
              const vx = v0 * Math.cos(rad);
              const vy = v0 * Math.sin(rad);

              ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
              ctx.beginPath();
              for (let i = 0; i <= 200; i++) {
                const t = (i / 200) * T;
                const x = vx * t;
                const y = vy * t - 0.5 * g * t * t;
                const sx = pOx + x * pScale;
                const sy = pOy - y * pScale;
                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
              }
              ctx.stroke();

              // complementary angle trajectory
              const compRad = (90 - theta) * Math.PI / 180;
              const compT = 2 * v0 * Math.sin(compRad) / g;
              const compVx = v0 * Math.cos(compRad);
              const compVy = v0 * Math.sin(compRad);
              ctx.strokeStyle = viz.colors.purple + '88'; ctx.lineWidth = 1.5;
              ctx.setLineDash([5, 3]);
              ctx.beginPath();
              for (let i = 0; i <= 200; i++) {
                const t = (i / 200) * compT;
                const x = compVx * t;
                const y = compVy * t - 0.5 * g * t * t;
                const sx = pOx + x * pScale;
                const sy = pOy - y * pScale;
                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
              }
              ctx.stroke();
              ctx.setLineDash([]);

              // max height dashed line
              ctx.strokeStyle = viz.colors.teal + '55'; ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(pOx, pOy - H * pScale);
              ctx.lineTo(pOx + R / 2 * pScale, pOy - H * pScale);
              ctx.stroke();
              ctx.setLineDash([]);

              // labels
              viz.screenText('R = ' + R.toFixed(1) + ' m', pOx + R * pScale / 2, pOy + 15, viz.colors.blue, 11);
              viz.screenText('H = ' + H.toFixed(1) + ' m', pOx - 2, pOy - H * pScale - 8, viz.colors.teal, 11, 'left');

              // launch point
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath(); ctx.arc(pOx, pOy, 4, 0, Math.PI * 2); ctx.fill();
              viz.screenText(theta + '\u00B0 (solid)', 20, 15, viz.colors.blue, 11, 'left');
              viz.screenText((90 - theta) + '\u00B0 (dashed)', 20, 30, viz.colors.purple, 11, 'left');

              // === Right panel: R vs theta curve ===
              const rx = 340, ry = 40, rw = 240, rh = 300;
              // axes
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(rx, ry + rh); ctx.lineTo(rx + rw, ry + rh); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(rx, ry + rh); ctx.lineTo(rx, ry); ctx.stroke();

              // curve
              ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
              ctx.beginPath();
              for (let d = 0; d <= 90; d++) {
                const a = d * Math.PI / 180;
                const r = v0 * v0 * Math.sin(2 * a) / g;
                const px = rx + (d / 90) * rw;
                const py = ry + rh - (r / maxR) * rh;
                d === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
              }
              ctx.stroke();

              // current angle marker
              const curR = R;
              const dotX = rx + (theta / 90) * rw;
              const dotY = ry + rh - (curR / maxR) * rh;
              ctx.fillStyle = viz.colors.red;
              ctx.beginPath(); ctx.arc(dotX, dotY, 6, 0, Math.PI * 2); ctx.fill();

              // 45-degree line
              ctx.strokeStyle = viz.colors.yellow + '44'; ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              const x45 = rx + (45 / 90) * rw;
              ctx.beginPath(); ctx.moveTo(x45, ry + rh); ctx.lineTo(x45, ry); ctx.stroke();
              ctx.setLineDash([]);

              // axis labels
              ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'top';
              for (let d = 0; d <= 90; d += 15) {
                ctx.fillText(d + '\u00B0', rx + (d / 90) * rw, ry + rh + 4);
              }
              ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
              for (let f = 0; f <= 1; f += 0.25) {
                const py = ry + rh - f * rh;
                ctx.fillText((f * maxR).toFixed(0), rx - 4, py);
              }
              viz.screenText('Angle \u03B8', rx + rw / 2, ry + rh + 20, viz.colors.white, 12);
              viz.screenText('Range R (m)', rx - 12, ry + rh / 2, viz.colors.white, 11, 'center', 'middle');
              viz.screenText('45\u00B0', x45, ry - 5, viz.colors.yellow, 10);
              viz.screenText('R vs \u03B8', rx + rw / 2, ry - 15, viz.colors.orange, 13);
            }
            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'Derive the maximum height formula \\(H = v_0^2 \\sin^2\\theta / (2g)\\) starting from the velocity equation.',
          hint: 'Set \\(v_y = 0\\) to find the time to reach the peak, then substitute into the position equation.',
          solution: 'At the peak, \\(v_y = v_0\\sin\\theta - gt_{\\text{peak}} = 0\\), so \\(t_{\\text{peak}} = v_0\\sin\\theta / g\\). Substituting: \\(H = v_0\\sin\\theta \\cdot \\frac{v_0\\sin\\theta}{g} - \\frac{1}{2}g\\left(\\frac{v_0\\sin\\theta}{g}\\right)^2 = \\frac{v_0^2\\sin^2\\theta}{g} - \\frac{v_0^2\\sin^2\\theta}{2g} = \\frac{v_0^2\\sin^2\\theta}{2g}\\).'
        },
        {
          question: 'A football is kicked at 28 m/s at 45 degrees. What is the maximum range? (\\(g = 9.8\\,\\text{m/s}^2\\))',
          hint: 'At 45 degrees, \\(\\sin(2\\theta) = \\sin 90^\\circ = 1\\).',
          solution: '\\(R = v_0^2 \\sin(90^\\circ) / g = 28^2 / 9.8 = 784 / 9.8 = 80.0\\) m.'
        },
        {
          question: 'A projectile is launched at 40 m/s and must reach a target 120 m away on level ground. Find the two possible launch angles. (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Use \\(R = v_0^2\\sin(2\\theta)/g\\) and solve for \\(\\sin(2\\theta)\\).',
          solution: '\\(120 = 1600\\sin(2\\theta)/10\\), so \\(\\sin(2\\theta) = 0.75\\). Then \\(2\\theta = 48.6^\\circ\\) or \\(131.4^\\circ\\), giving \\(\\theta \\approx 24.3^\\circ\\) or \\(\\theta \\approx 65.7^\\circ\\). Note these are complementary (sum to 90 degrees).'
        },
        {
          question: 'For a given launch speed, which launch angle gives the greatest maximum height? What is that height?',
          hint: 'Look at the formula \\(H = v_0^2\\sin^2\\theta/(2g)\\). When is \\(\\sin^2\\theta\\) largest?',
          solution: '\\(\\sin^2\\theta\\) is maximized when \\(\\theta = 90^\\circ\\) (straight up). The maximum height is \\(H_{\\max} = v_0^2/(2g)\\). Of course, a vertical launch has zero range.'
        },
        {
          question: 'A ball launched at 20 m/s at some angle \\(\\theta\\) achieves a range of 30 m. Find \\(\\theta\\). (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Use \\(R = v_0^2\\sin(2\\theta)/g\\) and solve for \\(2\\theta\\).',
          solution: '\\(30 = 400\\sin(2\\theta)/10\\), so \\(\\sin(2\\theta) = 0.75\\), giving \\(2\\theta \\approx 48.6^\\circ\\) or \\(131.4^\\circ\\). Therefore \\(\\theta \\approx 24.3^\\circ\\) or \\(65.7^\\circ\\).'
        }
      ]
    },

    // ─── SECTION 4 ────────────────────────────────────────────────────────────
    {
      id: 'ch02-sec04',
      title: '4. Projectile Motion Analysis',
      content: `
<h2>Projectile Motion Analysis</h2>
<p class="section-roadmap"><em>In this section, you will learn systematic techniques for solving projectile problems: decomposing velocity, using energy methods, and analyzing the velocity vector at any point along the trajectory.</em></p>

<h3>General Problem-Solving Strategy</h3>
<div class="env-block intuition"><div class="env-title">Five Steps for Projectile Problems</div><div class="env-body">
<ol>
<li><strong>Set up coordinates:</strong> Choose origin (usually launch point), define \\(+x\\) and \\(+y\\) directions.</li>
<li><strong>Decompose:</strong> Find \\(v_{0x} = v_0\\cos\\theta\\) and \\(v_{0y} = v_0\\sin\\theta\\).</li>
<li><strong>Write equations:</strong> Apply kinematic equations separately to \\(x\\) and \\(y\\).</li>
<li><strong>Identify the constraint:</strong> What connects the two components? (e.g., same time \\(t\\), landing condition \\(y = 0\\), hitting a target at known \\((x,y)\\)).</li>
<li><strong>Solve:</strong> Use the constraint to find the unknowns.</li>
</ol>
</div></div>

<h3>Velocity Analysis Along the Trajectory</h3>
<p>At any time \\(t\\), the velocity components are:</p>
\\[
v_x = v_0\\cos\\theta, \\qquad v_y = v_0\\sin\\theta - gt
\\]
<p>The speed is \\(v = \\sqrt{v_x^2 + v_y^2}\\), and the direction angle \\(\\phi\\) from the horizontal satisfies \\(\\tan\\phi = v_y/v_x\\).</p>

<div class="env-block remark"><div class="env-title">Energy Shortcut for Speed</div><div class="env-body">
<p>Instead of computing \\(v_x\\) and \\(v_y\\) separately, you can use energy conservation to find the speed at height \\(y\\):</p>
\\[v = \\sqrt{v_0^2 - 2gy}\\]
<p>This gives the magnitude directly without needing time or angle decomposition, which is very useful when only the speed (not direction) is needed.</p>
</div></div>

<h3>Projectiles Launched from a Height</h3>
<p>When a projectile is launched from height \\(h\\) above the landing level, the flight time is found by solving:</p>
\\[
-h = v_0 t\\sin\\theta - \\tfrac{1}{2}gt^2
\\]
<p>This is a quadratic in \\(t\\). Taking the positive root gives the total time of flight, which is longer than the level-ground case.</p>

<div class="env-block example"><div class="env-title">Example: Launching from a Cliff</div><div class="env-body">
<p>A ball is thrown from the top of a 30 m cliff at 20 m/s at 30 degrees above horizontal. Find the total time of flight and horizontal range. (\\(g = 10\\,\\text{m/s}^2\\))</p>
<p><strong>Solution:</strong> Set origin at launch point, \\(+y\\) upward. Landing condition: \\(y = -30\\) m.</p>
<p>\\(v_{0y} = 20\\sin 30^\\circ = 10\\) m/s, \\(v_{0x} = 20\\cos 30^\\circ = 17.3\\) m/s.</p>
<p>\\(-30 = 10t - 5t^2 \\Rightarrow 5t^2 - 10t - 30 = 0 \\Rightarrow t^2 - 2t - 6 = 0\\)</p>
<p>\\(t = \\frac{2 + \\sqrt{4 + 24}}{2} = \\frac{2 + \\sqrt{28}}{2} \\approx \\frac{2 + 5.29}{2} \\approx 3.65\\) s</p>
<p>Range: \\(x = 17.3 \\times 3.65 \\approx 63.1\\) m.</p>
</div></div>

<div class="viz-placeholder" data-viz="viz-velocity-analysis"></div>
`,
      visualizations: [
        {
          id: 'viz-velocity-analysis',
          title: 'Velocity Vector Along the Trajectory',
          description: 'Drag the time slider to see the velocity vector (red), its horizontal component (blue), and vertical component (green) at any point along the trajectory.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 600, height: 400, scale: 10,
              originX: 40, originY: 350
            });
            const v0 = 25, thetaDeg = 55;
            const g = 9.8;
            const rad = thetaDeg * Math.PI / 180;
            const vx0 = v0 * Math.cos(rad);
            const vy0 = v0 * Math.sin(rad);
            const T = 2 * vy0 / g;
            let tCur = T / 4;

            VizEngine.createSlider(controls, 'Time t (s)', 0, T.toFixed(1), tCur.toFixed(1), 0.05, val => {
              tCur = val; draw();
            });

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              const sc = 10, ox = 40, oy = 350;

              // ground
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(600, oy); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, 10); ctx.stroke();

              // trajectory
              ctx.strokeStyle = viz.colors.text + '66'; ctx.lineWidth = 1.5;
              ctx.beginPath();
              for (let i = 0; i <= 200; i++) {
                const t = (i / 200) * T;
                const x = vx0 * t;
                const y = vy0 * t - 0.5 * g * t * t;
                const sx = ox + x * sc;
                const sy = oy - y * sc;
                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
              }
              ctx.stroke();

              // current position
              const xCur = vx0 * tCur;
              const yCur = vy0 * tCur - 0.5 * g * tCur * tCur;
              const sx = ox + xCur * sc;
              const sy = oy - yCur * sc;

              // velocity components
              const vxCur = vx0;
              const vyCur = vy0 - g * tCur;
              const vMag = Math.sqrt(vxCur * vxCur + vyCur * vyCur);
              const vAngle = Math.atan2(vyCur, vxCur) * 180 / Math.PI;
              const vScale = 2.5;

              // horizontal component (blue)
              const hEndX = sx + vxCur * vScale;
              ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(hEndX, sy); ctx.stroke();
              // arrowhead
              ctx.fillStyle = viz.colors.blue; ctx.beginPath();
              ctx.moveTo(hEndX, sy);
              ctx.lineTo(hEndX - 8, sy - 4); ctx.lineTo(hEndX - 8, sy + 4);
              ctx.closePath(); ctx.fill();

              // vertical component (green)
              const vEndY = sy - vyCur * vScale;
              ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(hEndX, sy); ctx.lineTo(hEndX, vEndY); ctx.stroke();
              // arrowhead
              const vDir = vyCur >= 0 ? -1 : 1;
              ctx.fillStyle = viz.colors.green; ctx.beginPath();
              ctx.moveTo(hEndX, vEndY);
              ctx.lineTo(hEndX - 4, vEndY + vDir * 8); ctx.lineTo(hEndX + 4, vEndY + vDir * 8);
              ctx.closePath(); ctx.fill();

              // resultant velocity (red)
              const rEndX = sx + vxCur * vScale;
              const rEndY = sy - vyCur * vScale;
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2.5;
              ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(rEndX, rEndY); ctx.stroke();
              // arrowhead
              const rAngle = Math.atan2(-(vyCur * vScale), vxCur * vScale);
              ctx.fillStyle = viz.colors.red; ctx.beginPath();
              ctx.moveTo(rEndX, rEndY);
              ctx.lineTo(rEndX - 10 * Math.cos(rAngle - Math.PI / 6), rEndY - 10 * Math.sin(rAngle - Math.PI / 6));
              ctx.lineTo(rEndX - 10 * Math.cos(rAngle + Math.PI / 6), rEndY - 10 * Math.sin(rAngle + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // point
              ctx.fillStyle = viz.colors.orange;
              ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();

              // dashed line to ground
              ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, oy); ctx.stroke();
              ctx.setLineDash([]);

              // info
              viz.screenText('v = ' + vMag.toFixed(1) + ' m/s', 420, 20, viz.colors.red, 13);
              viz.screenText('vx = ' + vxCur.toFixed(1) + ' m/s', 420, 38, viz.colors.blue, 12);
              viz.screenText('vy = ' + vyCur.toFixed(1) + ' m/s', 420, 54, viz.colors.green, 12);
              viz.screenText('angle = ' + vAngle.toFixed(1) + '\u00B0', 420, 70, viz.colors.yellow, 12);
              viz.screenText('t = ' + tCur.toFixed(2) + ' s', 420, 88, viz.colors.text, 12);
              viz.screenText('x = ' + xCur.toFixed(1) + ' m, y = ' + yCur.toFixed(1) + ' m', 420, 104, viz.colors.text, 11);

              // legend
              viz.screenText('v (resultant)', 120, 15, viz.colors.red, 11, 'left');
              viz.screenText('vx (horizontal)', 120, 30, viz.colors.blue, 11, 'left');
              viz.screenText('vy (vertical)', 120, 45, viz.colors.green, 11, 'left');
            }
            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A cannonball is fired at 50 m/s at 37 degrees (\\(\\sin 37^\\circ \\approx 0.6\\), \\(\\cos 37^\\circ \\approx 0.8\\)). Using energy conservation, find its speed when it is at a height of 20 m. (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Use \\(v = \\sqrt{v_0^2 - 2gy}\\).',
          solution: '\\(v = \\sqrt{50^2 - 2(10)(20)} = \\sqrt{2500 - 400} = \\sqrt{2100} \\approx 45.8\\) m/s.'
        },
        {
          question: 'A projectile is launched at 40 m/s at 53 degrees from the top of a 60 m building. Find the time it takes to reach the ground. (\\(g = 10\\,\\text{m/s}^2\\), \\(\\sin 53^\\circ = 0.8\\), \\(\\cos 53^\\circ = 0.6\\))',
          hint: 'Set \\(y = -60\\) m and solve the quadratic \\(-60 = 32t - 5t^2\\).',
          solution: '\\(v_{0y} = 40 \\times 0.8 = 32\\) m/s. Setting \\(y = -60\\): \\(-60 = 32t - 5t^2 \\Rightarrow 5t^2 - 32t - 60 = 0\\). Using the quadratic formula: \\(t = \\frac{32 + \\sqrt{1024 + 1200}}{10} = \\frac{32 + \\sqrt{2224}}{10} = \\frac{32 + 47.16}{10} \\approx 7.92\\) s.'
        },
        {
          question: 'For the projectile in the previous problem, what is the horizontal distance from the building when it lands?',
          hint: '\\(x = v_{0x} \\times t\\)',
          solution: '\\(v_{0x} = 40 \\times 0.6 = 24\\) m/s. \\(x = 24 \\times 7.92 \\approx 190\\) m.'
        },
        {
          question: 'A ball is thrown at 20 m/s at angle \\(\\theta\\) from the ground. At the peak of its trajectory, its speed is 16 m/s. Find \\(\\theta\\). (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'At the peak, the speed equals the horizontal component \\(v_0\\cos\\theta\\).',
          solution: 'At the peak, \\(v_y = 0\\), so \\(v = v_x = v_0\\cos\\theta\\). Therefore \\(16 = 20\\cos\\theta\\), giving \\(\\cos\\theta = 0.8\\), so \\(\\theta \\approx 36.9^\\circ\\) (approximately 37 degrees).'
        },
        {
          question: 'A projectile lands at the same height it was launched. At the moment it lands, the velocity makes an angle of 60 degrees below the horizontal. What was the launch angle?',
          hint: 'Use the symmetry of projectile motion for same-height launches.',
          solution: 'By symmetry, the landing angle below horizontal equals the launch angle above horizontal. Therefore the launch angle was 60 degrees above the horizontal.'
        }
      ]
    },

    // ─── SECTION 5 ────────────────────────────────────────────────────────────
    {
      id: 'ch02-sec05',
      title: '5. Applications',
      content: `
<h2>Applications of Projectile Motion</h2>
<p class="section-roadmap"><em>In this section, you will see how projectile motion principles apply to sports, engineering, and everyday life. You will also learn about the effects of air resistance on real trajectories.</em></p>

<h3>Sports Applications</h3>
<div class="env-block example"><div class="env-title">Basketball Free Throw</div><div class="env-body">
<p>A basketball player shoots from 4.2 m horizontally from the basket. The ball is released at a height of 2.0 m, and the basket is at 3.05 m. The ball is released at 7.0 m/s. At what angle should the ball be released?</p>
<p>This requires solving the trajectory equation \\(y = x\\tan\\theta - \\frac{gx^2}{2v_0^2\\cos^2\\theta}\\) with \\(x = 4.2\\) m and \\(y = 3.05 - 2.0 = 1.05\\) m. Such problems are typically solved numerically, and there are usually two solutions: a "flat" shot and a high-arc shot.</p>
</div></div>

<h3>The Monkey and Hunter Problem</h3>
<div class="env-block intuition"><div class="env-title">A Classic Thought Experiment</div><div class="env-body">
<p>A hunter aims directly at a monkey hanging from a tree branch. At the instant the gun fires, the monkey lets go and begins to fall. Should the hunter aim above, below, or directly at the monkey?</p>
<p>Surprisingly, the answer is to aim <strong>directly at the monkey</strong>. Both the bullet and the monkey experience the same gravitational acceleration downward. The bullet "falls" the same amount below its straight-line path as the monkey falls below the branch. So the bullet and monkey meet!</p>
</div></div>

<h3>Air Resistance Effects</h3>
<p>In real life, air resistance significantly modifies projectile trajectories:</p>
<ul>
<li>The range is <strong>reduced</strong> compared to the vacuum prediction.</li>
<li>The trajectory is <strong>asymmetric</strong>: the descending branch is steeper than the ascending branch.</li>
<li>The maximum height is <strong>lower</strong> and occurs <strong>before</strong> the midpoint of the range.</li>
<li>The optimal angle for maximum range is <strong>less than 45 degrees</strong> (typically 30-40 degrees for sports balls).</li>
<li>The landing speed is <strong>less</strong> than the launch speed.</li>
</ul>

<div class="env-block warning"><div class="env-title">When Can We Ignore Air Resistance?</div><div class="env-body"><p>Air resistance can be neglected when: (1) the object is dense and compact (e.g., a lead ball), (2) the speed is relatively low, and (3) high precision is not required. For exam problems, unless stated otherwise, neglect air resistance.</p></div></div>

<h3>Projectile Motion in Engineering</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
<thead>
<tr style="background:#1a1a40;">
<th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Application</th>
<th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Key Physics</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #30363d;">Water fountain design</td><td style="padding:8px;border:1px solid #30363d;">Parabolic arcs from angled nozzles; multiple jets at different angles</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Ballistics</td><td style="padding:8px;border:1px solid #30363d;">Range equation with corrections for air resistance, wind, and rotation</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Irrigation sprinklers</td><td style="padding:8px;border:1px solid #30363d;">Rotating nozzle angle determines coverage area</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Volcanic eruptions</td><td style="padding:8px;border:1px solid #30363d;">Ejected material follows parabolic paths (at high speeds, curvature of Earth matters)</td></tr>
</tbody>
</table>

<div class="viz-placeholder" data-viz="viz-monkey-hunter"></div>

<div class="viz-placeholder" data-viz="viz-air-resistance"></div>

<div class="env-block intuition"><div class="env-title">Chapter Summary</div><div class="env-body">
<p>Projectile motion is two-dimensional free fall. The horizontal and vertical components are independent: constant velocity horizontally, uniformly accelerated motion vertically. The trajectory is a parabola. The range equation \\(R = v_0^2\\sin(2\\theta)/g\\) shows that 45 degrees maximizes range, and complementary angles give equal ranges. These principles underlie countless real-world phenomena, from sports to engineering to nature.</p>
</div></div>
`,
      visualizations: [
        {
          id: 'viz-monkey-hunter',
          title: 'The Monkey and Hunter Problem',
          description: 'Press "Fire!" to see the bullet and the monkey both start moving. The bullet is aimed directly at the monkey. Watch how gravity affects both equally!',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 380, scale: 1,
              originX: 0, originY: 0
            });
            let running = false;
            let t = 0;
            const g = 9.8;
            // positions in pixels
            const gunX = 50, gunY = 300;
            const monkeyX = 480, monkeyStartY = 80;
            const dx = monkeyX - gunX, dy = monkeyStartY - gunY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const bulletSpeed = 300; // pixels per second
            const ux = dx / dist * bulletSpeed;
            const uy = dy / dist * bulletSpeed;
            const gPx = 200; // g in pixel units

            VizEngine.createButton(controls, 'Fire!', () => {
              t = 0; running = true;
            });
            VizEngine.createButton(controls, 'Reset', () => {
              t = 0; running = false; drawFrame();
            });

            function drawFrame() {
              viz.clear();
              const ctx = viz.ctx;

              // tree
              ctx.fillStyle = '#2d5a27';
              ctx.fillRect(monkeyX - 5, 0, 10, 380);
              ctx.fillStyle = '#3fb950';
              ctx.beginPath(); ctx.arc(monkeyX, 30, 35, 0, Math.PI * 2); ctx.fill();

              // branch
              ctx.strokeStyle = '#6b4c2a'; ctx.lineWidth = 4;
              ctx.beginPath(); ctx.moveTo(monkeyX, monkeyStartY);
              ctx.lineTo(monkeyX - 60, monkeyStartY); ctx.stroke();

              // aim line (dashed)
              ctx.strokeStyle = viz.colors.yellow + '44'; ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath(); ctx.moveTo(gunX, gunY);
              ctx.lineTo(monkeyX, monkeyStartY); ctx.stroke();
              ctx.setLineDash([]);

              // gun
              ctx.fillStyle = viz.colors.text;
              ctx.fillRect(gunX - 8, gunY - 4, 20, 8);

              // monkey
              const monkeyY = monkeyStartY + 0.5 * gPx * t * t;
              const monkeyFinalY = Math.min(monkeyY, 360);
              ctx.fillStyle = '#8b6914';
              ctx.beginPath(); ctx.arc(monkeyX - 30, monkeyFinalY, 15, 0, Math.PI * 2); ctx.fill();
              // eyes
              ctx.fillStyle = viz.colors.white;
              ctx.beginPath(); ctx.arc(monkeyX - 34, monkeyFinalY - 3, 3, 0, Math.PI * 2); ctx.fill();
              ctx.beginPath(); ctx.arc(monkeyX - 26, monkeyFinalY - 3, 3, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = '#000';
              ctx.beginPath(); ctx.arc(monkeyX - 34, monkeyFinalY - 3, 1.5, 0, Math.PI * 2); ctx.fill();
              ctx.beginPath(); ctx.arc(monkeyX - 26, monkeyFinalY - 3, 1.5, 0, Math.PI * 2); ctx.fill();

              // bullet
              if (running || t > 0) {
                const bx = gunX + ux * t;
                const by = gunY + uy * t + 0.5 * gPx * t * t;
                // bullet no-gravity path
                const bxNG = gunX + ux * t;
                const byNG = gunY + uy * t;
                // show straight-line position
                ctx.fillStyle = viz.colors.red + '44';
                ctx.beginPath(); ctx.arc(bxNG, byNG, 4, 0, Math.PI * 2); ctx.fill();
                // actual bullet
                ctx.fillStyle = viz.colors.red;
                ctx.beginPath(); ctx.arc(bx, by, 5, 0, Math.PI * 2); ctx.fill();

                // check collision
                const cdx = bx - (monkeyX - 30);
                const cdy = by - monkeyFinalY;
                if (Math.sqrt(cdx * cdx + cdy * cdy) < 20) {
                  running = false;
                  viz.screenText('Hit! Both fell the same distance due to gravity.', 280, 360, viz.colors.green, 13);
                }
                if (bx > 560 || by > 380) {
                  running = false;
                }
              }

              // labels
              viz.screenText('Bullet (with gravity)', 200, 15, viz.colors.red, 11);
              viz.screenText('Aim line (no gravity)', 200, 30, viz.colors.yellow, 11);

              if (!running && t === 0) {
                viz.screenText('Press "Fire!" to launch', 280, 360, viz.colors.text, 12);
              }
            }

            drawFrame();
            viz.animate(function() {
              if (running) t += 0.016;
              drawFrame();
            });
            return viz;
          }
        },
        {
          id: 'viz-air-resistance',
          title: 'Effect of Air Resistance on Trajectory',
          description: 'Compare the ideal parabolic trajectory (blue, dashed) with a trajectory that includes air resistance (orange, solid). Notice the asymmetry and reduced range.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 360, scale: 1,
              originX: 0, originY: 0
            });
            let v0 = 30, thetaDeg = 45, drag = 0.04;
            const g = 9.8;

            VizEngine.createSlider(controls, 'v\u2080 (m/s)', 15, 50, v0, 1, val => { v0 = val; draw(); });
            VizEngine.createSlider(controls, '\u03B8 (deg)', 10, 80, thetaDeg, 1, val => { thetaDeg = val; draw(); });
            VizEngine.createSlider(controls, 'Drag coeff', 0, 0.15, drag, 0.005, val => { drag = val; draw(); });

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              const rad = thetaDeg * Math.PI / 180;
              const ox = 50, oy = 310;

              // compute ideal trajectory
              const idealVx = v0 * Math.cos(rad);
              const idealVy = v0 * Math.sin(rad);
              const T = 2 * idealVy / g;
              const maxR = idealVx * T;
              const maxH = idealVy * idealVy / (2 * g);
              const pScale = Math.min((500) / Math.max(maxR, 1), (260) / Math.max(maxH, 1));

              // ground
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(560, oy); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, 20); ctx.stroke();

              // ideal trajectory (dashed blue)
              ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
              ctx.setLineDash([6, 4]);
              ctx.beginPath();
              for (let i = 0; i <= 200; i++) {
                const t = (i / 200) * T;
                const x = idealVx * t;
                const y = idealVy * t - 0.5 * g * t * t;
                if (y < 0 && i > 0) break;
                const sx = ox + x * pScale;
                const sy = oy - y * pScale;
                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
              }
              ctx.stroke();
              ctx.setLineDash([]);

              // drag trajectory (numerical integration, Euler method)
              let dx = v0 * Math.cos(rad);
              let dy = v0 * Math.sin(rad);
              let px = 0, py = 0;
              const dt = 0.01;
              ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(ox, oy);
              let dragRange = 0;
              for (let step = 0; step < 5000; step++) {
                const speed = Math.sqrt(dx * dx + dy * dy);
                const ax = -drag * speed * dx;
                const ay = -g - drag * speed * dy;
                dx += ax * dt;
                dy += ay * dt;
                px += dx * dt;
                py += dy * dt;
                if (py < 0 && step > 10) { dragRange = px; break; }
                const sx = ox + px * pScale;
                const sy = oy - py * pScale;
                if (sx > 555) break;
                ctx.lineTo(sx, sy);
              }
              ctx.stroke();

              // launch point
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath(); ctx.arc(ox, oy, 4, 0, Math.PI * 2); ctx.fill();

              // legend
              viz.screenText('No air resistance (ideal)', 350, 15, viz.colors.blue, 12);
              viz.screenText('With air resistance', 350, 32, viz.colors.orange, 12);
              viz.screenText('Ideal range: ' + maxR.toFixed(1) + ' m', 350, 52, viz.colors.blue, 11);
              if (dragRange > 0) {
                viz.screenText('Drag range: ' + dragRange.toFixed(1) + ' m', 350, 67, viz.colors.orange, 11);
                const reduction = ((1 - dragRange / maxR) * 100).toFixed(0);
                viz.screenText('Reduction: ' + reduction + '%', 350, 82, viz.colors.red, 11);
              }
            }
            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'In the monkey-and-hunter problem, explain why the hunter should aim directly at the monkey, not above it.',
          hint: 'Consider what happens to both the bullet and the monkey due to gravity during the flight time.',
          solution: 'Both the bullet and the monkey experience the same gravitational acceleration g downward. During the bullet travel time t, gravity pulls both of them down by the same amount: (1/2)gt^2. The bullet drops (1/2)gt^2 below its aim line (which points at the monkey initial position), and the monkey drops (1/2)gt^2 from the branch. Since both deviate downward by the same amount from the "no gravity" scenario, they meet at the same point.'
        },
        {
          question: 'A projectile is launched at 45 degrees. With air resistance, would the optimal angle for maximum range be greater than, less than, or equal to 45 degrees? Explain.',
          hint: 'Air resistance reduces speed more at higher speeds. Which component has higher speed longer during the flight?',
          solution: 'With air resistance, the optimal angle is less than 45 degrees (typically 30-40 degrees). This is because air drag decelerates the projectile throughout the flight. A lower angle means the projectile spends less time in the air (less time for drag to act) and has a larger horizontal component. The trade-off shifts in favor of a flatter trajectory.'
        },
        {
          question: 'A water sprinkler shoots water at 12 m/s. What is the maximum area (circular) it can cover on a flat lawn? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'The maximum range of the water is \\(R_{\\max} = v_0^2/g\\). The area is \\(\\pi R^2\\).',
          solution: '\\(R_{\\max} = 12^2 / 10 = 14.4\\) m. The sprinkler covers a circle of radius 14.4 m, so the area is \\(\\pi (14.4)^2 \\approx 651\\) m\\(^2\\).'
        },
        {
          question: 'An athlete throws a javelin from a height of 1.8 m at 30 m/s at 42 degrees. Estimate the range by first computing the level-ground range, then explain qualitatively why the actual range is longer. (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Level-ground range: \\(R = v_0^2\\sin(2\\theta)/g\\). Launching from above ground adds extra time.',
          solution: 'Level-ground range: \\(R = 900\\sin(84^\\circ)/10 \\approx 900 \\times 0.9945 / 10 \\approx 89.5\\) m. The actual range is larger because the javelin is released 1.8 m above the landing level, giving it extra time in the air. The additional horizontal distance is approximately \\(v_{0x} \\cdot \\Delta t\\), where \\(\\Delta t\\) is the extra fall time from 1.8 m.'
        },
        {
          question: 'Two projectiles are launched simultaneously from the same point with the same speed \\(v_0\\): one at angle \\(\\theta\\) and the other at \\(90^\\circ - \\theta\\). Show that they land at the same point at the same horizontal distance.',
          hint: 'Use the range formula and the identity \\(\\sin(2\\theta) = \\sin(180^\\circ - 2\\theta)\\).',
          solution: 'Range of first projectile: \\(R_1 = v_0^2\\sin(2\\theta)/g\\). Range of second: \\(R_2 = v_0^2\\sin(2(90^\\circ - \\theta))/g = v_0^2\\sin(180^\\circ - 2\\theta)/g\\). Since \\(\\sin(180^\\circ - \\alpha) = \\sin\\alpha\\), we have \\(R_2 = v_0^2\\sin(2\\theta)/g = R_1\\). They land at the same horizontal distance.'
        }
      ]
    }
  ]
});
