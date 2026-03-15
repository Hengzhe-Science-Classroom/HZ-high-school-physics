window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Gravitation',
    subtitle: 'Universal Gravitation and Celestial Mechanics',
    sections: [

        // ===== Section 1: Newton's Law of Universal Gravitation =====
        {
            id: 'ch06-sec01',
            title: "Newton's Law of Universal Gravitation",
            content: `
<div class="env-block intuition"><div class="env-title">From Falling Apples to Orbiting Moons</div><div class="env-body"><p>In the previous chapters, we studied forces like tension, friction, and the normal force. But what keeps planets in orbit, holds the Moon near the Earth, and makes an apple fall from a tree? The answer is <strong>gravity</strong>, and it turns out that the same force governs all of these phenomena. In this chapter, we discover Newton's remarkable insight: every object in the universe attracts every other object.</p></div></div>

<h2>The Universal Force</h2>
<p>Before Newton, people believed that celestial motion and terrestrial motion were governed by different laws. Newton unified them with a single equation.</p>

<div class="env-block definition"><div class="env-title">Newton's Law of Universal Gravitation</div><div class="env-body"><p>Every two objects with masses \\(M\\) and \\(m\\), separated by a distance \\(r\\) (measured center to center), attract each other with a force:</p>
<p>\\[ F = G\\frac{Mm}{r^2} \\]</p>
<p>where \\(G = 6.674 \\times 10^{-11}\\;\\text{N}\\cdot\\text{m}^2/\\text{kg}^2\\) is the <strong>gravitational constant</strong>.</p></div></div>

<h3>Key Features of Gravitational Force</h3>
<ul>
    <li><strong>Always attractive:</strong> Gravity only pulls, never pushes.</li>
    <li><strong>Inverse-square law:</strong> The force decreases as the square of the distance. Doubling the distance reduces the force to one quarter.</li>
    <li><strong>Universal:</strong> It applies to all masses, from atoms to galaxies.</li>
    <li><strong>Mutual:</strong> By Newton's third law, both objects feel equal and opposite gravitational forces.</li>
</ul>

<div class="env-block example"><div class="env-title">Example: Earth-Moon Gravitational Force</div><div class="env-body"><p>Earth mass \\(M = 5.97 \\times 10^{24}\\;\\text{kg}\\), Moon mass \\(m = 7.35 \\times 10^{22}\\;\\text{kg}\\), distance \\(r = 3.84 \\times 10^{8}\\;\\text{m}\\).</p>
<p>\\[ F = G\\frac{Mm}{r^2} = 6.674 \\times 10^{-11} \\times \\frac{5.97 \\times 10^{24} \\times 7.35 \\times 10^{22}}{(3.84 \\times 10^{8})^2} \\approx 1.98 \\times 10^{20}\\;\\text{N} \\]</p></div></div>

<h3>Gravitational Force Near Earth's Surface</h3>
<p>For an object of mass \\(m\\) near the Earth's surface, the gravitational force is:</p>
<p>\\[ F = mg \\quad \\text{where} \\quad g = G\\frac{M_E}{R_E^2} \\approx 9.8\\;\\text{m/s}^2 \\]</p>
<p>Here \\(M_E\\) is the Earth's mass and \\(R_E\\) is its radius. This shows that the familiar weight formula \\(W = mg\\) is simply a special case of universal gravitation.</p>

<div class="env-block warning"><div class="env-title">Common Mistake</div><div class="env-body"><p>The distance \\(r\\) in Newton's law is the distance between the <em>centers</em> of the two objects, not the distance between their surfaces. For an object on Earth's surface, \\(r = R_E\\).</p></div></div>

<div class="viz-placeholder" data-viz="ch06-viz01"></div>

<div class="env-block remark"><div class="env-title">Historical Note</div><div class="env-body"><p>Newton published his law of gravitation in the <em>Principia Mathematica</em> (1687). He reportedly was inspired by watching an apple fall, leading him to wonder whether the same force that pulls the apple also holds the Moon in its orbit. The famous story, while likely embellished, captures the essence of his insight: terrestrial and celestial gravity are one and the same.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch06-viz01',
                    title: 'Gravitational Force vs Distance',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 80, originY: 340 });
                        var M = 5.0;
                        var m = 1.0;
                        var G = 1.0;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes('r (distance)', 'F (force)');

                            viz.drawFunction(function(r) {
                                if (r < 0.3) return NaN;
                                return G * M * m / (r * r);
                            }, 0.3, 12, viz.colors.blue, 2.5, 300);

                            viz.drawFunction(function(r) {
                                if (r < 0.3) return NaN;
                                return G * M * m / r;
                            }, 0.3, 12, viz.colors.teal, 1.5, 300);

                            viz.screenText('F = GMm/r\u00B2 (gravity)', viz.width - 120, 30, viz.colors.blue, 12);
                            viz.screenText('~ 1/r for comparison', viz.width - 120, 50, viz.colors.teal, 11);

                            var rTest = 2.0;
                            var fTest = G * M * m / (rTest * rTest);
                            viz.drawPoint(rTest, fTest, viz.colors.orange, 'F(' + rTest.toFixed(1) + ') = ' + fTest.toFixed(2), 5);

                            var r2 = 2 * rTest;
                            var f2 = G * M * m / (r2 * r2);
                            viz.drawPoint(r2, f2, viz.colors.green, 'F(' + r2.toFixed(1) + ') = ' + f2.toFixed(2), 5);
                            viz.drawSegment(rTest, fTest, r2, f2, viz.colors.yellow, 1, true);

                            viz.screenText('Double r => 1/4 the force', viz.width / 2, viz.height - 20, viz.colors.yellow, 12);

                            viz.screenText('M = ' + M.toFixed(1) + ' kg, m = ' + m.toFixed(1) + ' kg', 200, 20, viz.colors.white, 13);
                        }

                        VizEngine.createSlider(controls, 'Mass M', 1, 10, M, 0.5, function(v) { M = v; draw(); });
                        VizEngine.createSlider(controls, 'Mass m', 0.5, 5, m, 0.5, function(v) { m = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex01',
                    type: 'numeric',
                    question: 'Two objects each of mass 100 kg are separated by 2 m (center to center). Calculate the gravitational force between them in Newtons. Use G = 6.674 x 10^-11 N m^2/kg^2.',
                    hint: 'Use F = GMm/r^2 with M = m = 100 kg and r = 2 m.',
                    solution: 'F = 6.674 x 10^-11 x (100)(100) / (2)^2 = 6.674 x 10^-11 x 10000 / 4 = 1.67 x 10^-7 N. This tiny force illustrates why we do not notice gravitational attraction between everyday objects.'
                },
                {
                    id: 'ch06-ex02',
                    type: 'conceptual',
                    question: 'If the distance between two objects is tripled, by what factor does the gravitational force change?',
                    hint: 'Gravity follows an inverse-square law: F is proportional to 1/r^2.',
                    solution: 'The force decreases by a factor of 3^2 = 9. The new force is F/9.'
                },
                {
                    id: 'ch06-ex03',
                    type: 'numeric',
                    question: 'Calculate the gravitational acceleration g at a height h = 6370 km above the Earth (one Earth radius). Use M_E = 5.97 x 10^24 kg and R_E = 6.37 x 10^6 m.',
                    hint: 'At height h, r = R_E + h = 2R_E. Then g = GM_E / r^2.',
                    solution: 'r = 2R_E = 2 x 6.37 x 10^6 = 1.274 x 10^7 m. g = GM/r^2 = 6.674 x 10^-11 x 5.97 x 10^24 / (1.274 x 10^7)^2 = 3.98 x 10^14 / 1.623 x 10^14 = 2.45 m/s^2, which is about g_0 / 4.'
                },
                {
                    id: 'ch06-ex04',
                    type: 'conceptual',
                    question: 'A satellite orbits Earth. The Earth pulls the satellite with gravitational force F. What force does the satellite exert on the Earth?',
                    hint: 'Think about Newton\'s third law.',
                    solution: 'By Newton\'s third law, the satellite pulls the Earth with the same force F, directed toward the satellite. The forces are equal in magnitude and opposite in direction.'
                },
                {
                    id: 'ch06-ex05',
                    type: 'numeric',
                    question: 'On the Moon, g_moon = 1.62 m/s^2. If an astronaut has mass 80 kg, what is their weight on the Moon?',
                    hint: 'Weight = mg where g is local gravitational acceleration.',
                    solution: 'W = mg_moon = 80 x 1.62 = 129.6 N. On Earth, the same astronaut weighs 80 x 9.8 = 784 N, so lunar weight is about 1/6 of Earth weight.'
                }
            ]
        },

        // ===== Section 2: Gravitational Field =====
        {
            id: 'ch06-sec02',
            title: 'Gravitational Field',
            content: `
<h2>The Concept of a Field</h2>
<p>Newton's law tells us that masses attract each other across empty space. But how does one mass "know" that another mass is there? To address this, physicists introduced the concept of a <strong>gravitational field</strong>: a mass creates a field in the space around it, and any other mass placed in that field experiences a force.</p>

<div class="env-block definition"><div class="env-title">Gravitational Field Strength</div><div class="env-body"><p>The gravitational field strength \\(\\vec{g}\\) at a point in space is defined as the gravitational force per unit mass experienced by a small test mass placed at that point:</p>
<p>\\[ \\vec{g} = \\frac{\\vec{F}}{m} \\]</p>
<p>For a point mass \\(M\\), the field strength at distance \\(r\\) is:</p>
<p>\\[ g = \\frac{GM}{r^2} \\]</p>
<p>The SI unit of gravitational field strength is \\(\\text{N/kg}\\), which is equivalent to \\(\\text{m/s}^2\\).</p></div></div>

<h3>Properties of Gravitational Fields</h3>
<ul>
    <li><strong>Direction:</strong> The field always points toward the mass that creates it.</li>
    <li><strong>Superposition:</strong> When multiple masses are present, the total field is the vector sum of individual fields.</li>
    <li><strong>Representation:</strong> We draw <em>field lines</em> that point in the direction of the field. Lines are closer together where the field is stronger.</li>
</ul>

<div class="env-block example"><div class="env-title">Earth's Gravitational Field</div><div class="env-body"><p>At Earth's surface: \\(g = 9.8\\;\\text{N/kg}\\). At altitude \\(h\\) above the surface:</p>
<p>\\[ g(h) = \\frac{GM_E}{(R_E + h)^2} = g_0 \\left(\\frac{R_E}{R_E + h}\\right)^2 \\]</p>
<p>where \\(g_0 = 9.8\\;\\text{m/s}^2\\) is the surface value.</p></div></div>

<div class="viz-placeholder" data-viz="ch06-viz02"></div>

<div class="env-block intuition"><div class="env-title">Field vs Force</div><div class="env-body"><p>The field \\(g\\) is a property of space created by a source mass. The force \\(F = mg\\) depends on the test mass placed in the field. Separating these concepts helps us analyze gravitational effects without specifying a particular test mass.</p></div></div>

<h3>Gravitational Field Inside a Uniform Sphere</h3>
<p>A remarkable result: inside a uniform spherical shell, the gravitational field is zero. For a solid uniform sphere of mass \\(M\\) and radius \\(R\\), the field inside at distance \\(r\\) from the center (\\(r < R\\)) is:</p>
<p>\\[ g(r) = \\frac{GM}{R^3} r \\]</p>
<p>This is linear in \\(r\\), reaching a maximum at the surface (\\(r = R\\)) and zero at the center.</p>
`,
            visualizations: [
                {
                    id: 'ch06-viz02',
                    title: 'Gravitational Field Around a Mass',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 350, originY: 220 });
                        var M = 5.0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.fillStyle = viz.colors.orange;
                            var cs = viz.toScreen(0, 0);
                            ctx.beginPath();
                            ctx.arc(cs[0], cs[1], 18, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('M', cs[0], cs[1], viz.colors.white, 14);

                            var numRings = 8;
                            var numArrows = 12;
                            for (var ring = 1; ring <= numRings; ring++) {
                                var r = ring * 1.0;
                                var gField = M / (r * r);
                                var arrowLen = Math.min(gField * 0.4, 0.8);
                                for (var a = 0; a < numArrows; a++) {
                                    var theta = (a / numArrows) * Math.PI * 2;
                                    var px = r * Math.cos(theta);
                                    var py = r * Math.sin(theta);
                                    var dx = -Math.cos(theta) * arrowLen;
                                    var dy = -Math.sin(theta) * arrowLen;
                                    var alpha = Math.max(0.15, Math.min(1, gField / 3));
                                    var col = 'rgba(88, 166, 255, ' + alpha.toFixed(2) + ')';
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 1.5;
                                    var s1 = viz.toScreen(px, py);
                                    var s2 = viz.toScreen(px + dx, py + dy);
                                    ctx.beginPath();
                                    ctx.moveTo(s1[0], s1[1]);
                                    ctx.lineTo(s2[0], s2[1]);
                                    ctx.stroke();
                                    var ang = Math.atan2(s2[1] - s1[1], s2[0] - s1[0]);
                                    ctx.fillStyle = col;
                                    ctx.beginPath();
                                    ctx.moveTo(s2[0], s2[1]);
                                    ctx.lineTo(s2[0] - 6 * Math.cos(ang - 0.5), s2[1] - 6 * Math.sin(ang - 0.5));
                                    ctx.lineTo(s2[0] - 6 * Math.cos(ang + 0.5), s2[1] - 6 * Math.sin(ang + 0.5));
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            viz.screenText('Gravitational Field Lines', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('Arrows point toward M (field direction)', viz.width / 2, viz.height - 20, viz.colors.text, 12);
                            viz.screenText('Stronger field = longer, brighter arrows', viz.width / 2, viz.height - 40, viz.colors.text, 11);
                        }

                        VizEngine.createSlider(controls, 'Mass M', 1, 10, M, 0.5, function(v) { M = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex06',
                    type: 'numeric',
                    question: 'Calculate the gravitational field strength at the surface of Mars. Mars has mass M = 6.42 x 10^23 kg and radius R = 3.39 x 10^6 m.',
                    hint: 'Use g = GM/R^2.',
                    solution: 'g = 6.674 x 10^-11 x 6.42 x 10^23 / (3.39 x 10^6)^2 = 4.284 x 10^13 / 1.150 x 10^13 = 3.73 m/s^2. This is about 38% of Earth\'s surface gravity.'
                },
                {
                    id: 'ch06-ex07',
                    type: 'conceptual',
                    question: 'Two equal masses are placed at positions x = -d and x = +d. What is the gravitational field at the origin (midpoint)?',
                    hint: 'Consider the direction of each field contribution and use superposition.',
                    solution: 'Each mass produces a field of magnitude GM/d^2 at the origin. The field from the left mass points to the left (toward that mass), and the field from the right mass points to the right (toward that mass). These two fields are equal in magnitude but opposite in direction, so they cancel. The net field at the midpoint is zero.'
                },
                {
                    id: 'ch06-ex08',
                    type: 'numeric',
                    question: 'At what altitude above Earth is the gravitational field strength half of its surface value? Use R_E = 6370 km.',
                    hint: 'Set g(h) = g_0/2, so (R_E/(R_E + h))^2 = 1/2.',
                    solution: 'g(h) = g_0(R_E/(R_E+h))^2 = g_0/2, so (R_E/(R_E+h))^2 = 1/2. Then R_E/(R_E+h) = 1/sqrt(2), giving R_E + h = R_E sqrt(2), so h = R_E(sqrt(2) - 1) = 6370 x 0.414 = 2637 km above the surface.'
                },
                {
                    id: 'ch06-ex09',
                    type: 'conceptual',
                    question: 'Why is the gravitational field zero at the center of a uniform solid sphere?',
                    hint: 'Think about symmetry and the shell theorem.',
                    solution: 'At the center, every small portion of mass on one side is matched by an equal portion diametrically opposite. By symmetry, every pull is canceled by an equal pull in the opposite direction. Equivalently, the formula g = GMr/R^3 gives g = 0 when r = 0.'
                },
                {
                    id: 'ch06-ex10',
                    type: 'numeric',
                    question: 'A planet has twice the mass of Earth and twice the radius. What is its surface gravitational field strength compared to Earth?',
                    hint: 'g = GM/R^2. Substitute M\' = 2M and R\' = 2R.',
                    solution: 'g\' = G(2M)/(2R)^2 = 2GM/(4R^2) = (1/2)(GM/R^2) = g/2. The surface gravity is half of Earth\'s, about 4.9 m/s^2.'
                }
            ]
        },

        // ===== Section 3: Kepler's Laws =====
        {
            id: 'ch06-sec03',
            title: "Kepler's Laws",
            content: `
<h2>The Laws of Planetary Motion</h2>
<p>Before Newton derived his law of gravitation, Johannes Kepler (1571-1630) discovered three empirical laws describing planetary motion, based on meticulous astronomical observations by Tycho Brahe.</p>

<div class="env-block definition"><div class="env-title">Kepler's First Law (Law of Ellipses)</div><div class="env-body"><p>Each planet moves in an <strong>elliptical orbit</strong> with the Sun at one focus.</p>
<p>An ellipse has two foci, and the sum of distances from any point on the ellipse to both foci is constant: \\(r_1 + r_2 = 2a\\), where \\(a\\) is the semi-major axis.</p></div></div>

<div class="env-block definition"><div class="env-title">Kepler's Second Law (Law of Equal Areas)</div><div class="env-body"><p>A line from the Sun to a planet sweeps out <strong>equal areas in equal time intervals</strong>.</p>
<p>This means a planet moves faster when closer to the Sun (perihelion) and slower when farther away (aphelion). This law is a consequence of the conservation of angular momentum.</p></div></div>

<div class="env-block definition"><div class="env-title">Kepler's Third Law (Harmonic Law)</div><div class="env-body"><p>The square of the orbital period \\(T\\) is proportional to the cube of the semi-major axis \\(a\\):</p>
<p>\\[ T^2 = \\frac{4\\pi^2}{GM} a^3 \\]</p>
<p>For objects orbiting the same central body (same \\(M\\)), we can write \\(T^2 \\propto a^3\\), or equivalently \\(\\frac{T_1^2}{T_2^2} = \\frac{a_1^3}{a_2^3}\\).</p></div></div>

<div class="viz-placeholder" data-viz="ch06-viz03"></div>

<div class="env-block example"><div class="env-title">Verifying Kepler's Third Law</div><div class="env-body"><p>Earth: \\(a = 1\\;\\text{AU}\\), \\(T = 1\\;\\text{year}\\). Mars: \\(a = 1.524\\;\\text{AU}\\).</p>
<p>Predicted period: \\(T_{\\text{Mars}} = T_{\\text{Earth}} \\times (a_{\\text{Mars}}/a_{\\text{Earth}})^{3/2} = 1 \\times 1.524^{3.2} = 1.524^{1.5} = 1.88\\;\\text{years}\\).</p>
<p>Actual period: 1.88 years. The prediction matches perfectly!</p></div></div>

<div class="env-block intuition"><div class="env-title">Why Kepler's Laws Work</div><div class="env-body"><p>Newton showed that all three of Kepler's laws follow mathematically from the inverse-square law of gravitation. Kepler's first law arises because the orbit equation for a 1/r^2 force is a conic section (ellipse, parabola, or hyperbola). The second law follows from conservation of angular momentum. The third law comes from balancing gravitational force with centripetal acceleration.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch06-viz03',
                    title: "Kepler's Second Law: Equal Areas in Equal Times",
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 55, originX: 350, originY: 230 });
                        var a = 4.0;
                        var ecc = 0.5;
                        var running = true;
                        var theta = 0;
                        var speed = 0.008;
                        var sweepStart = null;
                        var sweepPoints = [];
                        var sweepInterval = 120;
                        var frameCount = 0;

                        function rOfTheta(th) {
                            var b2 = a * a * (1 - ecc * ecc);
                            return b2 / (a * (1 - ecc * Math.cos(th)));
                        }

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var b = a * Math.sqrt(1 - ecc * ecc);
                            var cx = -a * ecc;
                            viz.drawEllipse(cx, 0, a, b, 0, null, viz.colors.text);

                            viz.drawPoint(0, 0, viz.colors.yellow, 'Sun', 8);

                            var r = rOfTheta(theta);
                            var px = r * Math.cos(theta);
                            var py = r * Math.sin(theta);
                            viz.drawPoint(px, py, viz.colors.blue, 'Planet', 6);
                            viz.drawSegment(0, 0, px, py, viz.colors.blue + '66', 1, true);

                            if (sweepPoints.length > 1) {
                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.beginPath();
                                var s0 = viz.toScreen(0, 0);
                                ctx.moveTo(s0[0], s0[1]);
                                for (var i = 0; i < sweepPoints.length; i++) {
                                    var sp = viz.toScreen(sweepPoints[i][0], sweepPoints[i][1]);
                                    ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }

                            viz.screenText("Kepler's 2nd Law: Equal areas swept in equal time", viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('Eccentricity: ' + ecc.toFixed(2), 100, viz.height - 20, viz.colors.text, 12);

                            var periR = a * (1 - ecc);
                            var apoR = a * (1 + ecc);
                            viz.screenText('Perihelion: ' + periR.toFixed(1) + '  Aphelion: ' + apoR.toFixed(1), viz.width / 2, viz.height - 20, viz.colors.text, 11);
                        }

                        viz.animate(function() {
                            if (!running) { drawScene(); return; }
                            var r = rOfTheta(theta);
                            var angularV = speed * a * a / (r * r);
                            theta += angularV;
                            if (theta > Math.PI * 2) theta -= Math.PI * 2;

                            frameCount++;
                            var rr = rOfTheta(theta);
                            var px = rr * Math.cos(theta);
                            var py = rr * Math.sin(theta);

                            if (frameCount % sweepInterval === 0) {
                                sweepPoints = [];
                            }
                            sweepPoints.push([px, py]);

                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'Eccentricity', 0, 0.8, ecc, 0.05, function(v) {
                            ecc = v;
                            sweepPoints = [];
                        });
                        VizEngine.createButton(controls, 'Pause / Resume', function() { running = !running; });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex11',
                    type: 'numeric',
                    question: 'A planet orbits a star with a semi-major axis of 2 AU. If another planet in the same system has a semi-major axis of 8 AU, what is its orbital period if the first planet has period T1 = 1 year?',
                    hint: 'Use Kepler\'s third law: T2^2/T1^2 = a2^3/a1^3.',
                    solution: 'T2^2/T1^2 = (8/2)^3 = 4^3 = 64. So T2 = T1 x sqrt(64) = 1 x 8 = 8 years.'
                },
                {
                    id: 'ch06-ex12',
                    type: 'conceptual',
                    question: 'According to Kepler\'s second law, where in its orbit does a planet move fastest? Where does it move slowest? Explain why.',
                    hint: 'Equal areas in equal times. When is the planet closest to the Sun?',
                    solution: 'The planet moves fastest at perihelion (closest to the Sun) and slowest at aphelion (farthest from the Sun). Since equal areas must be swept in equal times, and the radius is shorter at perihelion, the planet must travel a longer arc (faster speed) to sweep the same area.'
                },
                {
                    id: 'ch06-ex13',
                    type: 'conceptual',
                    question: 'A comet has an extremely eccentric elliptical orbit (e close to 1). Describe how its speed changes throughout its orbit.',
                    hint: 'Think about the extreme difference between perihelion and aphelion distances.',
                    solution: 'The comet moves extremely fast near perihelion (close to the Sun) and extremely slowly near aphelion (very far from the Sun). The large eccentricity means the perihelion distance is much smaller than the aphelion distance, so by Kepler\'s second law, the speed variation is dramatic.'
                },
                {
                    id: 'ch06-ex14',
                    type: 'numeric',
                    question: 'Earth orbits the Sun at an average distance of 1.50 x 10^11 m with period 365.25 days. Using Kepler\'s third law, estimate the mass of the Sun.',
                    hint: 'Use T^2 = (4 pi^2 / GM) a^3. Solve for M.',
                    solution: 'M = 4 pi^2 a^3 / (G T^2). T = 365.25 x 86400 = 3.156 x 10^7 s. M = 4 x 9.87 x (1.50 x 10^11)^3 / (6.674 x 10^-11 x (3.156 x 10^7)^2) = 4 x 9.87 x 3.375 x 10^33 / (6.674 x 10^-11 x 9.96 x 10^14) = 1.333 x 10^35 / 6.647 x 10^4 = 2.00 x 10^30 kg.'
                },
                {
                    id: 'ch06-ex15',
                    type: 'conceptual',
                    question: 'For a circular orbit (eccentricity = 0), what does Kepler\'s second law tell us about the orbital speed?',
                    hint: 'In a circle, the distance from the center to the orbiting object is constant.',
                    solution: 'For a circular orbit, the distance r is constant. Since equal areas are swept in equal times, and the "triangle" swept has constant base r, the arc length covered per unit time must be constant. Therefore, the orbital speed is constant throughout a circular orbit.'
                }
            ]
        },

        // ===== Section 4: Satellite Motion =====
        {
            id: 'ch06-sec04',
            title: 'Satellite Motion',
            content: `
<h2>Orbits Around Earth</h2>
<p>Satellites, from the Moon to the International Space Station, move in orbits governed by the same gravitational principles we have been studying. In this section, we derive the key equations for circular satellite orbits.</p>

<div class="env-block definition"><div class="env-title">Orbital Velocity</div><div class="env-body"><p>For a satellite in a circular orbit of radius \\(r\\) around a body of mass \\(M\\), gravitational force provides the centripetal force:</p>
<p>\\[ \\frac{GMm}{r^2} = \\frac{mv^2}{r} \\]</p>
<p>Solving for the orbital velocity:</p>
<p>\\[ v = \\sqrt{\\frac{GM}{r}} \\]</p>
<p>Key insight: the orbital velocity depends only on the central mass \\(M\\) and the orbital radius \\(r\\), not on the satellite's mass.</p></div></div>

<div class="env-block definition"><div class="env-title">Orbital Period</div><div class="env-body"><p>Since \\(v = 2\\pi r / T\\), the orbital period is:</p>
<p>\\[ T = 2\\pi r \\sqrt{\\frac{r}{GM}} = 2\\pi \\sqrt{\\frac{r^3}{GM}} \\]</p>
<p>This is Kepler's third law written for circular orbits.</p></div></div>

<h3>Types of Orbits</h3>
<ul>
    <li><strong>Low Earth Orbit (LEO):</strong> Altitude 200-2000 km, period about 90-127 minutes. The ISS orbits at about 400 km.</li>
    <li><strong>Geostationary Orbit (GEO):</strong> Altitude 35,786 km, period exactly 24 hours. The satellite appears stationary above a fixed point on Earth's equator. Used for communication satellites.</li>
    <li><strong>Polar Orbit:</strong> Passes over both poles, allowing the satellite to scan the entire Earth as it rotates beneath.</li>
</ul>

<div class="env-block example"><div class="env-title">Geostationary Orbit Radius</div><div class="env-body"><p>For T = 24 hours = 86400 s:</p>
<p>\\[ r = \\left(\\frac{GMT^2}{4\\pi^2}\\right)^{1/3} = \\left(\\frac{6.674 \\times 10^{-11} \\times 5.97 \\times 10^{24} \\times 86400^2}{4\\pi^2}\\right)^{1/3} \\approx 4.22 \\times 10^7\\;\\text{m} \\]</p>
<p>Altitude above surface: \\(h = r - R_E = 42200 - 6370 = 35830\\;\\text{km}\\).</p></div></div>

<div class="viz-placeholder" data-viz="ch06-viz04"></div>

<h3>Escape Velocity</h3>
<p>If a satellite is launched with enough speed, it can escape the gravitational pull entirely. Using energy conservation (kinetic energy equals the gravitational potential energy):</p>
<p>\\[ \\frac{1}{2}mv_{\\text{esc}}^2 = \\frac{GMm}{R} \\]</p>

<div class="env-block definition"><div class="env-title">Escape Velocity</div><div class="env-body"><p>\\[ v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2} \\cdot v_{\\text{orbital}} \\]</p>
<p>For Earth's surface: \\(v_{\\text{esc}} \\approx 11.2\\;\\text{km/s}\\). This is \\(\\sqrt{2}\\) times the orbital velocity at the surface.</p></div></div>

<div class="env-block warning"><div class="env-title">Higher Orbit = Slower Speed</div><div class="env-body"><p>Counter-intuitively, satellites in higher orbits move <em>slower</em> than those in lower orbits. From \\(v = \\sqrt{GM/r}\\), increasing \\(r\\) decreases \\(v\\). This means that to move a satellite to a higher orbit, you must first speed it up (to reach the higher orbit), but once there, it moves more slowly.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch06-viz04',
                    title: 'Satellite Orbits at Different Heights',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 12, originX: 350, originY: 230 });
                        var running = true;
                        var GM = 500;

                        var orbits = [
                            { name: 'LEO', r: 7, color: '#58a6ff', theta: 0 },
                            { name: 'MEO', r: 12, color: '#3fb950', theta: Math.PI / 3 },
                            { name: 'GEO', r: 18, color: '#f0883e', theta: Math.PI }
                        ];

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var earthR = 4.5;
                            var es = viz.toScreen(0, 0);
                            var gradient = ctx.createRadialGradient(es[0], es[1], 0, es[0], es[1], earthR * viz.scale);
                            gradient.addColorStop(0, '#1a4a8a');
                            gradient.addColorStop(0.7, '#2060b0');
                            gradient.addColorStop(1, '#1a3060');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(es[0], es[1], earthR * viz.scale, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('Earth', es[0], es[1], viz.colors.white, 12);

                            for (var i = 0; i < orbits.length; i++) {
                                var orb = orbits[i];
                                ctx.strokeStyle = orb.color + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                var oc = viz.toScreen(0, 0);
                                ctx.arc(oc[0], oc[1], orb.r * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                var sx = orb.r * Math.cos(orb.theta);
                                var sy = orb.r * Math.sin(orb.theta);
                                viz.drawPoint(sx, sy, orb.color, '', 5);

                                var v = Math.sqrt(GM / orb.r);
                                var T = 2 * Math.PI * orb.r / v;
                                var labelX = (orb.r + 1.5) * Math.cos(Math.PI / 4 + i * 0.5);
                                var labelY = (orb.r + 1.5) * Math.sin(Math.PI / 4 + i * 0.5);
                                viz.drawText(orb.name, labelX, labelY, orb.color, 11);
                                viz.drawText('v=' + v.toFixed(1), labelX, labelY - 1.0, orb.color, 10);
                            }

                            viz.screenText('Higher orbit = slower speed, longer period', viz.width / 2, viz.height - 15, viz.colors.text, 12);
                        }

                        viz.animate(function() {
                            if (running) {
                                for (var i = 0; i < orbits.length; i++) {
                                    var orb = orbits[i];
                                    var v = Math.sqrt(GM / orb.r);
                                    var omega = v / orb.r;
                                    orb.theta += omega * 0.02;
                                }
                            }
                            drawScene();
                        });

                        VizEngine.createButton(controls, 'Pause / Resume', function() { running = !running; });
                        VizEngine.createButton(controls, 'Reset', function() {
                            orbits[0].theta = 0;
                            orbits[1].theta = Math.PI / 3;
                            orbits[2].theta = Math.PI;
                        });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex16',
                    type: 'numeric',
                    question: 'Calculate the orbital velocity of the ISS, which orbits at an altitude of 400 km above Earth. Use M_E = 5.97 x 10^24 kg and R_E = 6.37 x 10^6 m.',
                    hint: 'r = R_E + h. Then v = sqrt(GM/r).',
                    solution: 'r = 6.37 x 10^6 + 4.0 x 10^5 = 6.77 x 10^6 m. v = sqrt(GM/r) = sqrt(6.674 x 10^-11 x 5.97 x 10^24 / 6.77 x 10^6) = sqrt(5.89 x 10^7) = 7670 m/s = 7.67 km/s.'
                },
                {
                    id: 'ch06-ex17',
                    type: 'numeric',
                    question: 'Calculate the orbital period of the ISS (altitude 400 km).',
                    hint: 'T = 2 pi r / v, or use T = 2 pi sqrt(r^3 / GM).',
                    solution: 'Using r = 6.77 x 10^6 m and v = 7670 m/s: T = 2 pi r / v = 2 x 3.14159 x 6.77 x 10^6 / 7670 = 5543 s = 92.4 minutes, which matches the known ISS orbital period of about 92 minutes.'
                },
                {
                    id: 'ch06-ex18',
                    type: 'numeric',
                    question: 'Calculate the escape velocity from Earth\'s surface.',
                    hint: 'v_esc = sqrt(2GM/R).',
                    solution: 'v_esc = sqrt(2 x 6.674 x 10^-11 x 5.97 x 10^24 / 6.37 x 10^6) = sqrt(2 x 6.26 x 10^7) = sqrt(1.25 x 10^8) = 11180 m/s = 11.2 km/s.'
                },
                {
                    id: 'ch06-ex19',
                    type: 'conceptual',
                    question: 'Why must a geostationary satellite orbit directly above the equator?',
                    hint: 'Think about the center of the circular orbit and Earth\'s rotation axis.',
                    solution: 'A geostationary satellite must have its orbital plane pass through Earth\'s center and be perpendicular to the rotation axis (i.e., in the equatorial plane). If it orbited above a non-equatorial latitude, the plane of its orbit would still pass through Earth\'s center, so the satellite would oscillate north and south of the equator, not appearing stationary to ground observers.'
                },
                {
                    id: 'ch06-ex20',
                    type: 'numeric',
                    question: 'A satellite orbits Earth with a period of 12 hours. What is the radius of its orbit? Use M_E = 5.97 x 10^24 kg.',
                    hint: 'Use r = (GMT^2 / (4 pi^2))^(1/3) with T = 43200 s.',
                    solution: 'T = 12 x 3600 = 43200 s. r^3 = GMT^2/(4 pi^2) = 6.674 x 10^-11 x 5.97 x 10^24 x (43200)^2 / (39.48) = 3.986 x 10^14 x 1.866 x 10^9 / 39.48 = 1.884 x 10^22. r = (1.884 x 10^22)^(1/3) = 2.66 x 10^7 m = 26600 km.'
                }
            ]
        },

        // ===== Section 5: Weightlessness and Space Exploration =====
        {
            id: 'ch06-sec05',
            title: 'Weightlessness and Space Exploration',
            content: `
<h2>What Is Weightlessness?</h2>
<p>Astronauts on the International Space Station float freely inside their spacecraft. Are they beyond Earth's gravity? Not at all! At 400 km altitude, Earth's gravitational field is still about 88% of its surface value. So why do they float?</p>

<div class="env-block definition"><div class="env-title">Weightlessness (Apparent Weightlessness)</div><div class="env-body"><p>An object is in a state of <strong>weightlessness</strong> (or apparent weightlessness) when it is in free fall. Both the astronaut and the spacecraft fall toward Earth together at the same rate, so there is no contact force (normal force) between them. Since we perceive weight through contact forces, the astronaut feels weightless.</p>
<p>More precisely, the <strong>apparent weight</strong> is zero when the only force acting is gravity (no support force).</p></div></div>

<div class="env-block intuition"><div class="env-title">The Elevator Analogy</div><div class="env-body"><p>Imagine standing on a scale in an elevator. When the elevator accelerates downward, the scale reading decreases. If the cable snaps and the elevator falls freely, the scale reads zero: you are weightless! An orbiting spacecraft is in continuous free fall around Earth, creating the same effect.</p></div></div>

<h3>Apparent Weight in Different Scenarios</h3>
<p>If an object of mass \\(m\\) is in a system accelerating at \\(a\\) (positive upward), the apparent weight is:</p>
<p>\\[ W_{\\text{apparent}} = m(g - a) \\]</p>
<ul>
    <li>Normal standing: \\(a = 0\\), so \\(W = mg\\) (full weight)</li>
    <li>Elevator accelerating up: \\(a < 0\\) (deceleration), so \\(W > mg\\) (feel heavier)</li>
    <li>Elevator accelerating down: \\(a > 0\\), so \\(W < mg\\) (feel lighter)</li>
    <li>Free fall: \\(a = g\\), so \\(W = 0\\) (weightless)</li>
    <li>Orbiting: continuously falling, \\(W = 0\\)</li>
</ul>

<div class="viz-placeholder" data-viz="ch06-viz05"></div>

<h3>Cosmic Velocities</h3>
<table class="data-table">
    <thead><tr><th>Name</th><th>Velocity</th><th>Meaning</th></tr></thead>
    <tbody>
        <tr><td>First Cosmic Velocity</td><td>7.9 km/s</td><td>Minimum orbital velocity at Earth's surface</td></tr>
        <tr><td>Second Cosmic Velocity</td><td>11.2 km/s</td><td>Escape velocity from Earth</td></tr>
        <tr><td>Third Cosmic Velocity</td><td>16.7 km/s</td><td>Escape velocity from the Solar System (from Earth's orbit)</td></tr>
    </tbody>
</table>

<div class="env-block example"><div class="env-title">Relationship Between Cosmic Velocities</div><div class="env-body"><p>The second cosmic velocity is \\(\\sqrt{2}\\) times the first: \\(v_2 = \\sqrt{2} \\, v_1\\). This is because escape requires enough kinetic energy to overcome the total gravitational binding energy, which is exactly twice the kinetic energy of a circular orbit at the same radius.</p></div></div>

<div class="env-block remark"><div class="env-title">Practical Space Exploration</div><div class="env-body"><p>Spacecraft use various orbital maneuvers to change orbits efficiently. A <strong>Hohmann transfer</strong> uses two engine burns to move between circular orbits. The spacecraft first speeds up to enter an elliptical transfer orbit, then speeds up again at the desired altitude to circularize. This is the most fuel-efficient method for transferring between two coplanar circular orbits.</p></div></div>
`,
            visualizations: [
                {
                    id: 'ch06-viz05',
                    title: 'Escape Velocity Demonstration',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 12, originX: 180, originY: 230 });
                        var launchSpeed = 6.0;
                        var GM = 500;
                        var earthR = 4.5;
                        var running = false;
                        var projectile = null;
                        var trail = [];
                        var orbitalV = Math.sqrt(GM / earthR);
                        var escapeV = Math.sqrt(2 * GM / earthR);

                        function reset() {
                            running = false;
                            projectile = { x: 0, y: earthR, vx: launchSpeed, vy: 0 };
                            trail = [];
                        }
                        reset();

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var es = viz.toScreen(0, 0);
                            var gradient = ctx.createRadialGradient(es[0], es[1], 0, es[0], es[1], earthR * viz.scale);
                            gradient.addColorStop(0, '#1a4a8a');
                            gradient.addColorStop(0.7, '#2060b0');
                            gradient.addColorStop(1, '#1a3060');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(es[0], es[1], earthR * viz.scale, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('Earth', es[0], es[1], viz.colors.white, 12);

                            if (trail.length > 1) {
                                viz.drawTrajectory(trail, viz.colors.teal + '88', 1.5);
                            }

                            if (projectile) {
                                var dist = Math.sqrt(projectile.x * projectile.x + projectile.y * projectile.y);
                                if (dist > earthR * 0.9) {
                                    viz.drawPoint(projectile.x, projectile.y, viz.colors.orange, '', 4);
                                }
                            }

                            viz.screenText('Launch speed: ' + launchSpeed.toFixed(1), viz.width - 130, 25, viz.colors.white, 12);
                            viz.screenText('Orbital: ' + orbitalV.toFixed(1), viz.width - 130, 45, viz.colors.blue, 11);
                            viz.screenText('Escape: ' + escapeV.toFixed(1), viz.width - 130, 62, viz.colors.red, 11);

                            var label = '';
                            if (launchSpeed < orbitalV * 0.85) label = 'Suborbital (falls back)';
                            else if (launchSpeed < escapeV * 0.95) label = 'Orbital (elliptical/circular)';
                            else label = 'Escape trajectory';
                            viz.screenText(label, viz.width / 2, viz.height - 15, viz.colors.yellow, 13);
                        }

                        viz.animate(function() {
                            if (running && projectile) {
                                for (var step = 0; step < 3; step++) {
                                    var dt = 0.015;
                                    var dist = Math.sqrt(projectile.x * projectile.x + projectile.y * projectile.y);
                                    if (dist < earthR * 0.8 || dist > 50) {
                                        running = false;
                                        break;
                                    }
                                    var aGrav = GM / (dist * dist);
                                    var ax = -aGrav * projectile.x / dist;
                                    var ay = -aGrav * projectile.y / dist;
                                    projectile.vx += ax * dt;
                                    projectile.vy += ay * dt;
                                    projectile.x += projectile.vx * dt;
                                    projectile.y += projectile.vy * dt;
                                    trail.push([projectile.x, projectile.y]);
                                    if (trail.length > 2000) trail.shift();
                                }
                            }
                            drawScene();
                        });

                        VizEngine.createSlider(controls, 'Launch Speed', 2, 18, launchSpeed, 0.5, function(v) {
                            launchSpeed = v;
                            reset();
                        });
                        VizEngine.createButton(controls, 'Launch', function() {
                            reset();
                            running = true;
                        });
                        VizEngine.createButton(controls, 'Reset', function() { reset(); });
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex21',
                    type: 'conceptual',
                    question: 'An astronaut on the ISS is "weightless." Does this mean gravity is not acting on them? Explain.',
                    hint: 'Think about what causes the sensation of weight.',
                    solution: 'No. Gravity is still acting on the astronaut (g is about 8.7 m/s^2 at ISS altitude). The astronaut feels weightless because both they and the station are in free fall (orbiting), so there is no normal force between them. We feel weight through contact forces, not gravity directly.'
                },
                {
                    id: 'ch06-ex22',
                    type: 'numeric',
                    question: 'A person of mass 70 kg stands on a scale in an elevator accelerating upward at 3 m/s^2. What does the scale read?',
                    hint: 'The scale reads the normal force. Apply Newton\'s second law: N - mg = ma.',
                    solution: 'N = m(g + a) = 70 x (9.8 + 3) = 70 x 12.8 = 896 N. The scale reads 896 N, which is more than their normal weight of 686 N.'
                },
                {
                    id: 'ch06-ex23',
                    type: 'numeric',
                    question: 'Calculate the first cosmic velocity (minimum orbital velocity at Earth\'s surface). Use g = 9.8 m/s^2 and R_E = 6.37 x 10^6 m.',
                    hint: 'v1 = sqrt(g R_E).',
                    solution: 'v1 = sqrt(g x R_E) = sqrt(9.8 x 6.37 x 10^6) = sqrt(6.24 x 10^7) = 7900 m/s = 7.9 km/s.'
                },
                {
                    id: 'ch06-ex24',
                    type: 'conceptual',
                    question: 'Explain what would happen if you threw a ball horizontally from a very tall tower with increasing initial speeds (ignoring air resistance).',
                    hint: 'Consider Newton\'s thought experiment about a cannon on a mountain.',
                    solution: 'At low speed, the ball follows a parabolic path and hits the ground nearby. As speed increases, the ball travels farther before hitting the ground. At the first cosmic velocity (7.9 km/s), the ball\'s trajectory curves at the same rate as Earth\'s surface, and it enters orbit. Above escape velocity (11.2 km/s), the ball leaves Earth entirely on a hyperbolic path.'
                },
                {
                    id: 'ch06-ex25',
                    type: 'numeric',
                    question: 'A spacecraft in circular orbit at radius r fires its engines briefly to increase its speed by 10%. Is the new orbit still circular? Will the spacecraft move to a higher or lower average distance from Earth?',
                    hint: 'After the burn, the speed exceeds the circular orbital speed for that radius.',
                    solution: 'The new orbit is not circular; it becomes elliptical. Since the speed exceeds the circular orbital speed at radius r, the spacecraft is at the periapsis (closest point) of the new ellipse. It will swing out to a greater distance (apoapsis) before returning. The average distance increases. To reach a new circular orbit at the higher altitude, a second burn would be needed at apoapsis.'
                }
            ]
        }
    ]
});
