window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Momentum',
    subtitle: 'Impulse, Momentum, and Collisions',
    sections: [

        // ===== Section 1: Impulse and Momentum =====
        {
            id: 'ch07-sec01',
            title: 'Impulse and Momentum',
            content: `
<div class="env-block intuition"><div class="env-title">From Forces to Collisions</div><div class="env-body"><p>In the previous chapters, we analyzed forces and their effects using Newton's laws. But many real-world events, such as car crashes, ball kicks, and rocket launches, involve forces that act for very short times and are difficult to measure directly. The concept of <strong>momentum</strong> gives us a powerful alternative approach: instead of tracking the force at every instant, we focus on the overall effect of the force over time. This leads to conservation laws that are among the most fundamental principles in all of physics.</p></div></div>

<h2>Momentum</h2>

<div class="env-block definition"><div class="env-title">Linear Momentum</div><div class="env-body"><p>The <strong>momentum</strong> of an object of mass \\(m\\) moving with velocity \\(\\vec{v}\\) is defined as:</p>
<p>\\[ \\vec{p} = m\\vec{v} \\]</p>
<p>Momentum is a <strong>vector quantity</strong> with the same direction as velocity. Its SI unit is \\(\\text{kg}\\cdot\\text{m/s}\\).</p></div></div>

<p>Momentum measures the "quantity of motion" an object has. A heavy truck moving slowly can have the same momentum as a light car moving fast.</p>

<div class="env-block example"><div class="env-title">Comparing Momenta</div><div class="env-body"><p>A 2000 kg truck at 10 m/s: \\(p = 2000 \\times 10 = 20{,}000\\;\\text{kg}\\cdot\\text{m/s}\\).</p>
<p>A 0.145 kg baseball at 40 m/s: \\(p = 0.145 \\times 40 = 5.8\\;\\text{kg}\\cdot\\text{m/s}\\).</p>
<p>The truck has over 3000 times more momentum despite the baseball's higher speed.</p></div></div>

<h2>Impulse</h2>

<div class="env-block definition"><div class="env-title">Impulse</div><div class="env-body"><p>The <strong>impulse</strong> delivered to an object equals the force multiplied by the time interval over which it acts:</p>
<p>\\[ \\vec{J} = \\vec{F} \\Delta t \\]</p>
<p>For a variable force, impulse is the integral: \\(\\vec{J} = \\int_{t_1}^{t_2} \\vec{F}\\,dt\\), which equals the area under the force-time graph.</p></div></div>

<div class="env-block theorem"><div class="env-title">Impulse-Momentum Theorem</div><div class="env-body"><p>The impulse delivered to an object equals the change in its momentum:</p>
<p>\\[ \\vec{J} = \\vec{F}\\Delta t = \\Delta \\vec{p} = m\\vec{v}_f - m\\vec{v}_i \\]</p>
<p>This follows directly from Newton's second law: \\(\\vec{F} = m\\vec{a} = m\\frac{\\Delta \\vec{v}}{\\Delta t}\\), so \\(\\vec{F}\\Delta t = m\\Delta \\vec{v}\\).</p></div></div>

<div class="viz-placeholder" data-viz="ch07-viz01"></div>

<div class="env-block intuition"><div class="env-title">Why Airbags Work</div><div class="env-body"><p>In a car crash, the change in momentum \\(\\Delta p\\) is fixed (determined by the initial speed). The impulse-momentum theorem says \\(F \\Delta t = \\Delta p\\). By increasing the collision time \\(\\Delta t\\) (using airbags, crumple zones), the average force \\(F\\) on the passenger is reduced. This is the physics behind automotive safety design.</p></div></div>

<div class="env-block warning"><div class="env-title">Direction Matters</div><div class="env-body"><p>Momentum is a vector. When calculating changes in momentum, always define a positive direction and be consistent. For example, if a ball bouncing off a wall reverses direction, the change in momentum involves subtraction of vectors, not magnitudes.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch07-viz01',
                    title: 'Impulse-Momentum Theorem',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0, width: 700, height: 360 });
                        var mass = 2.0;
                        var vi = 0;
                        var force = 10;
                        var duration = 2.0;
                        var time = 0;
                        var running = false;
                        var ballX = 100;
                        var velocity = 0;
                        var trail = [];
                        var forceHistory = [];
                        var impulseAccum = 0;

                        function reset() {
                            time = 0;
                            running = false;
                            ballX = 100;
                            velocity = vi;
                            trail = [];
                            forceHistory = [];
                            impulseAccum = 0;
                        }

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(50, 200);
                            ctx.lineTo(650, 200);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(ballX, 180, 16, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(mass + 'kg', ballX, 180);

                            if (running && time < duration) {
                                var arrowLen = force * 3;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(ballX + 20, 180);
                                ctx.lineTo(ballX + 20 + arrowLen, 180);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(ballX + 20 + arrowLen + 8, 180);
                                ctx.lineTo(ballX + 20 + arrowLen - 4, 174);
                                ctx.lineTo(ballX + 20 + arrowLen - 4, 186);
                                ctx.closePath();
                                ctx.fill();
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('F = ' + force + ' N', ballX + 20 + arrowLen / 2, 166);
                            }

                            var graphL = 380, graphT = 230, graphW = 260, graphH = 100;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(graphL, graphT, graphW, graphH);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Time (s)', graphL + graphW / 2, graphT + graphH + 15);
                            ctx.save();
                            ctx.translate(graphL - 15, graphT + graphH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Force (N)', 0, 0);
                            ctx.restore();

                            if (forceHistory.length > 1) {
                                ctx.fillStyle = viz.colors.orange + '33';
                                ctx.beginPath();
                                ctx.moveTo(graphL, graphT + graphH);
                                for (var i = 0; i < forceHistory.length; i++) {
                                    var fx = graphL + (forceHistory[i][0] / 5) * graphW;
                                    var fy = graphT + graphH - (forceHistory[i][1] / 25) * graphH;
                                    ctx.lineTo(fx, fy);
                                }
                                ctx.lineTo(graphL + (forceHistory[forceHistory.length - 1][0] / 5) * graphW, graphT + graphH);
                                ctx.closePath();
                                ctx.fill();

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j = 0; j < forceHistory.length; j++) {
                                    var hx = graphL + (forceHistory[j][0] / 5) * graphW;
                                    var hy = graphT + graphH - (forceHistory[j][1] / 25) * graphH;
                                    j === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
                                }
                                ctx.stroke();
                            }

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('p = mv = ' + (mass * velocity).toFixed(1) + ' kg m/s', 50, 30);
                            ctx.fillText('v = ' + velocity.toFixed(2) + ' m/s', 50, 50);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Impulse J = ' + impulseAccum.toFixed(1) + ' N s', 50, 70);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Delta p = ' + (mass * velocity - mass * vi).toFixed(1) + ' kg m/s', 50, 90);

                            viz.screenText('Impulse (area) = Change in momentum', graphL + graphW / 2, graphT - 10, viz.colors.yellow, 11);
                        }

                        viz.animate(function() {
                            if (running) {
                                var dt = 1 / 60;
                                time += dt;
                                var currentF = time <= duration ? force : 0;
                                velocity += (currentF / mass) * dt;
                                ballX += velocity * 2;
                                impulseAccum += currentF * dt;
                                forceHistory.push([time, currentF]);
                                if (ballX > 650) { ballX = 100; velocity = vi; time = 0; forceHistory = []; impulseAccum = 0; }
                                if (time > 5) { running = false; }
                            }
                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'Force (N)', 2, 20, force, 1, function(v) { force = v; reset(); });
                        VizEngine.createSlider(controls, 'Duration (s)', 0.5, 4, duration, 0.25, function(v) { duration = v; reset(); });
                        VizEngine.createSlider(controls, 'Mass (kg)', 0.5, 5, mass, 0.5, function(v) { mass = v; reset(); });
                        VizEngine.createButton(controls, 'Apply Impulse', function() { reset(); running = true; });
                        VizEngine.createButton(controls, 'Reset', function() { reset(); });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch07-ex01',
                    type: 'numeric',
                    question: 'A 0.5 kg ball is thrown with a velocity of 20 m/s. Calculate its momentum.',
                    hint: 'p = mv.',
                    solution: 'p = mv = 0.5 x 20 = 10 kg m/s.'
                },
                {
                    id: 'ch07-ex02',
                    type: 'numeric',
                    question: 'A force of 500 N acts on a stationary 50 kg object for 0.4 s. What is the impulse delivered, and what is the final velocity?',
                    hint: 'J = F Delta t = Delta p = m(v_f - v_i).',
                    solution: 'J = F x Delta t = 500 x 0.4 = 200 N s. Since Delta p = J and v_i = 0: m v_f = 200, so v_f = 200/50 = 4.0 m/s.'
                },
                {
                    id: 'ch07-ex03',
                    type: 'numeric',
                    question: 'A 0.15 kg baseball moving at 40 m/s is hit by a bat and reverses direction at 50 m/s. What impulse did the bat deliver?',
                    hint: 'Define positive direction as the initial velocity direction. The final velocity is negative.',
                    solution: 'Taking initial direction as positive: v_i = +40, v_f = -50. J = m(v_f - v_i) = 0.15 x (-50 - 40) = 0.15 x (-90) = -13.5 N s. The magnitude of the impulse is 13.5 N s, directed opposite to the initial motion.'
                },
                {
                    id: 'ch07-ex04',
                    type: 'conceptual',
                    question: 'Two identical cars collide head-on. Car A stops from 60 km/h in 0.1 s, while Car B (with airbags) stops from 60 km/h in 0.3 s. Compare the forces experienced by the drivers.',
                    hint: 'The impulse (change in momentum) is the same for both. F = Delta p / Delta t.',
                    solution: 'Both drivers experience the same change in momentum (same mass and speed). For Car A: F_A = Delta p / 0.1. For Car B: F_B = Delta p / 0.3. Since F = Delta p / Delta t, F_A = 3 x F_B. The airbag in Car B reduces the peak force on the driver by a factor of 3 by tripling the collision time.'
                },
                {
                    id: 'ch07-ex05',
                    type: 'numeric',
                    question: 'A 1200 kg car traveling at 25 m/s brakes to a stop in 5 seconds. What is the average braking force?',
                    hint: 'Use the impulse-momentum theorem: F_avg Delta t = Delta p.',
                    solution: 'Delta p = m(v_f - v_i) = 1200 x (0 - 25) = -30000 kg m/s. F_avg = Delta p / Delta t = -30000 / 5 = -6000 N. The braking force is 6000 N opposing the motion.'
                }
            ]
        },

        // ===== Section 2: Conservation of Momentum =====
        {
            id: 'ch07-sec02',
            title: 'Conservation of Momentum',
            content: `
<h2>The Most Powerful Conservation Law</h2>
<p>When two objects interact (collide, explode apart, etc.), the forces between them are internal to the system. By Newton's third law, these internal forces are equal and opposite. This leads to one of the most important principles in physics.</p>

<div class="env-block theorem"><div class="env-title">Conservation of Momentum</div><div class="env-body"><p>If no net external force acts on a system, the total momentum of the system remains constant:</p>
<p>\\[ \\vec{p}_{\\text{total}} = \\sum m_i \\vec{v}_i = \\text{constant} \\]</p>
<p>For a two-body collision:</p>
<p>\\[ m_1 \\vec{v}_{1i} + m_2 \\vec{v}_{2i} = m_1 \\vec{v}_{1f} + m_2 \\vec{v}_{2f} \\]</p></div></div>

<h3>Why Does Momentum Conservation Work?</h3>
<p>Consider two objects colliding. By Newton's third law, the force on object 1 from object 2 is \\(\\vec{F}_{12} = -\\vec{F}_{21}\\). The impulse on object 1 is \\(\\vec{F}_{12}\\Delta t\\), and the impulse on object 2 is \\(\\vec{F}_{21}\\Delta t = -\\vec{F}_{12}\\Delta t\\). The total impulse on the system is zero, so the total momentum does not change.</p>

<div class="env-block example"><div class="env-title">Recoil of a Gun</div><div class="env-body"><p>A 4 kg rifle fires a 0.01 kg bullet at 800 m/s. Before firing, the total momentum is zero.</p>
<p>After firing: \\(0 = m_{\\text{bullet}} v_{\\text{bullet}} + m_{\\text{rifle}} v_{\\text{rifle}}\\)</p>
<p>\\(v_{\\text{rifle}} = -\\frac{m_{\\text{bullet}} v_{\\text{bullet}}}{m_{\\text{rifle}}} = -\\frac{0.01 \\times 800}{4} = -2\\;\\text{m/s}\\)</p>
<p>The rifle recoils at 2 m/s in the opposite direction.</p></div></div>

<div class="viz-placeholder" data-viz="ch07-viz02"></div>

<div class="env-block intuition"><div class="env-title">Momentum as a "Budget"</div><div class="env-body"><p>Think of momentum like money in a closed economy. Individual actors can gain or lose momentum, but the total across the system stays constant. Any momentum gained by one object must be lost by another.</p></div></div>

<h3>When Can We Apply Momentum Conservation?</h3>
<ul>
    <li><strong>No external forces:</strong> The system is isolated.</li>
    <li><strong>External forces cancel or are negligible:</strong> For example, during a short collision, gravity acts on both objects but the collision forces are much larger.</li>
    <li><strong>In a specific direction:</strong> Even if external forces exist, if they have no component along a particular direction, momentum is conserved along that direction.</li>
</ul>

<div class="env-block example"><div class="env-title">Explosion Problem</div><div class="env-body"><p>A 10 kg object at rest explodes into two pieces. Piece A (3 kg) flies off at 20 m/s to the right. What is the velocity of Piece B (7 kg)?</p>
<p>Initial momentum: \\(p_i = 0\\). After explosion: \\(3 \\times 20 + 7 \\times v_B = 0\\), so \\(v_B = -60/7 = -8.57\\;\\text{m/s}\\) (to the left).</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch07-viz02',
                    title: 'Collision Simulator (1D)',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0, width: 700, height: 340 });
                        var m1 = 2, m2 = 3;
                        var v1 = 5, v2 = -2;
                        var collisionType = 'elastic';
                        var running = false;
                        var phase = 'before';
                        var x1, x2, vel1, vel2;
                        var time = 0;

                        function resetSim() {
                            running = false;
                            phase = 'before';
                            x1 = 180;
                            x2 = 500;
                            vel1 = v1;
                            vel2 = v2;
                            time = 0;
                        }
                        resetSim();

                        function calcPostCollision() {
                            if (collisionType === 'elastic') {
                                var newV1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
                                var newV2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
                                return [newV1, newV2];
                            } else {
                                var vf = (m1 * v1 + m2 * v2) / (m1 + m2);
                                return [vf, vf];
                            }
                        }

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(30, 210);
                            ctx.lineTo(670, 210);
                            ctx.stroke();

                            var s1 = Math.max(20, Math.min(40, m1 * 12));
                            var s2 = Math.max(20, Math.min(40, m2 * 12));

                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(x1 - s1, 210 - s1 * 1.2, s1 * 2, s1 * 1.2);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(m1 + 'kg', x1, 210 - s1 * 0.6);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(x2 - s2, 210 - s2 * 1.2, s2 * 2, s2 * 1.2);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(m2 + 'kg', x2, 210 - s2 * 0.6);

                            if (Math.abs(vel1) > 0.1) {
                                var aLen1 = vel1 * 8;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(x1 + (vel1 > 0 ? s1 + 5 : -s1 - 5), 210 - s1 * 1.5);
                                ctx.lineTo(x1 + (vel1 > 0 ? s1 + 5 : -s1 - 5) + aLen1, 210 - s1 * 1.5);
                                ctx.stroke();
                            }
                            if (Math.abs(vel2) > 0.1) {
                                var aLen2 = vel2 * 8;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(x2 + (vel2 > 0 ? s2 + 5 : -s2 - 5), 210 - s2 * 1.5);
                                ctx.lineTo(x2 + (vel2 > 0 ? s2 + 5 : -s2 - 5) + aLen2, 210 - s2 * 1.5);
                                ctx.stroke();
                            }

                            var pTotal = m1 * vel1 + m2 * vel2;
                            var KE = 0.5 * m1 * vel1 * vel1 + 0.5 * m2 * vel2 * vel2;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var y = 245;
                            ctx.fillText('v1 = ' + vel1.toFixed(2) + ' m/s', 50, y);
                            ctx.fillText('v2 = ' + vel2.toFixed(2) + ' m/s', 50, y + 18);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('p_total = ' + pTotal.toFixed(2) + ' kg m/s (conserved)', 300, y);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('KE_total = ' + KE.toFixed(2) + ' J', 300, y + 18);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Type: ' + collisionType, 300, y + 36);

                            viz.screenText('Momentum Conservation in 1D Collisions', 350, 18, viz.colors.white, 14);
                        }

                        viz.animate(function() {
                            if (running) {
                                x1 += vel1 * 1.2;
                                x2 += vel2 * 1.2;
                                time += 1 / 60;

                                var s1w = Math.max(20, Math.min(40, m1 * 12));
                                var s2w = Math.max(20, Math.min(40, m2 * 12));

                                if (phase === 'before' && (x1 + s1w >= x2 - s2w)) {
                                    phase = 'after';
                                    var results = calcPostCollision();
                                    vel1 = results[0];
                                    vel2 = results[1];
                                }

                                if (x1 < 30 || x1 > 670 || x2 < 30 || x2 > 670) {
                                    if (time > 6) resetSim();
                                }
                            }
                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'm1 (kg)', 1, 8, m1, 0.5, function(v) { m1 = v; resetSim(); });
                        VizEngine.createSlider(controls, 'v1 (m/s)', -8, 8, v1, 0.5, function(v) { v1 = v; resetSim(); });
                        VizEngine.createSlider(controls, 'm2 (kg)', 1, 8, m2, 0.5, function(v) { m2 = v; resetSim(); });
                        VizEngine.createSlider(controls, 'v2 (m/s)', -8, 8, v2, 0.5, function(v) { v2 = v; resetSim(); });
                        VizEngine.createButton(controls, 'Elastic', function() { collisionType = 'elastic'; resetSim(); });
                        VizEngine.createButton(controls, 'Perfectly Inelastic', function() { collisionType = 'inelastic'; resetSim(); });
                        VizEngine.createButton(controls, 'Start', function() { resetSim(); running = true; });
                        VizEngine.createButton(controls, 'Reset', function() { resetSim(); });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch07-ex06',
                    type: 'numeric',
                    question: 'A 5 kg cart moving at 4 m/s collides with a stationary 3 kg cart. They stick together. What is their final velocity?',
                    hint: 'This is a perfectly inelastic collision. Use m1 v1 + m2 v2 = (m1 + m2) v_f.',
                    solution: '5 x 4 + 3 x 0 = (5 + 3) v_f. 20 = 8 v_f. v_f = 2.5 m/s.'
                },
                {
                    id: 'ch07-ex07',
                    type: 'numeric',
                    question: 'A 60 kg ice skater throws a 5 kg ball horizontally at 10 m/s. How fast does the skater recoil?',
                    hint: 'Initial total momentum is zero. After throwing: m_skater v_skater + m_ball v_ball = 0.',
                    solution: '0 = 60 v_s + 5 x 10. v_s = -50/60 = -0.833 m/s. The skater recoils at 0.83 m/s in the opposite direction.'
                },
                {
                    id: 'ch07-ex08',
                    type: 'conceptual',
                    question: 'A loaded freight car (mass M, velocity v) couples with an empty stationary car (mass M/2). What fraction of the original kinetic energy is lost?',
                    hint: 'Find v_f using momentum conservation, then compare KE_before and KE_after.',
                    solution: 'Momentum: Mv = (M + M/2) v_f = (3M/2) v_f, so v_f = 2v/3. KE_before = (1/2)Mv^2. KE_after = (1/2)(3M/2)(2v/3)^2 = (1/2)(3M/2)(4v^2/9) = Mv^2/3. Fraction lost = 1 - (Mv^2/3) / ((1/2)Mv^2) = 1 - 2/3 = 1/3. One-third of the kinetic energy is lost.'
                },
                {
                    id: 'ch07-ex09',
                    type: 'numeric',
                    question: 'A 2000 kg rocket in space ejects 50 kg of fuel at 300 m/s relative to the rocket. What is the rocket\'s change in velocity?',
                    hint: 'In the rocket\'s initial rest frame, momentum is zero. After ejection: m_fuel v_fuel + m_rocket v_rocket = 0.',
                    solution: 'Let initial frame have everything at rest. After ejection: 50 x (-300 + dv) + 1950 x dv = 0 (approximately). Using simplified version: 50 x 300 = 1950 x dv (fuel goes backward). dv = 15000/1950 = 7.69 m/s forward. More precisely: 0 = 50(-300) + 1950(dv), dv = 15000/1950 = 7.7 m/s.'
                },
                {
                    id: 'ch07-ex10',
                    type: 'conceptual',
                    question: 'Is it possible for both objects to be at rest after a collision? If so, give an example.',
                    hint: 'Think about what must be true about the total momentum before the collision.',
                    solution: 'Yes, but only if the total momentum before the collision is zero. Example: two identical balls moving toward each other at the same speed collide head-on. If the collision is perfectly inelastic with zero coefficient of restitution and has just the right properties, both could end up at rest. However, in a perfectly inelastic collision, they would stick and be at rest (since total momentum was zero). In an elastic collision, they would bounce back, not stop.'
                }
            ]
        },

        // ===== Section 3: Elastic Collisions =====
        {
            id: 'ch07-sec03',
            title: 'Elastic Collisions',
            content: `
<h2>Collisions Where Energy Is Conserved</h2>
<p>Not all collisions are created equal. In some, kinetic energy is fully preserved. These are called <strong>elastic collisions</strong>.</p>

<div class="env-block definition"><div class="env-title">Elastic Collision</div><div class="env-body"><p>An <strong>elastic collision</strong> is one in which both momentum and kinetic energy are conserved:</p>
<p>\\[ m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} \\quad \\text{(momentum)} \\]</p>
<p>\\[ \\frac{1}{2}m_1 v_{1i}^2 + \\frac{1}{2}m_2 v_{2i}^2 = \\frac{1}{2}m_1 v_{1f}^2 + \\frac{1}{2}m_2 v_{2f}^2 \\quad \\text{(kinetic energy)} \\]</p></div></div>

<h3>Solving Elastic Collisions</h3>
<p>For a 1D elastic collision, the two conservation equations yield:</p>

<div class="env-block theorem"><div class="env-title">Elastic Collision Formulas (1D)</div><div class="env-body"><p>\\[ v_{1f} = \\frac{m_1 - m_2}{m_1 + m_2}\\,v_{1i} + \\frac{2m_2}{m_1 + m_2}\\,v_{2i} \\]</p>
<p>\\[ v_{2f} = \\frac{2m_1}{m_1 + m_2}\\,v_{1i} + \\frac{m_2 - m_1}{m_1 + m_2}\\,v_{2i} \\]</p></div></div>

<h3>Special Cases</h3>

<div class="env-block example"><div class="env-title">Equal Masses</div><div class="env-body"><p>When \\(m_1 = m_2\\) and object 2 is initially at rest (\\(v_{2i} = 0\\)):</p>
<p>\\(v_{1f} = 0\\), \\(v_{2f} = v_{1i}\\).</p>
<p>The first object stops completely, and the second moves off with the first's original velocity. This is the principle behind Newton's cradle.</p></div></div>

<div class="env-block example"><div class="env-title">Heavy Object Hits Light Object</div><div class="env-body"><p>When \\(m_1 \\gg m_2\\) and \\(v_{2i} = 0\\): \\(v_{1f} \\approx v_{1i}\\) (barely changes) and \\(v_{2f} \\approx 2v_{1i}\\) (light object rebounds at nearly twice the incoming speed). Example: bowling ball hitting a ping-pong ball.</p></div></div>

<div class="env-block example"><div class="env-title">Light Object Hits Heavy Object</div><div class="env-body"><p>When \\(m_1 \\ll m_2\\) and \\(v_{2i} = 0\\): \\(v_{1f} \\approx -v_{1i}\\) (bounces back at nearly the same speed) and \\(v_{2f} \\approx 0\\) (heavy object barely moves). Example: tennis ball bouncing off a wall.</p></div></div>

<div class="viz-placeholder" data-viz="ch07-viz03"></div>

<div class="env-block remark"><div class="env-title">Relative Velocity in Elastic Collisions</div><div class="env-body"><p>A useful shortcut: in a 1D elastic collision, the <strong>relative velocity of approach equals the relative velocity of separation</strong>:</p>
<p>\\[ v_{1i} - v_{2i} = -(v_{1f} - v_{2f}) \\]</p>
<p>This is equivalent to the kinetic energy conservation equation and is often easier to use.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch07-viz03',
                    title: "Newton's Cradle Simulator",
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0, width: 700, height: 360 });
                        var numBalls = 5;
                        var ballR = 18;
                        var spacing = ballR * 2 + 2;
                        var baseX = 350;
                        var baseY = 60;
                        var stringLen = 150;
                        var ballsY = baseY + stringLen;
                        var g = 300;

                        var activeBalls = 1;
                        var phase = 'left-swing';
                        var swingAngle = 0.7;
                        var angle = swingAngle;
                        var angVel = 0;
                        var time = 0;

                        function getPositions() {
                            var pos = [];
                            var startX = baseX - (numBalls - 1) * spacing / 2;
                            for (var i = 0; i < numBalls; i++) {
                                pos.push({ x: startX + i * spacing, y: ballsY });
                            }
                            return pos;
                        }

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var positions = getPositions();

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            var frameL = baseX - (numBalls + 1) * spacing / 2;
                            var frameR = baseX + (numBalls + 1) * spacing / 2;
                            ctx.beginPath();
                            ctx.moveTo(frameL, baseY);
                            ctx.lineTo(frameR, baseY);
                            ctx.stroke();

                            for (var i = 0; i < numBalls; i++) {
                                var bx = positions[i].x;
                                var by = positions[i].y;
                                var swinging = false;
                                var dx = 0, dy = 0;

                                if (phase === 'left-swing' && i < activeBalls) {
                                    swinging = true;
                                    dx = stringLen * Math.sin(-angle);
                                    dy = stringLen * (1 - Math.cos(angle));
                                } else if (phase === 'right-swing' && i >= numBalls - activeBalls) {
                                    swinging = true;
                                    dx = stringLen * Math.sin(angle);
                                    dy = stringLen * (1 - Math.cos(angle));
                                }

                                var finalX = bx + dx;
                                var finalY = by - dy;

                                ctx.strokeStyle = viz.colors.text + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(bx, baseY);
                                ctx.lineTo(finalX, finalY);
                                ctx.stroke();

                                var gradient = ctx.createRadialGradient(finalX - 4, finalY - 4, 2, finalX, finalY, ballR);
                                gradient.addColorStop(0, '#aabbcc');
                                gradient.addColorStop(1, '#556677');
                                ctx.fillStyle = gradient;
                                ctx.beginPath();
                                ctx.arc(finalX, finalY, ballR, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }

                            viz.screenText("Newton's Cradle", 350, 300, viz.colors.white, 14);
                            viz.screenText('Balls swinging: ' + activeBalls, 350, 322, viz.colors.teal, 12);
                            viz.screenText('Elastic collisions transfer momentum perfectly', 350, 342, viz.colors.text, 11);
                        }

                        viz.animate(function() {
                            var dt = 1 / 60;
                            var omega2 = g / stringLen;
                            var angAcc = -omega2 * Math.sin(angle);
                            angVel += angAcc * dt;
                            angVel *= 0.999;
                            angle += angVel * dt;

                            if (phase === 'left-swing' && angle <= 0 && angVel > 0) {
                                phase = 'right-swing';
                                angle = 0;
                            } else if (phase === 'right-swing' && angle <= 0 && angVel < 0) {
                                phase = 'left-swing';
                                angle = 0;
                                angVel = -angVel;
                            }

                            if (angle < 0) angle = -angle;
                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'Balls to swing', 1, 3, activeBalls, 1, function(v) {
                            activeBalls = Math.round(v);
                            phase = 'left-swing';
                            angle = swingAngle;
                            angVel = 0;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            phase = 'left-swing';
                            angle = swingAngle;
                            angVel = 0;
                        });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch07-ex11',
                    type: 'numeric',
                    question: 'A 2 kg ball moving at 6 m/s makes a head-on elastic collision with a stationary 4 kg ball. Find the final velocities of both balls.',
                    hint: 'Use the elastic collision formulas with m1=2, m2=4, v1i=6, v2i=0.',
                    solution: 'v1f = (m1-m2)/(m1+m2) x v1i = (2-4)/(2+4) x 6 = (-2/6) x 6 = -2 m/s. v2f = 2m1/(m1+m2) x v1i = 2(2)/(6) x 6 = 4 m/s. The 2 kg ball bounces back at 2 m/s; the 4 kg ball moves forward at 4 m/s.'
                },
                {
                    id: 'ch07-ex12',
                    type: 'conceptual',
                    question: 'In Newton\'s cradle with 5 balls, if you lift and release 2 balls on one side, why do exactly 2 balls fly out on the other side (rather than 1 ball at higher speed)?',
                    hint: 'Both momentum and kinetic energy must be conserved.',
                    solution: 'If 1 ball flew out at speed v\', conservation of momentum gives 2mv = mv\', so v\' = 2v. But then KE would be (1/2)m(2v)^2 = 2mv^2, while the initial KE was 2 x (1/2)mv^2 = mv^2. Energy would double, violating conservation. Only 2 balls at speed v conserves both momentum (2mv = 2mv) and energy (mv^2 = mv^2).'
                },
                {
                    id: 'ch07-ex13',
                    type: 'numeric',
                    question: 'A proton (mass m) collides elastically with a stationary helium nucleus (mass 4m). The proton bounces back. Find the fraction of the proton\'s initial kinetic energy transferred to the helium nucleus.',
                    hint: 'Use elastic collision formulas, then compute KE_helium / KE_initial.',
                    solution: 'v_He = 2m/(m+4m) x v0 = 2v0/5. KE_He = (1/2)(4m)(2v0/5)^2 = (1/2)(4m)(4v0^2/25) = 8mv0^2/25. Initial KE = (1/2)mv0^2. Fraction = (8mv0^2/25) / (mv0^2/2) = 16/25 = 0.64 = 64%.'
                },
                {
                    id: 'ch07-ex14',
                    type: 'numeric',
                    question: 'Two balls of masses 3 kg and 5 kg approach each other with speeds 4 m/s and 2 m/s respectively. After an elastic head-on collision, find both final velocities.',
                    hint: 'Set v1i = +4, v2i = -2 (opposite direction). Apply the elastic collision formulas.',
                    solution: 'v1f = (3-5)/(3+5) x 4 + 2(5)/(3+5) x (-2) = (-1/4)(4) + (10/8)(-2) = -1 + (-2.5) = -3.5 m/s. v2f = 2(3)/(8) x 4 + (5-3)/(8) x (-2) = 3 + (-0.5) = 2.5 m/s. Ball 1 bounces back at 3.5 m/s; Ball 2 reverses to 2.5 m/s forward.'
                },
                {
                    id: 'ch07-ex15',
                    type: 'conceptual',
                    question: 'Verify that the relative velocity condition holds for the collision in the previous problem.',
                    hint: 'Check that v1i - v2i = -(v1f - v2f).',
                    solution: 'v1i - v2i = 4 - (-2) = 6 (approach speed). v1f - v2f = -3.5 - 2.5 = -6 (separation speed). Indeed, 6 = -(-6) = 6. The relative velocity of approach equals the relative velocity of separation (in magnitude), confirming the collision is elastic.'
                }
            ]
        },

        // ===== Section 4: Inelastic Collisions =====
        {
            id: 'ch07-sec04',
            title: 'Inelastic Collisions',
            content: `
<h2>Collisions Where Energy Is Lost</h2>
<p>Most real-world collisions are not perfectly elastic. When objects deform, produce heat or sound, or stick together, kinetic energy is lost. These are <strong>inelastic collisions</strong>.</p>

<div class="env-block definition"><div class="env-title">Inelastic Collision</div><div class="env-body"><p>An <strong>inelastic collision</strong> is one in which momentum is conserved but kinetic energy is <em>not</em> conserved. Some kinetic energy is converted to thermal energy, sound, deformation, etc.</p>
<p>A <strong>perfectly inelastic collision</strong> is the extreme case where the objects stick together after collision, losing the maximum possible kinetic energy.</p></div></div>

<div class="env-block definition"><div class="env-title">Coefficient of Restitution</div><div class="env-body"><p>The <strong>coefficient of restitution</strong> \\(e\\) measures how "bouncy" a collision is:</p>
<p>\\[ e = \\frac{|v_{2f} - v_{1f}|}{|v_{1i} - v_{2i}|} = \\frac{\\text{relative speed of separation}}{\\text{relative speed of approach}} \\]</p>
<ul>
    <li>\\(e = 1\\): perfectly elastic (no energy lost)</li>
    <li>\\(0 < e < 1\\): inelastic (some energy lost)</li>
    <li>\\(e = 0\\): perfectly inelastic (objects stick together)</li>
</ul></div></div>

<h3>Perfectly Inelastic Collision</h3>
<p>When objects stick together:</p>
<p>\\[ m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2) v_f \\]</p>
<p>\\[ v_f = \\frac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} \\]</p>

