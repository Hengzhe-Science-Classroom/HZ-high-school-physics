window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Atomic Structure',
    subtitle: 'Quantum Ideas in Atomic Physics',
    sections: [
        // ===== SECTION 1: Photoelectric Effect =====
        {
            id: 'photoelectric-effect',
            title: 'Photoelectric Effect',
            content: `
                <h2>The Photoelectric Effect</h2>

                <div class="env-block intuition">
                    <div class="env-title">Light as Particles</div>
                    <div class="env-body"><p>By the early 1900s, physics faced a crisis. Classical wave theory predicted that brighter light should eject faster electrons from a metal surface. But experiments showed the exact opposite: only the <em>color</em> (frequency) of light mattered, not the brightness. Einstein resolved this puzzle in 1905 by proposing that light comes in discrete packets called <strong>photons</strong>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Photon Energy</div>
                    <div class="env-body"><p>Each photon carries energy proportional to its frequency:</p>
                    <p>\\[ E = hf = \\frac{hc}{\\lambda} \\]</p>
                    <p>where \\(h = 6.63 \\times 10^{-34}\\) J s is Planck's constant, \\(f\\) is the frequency, \\(c = 3.0 \\times 10^8\\) m/s is the speed of light, and \\(\\lambda\\) is the wavelength.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Photoelectric Equation</div>
                    <div class="env-body">
                        <p>When a photon strikes a metal surface, the maximum kinetic energy of the emitted electron is:</p>
                        <p>\\[ E_k = hf - W \\]</p>
                        <p>where \\(W\\) (the work function) is the minimum energy needed to free an electron from the metal. If \\(hf < W\\), no electrons are emitted regardless of light intensity.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Threshold Frequency</div>
                    <div class="env-body"><p>The minimum frequency that can eject electrons is:</p>
                    <p>\\[ f_0 = \\frac{W}{h} \\]</p>
                    <p>Light below this frequency has photons with insufficient energy, no matter how intense the beam.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-photoelectric"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Calculating Maximum Kinetic Energy</div>
                    <div class="env-body">
                        <p>Ultraviolet light of frequency \\(1.5 \\times 10^{15}\\) Hz strikes a metal with work function \\(W = 4.0\\) eV. Find the maximum kinetic energy of emitted electrons.</p>
                        <p><strong>Solution:</strong> Photon energy: \\(E = hf = 6.63 \\times 10^{-34} \\times 1.5 \\times 10^{15} = 9.95 \\times 10^{-19}\\) J \\(= 6.22\\) eV.</p>
                        <p>\\(E_k = hf - W = 6.22 - 4.0 = 2.22\\) eV.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Misconception</div>
                    <div class="env-body"><p>Increasing the <em>intensity</em> of light does not increase the kinetic energy of each electron. Higher intensity means more photons per second, so more electrons are ejected, but each individual photon still has the same energy \\(hf\\).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Nobel Prize</div>
                    <div class="env-body"><p>Einstein received the 1921 Nobel Prize in Physics for his explanation of the photoelectric effect, not for relativity. This discovery was pivotal in establishing quantum mechanics.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-photoelectric',
                    title: 'Photoelectric Effect Simulator',
                    description: 'Adjust frequency and intensity of light to observe electron emission',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 350, originY: 210 });
                        var freq = 8; // x10^14 Hz
                        var intensity = 5;
                        var workFunc = 3.5; // eV
                        var animating = false;
                        var electrons = [];

                        VizEngine.createSlider(controls, 'Frequency (x10^14 Hz)', 2, 15, 8, 0.5, function(v) { freq = v; electrons = []; draw(); });
                        VizEngine.createSlider(controls, 'Intensity', 1, 10, 5, 1, function(v) { intensity = v; });
                        VizEngine.createSlider(controls, 'Work Function (eV)', 1, 6, 3.5, 0.5, function(v) { workFunc = v; electrons = []; draw(); });

                        VizEngine.createButton(controls, 'Start', function() {
                            if (animating) return;
                            animating = true;
                            electrons = [];
                            viz.animate(function(t) { update(t); draw(); });
                        });
                        VizEngine.createButton(controls, 'Stop', function() {
                            animating = false;
                            viz.stopAnimation();
                        });

                        var lastEmit = 0;

                        function update(t) {
                            var photonEnergy = 4.136e-15 * freq * 1e14; // eV (h in eV*s)
                            var canEmit = photonEnergy > workFunc;

                            // Emit electrons
                            if (canEmit && t - lastEmit > (300 / intensity)) {
                                lastEmit = t;
                                var Ek = photonEnergy - workFunc;
                                var speed = Math.sqrt(Ek) * 2;
                                electrons.push({
                                    x: 260,
                                    y: 180 + Math.random() * 100,
                                    vx: speed * (1 + Math.random() * 0.3),
                                    vy: -2 + Math.random() * 4,
                                    born: t
                                });
                            }

                            // Update electrons
                            for (var i = electrons.length - 1; i >= 0; i--) {
                                electrons[i].x += electrons[i].vx * 0.5;
                                electrons[i].y += electrons[i].vy * 0.2;
                                if (electrons[i].x > 700 || t - electrons[i].born > 3000) {
                                    electrons.splice(i, 1);
                                }
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var photonEnergy = 4.136e-15 * freq * 1e14;
                            var canEmit = photonEnergy > workFunc;

                            // Metal plate
                            ctx.fillStyle = '#555577';
                            ctx.fillRect(230, 120, 30, 180);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(230, 120, 30, 180);
                            viz.screenText('Metal', 245, 310, viz.colors.text, 11);

                            // Light source (left side)
                            // wavelength to color mapping
                            var wl = 300000 / freq; // nm (approx)
                            var lightColor;
                            if (wl < 380) lightColor = viz.colors.purple;
                            else if (wl < 450) lightColor = '#8800ff';
                            else if (wl < 495) lightColor = viz.colors.blue;
                            else if (wl < 570) lightColor = viz.colors.green;
                            else if (wl < 590) lightColor = viz.colors.yellow;
                            else if (wl < 620) lightColor = viz.colors.orange;
                            else lightColor = viz.colors.red;

                            // Photon arrows
                            for (var i = 0; i < Math.min(intensity, 8); i++) {
                                var py = 140 + i * 20;
                                ctx.strokeStyle = lightColor;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(50, py); ctx.lineTo(225, py); ctx.stroke();
                                // arrowhead
                                ctx.fillStyle = lightColor;
                                ctx.beginPath();
                                ctx.moveTo(228, py);
                                ctx.lineTo(220, py - 4);
                                ctx.lineTo(220, py + 4);
                                ctx.closePath(); ctx.fill();
                                // wave squiggles
                                ctx.strokeStyle = lightColor + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var wx = 60; wx < 220; wx += 2) {
                                    var wy = py + 3 * Math.sin((wx - 60) * freq * 0.02);
                                    wx === 60 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
                                }
                                ctx.stroke();
                            }

                            viz.screenText('Light source', 100, 110, lightColor, 12);

                            // Electrons (ejected)
                            for (var i = 0; i < electrons.length; i++) {
                                var e = electrons[i];
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(e.x, e.y, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 7px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('e', e.x, e.y);
                            }

                            // Collector plate
                            ctx.fillStyle = '#445566';
                            ctx.fillRect(580, 120, 15, 180);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.strokeRect(580, 120, 15, 180);
                            viz.screenText('Collector', 587, 310, viz.colors.text, 11);

                            // Info panel
                            var panelY = 340;
                            viz.screenText('Photon energy: ' + photonEnergy.toFixed(2) + ' eV', 200, panelY, viz.colors.white, 13, 'center');
                            viz.screenText('Work function: ' + workFunc.toFixed(1) + ' eV', 200, panelY + 20, viz.colors.text, 12, 'center');

                            if (canEmit) {
                                var Ek = photonEnergy - workFunc;
                                viz.screenText('Electrons emitted!', 500, panelY, viz.colors.green, 14, 'center');
                                viz.screenText('Max KE = ' + Ek.toFixed(2) + ' eV', 500, panelY + 20, viz.colors.teal, 13, 'center');
                            } else {
                                viz.screenText('No emission', 500, panelY, viz.colors.red, 14, 'center');
                                viz.screenText('hf < W (not enough energy)', 500, panelY + 20, viz.colors.red, 12, 'center');
                            }

                            // threshold line
                            var f0 = workFunc / 4.136e-15 / 1e14;
                            viz.screenText('Threshold freq: ' + f0.toFixed(1) + ' x10^14 Hz', 350, panelY + 45, viz.colors.yellow, 11, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-photo-1',
                    type: 'numeric',
                    question: 'A photon has frequency 6.0 x 10^14 Hz. What is its energy in eV? (h = 4.14 x 10^-15 eV s)',
                    hint: 'E = hf.',
                    answer: '2.48',
                    solution: 'E = hf = 4.14e-15 x 6.0e14 = 2.484 eV, approximately 2.48 eV.'
                },
                {
                    id: 'ex-photo-2',
                    type: 'numeric',
                    question: 'Light of frequency 1.0 x 10^15 Hz strikes a metal with work function 2.0 eV. What is the maximum kinetic energy of emitted electrons in eV? (h = 4.14 x 10^-15 eV s)',
                    hint: 'E_k = hf - W.',
                    answer: '2.14',
                    solution: 'E = hf = 4.14e-15 x 1.0e15 = 4.14 eV. E_k = 4.14 - 2.0 = 2.14 eV.'
                },
                {
                    id: 'ex-photo-3',
                    type: 'mc',
                    question: 'Increasing the intensity of light above the threshold frequency will:',
                    options: [
                        'Increase the kinetic energy of each electron',
                        'Increase the number of electrons emitted per second',
                        'Decrease the work function',
                        'Change the threshold frequency'
                    ],
                    correct: 1,
                    hint: 'More intensity means more photons per second, not more energy per photon.',
                    solution: 'Higher intensity means more photons per second, so more electrons are ejected. Each electron still has E_k = hf - W.'
                },
                {
                    id: 'ex-photo-4',
                    type: 'mc',
                    question: 'A metal has a work function of 4.5 eV. Which light can eject electrons?',
                    options: [
                        'Red light (1.8 eV photons)',
                        'Green light (2.3 eV photons)',
                        'Blue light (2.8 eV photons)',
                        'UV light (5.0 eV photons)'
                    ],
                    correct: 3,
                    hint: 'The photon energy must exceed the work function.',
                    solution: 'Only UV with E = 5.0 eV > W = 4.5 eV can eject electrons. The others are below threshold.'
                },
                {
                    id: 'ex-photo-5',
                    type: 'numeric',
                    question: 'What is the threshold frequency (in units of 10^14 Hz) for a metal with work function 2.07 eV? Use h = 4.14 x 10^-15 eV s.',
                    hint: 'f_0 = W / h.',
                    answer: '5',
                    solution: 'f_0 = W/h = 2.07 / (4.14e-15) = 5.0 x 10^14 Hz.'
                }
            ]
        },

        // ===== SECTION 2: Bohr Model =====
        {
            id: 'bohr-model',
            title: 'Bohr Model',
            content: `
                <h2>The Bohr Model of the Atom</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Atoms Don't Collapse</div>
                    <div class="env-body"><p>Classical physics predicted that an orbiting electron should continuously radiate energy and spiral into the nucleus. This clearly does not happen. In 1913, Niels Bohr proposed a revolutionary model: electrons can only occupy certain discrete orbits, and they emit or absorb energy only when jumping between these orbits.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Bohr's Postulates</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Stationary orbits:</strong> Electrons orbit the nucleus in certain allowed orbits without radiating energy.</li>
                            <li><strong>Quantization:</strong> The angular momentum of the electron is quantized: \\(L = n\\hbar = n \\frac{h}{2\\pi}\\), where \\(n = 1, 2, 3, \\ldots\\)</li>
                            <li><strong>Transitions:</strong> An electron emits or absorbs a photon when it jumps between orbits. The photon energy equals the energy difference: \\(hf = |E_i - E_f|\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Hydrogen Energy Levels</div>
                    <div class="env-body">
                        <p>For hydrogen, the energy of the \\(n\\)-th level is:</p>
                        <p>\\[ E_n = -\\frac{13.6}{n^2} \\text{ eV} \\]</p>
                        <p>The ground state (\\(n=1\\)) has energy \\(-13.6\\) eV. As \\(n \\to \\infty\\), \\(E_n \\to 0\\) (the ionization limit).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-bohr-model"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Energy of the n=2 Level</div>
                    <div class="env-body">
                        <p>\\(E_2 = -13.6 / 2^2 = -13.6 / 4 = -3.4\\) eV.</p>
                        <p>The energy needed to excite an electron from \\(n=1\\) to \\(n=2\\) is:</p>
                        <p>\\(\\Delta E = E_2 - E_1 = -3.4 - (-13.6) = 10.2\\) eV.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Orbit Radius</div>
                    <div class="env-body">
                        <p>The radius of the \\(n\\)-th Bohr orbit is:</p>
                        <p>\\[ r_n = n^2 \\, a_0 \\]</p>
                        <p>where \\(a_0 = 0.053\\) nm is the Bohr radius (the radius of the ground-state orbit).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Limitations of the Bohr Model</div>
                    <div class="env-body"><p>The Bohr model works well for hydrogen but fails for multi-electron atoms. It also cannot explain fine structure, the Zeeman effect, or chemical bonding. A full quantum mechanical treatment (Schrodinger equation) is needed for these.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-bohr-model',
                    title: 'Bohr Model Energy Levels',
                    description: 'Click on energy levels to see electron transitions and calculate photon energies',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 440, scale: 30, originX: 350, originY: 220 });
                        var selectedFrom = 3;
                        var selectedTo = 1;

                        function energyLevel(n) { return -13.6 / (n * n); }

                        var nButtons = [1, 2, 3, 4, 5, 6];
                        for (var bi = 0; bi < nButtons.length; bi++) {
                            (function(n) {
                                VizEngine.createButton(controls, 'From n=' + n, function() { selectedFrom = n; draw(); });
                            })(nButtons[bi]);
                        }
                        for (var bi = 0; bi < nButtons.length; bi++) {
                            (function(n) {
                                VizEngine.createButton(controls, 'To n=' + n, function() { selectedTo = n; draw(); });
                            })(nButtons[bi]);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw atom diagram on left
                            var cx = 160, cy = 200;
                            // nucleus
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('+', cx, cy, viz.colors.white, 12);

                            // orbits
                            for (var n = 1; n <= 5; n++) {
                                var r = 18 + n * 18;
                                ctx.strokeStyle = (n === selectedFrom || n === selectedTo) ? viz.colors.blue : viz.colors.grid;
                                ctx.lineWidth = (n === selectedFrom || n === selectedTo) ? 2 : 0.8;
                                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
                                viz.screenText('n=' + n, cx + r + 8, cy - 8, viz.colors.text, 10, 'left');
                            }

                            // electron on "from" orbit
                            var rFrom = 18 + selectedFrom * 18;
                            var ex = cx + rFrom * Math.cos(-Math.PI / 4);
                            var ey = cy + rFrom * Math.sin(-Math.PI / 4);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('e', ex, ey, viz.colors.white, 8);

                            // Energy level diagram on right
                            var lx = 370, lw = 250;
                            var eMin = -14, eMax = 1;
                            function toY(e) { return 420 - (e - eMin) / (eMax - eMin) * 390; }

                            // axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(lx - 10, toY(eMin)); ctx.lineTo(lx - 10, toY(eMax)); ctx.stroke();
                            viz.screenText('E (eV)', lx - 15, toY(eMax) - 10, viz.colors.white, 12, 'center');

                            // energy levels
                            for (var n = 1; n <= 6; n++) {
                                var en = energyLevel(n);
                                var y = toY(en);
                                var isActive = (n === selectedFrom || n === selectedTo);
                                ctx.strokeStyle = isActive ? viz.colors.blue : viz.colors.text;
                                ctx.lineWidth = isActive ? 2.5 : 1;
                                ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + lw, y); ctx.stroke();
                                viz.screenText('n = ' + n, lx + lw + 10, y, viz.colors.text, 11, 'left');
                                viz.screenText(en.toFixed(2) + ' eV', lx - 15, y, viz.colors.text, 10, 'right');
                            }

                            // ionization level
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(lx, toY(0)); ctx.lineTo(lx + lw, toY(0)); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('0 eV (ionized)', lx + lw + 10, toY(0), viz.colors.text, 10, 'left');

                            // Transition arrow
                            if (selectedFrom !== selectedTo) {
                                var yFrom = toY(energyLevel(selectedFrom));
                                var yTo = toY(energyLevel(selectedTo));
                                var midX = lx + lw / 2;
                                var isEmission = selectedFrom > selectedTo;
                                var arrowColor = isEmission ? viz.colors.orange : viz.colors.teal;

                                ctx.strokeStyle = arrowColor;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(midX, yFrom); ctx.lineTo(midX, yTo); ctx.stroke();
                                // arrowhead
                                var dir = yTo > yFrom ? 1 : -1;
                                ctx.fillStyle = arrowColor;
                                ctx.beginPath();
                                ctx.moveTo(midX, yTo);
                                ctx.lineTo(midX - 6, yTo - dir * 10);
                                ctx.lineTo(midX + 6, yTo - dir * 10);
                                ctx.closePath(); ctx.fill();

                                var dE = Math.abs(energyLevel(selectedFrom) - energyLevel(selectedTo));
                                var label = isEmission ? 'Emission' : 'Absorption';
                                viz.screenText(label + ': ' + dE.toFixed(2) + ' eV', midX + 20, (yFrom + yTo) / 2, arrowColor, 12, 'left');

                                // photon wavelength
                                var lambda = 1240 / dE; // nm, using E(eV) = 1240/lambda(nm)
                                viz.screenText('Photon wavelength: ' + lambda.toFixed(0) + ' nm', viz.width / 2, 20, arrowColor, 13, 'center');
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-bohr-1',
                    type: 'numeric',
                    question: 'What is the energy (in eV) of the n = 3 level in hydrogen?',
                    hint: 'E_n = -13.6/n^2.',
                    answer: '-1.51',
                    solution: 'E_3 = -13.6/9 = -1.51 eV.'
                },
                {
                    id: 'ex-bohr-2',
                    type: 'numeric',
                    question: 'How much energy (in eV) is needed to excite a hydrogen atom from n=1 to n=3?',
                    hint: 'Find E_3 - E_1.',
                    answer: '12.09',
                    solution: 'E_1 = -13.6 eV, E_3 = -1.51 eV. DE = -1.51 - (-13.6) = 12.09 eV.'
                },
                {
                    id: 'ex-bohr-3',
                    type: 'mc',
                    question: 'When an electron drops from n=3 to n=2, the atom:',
                    options: [
                        'Absorbs a photon',
                        'Emits a photon',
                        'Gains kinetic energy',
                        'Loses an electron'
                    ],
                    correct: 1,
                    hint: 'Going to a lower energy level releases energy.',
                    solution: 'Dropping to a lower level releases energy as an emitted photon with E = E_3 - E_2.'
                },
                {
                    id: 'ex-bohr-4',
                    type: 'numeric',
                    question: 'What is the radius of the n=3 Bohr orbit in nm? (a_0 = 0.053 nm)',
                    hint: 'r_n = n^2 * a_0.',
                    answer: '0.477',
                    solution: 'r_3 = 9 x 0.053 = 0.477 nm.'
                },
                {
                    id: 'ex-bohr-5',
                    type: 'numeric',
                    question: 'What is the ionization energy of hydrogen from the ground state (in eV)?',
                    hint: 'Ionization means taking the electron from n=1 to n=infinity (E=0).',
                    answer: '13.6',
                    solution: 'Ionization energy = 0 - (-13.6) = 13.6 eV.'
                }
            ]
        },

        // ===== SECTION 3: Energy Levels and Spectra =====
        {
            id: 'energy-levels-spectra',
            title: 'Energy Levels and Spectra',
            content: `
                <h2>Energy Levels and Spectra</h2>

                <div class="env-block intuition">
                    <div class="env-title">Atomic Fingerprints</div>
                    <div class="env-body"><p>Every element has a unique set of energy levels. When electrons jump between levels, the photons emitted (or absorbed) create a unique pattern of spectral lines. This is like a fingerprint for each element, and it allows scientists to identify elements in distant stars, gas clouds, and laboratory samples.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Emission vs. Absorption Spectra</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Emission spectrum:</strong> A hot, low-density gas emits light at specific wavelengths. You see bright lines on a dark background.</li>
                            <li><strong>Absorption spectrum:</strong> When white light passes through a cool gas, certain wavelengths are absorbed. You see dark lines on a bright (rainbow) background.</li>
                        </ul>
                        <p>The emission and absorption lines of the same element occur at exactly the same wavelengths.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Hydrogen Spectral Series</div>
                    <div class="env-body">
                        <p>Transitions ending on different levels form named series:</p>
                        <ul>
                            <li><strong>Lyman series</strong> (to \\(n=1\\)): ultraviolet</li>
                            <li><strong>Balmer series</strong> (to \\(n=2\\)): visible light</li>
                            <li><strong>Paschen series</strong> (to \\(n=3\\)): infrared</li>
                        </ul>
                        <p>The wavelengths follow: \\(\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)\\) where \\(R_H = 1.097 \\times 10^7\\) m\\(^{-1}\\) is the Rydberg constant.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-emission-spectrum"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Balmer Series Red Line</div>
                    <div class="env-body">
                        <p>The red line in the Balmer series corresponds to the transition \\(n=3 \\to n=2\\).</p>
                        <p>\\(\\frac{1}{\\lambda} = 1.097 \\times 10^7 \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = 1.097 \\times 10^7 \\times \\frac{5}{36} = 1.524 \\times 10^6\\) m\\(^{-1}\\).</p>
                        <p>\\(\\lambda = 656\\) nm (red light).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Astrophysical Applications</div>
                    <div class="env-body"><p>By analyzing the absorption lines in starlight, astronomers can determine the chemical composition, temperature, and even velocity (via Doppler shift) of distant stars and galaxies.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-emission-spectrum',
                    title: 'Hydrogen Emission Spectrum',
                    description: 'Select a spectral series to see the emission lines and their wavelengths',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 350, originY: 210 });
                        var series = 'balmer';

                        VizEngine.createButton(controls, 'Lyman (UV)', function() { series = 'lyman'; draw(); });
                        VizEngine.createButton(controls, 'Balmer (Visible)', function() { series = 'balmer'; draw(); });
                        VizEngine.createButton(controls, 'Paschen (IR)', function() { series = 'paschen'; draw(); });

                        function wavelength(ni, nf) {
                            var RH = 1.097e7;
                            return 1.0 / (RH * (1 / (nf * nf) - 1 / (ni * ni))) * 1e9; // nm
                        }

                        function nmToColor(nm) {
                            if (nm < 380) return '#9900ff';
                            if (nm < 420) return '#6600ff';
                            if (nm < 440) return '#4400ff';
                            if (nm < 490) return '#0066ff';
                            if (nm < 510) return '#00ccaa';
                            if (nm < 530) return '#00dd00';
                            if (nm < 570) return '#aadd00';
                            if (nm < 590) return '#ffdd00';
                            if (nm < 620) return '#ff8800';
                            if (nm < 700) return '#ff2200';
                            return '#cc0000';
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var nf, maxNi, seriesName, region;

                            if (series === 'lyman') {
                                nf = 1; maxNi = 7; seriesName = 'Lyman Series'; region = 'Ultraviolet';
                            } else if (series === 'balmer') {
                                nf = 2; maxNi = 7; seriesName = 'Balmer Series'; region = 'Visible';
                            } else {
                                nf = 3; maxNi = 8; seriesName = 'Paschen Series'; region = 'Infrared';
                            }

                            viz.screenText(seriesName + ' (transitions to n = ' + nf + ')', viz.width / 2, 20, viz.colors.white, 16, 'center');
                            viz.screenText('Region: ' + region, viz.width / 2, 42, viz.colors.text, 13, 'center');

                            // Energy level diagram on left
                            var lx = 30, lw = 130;
                            function toY(n) {
                                var e = -13.6 / (n * n);
                                return 400 - (e + 14) / 15 * 340;
                            }

                            for (var n = 1; n <= 7; n++) {
                                var y = toY(n);
                                var isTarget = (n === nf);
                                ctx.strokeStyle = isTarget ? viz.colors.blue : viz.colors.text;
                                ctx.lineWidth = isTarget ? 2 : 1;
                                ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + lw, y); ctx.stroke();
                                var en = -13.6 / (n * n);
                                viz.screenText('n=' + n + ' (' + en.toFixed(2) + ')', lx + lw + 5, y, viz.colors.text, 9, 'left');
                            }

                            // transition arrows
                            var lines = [];
                            for (var ni = nf + 1; ni <= maxNi; ni++) {
                                var wl = wavelength(ni, nf);
                                var color = (wl >= 380 && wl <= 700) ? nmToColor(wl) : viz.colors.purple;
                                if (wl > 700) color = viz.colors.red + '88';

                                // arrow on energy diagram
                                var yFrom = toY(ni);
                                var yTo = toY(nf);
                                var ax = lx + 20 + (ni - nf - 1) * 15;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(ax, yFrom); ctx.lineTo(ax, yTo + 3); ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(ax, yTo);
                                ctx.lineTo(ax - 4, yTo + 8);
                                ctx.lineTo(ax + 4, yTo + 8);
                                ctx.closePath(); ctx.fill();

                                lines.push({ ni: ni, nf: nf, wl: wl, color: color });
                            }

                            // Spectrum display (right side)
                            var specX = 280, specW = 400, specY = 90, specH = 60;
                            // background
                            ctx.fillStyle = '#111122';
                            ctx.fillRect(specX, specY, specW, specH);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(specX, specY, specW, specH);

                            // Determine wavelength range for display
                            var wlMin, wlMax;
                            if (series === 'lyman') { wlMin = 80; wlMax = 130; }
                            else if (series === 'balmer') { wlMin = 360; wlMax = 700; }
                            else { wlMin = 800; wlMax = 2000; }

                            // Draw spectral lines
                            for (var i = 0; i < lines.length; i++) {
                                var line = lines[i];
                                var xPos = specX + (line.wl - wlMin) / (wlMax - wlMin) * specW;
                                if (xPos < specX || xPos > specX + specW) continue;
                                ctx.strokeStyle = line.color;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(xPos, specY); ctx.lineTo(xPos, specY + specH); ctx.stroke();
                                // glow
                                ctx.strokeStyle = line.color + '44';
                                ctx.lineWidth = 8;
                                ctx.beginPath(); ctx.moveTo(xPos, specY); ctx.lineTo(xPos, specY + specH); ctx.stroke();
                            }

                            // wavelength scale
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var step = (wlMax - wlMin) / 5;
                            for (var w = wlMin; w <= wlMax; w += step) {
                                var x = specX + (w - wlMin) / (wlMax - wlMin) * specW;
                                ctx.fillText(w.toFixed(0) + ' nm', x, specY + specH + 4);
                            }

                            // Table of lines
                            var tableY = 190;
                            viz.screenText('Transition', specX + 40, tableY, viz.colors.white, 12, 'center');
                            viz.screenText('Wavelength', specX + 160, tableY, viz.colors.white, 12, 'center');
                            viz.screenText('Energy (eV)', specX + 300, tableY, viz.colors.white, 12, 'center');
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(specX, tableY + 10); ctx.lineTo(specX + specW, tableY + 10); ctx.stroke();

                            for (var i = 0; i < lines.length; i++) {
                                var line = lines[i];
                                var ty = tableY + 28 + i * 22;
                                var dE = Math.abs(-13.6 / (line.ni * line.ni) + 13.6 / (line.nf * line.nf));
                                viz.screenText(line.ni + ' -> ' + line.nf, specX + 40, ty, line.color, 11, 'center');
                                viz.screenText(line.wl.toFixed(1) + ' nm', specX + 160, ty, line.color, 11, 'center');
                                viz.screenText(dE.toFixed(2) + ' eV', specX + 300, ty, line.color, 11, 'center');
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-spectra-1',
                    type: 'mc',
                    question: 'The Balmer series of hydrogen consists of transitions to which level?',
                    options: ['n = 1', 'n = 2', 'n = 3', 'n = 4'],
                    correct: 1,
                    hint: 'The Balmer series produces visible light.',
                    solution: 'The Balmer series consists of transitions ending at n = 2, producing visible wavelengths.'
                },
                {
                    id: 'ex-spectra-2',
                    type: 'numeric',
                    question: 'Calculate the wavelength (in nm) of the photon emitted when hydrogen transitions from n=4 to n=2. Use R_H = 1.097 x 10^7 m^-1.',
                    hint: '1/lambda = R_H (1/nf^2 - 1/ni^2).',
                    answer: '486',
                    solution: '1/lambda = 1.097e7 (1/4 - 1/16) = 1.097e7 x 3/16 = 2.057e6. lambda = 486 nm.'
                },
                {
                    id: 'ex-spectra-3',
                    type: 'mc',
                    question: 'An emission spectrum shows:',
                    options: [
                        'A continuous rainbow',
                        'Bright colored lines on a dark background',
                        'Dark lines on a rainbow background',
                        'A single white line'
                    ],
                    correct: 1,
                    hint: 'Hot gases emit photons at specific frequencies.',
                    solution: 'An emission spectrum shows bright lines at specific wavelengths on a dark background, corresponding to electron transitions.'
                },
                {
                    id: 'ex-spectra-4',
                    type: 'mc',
                    question: 'The Lyman series produces light in which region of the electromagnetic spectrum?',
                    options: ['Infrared', 'Visible', 'Ultraviolet', 'X-ray'],
                    correct: 2,
                    hint: 'Transitions to n=1 involve the largest energy differences.',
                    solution: 'The Lyman series (transitions to n=1) produces ultraviolet radiation because the energy differences are large.'
                },
                {
                    id: 'ex-spectra-5',
                    type: 'numeric',
                    question: 'What is the energy (in eV) of the photon emitted in the transition from n=2 to n=1 in hydrogen?',
                    hint: 'E = |E_2 - E_1| = |-3.4 - (-13.6)|.',
                    answer: '10.2',
                    solution: 'E = |-3.4 - (-13.6)| = |10.2| = 10.2 eV.'
                }
            ]
        },

        // ===== SECTION 4: Wave-Particle Duality =====
        {
            id: 'wave-particle-duality',
            title: 'Wave-Particle Duality',
            content: `
                <h2>Wave-Particle Duality</h2>

                <div class="env-block intuition">
                    <div class="env-title">Is It a Wave or a Particle?</div>
                    <div class="env-body"><p>The photoelectric effect proved that light, traditionally understood as a wave, also behaves like a particle (photon). In 1924, Louis de Broglie made an equally bold suggestion: particles like electrons also have wave properties. This dual nature is one of the most profound ideas in physics.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">De Broglie Wavelength</div>
                    <div class="env-body">
                        <p>Any particle with momentum \\(p\\) has an associated wavelength:</p>
                        <p>\\[ \\lambda = \\frac{h}{p} = \\frac{h}{mv} \\]</p>
                        <p>where \\(h = 6.63 \\times 10^{-34}\\) J s, \\(m\\) is the mass, and \\(v\\) is the speed. The heavier or faster the particle, the shorter its wavelength.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-debroglie"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Electron Wavelength</div>
                    <div class="env-body">
                        <p>An electron (\\(m = 9.11 \\times 10^{-31}\\) kg) moves at \\(v = 1.0 \\times 10^6\\) m/s. What is its de Broglie wavelength?</p>
                        <p><strong>Solution:</strong> \\(\\lambda = h/(mv) = 6.63 \\times 10^{-34} / (9.11 \\times 10^{-31} \\times 1.0 \\times 10^6) = 7.28 \\times 10^{-10}\\) m \\(= 0.728\\) nm.</p>
                        <p>This is comparable to atomic spacings, which is why electron diffraction is observable.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Baseball Wavelength</div>
                    <div class="env-body">
                        <p>A 0.15 kg baseball thrown at 40 m/s has wavelength:</p>
                        <p>\\(\\lambda = 6.63 \\times 10^{-34} / (0.15 \\times 40) = 1.1 \\times 10^{-34}\\) m.</p>
                        <p>This is absurdly small (far smaller than a proton), so we never observe wave behavior for macroscopic objects.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Electron Diffraction</div>
                    <div class="env-body"><p>When a beam of electrons passes through a crystal lattice, it produces a diffraction pattern just like X-rays. This was first observed by Davisson and Germer in 1927, confirming de Broglie's hypothesis. Electrons, protons, and even entire molecules exhibit wave-like interference.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Complementarity Principle</div>
                    <div class="env-body"><p>Niels Bohr proposed that wave and particle descriptions are <em>complementary</em>: in any single experiment, you observe either wave behavior or particle behavior, but never both simultaneously. The setup of the experiment determines which aspect is revealed.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Why Don't We See Quantum Effects Daily?</div>
                    <div class="env-body"><p>Everyday objects have incredibly tiny de Broglie wavelengths (far smaller than \\(10^{-30}\\) m). Wave behavior only becomes noticeable when the wavelength is comparable to the size of obstacles or slits, which only happens for very light particles like electrons and neutrons.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-debroglie',
                    title: 'De Broglie Wavelength Explorer',
                    description: 'Adjust mass and velocity to see how the de Broglie wavelength changes',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 30, originX: 350, originY: 210 });
                        var massExp = -30; // mass = 10^massExp kg
                        var velExp = 6;    // velocity = 10^velExp m/s

                        VizEngine.createSlider(controls, 'log10(mass/kg)', -31, 0, -30, 1, function(v) { massExp = v; draw(); });
                        VizEngine.createSlider(controls, 'log10(velocity/(m/s))', 0, 8, 6, 0.5, function(v) { velExp = v; draw(); });

                        var presets = [
                            { name: 'Electron (1e6 m/s)', m: -30, v: 6 },
                            { name: 'Proton (1e5 m/s)', m: -27, v: 5 },
                            { name: 'Baseball (40 m/s)', m: -0.8, v: 1.6 }
                        ];
                        for (var i = 0; i < presets.length; i++) {
                            (function(p) {
                                VizEngine.createButton(controls, p.name, function() {
                                    massExp = p.m; velExp = p.v; draw();
                                });
                            })(presets[i]);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var mass = Math.pow(10, massExp);
                            var vel = Math.pow(10, velExp);
                            var p = mass * vel;
                            var h = 6.63e-34;
                            var lambda = h / p;
                            var logLambda = Math.log10(lambda);

                            // Title
                            viz.screenText('De Broglie Wavelength', viz.width / 2, 20, viz.colors.white, 18, 'center');

                            // Display values
                            viz.screenText('Mass: 10^(' + massExp.toFixed(1) + ') kg', 200, 60, viz.colors.text, 13, 'center');
                            viz.screenText('Velocity: 10^(' + velExp.toFixed(1) + ') m/s', 200, 82, viz.colors.text, 13, 'center');
                            viz.screenText('Momentum: 10^(' + Math.log10(p).toFixed(1) + ') kg m/s', 200, 104, viz.colors.text, 13, 'center');

                            // Wavelength result
                            var lambdaStr;
                            if (lambda > 1e-3) lambdaStr = lambda.toExponential(2) + ' m';
                            else if (lambda > 1e-9) lambdaStr = (lambda * 1e9).toFixed(2) + ' nm';
                            else if (lambda > 1e-12) lambdaStr = (lambda * 1e12).toFixed(2) + ' pm';
                            else lambdaStr = lambda.toExponential(2) + ' m';

                            viz.screenText('Wavelength = ' + lambdaStr, viz.width / 2, 140, viz.colors.blue, 16, 'center');

                            // Scale comparison bar
                            var scaleY = 190;
                            var scales = [
                                { name: 'Universe', log: 26 },
                                { name: 'Galaxy', log: 21 },
                                { name: 'Solar system', log: 12 },
                                { name: 'Earth', log: 7 },
                                { name: 'Human', log: 0 },
                                { name: 'Cell', log: -5 },
                                { name: 'Molecule', log: -9 },
                                { name: 'Atom', log: -10 },
                                { name: 'Nucleus', log: -15 },
                                { name: 'Planck', log: -35 }
                            ];

                            var barLeft = 50, barRight = 650;
                            var logMin = -36, logMax = 28;
                            function logToX(l) { return barLeft + (l - logMin) / (logMax - logMin) * (barRight - barLeft); }

                            // bar
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(barLeft, scaleY + 8, barRight - barLeft, 6);

                            // scale markers
                            for (var si = 0; si < scales.length; si++) {
                                var s = scales[si];
                                var sx = logToX(s.log);
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(sx, scaleY); ctx.lineTo(sx, scaleY + 20); ctx.stroke();
                                ctx.save();
                                ctx.translate(sx, scaleY + 24);
                                ctx.rotate(-Math.PI / 4);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(s.name, 0, 0);
                                ctx.restore();
                            }

                            // wavelength marker
                            var wlX = logToX(logLambda);
                            if (wlX >= barLeft && wlX <= barRight) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.moveTo(wlX, scaleY + 5);
                                ctx.lineTo(wlX - 6, scaleY - 6);
                                ctx.lineTo(wlX + 6, scaleY - 6);
                                ctx.closePath(); ctx.fill();
                                viz.screenText('Your wavelength', wlX, scaleY - 16, viz.colors.blue, 11, 'center');
                            }

                            // Draw wave pattern
                            var waveY = 320;
                            var displayWL = Math.max(20, Math.min(300, Math.pow(10, (logLambda + 10) * 0.5 + 2)));
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var x = 50; x <= 650; x++) {
                                var y = waveY + 40 * Math.sin(2 * Math.PI * (x - 50) / displayWL);
                                x === 50 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // observable?
                            var observable = logLambda > -12;
                            var msg = observable ? 'Wave behavior would be observable!' : 'Wavelength too small to observe wave behavior.';
                            var msgColor = observable ? viz.colors.green : viz.colors.orange;
                            viz.screenText(msg, viz.width / 2, 400, msgColor, 13, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-debroglie-1',
                    type: 'numeric',
                    question: 'What is the de Broglie wavelength (in nm) of an electron moving at 2.0 x 10^6 m/s? (m_e = 9.11 x 10^-31 kg, h = 6.63 x 10^-34 J s)',
                    hint: 'lambda = h / (mv).',
                    answer: '0.364',
                    solution: 'lambda = 6.63e-34 / (9.11e-31 x 2.0e6) = 6.63e-34 / 1.822e-24 = 3.64e-10 m = 0.364 nm.'
                },
                {
                    id: 'ex-debroglie-2',
                    type: 'mc',
                    question: 'As the speed of a particle increases, its de Broglie wavelength:',
                    options: ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'],
                    correct: 1,
                    hint: 'lambda = h/p = h/(mv). What happens as v increases?',
                    solution: 'lambda = h/(mv). As v increases, p increases, so lambda decreases.'
                },
                {
                    id: 'ex-debroglie-3',
                    type: 'mc',
                    question: 'Which experiment confirmed that electrons have wave properties?',
                    options: [
                        'Photoelectric effect',
                        'Davisson-Germer diffraction experiment',
                        'Rutherford scattering',
                        'Millikan oil-drop experiment'
                    ],
                    correct: 1,
                    hint: 'This experiment showed electron diffraction patterns.',
                    solution: 'Davisson and Germer (1927) observed electron diffraction from a nickel crystal, confirming de Broglie\'s hypothesis.'
                },
                {
                    id: 'ex-debroglie-4',
                    type: 'mc',
                    question: 'Why do we never observe diffraction of a thrown baseball?',
                    options: [
                        'Baseballs have no momentum',
                        'The de Broglie wavelength is absurdly small',
                        'Baseballs are not charged',
                        'Classical mechanics forbids it'
                    ],
                    correct: 1,
                    hint: 'Calculate the de Broglie wavelength for a macroscopic object.',
                    solution: 'A baseball has mass ~0.15 kg and speed ~40 m/s, giving lambda ~ 10^-34 m, far too small for any diffraction effect.'
                },
                {
                    id: 'ex-debroglie-5',
                    type: 'numeric',
                    question: 'A proton (m = 1.67 x 10^-27 kg) has a de Broglie wavelength of 1.0 x 10^-10 m. What is its speed (in m/s)? Give answer as an integer.',
                    hint: 'v = h / (m lambda).',
                    answer: '3970',
                    solution: 'v = h/(m lambda) = 6.63e-34 / (1.67e-27 x 1.0e-10) = 6.63e-34 / 1.67e-37 = 3970 m/s.'
                }
            ]
        }
    ]
});
