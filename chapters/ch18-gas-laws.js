window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Gas Laws & Thermodynamics',
    subtitle: 'Gas Behavior and Energy Transformation',
    sections: [
        // ===== SECTION 1: Boyle's Law =====
        {
            id: 'boyles-law',
            title: "Boyle's Law",
            content: `
                <h2>Boyle's Law</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Particles to Pressure</div>
                    <div class="env-body"><p>In the previous chapter we learned that gas particles are in constant random motion. Now we ask: what happens to the pressure when we compress a gas? Robert Boyle discovered the answer in 1662, and his law is one of the cornerstones of gas physics.</p></div>
                </div>

                <p>Imagine pushing a piston into a sealed cylinder of gas. As the volume decreases, the gas particles have less room to move. They hit the walls more frequently, which increases the pressure.</p>

                <div class="env-block definition">
                    <div class="env-title">Boyle's Law</div>
                    <div class="env-body"><p>At constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume:</p>
                    <p>\\[ PV = \\text{constant} \\quad \\Longleftrightarrow \\quad P_1 V_1 = P_2 V_2 \\]</p>
                    <p>In words: if you halve the volume, the pressure doubles (and vice versa).</p></div>
                </div>

                <p>The relationship is an <em>inverse proportion</em>. On a \\(P\\text{-}V\\) diagram, each curve of constant temperature (called an <strong>isotherm</strong>) is a hyperbola. Higher temperatures correspond to isotherms that are farther from the origin.</p>

                <div class="viz-placeholder" data-viz="viz-boyle-pv"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Compressing Air in a Syringe</div>
                    <div class="env-body">
                        <p>A syringe contains 60 mL of air at 1.0 atm. You push the plunger until the volume is 20 mL. What is the new pressure (at constant temperature)?</p>
                        <p><strong>Solution:</strong> \\(P_1 V_1 = P_2 V_2\\) gives \\(P_2 = P_1 V_1 / V_2 = 1.0 \\times 60 / 20 = 3.0\\) atm.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Limitations</div>
                    <div class="env-body"><p>Boyle's law applies to <em>ideal gases</em>. Real gases deviate at very high pressures or very low temperatures, where intermolecular forces and molecular volumes become significant.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Historical Note</div>
                    <div class="env-body"><p>Boyle published his findings in 1662. In continental Europe the same law is often attributed to Edme Mariotte (1676), so it is sometimes called the Boyle-Mariotte law.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-boyle-pv',
                    title: "Boyle's Law PV Diagram",
                    description: 'Drag the slider to change volume and see how pressure responds along an isotherm',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 80, originY: 360 });
                        var volume = 4;

                        var slider = VizEngine.createSlider(controls, 'Volume V', 1, 8, 4, 0.1, function(v) {
                            volume = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            // axes
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 360); ctx.lineTo(680, 360); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 360); ctx.lineTo(80, 30); ctx.stroke();
                            viz.screenText('V (L)', 680, 375, viz.colors.white, 13, 'right');
                            viz.screenText('P (atm)', 85, 20, viz.colors.white, 13, 'left');

                            // tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var v = 1; v <= 8; v++) {
                                var sx = 80 + v * 70;
                                ctx.fillText(v, sx, 363);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(sx, 360); ctx.lineTo(sx, 30); ctx.stroke();
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var p = 1; p <= 10; p++) {
                                var sy = 360 - p * 30;
                                ctx.fillText(p, 75, sy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(80, sy); ctx.lineTo(680, sy); ctx.stroke();
                            }

                            // isotherms: PV = const
                            var constants = [
                                { c: 4, color: viz.colors.teal, label: 'T1 (low)' },
                                { c: 8, color: viz.colors.blue, label: 'T2 (medium)' },
                                { c: 16, color: viz.colors.orange, label: 'T3 (high)' }
                            ];
                            for (var ci = 0; ci < constants.length; ci++) {
                                var iso = constants[ci];
                                ctx.strokeStyle = iso.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var vv = 0.5; vv <= 8.5; vv += 0.05) {
                                    var pp = iso.c / vv;
                                    if (pp > 10.5) continue;
                                    var px = 80 + vv * 70;
                                    var py = 360 - pp * 30;
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                // label
                                var labelV = 7;
                                var labelP = iso.c / labelV;
                                if (labelP < 10) {
                                    viz.screenText(iso.label, 80 + labelV * 70 + 5, 360 - labelP * 30 - 12, iso.color, 11, 'left');
                                }
                            }

                            // current point on T2 isotherm (PV=8)
                            var pCurr = 8 / volume;
                            if (pCurr <= 10) {
                                var dotX = 80 + volume * 70;
                                var dotY = 360 - pCurr * 30;
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); ctx.fill();

                                // dashed lines to axes
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = viz.colors.blue + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(dotX, dotY); ctx.lineTo(dotX, 360); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(dotX, dotY); ctx.lineTo(80, dotY); ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            viz.screenText('P = ' + pCurr.toFixed(2) + ' atm', viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText('PV = ' + (pCurr * volume).toFixed(1) + ' (constant)', viz.width / 2, 36, viz.colors.teal, 12);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-boyle-1',
                    type: 'numeric',
                    question: 'A gas occupies 10 L at 2.0 atm. What volume will it occupy at 5.0 atm (constant temperature)?',
                    hint: 'Use P1 V1 = P2 V2.',
                    answer: '4',
                    solution: 'P1 V1 = P2 V2 gives V2 = (2.0)(10) / 5.0 = 4.0 L.'
                },
                {
                    id: 'ex-boyle-2',
                    type: 'numeric',
                    question: 'A balloon has a volume of 3.0 L at 1.0 atm. If the pressure is increased to 3.0 atm at constant temperature, what is the new volume in liters?',
                    hint: 'Inverse relationship: V decreases as P increases.',
                    answer: '1',
                    solution: 'V2 = P1 V1 / P2 = (1.0)(3.0) / 3.0 = 1.0 L.'
                },
                {
                    id: 'ex-boyle-3',
                    type: 'mc',
                    question: 'On a PV diagram at constant temperature, the curve (isotherm) has what shape?',
                    options: ['Straight line', 'Parabola', 'Hyperbola', 'Circle'],
                    correct: 2,
                    hint: 'P = constant / V describes what kind of curve?',
                    solution: 'Since P = C/V, the graph is a rectangular hyperbola.'
                },
                {
                    id: 'ex-boyle-4',
                    type: 'numeric',
                    question: 'A gas at 4.0 atm and 2.0 L is allowed to expand at constant temperature until the pressure is 1.0 atm. What is the final volume in liters?',
                    hint: 'PV = constant.',
                    answer: '8',
                    solution: 'V2 = P1 V1 / P2 = (4.0)(2.0) / 1.0 = 8.0 L.'
                },
                {
                    id: 'ex-boyle-5',
                    type: 'mc',
                    question: 'Which assumption does Boyle\'s law require?',
                    options: ['Constant volume', 'Constant temperature', 'Constant pressure', 'Changing number of moles'],
                    correct: 1,
                    hint: 'Boyle\'s law holds when one thermodynamic variable is fixed.',
                    solution: 'Boyle\'s law requires constant temperature (isothermal process).'
                }
            ]
        },

        // ===== SECTION 2: Charles's Law and Gay-Lussac's Law =====
        {
            id: 'charles-gay-lussac',
            title: "Charles's Law and Gay-Lussac's Law",
            content: `
                <h2>Charles's Law and Gay-Lussac's Law</h2>

                <p>Boyle showed what happens when temperature is constant. But what if we hold pressure or volume constant instead? Two more gas laws describe these situations.</p>

                <div class="env-block definition">
                    <div class="env-title">Charles's Law (Constant Pressure)</div>
                    <div class="env-body"><p>At constant pressure, the volume of a gas is directly proportional to its absolute temperature:</p>
                    <p>\\[ \\frac{V}{T} = \\text{constant} \\quad \\Longleftrightarrow \\quad \\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\]</p>
                    <p>Temperature must be measured in <strong>kelvins</strong> (K). As the gas heats up, it expands.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Absolute Temperature</div>
                    <div class="env-body"><p>You must use the Kelvin scale: \\(T(\\text{K}) = T(^{\\circ}\\text{C}) + 273\\). Using Celsius in gas law formulas gives wrong results because Celsius has an arbitrary zero point.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-charles-law"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Heating a Gas at Constant Pressure</div>
                    <div class="env-body">
                        <p>A gas occupies 2.0 L at 300 K. If heated to 600 K at constant pressure, what is the new volume?</p>
                        <p><strong>Solution:</strong> \\(V_2 = V_1 T_2 / T_1 = 2.0 \\times 600/300 = 4.0\\) L. The volume doubles when the absolute temperature doubles.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Gay-Lussac's Law (Constant Volume)</div>
                    <div class="env-body"><p>At constant volume, the pressure of a gas is directly proportional to its absolute temperature:</p>
                    <p>\\[ \\frac{P}{T} = \\text{constant} \\quad \\Longleftrightarrow \\quad \\frac{P_1}{T_1} = \\frac{P_2}{T_2} \\]</p>
                    <p>This explains why a sealed container might burst when heated: the pressure builds up.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Tire Pressure on a Hot Day</div>
                    <div class="env-body">
                        <p>A car tire has a pressure of 2.2 atm at 293 K (20 C). After driving on a hot road, the air temperature inside rises to 333 K (60 C). What is the new tire pressure?</p>
                        <p><strong>Solution:</strong> \\(P_2 = P_1 T_2/T_1 = 2.2 \\times 333/293 \\approx 2.5\\) atm.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Summary of Gas Laws</div>
                    <div class="env-body">
                        <p>All three laws are special cases of the ideal gas law (next section):</p>
                        <ul>
                            <li><strong>Boyle:</strong> fix T, n. Then PV = const.</li>
                            <li><strong>Charles:</strong> fix P, n. Then V/T = const.</li>
                            <li><strong>Gay-Lussac:</strong> fix V, n. Then P/T = const.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-charles-law',
                    title: "Charles's Law: Volume vs Temperature",
                    description: 'Adjust temperature and watch the gas expand or contract at constant pressure',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 100, originY: 360 });
                        var temp = 300;

                        var slider = VizEngine.createSlider(controls, 'Temperature (K)', 100, 600, 300, 10, function(v) {
                            temp = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            // axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(100, 360); ctx.lineTo(670, 360); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(100, 360); ctx.lineTo(100, 30); ctx.stroke();
                            viz.screenText('T (K)', 670, 375, viz.colors.white, 13, 'right');
                            viz.screenText('V (L)', 105, 20, viz.colors.white, 13, 'left');

                            // tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 100; t <= 600; t += 100) {
                                var sx = 100 + (t / 600) * 560;
                                ctx.fillText(t, sx, 363);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var v = 1; v <= 6; v++) {
                                var sy = 360 - v * 50;
                                ctx.fillText(v, 95, sy);
                            }

                            // V/T = const line for two different pressures
                            var ratios = [
                                { k: 0.01, color: viz.colors.blue, label: 'P = 1 atm' },
                                { k: 0.005, color: viz.colors.orange, label: 'P = 2 atm' }
                            ];
                            for (var ri = 0; ri < ratios.length; ri++) {
                                var r = ratios[ri];
                                ctx.strokeStyle = r.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var tt = 10; tt <= 620; tt += 2) {
                                    var vv = r.k * tt;
                                    var px = 100 + (tt / 600) * 560;
                                    var py = 360 - vv * 50;
                                    if (py < 30) break;
                                    tt === 10 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                viz.screenText(r.label, 620, 360 - r.k * 550 * 50, r.color, 11, 'left');
                            }

                            // Current point on P=1atm line
                            var vol = 0.01 * temp;
                            var dotX = 100 + (temp / 600) * 560;
                            var dotY = 360 - vol * 50;
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); ctx.fill();

                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.blue + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(dotX, dotY); ctx.lineTo(dotX, 360); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(dotX, dotY); ctx.lineTo(100, dotY); ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('T = ' + temp.toFixed(0) + ' K,  V = ' + vol.toFixed(2) + ' L', viz.width / 2, 16, viz.colors.white, 14);

                            // Draw piston diagram on right
                            var px0 = 520, py0 = 80, pw = 120;
                            var pistonH = 30 + vol * 18;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(px0, py0, pw, 140);
                            // gas fill
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.fillRect(px0 + 1, py0 + 140 - pistonH, pw - 2, pistonH - 1);
                            // piston
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillRect(px0, py0 + 140 - pistonH - 8, pw, 8);
                            // particles
                            for (var pi = 0; pi < 12; pi++) {
                                var ppx = px0 + 10 + Math.random() * (pw - 20);
                                var ppy = py0 + 140 - pistonH + 5 + Math.random() * (pistonH - 15);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(ppx, ppy, 3, 0, Math.PI * 2); ctx.fill();
                            }
                            viz.screenText('Constant P', px0 + pw / 2, py0 - 10, viz.colors.text, 11);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-charles-1',
                    type: 'numeric',
                    question: 'A gas occupies 5.0 L at 250 K. What volume does it occupy at 500 K (constant pressure)? Answer in liters.',
                    hint: 'V1/T1 = V2/T2.',
                    answer: '10',
                    solution: 'V2 = V1 T2/T1 = 5.0 x 500/250 = 10.0 L.'
                },
                {
                    id: 'ex-charles-2',
                    type: 'numeric',
                    question: 'A gas at 2.0 atm and 200 K is heated at constant volume to 400 K. What is the new pressure in atm?',
                    hint: 'Use Gay-Lussac: P1/T1 = P2/T2.',
                    answer: '4',
                    solution: 'P2 = P1 T2/T1 = 2.0 x 400/200 = 4.0 atm.'
                },
                {
                    id: 'ex-charles-3',
                    type: 'mc',
                    question: 'Why must temperature be measured in kelvins (not Celsius) for gas law calculations?',
                    options: [
                        'Because Kelvin is more precise',
                        'Because 0 K represents absolute zero where molecular motion ceases',
                        'Because Celsius uses larger units',
                        'Because Kelvin was invented later'
                    ],
                    correct: 1,
                    hint: 'Think about what happens at 0 degrees Celsius versus 0 K.',
                    solution: 'Gas laws require absolute temperature because V and P are proportional to absolute T. At 0 K, an ideal gas would have zero volume; at 0 C, it would not.'
                },
                {
                    id: 'ex-charles-4',
                    type: 'numeric',
                    question: 'At what temperature (in K) will a gas that occupies 3.0 L at 300 K expand to 9.0 L at constant pressure?',
                    hint: 'Rearrange V1/T1 = V2/T2 for T2.',
                    answer: '900',
                    solution: 'T2 = T1 V2/V1 = 300 x 9.0/3.0 = 900 K.'
                },
                {
                    id: 'ex-charles-5',
                    type: 'mc',
                    question: 'A sealed, rigid container of gas is cooled from 400 K to 200 K. What happens to the pressure?',
                    options: ['It doubles', 'It halves', 'It stays the same', 'It quadruples'],
                    correct: 1,
                    hint: 'Rigid container means constant volume. Use Gay-Lussac\'s law.',
                    solution: 'At constant volume, P/T = const, so P2 = P1 x 200/400 = P1/2. The pressure halves.'
                }
            ]
        },

        // ===== SECTION 3: Ideal Gas Law =====
        {
            id: 'ideal-gas-law',
            title: 'Ideal Gas Law',
            content: `
                <h2>The Ideal Gas Law</h2>

                <div class="env-block intuition">
                    <div class="env-title">Unifying the Gas Laws</div>
                    <div class="env-body"><p>Boyle's, Charles's, and Gay-Lussac's laws each hold one variable fixed. The ideal gas law combines all three into a single, powerful equation.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Ideal Gas Law</div>
                    <div class="env-body">
                        <p>\\[ PV = nRT \\]</p>
                        <p>where:</p>
                        <ul>
                            <li>\\(P\\) = pressure (Pa)</li>
                            <li>\\(V\\) = volume (m\\(^3\\))</li>
                            <li>\\(n\\) = number of moles</li>
                            <li>\\(R = 8.314\\) J/(mol K) is the universal gas constant</li>
                            <li>\\(T\\) = absolute temperature (K)</li>
                        </ul>
                    </div>
                </div>

                <p>Every simple gas law is a special case:</p>
                <ul>
                    <li>Fix \\(T\\) and \\(n\\): \\(PV = \\text{const}\\) (Boyle)</li>
                    <li>Fix \\(P\\) and \\(n\\): \\(V/T = \\text{const}\\) (Charles)</li>
                    <li>Fix \\(V\\) and \\(n\\): \\(P/T = \\text{const}\\) (Gay-Lussac)</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-ideal-gas-explorer"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Calculating Volume</div>
                    <div class="env-body">
                        <p>How many liters does 2.0 mol of an ideal gas occupy at 1.0 atm and 273 K?</p>
                        <p><strong>Solution:</strong> Convert: \\(P = 1.013 \\times 10^5\\) Pa. Then \\(V = nRT/P = 2.0 \\times 8.314 \\times 273 / (1.013 \\times 10^5) \\approx 0.0448 \\text{ m}^3 = 44.8\\) L.</p>
                        <p>This is consistent with the standard molar volume of about 22.4 L/mol at STP.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Combined Gas Law</div>
                    <div class="env-body"><p>For a fixed amount of gas changing from state 1 to state 2:</p>
                    <p>\\[ \\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2} \\]</p>
                    <p>This is the most versatile form when \\(n\\) is constant but \\(P\\), \\(V\\), and \\(T\\) all change.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Unit Consistency</div>
                    <div class="env-body"><p>When using \\(R = 8.314\\) J/(mol K), pressure must be in pascals and volume in cubic meters. If you prefer atm and liters, use \\(R = 0.0821\\) L atm/(mol K).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-ideal-gas-explorer',
                    title: 'Ideal Gas Law Explorer',
                    description: 'Adjust n, T, and V to see how P changes according to PV = nRT',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 30, originX: 350, originY: 200 });
                        var n = 1.0;
                        var T = 300;
                        var V = 10;
                        var R = 0.0821;

                        VizEngine.createSlider(controls, 'n (mol)', 0.5, 5, 1, 0.1, function(val) { n = val; draw(); });
                        VizEngine.createSlider(controls, 'T (K)', 100, 600, 300, 10, function(val) { T = val; draw(); });
                        VizEngine.createSlider(controls, 'V (L)', 1, 30, 10, 0.5, function(val) { V = val; draw(); });

                        function draw() {
                            viz.clear();
                            var P = n * R * T / V;
                            var ctx = viz.ctx;

                            // Container visualization
                            var cx = 180, cy = 60, cw = 180;
                            var maxH = 250;
                            var fillH = Math.min((V / 30) * maxH, maxH);

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(cx, cy, cw, maxH);

                            // gas fill
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(cx + 1, cy + maxH - fillH, cw - 2, fillH - 1);

                            // particles
                            var numP = Math.round(n * 8);
                            for (var i = 0; i < numP; i++) {
                                var px = cx + 10 + Math.random() * (cw - 20);
                                var py = cy + maxH - fillH + 5 + Math.random() * Math.max(fillH - 15, 5);
                                var speed = T / 300;
                                var pColor = speed > 1.3 ? viz.colors.red : (speed > 0.7 ? viz.colors.orange : viz.colors.blue);
                                ctx.fillStyle = pColor;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // Pressure gauge
                            var gx = 450, gy = 60;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(gx + 80, gy + 80, 70, 0, Math.PI * 2); ctx.stroke();
                            viz.screenText('Pressure', gx + 80, gy + 20, viz.colors.text, 12);

                            // gauge needle
                            var maxP = 20;
                            var angle = Math.PI + (P / maxP) * Math.PI;
                            if (P > maxP) angle = 2 * Math.PI;
                            var nx = gx + 80 + 50 * Math.cos(angle);
                            var ny = gy + 80 + 50 * Math.sin(angle);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(gx + 80, gy + 80); ctx.lineTo(nx, ny); ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(gx + 80, gy + 80, 4, 0, Math.PI * 2); ctx.fill();

                            // scale marks on gauge
                            for (var s = 0; s <= 10; s++) {
                                var sa = Math.PI + (s / 10) * Math.PI;
                                var sx1 = gx + 80 + 60 * Math.cos(sa);
                                var sy1 = gy + 80 + 60 * Math.sin(sa);
                                var sx2 = gx + 80 + 68 * Math.cos(sa);
                                var sy2 = gy + 80 + 68 * Math.sin(sa);
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                            }

                            // readout
                            viz.screenText('P = ' + P.toFixed(2) + ' atm', viz.width / 2, 350, viz.colors.white, 16);
                            viz.screenText('PV = nRT', viz.width / 2, 375, viz.colors.teal, 13);
                            viz.screenText(P.toFixed(2) + ' x ' + V.toFixed(1) + ' = ' + n.toFixed(1) + ' x 0.0821 x ' + T.toFixed(0), viz.width / 2, 393, viz.colors.text, 11);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-ideal-1',
                    type: 'numeric',
                    question: 'What pressure (in atm) does 1.0 mol of ideal gas exert in a 22.4 L container at 273 K? Use R = 0.0821 L atm/(mol K).',
                    hint: 'P = nRT/V.',
                    answer: '1',
                    solution: 'P = nRT/V = (1.0)(0.0821)(273) / 22.4 = 1.00 atm. This is STP.'
                },
                {
                    id: 'ex-ideal-2',
                    type: 'numeric',
                    question: 'How many moles of gas are in a 5.0 L container at 2.0 atm and 400 K? Round to one decimal.',
                    hint: 'n = PV/(RT).',
                    answer: '0.3',
                    solution: 'n = PV/(RT) = (2.0)(5.0) / (0.0821 x 400) = 10 / 32.84 = 0.30 mol.'
                },
                {
                    id: 'ex-ideal-3',
                    type: 'mc',
                    question: 'If you double both the temperature and the number of moles while keeping pressure constant, the volume:',
                    options: ['Stays the same', 'Doubles', 'Quadruples', 'Halves'],
                    correct: 2,
                    hint: 'V = nRT/P. Both n and T are doubled.',
                    solution: 'V = nRT/P. Doubling n and T multiplies V by 2 x 2 = 4. The volume quadruples.'
                },
                {
                    id: 'ex-ideal-4',
                    type: 'numeric',
                    question: 'A gas at 1.0 atm, 10 L, and 300 K is changed to 2.0 atm and 600 K. What is the new volume in liters?',
                    hint: 'Use the combined gas law: P1V1/T1 = P2V2/T2.',
                    answer: '10',
                    solution: 'V2 = P1 V1 T2 / (T1 P2) = (1.0)(10)(600) / (300 x 2.0) = 6000/600 = 10 L.'
                },
                {
                    id: 'ex-ideal-5',
                    type: 'numeric',
                    question: 'At STP (1.0 atm, 273 K), what volume in liters does 0.5 mol of an ideal gas occupy?',
                    hint: 'Standard molar volume is 22.4 L/mol.',
                    answer: '11.2',
                    solution: 'V = nRT/P = 0.5 x 0.0821 x 273 / 1.0 = 11.2 L (or simply 0.5 x 22.4 = 11.2 L).'
                }
            ]
        },

        // ===== SECTION 4: First Law of Thermodynamics =====
        {
            id: 'first-law',
            title: 'First Law of Thermodynamics',
            content: `
                <h2>First Law of Thermodynamics</h2>

                <div class="env-block intuition">
                    <div class="env-title">Energy Bookkeeping</div>
                    <div class="env-body"><p>The first law of thermodynamics is simply the conservation of energy applied to thermal systems. Heat can flow in, work can be done, and the internal energy of the gas changes accordingly.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">First Law of Thermodynamics</div>
                    <div class="env-body">
                        <p>\\[ \\Delta U = Q - W \\]</p>
                        <p>where:</p>
                        <ul>
                            <li>\\(\\Delta U\\) = change in internal energy of the system</li>
                            <li>\\(Q\\) = heat added <em>to</em> the system (positive when heat flows in)</li>
                            <li>\\(W\\) = work done <em>by</em> the system (positive when the gas expands)</li>
                        </ul>
                    </div>
                </div>

                <p>For an ideal gas, the internal energy depends only on temperature: \\(U = \\frac{f}{2}nRT\\), where \\(f\\) is the number of degrees of freedom (\\(f=3\\) for a monatomic gas, \\(f=5\\) for a diatomic gas). So \\(\\Delta U = 0\\) if and only if the temperature stays constant.</p>

                <div class="env-block definition">
                    <div class="env-title">Important Thermodynamic Processes</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Isothermal</strong> (constant T): \\(\\Delta U = 0\\), so \\(Q = W\\). All heat input becomes work.</li>
                            <li><strong>Isobaric</strong> (constant P): \\(W = P\\Delta V\\). Heat goes to both work and internal energy.</li>
                            <li><strong>Isochoric</strong> (constant V): \\(W = 0\\), so \\(\\Delta U = Q\\). All heat goes to internal energy.</li>
                            <li><strong>Adiabatic</strong> (Q = 0): \\(\\Delta U = -W\\). Work is done at the expense of internal energy.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-thermo-processes"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Applying the First Law</div>
                    <div class="env-body">
                        <p>A gas absorbs 500 J of heat and does 200 J of work on its surroundings. What is the change in internal energy?</p>
                        <p><strong>Solution:</strong> \\(\\Delta U = Q - W = 500 - 200 = 300\\) J. The internal energy (and therefore the temperature) increases.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Adiabatic Compression</div>
                    <div class="env-body">
                        <p>A gas is compressed adiabatically, and 400 J of work is done <em>on</em> the gas. What is the change in internal energy?</p>
                        <p><strong>Solution:</strong> Adiabatic means \\(Q=0\\). Work done <em>on</em> the gas means \\(W=-400\\) J (the gas does negative work). So \\(\\Delta U = 0 - (-400) = 400\\) J. The gas heats up.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Work on a PV Diagram</div>
                    <div class="env-body"><p>The work done by the gas equals the area under the curve on a \\(P\\text{-}V\\) diagram. Expansion means positive work; compression means negative work.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-thermo-processes',
                    title: 'Thermodynamic Processes on a PV Diagram',
                    description: 'Compare isothermal, adiabatic, isobaric, and isochoric processes',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 80, originY: 380 });
                        var process = 'isothermal';

                        VizEngine.createButton(controls, 'Isothermal', function() { process = 'isothermal'; draw(); });
                        VizEngine.createButton(controls, 'Adiabatic', function() { process = 'adiabatic'; draw(); });
                        VizEngine.createButton(controls, 'Isobaric', function() { process = 'isobaric'; draw(); });
                        VizEngine.createButton(controls, 'Isochoric', function() { process = 'isochoric'; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 380); ctx.lineTo(660, 380); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 380); ctx.lineTo(80, 30); ctx.stroke();
                            viz.screenText('V', 660, 395, viz.colors.white, 14, 'right');
                            viz.screenText('P', 65, 30, viz.colors.white, 14, 'right');

                            // Starting point: P=4, V=2
                            var P0 = 4, V0 = 2;
                            var Vf = 5; // final volume for expansion
                            var scaleV = 100; // pixels per unit V
                            var scaleP = 70;  // pixels per unit P

                            function toSx(v) { return 80 + v * scaleV; }
                            function toSy(p) { return 380 - p * scaleP; }

                            // Draw the process curve
                            ctx.lineWidth = 3;
                            var processColor, processLabel, desc;
                            var points = [];
                            var areaPoints = [];

                            if (process === 'isothermal') {
                                processColor = viz.colors.blue;
                                processLabel = 'Isothermal (T = const)';
                                desc = 'DU = 0, Q = W';
                                var C = P0 * V0;
                                for (var v = V0; v <= Vf; v += 0.02) {
                                    points.push([toSx(v), toSy(C / v)]);
                                    areaPoints.push([toSx(v), toSy(C / v)]);
                                }
                            } else if (process === 'adiabatic') {
                                processColor = viz.colors.orange;
                                processLabel = 'Adiabatic (Q = 0)';
                                desc = 'DU = -W';
                                var gamma = 5.0 / 3.0;
                                var K = P0 * Math.pow(V0, gamma);
                                for (var v = V0; v <= Vf; v += 0.02) {
                                    var p = K / Math.pow(v, gamma);
                                    points.push([toSx(v), toSy(p)]);
                                    areaPoints.push([toSx(v), toSy(p)]);
                                }
                            } else if (process === 'isobaric') {
                                processColor = viz.colors.green;
                                processLabel = 'Isobaric (P = const)';
                                desc = 'W = P DV';
                                for (var v = V0; v <= Vf; v += 0.02) {
                                    points.push([toSx(v), toSy(P0)]);
                                    areaPoints.push([toSx(v), toSy(P0)]);
                                }
                            } else {
                                processColor = viz.colors.purple;
                                processLabel = 'Isochoric (V = const)';
                                desc = 'W = 0, DU = Q';
                                for (var p = P0; p >= 2; p -= 0.02) {
                                    points.push([toSx(V0), toSy(p)]);
                                }
                            }

                            // Shade area under curve (work)
                            if (process !== 'isochoric' && areaPoints.length > 1) {
                                ctx.fillStyle = processColor + '22';
                                ctx.beginPath();
                                ctx.moveTo(areaPoints[0][0], 380);
                                for (var i = 0; i < areaPoints.length; i++) {
                                    ctx.lineTo(areaPoints[i][0], areaPoints[i][1]);
                                }
                                ctx.lineTo(areaPoints[areaPoints.length - 1][0], 380);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('W = area', (toSx(V0) + toSx(Vf)) / 2, 380 - 30, processColor, 12);
                            }

                            // Draw curve
                            if (points.length > 1) {
                                ctx.strokeStyle = processColor;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(points[0][0], points[0][1]);
                                for (var i = 1; i < points.length; i++) {
                                    ctx.lineTo(points[i][0], points[i][1]);
                                }
                                ctx.stroke();

                                // start and end dots
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(points[0][0], points[0][1], 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = processColor;
                                ctx.beginPath(); ctx.arc(points[0][0], points[0][1], 4, 0, Math.PI * 2); ctx.fill();

                                var last = points[points.length - 1];
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(last[0], last[1], 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = processColor;
                                ctx.beginPath(); ctx.arc(last[0], last[1], 4, 0, Math.PI * 2); ctx.fill();

                                // arrow
                                var mid = Math.floor(points.length / 2);
                                var dx = points[mid + 1][0] - points[mid][0];
                                var dy = points[mid + 1][1] - points[mid][1];
                                var angle = Math.atan2(dy, dx);
                                ctx.fillStyle = processColor;
                                ctx.beginPath();
                                ctx.moveTo(points[mid][0] + 8 * Math.cos(angle), points[mid][1] + 8 * Math.sin(angle));
                                ctx.lineTo(points[mid][0] + 8 * Math.cos(angle - 2.5), points[mid][1] + 8 * Math.sin(angle - 2.5));
                                ctx.lineTo(points[mid][0] + 8 * Math.cos(angle + 2.5), points[mid][1] + 8 * Math.sin(angle + 2.5));
                                ctx.closePath(); ctx.fill();
                            }

                            viz.screenText(processLabel, viz.width / 2, 16, processColor, 16);
                            viz.screenText(desc, viz.width / 2, 38, viz.colors.text, 13);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-first-1',
                    type: 'numeric',
                    question: 'A gas absorbs 800 J of heat and does 300 J of work. What is the change in internal energy (in J)?',
                    hint: 'DU = Q - W.',
                    answer: '500',
                    solution: 'DU = Q - W = 800 - 300 = 500 J.'
                },
                {
                    id: 'ex-first-2',
                    type: 'mc',
                    question: 'In an isothermal process for an ideal gas, which quantity is zero?',
                    options: ['Q', 'W', 'DU', 'P'],
                    correct: 2,
                    hint: 'For an ideal gas, internal energy depends only on temperature.',
                    solution: 'Isothermal means constant T, so DU = 0 for an ideal gas.'
                },
                {
                    id: 'ex-first-3',
                    type: 'numeric',
                    question: 'In an adiabatic process, 600 J of work is done ON the gas. What is DU (in J)?',
                    hint: 'Adiabatic: Q = 0. Work done ON the gas means W is negative (gas does negative work).',
                    answer: '600',
                    solution: 'Q = 0, W = -600 J (work done BY gas is -600). DU = Q - W = 0 - (-600) = 600 J.'
                },
                {
                    id: 'ex-first-4',
                    type: 'mc',
                    question: 'In which process is no work done by or on the gas?',
                    options: ['Isothermal', 'Isobaric', 'Isochoric', 'Adiabatic'],
                    correct: 2,
                    hint: 'W = P DV. When is DV = 0?',
                    solution: 'Isochoric (constant volume) means DV = 0, so W = P DV = 0.'
                },
                {
                    id: 'ex-first-5',
                    type: 'numeric',
                    question: 'A gas at constant pressure 2.0 x 10^5 Pa expands from 0.01 m^3 to 0.03 m^3. How much work (in J) does the gas do?',
                    hint: 'W = P DV for isobaric process.',
                    answer: '4000',
                    solution: 'W = P DV = 2.0e5 x (0.03 - 0.01) = 2.0e5 x 0.02 = 4000 J.'
                }
            ]
        },

        // ===== SECTION 5: Second Law and Heat Engines =====
        {
            id: 'second-law-engines',
            title: 'Second Law and Heat Engines',
            content: `
                <h2>Second Law and Heat Engines</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Can't We Convert All Heat to Work?</div>
                    <div class="env-body"><p>The first law says energy is conserved. But it does not tell us which processes actually happen. A hot cup of coffee cools down; it never spontaneously heats up. The second law of thermodynamics captures this one-way nature of heat flow.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Second Law of Thermodynamics (Kelvin-Planck Statement)</div>
                    <div class="env-body"><p>It is impossible to build a heat engine that converts heat entirely into work with no other effect. Some heat must always be rejected to a cold reservoir.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Second Law (Clausius Statement)</div>
                    <div class="env-body"><p>Heat cannot spontaneously flow from a colder body to a hotter body without external work being done.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Heat Engine Efficiency</div>
                    <div class="env-body">
                        <p>A heat engine absorbs heat \\(Q_H\\) from a hot reservoir, does work \\(W\\), and rejects heat \\(Q_C\\) to a cold reservoir.</p>
                        <p>\\[ \\eta = \\frac{W}{Q_H} = \\frac{Q_H - Q_C}{Q_H} = 1 - \\frac{Q_C}{Q_H} \\]</p>
                        <p>The efficiency is always less than 1 (less than 100%).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-heat-engine"></div>

                <div class="env-block definition">
                    <div class="env-title">Carnot Efficiency</div>
                    <div class="env-body">
                        <p>The maximum possible efficiency for any heat engine operating between temperatures \\(T_H\\) and \\(T_C\\) (in kelvins) is the Carnot efficiency:</p>
                        <p>\\[ \\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} \\]</p>
                        <p>No real engine can exceed this limit.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-carnot-cycle"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Carnot Efficiency</div>
                    <div class="env-body">
                        <p>A power plant operates between a boiler at 600 K and a condenser at 300 K. What is the maximum theoretical efficiency?</p>
                        <p><strong>Solution:</strong> \\(\\eta_{\\text{Carnot}} = 1 - 300/600 = 0.50\\), or 50%. In practice, real engines achieve less due to friction and irreversibility.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Entropy and Disorder</div>
                    <div class="env-body"><p>The second law can also be stated in terms of entropy \\(S\\): in any spontaneous process, the total entropy of an isolated system never decreases (\\(\\Delta S \\geq 0\\)). Entropy measures the "spread" of energy among microscopic states.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-heat-engine',
                    title: 'Heat Engine Diagram',
                    description: 'Adjust hot and cold reservoir temperatures to see how efficiency changes',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 30, originX: 350, originY: 200 });
                        var TH = 600;
                        var TC = 300;

                        VizEngine.createSlider(controls, 'T_hot (K)', 400, 1000, 600, 10, function(v) { TH = v; draw(); });
                        VizEngine.createSlider(controls, 'T_cold (K)', 200, 500, 300, 10, function(v) { TC = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            if (TC >= TH) TC = TH - 10;
                            var eta = 1 - TC / TH;
                            var QH = 1000;
                            var W = eta * QH;
                            var QC = QH - W;

                            // Hot reservoir
                            ctx.fillStyle = viz.colors.red + '44';
                            ctx.fillRect(250, 30, 200, 60);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(250, 30, 200, 60);
                            viz.screenText('Hot Reservoir', 350, 50, viz.colors.red, 14);
                            viz.screenText('T_H = ' + TH + ' K', 350, 72, viz.colors.red, 12);

                            // Engine
                            ctx.fillStyle = viz.colors.orange + '44';
                            ctx.beginPath();
                            ctx.moveTo(300, 150); ctx.lineTo(400, 150);
                            ctx.lineTo(380, 230); ctx.lineTo(320, 230);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(300, 150); ctx.lineTo(400, 150);
                            ctx.lineTo(380, 230); ctx.lineTo(320, 230);
                            ctx.closePath(); ctx.stroke();
                            viz.screenText('Engine', 350, 185, viz.colors.orange, 14);

                            // Cold reservoir
                            ctx.fillStyle = viz.colors.blue + '44';
                            ctx.fillRect(250, 280, 200, 60);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(250, 280, 200, 60);
                            viz.screenText('Cold Reservoir', 350, 300, viz.colors.blue, 14);
                            viz.screenText('T_C = ' + TC + ' K', 350, 322, viz.colors.blue, 12);

                            // Q_H arrow down
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(350, 90); ctx.lineTo(350, 145); ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.moveTo(350, 150); ctx.lineTo(344, 140); ctx.lineTo(356, 140); ctx.closePath(); ctx.fill();
                            viz.screenText('Q_H = ' + QH.toFixed(0) + ' J', 300, 118, viz.colors.red, 12, 'right');

                            // Q_C arrow down
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(350, 235); ctx.lineTo(350, 275); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.moveTo(350, 280); ctx.lineTo(344, 270); ctx.lineTo(356, 270); ctx.closePath(); ctx.fill();
                            viz.screenText('Q_C = ' + QC.toFixed(0) + ' J', 300, 258, viz.colors.blue, 12, 'right');

                            // W arrow right
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(400, 190); ctx.lineTo(490, 190); ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.moveTo(495, 190); ctx.lineTo(485, 184); ctx.lineTo(485, 196); ctx.closePath(); ctx.fill();
                            viz.screenText('W = ' + W.toFixed(0) + ' J', 500, 190, viz.colors.green, 13, 'left');

                            // Efficiency
                            viz.screenText('Carnot Efficiency: ' + (eta * 100).toFixed(1) + '%', 570, 350, viz.colors.white, 15, 'center');

                            // Efficiency bar
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(500, 30, 30, 300);
                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.fillRect(500, 30 + 300 * (1 - eta), 30, 300 * eta);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(500, 30, 30, 300);
                            viz.screenText((eta * 100).toFixed(0) + '%', 515, 30 + 300 * (1 - eta) - 10, viz.colors.green, 11);
                        }

                        draw();
                    }
                },
                {
                    id: 'viz-carnot-cycle',
                    title: 'Carnot Cycle on PV Diagram',
                    description: 'Watch the four steps of the Carnot cycle animated on a PV diagram',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 80, originY: 380 });
                        var animPhase = 0;
                        var animating = false;

                        VizEngine.createButton(controls, 'Animate Cycle', function() {
                            if (animating) return;
                            animating = true;
                            animPhase = 0;
                            var startTime = performance.now();
                            function step(t) {
                                animPhase = ((t - startTime) / 6000) % 1;
                                draw();
                                if (animating) requestAnimationFrame(step);
                            }
                            requestAnimationFrame(step);
                        });
                        VizEngine.createButton(controls, 'Stop', function() { animating = false; });

                        // Carnot cycle parameters
                        var TH = 600, TC = 300;
                        var V1 = 1.0, gamma = 5.0 / 3.0;
                        var nR_TH = 8; // nRT_H in convenient units
                        var nR_TC = 4; // nRT_C
                        var P1 = nR_TH / V1; // 8
                        // isothermal expansion: PV = nRT_H, V1->V2
                        var V2 = 2.0;
                        var P2 = nR_TH / V2;
                        // adiabatic expansion: TV^(gamma-1) = const, V2->V3
                        var V3 = V2 * Math.pow(TH / TC, 1 / (gamma - 1));
                        var P3 = nR_TC / V3;
                        // isothermal compression: PV = nRT_C, V3->V4
                        var V4 = V1 * Math.pow(TH / TC, 1 / (gamma - 1)) / Math.pow(TH / TC, 1 / (gamma - 1));
                        V4 = V3 / (V2 / V1);
                        var P4 = nR_TC / V4;

                        var scaleV = 80;
                        var scaleP = 35;
                        function toSx(v) { return 80 + v * scaleV; }
                        function toSy(p) { return 380 - p * scaleP; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 380); ctx.lineTo(660, 380); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 380); ctx.lineTo(80, 20); ctx.stroke();
                            viz.screenText('V', 660, 395, viz.colors.white, 14, 'right');
                            viz.screenText('P', 65, 20, viz.colors.white, 14, 'right');

                            // Step 1: Isothermal expansion (1->2) at T_H
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var v = V1; v <= V2; v += 0.01) {
                                var p = nR_TH / v;
                                var method = v === V1 ? 'moveTo' : 'lineTo';
                                ctx[method](toSx(v), toSy(p));
                            }
                            ctx.stroke();

                            // Step 2: Adiabatic expansion (2->3)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            var K_ad1 = P2 * Math.pow(V2, gamma);
                            for (var v = V2; v <= V3; v += 0.02) {
                                var p = K_ad1 / Math.pow(v, gamma);
                                var method = v === V2 ? 'moveTo' : 'lineTo';
                                ctx[method](toSx(v), toSy(p));
                            }
                            ctx.stroke();

                            // Step 3: Isothermal compression (3->4) at T_C
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath();
                            for (var v = V3; v >= V4; v -= 0.02) {
                                var p = nR_TC / v;
                                var method = v === V3 ? 'moveTo' : 'lineTo';
                                ctx[method](toSx(v), toSy(p));
                            }
                            ctx.stroke();

                            // Step 4: Adiabatic compression (4->1)
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath();
                            var K_ad2 = P4 * Math.pow(V4, gamma);
                            for (var v = V4; v >= V1; v -= 0.01) {
                                var p = K_ad2 / Math.pow(v, gamma);
                                var method = v === V4 ? 'moveTo' : 'lineTo';
                                ctx[method](toSx(v), toSy(p));
                            }
                            ctx.stroke();

                            // State points
                            var states = [
                                { v: V1, p: P1, label: '1' },
                                { v: V2, p: P2, label: '2' },
                                { v: V3, p: P3, label: '3' },
                                { v: V4, p: P4, label: '4' }
                            ];
                            for (var i = 0; i < states.length; i++) {
                                var s = states[i];
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(toSx(s.v), toSy(s.p), 6, 0, Math.PI * 2); ctx.fill();
                                viz.screenText(s.label, toSx(s.v) + 12, toSy(s.p) - 12, viz.colors.white, 13);
                            }

                            // Animated dot
                            if (animating) {
                                var phase = animPhase * 4;
                                var av, ap;
                                if (phase < 1) {
                                    var t = phase;
                                    av = V1 + t * (V2 - V1);
                                    ap = nR_TH / av;
                                } else if (phase < 2) {
                                    var t = phase - 1;
                                    av = V2 + t * (V3 - V2);
                                    ap = K_ad1 / Math.pow(av, gamma);
                                } else if (phase < 3) {
                                    var t = phase - 2;
                                    av = V3 + t * (V4 - V3);
                                    ap = nR_TC / av;
                                } else {
                                    var t = phase - 3;
                                    av = V4 + t * (V1 - V4);
                                    ap = K_ad2 / Math.pow(av, gamma);
                                }
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(toSx(av), toSy(ap), 8, 0, Math.PI * 2); ctx.fill();
                            }

                            // Labels
                            viz.screenText('1 -> 2: Isothermal expansion (absorb Q_H)', 400, 30, viz.colors.red, 12, 'center');
                            viz.screenText('2 -> 3: Adiabatic expansion', 400, 48, viz.colors.orange, 12, 'center');
                            viz.screenText('3 -> 4: Isothermal compression (reject Q_C)', 400, 66, viz.colors.blue, 12, 'center');
                            viz.screenText('4 -> 1: Adiabatic compression', 400, 84, viz.colors.teal, 12, 'center');

                            var eta = 1 - TC / TH;
                            viz.screenText('Carnot efficiency = 1 - T_C/T_H = ' + (eta * 100).toFixed(1) + '%', 400, 108, viz.colors.white, 13, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-second-1',
                    type: 'numeric',
                    question: 'A heat engine absorbs 2000 J from the hot reservoir and rejects 1200 J to the cold reservoir. What is its efficiency as a percentage?',
                    hint: 'eta = (Q_H - Q_C) / Q_H.',
                    answer: '40',
                    solution: 'eta = (2000 - 1200) / 2000 = 800/2000 = 0.40 = 40%.'
                },
                {
                    id: 'ex-second-2',
                    type: 'numeric',
                    question: 'What is the Carnot efficiency (in percent) of an engine operating between 800 K and 200 K?',
                    hint: 'eta_Carnot = 1 - T_C/T_H.',
                    answer: '75',
                    solution: 'eta = 1 - 200/800 = 1 - 0.25 = 0.75 = 75%.'
                },
                {
                    id: 'ex-second-3',
                    type: 'mc',
                    question: 'According to the second law, which of the following is impossible?',
                    options: [
                        'Converting work entirely into heat',
                        'Converting heat entirely into work in a cyclic process',
                        'Transferring heat from hot to cold',
                        'Increasing the entropy of the universe'
                    ],
                    correct: 1,
                    hint: 'The Kelvin-Planck statement addresses cyclic heat-to-work conversion.',
                    solution: 'The second law (Kelvin-Planck) forbids a cyclic process that converts heat entirely into work with no other effect.'
                },
                {
                    id: 'ex-second-4',
                    type: 'numeric',
                    question: 'A Carnot engine has efficiency 60%. If T_C = 300 K, what is T_H in kelvins?',
                    hint: 'eta = 1 - T_C/T_H, so T_H = T_C / (1 - eta).',
                    answer: '750',
                    solution: 'T_H = T_C / (1 - eta) = 300 / (1 - 0.6) = 300 / 0.4 = 750 K.'
                },
                {
                    id: 'ex-second-5',
                    type: 'numeric',
                    question: 'A heat engine does 500 J of work per cycle with efficiency 25%. How much heat does it absorb from the hot reservoir per cycle (in J)?',
                    hint: 'eta = W / Q_H.',
                    answer: '2000',
                    solution: 'Q_H = W / eta = 500 / 0.25 = 2000 J.'
                }
            ]
        }
    ]
});
