window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Mechanical Energy',
    subtitle: 'Work, Energy, and Conservation Laws',
    sections: [
        // ===== SECTION 1: Work =====
        {
            id: 'work',
            title: 'Work',
            content: `
                <h2>Work: Energy Transfer by Force</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>In everyday language, "work" means effort. In physics, work has a precise meaning: it measures how much energy a force transfers to an object as it moves. A force does work only when the object moves, and only the component of force along the direction of motion counts.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Work Done by a Constant Force</div>
                    <div class="env-body">
                        <p>When a constant force \\(\\vec{F}\\) acts on an object that undergoes a displacement \\(\\vec{d}\\), the work done by that force is:</p>
                        \\[ W = F d \\cos\\theta \\]
                        <p>where \\(\\theta\\) is the angle between the force and the displacement. The SI unit of work is the <strong>joule</strong> (J), where \\(1\\,\\text{J} = 1\\,\\text{N}\\cdot\\text{m}\\).</p>
                    </div>
                </div>

                <p>Let us unpack this formula:</p>
                <ul>
                    <li>When \\(\\theta = 0^\\circ\\), the force is in the same direction as the motion: \\(W = Fd\\) (maximum positive work).</li>
                    <li>When \\(\\theta = 90^\\circ\\), the force is perpendicular to the motion: \\(W = 0\\) (no work done; think of a satellite in circular orbit, where gravity is always perpendicular to velocity).</li>
                    <li>When \\(\\theta = 180^\\circ\\), the force opposes the motion: \\(W = -Fd\\) (negative work; friction is the classic example).</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example: Pulling a Suitcase</div>
                    <div class="env-body">
                        <p>You pull a suitcase with a force of 50 N at an angle of \\(30^\\circ\\) above the horizontal across an airport floor for 20 m. The work you do is:</p>
                        \\[ W = 50 \\times 20 \\times \\cos 30^\\circ = 1000 \\times 0.866 \\approx 866\\,\\text{J} \\]
                        <p>Only the horizontal component \\(F\\cos\\theta\\) contributes to work along the direction of motion.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Misconception</div>
                    <div class="env-body"><p>Holding a heavy box while standing still requires muscular effort, but in the physics sense, you do <em>zero work</em> on the box because it does not move (\\(d = 0\\)).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-work-angle"></div>

                <p>Use the interactive visualization above to explore how changing the angle between the force and displacement affects the work done. Drag the angle slider and watch the work value update in real time.</p>

                <div class="env-block remark">
                    <div class="env-title">Positive, Negative, and Zero Work</div>
                    <div class="env-body">
                        <p>Positive work means energy is <em>transferred to</em> the object (it speeds up or gains height). Negative work means energy is <em>removed from</em> the object (friction slowing it down). Zero work means no energy transfer in the direction of motion.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Net Work</div>
                    <div class="env-body">
                        <p>When multiple forces act on an object, the net work is the sum of the work done by each individual force:</p>
                        \\[ W_{\\text{net}} = W_1 + W_2 + W_3 + \\cdots \\]
                        <p>Alternatively, find the net force first, then compute \\(W_{\\text{net}} = F_{\\text{net}} d \\cos\\theta\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-work-angle',
                    title: 'Work Done at Different Angles',
                    description: 'See how the angle between force and displacement changes the work done.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 40, originX: 100, originY: 280 });
                        var angle = 0;
                        var F = 5;
                        var d = 8;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ground
                            viz.drawGround(-1, 0, 12);

                            // Object (mass block)
                            viz.drawMass(2, 0.5, 0.8, viz.colors.blue, 'm');

                            // Displacement arrow
                            viz.drawVector(2, 0.3, 2 + d * 0.5, 0.3, viz.colors.teal, 'd', 2);

                            // Force arrow from mass center
                            var rad = angle * Math.PI / 180;
                            var fScale = 0.4;
                            viz.drawVector(2, 0.5, 2 + F * fScale * Math.cos(rad), 0.5 + F * fScale * Math.sin(rad), viz.colors.orange, 'F', 2.5);

                            // Angle arc
                            if (angle > 0 && angle < 180) {
                                viz.drawAngle(2, 0.5, 0, rad, 0.6, viz.colors.yellow, angle + '\u00B0');
                            }

                            // F cos(theta) component
                            var fCos = F * Math.cos(rad);
                            if (Math.abs(fCos) > 0.01) {
                                viz.drawVector(2, -0.3, 2 + fCos * fScale, -0.3, viz.colors.green, 'F cos\u03B8', 1.5);
                            }

                            // Work calculation
                            var W = F * d * Math.cos(rad);
                            var workColor = W > 0.01 ? viz.colors.green : (W < -0.01 ? viz.colors.red : viz.colors.text);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('W = Fd cos\u03B8 = ' + F.toFixed(0) + ' \u00D7 ' + d.toFixed(0) + ' \u00D7 cos(' + angle + '\u00B0)', 20, 20);
                            ctx.fillStyle = workColor;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillText('W = ' + W.toFixed(1) + ' J', 20, 45);

                            // Status label
                            var status = W > 0.01 ? 'Positive work (energy added)' : (W < -0.01 ? 'Negative work (energy removed)' : 'Zero work');
                            ctx.fillStyle = workColor;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText(status, 20, 72);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Angle \u03B8 (\u00B0)', 0, 180, 0, 5, function(val) {
                            angle = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Force F (N)', 1, 10, 5, 0.5, function(val) {
                            F = val;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 100 N force pushes a box 5 m along a flat floor in the direction of the force. How much work is done?',
                    hint: 'When force and displacement are in the same direction, the angle is 0 degrees.',
                    solution: 'W = Fd cos(0) = 100 x 5 x 1 = 500 J.'
                },
                {
                    question: 'You carry a 20 kg box horizontally across a room for 10 m at constant speed. How much work does gravity do on the box?',
                    hint: 'Gravity acts downward. The displacement is horizontal. What is the angle between them?',
                    solution: 'Gravity is perpendicular to the horizontal displacement, so the angle is 90 degrees. W = mg x d x cos(90) = 0 J. Gravity does no work on the box during horizontal motion.'
                },
                {
                    question: 'A 60 N force is applied at 60 degrees above the horizontal to drag a crate 4 m. What is the work done by this force?',
                    hint: 'Use W = Fd cos(theta) with theta = 60 degrees.',
                    solution: 'W = 60 x 4 x cos(60) = 240 x 0.5 = 120 J.'
                },
                {
                    question: 'Friction of 30 N acts on a sliding box that moves 8 m. What is the work done by friction?',
                    hint: 'Friction acts opposite to the direction of motion, so the angle is 180 degrees.',
                    solution: 'W = 30 x 8 x cos(180) = 240 x (-1) = -240 J. Friction does negative work, removing energy from the object.'
                },
                {
                    question: 'A person pushes a lawnmower with a force of 80 N at 45 degrees below the horizontal for 12 m. Calculate the work done by the person.',
                    hint: 'The angle between the force and horizontal displacement is 45 degrees.',
                    solution: 'W = 80 x 12 x cos(45) = 960 x 0.707 = 678.8 J (approximately 679 J).'
                }
            ]
        },

        // ===== SECTION 2: Kinetic Energy and Work-Energy Theorem =====
        {
            id: 'kinetic-energy',
            title: 'Kinetic Energy and the Work-Energy Theorem',
            content: `
                <h2>Energy of Motion</h2>

                <div class="env-block definition">
                    <div class="env-title">Kinetic Energy</div>
                    <div class="env-body">
                        <p>The kinetic energy of an object of mass \\(m\\) moving at speed \\(v\\) is:</p>
                        \\[ E_k = \\frac{1}{2}mv^2 \\]
                        <p>Kinetic energy is always non-negative (zero when the object is at rest, positive otherwise). It is measured in joules (J).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why the Square?</div>
                    <div class="env-body"><p>Doubling the speed of an object quadruples its kinetic energy. This is why high-speed collisions are so much more destructive: a car at 60 km/h has four times the kinetic energy of the same car at 30 km/h.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">The Work-Energy Theorem</div>
                    <div class="env-body">
                        <p>The net work done on an object equals the change in its kinetic energy:</p>
                        \\[ W_{\\text{net}} = \\Delta E_k = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2 \\]
                        <p>If net work is positive, the object speeds up. If net work is negative, the object slows down.</p>
                    </div>
                </div>

                <p>This theorem is extremely powerful. It connects forces (through work) directly to motion (through kinetic energy), without needing to know the details of acceleration at every instant.</p>

                <div class="env-block example">
                    <div class="env-title">Example: Braking a Car</div>
                    <div class="env-body">
                        <p>A 1200 kg car is traveling at 20 m/s when the driver hits the brakes. The braking force is 6000 N. How far does the car skid before stopping?</p>
                        <p>Using the work-energy theorem:</p>
                        \\[ W_{\\text{net}} = \\Delta E_k \\]
                        \\[ -6000 \\times d = 0 - \\frac{1}{2}(1200)(20)^2 \\]
                        \\[ -6000d = -240{,}000 \\]
                        \\[ d = 40\\,\\text{m} \\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-work-energy"></div>

                <p>The visualization above shows how net work changes the kinetic energy of a block. Use the sliders to set the force and mass, then watch how the block accelerates or decelerates.</p>

                <div class="env-block warning">
                    <div class="env-title">Speed, Not Velocity</div>
                    <div class="env-body"><p>Kinetic energy depends on speed (the magnitude of velocity), not on direction. Two objects moving in opposite directions at the same speed have the same kinetic energy.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-work-energy',
                    title: 'Work-Energy Theorem in Action',
                    description: 'Watch how net work changes the kinetic energy of a block sliding on a surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 40, originX: 80, originY: 300 });
                        var mass = 2;
                        var force = 10;
                        var friction = 3;
                        var playing = false;
                        var t = 0;
                        var v = 0;
                        var x = 0;
                        var startTime = 0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.drawGround(-1, 0, 14);

                            // Block at current position (clamped for visual)
                            var xVis = Math.min(Math.max(x, 0), 10);
                            viz.drawMass(1 + xVis, 0.5, 0.7, viz.colors.blue, 'm');

                            // Force arrows
                            var netF = force - friction;
                            if (Math.abs(force) > 0.1) {
                                viz.drawForce(1 + xVis, 0.5, force * 0.05, 0, viz.colors.orange, 'F', 1);
                            }
                            if (friction > 0.1 && v > 0.01) {
                                viz.drawForce(1 + xVis, 0.5, -friction * 0.05, 0, viz.colors.red, 'f', 1);
                            }

                            // Energy bar chart area
                            var barX = 500;
                            var barW = 50;
                            var KE = 0.5 * mass * v * v;
                            var workDone = netF * x;
                            var keScale = 2;
                            var maxBarH = 200;

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('KE', barX + 25, 310);
                            ctx.fillText('W_net', barX + 95, 310);

                            var keH = Math.min(KE * keScale, maxBarH);
                            var wH = Math.min(Math.abs(workDone) * keScale, maxBarH);

                            ctx.fillStyle = viz.colors.blue + '88';
                            ctx.fillRect(barX, 305 - keH, barW, keH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(barX, 305 - keH, barW, keH);

                            ctx.fillStyle = (workDone >= 0 ? viz.colors.green : viz.colors.red) + '88';
                            ctx.fillRect(barX + 70, 305 - wH, barW, wH);
                            ctx.strokeStyle = workDone >= 0 ? viz.colors.green : viz.colors.red;
                            ctx.strokeRect(barX + 70, 305 - wH, barW, wH);

                            // Info text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('v = ' + v.toFixed(2) + ' m/s', 20, 20);
                            ctx.fillText('KE = ' + KE.toFixed(1) + ' J', 20, 42);
                            ctx.fillText('W_net = ' + workDone.toFixed(1) + ' J', 20, 64);
                            ctx.fillText('x = ' + x.toFixed(2) + ' m', 20, 86);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Applied Force (N)', 0, 30, 10, 1, function(val) {
                            force = val;
                            if (!playing) draw();
                        });
                        VizEngine.createSlider(controls, 'Friction (N)', 0, 15, 3, 0.5, function(val) {
                            friction = val;
                            if (!playing) draw();
                        });
                        VizEngine.createSlider(controls, 'Mass (kg)', 0.5, 10, 2, 0.5, function(val) {
                            mass = val;
                            if (!playing) draw();
                        });

                        VizEngine.createButton(controls, 'Start', function() {
                            if (playing) return;
                            playing = true;
                            t = 0; v = 0; x = 0; startTime = 0;
                            viz.animate(function(timestamp) {
                                if (startTime === 0) startTime = timestamp;
                                var dt = 0.016;
                                t += dt;
                                var netF = force - (v > 0.01 ? friction : 0);
                                var a = netF / mass;
                                v += a * dt;
                                if (v < 0) v = 0;
                                x += v * dt;
                                draw();
                                if (t > 5 || x > 10) {
                                    viz.stopAnimation();
                                    playing = false;
                                }
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            playing = false;
                            t = 0; v = 0; x = 0;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 3 kg object is moving at 4 m/s. What is its kinetic energy?',
                    hint: 'Use KE = (1/2)mv^2.',
                    solution: 'KE = (1/2)(3)(4^2) = (1/2)(3)(16) = 24 J.'
                },
                {
                    question: 'If a car doubles its speed from 15 m/s to 30 m/s, by what factor does its kinetic energy increase?',
                    hint: 'Kinetic energy depends on v squared.',
                    solution: 'KE is proportional to v^2. When speed doubles, KE increases by a factor of 2^2 = 4.'
                },
                {
                    question: 'A 5 kg block initially at rest is pushed by a net force, doing 100 J of work on it. What is the final speed of the block?',
                    hint: 'Use the work-energy theorem: W_net = (1/2)mv_f^2 - (1/2)mv_i^2, with v_i = 0.',
                    solution: 'W = (1/2)mv_f^2 - 0, so 100 = (1/2)(5)v_f^2. Then v_f^2 = 40, so v_f = sqrt(40) = 6.32 m/s (approximately 2*sqrt(10) m/s).'
                },
                {
                    question: 'A 0.5 kg ball is thrown upward at 10 m/s. Using the work-energy theorem, find how much work gravity does as the ball rises to its maximum height.',
                    hint: 'At maximum height, v_f = 0.',
                    solution: 'W_gravity = (1/2)(0.5)(0^2) - (1/2)(0.5)(10^2) = 0 - 25 = -25 J. Gravity does -25 J of work (removes kinetic energy).'
                },
                {
                    question: 'A 1500 kg car brakes from 25 m/s to 10 m/s. How much work does the braking force do?',
                    hint: 'W = change in KE = (1/2)m(v_f^2 - v_i^2).',
                    solution: 'W = (1/2)(1500)(10^2 - 25^2) = (1/2)(1500)(100 - 625) = (1/2)(1500)(-525) = -393,750 J. The braking force does approximately -394 kJ of work.'
                }
            ]
        },

        // ===== SECTION 3: Potential Energy =====
        {
            id: 'potential-energy',
            title: 'Potential Energy',
            content: `
                <h2>Stored Energy: Gravitational and Elastic</h2>

                <div class="env-block intuition">
                    <div class="env-title">Energy Waiting to Be Released</div>
                    <div class="env-body"><p>Potential energy is energy stored by virtue of an object's position or configuration. A book on a high shelf has gravitational potential energy; a compressed spring has elastic potential energy. When released, this stored energy converts into kinetic energy.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Gravitational Potential Energy</div>
                    <div class="env-body">
                        <p>Near the Earth's surface, the gravitational potential energy of an object of mass \\(m\\) at height \\(h\\) above a chosen reference level is:</p>
                        \\[ E_p = mgh \\]
                        <p>where \\(g \\approx 9.8\\,\\text{m/s}^2\\). The choice of reference level (where \\(h = 0\\)) is arbitrary, but once chosen, must remain consistent throughout the problem.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Book on a Shelf</div>
                    <div class="env-body">
                        <p>A 2 kg book sits on a shelf 3 m above the floor. Taking the floor as the reference level:</p>
                        \\[ E_p = mgh = 2 \\times 9.8 \\times 3 = 58.8\\,\\text{J} \\]
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Elastic Potential Energy</div>
                    <div class="env-body">
                        <p>A spring with spring constant \\(k\\) compressed or stretched by a displacement \\(x\\) from its natural length stores elastic potential energy:</p>
                        \\[ E_p = \\frac{1}{2}kx^2 \\]
                        <p>This energy is always non-negative and increases with the square of the displacement.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Connection to Work</div>
                    <div class="env-body">
                        <p>The work done by gravity when an object descends a height \\(h\\) is \\(W = mgh\\). This equals the decrease in gravitational potential energy. Similarly, the work done by a spring force as it returns to natural length equals the decrease in elastic potential energy. Potential energy is a way to "book-keep" the work done by conservative forces.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-spring-energy"></div>

                <p>The interactive visualization above shows a spring-mass system. Drag the mass to stretch or compress the spring and watch the elastic potential energy change. When released, the potential energy converts to kinetic energy and back again.</p>

                <div class="env-block warning">
                    <div class="env-title">Reference Level Matters</div>
                    <div class="env-body"><p>Gravitational PE depends on the choice of reference level (where h = 0). The value of PE itself can be positive, negative, or zero. What matters physically is the <em>change</em> in PE, which is the same regardless of the reference level chosen.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-spring-energy',
                    title: 'Spring-Mass Energy Exchange',
                    description: 'Watch elastic potential energy convert to kinetic energy and back as a mass oscillates on a spring.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 40, originX: 100, originY: 200 });
                        var k = 20;
                        var mass = 1;
                        var x0 = 3;
                        var x = x0;
                        var v = 0;
                        var playing = false;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Wall
                            ctx.fillStyle = viz.colors.axis;
                            ctx.fillRect(40, 100, 10, 200);

                            // Spring (draw from wall to mass)
                            var equilibriumX = 3;
                            var massScreenX = 100 + (equilibriumX + x) * viz.scale;
                            var wallScreenX = 50;
                            var springY = 200;

                            // Draw spring using zigzag
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(wallScreenX, springY);
                            var coils = 12;
                            var springLen = massScreenX - wallScreenX - 20;
                            var segLen = springLen / (coils * 2 + 2);
                            var cx = wallScreenX + segLen;
                            ctx.lineTo(cx, springY);
                            for (var i = 0; i < coils * 2; i++) {
                                var sign = (i % 2 === 0) ? 1 : -1;
                                cx += segLen;
                                ctx.lineTo(cx, springY + sign * 15);
                            }
                            cx += segLen;
                            ctx.lineTo(cx, springY);
                            ctx.stroke();

                            // Mass block
                            var blockSize = 30;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(massScreenX - blockSize / 2, springY - blockSize / 2, blockSize, blockSize);
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.strokeRect(massScreenX - blockSize / 2, springY - blockSize / 2, blockSize, blockSize);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('m', massScreenX, springY);

                            // Equilibrium marker
                            var eqScreenX = 100 + equilibriumX * viz.scale;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(eqScreenX, springY - 60);
                            ctx.lineTo(eqScreenX, springY + 60);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('x = 0', eqScreenX, springY + 75);

                            // Energy bars
                            var PE = 0.5 * k * x * x;
                            var KE = 0.5 * mass * v * v;
                            var totalE = PE + KE;
                            var barMaxH = 120;
                            var barScale = totalE > 0.01 ? barMaxH / (0.5 * k * x0 * x0) : 1;

                            var barX = 480;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('PE', barX + 20, 340);
                            ctx.fillText('KE', barX + 80, 340);
                            ctx.fillText('Total', barX + 140, 340);

                            var peH = PE * barScale;
                            var keH = KE * barScale;
                            var totH = totalE * barScale;

                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.fillRect(barX, 330 - peH, 40, peH);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(barX, 330 - peH, 40, peH);

                            ctx.fillStyle = viz.colors.orange + '88';
                            ctx.fillRect(barX + 60, 330 - keH, 40, keH);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.strokeRect(barX + 60, 330 - keH, 40, keH);

                            ctx.fillStyle = viz.colors.purple + '88';
                            ctx.fillRect(barX + 120, 330 - totH, 40, totH);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.strokeRect(barX + 120, 330 - totH, 40, totH);

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('x = ' + x.toFixed(2) + ' m', 20, 20);
                            ctx.fillText('v = ' + v.toFixed(2) + ' m/s', 20, 42);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('PE = ' + PE.toFixed(1) + ' J', 20, 64);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('KE = ' + KE.toFixed(1) + ' J', 20, 86);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Total = ' + totalE.toFixed(1) + ' J', 180, 64);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Initial displacement x (m)', -4, 4, 3, 0.1, function(val) {
                            if (!playing) {
                                x0 = Math.abs(val);
                                x = val;
                                v = 0;
                                draw();
                            }
                        });

                        VizEngine.createSlider(controls, 'Spring constant k (N/m)', 5, 50, 20, 1, function(val) {
                            k = val;
                            if (!playing) draw();
                        });

                        VizEngine.createButton(controls, 'Release', function() {
                            if (playing) return;
                            playing = true;
                            x0 = Math.abs(x);
                            viz.animate(function() {
                                var dt = 0.016;
                                var F = -k * x;
                                var a = F / mass;
                                v += a * dt;
                                x += v * dt;
                                draw();
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            playing = false;
                            x = x0;
                            v = 0;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 5 kg rock is at the top of a 20 m cliff. Calculate its gravitational potential energy relative to the base of the cliff.',
                    hint: 'Use E_p = mgh with the base as the reference level.',
                    solution: 'E_p = mgh = 5 x 9.8 x 20 = 980 J.'
                },
                {
                    question: 'A spring with k = 200 N/m is compressed by 0.15 m. How much elastic potential energy is stored in the spring?',
                    hint: 'Use E_p = (1/2)kx^2.',
                    solution: 'E_p = (1/2)(200)(0.15^2) = (1/2)(200)(0.0225) = 2.25 J.'
                },
                {
                    question: 'If you double the compression of a spring, by what factor does the elastic potential energy change?',
                    hint: 'Elastic PE depends on x^2.',
                    solution: 'Since E_p = (1/2)kx^2, doubling x means E_p increases by a factor of 2^2 = 4.'
                },
                {
                    question: 'A 0.2 kg ball is 10 m above the ground. Taking the ground as reference, what is its gravitational PE? Taking a table 1 m above the ground as reference, what is its PE?',
                    hint: 'The height h changes depending on the reference level.',
                    solution: 'Ground reference: E_p = 0.2 x 9.8 x 10 = 19.6 J. Table reference: h = 10 - 1 = 9 m, so E_p = 0.2 x 9.8 x 9 = 17.64 J. The difference in PE between two points is the same regardless of reference: 19.6 - 0 = 19.6 J vs 17.64 - (-1.96) = 19.6 J.'
                },
                {
                    question: 'A spring gun has a spring with k = 500 N/m compressed by 0.1 m. It fires a 0.05 kg ball. If all elastic PE converts to KE, what is the speed of the ball?',
                    hint: 'Set (1/2)kx^2 = (1/2)mv^2 and solve for v.',
                    solution: '(1/2)(500)(0.01) = (1/2)(0.05)v^2. So 2.5 = 0.025 v^2, giving v^2 = 100, thus v = 10 m/s.'
                }
            ]
        },

        // ===== SECTION 4: Conservation of Mechanical Energy =====
        {
            id: 'conservation',
            title: 'Conservation of Mechanical Energy',
            content: `
                <h2>Energy Transforms, But Never Disappears</h2>

                <div class="env-block theorem">
                    <div class="env-title">Law of Conservation of Mechanical Energy</div>
                    <div class="env-body">
                        <p>When only conservative forces (gravity, spring forces) do work on a system, the total mechanical energy is conserved:</p>
                        \\[ E_k + E_p = \\text{constant} \\]
                        \\[ \\frac{1}{2}mv_1^2 + mgh_1 = \\frac{1}{2}mv_2^2 + mgh_2 \\]
                        <p>Kinetic energy and potential energy can convert into each other, but their sum remains unchanged.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Roller Coaster Analogy</div>
                    <div class="env-body"><p>A roller coaster perfectly illustrates energy conservation. At the top of a hill, the car has maximum potential energy and minimum kinetic energy. As it descends, potential energy converts to kinetic energy and the car speeds up. At the bottom, KE is maximized. Going uphill, the reverse happens. If there were no friction, the car could coast forever.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Dropping a Ball</div>
                    <div class="env-body">
                        <p>A ball is dropped from rest at height \\(h = 20\\) m. Find its speed just before hitting the ground (ignore air resistance).</p>
                        <p>Using conservation of energy (taking the ground as reference):</p>
                        \\[ mgh = \\frac{1}{2}mv^2 \\]
                        <p>Mass cancels:</p>
                        \\[ v = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 20} = \\sqrt{392} \\approx 19.8\\,\\text{m/s} \\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-roller-coaster"></div>

                <p>The roller coaster visualization above lets you design a track and watch how energy converts between kinetic and potential forms. The energy bar chart on the right updates in real time.</p>

                <div class="env-block warning">
                    <div class="env-title">When Conservation Fails</div>
                    <div class="env-body"><p>If non-conservative forces (like friction or air resistance) do work, mechanical energy is <em>not</em> conserved. Some mechanical energy is converted to thermal energy (heat). In that case: \\(E_{k1} + E_{p1} = E_{k2} + E_{p2} + W_{\\text{friction}}\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Pendulum</div>
                    <div class="env-body">
                        <p>A pendulum bob of mass 0.5 kg is pulled to a height of 0.4 m above its lowest point and released. What is its speed at the lowest point?</p>
                        \\[ mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2 \\times 9.8 \\times 0.4} = \\sqrt{7.84} \\approx 2.8\\,\\text{m/s} \\]
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-roller-coaster',
                    title: 'Roller Coaster Energy Conservation',
                    description: 'Watch a ball roll along a track and see energy transform between kinetic and potential forms.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 400 });
                        var ctx = viz.ctx;
                        var h0 = 300;
                        var g = 300;
                        var playing = false;
                        var ballPos = 0;
                        var ballSpeed = 0;

                        // Track defined as height profile
                        var trackPoints = [];
                        var trackLen = 650;
                        for (var i = 0; i <= trackLen; i++) {
                            var t = i / trackLen;
                            var h = h0 * (0.5 + 0.5 * Math.cos(2 * Math.PI * t)) * (1 - 0.15 * Math.sin(4 * Math.PI * t));
                            h = Math.max(h, 20);
                            trackPoints.push({ x: 30 + i, y: h });
                        }

                        function getTrackHeight(pos) {
                            var idx = Math.max(0, Math.min(Math.floor(pos), trackLen - 1));
                            var frac = pos - idx;
                            if (idx >= trackLen - 1) return trackPoints[trackLen].y;
                            return trackPoints[idx].y + frac * (trackPoints[idx + 1].y - trackPoints[idx].y);
                        }

                        function getTrackSlope(pos) {
                            var idx = Math.max(0, Math.min(Math.floor(pos), trackLen - 2));
                            return trackPoints[idx + 1].y - trackPoints[idx].y;
                        }

                        function draw() {
                            viz.clear();

                            // Draw track
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= trackLen; i++) {
                                var px = trackPoints[i].x;
                                var py = 380 - trackPoints[i].y;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Ball
                            var bIdx = Math.max(0, Math.min(Math.floor(ballPos), trackLen));
                            var bx = trackPoints[bIdx].x;
                            var bh = getTrackHeight(ballPos);
                            var by = 380 - bh - 8;

                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(bx, by, 8, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            // Energy bars
                            var PE = bh;
                            var maxE = h0;
                            var KE = maxE - PE;
                            if (KE < 0) KE = 0;
                            var barMaxH = 150;
                            var barScale = barMaxH / maxE;

                            var barX = 570;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('PE', barX - 15, 395);
                            ctx.fillText('KE', barX + 35, 395);

                            var peH = PE * barScale;
                            var keH = KE * barScale;

                            // PE bar (stacked from bottom: KE then PE)
                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.fillRect(barX - 30, 385 - peH, 30, peH);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(barX - 30, 385 - peH, 30, peH);

                            ctx.fillStyle = viz.colors.orange + '88';
                            ctx.fillRect(barX + 20, 385 - keH, 30, keH);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.strokeRect(barX + 20, 385 - keH, 30, keH);

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Height: ' + (bh / 10).toFixed(1) + ' m', 20, 20);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('PE = mgh', 20, 40);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('KE = (1/2)mv\u00B2', 20, 58);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Total E = constant', 20, 76);
                        }

                        draw();

                        VizEngine.createButton(controls, 'Release', function() {
                            if (playing) return;
                            playing = true;
                            ballPos = 0;
                            ballSpeed = 0;
                            viz.animate(function() {
                                var dt = 0.8;
                                var slope = getTrackSlope(ballPos);
                                var acc = slope * 0.5;
                                ballSpeed += acc * dt;
                                ballSpeed *= 0.999;
                                ballPos += ballSpeed * dt;
                                if (ballPos < 0) { ballPos = 0; ballSpeed = Math.abs(ballSpeed) * 0.95; }
                                if (ballPos > trackLen - 1) { ballPos = trackLen - 1; ballSpeed = -Math.abs(ballSpeed) * 0.95; }
                                draw();
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            playing = false;
                            ballPos = 0;
                            ballSpeed = 0;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 2 kg ball is dropped from rest at a height of 10 m. What is its speed just before hitting the ground? (Ignore air resistance, g = 9.8 m/s^2)',
                    hint: 'Use conservation of energy: mgh = (1/2)mv^2. Mass cancels.',
                    solution: 'v = sqrt(2gh) = sqrt(2 x 9.8 x 10) = sqrt(196) = 14 m/s.'
                },
                {
                    question: 'A roller coaster car (mass 500 kg) starts from rest at a height of 40 m. What is its speed at a height of 15 m? (Ignore friction)',
                    hint: 'Use conservation: mgh_1 = (1/2)mv^2 + mgh_2.',
                    solution: 'mgh_1 = (1/2)mv^2 + mgh_2. Mass cancels: g(h_1 - h_2) = (1/2)v^2. So v = sqrt(2g(h_1 - h_2)) = sqrt(2 x 9.8 x 25) = sqrt(490) = 22.1 m/s.'
                },
                {
                    question: 'A pendulum is released from a height of 0.8 m above its lowest point. What is its speed at the lowest point?',
                    hint: 'All potential energy converts to kinetic energy at the lowest point.',
                    solution: 'v = sqrt(2gh) = sqrt(2 x 9.8 x 0.8) = sqrt(15.68) = 3.96 m/s (approximately 4.0 m/s).'
                },
                {
                    question: 'A skier (70 kg) starts from rest at the top of a 50 m slope. At the bottom, she is moving at 20 m/s. How much energy was lost to friction?',
                    hint: 'Energy lost = initial mechanical energy - final mechanical energy.',
                    solution: 'Initial E = mgh = 70 x 9.8 x 50 = 34,300 J. Final E = (1/2)(70)(20^2) = 14,000 J. Energy lost to friction = 34,300 - 14,000 = 20,300 J.'
                },
                {
                    question: 'A ball is launched vertically upward at 15 m/s. Using energy conservation, find the maximum height it reaches.',
                    hint: 'At maximum height, v = 0. Set (1/2)mv^2 = mgh.',
                    solution: 'h = v^2 / (2g) = 15^2 / (2 x 9.8) = 225 / 19.6 = 11.48 m (approximately 11.5 m).'
                }
            ]
        },

        // ===== SECTION 5: Power =====
        {
            id: 'power',
            title: 'Power',
            content: `
                <h2>The Rate of Doing Work</h2>

                <div class="env-block definition">
                    <div class="env-title">Power</div>
                    <div class="env-body">
                        <p>Power is the rate at which work is done, or equivalently, the rate of energy transfer:</p>
                        \\[ P = \\frac{W}{t} \\]
                        <p>The SI unit of power is the <strong>watt</strong> (W), where \\(1\\,\\text{W} = 1\\,\\text{J/s}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Instantaneous Power</div>
                    <div class="env-body">
                        <p>When a constant force \\(F\\) acts on an object moving at velocity \\(v\\) in the same direction as the force:</p>
                        \\[ P = Fv \\]
                        <p>This is the instantaneous power delivered by the force. If the force and velocity are at an angle \\(\\theta\\):</p>
                        \\[ P = Fv\\cos\\theta \\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Cars and Power</div>
                    <div class="env-body"><p>A car engine has a maximum power output. From \\(P = Fv\\), you can see that at higher speeds the engine can provide less driving force (since P is fixed). This explains why acceleration decreases as a car speeds up, and why there is a maximum speed (when the driving force equals the total resistance).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Climbing Stairs</div>
                    <div class="env-body">
                        <p>A 70 kg person climbs a 3 m staircase in 5 seconds. The power output is:</p>
                        \\[ P = \\frac{W}{t} = \\frac{mgh}{t} = \\frac{70 \\times 9.8 \\times 3}{5} = \\frac{2058}{5} = 411.6\\,\\text{W} \\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-power-velocity"></div>

                <p>The visualization above shows how a car's driving force varies with speed for a fixed engine power. Adjust the power and resistance to see how they determine the maximum speed.</p>

                <div class="env-block example">
                    <div class="env-title">Example: Maximum Speed</div>
                    <div class="env-body">
                        <p>A car has an engine power of 80 kW and faces a total resistance of 2000 N. What is the maximum speed?</p>
                        <p>At maximum speed, the driving force equals the resistance, and all engine power goes to overcoming friction:</p>
                        \\[ P = F_{\\text{resistance}} \\times v_{\\max} \\implies v_{\\max} = \\frac{P}{F_{\\text{resistance}}} = \\frac{80{,}000}{2000} = 40\\,\\text{m/s} \\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Kilowatt and Horsepower</div>
                    <div class="env-body"><p>1 kW = 1000 W. The horsepower (hp) is an older unit: 1 hp is approximately 746 W. A typical car engine produces about 100 to 200 hp (roughly 75 to 150 kW).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-energy-bars"></div>

                <p>This energy bar chart visualization summarizes the full picture: track how kinetic energy, gravitational PE, and elastic PE share the total mechanical energy as conditions change.</p>
            `,
            visualizations: [
                {
                    id: 'viz-power-velocity',
                    title: 'Power, Force, and Velocity',
                    description: 'See how driving force varies with speed for a constant engine power, and find maximum speed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 70, originY: 320 });
                        var power = 60000;
                        var resistance = 1500;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(70, 320); ctx.lineTo(670, 320); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(70, 320); ctx.lineTo(70, 30); ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Speed v (m/s)', 370, 355);
                            ctx.save();
                            ctx.translate(18, 175);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Force F (N)', 0, 0);
                            ctx.restore();

                            var vMax = 60;
                            var fMax = 6000;
                            var scaleX = 580 / vMax;
                            var scaleY = 280 / fMax;

                            // Grid and ticks
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var v = 0; v <= vMax; v += 10) {
                                var px = 70 + v * scaleX;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(v, px, 324);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(px, 320); ctx.lineTo(px, 30); ctx.stroke();
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var f = 0; f <= fMax; f += 1000) {
                                var py = 320 - f * scaleY;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(f, 64, py);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(70, py); ctx.lineTo(670, py); ctx.stroke();
                            }

                            // F = P/v curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var v = 2; v <= vMax; v += 0.5) {
                                var F = power / v;
                                if (F > fMax) F = fMax;
                                var px = 70 + v * scaleX;
                                var py = 320 - F * scaleY;
                                if (!started) { ctx.moveTo(px, py); started = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Resistance line
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            var rY = 320 - resistance * scaleY;
                            ctx.beginPath(); ctx.moveTo(70, rY); ctx.lineTo(670, rY); ctx.stroke();
                            ctx.setLineDash([]);

                            // Intersection (max speed)
                            var vMaxSpeed = power / resistance;
                            if (vMaxSpeed <= vMax) {
                                var intX = 70 + vMaxSpeed * scaleX;
                                var intY = 320 - resistance * scaleY;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(intX, intY, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.setLineDash([3, 3]);
                                ctx.strokeStyle = viz.colors.yellow + '88';
                                ctx.beginPath(); ctx.moveTo(intX, intY); ctx.lineTo(intX, 320); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('v_max = ' + vMaxSpeed.toFixed(1) + ' m/s', intX, 320 + 14);
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('F = P/v (driving force)', 380, 50);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Resistance = ' + resistance + ' N', 380, 70);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('P = ' + (power / 1000).toFixed(0) + ' kW', 380, 30);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Power (kW)', 10, 150, 60, 5, function(val) {
                            power = val * 1000;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Resistance (N)', 500, 4000, 1500, 100, function(val) {
                            resistance = val;
                            draw();
                        });
                    }
                },
                {
                    id: 'viz-energy-bars',
                    title: 'Energy Bar Chart',
                    description: 'Track how kinetic, gravitational potential, and elastic potential energy share the total.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 0, originY: 350 });
                        var ctx = viz.ctx;
                        var height = 5;
                        var speed = 0;
                        var springX = 0;
                        var mass = 2;
                        var k = 100;
                        var g = 9.8;

                        function draw() {
                            viz.clear();

                            var KE = 0.5 * mass * speed * speed;
                            var GPE = mass * g * height;
                            var EPE = 0.5 * k * springX * springX;
                            var total = KE + GPE + EPE;

                            var barMaxH = 250;
                            var barW = 80;
                            var maxEnergy = Math.max(total, 1);
                            var scale = barMaxH / maxEnergy;

                            var labels = ['KE', 'Grav PE', 'Elastic PE', 'Total'];
                            var values = [KE, GPE, EPE, total];
                            var colors = [viz.colors.orange, viz.colors.green, viz.colors.teal, viz.colors.purple];
                            var startX = 100;
                            var gap = 130;

                            for (var i = 0; i < 4; i++) {
                                var bx = startX + i * gap;
                                var bh = values[i] * scale;

                                ctx.fillStyle = colors[i] + '66';
                                ctx.fillRect(bx, 310 - bh, barW, bh);
                                ctx.strokeStyle = colors[i];
                                ctx.lineWidth = 2;
                                ctx.strokeRect(bx, 310 - bh, barW, bh);

                                ctx.fillStyle = colors[i];
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(labels[i], bx + barW / 2, 330);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText(values[i].toFixed(1) + ' J', bx + barW / 2, 310 - bh - 10);
                            }

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Total Mechanical Energy = ' + total.toFixed(1) + ' J', 350, 25);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Height (m)', 0, 20, 5, 0.5, function(val) {
                            height = val;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Speed (m/s)', 0, 15, 0, 0.5, function(val) {
                            speed = val;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Spring compression (m)', 0, 1, 0, 0.05, function(val) {
                            springX = val;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Mass (kg)', 0.5, 10, 2, 0.5, function(val) {
                            mass = val;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A crane lifts a 200 kg load 15 m in 30 seconds. What is the power output of the crane?',
                    hint: 'Power = Work / time = mgh / t.',
                    solution: 'P = mgh/t = (200 x 9.8 x 15) / 30 = 29,400 / 30 = 980 W.'
                },
                {
                    question: 'A car engine delivers 90 kW. The car is traveling at a constant 30 m/s on a level road. What is the total resistance force?',
                    hint: 'At constant speed, driving force = resistance. Use P = Fv.',
                    solution: 'At constant speed, F = P/v = 90,000/30 = 3000 N.'
                },
                {
                    question: 'An electric motor does 5000 J of work in 20 seconds. What is its power output?',
                    hint: 'P = W/t.',
                    solution: 'P = 5000/20 = 250 W.'
                },
                {
                    question: 'A 60 kg sprinter accelerates from rest to 10 m/s in 2 seconds. What is the average power developed?',
                    hint: 'First find the kinetic energy gained, then divide by time.',
                    solution: 'KE = (1/2)(60)(10^2) = 3000 J. Average power = 3000/2 = 1500 W.'
                },
                {
                    question: 'A truck engine has a maximum power of 200 kW. At maximum power, the truck maintains a constant speed of 25 m/s uphill. The total resistance is 3000 N. What is the angle of the slope? (Mass = 8000 kg)',
                    hint: 'At constant speed: P = (mg sin(theta) + friction) x v. Solve for sin(theta).',
                    solution: 'At constant speed: P = (mg sin(theta) + f_resistance) x v. So 200,000 = (8000 x 9.8 x sin(theta) + 3000) x 25. Then 8000 = 78,400 sin(theta) + 3000. So 78,400 sin(theta) = 5000, giving sin(theta) = 0.0638, and theta = 3.66 degrees (approximately 3.7 degrees).'
                }
            ]
        }
    ]
});
