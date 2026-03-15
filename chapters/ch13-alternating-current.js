window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch13',
  number: 13,
  title: 'Alternating Current',
  subtitle: 'Alternating Current and Power Distribution',
  sections: [

    // ==================== SECTION 1: AC Generation ====================
    {
      id: 'ch13-sec01',
      title: 'AC Generation',
      content: `
<div class="env-block intuition"><div class="env-title">From Rotation to Oscillation</div><div class="env-body"><p>In Chapter 12, you learned that a changing magnetic flux induces an EMF. One of the most important applications is the AC generator: a coil rotating in a magnetic field. Because the flux through the coil varies sinusoidally as it rotates, the induced EMF oscillates between positive and negative values, producing alternating current. This is how the vast majority of the world's electrical energy is generated.</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn how an AC generator works, derive the sinusoidal EMF equation, and understand frequency, period, and peak voltage.</em></p>

<h3>The AC Generator</h3>
<p>An AC generator consists of a coil (with \\(N\\) turns and area \\(A\\)) rotating at constant angular velocity \\(\\omega\\) in a uniform magnetic field \\(B\\). As the coil rotates, the angle \\(\\theta\\) between the field and the area normal changes as \\(\\theta = \\omega t\\).</p>
<p>The flux through the coil at time \\(t\\) is:</p>
\\[ \\Phi(t) = NBA\\cos(\\omega t) \\]
<p>By Faraday's Law:</p>
\\[ \\mathcal{E}(t) = -N\\frac{d\\Phi}{dt} = NBA\\omega\\sin(\\omega t) \\]

<div class="env-definition">
<strong>AC Voltage</strong><br>
The EMF produced by an AC generator is:
\\[ v(t) = V_0 \\sin(\\omega t) \\]
where \\(V_0 = NBA\\omega\\) is the <em>peak voltage</em> (also called amplitude). The angular frequency \\(\\omega\\) is related to the frequency \\(f\\) and period \\(T\\) by:
\\[ \\omega = 2\\pi f = \\frac{2\\pi}{T} \\]
Standard mains electricity uses \\(f = 50\\;\\text{Hz}\\) (in China and most of Europe) or \\(f = 60\\;\\text{Hz}\\) (in the Americas).
</div>

<h3>Key Parameters</h3>
<ul>
  <li><strong>Peak voltage \\(V_0\\):</strong> the maximum value of the EMF. For household supply in China, \\(V_0 = 311\\;\\text{V}\\).</li>
  <li><strong>Frequency \\(f\\):</strong> number of complete cycles per second (Hz). Standard: 50 Hz in China.</li>
  <li><strong>Period \\(T\\):</strong> time for one complete cycle. \\(T = 1/f = 0.02\\;\\text{s}\\) at 50 Hz.</li>
  <li><strong>Angular frequency \\(\\omega\\):</strong> \\(\\omega = 2\\pi f = 100\\pi \\approx 314\\;\\text{rad/s}\\) at 50 Hz.</li>
</ul>

<div class="env-example">
<strong>Example: Generator Output</strong><br>
A generator has a 200-turn coil with area \\(0.05\\;\\text{m}^2\\) rotating at 50 rev/s in a field of \\(B = 0.4\\;\\text{T}\\). Find the peak voltage.
\\[ \\omega = 2\\pi \\times 50 = 100\\pi\\;\\text{rad/s} \\]
\\[ V_0 = NBA\\omega = 200 \\times 0.4 \\times 0.05 \\times 100\\pi = 200 \\times 0.4 \\times 0.05 \\times 314.2 \\approx 1257\\;\\text{V} \\]
</div>

<h3>AC vs. DC</h3>
<p>Direct current (DC) flows in one direction only. Alternating current (AC) reverses direction periodically. The advantages of AC include:</p>
<ul>
  <li>Easy to generate (rotating coil in a magnetic field)</li>
  <li>Easy to transform to different voltages using transformers (essential for efficient power transmission)</li>
  <li>Motors and generators are simpler and more robust with AC</li>
</ul>

<div class="env-remark">
<strong>Remark:</strong> The AC generator is essentially Faraday's Law in action. By converting mechanical rotation into a sinusoidal EMF, it forms the backbone of the modern power grid.
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>The voltage from an AC generator oscillates. But what single number best represents its "effective" voltage for purposes like calculating power? The answer is the RMS value, which we explore next.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch13-viz-generator',
          title: 'AC Generator: Rotating Coil',
          description: 'Watch a coil rotate in a magnetic field and see the sinusoidal EMF generated in real time. Adjust the rotation speed and number of turns.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
            var omega = 3;
            var N = 100;
            var B = 0.5;
            var A = 0.04;
            var t = 0;

            VizEngine.createSlider(controls, '\u03C9 (rad/s)', 1, 10, 3, 0.5, function(v) { omega = v; });
            VizEngine.createSlider(controls, 'N turns', 10, 500, 100, 10, function(v) { N = v; });

            var history = [];

            function draw(ts) {
              t += 0.02;
              var angle = omega * t;
              var V0 = N * B * A * omega;
              var emf = V0 * Math.sin(angle);

              history.push({t: t, v: emf / V0});
              if (history.length > 200) history.shift();

              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;

              // Left half: rotating coil diagram
              var cx = 150, cy = 160;
              var coilW = 80, coilH = 60;
              var cosA = Math.cos(angle);

              // Magnetic field arrows (horizontal)
              ctx.strokeStyle = viz.colors.yellow + '44';
              ctx.lineWidth = 1;
              for (var fy = -3; fy <= 3; fy++) {
                var by = cy + fy * 22;
                ctx.beginPath();
                ctx.moveTo(cx - 100, by);
                ctx.lineTo(cx + 100, by);
                ctx.stroke();
                ctx.fillStyle = viz.colors.yellow + '44';
                ctx.beginPath();
                ctx.moveTo(cx + 100, by);
                ctx.lineTo(cx + 94, by - 3);
                ctx.lineTo(cx + 94, by + 3);
                ctx.closePath();
                ctx.fill();
              }

              // Rotating coil (projected as ellipse)
              var projW = coilW * Math.abs(cosA);
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.ellipse(cx, cy, Math.max(projW / 2, 2), coilH / 2, 0, 0, Math.PI * 2);
              ctx.stroke();

              // Normal vector
              var nLen = 50;
              var nx = cx + nLen * cosA;
              ctx.strokeStyle = viz.colors.green;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(nx, cy);
              ctx.stroke();
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath();
              ctx.moveTo(nx, cy);
              ctx.lineTo(nx - 6 * Math.sign(cosA || 1), cy - 4);
              ctx.lineTo(nx - 6 * Math.sign(cosA || 1), cy + 4);
              ctx.closePath();
              ctx.fill();

              // Rotation indicator
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(cx, cy, coilH / 2 + 15, 0, Math.PI * 1.5);
              ctx.stroke();
              ctx.fillStyle = viz.colors.text;
              ctx.beginPath();
              var aEndX = cx + (coilH / 2 + 15) * Math.cos(Math.PI * 1.5);
              var aEndY = cy + (coilH / 2 + 15) * Math.sin(Math.PI * 1.5);
              ctx.moveTo(aEndX, aEndY);
              ctx.lineTo(aEndX + 5, aEndY + 6);
              ctx.lineTo(aEndX - 5, aEndY + 6);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = viz.colors.yellow;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('B', cx + 110, cy - 8);

              // Right half: EMF waveform
              var graphX = 310, graphY = 40;
              var graphW = 360, graphH = 280;
              var midY = graphY + graphH / 2;

              // Graph box
              ctx.strokeStyle = viz.colors.grid;
              ctx.lineWidth = 1;
              ctx.strokeRect(graphX, graphY, graphW, graphH);

              // Zero line
              ctx.strokeStyle = viz.colors.axis;
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(graphX, midY);
              ctx.lineTo(graphX + graphW, midY);
              ctx.stroke();
              ctx.setLineDash([]);

              // Axes labels
              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText('+V\u2080', graphX - 5, graphY + 15);
              ctx.fillText('0', graphX - 5, midY + 4);
              ctx.fillText('-V\u2080', graphX - 5, graphY + graphH - 5);
              ctx.textAlign = 'center';
              ctx.fillText('time', graphX + graphW / 2, graphY + graphH + 15);

              // Plot waveform from history
              if (history.length > 1) {
                ctx.strokeStyle = viz.colors.blue;
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (var i = 0; i < history.length; i++) {
                  var px = graphX + (i / 200) * graphW;
                  var py = midY - history[i].v * (graphH / 2 - 10);
                  if (i === 0) ctx.moveTo(px, py);
                  else ctx.lineTo(px, py);
                }
                ctx.stroke();

                // Current point marker
                var lastIdx = history.length - 1;
                var lastPx = graphX + (lastIdx / 200) * graphW;
                var lastPy = midY - history[lastIdx].v * (graphH / 2 - 10);
                ctx.fillStyle = viz.colors.orange;
                ctx.beginPath();
                ctx.arc(lastPx, lastPy, 5, 0, Math.PI * 2);
                ctx.fill();
              }

              // Readout
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('V\u2080 = NBA\u03C9 = ' + V0.toFixed(1) + ' V', W / 2, H - 15);
              ctx.fillText('v(t) = ' + emf.toFixed(1) + ' V', W / 2, H - 38);
            }

            viz.animate(function(ts) { draw(ts); });
          }
        }
      ],
      exercises: [
        {
          id: 'ch13-ex01',
          type: 'numeric',
          question: 'An AC generator has a 100-turn coil with area 0.02 m\\(^2\\) rotating at 50 Hz in a 0.5 T field. What is the peak voltage? (Use \\(\\pi = 3.14\\))',
          hint: 'First find \\(\\omega = 2\\pi f\\), then \\(V_0 = NBA\\omega\\).',
          solution: '\\(\\omega = 2\\pi \\times 50 = 314\\;\\text{rad/s}\\). \\(V_0 = 100 \\times 0.5 \\times 0.02 \\times 314 = 314\\;\\text{V}\\).'
        },
        {
          id: 'ch13-ex02',
          type: 'mc',
          question: 'The output of an AC generator is sinusoidal because:',
          options: ['The coil has a rectangular shape', 'The cosine of the angle changes sinusoidally as the coil rotates at constant speed', 'The magnetic field oscillates', 'The resistance of the coil changes periodically'],
          answer: 1,
          hint: 'Think about how \\(\\theta = \\omega t\\) affects the flux \\(\\Phi = NBA\\cos(\\omega t)\\).',
          solution: 'As the coil rotates at constant angular velocity, the angle \\(\\theta = \\omega t\\) increases linearly. The flux \\(\\Phi = NBA\\cos(\\omega t)\\) varies sinusoidally, so the EMF \\(= NBA\\omega\\sin(\\omega t)\\) is also sinusoidal.'
        },
        {
          id: 'ch13-ex03',
          type: 'numeric',
          question: 'The standard mains frequency in China is 50 Hz. What is the period of one complete AC cycle in milliseconds?',
          hint: '\\(T = 1/f\\).',
          solution: '\\(T = 1/50 = 0.02\\;\\text{s} = 20\\;\\text{ms}\\).'
        },
        {
          id: 'ch13-ex04',
          type: 'mc',
          question: 'Doubling the rotation speed of a generator coil will:',
          options: ['Double the peak voltage only', 'Double both the peak voltage and the frequency', 'Double the frequency but not the peak voltage', 'Quadruple the peak voltage'],
          answer: 1,
          hint: 'Consider how \\(\\omega\\) appears in both \\(V_0 = NBA\\omega\\) and \\(f = \\omega / (2\\pi)\\).',
          solution: 'Since \\(V_0 = NBA\\omega\\) and \\(f = \\omega/(2\\pi)\\), doubling \\(\\omega\\) doubles both the peak voltage and the frequency.'
        },
        {
          id: 'ch13-ex05',
          type: 'numeric',
          question: 'An AC source has \\(v(t) = 170\\sin(120\\pi t)\\) volts. What is the frequency in Hz?',
          hint: 'Compare with the standard form \\(v(t) = V_0\\sin(\\omega t)\\) and use \\(f = \\omega / (2\\pi)\\).',
          solution: '\\(\\omega = 120\\pi\\;\\text{rad/s}\\). \\(f = \\omega / (2\\pi) = 120\\pi / (2\\pi) = 60\\;\\text{Hz}\\).'
        }
      ]
    },

    // ==================== SECTION 2: RMS Values ====================
    {
      id: 'ch13-sec02',
      title: 'RMS Values',
      content: `
<div class="env-block intuition"><div class="env-title">The "Effective" Value of AC</div><div class="env-body"><p>An AC voltage oscillates between positive and negative values. Its simple average over a full cycle is zero, which is not useful for describing its ability to deliver power. We need a measure that captures the effective power-delivering capacity of AC. This is the root-mean-square (RMS) value, and it is the number quoted when we say "220 V mains."</p></div></div>
<p class="section-roadmap"><em>In this section, you will derive RMS values for voltage and current, understand their relationship to peak values, and use them for power calculations.</em></p>

<div class="env-definition">
<strong>Root-Mean-Square (RMS) Value</strong><br>
For a sinusoidal quantity \\(v(t) = V_0\\sin(\\omega t)\\), the RMS value is defined as:
\\[ V_{\\text{rms}} = \\sqrt{\\overline{v^2}} = \\sqrt{\\frac{1}{T}\\int_0^T v^2\\,dt} \\]
For a sinusoidal waveform, the result is:
\\[ V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707\\,V_0 \\]
Similarly for current:
\\[ I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} \\]
</div>

<h3>Why RMS?</h3>
<p>The RMS value is defined so that AC delivers the <em>same average power</em> as a DC source of the same voltage. A 220 V (RMS) AC source delivers the same average power to a resistor as a 220 V DC source.</p>
<p>The average power dissipated in a resistance \\(R\\) by an AC current is:</p>
\\[ P_{\\text{avg}} = I_{\\text{rms}}^2 \\cdot R = \\frac{V_{\\text{rms}}^2}{R} = V_{\\text{rms}} \\cdot I_{\\text{rms}} \\]
<p>This looks identical to the DC power formulas, which is precisely the point.</p>

<h3>Deriving the Factor \\(1/\\sqrt{2}\\)</h3>
<p>For \\(v(t) = V_0\\sin(\\omega t)\\):</p>
\\[ v^2(t) = V_0^2\\sin^2(\\omega t) = \\frac{V_0^2}{2}(1 - \\cos(2\\omega t)) \\]
<p>Averaging over one period, the cosine term averages to zero:</p>
\\[ \\overline{v^2} = \\frac{V_0^2}{2} \\]
\\[ V_{\\text{rms}} = \\sqrt{\\frac{V_0^2}{2}} = \\frac{V_0}{\\sqrt{2}} \\]

<div class="env-example">
<strong>Example: Chinese Mains Supply</strong><br>
The standard mains voltage in China is 220 V (RMS). What is the peak voltage?
\\[ V_0 = \\sqrt{2} \\times V_{\\text{rms}} = 1.414 \\times 220 \\approx 311\\;\\text{V} \\]
So the voltage actually oscillates between \\(+311\\;\\text{V}\\) and \\(-311\\;\\text{V}\\).
</div>

<div class="env-example">
<strong>Example: Power Calculation</strong><br>
A heater with resistance \\(R = 48.4\\;\\Omega\\) is connected to 220 V (RMS) mains. Find the average power consumed.
\\[ P = \\frac{V_{\\text{rms}}^2}{R} = \\frac{220^2}{48.4} = \\frac{48400}{48.4} = 1000\\;\\text{W} = 1\\;\\text{kW} \\]
</div>

<div class="env-warning">
<strong>Warning:</strong> When using formulas like \\(P = V^2/R\\) or \\(P = IV\\) for AC circuits, always use RMS values (not peak values) unless you are specifically computing instantaneous power.
</div>

<div class="env-remark">
<strong>Remark:</strong> The factor \\(1/\\sqrt{2}\\) only applies to purely sinusoidal waveforms. Other waveforms (square, triangular, etc.) have different relationships between peak and RMS values.
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>RMS values let us treat AC circuits with the familiar DC power formulas. Next, we will see how transformers use electromagnetic induction to step voltages up or down, which is essential for efficient power transmission.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch13-viz-rms',
          title: 'AC Waveform with RMS Overlay',
          description: 'See a sinusoidal AC voltage with the RMS value shown as a horizontal line. The shaded area shows the squared waveform whose average gives the RMS value.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 400, scale: 1, originX: 80, originY: 200});
            var V0 = 311;
            var freq = 50;

            VizEngine.createSlider(controls, 'V\u2080 (V)', 50, 500, 311, 10, function(v) { V0 = v; draw(); });
            VizEngine.createSlider(controls, 'f (Hz)', 10, 100, 50, 5, function(v) { freq = v; draw(); });

            function draw() {
              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;
              var Vrms = V0 / Math.sqrt(2);

              var graphX = 80, graphY = 30;
              var graphW = 580, graphH = 320;
              var midY = graphY + graphH / 2;
              var scaleV = (graphH / 2 - 20) / V0;

              // Graph background
              ctx.fillStyle = viz.colors.bg;
              ctx.fillRect(graphX, graphY, graphW, graphH);
              ctx.strokeStyle = viz.colors.grid;
              ctx.lineWidth = 1;
              ctx.strokeRect(graphX, graphY, graphW, graphH);

              // Zero line
              ctx.strokeStyle = viz.colors.axis;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(graphX, midY);
              ctx.lineTo(graphX + graphW, midY);
              ctx.stroke();

              // Sinusoidal waveform
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              var periods = 2;
              var steps = 400;
              for (var i = 0; i <= steps; i++) {
                var frac = i / steps;
                var tVal = frac * periods / freq;
                var v = V0 * Math.sin(2 * Math.PI * freq * tVal);
                var px = graphX + frac * graphW;
                var py = midY - v * scaleV;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.stroke();

              // v^2 waveform (scaled and faded)
              ctx.strokeStyle = viz.colors.purple + '55';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              var scaleV2 = scaleV / V0;
              for (var i = 0; i <= steps; i++) {
                var frac = i / steps;
                var tVal = frac * periods / freq;
                var v = V0 * Math.sin(2 * Math.PI * freq * tVal);
                var v2 = v * v;
                var px = graphX + frac * graphW;
                var py = midY - v2 * scaleV2;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.stroke();

              // RMS line
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 2;
              ctx.setLineDash([8, 4]);
              var rmsY = midY - Vrms * scaleV;
              ctx.beginPath();
              ctx.moveTo(graphX, rmsY);
              ctx.lineTo(graphX + graphW, rmsY);
              ctx.stroke();
              // Negative RMS
              var rmsYn = midY + Vrms * scaleV;
              ctx.beginPath();
              ctx.moveTo(graphX, rmsYn);
              ctx.lineTo(graphX + graphW, rmsYn);
              ctx.stroke();
              ctx.setLineDash([]);

              // Mean of v^2 line
              var meanV2 = V0 * V0 / 2;
              var meanV2Y = midY - meanV2 * scaleV2;
              ctx.strokeStyle = viz.colors.green;
              ctx.lineWidth = 1.5;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(graphX, meanV2Y);
              ctx.lineTo(graphX + graphW, meanV2Y);
              ctx.stroke();
              ctx.setLineDash([]);

              // Peak lines
              ctx.strokeStyle = viz.colors.text + '44';
              ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              ctx.beginPath();
              ctx.moveTo(graphX, midY - V0 * scaleV);
              ctx.lineTo(graphX + graphW, midY - V0 * scaleV);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(graphX, midY + V0 * scaleV);
              ctx.lineTo(graphX + graphW, midY + V0 * scaleV);
              ctx.stroke();
              ctx.setLineDash([]);

              // Labels
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'right';

              ctx.fillStyle = viz.colors.text;
              ctx.fillText('+V\u2080 = ' + V0, graphX - 5, midY - V0 * scaleV + 4);
              ctx.fillText('-V\u2080', graphX - 5, midY + V0 * scaleV + 4);

              ctx.fillStyle = viz.colors.orange;
              ctx.fillText('V(rms) = ' + Vrms.toFixed(0), graphX - 5, rmsY + 4);

              ctx.fillStyle = viz.colors.blue;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('v(t)', graphX + graphW + 8, midY - V0 * scaleV * 0.7);

              ctx.fillStyle = viz.colors.purple;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText('v\u00B2(t)', graphX + graphW + 8, meanV2Y - 15);

              ctx.fillStyle = viz.colors.green;
              ctx.fillText('mean(v\u00B2)', graphX + graphW + 8, meanV2Y + 4);

              // Legend
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('V(rms) = V\u2080/\u221A2 = ' + Vrms.toFixed(1) + ' V', graphX + graphW / 2, H - 15);
            }
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ch13-ex06',
          type: 'numeric',
          question: 'The peak voltage of an AC source is 170 V. What is the RMS voltage?',
          hint: 'Use \\(V_{\\text{rms}} = V_0 / \\sqrt{2}\\).',
          solution: '\\(V_{\\text{rms}} = 170 / \\sqrt{2} = 170 / 1.414 \\approx 120\\;\\text{V}\\).'
        },
        {
          id: 'ch13-ex07',
          type: 'numeric',
          question: 'A light bulb rated at 100 W is connected to 220 V (RMS) mains. What is the RMS current through it?',
          hint: 'Use \\(P = V_{\\text{rms}} \\times I_{\\text{rms}}\\).',
          solution: '\\(I_{\\text{rms}} = P / V_{\\text{rms}} = 100 / 220 \\approx 0.455\\;\\text{A}\\).'
        },
        {
          id: 'ch13-ex08',
          type: 'mc',
          question: 'The simple average of \\(v(t) = V_0\\sin(\\omega t)\\) over one complete cycle is:',
          options: ['\\(V_0\\)', '\\(V_0/\\sqrt{2}\\)', 'Zero', '\\(2V_0/\\pi\\)'],
          answer: 2,
          hint: 'A sine function is positive for half the cycle and equally negative for the other half.',
          solution: 'Over one complete cycle, the sine function spends equal time above and below zero, so its average is exactly zero. This is why the simple average is not useful for power calculations.'
        },
        {
          id: 'ch13-ex09',
          type: 'numeric',
          question: 'A resistor \\(R = 100\\;\\Omega\\) is connected to an AC source with \\(V_0 = 200\\;\\text{V}\\). What is the average power dissipated?',
          hint: 'First find \\(V_{\\text{rms}}\\), then use \\(P = V_{\\text{rms}}^2/R\\).',
          solution: '\\(V_{\\text{rms}} = 200/\\sqrt{2} \\approx 141.4\\;\\text{V}\\). \\(P = 141.4^2/100 = 20000/100 = 200\\;\\text{W}\\). Alternatively, \\(P = V_0^2/(2R) = 40000/200 = 200\\;\\text{W}\\).'
        },
        {
          id: 'ch13-ex10',
          type: 'mc',
          question: 'When we say the mains voltage is "220 V", this refers to:',
          options: ['The peak voltage', 'The average voltage', 'The RMS voltage', 'The peak-to-peak voltage'],
          answer: 2,
          hint: 'The commonly quoted mains voltage is the value used directly in power calculations.',
          solution: 'The 220 V figure is the RMS voltage. The peak voltage is actually about 311 V. RMS is quoted because it can be used directly in power formulas like \\(P = V^2/R\\).'
        }
      ]
    },

    // ==================== SECTION 3: Transformers ====================
    {
      id: 'ch13-sec03',
      title: 'Transformers',
      content: `
<div class="env-block intuition"><div class="env-title">Stepping Voltages Up and Down</div><div class="env-body"><p>One of the greatest practical advantages of AC over DC is that AC voltages can be easily stepped up or down using transformers. A transformer consists of two coils wound around a shared iron core. By choosing different numbers of turns for each coil, we can convert a low voltage to a high voltage (step-up) or a high voltage to a low voltage (step-down). This is the key technology that makes long-distance power transmission practical.</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn how transformers work, derive the transformer equation, and understand efficiency and ideal transformer behavior.</em></p>

<h3>How Transformers Work</h3>
<p>A transformer has two coils (windings) on a common iron core:</p>
<ul>
  <li><strong>Primary coil:</strong> connected to the input AC voltage (\\(N_1\\) turns)</li>
  <li><strong>Secondary coil:</strong> delivers the output voltage (\\(N_2\\) turns)</li>
</ul>
<p>The AC current in the primary coil creates a changing magnetic flux in the iron core. This changing flux passes through the secondary coil and (by Faraday's Law) induces an EMF in it. The iron core ensures that nearly all of the magnetic flux links both coils.</p>

<div class="env-definition">
<strong>Ideal Transformer Equation</strong><br>
For an ideal transformer (100% efficiency, no flux leakage):
\\[ \\frac{V_2}{V_1} = \\frac{N_2}{N_1} \\]
where \\(V_1\\) and \\(V_2\\) are the primary and secondary voltages, and \\(N_1\\) and \\(N_2\\) are the number of turns.
<ul>
  <li>If \\(N_2 > N_1\\): <strong>step-up transformer</strong> (\\(V_2 > V_1\\))</li>
  <li>If \\(N_2 < N_1\\): <strong>step-down transformer</strong> (\\(V_2 < V_1\\))</li>
</ul>
</div>

<h3>Power Conservation in an Ideal Transformer</h3>
<p>An ideal transformer conserves power: the input power equals the output power.</p>
\\[ P_1 = P_2 \\implies V_1 I_1 = V_2 I_2 \\]
<p>Therefore:</p>
\\[ \\frac{I_2}{I_1} = \\frac{V_1}{V_2} = \\frac{N_1}{N_2} \\]
<p>When voltage is stepped up, current is stepped down by the same factor, and vice versa.</p>

<div class="env-example">
<strong>Example: Step-Down Transformer for a Phone Charger</strong><br>
A phone charger steps down 220 V (mains) to 5 V. If the primary has 4400 turns, how many turns does the secondary need?
\\[ \\frac{V_2}{V_1} = \\frac{N_2}{N_1} \\implies N_2 = N_1 \\times \\frac{V_2}{V_1} = 4400 \\times \\frac{5}{220} = 100\\;\\text{turns} \\]
</div>

<div class="env-example">
<strong>Example: Power Balance</strong><br>
A step-up transformer converts 220 V to 11000 V. If the secondary delivers 2 A, what current is drawn from the primary (assuming ideal)?
\\[ V_1 I_1 = V_2 I_2 \\implies I_1 = \\frac{V_2 I_2}{V_1} = \\frac{11000 \\times 2}{220} = 100\\;\\text{A} \\]
</div>

<h3>Real Transformers and Efficiency</h3>
<p>Real transformers are not perfectly efficient. Energy losses include:</p>
<ul>
  <li><strong>Copper losses:</strong> resistive heating in the wire windings (\\(I^2R\\) losses)</li>
  <li><strong>Iron losses:</strong> eddy currents and hysteresis in the iron core</li>
  <li><strong>Flux leakage:</strong> not all flux links both coils</li>
</ul>
<p>Well-designed power transformers typically achieve 95-99% efficiency.</p>

<div class="env-definition">
<strong>Transformer Efficiency</strong><br>
\\[ \\eta = \\frac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\% = \\frac{V_2 I_2}{V_1 I_1} \\times 100\\% \\]
</div>

<div class="env-warning">
<strong>Warning:</strong> Transformers only work with AC (or any time-varying current). A constant DC input produces no changing flux, so no EMF is induced in the secondary. This is a fundamental reason why AC is used for power distribution.
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>Transformers allow us to change voltage levels freely. But why is this so important for power transmission? The answer lies in minimizing transmission losses, which we explore in the final section.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch13-viz-transformer',
          title: 'Transformer: Turns Ratio and Voltage',
          description: 'Adjust the number of turns on the primary and secondary coils to see how the output voltage changes. Power conservation is shown in real time.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
            var N1 = 100;
            var N2 = 500;
            var V1 = 220;

            VizEngine.createSlider(controls, 'N\u2081 (primary)', 10, 1000, 100, 10, function(v) { N1 = v; draw(); });
            VizEngine.createSlider(controls, 'N\u2082 (secondary)', 10, 1000, 500, 10, function(v) { N2 = v; draw(); });
            VizEngine.createSlider(controls, 'V\u2081 (V)', 10, 500, 220, 10, function(v) { V1 = v; draw(); });

            function draw() {
              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;
              var V2 = V1 * N2 / N1;
              var ratio = N2 / N1;

              // Iron core (rectangular outline)
              var coreX = 200, coreY = 80, coreW = 300, coreH = 200;
              var thickness = 30;

              ctx.fillStyle = '#333355';
              // Top bar
              ctx.fillRect(coreX, coreY, coreW, thickness);
              // Bottom bar
              ctx.fillRect(coreX, coreY + coreH - thickness, coreW, thickness);
              // Left bar
              ctx.fillRect(coreX, coreY, thickness, coreH);
              // Right bar
              ctx.fillRect(coreX + coreW - thickness, coreY, thickness, coreH);

              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Iron Core', coreX + coreW / 2, coreY + coreH / 2 + 4);

              // Primary coil (left side)
              var pCoilX = coreX + thickness;
              var coilTop = coreY + thickness + 10;
              var coilBot = coreY + coreH - thickness - 10;
              var numP = Math.min(Math.round(N1 / 20), 15);
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 2;
              for (var i = 0; i < numP; i++) {
                var cy = coilTop + (i + 0.5) * (coilBot - coilTop) / numP;
                ctx.beginPath();
                ctx.ellipse(pCoilX, cy, 20, (coilBot - coilTop) / numP / 2 - 1, 0, -Math.PI / 2, Math.PI / 2);
                ctx.stroke();
              }

              // Secondary coil (right side)
              var sCoilX = coreX + coreW - thickness;
              var numS = Math.min(Math.round(N2 / 20), 15);
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 2;
              for (var i = 0; i < numS; i++) {
                var cy = coilTop + (i + 0.5) * (coilBot - coilTop) / numS;
                ctx.beginPath();
                ctx.ellipse(sCoilX, cy, 20, (coilBot - coilTop) / numS / 2 - 1, 0, Math.PI / 2, -Math.PI / 2, true);
                ctx.stroke();
              }

              // Input/Output labels
              ctx.fillStyle = viz.colors.orange;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Primary', pCoilX - 20, coreY - 15);
              ctx.fillText('N\u2081 = ' + N1, pCoilX - 20, coreY + coreH + 25);
              ctx.fillText('V\u2081 = ' + V1.toFixed(0) + ' V', pCoilX - 20, coreY + coreH + 45);

              ctx.fillStyle = viz.colors.teal;
              ctx.fillText('Secondary', sCoilX + 20, coreY - 15);
              ctx.fillText('N\u2082 = ' + N2, sCoilX + 20, coreY + coreH + 25);
              ctx.fillText('V\u2082 = ' + V2.toFixed(1) + ' V', sCoilX + 20, coreY + coreH + 45);

              // Transformer type label
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 16px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              if (ratio > 1.01) {
                ctx.fillText('Step-Up Transformer (ratio = ' + ratio.toFixed(2) + ')', W / 2, H - 30);
              } else if (ratio < 0.99) {
                ctx.fillText('Step-Down Transformer (ratio = ' + ratio.toFixed(2) + ')', W / 2, H - 30);
              } else {
                ctx.fillText('Isolation Transformer (ratio \u2248 1)', W / 2, H - 30);
              }

              // Flux arrows in core
              ctx.fillStyle = viz.colors.purple + '66';
              ctx.font = '14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('\u27F3 \u03A6', coreX + coreW / 2, coreY + 20);
            }
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ch13-ex11',
          type: 'numeric',
          question: 'A transformer has 200 primary turns and 1000 secondary turns. If the primary voltage is 220 V, what is the secondary voltage?',
          hint: 'Use \\(V_2/V_1 = N_2/N_1\\).',
          solution: '\\(V_2 = V_1 \\times N_2/N_1 = 220 \\times 1000/200 = 220 \\times 5 = 1100\\;\\text{V}\\).'
        },
        {
          id: 'ch13-ex12',
          type: 'numeric',
          question: 'A step-down transformer converts 11000 V to 220 V. The secondary has 100 turns. How many turns does the primary have?',
          hint: 'Rearrange \\(N_1/N_2 = V_1/V_2\\).',
          solution: '\\(N_1 = N_2 \\times V_1/V_2 = 100 \\times 11000/220 = 100 \\times 50 = 5000\\;\\text{turns}\\).'
        },
        {
          id: 'ch13-ex13',
          type: 'numeric',
          question: 'An ideal transformer steps up 220 V to 2200 V. If the secondary current is 0.5 A, what is the primary current?',
          hint: 'Use power conservation: \\(V_1 I_1 = V_2 I_2\\).',
          solution: '\\(I_1 = V_2 I_2 / V_1 = 2200 \\times 0.5 / 220 = 5\\;\\text{A}\\).'
        },
        {
          id: 'ch13-ex14',
          type: 'mc',
          question: 'A transformer is connected to a DC battery. The secondary voltage will be:',
          options: ['Equal to the primary voltage', 'Zero (after an initial transient)', 'Doubled', 'Half the primary voltage'],
          answer: 1,
          hint: 'What does a transformer need to induce an EMF in the secondary?',
          solution: 'A transformer requires a changing flux. DC produces a constant flux (after the initial switch-on transient). Once the flux is steady, \\(d\\Phi/dt = 0\\) and no EMF is induced in the secondary. In practice, the primary coil with low DC resistance would draw excessive current and overheat.'
        },
        {
          id: 'ch13-ex15',
          type: 'numeric',
          question: 'A transformer has an efficiency of 95%. If the input power is 2000 W, what is the output power?',
          hint: 'Use \\(\\eta = P_{\\text{out}} / P_{\\text{in}}\\).',
          solution: '\\(P_{\\text{out}} = \\eta \\times P_{\\text{in}} = 0.95 \\times 2000 = 1900\\;\\text{W}\\). The remaining 100 W is lost as heat.'
        }
      ]
    },

    // ==================== SECTION 4: Power Transmission ====================
    {
      id: 'ch13-sec04',
      title: 'Power Transmission',
      content: `
<div class="env-block intuition"><div class="env-title">Why 500,000 Volts?</div><div class="env-body"><p>Power plants generate electricity far from where it is consumed. Transmitting large amounts of power over long distances through wires inevitably involves some energy loss. The key insight is that by stepping the voltage up to very high levels (hundreds of thousands of volts) before transmission, we can dramatically reduce these losses. This is perhaps the single most important application of transformers and AC power.</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn why high-voltage transmission minimizes power loss, calculate transmission losses, and understand the structure of the power grid.</em></p>

<h3>The Power Loss Problem</h3>
<p>Transmission lines have resistance \\(R_{\\text{line}}\\). When current \\(I\\) flows through them, power is lost as heat:</p>
\\[ P_{\\text{loss}} = I^2 R_{\\text{line}} \\]
<p>We want to deliver a fixed amount of power \\(P\\) to consumers. Since \\(P = VI\\), we can express the current as \\(I = P/V\\). Substituting:</p>
\\[ P_{\\text{loss}} = \\left(\\frac{P}{V}\\right)^2 R_{\\text{line}} = \\frac{P^2 R_{\\text{line}}}{V^2} \\]

<div class="env-definition">
<strong>Transmission Loss</strong><br>
For a fixed power \\(P\\) to be delivered and fixed line resistance \\(R_{\\text{line}}\\):
\\[ P_{\\text{loss}} = \\frac{P^2 R_{\\text{line}}}{V^2} \\]
Doubling the transmission voltage reduces the loss by a factor of 4. This is why power is transmitted at very high voltages (typically 110 kV to 1000 kV).
</div>

<div class="env-example">
<strong>Example: Comparing Transmission at 220 V vs. 220 kV</strong><br>
A power plant transmits \\(P = 1\\;\\text{MW} = 10^6\\;\\text{W}\\) through lines with \\(R_{\\text{line}} = 10\\;\\Omega\\).
<br><br>
<strong>At 220 V:</strong>
\\[ I = \\frac{10^6}{220} = 4545\\;\\text{A} \\]
\\[ P_{\\text{loss}} = (4545)^2 \\times 10 = 2.07 \\times 10^8\\;\\text{W} = 207\\;\\text{MW} \\]
This is absurd; the loss exceeds the power being delivered!
<br><br>
<strong>At 220 kV:</strong>
\\[ I = \\frac{10^6}{220000} = 4.55\\;\\text{A} \\]
\\[ P_{\\text{loss}} = (4.55)^2 \\times 10 = 207\\;\\text{W} \\]
The loss is tiny (0.021% of the transmitted power).
</div>

<h3>The Power Grid Structure</h3>
<p>A typical power grid uses multiple voltage levels:</p>
<ol>
  <li><strong>Generation:</strong> Power plant generates at ~20 kV</li>
  <li><strong>Step-up transformer:</strong> Voltage is raised to 110-1000 kV for long-distance transmission</li>
  <li><strong>High-voltage transmission lines:</strong> Power travels hundreds of kilometers</li>
  <li><strong>Step-down transformer (substation):</strong> Voltage is reduced to ~10 kV for local distribution</li>
  <li><strong>Neighborhood transformer:</strong> Voltage is reduced to 220 V (or 110 V in some countries) for household use</li>
</ol>

<div class="env-example">
<strong>Example: Transmission Efficiency</strong><br>
A power station delivers 5 MW through transmission lines with total resistance \\(R = 20\\;\\Omega\\) at a voltage of 500 kV. Find the efficiency of transmission.
\\[ I = \\frac{P}{V} = \\frac{5 \\times 10^6}{5 \\times 10^5} = 10\\;\\text{A} \\]
\\[ P_{\\text{loss}} = I^2 R = 100 \\times 20 = 2000\\;\\text{W} = 2\\;\\text{kW} \\]
\\[ \\eta = \\frac{P - P_{\\text{loss}}}{P} \\times 100\\% = \\frac{5000000 - 2000}{5000000} \\times 100\\% = 99.96\\% \\]
</div>

<div class="env-warning">
<strong>Warning:</strong> The formula \\(P_{\\text{loss}} = P^2 R / V^2\\) assumes the voltage V is the transmission voltage (across the line), not the voltage drop across the resistance. In practice, the voltage drop along the line is \\(\\Delta V = IR\\), and the transmission voltage is much larger.
</div>

<div class="env-remark">
<strong>Remark:</strong> This is the fundamental reason AC won the "War of Currents" against DC in the late 1800s. Edison advocated DC, but Westinghouse and Tesla showed that AC, combined with transformers, allowed efficient long-distance power transmission. Modern HVDC (high-voltage direct current) technology has since found its own niche for very long underwater cables, but AC remains dominant for general transmission.
</div>

<div class="env-block intuition"><div class="env-title">Chapter Summary</div><div class="env-body"><p>In this chapter, you explored alternating current from generation to consumption. AC generators produce sinusoidal voltages through rotating coils. RMS values provide the "effective" measure of AC for power calculations. Transformers step voltages up or down using the turns ratio, and high-voltage transmission minimizes power losses over long distances. Together, these ideas form the foundation of the modern electrical power system that lights our homes and powers our devices.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch13-viz-transmission',
          title: 'Power Transmission Line Losses',
          description: 'Compare the power lost in transmission lines at different voltages. See how stepping up the voltage dramatically reduces losses.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
            var P = 1e6; // 1 MW
            var Rline = 10;
            var Vtrans = 220;

            VizEngine.createSlider(controls, 'V (kV)', 0.22, 500, 0.22, 0.1, function(v) { Vtrans = v * 1000; draw(); });
            VizEngine.createSlider(controls, 'R line (\u03A9)', 1, 50, 10, 1, function(v) { Rline = v; draw(); });
            VizEngine.createSlider(controls, 'P (MW)', 0.1, 10, 1, 0.1, function(v) { P = v * 1e6; draw(); });

            function draw() {
              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;

              var I = P / Vtrans;
              var Ploss = I * I * Rline;
              var Pdelivered = Math.max(P - Ploss, 0);
              var efficiency = Ploss < P ? ((P - Ploss) / P * 100) : 0;

              // Power plant (left)
              var ppX = 60, ppY = 100, ppW = 80, ppH = 60;
              ctx.fillStyle = viz.colors.orange + '44';
              ctx.fillRect(ppX, ppY, ppW, ppH);
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 2;
              ctx.strokeRect(ppX, ppY, ppW, ppH);
              ctx.fillStyle = viz.colors.orange;
              ctx.font = 'bold 11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Power', ppX + ppW / 2, ppY + ppH / 2 - 6);
              ctx.fillText('Plant', ppX + ppW / 2, ppY + ppH / 2 + 8);
              ctx.font = '10px -apple-system,sans-serif';
              ctx.fillText((P / 1e6).toFixed(1) + ' MW', ppX + ppW / 2, ppY + ppH + 14);

              // Step-up transformer
              var suX = 190, suY = 110, suW = 40, suH = 40;
              ctx.fillStyle = viz.colors.teal + '44';
              ctx.fillRect(suX, suY, suW, suH);
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(suX, suY, suW, suH);
              ctx.fillStyle = viz.colors.teal;
              ctx.font = '9px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Step', suX + suW / 2, suY + suH / 2 - 4);
              ctx.fillText('Up', suX + suW / 2, suY + suH / 2 + 8);

              // Transmission line
              var lineX1 = 240, lineX2 = 460;
              var lineY = 130;
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(lineX1, lineY);
              ctx.lineTo(lineX2, lineY);
              ctx.stroke();

              // Transmission towers
              for (var tx = lineX1 + 30; tx < lineX2 - 20; tx += 60) {
                ctx.strokeStyle = viz.colors.text;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(tx, lineY);
                ctx.lineTo(tx, lineY + 40);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx - 10, lineY + 40);
                ctx.lineTo(tx + 10, lineY + 40);
                ctx.stroke();
                // Cross arms
                ctx.beginPath();
                ctx.moveTo(tx - 12, lineY);
                ctx.lineTo(tx + 12, lineY);
                ctx.stroke();
              }

              // Voltage label on line
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 12px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText((Vtrans / 1000).toFixed(1) + ' kV', (lineX1 + lineX2) / 2, lineY - 15);

              // Current label
              ctx.fillStyle = viz.colors.green;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText('I = ' + I.toFixed(1) + ' A', (lineX1 + lineX2) / 2, lineY + 55);

              // Step-down transformer
              var sdX = 470, sdY = 110, sdW = 40, sdH = 40;
              ctx.fillStyle = viz.colors.teal + '44';
              ctx.fillRect(sdX, sdY, sdW, sdH);
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(sdX, sdY, sdW, sdH);
              ctx.fillStyle = viz.colors.teal;
              ctx.font = '9px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Step', sdX + sdW / 2, sdY + sdH / 2 - 4);
              ctx.fillText('Down', sdX + sdW / 2, sdY + sdH / 2 + 8);

              // City (right)
              var cityX = 560, cityY = 100, cityW = 80, cityH = 60;
              ctx.fillStyle = viz.colors.blue + '44';
              ctx.fillRect(cityX, cityY, cityW, cityH);
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 2;
              ctx.strokeRect(cityX, cityY, cityW, cityH);
              ctx.fillStyle = viz.colors.blue;
              ctx.font = 'bold 11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('City', cityX + cityW / 2, cityY + cityH / 2 + 2);
              ctx.font = '10px -apple-system,sans-serif';
              ctx.fillText((Pdelivered / 1e6).toFixed(3) + ' MW', cityX + cityW / 2, cityY + cityH + 14);

              // Connecting lines
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(ppX + ppW, ppY + ppH / 2);
              ctx.lineTo(suX, suY + suH / 2);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(sdX + sdW, sdY + sdH / 2);
              ctx.lineTo(cityX, cityY + cityH / 2);
              ctx.stroke();

              // Loss bar chart at bottom
              var barTop = 220, barH = 100, barW = 200;
              var barX = W / 2 - barW / 2;

              // Loss fraction
              var lossFrac = Math.min(Ploss / P, 1);
              var delFrac = 1 - lossFrac;

              // Delivered portion
              ctx.fillStyle = viz.colors.green;
              ctx.fillRect(barX, barTop, barW * delFrac, barH);

              // Loss portion
              ctx.fillStyle = viz.colors.red;
              ctx.fillRect(barX + barW * delFrac, barTop, barW * lossFrac, barH);

              // Border
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 1;
              ctx.strokeRect(barX, barTop, barW, barH);

              // Labels
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              if (delFrac > 0.15) {
                ctx.fillText('Delivered', barX + barW * delFrac / 2, barTop + barH / 2 - 6);
                ctx.font = '11px -apple-system,sans-serif';
                ctx.fillText((delFrac * 100).toFixed(1) + '%', barX + barW * delFrac / 2, barTop + barH / 2 + 10);
              }
              if (lossFrac > 0.05) {
                ctx.font = 'bold 13px -apple-system,sans-serif';
                ctx.fillText('Loss', barX + barW * delFrac + barW * lossFrac / 2, barTop + barH / 2 - 6);
                ctx.font = '11px -apple-system,sans-serif';
                ctx.fillText((lossFrac * 100).toFixed(1) + '%', barX + barW * delFrac + barW * lossFrac / 2, barTop + barH / 2 + 10);
              }

              // Readout
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 15px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('P(loss) = P\u00B2R/V\u00B2 = ' + (Ploss >= 1e6 ? (Ploss / 1e6).toFixed(1) + ' MW' : (Ploss / 1e3).toFixed(2) + ' kW'), W / 2, barTop + barH + 25);
              ctx.fillText('Efficiency: ' + (efficiency > 0 ? efficiency.toFixed(2) : '0') + '%', W / 2, barTop + barH + 48);

              // R label
              ctx.fillStyle = viz.colors.red;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText('R(line) = ' + Rline + ' \u03A9', (lineX1 + lineX2) / 2, lineY + 70);
            }
            draw();
          }
        },
        {
          id: 'ch13-viz-loss-comparison',
          title: 'Loss vs. Voltage: Inverse Square Law',
          description: 'See how transmission losses drop as voltage increases, following the inverse-square relationship. The graph plots loss percentage against transmission voltage.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 380, scale: 1, originX: 80, originY: 330});
            var P = 1e6;
            var Rline = 10;

            VizEngine.createSlider(controls, 'P (MW)', 0.5, 10, 1, 0.5, function(v) { P = v * 1e6; draw(); });
            VizEngine.createSlider(controls, 'R (\u03A9)', 1, 50, 10, 1, function(v) { Rline = v; draw(); });

            function draw() {
              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;

              var graphX = 80, graphY = 30;
              var graphW = 580, graphH = 300;

              // Graph box
              ctx.strokeStyle = viz.colors.grid;
              ctx.lineWidth = 1;
              ctx.strokeRect(graphX, graphY, graphW, graphH);

              // Y-axis: loss percentage (0 to 100)
              ctx.strokeStyle = viz.colors.axis;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(graphX, graphY);
              ctx.lineTo(graphX, graphY + graphH);
              ctx.stroke();

              // X-axis: voltage (log scale from 0.22 kV to 500 kV)
              ctx.beginPath();
              ctx.moveTo(graphX, graphY + graphH);
              ctx.lineTo(graphX + graphW, graphY + graphH);
              ctx.stroke();

              // Y-axis labels
              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              for (var pct = 0; pct <= 100; pct += 20) {
                var py = graphY + graphH - (pct / 100) * graphH;
                ctx.fillText(pct + '%', graphX - 5, py + 4);
                ctx.strokeStyle = viz.colors.grid;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(graphX, py);
                ctx.lineTo(graphX + graphW, py);
                ctx.stroke();
              }

              // X-axis labels (log scale)
              var voltages = [0.22, 1, 5, 10, 50, 100, 500];
              var logMin = Math.log10(0.22);
              var logMax = Math.log10(500);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              for (var vi = 0; vi < voltages.length; vi++) {
                var vkv = voltages[vi];
                var frac = (Math.log10(vkv) - logMin) / (logMax - logMin);
                var px = graphX + frac * graphW;
                ctx.fillStyle = viz.colors.text;
                ctx.fillText(vkv < 1 ? vkv.toFixed(2) : vkv, px, graphY + graphH + 5);
                ctx.strokeStyle = viz.colors.grid;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(px, graphY);
                ctx.lineTo(px, graphY + graphH);
                ctx.stroke();
              }

              // Axis labels
              ctx.fillStyle = viz.colors.white;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Transmission Voltage (kV)', graphX + graphW / 2, graphY + graphH + 22);

              ctx.save();
              ctx.translate(graphX - 45, graphY + graphH / 2);
              ctx.rotate(-Math.PI / 2);
              ctx.fillText('Power Loss (%)', 0, 0);
              ctx.restore();

              // Plot the curve
              ctx.strokeStyle = viz.colors.red;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              var steps = 300;
              var started = false;
              for (var i = 0; i <= steps; i++) {
                var logV = logMin + (i / steps) * (logMax - logMin);
                var Vkv = Math.pow(10, logV);
                var V = Vkv * 1000;
                var Icur = P / V;
                var loss = Icur * Icur * Rline;
                var lossPct = Math.min((loss / P) * 100, 100);
                var px = graphX + (i / steps) * graphW;
                var py = graphY + graphH - (lossPct / 100) * graphH;
                if (!started) { ctx.moveTo(px, py); started = true; }
                else ctx.lineTo(px, py);
              }
              ctx.stroke();

              // Mark some key points
              var keyV = [0.22, 10, 110, 500];
              var keyColors = [viz.colors.red, viz.colors.orange, viz.colors.green, viz.colors.teal];
              for (var ki = 0; ki < keyV.length; ki++) {
                var vkv = keyV[ki];
                var V = vkv * 1000;
                var Icur = P / V;
                var loss = Icur * Icur * Rline;
                var lossPct = Math.min((loss / P) * 100, 100);
                var frac = (Math.log10(vkv) - logMin) / (logMax - logMin);
                var px = graphX + frac * graphW;
                var py = graphY + graphH - (lossPct / 100) * graphH;

                ctx.fillStyle = keyColors[ki];
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.font = '10px -apple-system,sans-serif';
                ctx.textAlign = 'left';
                var labelY = py - 12;
                if (lossPct > 95) labelY = py + 15;
                ctx.fillText(vkv + ' kV: ' + (lossPct > 100 ? '>100' : lossPct.toFixed(2)) + '%', px + 8, labelY);
              }

              // Title
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('P(loss) = P\u00B2R/V\u00B2 — Loss drops as 1/V\u00B2', graphX + graphW / 2, graphY - 10);
            }
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ch13-ex16',
          type: 'numeric',
          question: 'A power plant transmits 2 MW through lines with total resistance 5 \\(\\Omega\\) at 100 kV. What is the power lost in the transmission lines?',
          hint: 'Use \\(P_{\\text{loss}} = P^2 R / V^2\\) or first find I = P/V.',
          solution: '\\(I = P/V = 2 \\times 10^6 / 10^5 = 20\\;\\text{A}\\). \\(P_{\\text{loss}} = I^2 R = 400 \\times 5 = 2000\\;\\text{W} = 2\\;\\text{kW}\\).'
        },
        {
          id: 'ch13-ex17',
          type: 'numeric',
          question: 'If the same 2 MW in the previous problem is transmitted at 10 kV instead, what is the power loss?',
          hint: 'Reducing the voltage by a factor of 10 increases the loss by a factor of 100.',
          solution: '\\(I = 2 \\times 10^6 / 10^4 = 200\\;\\text{A}\\). \\(P_{\\text{loss}} = (200)^2 \\times 5 = 200000\\;\\text{W} = 200\\;\\text{kW}\\). The loss is 100 times greater, confirming the inverse-square relationship.'
        },
        {
          id: 'ch13-ex18',
          type: 'mc',
          question: 'The main reason for using high-voltage transmission is:',
          options: ['High voltage makes electricity travel faster through wires', 'High voltage reduces the current, which reduces \\(I^2R\\) losses', 'High voltage wires are cheaper to manufacture', 'High voltage requires thinner wires'],
          answer: 1,
          hint: 'Think about the relationship between power, voltage, current, and loss.',
          solution: 'For a given power P, increasing voltage V decreases the current I = P/V. Since transmission losses are \\(I^2R\\), a lower current means much lower losses. This is the fundamental reason for high-voltage transmission.'
        },
        {
          id: 'ch13-ex19',
          type: 'numeric',
          question: 'A 500 kV transmission line delivers 100 MW with line resistance 8 \\(\\Omega\\). What is the transmission efficiency?',
          hint: 'Find the loss first, then efficiency = (P - P_loss)/P.',
          solution: '\\(I = 10^8 / (5 \\times 10^5) = 200\\;\\text{A}\\). \\(P_{\\text{loss}} = 200^2 \\times 8 = 320000\\;\\text{W} = 320\\;\\text{kW}\\). \\(\\eta = (10^8 - 3.2 \\times 10^5) / 10^8 \\times 100\\% = 99.68\\%\\).'
        },
        {
          id: 'ch13-ex20',
          type: 'mc',
          question: 'The War of Currents between Edison (DC) and Westinghouse/Tesla (AC) was largely decided by:',
          options: ['DC being more dangerous than AC', 'AC being cheaper to generate', 'The ability to use transformers with AC for efficient long-distance transmission', 'AC motors being smaller than DC motors'],
          answer: 2,
          hint: 'What key device works only with AC and is essential for power transmission?',
          solution: 'The decisive advantage of AC was that transformers could step the voltage up for efficient long-distance transmission and back down for safe household use. This was not possible with DC at the time. Without transformers, DC had to be transmitted at low voltage, suffering enormous \\(I^2R\\) losses.'
        }
      ]
    }
  ]
});
