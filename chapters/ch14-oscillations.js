window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Oscillations',
    subtitle: 'Periodic Motion and Harmonic Oscillations',
    sections: [
        // ===== SECTION 1: Simple Harmonic Motion =====
        {
            id: 'simple-harmonic-motion',
            title: 'Simple Harmonic Motion',
            content: `
                <h2>Simple Harmonic Motion</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Oscillations Matter</div>
                    <div class="env-body"><p>Oscillations are everywhere: a child on a swing, a vibrating guitar string, the ticking of a clock, the alternating current in your home wiring. Understanding oscillatory motion is the gateway to understanding waves, sound, light, and even quantum mechanics.</p></div>
                </div>

                <p>An <strong>oscillation</strong> is any repetitive back-and-forth motion about an equilibrium position. When we pull a mass on a spring and release it, it bounces back and forth. When we displace a pendulum and let go, it swings side to side. These are both examples of oscillatory motion.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Oscillation</div>
                    <div class="env-body"><p>An <strong>oscillation</strong> (or vibration) is a repetitive motion of an object about an equilibrium position. One complete back-and-forth cycle is called one <strong>oscillation</strong> or one <strong>cycle</strong>.</p></div>
                </div>

                <p>The simplest and most important type of oscillation is <strong>simple harmonic motion</strong> (SHM). It occurs whenever the restoring force is directly proportional to the displacement from equilibrium and directed toward it.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Simple Harmonic Motion (SHM)</div>
                    <div class="env-body"><p>Simple harmonic motion is oscillatory motion in which the restoring force \\(F\\) is proportional to the displacement \\(x\\) from the equilibrium position and always directed toward that position:</p>
                    <p>\\[ F = -kx \\]</p>
                    <p>Here \\(k\\) is a positive constant (the spring constant for a mass-spring system). The negative sign ensures the force always points back toward equilibrium.</p></div>
                </div>

                <p>Key quantities that describe any oscillation:</p>
                <ul>
                    <li><strong>Amplitude</strong> \\(A\\): the maximum displacement from equilibrium (in meters).</li>
                    <li><strong>Period</strong> \\(T\\): the time for one complete cycle (in seconds).</li>
                    <li><strong>Frequency</strong> \\(f\\): the number of cycles per second (in hertz, Hz). \\(f = 1/T\\).</li>
                    <li><strong>Angular frequency</strong> \\(\\omega\\): \\(\\omega = 2\\pi f = 2\\pi / T\\) (in rad/s).</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example: A Mass on a Spring</div>
                    <div class="env-body">
                        <p>A block attached to a spring is pulled 0.10 m from its equilibrium position and released. It completes one full oscillation in 0.50 s.</p>
                        <p>The amplitude is \\(A = 0.10\\) m. The period is \\(T = 0.50\\) s. The frequency is \\(f = 1/T = 2.0\\) Hz. The angular frequency is \\(\\omega = 2\\pi f = 4\\pi \\approx 12.6\\) rad/s.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-spring-mass-shm"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>Not all oscillations are simple harmonic. SHM specifically requires a linear restoring force \\(F = -kx\\). For large-angle pendulum swings or anharmonic potentials, the motion is periodic but not simple harmonic.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-spring-mass-shm',
                    title: 'Spring-Mass SHM Animator',
                    description: 'Watch a mass on a spring undergo simple harmonic motion. Adjust amplitude and spring constant.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 80, originX: 350, originY: 200 });

                        var A = 2.0;
                        var k = 4.0;
                        var m = 1.0;
                        var running = true;

                        VizEngine.createSlider(controls, 'Amplitude A', 0.5, 3.0, A, 0.1, function(v) { A = v; });
                        VizEngine.createSlider(controls, 'Spring const k', 1.0, 10.0, k, 0.5, function(v) { k = v; });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var wallX = -3.5;
                        var eqX = 0;
                        var trail = [];

                        viz.animate(function(t) {
                            var omega = Math.sqrt(k / m);
                            var T = 2 * Math.PI / omega;
                            var tSec = t / 1000;
                            var x = running ? A * Math.cos(omega * tSec) : A;

                            viz.clear();

                            // Ground
                            viz.drawGround(wallX, -1.2, 4, viz.colors.text);

                            // Wall
                            var ws = viz.toScreen(wallX, 1.5);
                            var wb = viz.toScreen(wallX, -1.2);
                            viz.ctx.strokeStyle = viz.colors.text;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            viz.ctx.moveTo(ws[0], ws[1]);
                            viz.ctx.lineTo(wb[0], wb[1]);
                            viz.ctx.stroke();

                            // Spring
                            viz.drawSpring(wallX, 0, eqX + x - 0.35, 0, 12, 10, viz.colors.teal);

                            // Mass block
                            viz.drawMass(eqX + x, 0, 0.7, viz.colors.blue, 'm');

                            // Equilibrium marker
                            viz.drawSegment(eqX, -1.2, eqX, -0.9, viz.colors.yellow, 1.5, true);
                            viz.drawText('eq', eqX, -1.5, viz.colors.yellow, 11);

                            // Displacement arrow
                            if (Math.abs(x) > 0.05) {
                                viz.drawVector(eqX, 0.8, eqX + x, 0.8, viz.colors.orange, 'x = ' + x.toFixed(2) + ' m');
                            }

                            // Info
                            viz.screenText('T = ' + T.toFixed(2) + ' s    f = ' + (1 / T).toFixed(2) + ' Hz    omega = ' + omega.toFixed(2) + ' rad/s', viz.width / 2, 20, viz.colors.white, 13, 'center');
                            viz.screenText('Adjust amplitude and spring constant with the sliders', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A mass on a spring oscillates with a period of 0.80 s. What is the frequency and angular frequency of the oscillation?',
                    hint: 'Use f = 1/T and omega = 2 pi f.',
                    solution: 'f = 1/T = 1/0.80 = 1.25 Hz. omega = 2 pi f = 2 pi (1.25) = 7.85 rad/s.'
                },
                {
                    question: 'A block oscillates on a spring with amplitude 0.15 m and frequency 3.0 Hz. What is the maximum displacement from the equilibrium position?',
                    hint: 'The maximum displacement is the definition of amplitude.',
                    solution: 'The maximum displacement from equilibrium is the amplitude itself: 0.15 m.'
                },
                {
                    question: 'The restoring force on an oscillating object is F = -200x (in SI units). What is the spring constant? If the mass is 2.0 kg, what is the period of oscillation?',
                    hint: 'Comparing F = -kx tells you k. Then T = 2 pi sqrt(m/k).',
                    solution: 'From F = -kx, we get k = 200 N/m. T = 2 pi sqrt(m/k) = 2 pi sqrt(2.0/200) = 2 pi sqrt(0.01) = 2 pi (0.1) = 0.628 s.'
                },
                {
                    question: 'A vibrating tuning fork completes 440 oscillations per second. What is its frequency and period?',
                    hint: 'Frequency equals the number of oscillations per second.',
                    solution: 'f = 440 Hz (this is the A4 note). T = 1/f = 1/440 = 0.00227 s = 2.27 ms.'
                },
                {
                    question: 'Explain why the restoring force in SHM must have a negative sign: F = -kx. What would happen if F = +kx instead?',
                    hint: 'Think about the direction of the force relative to the displacement.',
                    solution: 'The negative sign means the force always points opposite to the displacement, pushing the object back toward equilibrium. If F = +kx, the force would push the object further away from equilibrium, leading to runaway motion rather than oscillation.'
                }
            ]
        },

        // ===== SECTION 2: SHM Equations =====
        {
            id: 'shm-equations',
            title: 'SHM Equations',
            content: `
                <h2>SHM Equations</h2>

                <p>Now that we understand what SHM is qualitatively, let us derive the mathematical equations that describe the position, velocity, and acceleration of an object in SHM.</p>

                <div class="env-block definition">
                    <div class="env-title">Position in SHM</div>
                    <div class="env-body"><p>The displacement of an object in SHM as a function of time is:</p>
                    <p>\\[ x(t) = A \\sin(\\omega t + \\varphi) \\]</p>
                    <p>where \\(A\\) is the amplitude, \\(\\omega = 2\\pi/T\\) is the angular frequency, and \\(\\varphi\\) is the initial phase (determined by the initial conditions).</p>
                    <p>Equivalently, one may write \\(x(t) = A\\cos(\\omega t + \\varphi')\\) with a different phase constant \\(\\varphi'\\).</p></div>
                </div>

                <p>The velocity is the time derivative of position:</p>
                <p>\\[ v(t) = \\frac{dx}{dt} = A\\omega \\cos(\\omega t + \\varphi) \\]</p>
                <p>The maximum speed is \\(v_{\\max} = A\\omega\\), occurring when the object passes through equilibrium (\\(x = 0\\)).</p>

                <p>The acceleration is the time derivative of velocity:</p>
                <p>\\[ a(t) = \\frac{dv}{dt} = -A\\omega^2 \\sin(\\omega t + \\varphi) = -\\omega^2 x \\]</p>
                <p>The maximum acceleration is \\(a_{\\max} = A\\omega^2\\), occurring at the extreme positions (\\(x = \\pm A\\)).</p>

                <div class="env-block theorem">
                    <div class="env-title">Phase Relationships in SHM</div>
                    <div class="env-body"><p>In simple harmonic motion:</p>
                    <ul>
                        <li>Velocity <strong>leads</strong> displacement by \\(\\pi/2\\) (90 degrees).</li>
                        <li>Acceleration <strong>leads</strong> velocity by \\(\\pi/2\\) (90 degrees), so it is \\(\\pi\\) (180 degrees) out of phase with displacement.</li>
                        <li>Acceleration is always opposite in direction to displacement: \\(a = -\\omega^2 x\\).</li>
                    </ul></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-shm-phase"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Finding Position, Velocity, and Acceleration</div>
                    <div class="env-body">
                        <p>A mass oscillates with \\(A = 0.20\\) m, \\(\\omega = 5.0\\) rad/s, and \\(\\varphi = 0\\). Find the position, velocity, and acceleration at \\(t = 0.10\\) s.</p>
                        <p>\\(x = 0.20 \\sin(5.0 \\times 0.10) = 0.20 \\sin(0.50) = 0.20 \\times 0.479 = 0.096\\) m</p>
                        <p>\\(v = 0.20 \\times 5.0 \\cos(0.50) = 1.0 \\times 0.878 = 0.878\\) m/s</p>
                        <p>\\(a = -0.20 \\times 25.0 \\sin(0.50) = -5.0 \\times 0.479 = -2.40\\) m/s\\(^2\\)</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Visualizing the Phase Diagram</div>
                    <div class="env-body"><p>Think of a point moving around a circle at constant speed. Its projection onto the horizontal axis traces out SHM. The velocity projection leads the position projection by 90 degrees, and the acceleration projection is 180 degrees behind position. This "reference circle" model is the key to understanding the phase relationships.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Students often confuse whether to use sine or cosine for \\(x(t)\\). The choice depends on the initial conditions. If the object starts at equilibrium (\\(x=0\\) at \\(t=0\\)), use sine. If it starts at maximum displacement (\\(x=A\\) at \\(t=0\\)), use cosine. Both are equally valid forms of SHM.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-shm-phase',
                    title: 'SHM Phase Diagram: x, v, a vs Time',
                    description: 'See how position, velocity, and acceleration relate in SHM with their phase offsets.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 40, originX: 80, originY: 200 });

                        var A = 2.0;
                        var omega = 2.0;
                        var phi = 0;

                        VizEngine.createSlider(controls, 'Amplitude A', 0.5, 3.0, A, 0.1, function(v) { A = v; draw(); });
                        VizEngine.createSlider(controls, 'omega', 1.0, 5.0, omega, 0.5, function(v) { omega = v; draw(); });
                        VizEngine.createSlider(controls, 'Phase phi', 0, 6.28, phi, 0.1, function(v) { phi = v; draw(); });

                        function draw() {
                            viz.clear();

                            // Custom axes
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            // horizontal axis
                            ctx.beginPath();
                            ctx.moveTo(60, viz.originY);
                            ctx.lineTo(viz.width - 10, viz.originY);
                            ctx.stroke();
                            // vertical axis
                            ctx.beginPath();
                            ctx.moveTo(80, 10);
                            ctx.lineTo(80, viz.height - 10);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('t (s)', viz.width - 10, viz.originY + 16);

                            var tMax = 14;
                            var xScale = (viz.width - 100) / tMax;
                            var yScale = 50;

                            // Normalize: plot x in blue, v/(A*omega) in teal, a/(A*omega^2) in orange
                            // so all fit in the same [-A, A] range visually

                            var steps = 400;
                            function plotCurve(func, color, label) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var t = (i / steps) * tMax;
                                    var val = func(t);
                                    var px = 80 + t * xScale;
                                    var py = viz.originY - val * yScale;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // x(t)
                            plotCurve(function(t) { return A * Math.sin(omega * t + phi); }, viz.colors.blue, 'x(t)');
                            // v(t) normalized
                            plotCurve(function(t) { return A * Math.cos(omega * t + phi); }, viz.colors.teal, 'v(t)');
                            // a(t) normalized
                            plotCurve(function(t) { return -A * Math.sin(omega * t + phi); }, viz.colors.orange, 'a(t)');

                            // Legend
                            viz.screenText('x(t) = A sin(wt + phi)', 200, 20, viz.colors.blue, 13, 'center');
                            viz.screenText('v(t) / omega  (normalized)', 400, 20, viz.colors.teal, 13, 'center');
                            viz.screenText('a(t) / omega^2  (normalized)', 600, 20, viz.colors.orange, 13, 'center');

                            // Scale labels
                            viz.screenText('+A', 60, viz.originY - A * yScale, viz.colors.text, 11, 'right');
                            viz.screenText('-A', 60, viz.originY + A * yScale, viz.colors.text, 11, 'right');

                            viz.screenText('Velocity leads position by 90 deg; acceleration is 180 deg out of phase with position', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'An object in SHM has amplitude 0.30 m and angular frequency 4.0 rad/s. What is its maximum speed and maximum acceleration?',
                    hint: 'v_max = A omega, a_max = A omega^2.',
                    solution: 'v_max = A omega = 0.30 * 4.0 = 1.2 m/s. a_max = A omega^2 = 0.30 * 16 = 4.8 m/s^2.'
                },
                {
                    question: 'A particle moves in SHM with x(t) = 0.05 sin(10t) in SI units. What are the amplitude, angular frequency, frequency, and period?',
                    hint: 'Compare x(t) = A sin(omega t + phi) to read off the parameters.',
                    solution: 'A = 0.05 m, omega = 10 rad/s, f = omega/(2 pi) = 10/(2 pi) = 1.59 Hz, T = 1/f = 0.628 s.'
                },
                {
                    question: 'At what position in SHM is the speed maximum? At what position is the acceleration maximum?',
                    hint: 'Think about where all the energy is kinetic vs. where the restoring force is greatest.',
                    solution: 'Speed is maximum at the equilibrium position (x = 0), where all energy is kinetic. Acceleration is maximum at the extreme positions (x = plus or minus A), where the restoring force is greatest.'
                },
                {
                    question: 'An object in SHM has x(t) = 0.10 cos(6.0t). Find the velocity and acceleration at t = pi/12 s.',
                    hint: 'v = dx/dt = -A omega sin(omega t). a = dv/dt = -A omega^2 cos(omega t).',
                    solution: 'v(t) = -0.10 * 6.0 * sin(6.0 * pi/12) = -0.60 sin(pi/2) = -0.60 m/s. a(t) = -0.10 * 36.0 * cos(pi/2) = -3.6 * 0 = 0 m/s^2. At this instant the object passes through equilibrium at maximum speed with zero acceleration.'
                },
                {
                    question: 'Show that x(t) = A sin(omega t + phi) satisfies the equation a = -omega^2 x.',
                    hint: 'Differentiate x(t) twice and compare with x(t) itself.',
                    solution: 'x = A sin(omega t + phi). v = dx/dt = A omega cos(omega t + phi). a = dv/dt = -A omega^2 sin(omega t + phi) = -omega^2 [A sin(omega t + phi)] = -omega^2 x. QED.'
                }
            ]
        },

        // ===== SECTION 3: Energy in SHM =====
        {
            id: 'energy-in-shm',
            title: 'Energy in SHM',
            content: `
                <h2>Energy in SHM</h2>

                <p>One of the most beautiful aspects of simple harmonic motion is the continuous interchange of kinetic energy and potential energy. The total mechanical energy remains constant throughout the motion (assuming no friction).</p>

                <div class="env-block definition">
                    <div class="env-title">Energy Expressions in SHM (Spring-Mass System)</div>
                    <div class="env-body">
                    <p>For a mass \\(m\\) on a spring with constant \\(k\\):</p>
                    <p><strong>Kinetic energy:</strong> \\[ KE = \\frac{1}{2}mv^2 = \\frac{1}{2}m\\omega^2 A^2 \\cos^2(\\omega t + \\varphi) \\]</p>
                    <p><strong>Potential energy:</strong> \\[ PE = \\frac{1}{2}kx^2 = \\frac{1}{2}kA^2 \\sin^2(\\omega t + \\varphi) \\]</p>
                    <p><strong>Total energy:</strong> \\[ E = KE + PE = \\frac{1}{2}kA^2 \\]</p>
                    <p>The total energy depends only on the amplitude and spring constant, not on time.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Energy Exchange</div>
                    <div class="env-body"><p>At the equilibrium position (\\(x = 0\\)): all energy is kinetic (\\(KE = E\\), \\(PE = 0\\)). At the extreme positions (\\(x = \\pm A\\)): all energy is potential (\\(PE = E\\), \\(KE = 0\\)). In between, energy continuously converts between the two forms, like a ball rolling between two hills.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-energy-shm"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Energy Calculation</div>
                    <div class="env-body">
                        <p>A 0.50 kg mass on a spring (\\(k = 200\\) N/m) oscillates with amplitude 0.10 m.</p>
                        <p>Total energy: \\(E = \\frac{1}{2}kA^2 = \\frac{1}{2}(200)(0.10)^2 = 1.0\\) J</p>
                        <p>At \\(x = 0.05\\) m: \\(PE = \\frac{1}{2}(200)(0.05)^2 = 0.25\\) J, so \\(KE = 1.0 - 0.25 = 0.75\\) J.</p>
                        <p>Speed at \\(x = 0.05\\) m: \\(v = \\sqrt{2 \\cdot KE / m} = \\sqrt{2(0.75)/0.50} = \\sqrt{3.0} = 1.73\\) m/s.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Speed at Any Position</div>
                    <div class="env-body"><p>Using energy conservation, the speed at any displacement \\(x\\) is:</p>
                    <p>\\[ v = \\omega\\sqrt{A^2 - x^2} \\]</p>
                    <p>This is equivalent to \\(v = \\sqrt{\\frac{k}{m}(A^2 - x^2)}\\).</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Students sometimes think the total energy changes during SHM. In ideal (undamped) SHM, the total mechanical energy \\(E = \\frac{1}{2}kA^2\\) is constant. Only the proportions of KE and PE change. If you double the amplitude, the total energy quadruples (since \\(E \\propto A^2\\)).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-energy-shm',
                    title: 'Energy Exchange in SHM',
                    description: 'Watch kinetic and potential energy trade back and forth while total energy stays constant.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 40, originX: 350, originY: 300 });

                        var A = 2.5;
                        var k = 4.0;
                        var running = true;

                        VizEngine.createSlider(controls, 'Amplitude A', 0.5, 3.5, A, 0.1, function(v) { A = v; });
                        VizEngine.createSlider(controls, 'Spring k', 1.0, 8.0, k, 0.5, function(v) { k = v; });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var pauseT = 0;
                        var lastTimestamp = null;
                        var elapsed = 0;

                        viz.animate(function(t) {
                            if (lastTimestamp === null) lastTimestamp = t;
                            if (running) {
                                elapsed += (t - lastTimestamp) / 1000;
                            }
                            lastTimestamp = t;

                            var omega = Math.sqrt(k);
                            var x = A * Math.cos(omega * elapsed);
                            var v = -A * omega * Math.sin(omega * elapsed);
                            var PE = 0.5 * k * x * x;
                            var KE = 0.5 * v * v;
                            var E = 0.5 * k * A * A;

                            viz.clear();

                            // Energy bar chart area (top half)
                            var barWidth = 80;
                            var barMaxH = 150;
                            var baseY = 260;
                            var ctx = viz.ctx;

                            // Total energy bar
                            var totalH = barMaxH;
                            var keH = (KE / E) * barMaxH;
                            var peH = (PE / E) * barMaxH;

                            // KE bar
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(200 - barWidth / 2, baseY - keH, barWidth, keH);
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.strokeRect(200 - barWidth / 2, baseY - keH, barWidth, keH);
                            viz.screenText('KE', 200, baseY + 18, viz.colors.blue, 13, 'center');
                            viz.screenText(KE.toFixed(2) + ' J', 200, baseY - keH - 12, viz.colors.blue, 11, 'center');

                            // PE bar
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(350 - barWidth / 2, baseY - peH, barWidth, peH);
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.strokeRect(350 - barWidth / 2, baseY - peH, barWidth, peH);
                            viz.screenText('PE', 350, baseY + 18, viz.colors.orange, 13, 'center');
                            viz.screenText(PE.toFixed(2) + ' J', 350, baseY - peH - 12, viz.colors.orange, 11, 'center');

                            // Total bar
                            ctx.fillStyle = viz.colors.green + '66';
                            ctx.fillRect(500 - barWidth / 2, baseY - totalH, barWidth, totalH);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(500 - barWidth / 2, baseY - totalH, barWidth, totalH);
                            viz.screenText('Total', 500, baseY + 18, viz.colors.green, 13, 'center');
                            viz.screenText(E.toFixed(2) + ' J', 500, baseY - totalH - 12, viz.colors.green, 11, 'center');

                            // Baseline
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(140, baseY);
                            ctx.lineTo(560, baseY);
                            ctx.stroke();

                            // Position indicator (small spring-mass at top)
                            var topY = 55;
                            var posScreenX = 350 + x * 40;
                            // spring
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            var springStartX = 100;
                            var coils = 10;
                            var segL = (posScreenX - 15 - springStartX) / (coils * 2 + 2);
                            ctx.beginPath();
                            ctx.moveTo(springStartX, topY);
                            var scx = springStartX + segL;
                            ctx.lineTo(scx, topY);
                            for (var i = 0; i < coils * 2; i++) {
                                var sign = (i % 2 === 0) ? 1 : -1;
                                scx += segL;
                                ctx.lineTo(scx, topY + sign * 8);
                            }
                            scx += segL;
                            ctx.lineTo(scx, topY);
                            ctx.stroke();

                            // mass block
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(posScreenX - 15, topY - 15, 30, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('m', posScreenX, topY);

                            // wall
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(springStartX, topY - 25);
                            ctx.lineTo(springStartX, topY + 25);
                            ctx.stroke();

                            // equilibrium dashed line
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(350, topY - 25);
                            ctx.lineTo(350, topY + 25);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('eq', 350, topY + 35, viz.colors.yellow, 10, 'center');

                            viz.screenText('x = ' + x.toFixed(2) + ' m', posScreenX, topY - 28, viz.colors.white, 11, 'center');
                            viz.screenText('KE + PE = constant (energy conservation in SHM)', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A spring with k = 100 N/m is stretched 0.20 m from equilibrium. What is the total energy of the system?',
                    hint: 'E = (1/2) k A^2.',
                    solution: 'E = (1/2)(100)(0.20)^2 = (1/2)(100)(0.04) = 2.0 J.'
                },
                {
                    question: 'In the previous problem, what is the speed of the 0.50 kg mass as it passes through equilibrium?',
                    hint: 'At equilibrium, all energy is kinetic: E = (1/2)mv^2.',
                    solution: 'At x = 0, KE = E = 2.0 J. v = sqrt(2E/m) = sqrt(2(2.0)/0.50) = sqrt(8.0) = 2.83 m/s.'
                },
                {
                    question: 'A 2.0 kg mass oscillates on a spring with amplitude 0.15 m and period 1.0 s. Find the total energy.',
                    hint: 'First find omega = 2 pi / T, then k = m omega^2, then E = (1/2) k A^2.',
                    solution: 'omega = 2 pi / 1.0 = 6.28 rad/s. k = m omega^2 = 2.0 * 39.5 = 79.0 N/m. E = (1/2)(79.0)(0.15)^2 = (1/2)(79.0)(0.0225) = 0.889 J.'
                },
                {
                    question: 'At what displacement (as a fraction of A) is the kinetic energy equal to the potential energy?',
                    hint: 'Set KE = PE and use E = KE + PE = (1/2)kA^2.',
                    solution: 'If KE = PE, then each equals E/2. PE = (1/2)kx^2 = (1/4)kA^2. So x^2 = A^2/2, giving x = A/sqrt(2) = 0.707A. At about 70.7% of the amplitude, KE = PE.'
                },
                {
                    question: 'If the amplitude of SHM is doubled, by what factor does the total energy change? By what factor does the maximum speed change?',
                    hint: 'E = (1/2)kA^2 and v_max = A omega.',
                    solution: 'E is proportional to A^2, so doubling A quadruples the energy (factor of 4). v_max = A omega, so doubling A doubles v_max (factor of 2).'
                }
            ]
        },

        // ===== SECTION 4: Pendulums =====
        {
            id: 'pendulums',
            title: 'Pendulums',
            content: `
                <h2>Pendulums</h2>

                <p>The pendulum is one of the most familiar examples of oscillatory motion. From grandfather clocks to playground swings, pendulums have fascinated scientists for centuries. Galileo reportedly discovered the regularity of pendulum motion by timing a swinging chandelier with his pulse.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Simple Pendulum</div>
                    <div class="env-body"><p>A <strong>simple pendulum</strong> consists of a point mass (called the bob) suspended by a massless, inextensible string of length \\(L\\) from a fixed pivot. When displaced from its vertical equilibrium and released, it swings back and forth.</p></div>
                </div>

                <p>For small angular displacements (\\(\\theta \\ll 1\\) radian, roughly less than about 15 degrees), the restoring torque is approximately proportional to the angle, making the motion approximately SHM.</p>

                <div class="env-block theorem">
                    <div class="env-title">Period of a Simple Pendulum (Small Angle)</div>
                    <div class="env-body"><p>For small oscillations, the period of a simple pendulum is:</p>
                    <p>\\[ T = 2\\pi \\sqrt{\\frac{L}{g}} \\]</p>
                    <p>where \\(L\\) is the length of the string and \\(g\\) is the acceleration due to gravity. Remarkably, the period does <strong>not</strong> depend on the mass of the bob or on the amplitude (for small angles).</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Mass Does Not Matter</div>
                    <div class="env-body"><p>A heavier bob has more inertia (harder to accelerate), but it also experiences a stronger gravitational restoring force. These two effects cancel exactly, so all pendulums of the same length swing with the same period, regardless of mass.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-pendulum-sim"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Pendulum Clock</div>
                    <div class="env-body">
                        <p>What length of pendulum gives a period of exactly 1.0 s?</p>
                        <p>\\(T = 2\\pi\\sqrt{L/g}\\). Solving for \\(L\\):</p>
                        <p>\\(L = \\frac{gT^2}{4\\pi^2} = \\frac{9.80 \\times 1.0^2}{4\\pi^2} = \\frac{9.80}{39.48} = 0.248\\) m \\(\\approx 25\\) cm.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Beyond Small Angles</div>
                    <div class="env-body"><p>For large angles, the period increases and depends on amplitude. The exact solution involves elliptic integrals. For practical purposes, the small-angle formula is accurate to within 1% for angles up to about 23 degrees.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-pendulum-sim',
                    title: 'Pendulum Simulator',
                    description: 'Adjust the length and initial angle to see how the pendulum swings. Watch how the period changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 120, originX: 350, originY: 60 });

                        var L = 2.0;
                        var theta0 = 0.5;
                        var g = 9.8;
                        var running = true;

                        VizEngine.createSlider(controls, 'Length L (m)', 0.5, 3.0, L, 0.1, function(v) { L = v; });
                        VizEngine.createSlider(controls, 'Initial angle (deg)', 5, 45, Math.round(theta0 * 180 / Math.PI), 1, function(v) { theta0 = v * Math.PI / 180; });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var elapsed = 0;
                        var lastT = null;

                        viz.animate(function(t) {
                            if (lastT === null) lastT = t;
                            if (running) elapsed += (t - lastT) / 1000;
                            lastT = t;

                            var omega = Math.sqrt(g / L);
                            var T = 2 * Math.PI / omega;
                            var theta = theta0 * Math.cos(omega * elapsed);

                            var pivotX = 0;
                            var pivotY = 0;
                            var bobX = pivotX + L * Math.sin(theta);
                            var bobY = pivotY - L * Math.cos(theta);

                            viz.clear();

                            // Pivot
                            var ps = viz.toScreen(pivotX, pivotY);
                            viz.ctx.fillStyle = viz.colors.text;
                            viz.ctx.beginPath();
                            viz.ctx.arc(ps[0], ps[1], 5, 0, Math.PI * 2);
                            viz.ctx.fill();

                            // String
                            viz.drawSegment(pivotX, pivotY, bobX, bobY, viz.colors.white, 2);

                            // Vertical dashed line
                            viz.drawSegment(pivotX, pivotY, pivotX, pivotY - L, viz.colors.text, 1, true);

                            // Angle arc
                            if (Math.abs(theta) > 0.01) {
                                var angStart = -Math.PI / 2 - Math.abs(theta);
                                var angEnd = -Math.PI / 2 + Math.abs(theta);
                                viz.drawAngle(pivotX, pivotY, Math.min(-Math.PI / 2, -Math.PI / 2 + theta), Math.max(-Math.PI / 2, -Math.PI / 2 + theta), 0.3, viz.colors.yellow, (Math.abs(theta) * 180 / Math.PI).toFixed(1) + ' deg');
                            }

                            // Bob
                            var bs = viz.toScreen(bobX, bobY);
                            viz.ctx.fillStyle = viz.colors.blue;
                            viz.ctx.beginPath();
                            viz.ctx.arc(bs[0], bs[1], 18, 0, Math.PI * 2);
                            viz.ctx.fill();
                            viz.ctx.fillStyle = viz.colors.white;
                            viz.ctx.font = 'bold 11px -apple-system,sans-serif';
                            viz.ctx.textAlign = 'center';
                            viz.ctx.textBaseline = 'middle';
                            viz.ctx.fillText('m', bs[0], bs[1]);

                            // Length label
                            var midX = (pivotX + bobX) / 2;
                            var midY = (pivotY + bobY) / 2;
                            viz.drawText('L = ' + L.toFixed(1) + ' m', midX + 0.3, midY, viz.colors.teal, 12, 'left');

                            // Info
                            viz.screenText('T = 2 pi sqrt(L/g) = ' + T.toFixed(3) + ' s', viz.width / 2, viz.height - 40, viz.colors.white, 13, 'center');
                            viz.screenText('f = ' + (1 / T).toFixed(3) + ' Hz', viz.width / 2, viz.height - 22, viz.colors.teal, 12, 'center');
                            viz.screenText('Small-angle approximation: period is independent of mass and amplitude', viz.width / 2, viz.height - 6, viz.colors.text, 10, 'center');
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A simple pendulum has a length of 1.0 m. What is its period on Earth (g = 9.8 m/s^2)?',
                    hint: 'T = 2 pi sqrt(L/g).',
                    solution: 'T = 2 pi sqrt(1.0/9.8) = 2 pi sqrt(0.102) = 2 pi (0.3194) = 2.007 s, approximately 2.0 s.'
                },
                {
                    question: 'If you take the same 1.0 m pendulum to the Moon where g = 1.6 m/s^2, what is its new period?',
                    hint: 'Use the same formula with the new g value.',
                    solution: 'T = 2 pi sqrt(1.0/1.6) = 2 pi sqrt(0.625) = 2 pi (0.7906) = 4.97 s. The pendulum swings much more slowly on the Moon.'
                },
                {
                    question: 'A pendulum clock runs too slow (the period is too long). Should you make the pendulum shorter or longer to fix it?',
                    hint: 'T = 2 pi sqrt(L/g). How does T depend on L?',
                    solution: 'Since T is proportional to sqrt(L), making L shorter will decrease T, making the clock tick faster. You should shorten the pendulum.'
                },
                {
                    question: 'A student doubles both the mass and the length of a simple pendulum. By what factor does the period change?',
                    hint: 'Does mass appear in the period formula?',
                    solution: 'The period T = 2 pi sqrt(L/g) does not depend on mass. Doubling L gives T_new = 2 pi sqrt(2L/g) = sqrt(2) * T_original. The period increases by a factor of sqrt(2), or about 1.41.'
                },
                {
                    question: 'A pendulum completes 30 oscillations in 60 seconds. What is its length?',
                    hint: 'First find the period, then solve T = 2 pi sqrt(L/g) for L.',
                    solution: 'T = 60/30 = 2.0 s. L = gT^2/(4 pi^2) = 9.8 * 4.0 / 39.48 = 39.2 / 39.48 = 0.993 m, approximately 1.0 m.'
                }
            ]
        },

        // ===== SECTION 5: Damped and Forced Oscillations =====
        {
            id: 'damped-forced',
            title: 'Damped and Forced Oscillations',
            content: `
                <h2>Damped and Forced Oscillations</h2>

                <p>In the real world, no oscillation goes on forever. Friction, air resistance, and other dissipative forces gradually reduce the amplitude of oscillation. This is called <strong>damping</strong>. On the other hand, we can sustain oscillations by applying a periodic external force, which leads to <strong>forced oscillations</strong> and the remarkable phenomenon of <strong>resonance</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Damped Oscillation</div>
                    <div class="env-body"><p>A <strong>damped oscillation</strong> is one in which the amplitude decreases over time due to energy dissipation (e.g., friction or air resistance). The displacement can be modeled as:</p>
                    <p>\\[ x(t) = A_0 e^{-\\gamma t} \\sin(\\omega' t + \\varphi) \\]</p>
                    <p>where \\(\\gamma\\) is the damping constant and \\(\\omega' = \\sqrt{\\omega_0^2 - \\gamma^2}\\) is the damped angular frequency (slightly less than the natural frequency \\(\\omega_0\\)).</p></div>
                </div>

                <p>There are three regimes of damping:</p>
                <ul>
                    <li><strong>Underdamped</strong> (\\(\\gamma < \\omega_0\\)): the system oscillates with decreasing amplitude.</li>
                    <li><strong>Critically damped</strong> (\\(\\gamma = \\omega_0\\)): the system returns to equilibrium as fast as possible without oscillating.</li>
                    <li><strong>Overdamped</strong> (\\(\\gamma > \\omega_0\\)): the system returns to equilibrium slowly without oscillating.</li>
                </ul>

                <div class="env-block definition">
                    <div class="env-title">Definition: Forced Oscillation and Resonance</div>
                    <div class="env-body"><p>When a periodic driving force with frequency \\(\\omega_d\\) is applied to an oscillator with natural frequency \\(\\omega_0\\), the system eventually oscillates at the driving frequency \\(\\omega_d\\).</p>
                    <p><strong>Resonance</strong> occurs when \\(\\omega_d \\approx \\omega_0\\). At resonance, the amplitude of oscillation reaches a maximum, limited only by damping. With very little damping, the amplitude at resonance can be extremely large.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-damped-osc"></div>

                <div class="viz-placeholder" data-viz="viz-resonance-curve"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Resonance in Everyday Life</div>
                    <div class="env-body">
                        <p>Pushing a child on a swing is a perfect example of resonance. If you push at the natural frequency of the swing (once per period), small pushes accumulate and the amplitude grows large. Pushing at a random frequency makes the swing motion erratic and small.</p>
                        <p>Dangerous resonance: the Tacoma Narrows Bridge (1940) collapsed when wind-driven oscillations matched the bridge's natural frequency, causing catastrophic amplitude growth.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Resonance Can Be Destructive</div>
                    <div class="env-body"><p>Engineers must carefully account for resonance when designing bridges, buildings, aircraft wings, and machinery. Soldiers break step when crossing bridges to avoid resonance. Wine glasses can shatter when exposed to sound at their natural frequency.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Quality Factor</div>
                    <div class="env-body"><p>The <strong>quality factor</strong> \\(Q = \\omega_0 / (2\\gamma)\\) measures how "sharp" the resonance peak is. A high-Q oscillator (low damping) has a tall, narrow resonance peak, meaning it responds strongly only near its natural frequency. A low-Q oscillator (high damping) has a broad, low peak.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-damped-osc',
                    title: 'Damped Oscillation',
                    description: 'See how damping reduces the amplitude over time. Adjust the damping to see underdamped, critically damped, and overdamped behavior.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 80, originY: 175 });

                        var gamma = 0.3;
                        var omega0 = 3.0;
                        var A0 = 2.5;

                        VizEngine.createSlider(controls, 'Damping gamma', 0, 5.0, gamma, 0.1, function(v) { gamma = v; draw(); });
                        VizEngine.createSlider(controls, 'Natural freq omega_0', 1.0, 6.0, omega0, 0.5, function(v) { omega0 = v; draw(); });

                        function draw() {
                            viz.clear();

                            var ctx = viz.ctx;
                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(60, viz.originY); ctx.lineTo(viz.width - 10, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 10); ctx.lineTo(80, viz.height - 10); ctx.stroke();
                            viz.screenText('t', viz.width - 15, viz.originY + 14, viz.colors.text, 12, 'center');
                            viz.screenText('x', 70, 15, viz.colors.text, 12, 'center');

                            var tMax = 12;
                            var xScale = (viz.width - 100) / tMax;
                            var yScale = 50;
                            var steps = 500;

                            var regime = '';
                            if (gamma < omega0) regime = 'Underdamped';
                            else if (Math.abs(gamma - omega0) < 0.15) regime = 'Critically damped';
                            else regime = 'Overdamped';

                            // Envelope
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i <= steps; i++) {
                                var t = (i / steps) * tMax;
                                var env = A0 * Math.exp(-gamma * t);
                                var px = 80 + t * xScale;
                                var py = viz.originY - env * yScale;
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();
                            ctx.beginPath();
                            for (var i = 0; i <= steps; i++) {
                                var t = (i / steps) * tMax;
                                var env = -A0 * Math.exp(-gamma * t);
                                var px = 80 + t * xScale;
                                var py = viz.originY - env * yScale;
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Main curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= steps; i++) {
                                var t = (i / steps) * tMax;
                                var val;
                                if (gamma < omega0) {
                                    var omegaP = Math.sqrt(omega0 * omega0 - gamma * gamma);
                                    val = A0 * Math.exp(-gamma * t) * Math.cos(omegaP * t);
                                } else if (gamma > omega0 + 0.15) {
                                    var r1 = -gamma + Math.sqrt(gamma * gamma - omega0 * omega0);
                                    var r2 = -gamma - Math.sqrt(gamma * gamma - omega0 * omega0);
                                    val = A0 * 0.5 * (Math.exp(r1 * t) + Math.exp(r2 * t));
                                } else {
                                    val = A0 * (1 + gamma * t) * Math.exp(-gamma * t);
                                }
                                var px = 80 + t * xScale;
                                var py = viz.originY - val * yScale;
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            viz.screenText('Regime: ' + regime + '   (gamma = ' + gamma.toFixed(1) + ', omega_0 = ' + omega0.toFixed(1) + ')', viz.width / 2, 20, viz.colors.white, 13, 'center');
                            viz.screenText('Dashed lines show the exponential envelope', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        }

                        draw();
                    }
                },
                {
                    id: 'viz-resonance-curve',
                    title: 'Resonance Curve',
                    description: 'See how the steady-state amplitude depends on driving frequency. Adjust damping to see how the resonance peak changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 80, originY: 300 });

                        var omega0 = 5.0;
                        var gamma = 0.3;
                        var F0 = 1.0;

                        VizEngine.createSlider(controls, 'Damping gamma', 0.1, 3.0, gamma, 0.1, function(v) { gamma = v; draw(); });
                        VizEngine.createSlider(controls, 'Natural freq omega_0', 2.0, 8.0, omega0, 0.5, function(v) { omega0 = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(60, viz.originY); ctx.lineTo(viz.width - 10, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 10); ctx.lineTo(80, viz.height - 10); ctx.stroke();
                            viz.screenText('Driving frequency omega_d', viz.width / 2, viz.originY + 18, viz.colors.text, 12, 'center');
                            viz.screenText('Amplitude', 45, viz.height / 2 - 30, viz.colors.text, 12, 'center');

                            var wMax = 12;
                            var wScale = (viz.width - 100) / wMax;
                            var steps = 400;

                            // Find max amplitude for scaling
                            var ampMax = F0 / (2 * gamma * Math.sqrt(omega0 * omega0 - gamma * gamma));
                            if (!isFinite(ampMax) || ampMax <= 0) ampMax = F0 / (2 * gamma * gamma);
                            var yScale = 230 / ampMax;

                            // Resonance curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= steps; i++) {
                                var wd = 0.01 + (i / steps) * wMax;
                                var denom = Math.sqrt(Math.pow(omega0 * omega0 - wd * wd, 2) + Math.pow(2 * gamma * wd, 2));
                                var amp = F0 / denom;
                                var px = 80 + wd * wScale;
                                var py = viz.originY - amp * yScale;
                                if (py < 10) py = 10;
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Mark natural frequency
                            var natX = 80 + omega0 * wScale;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(natX, viz.originY);
                            ctx.lineTo(natX, 20);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('omega_0', natX, viz.originY + 32, viz.colors.yellow, 11, 'center');

                            viz.screenText('Resonance curve: amplitude vs driving frequency', viz.width / 2, 15, viz.colors.white, 13, 'center');
                            viz.screenText('Lower damping = taller, sharper peak. Peak near omega_0.', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A damped oscillator has its amplitude reduced to half the initial value after 10 oscillations. Is this underdamped, critically damped, or overdamped?',
                    hint: 'If the system still oscillates, it must be in one particular regime.',
                    solution: 'Since the system still oscillates (it completed 10 oscillations), it is underdamped. In critically damped or overdamped cases, the system does not oscillate at all.'
                },
                {
                    question: 'A car suspension system is designed to be critically damped. Why is critical damping preferred over underdamping or overdamping for this application?',
                    hint: 'Think about what happens to the car after hitting a bump.',
                    solution: 'Critical damping returns the system to equilibrium in the shortest time without oscillation. Underdamping would cause the car to bounce up and down (uncomfortable). Overdamping would make the suspension respond too slowly, so the car would not recover quickly from a bump.'
                },
                {
                    question: 'A child on a swing has a natural period of 3.0 s. At what frequency should you push to achieve resonance?',
                    hint: 'Resonance occurs when the driving frequency equals the natural frequency.',
                    solution: 'The natural frequency is f_0 = 1/T = 1/3.0 = 0.333 Hz. Resonance occurs when you push at f_d = f_0 = 0.333 Hz, meaning once every 3.0 seconds (at the natural period).'
                },
                {
                    question: 'Two oscillators have the same natural frequency omega_0 but different damping: gamma_1 = 0.1 and gamma_2 = 2.0. Which one has a higher Q factor? Which has a sharper resonance peak?',
                    hint: 'Q = omega_0 / (2 gamma). Higher Q means sharper resonance.',
                    solution: 'Q_1 = omega_0 / (2 * 0.1) = 5 omega_0. Q_2 = omega_0 / (2 * 2.0) = 0.25 omega_0. Oscillator 1 has the higher Q factor and therefore a sharper (taller, narrower) resonance peak.'
                },
                {
                    question: 'Explain in your own words why resonance can be dangerous for bridges and buildings.',
                    hint: 'Think about what happens to the amplitude when the driving frequency matches the natural frequency with low damping.',
                    solution: 'At resonance, even a small periodic force can cause the amplitude to grow very large if damping is low. For a bridge or building, this means vibrations can become enormous, potentially exceeding the structural limits and causing collapse. This is why engineers must ensure that the natural frequencies of structures do not coincide with common excitation frequencies (wind, traffic, earthquakes).'
                }
            ]
        }
    ]
});