<div class="env-block example"><div class="env-title">Energy Lost in a Perfectly Inelastic Collision</div><div class="env-body"><p>Object 1: \\(m_1 = 4\\) kg at \\(v_{1i} = 6\\) m/s. Object 2: \\(m_2 = 2\\) kg, stationary.</p>
<p>\\(v_f = (4 \\times 6 + 0) / 6 = 4\\) m/s.</p>
<p>\\(\\text{KE}_i = \\frac{1}{2}(4)(36) = 72\\) J. \\(\\text{KE}_f = \\frac{1}{2}(6)(16) = 48\\) J.</p>
<p>Energy lost = 72 - 48 = 24 J = 33% of the initial energy.</p></div></div>

<div class="viz-placeholder" data-viz="ch07-viz04"></div>

<div class="env-block theorem"><div class="env-title">Energy Loss Formula</div><div class="env-body"><p>For a perfectly inelastic collision with one object initially at rest:</p>
<p>\\[ \\Delta KE = \\frac{1}{2} \\frac{m_1 m_2}{m_1 + m_2} (v_{1i} - v_{2i})^2 \\]</p>
<p>The fraction of energy lost is \\(\\frac{m_2}{m_1 + m_2}\\). This shows that more energy is lost when the target mass is larger relative to the projectile mass.</p></div></div>

