window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch05',
  number: 5,
  title: 'Newton\'s Laws',
  subtitle: 'The Foundation of Classical Mechanics',
  sections: [

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 1: Newton's First Law (Inertia)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch05-sec01',
      title: 'Newton\'s First Law (Inertia)',
      content: `
<div class="env-block intuition"><div class="env-title">From Forces to Motion</div><div class="env-body"><p>In Chapter 4 you cataloged all the common forces: gravity, normal, friction, tension, and spring force. Now comes the grand connection: how do forces affect motion? Isaac Newton answered this question with three laws that form the bedrock of classical mechanics. Everything from engineering bridges to launching rockets rests on these three simple principles.</p></div></div>

<h2>Newton's First Law (Inertia)</h2>
<p class="section-roadmap"><em>In this section you will learn Newton's first law, the concept of inertia, and what it means for an object to be in an inertial reference frame.</em></p>

<div class="env-block theorem"><div class="env-title">Newton's First Law (Law of Inertia)</div><div class="env-body"><p>An object at rest stays at rest, and an object in motion continues in motion with constant velocity (same speed, same direction), unless acted upon by a net external force.</p></div></div>

<p>In modern language:</p>
<div class="formula-box">\\(\\vec{F}_{\\text{net}} = 0 \\quad \\Longrightarrow \\quad \\vec{v} = \\text{constant}\\)</div>

<h3>Inertia</h3>

<div class="env-block definition"><div class="env-title">Inertia</div><div class="env-body"><p><strong>Inertia</strong> is the tendency of an object to resist changes in its state of motion. The more massive an object, the greater its inertia.</p></div></div>

<p>Everyday examples of inertia:</p>
<ul>
  <li>Passengers lurch forward when a car brakes suddenly: their bodies tend to keep moving at the car's original speed.</li>
  <li>A tablecloth can be pulled from under dishes if pulled quickly enough: the dishes' inertia keeps them in place.</li>
  <li>A hammer head stays on the handle when you slam the handle down: the head's inertia resists the sudden stop.</li>
</ul>

<div class="env-block remark"><div class="env-title">Mass as a Measure of Inertia</div><div class="env-body"><p>Mass is the quantitative measure of inertia. A 10 kg bowling ball is much harder to start or stop than a 0.1 kg tennis ball. This is why we sometimes call mass "inertial mass."</p></div></div>

<h3>Inertial Reference Frames</h3>
<p>Newton's first law holds only in <strong>inertial reference frames</strong>, which are frames that are not accelerating. The ground (to a good approximation) is an inertial frame. A car that is braking or turning is <em>not</em> an inertial frame.</p>

<div class="env-block warning"><div class="env-title">Common Misconception</div><div class="env-body"><p>Many people believe "an object in motion naturally slows down." In reality, objects slow down because of friction and air resistance (external forces), not because motion naturally dies out. In the vacuum of space, a moving object continues forever at constant velocity.</p></div></div>

<div class="viz-container" id="viz-inertia-demo"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>The first law tells us what happens when there is no net force: nothing changes. The second law tells us what happens when there IS a net force: the object accelerates. That is the topic of the next section.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-inertia-demo',
          title: 'Inertia Demonstration',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 380, scale: 40, originX: 60, originY: 280 });

            let friction = 0.1;
            let running = false;
            let t = 0;
            let v0 = 4;
            let xPos = 0;
            let vel = 0;
            let phase = 'idle'; // idle, pushing, coasting

            VizEngine.createSlider(container, 'Friction coefficient: ', 0, 0.5, friction, 0.02, val => { friction = val; });

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-top:6px';

            VizEngine.createButton(btnRow, 'Push the Block', () => {
              xPos = 0;
              vel = v0;
              t = 0;
              phase = 'coasting';
              if (!running) {
                running = true;
                v.animate(animate);
              }
            });

            VizEngine.createButton(btnRow, 'Reset', () => {
              running = false;
              v.stopAnimation();
              xPos = 0;
              vel = 0;
              t = 0;
              phase = 'idle';
              draw(0);
            });

            container.appendChild(btnRow);

            function animate(timestamp) {
              const dt = 0.03;
              if (phase === 'coasting') {
                const fric = friction * 9.8;
                if (vel > 0.01) {
                  vel -= fric * dt;
                  if (vel < 0) vel = 0;
                  xPos += vel * dt;
                } else {
                  vel = 0;
                  phase = 'stopped';
                }
                t += dt;
              }
              draw(timestamp);
            }

            function draw(timestamp) {
              v.clear();
              const ctx = v.ctx;

              // Title
              v.screenText('Inertia and Friction', v.width / 2, 20, v.colors.white, 15);

              // Ground
              v.drawGround(-1, 0, 14, v.colors.text);

              // Block
              const bx = 1 + xPos;
              v.drawMass(bx, 0.6, 1, v.colors.blue, 'm');

              // Velocity arrow
              if (vel > 0.05) {
                v.drawForce(bx, 1.5, vel * 0.5, 0, v.colors.teal, 'v = ' + vel.toFixed(2) + ' m/s', 1);
              }

              // Friction arrow
              if (vel > 0.01 && friction > 0.001) {
                v.drawForce(bx + 0.5, 0.6, -friction * 0.5, 0, v.colors.red, 'friction', 1);
              }

              // Info
              const friLabel = friction === 0 ? 'No friction (ideal)' : '\u03BC = ' + friction.toFixed(2);
              v.screenText(friLabel, 10, v.height - 60, v.colors.text, 12, 'left');
              v.screenText('Position: ' + xPos.toFixed(2) + ' m', 10, v.height - 42, v.colors.text, 12, 'left');
              v.screenText('Velocity: ' + vel.toFixed(2) + ' m/s', 10, v.height - 24, v.colors.text, 12, 'left');

              // Message
              if (phase === 'idle') {
                v.screenText('Click "Push the Block" to give it an initial velocity', v.width / 2, v.height - 10, v.colors.text, 12);
              } else if (phase === 'stopped') {
                v.screenText('Block stopped! Try \u03BC = 0 to see it glide forever (no friction = no deceleration)', v.width / 2, v.height - 10, v.colors.yellow, 12);
              } else if (friction < 0.001) {
                v.screenText('No friction! The block moves at constant velocity (Newton\'s 1st Law)', v.width / 2, v.height - 10, v.colors.green, 12);
              }
            }
            draw(0);
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-s1-q1',
          type: 'mc',
          question: 'Newton\'s first law states that an object in motion will:',
          options: ['Gradually slow down', 'Continue at constant velocity unless a net force acts on it', 'Speed up due to inertia', 'Stop when the applied force is removed'],
          answer: 1,
          explanation: 'Newton\'s first law says objects maintain constant velocity (including direction) unless a net external force acts. Slowing down requires a force such as friction.'
        },
        {
          id: 'ch05-s1-q2',
          type: 'mc',
          question: 'Which quantity is the measure of an object\'s inertia?',
          options: ['Weight', 'Volume', 'Mass', 'Density'],
          answer: 2,
          explanation: 'Mass measures inertia. A more massive object is harder to accelerate or decelerate.'
        },
        {
          id: 'ch05-s1-q3',
          type: 'mc',
          question: 'A hockey puck slides across frictionless ice. What happens to its velocity?',
          options: ['It gradually decreases', 'It remains constant forever', 'It increases', 'It oscillates'],
          answer: 1,
          explanation: 'With no friction (no net force), the puck continues at constant velocity by Newton\'s first law.'
        },
        {
          id: 'ch05-s1-q4',
          type: 'mc',
          question: 'Passengers in a car lurch forward when the car brakes suddenly. This is because:',
          options: ['A forward force is applied to them', 'Their inertia tends to keep them moving forward', 'The seatbelt pushes them forward', 'Gravity pulls them forward'],
          answer: 1,
          explanation: 'The passengers\' bodies tend to maintain their forward velocity (inertia). The car decelerates but the passengers, without a restraining force, continue forward.'
        },
        {
          id: 'ch05-s1-q5',
          type: 'mc',
          question: 'Newton\'s first law is valid in which type of reference frame?',
          options: ['Any reference frame', 'Only a rotating frame', 'An inertial (non-accelerating) frame', 'Only the Earth\'s surface'],
          answer: 2,
          explanation: 'Newton\'s laws hold in inertial reference frames, which are frames not undergoing acceleration.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 2: Newton's Second Law (F=ma)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch05-sec02',
      title: 'Newton\'s Second Law (F = ma)',
      content: `
<h2>Newton's Second Law (F = ma)</h2>
<p class="section-roadmap"><em>In this section you will learn Newton's second law, how to calculate acceleration from net force and mass, and how to apply it to one-dimensional problems.</em></p>

<div class="env-block theorem"><div class="env-title">Newton's Second Law</div><div class="env-body"><p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass:</p>
<div class="formula-box">\\(\\vec{F}_{\\text{net}} = m\\vec{a}\\)</div>
<p>In component form: \\(\\sum F_x = ma_x\\) and \\(\\sum F_y = ma_y\\).</p></div></div>

<p>This is the most important equation in all of mechanics. It tells us that:</p>
<ul>
  <li>Greater force produces greater acceleration (for the same mass).</li>
  <li>Greater mass produces smaller acceleration (for the same force).</li>
  <li>The direction of acceleration is the same as the direction of the net force.</li>
</ul>

<h3>Units</h3>
<p>From \\(F = ma\\): \\(1\\;\\text{N} = 1\\;\\text{kg} \\cdot \\text{m/s}^2\\). This is the defining relationship for the newton.</p>

<h3>Problem-Solving Strategy</h3>
<ol>
  <li>Draw a <strong>free body diagram</strong> of the object.</li>
  <li>Choose a coordinate system (align one axis with the acceleration if possible).</li>
  <li>Write \\(\\sum F_x = ma_x\\) and \\(\\sum F_y = ma_y\\).</li>
  <li>Solve for the unknowns.</li>
</ol>

<div class="env-block example"><div class="env-title">Example: Pushing a Box</div><div class="env-body"><p>A 10 kg box is pushed across a floor with an applied force of 50 N. The kinetic friction coefficient is \u03BCk = 0.2. Find the acceleration.</p>
<p>Step 1: N = mg = 10 \u00D7 9.8 = 98 N.</p>
<p>Step 2: fk = \u03BCk N = 0.2 \u00D7 98 = 19.6 N.</p>
<p>Step 3: \u03A3F = F - fk = 50 - 19.6 = 30.4 N.</p>
<p>Step 4: a = \u03A3F / m = 30.4 / 10 = 3.04 m/s\u00B2.</p></div></div>

<div class="env-block example"><div class="env-title">Example: Object on a Frictionless Incline</div><div class="env-body"><p>A 5 kg block slides down a frictionless incline at 37\u00B0. Find its acceleration.</p>
<p>Along the incline: \u03A3F = mg sin 37\u00B0 = 5 \u00D7 9.8 \u00D7 0.6 = 29.4 N.</p>
<p>a = \u03A3F / m = 29.4 / 5 = 5.88 m/s\u00B2 (down the slope).</p></div></div>

<div class="viz-container" id="viz-fma-explorer"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>The second law describes what happens to ONE object. But forces always come in pairs. When you push on a wall, the wall pushes back on you. The third law formalizes this reciprocity.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-fma-explorer',
          title: 'F = ma Explorer',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 40, originX: 80, originY: 270 });

            let appliedF = 20;
            let mass = 5;
            let muK = 0.2;
            let running = false;
            let t = 0;
            let xPos = 0;
            let vel = 0;

            VizEngine.createSlider(container, 'Applied Force (N): ', 0, 60, appliedF, 1, val => { appliedF = val; reset(); });
            VizEngine.createSlider(container, 'Mass (kg): ', 1, 20, mass, 1, val => { mass = val; reset(); });
            VizEngine.createSlider(container, '\u03BCk: ', 0, 0.6, muK, 0.05, val => { muK = val; reset(); });

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-top:6px';
            VizEngine.createButton(btnRow, 'Start', () => {
              if (!running) {
                running = true;
                v.animate(animate);
              }
            });
            VizEngine.createButton(btnRow, 'Reset', reset);
            container.appendChild(btnRow);

            function reset() {
              running = false;
              v.stopAnimation();
              t = 0; xPos = 0; vel = 0;
              draw();
            }

            function getAcceleration() {
              const g = 9.8;
              const N = mass * g;
              const fk = muK * N;
              const netF = appliedF - fk;
              return netF / mass;
            }

            function animate(timestamp) {
              const dt = 0.03;
              const a = getAcceleration();
              vel += a * dt;
              if (vel < 0) vel = 0;
              xPos += vel * dt;
              t += dt;

              // Wrap position for display
              if (xPos > 11) { xPos = 0; }
              draw();
            }

            function draw() {
              v.clear();
              const ctx = v.ctx;
              const g = 9.8;
              const N = mass * g;
              const fk = muK * N;
              const netF = appliedF - fk;
              const a = netF / mass;

              // Ground
              v.drawGround(-1, 0, 13, v.colors.text);

              // Block
              const bx = 1 + xPos;
              const blockLabel = mass.toFixed(0) + 'kg';
              v.drawMass(bx, 0.7, 1.2, v.colors.blue, blockLabel);

              // Applied force
              if (appliedF > 0.5) {
                const fScale = appliedF / 40;
                v.drawForce(bx - 0.6, 0.7, fScale * 2, 0, v.colors.orange, 'F=' + appliedF.toFixed(0) + 'N', 1);
              }

              // Friction
              if (fk > 0.5 && vel > 0.01) {
                const frScale = fk / 40;
                v.drawForce(bx + 0.6, 0.7, -frScale * 2, 0, v.colors.purple, 'f=' + fk.toFixed(1) + 'N', 1);
              }

              // Weight and Normal (smaller, below block)
              v.drawForce(bx, 0, 0, -1.2, v.colors.red, 'W', 1);
              v.drawForce(bx, 1.4, 0, 1.2, v.colors.green, 'N', 1);

              // Acceleration arrow (above)
              if (Math.abs(a) > 0.01) {
                const aScale = a / 10;
                v.drawForce(bx, 2.2, aScale * 2, 0, v.colors.yellow, 'a=' + a.toFixed(2) + ' m/s\u00B2', 1);
              }

              // Info panel (top right)
              const px = 380, py = 20;
              ctx.fillStyle = v.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('F(applied) = ' + appliedF.toFixed(1) + ' N', px, py);
              ctx.fillText('f(kinetic) = ' + fk.toFixed(1) + ' N', px, py + 18);
              ctx.fillText('F(net) = ' + netF.toFixed(1) + ' N', px, py + 36);
              ctx.fillStyle = v.colors.white;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.fillText('a = F(net)/m = ' + a.toFixed(2) + ' m/s\u00B2', px, py + 58);
              ctx.fillStyle = v.colors.teal;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText('v = ' + vel.toFixed(2) + ' m/s', px, py + 78);
              ctx.fillText('x = ' + xPos.toFixed(2) + ' m', px, py + 96);
              ctx.fillText('t = ' + t.toFixed(2) + ' s', px, py + 114);

              // Status
              const status = a > 0.01 ? 'Accelerating right' : (a < -0.01 ? 'Decelerating (friction > applied)' : 'Equilibrium (a = 0)');
              const sColor = a > 0.01 ? v.colors.green : (a < -0.01 ? v.colors.red : v.colors.yellow);
              v.screenText(status, v.width / 2, v.height - 12, sColor, 13);

              // F = ma equation
              v.screenText('\u03A3F = ma  \u2192  ' + netF.toFixed(1) + ' = ' + mass.toFixed(0) + ' \u00D7 ' + a.toFixed(2), v.width / 2, v.height - 32, v.colors.white, 13);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-s2-q1',
          type: 'mc',
          question: 'A net force of 24 N acts on a 6 kg object. What is its acceleration?',
          options: ['144 m/s\u00B2', '4 m/s\u00B2', '0.25 m/s\u00B2', '30 m/s\u00B2'],
          answer: 1,
          explanation: 'a = F/m = 24/6 = 4 m/s\u00B2.'
        },
        {
          id: 'ch05-s2-q2',
          type: 'mc',
          question: 'A 2 kg object accelerates at 5 m/s\u00B2. What is the net force on it?',
          options: ['2.5 N', '7 N', '10 N', '0.4 N'],
          answer: 2,
          explanation: 'F = ma = 2 \u00D7 5 = 10 N.'
        },
        {
          id: 'ch05-s2-q3',
          type: 'mc',
          question: 'If you double the net force on an object while keeping its mass constant, the acceleration:',
          options: ['Halves', 'Stays the same', 'Doubles', 'Quadruples'],
          answer: 2,
          explanation: 'a = F/m. Doubling F with constant m doubles a.'
        },
        {
          id: 'ch05-s2-q4',
          type: 'mc',
          question: 'A 10 kg block is pushed with 40 N on a surface with \u03BCk = 0.2. What is the acceleration? (g = 10 m/s\u00B2)',
          options: ['2 m/s\u00B2', '4 m/s\u00B2', '6 m/s\u00B2', '1 m/s\u00B2'],
          answer: 0,
          explanation: 'N = mg = 100 N. fk = 0.2 \u00D7 100 = 20 N. Net = 40 - 20 = 20 N. a = 20/10 = 2 m/s\u00B2.'
        },
        {
          id: 'ch05-s2-q5',
          type: 'mc',
          question: 'A 5 kg block slides down a frictionless incline at 30\u00B0. What is its acceleration? (g = 10 m/s\u00B2)',
          options: ['5 m/s\u00B2', '10 m/s\u00B2', '8.66 m/s\u00B2', '2.5 m/s\u00B2'],
          answer: 0,
          explanation: 'Along the incline: a = g sin 30\u00B0 = 10 \u00D7 0.5 = 5 m/s\u00B2.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 3: Newton's Third Law
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch05-sec03',
      title: 'Newton\'s Third Law',
      content: `
<h2>Newton's Third Law</h2>
<p class="section-roadmap"><em>In this section you will learn Newton's third law, how to identify action-reaction pairs, and common misconceptions about the third law.</em></p>

<div class="env-block theorem"><div class="env-title">Newton's Third Law</div><div class="env-body"><p>If object A exerts a force on object B, then object B exerts an equal and opposite force on object A:</p>
<div class="formula-box">\\(\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}\\)</div>
<p>These forces are called <strong>action-reaction pairs</strong>. They are always equal in magnitude, opposite in direction, the same type of force, and act on <strong>different objects</strong>.</p></div></div>

<h3>Identifying Action-Reaction Pairs</h3>
<p>To find the reaction to a given force, swap the two objects and reverse the direction:</p>
<table class="data-table">
  <thead><tr><th>Action Force</th><th>Reaction Force</th></tr></thead>
  <tbody>
    <tr><td>Earth pulls apple down (gravity)</td><td>Apple pulls Earth up (gravity)</td></tr>
    <tr><td>Foot pushes ground backward</td><td>Ground pushes foot forward</td></tr>
    <tr><td>Hammer pushes nail into wood</td><td>Nail pushes hammer back</td></tr>
    <tr><td>Rocket pushes exhaust gas downward</td><td>Exhaust gas pushes rocket upward</td></tr>
  </tbody>
</table>

<div class="env-block warning"><div class="env-title">Critical Point</div><div class="env-body"><p>Action-reaction forces act on <strong>different objects</strong>, so they <em>never cancel each other out</em>. A common mistake is thinking that because action and reaction are equal and opposite, nothing can ever accelerate. But since they act on different objects, each object responds only to the forces on it.</p></div></div>

<div class="env-block example"><div class="env-title">Example: Book on a Table</div><div class="env-body"><p>A book sits on a table. The book's weight (Earth pulling the book down) and the normal force (table pushing the book up) are equal and opposite but are <em>not</em> an action-reaction pair, because both act on the same object (the book). They are an <em>equilibrium pair</em>.</p>
<p>The true action-reaction pairs are:</p>
<ul>
<li>Earth pulls book down / book pulls Earth up (gravitational pair)</li>
<li>Table pushes book up / book pushes table down (normal force pair)</li>
</ul></div></div>

<h3>Why Does a Horse Pull a Cart?</h3>
<p>The horse pushes the ground backward with its hooves. The ground pushes the horse forward (reaction). This forward force on the horse exceeds the backward friction from the cart on the horse, so the horse accelerates. The cart accelerates because the forward pull from the horse exceeds the backward friction from the ground on the cart.</p>

<div class="viz-container" id="viz-third-law"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>You now know all three of Newton's laws. The next section applies them to real-world problems involving objects on inclines, in elevators, and under multiple forces.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-third-law',
          title: 'Action-Reaction Pairs',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 40, originX: 310, originY: 200 });

            let scenario = 0;
            const scenarios = [
              {
                name: 'Push Between Two Blocks',
                draw(v) {
                  const ctx = v.ctx;
                  // Block A
                  v.drawMass(-2, 0, 1.5, v.colors.blue, 'A');
                  // Block B
                  v.drawMass(2, 0, 1.5, v.colors.orange, 'B');
                  // A pushes B right
                  v.drawForce(0.8, 0.2, 1.5, 0, v.colors.teal, 'F(A\u2192B)', 1);
                  // B pushes A left
                  v.drawForce(-0.8, -0.2, -1.5, 0, v.colors.red, 'F(B\u2192A)', 1);
                  v.screenText('A pushes B to the right; B pushes A to the left with equal force.', v.width / 2, v.height - 50, v.colors.text, 12);
                  v.screenText('Same magnitude, opposite direction, different objects!', v.width / 2, v.height - 30, v.colors.yellow, 12);
                }
              },
              {
                name: 'Earth and Apple',
                draw(v) {
                  const ctx = v.ctx;
                  // Earth (big circle at bottom)
                  ctx.fillStyle = v.colors.green + '33';
                  ctx.beginPath();
                  ctx.arc(v.width / 2, v.height + 200, 280, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.strokeStyle = v.colors.green;
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.arc(v.width / 2, v.height + 200, 280, 0, Math.PI * 2);
                  ctx.stroke();
                  v.screenText('Earth', v.width / 2, v.height - 60, v.colors.green, 14);
                  // Apple
                  ctx.fillStyle = v.colors.red;
                  ctx.beginPath();
                  ctx.arc(v.width / 2, 100, 15, 0, Math.PI * 2);
                  ctx.fill();
                  v.screenText('Apple', v.width / 2, 78, v.colors.red, 13);
                  // Earth pulls apple down
                  v.drawVector(v.width / 2 - 30, 120, v.width / 2 - 30, 200, v.colors.teal, '', 2.5);
                  v.screenText('W (Earth pulls apple down)', v.width / 2 - 90, 165, v.colors.teal, 11, 'left');
                  // Apple pulls earth up
                  v.drawVector(v.width / 2 + 30, v.height - 95, v.width / 2 + 30, v.height - 175, v.colors.orange, '', 2.5);
                  v.screenText('Apple pulls Earth up', v.width / 2 + 50, v.height - 135, v.colors.orange, 11, 'left');
                  v.screenText('Equal forces, but Earth\'s huge mass means its acceleration is negligible.', v.width / 2, 30, v.colors.text, 12);
                }
              },
              {
                name: 'Rocket Propulsion',
                draw(v) {
                  const ctx = v.ctx;
                  // Rocket body
                  ctx.fillStyle = v.colors.text + '55';
                  ctx.beginPath();
                  ctx.moveTo(v.width / 2 - 25, 250);
                  ctx.lineTo(v.width / 2 + 25, 250);
                  ctx.lineTo(v.width / 2 + 20, 120);
                  ctx.lineTo(v.width / 2, 80);
                  ctx.lineTo(v.width / 2 - 20, 120);
                  ctx.closePath();
                  ctx.fill();
                  ctx.strokeStyle = v.colors.text;
                  ctx.lineWidth = 1.5;
                  ctx.stroke();
                  v.screenText('Rocket', v.width / 2, 170, v.colors.white, 13);
                  // Exhaust
                  ctx.fillStyle = v.colors.orange + '55';
                  ctx.beginPath();
                  ctx.moveTo(v.width / 2 - 20, 255);
                  ctx.lineTo(v.width / 2 + 20, 255);
                  ctx.lineTo(v.width / 2 + 10, 330);
                  ctx.lineTo(v.width / 2 - 10, 330);
                  ctx.closePath();
                  ctx.fill();
                  v.screenText('Exhaust gas', v.width / 2, 345, v.colors.orange, 11);
                  // Force on exhaust (down)
                  ctx.strokeStyle = v.colors.orange;
                  ctx.lineWidth = 3;
                  ctx.beginPath();
                  ctx.moveTo(v.width / 2 + 50, 260);
                  ctx.lineTo(v.width / 2 + 50, 330);
                  ctx.stroke();
                  ctx.fillStyle = v.colors.orange;
                  ctx.beginPath();
                  ctx.moveTo(v.width / 2 + 50, 338);
                  ctx.lineTo(v.width / 2 + 44, 326);
                  ctx.lineTo(v.width / 2 + 56, 326);
                  ctx.closePath();
                  ctx.fill();
                  v.screenText('Rocket pushes gas down', v.width / 2 + 120, 300, v.colors.orange, 11);
                  // Force on rocket (up)
                  ctx.strokeStyle = v.colors.teal;
                  ctx.lineWidth = 3;
                  ctx.beginPath();
                  ctx.moveTo(v.width / 2 - 50, 250);
                  ctx.lineTo(v.width / 2 - 50, 170);
                  ctx.stroke();
                  ctx.fillStyle = v.colors.teal;
                  ctx.beginPath();
                  ctx.moveTo(v.width / 2 - 50, 162);
                  ctx.lineTo(v.width / 2 - 56, 174);
                  ctx.lineTo(v.width / 2 - 44, 174);
                  ctx.closePath();
                  ctx.fill();
                  v.screenText('Gas pushes rocket up', v.width / 2 - 120, 200, v.colors.teal, 11);
                  v.screenText('Rocket propulsion is a direct application of Newton\'s Third Law!', v.width / 2, 30, v.colors.yellow, 13);
                }
              }
            ];

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-bottom:8px;flex-wrap:wrap';
            scenarios.forEach((s, i) => {
              VizEngine.createButton(btnRow, s.name, () => { scenario = i; draw(); });
            });
            container.appendChild(btnRow);

            function draw() {
              v.clear();
              scenarios[scenario].draw(v);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-s3-q1',
          type: 'mc',
          question: 'According to Newton\'s third law, action and reaction forces:',
          options: ['Act on the same object', 'Act on different objects', 'Do not have to be equal', 'Must be contact forces'],
          answer: 1,
          explanation: 'Action-reaction pairs always act on two different objects. This is why they do not cancel each other out.'
        },
        {
          id: 'ch05-s3-q2',
          type: 'mc',
          question: 'A person stands on a floor. The reaction force to the person\'s weight (Earth pulling person down) is:',
          options: ['The normal force from the floor', 'The person pulling the Earth upward', 'The friction from the floor', 'There is no reaction force'],
          answer: 1,
          explanation: 'The reaction to Earth\'s gravitational pull on the person is the person\'s gravitational pull on the Earth. The normal force from the floor is NOT the reaction to weight; it is a different force pair.'
        },
        {
          id: 'ch05-s3-q3',
          type: 'mc',
          question: 'If action and reaction forces are always equal and opposite, how can anything accelerate?',
          options: ['They can never actually be equal', 'They act on different objects, so each object only feels one of them', 'The third law only applies to stationary objects', 'It requires a third force'],
          answer: 1,
          explanation: 'Since action and reaction act on different objects, each object has its own set of forces. The net force on each individual object determines its acceleration.'
        },
        {
          id: 'ch05-s3-q4',
          type: 'mc',
          question: 'When you walk, you push the ground backward. What force propels you forward?',
          options: ['Your muscles', 'The ground pushing you forward (reaction)', 'Air pressure', 'Gravity'],
          answer: 1,
          explanation: 'By Newton\'s third law, when your foot pushes backward on the ground, the ground pushes your foot forward. This forward friction force from the ground propels you.'
        },
        {
          id: 'ch05-s3-q5',
          type: 'mc',
          question: 'A 1000 kg car collides with a 2000 kg truck. Which experiences a greater force during the collision?',
          options: ['The car', 'The truck', 'They experience the same force', 'It depends on speed'],
          answer: 2,
          explanation: 'By Newton\'s third law, the force the car exerts on the truck equals the force the truck exerts on the car. However, the car has greater acceleration because of its smaller mass.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 4: Applications of Newton's Laws
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch05-sec04',
      title: 'Applications of Newton\'s Laws',
      content: `
<h2>Applications of Newton's Laws</h2>
<p class="section-roadmap"><em>In this section you will apply Newton's laws to classic problems: objects in elevators, blocks on inclines with friction, and systems with pulleys.</em></p>

<h3>Apparent Weight in an Elevator</h3>
<p>When you stand on a scale in an elevator, the scale reads the <strong>normal force</strong>, which equals your <strong>apparent weight</strong>. Applying Newton's second law vertically (taking upward as positive):</p>

<div class="formula-box">\\(N - mg = ma\\)</div>
<div class="formula-box">\\(N = m(g + a)\\)</div>

<table class="data-table">
  <thead><tr><th>Elevator Motion</th><th>Acceleration</th><th>Apparent Weight</th><th>Feeling</th></tr></thead>
  <tbody>
    <tr><td>At rest or constant velocity</td><td>a = 0</td><td>N = mg</td><td>Normal</td></tr>
    <tr><td>Accelerating upward</td><td>a > 0</td><td>N > mg</td><td>Heavier</td></tr>
    <tr><td>Accelerating downward</td><td>a < 0</td><td>N < mg</td><td>Lighter</td></tr>
    <tr><td>Free fall</td><td>a = -g</td><td>N = 0</td><td>Weightless</td></tr>
  </tbody>
</table>

<div class="env-block example"><div class="env-title">Example: Elevator Problem</div><div class="env-body"><p>A 60 kg person stands on a scale in an elevator accelerating upward at 2 m/s\u00B2. What does the scale read?</p>
<p>N = m(g + a) = 60(9.8 + 2) = 60 \u00D7 11.8 = 708 N.</p>
<p>The person feels heavier. Their true weight is only 588 N.</p></div></div>

<h3>Block on an Incline with Friction</h3>
<p>For a block sliding down a rough incline at angle \\(\\theta\\):</p>
<div class="formula-box">\\(ma = mg\\sin\\theta - \\mu_k mg\\cos\\theta\\)</div>
<div class="formula-box">\\(a = g(\\sin\\theta - \\mu_k\\cos\\theta)\\)</div>

<p>The block remains stationary if \\(\\mu_s \\geq \\tan\\theta\\).</p>

<h3>Pulling at an Angle</h3>
<p>When a force is applied at angle \\(\\phi\\) above the horizontal to a block on a surface:</p>
<ul>
  <li>Horizontal: \\(F\\cos\\phi - f_k = ma\\)</li>
  <li>Vertical: \\(N + F\\sin\\phi - mg = 0\\), so \\(N = mg - F\\sin\\phi\\)</li>
</ul>
<p>Pulling at an angle <em>reduces</em> the normal force (and therefore friction), making it easier to slide the block.</p>

<div class="viz-container" id="viz-elevator"></div>

<div class="env-block intuition"><div class="env-title">Looking Ahead</div><div class="env-body"><p>So far we have analyzed single objects. Many real problems involve two or more objects connected by ropes or in contact. The final section tackles these multi-body systems.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-elevator',
          title: 'Elevator Apparent Weight Simulator',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 400, scale: 40, originX: 310, originY: 200 });

            let mass = 60;
            let accel = 0;

            VizEngine.createSlider(container, 'Mass (kg): ', 30, 100, mass, 5, val => { mass = val; draw(); });
            VizEngine.createSlider(container, 'Elevator acceleration (m/s\u00B2): ', -9.8, 5, accel, 0.2, val => { accel = val; draw(); });

            function draw() {
              v.clear();
              const ctx = v.ctx;
              const g = 9.8;
              const W = mass * g;
              const N = mass * (g + accel);
              const apparentN = Math.max(0, N);

              // Elevator box
              const ex = 150, ey = 60, ew = 200, eh = 280;
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 2;
              ctx.strokeRect(ex, ey, ew, eh);

              // Elevator cable
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(ex + ew / 2, ey);
              ctx.lineTo(ex + ew / 2, 20);
              ctx.stroke();

              // Floor of elevator
              ctx.fillStyle = v.colors.text + '33';
              ctx.fillRect(ex, ey + eh - 20, ew, 20);

              // Person (stick figure)
              const px = ex + ew / 2, py = ey + eh - 100;
              // Head
              ctx.strokeStyle = v.colors.blue;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(px, py - 30, 12, 0, Math.PI * 2);
              ctx.stroke();
              // Body
              ctx.beginPath();
              ctx.moveTo(px, py - 18);
              ctx.lineTo(px, py + 20);
              ctx.stroke();
              // Arms
              ctx.beginPath();
              ctx.moveTo(px - 20, py);
              ctx.lineTo(px + 20, py);
              ctx.stroke();
              // Legs
              ctx.beginPath();
              ctx.moveTo(px, py + 20);
              ctx.lineTo(px - 15, py + 50);
              ctx.moveTo(px, py + 20);
              ctx.lineTo(px + 15, py + 50);
              ctx.stroke();

              // Scale under person
              ctx.fillStyle = v.colors.teal + '66';
              ctx.fillRect(px - 20, ey + eh - 30, 40, 10);
              ctx.strokeStyle = v.colors.teal;
              ctx.lineWidth = 1;
              ctx.strokeRect(px - 20, ey + eh - 30, 40, 10);

              // Scale reading
              ctx.fillStyle = v.colors.teal;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(apparentN.toFixed(0) + ' N', px, ey + eh - 36);

              // Weight arrow (right side)
              const arrowX = ex + ew + 30;
              const wScale = W / 5;
              ctx.strokeStyle = v.colors.red;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(arrowX, py);
              ctx.lineTo(arrowX, py + wScale);
              ctx.stroke();
              ctx.fillStyle = v.colors.red;
              ctx.beginPath();
              ctx.moveTo(arrowX, py + wScale + 8);
              ctx.lineTo(arrowX - 5, py + wScale);
              ctx.lineTo(arrowX + 5, py + wScale);
              ctx.closePath();
              ctx.fill();
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('W = ' + W.toFixed(0) + ' N', arrowX + 10, py + wScale / 2);

              // Normal arrow (left side)
              const nArrowX = ex - 30;
              const nScale = apparentN / 5;
              if (apparentN > 0.5) {
                ctx.strokeStyle = v.colors.green;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(nArrowX, py + 50);
                ctx.lineTo(nArrowX, py + 50 - nScale);
                ctx.stroke();
                ctx.fillStyle = v.colors.green;
                ctx.beginPath();
                ctx.moveTo(nArrowX, py + 50 - nScale - 8);
                ctx.lineTo(nArrowX - 5, py + 50 - nScale);
                ctx.lineTo(nArrowX + 5, py + 50 - nScale);
                ctx.closePath();
                ctx.fill();
                ctx.font = '11px -apple-system,sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText('N = ' + apparentN.toFixed(0) + ' N', nArrowX - 10, py + 50 - nScale / 2);
              }

              // Acceleration indicator
              if (Math.abs(accel) > 0.05) {
                const aDir = accel > 0 ? -1 : 1;
                const aLen = Math.abs(accel) * 4;
                ctx.strokeStyle = v.colors.yellow;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(ex + ew / 2 + 60, py);
                ctx.lineTo(ex + ew / 2 + 60, py + aDir * aLen);
                ctx.stroke();
                ctx.fillStyle = v.colors.yellow;
                ctx.beginPath();
                ctx.moveTo(ex + ew / 2 + 60, py + aDir * (aLen + 8));
                ctx.lineTo(ex + ew / 2 + 55, py + aDir * aLen);
                ctx.lineTo(ex + ew / 2 + 65, py + aDir * aLen);
                ctx.closePath();
                ctx.fill();
              }

              // Info panel
              const info = [
                'Mass: ' + mass.toFixed(0) + ' kg',
                'True weight: ' + W.toFixed(0) + ' N',
                'Acceleration: ' + accel.toFixed(1) + ' m/s\u00B2',
                'Apparent weight (scale): ' + apparentN.toFixed(0) + ' N'
              ];

              info.forEach((line, i) => {
                ctx.fillStyle = i === 3 ? v.colors.white : v.colors.text;
                ctx.font = (i === 3 ? 'bold ' : '') + '12px -apple-system,sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(line, 420, 80 + i * 20);
              });

              // Status
              let status, sColor;
              if (Math.abs(accel) < 0.05) {
                status = 'At rest / constant velocity: normal weight';
                sColor = v.colors.text;
              } else if (accel > 0) {
                status = 'Accelerating UP: you feel heavier!';
                sColor = v.colors.orange;
              } else if (accel > -g + 0.05) {
                status = 'Accelerating DOWN: you feel lighter!';
                sColor = v.colors.teal;
              } else {
                status = 'FREE FALL: weightless! (N = 0)';
                sColor = v.colors.red;
              }
              v.screenText(status, v.width / 2, v.height - 12, sColor, 13);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-s4-q1',
          type: 'mc',
          question: 'A 50 kg person stands on a scale in an elevator accelerating upward at 3 m/s\u00B2. What does the scale read? (g = 10 m/s\u00B2)',
          options: ['500 N', '650 N', '350 N', '150 N'],
          answer: 1,
          explanation: 'N = m(g + a) = 50(10 + 3) = 650 N.'
        },
        {
          id: 'ch05-s4-q2',
          type: 'mc',
          question: 'In a freely falling elevator, the scale under your feet reads:',
          options: ['Your normal weight', 'Twice your weight', 'Zero (apparent weightlessness)', 'Half your weight'],
          answer: 2,
          explanation: 'In free fall, a = -g, so N = m(g + (-g)) = 0. You feel weightless.'
        },
        {
          id: 'ch05-s4-q3',
          type: 'mc',
          question: 'A block is on a rough incline at angle \u03B8 with \u03BCs. The block will NOT slide if:',
          options: ['\u03BCs > sin \u03B8', '\u03BCs > cos \u03B8', '\u03BCs > tan \u03B8', '\u03BCs > 1'],
          answer: 2,
          explanation: 'The block is on the verge of sliding when mg sin \u03B8 = \u03BCs mg cos \u03B8, giving \u03BCs = tan \u03B8. It stays put if \u03BCs >= tan \u03B8.'
        },
        {
          id: 'ch05-s4-q4',
          type: 'mc',
          question: 'A block slides down a rough incline at 45\u00B0 with \u03BCk = 0.3. What is its acceleration? (g = 10 m/s\u00B2)',
          options: ['4.95 m/s\u00B2', '7.07 m/s\u00B2', '2.12 m/s\u00B2', '5.83 m/s\u00B2'],
          answer: 0,
          explanation: 'a = g(sin 45\u00B0 - \u03BCk cos 45\u00B0) = 10(0.707 - 0.3 \u00D7 0.707) = 10 \u00D7 0.707 \u00D7 0.7 = 4.95 m/s\u00B2.'
        },
        {
          id: 'ch05-s4-q5',
          type: 'mc',
          question: 'When pulling a block at an angle \u03C6 above the horizontal, increasing \u03C6 (while keeping force magnitude constant):',
          options: ['Increases friction', 'Has no effect on friction', 'Decreases normal force and friction', 'Increases the normal force'],
          answer: 2,
          explanation: 'Pulling at an angle has a vertical component F sin \u03C6 that reduces the normal force: N = mg - F sin \u03C6. Since friction = \u03BC N, friction also decreases.'
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 5: Systems and Connected Objects
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'ch05-sec05',
      title: 'Systems and Connected Objects',
      content: `
<h2>Systems and Connected Objects</h2>
<p class="section-roadmap"><em>In this section you will learn to analyze multi-body systems, including Atwood machines, objects connected by ropes on surfaces, and the system method vs. the individual-object method.</em></p>

<h3>The Atwood Machine</h3>
<p>An Atwood machine consists of two masses \\(m_1\\) and \\(m_2\\) connected by a massless inextensible rope over a frictionless pulley. If \\(m_1 > m_2\\):</p>

<div class="formula-box">\\(a = \\frac{(m_1 - m_2)}{(m_1 + m_2)}\\,g\\)</div>
<div class="formula-box">\\(T = \\frac{2m_1 m_2}{m_1 + m_2}\\,g\\)</div>

<div class="env-block definition"><div class="env-title">Derivation</div><div class="env-body"><p>For mass \\(m_1\\) (heavier, accelerates downward): \\(m_1 g - T = m_1 a\\)</p>
<p>For mass \\(m_2\\) (lighter, accelerates upward): \\(T - m_2 g = m_2 a\\)</p>
<p>Adding both equations: \\((m_1 - m_2)g = (m_1 + m_2)a\\), which gives the result.</p></div></div>

<h3>Connected Blocks on a Surface</h3>
<p>When two blocks are connected by a rope on a frictionless surface and pulled by force \\(F\\):</p>
<div class="formula-box">\\(a = \\frac{F}{m_1 + m_2}\\)</div>
<p>The tension in the connecting rope is found by applying \\(F = ma\\) to either block individually.</p>

<h3>System Method vs. Individual Method</h3>

<div class="env-block remark"><div class="env-title">Two Approaches</div><div class="env-body">
<p><strong>System method:</strong> Treat all connected objects as one system. The acceleration is: \\(a = F_{\\text{net, external}} / m_{\\text{total}}\\). Internal forces (like tension between blocks) cancel out.</p>
<p><strong>Individual method:</strong> Draw a separate FBD for each object. Write \\(F = ma\\) for each, then solve the system of equations. This gives both the acceleration AND the internal forces (tensions).</p>
</div></div>

<div class="env-block example"><div class="env-title">Example: Atwood Machine</div><div class="env-body"><p>Two masses, \\(m_1 = 5\\;\\text{kg}\\) and \\(m_2 = 3\\;\\text{kg}\\), hang from a massless rope over a frictionless pulley.</p>
<p>\\(a = \\frac{(5-3)}{(5+3)} \\times 9.8 = \\frac{2}{8} \\times 9.8 = 2.45\\;\\text{m/s}^2\\)</p>
<p>\\(T = \\frac{2 \\times 5 \\times 3}{5+3} \\times 9.8 = \\frac{30}{8} \\times 9.8 = 36.75\\;\\text{N}\\)</p>
<p>Note: \\(T\\) is between \\(m_2 g = 29.4\\;\\text{N}\\) and \\(m_1 g = 49\\;\\text{N}\\), as expected.</p></div></div>

<div class="viz-container" id="viz-atwood"></div>

<div class="viz-container" id="viz-connected-blocks"></div>

<div class="env-block intuition"><div class="env-title">Chapter Summary</div><div class="env-body"><p>Newton's three laws form a complete framework for classical mechanics. The first law defines inertia and equilibrium. The second law, F = ma, connects force to acceleration quantitatively. The third law ensures forces always come in pairs. With free body diagrams and systematic application of these laws, you can solve any mechanics problem from elevator rides to rocket launches. These tools will be your foundation for all of physics to come.</p></div></div>`,
      visualizations: [
        {
          id: 'viz-atwood',
          title: 'Atwood Machine Simulator',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 420, scale: 40, originX: 310, originY: 60 });

            let m1 = 5, m2 = 3;
            let running = false;
            let t = 0;
            let y1 = 0, y2 = 0, vel = 0;

            VizEngine.createSlider(container, 'm1 (kg): ', 1, 15, m1, 0.5, val => { m1 = val; reset(); });
            VizEngine.createSlider(container, 'm2 (kg): ', 1, 15, m2, 0.5, val => { m2 = val; reset(); });

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-top:6px';
            VizEngine.createButton(btnRow, 'Release', () => {
              if (!running) {
                running = true;
                v.animate(animate);
              }
            });
            VizEngine.createButton(btnRow, 'Reset', reset);
            container.appendChild(btnRow);

            function reset() {
              running = false;
              v.stopAnimation();
              t = 0; y1 = 0; y2 = 0; vel = 0;
              draw();
            }

            function animate(timestamp) {
              const g = 9.8;
              const a = ((m1 - m2) / (m1 + m2)) * g;
              const dt = 0.025;
              vel += a * dt;
              y1 += vel * dt;
              y2 -= vel * dt;
              t += dt;

              // Limit travel
              if (y1 > 5 || y2 > 5) {
                vel = 0;
                running = false;
                v.stopAnimation();
              }
              draw();
            }

            function draw() {
              v.clear();
              const ctx = v.ctx;
              const g = 9.8;
              const a = ((m1 - m2) / (m1 + m2)) * g;
              const T = (2 * m1 * m2) / (m1 + m2) * g;

              // Pulley
              const pulleyX = v.width / 2, pulleyY = 40;
              const pulleyR = 20;
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(pulleyX, pulleyY, pulleyR, 0, Math.PI * 2);
              ctx.stroke();
              ctx.fillStyle = v.colors.bg;
              ctx.beginPath();
              ctx.arc(pulleyX, pulleyY, 5, 0, Math.PI * 2);
              ctx.fill();
              ctx.strokeStyle = v.colors.text;
              ctx.beginPath();
              ctx.arc(pulleyX, pulleyY, 5, 0, Math.PI * 2);
              ctx.stroke();

              // Support
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(pulleyX - 40, 15);
              ctx.lineTo(pulleyX + 40, 15);
              ctx.stroke();
              // hatching
              ctx.lineWidth = 1;
              for (let i = pulleyX - 40; i < pulleyX + 40; i += 10) {
                ctx.beginPath();
                ctx.moveTo(i, 15);
                ctx.lineTo(i - 6, 5);
                ctx.stroke();
              }

              // Ropes and masses
              const leftX = pulleyX - 80, rightX = pulleyX + 80;
              const baseY = pulleyY + pulleyR;
              const scale = 20; // pixels per meter

              // Left rope (m1)
              const m1Y = baseY + 80 + y1 * scale;
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 1.5;
              // rope from pulley to mass
              ctx.beginPath();
              ctx.moveTo(pulleyX - pulleyR, pulleyY);
              ctx.lineTo(leftX, pulleyY);
              ctx.lineTo(leftX, m1Y);
              ctx.stroke();
              // Mass 1
              const blockSize = 40;
              ctx.fillStyle = v.colors.blue + 'aa';
              ctx.fillRect(leftX - blockSize / 2, m1Y, blockSize, blockSize);
              ctx.strokeStyle = v.colors.blue;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(leftX - blockSize / 2, m1Y, blockSize, blockSize);
              ctx.fillStyle = v.colors.white;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('m1', leftX, m1Y + blockSize / 2);
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText(m1.toFixed(1) + ' kg', leftX, m1Y + blockSize / 2 + 16);

              // Right rope (m2)
              const m2Y = baseY + 80 + y2 * scale;
              ctx.strokeStyle = v.colors.text;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(pulleyX + pulleyR, pulleyY);
              ctx.lineTo(rightX, pulleyY);
              ctx.lineTo(rightX, m2Y);
              ctx.stroke();
              // Mass 2
              ctx.fillStyle = v.colors.orange + 'aa';
              ctx.fillRect(rightX - blockSize / 2, m2Y, blockSize, blockSize);
              ctx.strokeStyle = v.colors.orange;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(rightX - blockSize / 2, m2Y, blockSize, blockSize);
              ctx.fillStyle = v.colors.white;
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.fillText('m2', rightX, m2Y + blockSize / 2);
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText(m2.toFixed(1) + ' kg', rightX, m2Y + blockSize / 2 + 16);

              // Force arrows on m1
              // Weight down
              ctx.strokeStyle = v.colors.red;
              ctx.lineWidth = 2;
              const w1 = m1 * g;
              const w1Len = w1 / 5;
              ctx.beginPath();
              ctx.moveTo(leftX - 30, m1Y + blockSize / 2);
              ctx.lineTo(leftX - 30, m1Y + blockSize / 2 + w1Len);
              ctx.stroke();
              ctx.fillStyle = v.colors.red;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText('m1g', leftX - 34, m1Y + blockSize / 2 + w1Len / 2);

              // Tension up
              ctx.strokeStyle = v.colors.green;
              ctx.beginPath();
              ctx.moveTo(leftX - 30, m1Y + blockSize / 2);
              ctx.lineTo(leftX - 30, m1Y + blockSize / 2 - T / 5);
              ctx.stroke();
              ctx.fillStyle = v.colors.green;
              ctx.fillText('T', leftX - 34, m1Y + blockSize / 2 - T / 10);

              // Force arrows on m2
              const w2 = m2 * g;
              const w2Len = w2 / 5;
              ctx.strokeStyle = v.colors.red;
              ctx.beginPath();
              ctx.moveTo(rightX + 30, m2Y + blockSize / 2);
              ctx.lineTo(rightX + 30, m2Y + blockSize / 2 + w2Len);
              ctx.stroke();
              ctx.fillStyle = v.colors.red;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('m2g', rightX + 34, m2Y + blockSize / 2 + w2Len / 2);

              ctx.strokeStyle = v.colors.green;
              ctx.beginPath();
              ctx.moveTo(rightX + 30, m2Y + blockSize / 2);
              ctx.lineTo(rightX + 30, m2Y + blockSize / 2 - T / 5);
              ctx.stroke();
              ctx.fillStyle = v.colors.green;
              ctx.fillText('T', rightX + 34, m2Y + blockSize / 2 - T / 10);

              // Info panel
              const ix = 420, iy = 120;
              ctx.fillStyle = v.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('m1 = ' + m1.toFixed(1) + ' kg', ix, iy);
              ctx.fillText('m2 = ' + m2.toFixed(1) + ' kg', ix, iy + 20);
              ctx.fillStyle = v.colors.white;
              ctx.font = 'bold 12px -apple-system,sans-serif';
              ctx.fillText('a = ' + a.toFixed(2) + ' m/s\u00B2', ix, iy + 46);
              ctx.fillText('T = ' + T.toFixed(1) + ' N', ix, iy + 66);
              ctx.fillStyle = v.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText('v = ' + Math.abs(vel).toFixed(2) + ' m/s', ix, iy + 90);
              ctx.fillText('t = ' + t.toFixed(2) + ' s', ix, iy + 108);

              // Formulas
              ctx.fillStyle = v.colors.teal;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText('a = (m1-m2)g/(m1+m2)', ix, iy + 140);
              ctx.fillText('T = 2m1m2g/(m1+m2)', ix, iy + 158);

              // Direction indicator
              if (Math.abs(a) > 0.01) {
                const dir = a > 0 ? 'm1 falls, m2 rises' : 'm2 falls, m1 rises';
                v.screenText(dir, v.width / 2, v.height - 12, v.colors.yellow, 13);
              } else {
                v.screenText('Balanced! (m1 = m2, a = 0)', v.width / 2, v.height - 12, v.colors.green, 13);
              }
            }
            draw();
            return v;
          }
        },
        {
          id: 'viz-connected-blocks',
          title: 'Connected Blocks on a Surface',
          setup(container) {
            const v = new VizEngine(container, { width: 620, height: 360, scale: 40, originX: 60, originY: 260 });

            let m1 = 3, m2 = 5, F = 20, mu = 0;

            VizEngine.createSlider(container, 'm1 (front, kg): ', 1, 10, m1, 0.5, val => { m1 = val; draw(); });
            VizEngine.createSlider(container, 'm2 (rear, kg): ', 1, 10, m2, 0.5, val => { m2 = val; draw(); });
            VizEngine.createSlider(container, 'Applied Force F (N): ', 0, 50, F, 1, val => { F = val; draw(); });
            VizEngine.createSlider(container, '\u03BC (friction): ', 0, 0.5, mu, 0.05, val => { mu = val; draw(); });

            function draw() {
              v.clear();
              const ctx = v.ctx;
              const g = 9.8;

              // Ground
              v.drawGround(-1, 0, 14, v.colors.text);

              // Block m2 (rear, being pulled)
              const b2x = 3, b2y = 0.7;
              v.drawMass(b2x, b2y, 1.2, v.colors.orange, m2.toFixed(1));

              // Block m1 (front, connected)
              const b1x = 6, b1y = 0.7;
              v.drawMass(b1x, b1y, 1.0, v.colors.blue, m1.toFixed(1));

              // Rope between blocks
              v.drawSegment(b2x + 0.6, b2y, b1x - 0.5, b1y, v.colors.text, 1.5, true);

              // Calculations
              const totalMass = m1 + m2;
              const frictionTotal = mu * totalMass * g;
              const netF = F - frictionTotal;
              const a = netF / totalMass;

              // Tension: F = ma for m1 alone
              // T - \u03BC*m1*g = m1*a
              const T = m1 * a + mu * m1 * g;

              // Applied force arrow on m2
              if (F > 0.5) {
                const fScale = F / 20;
                v.drawForce(b2x - 0.6, b2y, -fScale, 0, v.colors.red, 'F=' + F + 'N', 1);
                // Actually pushing from left, so force points right
                // Let me fix: force pushes the rear block to the right
              }

              // Actually let's make F push m1 (front block) to the right
              // and m2 is the rear block connected by rope
              // Re-draw: F pushes m1 right, rope tension pulls m2

              v.clear();
              v.drawGround(-1, 0, 14, v.colors.text);

              // Block m2 (rear)
              v.drawMass(b2x, b2y, 1.2, v.colors.orange, 'm2=' + m2.toFixed(1));
              // Block m1 (front, force applied)
              v.drawMass(b1x, b1y, 1.0, v.colors.blue, 'm1=' + m1.toFixed(1));
              // Rope
              v.drawSegment(b2x + 0.6, b2y, b1x - 0.5, b1y, v.colors.text, 1.5, true);
              ctx.fillStyle = v.colors.text;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              const [rx, ry] = v.toScreen((b2x + b1x) / 2, b2y + 0.4);
              ctx.fillText('rope (T)', rx, ry);

              // Applied force on m1
              if (F > 0.5) {
                v.drawForce(b1x + 0.5, b1y, F / 20, 0, v.colors.teal, 'F=' + F + 'N', 1);
              }

              // Friction arrows
              if (mu > 0.001) {
                const f1 = mu * m1 * g;
                const f2 = mu * m2 * g;
                v.drawForce(b1x, b1y - 0.5, -f1 / 30, 0, v.colors.purple, 'f1', 1);
                v.drawForce(b2x, b2y - 0.5, -f2 / 30, 0, v.colors.purple, 'f2', 1);
              }

              // Info
              const infoX = 10, infoY = 18;
              ctx.fillStyle = v.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('Total mass = ' + totalMass.toFixed(1) + ' kg', infoX, infoY);
              ctx.fillText('Total friction = ' + frictionTotal.toFixed(1) + ' N', infoX, infoY + 18);
              ctx.fillText('Net external force = ' + netF.toFixed(1) + ' N', infoX, infoY + 36);
              ctx.fillStyle = v.colors.white;
              ctx.font = 'bold 12px -apple-system,sans-serif';
              ctx.fillText('a = F(net)/(m1+m2) = ' + (a > 0 ? a.toFixed(2) : '0') + ' m/s\u00B2', infoX, infoY + 60);
              ctx.fillText('T (rope tension) = ' + (T > 0 ? T.toFixed(1) : '0') + ' N', infoX, infoY + 80);

              // Status
              const status = a > 0.01 ? 'System accelerates to the right' : (netF < -0.01 ? 'Applied force too weak to overcome friction' : 'System in equilibrium');
              v.screenText(status, v.width / 2, v.height - 12, a > 0.01 ? v.colors.green : v.colors.orange, 13);
            }
            draw();
            return v;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-s5-q1',
          type: 'mc',
          question: 'In an Atwood machine with m1 = 6 kg and m2 = 4 kg, what is the acceleration? (g = 10 m/s\u00B2)',
          options: ['2 m/s\u00B2', '5 m/s\u00B2', '10 m/s\u00B2', '1 m/s\u00B2'],
          answer: 0,
          explanation: 'a = (m1-m2)g/(m1+m2) = (6-4)\u00D710/(6+4) = 20/10 = 2 m/s\u00B2.'
        },
        {
          id: 'ch05-s5-q2',
          type: 'mc',
          question: 'In an Atwood machine with m1 = 6 kg and m2 = 4 kg, what is the tension? (g = 10 m/s\u00B2)',
          options: ['40 N', '48 N', '60 N', '50 N'],
          answer: 1,
          explanation: 'T = 2m1m2g/(m1+m2) = 2\u00D76\u00D74\u00D710/(6+4) = 480/10 = 48 N.'
        },
        {
          id: 'ch05-s5-q3',
          type: 'mc',
          question: 'Two blocks (3 kg and 5 kg) are connected by a rope on a frictionless surface. A 16 N force pulls the front block (3 kg). What is the acceleration of the system?',
          options: ['2 m/s\u00B2', '5.33 m/s\u00B2', '3.2 m/s\u00B2', '1 m/s\u00B2'],
          answer: 0,
          explanation: 'a = F/(m1+m2) = 16/(3+5) = 16/8 = 2 m/s\u00B2.'
        },
        {
          id: 'ch05-s5-q4',
          type: 'mc',
          question: 'In the previous problem, what is the tension in the rope connecting the two blocks?',
          options: ['6 N', '16 N', '10 N', '8 N'],
          answer: 2,
          explanation: 'Apply F=ma to the rear block (5 kg): T = m2 \u00D7 a = 5 \u00D7 2 = 10 N.'
        },
        {
          id: 'ch05-s5-q5',
          type: 'mc',
          question: 'If both masses in an Atwood machine are equal, what is the acceleration?',
          options: ['g', 'g/2', '2g', '0'],
          answer: 3,
          explanation: 'a = (m1-m2)g/(m1+m2). If m1 = m2, then a = 0. The system is in equilibrium.'
        }
      ]
    }

  ]
});
