window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Uniformly Accelerated Motion',
    subtitle: 'Constant Acceleration in One Dimension',
    sections: [
        // ============================================================
        // Section 1: Equations of Motion
        // ============================================================
        {
            id: 'equations-of-motion',
            title: 'Equations of Motion',
            content: `
                <h2>Equations of Motion</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Graphs to Equations</div>
                    <div class="env-body"><p>In the previous chapter we learned to describe motion with graphs. Now we distill that knowledge into a set of algebraic equations that let us <em>predict</em> where an object will be and how fast it will move at any future time, provided the acceleration is constant.</p></div>
                </div>

                <p>When an object moves with <strong>constant (uniform) acceleration</strong> \\(a\\), three equations connect the five kinematic variables \\(x_0\\), \\(x\\), \\(v_0\\), \\(v\\), \\(a\\), and \\(t\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">The Three Kinematic Equations (Constant \\(a\\))</div>
                    <div class="env-body">
                        <p><strong>Equation 1</strong> (velocity-time):</p>
                        <p>\\[v = v_0 + at\\]</p>
                        <p><strong>Equation 2</strong> (position-time):</p>
                        <p>\\[x = x_0 + v_0 t + \\tfrac{1}{2}at^2\\]</p>
                        <p><strong>Equation 3</strong> (velocity-position, time-free):</p>
                        <p>\\[v^2 = v_0^2 + 2a(x - x_0)\\]</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Derivation Sketch</div>
                    <div class="env-body">
                        <p>Equation 1 follows directly from the definition of constant acceleration: \\(a = \\frac{v - v_0}{t}\\).</p>
                        <p>Equation 2 uses the fact that displacement equals the area under the v-t graph (a trapezoid): \\(\\Delta x = \\frac{v_0 + v}{2}\\,t\\), then substitute Eq. 1.</p>
                        <p>Equation 3 is obtained by eliminating \\(t\\) between Equations 1 and 2.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-kinematic-explorer"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A car starts from rest (\\(v_0 = 0\\)) and accelerates at \\(a = 3\\,\\text{m/s}^2\\). How far does it travel in 4 s?</p>
                        <p>Using Equation 2 with \\(x_0 = 0\\):</p>
                        <p>\\[x = 0 + 0(4) + \\tfrac{1}{2}(3)(4)^2 = 24\\,\\text{m}\\]</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Choosing the Right Equation</div>
                    <div class="env-body">
                        <p>Each equation involves four of the five variables (\\(v_0, v, a, t, \\Delta x\\)). Identify which variable is <em>not given and not asked for</em>, then pick the equation that omits it:</p>
                        <ul>
                            <li>Missing \\(\\Delta x\\)? Use Eq. 1.</li>
                            <li>Missing \\(v\\)? Use Eq. 2.</li>
                            <li>Missing \\(t\\)? Use Eq. 3.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Important</div>
                    <div class="env-body"><p>These equations are valid <strong>only</strong> when the acceleration is constant throughout the motion. If \\(a\\) changes, you must break the problem into intervals of constant acceleration or use calculus.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-kinematic-explorer',
                    title: 'Kinematic Equation Explorer',
                    description: 'Set initial velocity and acceleration, then watch the position and velocity evolve. The equations are evaluated in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });

                        var v0 = 2;
                        var accel = 1;
                        var maxT = 6;

                        VizEngine.createSlider(controls, 'v0 (m/s)', -5, 10, 2, 0.5, function(v) { v0 = v; });
                        VizEngine.createSlider(controls, 'a (m/s^2)', -4, 4, 1, 0.5, function(v) { accel = v; });

                        var tCurrent = 0;
                        var lastTS = null;

                        viz.animate(function(timestamp) {
                            if (!lastTS) lastTS = timestamp;
                            var dt = (timestamp - lastTS) / 1000;
                            lastTS = timestamp;
                            tCurrent += dt * 0.4;
                            if (tCurrent > maxT) tCurrent = 0;

                            var v = v0 + accel * tCurrent;
                            var x = v0 * tCurrent + 0.5 * accel * tCurrent * tCurrent;

                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // --- Equations panel (left) ---
                            var panelW = 240;
                            ctx.fillStyle = '#0e0e2a';
                            ctx.fillRect(0, 0, panelW, H);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW, 0); ctx.lineTo(panelW, H); ctx.stroke();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Kinematic Equations', 12, 24);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('v = v\u2080 + at', 16, 54);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('  = ' + v0.toFixed(1) + ' + (' + accel.toFixed(1) + ')(' + tCurrent.toFixed(2) + ')', 16, 72);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('  = ' + v.toFixed(2) + ' m/s', 16, 90);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('x = v\u2080t + \u00BDat\u00B2', 16, 124);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('  = ' + v0.toFixed(1) + '(' + tCurrent.toFixed(2) + ') + \u00BD(' + accel.toFixed(1) + ')(' + tCurrent.toFixed(2) + ')\u00B2', 16, 142);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('  = ' + x.toFixed(2) + ' m', 16, 160);

                            var vSq = v * v;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('v\u00B2 = v\u2080\u00B2 + 2a\u0394x', 16, 194);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('  = ' + (v0 * v0).toFixed(1) + ' + 2(' + accel.toFixed(1) + ')(' + x.toFixed(2) + ')', 16, 212);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('  = ' + vSq.toFixed(2) + ' m\u00B2/s\u00B2', 16, 230);

                            // Variables
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('Current Values:', 16, 270);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('t  = ' + tCurrent.toFixed(2) + ' s', 16, 290);
                            ctx.fillText('v\u2080 = ' + v0.toFixed(1) + ' m/s', 16, 308);
                            ctx.fillText('a  = ' + accel.toFixed(1) + ' m/s\u00B2', 16, 326);
                            ctx.fillText('v  = ' + v.toFixed(2) + ' m/s', 16, 344);
                            ctx.fillText('x  = ' + x.toFixed(2) + ' m', 16, 362);

                            // --- Graphs (right side) ---
                            var graphLeft = panelW + 20;
                            var graphW = W - graphLeft - 20;
                            var graphH = (H - 60) / 2;

                            // Compute ranges
                            var xVals = [], vVals = [];
                            for (var i = 0; i <= 60; i++) {
                                var tt = (i / 60) * maxT;
                                xVals.push(v0 * tt + 0.5 * accel * tt * tt);
                                vVals.push(v0 + accel * tt);
                            }
                            var xMin = Math.min.apply(null, xVals);
                            var xMax = Math.max.apply(null, xVals);
                            var vMin = Math.min.apply(null, vVals);
                            var vMax = Math.max.apply(null, vVals);
                            // Add padding
                            var xPad = Math.max((xMax - xMin) * 0.1, 1);
                            var vPad = Math.max((vMax - vMin) * 0.1, 1);
                            xMin -= xPad; xMax += xPad;
                            vMin -= vPad; vMax += vPad;

                            function plotGraph(gx, gy, gw, gh, label, yLabel, color, vals, ymin, ymax, curVal) {
                                ctx.fillStyle = '#0f0f28';
                                ctx.fillRect(gx, gy, gw, gh);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(gx, gy, gw, gh);

                                // zero line
                                if (ymin < 0 && ymax > 0) {
                                    var zy = gy + gh - (0 - ymin) / (ymax - ymin) * gh;
                                    ctx.strokeStyle = viz.colors.axis + '88';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(gx, zy); ctx.lineTo(gx + gw, zy); ctx.stroke();
                                }

                                // label
                                ctx.fillStyle = color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(label, gx + 6, gy + 16);

                                // y-axis labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(ymax.toFixed(1), gx - 3, gy + 10);
                                ctx.fillText(ymin.toFixed(1), gx - 3, gy + gh);

                                // t-axis
                                ctx.textAlign = 'center';
                                ctx.fillText('t(s)', gx + gw - 10, gy + gh + 14);
                                ctx.fillText('0', gx, gy + gh + 12);
                                ctx.fillText(maxT.toFixed(0), gx + gw, gy + gh + 12);

                                // Plot
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i < vals.length; i++) {
                                    var px = gx + (i / (vals.length - 1)) * gw;
                                    var py = gy + gh - (vals[i] - ymin) / (ymax - ymin) * gh;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Current marker
                                var cx = gx + (tCurrent / maxT) * gw;
                                var cy = gy + gh - (curVal - ymin) / (ymax - ymin) * gh;
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(curVal.toFixed(1), cx + 6, cy - 6);
                            }

                            plotGraph(graphLeft, 20, graphW, graphH, 'x-t (Position)', 'x', viz.colors.blue, xVals, xMin, xMax, x);
                            plotGraph(graphLeft, 30 + graphH, graphW, graphH, 'v-t (Velocity)', 'v', viz.colors.red, vVals, vMin, vMax, v);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A motorcycle accelerates uniformly from rest at \\(2.5\\,\\text{m/s}^2\\). How fast is it going after 6 s?',
                    hint: 'Use Equation 1: \\(v = v_0 + at\\).',
                    solution: '\\(v = 0 + 2.5 \\times 6 = 15\\,\\text{m/s}\\).'
                },
                {
                    question: 'A train moving at 30 m/s begins to brake with a constant deceleration of \\(2\\,\\text{m/s}^2\\). How far does it travel before stopping?',
                    hint: 'Use Equation 3 with \\(v = 0\\). Remember \\(a\\) is negative (opposing motion).',
                    solution: '\\(0 = 30^2 + 2(-2)(\\Delta x)\\). Solving: \\(\\Delta x = \\frac{900}{4} = 225\\,\\text{m}\\).'
                },
                {
                    question: 'A stone is thrown upward with \\(v_0 = 20\\,\\text{m/s}\\). Taking \\(a = -10\\,\\text{m/s}^2\\), find the time to reach the highest point.',
                    hint: 'At the highest point, \\(v = 0\\). Use Equation 1.',
                    solution: '\\(0 = 20 + (-10)t \\implies t = 2\\,\\text{s}\\).'
                },
                {
                    question: 'An object starts at \\(x_0 = 5\\,\\text{m}\\) with \\(v_0 = 3\\,\\text{m/s}\\) and \\(a = 4\\,\\text{m/s}^2\\). Find its position at \\(t = 2\\,\\text{s}\\).',
                    hint: 'Use Equation 2 directly.',
                    solution: '\\(x = 5 + 3(2) + \\frac{1}{2}(4)(2)^2 = 5 + 6 + 8 = 19\\,\\text{m}\\).'
                },
                {
                    question: 'A car accelerates from 10 m/s to 30 m/s over a distance of 200 m. What is the acceleration?',
                    hint: 'Use Equation 3 and solve for \\(a\\).',
                    solution: '\\(30^2 = 10^2 + 2a(200) \\implies 900 = 100 + 400a \\implies a = \\frac{800}{400} = 2\\,\\text{m/s}^2\\).'
                }
            ]
        },

        // ============================================================
        // Section 2: Free Fall
        // ============================================================
        {
            id: 'free-fall',
            title: 'Free Fall',
            content: `
                <h2>Free Fall</h2>

                <p>One of the most important examples of uniformly accelerated motion happens right above your head: objects falling under gravity.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Free Fall)</div>
                    <div class="env-body"><p><strong>Free fall</strong> is the motion of an object under the influence of gravity alone, with no air resistance. Near the surface of the Earth, all objects in free fall have the same constant downward acceleration:</p>
                    <p>\\[g \\approx 9.8\\,\\text{m/s}^2\\]</p>
                    <p>We often round this to \\(g = 10\\,\\text{m/s}^2\\) for quick estimates.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Galileo's Insight</div>
                    <div class="env-body"><p>Before Galileo, people believed heavier objects fall faster. Galileo demonstrated (by experiment and reasoning) that in the absence of air resistance, all objects fall at the same rate regardless of their mass. A feather and a hammer dropped in a vacuum hit the ground at the same time. Apollo 15 astronaut David Scott famously demonstrated this on the Moon in 1971.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-free-fall"></div>

                <p>When we take <strong>upward as positive</strong>, the acceleration due to gravity is \\(a = -g = -9.8\\,\\text{m/s}^2\\). The kinematic equations become:</p>

                <div class="env-block theorem">
                    <div class="env-title">Free-Fall Equations (upward positive)</div>
                    <div class="env-body">
                        <p>\\[v = v_0 - gt\\]</p>
                        <p>\\[y = y_0 + v_0 t - \\tfrac{1}{2}gt^2\\]</p>
                        <p>\\[v^2 = v_0^2 - 2g(y - y_0)\\]</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Dropping a Ball</div>
                    <div class="env-body">
                        <p>A ball is dropped from rest from a height of 20 m. How long does it take to hit the ground? (Use \\(g = 10\\,\\text{m/s}^2\\).)</p>
                        <p>Taking downward as positive for convenience: \\(20 = 0 + \\frac{1}{2}(10)t^2 \\implies t^2 = 4 \\implies t = 2\\,\\text{s}\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Throwing Up</div>
                    <div class="env-body">
                        <p>A ball is thrown straight up at 15 m/s. What maximum height does it reach? (Use \\(g = 10\\,\\text{m/s}^2\\).)</p>
                        <p>At the top, \\(v = 0\\). Using \\(v^2 = v_0^2 - 2g\\Delta y\\):</p>
                        <p>\\(0 = 15^2 - 2(10)\\Delta y \\implies \\Delta y = \\frac{225}{20} = 11.25\\,\\text{m}\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Sign Convention</div>
                    <div class="env-body"><p>The most common source of errors in free-fall problems is mixing up signs. Pick a positive direction (up or down), write all known quantities with the correct sign, and keep the sign of \\(g\\) consistent. If upward is positive, then \\(a = -g\\).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-free-fall',
                    title: 'Free Fall Simulator',
                    description: 'Drop objects of different masses from adjustable heights. Observe that they all fall at the same rate (when air resistance is off).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });

                        var height = 50; // meters
                        var g = 9.8;
                        var running = false;
                        var t = 0;
                        var airRes = false;

                        VizEngine.createSlider(controls, 'Height (m)', 10, 100, 50, 5, function(v) { height = v; t = 0; running = false; });
                        VizEngine.createButton(controls, 'Drop!', function() { t = 0; running = true; });
                        VizEngine.createButton(controls, 'Reset', function() { t = 0; running = false; });
                        VizEngine.createButton(controls, 'Toggle Air Resistance', function() { airRes = !airRes; t = 0; running = false; });

                        // Three objects of different mass
                        var objects = [
                            { name: 'Feather (0.01 kg)', mass: 0.01, dragCoeff: 0.5, color: viz.colors.yellow, xPos: 200 },
                            { name: 'Ball (1 kg)', mass: 1, dragCoeff: 0.01, color: viz.colors.blue, xPos: 350 },
                            { name: 'Anvil (50 kg)', mass: 50, dragCoeff: 0.001, color: viz.colors.red, xPos: 500 }
                        ];

                        var lastTS = null;

                        viz.animate(function(timestamp) {
                            if (!lastTS) lastTS = timestamp;
                            var dt = (timestamp - lastTS) / 1000;
                            lastTS = timestamp;

                            if (running) {
                                t += dt;
                            }

                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Draw building/height reference
                            var groundY = H - 50;
                            var topY = 40;
                            var pixPerMeter = (groundY - topY) / height;

                            // Ground
                            ctx.fillStyle = '#1a3a1a';
                            ctx.fillRect(0, groundY, W, H - groundY);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();

                            // Height scale
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(60, topY); ctx.lineTo(60, groundY); ctx.stroke();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (var m = 0; m <= height; m += (height <= 30 ? 5 : 10)) {
                                var my = groundY - m * pixPerMeter;
                                ctx.beginPath(); ctx.moveTo(55, my); ctx.lineTo(65, my); ctx.stroke();
                                ctx.fillText(m + ' m', 50, my + 3);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Free Fall' + (airRes ? ' (with air resistance)' : ' (no air resistance)'), W / 2, 20);

                            // Draw and update each object
                            for (var i = 0; i < objects.length; i++) {
                                var obj = objects[i];
                                var y;
                                if (!airRes) {
                                    y = height - 0.5 * g * t * t;
                                } else {
                                    // Simple drag model: terminal velocity approach
                                    var vTerm = Math.sqrt(obj.mass * g / obj.dragCoeff);
                                    // y(t) for object with drag
                                    y = height - (vTerm * vTerm / g) * Math.log(Math.cosh(g * t / vTerm));
                                }
                                y = Math.max(0, y);

                                var screenY = groundY - y * pixPerMeter;
                                var screenX = obj.xPos;

                                // Object
                                var radius = Math.min(16, Math.max(6, Math.log(obj.mass + 1) * 6));
                                ctx.fillStyle = obj.color;
                                ctx.beginPath();
                                ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
                                ctx.fill();

                                // Label
                                ctx.fillStyle = obj.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(obj.name, screenX, topY - 10);

                                // Height readout
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('y = ' + y.toFixed(1) + ' m', screenX, groundY + 20);

                                // Speed
                                var v;
                                if (!airRes) {
                                    v = g * t;
                                } else {
                                    var vTerm2 = Math.sqrt(obj.mass * g / obj.dragCoeff);
                                    v = vTerm2 * Math.tanh(g * t / vTerm2);
                                }
                                if (y <= 0) v = 0;
                                ctx.fillText('v = ' + v.toFixed(1) + ' m/s', screenX, groundY + 34);

                                // Stop if hit ground
                                if (y <= 0 && running) {
                                    // Keep running for others
                                }
                            }

                            // Check if all hit ground
                            var allGround = true;
                            for (var i = 0; i < objects.length; i++) {
                                var yCheck;
                                if (!airRes) {
                                    yCheck = height - 0.5 * g * t * t;
                                } else {
                                    var vT = Math.sqrt(objects[i].mass * g / objects[i].dragCoeff);
                                    yCheck = height - (vT * vT / g) * Math.log(Math.cosh(g * t / vT));
                                }
                                if (yCheck > 0) allGround = false;
                            }
                            if (allGround && running) running = false;

                            // Time display
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('t = ' + t.toFixed(2) + ' s', 80, H - 16);

                            if (!airRes) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Without air resistance, all objects fall together!', W / 2, H - 16);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A stone is dropped from rest off a bridge 45 m above the water. How long does it take to hit the water? (Use \\(g = 10\\,\\text{m/s}^2\\).)',
                    hint: 'Use \\(\\Delta y = \\frac{1}{2}gt^2\\) with downward positive.',
                    solution: '\\(45 = \\frac{1}{2}(10)t^2 \\implies t^2 = 9 \\implies t = 3\\,\\text{s}\\).'
                },
                {
                    question: 'A ball is thrown straight up at 25 m/s. Find (a) the maximum height and (b) the total time in the air. (Use \\(g = 10\\,\\text{m/s}^2\\).)',
                    hint: 'At max height, \\(v = 0\\). Time up = time down by symmetry.',
                    solution: '(a) \\(0 = 25^2 - 2(10)h \\implies h = \\frac{625}{20} = 31.25\\,\\text{m}\\). (b) Time to top: \\(0 = 25 - 10t \\implies t_{up} = 2.5\\,\\text{s}\\). Total time = \\(2 \\times 2.5 = 5\\,\\text{s}\\).'
                },
                {
                    question: 'Two balls are dropped from heights of 20 m and 80 m respectively. What is the ratio of their fall times? (Ignore air resistance.)',
                    hint: 'From \\(h = \\frac{1}{2}gt^2\\), express \\(t\\) in terms of \\(h\\).',
                    solution: '\\(t = \\sqrt{\\frac{2h}{g}}\\). The ratio is \\(\\frac{t_1}{t_2} = \\sqrt{\\frac{20}{80}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}\\). The ball from 20 m takes half the time of the ball from 80 m.'
                },
                {
                    question: 'A ball is thrown downward from a tall building with an initial speed of 5 m/s. What is its speed after falling 30 m? (Use \\(g = 10\\,\\text{m/s}^2\\).)',
                    hint: 'Use \\(v^2 = v_0^2 + 2g\\Delta y\\) with downward positive.',
                    solution: '\\(v^2 = 5^2 + 2(10)(30) = 25 + 600 = 625 \\implies v = 25\\,\\text{m/s}\\).'
                },
                {
                    question: 'A rock is thrown upward at 20 m/s from the edge of a 45 m cliff. When does it hit the ground at the base of the cliff? (Use \\(g = 10\\,\\text{m/s}^2\\), upward positive.)',
                    hint: 'The rock needs to travel a total displacement of \\(-45\\,\\text{m}\\). Set up \\(-45 = 20t - 5t^2\\).',
                    solution: '\\(-45 = 20t - 5t^2 \\implies 5t^2 - 20t - 45 = 0 \\implies t^2 - 4t - 9 = 0\\). Using the quadratic formula: \\(t = \\frac{4 \\pm \\sqrt{16 + 36}}{2} = \\frac{4 \\pm \\sqrt{52}}{2}\\). Taking the positive root: \\(t = \\frac{4 + 7.21}{2} \\approx 5.6\\,\\text{s}\\).'
                }
            ]
        },

        // ============================================================
        // Section 3: v-t Graphs & Displacement
        // ============================================================
        {
            id: 'vt-graphs-displacement',
            title: 'v-t Graphs & Displacement',
            content: `
                <h2>v-t Graphs &amp; Displacement</h2>

                <p>In Chapter 0 we introduced the idea that the area under a v-t graph equals displacement. Now we will use this tool systematically for uniformly accelerated motion.</p>

                <div class="env-block theorem">
                    <div class="env-title">Area Under the v-t Curve</div>
                    <div class="env-body">
                        <p>For <em>any</em> motion (constant acceleration or not), the displacement between times \\(t_1\\) and \\(t_2\\) equals the signed area between the v-t curve and the time axis:</p>
                        <p>\\[\\Delta x = \\int_{t_1}^{t_2} v(t)\\,dt\\]</p>
                        <p>For constant acceleration, the v-t graph is a straight line, and the area is a trapezoid (or triangle).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-vt-area"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Trapezoid Area</div>
                    <div class="env-body">
                        <p>An object has \\(v_0 = 4\\,\\text{m/s}\\) and constant acceleration \\(a = 2\\,\\text{m/s}^2\\) for 3 s.</p>
                        <p>Final velocity: \\(v = 4 + 2(3) = 10\\,\\text{m/s}\\).</p>
                        <p>Displacement = area of trapezoid = \\(\\frac{1}{2}(v_0 + v)t = \\frac{1}{2}(4 + 10)(3) = 21\\,\\text{m}\\).</p>
                        <p>This matches Equation 2: \\(x = 4(3) + \\frac{1}{2}(2)(9) = 12 + 9 = 21\\,\\text{m}\\). Perfect agreement!</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why the Area Method Is Powerful</div>
                    <div class="env-body"><p>Even when acceleration is <em>not</em> constant, you can still find displacement by computing the area under the v-t curve. This makes the graphical method more general than the kinematic equations, which only work for constant acceleration.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Negative Areas</div>
                    <div class="env-body"><p>When the velocity is negative (below the time axis), the area counts as negative displacement. The total displacement is the algebraic sum of positive and negative areas. The total distance, however, is the sum of the <em>absolute values</em> of each area.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-vt-area',
                    title: 'Area Under the v-t Curve',
                    description: 'Adjust v0 and acceleration. The shaded area under the v-t line equals the displacement, shown numerically.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 40, originX: 80, originY: 300 });

                        var v0 = 2;
                        var accel = 1.5;
                        var tEnd = 5;

                        VizEngine.createSlider(controls, 'v0 (m/s)', -4, 8, 2, 0.5, function(v) { v0 = v; });
                        VizEngine.createSlider(controls, 'a (m/s^2)', -3, 3, 1.5, 0.5, function(v) { accel = v; });
                        VizEngine.createSlider(controls, 'Time (s)', 1, 8, 5, 0.5, function(v) { tEnd = v; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes('t (s)', 'v (m/s)');

                            var ctx = viz.ctx;
                            var vEnd = v0 + accel * tEnd;

                            // Shaded area (trapezoid or triangle)
                            // Need to handle the case where v crosses zero
                            var tZero = -v0 / accel; // time when v = 0
                            var hasCrossing = accel !== 0 && tZero > 0 && tZero < tEnd;

                            if (hasCrossing) {
                                // Two regions with different signs
                                // Region 1: 0 to tZero
                                var s1 = viz.toScreen(0, 0);
                                var s2 = viz.toScreen(0, v0);
                                var s3 = viz.toScreen(tZero, 0);
                                ctx.fillStyle = (v0 >= 0 ? viz.colors.blue : viz.colors.red) + '33';
                                ctx.beginPath();
                                ctx.moveTo(s1[0], s1[1]);
                                ctx.lineTo(s2[0], s2[1]);
                                ctx.lineTo(s3[0], s3[1]);
                                ctx.closePath();
                                ctx.fill();

                                // Region 2: tZero to tEnd
                                var s4 = viz.toScreen(tEnd, 0);
                                var s5 = viz.toScreen(tEnd, vEnd);
                                ctx.fillStyle = (vEnd >= 0 ? viz.colors.blue : viz.colors.red) + '33';
                                ctx.beginPath();
                                ctx.moveTo(s3[0], s3[1]);
                                ctx.lineTo(s5[0], s5[1]);
                                ctx.lineTo(s4[0], s4[1]);
                                ctx.closePath();
                                ctx.fill();
                            } else {
                                // Single trapezoid
                                var p1 = viz.toScreen(0, 0);
                                var p2 = viz.toScreen(0, v0);
                                var p3 = viz.toScreen(tEnd, vEnd);
                                var p4 = viz.toScreen(tEnd, 0);
                                ctx.fillStyle = (v0 + vEnd >= 0 ? viz.colors.blue : viz.colors.red) + '33';
                                ctx.beginPath();
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.lineTo(p3[0], p3[1]);
                                ctx.lineTo(p4[0], p4[1]);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // v-t line
                            viz.drawFunction(function(t) { return v0 + accel * t; }, 0, tEnd, viz.colors.red, 3);

                            // Endpoints
                            viz.drawPoint(0, v0, viz.colors.yellow, 'v0=' + v0.toFixed(1), 5);
                            viz.drawPoint(tEnd, vEnd, viz.colors.yellow, 'v=' + vEnd.toFixed(1), 5);

                            // Compute displacement
                            var displacement = v0 * tEnd + 0.5 * accel * tEnd * tEnd;

                            // Info
                            viz.screenText('Shaded area = displacement = ' + displacement.toFixed(1) + ' m', viz.width / 2, 24, viz.colors.white, 14);
                            viz.screenText('Blue shading = positive displacement; Red = negative', viz.width / 2, viz.height - 12, viz.colors.text, 11);

                            requestAnimationFrame(draw);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A v-t graph shows a straight line from \\(v = 6\\,\\text{m/s}\\) at \\(t = 0\\) to \\(v = 0\\) at \\(t = 3\\,\\text{s}\\). Find the displacement using the area method.',
                    hint: 'The shape is a triangle with base 3 s and height 6 m/s.',
                    solution: 'Displacement = area of triangle = \\(\\frac{1}{2}(3)(6) = 9\\,\\text{m}\\).'
                },
                {
                    question: 'An object\'s v-t graph goes from \\(v = 4\\,\\text{m/s}\\) to \\(v = -2\\,\\text{m/s}\\) linearly over 6 s. Find the total displacement and total distance.',
                    hint: 'The velocity crosses zero at some time. Split the area into two parts. Distance uses absolute areas.',
                    solution: 'The velocity crosses zero at \\(t = \\frac{4}{1} = 4\\,\\text{s}\\) (since \\(a = \\frac{-2-4}{6} = -1\\,\\text{m/s}^2\\)). Area from 0 to 4 s (triangle, positive): \\(\\frac{1}{2}(4)(4) = 8\\,\\text{m}\\). Area from 4 to 6 s (triangle, negative): \\(\\frac{1}{2}(2)(2) = 2\\,\\text{m}\\) (negative since below axis). Displacement = \\(8 - 2 = 6\\,\\text{m}\\). Distance = \\(8 + 2 = 10\\,\\text{m}\\).'
                },
                {
                    question: 'A car travels at a constant 20 m/s for 5 s, then decelerates uniformly to rest in the next 4 s. Find the total displacement using the v-t area method.',
                    hint: 'First part: rectangle. Second part: triangle.',
                    solution: 'Rectangle area = \\(20 \\times 5 = 100\\,\\text{m}\\). Triangle area = \\(\\frac{1}{2}(4)(20) = 40\\,\\text{m}\\). Total displacement = \\(100 + 40 = 140\\,\\text{m}\\).'
                },
                {
                    question: 'Show that the area of the trapezoid under a v-t line (from \\(v_0\\) to \\(v\\) over time \\(t\\)) gives the same result as the kinematic equation \\(\\Delta x = v_0 t + \\frac{1}{2}at^2\\).',
                    hint: 'Area of a trapezoid = \\(\\frac{1}{2}(v_0 + v)t\\). Substitute \\(v = v_0 + at\\).',
                    solution: 'Trapezoid area = \\(\\frac{1}{2}(v_0 + v)t = \\frac{1}{2}(v_0 + v_0 + at)t = \\frac{1}{2}(2v_0 + at)t = v_0 t + \\frac{1}{2}at^2\\). This is exactly Equation 2 (with \\(x_0 = 0\\)).'
                },
                {
                    question: 'A v-t graph is a straight line from \\((0, -3)\\) to \\((6, 3)\\). What are (a) the acceleration, (b) the displacement, and (c) the distance?',
                    hint: 'Slope gives \\(a\\). The line crosses zero at \\(t = 3\\). Compute two triangle areas.',
                    solution: '(a) \\(a = \\frac{3 - (-3)}{6} = 1\\,\\text{m/s}^2\\). (b) Two triangles: below axis (0 to 3 s), area = \\(-\\frac{1}{2}(3)(3) = -4.5\\,\\text{m}\\); above axis (3 to 6 s), area = \\(+\\frac{1}{2}(3)(3) = 4.5\\,\\text{m}\\). Displacement = \\(-4.5 + 4.5 = 0\\,\\text{m}\\). (c) Distance = \\(4.5 + 4.5 = 9\\,\\text{m}\\).'
                }
            ]
        },

        // ============================================================
        // Section 4: Solving Kinematics Problems
        // ============================================================
        {
            id: 'solving-kinematics',
            title: 'Solving Kinematics Problems',
            content: `
                <h2>Solving Kinematics Problems</h2>

                <p>Physics problems can feel intimidating, but a systematic approach takes the mystery out of them. Here is a battle-tested strategy for one-dimensional kinematics.</p>

                <div class="env-block theorem">
                    <div class="env-title">Problem-Solving Strategy</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Draw a diagram.</strong> Sketch the situation and choose a coordinate axis with a clear positive direction.</li>
                            <li><strong>List the knowns.</strong> Write down every given quantity with the correct sign.</li>
                            <li><strong>Identify the unknown.</strong> What does the problem ask for?</li>
                            <li><strong>Choose the equation.</strong> Pick the kinematic equation that relates your knowns to the unknown.</li>
                            <li><strong>Solve algebraically</strong> before substituting numbers.</li>
                            <li><strong>Check your answer.</strong> Does the sign make sense? Are the units correct? Is the magnitude reasonable?</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Worked Example: Two-Phase Problem</div>
                    <div class="env-body">
                        <p>A car accelerates from rest at \\(3\\,\\text{m/s}^2\\) for 10 s, then brakes at \\(-6\\,\\text{m/s}^2\\) until it stops. Find the total distance traveled.</p>
                        <p><strong>Phase 1 (acceleration):</strong></p>
                        <p>\\(v_1 = 0 + 3(10) = 30\\,\\text{m/s}\\).</p>
                        <p>\\(\\Delta x_1 = 0 + \\frac{1}{2}(3)(10)^2 = 150\\,\\text{m}\\).</p>
                        <p><strong>Phase 2 (braking):</strong></p>
                        <p>\\(0 = 30^2 + 2(-6)\\Delta x_2 \\implies \\Delta x_2 = \\frac{900}{12} = 75\\,\\text{m}\\).</p>
                        <p><strong>Total distance = 150 + 75 = 225 m.</strong></p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-problem-solver"></div>

                <div class="env-block intuition">
                    <div class="env-title">Multi-Phase Problems</div>
                    <div class="env-body"><p>Many real-world problems involve multiple phases (accelerate, coast, brake). The key insight is that the <em>final state of one phase becomes the initial state of the next</em>. Solve each phase sequentially, passing the final velocity and position forward.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Pitfalls</div>
                    <div class="env-body">
                        <ul>
                            <li>Forgetting to use the correct sign for acceleration (especially when braking).</li>
                            <li>Using the wrong equation because of a misidentified "missing" variable.</li>
                            <li>Plugging in \\(v_0 = 0\\) when the object was already moving (e.g., Phase 2 starts at the Phase 1 final speed).</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-problem-solver',
                    title: 'Kinematics Problem Animator',
                    description: 'Set up a two-phase kinematics problem: enter acceleration for each phase and watch the object move with real-time readouts.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });

                        var a1 = 3;
                        var t1 = 5;
                        var a2 = -2;
                        var t2 = 7.5; // will be auto-calculated
                        var running = false;
                        var tCurr = 0;

                        VizEngine.createSlider(controls, 'a1 (m/s^2)', 0.5, 6, 3, 0.5, function(v) { a1 = v; tCurr = 0; running = false; });
                        VizEngine.createSlider(controls, 't1 (s)', 1, 10, 5, 0.5, function(v) { t1 = v; tCurr = 0; running = false; });
                        VizEngine.createSlider(controls, 'a2 (m/s^2)', -6, -0.5, -2, 0.5, function(v) { a2 = v; tCurr = 0; running = false; });
                        VizEngine.createButton(controls, 'Go!', function() { tCurr = 0; running = true; });
                        VizEngine.createButton(controls, 'Reset', function() { tCurr = 0; running = false; });

                        var lastTS = null;

                        viz.animate(function(timestamp) {
                            if (!lastTS) lastTS = timestamp;
                            var dt = (timestamp - lastTS) / 1000;
                            lastTS = timestamp;

                            // Phase 1 final values
                            var v1End = a1 * t1;
                            var x1End = 0.5 * a1 * t1 * t1;

                            // Phase 2: time to stop
                            t2 = -v1End / a2;
                            if (t2 < 0) t2 = 0;
                            var x2End = x1End + v1End * t2 + 0.5 * a2 * t2 * t2;
                            var tTotal = t1 + t2;

                            if (running) {
                                tCurr += dt * 0.8;
                                if (tCurr > tTotal) { tCurr = tTotal; running = false; }
                            }

                            // Current state
                            var x, v, phase;
                            if (tCurr <= t1) {
                                phase = 1;
                                x = 0.5 * a1 * tCurr * tCurr;
                                v = a1 * tCurr;
                            } else {
                                phase = 2;
                                var dt2 = tCurr - t1;
                                x = x1End + v1End * dt2 + 0.5 * a2 * dt2 * dt2;
                                v = v1End + a2 * dt2;
                                if (v < 0) { v = 0; x = x2End; }
                            }

                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            // --- Position track ---
                            var trackY = 180;
                            var trackLeft = 60;
                            var trackRight = W - 30;
                            var xMaxDisplay = Math.max(x2End, 10);
                            var pixPerM = (trackRight - trackLeft) / xMaxDisplay;

                            // Road
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(trackLeft, trackY - 8, trackRight - trackLeft, 16);
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([8, 8]);
                            ctx.beginPath(); ctx.moveTo(trackLeft, trackY); ctx.lineTo(trackRight, trackY); ctx.stroke();
                            ctx.setLineDash([]);

                            // Distance markers
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var markStep = Math.max(10, Math.round(xMaxDisplay / 8 / 10) * 10);
                            for (var m = 0; m <= xMaxDisplay; m += markStep) {
                                var mx = trackLeft + m * pixPerM;
                                ctx.fillText(m + ' m', mx, trackY + 24);
                                ctx.beginPath(); ctx.moveTo(mx, trackY + 8); ctx.lineTo(mx, trackY + 12); ctx.stroke();
                            }

                            // Phase boundary marker
                            var phaseX = trackLeft + x1End * pixPerM;
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(phaseX, trackY - 30); ctx.lineTo(phaseX, trackY + 14); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('Phase 1|2', phaseX, trackY - 34);

                            // Car
                            var carSX = trackLeft + x * pixPerM;
                            carSX = Math.max(trackLeft, Math.min(trackRight, carSX));
                            ctx.fillStyle = phase === 1 ? viz.colors.blue : viz.colors.orange;
                            ctx.fillRect(carSX - 16, trackY - 14, 32, 10);
                            ctx.fillRect(carSX - 10, trackY - 22, 20, 10);
                            ctx.fillStyle = viz.colors.text;
                            ctx.beginPath(); ctx.arc(carSX - 8, trackY - 2, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(carSX + 8, trackY - 2, 4, 0, Math.PI * 2); ctx.fill();

                            // --- v-t graph ---
                            var graphTop = 230;
                            var graphH = 120;
                            var graphLeft = 80;
                            var graphW = W - 140;

                            ctx.fillStyle = '#0f0f28';
                            ctx.fillRect(graphLeft, graphTop, graphW, graphH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(graphLeft, graphTop, graphW, graphH);

                            // v-t plot
                            var vMax = v1End * 1.2;
                            var tMax = tTotal * 1.1;
                            if (vMax < 1) vMax = 5;
                            if (tMax < 1) tMax = 5;

                            // axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(graphLeft, graphTop + graphH); ctx.lineTo(graphLeft + graphW, graphTop + graphH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(graphLeft, graphTop); ctx.lineTo(graphLeft, graphTop + graphH); ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('t (s)', graphLeft + graphW / 2, graphTop + graphH + 16);
                            ctx.textAlign = 'right';
                            ctx.fillText(vMax.toFixed(0), graphLeft - 4, graphTop + 10);
                            ctx.fillText('0', graphLeft - 4, graphTop + graphH + 3);

                            function tToGX(t) { return graphLeft + (t / tMax) * graphW; }
                            function vToGY(vel) { return graphTop + graphH - (vel / vMax) * graphH; }

                            // Shaded area (two triangles)
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.beginPath();
                            ctx.moveTo(tToGX(0), vToGY(0));
                            ctx.lineTo(tToGX(t1), vToGY(v1End));
                            ctx.lineTo(tToGX(t1), vToGY(0));
                            ctx.closePath();
                            ctx.fill();

                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.beginPath();
                            ctx.moveTo(tToGX(t1), vToGY(0));
                            ctx.lineTo(tToGX(t1), vToGY(v1End));
                            ctx.lineTo(tToGX(tTotal), vToGY(0));
                            ctx.closePath();
                            ctx.fill();

                            // v-t line
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(tToGX(0), vToGY(0));
                            ctx.lineTo(tToGX(t1), vToGY(v1End));
                            ctx.lineTo(tToGX(tTotal), vToGY(0));
                            ctx.stroke();

                            // Current point marker
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(tToGX(tCurr), vToGY(v), 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('v-t graph', graphLeft + 6, graphTop + 14);

                            // --- Dashboard ---
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Two-Phase Kinematics', 20, 24);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Phase 1: a = +' + a1.toFixed(1) + ' m/s\u00B2 for ' + t1.toFixed(1) + ' s', 20, 50);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Phase 2: a = ' + a2.toFixed(1) + ' m/s\u00B2 until stop', 20, 68);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('t = ' + tCurr.toFixed(2) + ' s', 400, 50);
                            ctx.fillText('v = ' + v.toFixed(2) + ' m/s', 400, 68);
                            ctx.fillText('x = ' + x.toFixed(1) + ' m', 400, 86);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Phase: ' + phase, 400, 104);

                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Total distance: ' + x2End.toFixed(1) + ' m', 20, 104);
                            ctx.fillText('Peak speed: ' + v1End.toFixed(1) + ' m/s', 20, 122);
                            ctx.fillText('Total time: ' + tTotal.toFixed(1) + ' s', 20, 140);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bus starts from rest and accelerates at \\(2\\,\\text{m/s}^2\\) for 8 s, then travels at constant speed for 20 s, then brakes at \\(-4\\,\\text{m/s}^2\\) until it stops. Find the total distance.',
                    hint: 'Three phases. Phase 1 gives the cruising speed. Phase 2 is constant speed. Phase 3 uses \\(v^2 = v_0^2 + 2a\\Delta x\\).',
                    solution: 'Phase 1: \\(v = 2 \\times 8 = 16\\,\\text{m/s}\\), \\(\\Delta x_1 = \\frac{1}{2}(2)(64) = 64\\,\\text{m}\\). Phase 2: \\(\\Delta x_2 = 16 \\times 20 = 320\\,\\text{m}\\). Phase 3: \\(0 = 16^2 + 2(-4)\\Delta x_3 \\implies \\Delta x_3 = 32\\,\\text{m}\\). Total = \\(64 + 320 + 32 = 416\\,\\text{m}\\).'
                },
                {
                    question: 'Two cars start side by side. Car A has \\(v_0 = 0\\), \\(a = 4\\,\\text{m/s}^2\\). Car B travels at a constant 12 m/s. When and where does Car A catch Car B?',
                    hint: 'Set \\(x_A = x_B\\): \\(\\frac{1}{2}(4)t^2 = 12t\\).',
                    solution: '\\(2t^2 = 12t \\implies 2t(t - 6) = 0\\). So \\(t = 0\\) (start) or \\(t = 6\\,\\text{s}\\). Position: \\(x = 12 \\times 6 = 72\\,\\text{m}\\). Car A catches Car B at \\(t = 6\\,\\text{s}\\) and \\(x = 72\\,\\text{m}\\).'
                },
                {
                    question: 'An elevator accelerates upward from rest at \\(1.2\\,\\text{m/s}^2\\) for 5 s, then moves at constant speed, then decelerates at \\(-1.2\\,\\text{m/s}^2\\) to a stop. The total distance is 30 m. How long is the constant-speed phase?',
                    hint: 'Find distances in phases 1 and 3 first, then the remaining distance is covered at constant speed.',
                    solution: 'Phase 1: \\(v = 1.2 \\times 5 = 6\\,\\text{m/s}\\), \\(\\Delta x_1 = \\frac{1}{2}(1.2)(25) = 15\\,\\text{m}\\). Phase 3 (symmetrical): \\(\\Delta x_3 = 15\\,\\text{m}\\). Remaining: \\(30 - 15 - 15 = 0\\,\\text{m}\\). The constant-speed phase has zero duration; the elevator decelerates immediately after accelerating.'
                },
                {
                    question: 'A skateboarder rolls from rest down a ramp with \\(a = 1.5\\,\\text{m/s}^2\\) for 4 s, then rolls along flat ground at constant speed for 10 s. What is the total distance?',
                    hint: 'Phase 1 gives the final speed used in Phase 2.',
                    solution: 'Phase 1: \\(v = 1.5(4) = 6\\,\\text{m/s}\\), \\(\\Delta x_1 = \\frac{1}{2}(1.5)(16) = 12\\,\\text{m}\\). Phase 2: \\(\\Delta x_2 = 6(10) = 60\\,\\text{m}\\). Total = \\(12 + 60 = 72\\,\\text{m}\\).'
                },
                {
                    question: 'A car is traveling at 20 m/s when the driver sees a stop sign 60 m ahead. What constant deceleration is needed to stop just at the sign?',
                    hint: 'Use \\(v^2 = v_0^2 + 2a\\Delta x\\) with \\(v = 0\\).',
                    solution: '\\(0 = 20^2 + 2a(60) \\implies 0 = 400 + 120a \\implies a = -\\frac{400}{120} \\approx -3.33\\,\\text{m/s}^2\\).'
                }
            ]
        },

        // ============================================================
        // Section 5: Experimental Verification
        // ============================================================
        {
            id: 'experimental-verification',
            title: 'Experimental Verification',
            content: `
                <h2>Experimental Verification</h2>

                <p>Physics is ultimately an experimental science. The kinematic equations are not just abstract formulas; they must be tested against real data. In this section we explore classic experiments that verify uniformly accelerated motion.</p>

                <h3>The Ticker Tape Timer</h3>

                <div class="env-block definition">
                    <div class="env-title">What Is a Ticker Tape Timer?</div>
                    <div class="env-body"><p>A <strong>ticker tape timer</strong> is a device that makes dots on a paper tape at equal time intervals (typically 50 Hz, so one dot every 0.02 s). When a moving object pulls the tape, the spacing between dots records the object's position at regular time steps. Wider spacing means higher speed.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-ticker-tape"></div>

                <h3>Analyzing Ticker Tape Data</h3>

                <div class="env-block theorem">
                    <div class="env-title">From Tape to Numbers</div>
                    <div class="env-body">
                        <ol>
                            <li>Measure the distance between consecutive dots: \\(s_1, s_2, s_3, \\ldots\\)</li>
                            <li>Average velocity in each interval: \\(\\bar{v}_n = \\frac{s_n}{\\Delta t}\\)</li>
                            <li>If the spacings increase uniformly, acceleration is constant: \\(a = \\frac{\\bar{v}_{n+1} - \\bar{v}_n}{\\Delta t}\\)</li>
                        </ol>
                    </div>
                </div>

                <h3>Ball Drop Experiment</h3>

                <p>Another classic experiment is to drop a ball from known heights and measure the fall time. Plotting \\(h\\) vs. \\(t^2\\) should give a straight line with slope \\(\\frac{g}{2}\\), confirming \\(h = \\frac{1}{2}gt^2\\).</p>

                <div class="viz-placeholder" data-viz="viz-ball-drop"></div>

                <div class="env-block intuition">
                    <div class="env-title">Why Experiments Matter</div>
                    <div class="env-body"><p>Equations are models. They predict what <em>should</em> happen if our assumptions (constant acceleration, no friction, etc.) are correct. Experiments test those predictions. When experiment and theory agree, we gain confidence. When they disagree, we learn something new and improve our models.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Sources of Error</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Air resistance</strong>: light or fast-moving objects experience significant drag.</li>
                            <li><strong>Reaction time</strong>: manual timing introduces random error of about 0.1-0.2 s.</li>
                            <li><strong>Friction</strong>: on ramps, friction reduces the effective acceleration.</li>
                            <li><strong>Measurement uncertainty</strong>: ruler precision limits distance measurements.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-ticker-tape',
                    title: 'Virtual Ticker Tape',
                    description: 'Simulate a ticker tape for uniform acceleration. Watch the dot spacing increase as the object accelerates. Adjust the acceleration to see the effect.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 320, scale: 1, originX: 0, originY: 0 });

                        var accel = 2;
                        var tickInterval = 0.1; // seconds between dots
                        var numDots = 20;

                        VizEngine.createSlider(controls, 'a (m/s^2)', 0, 6, 2, 0.5, function(v) { accel = v; });
                        VizEngine.createSlider(controls, 'Dots', 5, 30, 20, 1, function(v) { numDots = Math.round(v); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Ticker Tape Simulation (a = ' + accel.toFixed(1) + ' m/s\u00B2)', W / 2, 20);

                            // Compute dot positions
                            var positions = [];
                            for (var i = 0; i < numDots; i++) {
                                var t = i * tickInterval;
                                positions.push(0.5 * accel * t * t);
                            }
                            var maxPos = positions[positions.length - 1] || 1;

                            // Tape
                            var tapeY = 80;
                            var tapeLeft = 60;
                            var tapeRight = W - 30;
                            var tapeW = tapeRight - tapeLeft;
                            var scale = tapeW / maxPos;

                            // Draw tape background
                            ctx.fillStyle = '#2a2a1a';
                            ctx.fillRect(tapeLeft - 5, tapeY - 15, tapeW + 10, 30);
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(tapeLeft - 5, tapeY - 15, tapeW + 10, 30);

                            // Dots
                            for (var i = 0; i < positions.length; i++) {
                                var dotX = tapeLeft + positions[i] * scale;
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(dotX, tapeY, 3, 0, Math.PI * 2);
                                ctx.fill();

                                // Dot number (every 5th)
                                if (i % 5 === 0) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(i.toString(), dotX, tapeY - 20);
                                }
                            }

                            // --- Spacing analysis ---
                            var spacingY = 150;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Dot Spacings (s1, s2, s3, ...):', 20, spacingY);

                            var spacings = [];
                            for (var i = 1; i < Math.min(positions.length, 16); i++) {
                                spacings.push(positions[i] - positions[i - 1]);
                            }

                            // Bar chart of spacings
                            var barTop = spacingY + 10;
                            var barH = 80;
                            var barW = Math.min(30, (W - 80) / spacings.length - 2);
                            var maxSpacing = spacings[spacings.length - 1] || 1;

                            for (var i = 0; i < spacings.length; i++) {
                                var bx = 60 + i * (barW + 2);
                                var bh = (spacings[i] / maxSpacing) * barH;
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(bx, barTop + barH - bh, barW, bh);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx, barTop + barH - bh, barW, bh);

                                // Label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '8px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('s' + (i + 1), bx + barW / 2, barTop + barH + 12);
                                ctx.fillText((spacings[i] * 100).toFixed(1), bx + barW / 2, barTop + barH - bh - 4);
                            }

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('(values in cm)', 60, barTop + barH + 24);

                            // Check constant acceleration: spacing differences should be equal
                            if (spacings.length > 2) {
                                var diffs = [];
                                for (var i = 1; i < spacings.length; i++) {
                                    diffs.push(spacings[i] - spacings[i - 1]);
                                }
                                var avgDiff = diffs.reduce(function(a, b) { return a + b; }, 0) / diffs.length;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Constant difference between spacings: \u0394s = ' + (avgDiff * 100).toFixed(2) + ' cm (confirms constant acceleration)', 60, H - 20);
                            }

                            requestAnimationFrame(draw);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ball-drop',
                    title: 'Ball Drop: h vs. t\u00B2 Analysis',
                    description: 'Simulate dropping a ball from various heights. The plot of h vs. t\u00B2 yields a straight line whose slope gives g/2.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });

                        var g = 9.8;
                        var noise = 0.05; // timing noise in seconds

                        VizEngine.createSlider(controls, 'Noise (%)', 0, 15, 5, 1, function(v) { noise = v / 100; regenerate(); });
                        VizEngine.createButton(controls, 'New Data', function() { regenerate(); });

                        // Generate data
                        var heights = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
                        var data = [];

                        function regenerate() {
                            data = [];
                            for (var i = 0; i < heights.length; i++) {
                                var h = heights[i];
                                var tTrue = Math.sqrt(2 * h / g);
                                var tMeasured = tTrue * (1 + (Math.random() - 0.5) * 2 * noise);
                                data.push({ h: h, t: tMeasured, t2: tMeasured * tMeasured });
                            }
                        }
                        regenerate();

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Two plots side by side
                            var plotW = (W - 80) / 2;
                            var plotH = H - 80;
                            var plotTop = 40;

                            // --- Left plot: h vs t ---
                            var leftX = 50;
                            ctx.fillStyle = '#0f0f28';
                            ctx.fillRect(leftX, plotTop, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(leftX, plotTop, plotW, plotH);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(leftX, plotTop + plotH); ctx.lineTo(leftX + plotW, plotTop + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(leftX, plotTop); ctx.lineTo(leftX, plotTop + plotH); ctx.stroke();

                            var tMax = 1.2;
                            var hMax = 5.5;

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('h vs. t', leftX + plotW / 2, plotTop - 8);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('t (s)', leftX + plotW / 2, plotTop + plotH + 16);
                            ctx.textAlign = 'right';
                            ctx.fillText('h (m)', leftX - 4, plotTop + 10);

                            // Theoretical curve
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var tt = (i / 100) * tMax;
                                var hh = 0.5 * g * tt * tt;
                                var px = leftX + (tt / tMax) * plotW;
                                var py = plotTop + plotH - (hh / hMax) * plotH;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Data points
                            for (var i = 0; i < data.length; i++) {
                                var px = leftX + (data[i].t / tMax) * plotW;
                                var py = plotTop + plotH - (data[i].h / hMax) * plotH;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // --- Right plot: h vs t^2 ---
                            var rightX = leftX + plotW + 30;
                            ctx.fillStyle = '#0f0f28';
                            ctx.fillRect(rightX, plotTop, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(rightX, plotTop, plotW, plotH);

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(rightX, plotTop + plotH); ctx.lineTo(rightX + plotW, plotTop + plotH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rightX, plotTop); ctx.lineTo(rightX, plotTop + plotH); ctx.stroke();

                            var t2Max = tMax * tMax;

                            // Labels
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('h vs. t\u00B2 (linearized)', rightX + plotW / 2, plotTop - 8);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('t\u00B2 (s\u00B2)', rightX + plotW / 2, plotTop + plotH + 16);
                            ctx.textAlign = 'right';
                            ctx.fillText('h (m)', rightX - 4, plotTop + 10);

                            // Best-fit line (h = slope * t^2)
                            // Least squares: slope = sum(h*t2) / sum(t2*t2)
                            var sumHT2 = 0, sumT2T2 = 0;
                            for (var i = 0; i < data.length; i++) {
                                sumHT2 += data[i].h * data[i].t2;
                                sumT2T2 += data[i].t2 * data[i].t2;
                            }
                            var slope = sumHT2 / sumT2T2;

                            // Draw fit line
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rightX, plotTop + plotH);
                            var endH = slope * t2Max;
                            var endPy = plotTop + plotH - (endH / hMax) * plotH;
                            ctx.lineTo(rightX + plotW, endPy);
                            ctx.stroke();

                            // Data points
                            for (var i = 0; i < data.length; i++) {
                                var px = rightX + (data[i].t2 / t2Max) * plotW;
                                var py = plotTop + plotH - (data[i].h / hMax) * plotH;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // Results
                            var gMeasured = 2 * slope;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Slope = g/2 = ' + slope.toFixed(2) + ' m/s\u00B2', rightX + plotW / 2, plotTop + plotH + 30);
                            ctx.fillText('Measured g = ' + gMeasured.toFixed(2) + ' m/s\u00B2  (true: 9.80)', rightX + plotW / 2, plotTop + plotH + 46);

                            var error = Math.abs(gMeasured - 9.8) / 9.8 * 100;
                            ctx.fillStyle = error < 5 ? viz.colors.green : viz.colors.red;
                            ctx.fillText('Error: ' + error.toFixed(1) + '%', rightX + plotW / 2, plotTop + plotH + 62);

                            requestAnimationFrame(draw);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A ticker tape timer operates at 50 Hz (50 dots per second). The spacings between consecutive dots on a tape pulled by an accelerating cart are: 1.0 cm, 1.5 cm, 2.0 cm, 2.5 cm, 3.0 cm. What is the acceleration?',
                    hint: 'The time between dots is 0.02 s. Average velocity in each interval = spacing/0.02 s. Find the change in velocity per interval.',
                    solution: 'Time interval \\(\\Delta t = 0.02\\,\\text{s}\\). Velocities: 0.50, 0.75, 1.00, 1.25, 1.50 m/s. Change per interval: 0.25 m/s. Acceleration = \\(\\frac{0.25}{0.02} = 12.5\\,\\text{m/s}^2\\).'
                },
                {
                    question: 'In a ball-drop experiment, a ball is dropped from heights of 1.0, 2.0, 3.0, and 4.0 m. The measured fall times are 0.45, 0.64, 0.78, and 0.90 s. Use a \\(h\\) vs. \\(t^2\\) plot to estimate \\(g\\).',
                    hint: 'Compute \\(t^2\\) for each, then find the slope of h vs. \\(t^2\\). Slope = \\(g/2\\).',
                    solution: '\\(t^2\\) values: 0.2025, 0.4096, 0.6084, 0.8100. Slope \\(\\approx \\frac{4.0 - 1.0}{0.81 - 0.2025} = \\frac{3.0}{0.6075} \\approx 4.94\\). So \\(g \\approx 2 \\times 4.94 = 9.88\\,\\text{m/s}^2\\), close to the accepted value.'
                },
                {
                    question: 'A student measures the fall time for a ball dropped from 1.8 m and gets \\(t = 0.61\\,\\text{s}\\). Calculate \\(g\\) from this single measurement. Then explain why multiple heights and a graph give a better estimate.',
                    hint: 'From \\(h = \\frac{1}{2}gt^2\\), solve for \\(g\\). Think about how random errors average out.',
                    solution: '\\(g = \\frac{2h}{t^2} = \\frac{2(1.8)}{0.61^2} = \\frac{3.6}{0.3721} \\approx 9.68\\,\\text{m/s}^2\\). A single measurement is subject to random timing error. Using multiple heights and fitting a line minimizes the impact of any one bad measurement (the errors tend to cancel).'
                },
                {
                    question: 'A ticker tape shows 6 equally spaced dots. What type of motion does this indicate?',
                    hint: 'Equal spacing means equal distances in equal time intervals.',
                    solution: 'Equal spacing means the object covers the same distance in each time interval, which means it has constant velocity (zero acceleration).'
                },
                {
                    question: 'List three experimental improvements that would reduce error in a ball-drop experiment.',
                    hint: 'Think about the sources of error: timing, air resistance, and measurement precision.',
                    solution: '(1) Use electronic timing (photogates) instead of manual stopwatches to reduce reaction time error. (2) Use denser, smaller balls to minimize air resistance. (3) Drop from greater heights so that the fall time is longer relative to timing uncertainties, reducing the percentage error.'
                }
            ]
        }
    ]
});
