window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'DC Circuits',
    subtitle: 'Direct Current and Circuit Analysis',
    sections: [
        // ===== SECTION 1: Current and Resistance =====
        {
            id: 'ch10-sec01',
            title: 'Current and Resistance',
            content: `<h2>Current and Resistance</h2>
<p class="section-roadmap"><em>In this section, you will learn what electric current is, how resistance arises in conductors, and what determines a material's resistance.</em></p>

<div class="env-block intuition">
<div class="env-title">Why This Matters</div>
<div class="env-body"><p>Every electronic device you use, from a flashlight to a smartphone, relies on the controlled flow of electric charge through circuits. Understanding current and resistance is the first step to understanding how these devices work.</p></div>
</div>

<h3>Electric Current</h3>
<p>When a potential difference (voltage) is applied across a conductor, free electrons begin to drift in a specific direction. This organized flow of charge is called <strong>electric current</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition (Electric Current)</div>
<div class="env-body"><p>Electric current \\(I\\) is the rate at which electric charge flows through a cross-section of a conductor:</p>
<p>\\[ I = \\frac{Q}{t} \\]</p>
<p>where \\(Q\\) is the total charge (in coulombs, C) that passes through in time \\(t\\) (in seconds, s). The SI unit of current is the <strong>ampere</strong> (A), where \\(1\\,\\text{A} = 1\\,\\text{C/s}\\).</p></div>
</div>

<p>By convention, current flows from the positive terminal to the negative terminal (opposite to the actual electron flow). This is called <strong>conventional current</strong>.</p>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body"><p>Although electrons actually move from negative to positive, the conventional current direction was established before the discovery of the electron. Both conventions give the same results in circuit analysis.</p></div>
</div>

<h3>Resistance</h3>
<p>As charges flow through a conductor, they collide with the lattice ions of the material, losing energy. This opposition to current flow is called <strong>resistance</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition (Resistance)</div>
<div class="env-body"><p>The resistance \\(R\\) of a conductor depends on its material and geometry:</p>
<p>\\[ R = \\rho \\frac{L}{A} \\]</p>
<p>where \\(\\rho\\) is the <strong>resistivity</strong> of the material (in \\(\\Omega\\cdot\\text{m}\\)), \\(L\\) is the length of the conductor, and \\(A\\) is its cross-sectional area. The SI unit of resistance is the <strong>ohm</strong> (\\(\\Omega\\)).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A copper wire has resistivity \\(\\rho = 1.7 \\times 10^{-8}\\,\\Omega\\cdot\\text{m}\\), length \\(L = 2\\,\\text{m}\\), and cross-sectional area \\(A = 1\\,\\text{mm}^2 = 1 \\times 10^{-6}\\,\\text{m}^2\\). Its resistance is:</p>
<p>\\[ R = 1.7 \\times 10^{-8} \\times \\frac{2}{1 \\times 10^{-6}} = 0.034\\,\\Omega \\]</p>
<p>This very low resistance is why copper is an excellent conductor.</p></div>
</div>

<h3>Factors Affecting Resistance</h3>
<ul>
<li><strong>Length</strong>: Longer conductors have more resistance (proportional to \\(L\\)).</li>
<li><strong>Cross-sectional area</strong>: Thicker conductors have less resistance (inversely proportional to \\(A\\)).</li>
<li><strong>Material</strong>: Different materials have different resistivities \\(\\rho\\).</li>
<li><strong>Temperature</strong>: For most metals, resistance increases with temperature.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-current-flow"></div>

<div class="env-block intuition">
<div class="env-title">Water Analogy</div>
<div class="env-body"><p>Think of current as the flow rate of water in a pipe. Voltage is the pressure pushing water through, and resistance is the narrowness of the pipe. A narrow, long pipe (high resistance) allows less water flow for the same pressure.</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-current-flow',
                    title: 'Electric Current Flow Animation',
                    description: 'Watch how charges flow through a wire. Adjust the voltage and resistance to see how current changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380});
                        var ctx = viz.ctx;
                        var voltage = 6;
                        var resistance = 3;
                        var charges = [];

                        for (var i = 0; i < 20; i++) {
                            charges.push({x: Math.random() * 500 + 100, y: 190 + (Math.random() - 0.5) * 30});
                        }

                        VizEngine.createSlider(controls, 'Voltage (V)', 1, 12, 6, 1, function(v) { voltage = v; });
                        VizEngine.createSlider(controls, 'Resistance (\u03A9)', 1, 10, 3, 0.5, function(v) { resistance = v; });

                        function draw(t) {
                            viz.clear();
                            var W = viz.width, H = viz.height;
                            var current = voltage / resistance;
                            var speed = current * 0.4;

                            // Draw battery
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            // Battery body
                            ctx.strokeRect(30, 160, 50, 60);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(45, 150, 20, 10);
                            viz.screenText('+', 55, 145, viz.colors.red, 14);
                            viz.screenText('-', 55, 230, viz.colors.blue, 14);
                            viz.screenText('Battery', 55, 250, viz.colors.text, 11);
                            viz.screenText(voltage.toFixed(0) + ' V', 55, 265, viz.colors.yellow, 11);

                            // Draw wire path
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(80, 170);
                            ctx.lineTo(620, 170);
                            ctx.lineTo(620, 210);
                            ctx.lineTo(80, 210);
                            ctx.closePath();
                            ctx.stroke();

                            // Draw resistor symbol
                            var rx1 = 300, rx2 = 420, ry = 170;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(rx1 - 5, ry - 15, rx2 - rx1 + 10, 30);
                            viz.drawResistor(rx1, ry, rx2, ry, viz.colors.orange);
                            viz.screenText('R = ' + resistance.toFixed(1) + ' \u03A9', (rx1 + rx2) / 2, ry - 25, viz.colors.orange, 12);

                            // Animate charges on top wire (left to right)
                            for (var i = 0; i < charges.length; i++) {
                                var c = charges[i];
                                c.x += speed;
                                if (c.x > 620) c.x = 80;
                                if (c.x < 80) c.x = 620;

                                var cx, cy;
                                if (i < 10) {
                                    cx = c.x;
                                    cy = 170;
                                } else {
                                    cx = 620 - (c.x - 80);
                                    cy = 210;
                                }

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.bg;
                                ctx.font = 'bold 8px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('+', cx, cy);
                            }

                            // Display current
                            viz.screenText('Current I = V/R = ' + current.toFixed(2) + ' A', W / 2, 300, viz.colors.green, 15);
                            viz.screenText('I = Q/t    (charge per unit time)', W / 2, 325, viz.colors.text, 12);

                            // Current direction arrow
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.moveTo(240, 155);
                            ctx.lineTo(230, 150);
                            ctx.lineTo(230, 160);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I (conventional)', 240, 145, viz.colors.green, 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A charge of 15 C passes through a wire in 5 seconds. What is the current?',
                    hint: 'Use I = Q/t.',
                    solution: 'I = Q/t = 15 C / 5 s = 3 A.'
                },
                {
                    question: 'A current of 2 A flows for 3 minutes. How much charge passes through the wire?',
                    hint: 'Convert minutes to seconds, then use Q = I x t.',
                    solution: 'Q = I x t = 2 A x 180 s = 360 C.'
                },
                {
                    question: 'A copper wire is 4 m long with a cross-sectional area of 2 mm\u00B2. The resistivity of copper is 1.7 x 10\u207B\u2078 \u03A9 m. Calculate the resistance.',
                    hint: 'Use R = \u03C1L/A. Convert mm\u00B2 to m\u00B2.',
                    solution: 'A = 2 mm\u00B2 = 2 x 10\u207B\u2076 m\u00B2. R = (1.7 x 10\u207B\u2078)(4) / (2 x 10\u207B\u2076) = 0.034 \u03A9.'
                },
                {
                    question: 'If you double the length of a wire and halve its diameter, by what factor does the resistance change?',
                    hint: 'Area is proportional to diameter squared. If diameter halves, area quarters.',
                    solution: 'Doubling L multiplies R by 2. Halving the diameter quarters the area A, which multiplies R by 4. Total factor = 2 x 4 = 8. The resistance increases 8-fold.'
                },
                {
                    question: 'Why are power lines made of thick cables rather than thin wires?',
                    hint: 'Think about R = \u03C1L/A and what happens to power loss with resistance.',
                    solution: 'Thicker cables have larger cross-sectional area A, which gives lower resistance R = \u03C1L/A. Lower resistance means less energy is wasted as heat (P = I\u00B2R) during transmission, making power delivery more efficient.'
                }
            ]
        },

        // ===== SECTION 2: Ohm's Law =====
        {
            id: 'ch10-sec02',
            title: "Ohm's Law",
            content: `<h2>Ohm's Law</h2>
<p class="section-roadmap"><em>In this section, you will learn the fundamental relationship between voltage, current, and resistance, and explore what it means for a material to be "ohmic."</em></p>

<div class="env-block definition">
<div class="env-title">Ohm's Law</div>
<div class="env-body"><p>For an ohmic conductor at constant temperature, the voltage \\(V\\) across the conductor is directly proportional to the current \\(I\\) through it:</p>
<p>\\[ V = IR \\]</p>
<p>where \\(R\\) is the resistance (constant for an ohmic material). This can also be written as \\(I = V/R\\) or \\(R = V/I\\).</p></div>
</div>

<h3>The V-I Characteristic</h3>
<p>A <strong>V-I graph</strong> plots voltage against current. For an ohmic conductor, this graph is a straight line through the origin, with slope equal to \\(R\\).</p>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A resistor carries a current of 0.5 A when 6 V is applied across it. Find its resistance.</p>
<p>\\[ R = \\frac{V}{I} = \\frac{6}{0.5} = 12\\,\\Omega \\]</p></div>
</div>

<h3>Ohmic vs. Non-Ohmic Materials</h3>
<p>Not all conductors obey Ohm's law. Materials that do are called <strong>ohmic</strong>, and their V-I graph is a straight line. Non-ohmic materials (like diodes or filament lamps) have curved V-I characteristics because their resistance changes with current or temperature.</p>

<div class="env-block warning">
<div class="env-title">Common Misconception</div>
<div class="env-body"><p>Ohm's law \\(V = IR\\) is not a universal law of nature. It is an empirical relationship that holds for certain materials under certain conditions. The equation \\(R = V/I\\) can always be used to <em>define</em> resistance, but that does not mean the material is ohmic.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-ohms-law"></div>

<h3>Applications of Ohm's Law</h3>
<p>Ohm's law is the workhorse of circuit analysis. Given any two of the three quantities (V, I, R), you can find the third:</p>
<ul>
<li>\\(V = IR\\) (find voltage)</li>
<li>\\(I = V/R\\) (find current)</li>
<li>\\(R = V/I\\) (find resistance)</li>
</ul>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A 9 V battery is connected to a 45 \\(\\Omega\\) resistor. What current flows?</p>
<p>\\[ I = \\frac{V}{R} = \\frac{9}{45} = 0.2\\,\\text{A} = 200\\,\\text{mA} \\]</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Intuition Check</div>
<div class="env-body"><p>Ohm's law tells us: more voltage pushes more current (like higher water pressure gives more flow), and more resistance reduces current (like a narrower pipe restricts flow).</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-ohms-law',
                    title: "Ohm's Law Explorer",
                    description: 'Adjust voltage and resistance to see how current changes. The V-I graph updates in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, originX: 100, originY: 350, scale: 25});
                        var ctx = viz.ctx;
                        var voltage = 6;
                        var resistance = 3;

                        VizEngine.createSlider(controls, 'Voltage V (V)', 0, 12, 6, 0.5, function(v) { voltage = v; draw(); });
                        VizEngine.createSlider(controls, 'Resistance R (\u03A9)', 0.5, 10, 3, 0.5, function(v) { resistance = v; draw(); });

                        function draw() {
                            viz.clear();
                            var current = voltage / resistance;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            // I axis (horizontal)
                            ctx.beginPath();
                            ctx.moveTo(100, 350);
                            ctx.lineTo(680, 350);
                            ctx.stroke();
                            // V axis (vertical)
                            ctx.beginPath();
                            ctx.moveTo(100, 350);
                            ctx.lineTo(100, 30);
                            ctx.stroke();

                            // Axis labels
                            viz.screenText('I (A)', 680, 345, viz.colors.white, 13, 'right', 'bottom');
                            viz.screenText('V (V)', 105, 25, viz.colors.white, 13, 'left', 'top');

                            // Grid and tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var i = 0; i <= 5; i++) {
                                var ix = 100 + i * 110;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(ix, 30);
                                ctx.lineTo(ix, 350);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(i.toFixed(0), ix, 355);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var v = 0; v <= 12; v += 2) {
                                var vy = 350 - v * 25;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(100, vy);
                                ctx.lineTo(680, vy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(v.toFixed(0), 94, vy);
                            }

                            // Draw V = IR line (slope = R)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(100, 350);
                            var endI = 12 / resistance;
                            var endIx = 100 + endI * 110;
                            var endVy = 350 - 12 * 25;
                            if (endIx > 680) {
                                endI = (680 - 100) / 110;
                                endIx = 680;
                                endVy = 350 - endI * resistance * 25;
                            }
                            ctx.lineTo(endIx, endVy);
                            ctx.stroke();
                            viz.screenText('V = IR (slope = R = ' + resistance.toFixed(1) + ' \u03A9)', (100 + endIx) / 2, (350 + endVy) / 2 - 20, viz.colors.blue, 12);

                            // Current operating point
                            var px = 100 + current * 110;
                            var py = 350 - voltage * 25;
                            if (px <= 680 && py >= 30) {
                                // Dashed lines to axes
                                ctx.strokeStyle = viz.colors.yellow + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 3]);
                                ctx.beginPath();
                                ctx.moveTo(px, py);
                                ctx.lineTo(px, 350);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(px, py);
                                ctx.lineTo(100, py);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Operating point
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(px, py, 7, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Display values
                            viz.screenText('V = ' + voltage.toFixed(1) + ' V', 500, 40, viz.colors.orange, 15);
                            viz.screenText('I = V/R = ' + current.toFixed(2) + ' A', 500, 65, viz.colors.green, 15);
                            viz.screenText('R = ' + resistance.toFixed(1) + ' \u03A9', 500, 90, viz.colors.teal, 15);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A resistor has 10 V across it and carries 2 A. What is its resistance?',
                    hint: 'Use R = V/I.',
                    solution: 'R = V/I = 10/2 = 5 \u03A9.'
                },
                {
                    question: 'If the resistance of a circuit is 20 \u03A9 and the current is 0.3 A, what is the voltage?',
                    hint: 'Use V = IR.',
                    solution: 'V = IR = 0.3 x 20 = 6 V.'
                },
                {
                    question: 'A filament lamp draws 0.4 A at 2 V and 0.6 A at 4 V. Is it ohmic? Explain.',
                    hint: 'Calculate R at each operating point. If R is the same, the lamp is ohmic.',
                    solution: 'At 2 V: R = 2/0.4 = 5 \u03A9. At 4 V: R = 4/0.6 = 6.67 \u03A9. Since R changes with voltage, the lamp is non-ohmic. This happens because the filament heats up, increasing its resistivity.'
                },
                {
                    question: 'On a V-I graph, what does the slope of the line represent for an ohmic conductor?',
                    hint: 'If V is on the y-axis and I on the x-axis, the slope is V/I.',
                    solution: 'The slope equals the resistance R. A steeper line means higher resistance (more voltage needed per unit of current).'
                },
                {
                    question: 'A 12 V battery is connected to a device that draws 500 mA. Find the resistance of the device.',
                    hint: 'Convert mA to A first: 500 mA = 0.5 A.',
                    solution: 'R = V/I = 12/0.5 = 24 \u03A9.'
                }
            ]
        },

        // ===== SECTION 3: Series and Parallel Circuits =====
        {
            id: 'ch10-sec03',
            title: 'Series and Parallel Circuits',
            content: `<h2>Series and Parallel Circuits</h2>
<p class="section-roadmap"><em>In this section, you will learn how resistors combine in series and in parallel, and how to analyze voltage and current distribution in each type of circuit.</em></p>

<h3>Series Circuits</h3>
<p>When resistors are connected <strong>in series</strong>, they form a single path for current. The same current flows through every component.</p>

<div class="env-block definition">
<div class="env-title">Series Circuit Rules</div>
<div class="env-body">
<p>For resistors \\(R_1, R_2, \\ldots, R_n\\) in series:</p>
<ul>
<li><strong>Current</strong> is the same everywhere: \\(I = I_1 = I_2 = \\cdots = I_n\\)</li>
<li><strong>Voltage divides</strong>: \\(V_{\\text{total}} = V_1 + V_2 + \\cdots + V_n\\)</li>
<li><strong>Total resistance</strong>: \\(R_{\\text{total}} = R_1 + R_2 + \\cdots + R_n\\)</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Two resistors \\(R_1 = 4\\,\\Omega\\) and \\(R_2 = 6\\,\\Omega\\) are connected in series to a 20 V battery.</p>
<p>\\[ R_{\\text{total}} = 4 + 6 = 10\\,\\Omega \\]</p>
<p>\\[ I = \\frac{V}{R_{\\text{total}}} = \\frac{20}{10} = 2\\,\\text{A} \\]</p>
<p>\\[ V_1 = IR_1 = 2 \\times 4 = 8\\,\\text{V},\\quad V_2 = IR_2 = 2 \\times 6 = 12\\,\\text{V} \\]</p>
<p>Note that \\(V_1 + V_2 = 20\\,\\text{V}\\), confirming the voltage division.</p></div>
</div>

<h3>Parallel Circuits</h3>
<p>When resistors are connected <strong>in parallel</strong>, each has the same voltage across it, but the current splits among the branches.</p>

<div class="env-block definition">
<div class="env-title">Parallel Circuit Rules</div>
<div class="env-body">
<p>For resistors \\(R_1, R_2, \\ldots, R_n\\) in parallel:</p>
<ul>
<li><strong>Voltage</strong> is the same across each: \\(V = V_1 = V_2 = \\cdots = V_n\\)</li>
<li><strong>Current divides</strong>: \\(I_{\\text{total}} = I_1 + I_2 + \\cdots + I_n\\)</li>
<li><strong>Total resistance</strong>: \\(\\displaystyle \\frac{1}{R_{\\text{total}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots + \\frac{1}{R_n}\\)</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Two resistors \\(R_1 = 6\\,\\Omega\\) and \\(R_2 = 3\\,\\Omega\\) are connected in parallel to a 12 V battery.</p>
<p>\\[ \\frac{1}{R_{\\text{total}}} = \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{6} + \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2} \\]</p>
<p>\\[ R_{\\text{total}} = 2\\,\\Omega \\]</p>
<p>\\[ I_1 = \\frac{12}{6} = 2\\,\\text{A},\\quad I_2 = \\frac{12}{3} = 4\\,\\text{A},\\quad I_{\\text{total}} = 6\\,\\text{A} \\]</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Key Insight</div>
<div class="env-body"><p>In parallel, the total resistance is always <em>less</em> than the smallest individual resistance. Adding more parallel paths always reduces total resistance because there are more paths for current to flow.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-series-parallel"></div>

<h3>Voltage Divider</h3>
<p>A series circuit naturally divides the source voltage among its resistors. The voltage across any resistor \\(R_k\\) in series is:</p>
<p>\\[ V_k = V_{\\text{source}} \\times \\frac{R_k}{R_{\\text{total}}} \\]</p>
<p>This principle is the basis of the <strong>voltage divider</strong>, one of the most common circuit building blocks.</p>`,
            visualizations: [
                {
                    id: 'viz-series-parallel',
                    title: 'Series vs. Parallel Circuit Builder',
                    description: 'Toggle between series and parallel configurations. Adjust resistor values and observe how total resistance, current, and voltage distribution change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 420});
                        var ctx = viz.ctx;
                        var mode = 'series';
                        var R1 = 4;
                        var R2 = 6;
                        var Vsource = 12;

                        VizEngine.createButton(controls, 'Series', function() { mode = 'series'; draw(); });
                        VizEngine.createButton(controls, 'Parallel', function() { mode = 'parallel'; draw(); });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03A9)', 1, 20, 4, 1, function(v) { R1 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03A9)', 1, 20, 6, 1, function(v) { R2 = v; draw(); });
                        VizEngine.createSlider(controls, 'V source (V)', 1, 24, 12, 1, function(v) { Vsource = v; draw(); });

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;

                            if (mode === 'series') {
                                // Series circuit diagram
                                viz.screenText('Series Circuit', W / 2, 25, viz.colors.white, 16);

                                // Battery
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(80, 100);
                                ctx.lineTo(80, 280);
                                ctx.stroke();
                                // Battery symbol
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(65, 170);
                                ctx.lineTo(95, 170);
                                ctx.stroke();
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(58, 185);
                                ctx.lineTo(102, 185);
                                ctx.stroke();
                                viz.screenText('+', 104, 170, viz.colors.red, 12);
                                viz.screenText('-', 104, 185, viz.colors.blue, 12);
                                viz.screenText(Vsource.toFixed(0) + ' V', 80, 210, viz.colors.yellow, 12);

                                // Top wire
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(80, 100);
                                ctx.lineTo(600, 100);
                                ctx.stroke();

                                // Bottom wire
                                ctx.beginPath();
                                ctx.moveTo(80, 280);
                                ctx.lineTo(600, 280);
                                ctx.stroke();

                                // Right wire
                                ctx.beginPath();
                                ctx.moveTo(600, 100);
                                ctx.lineTo(600, 280);
                                ctx.stroke();

                                // Resistor 1
                                viz.drawResistor(200, 100, 320, 100, viz.colors.orange);
                                viz.screenText('R\u2081 = ' + R1.toFixed(0) + ' \u03A9', 260, 75, viz.colors.orange, 13);

                                // Resistor 2
                                viz.drawResistor(400, 100, 520, 100, viz.colors.teal);
                                viz.screenText('R\u2082 = ' + R2.toFixed(0) + ' \u03A9', 460, 75, viz.colors.teal, 13);

                                var Rtotal = R1 + R2;
                                var Itotal = Vsource / Rtotal;
                                var V1 = Itotal * R1;
                                var V2 = Itotal * R2;

                                // Current arrow
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(160, 95);
                                ctx.lineTo(150, 90);
                                ctx.lineTo(150, 100);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('I = ' + Itotal.toFixed(2) + ' A', 155, 115, viz.colors.green, 11);

                                // Results
                                viz.screenText('R_total = R\u2081 + R\u2082 = ' + Rtotal.toFixed(1) + ' \u03A9', W / 2, 320, viz.colors.white, 14);
                                viz.screenText('I = V / R_total = ' + Itotal.toFixed(2) + ' A', W / 2, 345, viz.colors.green, 14);
                                viz.screenText('V\u2081 = ' + V1.toFixed(1) + ' V', 260, 55, viz.colors.orange, 12);
                                viz.screenText('V\u2082 = ' + V2.toFixed(1) + ' V', 460, 55, viz.colors.teal, 12);
                                viz.screenText('V\u2081 + V\u2082 = ' + (V1 + V2).toFixed(1) + ' V = V_source', W / 2, 370, viz.colors.yellow, 13);
                            } else {
                                // Parallel circuit diagram
                                viz.screenText('Parallel Circuit', W / 2, 25, viz.colors.white, 16);

                                // Battery
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(100, 100);
                                ctx.lineTo(100, 300);
                                ctx.stroke();
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(85, 180);
                                ctx.lineTo(115, 180);
                                ctx.stroke();
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(78, 195);
                                ctx.lineTo(122, 195);
                                ctx.stroke();
                                viz.screenText('+', 124, 180, viz.colors.red, 12);
                                viz.screenText('-', 124, 195, viz.colors.blue, 12);
                                viz.screenText(Vsource.toFixed(0) + ' V', 100, 220, viz.colors.yellow, 12);

                                // Top wire
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(100, 100);
                                ctx.lineTo(580, 100);
                                ctx.stroke();

                                // Bottom wire
                                ctx.beginPath();
                                ctx.moveTo(100, 300);
                                ctx.lineTo(580, 300);
                                ctx.stroke();

                                // Branch 1 (top)
                                ctx.beginPath();
                                ctx.moveTo(280, 100);
                                ctx.lineTo(280, 160);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(280, 240);
                                ctx.lineTo(280, 300);
                                ctx.stroke();
                                viz.drawResistor(280, 160, 280, 240, viz.colors.orange);
                                viz.screenText('R\u2081 = ' + R1.toFixed(0) + ' \u03A9', 250, 200, viz.colors.orange, 12, 'right');

                                // Branch 2
                                ctx.beginPath();
                                ctx.moveTo(450, 100);
                                ctx.lineTo(450, 160);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(450, 240);
                                ctx.lineTo(450, 300);
                                ctx.stroke();
                                viz.drawResistor(450, 160, 450, 240, viz.colors.teal);
                                viz.screenText('R\u2082 = ' + R2.toFixed(0) + ' \u03A9', 480, 200, viz.colors.teal, 12, 'left');

                                // Right joining wire
                                ctx.beginPath();
                                ctx.moveTo(580, 100);
                                ctx.lineTo(580, 300);
                                ctx.stroke();

                                var Rtotal = (R1 * R2) / (R1 + R2);
                                var I1 = Vsource / R1;
                                var I2 = Vsource / R2;
                                var Itotal = I1 + I2;

                                // Results
                                viz.screenText('1/R_total = 1/R\u2081 + 1/R\u2082  =>  R_total = ' + Rtotal.toFixed(2) + ' \u03A9', W / 2, 330, viz.colors.white, 14);
                                viz.screenText('I\u2081 = ' + I1.toFixed(2) + ' A    I\u2082 = ' + I2.toFixed(2) + ' A    I_total = ' + Itotal.toFixed(2) + ' A', W / 2, 355, viz.colors.green, 14);
                                viz.screenText('Same voltage ' + Vsource.toFixed(0) + ' V across both branches', W / 2, 380, viz.colors.yellow, 13);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Three resistors of 2 \u03A9, 3 \u03A9, and 5 \u03A9 are connected in series to a 20 V battery. Find the total resistance and the current.',
                    hint: 'In series, R_total = R1 + R2 + R3.',
                    solution: 'R_total = 2 + 3 + 5 = 10 \u03A9. I = V/R = 20/10 = 2 A.'
                },
                {
                    question: 'Two resistors of 6 \u03A9 and 12 \u03A9 are connected in parallel. Find the equivalent resistance.',
                    hint: 'Use 1/R = 1/R1 + 1/R2.',
                    solution: '1/R = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4. So R = 4 \u03A9.'
                },
                {
                    question: 'In a series circuit with R1 = 3 \u03A9 and R2 = 7 \u03A9 connected to 10 V, find the voltage across each resistor.',
                    hint: 'Use the voltage divider formula: Vk = V_source x Rk / R_total.',
                    solution: 'R_total = 10 \u03A9. V1 = 10 x 3/10 = 3 V. V2 = 10 x 7/10 = 7 V. Check: 3 + 7 = 10 V.'
                },
                {
                    question: 'Three identical 12 \u03A9 resistors are connected in parallel. What is the total resistance?',
                    hint: 'For n identical resistors R in parallel, R_total = R/n.',
                    solution: '1/R_total = 1/12 + 1/12 + 1/12 = 3/12 = 1/4. R_total = 4 \u03A9. (Or simply 12/3 = 4 \u03A9.)'
                },
                {
                    question: 'A 4 \u03A9 and 6 \u03A9 resistor are in parallel, and this combination is in series with a 5 \u03A9 resistor. Find the total resistance.',
                    hint: 'First find the parallel combination, then add the series resistor.',
                    solution: 'Parallel: 1/R_p = 1/4 + 1/6 = 5/12, so R_p = 2.4 \u03A9. Total: R = 2.4 + 5 = 7.4 \u03A9.'
                }
            ]
        },

        // ===== SECTION 4: Kirchhoff's Laws =====
        {
            id: 'ch10-sec04',
            title: "Kirchhoff's Laws",
            content: `<h2>Kirchhoff's Laws</h2>
<p class="section-roadmap"><em>In this section, you will learn the two fundamental laws for analyzing complex circuits: the junction rule (KCL) and the loop rule (KVL).</em></p>

<div class="env-block intuition">
<div class="env-title">Why We Need Kirchhoff</div>
<div class="env-body"><p>Ohm's law alone cannot solve complex circuits with multiple loops and branches. Kirchhoff's laws provide the additional equations needed to analyze any circuit, no matter how complicated.</p></div>
</div>

<h3>Kirchhoff's Current Law (KCL) - The Junction Rule</h3>

<div class="env-block theorem">
<div class="env-title">Kirchhoff's Current Law</div>
<div class="env-body"><p>At any junction (node) in a circuit, the total current entering equals the total current leaving:</p>
<p>\\[ \\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\]</p>
<p>This is a consequence of <strong>conservation of charge</strong>: charge cannot accumulate at a point in a steady circuit.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example (KCL)</div>
<div class="env-body"><p>At a junction, currents of 3 A and 2 A flow in, while one current \\(I_3\\) flows out. Then:</p>
<p>\\[ 3 + 2 = I_3 \\quad\\Rightarrow\\quad I_3 = 5\\,\\text{A} \\]</p></div>
</div>

<h3>Kirchhoff's Voltage Law (KVL) - The Loop Rule</h3>

<div class="env-block theorem">
<div class="env-title">Kirchhoff's Voltage Law</div>
<div class="env-body"><p>Around any closed loop in a circuit, the sum of all voltage changes (rises and drops) is zero:</p>
<p>\\[ \\sum V = 0 \\]</p>
<p>This is a consequence of <strong>conservation of energy</strong>: a charge that travels around a complete loop must return to its starting potential.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example (KVL)</div>
<div class="env-body"><p>A loop contains a 12 V battery and two resistors \\(R_1 = 4\\,\\Omega\\) and \\(R_2 = 8\\,\\Omega\\) in series. Applying KVL:</p>
<p>\\[ +12 - IR_1 - IR_2 = 0 \\]</p>
<p>\\[ 12 - 4I - 8I = 0 \\quad\\Rightarrow\\quad 12I = 12 \\quad\\Rightarrow\\quad I = 1\\,\\text{A} \\]</p></div>
</div>

<h3>Applying Kirchhoff's Laws</h3>
<p>To solve a circuit using Kirchhoff's laws:</p>
<ol>
<li><strong>Label</strong> all currents with assumed directions (if you get a negative answer, the actual direction is opposite).</li>
<li><strong>Apply KCL</strong> at each junction to write current equations.</li>
<li><strong>Apply KVL</strong> around each independent loop to write voltage equations.</li>
<li><strong>Solve</strong> the system of equations.</li>
</ol>

<div class="viz-placeholder" data-viz="viz-kirchhoff"></div>

<div class="env-block warning">
<div class="env-title">Sign Convention</div>
<div class="env-body"><p>When traversing a loop: (1) going through a battery from - to + is a voltage <em>rise</em> (+V), (2) going through a resistor in the direction of current is a voltage <em>drop</em> (-IR). Consistency is essential.</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-kirchhoff',
                    title: "Kirchhoff's Laws Visualization",
                    description: 'A two-loop circuit demonstrating KCL at junctions and KVL around loops. Adjust the EMFs and resistances to see how currents change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 420});
                        var ctx = viz.ctx;
                        var E1 = 12;
                        var E2 = 6;
                        var R1 = 4;
                        var R2 = 6;
                        var R3 = 3;

                        VizEngine.createSlider(controls, 'E\u2081 (V)', 1, 20, 12, 1, function(v) { E1 = v; draw(); });
                        VizEngine.createSlider(controls, 'E\u2082 (V)', 1, 20, 6, 1, function(v) { E2 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03A9)', 1, 10, 4, 1, function(v) { R1 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03A9)', 1, 10, 6, 1, function(v) { R2 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2083 (\u03A9)', 1, 10, 3, 1, function(v) { R3 = v; draw(); });

                        function draw() {
                            viz.clear();
                            var W = viz.width, H = viz.height;

                            // Solve using KVL/KCL:
                            // Loop 1: E1 - I1*R1 - I3*R3 = 0
                            // Loop 2: E2 - I2*R2 - I3*R3 = 0
                            // KCL: I1 + I2 = I3
                            // Substituting I3:
                            // E1 - I1*R1 - (I1+I2)*R3 = 0  =>  E1 = I1*(R1+R3) + I2*R3
                            // E2 - I2*R2 - (I1+I2)*R3 = 0  =>  E2 = I1*R3 + I2*(R2+R3)
                            var a = R1 + R3, b = R3, c = R3, d = R2 + R3;
                            var det = a * d - b * c;
                            var I1 = (E1 * d - E2 * b) / det;
                            var I2 = (a * E2 - c * E1) / det;
                            var I3 = I1 + I2;

                            viz.screenText("Kirchhoff's Laws: Two-Loop Circuit", W / 2, 20, viz.colors.white, 15);

                            // Draw circuit frame
                            // Left loop
                            var lx = 120, rx = 350, mx = 350, fx = 580;
                            var ty = 70, by = 300;

                            // Top wire
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lx, ty);
                            ctx.lineTo(fx, ty);
                            ctx.stroke();

                            // Bottom wire
                            ctx.beginPath();
                            ctx.moveTo(lx, by);
                            ctx.lineTo(fx, by);
                            ctx.stroke();

                            // Left side
                            ctx.beginPath();
                            ctx.moveTo(lx, ty);
                            ctx.lineTo(lx, by);
                            ctx.stroke();

                            // Middle branch
                            ctx.beginPath();
                            ctx.moveTo(mx, ty);
                            ctx.lineTo(mx, by);
                            ctx.stroke();

                            // Right side
                            ctx.beginPath();
                            ctx.moveTo(fx, ty);
                            ctx.lineTo(fx, by);
                            ctx.stroke();

                            // Battery E1 (left side)
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(lx - 12, 170);
                            ctx.lineTo(lx + 12, 170);
                            ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(lx - 18, 185);
                            ctx.lineTo(lx + 18, 185);
                            ctx.stroke();
                            viz.screenText('+', lx + 20, 170, viz.colors.red, 10);
                            viz.screenText('E\u2081=' + E1.toFixed(0) + 'V', lx - 2, 210, viz.colors.yellow, 11);

                            // Battery E2 (right side)
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(fx - 12, 170);
                            ctx.lineTo(fx + 12, 170);
                            ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(fx - 18, 185);
                            ctx.lineTo(fx + 18, 185);
                            ctx.stroke();
                            viz.screenText('+', fx + 20, 170, viz.colors.red, 10);
                            viz.screenText('E\u2082=' + E2.toFixed(0) + 'V', fx - 2, 210, viz.colors.yellow, 11);

                            // R1 on top left
                            viz.drawResistor(170, ty, 300, ty, viz.colors.orange);
                            viz.screenText('R\u2081=' + R1.toFixed(0) + '\u03A9', 235, ty - 18, viz.colors.orange, 11);

                            // R2 on top right
                            viz.drawResistor(400, ty, 530, ty, viz.colors.teal);
                            viz.screenText('R\u2082=' + R2.toFixed(0) + '\u03A9', 465, ty - 18, viz.colors.teal, 11);

                            // R3 in middle
                            viz.drawResistor(mx, 130, mx, 240, viz.colors.purple);
                            viz.screenText('R\u2083=' + R3.toFixed(0) + '\u03A9', mx + 25, 185, viz.colors.purple, 11);

                            // Current arrows and labels
                            var arrowColor = viz.colors.green;
                            // I1 arrow on left top
                            ctx.fillStyle = arrowColor;
                            ctx.beginPath();
                            ctx.moveTo(150, ty - 5);
                            ctx.lineTo(142, ty - 12);
                            ctx.lineTo(142, ty + 2);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I\u2081=' + I1.toFixed(2) + 'A', 150, ty + 22, arrowColor, 11);

                            // I2 arrow on right top
                            ctx.fillStyle = arrowColor;
                            ctx.beginPath();
                            ctx.moveTo(380, ty - 5);
                            ctx.lineTo(372, ty - 12);
                            ctx.lineTo(372, ty + 2);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I\u2082=' + I2.toFixed(2) + 'A', 380, ty + 22, arrowColor, 11);

                            // I3 arrow in middle (downward)
                            ctx.fillStyle = arrowColor;
                            ctx.beginPath();
                            ctx.moveTo(mx, 120);
                            ctx.lineTo(mx - 7, 112);
                            ctx.lineTo(mx + 7, 112);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I\u2083=' + I3.toFixed(2) + 'A', mx - 35, 115, arrowColor, 11);

                            // KCL node markers
                            ctx.fillStyle = viz.colors.pink;
                            ctx.beginPath();
                            ctx.arc(mx, ty, 5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(mx, by, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Info
                            viz.screenText('KCL at top node: I\u2081 + I\u2082 = I\u2083  =>  ' + I1.toFixed(2) + ' + ' + I2.toFixed(2) + ' = ' + I3.toFixed(2), W / 2, 330, viz.colors.pink, 12);
                            viz.screenText('KVL Loop 1: E\u2081 - I\u2081R\u2081 - I\u2083R\u2083 = 0  =>  ' + E1.toFixed(0) + ' - ' + (I1 * R1).toFixed(1) + ' - ' + (I3 * R3).toFixed(1) + ' = 0', W / 2, 355, viz.colors.orange, 11);
                            viz.screenText('KVL Loop 2: E\u2082 - I\u2082R\u2082 - I\u2083R\u2083 = 0  =>  ' + E2.toFixed(0) + ' - ' + (I2 * R2).toFixed(1) + ' - ' + (I3 * R3).toFixed(1) + ' = 0', W / 2, 380, viz.colors.teal, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At a junction, currents of 5 A, 3 A, and 1 A flow in. One current I flows out. Find I.',
                    hint: 'KCL: total current in = total current out.',
                    solution: 'I = 5 + 3 + 1 = 9 A flowing out.'
                },
                {
                    question: 'A single loop contains a 9 V battery and three resistors (2 \u03A9, 3 \u03A9, 4 \u03A9) in series. Use KVL to find the current.',
                    hint: 'KVL: EMF = sum of voltage drops.',
                    solution: 'KVL: 9 - 2I - 3I - 4I = 0. 9I = 9, so I = 1 A.'
                },
                {
                    question: 'In a two-loop circuit, E1 = 10 V, E2 = 5 V, R1 = 2 \u03A9, R2 = 3 \u03A9, R3 = 5 \u03A9 (shared branch). Find I1, I2, and I3.',
                    hint: 'Set up two KVL equations and one KCL equation, then solve the system.',
                    solution: 'KCL: I3 = I1 + I2. Loop 1: 10 = I1(2+5) + I2(5) = 7I1 + 5I2. Loop 2: 5 = I1(5) + I2(3+5) = 5I1 + 8I2. Solving: from equations 7I1 + 5I2 = 10 and 5I1 + 8I2 = 5, multiply first by 8 and second by 5: 56I1 + 40I2 = 80, 25I1 + 40I2 = 25. Subtract: 31I1 = 55, I1 = 1.77 A. Then I2 = (5 - 5(1.77))/8 = -0.48 A (flows opposite to assumed direction). I3 = 1.77 - 0.48 = 1.29 A.'
                },
                {
                    question: 'Why is the sign convention for traversing loops important in KVL?',
                    hint: 'Consider what happens if you mix up voltage rises and drops.',
                    solution: 'Consistent sign convention ensures the equation correctly accounts for energy gains (battery EMF, traversed from - to +) and energy losses (resistor voltage drops, traversed in the direction of current). Mixing these up produces incorrect equations and wrong current values.'
                },
                {
                    question: 'In a junction, 4 A enters from wire A, 2 A leaves through wire B, and current flows through wire C. If the current through wire C actually enters the junction, what is its magnitude?',
                    hint: 'Think carefully: if I_C enters, then total entering = 4 + I_C and total leaving = 2.',
                    solution: 'KCL: 4 + I_C = 2. This gives I_C = -2 A. The negative sign means the assumed direction is wrong; 2 A actually leaves through wire C. Alternatively, total current entering (4 A) must equal total leaving (2 + I_C), and I_C = 2 A leaving.'
                }
            ]
        },

        // ===== SECTION 5: Electrical Power and Energy =====
        {
            id: 'ch10-sec05',
            title: 'Electrical Power and Energy',
            content: `<h2>Electrical Power and Energy</h2>
<p class="section-roadmap"><em>In this section, you will learn how to calculate electrical power and energy, and understand how these concepts relate to real-world energy consumption.</em></p>

<h3>Electrical Power</h3>
<p>Power is the rate at which electrical energy is converted to other forms (heat, light, mechanical work). The fundamental formula for electrical power is:</p>

<div class="env-block definition">
<div class="env-title">Definition (Electrical Power)</div>
<div class="env-body"><p>\\[ P = IV \\]</p>
<p>where \\(P\\) is power in watts (W), \\(I\\) is current in amperes, and \\(V\\) is voltage in volts. Using Ohm's law, this can be rewritten as:</p>
<p>\\[ P = I^2 R = \\frac{V^2}{R} \\]</p>
<p>All three forms are equivalent and each is useful in different situations.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A 60 W light bulb operates at 120 V. What current does it draw, and what is its resistance?</p>
<p>\\[ I = \\frac{P}{V} = \\frac{60}{120} = 0.5\\,\\text{A} \\]</p>
<p>\\[ R = \\frac{V}{I} = \\frac{120}{0.5} = 240\\,\\Omega \\]</p></div>
</div>

<h3>Energy and the Kilowatt-Hour</h3>
<p>Energy is power multiplied by time:</p>
<p>\\[ E = Pt \\]</p>
<p>In SI units, energy is measured in joules (J), where \\(1\\,\\text{J} = 1\\,\\text{W} \\cdot \\text{s}\\). However, electricity bills use the <strong>kilowatt-hour</strong> (kWh):</p>

<div class="env-block definition">
<div class="env-title">Definition (Kilowatt-Hour)</div>
<div class="env-body"><p>\\[ 1\\,\\text{kWh} = 1000\\,\\text{W} \\times 3600\\,\\text{s} = 3.6 \\times 10^6\\,\\text{J} = 3.6\\,\\text{MJ} \\]</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A 2 kW heater runs for 3 hours. Energy consumed:</p>
<p>\\[ E = 2\\,\\text{kW} \\times 3\\,\\text{h} = 6\\,\\text{kWh} \\]</p>
<p>If electricity costs $0.12/kWh, the cost is \\(6 \\times 0.12 = \\$0.72\\).</p></div>
</div>

<h3>Joule Heating</h3>
<p>When current flows through a resistor, electrical energy is converted to heat. This is called <strong>Joule heating</strong> (or resistive heating). The heat generated is:</p>
<p>\\[ Q = I^2 R t = Pt \\]</p>
<p>This effect is used in electric heaters, toasters, and incandescent light bulbs, but it is also responsible for energy losses in transmission lines.</p>

<div class="viz-placeholder" data-viz="viz-power-dissipation"></div>

<div class="env-block intuition">
<div class="env-title">Why Three Power Formulas?</div>
<div class="env-body"><p>Use \\(P = IV\\) when you know both current and voltage. Use \\(P = I^2R\\) when you know current and resistance (common in series circuits where current is the same). Use \\(P = V^2/R\\) when you know voltage and resistance (common in parallel circuits where voltage is the same).</p></div>
</div>

<div class="env-block warning">
<div class="env-title">Power Ratings</div>
<div class="env-body"><p>Every electrical component has a maximum power rating. Exceeding this rating causes overheating and potential failure. For a resistor rated at 0.25 W with \\(R = 100\\,\\Omega\\), the maximum current is \\(I = \\sqrt{P/R} = \\sqrt{0.25/100} = 50\\,\\text{mA}\\).</p></div>
</div>`,
            visualizations: [
                {
                    id: 'viz-power-dissipation',
                    title: 'Power Dissipation Explorer',
                    description: 'Adjust voltage and resistance to see how power dissipation changes. The bar chart compares P = IV, P = I\u00B2R, and P = V\u00B2/R (all give the same value).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400});
                        var ctx = viz.ctx;
                        var V = 12;
                        var R = 6;

                        VizEngine.createSlider(controls, 'Voltage (V)', 1, 24, 12, 1, function(v) { V = v; draw(); });
                        VizEngine.createSlider(controls, 'Resistance (\u03A9)', 1, 20, 6, 1, function(v) { R = v; draw(); });

                        function draw() {
                            viz.clear();
                            var W2 = viz.width, H = viz.height;
                            var I = V / R;
                            var P = V * I;
                            var maxP = 24 * 24 / 1; // max possible power

                            viz.screenText('Power Dissipation in a Resistor', W2 / 2, 20, viz.colors.white, 15);

                            // Resistor icon
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(80, 100);
                            ctx.lineTo(200, 100);
                            ctx.stroke();
                            viz.drawResistor(200, 100, 340, 100, viz.colors.orange);
                            ctx.beginPath();
                            ctx.moveTo(340, 100);
                            ctx.lineTo(460, 100);
                            ctx.stroke();

                            viz.screenText('R = ' + R.toFixed(0) + ' \u03A9', 270, 75, viz.colors.orange, 14);
                            viz.screenText('V = ' + V.toFixed(0) + ' V', 270, 125, viz.colors.yellow, 13);
                            viz.screenText('I = ' + I.toFixed(2) + ' A', 270, 145, viz.colors.green, 13);

                            // Heat glow effect
                            var glowRadius = Math.min(P / 2, 60);
                            var gradient = ctx.createRadialGradient(270, 100, 10, 270, 100, glowRadius + 20);
                            gradient.addColorStop(0, 'rgba(248,81,73,0.4)');
                            gradient.addColorStop(1, 'rgba(248,81,73,0)');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(270, 100, glowRadius + 20, 0, Math.PI * 2);
                            ctx.fill();

                            // Three power formulas displayed
                            var formulas = [
                                {label: 'P = IV', value: I * V, color: viz.colors.blue},
                                {label: 'P = I\u00B2R', value: I * I * R, color: viz.colors.teal},
                                {label: 'P = V\u00B2/R', value: V * V / R, color: viz.colors.purple}
                            ];

                            // Bar chart
                            var barY = 200;
                            var barMaxH = 150;
                            var barW = 80;
                            var spacing = 130;
                            var startX = 170;

                            for (var i = 0; i < 3; i++) {
                                var f = formulas[i];
                                var barH = Math.min((f.value / 100) * barMaxH, barMaxH);
                                var bx = startX + i * spacing;

                                ctx.fillStyle = f.color + '55';
                                ctx.fillRect(bx - barW / 2, barY + barMaxH - barH, barW, barH);
                                ctx.strokeStyle = f.color;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(bx - barW / 2, barY + barMaxH - barH, barW, barH);

                                viz.screenText(f.label, bx, barY + barMaxH + 18, f.color, 13);
                                viz.screenText(f.value.toFixed(1) + ' W', bx, barY + barMaxH - barH - 12, f.color, 12);
                            }

                            // Power result
                            viz.screenText('P = ' + P.toFixed(1) + ' W', W2 / 2, barY + barMaxH + 50, viz.colors.white, 16);
                            viz.screenText('All three formulas give the same result!', W2 / 2, barY + barMaxH + 70, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 100 \u03A9 resistor carries 0.2 A. What power does it dissipate?',
                    hint: 'Use P = I\u00B2R.',
                    solution: 'P = I\u00B2R = (0.2)\u00B2 x 100 = 0.04 x 100 = 4 W.'
                },
                {
                    question: 'A kettle rated at 2000 W operates on 240 V mains. Find (a) the current drawn and (b) the resistance of the heating element.',
                    hint: 'Use P = IV for current, then R = V/I.',
                    solution: '(a) I = P/V = 2000/240 = 8.33 A. (b) R = V/I = 240/8.33 = 28.8 \u03A9.'
                },
                {
                    question: 'A 5 \u03A9 resistor and a 15 \u03A9 resistor are connected in series to a 20 V battery. How much power is dissipated in each resistor?',
                    hint: 'In series, the same current flows through both. Find I first, then use P = I\u00B2R.',
                    solution: 'R_total = 20 \u03A9. I = 20/20 = 1 A. P1 = 1\u00B2 x 5 = 5 W. P2 = 1\u00B2 x 15 = 15 W. Total: 20 W = IV = 1 x 20 (check).'
                },
                {
                    question: 'A 1.5 kW air conditioner runs for 8 hours per day. How many kWh does it use per month (30 days), and what is the monthly cost at $0.10/kWh?',
                    hint: 'Energy = Power x Time. Convert kW and hours.',
                    solution: 'Daily energy = 1.5 kW x 8 h = 12 kWh. Monthly = 12 x 30 = 360 kWh. Cost = 360 x $0.10 = $36.00.'
                },
                {
                    question: 'Two identical resistors of 10 \u03A9 each are connected to 12 V. Compare the total power dissipated when they are in (a) series and (b) parallel.',
                    hint: 'Series: R_total = 20 \u03A9. Parallel: R_total = 5 \u03A9. Use P = V\u00B2/R.',
                    solution: '(a) Series: R = 20 \u03A9, P = 12\u00B2/20 = 7.2 W. (b) Parallel: R = 5 \u03A9, P = 12\u00B2/5 = 28.8 W. Parallel dissipates 4 times more power because the total resistance is 4 times smaller.'
                }
            ]
        }
    ]
});
