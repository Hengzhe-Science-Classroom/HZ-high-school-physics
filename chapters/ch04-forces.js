window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch04',
  number: 4,
  title: 'Forces',
  subtitle: 'Interactions Between Objects',
  sections: [

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 1: What Is a Force?
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec01',
      title: 'What Is a Force?',
      content: `
<div class="env-block intuition"><div class="env-title">From Motion to Interaction</div><div class="env-body"><p>In the previous chapters you learned how to describe motion with quantities like displacement, velocity, and acceleration. Now we ask a deeper question: what <em>causes</em> motion to change? The answer is force, the concept at the heart of mechanics. A force is not something you can see directly, but you can always observe its effects: a ball changes direction, a spring stretches, a book sits still on a table because forces balance. This chapter gives you the complete toolkit of forces you will encounter throughout high school physics.</p></div></div>

<h2>What Is a Force?</h2>
<p class="section-roadmap"><em>In this section you will learn the definition of force, the types of forces in nature, how forces are represented as vectors, and the principle of superposition.</em></p>

<div class="env-block definition"><div class="env-title">Force</div><div class="env-body"><p>A <strong>force</strong> is an interaction between two objects that can cause an object to accelerate (change its velocity in magnitude or direction). Force is a <strong>vector</strong> quantity, possessing both magnitude and direction.</p></div></div>

<p>The SI unit of force is the <strong>newton</strong> (N). One newton is the force needed to accelerate a 1 kg mass at 1 m/s²:</p>

<div class="formula-box">\\(1\\;\\text{N} = 1\\;\\text{kg}\\cdot\\text{m/s}^2\\)</div>

<h3>Contact vs. Non-Contact Forces</h3>
<p>Forces fall into two broad categories:</p>
<ul>
  <li><strong>Contact forces</strong> require physical touching: friction, normal force, tension, air resistance, applied force.</li>
  <li><strong>Non-contact (field) forces</strong> act at a distance through a field: gravitational force, electric force, magnetic force.</li>
</ul>

<h3>The Four Fundamental Forces</h3>
<p>All forces in nature ultimately arise from four fundamental interactions:</p>
<table class="data-table">
  <thead><tr><th>Force</th><th>Relative Strength</th><th>Range</th><th>Everyday Example</th></tr></thead>
  <tbody>
    <tr><td>Strong nuclear</td><td>1</td><td>~10⁻¹⁵ m</td><td>Holds the nucleus together</td></tr>
    <tr><td>Electromagnetic</td><td>10⁻²</td><td>Infinite</td><td>Friction, tension, normal force</td></tr>
    <tr><td>Weak nuclear</td><td>10⁻⁶</td><td>~10⁻¹⁸ m</td><td>Radioactive decay</td></tr>
    <tr><td>Gravitational</td><td>10⁻³⁹</td><td>Infinite</td><td>Weight, planetary orbits</td></tr>
  </tbody>
</table>

<div class="env-block remark"><div class="env-title">Everyday Forces Are Electromagnetic</div><div class="env-body"><p>Almost every force you feel in daily life (friction, tension, the normal force, spring forces) is electromagnetic in origin. When surfaces push against each other, it is the repulsion between electron clouds of atoms doing the pushing.</p></div></div>

<h3>Forces as Vectors</h3>
<p>Because force is a vector, we can decompose it into components along chosen axes. For a force \\(\\vec{F}\\) at angle \\(\\theta\\) above the positive x-axis:</p>

<div class="formula-box">\\(F_x = F\\cos\\theta, \\qquad F_y = F\\sin\\theta\\)</div>

<h3>Superposition of Forces</h3>
<p>When multiple forces act on an object, the <strong>net force</strong> (resultant) is the vector sum:</p>

<div class="formula-box">\\(\\vec{F}_{\\text{net}} = \\vec{F}_1 + \\vec{F}_2 + \\cdots + \\vec{F}_n\\)</div>

<p>In component form: \\(F_{\\text{net},x} = \\sum F_{ix}\\) and \\(F_{\\text{net},y} = \\sum F_{iy}\\).</p>

<div class="viz-container" id="viz-force-vectors"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>Now that you know forces are vectors that can be added, the next section introduces the most universal force you experience every day: gravity.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-force-vectors',
          title: 'Force Vector Addition',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 30, originX: 310, originY: 300 });
            let f1Mag = 5, f1Ang = 30;
            let f2Mag = 3, f2Ang = 120;

            const s1 = VizEngine.createSlider(container, 'F1 magnitude: ', 0, 8, f1Mag, 0.5, val => { f1Mag = val; draw(); });
            const s2 = VizEngine.createSlider(container, 'F1 angle (deg): ', 0, 360, f1Ang, 5, val => { f1Ang = val; draw(); });
            const s3 = VizEngine.createSlider(container, 'F2 magnitude: ', 0, 8, f2Mag, 0.5, val => { f2Mag = val; draw(); });
            const s4 = VizEngine.createSlider(container, 'F2 angle (deg): ', 0, 360, f2Ang, 5, val => { f2Ang = val; draw(); });

            function draw() {
              v.clear();
              v.drawGrid(2);
              v.drawAxes('x', 'y');

              const a1 = f1Ang * Math.PI / 180;
              const a2 = f2Ang * Math.PI / 180;
              const f1x = f1Mag * Math.cos(a1), f1y = f1Mag * Math.sin(a1);
              const f2x = f2Mag * Math.cos(a2), f2y = f2Mag * Math.sin(a2);
              const rx = f1x + f2x, ry = f1y + f2y;
              const rMag = Math.sqrt(rx * rx + ry * ry);

              // Draw F1
              v.drawVector(0, 0, f1x, f1y, v.colors.blue, 'F1', 2.5);
              // Draw F2
              v.drawVector(0, 0, f2x, f2y, v.colors.orange, 'F2', 2.5);
              // Draw F2 shifted (parallelogram)
              v.drawSegment(f1x, f1y, f1x + f2x, f1y + f2y, v.colors.orange + '55', 1, true);
              v.drawSegment(f2x, f2y, f1x + f2x, f1y + f2y, v.colors.blue + '55', 1, true);
              // Draw resultant
              if (rMag > 0.1) {
                v.drawVector(0, 0, rx, ry, v.colors.green, 'R', 3);
              }

              // Info
              v.screenText('F1 = ' + f1Mag.toFixed(1) + ' N at ' + f1Ang.toFixed(0) + '\u00B0', 10, 20, v.colors.blue, 13, 'left');
              v.screenText('F2 = ' + f2Mag.toFixed(1) + ' N at ' + f2Ang.toFixed(0) + '\u00B0', 10, 38, v.colors.orange, 13, 'left');
              v.screenText('R = ' + rMag.toFixed(2) + ' N', 10, 56, v.colors.green, 13, 'left');
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch04-s1-q1',
          type: 'mc',
          question: 'Which of the following is a non-contact force?',
          options: ['Friction', 'Tension', 'Gravitational force', 'Normal force'],
          answer: 2,
          explanation: 'Gravitational force acts at a distance through the gravitational field, without physical contact between objects.'
        },
        {
          id: 'ch04-s1-q2',
          type: 'mc',
          question: 'The SI unit of force is:',
          options: ['kg', 'J', 'N', 'Pa'],
          answer: 2,
          explanation: 'The newton (N) is the SI unit of force, defined as 1 N = 1 kg m/s\u00B2.'
        },
        {
          id: 'ch04-s1-q3',
          type: 'mc',
          question: 'Two forces act on an object: F1 = 5 N east and F2 = 5 N north. What is the magnitude of the net force?',
          options: ['0 N', '5 N', '7.07 N', '10 N'],
          answer: 2,
          explanation: 'The resultant magnitude is sqrt(5\u00B2 + 5\u00B2) = sqrt(50) = 7.07 N, directed northeast at 45\u00B0.'
        },
        {
          id: 'ch04-s1-q4',
          type: 'mc',
          question: 'A force of 10 N acts at 60 degrees above the horizontal. What is its horizontal component?',
          options: ['5.0 N', '8.66 N', '10.0 N', '7.07 N'],
          answer: 0,
          explanation: 'The horizontal component is F cos(60\u00B0) = 10 \u00D7 0.5 = 5.0 N.'
        },
        {
          id: 'ch04-s1-q5',
          type: 'mc',
          question: 'Which fundamental force is responsible for friction, tension, and normal force at the atomic level?',
          options: ['Gravitational', 'Strong nuclear', 'Electromagnetic', 'Weak nuclear'],
          answer: 2,
          explanation: 'All common contact forces (friction, tension, normal force) originate from electromagnetic interactions between atoms.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 2: Gravity and Weight
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec02',
      title: 'Gravity and Weight',
      content: `
<h2>Gravity and Weight</h2>
<p class="section-roadmap"><em>In this section you will learn about gravitational force near Earth's surface, the distinction between mass and weight, and how gravity varies with location.</em></p>

<div class="env-block definition"><div class="env-title">Gravitational Force (Weight)</div><div class="env-body"><p>The <strong>weight</strong> of an object is the gravitational force exerted on it by the Earth (or another celestial body). Near Earth's surface it is:</p>
<div class="formula-box">\\(W = mg\\)</div>
<p>where \\(m\\) is the mass (kg) and \\(g \\approx 9.8\\;\\text{m/s}^2\\) is the gravitational acceleration at Earth's surface.</p></div></div>

<p>Weight always points straight <strong>downward</strong>, toward the center of the Earth.</p>

<h3>Mass vs. Weight</h3>
<table class="data-table">
  <thead><tr><th>Property</th><th>Mass</th><th>Weight</th></tr></thead>
  <tbody>
    <tr><td>Definition</td><td>Amount of matter</td><td>Gravitational force on matter</td></tr>
    <tr><td>Type</td><td>Scalar</td><td>Vector (downward)</td></tr>
    <tr><td>SI Unit</td><td>kilogram (kg)</td><td>newton (N)</td></tr>
    <tr><td>Location-dependent?</td><td>No</td><td>Yes (varies with g)</td></tr>
    <tr><td>On Moon</td><td>Same</td><td>About 1/6 of Earth value</td></tr>
  </tbody>
</table>

<div class="env-block warning"><div class="env-title">Common Misconception</div><div class="env-body"><p>In everyday language people say "I weigh 60 kg." Strictly, 60 kg is your <em>mass</em>. Your weight on Earth is 60 \u00D7 9.8 = 588 N. On the Moon, your mass is still 60 kg but your weight is only about 98 N.</p></div></div>

<h3>Variation of g</h3>
<p>The gravitational acceleration \\(g\\) is not exactly the same everywhere on Earth:</p>
<ul>
  <li>At the equator: \\(g \\approx 9.78\\;\\text{m/s}^2\\)</li>
  <li>At the poles: \\(g \\approx 9.83\\;\\text{m/s}^2\\)</li>
  <li>At altitude \\(h\\) above the surface: \\(g_h = g_0\\left(\\frac{R}{R+h}\\right)^2\\)</li>
</ul>

<p>For most high school problems, we use \\(g = 9.8\\;\\text{m/s}^2\\) (or sometimes \\(g = 10\\;\\text{m/s}^2\\) for simpler arithmetic).</p>

<h3>Gravitational Acceleration on Other Worlds</h3>
<table class="data-table">
  <thead><tr><th>Body</th><th>g (m/s\u00B2)</th><th>Weight of 60 kg person (N)</th></tr></thead>
  <tbody>
    <tr><td>Earth</td><td>9.8</td><td>588</td></tr>
    <tr><td>Moon</td><td>1.6</td><td>96</td></tr>
    <tr><td>Mars</td><td>3.7</td><td>222</td></tr>
    <tr><td>Jupiter</td><td>24.8</td><td>1488</td></tr>
  </tbody>
</table>

<div class="viz-container" id="viz-weight-explorer"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>Gravity pulls objects downward, but objects resting on surfaces do not fall. Something must push back. The next section introduces the normal force and friction, the two contact forces from surfaces.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-weight-explorer',
          title: 'Weight on Different Worlds',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 380, scale: 30, originX: 310, originY: 100 });

            const worlds = [
              { name: 'Earth', g: 9.8, color: v.colors.blue },
              { name: 'Moon', g: 1.6, color: v.colors.text },
              { name: 'Mars', g: 3.7, color: v.colors.orange },
              { name: 'Jupiter', g: 24.8, color: v.colors.purple }
            ];

            let mass = 5;
            VizEngine.createSlider(container, 'Mass (kg): ', 1, 20, mass, 1, val => { mass = val; draw(); });

            function draw() {
              v.clear();
              v.screenText('Weight = mg on Different Worlds', v.width / 2, 20, v.colors.white, 15);

              const barWidth = 80;
              const spacing = 130;
              const startX = 80;
              const baseY = v.height - 60;
              const maxH = 240;
              const maxW = 20 * 24.8; // max weight for scaling

              const ctx = v.ctx;

              worlds.forEach((w, i) => {
                const weight = mass * w.g;
                const barH = (weight / maxW) * maxH;
                const x = startX + i * spacing;

                // Bar
                ctx.fillStyle = w.color + '99';
                ctx.fillRect(x - barWidth / 2, baseY - barH, barWidth, barH);
                ctx.strokeStyle = w.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(x - barWidth / 2, baseY - barH, barWidth, barH);

                // Weight label
                ctx.fillStyle = v.colors.white;
                ctx.font = 'bold 13px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(weight.toFixed(1) + ' N', x, baseY - barH - 6);

                // World name
                ctx.fillStyle = w.color;
                ctx.font = '13px -apple-system,sans-serif';
                ctx.textBaseline = 'top';
                ctx.fillText(w.name, x, baseY + 8);

                // g value
                ctx.fillStyle = v.colors.text;
                ctx.font = '11px -apple-system,sans-serif';
                ctx.fillText('g = ' + w.g + ' m/s\u00B2', x, baseY + 26);
              });

              // Baseline
              ctx.strokeStyle = v.colors.axis;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(startX - 60, baseY);
              ctx.lineTo(startX + 3 * spacing + 60, baseY);
              ctx.stroke();

              v.screenText('Mass = ' + mass.toFixed(0) + ' kg', v.width / 2, 50, v.colors.teal, 14);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch04-s2-q1',
          type: 'mc',
          question: 'A 3 kg object is on Earth (g = 9.8 m/s\u00B2). What is its weight?',
          options: ['3 N', '9.8 N', '29.4 N', '30 N'],
          answer: 2,
          explanation: 'W = mg = 3 \u00D7 9.8 = 29.4 N.'
        },
        {
          id: 'ch04-s2-q2',
          type: 'mc',
          question: 'An astronaut has a mass of 70 kg. What is her weight on the Moon (g = 1.6 m/s\u00B2)?',
          options: ['70 N', '112 N', '686 N', '43.75 N'],
          answer: 1,
          explanation: 'W = mg = 70 \u00D7 1.6 = 112 N.'
        },
        {
          id: 'ch04-s2-q3',
          type: 'mc',
          question: 'Which quantity does NOT change when you travel from Earth to Mars?',
          options: ['Weight', 'Gravitational acceleration', 'Mass', 'The direction of gravity'],
          answer: 2,
          explanation: 'Mass is an intrinsic property of matter and does not change with location. Weight depends on the local gravitational acceleration.'
        },
        {
          id: 'ch04-s2-q4',
          type: 'mc',
          question: 'At what location on Earth is g slightly larger?',
          options: ['At the equator', 'At the poles', 'At sea level near the equator', 'On a tall mountain'],
          answer: 1,
          explanation: 'g is slightly larger at the poles (~9.83 m/s\u00B2) than at the equator (~9.78 m/s\u00B2) because the Earth is slightly flattened at the poles and the effect of rotation is smallest there.'
        },
        {
          id: 'ch04-s2-q5',
          type: 'mc',
          question: 'An object weighs 49 N on Earth. What is its mass? (Use g = 9.8 m/s\u00B2)',
          options: ['4.9 kg', '5 kg', '49 kg', '490 kg'],
          answer: 1,
          explanation: 'm = W/g = 49/9.8 = 5 kg.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 3: Normal Force and Friction
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec03',
      title: 'Normal Force and Friction',
      content: `
<h2>Normal Force and Friction</h2>
<p class="section-roadmap"><em>In this section you will learn about the normal force, static and kinetic friction, the role of the coefficient of friction, and how to analyze objects on inclined planes.</em></p>

<h3>Normal Force</h3>

<div class="env-block definition"><div class="env-title">Normal Force</div><div class="env-body"><p>The <strong>normal force</strong> \\(\\vec{N}\\) is the contact force exerted by a surface on an object resting on it. It acts <strong>perpendicular</strong> (normal) to the surface and prevents the object from passing through.</p></div></div>

<p>On a horizontal surface with no other vertical forces:</p>
<div class="formula-box">\\(N = mg\\)</div>

<p>On an inclined plane at angle \\(\\theta\\):</p>
<div class="formula-box">\\(N = mg\\cos\\theta\\)</div>

<div class="env-block warning"><div class="env-title">N Is Not Always Equal to mg</div><div class="env-body"><p>When extra forces push down or pull up on the object, \\(N \\neq mg\\). For example, if someone pushes down on a box with force \\(F\\), then \\(N = mg + F\\). Always derive \\(N\\) from the equilibrium condition perpendicular to the surface.</p></div></div>

<h3>Friction</h3>

<div class="env-block definition"><div class="env-title">Friction</div><div class="env-body"><p><strong>Friction</strong> is a contact force that opposes the relative motion (or tendency of motion) between two surfaces. It acts <strong>parallel</strong> to the contact surface.</p></div></div>

<p>There are two types:</p>

<h4>Static Friction</h4>
<p>When an object is <em>not sliding</em>, static friction matches the applied force up to a maximum value:</p>
<div class="formula-box">\\(f_s \\leq \\mu_s N\\)</div>
<p>where \\(\\mu_s\\) is the coefficient of static friction. The object begins to slide when the applied force exceeds \\(\\mu_s N\\).</p>

<h4>Kinetic Friction</h4>
<p>Once the object is <em>sliding</em>, kinetic friction is approximately constant:</p>
<div class="formula-box">\\(f_k = \\mu_k N\\)</div>
<p>where \\(\\mu_k\\) is the coefficient of kinetic friction. Typically \\(\\mu_k < \\mu_s\\).</p>

<h3>Typical Friction Coefficients</h3>
<table class="data-table">
  <thead><tr><th>Surface Pair</th><th>\\(\\mu_s\\)</th><th>\\(\\mu_k\\)</th></tr></thead>
  <tbody>
    <tr><td>Rubber on concrete</td><td>1.0</td><td>0.8</td></tr>
    <tr><td>Wood on wood</td><td>0.5</td><td>0.3</td></tr>
    <tr><td>Steel on steel</td><td>0.6</td><td>0.4</td></tr>
    <tr><td>Ice on ice</td><td>0.1</td><td>0.03</td></tr>
  </tbody>
</table>

<h3>Forces on an Inclined Plane</h3>
<p>When an object of mass \\(m\\) sits on a plane inclined at angle \\(\\theta\\), we decompose gravity into components parallel and perpendicular to the slope:</p>
<div class="formula-box">\\(W_\\parallel = mg\\sin\\theta, \\qquad W_\\perp = mg\\cos\\theta\\)</div>
<p>The normal force balances \\(W_\\perp\\): \\(N = mg\\cos\\theta\\). Friction opposes the component \\(W_\\parallel = mg\\sin\\theta\\) that tries to slide the object down the slope.</p>

<div class="viz-container" id="viz-incline-forces"></div>

<div class="viz-container" id="viz-friction-explorer"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>Surfaces push and resist sliding. But what about ropes and springs? The next section covers tension and elastic (spring) forces, completing our catalog of common mechanical forces.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-incline-forces',
          title: 'Force Decomposition on an Incline',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 40, originX: 100, originY: 340 });

            let angle = 30;
            let mass = 5;
            let mu = 0.3;

            VizEngine.createSlider(container, 'Angle (deg): ', 5, 60, angle, 1, val => { angle = val; draw(); });
            VizEngine.createSlider(container, 'Mass (kg): ', 1, 15, mass, 1, val => { mass = val; draw(); });
            VizEngine.createSlider(container, '\u03BC (friction): ', 0, 0.8, mu, 0.05, val => { mu = val; draw(); });

            function draw() {
              v.clear();
              const ctx = v.ctx;
              const rad = angle * Math.PI / 180;
              const g = 9.8;

              // Draw incline surface
              const baseLen = 500;
              const riseH = baseLen * Math.tan(rad);
              const topX = 80, topY = 80;
              const botRightX = 80 + baseLen, botRightY = 80 + riseH;
              const botLeftX = 80, botLeftY = 80 + riseH;

              ctx.fillStyle = '#1a1a40';
              ctx.beginPath();
              ctx.moveTo(topX, topY);
              ctx.lineTo(botRightX, botRightY);
              ctx.lineTo(botLeftX, botLeftY);
              ctx.closePath();
              ctx.fill();
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 2;
              ctx.stroke();

              // Hatching under incline
              ctx.strokeStyle = v.colors.text + '44';
              ctx.lineWidth = 1;
              for (let i = botLeftX; i < botRightX; i += 15) {
                const t = (i - botLeftX) / (botRightX - botLeftX);
                const surfY = botRightY - t * riseH;
                ctx.beginPath();
                ctx.moveTo(i, surfY);
                ctx.lineTo(i, botRightY + 5);
                ctx.stroke();
              }

              // Block position on incline (1/3 up)
              const blockT = 0.4;
              const bx = topX + (botRightX - topX) * blockT;
              const by = topY + (botRightY - topY) * blockT;

              // Draw block
              const blockSize = 30;
              ctx.save();
              ctx.translate(bx, by);
              ctx.rotate(-rad);
              ctx.fillStyle = v.colors.blue + 'aa';
              ctx.fillRect(-blockSize / 2, -blockSize, blockSize, blockSize);
              ctx.strokeStyle = v.colors.blue;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(-blockSize / 2, -blockSize, blockSize, blockSize);
              ctx.fillStyle = v.colors.white;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(mass + 'kg', 0, -blockSize / 2);
              ctx.restore();

              // Force arrows from block center
              const cx = bx;
              const cy = by - blockSize / 2;
              const fScale = 1.8;

              // Weight (straight down)
              const wMag = mass * g;
              const wLen = wMag * fScale / g;
              ctx.strokeStyle = v.colors.red;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(cx, cy + wLen * 3);
              ctx.stroke();
              // arrowhead
              ctx.fillStyle = v.colors.red;
              ctx.beginPath();
              ctx.moveTo(cx, cy + wLen * 3 + 8);
              ctx.lineTo(cx - 6, cy + wLen * 3 - 2);
              ctx.lineTo(cx + 6, cy + wLen * 3 - 2);
              ctx.closePath();
              ctx.fill();
              ctx.fillStyle = v.colors.red;
              ctx.font = 'bold 12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.textBaseline = 'middle';
              ctx.fillText('W = ' + wMag.toFixed(1) + ' N', cx + 10, cy + wLen * 3);

              // Normal force (perpendicular to surface, pointing away)
              const nMag = mass * g * Math.cos(rad);
              const nLen = nMag * fScale / g;
              const nDx = -Math.sin(rad) * nLen * 3;
              const nDy = -Math.cos(rad) * nLen * 3;
              ctx.strokeStyle = v.colors.green;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(cx + nDx, cy + nDy);
              ctx.stroke();
              ctx.fillStyle = v.colors.green;
              ctx.beginPath();
              ctx.moveTo(cx + nDx - Math.sin(rad) * 8, cy + nDy - Math.cos(rad) * 8);
              ctx.lineTo(cx + nDx + 6 * Math.cos(rad), cy + nDy - 6 * Math.sin(rad));
              ctx.lineTo(cx + nDx - 6 * Math.cos(rad), cy + nDy + 6 * Math.sin(rad));
              ctx.closePath();
              ctx.fill();
              ctx.font = 'bold 12px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('N = ' + nMag.toFixed(1) + ' N', cx + nDx - 15, cy + nDy - 15);

              // mg sin(theta) component (along incline, pointing down-slope)
              const parMag = mass * g * Math.sin(rad);
              const parLen = parMag * fScale / g;
              const parDx = Math.cos(rad) * parLen * 3;
              const parDy = Math.sin(rad) * parLen * 3;
              ctx.strokeStyle = v.colors.yellow;
              ctx.lineWidth = 2;
              ctx.setLineDash([5, 3]);
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(cx + parDx, cy + parDy);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = v.colors.yellow;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('mg sin\u03B8 = ' + parMag.toFixed(1) + ' N', cx + parDx + 5, cy + parDy);

              // Friction (along incline, pointing up-slope)
              const frMag = mu * nMag;
              const frLen = frMag * fScale / g;
              const frDx = -Math.cos(rad) * frLen * 3;
              const frDy = -Math.sin(rad) * frLen * 3;
              if (frMag > 0.1) {
                ctx.strokeStyle = v.colors.purple;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + frDx, cy + frDy);
                ctx.stroke();
                ctx.fillStyle = v.colors.purple;
                ctx.beginPath();
                ctx.moveTo(cx + frDx - Math.cos(rad) * 8, cy + frDy - Math.sin(rad) * 8);
                ctx.lineTo(cx + frDx + 6 * Math.sin(rad), cy + frDy - 6 * Math.cos(rad));
                ctx.lineTo(cx + frDx - 6 * Math.sin(rad), cy + frDy + 6 * Math.cos(rad));
                ctx.closePath();
                ctx.fill();
                ctx.font = '11px -apple-system,sans-serif';
                ctx.fillText('f = ' + frMag.toFixed(1) + ' N', cx + frDx - 10, cy + frDy - 12);
              }

              // Angle arc
              ctx.strokeStyle = v.colors.yellow;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(botRightX, botRightY, 40, -Math.PI, -Math.PI + rad);
              ctx.stroke();
              ctx.fillStyle = v.colors.yellow;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('\u03B8 = ' + angle + '\u00B0', botRightX - 55, botRightY - 15);

              // Status
              const netPar = parMag - frMag;
              const status = netPar > 0.1 ? 'Slides down!' : 'Stays put';
              v.screenText('Net force along slope: ' + netPar.toFixed(1) + ' N  \u2014  ' + status, v.width / 2, v.height - 12, netPar > 0.1 ? v.colors.red : v.colors.green, 13);
            }
            draw();
            return v;
          }
        },
        {
          id: 'viz-friction-explorer',
          title: 'Static vs. Kinetic Friction',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 340, scale: 40, originX: 100, originY: 260 });

            let appliedF = 0;
            const mass = 5;
            const g = 9.8;
            const muS = 0.5;
            const muK = 0.3;
            const N = mass * g;
            const fsMax = muS * N;
            const fk = muK * N;

            VizEngine.createSlider(container, 'Applied force (N): ', 0, 40, 0, 0.5, val => { appliedF = val; draw(); });

            function draw() {
              v.clear();
              const ctx = v.ctx;

              // Ground
              v.drawGround(-1, 0, 12, v.colors.text);

              // Block
              const bx = 3, by = 0.6;
              v.drawMass(bx, by, 1.2, v.colors.blue, mass + 'kg');

              // Applied force arrow
              if (appliedF > 0.1) {
                v.drawForce(bx - 0.6, by, appliedF / 10, 0, v.colors.orange, 'F=' + appliedF.toFixed(1) + 'N', 1);
              }

              // Determine friction
              let friction;
              let label;
              let sliding = false;
              if (appliedF <= fsMax) {
                friction = appliedF;
                label = 'fs = ' + friction.toFixed(1) + ' N (static)';
              } else {
                friction = fk;
                label = 'fk = ' + friction.toFixed(1) + ' N (kinetic)';
                sliding = true;
              }

              // Friction arrow
              if (friction > 0.1) {
                v.drawForce(bx + 0.6, by, -friction / 10, 0, v.colors.purple, label, 1);
              }

              // Weight and normal
              v.drawForce(bx, by - 0.6, 0, -mass * g / 20, v.colors.red, 'W', 1);
              v.drawForce(bx, by + 0.6, 0, N / 20, v.colors.green, 'N', 1);

              // Info panel
              v.screenText('N = ' + N.toFixed(1) + ' N', 10, 20, v.colors.text, 12, 'left');
              v.screenText('fs,max = \u03BCs N = ' + fsMax.toFixed(1) + ' N', 10, 38, v.colors.text, 12, 'left');
              v.screenText('fk = \u03BCk N = ' + fk.toFixed(1) + ' N', 10, 56, v.colors.text, 12, 'left');

              // Status
              const netF = appliedF - friction;
              const statusColor = sliding ? v.colors.orange : v.colors.green;
              const statusText = sliding ? 'Object is sliding! a = ' + (netF / mass).toFixed(2) + ' m/s\u00B2' : 'Object is stationary (static friction matches applied force)';
              v.screenText(statusText, v.width / 2, v.height - 12, statusColor, 13);

              // Friction vs. applied force graph (mini)
              const gx = 380, gy = 30, gw = 210, gh = 100;
              ctx.strokeStyle = v.colors.axis;
              ctx.lineWidth = 1;
              ctx.strokeRect(gx, gy, gw, gh);

              // Axes labels
              ctx.fillStyle = v.colors.text;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Applied F', gx + gw / 2, gy + gh + 14);
              ctx.save();
              ctx.translate(gx - 12, gy + gh / 2);
              ctx.rotate(-Math.PI / 2);
              ctx.fillText('Friction', 0, 0);
              ctx.restore();

              // Static region (f = F, line from origin to fsMax)
              const xScale = gw / 40;
              const yScale = gh / 40;
              ctx.strokeStyle = v.colors.green;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(gx, gy + gh);
              ctx.lineTo(gx + fsMax * xScale, gy + gh - fsMax * yScale);
              ctx.stroke();

              // Kinetic region (horizontal line at fk)
              ctx.strokeStyle = v.colors.purple;
              ctx.beginPath();
              ctx.moveTo(gx + fsMax * xScale, gy + gh - fk * yScale);
              ctx.lineTo(gx + gw, gy + gh - fk * yScale);
              ctx.stroke();

              // Drop line
              ctx.strokeStyle = v.colors.text + '55';
              ctx.setLineDash([3, 3]);
              ctx.beginPath();
              ctx.moveTo(gx + fsMax * xScale, gy + gh - fsMax * yScale);
              ctx.lineTo(gx + fsMax * xScale, gy + gh - fk * yScale);
              ctx.stroke();
              ctx.setLineDash([]);

              // Current point
              const curFric = appliedF <= fsMax ? appliedF : fk;
              ctx.fillStyle = v.colors.white;
              ctx.beginPath();
              ctx.arc(gx + appliedF * xScale, gy + gh - curFric * yScale, 4, 0, Math.PI * 2);
              ctx.fill();

              // Labels on graph
              ctx.fillStyle = v.colors.green;
              ctx.font = '9px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText('fs,max', gx + fsMax * xScale - 3, gy + gh - fsMax * yScale - 5);
              ctx.fillStyle = v.colors.purple;
              ctx.fillText('fk', gx + gw - 3, gy + gh - fk * yScale - 5);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch04-s3-q1',
          type: 'mc',
          question: 'A 10 kg block sits on a horizontal surface. What is the normal force? (g = 9.8 m/s\u00B2)',
          options: ['10 N', '49 N', '98 N', 'It depends on friction'],
          answer: 2,
          explanation: 'On a horizontal surface with no other vertical forces, N = mg = 10 \u00D7 9.8 = 98 N.'
        },
        {
          id: 'ch04-s3-q2',
          type: 'mc',
          question: 'A block sits on an incline at 30 degrees. The normal force is:',
          options: ['mg', 'mg sin 30\u00B0', 'mg cos 30\u00B0', 'mg tan 30\u00B0'],
          answer: 2,
          explanation: 'On an incline, N = mg cos \u03B8. Only the component of weight perpendicular to the surface is balanced by the normal force.'
        },
        {
          id: 'ch04-s3-q3',
          type: 'mc',
          question: 'A 4 kg block on a horizontal surface has \u03BCs = 0.5 and \u03BCk = 0.3. What is the maximum static friction? (g = 10 m/s\u00B2)',
          options: ['12 N', '20 N', '40 N', '8 N'],
          answer: 1,
          explanation: 'fs,max = \u03BCs \u00D7 N = 0.5 \u00D7 (4 \u00D7 10) = 20 N.'
        },
        {
          id: 'ch04-s3-q4',
          type: 'mc',
          question: 'Once an object starts sliding, the friction force:',
          options: ['Increases', 'Drops to zero', 'Drops to a lower constant value (kinetic friction)', 'Stays the same as maximum static friction'],
          answer: 2,
          explanation: 'When sliding begins, friction drops from the maximum static value to the kinetic friction value fk = \u03BCk N, which is lower because \u03BCk < \u03BCs.'
        },
        {
          id: 'ch04-s3-q5',
          type: 'mc',
          question: 'A 5 kg object is on a 37\u00B0 incline (\u03BCk = 0.25, g = 10 m/s\u00B2). What is the kinetic friction force?',
          options: ['10 N', '12.5 N', '30 N', '15 N'],
          answer: 0,
          explanation: 'N = mg cos 37\u00B0 = 50 \u00D7 0.8 = 40 N. fk = \u03BCk \u00D7 N = 0.25 \u00D7 40 = 10 N.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 4: Tension and Elastic Force
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec04',
      title: 'Tension and Elastic Force',
      content: `
<h2>Tension and Elastic Force</h2>
<p class="section-roadmap"><em>In this section you will learn about tension in ropes and strings, Hooke's law for springs, and elastic potential energy stored in a stretched spring.</em></p>

<h3>Tension</h3>

<div class="env-block definition"><div class="env-title">Tension</div><div class="env-body"><p><strong>Tension</strong> is the pulling force transmitted through a string, rope, cable, or wire when it is pulled taut by forces acting on opposite ends. Tension always acts along the rope and pulls the object toward the rope.</p></div></div>

<p>Key properties of an <strong>ideal (massless, inextensible) rope</strong>:</p>
<ul>
  <li>The tension is the same at every point along the rope.</li>
  <li>The rope cannot push; it can only pull.</li>
  <li>The rope does not stretch (constraint: objects at both ends maintain constant separation).</li>
</ul>

<div class="env-block example"><div class="env-title">Example: Hanging Object</div><div class="env-body"><p>A 2 kg lamp hangs from a vertical rope. What is the tension?</p>
<p>The lamp is in equilibrium, so the net force is zero: \\(T - mg = 0\\), giving \\(T = mg = 2 \\times 9.8 = 19.6\\;\\text{N}\\).</p></div></div>

<h3>Hooke's Law</h3>

<div class="env-block definition"><div class="env-title">Hooke's Law</div><div class="env-body"><p>Within the elastic limit, the force exerted by a spring is proportional to its displacement from the natural (relaxed) length:</p>
<div class="formula-box">\\(F = -kx\\)</div>
<p>where \\(k\\) is the <strong>spring constant</strong> (N/m) and \\(x\\) is the displacement from equilibrium. The negative sign indicates the force opposes the displacement (restoring force).</p></div></div>

<p>A stiffer spring has a larger \\(k\\). When you plot force vs. displacement, the slope of the line gives \\(k\\).</p>

<h3>Elastic Potential Energy</h3>
<p>The energy stored in a deformed spring is:</p>
<div class="formula-box">\\(E_{\\text{elastic}} = \\frac{1}{2}kx^2\\)</div>

<h3>Beyond the Elastic Limit</h3>
<p>If a spring is stretched too far, it enters the <strong>plastic region</strong> and does not return to its original shape. Hooke's law only applies within the <strong>elastic limit</strong>.</p>

<div class="viz-container" id="viz-spring-hooke"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>You now have a full catalog of common forces: gravity, normal, friction, tension, and spring force. The final section teaches you how to combine them into a systematic analysis tool called the free body diagram.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-spring-hooke',
          title: 'Hooke\'s Law Spring Explorer',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 40, originX: 120, originY: 200 });

            let k = 50;
            let displacement = 0;

            VizEngine.createSlider(container, 'Spring constant k (N/m): ', 10, 200, k, 10, val => { k = val; draw(); });
            VizEngine.createSlider(container, 'Displacement x (cm): ', -10, 10, 0, 0.5, val => { displacement = val; draw(); });

            function draw() {
              v.clear();
              const ctx = v.ctx;
              const xMeters = displacement / 100;
              const force = k * Math.abs(xMeters);

              // Wall on left
              const wallX = 40;
              ctx.fillStyle = v.colors.text + '44';
              ctx.fillRect(wallX - 10, 100, 10, 200);
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(wallX, 100);
              ctx.lineTo(wallX, 300);
              ctx.stroke();
              // Hatching
              for (let y = 100; y < 300; y += 12) {
                ctx.beginPath();
                ctx.moveTo(wallX, y);
                ctx.lineTo(wallX - 8, y + 8);
                ctx.stroke();
              }

              // Natural length and displaced length
              const naturalLen = 200;
              const dispPx = displacement * 5; // scale: 1 cm = 5 px
              const endX = wallX + naturalLen + dispPx;

              // Draw spring (zigzag)
              const springStartX = wallX;
              const springEndX = endX;
              const springY = 200;
              const coils = 10;
              const amp = 15;
              ctx.strokeStyle = displacement === 0 ? v.colors.text : (displacement > 0 ? v.colors.orange : v.colors.teal);
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(springStartX, springY);
              const segLen = (springEndX - springStartX) / (coils * 2 + 2);
              let cx = springStartX + segLen;
              let cy = springY;
              ctx.lineTo(cx, cy);
              for (let i = 0; i < coils * 2; i++) {
                const sign = (i % 2 === 0) ? 1 : -1;
                cx += segLen;
                ctx.lineTo(cx, springY + sign * amp);
              }
              cx += segLen;
              ctx.lineTo(cx, springY);
              ctx.stroke();

              // Block at end
              const blockW = 40;
              const blockH = 50;
              ctx.fillStyle = v.colors.blue + 'aa';
              ctx.fillRect(endX, springY - blockH / 2, blockW, blockH);
              ctx.strokeStyle = v.colors.blue;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(endX, springY - blockH / 2, blockW, blockH);

              // Natural length marker
              const natEndX = wallX + naturalLen;
              ctx.strokeStyle = v.colors.text + '55';
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(natEndX, 130);
              ctx.lineTo(natEndX, 270);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = v.colors.text;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('natural length', natEndX, 125);

              // Force arrow
              if (Math.abs(displacement) > 0.1) {
                const arrowDir = displacement > 0 ? -1 : 1;
                const arrowLen = Math.min(force * 2, 120);
                const arrowStartX = endX + blockW / 2;
                ctx.strokeStyle = v.colors.red;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(arrowStartX, springY - 40);
                ctx.lineTo(arrowStartX + arrowDir * arrowLen, springY - 40);
                ctx.stroke();
                // arrowhead
                ctx.fillStyle = v.colors.red;
                ctx.beginPath();
                ctx.moveTo(arrowStartX + arrowDir * (arrowLen + 8), springY - 40);
                ctx.lineTo(arrowStartX + arrowDir * arrowLen - arrowDir * 4, springY - 46);
                ctx.lineTo(arrowStartX + arrowDir * arrowLen - arrowDir * 4, springY - 34);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = v.colors.red;
                ctx.font = 'bold 12px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('F = ' + force.toFixed(1) + ' N', arrowStartX + arrowDir * arrowLen / 2, springY - 52);
              }

              // Displacement indicator
              if (Math.abs(displacement) > 0.1) {
                ctx.strokeStyle = v.colors.yellow;
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(natEndX, 280);
                ctx.lineTo(endX, 280);
                ctx.stroke();
                ctx.setLineDash([]);
                // arrows at both ends
                ctx.fillStyle = v.colors.yellow;
                ctx.font = '11px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('x = ' + displacement.toFixed(1) + ' cm', (natEndX + endX) / 2, 295);
              }

              // F vs x graph (bottom right)
              const gx = 380, gy = 20, gw = 210, gh = 120;
              ctx.strokeStyle = v.colors.axis;
              ctx.lineWidth = 1;
              ctx.strokeRect(gx, gy, gw, gh);

              // Axes
              ctx.fillStyle = v.colors.text;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Displacement x', gx + gw / 2, gy + gh + 14);
              ctx.fillText('Force F', gx - 5, gy - 5);

              // F = kx line
              ctx.strokeStyle = v.colors.blue;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(gx, gy + gh);
              const maxX = 10; // cm
              const maxF = k * maxX / 100;
              const lineEndX = gx + gw;
              const lineEndY = gy + gh - (maxF / (200 * 0.1)) * gh;
              ctx.lineTo(lineEndX, Math.max(gy, lineEndY));
              ctx.stroke();

              // Current point
              if (Math.abs(displacement) > 0.1) {
                const ptX = gx + (Math.abs(displacement) / maxX) * gw;
                const ptY = gy + gh - (force / (maxF)) * gh;
                ctx.fillStyle = v.colors.white;
                ctx.beginPath();
                ctx.arc(ptX, Math.max(gy, ptY), 5, 0, Math.PI * 2);
                ctx.fill();
              }

              // Info
              v.screenText('k = ' + k + ' N/m', 10, v.height - 40, v.colors.text, 12, 'left');
              v.screenText('F = kx = ' + force.toFixed(2) + ' N', 10, v.height - 22, v.colors.white, 13, 'left');
              const energy = 0.5 * k * xMeters * xMeters;
              v.screenText('E = \u00BDkx\u00B2 = ' + energy.toFixed(4) + ' J', 200, v.height - 22, v.colors.teal, 13, 'left');
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch04-s4-q1',
          type: 'mc',
          question: 'A 3 kg lamp hangs from a vertical rope in equilibrium. What is the tension in the rope? (g = 9.8 m/s\u00B2)',
          options: ['3 N', '9.8 N', '29.4 N', '0 N'],
          answer: 2,
          explanation: 'In equilibrium, T = mg = 3 \u00D7 9.8 = 29.4 N.'
        },
        {
          id: 'ch04-s4-q2',
          type: 'mc',
          question: 'A spring with k = 200 N/m is stretched 5 cm from its natural length. What force does it exert?',
          options: ['10 N', '1000 N', '1 N', '100 N'],
          answer: 0,
          explanation: 'F = kx = 200 \u00D7 0.05 = 10 N (remember to convert cm to m).'
        },
        {
          id: 'ch04-s4-q3',
          type: 'mc',
          question: 'A spring is compressed by 0.1 m and has k = 300 N/m. How much elastic potential energy is stored?',
          options: ['30 J', '15 J', '1.5 J', '3 J'],
          answer: 2,
          explanation: 'E = \u00BDkx\u00B2 = 0.5 \u00D7 300 \u00D7 (0.1)\u00B2 = 1.5 J.'
        },
        {
          id: 'ch04-s4-q4',
          type: 'mc',
          question: 'In an ideal massless rope, the tension:',
          options: ['Varies along the rope', 'Is the same everywhere along the rope', 'Is zero in the middle', 'Is largest at the top'],
          answer: 1,
          explanation: 'In a massless rope, the tension is the same at every point. If the rope had mass, tension would vary.'
        },
        {
          id: 'ch04-s4-q5',
          type: 'mc',
          question: 'A spring of natural length 20 cm is stretched to 28 cm by a force of 16 N. What is the spring constant?',
          options: ['2 N/m', '80 N/m', '200 N/m', '57.1 N/m'],
          answer: 2,
          explanation: 'Displacement x = 28 - 20 = 8 cm = 0.08 m. k = F/x = 16/0.08 = 200 N/m.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 5: Force Analysis (Free Body Diagrams)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec05',
      title: 'Force Analysis (Free Body Diagrams)',
      content: `
<h2>Force Analysis (Free Body Diagrams)</h2>
<p class="section-roadmap"><em>In this section you will learn the systematic procedure for constructing free body diagrams (FBDs), applying equilibrium conditions, and solving force problems.</em></p>

<div class="env-block definition"><div class="env-title">Free Body Diagram (FBD)</div><div class="env-body"><p>A <strong>free body diagram</strong> is a sketch showing a single object isolated from its environment, with all forces acting <em>on</em> that object represented as arrows originating from the object's center. It is the most important tool in mechanics problem-solving.</p></div></div>

<h3>Steps to Draw an FBD</h3>
<ol>
  <li><strong>Identify the object</strong> you are analyzing. Draw it as a simple dot or box.</li>
  <li><strong>List all forces</strong> acting on the object:
    <ul>
      <li>Weight \\(\\vec{W} = m\\vec{g}\\) (always present, points downward)</li>
      <li>Normal force \\(\\vec{N}\\) (if touching a surface, perpendicular to it)</li>
      <li>Friction \\(\\vec{f}\\) (if touching a rough surface, parallel to it, opposing motion)</li>
      <li>Tension \\(\\vec{T}\\) (if connected by a rope, along the rope away from object)</li>
      <li>Spring force \\(\\vec{F}_s\\) (if connected to a spring)</li>
      <li>Applied force \\(\\vec{F}_{\\text{app}}\\) (any external push or pull)</li>
    </ul>
  </li>
  <li><strong>Draw each force</strong> as an arrow from the object, with length proportional to magnitude.</li>
  <li><strong>Choose coordinate axes</strong> aligned with the motion or the surface (e.g., along the incline).</li>
</ol>

<div class="env-block warning"><div class="env-title">Common FBD Mistakes</div><div class="env-body">
<ul>
  <li>Including forces the object exerts <em>on other objects</em> (those belong on the other object's FBD).</li>
  <li>Drawing "ma" as a force. Acceleration is the <em>result</em> of the net force, not a force itself.</li>
  <li>Forgetting friction or the normal force.</li>
  <li>Drawing the normal force vertically when the surface is inclined (N is always perpendicular to the surface).</li>
</ul>
</div></div>

<h3>Equilibrium</h3>
<p>An object in equilibrium (at rest or moving at constant velocity) has zero net force:</p>
<div class="formula-box">\\(\\sum F_x = 0 \\qquad \\text{and} \\qquad \\sum F_y = 0\\)</div>

<div class="env-block example"><div class="env-title">Example: Block on a Rough Incline</div><div class="env-body"><p>A 4 kg block rests on a 30\u00B0 incline with friction. Identify all forces and check equilibrium.</p>
<p>Forces: (1) Weight \\(W = 4 \\times 9.8 = 39.2\\;\\text{N}\\) downward. (2) Normal force \\(N\\) perpendicular to slope. (3) Static friction \\(f_s\\) up the slope.</p>
<p>Along the slope: \\(f_s = mg\\sin 30^\\circ = 39.2 \\times 0.5 = 19.6\\;\\text{N}\\)</p>
<p>Perpendicular: \\(N = mg\\cos 30^\\circ = 39.2 \\times 0.866 = 33.9\\;\\text{N}\\)</p></div></div>

<div class="viz-container" id="viz-fbd-builder"></div>

<div class="viz-container" id="viz-force-balance"></div>

<div class="env-block intuition"><div class="env-title">Chapter Summary</div><div class="env-body"><p>You have now mastered the complete toolkit of forces: gravity (W = mg), normal force, static and kinetic friction (f = \u03BCN), tension, and spring force (F = kx). With free body diagrams, you can systematically analyze any force problem. In the next chapter, we connect forces to motion through Newton's three laws.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-fbd-builder',
          title: 'Interactive Free Body Diagram Builder',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 40, originX: 310, originY: 200 });

            let scenario = 0;
            const scenarios = [
              {
                name: 'Block on horizontal surface',
                forces: [
                  { label: 'W', fx: 0, fy: -2.5, color: 'red' },
                  { label: 'N', fx: 0, fy: 2.5, color: 'green' }
                ],
                desc: 'Weight down, normal force up. They balance: net force = 0.'
              },
              {
                name: 'Block pushed on rough surface',
                forces: [
                  { label: 'W', fx: 0, fy: -2.5, color: 'red' },
                  { label: 'N', fx: 0, fy: 2.5, color: 'green' },
                  { label: 'F(app)', fx: 3, fy: 0, color: 'orange' },
                  { label: 'f', fx: -2, fy: 0, color: 'purple' }
                ],
                desc: 'Applied force right, friction left, weight down, normal up. Net force = F - f to the right.'
              },
              {
                name: 'Block on 30\u00B0 incline (no friction)',
                forces: [
                  { label: 'W', fx: 0, fy: -3, color: 'red' },
                  { label: 'N', fx: -1.5 * Math.sin(Math.PI / 6), fy: 1.5 * Math.cos(Math.PI / 6), color: 'green' }
                ],
                desc: 'Weight straight down. Normal perpendicular to incline. Net force is along the slope (object accelerates down).'
              },
              {
                name: 'Hanging object on two ropes',
                forces: [
                  { label: 'W', fx: 0, fy: -3, color: 'red' },
                  { label: 'T1', fx: -2, fy: 2, color: 'blue' },
                  { label: 'T2', fx: 2, fy: 1, color: 'teal' }
                ],
                desc: 'Weight down. Two tension forces along the ropes balance the weight.'
              },
              {
                name: 'Block on incline with friction',
                forces: [
                  { label: 'W', fx: 0, fy: -3, color: 'red' },
                  { label: 'N', fx: -Math.sin(Math.PI / 6) * 2.6, fy: Math.cos(Math.PI / 6) * 2.6, color: 'green' },
                  { label: 'f', fx: -Math.cos(Math.PI / 6) * 1, fy: -Math.sin(Math.PI / 6) * 1, color: 'purple' }
                ],
                desc: 'On incline: weight down, normal perpendicular to surface, friction along surface opposing sliding.'
              }
            ];

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:8px';
            scenarios.forEach((s, i) => {
              VizEngine.createButton(btnRow, s.name, () => { scenario = i; draw(); });
            });
            container.appendChild(btnRow);

            function draw() {
              v.clear();
              const s = scenarios[scenario];

              // Object dot
              const ctx = v.ctx;
              ctx.fillStyle = v.colors.blue + '44';
              ctx.beginPath();
              ctx.arc(v.originX, v.originY, 20, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = v.colors.blue;
              ctx.beginPath();
              ctx.arc(v.originX, v.originY, 8, 0, Math.PI * 2);
              ctx.fill();

              // Forces
              s.forces.forEach(f => {
                const color = v.colors[f.color] || f.color;
                v.drawForce(0, 0, f.fx, f.fy, color, f.label, 1);
              });

              // Net force
              let netFx = 0, netFy = 0;
              s.forces.forEach(f => { netFx += f.fx; netFy += f.fy; });
              const netMag = Math.sqrt(netFx * netFx + netFy * netFy);

              if (netMag > 0.05) {
                v.drawForce(0, 0, netFx, netFy, v.colors.yellow, 'Net', 1);
              }

              // Title
              v.screenText(s.name, v.width / 2, 20, v.colors.white, 14);

              // Description
              const words = s.desc.split(' ');
              let line = '';
              let lineY = v.height - 50;
              ctx.fillStyle = v.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              words.forEach(w => {
                const test = line + w + ' ';
                if (ctx.measureText(test).width > 550) {
                  ctx.fillText(line.trim(), v.width / 2, lineY);
                  line = w + ' ';
                  lineY += 16;
                } else {
                  line = test;
                }
              });
              if (line.trim()) ctx.fillText(line.trim(), v.width / 2, lineY);

              // Net force info
              const netInfo = netMag < 0.05 ? 'Net force = 0 (equilibrium)' : 'Net force = ' + netMag.toFixed(2) + ' units (accelerating)';
              v.screenText(netInfo, v.width / 2, 44, netMag < 0.05 ? v.colors.green : v.colors.orange, 13);
            }
            draw();
            return v;
          }
        },
        {
          id: 'viz-force-balance',
          title: 'Force Balance Explorer',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 380, scale: 40, originX: 310, originY: 300 });

            let fUp = 5, fRight = 3, fDown = 5, fLeft = 3;

            VizEngine.createSlider(container, 'Force Up (N): ', 0, 10, fUp, 0.5, val => { fUp = val; draw(); });
            VizEngine.createSlider(container, 'Force Down (N): ', 0, 10, fDown, 0.5, val => { fDown = val; draw(); });
            VizEngine.createSlider(container, 'Force Right (N): ', 0, 10, fRight, 0.5, val => { fRight = val; draw(); });
            VizEngine.createSlider(container, 'Force Left (N): ', 0, 10, fLeft, 0.5, val => { fLeft = val; draw(); });

            function draw() {
              v.clear();
              v.drawGrid(2);

              const sc = 0.5;

              // Object
              const ctx = v.ctx;
              ctx.fillStyle = v.colors.blue + '55';
              ctx.beginPath();
              ctx.arc(v.originX, v.originY, 15, 0, Math.PI * 2);
              ctx.fill();

              // Up
              if (fUp > 0.05) v.drawForce(0, 0, 0, fUp * sc, v.colors.green, 'Up: ' + fUp.toFixed(1), 1);
              // Down
              if (fDown > 0.05) v.drawForce(0, 0, 0, -fDown * sc, v.colors.red, 'Down: ' + fDown.toFixed(1), 1);
              // Right
              if (fRight > 0.05) v.drawForce(0, 0, fRight * sc, 0, v.colors.orange, 'Right: ' + fRight.toFixed(1), 1);
              // Left
              if (fLeft > 0.05) v.drawForce(0, 0, -fLeft * sc, 0, v.colors.purple, 'Left: ' + fLeft.toFixed(1), 1);

              // Net force
              const netX = (fRight - fLeft) * sc;
              const netY = (fUp - fDown) * sc;
              const netMag = Math.sqrt(netX * netX + netY * netY);

              if (netMag > 0.02) {
                v.drawForce(0, 0, netX, netY, v.colors.yellow, 'Net', 1);
              }

              const realNetX = fRight - fLeft;
              const realNetY = fUp - fDown;
              const realNetMag = Math.sqrt(realNetX * realNetX + realNetY * realNetY);

              const info = realNetMag < 0.05 ? 'EQUILIBRIUM: Net force = 0' : 'Net force = ' + realNetMag.toFixed(2) + ' N';
              v.screenText(info, v.width / 2, 20, realNetMag < 0.05 ? v.colors.green : v.colors.orange, 14);

              v.screenText('Fx,net = ' + realNetX.toFixed(1) + ' N,  Fy,net = ' + realNetY.toFixed(1) + ' N', v.width / 2, 42, v.colors.text, 12);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch04-s5-q1',
          type: 'mc',
          question: 'In a free body diagram, which forces should be drawn?',
          options: ['All forces the object exerts on other objects', 'All forces acting ON the object', 'Only the net force', 'Only contact forces'],
          answer: 1,
          explanation: 'An FBD shows all forces acting ON the chosen object, not forces the object exerts on others.'
        },
        {
          id: 'ch04-s5-q2',
          type: 'mc',
          question: 'A 2 kg book rests on a horizontal table. Which forces appear in the book\'s FBD?',
          options: ['Weight only', 'Weight and normal force', 'Weight, normal force, and the book pressing on the table', 'Normal force only'],
          answer: 1,
          explanation: 'The book\'s FBD has weight (19.6 N down) and normal force (19.6 N up). The force the book exerts on the table is drawn on the table\'s FBD, not the book\'s.'
        },
        {
          id: 'ch04-s5-q3',
          type: 'mc',
          question: 'For an object in equilibrium, which statement is true?',
          options: ['No forces act on it', 'The net force on it is zero', 'It must be at rest', 'It must have zero velocity'],
          answer: 1,
          explanation: 'Equilibrium means zero net force. The object can still be moving at constant velocity (translational equilibrium). It does not need to be at rest.'
        },
        {
          id: 'ch04-s5-q4',
          type: 'mc',
          question: 'A block hangs from two ropes making 45\u00B0 angles with the ceiling. The block weighs 100 N. What is the tension in each rope?',
          options: ['50 N', '70.7 N', '100 N', '141.4 N'],
          answer: 1,
          explanation: 'By symmetry, each rope carries half the vertical load: T sin 45\u00B0 = 50 N, so T = 50/sin 45\u00B0 = 50/0.707 = 70.7 N.'
        },
        {
          id: 'ch04-s5-q5',
          type: 'mc',
          question: 'Why is "ma" NOT drawn as a force in a free body diagram?',
          options: ['Because it is too small', 'Because it acts on other objects', 'Because acceleration is the RESULT of forces, not a force itself', 'Because it only applies in space'],
          answer: 2,
          explanation: 'Newton\'s second law says the net force CAUSES acceleration. Writing ma as a separate force on the FBD would be double-counting; a is the effect, not the cause.'
        }
      ]
    }

  ]
});
