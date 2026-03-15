window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Kinetic Theory',
    subtitle: 'The Microscopic World of Heat',
    sections: [
        // ===== SECTION 1: Molecular Motion and Temperature =====
        {
            id: 'ch17-sec01',
            title: 'Molecular Motion and Temperature',
            content: `
                <h2>Molecular Motion and Temperature</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Macro to Micro</div>
                    <div class="env-body"><p>So far in our study of heat and thermodynamics, we have described temperature, pressure, and energy from a macroscopic perspective. Now we look inside: what is really happening at the molecular level? The <strong>kinetic theory of gases</strong> provides a beautifully simple answer. Temperature is not some mysterious substance; it is a measure of how fast molecules are moving.</p></div>
                </div>

                <h3>The Kinetic Theory Model</h3>

                <p>The kinetic theory of gases rests on a few key assumptions about an <strong>ideal gas</strong>:</p>
                <ol>
                    <li>A gas consists of a very large number of tiny <strong>molecules</strong> (or atoms) in constant, random motion.</li>
                    <li>The total volume of the molecules themselves is negligible compared to the volume of the container.</li>
                    <li>The molecules exert no forces on one another except during brief, elastic collisions.</li>
                    <li>Collisions with the container walls are perfectly elastic (kinetic energy is conserved).</li>
                    <li>The time spent in collisions is negligible compared to the time between collisions.</li>
                </ol>

                <div class="env-block definition">
                    <div class="env-title">Definition (Ideal Gas)</div>
                    <div class="env-body"><p>An <strong>ideal gas</strong> is a hypothetical gas whose molecules occupy negligible volume and experience no intermolecular forces. Real gases approximate ideal gas behaviour at low pressures and high temperatures.</p></div>
                </div>

                <h3>Pressure from Molecular Collisions</h3>

                <p>Gas pressure arises because billions of molecules strike the walls of the container every second. Each collision transfers a tiny impulse to the wall. The combined effect of all these impulses produces the macroscopic pressure that we measure.</p>

                <div class="env-block theorem">
                    <div class="env-title">Kinetic Theory Pressure Equation</div>
                    <div class="env-body">
                        <p>For \\(N\\) molecules of mass \\(m\\) in a container of volume \\(V\\):</p>
                        <p>\\[pV = \\frac{1}{3}Nm\\langle c^2 \\rangle\\]</p>
                        <p>where \\(\\langle c^2 \\rangle\\) is the mean square speed of the molecules. This can also be written as \\(p = \\frac{1}{3}\\rho\\langle c^2 \\rangle\\) where \\(\\rho\\) is the gas density.</p>
                    </div>
                </div>

                <h3>Temperature and Average Kinetic Energy</h3>

                <p>Comparing the kinetic theory result \\(pV = \\frac{1}{3}Nm\\langle c^2 \\rangle\\) with the ideal gas law \\(pV = NkT\\) (where \\(k = 1.38 \\times 10^{-23}\\) J/K is the Boltzmann constant), we get a remarkable result:</p>

                <div class="env-block theorem">
                    <div class="env-title">Temperature and Kinetic Energy</div>
                    <div class="env-body">
                        <p>The average translational kinetic energy of a gas molecule is directly proportional to the absolute temperature:</p>
                        <p>\\[\\langle E_k \\rangle = \\frac{1}{2}m\\langle c^2 \\rangle = \\frac{3}{2}kT\\]</p>
                        <p>This equation tells us that <strong>temperature is a direct measure of the average kinetic energy of the molecules</strong>.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Absolute Temperature Only</div>
                    <div class="env-body"><p>The kinetic energy equation uses <strong>absolute temperature</strong> in kelvin (K), not Celsius or Fahrenheit. At \\(T = 0\\) K, the average kinetic energy would be zero (all molecular motion ceases). This is absolute zero, which is \\(-273.15\\)°C.</p></div>
                </div>

                <p>Explore the gas molecule simulation below to see how temperature affects molecular speeds:</p>

                <div class="viz-placeholder" data-viz="viz-gas-molecules"></div>

                <h3>Root Mean Square Speed</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition (RMS Speed)</div>
                    <div class="env-body">
                        <p>The <strong>root mean square (RMS) speed</strong> is a useful measure of how fast molecules typically move:</p>
                        <p>\\[c_{\\text{rms}} = \\sqrt{\\langle c^2 \\rangle} = \\sqrt{\\frac{3kT}{m}} = \\sqrt{\\frac{3RT}{M}}\\]</p>
                        <p>where \\(R = 8.314\\) J/(mol K) is the gas constant and \\(M\\) is the molar mass in kg/mol.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: RMS speed of nitrogen at room temperature</div>
                    <div class="env-body">
                        <p>For \\(\\text{N}_2\\) at \\(T = 300\\) K, with \\(M = 0.028\\) kg/mol:</p>
                        <p>\\[c_{\\text{rms}} = \\sqrt{\\frac{3 \\times 8.314 \\times 300}{0.028}} = \\sqrt{267\\,214} \\approx 517 \\text{ m/s}\\]</p>
                        <p>Nitrogen molecules at room temperature move at about 517 m/s, faster than the speed of sound!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-gas-molecules',
                    title: '2D Gas Molecule Simulation',
                    description: 'Watch molecules bounce around a container. Adjust the temperature to see them speed up or slow down.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var N = 60;
                        var temperature = 300;
                        var particles = [];
                        var boxL = 20;
                        var boxT = 40;
                        var boxW = 660;
                        var boxH = 340;

                        function initParticles() {
                            particles = [];
                            var speedScale = Math.sqrt(temperature / 300);
                            for (var i = 0; i < N; i++) {
                                var angle = Math.random() * 2 * Math.PI;
                                var speed = (1 + Math.random() * 2) * speedScale;
                                particles.push({
                                    x: boxL + 20 + Math.random() * (boxW - 40),
                                    y: boxT + 20 + Math.random() * (boxH - 40),
                                    vx: speed * Math.cos(angle) * 80,
                                    vy: speed * Math.sin(angle) * 80,
                                    r: 4
                                });
                            }
                        }

                        initParticles();

                        VizEngine.createSlider(controls, 'Temperature (K)', 50, 800, 300, 10, function(v) {
                            var oldT = temperature;
                            temperature = v;
                            var ratio = Math.sqrt(temperature / oldT);
                            for (var i = 0; i < particles.length; i++) {
                                particles[i].vx *= ratio;
                                particles[i].vy *= ratio;
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            initParticles();
                        });

                        var wallHits = 0;
                        var lastWallReset = 0;
                        var wallHitRate = 0;

                        var lastTime = 0;
                        viz.animate(function(t) {
                            var dt = lastTime ? Math.min((t - lastTime) / 1000, 0.05) : 0.016;
                            lastTime = t;

                            // Update positions
                            for (var i = 0; i < particles.length; i++) {
                                var p = particles[i];
                                p.x += p.vx * dt;
                                p.y += p.vy * dt;

                                // Wall collisions
                                if (p.x - p.r < boxL) { p.x = boxL + p.r; p.vx = Math.abs(p.vx); wallHits++; }
                                if (p.x + p.r > boxL + boxW) { p.x = boxL + boxW - p.r; p.vx = -Math.abs(p.vx); wallHits++; }
                                if (p.y - p.r < boxT) { p.y = boxT + p.r; p.vy = Math.abs(p.vy); wallHits++; }
                                if (p.y + p.r > boxT + boxH) { p.y = boxT + boxH - p.r; p.vy = -Math.abs(p.vy); wallHits++; }
                            }

                            // Simple pairwise collisions
                            for (var a = 0; a < particles.length; a++) {
                                for (var b = a + 1; b < particles.length; b++) {
                                    var pa = particles[a];
                                    var pb = particles[b];
                                    var dx = pb.x - pa.x;
                                    var dy = pb.y - pa.y;
                                    var dist = Math.sqrt(dx * dx + dy * dy);
                                    var minDist = pa.r + pb.r;
                                    if (dist < minDist && dist > 0.1) {
                                        // Elastic collision
                                        var nx = dx / dist;
                                        var ny = dy / dist;
                                        var dvx = pa.vx - pb.vx;
                                        var dvy = pa.vy - pb.vy;
                                        var dvn = dvx * nx + dvy * ny;
                                        if (dvn > 0) {
                                            pa.vx -= dvn * nx;
                                            pa.vy -= dvn * ny;
                                            pb.vx += dvn * nx;
                                            pb.vy += dvn * ny;
                                        }
                                        // Separate overlapping particles
                                        var overlap = minDist - dist;
                                        pa.x -= nx * overlap * 0.5;
                                        pa.y -= ny * overlap * 0.5;
                                        pb.x += nx * overlap * 0.5;
                                        pb.y += ny * overlap * 0.5;
                                    }
                                }
                            }

                            // Wall hit rate
                            if (t - lastWallReset > 1000) {
                                wallHitRate = wallHits;
                                wallHits = 0;
                                lastWallReset = t;
                            }

                            // Draw
                            viz.clear();

                            // Box
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(boxL, boxT, boxW, boxH);

                            // Particles
                            for (var j = 0; j < particles.length; j++) {
                                var pj = particles[j];
                                var speed = Math.sqrt(pj.vx * pj.vx + pj.vy * pj.vy);
                                var maxSpeed = 400;
                                var frac = Math.min(speed / maxSpeed, 1);
                                // Color by speed: blue (slow) to red (fast)
                                var r = Math.round(80 + 175 * frac);
                                var g = Math.round(100 * (1 - frac));
                                var bl = Math.round(255 * (1 - frac));
                                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + bl + ')';
                                ctx.beginPath();
                                ctx.arc(pj.x, pj.y, pj.r, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Compute average KE
                            var totalKE = 0;
                            for (var k = 0; k < particles.length; k++) {
                                var pk = particles[k];
                                totalKE += 0.5 * (pk.vx * pk.vx + pk.vy * pk.vy);
                            }
                            var avgKE = totalKE / particles.length;

                            // Info
                            viz.screenText('T = ' + temperature + ' K', 80, 20, viz.colors.white, 14);
                            viz.screenText(N + ' molecules', 200, 20, viz.colors.text, 12);
                            viz.screenText('Wall hits/sec: ' + wallHitRate + ' (proportional to pressure)', viz.width / 2, viz.height - 8, viz.colors.teal, 12);
                            viz.screenText('Blue = slow, Red = fast', viz.width - 100, 20, viz.colors.text, 11);
                        });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch17-ex01',
                    type: 'numeric',
                    question: 'What is the average translational kinetic energy (in joules, x10^-21) of a gas molecule at 300 K? Use k = 1.38 x 10^-23 J/K. (Give the answer as the number multiplied by 10^21, e.g., 6.21 for 6.21 x 10^-21 J.)',
                    hint: 'KE = (3/2)kT. Compute in joules, then express as a multiple of 10^-21.',
                    answer: 6.21,
                    tolerance: 0.1,
                    solution: 'KE = (3/2)kT = (3/2)(1.38 x 10^-23)(300) = (3/2)(4.14 x 10^-21) = 6.21 x 10^-21 J.'
                },
                {
                    id: 'ch17-ex02',
                    type: 'numeric',
                    question: 'Calculate the RMS speed (in m/s) of oxygen (O2) molecules at 300 K. The molar mass of O2 is 0.032 kg/mol. Use R = 8.314 J/(mol K).',
                    hint: 'c_rms = sqrt(3RT/M).',
                    answer: 483,
                    tolerance: 5,
                    solution: 'c_rms = sqrt(3RT/M) = sqrt(3 x 8.314 x 300 / 0.032) = sqrt(7481.25 / 0.032) = sqrt(233789) = 483 m/s.'
                },
                {
                    id: 'ch17-ex03',
                    type: 'numeric',
                    question: 'If the temperature of a gas is doubled (from T to 2T), by what factor does the RMS speed increase? Give this factor to 2 decimal places.',
                    hint: 'c_rms is proportional to sqrt(T).',
                    answer: 1.41,
                    tolerance: 0.02,
                    solution: 'Since c_rms = sqrt(3kT/m), doubling T gives c_rms_new = sqrt(2) x c_rms_old. sqrt(2) = 1.414, so the factor is 1.41.'
                },
                {
                    id: 'ch17-ex04',
                    type: 'multiple-choice',
                    question: 'According to the kinetic theory, gas pressure is caused by:',
                    options: [
                        'Gravitational attraction between molecules',
                        'Electromagnetic forces between molecules',
                        'Molecules colliding with the container walls',
                        'Molecules repelling each other'
                    ],
                    correct: 2,
                    hint: 'What microscopic event produces the force on the walls?',
                    solution: 'In the kinetic theory model, pressure arises from the impulse transferred to the container walls by the countless collisions of gas molecules with those walls.'
                },
                {
                    id: 'ch17-ex05',
                    type: 'numeric',
                    question: 'At what temperature (in K) would hydrogen molecules (H2, M = 0.002 kg/mol) have an RMS speed of 1000 m/s?',
                    hint: 'Rearrange c_rms = sqrt(3RT/M) to solve for T = Mc^2/(3R).',
                    answer: 80.1,
                    tolerance: 1,
                    solution: 'T = Mc^2/(3R) = 0.002 x (1000)^2 / (3 x 8.314) = 2000 / 24.942 = 80.2 K.'
                },
                {
                    id: 'ch17-ex06',
                    type: 'numeric',
                    question: 'Convert 25 degrees Celsius to kelvin.',
                    hint: 'T(K) = T(C) + 273.15.',
                    answer: 298.15,
                    tolerance: 0.5,
                    solution: 'T = 25 + 273.15 = 298.15 K (often rounded to 298 K).'
                }
            ]
        },

        // ===== SECTION 2: Brownian Motion and Evidence =====
        {
            id: 'ch17-sec02',
            title: 'Brownian Motion and Evidence',
            content: `
                <h2>Brownian Motion and Evidence for Molecules</h2>

                <p>The kinetic theory makes a bold claim: matter is made of tiny particles in constant, random motion. What evidence supports this? One of the most compelling pieces of evidence came from observing tiny visible particles suspended in a fluid.</p>

                <h3>Robert Brown's Observation (1827)</h3>

                <p>The Scottish botanist Robert Brown observed pollen grains suspended in water under a microscope. He noticed that the grains jiggled around in a constant, erratic zigzag motion, even though the water appeared perfectly still. This random motion is now called <strong>Brownian motion</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Brownian Motion)</div>
                    <div class="env-body"><p><strong>Brownian motion</strong> is the random, erratic motion of small particles (such as pollen grains or smoke particles) suspended in a fluid (liquid or gas). It is caused by the unbalanced bombardment of the particle by the molecules of the surrounding fluid.</p></div>
                </div>

                <h3>Explanation by Kinetic Theory</h3>

                <p>A pollen grain is much larger than a water molecule, but it is still small enough to be affected by molecular collisions. At any instant, more molecules may be hitting one side of the grain than the other, giving it a random push. This imbalance constantly changes direction, producing the characteristic zigzag path.</p>

                <div class="env-block intuition">
                    <div class="env-title">Key Features of Brownian Motion</div>
                    <div class="env-body">
                        <ul>
                            <li>The motion is <strong>random</strong> and unpredictable in direction.</li>
                            <li>The motion <strong>never stops</strong> (as long as the fluid is above absolute zero).</li>
                            <li>The motion is <strong>more vigorous</strong> at higher temperatures (faster molecules hit harder).</li>
                            <li><strong>Smaller particles</strong> show more pronounced motion (less inertia to resist the impacts).</li>
                            <li>A <strong>less viscous</strong> fluid allows more vigorous motion.</li>
                        </ul>
                    </div>
                </div>

                <p>Watch the Brownian motion simulation below. A large visible particle (shown in white) is bombarded by invisible fluid molecules. Notice the random path it traces.</p>

                <div class="viz-placeholder" data-viz="viz-brownian-motion"></div>

                <h3>Einstein's Contribution (1905)</h3>

                <p>In 1905, Albert Einstein provided a mathematical theory of Brownian motion. He predicted that the <strong>mean square displacement</strong> of a Brownian particle should be proportional to time:</p>
                <p>\\[\\langle x^2 \\rangle = 2Dt\\]</p>
                <p>where \\(D\\) is the diffusion coefficient. Jean Perrin later verified this experimentally, providing convincing evidence for the existence of atoms and molecules, and earning the 1926 Nobel Prize in Physics.</p>

                <div class="env-block remark">
                    <div class="env-title">Historical Significance</div>
                    <div class="env-body"><p>Before Perrin's experiments confirmed Einstein's predictions, many prominent scientists (including Ernst Mach) did not believe atoms were real entities. Brownian motion was the "smoking gun" that established the reality of molecular motion beyond reasonable doubt.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-brownian-motion',
                    title: 'Brownian Motion Simulation',
                    description: 'Watch a large particle (white) being buffeted by invisible fluid molecules. The trail shows its random walk.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var temperature = 300;
                        var particleSize = 12;
                        var trail = [];
                        var maxTrail = 500;

                        var bx = 350;
                        var by = 200;

                        // Fluid molecules (small, shown faintly)
                        var numMolecules = 80;
                        var molecules = [];
                        for (var i = 0; i < numMolecules; i++) {
                            var angle = Math.random() * 2 * Math.PI;
                            var spd = 50 + Math.random() * 150;
                            molecules.push({
                                x: 30 + Math.random() * 640,
                                y: 30 + Math.random() * 340,
                                vx: spd * Math.cos(angle),
                                vy: spd * Math.sin(angle),
                                r: 2
                            });
                        }

                        VizEngine.createSlider(controls, 'Temperature (K)', 50, 600, 300, 10, function(v) {
                            var ratio = Math.sqrt(v / temperature);
                            temperature = v;
                            for (var j = 0; j < molecules.length; j++) {
                                molecules[j].vx *= ratio;
                                molecules[j].vy *= ratio;
                            }
                        });

                        VizEngine.createButton(controls, 'Clear Trail', function() {
                            trail = [];
                        });

                        var bvx = 0;
                        var bvy = 0;
                        var lastTime = 0;

                        viz.animate(function(t) {
                            var dt = lastTime ? Math.min((t - lastTime) / 1000, 0.05) : 0.016;
                            lastTime = t;

                            // Update molecules
                            for (var i = 0; i < molecules.length; i++) {
                                var m = molecules[i];
                                m.x += m.vx * dt;
                                m.y += m.vy * dt;

                                // Wall bounce
                                if (m.x < 20) { m.x = 20; m.vx = Math.abs(m.vx); }
                                if (m.x > 680) { m.x = 680; m.vx = -Math.abs(m.vx); }
                                if (m.y < 20) { m.y = 20; m.vy = Math.abs(m.vy); }
                                if (m.y > 380) { m.y = 380; m.vy = -Math.abs(m.vy); }

                                // Check collision with big particle
                                var dx = bx - m.x;
                                var dy = by - m.y;
                                var dist = Math.sqrt(dx * dx + dy * dy);
                                var minD = particleSize + m.r;
                                if (dist < minD && dist > 0.1) {
                                    var nx = dx / dist;
                                    var ny = dy / dist;
                                    // Transfer momentum (big particle is much heavier)
                                    var relVn = (m.vx - bvx) * (-nx) + (m.vy - bvy) * (-ny);
                                    if (relVn > 0) {
                                        var massRatio = 0.02; // small mass / big mass
                                        bvx += relVn * (-nx) * massRatio * 2;
                                        bvy += relVn * (-ny) * massRatio * 2;
                                        m.vx = -m.vx;
                                        m.vy = -m.vy;
                                    }
                                    // Separate
                                    var overlap = minD - dist;
                                    m.x -= nx * overlap;
                                    m.y -= ny * overlap;
                                }
                            }

                            // Update big particle
                            bx += bvx * dt * 60;
                            by += bvy * dt * 60;
                            bvx *= 0.98; // damping
                            bvy *= 0.98;

                            // Keep big particle in bounds
                            if (bx < 30 + particleSize) { bx = 30 + particleSize; bvx = Math.abs(bvx); }
                            if (bx > 670 - particleSize) { bx = 670 - particleSize; bvx = -Math.abs(bvx); }
                            if (by < 30 + particleSize) { by = 30 + particleSize; bvy = Math.abs(bvy); }
                            if (by > 370 - particleSize) { by = 370 - particleSize; bvy = -Math.abs(bvy); }

                            // Record trail
                            trail.push([bx, by]);
                            if (trail.length > maxTrail) trail.shift();

                            // Draw
                            viz.clear();

                            // Box boundary
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(20, 20, 660, 360);

                            // Trail
                            if (trail.length > 1) {
                                ctx.strokeStyle = viz.colors.yellow + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(trail[0][0], trail[0][1]);
                                for (var k = 1; k < trail.length; k++) {
                                    ctx.lineTo(trail[k][0], trail[k][1]);
                                }
                                ctx.stroke();
                            }

                            // Draw molecules
                            for (var j = 0; j < molecules.length; j++) {
                                ctx.fillStyle = viz.colors.blue + '55';
                                ctx.beginPath();
                                ctx.arc(molecules[j].x, molecules[j].y, molecules[j].r, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Draw big particle
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(bx, by, particleSize, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.beginPath();
                            ctx.arc(bx, by, particleSize * 0.3, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('T = ' + temperature + ' K', 70, 12, viz.colors.white, 13);
                            viz.screenText('Brownian Motion', viz.width / 2, 12, viz.colors.yellow, 14);
                            viz.screenText('Yellow trail shows random walk of large particle', viz.width / 2, viz.height - 5, viz.colors.text, 11);
                        });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch17-ex07',
                    type: 'multiple-choice',
                    question: 'Brownian motion of a pollen grain in water is caused by:',
                    options: [
                        'Convection currents in the water',
                        'Vibrations from the laboratory floor',
                        'Unequal bombardment by water molecules',
                        'Electrical forces between the pollen and water'
                    ],
                    correct: 2,
                    hint: 'Think about what the kinetic theory says about molecular collisions.',
                    solution: 'Brownian motion is caused by the random, unequal bombardment of the visible particle by the surrounding fluid molecules. At any instant, more molecules may hit one side than the other, causing the particle to jerk in a random direction.'
                },
                {
                    id: 'ch17-ex08',
                    type: 'multiple-choice',
                    question: 'Which change would make Brownian motion MORE vigorous?',
                    options: [
                        'Lowering the temperature',
                        'Using a larger pollen grain',
                        'Raising the temperature',
                        'Using a more viscous fluid'
                    ],
                    correct: 2,
                    hint: 'Higher temperature means faster molecules and harder collisions.',
                    solution: 'Raising the temperature increases the average speed of the fluid molecules, leading to harder and more energetic collisions with the visible particle. This makes the Brownian motion more vigorous.'
                },
                {
                    id: 'ch17-ex09',
                    type: 'multiple-choice',
                    question: 'Brownian motion provides direct evidence for:',
                    options: [
                        'The wave nature of light',
                        'The existence of atoms and molecules in constant random motion',
                        'Conservation of energy',
                        'Newton\'s third law'
                    ],
                    correct: 1,
                    hint: 'What fundamental claim about matter does Brownian motion support?',
                    solution: 'Brownian motion provides direct, visible evidence that fluids are made of tiny particles (molecules) in constant random motion. The visible jiggling of pollen grains can only be explained by molecular bombardment.'
                },
                {
                    id: 'ch17-ex10',
                    type: 'multiple-choice',
                    question: 'If you observe smoke particles in air showing Brownian motion, the path of each smoke particle is:',
                    options: [
                        'A smooth curve',
                        'A straight line',
                        'A random, erratic zigzag',
                        'A perfect circle'
                    ],
                    correct: 2,
                    hint: 'The direction of the molecular bombardment changes constantly.',
                    solution: 'Each smoke particle follows a random, erratic zigzag path because the direction and magnitude of the net force from molecular collisions changes rapidly and unpredictably.'
                }
            ]
        },

        // ===== SECTION 3: Molecular Speed Distribution =====
        {
            id: 'ch17-sec03',
            title: 'Molecular Speed Distribution',
            content: `
                <h2>Molecular Speed Distribution</h2>

                <p>Not all molecules in a gas travel at the same speed. At any given moment, some molecules are moving slowly (perhaps having just collided), while others are racing along at very high speeds. The distribution of speeds follows a specific pattern described by James Clerk Maxwell and Ludwig Boltzmann.</p>

                <h3>The Maxwell-Boltzmann Distribution</h3>

                <div class="env-block definition">
                    <div class="env-title">Maxwell-Boltzmann Speed Distribution</div>
                    <div class="env-body">
                        <p>The probability of finding a molecule with speed \\(c\\) in a gas at temperature \\(T\\) is given by:</p>
                        <p>\\[f(c) = 4\\pi n \\left(\\frac{m}{2\\pi kT}\\right)^{3/2} c^2 \\exp\\left(-\\frac{mc^2}{2kT}\\right)\\]</p>
                        <p>This function describes a characteristic asymmetric curve: it rises from zero, reaches a peak, and then falls off with a long tail on the high-speed side.</p>
                    </div>
                </div>

                <h3>Three Important Speeds</h3>

                <p>The Maxwell-Boltzmann distribution defines three characteristic speeds:</p>

                <div class="env-block theorem">
                    <div class="env-title">Characteristic Speeds</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Most probable speed</strong> \\(c_p\\): the speed at the peak of the distribution.
                                \\[c_p = \\sqrt{\\frac{2kT}{m}} = \\sqrt{\\frac{2RT}{M}}\\]</li>
                            <li><strong>Mean speed</strong> \\(\\bar{c}\\): the average of all molecular speeds.
                                \\[\\bar{c} = \\sqrt{\\frac{8kT}{\\pi m}} = \\sqrt{\\frac{8RT}{\\pi M}}\\]</li>
                            <li><strong>RMS speed</strong> \\(c_{\\text{rms}}\\): the root mean square speed.
                                \\[c_{\\text{rms}} = \\sqrt{\\frac{3kT}{m}} = \\sqrt{\\frac{3RT}{M}}\\]</li>
                        </ul>
                        <p>The ordering is always: \\(c_p < \\bar{c} < c_{\\text{rms}}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-maxwell-boltzmann"></div>

                <h3>Effect of Temperature and Mass</h3>

                <div class="env-block intuition">
                    <div class="env-title">How the Distribution Changes</div>
                    <div class="env-body">
                        <p><strong>Higher temperature:</strong> The peak shifts to the right (faster most probable speed) and the curve becomes broader and shorter. More molecules have high speeds.</p>
                        <p><strong>Heavier molecules:</strong> The peak shifts to the left (slower speeds) and the curve becomes taller and narrower. At the same temperature, heavier molecules move more slowly on average.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-temperature-speed"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Comparing H2 and O2</div>
                    <div class="env-body">
                        <p>At 300 K, the RMS speed of H2 (\\(M = 0.002\\) kg/mol) is:</p>
                        <p>\\[c_{\\text{rms}} = \\sqrt{\\frac{3 \\times 8.314 \\times 300}{0.002}} = 1934 \\text{ m/s}\\]</p>
                        <p>The RMS speed of O2 (\\(M = 0.032\\) kg/mol) is:</p>
                        <p>\\[c_{\\text{rms}} = \\sqrt{\\frac{3 \\times 8.314 \\times 300}{0.032}} = 483 \\text{ m/s}\\]</p>
                        <p>Hydrogen molecules move about 4 times faster than oxygen molecules at the same temperature, because they are 16 times lighter.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-maxwell-boltzmann',
                    title: 'Maxwell-Boltzmann Speed Distribution',
                    description: 'See how molecular speeds are distributed. Adjust temperature and molecular mass.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 80, originY: 340 });
                        var ctx = viz.ctx;

                        var T = 300;
                        var M = 28; // g/mol (N2)

                        VizEngine.createSlider(controls, 'Temperature (K)', 100, 800, 300, 10, function(v) { T = v; draw(); });
                        VizEngine.createSlider(controls, 'Molar mass (g/mol)', 2, 80, 28, 1, function(v) { M = v; draw(); });

                        function mbDist(c, temp, molarMass) {
                            var m = molarMass / 1000; // kg/mol
                            var R = 8.314;
                            var a = m / (2 * R * temp);
                            return 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * c * c * Math.exp(-a * c * c);
                        }

                        function draw() {
                            viz.clear();

                            var plotW = 560;
                            var plotH = 280;
                            var plotX = 80;
                            var plotY = 50;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY + plotH);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY);
                            ctx.lineTo(plotX, plotY + plotH);
                            ctx.stroke();

                            viz.screenText('Speed (m/s)', plotX + plotW / 2, plotY + plotH + 30, viz.colors.text, 12);
                            ctx.save();
                            ctx.translate(25, plotY + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Fraction of molecules', 0, 0);
                            ctx.restore();

                            // Determine speed range
                            var cMax = Math.sqrt(3 * 8.314 * T / (M / 1000)) * 2.5;
                            if (cMax < 500) cMax = 500;

                            // Speed axis labels
                            var nLabels = 5;
                            for (var i = 0; i <= nLabels; i++) {
                                var cLabel = (cMax * i / nLabels);
                                var lx = plotX + (i / nLabels) * plotW;
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(Math.round(cLabel), lx, plotY + plotH + 14);
                                // Tick
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(lx, plotY + plotH);
                                ctx.lineTo(lx, plotY + plotH - 4);
                                ctx.stroke();
                            }

                            // Find max of distribution for scaling
                            var maxF = 0;
                            var steps = 300;
                            for (var s = 0; s <= steps; s++) {
                                var c = (s / steps) * cMax;
                                var fVal = mbDist(c, T, M);
                                if (fVal > maxF) maxF = fVal;
                            }

                            // Plot distribution
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var s2 = 0; s2 <= steps; s2++) {
                                var c2 = (s2 / steps) * cMax;
                                var f2 = mbDist(c2, T, M);
                                var px = plotX + (s2 / steps) * plotW;
                                var py = plotY + plotH - (f2 / maxF) * plotH * 0.9;
                                if (s2 === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Fill under curve
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            for (var s3 = 0; s3 <= steps; s3++) {
                                var c3 = (s3 / steps) * cMax;
                                var f3 = mbDist(c3, T, M);
                                var px3 = plotX + (s3 / steps) * plotW;
                                var py3 = plotY + plotH - (f3 / maxF) * plotH * 0.9;
                                ctx.lineTo(px3, py3);
                            }
                            ctx.lineTo(plotX + plotW, plotY + plotH);
                            ctx.closePath();
                            ctx.fill();

                            // Mark characteristic speeds
                            var Rconst = 8.314;
                            var mKg = M / 1000;
                            var cp = Math.sqrt(2 * Rconst * T / mKg);
                            var cMean = Math.sqrt(8 * Rconst * T / (Math.PI * mKg));
                            var cRms = Math.sqrt(3 * Rconst * T / mKg);

                            var speeds = [
                                { v: cp, label: 'c_p', color: viz.colors.green },
                                { v: cMean, label: 'c_mean', color: viz.colors.orange },
                                { v: cRms, label: 'c_rms', color: viz.colors.red }
                            ];

                            for (var si = 0; si < speeds.length; si++) {
                                var sv = speeds[si];
                                var sx = plotX + (sv.v / cMax) * plotW;
                                if (sx > plotX && sx < plotX + plotW) {
                                    ctx.strokeStyle = sv.color;
                                    ctx.lineWidth = 1.5;
                                    ctx.setLineDash([5, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(sx, plotY + plotH);
                                    ctx.lineTo(sx, plotY + 20);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText(sv.label + ' = ' + Math.round(sv.v) + ' m/s', sx, plotY + 10 + si * 14, sv.color, 11);
                                }
                            }

                            // Title
                            viz.screenText('Maxwell-Boltzmann Distribution | T = ' + T + ' K | M = ' + M + ' g/mol', viz.width / 2, plotY - 15, viz.colors.white, 14);
                        }

                        draw();
                    }
                },
                {
                    id: 'viz-temperature-speed',
                    title: 'Effect of Temperature on Speed Distribution',
                    description: 'Compare the Maxwell-Boltzmann distribution at two different temperatures.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 80, originY: 320 });
                        var ctx = viz.ctx;

                        var T1 = 200;
                        var T2 = 500;
                        var M = 28;

                        VizEngine.createSlider(controls, 'T1 (K)', 100, 600, 200, 10, function(v) { T1 = v; draw(); });
                        VizEngine.createSlider(controls, 'T2 (K)', 100, 1000, 500, 10, function(v) { T2 = v; draw(); });
                        VizEngine.createSlider(controls, 'Molar mass (g/mol)', 2, 80, 28, 1, function(v) { M = v; draw(); });

                        function mbDist(c, temp, molarMass) {
                            var m = molarMass / 1000;
                            var R = 8.314;
                            var a = m / (2 * R * temp);
                            return 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * c * c * Math.exp(-a * c * c);
                        }

                        function draw() {
                            viz.clear();

                            var plotW = 540;
                            var plotH = 260;
                            var plotX = 90;
                            var plotY = 40;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY + plotH);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY);
                            ctx.lineTo(plotX, plotY + plotH);
                            ctx.stroke();

                            viz.screenText('Speed (m/s)', plotX + plotW / 2, plotY + plotH + 28, viz.colors.text, 12);

                            var cMax1 = Math.sqrt(3 * 8.314 * T1 / (M / 1000)) * 2.5;
                            var cMax2 = Math.sqrt(3 * 8.314 * T2 / (M / 1000)) * 2.5;
                            var cMax = Math.max(cMax1, cMax2, 500);

                            // Speed axis labels
                            for (var i = 0; i <= 5; i++) {
                                var cLabel = (cMax * i / 5);
                                var lx = plotX + (i / 5) * plotW;
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(Math.round(cLabel), lx, plotY + plotH + 14);
                            }

                            // Find global max for scaling
                            var maxF = 0;
                            var steps = 300;
                            for (var s = 0; s <= steps; s++) {
                                var c = (s / steps) * cMax;
                                var f1 = mbDist(c, T1, M);
                                var f2 = mbDist(c, T2, M);
                                if (f1 > maxF) maxF = f1;
                                if (f2 > maxF) maxF = f2;
                            }

                            // Plot T1
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var s1 = 0; s1 <= steps; s1++) {
                                var c1 = (s1 / steps) * cMax;
                                var fv1 = mbDist(c1, T1, M);
                                var px1 = plotX + (s1 / steps) * plotW;
                                var py1 = plotY + plotH - (fv1 / maxF) * plotH * 0.9;
                                if (s1 === 0) ctx.moveTo(px1, py1);
                                else ctx.lineTo(px1, py1);
                            }
                            ctx.stroke();

                            // Plot T2
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var s2 = 0; s2 <= steps; s2++) {
                                var c2 = (s2 / steps) * cMax;
                                var fv2 = mbDist(c2, T2, M);
                                var px2 = plotX + (s2 / steps) * plotW;
                                var py2 = plotY + plotH - (fv2 / maxF) * plotH * 0.9;
                                if (s2 === 0) ctx.moveTo(px2, py2);
                                else ctx.lineTo(px2, py2);
                            }
                            ctx.stroke();

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(plotX + plotW - 140, plotY + 10, 12, 12);
                            viz.screenText('T1 = ' + T1 + ' K', plotX + plotW - 70, plotY + 16, viz.colors.blue, 12);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(plotX + plotW - 140, plotY + 28, 12, 12);
                            viz.screenText('T2 = ' + T2 + ' K', plotX + plotW - 70, plotY + 34, viz.colors.orange, 12);

                            viz.screenText('Higher T: broader curve, higher peak speed', viz.width / 2, plotY + plotH + 45, viz.colors.text, 11);
                            viz.screenText('M = ' + M + ' g/mol', plotX + 60, plotY + 16, viz.colors.text, 12);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch17-ex11',
                    type: 'multiple-choice',
                    question: 'The Maxwell-Boltzmann speed distribution curve is:',
                    options: [
                        'Symmetric (like a bell curve)',
                        'Asymmetric with a longer tail on the high-speed side',
                        'Flat (uniform distribution)',
                        'Asymmetric with a longer tail on the low-speed side'
                    ],
                    correct: 1,
                    hint: 'Think about the shape: it starts at zero speed (f = 0), rises to a peak, then falls off.',
                    solution: 'The Maxwell-Boltzmann distribution is asymmetric. It starts at zero for c = 0, rises to a peak at the most probable speed, then falls off with a long tail extending toward high speeds. The exponential decay ensures there is always a small fraction of very fast molecules.'
                },
                {
                    id: 'ch17-ex12',
                    type: 'numeric',
                    question: 'For nitrogen (N2, M = 0.028 kg/mol) at 400 K, calculate the most probable speed in m/s. Use c_p = sqrt(2RT/M).',
                    hint: 'c_p = sqrt(2 x 8.314 x 400 / 0.028).',
                    answer: 487,
                    tolerance: 5,
                    solution: 'c_p = sqrt(2 x 8.314 x 400 / 0.028) = sqrt(6651.2 / 0.028) = sqrt(237543) = 487 m/s.'
                },
                {
                    id: 'ch17-ex13',
                    type: 'multiple-choice',
                    question: 'When temperature increases, the peak of the Maxwell-Boltzmann distribution:',
                    options: [
                        'Shifts left and becomes taller',
                        'Shifts right and becomes shorter and broader',
                        'Does not change position',
                        'Disappears entirely'
                    ],
                    correct: 1,
                    hint: 'Higher T means higher average speeds, but the total area under the curve must remain 1.',
                    solution: 'At higher temperatures, molecules move faster on average, so the peak shifts to the right (higher speeds). The curve becomes shorter and broader because the same total number of molecules are now spread over a wider range of speeds. The total area under the curve stays equal to 1 (normalized).'
                },
                {
                    id: 'ch17-ex14',
                    type: 'numeric',
                    question: 'The RMS speed of helium (M = 0.004 kg/mol) at 300 K is how many times the RMS speed of argon (M = 0.040 kg/mol) at the same temperature? Give the ratio to 2 decimal places.',
                    hint: 'c_rms is proportional to 1/sqrt(M) at the same temperature.',
                    answer: 3.16,
                    tolerance: 0.05,
                    solution: 'c_rms ratio = sqrt(M_argon / M_helium) = sqrt(0.040 / 0.004) = sqrt(10) = 3.16. Helium molecules move about 3.16 times faster than argon molecules at the same temperature.'
                },
                {
                    id: 'ch17-ex15',
                    type: 'numeric',
                    question: 'For any gas, the ratio c_rms / c_p = sqrt(3/2). Calculate this ratio to 2 decimal places.',
                    hint: 'c_rms = sqrt(3kT/m), c_p = sqrt(2kT/m). Take the ratio.',
                    answer: 1.22,
                    tolerance: 0.02,
                    solution: 'c_rms/c_p = sqrt(3kT/m) / sqrt(2kT/m) = sqrt(3/2) = sqrt(1.5) = 1.22.'
                }
            ]
        },

        // ===== SECTION 4: Internal Energy =====
        {
            id: 'ch17-sec04',
            title: 'Internal Energy',
            content: `
                <h2>Internal Energy</h2>

                <p>Every substance contains energy at the molecular level. This energy, which depends on the random motion and interactions of the molecules, is called the <strong>internal energy</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Internal Energy)</div>
                    <div class="env-body">
                        <p>The <strong>internal energy</strong> \\(U\\) of a system is the total of all the kinetic energies and potential energies of its molecules. For an ideal gas (no intermolecular forces), internal energy is purely kinetic:</p>
                        <p>\\[U = N \\times \\langle E_k \\rangle = N \\times \\frac{3}{2}kT = \\frac{3}{2}nRT\\]</p>
                        <p>where \\(N\\) is the number of molecules, \\(n\\) is the number of moles, and \\(R\\) is the gas constant.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">What Internal Energy Is NOT</div>
                    <div class="env-body">
                        <p>Internal energy does <em>not</em> include the kinetic energy of the container as a whole, or the gravitational potential energy of the system as a whole. It is purely the energy associated with the random, microscopic motion and interaction of the molecules within the system.</p>
                    </div>
                </div>

                <h3>Degrees of Freedom</h3>

                <p>The formula \\(U = \\frac{3}{2}nRT\\) applies to a <strong>monatomic</strong> ideal gas (like helium or neon), where each molecule has 3 translational degrees of freedom (motion in the \\(x\\), \\(y\\), and \\(z\\) directions).</p>

                <div class="env-block theorem">
                    <div class="env-title">Equipartition Theorem</div>
                    <div class="env-body">
                        <p>Each degree of freedom contributes \\(\\frac{1}{2}kT\\) to the average energy per molecule. A molecule with \\(f\\) degrees of freedom has:</p>
                        <p>\\[\\langle E \\rangle = \\frac{f}{2}kT\\]</p>
                        <p>and the total internal energy for \\(n\\) moles is:</p>
                        <p>\\[U = \\frac{f}{2}nRT\\]</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Degrees of Freedom for Different Molecules</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Monatomic</strong> (He, Ne, Ar): 3 translational DOF. \\(U = \\frac{3}{2}nRT\\).</li>
                            <li><strong>Diatomic</strong> (N2, O2, H2): 5 DOF at moderate temperatures (3 translational + 2 rotational). \\(U = \\frac{5}{2}nRT\\).</li>
                            <li><strong>Polyatomic</strong> (CO2, H2O): 6 or more DOF (3 translational + 3 rotational). \\(U = \\frac{6}{2}nRT = 3nRT\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-internal-energy"></div>

                <h3>Changing Internal Energy</h3>

                <p>Internal energy can change in two ways:</p>
                <ol>
                    <li><strong>Heating or cooling:</strong> Adding heat \\(Q\\) to a gas increases its internal energy. Removing heat decreases it.</li>
                    <li><strong>Work:</strong> When a gas expands, it does work on its surroundings, reducing its internal energy. When compressed, work is done on the gas, increasing its internal energy.</li>
                </ol>

                <div class="env-block theorem">
                    <div class="env-title">First Law of Thermodynamics (Preview)</div>
                    <div class="env-body">
                        <p>\\[\\Delta U = Q - W\\]</p>
                        <p>The change in internal energy equals the heat added to the system minus the work done by the system. (We will explore this in detail in the next chapter.)</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Temperature vs. Internal Energy</div>
                    <div class="env-body"><p>Temperature is related to the <em>average</em> kinetic energy per molecule. Internal energy is the <em>total</em> energy of all molecules. Two systems can have the same temperature but very different internal energies if they contain different amounts of substance.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-internal-energy',
                    title: 'Internal Energy Bar Chart',
                    description: 'Compare the internal energy contributions for monatomic, diatomic, and polyatomic gases.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;

                        var T = 300;
                        var n = 1.0;

                        VizEngine.createSlider(controls, 'Temperature (K)', 100, 800, 300, 10, function(v) { T = v; draw(); });
                        VizEngine.createSlider(controls, 'Amount (mol)', 0.5, 5.0, 1.0, 0.1, function(v) { n = v; draw(); });

                        function draw() {
                            viz.clear();

                            var R = 8.314;
                            var gases = [
                                { name: 'Monatomic\n(He, Ne)', f: 3, color: viz.colors.blue },
                                { name: 'Diatomic\n(N2, O2)', f: 5, color: viz.colors.teal },
                                { name: 'Polyatomic\n(CO2, H2O)', f: 6, color: viz.colors.orange }
                            ];

                            var maxU = (6 / 2) * n * R * T;
                            var barW = 100;
                            var barMaxH = 240;
                            var baseY = 340;
                            var startX = 120;
                            var gap = 100;

                            viz.screenText('Internal Energy Comparison | T = ' + T + ' K, n = ' + n.toFixed(1) + ' mol', viz.width / 2, 25, viz.colors.white, 14);

                            for (var i = 0; i < gases.length; i++) {
                                var g = gases[i];
                                var U = (g.f / 2) * n * R * T;
                                var barH = (U / maxU) * barMaxH;
                                var bx = startX + i * (barW + gap);

                                // Bar
                                ctx.fillStyle = g.color + '55';
                                ctx.fillRect(bx, baseY - barH, barW, barH);
                                ctx.strokeStyle = g.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(bx, baseY - barH, barW, barH);

                                // Split bar into DOF contributions
                                var segH = barH / g.f;
                                for (var d = 0; d < g.f; d++) {
                                    var segY = baseY - (d + 1) * segH;
                                    ctx.strokeStyle = g.color + '88';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(bx, segY);
                                    ctx.lineTo(bx + barW, segY);
                                    ctx.stroke();
                                }

                                // Labels
                                var lines = g.name.split('\n');
                                for (var li = 0; li < lines.length; li++) {
                                    viz.screenText(lines[li], bx + barW / 2, baseY + 18 + li * 14, g.color, 12);
                                }

                                // Value
                                viz.screenText('U = ' + (U / 1000).toFixed(2) + ' kJ', bx + barW / 2, baseY - barH - 18, g.color, 12);
                                viz.screenText('f = ' + g.f, bx + barW / 2, baseY - barH - 4, viz.colors.text, 11);

                                // DOF breakdown inside bar
                                if (barH > 60) {
                                    var transH = (3 / g.f) * barH;
                                    ctx.fillStyle = viz.colors.blue + '33';
                                    ctx.fillRect(bx + 2, baseY - transH, barW - 4, transH);
                                    viz.screenText('Trans', bx + barW / 2, baseY - transH / 2, viz.colors.white, 9);
                                    if (g.f > 3) {
                                        var rotH = ((g.f - 3) / g.f) * barH;
                                        ctx.fillStyle = viz.colors.purple + '33';
                                        ctx.fillRect(bx + 2, baseY - barH, barW - 4, rotH);
                                        viz.screenText('Rot', bx + barW / 2, baseY - barH + rotH / 2, viz.colors.purple, 9);
                                    }
                                }
                            }

                            // Base line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(80, baseY);
                            ctx.lineTo(viz.width - 40, baseY);
                            ctx.stroke();

                            viz.screenText('U = (f/2) nRT', viz.width / 2, baseY + 50, viz.colors.text, 13);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch17-ex16',
                    type: 'numeric',
                    question: 'Calculate the internal energy (in joules) of 2.0 moles of an ideal monatomic gas at 400 K. Use R = 8.314 J/(mol K).',
                    hint: 'U = (3/2)nRT for a monatomic gas.',
                    answer: 9977,
                    tolerance: 50,
                    solution: 'U = (3/2)nRT = (3/2)(2.0)(8.314)(400) = 3 x 8.314 x 400 = 9977 J, approximately 10.0 kJ.'
                },
                {
                    id: 'ch17-ex17',
                    type: 'numeric',
                    question: 'A diatomic gas (f = 5) has 3.0 moles at 350 K. What is its internal energy in kJ?',
                    hint: 'U = (f/2)nRT = (5/2)nRT.',
                    answer: 21.8,
                    tolerance: 0.5,
                    solution: 'U = (5/2)(3.0)(8.314)(350) = 2.5 x 3.0 x 8.314 x 350 = 2.5 x 8730 = 21,824 J = 21.8 kJ.'
                },
                {
                    id: 'ch17-ex18',
                    type: 'multiple-choice',
                    question: 'For an ideal gas, internal energy depends on:',
                    options: [
                        'Temperature and pressure',
                        'Temperature and volume',
                        'Temperature only (and the amount of gas)',
                        'Pressure and volume only'
                    ],
                    correct: 2,
                    hint: 'Look at the formula U = (f/2)nRT. Which variables appear?',
                    solution: 'For an ideal gas, U = (f/2)nRT. The internal energy depends only on the temperature T and the amount of gas n (number of moles). It does not depend separately on pressure or volume.'
                },
                {
                    id: 'ch17-ex19',
                    type: 'numeric',
                    question: 'The internal energy of 1 mole of a monatomic ideal gas increases by 500 J. By how many kelvin did the temperature rise?',
                    hint: 'Delta U = (3/2)nR(Delta T). Solve for Delta T.',
                    answer: 40.1,
                    tolerance: 1,
                    solution: 'Delta U = (3/2)nR(Delta T). Delta T = Delta U / ((3/2)nR) = 500 / (1.5 x 1 x 8.314) = 500 / 12.471 = 40.1 K.'
                },
                {
                    id: 'ch17-ex20',
                    type: 'multiple-choice',
                    question: 'A diatomic molecule at moderate temperature has more internal energy than a monatomic molecule at the same temperature because:',
                    options: [
                        'It has more mass',
                        'It has additional rotational degrees of freedom',
                        'It moves faster',
                        'It has stronger intermolecular forces'
                    ],
                    correct: 1,
                    hint: 'Think about what "degrees of freedom" means for energy storage.',
                    solution: 'A diatomic molecule has 5 degrees of freedom (3 translational + 2 rotational) compared to 3 for a monatomic molecule. By the equipartition theorem, each degree of freedom stores (1/2)kT of energy, so the diatomic molecule stores more energy per molecule at the same temperature.'
                }
            ]
        }
    ]
});
