window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Electrostatics',
    subtitle: 'The World of Electric Charges and Fields',
    sections: [
        // ===== SECTION 1: Electric Charge and Coulomb's Law =====
        {
            id: 'coulombs-law',
            title: "Electric Charge and Coulomb's Law",
            content: `
                <h2>Electric Charge: The Source of Electromagnetic Phenomena</h2>

                <div class="env-block intuition">
                    <div class="env-title">Charges Are Everywhere</div>
                    <div class="env-body"><p>Everything around you is made of atoms, and atoms contain electric charges. Protons carry positive charge and electrons carry negative charge. Most matter is electrically neutral because the positive and negative charges balance. But when the balance is disturbed (by rubbing a balloon on your hair, for instance), fascinating electric phenomena emerge.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Electric Charge</div>
                    <div class="env-body">
                        <p>Electric charge is a fundamental property of matter. The SI unit of charge is the <strong>coulomb</strong> (C). The elementary charge is:</p>
                        \\[ e = 1.6 \\times 10^{-19}\\,\\text{C} \\]
                        <p>A proton carries charge \\(+e\\) and an electron carries charge \\(-e\\). Charge is <strong>quantized</strong> (always appears in integer multiples of \\(e\\)) and <strong>conserved</strong> (the total charge in an isolated system never changes).</p>
                    </div>
                </div>

                <p>Two key rules govern how charges interact:</p>
                <ul>
                    <li><strong>Like charges repel</strong>: two positive charges (or two negative charges) push each other apart.</li>
                    <li><strong>Unlike charges attract</strong>: a positive and a negative charge pull each other together.</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Coulomb's Law</div>
                    <div class="env-body">
                        <p>The electrostatic force between two point charges \\(q_1\\) and \\(q_2\\) separated by distance \\(r\\) is:</p>
                        \\[ F = k\\frac{|q_1 q_2|}{r^2} \\]
                        <p>where \\(k = 8.99 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2\\) is Coulomb's constant. The force is attractive if the charges have opposite signs and repulsive if they have the same sign.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Inverse-Square Law</div>
                    <div class="env-body"><p>Coulomb's law has the same mathematical form as Newton's law of gravitation: both are inverse-square laws. However, the electric force can be attractive or repulsive (gravity is always attractive), and for subatomic particles the electric force is enormously stronger than gravity.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Two Point Charges</div>
                    <div class="env-body">
                        <p>Two charges, \\(q_1 = +3\\,\\mu\\text{C}\\) and \\(q_2 = -5\\,\\mu\\text{C}\\), are separated by 0.2 m. Find the magnitude of the force between them.</p>
                        \\[ F = k\\frac{|q_1 q_2|}{r^2} = 8.99 \\times 10^9 \\times \\frac{3 \\times 10^{-6} \\times 5 \\times 10^{-6}}{0.04} \\]
                        \\[ F = 8.99 \\times 10^9 \\times \\frac{15 \\times 10^{-12}}{0.04} = 8.99 \\times 10^9 \\times 3.75 \\times 10^{-10} \\approx 3.37\\,\\text{N} \\]
                        <p>The force is attractive (charges have opposite signs).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-coulomb-force"></div>

                <p>In the interactive visualization above, drag the charges to change their separation and use the sliders to adjust charge magnitudes. Watch how the force changes with distance and charge.</p>

                <div class="env-block warning">
                    <div class="env-title">Point Charges Only</div>
                    <div class="env-body"><p>Coulomb's law in this form applies to <em>point charges</em> or to spherical charge distributions (treating them as if all charge is at the center). For extended or irregular charge distributions, the calculation is more complex.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-coulomb-force',
                    title: "Coulomb's Law Interactive",
                    description: 'Drag charges to change separation. Adjust charge magnitudes and observe how the electrostatic force changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 40, originX: 350, originY: 190 });
                        var q1 = 3;
                        var q2 = -2;
                        var k = 9;
                        var charge1 = viz.addDraggable('q1', -3, 0, viz.colors.red, 10);
                        var charge2 = viz.addDraggable('q2', 3, 0, viz.colors.blue, 10);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var x1 = charge1.x, y1 = charge1.y;
                            var x2 = charge2.x, y2 = charge2.y;
                            var dx = x2 - x1, dy = y2 - y1;
                            var r = Math.sqrt(dx * dx + dy * dy);
                            if (r < 0.3) r = 0.3;

                            var F = k * Math.abs(q1 * q2) / (r * r);
                            var attractive = (q1 > 0 && q2 < 0) || (q1 < 0 && q2 > 0);

                            // Draw charges
                            viz.drawCharge(x1, y1, q1 > 0 ? 1 : -1, null, 16);
                            viz.drawCharge(x2, y2, q2 > 0 ? 1 : -1, null, 16);

                            // Labels
                            viz.drawText('q1=' + q1.toFixed(1) + ' \u03BCC', x1, y1 + 1.2, viz.colors.white, 12);
                            viz.drawText('q2=' + q2.toFixed(1) + ' \u03BCC', x2, y2 + 1.2, viz.colors.white, 12);

                            // Force arrows
                            var ux = dx / r, uy = dy / r;
                            var fScale = Math.min(F * 0.15, 2.5);

                            if (attractive) {
                                viz.drawVector(x1, y1, x1 + ux * fScale, y1 + uy * fScale, viz.colors.orange, 'F', 2.5);
                                viz.drawVector(x2, y2, x2 - ux * fScale, y2 - uy * fScale, viz.colors.orange, 'F', 2.5);
                            } else {
                                viz.drawVector(x1, y1, x1 - ux * fScale, y1 - uy * fScale, viz.colors.orange, 'F', 2.5);
                                viz.drawVector(x2, y2, x2 + ux * fScale, y2 + uy * fScale, viz.colors.orange, 'F', 2.5);
                            }

                            // Distance line
                            viz.drawSegment(x1, y1 - 1.5, x2, y2 - 1.5, viz.colors.text, 1, true);
                            viz.drawText('r = ' + r.toFixed(2) + ' m', (x1 + x2) / 2, (y1 + y2) / 2 - 2, viz.colors.text, 12);

                            // Info
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('F = k|q1 q2|/r\u00B2', 20, 25);
                            ctx.fillText('F = ' + F.toFixed(2) + ' N', 20, 48);
                            ctx.fillStyle = attractive ? viz.colors.teal : viz.colors.red;
                            ctx.fillText(attractive ? 'Attractive (opposite signs)' : 'Repulsive (same signs)', 20, 71);

                            viz.drawDraggables();
                        }

                        draw();
                        viz.animate(function() { draw(); });

                        VizEngine.createSlider(controls, 'q1 (\u03BCC)', -5, 5, 3, 0.5, function(val) {
                            q1 = val;
                        });
                        VizEngine.createSlider(controls, 'q2 (\u03BCC)', -5, 5, -2, 0.5, function(val) {
                            q2 = val;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two identical charges of +4 \u03BCC are 0.5 m apart. Calculate the electrostatic force between them. Is it attractive or repulsive?',
                    hint: 'Use F = k|q1 q2|/r^2 with k = 9 x 10^9 N m^2/C^2.',
                    solution: 'F = (9 x 10^9)(4 x 10^-6)(4 x 10^-6) / (0.5)^2 = (9 x 10^9)(16 x 10^-12) / 0.25 = 0.576 N. The force is repulsive because both charges are positive.'
                },
                {
                    question: 'If the distance between two charges is tripled, by what factor does the Coulomb force change?',
                    hint: 'The force depends on 1/r^2.',
                    solution: 'Since F is proportional to 1/r^2, tripling r gives F_new = F / 3^2 = F / 9. The force decreases by a factor of 9.'
                },
                {
                    question: 'How many electrons are needed to make up a charge of -1 C?',
                    hint: 'Each electron has charge e = 1.6 x 10^-19 C.',
                    solution: 'Number of electrons = 1 / (1.6 x 10^-19) = 6.25 x 10^18 electrons.'
                },
                {
                    question: 'A charge of +2 \u03BCC is placed 0.3 m from a charge of -6 \u03BCC. Find the force magnitude and direction on each charge.',
                    hint: 'Calculate F, then recall that unlike charges attract.',
                    solution: 'F = (9 x 10^9)(2 x 10^-6)(6 x 10^-6) / (0.3)^2 = (9 x 10^9)(12 x 10^-12) / 0.09 = 1.2 N. The charges attract: each charge experiences a 1.2 N force directed toward the other charge.'
                },
                {
                    question: 'Three charges are placed on a line: q1 = +1 \u03BCC at x = 0, q2 = -2 \u03BCC at x = 0.1 m, and q3 = +1 \u03BCC at x = 0.3 m. Find the net force on q2.',
                    hint: 'Calculate the force on q2 from q1 and from q3 separately, paying attention to direction, then add them.',
                    solution: 'Force from q1 on q2: F_12 = k(1)(2) x 10^-12 / (0.1)^2 = 1.8 N toward q1 (attraction, so in -x direction). Force from q3 on q2: F_32 = k(2)(1) x 10^-12 / (0.2)^2 = 0.45 N toward q3 (attraction, so in +x direction). Net force = 1.8 - 0.45 = 1.35 N in the -x direction (toward q1).'
                }
            ]
        },

        // ===== SECTION 2: Electric Field =====
        {
            id: 'electric-field',
            title: 'Electric Field',
            content: `
                <h2>The Electric Field: Force Per Unit Charge</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Do We Need Fields?</div>
                    <div class="env-body"><p>Instead of thinking about "action at a distance" between charges, physicists prefer to say that a charge creates an <strong>electric field</strong> everywhere in space, and another charge placed in that field experiences a force. The field is a property of space itself, existing whether or not a test charge is present to feel it.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Electric Field</div>
                    <div class="env-body">
                        <p>The electric field \\(\\vec{E}\\) at a point in space is defined as the force per unit positive test charge placed at that point:</p>
                        \\[ \\vec{E} = \\frac{\\vec{F}}{q_0} \\]
                        <p>The SI unit is newtons per coulomb (N/C) or equivalently volts per meter (V/m).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Electric Field of a Point Charge</div>
                    <div class="env-body">
                        <p>A point charge \\(Q\\) creates an electric field at distance \\(r\\) with magnitude:</p>
                        \\[ E = k\\frac{|Q|}{r^2} \\]
                        <p>The field points <strong>away</strong> from a positive charge and <strong>toward</strong> a negative charge.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Superposition Principle</div>
                    <div class="env-body">
                        <p>When multiple charges are present, the total electric field at any point is the <strong>vector sum</strong> of the fields due to each individual charge:</p>
                        \\[ \\vec{E}_{\\text{total}} = \\vec{E}_1 + \\vec{E}_2 + \\vec{E}_3 + \\cdots \\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Field from a Single Charge</div>
                    <div class="env-body">
                        <p>A charge \\(Q = +5\\,\\mu\\text{C}\\) is at the origin. Find the electric field at a point 0.3 m to the right.</p>
                        \\[ E = k\\frac{Q}{r^2} = 9 \\times 10^9 \\times \\frac{5 \\times 10^{-6}}{0.09} = 5 \\times 10^5\\,\\text{N/C} \\]
                        <p>The field points to the right (away from the positive charge).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-efield-point"></div>

                <p>The visualization above shows the electric field vectors around one or two point charges. Drag the charges to see how the field pattern changes. Toggle between single and two-charge configurations.</p>

                <div class="env-block warning">
                    <div class="env-title">Test Charge Must Be Small</div>
                    <div class="env-body"><p>The "test charge" used to define the field must be small enough that it does not disturb the charge distribution creating the field. In practice, we use the concept of the field itself, without needing to physically place a test charge.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-efield-point',
                    title: 'Electric Field from Point Charges',
                    description: 'Visualize the electric field vectors around point charges. Drag charges to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 40, originX: 350, originY: 200 });
                        var q1Val = 3;
                        var q2Val = -3;
                        var showTwo = false;
                        var charge1 = viz.addDraggable('c1', -2, 0, viz.colors.red, 10);
                        var charge2 = viz.addDraggable('c2', 2, 0, viz.colors.blue, 10);

                        function draw() {
                            viz.clear();

                            var charges = [{ x: charge1.x, y: charge1.y, q: q1Val }];
                            if (showTwo) {
                                charges.push({ x: charge2.x, y: charge2.y, q: q2Val });
                            }

                            // Draw field vectors on a grid
                            var spacing = 1;
                            var xMin = -7, xMax = 7, yMin = -4, yMax = 4;

                            for (var gx = xMin; gx <= xMax; gx += spacing) {
                                for (var gy = yMin; gy <= yMax; gy += spacing) {
                                    var Ex = 0, Ey = 0;
                                    var tooClose = false;
                                    for (var ci = 0; ci < charges.length; ci++) {
                                        var dx = gx - charges[ci].x;
                                        var dy = gy - charges[ci].y;
                                        var rr = Math.sqrt(dx * dx + dy * dy);
                                        if (rr < 0.5) { tooClose = true; break; }
                                        var E = charges[ci].q / (rr * rr);
                                        Ex += E * dx / rr;
                                        Ey += E * dy / rr;
                                    }
                                    if (tooClose) continue;

                                    var mag = Math.sqrt(Ex * Ex + Ey * Ey);
                                    if (mag < 0.01) continue;
                                    var arrowLen = Math.min(mag * 0.08, 0.4);
                                    var ux = Ex / mag, uy = Ey / mag;

                                    var sx1 = gx - ux * arrowLen * 0.5;
                                    var sy1 = gy - uy * arrowLen * 0.5;
                                    var sx2 = gx + ux * arrowLen * 0.5;
                                    var sy2 = gy + uy * arrowLen * 0.5;

                                    var alpha = Math.min(mag * 0.3, 1);
                                    var ctx = viz.ctx;
                                    var p1 = viz.toScreen(sx1, sy1);
                                    var p2 = viz.toScreen(sx2, sy2);
                                    ctx.strokeStyle = 'rgba(88,166,255,' + alpha.toFixed(2) + ')';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(p1[0], p1[1]);
                                    ctx.lineTo(p2[0], p2[1]);
                                    ctx.stroke();

                                    // Small arrowhead
                                    var angle = Math.atan2(-(sy2 - sy1), sx2 - sx1);
                                    var headLen = 4;
                                    ctx.fillStyle = 'rgba(88,166,255,' + alpha.toFixed(2) + ')';
                                    ctx.beginPath();
                                    ctx.moveTo(p2[0], p2[1]);
                                    ctx.lineTo(p2[0] - headLen * Math.cos(angle - 0.5), p2[1] + headLen * Math.sin(angle - 0.5));
                                    ctx.lineTo(p2[0] - headLen * Math.cos(angle + 0.5), p2[1] + headLen * Math.sin(angle + 0.5));
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Draw charges
                            viz.drawCharge(charge1.x, charge1.y, q1Val > 0 ? 1 : -1, null, 14);
                            if (showTwo) {
                                viz.drawCharge(charge2.x, charge2.y, q2Val > 0 ? 1 : -1, null, 14);
                            }

                            viz.drawDraggables();

                            // Labels
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('q1 = ' + q1Val.toFixed(1) + ' \u03BCC', 20, 20);
                            if (showTwo) {
                                ctx.fillText('q2 = ' + q2Val.toFixed(1) + ' \u03BCC', 20, 40);
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Arrows show E field direction and relative strength', 20, 380);
                        }

                        draw();
                        viz.animate(function() { draw(); });

                        VizEngine.createSlider(controls, 'q1 (\u03BCC)', -5, 5, 3, 0.5, function(val) {
                            q1Val = val;
                        });
                        VizEngine.createSlider(controls, 'q2 (\u03BCC)', -5, 5, -3, 0.5, function(val) {
                            q2Val = val;
                        });
                        VizEngine.createButton(controls, 'Toggle Two Charges', function() {
                            showTwo = !showTwo;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A charge of +8 \u03BCC creates an electric field. What is the field strength at a distance of 0.4 m from the charge?',
                    hint: 'Use E = kQ/r^2.',
                    solution: 'E = (9 x 10^9)(8 x 10^-6) / (0.4)^2 = 72,000 / 0.16 = 450,000 N/C = 4.5 x 10^5 N/C.'
                },
                {
                    question: 'An electron (charge -1.6 x 10^-19 C) is in a uniform electric field of 200 N/C pointing east. What is the force on the electron? In what direction?',
                    hint: 'F = qE. The electron has negative charge.',
                    solution: 'F = qE = (1.6 x 10^-19)(200) = 3.2 x 10^-17 N. Since the electron is negative, the force is in the direction opposite to E, i.e., westward.'
                },
                {
                    question: 'Two charges +Q and +Q are placed at equal distances on either side of a point P. What is the electric field at P?',
                    hint: 'Consider the symmetry. Each charge produces a field at P in what direction?',
                    solution: 'The two fields at P point in opposite directions (each away from its source charge, so one points left and the other right). Since the charges and distances are equal, the magnitudes are equal. The fields cancel: E_total = 0 at P.'
                },
                {
                    question: 'A proton (mass 1.67 x 10^-27 kg, charge +1.6 x 10^-19 C) is placed in a uniform electric field of 500 N/C. What is its acceleration?',
                    hint: 'Find the force using F = qE, then use a = F/m.',
                    solution: 'F = qE = (1.6 x 10^-19)(500) = 8 x 10^-17 N. a = F/m = (8 x 10^-17) / (1.67 x 10^-27) = 4.79 x 10^10 m/s^2. The proton accelerates in the direction of the field.'
                },
                {
                    question: 'At what distance from a +10 \u03BCC charge is the electric field strength equal to 1000 N/C?',
                    hint: 'Rearrange E = kQ/r^2 to solve for r.',
                    solution: 'r^2 = kQ/E = (9 x 10^9)(10 x 10^-6) / 1000 = 90. So r = sqrt(90) = 9.49 m (approximately 9.5 m).'
                }
            ]
        },

        // ===== SECTION 3: Electric Field Lines =====
        {
            id: 'field-lines',
            title: 'Electric Field Lines',
            content: `
                <h2>Visualizing the Invisible Field</h2>

                <div class="env-block definition">
                    <div class="env-title">Electric Field Lines</div>
                    <div class="env-body">
                        <p>Electric field lines are imaginary curves that help visualize the electric field. The rules are:</p>
                        <ul>
                            <li>Field lines start on positive charges and end on negative charges.</li>
                            <li>The tangent to a field line at any point gives the direction of the electric field at that point.</li>
                            <li>The density of field lines (how closely packed they are) indicates the field strength: closely spaced lines mean a strong field.</li>
                            <li>Field lines never cross each other.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Reading Field Line Patterns</div>
                    <div class="env-body">
                        <p>Think of field lines as a map. Just as contour lines on a topographic map tell you about the terrain, field lines tell you about the electric field. Closely packed lines indicate a steep "electric hill" (strong field), and the direction of lines tells you which way a positive charge would move if placed there.</p>
                    </div>
                </div>

                <p>Common field line patterns include:</p>
                <ul>
                    <li><strong>Single positive charge</strong>: lines radiate outward in all directions.</li>
                    <li><strong>Single negative charge</strong>: lines converge inward from all directions.</li>
                    <li><strong>Electric dipole</strong> (+ and - charge): lines start on the positive charge and curve around to end on the negative charge.</li>
                    <li><strong>Two like charges</strong>: lines repel each other, creating a null point between the charges where E = 0.</li>
                    <li><strong>Uniform field</strong>: parallel, equally spaced lines (found between parallel plates).</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-field-lines"></div>

                <p>The visualization above shows field line patterns for various charge configurations. Switch between dipole, like charges, and single charge configurations to see the different patterns.</p>

                <div class="env-block warning">
                    <div class="env-title">Field Lines Are Not Trajectories</div>
                    <div class="env-body"><p>A common mistake is thinking that a charged particle follows a field line like a track. In reality, a particle follows a field line only if it starts from rest. If it has an initial velocity at an angle to the field, its trajectory curves but does not follow the field lines exactly.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Number of Lines</div>
                    <div class="env-body"><p>The number of field lines drawn from a charge is proportional to the magnitude of the charge. A +2Q charge has twice as many lines originating from it as a +Q charge.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-field-lines',
                    title: 'Electric Field Line Patterns',
                    description: 'See field line patterns for different charge configurations: dipole, like charges, and single charge.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 40, originX: 350, originY: 210 });
                        var mode = 'dipole';

                        function computeField(charges, px, py) {
                            var Ex = 0, Ey = 0;
                            for (var i = 0; i < charges.length; i++) {
                                var dx = px - charges[i].x;
                                var dy = py - charges[i].y;
                                var r2 = dx * dx + dy * dy;
                                if (r2 < 0.01) r2 = 0.01;
                                var r = Math.sqrt(r2);
                                var E = charges[i].q / r2;
                                Ex += E * dx / r;
                                Ey += E * dy / r;
                            }
                            return { x: Ex, y: Ey };
                        }

                        function traceFieldLine(charges, startX, startY, steps, ds) {
                            var points = [];
                            var x = startX, y = startY;
                            for (var i = 0; i < steps; i++) {
                                points.push([x, y]);
                                var field = computeField(charges, x, y);
                                var mag = Math.sqrt(field.x * field.x + field.y * field.y);
                                if (mag < 0.001) break;
                                x += ds * field.x / mag;
                                y += ds * field.y / mag;
                                if (Math.abs(x) > 10 || Math.abs(y) > 8) break;
                                // Stop if close to a negative charge
                                for (var ci = 0; ci < charges.length; ci++) {
                                    if (charges[ci].q < 0) {
                                        var ddx = x - charges[ci].x;
                                        var ddy = y - charges[ci].y;
                                        if (Math.sqrt(ddx * ddx + ddy * ddy) < 0.15) {
                                            points.push([charges[ci].x, charges[ci].y]);
                                            return points;
                                        }
                                    }
                                }
                            }
                            return points;
                        }

                        function draw() {
                            viz.clear();
                            var charges = [];

                            if (mode === 'dipole') {
                                charges = [{ x: -2, y: 0, q: 3 }, { x: 2, y: 0, q: -3 }];
                            } else if (mode === 'like') {
                                charges = [{ x: -2, y: 0, q: 3 }, { x: 2, y: 0, q: 3 }];
                            } else {
                                charges = [{ x: 0, y: 0, q: 3 }];
                            }

                            // Trace and draw field lines from positive charges
                            var numLines = 16;
                            for (var ci = 0; ci < charges.length; ci++) {
                                if (charges[ci].q <= 0) continue;
                                for (var li = 0; li < numLines; li++) {
                                    var angle = (li / numLines) * 2 * Math.PI;
                                    var startR = 0.2;
                                    var sx = charges[ci].x + startR * Math.cos(angle);
                                    var sy = charges[ci].y + startR * Math.sin(angle);
                                    var pts = traceFieldLine(charges, sx, sy, 500, 0.06);
                                    if (pts.length > 1) {
                                        // Draw line
                                        var ctx = viz.ctx;
                                        ctx.strokeStyle = viz.colors.yellow + 'aa';
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        for (var pi = 0; pi < pts.length; pi++) {
                                            var pp = viz.toScreen(pts[pi][0], pts[pi][1]);
                                            if (pi === 0) ctx.moveTo(pp[0], pp[1]);
                                            else ctx.lineTo(pp[0], pp[1]);
                                        }
                                        ctx.stroke();

                                        // Arrowhead at midpoint
                                        var midIdx = Math.floor(pts.length * 0.4);
                                        if (midIdx > 0 && midIdx < pts.length - 1) {
                                            var mp = viz.toScreen(pts[midIdx][0], pts[midIdx][1]);
                                            var mpNext = viz.toScreen(pts[midIdx + 1][0], pts[midIdx + 1][1]);
                                            var arrowAngle = Math.atan2(mpNext[1] - mp[1], mpNext[0] - mp[0]);
                                            ctx.fillStyle = viz.colors.yellow + 'aa';
                                            ctx.beginPath();
                                            ctx.moveTo(mp[0] + 5 * Math.cos(arrowAngle), mp[1] + 5 * Math.sin(arrowAngle));
                                            ctx.lineTo(mp[0] + 5 * Math.cos(arrowAngle - 2.5), mp[1] + 5 * Math.sin(arrowAngle - 2.5));
                                            ctx.lineTo(mp[0] + 5 * Math.cos(arrowAngle + 2.5), mp[1] + 5 * Math.sin(arrowAngle + 2.5));
                                            ctx.closePath();
                                            ctx.fill();
                                        }
                                    }
                                }
                            }

                            // Draw charges
                            for (var ci = 0; ci < charges.length; ci++) {
                                viz.drawCharge(charges[ci].x, charges[ci].y, charges[ci].q > 0 ? 1 : -1, null, 16);
                            }

                            // Title
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var title = mode === 'dipole' ? 'Electric Dipole (+/-)' : (mode === 'like' ? 'Like Charges (+/+)' : 'Single Positive Charge');
                            ctx.fillText(title, 350, 20);
                        }

                        draw();

                        VizEngine.createButton(controls, 'Dipole (+/-)', function() {
                            mode = 'dipole';
                            draw();
                        });
                        VizEngine.createButton(controls, 'Like Charges (+/+)', function() {
                            mode = 'like';
                            draw();
                        });
                        VizEngine.createButton(controls, 'Single Charge', function() {
                            mode = 'single';
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'In which direction do electric field lines point: toward positive charges or toward negative charges?',
                    hint: 'Think about where field lines originate and where they terminate.',
                    solution: 'Electric field lines point away from positive charges and toward negative charges. They originate on positive charges and terminate on negative charges.'
                },
                {
                    question: 'If electric field lines are very densely packed in a region, what does that tell you about the electric field there?',
                    hint: 'The density of field lines represents field strength.',
                    solution: 'Densely packed field lines indicate a strong electric field in that region. The closer the lines are to each other, the greater the field magnitude.'
                },
                {
                    question: 'Can two electric field lines ever cross? Explain why or why not.',
                    hint: 'What would it mean for the field direction at a crossing point?',
                    solution: 'No, two electric field lines can never cross. At any point in space, the electric field has a unique direction. If two lines crossed, there would be two different field directions at the crossing point, which is impossible.'
                },
                {
                    question: 'Sketch (describe in words) the field line pattern between two parallel plates carrying equal and opposite charges.',
                    hint: 'Think about what "uniform field" means for field line spacing and direction.',
                    solution: 'Between two parallel plates with equal and opposite charges, the field lines are straight, parallel, and equally spaced, running from the positive plate to the negative plate. This represents a uniform electric field. Near the edges, the lines curve outward (fringe effects).'
                },
                {
                    question: 'A charge of +2Q and a charge of -Q are near each other. Which charge has more field lines starting or ending on it?',
                    hint: 'The number of field lines is proportional to the charge magnitude.',
                    solution: 'The +2Q charge has twice as many field lines originating from it compared to the number ending on -Q. The extra lines from +2Q extend outward to infinity (or to distant negative charges).'
                }
            ]
        },

        // ===== SECTION 4: Electric Potential =====
        {
            id: 'electric-potential',
            title: 'Electric Potential',
            content: `
                <h2>Electric Potential: Energy Per Unit Charge</h2>

                <div class="env-block definition">
                    <div class="env-title">Electric Potential</div>
                    <div class="env-body">
                        <p>The electric potential \\(V\\) at a point is the electric potential energy per unit positive charge at that point:</p>
                        \\[ V = \\frac{U}{q_0} \\]
                        <p>The SI unit is the <strong>volt</strong> (V), where \\(1\\,\\text{V} = 1\\,\\text{J/C}\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Potential from a Point Charge</div>
                    <div class="env-body">
                        <p>The electric potential at distance \\(r\\) from a point charge \\(Q\\) is:</p>
                        \\[ V = k\\frac{Q}{r} \\]
                        <p>Note: unlike the field (which is a vector), potential is a <strong>scalar</strong>. This makes it much easier to calculate for systems with multiple charges.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Potential Is Like Height</div>
                    <div class="env-body"><p>Think of electric potential as the "electric height" at a point. Just as water flows downhill (from high gravitational potential to low), positive charges naturally move from high electric potential to low electric potential. The "steepness" of the potential landscape is the electric field.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Potential Difference (Voltage)</div>
                    <div class="env-body">
                        <p>The potential difference between two points A and B is:</p>
                        \\[ \\Delta V = V_A - V_B \\]
                        <p>The work done by the electric field when moving charge \\(q\\) from A to B is:</p>
                        \\[ W = q \\Delta V = q(V_A - V_B) \\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Work Done by Potential Difference</div>
                    <div class="env-body">
                        <p>A charge of \\(+3\\,\\mu\\text{C}\\) moves from point A (at 100 V) to point B (at 40 V). The work done by the electric field is:</p>
                        \\[ W = q(V_A - V_B) = 3 \\times 10^{-6} \\times (100 - 40) = 3 \\times 10^{-6} \\times 60 = 1.8 \\times 10^{-4}\\,\\text{J} \\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-equipotential"></div>

                <p>The visualization above shows equipotential lines (contours of constant potential) around one or two charges. Notice how equipotential lines are always perpendicular to field lines. Closer spacing of equipotential lines indicates a stronger electric field.</p>

                <div class="env-block remark">
                    <div class="env-title">Equipotential Surfaces</div>
                    <div class="env-body">
                        <p>An equipotential surface is a surface on which all points have the same potential. No work is done when moving a charge along an equipotential surface. Equipotential surfaces are always perpendicular to electric field lines.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Relationship Between Field and Potential</div>
                    <div class="env-body">
                        <p>In a uniform field, the relationship between the electric field \\(E\\) and potential difference \\(\\Delta V\\) over a distance \\(d\\) is:</p>
                        \\[ E = \\frac{\\Delta V}{d} \\]
                        <p>The field points from high potential to low potential.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-equipotential',
                    title: 'Equipotential Lines',
                    description: 'Visualize equipotential contours around point charges, always perpendicular to field lines.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 40, originX: 350, originY: 210 });
                        var mode = 'single';
                        var q1Val = 3;
                        var q2Val = -3;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var charges = [];
                            if (mode === 'single') {
                                charges = [{ x: 0, y: 0, q: q1Val }];
                            } else {
                                charges = [{ x: -2, y: 0, q: q1Val }, { x: 2, y: 0, q: q2Val }];
                            }

                            // Compute potential on a grid and draw equipotential contours
                            var resolution = 3;
                            var xMin = -8, xMax = 8, yMin = -5, yMax = 5;

                            // Compute potential at grid points
                            var cols = Math.ceil((xMax - xMin) * viz.scale / resolution);
                            var rows = Math.ceil((yMax - yMin) * viz.scale / resolution);

                            // Draw potential as colored pixels
                            for (var r = 0; r < rows; r++) {
                                for (var c = 0; c < cols; c++) {
                                    var px = xMin + c * (xMax - xMin) / cols;
                                    var py = yMin + r * (yMax - yMin) / rows;

                                    var V = 0;
                                    var tooClose = false;
                                    for (var ci = 0; ci < charges.length; ci++) {
                                        var ddx = px - charges[ci].x;
                                        var ddy = py - charges[ci].y;
                                        var rr = Math.sqrt(ddx * ddx + ddy * ddy);
                                        if (rr < 0.3) { tooClose = true; break; }
                                        V += charges[ci].q / rr;
                                    }
                                    if (tooClose) continue;

                                    // Map potential to color
                                    var intensity = V * 0.15;
                                    var red = 0, green = 0, blue = 0;
                                    if (intensity > 0) {
                                        red = Math.min(Math.floor(intensity * 80), 200);
                                        green = Math.min(Math.floor(intensity * 20), 80);
                                    } else {
                                        blue = Math.min(Math.floor(-intensity * 80), 200);
                                        green = Math.min(Math.floor(-intensity * 20), 80);
                                    }

                                    var sp = viz.toScreen(px, py);
                                    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',0.5)';
                                    ctx.fillRect(sp[0], sp[1], resolution + 1, resolution + 1);
                                }
                            }

                            // Draw equipotential contour lines
                            var contourLevels = [-8, -4, -2, -1, -0.5, 0, 0.5, 1, 2, 4, 8];
                            for (var li = 0; li < contourLevels.length; li++) {
                                var level = contourLevels[li];
                                ctx.strokeStyle = level > 0 ? 'rgba(248,81,73,0.5)' : (level < 0 ? 'rgba(88,166,255,0.5)' : 'rgba(240,246,252,0.6)');
                                ctx.lineWidth = level === 0 ? 1.5 : 1;

                                // Trace contour: for single charge, equipotentials are circles
                                if (mode === 'single' && charges[0].q !== 0) {
                                    var rContour = charges[0].q / level;
                                    if (rContour > 0 && rContour < 12) {
                                        var sp = viz.toScreen(charges[0].x, charges[0].y);
                                        ctx.beginPath();
                                        ctx.arc(sp[0], sp[1], rContour * viz.scale, 0, Math.PI * 2);
                                        ctx.stroke();
                                    }
                                }
                            }

                            // For dipole mode, just rely on the color map for contour feel

                            // Draw charges
                            for (var ci = 0; ci < charges.length; ci++) {
                                viz.drawCharge(charges[ci].x, charges[ci].y, charges[ci].q > 0 ? 1 : -1, null, 14);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Red = positive potential', 20, 20);
                            ctx.fillText('Blue = negative potential', 20, 40);
                            ctx.fillText('Equipotential lines: V = constant', 20, 60);
                            ctx.fillText(mode === 'single' ? 'Single charge' : 'Two charges (dipole or like)', 20, 400);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'q1 (\u03BCC)', -5, 5, 3, 0.5, function(val) {
                            q1Val = val;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'q2 (\u03BCC)', -5, 5, -3, 0.5, function(val) {
                            q2Val = val;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Single Charge', function() {
                            mode = 'single';
                            draw();
                        });
                        VizEngine.createButton(controls, 'Two Charges', function() {
                            mode = 'two';
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the electric potential at a distance of 0.5 m from a +4 \u03BCC charge?',
                    hint: 'Use V = kQ/r.',
                    solution: 'V = (9 x 10^9)(4 x 10^-6) / 0.5 = 36,000 / 0.5 = 72,000 V = 72 kV.'
                },
                {
                    question: 'A charge of +2 \u03BCC moves from a point at 500 V to a point at 200 V. How much work does the electric field do?',
                    hint: 'W = q(V_A - V_B).',
                    solution: 'W = q(V_A - V_B) = (2 x 10^-6)(500 - 200) = (2 x 10^-6)(300) = 6 x 10^-4 J = 0.6 mJ.'
                },
                {
                    question: 'The potential difference between two parallel plates is 1000 V, and the plates are 2 cm apart. What is the uniform electric field between the plates?',
                    hint: 'E = Delta V / d.',
                    solution: 'E = 1000 / 0.02 = 50,000 V/m = 5 x 10^4 V/m.'
                },
                {
                    question: 'Two charges +3 \u03BCC and -3 \u03BCC are 0.4 m apart. What is the potential at the midpoint between them?',
                    hint: 'Potential is a scalar: V_total = V_1 + V_2.',
                    solution: 'At the midpoint, r = 0.2 m for both charges. V_1 = k(3 x 10^-6)/0.2 = 135,000 V. V_2 = k(-3 x 10^-6)/0.2 = -135,000 V. V_total = 135,000 + (-135,000) = 0 V.'
                },
                {
                    question: 'An electron (charge -1.6 x 10^-19 C) accelerates through a potential difference of 100 V. How much kinetic energy does it gain?',
                    hint: 'The work done on the electron equals q times delta V. Be careful with the sign.',
                    solution: 'The electron moves from low potential to high potential (opposite to the field direction). The work done on the electron: W = |q| x |Delta V| = (1.6 x 10^-19)(100) = 1.6 x 10^-17 J. This equals the kinetic energy gained. (This is 100 electron-volts, or 100 eV.)'
                }
            ]
        },

        // ===== SECTION 5: Capacitors =====
        {
            id: 'capacitors',
            title: 'Capacitors',
            content: `
                <h2>Storing Charge and Energy</h2>

                <div class="env-block definition">
                    <div class="env-title">Capacitance</div>
                    <div class="env-body">
                        <p>A capacitor is a device that stores electric charge and energy. It consists of two conductors (plates) separated by an insulator (dielectric). The capacitance \\(C\\) is defined as:</p>
                        \\[ C = \\frac{Q}{V} \\]
                        <p>where \\(Q\\) is the charge on one plate and \\(V\\) is the potential difference between the plates. The SI unit of capacitance is the <strong>farad</strong> (F), where \\(1\\,\\text{F} = 1\\,\\text{C/V}\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Farad Is Huge</div>
                    <div class="env-body"><p>One farad is an enormous capacitance. Typical capacitors have capacitances in microfarads (\\(\\mu\\text{F} = 10^{-6}\\,\\text{F}\\)), nanofarads (\\(\\text{nF} = 10^{-9}\\,\\text{F}\\)), or picofarads (\\(\\text{pF} = 10^{-12}\\,\\text{F}\\)).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Parallel Plate Capacitor</div>
                    <div class="env-body">
                        <p>The capacitance of a parallel plate capacitor with plate area \\(A\\), separation \\(d\\), and dielectric constant \\(\\varepsilon_r\\) is:</p>
                        \\[ C = \\frac{\\varepsilon_0 \\varepsilon_r A}{d} \\]
                        <p>where \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\,\\text{F/m}\\) is the permittivity of free space.</p>
                    </div>
                </div>

                <p>Key relationships for a charged capacitor:</p>
                <ul>
                    <li>Increasing the plate area \\(A\\) increases \\(C\\) (more room for charge).</li>
                    <li>Increasing the plate separation \\(d\\) decreases \\(C\\) (weaker field for the same charge).</li>
                    <li>Inserting a dielectric (\\(\\varepsilon_r > 1\\)) increases \\(C\\).</li>
                </ul>

                <div class="env-block definition">
                    <div class="env-title">Energy Stored in a Capacitor</div>
                    <div class="env-body">
                        <p>The energy stored in a charged capacitor is:</p>
                        \\[ U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV \\]
                        <p>This energy is stored in the electric field between the plates.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Parallel Plate Capacitor</div>
                    <div class="env-body">
                        <p>A parallel plate capacitor has plates of area \\(0.01\\,\\text{m}^2\\) separated by \\(0.001\\,\\text{m}\\) of air (\\(\\varepsilon_r = 1\\)). Its capacitance is:</p>
                        \\[ C = \\frac{\\varepsilon_0 A}{d} = \\frac{8.85 \\times 10^{-12} \\times 0.01}{0.001} = 8.85 \\times 10^{-11}\\,\\text{F} = 88.5\\,\\text{pF} \\]
                        <p>If charged to 100 V, the energy stored is:</p>
                        \\[ U = \\frac{1}{2}CV^2 = \\frac{1}{2}(8.85 \\times 10^{-11})(100)^2 = 4.43 \\times 10^{-7}\\,\\text{J} \\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-capacitor"></div>

                <p>The visualization above shows a parallel plate capacitor. Adjust the plate area, separation, and voltage to see how the charge, capacitance, and stored energy change. Watch the field lines between the plates respond to your adjustments.</p>

                <div class="env-block warning">
                    <div class="env-title">Dielectric Breakdown</div>
                    <div class="env-body"><p>Every dielectric material has a maximum electric field it can withstand before it breaks down and conducts. For air, this is about \\(3 \\times 10^6\\,\\text{V/m}\\). Exceeding this causes a spark (lightning is dielectric breakdown of air on a grand scale).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-capacitor',
                    title: 'Parallel Plate Capacitor',
                    description: 'Adjust plate area, separation, and voltage to explore how capacitance, charge, and stored energy behave.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var area = 0.01;
                        var sep = 2;
                        var voltage = 100;
                        var eps0 = 8.85e-12;
                        var dielectric = 1;

                        function draw() {
                            viz.clear();

                            var C = eps0 * dielectric * area / (sep * 0.001);
                            var Q = C * voltage;
                            var E = voltage / (sep * 0.001);
                            var U = 0.5 * C * voltage * voltage;

                            // Draw plates
                            var plateW = 8;
                            var plateH = 60 + area * 8000;
                            var leftPlateX = 250 - sep * 30;
                            var rightPlateX = 250 + sep * 30;
                            var plateY = 200 - plateH / 2;

                            // Left plate (positive)
                            ctx.fillStyle = viz.colors.red + '88';
                            ctx.fillRect(leftPlateX - plateW, plateY, plateW, plateH);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(leftPlateX - plateW, plateY, plateW, plateH);

                            // Right plate (negative)
                            ctx.fillStyle = viz.colors.blue + '88';
                            ctx.fillRect(rightPlateX, plateY, plateW, plateH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.strokeRect(rightPlateX, plateY, plateW, plateH);

                            // Plus and minus signs on plates
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            for (var i = 0; i < 4; i++) {
                                var py = plateY + plateH * (i + 0.5) / 4;
                                ctx.fillText('+', leftPlateX - plateW / 2, py);
                                ctx.fillText('\u2212', rightPlateX + plateW / 2, py);
                            }

                            // Field lines between plates
                            var numLines = Math.min(Math.floor(plateH / 20), 10);
                            ctx.strokeStyle = viz.colors.yellow + '88';
                            ctx.lineWidth = 1;
                            for (var i = 0; i < numLines; i++) {
                                var ly = plateY + plateH * (i + 0.5) / numLines;
                                ctx.beginPath();
                                ctx.moveTo(leftPlateX + 2, ly);
                                ctx.lineTo(rightPlateX - 2, ly);
                                ctx.stroke();

                                // Arrow
                                var midX = (leftPlateX + rightPlateX) / 2;
                                ctx.fillStyle = viz.colors.yellow + '88';
                                ctx.beginPath();
                                ctx.moveTo(midX + 5, ly);
                                ctx.lineTo(midX - 3, ly - 4);
                                ctx.lineTo(midX - 3, ly + 4);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('+V', leftPlateX - plateW / 2, plateY - 15);
                            ctx.fillText('-V', rightPlateX + plateW / 2, plateY - 15);

                            // Separation indicator
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            var indicatorY = plateY + plateH + 25;
                            ctx.beginPath();
                            ctx.moveTo(leftPlateX, indicatorY);
                            ctx.lineTo(rightPlateX, indicatorY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('d = ' + sep.toFixed(1) + ' mm', (leftPlateX + rightPlateX) / 2, indicatorY + 15);

                            // Info panel on right
                            var infoX = 430;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Capacitor Properties', infoX, 40);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('C = ' + (C * 1e12).toFixed(2) + ' pF', infoX, 70);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Q = ' + (Q * 1e9).toFixed(3) + ' nC', infoX, 95);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('E = ' + (E / 1000).toFixed(1) + ' kV/m', infoX, 120);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('U = ' + (U * 1e9).toFixed(3) + ' nJ', infoX, 145);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('C = \u03B50\u03B5r A / d', infoX, 180);
                            ctx.fillText('U = (1/2)CV\u00B2', infoX, 200);
                            ctx.fillText('E = V / d', infoX, 220);

                            // Energy bar
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Stored Energy:', infoX, 260);
                            var barW = 180;
                            var barH = 20;
                            var maxU = 0.5 * eps0 * dielectric * area * 500 * 500 / (0.001);
                            var fillW = Math.min((U / maxU) * barW, barW);
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(infoX, 270, barW, barH);
                            ctx.fillStyle = viz.colors.purple + '88';
                            ctx.fillRect(infoX, 270, fillW, barH);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(infoX, 270, barW, barH);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Plate Area (cm\u00B2)', 50, 200, 100, 10, function(val) {
                            area = val / 10000;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Separation (mm)', 0.5, 5, 2, 0.1, function(val) {
                            sep = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Voltage (V)', 0, 500, 100, 10, function(val) {
                            voltage = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Dielectric \u03B5r', 1, 10, 1, 0.5, function(val) {
                            dielectric = val;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A capacitor stores 50 \u03BCC of charge when the voltage across it is 10 V. What is its capacitance?',
                    hint: 'Use C = Q/V.',
                    solution: 'C = Q/V = (50 x 10^-6) / 10 = 5 x 10^-6 F = 5 \u03BCF.'
                },
                {
                    question: 'A parallel plate capacitor has plates of area 0.04 m^2 separated by 0.5 mm of air. What is its capacitance?',
                    hint: 'Use C = epsilon_0 A / d with epsilon_0 = 8.85 x 10^-12 F/m.',
                    solution: 'C = (8.85 x 10^-12)(0.04) / (5 x 10^-4) = (3.54 x 10^-13) / (5 x 10^-4) = 7.08 x 10^-10 F = 0.708 nF.'
                },
                {
                    question: 'A 10 \u03BCF capacitor is charged to 200 V. How much energy is stored?',
                    hint: 'Use U = (1/2)CV^2.',
                    solution: 'U = (1/2)(10 x 10^-6)(200^2) = (1/2)(10 x 10^-6)(40000) = 0.2 J.'
                },
                {
                    question: 'If a dielectric with constant epsilon_r = 4 is inserted between the plates of a capacitor (without changing the charge on it), by what factor does the voltage change?',
                    hint: 'The capacitance increases by a factor of epsilon_r. Since Q is constant, V = Q/C changes.',
                    solution: 'C_new = epsilon_r x C_old = 4C. Since Q stays the same, V_new = Q / C_new = Q / (4C) = V_old / 4. The voltage decreases by a factor of 4.'
                },
                {
                    question: 'A capacitor is charged to 100 V and then disconnected from the battery. The plates are then pulled apart, doubling the separation. What happens to the voltage, capacitance, and energy stored?',
                    hint: 'After disconnection, Q is constant. C depends on d. V = Q/C.',
                    solution: 'C_new = C_old / 2 (since C is inversely proportional to d). Q is constant. V_new = Q / C_new = Q / (C/2) = 2V_old = 200 V. Energy: U_new = Q^2 / (2 C_new) = Q^2 / (2 x C/2) = Q^2 / C = 2 U_old. The energy doubles (the work you did pulling the plates apart is converted to electrical energy).'
                }
            ]
        }
    ]
});
