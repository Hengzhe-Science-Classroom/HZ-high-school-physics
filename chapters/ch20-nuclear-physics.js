window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch20',
    number: 20,
    title: 'Nuclear Physics',
    subtitle: 'The Heart of the Atom',
    sections: [
        // ===== SECTION 1: Nuclear Structure =====
        {
            id: 'nuclear-structure',
            title: 'Nuclear Structure',
            content: `
                <h2>Nuclear Structure</h2>

                <div class="env-block intuition">
                    <div class="env-title">Inside the Atom</div>
                    <div class="env-body"><p>In 1911, Rutherford's gold foil experiment revealed that almost all of an atom's mass is concentrated in a tiny, dense nucleus. The nucleus is about \\(10^{-15}\\) m across (a femtometer), roughly 100,000 times smaller than the atom itself. This final chapter explores what the nucleus is made of and the enormous energies locked inside.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Nucleons</div>
                    <div class="env-body">
                        <p>The nucleus consists of two types of particles called <strong>nucleons</strong>:</p>
                        <ul>
                            <li><strong>Protons</strong> (charge \\(+e\\), mass \\(\\approx 1.673 \\times 10^{-27}\\) kg): The number of protons is the <em>atomic number</em> \\(Z\\) and determines the element.</li>
                            <li><strong>Neutrons</strong> (charge 0, mass \\(\\approx 1.675 \\times 10^{-27}\\) kg): Neutrons provide nuclear binding without adding electric repulsion.</li>
                        </ul>
                        <p>The total number of nucleons is the <strong>mass number</strong> \\(A = Z + N\\), where \\(N\\) is the number of neutrons.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Nuclide Notation</div>
                    <div class="env-body">
                        <p>A specific nuclide is written as:</p>
                        <p>\\[ {}^A_Z X \\]</p>
                        <p>For example, \\({}^{12}_6\\text{C}\\) is carbon-12 with 6 protons and 6 neutrons.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Isotopes</div>
                    <div class="env-body"><p>Atoms of the same element (same \\(Z\\)) but with different numbers of neutrons (different \\(N\\)) are called <strong>isotopes</strong>. For example, \\({}^{12}_6\\text{C}\\) and \\({}^{14}_6\\text{C}\\) are both carbon, but carbon-14 has two extra neutrons.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-nuclear-structure"></div>

                <div class="env-block definition">
                    <div class="env-title">Nuclear Force</div>
                    <div class="env-body"><p>Protons repel each other electrically. The nucleus is held together by the <strong>strong nuclear force</strong>, which acts between all nucleons (protons and neutrons) and is attractive at short range (~1 fm). It is about 100 times stronger than the electromagnetic force at nuclear distances.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Identifying a Nuclide</div>
                    <div class="env-body">
                        <p>A nuclide has 8 protons and 10 neutrons. What is it?</p>
                        <p><strong>Solution:</strong> \\(Z = 8\\) (oxygen), \\(A = 8 + 10 = 18\\). This is \\({}^{18}_8\\text{O}\\), oxygen-18.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Nuclear Size</div>
                    <div class="env-body"><p>The nuclear radius follows an empirical formula: \\(r \\approx r_0 A^{1/3}\\) where \\(r_0 \\approx 1.2\\) fm. This means the volume of a nucleus is proportional to \\(A\\), implying roughly constant nuclear density.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-nuclear-structure',
                    title: 'Nuclear Structure Explorer',
                    description: 'Adjust the number of protons and neutrons to build different nuclides',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 350, originY: 210 });
                        var Z = 6;
                        var N = 6;

                        var elements = ['n', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
                            'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
                            'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];

                        VizEngine.createSlider(controls, 'Protons (Z)', 1, 20, 6, 1, function(v) { Z = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Neutrons (N)', 0, 30, 6, 1, function(v) { N = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var A = Z + N;
                            var elemName = Z <= 30 ? elements[Z] : '?';

                            // Title
                            viz.screenText('Nuclide: ' + A + '-' + elemName + '  (Z=' + Z + ', N=' + N + ', A=' + A + ')', viz.width / 2, 20, viz.colors.white, 16, 'center');

                            // Draw nucleus
                            var cx = 250, cy = 220;
                            var nucRadius = 15 + Math.pow(A, 1.0 / 3) * 18;

                            // nucleus background
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.beginPath(); ctx.arc(cx, cy, nucRadius, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = viz.colors.purple + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(cx, cy, nucRadius, 0, Math.PI * 2); ctx.stroke();

                            // Place nucleons using a simple packing
                            var nucleons = [];
                            for (var i = 0; i < Z; i++) nucleons.push({ type: 'p' });
                            for (var i = 0; i < N; i++) nucleons.push({ type: 'n' });

                            // shuffle
                            for (var i = nucleons.length - 1; i > 0; i--) {
                                var j = Math.floor(Math.random() * 0.99999 * (i + 1));
                                var temp = nucleons[i]; nucleons[i] = nucleons[j]; nucleons[j] = temp;
                            }

                            // fixed random seed based on Z,N
                            var seed = Z * 100 + N;
                            function seededRandom() {
                                seed = (seed * 9301 + 49297) % 233280;
                                return seed / 233280;
                            }

                            var particleR = Math.max(4, Math.min(10, 60 / Math.sqrt(A)));
                            for (var i = 0; i < nucleons.length; i++) {
                                var angle = seededRandom() * Math.PI * 2;
                                var dist = seededRandom() * (nucRadius - particleR - 2);
                                var px = cx + dist * Math.cos(angle);
                                var py = cy + dist * Math.sin(angle);
                                var isProton = nucleons[i].type === 'p';
                                ctx.fillStyle = isProton ? viz.colors.red : viz.colors.blue;
                                ctx.beginPath(); ctx.arc(px, py, particleR, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = '#ffffff33';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.arc(px, py, particleR, 0, Math.PI * 2); ctx.stroke();
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(500, 100, 8, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('Proton (p)', 515, 100, viz.colors.text, 12, 'left');

                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(500, 125, 8, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('Neutron (n)', 515, 125, viz.colors.text, 12, 'left');

                            // Info
                            var r = 1.2 * Math.pow(A, 1.0 / 3);
                            viz.screenText('Nuclear radius ~ ' + r.toFixed(2) + ' fm', 530, 200, viz.colors.text, 12, 'center');
                            viz.screenText('Atom radius ~ 100,000 fm', 530, 220, viz.colors.text, 11, 'center');

                            // Stability hint
                            var ratio = N / Z;
                            var stable = (Z <= 20 && Math.abs(ratio - 1) < 0.3) || (Z > 20 && ratio > 1 && ratio < 1.6);
                            var stabMsg = stable ? 'Likely stable' : 'Likely unstable (radioactive)';
                            var stabColor = stable ? viz.colors.green : viz.colors.orange;
                            viz.screenText(stabMsg, 530, 260, stabColor, 13, 'center');
                            viz.screenText('N/Z ratio: ' + ratio.toFixed(2), 530, 280, viz.colors.text, 11, 'center');

                            // Electron cloud hint
                            ctx.strokeStyle = viz.colors.teal + '33';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 5]);
                            ctx.beginPath(); ctx.arc(cx, cy, 180, 0, Math.PI * 2); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Electron cloud (not to scale)', cx, cy + 192, viz.colors.teal + '88', 10, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-nuc-1',
                    type: 'numeric',
                    question: 'How many neutrons does the nuclide U-238 (Z=92) have?',
                    hint: 'N = A - Z.',
                    answer: '146',
                    solution: 'N = A - Z = 238 - 92 = 146 neutrons.'
                },
                {
                    id: 'ex-nuc-2',
                    type: 'mc',
                    question: 'Isotopes of an element have the same:',
                    options: ['Mass number', 'Number of neutrons', 'Number of protons', 'Nuclear radius'],
                    correct: 2,
                    hint: 'What defines an element?',
                    solution: 'Isotopes have the same number of protons (Z) but different numbers of neutrons.'
                },
                {
                    id: 'ex-nuc-3',
                    type: 'mc',
                    question: 'What holds the nucleus together despite the electrostatic repulsion between protons?',
                    options: ['Gravity', 'Electromagnetic force', 'Strong nuclear force', 'Weak nuclear force'],
                    correct: 2,
                    hint: 'It is much stronger than electromagnetism at very short range.',
                    solution: 'The strong nuclear force binds nucleons at distances of ~1 fm, overcoming proton-proton repulsion.'
                },
                {
                    id: 'ex-nuc-4',
                    type: 'numeric',
                    question: 'Carbon-14 has 6 protons. How many neutrons does it have?',
                    hint: 'N = A - Z = 14 - 6.',
                    answer: '8',
                    solution: 'N = 14 - 6 = 8 neutrons.'
                },
                {
                    id: 'ex-nuc-5',
                    type: 'mc',
                    question: 'The nuclear radius approximately follows r = r_0 A^(1/3). If A increases by a factor of 8, the radius increases by a factor of:',
                    options: ['2', '4', '8', '64'],
                    correct: 0,
                    hint: 'Cube root of 8 = ?',
                    solution: 'r scales as A^(1/3). If A increases by 8, r increases by 8^(1/3) = 2.'
                }
            ]
        },

        // ===== SECTION 2: Radioactive Decay =====
        {
            id: 'radioactive-decay',
            title: 'Radioactive Decay',
            content: `
                <h2>Radioactive Decay</h2>

                <div class="env-block intuition">
                    <div class="env-title">Unstable Nuclei</div>
                    <div class="env-body"><p>Not all nuclei are stable. If the balance between the strong force and electromagnetic repulsion is not right, the nucleus will spontaneously transform by emitting particles or radiation. This process is called <strong>radioactive decay</strong>. It is random for any individual nucleus but statistically predictable for large numbers.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Types of Radioactive Decay</div>
                    <div class="env-body">
                        <p><strong>Alpha (\\(\\alpha\\)) decay:</strong> The nucleus emits a helium-4 nucleus (\\({}^4_2\\text{He}\\)). The mass number decreases by 4 and the atomic number by 2.</p>
                        <p>\\[ {}^A_Z X \\to {}^{A-4}_{Z-2} Y + {}^4_2 \\text{He} \\]</p>

                        <p><strong>Beta-minus (\\(\\beta^-\\)) decay:</strong> A neutron converts to a proton, emitting an electron and an antineutrino. The mass number stays the same; \\(Z\\) increases by 1.</p>
                        <p>\\[ {}^A_Z X \\to {}^{A}_{Z+1} Y + e^- + \\bar{\\nu}_e \\]</p>

                        <p><strong>Gamma (\\(\\gamma\\)) decay:</strong> The nucleus releases excess energy as a high-energy photon. Neither \\(A\\) nor \\(Z\\) changes.</p>
                        <p>\\[ {}^A_Z X^* \\to {}^A_Z X + \\gamma \\]</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-decay-types"></div>

                <div class="env-block definition">
                    <div class="env-title">Penetrating Power</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Alpha:</strong> Stopped by a sheet of paper or a few centimeters of air. Highly ionizing.</li>
                            <li><strong>Beta:</strong> Stopped by a few millimeters of aluminum. Moderately ionizing.</li>
                            <li><strong>Gamma:</strong> Requires several centimeters of lead or thick concrete. Weakly ionizing but highly penetrating.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Alpha Decay of Uranium-238</div>
                    <div class="env-body">
                        <p>\\({}^{238}_{92}\\text{U} \\to {}^{234}_{90}\\text{Th} + {}^4_2\\text{He}\\)</p>
                        <p>Uranium-238 emits an alpha particle and becomes thorium-234.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Beta Decay of Carbon-14</div>
                    <div class="env-body">
                        <p>\\({}^{14}_6\\text{C} \\to {}^{14}_7\\text{N} + e^- + \\bar{\\nu}_e\\)</p>
                        <p>A neutron in carbon-14 converts to a proton, turning the atom into nitrogen-14.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Conservation Laws</div>
                    <div class="env-body"><p>In every nuclear reaction, the total charge (sum of Z), mass number (sum of A), and lepton number are all conserved. Always check that both sides of the equation balance.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-decay-types',
                    title: 'Radioactive Decay Types',
                    description: 'Click each decay type to see an animated visualization',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 350, originY: 210 });
                        var decayType = 'alpha';
                        var animTime = 0;
                        var animating = false;

                        VizEngine.createButton(controls, 'Alpha Decay', function() { decayType = 'alpha'; animTime = 0; draw(); });
                        VizEngine.createButton(controls, 'Beta Decay', function() { decayType = 'beta'; animTime = 0; draw(); });
                        VizEngine.createButton(controls, 'Gamma Decay', function() { decayType = 'gamma'; animTime = 0; draw(); });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            animTime = 0;
                            var start = performance.now();
                            viz.animate(function(t) {
                                animTime = (t - start) / 1000;
                                if (animTime > 3) { animTime = 3; animating = false; viz.stopAnimation(); }
                                draw();
                            });
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            animating = false;
                            viz.stopAnimation();
                            animTime = 0;
                            draw();
                        });

                        function drawNucleus(cx, cy, r, Z, N, label) {
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

                            var seed = Z * 31 + N * 17;
                            function sr() { seed = (seed * 1103 + 52711) % 65536; return seed / 65536; }
                            var pR = Math.max(3, Math.min(7, 40 / Math.sqrt(Z + N)));
                            for (var i = 0; i < Z; i++) {
                                var a = sr() * Math.PI * 2;
                                var d = sr() * (r - pR - 1);
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(cx + d * Math.cos(a), cy + d * Math.sin(a), pR, 0, Math.PI * 2); ctx.fill();
                            }
                            for (var i = 0; i < N; i++) {
                                var a = sr() * Math.PI * 2;
                                var d = sr() * (r - pR - 1);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(cx + d * Math.cos(a), cy + d * Math.sin(a), pR, 0, Math.PI * 2); ctx.fill();
                            }
                            if (label) viz.screenText(label, cx, cy + r + 18, viz.colors.white, 12, 'center');
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var t = Math.min(animTime, 3);
                            var progress = t / 3;

                            if (decayType === 'alpha') {
                                viz.screenText('Alpha Decay: U-238 -> Th-234 + He-4', viz.width / 2, 20, viz.colors.orange, 16, 'center');

                                // Parent nucleus
                                var px = 180 - progress * 40;
                                drawNucleus(px, 210, 55, 92, 146, 'U-238');

                                // Alpha particle flying away
                                if (progress > 0) {
                                    var ax = 250 + progress * 250;
                                    var ay = 210 - progress * 80;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath(); ctx.arc(ax, ay, 12, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('He-4', ax, ay + 20, viz.colors.orange, 11, 'center');

                                    // trail
                                    ctx.strokeStyle = viz.colors.orange + '44';
                                    ctx.lineWidth = 2;
                                    ctx.setLineDash([4, 4]);
                                    ctx.beginPath(); ctx.moveTo(240, 210); ctx.lineTo(ax, ay); ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Daughter nucleus (appears after decay)
                                if (progress > 0.3) {
                                    var dx = 350 + (progress - 0.3) * 80;
                                    drawNucleus(dx, 250, 50, 90, 144, 'Th-234');
                                }

                                // Equation
                                viz.screenText('A decreases by 4, Z decreases by 2', viz.width / 2, 390, viz.colors.text, 12, 'center');

                            } else if (decayType === 'beta') {
                                viz.screenText('Beta Decay: C-14 -> N-14 + electron + antineutrino', viz.width / 2, 20, viz.colors.teal, 16, 'center');

                                var px = 180 - progress * 40;
                                drawNucleus(px, 210, 35, 6, 8, 'C-14');

                                if (progress > 0) {
                                    // electron
                                    var ex = 240 + progress * 250;
                                    var ey = 210 + progress * 60;
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('e-', ex + 10, ey, viz.colors.teal, 10, 'left');

                                    // antineutrino
                                    var nx = 240 + progress * 200;
                                    var ny = 210 - progress * 90;
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    for (var w = 0; w < progress * 200; w += 2) {
                                        var wx = 240 + w;
                                        var wy = 210 - (w / 200) * 90 + 5 * Math.sin(w * 0.2);
                                        w === 0 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
                                    }
                                    ctx.stroke();
                                    viz.screenText('antineutrino', nx, ny - 10, viz.colors.yellow, 10, 'center');
                                }

                                if (progress > 0.3) {
                                    var dx = 380 + (progress - 0.3) * 80;
                                    drawNucleus(dx, 220, 35, 7, 7, 'N-14');
                                }

                                viz.screenText('A stays same, Z increases by 1', viz.width / 2, 390, viz.colors.text, 12, 'center');

                            } else {
                                viz.screenText('Gamma Decay: Excited nucleus -> ground state + photon', viz.width / 2, 20, viz.colors.yellow, 16, 'center');

                                drawNucleus(250, 210, 45, 28, 30, progress < 0.5 ? 'Ni-58* (excited)' : 'Ni-58 (ground)');

                                // Glow for excited state
                                if (progress < 0.5) {
                                    ctx.fillStyle = viz.colors.yellow + '22';
                                    ctx.beginPath(); ctx.arc(250, 210, 60 + Math.sin(progress * 20) * 5, 0, Math.PI * 2); ctx.fill();
                                }

                                if (progress > 0.3) {
                                    // gamma ray
                                    var gx = 310 + (progress - 0.3) * 300;
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    for (var w = 310; w < gx; w += 2) {
                                        var wy = 180 + 8 * Math.sin((w - 310) * 0.3);
                                        w === 310 ? ctx.moveTo(w, wy) : ctx.lineTo(w, wy);
                                    }
                                    ctx.stroke();
                                    viz.screenText('gamma photon', Math.min(gx, 600), 160, viz.colors.yellow, 11, 'center');
                                }

                                viz.screenText('A and Z unchanged, energy released as photon', viz.width / 2, 390, viz.colors.text, 12, 'center');
                            }

                            // Penetration comparison at bottom
                            var bx = 50, by = 340;
                            viz.screenText('Penetration:', bx, by, viz.colors.text, 11, 'left');
                            // paper
                            ctx.fillStyle = '#88776644';
                            ctx.fillRect(bx + 100, by - 12, 8, 24);
                            viz.screenText('Paper', bx + 104, by + 18, viz.colors.text, 9, 'center');
                            // aluminum
                            ctx.fillStyle = '#aaaaaa44';
                            ctx.fillRect(bx + 220, by - 12, 12, 24);
                            viz.screenText('Al', bx + 226, by + 18, viz.colors.text, 9, 'center');
                            // lead
                            ctx.fillStyle = '#55555544';
                            ctx.fillRect(bx + 400, by - 12, 20, 24);
                            viz.screenText('Lead', bx + 410, by + 18, viz.colors.text, 9, 'center');

                            // alpha arrow (stopped by paper)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(bx + 80, by - 6); ctx.lineTo(bx + 97, by - 6); ctx.stroke();
                            viz.screenText('alpha', bx + 80, by - 16, viz.colors.orange, 9, 'center');

                            // beta arrow (stopped by aluminum)
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.moveTo(bx + 80, by); ctx.lineTo(bx + 217, by); ctx.stroke();
                            viz.screenText('beta', bx + 80, by + 10, viz.colors.teal, 9, 'center');

                            // gamma arrow (passes through lead)
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.moveTo(bx + 80, by + 6); ctx.lineTo(bx + 450, by + 6); ctx.stroke();
                            viz.screenText('gamma', bx + 80, by + 20, viz.colors.yellow, 9, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-decay-1',
                    type: 'mc',
                    question: 'In alpha decay, the mass number A changes by:',
                    options: ['-1', '-2', '-4', '0'],
                    correct: 2,
                    hint: 'An alpha particle is He-4.',
                    solution: 'An alpha particle is He-4 (A=4), so the parent mass number decreases by 4.'
                },
                {
                    id: 'ex-decay-2',
                    type: 'mc',
                    question: 'In beta-minus decay, which particle is emitted from the nucleus?',
                    options: ['Proton', 'Neutron', 'Electron', 'Alpha particle'],
                    correct: 2,
                    hint: 'A neutron converts to a proton plus what?',
                    solution: 'In beta-minus decay, a neutron converts to a proton plus an electron (and antineutrino).'
                },
                {
                    id: 'ex-decay-3',
                    type: 'mc',
                    question: 'Which type of radiation is most penetrating?',
                    options: ['Alpha', 'Beta', 'Gamma', 'All are equal'],
                    correct: 2,
                    hint: 'Think about what stops each type.',
                    solution: 'Gamma rays are the most penetrating; they require thick lead or concrete to stop.'
                },
                {
                    id: 'ex-decay-4',
                    type: 'numeric',
                    question: 'Radium-226 (Z=88) undergoes alpha decay. What is the atomic number of the daughter nucleus?',
                    hint: 'Z decreases by 2 in alpha decay.',
                    answer: '86',
                    solution: 'Z_daughter = 88 - 2 = 86 (radon).'
                },
                {
                    id: 'ex-decay-5',
                    type: 'numeric',
                    question: 'After beta-minus decay, C-14 (Z=6) becomes what element? Give the atomic number.',
                    hint: 'Z increases by 1 in beta-minus decay.',
                    answer: '7',
                    solution: 'Z_daughter = 6 + 1 = 7 (nitrogen).'
                }
            ]
        },

        // ===== SECTION 3: Half-Life =====
        {
            id: 'half-life',
            title: 'Half-Life',
            content: `
                <h2>Half-Life</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Clock of Decay</div>
                    <div class="env-body"><p>Radioactive decay is a random process: we cannot predict when a specific nucleus will decay. However, for a large sample, the decay follows a precise statistical law. The key concept is the <strong>half-life</strong>: the time it takes for half of the radioactive nuclei to decay.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Radioactive Decay Law</div>
                    <div class="env-body">
                        <p>The number of undecayed nuclei remaining after time \\(t\\) is:</p>
                        <p>\\[ N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t/T_{1/2}} = N_0 \\, e^{-\\lambda t} \\]</p>
                        <p>where \\(N_0\\) is the initial number, \\(T_{1/2}\\) is the half-life, and \\(\\lambda = \\ln 2 / T_{1/2}\\) is the decay constant.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-half-life"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Carbon-14 Dating</div>
                    <div class="env-body">
                        <p>Carbon-14 has a half-life of 5730 years. A sample originally had \\(N_0 = 1000\\) atoms of C-14. How many remain after 17,190 years?</p>
                        <p><strong>Solution:</strong> Number of half-lives: \\(17190 / 5730 = 3\\). Remaining: \\(N = 1000 \\times (1/2)^3 = 1000/8 = 125\\) atoms.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Iodine-131</div>
                    <div class="env-body">
                        <p>Iodine-131 has a half-life of 8.0 days. A hospital receives a 400 mg sample. How much remains after 24 days?</p>
                        <p><strong>Solution:</strong> Number of half-lives: \\(24/8 = 3\\). Remaining: \\(400 \\times (1/2)^3 = 50\\) mg.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Activity</div>
                    <div class="env-body">
                        <p>The <strong>activity</strong> \\(A\\) of a sample is the number of decays per second:</p>
                        <p>\\[ A = \\lambda N = \\frac{\\ln 2}{T_{1/2}} \\cdot N \\]</p>
                        <p>Measured in becquerels (Bq), where 1 Bq = 1 decay/s. Activity also decreases exponentially with the same half-life.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Applications</div>
                    <div class="env-body"><p>Half-life is the basis for radiocarbon dating (archaeology), medical imaging (technetium-99m, half-life 6 hours), and nuclear waste management (plutonium-239, half-life 24,000 years).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-half-life',
                    title: 'Half-Life Decay Curve',
                    description: 'Adjust the half-life and watch the exponential decay of a radioactive sample',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 80, originY: 370 });
                        var halfLife = 5;
                        var N0 = 1000;

                        VizEngine.createSlider(controls, 'Half-life (years)', 1, 20, 5, 1, function(v) { halfLife = v; draw(); });
                        VizEngine.createSlider(controls, 'Initial N', 100, 2000, 1000, 100, function(v) { N0 = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 370); ctx.lineTo(670, 370); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 370); ctx.lineTo(80, 30); ctx.stroke();
                            viz.screenText('Time (years)', 670, 385, viz.colors.white, 13, 'right');
                            viz.screenText('N remaining', 85, 20, viz.colors.white, 13, 'left');

                            // Time range: 0 to 5 half-lives
                            var tMax = halfLife * 5;
                            var scaleT = 580 / tMax;
                            var scaleN = 320 / N0;

                            // grid
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var i = 0; i <= 5; i++) {
                                var t = i * halfLife;
                                var sx = 80 + t * scaleT;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(sx, 370); ctx.lineTo(sx, 30); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(t.toFixed(0), sx, 373);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var n = 0; n <= N0; n += N0 / 4) {
                                var sy = 370 - n * scaleN;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(80, sy); ctx.lineTo(670, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(n.toFixed(0), 75, sy);
                            }

                            // Decay curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var t = 0; t <= tMax; t += 0.1) {
                                var n = N0 * Math.pow(0.5, t / halfLife);
                                var sx = 80 + t * scaleT;
                                var sy = 370 - n * scaleN;
                                t === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Half-life markers
                            for (var i = 1; i <= 5; i++) {
                                var t = i * halfLife;
                                var n = N0 * Math.pow(0.5, i);
                                var sx = 80 + t * scaleT;
                                var sy = 370 - n * scaleN;

                                // horizontal dashed line
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = viz.colors.orange + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(80, sy); ctx.lineTo(sx, sy); ctx.stroke();
                                // vertical dashed line
                                ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, 370); ctx.stroke();
                                ctx.setLineDash([]);

                                // dot
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();

                                // label
                                viz.screenText(n.toFixed(0), sx + 8, sy - 12, viz.colors.orange, 10, 'left');
                            }

                            // Info
                            viz.screenText('Half-life = ' + halfLife + ' years', viz.width / 2, 16, viz.colors.white, 15, 'center');
                            viz.screenText('After each half-life, half the nuclei remain', viz.width / 2, 38, viz.colors.text, 12, 'center');

                            // formula
                            viz.screenText('N(t) = N0 x (1/2)^(t / T_1/2)', 500, 100, viz.colors.teal, 12, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-half-1',
                    type: 'numeric',
                    question: 'A sample starts with 800 radioactive atoms. After 3 half-lives, how many remain?',
                    hint: 'N = N0 x (1/2)^3.',
                    answer: '100',
                    solution: 'N = 800 x (1/2)^3 = 800 / 8 = 100 atoms.'
                },
                {
                    id: 'ex-half-2',
                    type: 'numeric',
                    question: 'A radioactive isotope has a half-life of 10 days. After 30 days, what fraction of the original sample remains? Express as a decimal.',
                    hint: '30 days = 3 half-lives.',
                    answer: '0.125',
                    solution: 'Fraction = (1/2)^3 = 1/8 = 0.125.'
                },
                {
                    id: 'ex-half-3',
                    type: 'numeric',
                    question: 'Cobalt-60 has a half-life of 5.27 years. How many half-lives occur in 15.81 years?',
                    hint: 'Divide total time by half-life.',
                    answer: '3',
                    solution: '15.81 / 5.27 = 3 half-lives.'
                },
                {
                    id: 'ex-half-4',
                    type: 'numeric',
                    question: 'A 64 g sample of a radioactive isotope decays to 4 g. How many half-lives have passed?',
                    hint: '64 x (1/2)^n = 4. Solve for n.',
                    answer: '4',
                    solution: '64/4 = 16 = 2^4, so n = 4 half-lives.'
                },
                {
                    id: 'ex-half-5',
                    type: 'mc',
                    question: 'The half-life of a radioactive isotope is independent of:',
                    options: [
                        'The type of decay',
                        'The amount of sample present',
                        'The nuclear structure',
                        'The identity of the isotope'
                    ],
                    correct: 1,
                    hint: 'Does the amount of material affect the probability of each nucleus decaying?',
                    solution: 'Half-life is an intrinsic property of the isotope. It does not depend on how much sample you have.'
                }
            ]
        },

        // ===== SECTION 4: Nuclear Reactions and Energy =====
        {
            id: 'nuclear-reactions-energy',
            title: 'Nuclear Reactions and Energy',
            content: `
                <h2>Nuclear Reactions and Energy</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Power of E = mc^2</div>
                    <div class="env-body"><p>Einstein's famous equation tells us that mass and energy are interchangeable. In nuclear reactions, a tiny loss of mass is converted into an enormous amount of energy. This is the principle behind nuclear power plants, the Sun's energy, and unfortunately also nuclear weapons.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Mass-Energy Equivalence</div>
                    <div class="env-body">
                        <p>\\[ E = mc^2 \\]</p>
                        <p>where \\(c = 3.0 \\times 10^8\\) m/s. Because \\(c^2\\) is so large, even a small mass converts to an enormous energy. One atomic mass unit (1 u = \\(1.661 \\times 10^{-27}\\) kg) corresponds to 931.5 MeV of energy.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Mass Defect and Binding Energy</div>
                    <div class="env-body">
                        <p>The <strong>mass defect</strong> \\(\\Delta m\\) is the difference between the total mass of the individual nucleons and the actual mass of the nucleus:</p>
                        <p>\\[ \\Delta m = [Z m_p + N m_n] - m_{\\text{nucleus}} \\]</p>
                        <p>This "missing mass" has been converted into <strong>binding energy</strong>:</p>
                        <p>\\[ E_B = \\Delta m \\cdot c^2 \\]</p>
                        <p>A larger binding energy per nucleon means a more stable nucleus.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-binding-energy"></div>

                <div class="env-block definition">
                    <div class="env-title">Fission and Fusion</div>
                    <div class="env-body">
                        <p><strong>Nuclear Fission:</strong> A heavy nucleus splits into two lighter nuclei, releasing energy. Example:</p>
                        <p>\\[ {}^{235}_{92}\\text{U} + {}^1_0 n \\to {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3 \\, {}^1_0 n + \\text{energy} \\]</p>
                        <p>The released neutrons can trigger more fissions (chain reaction).</p>
                        <p><strong>Nuclear Fusion:</strong> Light nuclei combine to form a heavier nucleus, releasing energy. Example:</p>
                        <p>\\[ {}^2_1\\text{H} + {}^3_1\\text{H} \\to {}^4_2\\text{He} + {}^1_0 n + \\text{energy} \\]</p>
                        <p>Fusion powers the Sun and other stars.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Energy from Mass Defect</div>
                    <div class="env-body">
                        <p>In the fusion of deuterium and tritium, the mass defect is about 0.019 u. How much energy is released?</p>
                        <p><strong>Solution:</strong> \\(E = 0.019 \\times 931.5 = 17.7\\) MeV. This is an enormous energy for a single nuclear reaction.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Why Fission and Fusion Both Release Energy</div>
                    <div class="env-body"><p>The binding energy per nucleon peaks near iron-56. Fission of heavy nuclei and fusion of light nuclei both move toward this peak, releasing energy. This is why both processes can be used for energy generation.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Chain Reactions</div>
                    <div class="env-body"><p>In fission, each event releases neutrons that can trigger more fissions. If uncontrolled, this leads to a nuclear explosion. In a reactor, control rods absorb excess neutrons to maintain a steady rate.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-binding-energy',
                    title: 'Binding Energy per Nucleon',
                    description: 'Explore the binding energy curve and see why fission and fusion release energy',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 70, originY: 380 });

                        // Approximate binding energy per nucleon data
                        var data = [
                            { A: 1, be: 0, name: 'H-1' },
                            { A: 2, be: 1.11, name: 'H-2' },
                            { A: 3, be: 2.83, name: 'He-3' },
                            { A: 4, be: 7.07, name: 'He-4' },
                            { A: 6, be: 5.33, name: 'Li-6' },
                            { A: 7, be: 5.61, name: 'Li-7' },
                            { A: 12, be: 7.68, name: 'C-12' },
                            { A: 14, be: 7.48, name: 'N-14' },
                            { A: 16, be: 7.98, name: 'O-16' },
                            { A: 20, be: 8.03, name: 'Ne-20' },
                            { A: 27, be: 8.33, name: 'Al-27' },
                            { A: 40, be: 8.55, name: 'Ca-40' },
                            { A: 56, be: 8.79, name: 'Fe-56' },
                            { A: 62, be: 8.79, name: 'Ni-62' },
                            { A: 84, be: 8.65, name: 'Kr-84' },
                            { A: 107, be: 8.55, name: 'Ag-107' },
                            { A: 120, be: 8.50, name: 'Sn-120' },
                            { A: 141, be: 8.35, name: 'Ba-141' },
                            { A: 184, be: 8.00, name: 'W-184' },
                            { A: 197, be: 7.92, name: 'Au-197' },
                            { A: 208, be: 7.87, name: 'Pb-208' },
                            { A: 235, be: 7.59, name: 'U-235' },
                            { A: 238, be: 7.57, name: 'U-238' }
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(70, 380); ctx.lineTo(680, 380); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(70, 380); ctx.lineTo(70, 30); ctx.stroke();
                            viz.screenText('Mass number A', 680, 395, viz.colors.white, 13, 'right');
                            viz.screenText('BE/A (MeV)', 75, 20, viz.colors.white, 13, 'left');

                            var scaleA = 600 / 250;
                            var scaleBE = 340 / 10;
                            function toSx(a) { return 70 + a * scaleA; }
                            function toSy(be) { return 380 - be * scaleBE; }

                            // grid
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var a = 0; a <= 250; a += 50) {
                                var sx = toSx(a);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(sx, 380); ctx.lineTo(sx, 30); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(a, sx, 383);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var be = 0; be <= 10; be += 2) {
                                var sy = toSy(be);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(70, sy); ctx.lineTo(680, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(be, 65, sy);
                            }

                            // Smooth curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i < data.length; i++) {
                                var sx = toSx(data[i].A);
                                var sy = toSy(data[i].be);
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Data points and labels
                            for (var i = 0; i < data.length; i++) {
                                var d = data[i];
                                var sx = toSx(d.A);
                                var sy = toSy(d.be);
                                var color = viz.colors.blue;
                                if (d.name === 'Fe-56' || d.name === 'Ni-62') color = viz.colors.green;
                                else if (d.A <= 4) color = viz.colors.orange;
                                else if (d.A >= 200) color = viz.colors.red;

                                ctx.fillStyle = color;
                                ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();

                                // label select points
                                if (['H-2', 'He-4', 'C-12', 'Fe-56', 'U-235'].indexOf(d.name) !== -1) {
                                    var offsetY = d.name === 'He-4' ? -18 : -14;
                                    viz.screenText(d.name, sx, sy + offsetY, color, 10, 'center');
                                }
                            }

                            // Fe-56 peak marker
                            var feSx = toSx(56);
                            var feSy = toSy(8.79);
                            ctx.setLineDash([3, 3]);
                            ctx.strokeStyle = viz.colors.green + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(feSx, feSy); ctx.lineTo(feSx, 380); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Most stable', feSx, feSy - 28, viz.colors.green, 11, 'center');

                            // Fusion arrow (left)
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.fillRect(toSx(0), 40, toSx(56) - toSx(0), 30);
                            viz.screenText('FUSION releases energy', (toSx(0) + toSx(56)) / 2, 55, viz.colors.orange, 12, 'center');
                            // arrow
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(toSx(5), 55); ctx.lineTo(toSx(50), 55); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(toSx(50), 55);
                            ctx.lineTo(toSx(50) - 8, 49);
                            ctx.lineTo(toSx(50) - 8, 61);
                            ctx.closePath(); ctx.fill();

                            // Fission arrow (right)
                            ctx.fillStyle = viz.colors.red + '22';
                            ctx.fillRect(toSx(56), 40, toSx(250) - toSx(56), 30);
                            viz.screenText('FISSION releases energy', (toSx(56) + toSx(250)) / 2, 55, viz.colors.red, 12, 'center');
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(toSx(245), 55); ctx.lineTo(toSx(62), 55); ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(toSx(62), 55);
                            ctx.lineTo(toSx(62) + 8, 49);
                            ctx.lineTo(toSx(62) + 8, 61);
                            ctx.closePath(); ctx.fill();
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-nuclear-1',
                    type: 'numeric',
                    question: 'How much energy (in MeV) is equivalent to a mass defect of 0.5 u? (1 u = 931.5 MeV)',
                    hint: 'E = Dm x 931.5 MeV/u.',
                    answer: '465.75',
                    solution: 'E = 0.5 x 931.5 = 465.75 MeV.'
                },
                {
                    id: 'ex-nuclear-2',
                    type: 'mc',
                    question: 'Which process powers the Sun?',
                    options: ['Nuclear fission', 'Nuclear fusion', 'Chemical combustion', 'Radioactive decay'],
                    correct: 1,
                    hint: 'The Sun fuses light elements into heavier ones.',
                    solution: 'The Sun is powered by nuclear fusion, primarily fusing hydrogen into helium.'
                },
                {
                    id: 'ex-nuclear-3',
                    type: 'mc',
                    question: 'The binding energy per nucleon is highest for nuclei near which element?',
                    options: ['Hydrogen', 'Carbon', 'Iron', 'Uranium'],
                    correct: 2,
                    hint: 'Look at the peak of the binding energy curve.',
                    solution: 'Iron-56 (and nickel-62) have the highest binding energy per nucleon, making them the most stable.'
                },
                {
                    id: 'ex-nuclear-4',
                    type: 'numeric',
                    question: 'In the fission of U-235, if the total mass of products is 0.215 u less than the reactants, how much energy (in MeV) is released?',
                    hint: 'E = Dm x 931.5.',
                    answer: '200.3',
                    solution: 'E = 0.215 x 931.5 = 200.3 MeV.'
                },
                {
                    id: 'ex-nuclear-5',
                    type: 'mc',
                    question: 'In a nuclear fission chain reaction, what particle triggers each subsequent fission?',
                    options: ['Proton', 'Electron', 'Neutron', 'Alpha particle'],
                    correct: 2,
                    hint: 'Fission of U-235 releases multiple particles of this type.',
                    solution: 'Neutrons released by fission can be absorbed by other U-235 nuclei, causing more fission events.'
                },
                {
                    id: 'ex-nuclear-6',
                    type: 'mc',
                    question: 'Why does fusion of light nuclei release energy?',
                    options: [
                        'Light nuclei have too many neutrons',
                        'The product has higher binding energy per nucleon',
                        'The product has lower binding energy per nucleon',
                        'Mass is created during fusion'
                    ],
                    correct: 1,
                    hint: 'Think about the binding energy curve.',
                    solution: 'Fusion products have higher binding energy per nucleon than the reactants. The difference in binding energy is released.'
                },
                {
                    id: 'ex-nuclear-7',
                    type: 'numeric',
                    question: 'How much energy (in joules) is released when 1 kg of matter is completely converted to energy? (c = 3.0 x 10^8 m/s). Give the answer as "9e16".',
                    hint: 'E = mc^2.',
                    answer: '9e16',
                    solution: 'E = mc^2 = 1 x (3.0e8)^2 = 9.0 x 10^16 J.'
                },
                {
                    id: 'ex-nuclear-8',
                    type: 'mc',
                    question: 'In a nuclear reactor, control rods are used to:',
                    options: [
                        'Speed up the neutrons',
                        'Absorb excess neutrons to control the chain reaction',
                        'Provide fuel for the reactor',
                        'Cool the reactor core'
                    ],
                    correct: 1,
                    hint: 'What regulates the rate of fission?',
                    solution: 'Control rods absorb neutrons, regulating the chain reaction rate and preventing runaway fission.'
                },
                {
                    id: 'ex-nuclear-9',
                    type: 'mc',
                    question: 'Complete the reaction: H-2 + H-3 -> He-4 + ?',
                    options: ['Proton', 'Electron', 'Neutron', 'Gamma ray'],
                    correct: 2,
                    hint: 'Check conservation of mass number and charge.',
                    solution: 'A = 2+3 = 5 on the left, He-4 has A=4, so the missing particle has A=1, Z=0: a neutron.'
                },
                {
                    id: 'ex-nuclear-10',
                    type: 'numeric',
                    question: 'If 1 u = 1.661 x 10^-27 kg and c = 3.0 x 10^8 m/s, how much energy in MeV is 1 u? Round to nearest integer.',
                    hint: 'E = mc^2, then convert J to MeV (1 MeV = 1.602 x 10^-13 J).',
                    answer: '931',
                    solution: 'E = 1.661e-27 x (3.0e8)^2 = 1.495e-10 J. In MeV: 1.495e-10 / 1.602e-13 = 933 MeV (approximately 931 MeV with more precise values).'
                }
            ]
        }
    ]
});
