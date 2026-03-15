window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch12',
  number: 12,
  title: 'Electromagnetic Induction',
  subtitle: 'From Changing Fields to Electric Current',
  sections: [

    // ==================== SECTION 1: Magnetic Flux ====================
    {
      id: 'ch12-sec01',
      title: 'Magnetic Flux',
      content: `
<div class="env-block intuition"><div class="env-title">From Fields to Flux</div><div class="env-body"><p>In Chapter 11 you learned that a magnetic field exerts forces on moving charges and current-carrying wires. Now we ask a deeper question: can a magnetic field itself create current? The answer is yes, but only when something changes. The key quantity that captures this idea is <em>magnetic flux</em>, which measures how much magnetic field "threads through" a given area.</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn to define and compute magnetic flux, understand how the angle between the field and the area affects it, and build intuition for when flux changes.</em></p>

<div class="env-definition">
<strong>Magnetic Flux</strong><br>
The <em>magnetic flux</em> \\(\\Phi_B\\) through a flat surface of area \\(A\\) in a uniform magnetic field \\(\\vec{B}\\) is:
\\[ \\Phi_B = BA\\cos\\theta \\]
where \\(\\theta\\) is the angle between the magnetic field vector \\(\\vec{B}\\) and the area normal vector \\(\\hat{n}\\) (the vector perpendicular to the surface). The SI unit of magnetic flux is the <strong>weber</strong> (Wb), where \\(1\\;\\text{Wb} = 1\\;\\text{T}\\cdot\\text{m}^2\\).
</div>

<h3>Understanding the Angle Dependence</h3>
<p>The factor \\(\\cos\\theta\\) is crucial:</p>
<ul>
  <li>When \\(\\theta = 0^\\circ\\), the field is perpendicular to the surface (parallel to \\(\\hat{n}\\)). Flux is maximum: \\(\\Phi = BA\\).</li>
  <li>When \\(\\theta = 90^\\circ\\), the field is parallel to the surface (perpendicular to \\(\\hat{n}\\)). Flux is zero: \\(\\Phi = 0\\).</li>
  <li>When \\(\\theta = 180^\\circ\\), the field points opposite to \\(\\hat{n}\\). Flux is \\(\\Phi = -BA\\) (negative).</li>
</ul>

<div class="env-intuition">
<strong>Intuition: Counting Field Lines</strong><br>
Imagine you hold a wire loop in a rain of "field lines." When the loop faces the rain head-on, the maximum number of lines pass through it. Tilt it sideways, and fewer lines thread through. Turn it edge-on, and none pass through at all. Magnetic flux counts how many field lines pass through the loop.
</div>

<div class="env-example">
<strong>Example: Rectangular Loop in a Uniform Field</strong><br>
A rectangular loop has dimensions \\(0.2\\;\\text{m} \\times 0.3\\;\\text{m}\\) and sits in a uniform field \\(B = 0.5\\;\\text{T}\\). The normal to the loop makes an angle \\(\\theta = 30^\\circ\\) with the field.
\\[ \\Phi = BA\\cos\\theta = (0.5)(0.2 \\times 0.3)\\cos 30^\\circ = (0.5)(0.06)(0.866) = 0.026\\;\\text{Wb} \\]
</div>

<h3>When Does Flux Change?</h3>
<p>Magnetic flux through a loop can change if any of these three quantities change with time:</p>
<ol>
  <li><strong>\\(B\\)</strong>: the magnetic field strength increases or decreases</li>
  <li><strong>\\(A\\)</strong>: the area of the loop changes (e.g., a sliding rail)</li>
  <li><strong>\\(\\theta\\)</strong>: the loop rotates relative to the field</li>
</ol>
<p>As you will see in the next section, a changing flux is exactly what produces an electromotive force (EMF).</p>

<div class="env-warning">
<strong>Warning:</strong> Flux depends on the <em>component</em> of \\(\\vec{B}\\) perpendicular to the surface. If the field runs parallel to the loop, it may be large, but it threads zero flux through the loop.
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>You now have the concept of magnetic flux, the quantity whose change drives electromagnetic induction. Next, we will state Faraday's Law, which quantifies the EMF produced by a changing flux.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch12-viz-flux',
          title: 'Magnetic Flux: Area and Angle',
          description: 'Adjust the magnetic field strength and the tilt angle of the loop to see how magnetic flux changes. The projected area is shown in blue.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
            var B = 0.5;
            var theta = 0;

            var bSlider = VizEngine.createSlider(controls, 'B (T)', 0, 1, 0.5, 0.05, function(v) { B = v; draw(); });
            var tSlider = VizEngine.createSlider(controls, 'Angle (deg)', 0, 90, 0, 1, function(v) { theta = v * Math.PI / 180; draw(); });

            function draw() {
              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;
              var cx = W / 2, cy = H / 2;
              var loopW = 160, loopH = 120;
              var cosT = Math.cos(theta);
              var projW = loopW * cosT;

              // Draw field lines (horizontal arrows)
              ctx.strokeStyle = viz.colors.yellow + '55';
              ctx.lineWidth = 1;
              for (var fy = -3; fy <= 3; fy++) {
                for (var fx = -4; fx <= 3; fx++) {
                  var sx = cx + fx * 40;
                  var sy = cy + fy * 30;
                  ctx.beginPath();
                  ctx.moveTo(sx, sy);
                  ctx.lineTo(sx + 25, sy);
                  ctx.stroke();
                  // arrowhead
                  ctx.fillStyle = viz.colors.yellow + '55';
                  ctx.beginPath();
                  ctx.moveTo(sx + 25, sy);
                  ctx.lineTo(sx + 20, sy - 3);
                  ctx.lineTo(sx + 20, sy + 3);
                  ctx.closePath();
                  ctx.fill();
                }
              }

              // Draw the loop (tilted ellipse to represent 3D perspective)
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.ellipse(cx, cy, Math.max(projW / 2, 2), loopH / 2, 0, 0, Math.PI * 2);
              ctx.stroke();

              // Shaded area (projected)
              ctx.fillStyle = viz.colors.blue + '22';
              ctx.beginPath();
              ctx.ellipse(cx, cy, Math.max(projW / 2, 2), loopH / 2, 0, 0, Math.PI * 2);
              ctx.fill();

              // Normal vector
              var nLen = 80;
              var nx = cx + nLen * cosT;
              var ny = cy;
              ctx.strokeStyle = viz.colors.green;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(nx, ny);
              ctx.stroke();
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath();
              ctx.moveTo(nx, ny);
              ctx.lineTo(nx - 10, ny - 5);
              ctx.lineTo(nx - 10, ny + 5);
              ctx.closePath();
              ctx.fill();

              // B vector (horizontal arrow from left side)
              var bx1 = cx - 120, by1 = cy - loopH / 2 - 30;
              var bx2 = bx1 + 80;
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(bx1, by1);
              ctx.lineTo(bx2, by1);
              ctx.stroke();
              ctx.fillStyle = viz.colors.orange;
              ctx.beginPath();
              ctx.moveTo(bx2, by1);
              ctx.lineTo(bx2 - 10, by1 - 5);
              ctx.lineTo(bx2 - 10, by1 + 5);
              ctx.closePath();
              ctx.fill();

              // Angle arc between B direction and normal
              if (theta > 0.02) {
                ctx.strokeStyle = viz.colors.yellow;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(cx, cy, 40, -theta, 0);
                ctx.stroke();
              }

              // Labels
              ctx.fillStyle = viz.colors.orange;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('B', bx2 + 6, by1 - 2);

              ctx.fillStyle = viz.colors.green;
              ctx.fillText('n', nx + 8, ny - 2);

              if (theta > 0.05) {
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = '13px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('\u03B8', cx + 50 * Math.cos(-theta / 2), cy + 50 * Math.sin(-theta / 2));
              }

              // Flux readout
              var area = 0.06;
              var flux = B * area * Math.cos(theta);
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 15px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('\u03A6 = BA cos\u03B8 = ' + flux.toFixed(4) + ' Wb', W / 2, H - 25);

              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillStyle = viz.colors.text;
              ctx.fillText('A = 0.2 m \u00D7 0.3 m = 0.06 m\u00B2', W / 2, H - 50);
            }
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ch12-ex01',
          type: 'numeric',
          question: 'A circular coil of radius 0.1 m is placed in a uniform magnetic field B = 0.4 T. The normal to the coil is parallel to the field. Calculate the magnetic flux through the coil in Wb. (Use \\(\\pi = 3.14\\))',
          hint: 'When the normal is parallel to the field, \\(\\theta = 0\\), so \\(\\Phi = BA\\). The area of a circle is \\(A = \\pi r^2\\).',
          solution: '\\(A = \\pi r^2 = 3.14 \\times 0.01 = 0.0314\\;\\text{m}^2\\). Since \\(\\theta = 0\\), \\(\\Phi = BA = 0.4 \\times 0.0314 = 0.01256\\;\\text{Wb} \\approx 0.0126\\;\\text{Wb}\\).'
        },
        {
          id: 'ch12-ex02',
          type: 'mc',
          question: 'A square loop is in a uniform magnetic field. If the plane of the loop is parallel to the field, what is the magnetic flux through the loop?',
          options: ['\\(\\Phi = BA\\)', '\\(\\Phi = BA/2\\)', '\\(\\Phi = 0\\)', '\\(\\Phi = -BA\\)'],
          answer: 2,
          hint: 'When the plane of the loop is parallel to B, the normal to the loop is perpendicular to B, so \\(\\theta = 90^\\circ\\).',
          solution: 'When the plane is parallel to the field, the area normal is perpendicular to B, giving \\(\\theta = 90^\\circ\\). Therefore \\(\\Phi = BA\\cos 90^\\circ = 0\\).'
        },
        {
          id: 'ch12-ex03',
          type: 'numeric',
          question: 'A rectangular coil (0.5 m by 0.3 m) is tilted so that the normal makes a 60-degree angle with a field of B = 0.8 T. What is the flux in Wb?',
          hint: 'Use \\(\\Phi = BA\\cos\\theta\\) with \\(A = 0.5 \\times 0.3\\) and \\(\\theta = 60^\\circ\\).',
          solution: '\\(A = 0.5 \\times 0.3 = 0.15\\;\\text{m}^2\\). \\(\\Phi = 0.8 \\times 0.15 \\times \\cos 60^\\circ = 0.12 \\times 0.5 = 0.06\\;\\text{Wb}\\).'
        },
        {
          id: 'ch12-ex04',
          type: 'mc',
          question: 'Which of the following changes will NOT cause the magnetic flux through a loop to change?',
          options: ['Increasing the magnetic field strength', 'Rotating the loop in the field', 'Moving the loop sideways in a uniform field without rotation', 'Shrinking the area of the loop'],
          answer: 2,
          hint: 'Consider which of the three quantities (B, A, \\(\\theta\\)) change in each case.',
          solution: 'Moving the loop sideways in a uniform field changes neither B, A, nor \\(\\theta\\), so the flux stays the same. All other options change at least one of these quantities.'
        },
        {
          id: 'ch12-ex05',
          type: 'numeric',
          question: 'A coil of area 0.04 m\\(^2\\) is in a field of 1.2 T. It is rotated from \\(\\theta = 0^\\circ\\) to \\(\\theta = 90^\\circ\\). Find the change in flux \\(\\Delta\\Phi\\) in Wb.',
          hint: 'Compute \\(\\Phi_1 = BA\\cos 0^\\circ\\) and \\(\\Phi_2 = BA\\cos 90^\\circ\\), then find \\(\\Delta\\Phi = \\Phi_2 - \\Phi_1\\).',
          solution: '\\(\\Phi_1 = 1.2 \\times 0.04 \\times 1 = 0.048\\;\\text{Wb}\\), \\(\\Phi_2 = 1.2 \\times 0.04 \\times 0 = 0\\). \\(\\Delta\\Phi = 0 - 0.048 = -0.048\\;\\text{Wb}\\). The magnitude is \\(0.048\\;\\text{Wb}\\).'
        }
      ]
    },

    // ==================== SECTION 2: Faraday's Law ====================
    {
      id: 'ch12-sec02',
      title: "Faraday's Law",
      content: `
<div class="env-block intuition"><div class="env-title">The Discovery that Changed the World</div><div class="env-body"><p>In 1831, Michael Faraday discovered that a changing magnetic flux through a loop induces an electromotive force (EMF) in the loop, which can drive a current. This discovery, known as Faraday's Law, is the foundation of electric generators, transformers, and much of modern technology.</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn Faraday's Law, calculate induced EMFs from changing flux, and understand the role of multiple turns in a coil.</em></p>

<div class="env-definition">
<strong>Faraday's Law of Electromagnetic Induction</strong><br>
The induced EMF in a loop is equal to the negative rate of change of magnetic flux through the loop:
\\[ \\mathcal{E} = -\\frac{d\\Phi_B}{dt} \\]
For a coil with \\(N\\) turns:
\\[ \\mathcal{E} = -N\\frac{d\\Phi_B}{dt} \\]
The negative sign encodes Lenz's Law (covered in the next section). For calculating the magnitude of EMF, we often write:
\\[ |\\mathcal{E}| = N\\left|\\frac{\\Delta\\Phi}{\\Delta t}\\right| \\]
</div>

<h3>What "Changing Flux" Means in Practice</h3>
<p>From Section 1, we know \\(\\Phi = BA\\cos\\theta\\). The flux changes if:</p>
<ul>
  <li>\\(B\\) changes (e.g., a magnet approaches the coil)</li>
  <li>\\(A\\) changes (e.g., a wire stretches or a rail slides)</li>
  <li>\\(\\theta\\) changes (e.g., the coil rotates, as in a generator)</li>
</ul>

<div class="env-example">
<strong>Example: Magnet Moving Toward a Coil</strong><br>
A coil with \\(N = 100\\) turns has area \\(A = 0.02\\;\\text{m}^2\\). The magnetic field through the coil increases uniformly from 0 to 0.5 T in 0.1 s. Find the induced EMF.
\\[ |\\mathcal{E}| = N\\left|\\frac{\\Delta\\Phi}{\\Delta t}\\right| = 100 \\times \\frac{0.5 \\times 0.02 - 0}{0.1} = 100 \\times \\frac{0.01}{0.1} = 100 \\times 0.1 = 10\\;\\text{V} \\]
</div>

<div class="env-example">
<strong>Example: Rotating Coil</strong><br>
A 50-turn coil of area \\(0.04\\;\\text{m}^2\\) rotates in a field \\(B = 0.3\\;\\text{T}\\). If the angle changes from \\(0^\\circ\\) to \\(90^\\circ\\) in \\(0.2\\;\\text{s}\\):
\\[ \\Delta\\Phi = BA(\\cos 90^\\circ - \\cos 0^\\circ) = 0.3 \\times 0.04 \\times (0 - 1) = -0.012\\;\\text{Wb} \\]
\\[ |\\mathcal{E}| = 50 \\times \\frac{0.012}{0.2} = 50 \\times 0.06 = 3\\;\\text{V} \\]
</div>

<h3>Why Does the EMF Exist?</h3>
<p>When the flux through a loop changes, the changing magnetic field creates an electric field along the loop. This electric field does work on charges, pushing them around the circuit. The EMF is the work done per unit charge around the loop. Even if the circuit is open (no current flows), the EMF still exists as a potential difference across the gap.</p>

<div class="env-remark">
<strong>Remark:</strong> Faraday's Law is one of Maxwell's equations. Together with the other three, it forms the complete mathematical description of electromagnetism. The negative sign was formalized by Heinrich Lenz and is explored in the next section.
</div>

<div class="env-warning">
<strong>Warning:</strong> The induced EMF depends on the <em>rate</em> of change of flux, not on the flux itself. A large constant flux produces zero EMF. A rapidly changing small flux can produce a large EMF.
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>Faraday's Law tells us the magnitude of the induced EMF. But in which direction does the induced current flow? Lenz's Law, coming next, answers this question using energy conservation.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch12-viz-faraday',
          title: "Faraday's Law: Moving Magnet and Coil",
          description: 'Watch a magnet move toward and away from a coil. The galvanometer shows the induced EMF as the flux changes. Drag the magnet to see the effect.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
            var magnetX = -4;
            var speed = 0;
            var autoPlay = false;
            var t = 0;

            var magDrag = viz.addDraggable('magnet', magnetX, 0, viz.colors.red, 12, function(x) {
              magDrag.x = Math.max(-7, Math.min(0, x));
              magDrag.y = 0;
            });

            VizEngine.createButton(controls, 'Auto Oscillate', function() {
              autoPlay = !autoPlay;
              t = 0;
            });

            function draw(ts) {
              if (autoPlay) {
                t += 0.02;
                magDrag.x = -3.5 + 2.5 * Math.sin(t * 2);
              }
              magnetX = magDrag.x;

              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;

              // Coil (drawn at x = 2)
              var coilSx = viz.toScreen(2, 0)[0];
              var coilTop = viz.toScreen(0, 2.5)[1];
              var coilBot = viz.toScreen(0, -2.5)[1];

              // Draw coil turns
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 3;
              for (var i = -2; i <= 2; i++) {
                var cx = coilSx + i * 6;
                ctx.beginPath();
                ctx.ellipse(cx, viz.originY, 4, (coilBot - coilTop) / 2, 0, 0, Math.PI * 2);
                ctx.stroke();
              }

              // Magnet (bar)
              var magSx = viz.toScreen(magnetX, 0)[0];
              var mw = 80, mh = 40;

              // N pole (red)
              ctx.fillStyle = viz.colors.red;
              ctx.fillRect(magSx - mw / 2, viz.originY - mh / 2, mw / 2, mh);
              // S pole (blue)
              ctx.fillStyle = viz.colors.blue;
              ctx.fillRect(magSx, viz.originY - mh / 2, mw / 2, mh);

              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 16px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('N', magSx - mw / 4, viz.originY);
              ctx.fillText('S', magSx + mw / 4, viz.originY);

              // Field lines from magnet
              ctx.strokeStyle = viz.colors.yellow + '44';
              ctx.lineWidth = 1;
              for (var fl = -2; fl <= 2; fl++) {
                var fy = viz.originY + fl * 12;
                ctx.beginPath();
                ctx.moveTo(magSx + mw / 2, fy);
                ctx.lineTo(magSx + mw / 2 + 120, fy);
                ctx.stroke();
              }

              // Calculate approximate EMF based on velocity
              var dist = 2 - magnetX;
              var prevFlux = 1 / (dist * dist + 0.5);
              var emf = 0;
              if (autoPlay) {
                var vel = 2.5 * 2 * Math.cos(t * 2);
                emf = vel / (dist * dist + 0.5);
              }

              // Galvanometer
              var gx = W - 100, gy = 60;
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(gx, gy, 35, Math.PI, 0);
              ctx.stroke();
              // Needle
              var needleAngle = Math.PI - Math.PI / 2 - Math.max(-1, Math.min(1, emf * 2)) * Math.PI / 3;
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(gx, gy);
              ctx.lineTo(gx + 28 * Math.cos(needleAngle), gy - 28 * Math.sin(needleAngle));
              ctx.stroke();

              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Galvanometer', gx, gy + 18);

              // Flux & EMF readout
              var flux = 1 / (dist * dist + 0.5);
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Flux \u221D 1/d\u00B2 ~ ' + flux.toFixed(3), W / 2, H - 45);
              ctx.fillText('EMF \u221D -d\u03A6/dt ~ ' + emf.toFixed(3), W / 2, H - 22);

              // Instructions
              ctx.fillStyle = viz.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText('Drag the magnet or press Auto Oscillate', W / 2, 20);

              viz.drawDraggables();
            }

            viz.animate(function(ts) { draw(ts); });
          }
        }
      ],
      exercises: [
        {
          id: 'ch12-ex06',
          type: 'numeric',
          question: 'A 200-turn coil has area 0.05 m\\(^2\\). The magnetic field through it drops from 0.6 T to 0.2 T in 0.4 s. What is the magnitude of the average induced EMF?',
          hint: 'Use \\(|\\mathcal{E}| = N|\\Delta\\Phi / \\Delta t|\\). The change in flux is \\(\\Delta\\Phi = A \\times \\Delta B\\).',
          solution: '\\(\\Delta\\Phi = A\\Delta B = 0.05 \\times (0.2 - 0.6) = -0.02\\;\\text{Wb}\\). \\(|\\mathcal{E}| = 200 \\times \\frac{0.02}{0.4} = 200 \\times 0.05 = 10\\;\\text{V}\\).'
        },
        {
          id: 'ch12-ex07',
          type: 'mc',
          question: 'A coil sits in a constant, uniform magnetic field. What is the induced EMF?',
          options: ['It depends on the strength of the field', 'It equals \\(NBA\\)', 'Zero', 'It depends on the number of turns'],
          answer: 2,
          hint: 'What matters is the rate of change of flux, not the flux itself.',
          solution: 'If the field is constant and the coil is stationary, \\(d\\Phi/dt = 0\\), so the induced EMF is zero regardless of how strong the field is.'
        },
        {
          id: 'ch12-ex08',
          type: 'numeric',
          question: 'A single circular loop of radius 0.1 m is in a field that increases at a constant rate of 2 T/s. Find the induced EMF. (Use \\(\\pi = 3.14\\))',
          hint: 'For a single turn, \\(|\\mathcal{E}| = A \\times |dB/dt|\\).',
          solution: '\\(A = \\pi(0.1)^2 = 0.0314\\;\\text{m}^2\\). \\(|\\mathcal{E}| = 0.0314 \\times 2 = 0.0628\\;\\text{V} \\approx 0.063\\;\\text{V}\\).'
        },
        {
          id: 'ch12-ex09',
          type: 'mc',
          question: 'Doubling the number of turns in a coil while keeping everything else the same will:',
          options: ['Double the flux', 'Double the induced EMF', 'Halve the induced EMF', 'Have no effect on the EMF'],
          answer: 1,
          hint: 'Recall the N-turn form of Faraday\'s Law: \\(\\mathcal{E} = -N \\, d\\Phi/dt\\).',
          solution: 'By Faraday\'s Law, \\(\\mathcal{E} = -N \\, d\\Phi/dt\\). Doubling N doubles the EMF. The flux through each turn stays the same, but the total EMF is N times the per-turn EMF.'
        },
        {
          id: 'ch12-ex10',
          type: 'numeric',
          question: 'A 500-turn coil of area 0.01 m\\(^2\\) rotates from \\(\\theta = 0^\\circ\\) to \\(\\theta = 180^\\circ\\) in a field of 0.3 T in 0.5 s. Find the average EMF.',
          hint: '\\(\\Delta\\Phi = BA(\\cos 180^\\circ - \\cos 0^\\circ)\\).',
          solution: '\\(\\Delta\\Phi = 0.3 \\times 0.01 \\times (\\cos 180^\\circ - \\cos 0^\\circ) = 0.003 \\times (-1 - 1) = -0.006\\;\\text{Wb}\\). \\(|\\mathcal{E}| = 500 \\times 0.006 / 0.5 = 6\\;\\text{V}\\).'
        }
      ]
    },

    // ==================== SECTION 3: Lenz's Law ====================
    {
      id: 'ch12-sec03',
      title: "Lenz's Law",
      content: `
<div class="env-block intuition"><div class="env-title">Nature Opposes Change</div><div class="env-body"><p>Faraday's Law tells us the magnitude of the induced EMF. But which way does the induced current flow? Lenz's Law provides the answer through a beautiful principle: the induced current always flows in the direction that opposes the change that caused it. This is a direct consequence of energy conservation.</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn Lenz's Law, apply it to determine the direction of induced current, and understand its connection to energy conservation.</em></p>

<div class="env-definition">
<strong>Lenz's Law</strong><br>
The direction of the induced current (and the associated induced magnetic field) is such that it <em>opposes</em> the change in magnetic flux that produced it.
<ul>
  <li>If the external flux through a loop is <strong>increasing</strong>, the induced current creates a magnetic field that <strong>opposes</strong> (points opposite to) the external field inside the loop.</li>
  <li>If the external flux through a loop is <strong>decreasing</strong>, the induced current creates a magnetic field in the <strong>same direction</strong> as the external field to try to maintain the flux.</li>
</ul>
</div>

<h3>Applying Lenz's Law: Step by Step</h3>
<ol>
  <li>Determine the direction of the external magnetic field through the loop.</li>
  <li>Determine whether the flux is increasing or decreasing.</li>
  <li>The induced magnetic field opposes the change:
    <ul>
      <li>Flux increasing: induced B points opposite to external B.</li>
      <li>Flux decreasing: induced B points in the same direction as external B.</li>
    </ul>
  </li>
  <li>Use the right-hand rule to find the current direction that produces this induced B: curl the fingers of your right hand in the direction the current flows; your thumb points in the direction of the induced B.</li>
</ol>

<div class="env-example">
<strong>Example: Magnet Approaching a Loop</strong><br>
A bar magnet with its north pole pointing right is moving toward a circular loop. The external field points to the right and is increasing.
<ul>
  <li>Flux is increasing to the right.</li>
  <li>Induced B must point to the left (opposing the increase).</li>
  <li>Right-hand rule: curl fingers so thumb points left, meaning current flows counterclockwise (as seen from the magnet's side).</li>
</ul>
The loop acts like a small magnet with its north pole facing the approaching magnet, repelling it.
</div>

<div class="env-example">
<strong>Example: Magnet Moving Away from a Loop</strong><br>
Now the same magnet moves away. The external flux (to the right) is decreasing.
<ul>
  <li>Induced B must point to the right (opposing the decrease).</li>
  <li>Current flows clockwise (as seen from the magnet's side).</li>
</ul>
The loop's induced north pole now faces the retreating magnet, attracting it, trying to prevent it from leaving.
</div>

<h3>Lenz's Law and Energy Conservation</h3>
<p>Lenz's Law is fundamentally a statement about energy conservation. If the induced current aided the change instead of opposing it, you could get energy for free: a magnet approaching a coil would be pulled in faster, generating more current, which would pull the magnet even faster, in an ever-increasing spiral of free energy. This would violate conservation of energy. Instead, the induced effects always resist the external change, requiring work to be done to maintain the change.</p>

<div class="env-warning">
<strong>Warning:</strong> The induced current opposes the <em>change</em> in flux, not the flux itself. If the flux is large but constant, there is no induced current. If the flux is decreasing, the induced current tries to maintain it, not reduce it further.
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>With Faraday's Law and Lenz's Law in hand, you can now find both the magnitude and direction of the induced EMF. Next, we study a particularly clean case: the motional EMF produced when a conductor slides through a magnetic field.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch12-viz-lenz',
          title: "Lenz's Law Direction Finder",
          description: 'A magnet moves toward or away from a loop. The visualization shows the induced current direction and the induced magnetic field, illustrating how the loop opposes the change.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
            var ctx = viz.ctx;
            var magnetX = -3;
            var prevX = magnetX;
            var direction = 0; // -1 approaching, +1 receding, 0 stationary

            var magDrag = viz.addDraggable('magnet', magnetX, 0, viz.colors.red, 12, function(x) {
              magDrag.x = Math.max(-7, Math.min(1, x));
              magDrag.y = 0;
            });

            function draw() {
              var dx = magDrag.x - prevX;
              if (Math.abs(dx) > 0.01) {
                direction = dx > 0 ? -1 : 1; // positive dx means moving right (approaching), so flux increasing
              } else {
                direction = 0;
              }
              prevX = magDrag.x;
              magnetX = magDrag.x;

              viz.clear();
              var W = viz.width, H = viz.height;

              // Coil at x=2
              var coilSx = viz.toScreen(2, 0)[0];
              ctx.strokeStyle = direction === 0 ? viz.colors.teal : (direction < 0 ? viz.colors.green : viz.colors.orange);
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.ellipse(coilSx, viz.originY, 6, 70, 0, 0, Math.PI * 2);
              ctx.stroke();

              // Bar magnet
              var magSx = viz.toScreen(magnetX, 0)[0];
              var mw = 80, mh = 40;
              ctx.fillStyle = viz.colors.red;
              ctx.fillRect(magSx - mw / 2, viz.originY - mh / 2, mw / 2, mh);
              ctx.fillStyle = viz.colors.blue;
              ctx.fillRect(magSx, viz.originY - mh / 2, mw / 2, mh);
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 16px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
              ctx.fillText('N', magSx - mw / 4, viz.originY);
              ctx.fillText('S', magSx + mw / 4, viz.originY);

              // Induced current direction indicator
              if (direction !== 0) {
                var arrowSign = direction; // -1 means flux increasing (approaching), +1 means flux decreasing
                // When flux increases (magnet approaches), induced current is CCW (from front)
                // Draw arrows around coil
                ctx.strokeStyle = direction < 0 ? viz.colors.green : viz.colors.orange;
                ctx.lineWidth = 2;
                var r = 70;
                // Top arrow
                var ax = coilSx;
                var ay = viz.originY - r;
                ctx.beginPath();
                ctx.moveTo(ax - 10 * arrowSign, ay + 5);
                ctx.lineTo(ax, ay);
                ctx.lineTo(ax - 10 * arrowSign, ay - 5);
                ctx.stroke();
                // Bottom arrow
                ay = viz.originY + r;
                ctx.beginPath();
                ctx.moveTo(ax + 10 * arrowSign, ay + 5);
                ctx.lineTo(ax, ay);
                ctx.lineTo(ax + 10 * arrowSign, ay - 5);
                ctx.stroke();

                // Induced B field arrow (inside coil)
                var ibDir = direction < 0 ? -1 : 1; // opposing: if approaching (flux right increases), induced B points left
                var ibSx = coilSx + ibDir * 40;
                ctx.strokeStyle = viz.colors.purple;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(coilSx - ibDir * 10, viz.originY);
                ctx.lineTo(ibSx, viz.originY);
                ctx.stroke();
                ctx.fillStyle = viz.colors.purple;
                ctx.beginPath();
                ctx.moveTo(ibSx, viz.originY);
                ctx.lineTo(ibSx - ibDir * 8, viz.originY - 5);
                ctx.lineTo(ibSx - ibDir * 8, viz.originY + 5);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = viz.colors.purple;
                ctx.font = '12px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Induced B', coilSx + ibDir * 20, viz.originY - 18);
              }

              // Labels
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              if (direction < 0) {
                ctx.fillText('Magnet approaching: flux increasing', W / 2, 25);
                ctx.fillStyle = viz.colors.green;
                ctx.fillText('Induced current opposes increase (repels magnet)', W / 2, H - 25);
              } else if (direction > 0) {
                ctx.fillText('Magnet receding: flux decreasing', W / 2, 25);
                ctx.fillStyle = viz.colors.orange;
                ctx.fillText('Induced current opposes decrease (attracts magnet)', W / 2, H - 25);
              } else {
                ctx.fillText('Magnet stationary: no change in flux', W / 2, 25);
                ctx.fillStyle = viz.colors.text;
                ctx.fillText('No induced current', W / 2, H - 25);
              }

              ctx.fillStyle = viz.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText('Drag the magnet left or right', W / 2, H - 8);

              viz.drawDraggables();
            }

            viz.animate(function() { draw(); });
          }
        }
      ],
      exercises: [
        {
          id: 'ch12-ex11',
          type: 'mc',
          question: 'A north pole of a bar magnet is pushed toward a conducting loop. The induced current in the loop (as seen from the magnet side) flows:',
          options: ['Clockwise', 'Counterclockwise', 'There is no induced current', 'It depends on the speed of the magnet'],
          answer: 1,
          hint: 'The flux through the loop is increasing. By Lenz\'s Law, the induced current must create a field opposing this increase. Use the right-hand rule.',
          solution: 'As the north pole approaches, flux to the right increases. By Lenz\'s Law, the induced B points left (opposing the increase). By the right-hand rule, this requires counterclockwise current (as viewed from the magnet side).'
        },
        {
          id: 'ch12-ex12',
          type: 'mc',
          question: 'A south pole of a magnet is pulled away from a coil. As seen from the magnet side, the induced current flows:',
          options: ['Clockwise (loop acts as S pole toward magnet)', 'Counterclockwise (loop acts as N pole toward magnet)', 'Clockwise (loop acts as N pole toward magnet)', 'Counterclockwise (loop acts as S pole toward magnet)'],
          answer: 0,
          hint: 'The south pole points toward the loop, so B inside the loop points away from the magnet (into the loop from the magnet side). As the magnet recedes, this flux decreases.',
          solution: 'The S pole faces the loop, so B points from the loop toward the magnet (leftward). As the magnet recedes, leftward flux decreases. The induced current must maintain it by creating leftward B. By the right-hand rule, this means clockwise current (as seen from the magnet). The loop face nearest the magnet becomes a south pole, attracting the retreating magnet.'
        },
        {
          id: 'ch12-ex13',
          type: 'mc',
          question: 'Why can we not violate energy conservation using electromagnetic induction?',
          options: ['Because the resistance of the wire is always infinite', 'Because the induced current always opposes the change that caused it, requiring external work', 'Because magnetic fields cannot do work', 'Because flux can only increase, never decrease'],
          answer: 1,
          hint: 'Think about what would happen if the induced current aided the change instead of opposing it.',
          solution: 'By Lenz\'s Law, the induced current opposes the change in flux. This means external work is needed to continue changing the flux (e.g., to push the magnet toward the coil against the repulsive force). Energy is conserved because the mechanical work done equals the electrical energy produced plus losses.'
        },
        {
          id: 'ch12-ex14',
          type: 'mc',
          question: 'A conducting ring falls through a region where a uniform magnetic field points horizontally to the right. As the ring enters the field from above (top half in the field, bottom half below), the current in the ring:',
          options: ['Flows clockwise (viewed from the right)', 'Flows counterclockwise (viewed from the right)', 'Is zero because the field is uniform', 'Flows back and forth rapidly'],
          answer: 1,
          hint: 'As the ring enters the field, the flux through it is increasing. The induced current must oppose this increase.',
          solution: 'As the ring enters the region of the field, the rightward flux through the ring increases. By Lenz\'s Law, the induced current must create a leftward field inside the ring, which requires counterclockwise current (viewed from the right). This also creates a magnetic braking force that slows the ring\'s descent.'
        },
        {
          id: 'ch12-ex15',
          type: 'mc',
          question: 'An aluminum ring is dropped over a vertical bar magnet (north pole on top). As it falls past the north pole, it slows down because:',
          options: ['Gravity is weaker near magnets', 'The induced current creates a magnetic field that repels the ring from the magnet', 'The aluminum becomes permanently magnetized', 'The ring heats up and expands, getting stuck'],
          answer: 1,
          hint: 'Consider the changing flux through the ring as it falls and what Lenz\'s Law predicts.',
          solution: 'As the ring falls past the north pole, the upward flux through the ring changes. Lenz\'s Law dictates that the induced current opposes this change, creating a force that opposes the ring\'s motion (magnetic braking). This force acts upward, slowing the ring\'s fall.'
        }
      ]
    },

    // ==================== SECTION 4: Motional EMF ====================
    {
      id: 'ch12-sec04',
      title: 'Motional EMF',
      content: `
<div class="env-block intuition"><div class="env-title">A Conductor in Motion</div><div class="env-body"><p>One of the most concrete ways to change the magnetic flux through a circuit is to change the area. If part of a circuit is a conductor that slides through a magnetic field, the area enclosed by the circuit changes, and an EMF is induced. This is called a motional EMF, and it provides a direct, mechanical picture of electromagnetic induction.</p></div></div>
<p class="section-roadmap"><em>In this section, you will derive the motional EMF formula, analyze the sliding rail problem, and connect motional EMF to the force on charges in a moving conductor.</em></p>

<h3>The Sliding Rail Setup</h3>
<p>Consider two parallel horizontal rails separated by a distance \\(L\\), connected at one end by a resistor \\(R\\). A conducting bar slides along the rails with velocity \\(v\\) in a uniform magnetic field \\(B\\) that points perpendicularly into the page.</p>
<p>As the bar moves, the area of the circuit increases, so the flux changes:</p>
\\[ \\Phi = B \\cdot A = B \\cdot L \\cdot x \\]
where \\(x\\) is the position of the bar. The rate of change of flux is:
\\[ \\frac{d\\Phi}{dt} = BL\\frac{dx}{dt} = BLv \\]

<div class="env-definition">
<strong>Motional EMF</strong><br>
When a straight conductor of length \\(L\\) moves with velocity \\(v\\) perpendicular to a uniform magnetic field \\(B\\), the induced EMF is:
\\[ \\mathcal{E} = BLv \\]
The direction of the induced current is given by Lenz's Law or, equivalently, by the force on positive charges in the moving conductor (\\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\)).
</div>

<h3>Microscopic Picture: Force on Charges</h3>
<p>Why does a moving conductor develop an EMF? When the bar moves to the right with velocity \\(v\\) in a field \\(B\\) pointing into the page, every positive charge in the bar experiences a magnetic force:</p>
\\[ \\vec{F} = q\\vec{v} \\times \\vec{B} \\]
<p>This force pushes positive charges upward along the bar (and negative charges downward). The charge separation creates a potential difference across the bar, which is the motional EMF.</p>

<div class="env-example">
<strong>Example: Sliding Rail</strong><br>
A bar slides at \\(v = 5\\;\\text{m/s}\\) along rails separated by \\(L = 0.4\\;\\text{m}\\) in a field \\(B = 0.3\\;\\text{T}\\). A resistor \\(R = 2\\;\\Omega\\) connects the rails.
\\[ \\mathcal{E} = BLv = 0.3 \\times 0.4 \\times 5 = 0.6\\;\\text{V} \\]
\\[ I = \\frac{\\mathcal{E}}{R} = \\frac{0.6}{2} = 0.3\\;\\text{A} \\]
\\[ P = \\mathcal{E} \\times I = 0.6 \\times 0.3 = 0.18\\;\\text{W} \\]
This power dissipated in the resistor equals the mechanical power needed to push the bar against the magnetic braking force.
</div>

<h3>Force on the Sliding Bar</h3>
<p>The current-carrying bar in the magnetic field experiences a force (from \\(\\vec{F} = IL \\times \\vec{B}\\)) that opposes its motion (Lenz's Law). This braking force is:</p>
\\[ F_{\\text{brake}} = BIL = B \\cdot \\frac{BLv}{R} \\cdot L = \\frac{B^2L^2v}{R} \\]
<p>To maintain constant velocity, an external force equal to \\(F_{\\text{brake}}\\) must be applied. The mechanical power equals the electrical power dissipated:</p>
\\[ P_{\\text{mech}} = F_{\\text{brake}} \\cdot v = \\frac{B^2L^2v^2}{R} = \\frac{\\mathcal{E}^2}{R} = P_{\\text{elec}} \\]

<div class="env-remark">
<strong>Remark:</strong> This energy balance confirms that motional EMF obeys conservation of energy. Mechanical work is converted into electrical energy and then into heat in the resistor.
</div>

<div class="env-warning">
<strong>Warning:</strong> The formula \\(\\mathcal{E} = BLv\\) applies only when \\(v\\), \\(B\\), and \\(L\\) are mutually perpendicular. If they are not, you must use the component of velocity perpendicular to both \\(B\\) and \\(L\\).
</div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>Motional EMF gives a beautiful connection between mechanics and electromagnetism. In the final section, we explore what happens when a changing current in a coil induces an EMF in that same coil: self-inductance.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch12-viz-motional',
          title: 'Sliding Rail EMF Generator',
          description: 'A conducting bar slides along two parallel rails in a magnetic field. Adjust the velocity and see the induced EMF, current, and braking force.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 100, originY: 340});
            var velocity = 3;
            var B = 0.5;
            var L = 0.4;
            var R = 2;
            var barX = 2;
            var running = true;

            VizEngine.createSlider(controls, 'v (m/s)', 0, 8, 3, 0.5, function(v) { velocity = v; });
            VizEngine.createSlider(controls, 'B (T)', 0.1, 1, 0.5, 0.1, function(v) { B = v; });
            VizEngine.createSlider(controls, 'R (\u03A9)', 0.5, 10, 2, 0.5, function(v) { R = v; });
            VizEngine.createButton(controls, 'Reset', function() { barX = 2; });

            function draw(ts) {
              if (running && velocity > 0) {
                barX += velocity * 0.005;
                if (barX > 12) barX = 2;
              }

              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;

              // Rails
              var railY1 = 80, railY2 = 250;
              var railLeft = 60, railRight = W - 30;
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(railLeft, railY1); ctx.lineTo(railRight, railY1);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(railLeft, railY2); ctx.lineTo(railRight, railY2);
              ctx.stroke();

              // Resistor at left end
              viz.drawResistor(railLeft, railY1, railLeft, railY2, viz.colors.orange);
              ctx.fillStyle = viz.colors.orange;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText('R = ' + R.toFixed(1) + ' \u03A9', railLeft - 10, (railY1 + railY2) / 2);

              // Sliding bar
              var barSx = railLeft + (barX / 14) * (railRight - railLeft);
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 5;
              ctx.beginPath();
              ctx.moveTo(barSx, railY1);
              ctx.lineTo(barSx, railY2);
              ctx.stroke();

              // Velocity arrow on bar
              if (velocity > 0) {
                var arrowLen = velocity * 8;
                ctx.strokeStyle = viz.colors.green;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(barSx, (railY1 + railY2) / 2);
                ctx.lineTo(barSx + arrowLen, (railY1 + railY2) / 2);
                ctx.stroke();
                ctx.fillStyle = viz.colors.green;
                ctx.beginPath();
                ctx.moveTo(barSx + arrowLen, (railY1 + railY2) / 2);
                ctx.lineTo(barSx + arrowLen - 8, (railY1 + railY2) / 2 - 5);
                ctx.lineTo(barSx + arrowLen - 8, (railY1 + railY2) / 2 + 5);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 13px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('v', barSx + arrowLen / 2, (railY1 + railY2) / 2 - 12);
              }

              // B field crosses (into page)
              ctx.fillStyle = viz.colors.yellow + '55';
              ctx.font = '16px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
              for (var bx = railLeft + 30; bx < railRight - 20; bx += 40) {
                for (var by = railY1 + 25; by < railY2 - 10; by += 35) {
                  ctx.fillText('\u2297', bx, by);
                }
              }

              // Labels for B direction
              ctx.fillStyle = viz.colors.yellow;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('B (into page)', W / 2, railY1 - 15);

              // L label
              ctx.fillStyle = viz.colors.text;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.save();
              ctx.translate(barSx + 20, (railY1 + railY2) / 2);
              ctx.rotate(-Math.PI / 2);
              ctx.fillText('L = ' + L.toFixed(1) + ' m', 0, 0);
              ctx.restore();

              // Shaded area representing flux region
              ctx.fillStyle = viz.colors.blue + '11';
              ctx.fillRect(railLeft, railY1, barSx - railLeft, railY2 - railY1);

              // Current direction arrows (if velocity > 0)
              var emf = B * L * velocity;
              var current = emf / R;
              if (velocity > 0 && current > 0.01) {
                ctx.strokeStyle = viz.colors.teal;
                ctx.lineWidth = 1.5;
                // Top rail: current flows left (by Lenz's law with B into page, bar moving right)
                var arrowY1 = railY1 - 8;
                ctx.beginPath();
                ctx.moveTo(barSx - 20, arrowY1);
                ctx.lineTo(railLeft + 40, arrowY1);
                ctx.stroke();
                ctx.fillStyle = viz.colors.teal;
                ctx.beginPath();
                ctx.moveTo(railLeft + 40, arrowY1);
                ctx.lineTo(railLeft + 48, arrowY1 - 4);
                ctx.lineTo(railLeft + 48, arrowY1 + 4);
                ctx.closePath();
                ctx.fill();

                // Bottom rail: current flows right
                var arrowY2 = railY2 + 8;
                ctx.beginPath();
                ctx.moveTo(railLeft + 40, arrowY2);
                ctx.lineTo(barSx - 20, arrowY2);
                ctx.stroke();
                ctx.fillStyle = viz.colors.teal;
                ctx.beginPath();
                ctx.moveTo(barSx - 20, arrowY2);
                ctx.lineTo(barSx - 28, arrowY2 - 4);
                ctx.lineTo(barSx - 28, arrowY2 + 4);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = viz.colors.teal;
                ctx.font = '11px -apple-system,sans-serif';
                ctx.fillText('I', (barSx + railLeft) / 2, arrowY1 - 8);
              }

              // Readouts
              var power = emf * current;
              var fBrake = B * current * L;
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('EMF = BLv = ' + emf.toFixed(3) + ' V', W / 2, railY2 + 40);
              ctx.fillText('I = ' + current.toFixed(3) + ' A     P = ' + power.toFixed(3) + ' W     F(brake) = ' + fBrake.toFixed(3) + ' N', W / 2, railY2 + 60);
            }

            viz.animate(function(ts) { draw(ts); });
          }
        }
      ],
      exercises: [
        {
          id: 'ch12-ex16',
          type: 'numeric',
          question: 'A 0.5 m long conducting bar moves at 4 m/s perpendicular to a 0.6 T magnetic field. What is the motional EMF?',
          hint: 'Use \\(\\mathcal{E} = BLv\\).',
          solution: '\\(\\mathcal{E} = BLv = 0.6 \\times 0.5 \\times 4 = 1.2\\;\\text{V}\\).'
        },
        {
          id: 'ch12-ex17',
          type: 'numeric',
          question: 'In the sliding rail setup, \\(B = 0.4\\) T, \\(L = 0.3\\) m, \\(v = 6\\) m/s, and \\(R = 3\\;\\Omega\\). Find the current in the circuit.',
          hint: 'First find EMF = BLv, then use I = EMF/R.',
          solution: '\\(\\mathcal{E} = 0.4 \\times 0.3 \\times 6 = 0.72\\;\\text{V}\\). \\(I = 0.72 / 3 = 0.24\\;\\text{A}\\).'
        },
        {
          id: 'ch12-ex18',
          type: 'numeric',
          question: 'For the same setup as above, find the braking force on the bar.',
          hint: 'The braking force is \\(F = BIL\\) or equivalently \\(F = B^2L^2v/R\\).',
          solution: '\\(F = BIL = 0.4 \\times 0.24 \\times 0.3 = 0.0288\\;\\text{N}\\). Alternatively, \\(F = B^2L^2v/R = 0.16 \\times 0.09 \\times 6 / 3 = 0.0288\\;\\text{N}\\).'
        },
        {
          id: 'ch12-ex19',
          type: 'mc',
          question: 'If the velocity of the sliding bar is doubled, the power dissipated in the resistor:',
          options: ['Doubles', 'Quadruples', 'Stays the same', 'Increases by a factor of 8'],
          answer: 1,
          hint: 'Express power in terms of v: \\(P = \\mathcal{E}^2/R = (BLv)^2/R\\).',
          solution: '\\(P = (BLv)^2/R = B^2L^2v^2/R\\). Doubling v gives \\(P\' = B^2L^2(2v)^2/R = 4B^2L^2v^2/R = 4P\\). The power quadruples.'
        },
        {
          id: 'ch12-ex20',
          type: 'numeric',
          question: 'An airplane with a wingspan of 30 m flies at 250 m/s through Earth\'s magnetic field (vertical component \\(B = 5 \\times 10^{-5}\\) T). What is the EMF between the wingtips?',
          hint: 'The wingspan acts as the moving conductor of length L in the vertical component of Earth\'s field.',
          solution: '\\(\\mathcal{E} = BLv = 5 \\times 10^{-5} \\times 30 \\times 250 = 0.375\\;\\text{V}\\).'
        }
      ]
    },

    // ==================== SECTION 5: Self-Inductance ====================
    {
      id: 'ch12-sec05',
      title: 'Self-Inductance',
      content: `
<div class="env-block intuition"><div class="env-title">A Coil's Resistance to Change</div><div class="env-body"><p>We have seen that a changing magnetic flux through a loop induces an EMF. But what if the changing flux is created by the loop itself? When the current through a coil changes, the magnetic field it produces also changes, and this changing field induces an EMF in the very coil that created it. This phenomenon, called self-inductance, gives coils a kind of "electrical inertia."</p></div></div>
<p class="section-roadmap"><em>In this section, you will learn about self-inductance, the inductor as a circuit element, and the energy stored in an inductor's magnetic field.</em></p>

<div class="env-definition">
<strong>Self-Inductance</strong><br>
When current \\(I\\) flows through a coil, it creates a magnetic flux \\(\\Phi\\) through the coil. The <em>self-inductance</em> \\(L\\) (also called inductance) is defined as:
\\[ L = \\frac{N\\Phi}{I} \\]
where \\(N\\) is the number of turns and \\(\\Phi\\) is the flux through each turn. The SI unit is the <strong>henry</strong> (H), where \\(1\\;\\text{H} = 1\\;\\text{Wb/A}\\).
</div>

<h3>Self-Induced EMF</h3>
<p>By Faraday's Law, a changing current \\(I\\) through the coil (and therefore a changing flux) induces an EMF in the coil itself:</p>
\\[ \\mathcal{E}_L = -L\\frac{dI}{dt} \\]
<p>The negative sign means the induced EMF opposes the change in current (Lenz's Law). If the current is increasing, the induced EMF acts to decrease it, and vice versa. This is why inductors resist sudden changes in current.</p>

<div class="env-intuition">
<strong>Intuition: Electrical Inertia</strong><br>
Just as a massive object resists changes in velocity (inertia), an inductor resists changes in current. The inductance L plays the role of mass, and the current I plays the role of velocity. A large inductance means the coil strongly resists any rapid change in current.
</div>

<h3>Inductance of a Solenoid</h3>
<p>A solenoid of length \\(\\ell\\), cross-sectional area \\(A\\), and \\(N\\) turns has inductance:</p>
\\[ L = \\frac{\\mu_0 N^2 A}{\\ell} \\]
<p>where \\(\\mu_0 = 4\\pi \\times 10^{-7}\\;\\text{T}\\cdot\\text{m/A}\\) is the permeability of free space. Notice that L increases with \\(N^2\\), so doubling the turns quadruples the inductance.</p>

<div class="env-example">
<strong>Example: Solenoid Inductance</strong><br>
A solenoid has 500 turns, length 0.2 m, and cross-sectional area 0.001 m\\(^2\\). Find its inductance.
\\[ L = \\frac{(4\\pi \\times 10^{-7})(500)^2(0.001)}{0.2} = \\frac{(4\\pi \\times 10^{-7})(250000)(0.001)}{0.2} \\]
\\[ = \\frac{4\\pi \\times 10^{-7} \\times 250}{0.2} = \\frac{\\pi \\times 10^{-4}}{0.2} \\approx 1.57 \\times 10^{-3}\\;\\text{H} = 1.57\\;\\text{mH} \\]
</div>

<h3>Energy Stored in an Inductor</h3>
<p>When current flows through an inductor, energy is stored in its magnetic field. The energy stored is:</p>

<div class="env-definition">
<strong>Magnetic Energy in an Inductor</strong><br>
\\[ E = \\frac{1}{2}LI^2 \\]
This is analogous to kinetic energy \\(\\frac{1}{2}mv^2\\), with inductance L replacing mass and current I replacing velocity.
</div>

<div class="env-example">
<strong>Example: Energy Stored</strong><br>
An inductor with \\(L = 0.1\\;\\text{H}\\) carries a current of \\(2\\;\\text{A}\\). The energy stored is:
\\[ E = \\frac{1}{2}(0.1)(2)^2 = \\frac{1}{2}(0.1)(4) = 0.2\\;\\text{J} \\]
</div>

<h3>Inductors in Circuits</h3>
<p>In a circuit, an inductor opposes sudden changes in current:</p>
<ul>
  <li>When a circuit with an inductor is first switched on, the inductor initially acts like an open circuit (opposes the sudden rise in current). The current gradually increases.</li>
  <li>When the circuit is switched off, the inductor tries to maintain the current, sometimes producing a large voltage spike (back-EMF).</li>
</ul>

<div class="env-warning">
<strong>Warning:</strong> The voltage spike produced when an inductor's current is suddenly interrupted can be dangerously large. This is why circuits with inductors often include a "flyback diode" to provide a safe path for the current to decay.
</div>

<div class="env-block intuition"><div class="env-title">Chapter Summary</div><div class="env-body"><p>In this chapter, you explored electromagnetic induction from five perspectives: magnetic flux as the fundamental quantity, Faraday's Law relating changing flux to induced EMF, Lenz's Law determining the direction of induced current, motional EMF in moving conductors, and self-inductance in coils. These ideas underpin generators, transformers, and modern electronics. In the next chapter, we apply them to alternating current circuits.</p></div></div>
      `,
      visualizations: [
        {
          id: 'ch12-viz-inductor',
          title: 'Inductor Energy Storage',
          description: 'Adjust the inductance and current to see the energy stored in the inductor. The bar chart compares the energy for different values.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
            var L = 0.1;
            var I = 2;

            VizEngine.createSlider(controls, 'L (H)', 0.01, 1, 0.1, 0.01, function(v) { L = v; draw(); });
            VizEngine.createSlider(controls, 'I (A)', 0, 5, 2, 0.1, function(v) { I = v; draw(); });

            function draw() {
              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;
              var E = 0.5 * L * I * I;

              // Draw inductor symbol (coil)
              var cx = W / 2, cy = 80;
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(cx - 100, cy);
              ctx.lineTo(cx - 70, cy);
              ctx.stroke();
              // Coil loops
              for (var i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(cx - 60 + i * 30, cy, 10, Math.PI, 0);
                ctx.stroke();
              }
              ctx.beginPath();
              ctx.moveTo(cx + 90, cy);
              ctx.lineTo(cx + 100, cy);
              ctx.stroke();

              // Current arrow
              if (I > 0.05) {
                ctx.strokeStyle = viz.colors.green;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx - 120, cy - 15);
                ctx.lineTo(cx - 85, cy - 15);
                ctx.stroke();
                ctx.fillStyle = viz.colors.green;
                ctx.beginPath();
                ctx.moveTo(cx - 85, cy - 15);
                ctx.lineTo(cx - 93, cy - 20);
                ctx.lineTo(cx - 93, cy - 10);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = viz.colors.green;
                ctx.font = '13px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('I = ' + I.toFixed(1) + ' A', cx - 102, cy - 25);
              }

              // Energy bar
              var maxE = 0.5 * 1 * 25; // max L=1, max I=5
              var barMaxH = 180;
              var barH = Math.min((E / maxE) * barMaxH, barMaxH);
              var barW = 120;
              var barX = cx - barW / 2;
              var barBot = H - 50;

              // Background bar
              ctx.fillStyle = viz.colors.grid;
              ctx.fillRect(barX, barBot - barMaxH, barW, barMaxH);

              // Energy bar
              var gradient = ctx.createLinearGradient(barX, barBot - barH, barX, barBot);
              gradient.addColorStop(0, viz.colors.purple);
              gradient.addColorStop(1, viz.colors.blue);
              ctx.fillStyle = gradient;
              ctx.fillRect(barX, barBot - barH, barW, barH);

              // Border
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 1;
              ctx.strokeRect(barX, barBot - barMaxH, barW, barMaxH);

              // Energy label
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 16px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('E = \u00BDLI\u00B2 = ' + E.toFixed(3) + ' J', cx, barBot + 25);

              // Parameter display
              ctx.fillStyle = viz.colors.text;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.fillText('L = ' + L.toFixed(2) + ' H', cx - 140, barBot - barMaxH / 2);
              ctx.fillText('I = ' + I.toFixed(1) + ' A', cx + 140, barBot - barMaxH / 2);

              // Analogy note
              ctx.fillStyle = viz.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText('Analogous to KE = \u00BDmv\u00B2 (L \u2194 m, I \u2194 v)', cx, barBot + 45);
            }
            draw();
          }
        },
        {
          id: 'ch12-viz-rl-circuit',
          title: 'RL Circuit: Current Growth and Decay',
          description: 'Toggle the switch to see how current grows and decays in an RL circuit. The inductor opposes sudden changes in current.',
          setup: function(body, controls) {
            var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 100, originY: 300});
            var L = 0.5;
            var R = 2;
            var V = 10;
            var switchOn = false;
            var t = 0;
            var current = 0;
            var dt = 0.016;

            VizEngine.createSlider(controls, 'L (H)', 0.1, 2, 0.5, 0.1, function(v) { L = v; });
            VizEngine.createSlider(controls, 'R (\u03A9)', 0.5, 10, 2, 0.5, function(v) { R = v; });
            VizEngine.createButton(controls, 'Toggle Switch', function() {
              switchOn = !switchOn;
              t = 0;
            });

            function draw() {
              t += dt;
              var tau = L / R;
              var Imax = V / R;
              if (switchOn) {
                current = Imax * (1 - Math.exp(-t / tau));
              } else {
                current = current * Math.exp(-dt / tau);
                if (current < 0.001) current = 0;
              }

              viz.clear();
              var ctx = viz.ctx;
              var W = viz.width, H = viz.height;

              // Circuit diagram (simplified)
              var x1 = 100, y1 = 60, x2 = 600, y2 = 60;
              var y3 = 260;

              // Top wire
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(x1, y1); ctx.lineTo(x2, y1);
              ctx.stroke();
              // Right wire
              ctx.beginPath();
              ctx.moveTo(x2, y1); ctx.lineTo(x2, y3);
              ctx.stroke();
              // Bottom wire
              ctx.beginPath();
              ctx.moveTo(x2, y3); ctx.lineTo(x1, y3);
              ctx.stroke();
              // Left wire
              ctx.beginPath();
              ctx.moveTo(x1, y3); ctx.lineTo(x1, y1);
              ctx.stroke();

              // Battery
              var bx = x1, by = (y1 + y3) / 2;
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(bx - 8, by - 15); ctx.lineTo(bx - 8, by + 15);
              ctx.stroke();
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(bx + 4, by - 8); ctx.lineTo(bx + 4, by + 8);
              ctx.stroke();
              ctx.fillStyle = viz.colors.orange;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText(V + ' V', bx - 16, by + 4);

              // Switch (top-left)
              var sw1 = 180, sw2 = 240;
              ctx.strokeStyle = switchOn ? viz.colors.green : viz.colors.red;
              ctx.lineWidth = 2;
              if (switchOn) {
                ctx.beginPath();
                ctx.moveTo(sw1, y1); ctx.lineTo(sw2, y1);
                ctx.stroke();
              } else {
                ctx.beginPath();
                ctx.moveTo(sw1, y1); ctx.lineTo(sw2, y1 - 20);
                ctx.stroke();
              }
              ctx.fillStyle = viz.colors.white;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(switchOn ? 'ON' : 'OFF', (sw1 + sw2) / 2, y1 - 25);

              // Resistor (top section)
              viz.drawResistor(360, y1, 460, y1, viz.colors.orange);
              ctx.fillStyle = viz.colors.orange;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('R = ' + R.toFixed(1) + ' \u03A9', 410, y1 - 15);

              // Inductor (right side)
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 2;
              for (var i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.arc(x2, 110 + i * 30, 12, -Math.PI / 2, Math.PI / 2);
                ctx.stroke();
              }
              ctx.fillStyle = viz.colors.teal;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('L = ' + L.toFixed(1) + ' H', x2 + 18, 160);

              // Current arrow
              if (current > 0.01) {
                var arrowSize = Math.min(current / Imax, 1) * 30 + 10;
                ctx.strokeStyle = viz.colors.green;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(300, y3 + 15);
                ctx.lineTo(300 + arrowSize, y3 + 15);
                ctx.stroke();
                ctx.fillStyle = viz.colors.green;
                ctx.beginPath();
                ctx.moveTo(300 + arrowSize, y3 + 15);
                ctx.lineTo(300 + arrowSize - 8, y3 + 10);
                ctx.lineTo(300 + arrowSize - 8, y3 + 20);
                ctx.closePath();
                ctx.fill();
              }

              // Readouts
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('I = ' + current.toFixed(3) + ' A', W / 2, y3 + 45);
              ctx.fillText('\u03C4 = L/R = ' + tau.toFixed(3) + ' s', W / 2, y3 + 65);
              ctx.fillStyle = viz.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText('I(max) = V/R = ' + Imax.toFixed(1) + ' A', W / 2, y3 + 85);
            }

            viz.animate(function() { draw(); });
          }
        }
      ],
      exercises: [
        {
          id: 'ch12-ex21',
          type: 'numeric',
          question: 'An inductor has \\(L = 0.2\\) H and carries a current of 3 A. How much energy is stored in its magnetic field?',
          hint: 'Use \\(E = \\frac{1}{2}LI^2\\).',
          solution: '\\(E = \\frac{1}{2}(0.2)(3)^2 = \\frac{1}{2}(0.2)(9) = 0.9\\;\\text{J}\\).'
        },
        {
          id: 'ch12-ex22',
          type: 'numeric',
          question: 'The current through a 0.5 H inductor changes from 2 A to 5 A in 0.01 s. What is the magnitude of the self-induced EMF?',
          hint: 'Use \\(|\\mathcal{E}_L| = L|dI/dt|\\).',
          solution: '\\(|\\mathcal{E}_L| = L \\times |\\Delta I / \\Delta t| = 0.5 \\times |5 - 2| / 0.01 = 0.5 \\times 300 = 150\\;\\text{V}\\).'
        },
        {
          id: 'ch12-ex23',
          type: 'mc',
          question: 'When the switch in an RL circuit is first closed, the current:',
          options: ['Jumps immediately to V/R', 'Starts at zero and gradually increases toward V/R', 'Starts at V/R and gradually decreases', 'Oscillates between 0 and V/R'],
          answer: 1,
          hint: 'The inductor opposes sudden changes in current. What happens when you try to suddenly change I from 0?',
          solution: 'The inductor opposes the sudden rise in current by producing a back-EMF. The current starts at zero and exponentially approaches \\(V/R\\) with time constant \\(\\tau = L/R\\): \\(I(t) = \\frac{V}{R}(1 - e^{-t/\\tau})\\).'
        },
        {
          id: 'ch12-ex24',
          type: 'numeric',
          question: 'A solenoid has 1000 turns, length 0.5 m, and cross-sectional area 0.002 m\\(^2\\). Find its inductance in mH. (Use \\(\\mu_0 = 4\\pi \\times 10^{-7}\\;\\text{H/m}\\), \\(\\pi = 3.14\\))',
          hint: 'Use \\(L = \\mu_0 N^2 A / \\ell\\).',
          solution: '\\(L = \\frac{4\\pi \\times 10^{-7} \\times (1000)^2 \\times 0.002}{0.5} = \\frac{4 \\times 3.14 \\times 10^{-7} \\times 10^6 \\times 0.002}{0.5} = \\frac{4 \\times 3.14 \\times 0.002}{5} \\times 10^{-1} = \\frac{0.02512}{0.5} = 0.005024\\;\\text{H} \\approx 5.03\\;\\text{mH}\\).'
        },
        {
          id: 'ch12-ex25',
          type: 'mc',
          question: 'If the current through an inductor is constant, the voltage across the inductor is:',
          options: ['Equal to \\(LI\\)', 'Equal to \\(\\frac{1}{2}LI^2\\)', 'Zero', 'Equal to \\(L/R\\)'],
          answer: 2,
          hint: 'The self-induced EMF depends on \\(dI/dt\\).',
          solution: 'Since \\(\\mathcal{E}_L = -L \\, dI/dt\\) and \\(dI/dt = 0\\) when the current is constant, the voltage across the inductor is zero. A steady current through an ideal inductor produces no voltage drop.'
        }
      ]
    }
  ]
});