<div class="env-block intuition"><div class="env-title">Ballistic Pendulum</div><div class="env-body"><p>A classic physics experiment: a bullet embeds in a hanging block (perfectly inelastic collision). The block swings upward. By measuring the height, we can determine the bullet's initial speed using momentum conservation (for the collision) followed by energy conservation (for the swing).</p>
<p>Step 1: \\(m_{\\text{bullet}} v = (m_{\\text{bullet}} + m_{\\text{block}}) V\\)</p>
<p>Step 2: \\(\\frac{1}{2}(m_{\\text{bullet}} + m_{\\text{block}})V^2 = (m_{\\text{bullet}} + m_{\\text{block}})gh\\)</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch07-viz04',
                    title: 'Elastic vs Inelastic Collision Comparison',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0, width: 700, height: 380 });
                        var m1 = 3, m2 = 3;
                        var v1 = 6, v2 = 0;
                        var eCoeff = 1.0;

                        function calcResults() {
                            var totalP = m1 * v1 + m2 * v2;
                            var relV = v1 - v2;
                            var v1f = (m1 * v1 + m2 * v2 - eCoeff * m2 * relV) / (m1 + m2);
                            var v2f = (m1 * v1 + m2 * v2 + eCoeff * m1 * relV) / (m1 + m2);
                            var KEi = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
                            var KEf = 0.5 * m1 * v1f * v1f + 0.5 * m2 * v2f * v2f;
                            return { v1f: v1f, v2f: v2f, KEi: KEi, KEf: KEf, totalP: totalP };
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var res = calcResults();

                            viz.screenText('Collision Analysis (Coefficient of Restitution e = ' + eCoeff.toFixed(2) + ')', 350, 20, viz.colors.white, 14);

                            var barX = 80;
                            var barW = 200;
                            var barH = 25;

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';

                            var y = 60;
                            ctx.fillText('Before:', barX - 10, y);
                            ctx.fillStyle = viz.colors.blue + '88';
                            var w1b = Math.abs(v1) / 10 * barW;
                            ctx.fillRect(barX, y - barH / 2, w1b, barH);
                            ctx.fillStyle = viz.colors.orange + '88';
                            var w2b = Math.abs(v2) / 10 * barW;
                            ctx.fillRect(barX + w1b + 5, y - barH / 2, w2b, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'left';
                            ctx.fillText('v1=' + v1.toFixed(1) + ', v2=' + v2.toFixed(1), barX + w1b + w2b + 20, y);

                            y = 110;
                            ctx.textAlign = 'right';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('After:', barX - 10, y);
                            ctx.fillStyle = viz.colors.blue + '88';
                            var w1a = Math.abs(res.v1f) / 10 * barW;
                            var x1start = res.v1f >= 0 ? barX : barX - w1a;
                            ctx.fillRect(barX, y - barH / 2, (res.v1f >= 0 ? 1 : -1) * w1a, barH);
                            ctx.fillStyle = viz.colors.orange + '88';
                            var w2a = Math.abs(res.v2f) / 10 * barW;
                            ctx.fillRect(barX + barW + 10, y - barH / 2, w2a, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'left';
                            ctx.fillText('v1f=' + res.v1f.toFixed(2) + ', v2f=' + res.v2f.toFixed(2), barX + barW + w2a + 20, y);

                            var chartX = 80, chartY = 165, chartW = 540, chartH = 180;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(chartX, chartY, chartW, chartH);

                            var maxKE = Math.max(res.KEi, 1);
                            var categories = [
                                { label: 'KE (before)', val: res.KEi, color: viz.colors.teal },
                                { label: 'KE (after)', val: res.KEf, color: viz.colors.green },
                                { label: 'Energy lost', val: res.KEi - res.KEf, color: viz.colors.red },
                                { label: 'Momentum (before)', val: Math.abs(res.totalP), color: viz.colors.purple },
                                { label: 'Momentum (after)', val: Math.abs(m1 * res.v1f + m2 * res.v2f), color: viz.colors.pink }
                            ];

                            var bh = 26;
                            var gap = 8;
                            for (var i = 0; i < categories.length; i++) {
                                var cat = categories[i];
                                var by = chartY + 12 + i * (bh + gap);
                                var bw = (cat.val / maxKE) * (chartW - 150);
                                if (bw < 0) bw = 0;
                                ctx.fillStyle = cat.color + '88';
                                ctx.fillRect(chartX + 130, by, bw, bh);
                                ctx.fillStyle = cat.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(cat.label, chartX + 125, by + bh / 2);
                                ctx.textAlign = 'left';
                                ctx.fillText(cat.val.toFixed(1), chartX + 135 + bw, by + bh / 2);
                            }

                            var label = eCoeff === 1 ? 'Perfectly Elastic' : eCoeff === 0 ? 'Perfectly Inelastic' : 'Partially Inelastic';
                            viz.screenText(label, 350, chartY + chartH + 20, viz.colors.yellow, 13);
                        }

                        VizEngine.createSlider(controls, 'e (restitution)', 0, 1, eCoeff, 0.05, function(v) { eCoeff = v; draw(); });
                        VizEngine.createSlider(controls, 'm1 (kg)', 1, 8, m1, 0.5, function(v) { m1 = v; draw(); });
                        VizEngine.createSlider(controls, 'v1 (m/s)', 0, 10, v1, 0.5, function(v) { v1 = v; draw(); });
                        VizEngine.createSlider(controls, 'm2 (kg)', 1, 8, m2, 0.5, function(v) { m2 = v; draw(); });
                        VizEngine.createSlider(controls, 'v2 (m/s)', -5, 5, v2, 0.5, function(v) { v2 = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch07-ex16',
                    type: 'numeric',
                    question: 'A 10 g bullet traveling at 400 m/s embeds in a 2 kg wooden block initially at rest. What is the velocity of the block+bullet system immediately after impact?',
                    hint: 'Perfectly inelastic collision: m_bullet x v_bullet = (m_bullet + m_block) v_f.',
                    solution: 'v_f = (0.01 x 400) / (0.01 + 2) = 4 / 2.01 = 1.99 m/s.'
                },
                {
                    id: 'ch07-ex17',
                    type: 'numeric',
                    question: 'In the ballistic pendulum above, the block+bullet system (2.01 kg) moves at 1.99 m/s. How high does it swing?',
                    hint: 'Energy conservation after collision: (1/2)mv^2 = mgh.',
                    solution: 'h = v^2 / (2g) = (1.99)^2 / (2 x 9.8) = 3.96 / 19.6 = 0.202 m = 20.2 cm.'
                },
                {
                    id: 'ch07-ex18',
                    type: 'numeric',
                    question: 'What percentage of kinetic energy is lost in the bullet-block collision above?',
                    hint: 'Compare KE before and after. KE_i = (1/2)(0.01)(400^2), KE_f = (1/2)(2.01)(1.99^2).',
                    solution: 'KE_i = 0.5 x 0.01 x 160000 = 800 J. KE_f = 0.5 x 2.01 x 3.96 = 3.98 J. Fraction lost = (800 - 3.98)/800 = 99.5%. Almost all kinetic energy is converted to heat and deformation.'
                },
                {
                    id: 'ch07-ex19',
                    type: 'conceptual',
                    question: 'A ball is dropped from height h onto a floor. It bounces back to height 0.64h. What is the coefficient of restitution?',
                    hint: 'Speed just before impact: v = sqrt(2gh). Speed just after: v\' = sqrt(2g x 0.64h). e = v\'/v.',
                    solution: 'v_before = sqrt(2gh). v_after = sqrt(2g x 0.64h) = sqrt(0.64) x sqrt(2gh) = 0.8 v_before. Since the floor is stationary, e = v_after / v_before = 0.8.'
                },
                {
                    id: 'ch07-ex20',
                    type: 'numeric',
                    question: 'Two clay balls of masses 2 kg (moving at 5 m/s right) and 3 kg (moving at 3 m/s left) collide and stick together. Find the final velocity and the kinetic energy lost.',
                    hint: 'Perfectly inelastic: (m1 v1 + m2 v2) = (m1+m2) v_f. Take rightward as positive.',
                    solution: 'v_f = (2x5 + 3x(-3)) / (2+3) = (10 - 9)/5 = 0.2 m/s (rightward). KE_i = 0.5(2)(25) + 0.5(3)(9) = 25 + 13.5 = 38.5 J. KE_f = 0.5(5)(0.04) = 0.1 J. Energy lost = 38.4 J = 99.7% of the initial KE. Nearly all energy is dissipated because the objects had nearly opposite momenta.'
                }
            ]
        },

        // ===== Section 5: Two-Dimensional Collisions =====
        {
            id: 'ch07-sec05',
            title: 'Two-Dimensional Collisions',
            content: `
<h2>Collisions in 2D</h2>
<p>In the real world, collisions rarely happen perfectly head-on. Billiard balls, car accidents, and particle collisions often involve motion in two dimensions. The key insight is that <strong>momentum is conserved independently in each direction</strong>.</p>

<div class="env-block definition"><div class="env-title">Momentum Conservation in 2D</div><div class="env-body"><p>For a 2D collision, momentum is conserved in both the x and y directions separately:</p>
<p>\\[ m_1 v_{1ix} + m_2 v_{2ix} = m_1 v_{1fx} + m_2 v_{2fx} \\quad \\text{(x-direction)} \\]</p>
<p>\\[ m_1 v_{1iy} + m_2 v_{2iy} = m_1 v_{1fy} + m_2 v_{2fy} \\quad \\text{(y-direction)} \\]</p>
<p>We often work with speed and angle: \\(v_x = v\\cos\\theta\\), \\(v_y = v\\sin\\theta\\).</p></div></div>

<h3>Glancing Collisions</h3>
<p>Consider a ball striking a stationary ball off-center. After collision, both balls move at angles to the original direction.</p>

<div class="env-block example"><div class="env-title">2D Elastic Collision (Equal Masses)</div><div class="env-body"><p>When a moving ball makes an elastic collision with a stationary ball of equal mass, a remarkable result holds: the two balls always move at <strong>right angles</strong> to each other after collision (\\(\\theta_1 + \\theta_2 = 90^\\circ\\)).</p>
<p>Proof sketch: Conservation of momentum gives \\(\\vec{v}_{1f} + \\vec{v}_{2f} = \\vec{v}_{1i}\\). Conservation of energy gives \\(v_{1f}^2 + v_{2f}^2 = v_{1i}^2\\). These two together imply \\(\\vec{v}_{1f} \\cdot \\vec{v}_{2f} = 0\\), meaning the vectors are perpendicular.</p></div></div>

<div class="viz-placeholder" data-viz="ch07-viz05"></div>

<h3>Center of Mass</h3>

<div class="env-block definition"><div class="env-title">Center of Mass</div><div class="env-body"><p>The <strong>center of mass</strong> (CM) of a system is the mass-weighted average position:</p>
<p>\\[ \\vec{r}_{\\text{cm}} = \\frac{m_1 \\vec{r}_1 + m_2 \\vec{r}_2}{m_1 + m_2} \\]</p>
<p>The velocity of the center of mass is:</p>
<p>\\[ \\vec{v}_{\\text{cm}} = \\frac{m_1 \\vec{v}_1 + m_2 \\vec{v}_2}{m_1 + m_2} = \\frac{\\vec{p}_{\\text{total}}}{m_{\\text{total}}} \\]</p>
<p>Since total momentum is conserved, \\(\\vec{v}_{\\text{cm}}\\) remains constant before, during, and after any collision.</p></div></div>

<div class="env-block intuition"><div class="env-title">Why Center of Mass Matters</div><div class="env-body"><p>In the center-of-mass reference frame, the total momentum is zero. This simplifies collision analysis considerably: the objects approach each other with equal and opposite momenta, and after collision, they must still have equal and opposite momenta. Many advanced collision problems become much easier in this frame.</p></div></div>

<div class="viz-placeholder" data-viz="ch07-viz06"></div>

<div class="env-block remark"><div class="env-title">Applications</div><div class="env-body"><p>Two-dimensional collision physics is essential in: particle physics (accelerator experiments), forensic science (accident reconstruction), sports science (billiards, curling), astrophysics (galaxy mergers), and molecular dynamics simulations.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch07-viz05',
                    title: '2D Collision Visualizer',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 30, originX: 200, originY: 200 });
                        var running = false;
                        var m1 = 2, m2 = 2;
                        var impactParam = 0.5;
                        var v1_init = 5;

                        var b1, b2;
                        var trail1 = [], trail2 = [];
                        var collided = false;

                        function resetSim() {
                            running = false;
                            collided = false;
                            trail1 = [];
                            trail2 = [];
                            b1 = { x: -5, y: 0, vx: v1_init, vy: 0 };
                            b2 = { x: 2, y: 0, vx: 0, vy: 0 };
                        }
                        resetSim();

                        function doCollision() {
                            var dx = b2.x - b1.x;
                            var dy = b2.y - b1.y;
                            var dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 0.01) return;
                            var nx = dx / dist, ny = dy / dist;
                            var dvx = b1.vx - b2.vx;
                            var dvy = b1.vy - b2.vy;
                            var dvn = dvx * nx + dvy * ny;
                            if (dvn <= 0) return;
                            var j = 2 * dvn / (1 / m1 + 1 / m2);
                            b1.vx -= j * nx / m1;
                            b1.vy -= j * ny / m1;
                            b2.vx += j * nx / m2;
                            b2.vy += j * ny / m2;
                            collided = true;
                        }

                        function drawScene() {
                            viz.clear();
                            viz.drawGrid(1);

                            if (trail1.length > 1) viz.drawTrajectory(trail1, viz.colors.blue + '66', 1.5);
                            if (trail2.length > 1) viz.drawTrajectory(trail2, viz.colors.orange + '66', 1.5);

                            viz.drawPoint(b1.x, b1.y, viz.colors.blue, 'm1', 8);
                            viz.drawPoint(b2.x, b2.y, viz.colors.orange, 'm2', 8);

                            var vScale = 0.3;
                            if (Math.abs(b1.vx) + Math.abs(b1.vy) > 0.1)
                                viz.drawVector(b1.x, b1.y, b1.x + b1.vx * vScale, b1.y + b1.vy * vScale, viz.colors.blue, '', 1.5);
                            if (Math.abs(b2.vx) + Math.abs(b2.vy) > 0.1)
                                viz.drawVector(b2.x, b2.y, b2.x + b2.vx * vScale, b2.y + b2.vy * vScale, viz.colors.orange, '', 1.5);

                            var cmX = (m1 * b1.x + m2 * b2.x) / (m1 + m2);
                            var cmY = (m1 * b1.y + m2 * b2.y) / (m1 + m2);
                            viz.drawPoint(cmX, cmY, viz.colors.yellow, 'CM', 4);

                            var px = m1 * b1.vx + m2 * b2.vx;
                            var py = m1 * b1.vy + m2 * b2.vy;
                            var KE = 0.5 * m1 * (b1.vx * b1.vx + b1.vy * b1.vy) + 0.5 * m2 * (b2.vx * b2.vx + b2.vy * b2.vy);

                            viz.screenText('2D Elastic Collision', viz.width / 2, 15, viz.colors.white, 14);
                            viz.screenText('p_total = (' + px.toFixed(1) + ', ' + py.toFixed(1) + ')', 120, viz.height - 30, viz.colors.teal, 11);
                            viz.screenText('KE = ' + KE.toFixed(1) + ' J', 350, viz.height - 30, viz.colors.green, 11);

                            if (collided && m1 === m2) {
                                var dot = b1.vx * b2.vx + b1.vy * b2.vy;
                                var v1mag = Math.sqrt(b1.vx * b1.vx + b1.vy * b1.vy);
                                var v2mag = Math.sqrt(b2.vx * b2.vx + b2.vy * b2.vy);
                                if (v1mag > 0.1 && v2mag > 0.1) {
                                    var angleRad = Math.acos(Math.max(-1, Math.min(1, dot / (v1mag * v2mag))));
                                    viz.screenText('Angle between: ' + (angleRad * 180 / Math.PI).toFixed(1) + ' deg', 530, viz.height - 30, viz.colors.yellow, 11);
                                }
                            }
                        }

                        viz.animate(function() {
                            if (running) {
                                var dt = 0.03;
                                b1.x += b1.vx * dt;
                                b1.y += b1.vy * dt;
                                b2.x += b2.vx * dt;
                                b2.y += b2.vy * dt;

                                trail1.push([b1.x, b1.y]);
                                trail2.push([b2.x, b2.y]);
                                if (trail1.length > 500) trail1.shift();
                                if (trail2.length > 500) trail2.shift();

                                if (!collided) {
                                    var dx = b2.x - b1.x;
                                    var dy = b2.y - b1.y;
                                    var dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < 0.6) {
                                        doCollision();
                                    }
                                }
                            }
                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'Impact offset', -2, 2, impactParam, 0.1, function(v) {
                            impactParam = v;
                            resetSim();
                            b2.y = impactParam;
                        });
                        VizEngine.createSlider(controls, 'm1', 1, 5, m1, 0.5, function(v) { m1 = v; resetSim(); b2.y = impactParam; });
                        VizEngine.createSlider(controls, 'm2', 1, 5, m2, 0.5, function(v) { m2 = v; resetSim(); b2.y = impactParam; });
                        VizEngine.createButton(controls, 'Launch', function() { resetSim(); b2.y = impactParam; running = true; });
                        VizEngine.createButton(controls, 'Reset', function() { resetSim(); b2.y = impactParam; });
                    }
                },
                {
                    id: 'ch07-viz06',
                    title: 'Center of Mass Tracker',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 30, originX: 350, originY: 200 });
                        var m1 = 3, m2 = 2;
                        var running = false;

                        var b1, b2;
                        var trail1, trail2, trailCM;

                        function resetSim() {
                            running = false;
                            b1 = { x: -4, y: 1, vx: 3, vy: -0.5 };
                            b2 = { x: 3, y: -1, vx: -2, vy: 0.5 };
                            trail1 = [];
                            trail2 = [];
                            trailCM = [];
                        }
                        resetSim();

                        function drawScene() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes('x', 'y');

                            if (trail1.length > 1) viz.drawTrajectory(trail1, viz.colors.blue + '44', 1);
                            if (trail2.length > 1) viz.drawTrajectory(trail2, viz.colors.orange + '44', 1);
                            if (trailCM.length > 1) viz.drawTrajectory(trailCM, viz.colors.yellow, 2);

                            viz.drawPoint(b1.x, b1.y, viz.colors.blue, m1 + 'kg', 7);
                            viz.drawPoint(b2.x, b2.y, viz.colors.orange, m2 + 'kg', 7);

                            var cmX = (m1 * b1.x + m2 * b2.x) / (m1 + m2);
                            var cmY = (m1 * b1.y + m2 * b2.y) / (m1 + m2);
                            viz.drawPoint(cmX, cmY, viz.colors.yellow, 'CM', 5);

                            var vcmX = (m1 * b1.vx + m2 * b2.vx) / (m1 + m2);
                            var vcmY = (m1 * b1.vy + m2 * b2.vy) / (m1 + m2);
                            viz.drawVector(cmX, cmY, cmX + vcmX * 0.5, cmY + vcmY * 0.5, viz.colors.yellow, 'v_cm', 2);

                            viz.screenText('Center of Mass moves at constant velocity', viz.width / 2, 15, viz.colors.white, 13);
                            viz.screenText('CM path (yellow) is always a straight line', viz.width / 2, viz.height - 15, viz.colors.yellow, 12);
                        }

                        viz.animate(function() {
                            if (running) {
                                var dt = 0.02;
                                b1.x += b1.vx * dt;
                                b1.y += b1.vy * dt;
                                b2.x += b2.vx * dt;
                                b2.y += b2.vy * dt;

                                trail1.push([b1.x, b1.y]);
                                trail2.push([b2.x, b2.y]);
                                var cmX = (m1 * b1.x + m2 * b2.x) / (m1 + m2);
                                var cmY = (m1 * b1.y + m2 * b2.y) / (m1 + m2);
                                trailCM.push([cmX, cmY]);

                                if (trail1.length > 600) trail1.shift();
                                if (trail2.length > 600) trail2.shift();
                                if (trailCM.length > 600) trailCM.shift();
                            }
                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'm1 (kg)', 1, 6, m1, 0.5, function(v) { m1 = v; resetSim(); });
                        VizEngine.createSlider(controls, 'm2 (kg)', 1, 6, m2, 0.5, function(v) { m2 = v; resetSim(); });
                        VizEngine.createButton(controls, 'Start', function() { resetSim(); running = true; });
                        VizEngine.createButton(controls, 'Reset', function() { resetSim(); });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch07-ex21',
                    type: 'numeric',
                    question: 'A 2 kg ball moving at 4 m/s in the x-direction strikes a stationary 2 kg ball. After the elastic collision, ball 1 moves at 30 degrees above the x-axis. Find the speeds of both balls and the angle of ball 2.',
                    hint: 'For equal mass elastic collisions, the angle between the two final velocities is 90 degrees. Use momentum conservation in x and y, plus energy conservation.',
                    solution: 'Since equal masses and elastic: angle between final velocities = 90 degrees, so ball 2 moves at 60 degrees below x-axis. Using v1 cos(30) + v2 cos(60) = 4 and v1 sin(30) = v2 sin(60): from the second equation, v1 x 0.5 = v2 x 0.866, so v1 = 1.732 v2. Substituting: 1.732 v2 x 0.866 + v2 x 0.5 = 4, giving 1.5 v2 + 0.5 v2 = 4, so v2 = 2 m/s. v1 = 1.732 x 2 = 3.46 m/s. Ball 2 angle = 60 degrees below x-axis.'
                },
                {
                    id: 'ch07-ex22',
                    type: 'numeric',
                    question: 'Find the center of mass position for a system of two objects: 4 kg at x = 2 m and 6 kg at x = 8 m.',
                    hint: 'x_cm = (m1 x1 + m2 x2) / (m1 + m2).',
                    solution: 'x_cm = (4 x 2 + 6 x 8) / (4 + 6) = (8 + 48) / 10 = 56/10 = 5.6 m. The CM is closer to the heavier object.'
                },
                {
                    id: 'ch07-ex23',
                    type: 'conceptual',
                    question: 'A firecracker at rest explodes into many fragments flying in all directions. What can you say about the center of mass of all the fragments?',
                    hint: 'What is the total momentum before the explosion?',
                    solution: 'The total momentum before the explosion is zero (at rest). By conservation of momentum, the total momentum after is also zero. Therefore, the center of mass of all fragments remains at the original position of the firecracker (or more precisely, it remains stationary at that point).'
                },
                {
                    id: 'ch07-ex24',
                    type: 'numeric',
                    question: 'In a 2D collision, a 3 kg object moving at 5 m/s in the +x direction collides with a 2 kg object moving at 4 m/s in the +y direction. They stick together. Find the speed and direction of the combined object.',
                    hint: 'Conserve momentum in x and y separately. Then find magnitude and direction of the result.',
                    solution: 'x: 3(5) + 0 = 5 v_fx, so v_fx = 15/5 = 3 m/s. y: 0 + 2(4) = 5 v_fy, so v_fy = 8/5 = 1.6 m/s. Speed = sqrt(3^2 + 1.6^2) = sqrt(9 + 2.56) = sqrt(11.56) = 3.4 m/s. Angle = arctan(1.6/3) = 28.1 degrees above x-axis.'
                },
                {
                    id: 'ch07-ex25',
                    type: 'conceptual',
                    question: 'Why is it that in an elastic collision between equal masses (one initially at rest), the final velocities are always perpendicular? Provide a brief mathematical argument.',
                    hint: 'Use vector equations for momentum and energy conservation. What does it mean for the dot product of the final velocities to be zero?',
                    solution: 'Momentum: v1f + v2f = vi (vectors, since masses cancel). Squaring both sides: |v1f|^2 + 2(v1f . v2f) + |v2f|^2 = |vi|^2. Energy conservation: |v1f|^2 + |v2f|^2 = |vi|^2. Subtracting: 2(v1f . v2f) = 0, so v1f . v2f = 0. A zero dot product means the vectors are perpendicular (assuming neither is zero, which corresponds to a head-on collision being excluded).'
                }
            ]
        }
    ]
});
