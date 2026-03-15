window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Waves',
    subtitle: 'Wave Propagation and Phenomena',
    sections: [
        // ===== SECTION 1: Transverse and Longitudinal Waves =====
        {
            id: 'transverse-longitudinal',
            title: 'Transverse and Longitudinal Waves',
            content: `
                <h2>Transverse and Longitudinal Waves</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Oscillations to Waves</div>
                    <div class="env-body"><p>In the previous chapter, we studied oscillations at a single point. Now imagine coupling many oscillators together: when one moves, it disturbs its neighbor, which disturbs the next, and so on. This propagating disturbance is a <strong>wave</strong>. Waves transfer energy and information without transporting matter.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition: Mechanical Wave</div>
                    <div class="env-body"><p>A <strong>mechanical wave</strong> is a disturbance that propagates through a medium (solid, liquid, or gas) by the vibration of particles. The medium itself does not travel with the wave; individual particles oscillate about their equilibrium positions.</p></div>
                </div>

                <p>Waves are classified by the relationship between the direction of particle vibration and the direction of wave propagation:</p>

                <div class="env-block definition">
                    <div class="env-title">Transverse Waves</div>
                    <div class="env-body"><p>In a <strong>transverse wave</strong>, particles vibrate <em>perpendicular</em> to the direction of wave propagation. Examples: waves on a string, water surface waves (approximately), electromagnetic waves.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Longitudinal Waves</div>
                    <div class="env-body"><p>In a <strong>longitudinal wave</strong>, particles vibrate <em>parallel</em> to the direction of wave propagation, creating alternating regions of <strong>compression</strong> (high density) and <strong>rarefaction</strong> (low density). Examples: sound waves, pressure waves, seismic P-waves.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-transverse-wave"></div>

                <div class="viz-placeholder" data-viz="viz-longitudinal-wave"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Slinky Demonstration</div>
                    <div class="env-body">
                        <p>If you shake a slinky side-to-side, you create a transverse wave: the coils move perpendicular to the wave direction. If you push and pull the slinky along its length, you create a longitudinal wave: the coils move parallel to the wave, creating compressions and rarefactions.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>Some waves are neither purely transverse nor purely longitudinal. Water surface waves, for example, involve particles moving in roughly circular paths, combining both transverse and longitudinal motion. Seismic S-waves are transverse, while P-waves are longitudinal.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-transverse-wave',
                    title: 'Transverse Wave Propagation',
                    description: 'Watch particles vibrate up and down while the wave travels horizontally. Adjust wavelength and amplitude.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 320, scale: 40, originX: 50, originY: 160 });

                        var wavelength = 3.0;
                        var amplitude = 1.5;
                        var speed = 2.0;
                        var running = true;

                        VizEngine.createSlider(controls, 'Wavelength', 1.5, 5.0, wavelength, 0.5, function(v) { wavelength = v; });
                        VizEngine.createSlider(controls, 'Amplitude', 0.5, 2.5, amplitude, 0.1, function(v) { amplitude = v; });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var elapsed = 0;
                        var lastT = null;
                        var numParticles = 30;

                        viz.animate(function(t) {
                            if (lastT === null) lastT = t;
                            if (running) elapsed += (t - lastT) / 1000;
                            lastT = t;

                            viz.clear();

                            var k = 2 * Math.PI / wavelength;
                            var omega = k * speed;

                            // Draw equilibrium line
                            viz.ctx.strokeStyle = viz.colors.text + '44';
                            viz.ctx.lineWidth = 1;
                            viz.ctx.setLineDash([4, 4]);
                            var p0 = viz.toScreen(0, 0);
                            var p1 = viz.toScreen(15, 0);
                            viz.ctx.beginPath();
                            viz.ctx.moveTo(p0[0], p0[1]);
                            viz.ctx.lineTo(p1[0], p1[1]);
                            viz.ctx.stroke();
                            viz.ctx.setLineDash([]);

                            // Wave curve
                            viz.drawFunction(function(x) {
                                return amplitude * Math.sin(k * x - omega * elapsed);
                            }, 0, 15, viz.colors.blue, 2.5, 300);

                            // Particles
                            for (var i = 0; i < numParticles; i++) {
                                var px = 0.5 + i * (14 / numParticles);
                                var py = amplitude * Math.sin(k * px - omega * elapsed);
                                // Vertical displacement line
                                viz.drawSegment(px, 0, px, py, viz.colors.teal + '66', 1);
                                // Particle dot
                                var ps = viz.toScreen(px, py);
                                viz.ctx.fillStyle = viz.colors.teal;
                                viz.ctx.beginPath();
                                viz.ctx.arc(ps[0], ps[1], 4, 0, Math.PI * 2);
                                viz.ctx.fill();
                            }

                            // Direction arrows
                            viz.screenText('Wave direction -->', viz.width - 100, 25, viz.colors.orange, 12, 'center');
                            viz.screenText('Particle motion: vertical (perpendicular to wave direction)', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');

                            // Arrow showing particle oscillation
                            var arrowX = 0.3;
                            viz.drawVector(arrowX, -1.8, arrowX, -1.0, viz.colors.yellow, '', 1.5);
                            viz.drawVector(arrowX, -2.2, arrowX, -3.0, viz.colors.yellow, '', 1.5);
                            viz.drawText('particle', arrowX + 0.4, -2.0, viz.colors.yellow, 10, 'left');

                            viz.screenText('TRANSVERSE WAVE', viz.width / 2, 15, viz.colors.white, 14, 'center');
                        });
                    }
                },
                {
                    id: 'viz-longitudinal-wave',
                    title: 'Longitudinal Wave (Compression & Rarefaction)',
                    description: 'See how particles bunch up (compression) and spread out (rarefaction) in a longitudinal wave.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 300, scale: 40, originX: 50, originY: 150 });

                        var wavelength = 4.0;
                        var amplitude = 0.6;
                        var speed = 2.0;
                        var running = true;

                        VizEngine.createSlider(controls, 'Wavelength', 2.0, 6.0, wavelength, 0.5, function(v) { wavelength = v; });
                        VizEngine.createSlider(controls, 'Amplitude', 0.2, 1.0, amplitude, 0.1, function(v) { amplitude = v; });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var elapsed = 0;
                        var lastT = null;
                        var numParticles = 50;

                        viz.animate(function(t) {
                            if (lastT === null) lastT = t;
                            if (running) elapsed += (t - lastT) / 1000;
                            lastT = t;

                            viz.clear();

                            var k = 2 * Math.PI / wavelength;
                            var omega = k * speed;

                            viz.screenText('LONGITUDINAL WAVE', viz.width / 2, 15, viz.colors.white, 14, 'center');
                            viz.screenText('Wave direction -->', viz.width - 100, 30, viz.colors.orange, 12, 'center');

                            // Draw particles as dots displaced horizontally
                            var rows = 5;
                            var rowSpacing = 0.7;
                            var startY = (rows - 1) * rowSpacing / 2;

                            for (var r = 0; r < rows; r++) {
                                var ry = startY - r * rowSpacing;
                                for (var i = 0; i < numParticles; i++) {
                                    var eqX = 0.3 + i * (14 / numParticles);
                                    var displacement = amplitude * Math.sin(k * eqX - omega * elapsed);
                                    var actualX = eqX + displacement;

                                    var ps = viz.toScreen(actualX, ry);

                                    // Color by density (compression = bright, rarefaction = dim)
                                    var density = -amplitude * k * Math.cos(k * eqX - omega * elapsed);
                                    var brightness = Math.max(0.3, Math.min(1.0, 0.65 - density * 0.5));
                                    var alpha = Math.round(brightness * 255).toString(16).padStart(2, '0');

                                    viz.ctx.fillStyle = viz.colors.blue + alpha;
                                    viz.ctx.beginPath();
                                    viz.ctx.arc(ps[0], ps[1], 3.5, 0, Math.PI * 2);
                                    viz.ctx.fill();
                                }
                            }

                            // Labels for compression and rarefaction
                            // Find a compression (where particles bunch together)
                            var compX = (omega * elapsed / k) % wavelength + wavelength * 0.75;
                            if (compX > 12) compX -= wavelength;
                            var rarX = compX + wavelength / 2;
                            if (rarX > 13) rarX -= wavelength;

                            if (compX > 1 && compX < 13) {
                                var cs = viz.toScreen(compX, -startY - 0.8);
                                viz.screenText('Compression', cs[0], cs[1], viz.colors.teal, 11, 'center');
                            }
                            if (rarX > 1 && rarX < 13) {
                                var rs = viz.toScreen(rarX, -startY - 0.8);
                                viz.screenText('Rarefaction', rs[0], rs[1], viz.colors.orange, 11, 'center');
                            }

                            viz.screenText('Particle motion: horizontal (parallel to wave direction)', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify each of the following as transverse or longitudinal: (a) sound in air, (b) a guitar string vibrating, (c) a seismic P-wave, (d) light.',
                    hint: 'Think about whether the particle motion is parallel or perpendicular to wave propagation.',
                    solution: '(a) Sound in air is longitudinal (air molecules vibrate parallel to wave direction). (b) A guitar string vibrating produces transverse waves (string moves perpendicular to wave propagation along the string). (c) A seismic P-wave is longitudinal (ground moves back and forth along the propagation direction). (d) Light is a transverse wave (electric and magnetic fields oscillate perpendicular to propagation).'
                },
                {
                    question: 'A wave pulse travels along a rope. Does any part of the rope travel with the wave? Explain.',
                    hint: 'Think about what waves transfer.',
                    solution: 'No part of the rope travels with the wave. Each particle of the rope oscillates about its equilibrium position. What travels is the disturbance (energy and information), not the matter. If you mark a point on the rope, it moves up and down (for a transverse wave) but does not move along with the wave.'
                },
                {
                    question: 'In a longitudinal wave, what is the difference between a compression and a rarefaction?',
                    hint: 'Think about particle spacing.',
                    solution: 'A compression is a region where particles are closer together than normal (higher density, higher pressure). A rarefaction is a region where particles are farther apart than normal (lower density, lower pressure). Compressions and rarefactions alternate along the wave.'
                },
                {
                    question: 'Sound cannot travel through a vacuum. Explain why, using the concept of mechanical waves.',
                    hint: 'What does a mechanical wave need to propagate?',
                    solution: 'Sound is a mechanical wave that requires a medium (air, water, solid) to propagate. It travels by vibrating particles of the medium. In a vacuum, there are no particles to vibrate, so sound cannot propagate. This is why there is no sound in outer space.'
                },
                {
                    question: 'Water surface waves are often described as neither purely transverse nor purely longitudinal. Explain why.',
                    hint: 'Think about how water particles actually move when a wave passes.',
                    solution: 'Water particles move in approximately circular paths as a surface wave passes. They move both up-and-down (transverse component) and forward-and-backward (longitudinal component). The combination of these motions produces circular orbits, so the wave has both transverse and longitudinal characteristics.'
                }
            ]
        },

        // ===== SECTION 2: Wave Properties =====
        {
            id: 'wave-properties',
            title: 'Wave Properties',
            content: `
                <h2>Wave Properties</h2>

                <p>All waves, whether transverse or longitudinal, can be described by a common set of properties. Let us define these precisely.</p>

                <div class="env-block definition">
                    <div class="env-title">Key Wave Properties</div>
                    <div class="env-body">
                    <ul>
                        <li><strong>Wavelength</strong> \\(\\lambda\\): the distance between two consecutive points in phase (e.g., crest to crest, or compression to compression). Measured in meters.</li>
                        <li><strong>Frequency</strong> \\(f\\): the number of complete wave cycles passing a fixed point per second. Measured in hertz (Hz).</li>
                        <li><strong>Period</strong> \\(T\\): the time for one complete wave cycle to pass a fixed point. \\(T = 1/f\\).</li>
                        <li><strong>Amplitude</strong> \\(A\\): the maximum displacement of a particle from its equilibrium position.</li>
                        <li><strong>Wave speed</strong> \\(v\\): the speed at which the wave pattern propagates through the medium.</li>
                    </ul></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">The Wave Speed Equation</div>
                    <div class="env-body"><p>The fundamental relationship connecting wave speed, frequency, and wavelength is:</p>
                    <p>\\[ v = f\\lambda \\]</p>
                    <p>This equation applies to all waves. It says that in one period \\(T\\), the wave advances by one wavelength \\(\\lambda\\), so \\(v = \\lambda / T = f\\lambda\\).</p></div>
                </div>

                <p>The mathematical description of a sinusoidal wave traveling in the positive \\(x\\)-direction is:</p>
                <p>\\[ y(x,t) = A \\sin\\left(\\frac{2\\pi}{\\lambda}x - \\frac{2\\pi}{T}t\\right) = A \\sin(kx - \\omega t) \\]</p>
                <p>where \\(k = 2\\pi/\\lambda\\) is the <strong>wave number</strong> and \\(\\omega = 2\\pi f\\) is the angular frequency.</p>

                <div class="env-block example">
                    <div class="env-title">Example: Radio Wave</div>
                    <div class="env-body">
                        <p>A radio station broadcasts at a frequency of 100 MHz. What is the wavelength?</p>
                        <p>Radio waves travel at the speed of light: \\(v = 3.0 \\times 10^8\\) m/s.</p>
                        <p>\\(\\lambda = v/f = (3.0 \\times 10^8)/(100 \\times 10^6) = 3.0\\) m.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Wave Speed Depends on the Medium</div>
                    <div class="env-body"><p>For mechanical waves, the speed is determined by the properties of the medium, not by the source. For example, the speed of sound in air at 20 degrees C is about 343 m/s regardless of the frequency. When a wave enters a different medium, its speed changes but its frequency stays the same (since the source frequency is fixed). Therefore, the wavelength must change.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Students sometimes confuse wave speed with particle speed. The wave speed \\(v = f\\lambda\\) is how fast the wave pattern moves. The particle speed is how fast individual particles oscillate, which varies between 0 and \\(v_{\\max} = A\\omega\\). These are different quantities.</p></div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'A wave has a frequency of 5.0 Hz and a wavelength of 2.0 m. What is the wave speed?',
                    hint: 'v = f lambda.',
                    solution: 'v = f lambda = 5.0 * 2.0 = 10.0 m/s.'
                },
                {
                    question: 'The speed of sound in air is 340 m/s. What is the wavelength of a 440 Hz sound wave (concert A)?',
                    hint: 'lambda = v / f.',
                    solution: 'lambda = v/f = 340/440 = 0.773 m, approximately 77 cm.'
                },
                {
                    question: 'A wave on a string has the equation y = 0.03 sin(2.0x - 50t) in SI units. Find the amplitude, wavelength, frequency, and wave speed.',
                    hint: 'Compare with y = A sin(kx - omega t) to read off k and omega. Then lambda = 2 pi / k, f = omega / (2 pi), v = omega / k.',
                    solution: 'A = 0.03 m. k = 2.0 rad/m, so lambda = 2 pi / 2.0 = 3.14 m. omega = 50 rad/s, so f = 50/(2 pi) = 7.96 Hz. v = omega/k = 50/2.0 = 25 m/s. Check: v = f lambda = 7.96 * 3.14 = 25 m/s.'
                },
                {
                    question: 'A sound wave enters water from air. The speed of sound in water is about 1500 m/s compared to 340 m/s in air. If the frequency is 1000 Hz, what happens to the wavelength?',
                    hint: 'The frequency stays the same when a wave crosses into a different medium.',
                    solution: 'In air: lambda_air = 340/1000 = 0.34 m. In water: lambda_water = 1500/1000 = 1.50 m. The wavelength increases by a factor of 1500/340 = 4.41. The frequency remains 1000 Hz.'
                },
                {
                    question: 'Ocean waves with wavelength 100 m travel at 12.5 m/s. How long does it take for 10 wave crests to pass a fixed point?',
                    hint: 'First find the period (time for one crest), then multiply by 10.',
                    solution: 'f = v/lambda = 12.5/100 = 0.125 Hz. T = 1/f = 8.0 s per wave. Time for 10 crests = 10 * 8.0 = 80 s.'
                }
            ]
        },

        // ===== SECTION 3: Superposition and Interference =====
        {
            id: 'superposition-interference',
            title: 'Superposition and Interference',
            content: `
                <h2>Superposition and Interference</h2>

                <p>One of the most fundamental properties of waves is that when two or more waves overlap in the same region of space, the resulting displacement at any point is simply the sum of the displacements of the individual waves. This is the <strong>principle of superposition</strong>.</p>

                <div class="env-block theorem">
                    <div class="env-title">Principle of Superposition</div>
                    <div class="env-body"><p>When two or more waves overlap, the resultant displacement at any point is the algebraic sum of the individual displacements:</p>
                    <p>\\[ y_{\\text{total}}(x,t) = y_1(x,t) + y_2(x,t) + \\cdots \\]</p>
                    <p>This principle holds for all linear waves (waves with small amplitudes in elastic media).</p></div>
                </div>

                <p>Superposition leads to the phenomenon of <strong>interference</strong>:</p>

                <div class="env-block definition">
                    <div class="env-title">Constructive and Destructive Interference</div>
                    <div class="env-body">
                    <p><strong>Constructive interference</strong>: When two waves arrive at a point in phase (crest meets crest), their amplitudes add, producing a larger combined wave. The path difference is \\(\\Delta = n\\lambda\\) (where \\(n = 0, 1, 2, \\ldots\\)).</p>
                    <p><strong>Destructive interference</strong>: When two waves arrive at a point out of phase by half a wavelength (crest meets trough), their amplitudes subtract, producing a smaller (or zero) combined wave. The path difference is \\(\\Delta = (n + \\tfrac{1}{2})\\lambda\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-superposition"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Two Speakers</div>
                    <div class="env-body">
                        <p>Two speakers emit sound waves of the same frequency in phase. A listener stands at a point where the distance to one speaker is 3.0 m and to the other is 4.5 m. The wavelength is 1.5 m.</p>
                        <p>Path difference: \\(\\Delta = 4.5 - 3.0 = 1.5\\) m \\(= 1\\lambda\\).</p>
                        <p>Since \\(\\Delta = 1\\lambda\\) (a whole number of wavelengths), the interference is <strong>constructive</strong>, and the listener hears a loud sound.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Noise-Cancelling Headphones</div>
                    <div class="env-body">
                        <p>Noise-cancelling headphones work by destructive interference. A microphone picks up ambient noise, and the headphone speaker emits a wave of the same amplitude but opposite phase (shifted by \\(\\lambda/2\\)). The two waves cancel, reducing the perceived noise.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Important Note</div>
                    <div class="env-body"><p>Superposition does not mean the waves "destroy" each other permanently. After overlapping, each wave continues traveling as if the other were not there. The interference pattern exists only in the region where the waves overlap.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-superposition',
                    title: 'Superposition of Two Waves',
                    description: 'Adjust the frequency and phase of two waves to see constructive and destructive interference.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 40, originX: 60, originY: 0 });

                        var f1 = 2.0;
                        var f2 = 2.0;
                        var A1 = 1.2;
                        var A2 = 1.2;
                        var phaseDiff = 0;

                        VizEngine.createSlider(controls, 'Frequency 1 (Hz)', 0.5, 5.0, f1, 0.5, function(v) { f1 = v; draw(); });
                        VizEngine.createSlider(controls, 'Frequency 2 (Hz)', 0.5, 5.0, f2, 0.5, function(v) { f2 = v; draw(); });
                        VizEngine.createSlider(controls, 'Phase diff (deg)', 0, 360, 0, 10, function(v) { phaseDiff = v * Math.PI / 180; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var xMin = 0;
                            var xMax = 14;
                            var xScale = (viz.width - 80) / xMax;
                            var steps = 400;

                            // Three panels: wave 1, wave 2, sum
                            var panels = [
                                { label: 'Wave 1', color: viz.colors.blue, yCenter: 70, func: function(x) { return A1 * Math.sin(2 * Math.PI * f1 * x / 5); } },
                                { label: 'Wave 2', color: viz.colors.teal, yCenter: 190, func: function(x) { return A2 * Math.sin(2 * Math.PI * f2 * x / 5 + phaseDiff); } },
                                { label: 'Sum (Superposition)', color: viz.colors.orange, yCenter: 330, func: function(x) { return A1 * Math.sin(2 * Math.PI * f1 * x / 5) + A2 * Math.sin(2 * Math.PI * f2 * x / 5 + phaseDiff); } }
                            ];

                            var yScale = 35;

                            panels.forEach(function(p) {
                                // Axis
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(50, p.yCenter);
                                ctx.lineTo(viz.width - 10, p.yCenter);
                                ctx.stroke();

                                // Label
                                viz.screenText(p.label, viz.width / 2, p.yCenter - 50, p.color, 12, 'center');

                                // Curve
                                ctx.strokeStyle = p.color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var x = xMin + (i / steps) * xMax;
                                    var val = p.func(x);
                                    var px = 60 + x * xScale;
                                    var py = p.yCenter - val * yScale;
                                    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            });

                            // Interference type label
                            var phaseDeg = Math.round(phaseDiff * 180 / Math.PI);
                            var typeLabel = '';
                            if (Math.abs(f1 - f2) < 0.01) {
                                if (phaseDeg % 360 === 0) typeLabel = 'Fully constructive';
                                else if (Math.abs(phaseDeg - 180) < 5 || Math.abs(phaseDeg - 180) < 5) typeLabel = 'Fully destructive';
                                else typeLabel = 'Partial interference';
                            } else {
                                typeLabel = 'Different frequencies: beat pattern';
                            }
                            viz.screenText(typeLabel, viz.width / 2, viz.height - 10, viz.colors.yellow, 12, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two identical waves with amplitude 3.0 cm arrive at a point perfectly in phase. What is the amplitude of the resultant wave?',
                    hint: 'In phase means constructive interference. The amplitudes add.',
                    solution: 'A_result = A_1 + A_2 = 3.0 + 3.0 = 6.0 cm. This is fully constructive interference.'
                },
                {
                    question: 'Two identical waves with amplitude 3.0 cm arrive at a point exactly half a wavelength out of phase. What is the amplitude of the resultant wave?',
                    hint: 'Half a wavelength phase difference means crest meets trough.',
                    solution: 'A_result = |A_1 - A_2| = |3.0 - 3.0| = 0 cm. This is fully destructive interference; the waves cancel completely.'
                },
                {
                    question: 'Two speakers emit the same frequency. At a certain point, the path from speaker 1 is 5.0 m and from speaker 2 is 7.0 m. The wavelength is 4.0 m. Is the interference constructive or destructive?',
                    hint: 'Find the path difference and compare with the wavelength.',
                    solution: 'Path difference = 7.0 - 5.0 = 2.0 m. Number of wavelengths: 2.0/4.0 = 0.5. Since Delta = 0.5 lambda (half-integer), the interference is destructive.'
                },
                {
                    question: 'Two waves are described by y_1 = 4 sin(kx - omega t) and y_2 = 4 sin(kx - omega t + pi/3). Find the amplitude of the resultant wave.',
                    hint: 'Use the formula A_result = 2A cos(delta/2) where delta is the phase difference, for two waves of equal amplitude.',
                    solution: 'For two waves of equal amplitude A with phase difference delta: A_result = 2A |cos(delta/2)| = 2(4)|cos(pi/6)| = 8 * (sqrt(3)/2) = 8 * 0.866 = 6.93 cm.'
                },
                {
                    question: 'After two wave pulses pass through each other and separate, are they changed by the interaction? Explain.',
                    hint: 'Think about what happens to each pulse after the overlap region.',
                    solution: 'No. After passing through each other, each pulse continues with its original shape, amplitude, and speed. Superposition only affects the displacement in the overlap region at the instant they coincide. Waves pass through each other without permanent alteration.'
                }
            ]
        },

        // ===== SECTION 4: Standing Waves =====
        {
            id: 'standing-waves',
            title: 'Standing Waves',
            content: `
                <h2>Standing Waves</h2>

                <p>When two identical waves travel in opposite directions and superpose, the result is a <strong>standing wave</strong>. Unlike a traveling wave, a standing wave does not propagate; instead, it oscillates in place with certain points always at rest and others oscillating with maximum amplitude.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Standing Wave</div>
                    <div class="env-body"><p>A <strong>standing wave</strong> is the pattern formed by the superposition of two identical waves traveling in opposite directions. Mathematically, if \\(y_1 = A\\sin(kx - \\omega t)\\) and \\(y_2 = A\\sin(kx + \\omega t)\\), then:</p>
                    <p>\\[ y = y_1 + y_2 = 2A\\sin(kx)\\cos(\\omega t) \\]</p>
                    <p>This is not a traveling wave; it is a wave pattern that oscillates in place.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Nodes and Antinodes</div>
                    <div class="env-body">
                    <p><strong>Nodes</strong> are points where the displacement is always zero: \\(\\sin(kx) = 0\\), so \\(x = n\\lambda/2\\). Nodes are spaced \\(\\lambda/2\\) apart.</p>
                    <p><strong>Antinodes</strong> are points where the displacement oscillates with maximum amplitude (\\(2A\\)): \\(|\\sin(kx)| = 1\\), so \\(x = (2n+1)\\lambda/4\\). Antinodes are halfway between nodes.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-standing-wave"></div>

                <p>Standing waves on a string fixed at both ends can only exist at certain frequencies called <strong>harmonics</strong> (or resonant frequencies):</p>

                <div class="env-block theorem">
                    <div class="env-title">Harmonics of a String Fixed at Both Ends</div>
                    <div class="env-body"><p>For a string of length \\(L\\) fixed at both ends, the allowed wavelengths are:</p>
                    <p>\\[ \\lambda_n = \\frac{2L}{n}, \\quad n = 1, 2, 3, \\ldots \\]</p>
                    <p>The corresponding frequencies are:</p>
                    <p>\\[ f_n = \\frac{nv}{2L} = nf_1 \\]</p>
                    <p>where \\(f_1 = v/(2L)\\) is the <strong>fundamental frequency</strong> (first harmonic) and \\(n\\) is the harmonic number.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Guitar String</div>
                    <div class="env-body">
                        <p>A guitar string has length \\(L = 0.65\\) m and wave speed \\(v = 400\\) m/s.</p>
                        <p>Fundamental: \\(f_1 = v/(2L) = 400/(2 \\times 0.65) = 308\\) Hz.</p>
                        <p>Second harmonic: \\(f_2 = 2f_1 = 615\\) Hz. Third harmonic: \\(f_3 = 3f_1 = 923\\) Hz.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Only Certain Frequencies?</div>
                    <div class="env-body"><p>Both ends of the string are fixed, so they must be nodes. This boundary condition constrains which wave patterns can fit: only those with an integer number of half-wavelengths fitting in the string length \\(L\\). This quantization of allowed frequencies is a preview of an idea that becomes central in quantum mechanics.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-standing-wave',
                    title: 'Standing Wave Patterns',
                    description: 'Select different harmonics to see the standing wave pattern on a string fixed at both ends.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 40, originX: 50, originY: 190 });

                        var n = 1;
                        var running = true;

                        VizEngine.createSlider(controls, 'Harmonic n', 1, 7, n, 1, function(v) { n = Math.round(v); });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var elapsed = 0;
                        var lastT = null;
                        var L = 14;

                        viz.animate(function(t) {
                            if (lastT === null) lastT = t;
                            if (running) elapsed += (t - lastT) / 1000;
                            lastT = t;

                            viz.clear();

                            var wavelength = 2 * L / n;
                            var k = 2 * Math.PI / wavelength;
                            var omega = 2 * Math.PI * 0.5 * n;
                            var A = 2.5;

                            // Fixed ends
                            var leftS = viz.toScreen(0, 0);
                            var rightS = viz.toScreen(L, 0);
                            viz.ctx.fillStyle = viz.colors.text;
                            viz.ctx.beginPath(); viz.ctx.arc(leftS[0], leftS[1], 6, 0, Math.PI * 2); viz.ctx.fill();
                            viz.ctx.beginPath(); viz.ctx.arc(rightS[0], rightS[1], 6, 0, Math.PI * 2); viz.ctx.fill();

                            // Equilibrium line
                            viz.drawSegment(0, 0, L, 0, viz.colors.text + '44', 1, true);

                            // Standing wave at multiple time snapshots (faint)
                            var numGhosts = 8;
                            for (var g = 0; g < numGhosts; g++) {
                                var ghostT = g * (2 * Math.PI / omega / numGhosts);
                                var ghostCos = Math.cos(omega * ghostT);
                                viz.ctx.strokeStyle = viz.colors.blue + '22';
                                viz.ctx.lineWidth = 1;
                                viz.ctx.beginPath();
                                for (var i = 0; i <= 300; i++) {
                                    var x = (i / 300) * L;
                                    var y = 2 * A * Math.sin(k * x) * ghostCos;
                                    var ps = viz.toScreen(x, y);
                                    if (i === 0) viz.ctx.moveTo(ps[0], ps[1]); else viz.ctx.lineTo(ps[0], ps[1]);
                                }
                                viz.ctx.stroke();
                            }

                            // Current wave
                            var cosVal = Math.cos(omega * elapsed);
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var x = (i / 300) * L;
                                var y = 2 * A * Math.sin(k * x) * cosVal;
                                var ps = viz.toScreen(x, y);
                                if (i === 0) viz.ctx.moveTo(ps[0], ps[1]); else viz.ctx.lineTo(ps[0], ps[1]);
                            }
                            viz.ctx.stroke();

                            // Mark nodes and antinodes
                            for (var j = 0; j <= n; j++) {
                                var nodeX = j * L / n;
                                var ns = viz.toScreen(nodeX, 0);
                                viz.ctx.fillStyle = viz.colors.red;
                                viz.ctx.beginPath(); viz.ctx.arc(ns[0], ns[1], 5, 0, Math.PI * 2); viz.ctx.fill();
                                if (j === 0 || j === n) continue;
                                viz.screenText('N', ns[0], ns[1] + 15, viz.colors.red, 10, 'center');
                            }
                            for (var j = 0; j < n; j++) {
                                var antiX = (j + 0.5) * L / n;
                                var as = viz.toScreen(antiX, 0);
                                viz.screenText('A', as[0], as[1] + 15, viz.colors.green, 10, 'center');
                            }

                            // Info
                            viz.screenText('Harmonic n = ' + n + '    Nodes: ' + (n + 1) + '    Antinodes: ' + n, viz.width / 2, 15, viz.colors.white, 13, 'center');
                            viz.screenText('lambda = 2L/' + n + ' = ' + (2 * L / n).toFixed(1) + '    f = ' + n + ' * f_1', viz.width / 2, 35, viz.colors.teal, 12, 'center');
                            viz.screenText('Red dots = nodes (N), Green labels = antinodes (A)', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A string 1.0 m long is fixed at both ends. What are the wavelengths of the first three harmonics?',
                    hint: 'lambda_n = 2L/n.',
                    solution: 'lambda_1 = 2(1.0)/1 = 2.0 m. lambda_2 = 2(1.0)/2 = 1.0 m. lambda_3 = 2(1.0)/3 = 0.667 m.'
                },
                {
                    question: 'The fundamental frequency of a guitar string is 330 Hz. What are the frequencies of the second and third harmonics?',
                    hint: 'f_n = n * f_1.',
                    solution: 'f_2 = 2 * 330 = 660 Hz. f_3 = 3 * 330 = 990 Hz.'
                },
                {
                    question: 'A standing wave has nodes at x = 0, 0.25 m, 0.50 m, 0.75 m, and 1.0 m. What is the wavelength? What harmonic is this on a 1.0 m string?',
                    hint: 'Nodes are spaced lambda/2 apart. Count the half-wavelengths in the string.',
                    solution: 'Node spacing = 0.25 m = lambda/2, so lambda = 0.50 m. Number of half-wavelengths in L = 1.0 / 0.25 = 4. This is the 4th harmonic (n = 4).'
                },
                {
                    question: 'At a node of a standing wave, is the displacement always zero? What about the velocity?',
                    hint: 'Think about the mathematical form y = 2A sin(kx) cos(omega t) at a node.',
                    solution: 'Yes, at a node sin(kx) = 0, so the displacement is always zero for all time. Both the displacement and velocity are always zero at a node (since v = dy/dt = -2A omega sin(kx) sin(omega t), and sin(kx) = 0 at nodes).'
                },
                {
                    question: 'An organ pipe open at both ends has length 0.85 m. The speed of sound is 340 m/s. What is the fundamental frequency? (For a pipe open at both ends, both ends are antinodes, so the pattern is the same as a string fixed at both ends.)',
                    hint: 'f_1 = v/(2L).',
                    solution: 'f_1 = v/(2L) = 340/(2 * 0.85) = 340/1.70 = 200 Hz.'
                }
            ]
        },

        // ===== SECTION 5: Doppler Effect =====
        {
            id: 'doppler-effect',
            title: 'Doppler Effect',
            content: `
                <h2>Doppler Effect</h2>

                <p>You have probably noticed that when an ambulance approaches you, its siren sounds higher-pitched, and when it moves away, the pitch drops. This change in perceived frequency due to relative motion between a source and observer is called the <strong>Doppler effect</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Doppler Effect</div>
                    <div class="env-body"><p>The <strong>Doppler effect</strong> is the change in observed frequency (and wavelength) of a wave when the source and/or observer are in relative motion. If the source and observer move closer together, the observed frequency increases. If they move apart, it decreases.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Doppler Effect Formula (Sound)</div>
                    <div class="env-body"><p>For sound waves with a stationary medium, the observed frequency is:</p>
                    <p>\\[ f' = f_0 \\cdot \\frac{v \\pm v_o}{v \\mp v_s} \\]</p>
                    <p>where \\(f_0\\) is the source frequency, \\(v\\) is the speed of sound, \\(v_o\\) is the observer speed, and \\(v_s\\) is the source speed.</p>
                    <p>Convention: use the upper signs when source and observer approach each other; use the lower signs when they move apart.</p></div>
                </div>

                <p>Special cases:</p>
                <ul>
                    <li><strong>Moving source, stationary observer:</strong> \\(f' = f_0 \\cdot \\frac{v}{v - v_s}\\) (source approaching) or \\(f' = f_0 \\cdot \\frac{v}{v + v_s}\\) (source receding).</li>
                    <li><strong>Moving observer, stationary source:</strong> \\(f' = f_0 \\cdot \\frac{v + v_o}{v}\\) (observer approaching) or \\(f' = f_0 \\cdot \\frac{v - v_o}{v}\\) (observer receding).</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-doppler"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Ambulance Siren</div>
                    <div class="env-body">
                        <p>An ambulance emitting a siren at 700 Hz approaches you at 30 m/s. The speed of sound is 340 m/s. What frequency do you hear?</p>
                        <p>\\(f' = 700 \\times \\frac{340}{340 - 30} = 700 \\times \\frac{340}{310} = 700 \\times 1.097 = 768\\) Hz.</p>
                        <p>After it passes and moves away: \\(f' = 700 \\times \\frac{340}{340 + 30} = 700 \\times \\frac{340}{370} = 700 \\times 0.919 = 643\\) Hz.</p>
                        <p>You hear a drop from 768 Hz to 643 Hz as the ambulance passes, a noticeable pitch change.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Does the Frequency Change?</div>
                    <div class="env-body"><p>When the source moves toward you, each successive wave crest is emitted from a position closer to you than the previous one. This means the crests are bunched together (shorter wavelength), so you receive more crests per second (higher frequency). When the source moves away, the crests are stretched apart (longer wavelength, lower frequency).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Doppler Effect for Light</div>
                    <div class="env-body"><p>The Doppler effect also applies to light. When a star moves away from us, its light is shifted to longer wavelengths (redshift). When it moves toward us, the light shifts to shorter wavelengths (blueshift). This is how astronomers discovered that the universe is expanding: distant galaxies show redshifted light.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Sonic Boom</div>
                    <div class="env-body"><p>When a source moves at the speed of sound (\\(v_s = v\\)), the wave fronts pile up, creating a shock wave. If the source exceeds the speed of sound (supersonic), it produces a <strong>sonic boom</strong>: a cone-shaped shock wave that creates a sudden, loud noise.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-doppler',
                    title: 'Doppler Effect: Moving Source',
                    description: 'Watch wave fronts bunch up ahead of a moving source and spread out behind it.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 25, originX: 350, originY: 190 });

                        var sourceSpeed = 3.0;
                        var waveSpeed = 10.0;
                        var sourceFreq = 1.5;
                        var running = true;

                        VizEngine.createSlider(controls, 'Source speed', 0, 9.0, sourceSpeed, 0.5, function(v) { sourceSpeed = v; });
                        VizEngine.createSlider(controls, 'Source frequency', 0.5, 3.0, sourceFreq, 0.25, function(v) { sourceFreq = v; });
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });

                        var elapsed = 0;
                        var lastT = null;
                        var waveFronts = [];
                        var lastEmit = 0;

                        viz.animate(function(t) {
                            if (lastT === null) lastT = t;
                            var dt = (t - lastT) / 1000;
                            if (running) elapsed += dt;
                            lastT = t;

                            // Emit wave fronts
                            var emitInterval = 1.0 / sourceFreq;
                            while (elapsed - lastEmit >= emitInterval) {
                                lastEmit += emitInterval;
                                var srcX = sourceSpeed * lastEmit;
                                waveFronts.push({ cx: srcX, cy: 0, birthTime: lastEmit });
                            }

                            // Remove old fronts
                            waveFronts = waveFronts.filter(function(wf) {
                                var age = elapsed - wf.birthTime;
                                return age * waveSpeed < 20;
                            });

                            viz.clear();

                            var srcX = sourceSpeed * elapsed;
                            // Keep source on screen by wrapping
                            var viewOffsetX = 0;
                            if (srcX > 8) viewOffsetX = srcX - 8;

                            // Draw wave fronts as expanding circles
                            waveFronts.forEach(function(wf) {
                                var age = elapsed - wf.birthTime;
                                var radius = age * waveSpeed;
                                if (radius > 0.1) {
                                    var cx = wf.cx - viewOffsetX;
                                    var cs = viz.toScreen(cx, 0);
                                    var rPx = radius * viz.scale;
                                    var alpha = Math.max(0.1, 1.0 - age * 0.3);
                                    var alphaHex = Math.round(alpha * 180).toString(16).padStart(2, '0');
                                    viz.ctx.strokeStyle = viz.colors.blue + alphaHex;
                                    viz.ctx.lineWidth = 1.5;
                                    viz.ctx.beginPath();
                                    viz.ctx.arc(cs[0], cs[1], rPx, 0, Math.PI * 2);
                                    viz.ctx.stroke();
                                }
                            });

                            // Draw source
                            var drawSrcX = srcX - viewOffsetX;
                            var ss = viz.toScreen(drawSrcX, 0);
                            viz.ctx.fillStyle = viz.colors.orange;
                            viz.ctx.beginPath();
                            viz.ctx.arc(ss[0], ss[1], 10, 0, Math.PI * 2);
                            viz.ctx.fill();
                            viz.ctx.fillStyle = viz.colors.white;
                            viz.ctx.font = 'bold 11px -apple-system,sans-serif';
                            viz.ctx.textAlign = 'center';
                            viz.ctx.textBaseline = 'middle';
                            viz.ctx.fillText('S', ss[0], ss[1]);

                            // Direction arrow
                            if (sourceSpeed > 0.1) {
                                viz.ctx.strokeStyle = viz.colors.orange;
                                viz.ctx.lineWidth = 2;
                                var arrowStartX = ss[0] + 15;
                                var arrowEndX = ss[0] + 40;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(arrowStartX, ss[1]);
                                viz.ctx.lineTo(arrowEndX, ss[1]);
                                viz.ctx.stroke();
                                viz.ctx.fillStyle = viz.colors.orange;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(arrowEndX + 6, ss[1]);
                                viz.ctx.lineTo(arrowEndX - 4, ss[1] - 5);
                                viz.ctx.lineTo(arrowEndX - 4, ss[1] + 5);
                                viz.ctx.closePath();
                                viz.ctx.fill();
                            }

                            // Info
                            var ratio = sourceSpeed / waveSpeed;
                            var mach = 'Mach ' + ratio.toFixed(2);
                            var fAhead = sourceFreq * waveSpeed / (waveSpeed - Math.min(sourceSpeed, waveSpeed - 0.01));
                            var fBehind = sourceFreq * waveSpeed / (waveSpeed + sourceSpeed);

                            viz.screenText('Source speed = ' + sourceSpeed.toFixed(1) + ' m/s (' + mach + ')    Wave speed = ' + waveSpeed.toFixed(0) + ' m/s', viz.width / 2, 15, viz.colors.white, 13, 'center');

                            if (sourceSpeed < waveSpeed) {
                                viz.screenText('f (ahead) = ' + fAhead.toFixed(1) + ' Hz    f (behind) = ' + fBehind.toFixed(1) + ' Hz    f_0 = ' + sourceFreq.toFixed(1) + ' Hz', viz.width / 2, 35, viz.colors.teal, 12, 'center');
                            } else {
                                viz.screenText('Source is supersonic! Shock wave forms (sonic boom).', viz.width / 2, 35, viz.colors.red, 12, 'center');
                            }

                            viz.screenText('Wave fronts are compressed ahead and stretched behind the moving source', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A train horn emits sound at 500 Hz. The train moves toward a stationary observer at 25 m/s. The speed of sound is 340 m/s. What frequency does the observer hear?',
                    hint: 'Use f_prime = f_0 * v / (v - v_s) for an approaching source.',
                    solution: 'f_prime = 500 * 340/(340 - 25) = 500 * 340/315 = 500 * 1.079 = 540 Hz.'
                },
                {
                    question: 'After the train in the previous problem passes, what frequency does the observer hear?',
                    hint: 'Now the source is moving away, so use f_prime = f_0 * v / (v + v_s).',
                    solution: 'f_prime = 500 * 340/(340 + 25) = 500 * 340/365 = 500 * 0.932 = 466 Hz.'
                },
                {
                    question: 'A person runs toward a stationary siren at 5.0 m/s. The siren emits sound at 600 Hz and the speed of sound is 340 m/s. What frequency does the person hear?',
                    hint: 'Moving observer, stationary source: f_prime = f_0 * (v + v_o)/v.',
                    solution: 'f_prime = 600 * (340 + 5.0)/340 = 600 * 345/340 = 600 * 1.0147 = 609 Hz.'
                },
                {
                    question: 'A police car and a suspect car travel in the same direction. The police car (behind) moves at 40 m/s and emits a siren at 800 Hz. The suspect car (ahead) moves at 30 m/s. Speed of sound = 340 m/s. What frequency does the suspect hear?',
                    hint: 'Both are moving. Source approaches observer. Use f_prime = f_0 * (v - v_o)/(v - v_s) with the correct signs for same-direction motion.',
                    solution: 'Since they move in the same direction with source behind, the source approaches and observer recedes from the sound: f_prime = 800 * (340 - 30)/(340 - 40) = 800 * 310/300 = 800 * 1.033 = 827 Hz. The suspect hears a slightly higher pitch.'
                },
                {
                    question: 'Explain why the Doppler effect for light (redshift/blueshift) provides evidence that the universe is expanding.',
                    hint: 'Think about what a redshift means about the motion of distant galaxies.',
                    solution: 'Light from distant galaxies is observed to be redshifted (shifted to longer wavelengths), which means the galaxies are moving away from us. Furthermore, more distant galaxies show greater redshifts, meaning they are moving away faster. This is consistent with the expansion of the universe: space itself is stretching, carrying galaxies apart, so light from all distant objects is redshifted.'
                }
            ]
        }
    ]
});
