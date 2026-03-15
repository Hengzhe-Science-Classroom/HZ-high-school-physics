window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Magnetic Fields',
    subtitle: 'Magnetic Forces and Their Origins',
    sections: [
        // ===== SECTION 1: Magnetic Fields and Their Sources =====
        {
            id: 'ch11-sec01',
            title: 'Magnetic Fields and Their Sources',
            content: `<h2>Magnetic Fields and Their Sources</h2>
<p class="section-roadmap"><em>In this section, you will learn what magnetic fields are, how they are represented, and what creates them.</em></p>

<div class="env-block intuition">
<div class="env-title">From Electricity to Magnetism</div>
<div class="env-body"><p>In the previous chapter, you studied electric charges at rest and in steady flow. Now we explore a new phenomenon: moving charges create magnetic fields, and magnetic fields exert forces on moving charges. This deep connection between electricity and magnetism is one of the great unifying themes of physics.</p></div>
</div>

<h3>What Is a Magnetic Field?</h3>
<p>A <strong>magnetic field</strong> is a region of space where a magnetic force can be detected. We denote the magnetic field vector by \\(\\vec{B}\\), measured in <strong>teslas</strong> (T). The field can be created by:</p>
<ul>
<li><strong>Permanent magnets</strong> (bar magnets, horseshoe magnets)</li>
<li><strong>Electric currents</strong> (wires, solenoids, electromagnets)</li>
<li><strong>Moving charges</strong></li>
</ul>

<div class="env-block definition">
<div class="env-title">Definition (Magnetic Field)</div>
<div class="env-body"><p>The magnetic field \\(\\vec{B}\\) at a point in space describes the force per unit charge per unit velocity that a moving charge would experience at that point. The SI unit is the <strong>tesla</strong> (T), where \\(1\\,\\text{T} = 1\\,\\text{kg}/(\\text{A}\\cdot\\text{s}^2)\\).</p></div>
</div>

<h3>Magnetic Field Lines</h3>
<p>We visualize magnetic fields using <strong>field lines</strong>:</p>
<ul>
<li>Field lines point from the <strong>north pole</strong> to the <strong>south pole</strong> outside the magnet.</li>
<li>Inside the magnet, they continue from south to north, forming closed loops.</li>
<li>The <strong>density</strong> of field lines indicates the field strength: closer lines mean a stronger field.</li>
<li>Field lines never cross.</li>
</ul>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body"><p>Unlike electric field lines (which begin on positive charges and end on negative charges), magnetic field lines always form closed loops. There are no magnetic monopoles.</p></div>
</div>

<h3>Typical Magnetic Field Strengths</h3>
<table style="width:80%;margin:12px auto;border-collapse:collapse;color:#c9d1d9;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:6px;">Source</th><th style="text-align:right;padding:6px;">B (T)</th></tr>
<tr><td style="padding:6px;">Earth's surface</td><td style="text-align:right;padding:6px;">\\(5 \\times 10^{-5}\\)</td></tr>
<tr><td style="padding:6px;">Refrigerator magnet</td><td style="text-align:right;padding:6px;">\\(5 \\times 10^{-3}\\)</td></tr>
<tr><td style="padding:6px;">Laboratory magnet</td><td style="text-align:right;padding:6px;">0.1 - 1</td></tr>
<tr><td style="padding:6px;">MRI machine</td><td style="text-align:right;padding:6px;">1.5 - 3</td></tr>
<tr><td style="padding:6px;">Strongest lab magnets</td><td style="text-align:right;padding:6px;">~45</td></tr>
</table>

<div class="viz-placeholder" data-viz="viz-magnetic-field-lines"></div>

<div class="env-block intuition">
<div class="env-title">Looking Ahead</div>
<div class="env-body"><p>Now that you understand what magnetic fields are and how they are visualized, the next section explores what happens when a charged particle enters a magnetic field.</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-magnetic-field-lines',
                    title: 'Magnetic Field Lines Visualization',
                    description: 'See field lines around a bar magnet and a current-carrying wire. Toggle between sources to compare the field patterns.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400});
                        var ctx = viz.ctx;
                        var mode = 'bar';

                        VizEngine.createButton(controls, 'Bar Magnet', function() { mode = 'bar'; draw(); });
                        VizEngine.createButton(controls, 'Current-Carrying Wire', function() { mode = 'wire'; draw(); });

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;

                            if (mode === 'bar') {
                                viz.screenText('Magnetic Field Lines: Bar Magnet', W / 2, 20, viz.colors.white, 15);

                                // Draw bar magnet
                                var mx = W / 2, my = H / 2;
                                var mw = 140, mh = 40;

                                // North pole (red)
                                ctx.fillStyle = viz.colors.red + 'aa';
                                ctx.fillRect(mx - mw / 2, my - mh / 2, mw / 2, mh);
                                // South pole (blue)
                                ctx.fillStyle = viz.colors.blue + 'aa';
                                ctx.fillRect(mx, my - mh / 2, mw / 2, mh);

                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(mx - mw / 2, my - mh / 2, mw, mh);

                                viz.screenText('N', mx - mw / 4, my, viz.colors.white, 18);
                                viz.screenText('S', mx + mw / 4, my, viz.colors.white, 18);

                                // Draw field lines (dipole approximation)
                                var nLines = 8;
                                ctx.lineWidth = 1.2;
                                for (var i = 0; i < nLines; i++) {
                                    var startAngle = (i / nLines) * Math.PI * 2;
                                    ctx.strokeStyle = viz.colors.yellow + 'cc';
                                    ctx.beginPath();

                                    var steps = 80;
                                    var started = false;
                                    for (var s = 0; s <= steps; s++) {
                                        var t = s / steps;
                                        // Parametric dipole-like curves
                                        var angle = startAngle + t * Math.PI * 0.001;
                                        var r = 60 + 120 * Math.abs(Math.sin(startAngle / 2 + 0.3));
                                        var paramAngle = (i < nLines / 2) ? 1 : -1;

                                        // Generate field line shape
                                        var theta = -Math.PI + t * Math.PI * 2;
                                        var cosA = Math.cos(startAngle * 0.5 + 0.3);
                                        var sinA = Math.sin(startAngle * 0.5 + 0.3);

                                        var fieldR = r * Math.abs(Math.cos(theta));
                                        if (fieldR < 5) { started = false; continue; }

                                        var fx = mx + fieldR * Math.cos(theta) * 1.5;
                                        var fy = my + fieldR * Math.sin(theta) * sinA;

                                        // Skip points inside magnet
                                        if (Math.abs(fx - mx) < mw / 2 + 5 && Math.abs(fy - my) < mh / 2 + 5) {
                                            started = false;
                                            continue;
                                        }

                                        if (!started) {
                                            ctx.moveTo(fx, fy);
                                            started = true;
                                        } else {
                                            ctx.lineTo(fx, fy);
                                        }
                                    }
                                    ctx.stroke();
                                }

                                // Simpler, more visible field lines using arcs
                                var lineData = [
                                    {rx: 80, ry: 30}, {rx: 120, ry: 60},
                                    {rx: 160, ry: 100}, {rx: 200, ry: 150}
                                ];
                                ctx.lineWidth = 1.5;
                                for (var li = 0; li < lineData.length; li++) {
                                    var ld = lineData[li];
                                    ctx.strokeStyle = viz.colors.yellow + 'bb';

                                    // Top field line
                                    ctx.beginPath();
                                    ctx.ellipse(mx, my, ld.rx, ld.ry, 0, Math.PI, 0);
                                    ctx.stroke();

                                    // Bottom field line
                                    ctx.beginPath();
                                    ctx.ellipse(mx, my, ld.rx, ld.ry, 0, 0, Math.PI);
                                    ctx.stroke();

                                    // Arrows on top lines (pointing from N to S = left to right at top)
                                    var arrowX = mx + ld.rx * 0.5;
                                    var arrowY = my - ld.ry * Math.sin(Math.acos(0.5));
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.moveTo(arrowX + 5, arrowY);
                                    ctx.lineTo(arrowX - 3, arrowY - 4);
                                    ctx.lineTo(arrowX - 3, arrowY + 4);
                                    ctx.closePath();
                                    ctx.fill();

                                    // Arrows on bottom lines (pointing right to left at bottom)
                                    arrowX = mx - ld.rx * 0.5;
                                    arrowY = my + ld.ry * Math.sin(Math.acos(0.5));
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.moveTo(arrowX - 5, arrowY);
                                    ctx.lineTo(arrowX + 3, arrowY - 4);
                                    ctx.lineTo(arrowX + 3, arrowY + 4);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                viz.screenText('Field lines go from N to S outside the magnet', W / 2, H - 30, viz.colors.text, 12);
                            } else {
                                viz.screenText('Magnetic Field Lines: Current-Carrying Wire', W / 2, 20, viz.colors.white, 15);
                                viz.screenText('(Wire perpendicular to screen, current flowing out toward you)', W / 2, 40, viz.colors.text, 11);

                                var cx = W / 2, cy = H / 2 + 10;

                                // Wire cross-section (current coming out)
                                ctx.fillStyle = viz.colors.text;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 12, 0, Math.PI * 2);
                                ctx.fill();
                                // Dot for current out of page
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 5, 0, Math.PI * 2);
                                ctx.fill();

                                // Concentric circular field lines
                                var radii = [40, 70, 100, 135, 170];
                                for (var ri = 0; ri < radii.length; ri++) {
                                    var rad = radii[ri];
                                    ctx.strokeStyle = viz.colors.yellow + 'aa';
                                    ctx.lineWidth = 1.2;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
                                    ctx.stroke();

                                    // Arrow (counterclockwise for current out of page)
                                    var arrowAngle = -Math.PI / 4;
                                    var ax = cx + rad * Math.cos(arrowAngle);
                                    var ay = cy + rad * Math.sin(arrowAngle);
                                    var tangentAngle = arrowAngle + Math.PI / 2; // CCW tangent
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.moveTo(ax + 6 * Math.cos(tangentAngle), ay + 6 * Math.sin(tangentAngle));
                                    ctx.lineTo(ax + 6 * Math.cos(tangentAngle - 2.5), ay + 6 * Math.sin(tangentAngle - 2.5));
                                    ctx.lineTo(ax + 6 * Math.cos(tangentAngle + 2.5), ay + 6 * Math.sin(tangentAngle + 2.5));
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                viz.screenText('I (out of page)', cx, cy - 28, viz.colors.green, 11);
                                viz.screenText('B lines form concentric circles (right-hand rule)', W / 2, H - 30, viz.colors.text, 12);
                                viz.screenText('Field weakens with distance: B = \u03BC\u2080I / (2\u03C0r)', W / 2, H - 12, viz.colors.teal, 11);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What are the two main sources of magnetic fields?',
                    hint: 'Think about what all sources have in common: charge in motion.',
                    solution: 'Magnetic fields are created by (1) permanent magnets (which arise from aligned magnetic domains, ultimately due to electron spin and orbital motion) and (2) electric currents (moving charges). Both involve charge in motion at the fundamental level.'
                },
                {
                    question: 'Why do magnetic field lines never cross?',
                    hint: 'What would it mean physically if two field lines crossed at a point?',
                    solution: 'If two field lines crossed, the magnetic field would have two different directions at that point, which is physically impossible. The field vector at any point has a unique direction and magnitude.'
                },
                {
                    question: 'A compass needle placed near a bar magnet aligns itself along a field line. If the north pole of the compass points to the right, what is the direction of the magnetic field at that location?',
                    hint: 'The north pole of a compass points in the direction of the external B field.',
                    solution: 'The magnetic field points to the right at that location. A compass needle aligns with its north pole pointing in the direction of the local magnetic field B.'
                },
                {
                    question: 'The magnetic field of the Earth is approximately 5 x 10\u207B\u2075 T. An MRI machine produces a field of 1.5 T. How many times stronger is the MRI field?',
                    hint: 'Divide the MRI field by the Earth field.',
                    solution: '1.5 / (5 x 10\u207B\u2075) = 3 x 10\u2074 = 30,000 times stronger.'
                },
                {
                    question: 'Explain why magnetic field lines form closed loops, unlike electric field lines which can start and end on charges.',
                    hint: 'This is related to the absence of magnetic monopoles.',
                    solution: 'Electric field lines start on positive charges and end on negative charges. Magnetic field lines form closed loops because there are no magnetic monopoles (isolated north or south poles do not exist). Every magnet has both a north and south pole, so field lines exiting the north pole must re-enter through the south pole and continue through the magnet interior.'
                }
            ]
        },

        // ===== SECTION 2: Force on a Moving Charge =====
        {
            id: 'ch11-sec02',
            title: 'Force on a Moving Charge',
            content: `<h2>Force on a Moving Charge</h2>
<p class="section-roadmap"><em>In this section, you will learn how a magnetic field exerts a force on a moving charged particle, and how this causes the particle to follow a circular path.</em></p>

<h3>The Lorentz Force</h3>
<p>When a charged particle moves through a magnetic field, it experiences a force perpendicular to both its velocity and the field. This is the <strong>magnetic Lorentz force</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition (Magnetic Force on a Charge)</div>
<div class="env-body"><p>The magnetic force on a charge \\(q\\) moving with velocity \\(v\\) at angle \\(\\theta\\) to the magnetic field \\(B\\) is:</p>
<p>\\[ F = qvB\\sin\\theta \\]</p>
<p>The direction is given by the <strong>right-hand rule</strong>: point your fingers in the direction of \\(\\vec{v}\\), curl them toward \\(\\vec{B}\\), and your thumb points in the direction of \\(\\vec{F}\\) (for a positive charge).</p></div>
</div>

<div class="env-block warning">
<div class="env-title">Key Properties of the Magnetic Force</div>
<div class="env-body">
<ul>
<li>The force is always <strong>perpendicular</strong> to the velocity. Therefore, the magnetic force does <strong>no work</strong> on the charge and cannot change its speed, only its direction.</li>
<li>If \\(\\vec{v}\\) is parallel to \\(\\vec{B}\\) (\\(\\theta = 0\\) or \\(180^\\circ\\)), then \\(F = 0\\). The charge passes through undeflected.</li>
<li>If \\(\\vec{v}\\) is perpendicular to \\(\\vec{B}\\) (\\(\\theta = 90^\\circ\\)), the force is maximum: \\(F = qvB\\).</li>
</ul>
</div>
</div>

<h3>Circular Motion in a Magnetic Field</h3>
<p>When a charged particle moves perpendicular to a uniform magnetic field, the magnetic force provides a centripetal force, causing the particle to move in a circle.</p>

<div class="env-block theorem">
<div class="env-title">Radius of Circular Motion</div>
<div class="env-body"><p>Setting the magnetic force equal to the centripetal force:</p>
<p>\\[ qvB = \\frac{mv^2}{r} \\]</p>
<p>Solving for the radius:</p>
<p>\\[ r = \\frac{mv}{qB} \\]</p>
<p>The <strong>period</strong> of the circular motion is:</p>
<p>\\[ T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB} \\]</p>
<p>Remarkably, the period is independent of the speed! This is the basis of the cyclotron.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A proton (\\(m = 1.67 \\times 10^{-27}\\,\\text{kg}\\), \\(q = 1.6 \\times 10^{-19}\\,\\text{C}\\)) moves at \\(v = 3 \\times 10^6\\,\\text{m/s}\\) perpendicular to a field \\(B = 0.5\\,\\text{T}\\).</p>
<p>\\[ r = \\frac{mv}{qB} = \\frac{1.67 \\times 10^{-27} \\times 3 \\times 10^6}{1.6 \\times 10^{-19} \\times 0.5} = 0.063\\,\\text{m} = 6.3\\,\\text{cm} \\]</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-lorentz-force"></div>

<div class="env-block intuition">
<div class="env-title">Why No Work?</div>
<div class="env-body"><p>Since the magnetic force is always perpendicular to the velocity, the dot product \\(\\vec{F} \\cdot \\vec{v} = 0\\), so no work is done. The particle's kinetic energy stays constant; only its direction changes. This is fundamentally different from the electric force, which can speed up or slow down a charge.</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-lorentz-force',
                    title: 'Charged Particle in a Magnetic Field',
                    description: 'Watch a charged particle trace a circular path in a uniform magnetic field. Adjust the charge, velocity, and field strength to see how the radius changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 420, originX: 350, originY: 210, scale: 30});
                        var ctx = viz.ctx;
                        var B = 0.5;
                        var v0 = 3.0;
                        var chargeSign = 1;
                        var mass = 1.0;

                        VizEngine.createSlider(controls, 'Speed v (units)', 1, 6, 3, 0.5, function(v) { v0 = v; });
                        VizEngine.createSlider(controls, 'B field (T)', 0.2, 2, 0.5, 0.1, function(v) { B = v; });
                        VizEngine.createSlider(controls, 'Mass (units)', 0.5, 3, 1, 0.5, function(v) { mass = v; });
                        VizEngine.createButton(controls, 'Positive Charge', function() { chargeSign = 1; });
                        VizEngine.createButton(controls, 'Negative Charge', function() { chargeSign = -1; });

                        function draw(t) {
                            viz.clear();
                            viz.drawGrid();

                            var W = viz.width, H = viz.height;

                            // B field indicators (into page)
                            ctx.fillStyle = viz.colors.purple + '44';
                            for (var gx = 30; gx < W; gx += 50) {
                                for (var gy = 30; gy < H - 60; gy += 50) {
                                    ctx.beginPath();
                                    ctx.arc(gx, gy, 2, 0, Math.PI * 2);
                                    ctx.fill();
                                    // X marks for B into page
                                    ctx.strokeStyle = viz.colors.purple + '33';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(gx - 4, gy - 4);
                                    ctx.lineTo(gx + 4, gy + 4);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(gx + 4, gy - 4);
                                    ctx.lineTo(gx - 4, gy + 4);
                                    ctx.stroke();
                                }
                            }

                            // Circular path
                            var q = chargeSign;
                            var r = mass * v0 / (Math.abs(q) * B);
                            var omega = v0 / r;
                            var period = 2 * Math.PI / omega;

                            // Center of circular path
                            var cx = 0;
                            var cy = q > 0 ? -r : r; // deflection direction depends on charge sign

                            var angle = omega * t * 0.001 * q;
                            var startAngle = q > 0 ? Math.PI / 2 : -Math.PI / 2;
                            var currentAngle = startAngle + angle;

                            // Particle position
                            var px = cx + r * Math.cos(currentAngle);
                            var py = cy + r * Math.sin(currentAngle);

                            // Draw circular trajectory (dashed)
                            ctx.strokeStyle = viz.colors.teal + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            var scrCenter = viz.toScreen(cx, cy);
                            ctx.beginPath();
                            ctx.arc(scrCenter[0], scrCenter[1], r * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw trail
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var trailSteps = 60;
                            for (var i = 0; i <= trailSteps; i++) {
                                var ta = startAngle + (angle * i / trailSteps);
                                var tx = cx + r * Math.cos(ta);
                                var ty2 = cy + r * Math.sin(ta);
                                var sp = viz.toScreen(tx, ty2);
                                if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Velocity vector (tangent)
                            var vx = -v0 * Math.sin(currentAngle) * q;
                            var vy = v0 * Math.cos(currentAngle) * q;
                            var vScale = 0.4;
                            viz.drawVector(px, py, px + vx * vScale, py + vy * vScale, viz.colors.green, 'v', 2);

                            // Force vector (toward center)
                            var fx = (cx - px);
                            var fy = (cy - py);
                            var fLen = Math.sqrt(fx * fx + fy * fy);
                            if (fLen > 0.01) {
                                fx = fx / fLen * v0 * 0.3;
                                fy = fy / fLen * v0 * 0.3;
                                viz.drawVector(px, py, px + fx, py + fy, viz.colors.red, 'F', 2);
                            }

                            // Draw particle
                            var sp = viz.toScreen(px, py);
                            ctx.fillStyle = q > 0 ? viz.colors.red : viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], 8, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(q > 0 ? '+' : '\u2212', sp[0], sp[1]);

                            // Info panel
                            viz.screenText('B = ' + B.toFixed(1) + ' T (into page)', W / 2, H - 65, viz.colors.purple, 13);
                            viz.screenText('r = mv/(qB) = ' + r.toFixed(2) + ' units', W / 2, H - 45, viz.colors.teal, 13);
                            viz.screenText('T = 2\u03C0m/(qB) = ' + period.toFixed(2) + ' s', W / 2, H - 25, viz.colors.orange, 13);
                            viz.screenText('v = ' + v0.toFixed(1) + '  |  q = ' + (q > 0 ? '+1' : '-1') + '  |  m = ' + mass.toFixed(1), W / 2, H - 5, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A proton moves at 2 x 10\u2076 m/s perpendicular to a 0.3 T magnetic field. What force does it experience?',
                    hint: 'Use F = qvB with q = 1.6 x 10\u207B\u00B9\u2079 C and sin(90) = 1.',
                    solution: 'F = qvB = (1.6 x 10\u207B\u00B9\u2079)(2 x 10\u2076)(0.3) = 9.6 x 10\u207B\u00B9\u2074 N.'
                },
                {
                    question: 'An electron moves at 5 x 10\u2076 m/s at 30 degrees to a 0.4 T field. What is the magnetic force?',
                    hint: 'Use F = qvB sin(theta). sin(30) = 0.5.',
                    solution: 'F = qvB sin(theta) = (1.6 x 10\u207B\u00B9\u2079)(5 x 10\u2076)(0.4)(0.5) = 1.6 x 10\u207B\u00B9\u2074 N.'
                },
                {
                    question: 'Why does a magnetic force do no work on a charged particle?',
                    hint: 'Think about the angle between force and displacement.',
                    solution: 'The magnetic force is always perpendicular to the velocity (and hence the displacement). Since work W = F cos(theta) x d, and theta = 90 degrees (cos 90 = 0), the work done is zero. The force changes direction but not speed.'
                },
                {
                    question: 'A particle with mass 6.64 x 10\u207B\u00B2\u2077 kg and charge 3.2 x 10\u207B\u00B9\u2079 C moves at 1.5 x 10\u2077 m/s perpendicular to a 1.2 T field. Find the radius of its circular path.',
                    hint: 'Use r = mv/(qB).',
                    solution: 'r = mv/(qB) = (6.64 x 10\u207B\u00B2\u2077)(1.5 x 10\u2077) / ((3.2 x 10\u207B\u00B9\u2079)(1.2)) = 9.96 x 10\u207B\u00B2\u2070 / (3.84 x 10\u207B\u00B9\u2079) = 0.026 m = 2.6 cm.'
                },
                {
                    question: 'Two particles with the same charge and speed enter the same magnetic field. Particle A has twice the mass of particle B. Compare their orbital radii.',
                    hint: 'Since r = mv/(qB), and q, v, B are the same...',
                    solution: 'r is proportional to m (since q, v, B are constant). So r_A = 2 r_B. The heavier particle orbits in a circle with twice the radius.'
                }
            ]
        },

        // ===== SECTION 3: Force on a Current-Carrying Wire =====
        {
            id: 'ch11-sec03',
            title: 'Force on a Current-Carrying Wire',
            content: `<h2>Force on a Current-Carrying Wire</h2>
<p class="section-roadmap"><em>In this section, you will learn how a magnetic field exerts a force on a wire carrying current, and how this principle underlies electric motors.</em></p>

<h3>From Charges to Wires</h3>
<p>Since a current is just a flow of charges, a current-carrying wire in a magnetic field also experiences a force. For a straight wire of length \\(L\\) carrying current \\(I\\) at angle \\(\\theta\\) to field \\(B\\):</p>

<div class="env-block definition">
<div class="env-title">Force on a Current-Carrying Wire</div>
<div class="env-body"><p>\\[ F = BIL\\sin\\theta \\]</p>
<p>The direction is given by the right-hand rule (or Fleming's left-hand rule): point the index finger along the current direction \\(I\\), the middle finger along \\(\\vec{B}\\), and the thumb gives the force direction \\(\\vec{F}\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A wire 0.5 m long carries 3 A perpendicular to a 0.2 T field.</p>
<p>\\[ F = BIL\\sin 90^\\circ = 0.2 \\times 3 \\times 0.5 \\times 1 = 0.3\\,\\text{N} \\]</p></div>
</div>

<h3>The Motor Effect</h3>
<p>When a current-carrying coil is placed in a magnetic field, the forces on opposite sides of the coil create a <strong>torque</strong> (turning effect). This is the principle behind the <strong>electric motor</strong>.</p>

<div class="env-block intuition">
<div class="env-title">How a Simple Motor Works</div>
<div class="env-body"><p>A rectangular coil in a magnetic field experiences forces on its two sides that are equal in magnitude but opposite in direction (because current flows in opposite directions on the two sides). These forces create a couple that rotates the coil. A <strong>commutator</strong> reverses the current direction every half turn to keep the rotation continuous.</p></div>
</div>

<h3>Torque on a Current Loop</h3>
<p>For a rectangular coil with \\(N\\) turns, area \\(A\\), carrying current \\(I\\) in field \\(B\\), the maximum torque is:</p>
<p>\\[ \\tau_{\\max} = NIAB \\]</p>
<p>The torque varies as the coil rotates: \\(\\tau = NIAB\\sin\\alpha\\), where \\(\\alpha\\) is the angle between the field and the normal to the coil.</p>

<div class="viz-placeholder" data-viz="viz-wire-force"></div>

<div class="env-block warning">
<div class="env-title">Direction Matters</div>
<div class="env-body"><p>If the current is parallel to the magnetic field (\\(\\theta = 0\\)), the force is zero. Maximum force occurs when the wire is perpendicular to the field (\\(\\theta = 90^\\circ\\)).</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-wire-force',
                    title: 'Force on a Current-Carrying Wire',
                    description: 'A wire carrying current sits in a magnetic field. Adjust the current, field, and angle to see how the force changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400});
                        var ctx = viz.ctx;
                        var current = 3;
                        var B = 0.5;
                        var angle = 90;
                        var wireLen = 0.4;

                        VizEngine.createSlider(controls, 'Current I (A)', 0.5, 10, 3, 0.5, function(v) { current = v; draw(); });
                        VizEngine.createSlider(controls, 'B field (T)', 0.1, 2, 0.5, 0.1, function(v) { B = v; draw(); });
                        VizEngine.createSlider(controls, 'Angle \u03B8 (deg)', 0, 180, 90, 5, function(v) { angle = v; draw(); });

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;
                            var thetaRad = angle * Math.PI / 180;
                            var force = B * current * wireLen * Math.sin(thetaRad);

                            viz.screenText('Force on a Current-Carrying Wire', W / 2, 20, viz.colors.white, 15);

                            // Draw B field arrows (horizontal, pointing right)
                            ctx.strokeStyle = viz.colors.purple + '44';
                            ctx.lineWidth = 1;
                            for (var row = 80; row < 300; row += 40) {
                                for (var col = 100; col < W - 50; col += 80) {
                                    ctx.beginPath();
                                    ctx.moveTo(col, row);
                                    ctx.lineTo(col + 25, row);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.purple + '44';
                                    ctx.beginPath();
                                    ctx.moveTo(col + 25, row);
                                    ctx.lineTo(col + 20, row - 3);
                                    ctx.lineTo(col + 20, row + 3);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }
                            viz.screenText('B = ' + B.toFixed(1) + ' T \u2192', W - 60, 60, viz.colors.purple, 12);

                            // Draw wire
                            var wcx = W / 2, wcy = H / 2 - 10;
                            var wLen = 160;
                            var wx1 = wcx - wLen / 2 * Math.cos(thetaRad);
                            var wy1 = wcy - wLen / 2 * Math.sin(thetaRad) * 0;
                            var wx2 = wcx + wLen / 2 * Math.cos(thetaRad);
                            var wy2 = wcy + wLen / 2 * Math.sin(thetaRad) * 0;

                            // Wire at angle to B (draw as vertical by default, rotated)
                            var wireAngle = thetaRad; // angle between wire direction and B
                            var dirX = Math.sin(wireAngle);
                            var dirY = -Math.cos(wireAngle);

                            var p1x = wcx - dirX * wLen / 2;
                            var p1y = wcy - dirY * wLen / 2;
                            var p2x = wcx + dirX * wLen / 2;
                            var p2y = wcy + dirY * wLen / 2;

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(p1x, p1y);
                            ctx.lineTo(p2x, p2y);
                            ctx.stroke();

                            // Current direction arrow
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            var midX = (p1x + p2x) / 2 + dirX * 20;
                            var midY = (p1y + p2y) / 2 + dirY * 20;
                            ctx.moveTo(midX, midY);
                            ctx.lineTo(midX - dirX * 10 - dirY * 5, midY - dirY * 10 + dirX * 5);
                            ctx.lineTo(midX - dirX * 10 + dirY * 5, midY - dirY * 10 - dirX * 5);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I = ' + current.toFixed(1) + ' A', p2x + 20, p2y, viz.colors.orange, 12, 'left');

                            // Force arrow (perpendicular to both I and B)
                            // B is horizontal (right), force is upward if I is into page (for 90 deg)
                            // F direction: for wire at angle theta, F is perpendicular to wire in the plane
                            if (force > 0.001) {
                                var forceScale = force * 200;
                                forceScale = Math.min(forceScale, 120);
                                // Force perpendicular to page plane; we show it as upward
                                var fx = wcx;
                                var fy = wcy - forceScale;
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(wcx, wcy);
                                ctx.lineTo(fx, fy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(fx, fy);
                                ctx.lineTo(fx - 6, fy + 12);
                                ctx.lineTo(fx + 6, fy + 12);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('F', fx + 15, fy, viz.colors.red, 14);
                            }

                            // Angle arc
                            if (angle > 5 && angle < 175) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                var arcR = 35;
                                // B direction is 0 radians (right), wire direction
                                var wireDir = Math.atan2(dirY, dirX);
                                ctx.arc(wcx, wcy, arcR, 0, -wireDir, wireDir > 0);
                                ctx.stroke();
                                viz.screenText('\u03B8=' + angle.toFixed(0) + '\u00B0', wcx + arcR + 20, wcy - 10, viz.colors.yellow, 11);
                            }

                            // Results
                            viz.screenText('F = BIL sin\u03B8 = ' + B.toFixed(1) + ' \u00D7 ' + current.toFixed(1) + ' \u00D7 ' + wireLen.toFixed(1) + ' \u00D7 sin(' + angle.toFixed(0) + '\u00B0)', W / 2, 330, viz.colors.text, 12);
                            viz.screenText('F = ' + force.toFixed(3) + ' N', W / 2, 360, viz.colors.green, 16);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 0.3 m wire carrying 5 A is perpendicular to a 0.8 T field. Find the force on the wire.',
                    hint: 'Use F = BIL sin(90) = BIL.',
                    solution: 'F = BIL = 0.8 x 5 x 0.3 = 1.2 N.'
                },
                {
                    question: 'A wire carrying 4 A makes a 30-degree angle with a 0.6 T field. If the wire is 0.25 m long, find the force.',
                    hint: 'Use F = BIL sin(theta). sin(30) = 0.5.',
                    solution: 'F = 0.6 x 4 x 0.25 x sin(30) = 0.6 x 4 x 0.25 x 0.5 = 0.3 N.'
                },
                {
                    question: 'A rectangular coil with 100 turns, area 0.02 m\u00B2, carries 2 A in a 0.5 T field. What is the maximum torque?',
                    hint: 'Use tau_max = NIAB.',
                    solution: 'tau_max = NIAB = 100 x 2 x 0.02 x 0.5 = 2 N m.'
                },
                {
                    question: 'In a DC motor, what is the purpose of the commutator?',
                    hint: 'Think about what happens when the coil passes through the vertical position.',
                    solution: 'The commutator reverses the direction of current in the coil every half turn. Without it, the torque would reverse direction after each 180 degrees, causing the coil to oscillate back and forth instead of rotating continuously.'
                },
                {
                    question: 'A wire lies along the x-axis carrying current in the +x direction. The magnetic field points in the +x direction. What is the force on the wire?',
                    hint: 'What is the angle between the current direction and B?',
                    solution: 'The angle between I and B is 0 degrees (both in +x direction). F = BIL sin(0) = 0. There is no force when the current is parallel to the field.'
                }
            ]
        },

        // ===== SECTION 4: Magnetic Field of Current =====
        {
            id: 'ch11-sec04',
            title: 'Magnetic Field of Current',
            content: `<h2>Magnetic Field of Current</h2>
<p class="section-roadmap"><em>In this section, you will learn how to calculate the magnetic field produced by a long straight wire and a solenoid, and understand the right-hand rule for determining field direction.</em></p>

<h3>Magnetic Field of a Long Straight Wire</h3>
<p>A long straight wire carrying current \\(I\\) produces a magnetic field that circles around the wire. At a perpendicular distance \\(r\\) from the wire:</p>

<div class="env-block definition">
<div class="env-title">Field of a Straight Wire</div>
<div class="env-body"><p>\\[ B = \\frac{\\mu_0 I}{2\\pi r} \\]</p>
<p>where \\(\\mu_0 = 4\\pi \\times 10^{-7}\\,\\text{T}\\cdot\\text{m/A}\\) is the <strong>permeability of free space</strong>. The field direction is given by the <strong>right-hand rule</strong>: wrap the right hand around the wire with the thumb pointing in the current direction, and the fingers curl in the direction of \\(\\vec{B}\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A wire carries 10 A. At a distance of 5 cm from the wire:</p>
<p>\\[ B = \\frac{4\\pi \\times 10^{-7} \\times 10}{2\\pi \\times 0.05} = \\frac{4 \\times 10^{-6}}{0.1} = 4 \\times 10^{-5}\\,\\text{T} = 40\\,\\mu\\text{T} \\]</p></div>
</div>

<h3>Magnetic Field of a Solenoid</h3>
<p>A <strong>solenoid</strong> is a coil of wire wound into a helix. Inside a long solenoid, the magnetic field is nearly uniform and parallel to the axis.</p>

<div class="env-block definition">
<div class="env-title">Field Inside a Solenoid</div>
<div class="env-body"><p>\\[ B = \\mu_0 n I \\]</p>
<p>where \\(n = N/L\\) is the number of turns per unit length, \\(N\\) is the total number of turns, and \\(L\\) is the solenoid length. The field outside is approximately zero (for an ideal solenoid).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A solenoid has 500 turns in 0.25 m and carries 2 A.</p>
<p>\\[ n = \\frac{500}{0.25} = 2000\\,\\text{turns/m} \\]</p>
<p>\\[ B = \\mu_0 n I = 4\\pi \\times 10^{-7} \\times 2000 \\times 2 = 5.03 \\times 10^{-3}\\,\\text{T} \\approx 5\\,\\text{mT} \\]</p></div>
</div>

<h3>Ampere's Law (Conceptual)</h3>
<p>Ampere's law is the magnetic analog of Gauss's law. It states that the line integral of \\(\\vec{B}\\) around any closed loop is proportional to the total current enclosed:</p>
<p>\\[ \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}} \\]</p>
<p>This law is the formal basis for deriving the solenoid and wire field formulas above.</p>

<div class="viz-placeholder" data-viz="viz-solenoid-field"></div>

<div class="env-block intuition">
<div class="env-title">Solenoid as an Electromagnet</div>
<div class="env-body"><p>A solenoid behaves like a bar magnet: one end is the north pole, the other the south pole. The field can be strengthened by increasing the current, adding more turns, or inserting a ferromagnetic core (iron). This is the principle behind electromagnets, relays, and many actuators.</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-solenoid-field',
                    title: 'Solenoid Magnetic Field',
                    description: 'See the magnetic field inside and outside a solenoid. Adjust the number of turns and current to see how the field strength changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400});
                        var ctx = viz.ctx;
                        var nTurns = 10;
                        var current = 2;

                        VizEngine.createSlider(controls, 'Turns', 4, 20, 10, 1, function(v) { nTurns = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Current I (A)', 0.5, 10, 2, 0.5, function(v) { current = v; draw(); });

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;
                            var solLeft = 150, solRight = 550, solY = H / 2;
                            var solH = 80;
                            var solLen = solRight - solLeft;
                            var n = nTurns / (solLen / 100); // turns per 100 px ~ turns per unit length
                            var B = 4 * Math.PI * 1e-7 * (nTurns / (solLen * 0.01)) * current;

                            viz.screenText('Solenoid Magnetic Field', W / 2, 20, viz.colors.white, 15);

                            // Draw solenoid coils
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            var spacing = solLen / nTurns;
                            for (var i = 0; i <= nTurns; i++) {
                                var x = solLeft + i * spacing;
                                ctx.beginPath();
                                ctx.ellipse(x, solY, 5, solH / 2, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Connect top and bottom
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(solLeft, solY - solH / 2);
                            ctx.lineTo(solRight, solY - solH / 2);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(solLeft, solY + solH / 2);
                            ctx.lineTo(solRight, solY + solH / 2);
                            ctx.stroke();

                            // Internal field lines (uniform, horizontal)
                            var nLines = 5;
                            for (var li = 0; li < nLines; li++) {
                                var ly = solY - solH / 3 + (li / (nLines - 1)) * solH * 2 / 3;
                                ctx.strokeStyle = viz.colors.teal + 'aa';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(solLeft + 10, ly);
                                ctx.lineTo(solRight - 10, ly);
                                ctx.stroke();

                                // Arrowhead
                                ctx.fillStyle = viz.colors.teal;
                                var arrowX = (solLeft + solRight) / 2 + 30;
                                ctx.beginPath();
                                ctx.moveTo(arrowX + 5, ly);
                                ctx.lineTo(arrowX - 3, ly - 4);
                                ctx.lineTo(arrowX - 3, ly + 4);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // External field lines (curved, from right end back to left)
                            var extLines = 3;
                            ctx.strokeStyle = viz.colors.teal + '55';
                            ctx.lineWidth = 1;
                            for (var ei = 0; ei < extLines; ei++) {
                                var spread = 40 + ei * 35;

                                // Top external line
                                ctx.beginPath();
                                ctx.moveTo(solRight, solY - 5 - ei * 10);
                                ctx.bezierCurveTo(
                                    solRight + spread, solY - spread - 20,
                                    solLeft - spread, solY - spread - 20,
                                    solLeft, solY - 5 - ei * 10
                                );
                                ctx.stroke();

                                // Bottom external line
                                ctx.beginPath();
                                ctx.moveTo(solRight, solY + 5 + ei * 10);
                                ctx.bezierCurveTo(
                                    solRight + spread, solY + spread + 20,
                                    solLeft - spread, solY + spread + 20,
                                    solLeft, solY + 5 + ei * 10
                                );
                                ctx.stroke();
                            }

                            // N and S labels
                            viz.screenText('N', solRight + 20, solY, viz.colors.red, 16);
                            viz.screenText('S', solLeft - 20, solY, viz.colors.blue, 16);

                            // Current direction indicators
                            viz.screenText('I \u2192', solRight + 10, solY - solH / 2 - 15, viz.colors.orange, 11);

                            // Results
                            viz.screenText('N = ' + nTurns + ' turns    L = ' + (solLen * 0.01).toFixed(2) + ' m    n = ' + (nTurns / (solLen * 0.01)).toFixed(0) + ' turns/m', W / 2, H - 55, viz.colors.text, 12);
                            viz.screenText('B = \u03BC\u2080 n I = ' + (B * 1000).toFixed(2) + ' mT', W / 2, H - 30, viz.colors.green, 15);
                            viz.screenText('Field is uniform inside, weak outside', W / 2, H - 10, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A wire carries 8 A. What is the magnetic field 10 cm from the wire?',
                    hint: 'Use B = \u03BC\u2080I/(2\u03C0r) with r = 0.1 m.',
                    solution: 'B = (4\u03C0 x 10\u207B\u2077 x 8) / (2\u03C0 x 0.1) = (4 x 10\u207B\u2077 x 8) / (0.2) = 3.2 x 10\u207B\u2076 / 0.2 = 1.6 x 10\u207B\u2075 T = 16 \u03BCT.'
                },
                {
                    question: 'A solenoid has 800 turns in 0.4 m and carries 3 A. Calculate the field inside.',
                    hint: 'n = N/L, then B = \u03BC\u2080nI.',
                    solution: 'n = 800/0.4 = 2000 turns/m. B = 4\u03C0 x 10\u207B\u2077 x 2000 x 3 = 7.54 x 10\u207B\u00B3 T = 7.54 mT.'
                },
                {
                    question: 'Two long parallel wires, 10 cm apart, carry currents of 5 A in the same direction. Is the force between them attractive or repulsive?',
                    hint: 'Use the right-hand rule to find the field direction at one wire due to the other, then find the force direction on that wire.',
                    solution: 'Parallel currents in the same direction attract each other. Wire 1 creates a field at Wire 2 that, combined with Wire 2 current direction via F = BIL, produces a force directed toward Wire 1. (Opposite currents would repel.)'
                },
                {
                    question: 'How would you double the magnetic field inside a solenoid without changing the current?',
                    hint: 'B = \u03BC\u2080nI. You can change n = N/L.',
                    solution: 'Double the number of turns per unit length n. This can be done by either doubling the total number of turns N (keeping L the same) or halving the solenoid length L (keeping N the same).'
                },
                {
                    question: 'At what distance from a wire carrying 20 A is the magnetic field equal to the Earth field (~50 \u03BCT)?',
                    hint: 'Set B = \u03BC\u2080I/(2\u03C0r) = 50 x 10\u207B\u2076 T and solve for r.',
                    solution: 'r = \u03BC\u2080I/(2\u03C0B) = (4\u03C0 x 10\u207B\u2077 x 20) / (2\u03C0 x 50 x 10\u207B\u2076) = (8\u03C0 x 10\u207B\u2076) / (100\u03C0 x 10\u207B\u2076) = 0.08 m = 8 cm.'
                }
            ]
        },

        // ===== SECTION 5: Applications of Magnetism =====
        {
            id: 'ch11-sec05',
            title: 'Applications of Magnetism',
            content: `<h2>Applications of Magnetism</h2>
<p class="section-roadmap"><em>In this section, you will explore real-world applications of magnetic forces, including the mass spectrometer, electric motors, and other electromagnetic devices.</em></p>

<h3>The Mass Spectrometer</h3>
<p>A mass spectrometer uses magnetic fields to separate ions by their mass-to-charge ratio. Ions are first accelerated through a voltage, then enter a region of uniform magnetic field where they follow circular paths.</p>

<div class="env-block definition">
<div class="env-title">Mass Spectrometer Principle</div>
<div class="env-body"><p>An ion accelerated through voltage \\(V\\) gains kinetic energy \\(qV = \\frac{1}{2}mv^2\\), giving \\(v = \\sqrt{2qV/m}\\). In the magnetic field region, it follows a semicircle of radius:</p>
<p>\\[ r = \\frac{mv}{qB} = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}} \\]</p>
<p>Heavier ions (larger \\(m\\)) curve less and land farther from the entrance. By measuring \\(r\\), we can determine \\(m/q\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A singly-charged ion (\\(q = 1.6 \\times 10^{-19}\\) C) is accelerated through 1000 V and enters a 0.5 T field. If the radius is 0.1 m, find the ion mass.</p>
<p>\\[ r = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}} \\quad\\Rightarrow\\quad m = \\frac{r^2 q B^2}{2V} \\]</p>
<p>\\[ m = \\frac{(0.1)^2 \\times 1.6 \\times 10^{-19} \\times (0.5)^2}{2 \\times 1000} = \\frac{4 \\times 10^{-22}}{2000} = 2 \\times 10^{-25}\\,\\text{kg} \\]</p></div>
</div>

<h3>Electric Motors</h3>
<p>As discussed in the previous section, an electric motor converts electrical energy to mechanical energy using the force on a current-carrying coil in a magnetic field. Key components include:</p>
<ul>
<li><strong>Permanent magnets</strong> or field coils to provide the magnetic field</li>
<li><strong>Armature</strong> (rotating coil) carrying current</li>
<li><strong>Commutator</strong> to reverse current direction each half-turn</li>
<li><strong>Brushes</strong> to maintain electrical contact with the rotating commutator</li>
</ul>

<h3>Other Applications</h3>

<div class="env-block remark">
<div class="env-title">Applications of Magnetic Forces</div>
<div class="env-body">
<ul>
<li><strong>Galvanometer</strong>: Measures small currents using the deflection of a coil in a magnetic field.</li>
<li><strong>Loudspeaker</strong>: A coil attached to a cone vibrates in a magnetic field when alternating current passes through it, producing sound.</li>
<li><strong>Magnetic levitation (Maglev) trains</strong>: Use powerful electromagnets for contactless levitation and propulsion.</li>
<li><strong>Particle accelerators</strong>: Use magnetic fields to bend charged particles into circular paths (cyclotrons, synchrotrons).</li>
<li><strong>MRI scanners</strong>: Use strong magnetic fields to align hydrogen nuclei in the body for medical imaging.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-mass-spectrometer"></div>

<div class="env-block intuition">
<div class="env-title">The Power of Electromagnetism</div>
<div class="env-body"><p>The connection between electricity and magnetism is one of the most profound in all of physics. In the next chapter, you will see how changing magnetic fields can create electric currents, completing the picture of electromagnetic induction.</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-mass-spectrometer',
                    title: 'Mass Spectrometer Simulation',
                    description: 'Ions are accelerated and enter a magnetic field region. Watch how ions of different masses curve differently. Adjust the accelerating voltage and field strength.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 420});
                        var ctx = viz.ctx;
                        var voltage = 1000;
                        var B = 0.5;

                        VizEngine.createSlider(controls, 'Voltage (V)', 200, 3000, 1000, 100, function(v) { voltage = v; });
                        VizEngine.createSlider(controls, 'B field (T)', 0.2, 1.5, 0.5, 0.1, function(v) { B = v; });

                        // Ion types (mass in atomic mass units, charge in e)
                        var ions = [
                            {name: 'H\u207A', mass: 1, charge: 1, color: '#58a6ff'},
                            {name: 'C\u207A', mass: 12, charge: 1, color: '#3fb950'},
                            {name: 'O\u207A', mass: 16, charge: 1, color: '#f0883e'}
                        ];
                        var amu = 1.66e-27;
                        var e = 1.6e-19;

                        function draw(t) {
                            viz.clear();
                            var W = viz.width, H = viz.height;

                            viz.screenText('Mass Spectrometer', W / 2, 15, viz.colors.white, 15);

                            // Acceleration region
                            var accLeft = 40, accRight = 160;
                            var entryY = H / 2 + 60;

                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(accLeft, entryY - 60, accRight - accLeft, 120);
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(accLeft, entryY - 60, accRight - accLeft, 120);

                            viz.screenText('Accelerator', (accLeft + accRight) / 2, entryY - 70, viz.colors.yellow, 11);
                            viz.screenText(voltage.toFixed(0) + ' V', (accLeft + accRight) / 2, entryY + 75, viz.colors.yellow, 11);

                            // Slit
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillRect(accRight, entryY - 60, 4, 50);
                            ctx.fillRect(accRight, entryY + 10, 4, 50);
                            viz.screenText('slit', accRight + 2, entryY - 65, viz.colors.text, 9);

                            // Magnetic field region
                            var fieldLeft = accRight + 10;
                            ctx.fillStyle = viz.colors.purple + '11';
                            ctx.fillRect(fieldLeft, 30, W - fieldLeft - 10, H - 60);
                            ctx.strokeStyle = viz.colors.purple + '44';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(fieldLeft, 30, W - fieldLeft - 10, H - 60);

                            // B field indicators (x marks, into page)
                            for (var gx = fieldLeft + 25; gx < W - 20; gx += 45) {
                                for (var gy = 50; gy < H - 30; gy += 45) {
                                    ctx.strokeStyle = viz.colors.purple + '33';
                                    ctx.lineWidth = 0.7;
                                    ctx.beginPath();
                                    ctx.moveTo(gx - 3, gy - 3);
                                    ctx.lineTo(gx + 3, gy + 3);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(gx + 3, gy - 3);
                                    ctx.lineTo(gx - 3, gy + 3);
                                    ctx.stroke();
                                }
                            }
                            viz.screenText('B = ' + B.toFixed(1) + ' T (into page)', W - 100, 45, viz.colors.purple, 11);

                            // Detector plate
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(fieldLeft + 10, entryY);
                            ctx.lineTo(W - 20, entryY);
                            ctx.stroke();
                            viz.screenText('Detector', W - 60, entryY + 15, viz.colors.text, 10);

                            // Draw ion paths (semicircles)
                            var time = t * 0.001;
                            for (var i = 0; i < ions.length; i++) {
                                var ion = ions[i];
                                var m = ion.mass * amu;
                                var q = ion.charge * e;
                                var v = Math.sqrt(2 * q * voltage / m);
                                var r = m * v / (q * B);
                                var rPx = r * 3000; // scale to pixels

                                // Semicircle from entry point curving upward
                                var cx_path = fieldLeft + 10;
                                var cy_path = entryY;
                                var centerX = cx_path;
                                var centerY = cy_path - rPx;

                                ctx.strokeStyle = ion.color;
                                ctx.lineWidth = 2;

                                // Animate: draw arc progressively
                                var maxAngle = Math.PI;
                                var currentAngle = Math.min(maxAngle, (time * 2) % (maxAngle + 1));

                                ctx.beginPath();
                                ctx.arc(centerX, centerY, rPx, Math.PI / 2, Math.PI / 2 + currentAngle);
                                ctx.stroke();

                                // Landing position
                                var landX = centerX + 2 * rPx;
                                if (landX < W - 10 && currentAngle >= maxAngle) {
                                    // Landing marker
                                    ctx.fillStyle = ion.color;
                                    ctx.beginPath();
                                    ctx.arc(landX, entryY, 5, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText(ion.name, landX, entryY + 20, ion.color, 11);
                                }

                                // Particle on path
                                var px2 = centerX + rPx * Math.cos(Math.PI / 2 + currentAngle);
                                var py2 = centerY + rPx * Math.sin(Math.PI / 2 + currentAngle);
                                ctx.fillStyle = ion.color;
                                ctx.beginPath();
                                ctx.arc(px2, py2, 4, 0, Math.PI * 2);
                                ctx.fill();

                                // Legend
                                viz.screenText(ion.name + ': r = ' + (rPx / 3000 * 100).toFixed(1) + ' cm', 80, 50 + i * 20, ion.color, 11, 'left');
                            }

                            viz.screenText('Heavier ions curve less (larger radius)', W / 2, H - 10, viz.colors.text, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a mass spectrometer, ions are accelerated through 2000 V. A singly-charged ion (q = 1.6 x 10\u207B\u00B9\u2079 C) with mass 3.82 x 10\u207B\u00B2\u2076 kg enters a 0.8 T field. Find the radius of its path.',
                    hint: 'First find v from qV = (1/2)mv\u00B2, then use r = mv/(qB).',
                    solution: 'v = sqrt(2qV/m) = sqrt(2 x 1.6e-19 x 2000 / 3.82e-26) = sqrt(1.675e7) = 4094 m/s. r = mv/(qB) = 3.82e-26 x 4094 / (1.6e-19 x 0.8) = 1.564e-22 / 1.28e-19 = 1.22 x 10\u207B\u00B3 m = 1.22 mm.'
                },
                {
                    question: 'Two isotopes of an element have masses 20 u and 22 u (1 u = 1.66 x 10\u207B\u00B2\u2077 kg). Both are singly charged and accelerated through the same voltage. What is the ratio of their radii in the mass spectrometer?',
                    hint: 'Since r is proportional to sqrt(m) (when q, V, B are the same)...',
                    solution: 'r is proportional to sqrt(m). So r1/r2 = sqrt(m1/m2) = sqrt(20/22) = sqrt(10/11) = 0.953. The lighter isotope has a radius about 95.3% of the heavier one.'
                },
                {
                    question: 'Explain how an MRI machine uses magnetic fields.',
                    hint: 'Think about hydrogen nuclei (protons) in the body.',
                    solution: 'An MRI machine uses a strong uniform magnetic field (1.5-3 T) to align the nuclear spins of hydrogen atoms in the body. Radio pulses then tip these spins out of alignment. As they relax back, they emit radio signals that depend on the tissue type. A computer processes these signals to create detailed images of soft tissues.'
                },
                {
                    question: 'In a cyclotron, the period of revolution is independent of the particle speed. Explain why this property is useful.',
                    hint: 'T = 2\u03C0m/(qB) does not depend on v or r.',
                    solution: 'Since T is independent of speed, the alternating electric field used to accelerate the particle can operate at a fixed frequency. As the particle speeds up, it spirals to larger radii but always takes the same time per half-revolution, staying in sync with the accelerating voltage. This makes the cyclotron design simple and effective.'
                },
                {
                    question: 'A loudspeaker uses a coil of 50 turns, each carrying 0.1 A, in a field of 0.3 T. If each turn is 3 cm long within the field, find the total force on the coil.',
                    hint: 'F on each turn = BIL. Total F = N x BIL.',
                    solution: 'F per turn = BIL = 0.3 x 0.1 x 0.03 = 9 x 10\u207B\u2074 N. Total force = 50 x 9 x 10\u207B\u2074 = 0.045 N = 45 mN.'
                }
            ]
        }
    ]
});
