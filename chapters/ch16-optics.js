window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Optics',
    subtitle: 'Light: Reflection, Refraction, and Imaging',
    sections: [
        // ===== SECTION 1: Reflection =====
        {
            id: 'ch16-sec01',
            title: 'Reflection',
            content: `
                <h2>Reflection</h2>

                <div class="env-block intuition">
                    <div class="env-title">Light and How We See</div>
                    <div class="env-body"><p>Every time you look in a mirror, read words on a page, or admire your reflection in a lake, you are witnessing the phenomenon of <strong>reflection</strong>. In this chapter we will build a complete toolkit for understanding how light bounces, bends, and passes through lenses to create the images we rely on every day.</p></div>
                </div>

                <p>When a ray of light strikes a smooth surface, it bounces off in a predictable direction. This is called <strong>reflection</strong>. The study of reflection is the foundation of optics.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Reflection)</div>
                    <div class="env-body"><p><strong>Reflection</strong> is the change in direction of a light ray at a boundary so that the ray returns into the medium from which it came.</p></div>
                </div>

                <h3>The Law of Reflection</h3>

                <p>We define two angles with respect to the <strong>normal</strong>, an imaginary line perpendicular to the reflecting surface at the point of incidence:</p>
                <ul>
                    <li><strong>Angle of incidence</strong> \\(\\theta_i\\): the angle between the incoming ray and the normal.</li>
                    <li><strong>Angle of reflection</strong> \\(\\theta_r\\): the angle between the reflected ray and the normal.</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Law of Reflection</div>
                    <div class="env-body">
                        <p>The angle of incidence equals the angle of reflection:</p>
                        <p>\\[\\theta_i = \\theta_r\\]</p>
                        <p>Furthermore, the incident ray, the reflected ray, and the normal all lie in the same plane.</p>
                    </div>
                </div>

                <p>Try the interactive demonstration below. Drag the incident ray to change the angle and observe how the reflected ray responds.</p>

                <div class="viz-placeholder" data-viz="viz-reflection-demo"></div>

                <h3>Specular vs. Diffuse Reflection</h3>

                <p>When light reflects from a very smooth surface (like a mirror or still water), every reflected ray obeys the law of reflection in the same direction. This is called <strong>specular reflection</strong>, and it produces a clear image.</p>

                <p>When light hits a rough surface (like paper or a wall), each tiny facet reflects light in a different direction because the local normals point in many directions. This is <strong>diffuse reflection</strong>. It is why we can see objects from any angle, even if they do not look shiny.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>Even diffuse reflection obeys the law of reflection on a microscopic level. Each small surface element reflects light according to \\(\\theta_i = \\theta_r\\), but the surface normals are randomly oriented, scattering the light in all directions.</p></div>
                </div>

                <h3>Images in Plane Mirrors</h3>

                <p>A plane mirror forms a <strong>virtual image</strong>. The image appears to be behind the mirror at the same distance as the object is in front. The image is:</p>
                <ul>
                    <li>The same size as the object (magnification = 1)</li>
                    <li>Upright (not inverted top-to-bottom)</li>
                    <li>Laterally inverted (left and right are swapped)</li>
                    <li>Virtual (light does not actually pass through the image location)</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>You stand 2 m in front of a plane mirror. Your image appears to be 2 m behind the mirror, so the total apparent distance between you and your image is 4 m.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-reflection-demo',
                    title: 'Law of Reflection',
                    description: 'Drag the light source to change the angle of incidence and watch the reflected ray.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 40, originX: 350, originY: 300 });
                        var ctx = viz.ctx;

                        var incidentAngle = 45;
                        var slider = VizEngine.createSlider(controls, 'Angle of incidence (deg)', 5, 85, 45, 1, function(v) {
                            incidentAngle = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            // Draw mirror surface
                            var mirrorY = 0;
                            var sx1 = viz.toScreen(-7, mirrorY);
                            var sx2 = viz.toScreen(7, mirrorY);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(sx1[0], sx1[1]);
                            ctx.lineTo(sx2[0], sx2[1]);
                            ctx.stroke();

                            // Hatching below mirror
                            for (var hx = sx1[0]; hx < sx2[0]; hx += 14) {
                                ctx.strokeStyle = viz.colors.text + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(hx, sx1[1]);
                                ctx.lineTo(hx - 10, sx1[1] + 14);
                                ctx.stroke();
                            }

                            // Normal line (dashed)
                            var normTop = viz.toScreen(0, 6);
                            var normBot = viz.toScreen(0, -1);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(normTop[0], normTop[1]);
                            ctx.lineTo(normBot[0], normBot[1]);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Normal', normTop[0] + 30, normTop[1] + 10, viz.colors.text, 12);

                            // Incident ray
                            var rad = incidentAngle * Math.PI / 180;
                            var rayLen = 5.5;
                            var incX = -rayLen * Math.sin(rad);
                            var incY = rayLen * Math.cos(rad);
                            viz.drawVector(incX, incY, 0, 0, viz.colors.blue, '', 2.5);
                            viz.screenText('Incident ray', viz.toScreen(incX * 0.5, incY * 0.5)[0] - 50, viz.toScreen(incX * 0.5, incY * 0.5)[1], viz.colors.blue, 12);

                            // Reflected ray
                            var refX = rayLen * Math.sin(rad);
                            var refY = rayLen * Math.cos(rad);
                            viz.drawVector(0, 0, refX, refY, viz.colors.orange, '', 2.5);
                            viz.screenText('Reflected ray', viz.toScreen(refX * 0.5, refY * 0.5)[0] + 55, viz.toScreen(refX * 0.5, refY * 0.5)[1], viz.colors.orange, 12);

                            // Angle arcs
                            var arcR = 1.8;
                            viz.drawAngle(0, 0, Math.PI / 2 - rad, Math.PI / 2, arcR, viz.colors.blue, '');
                            viz.drawAngle(0, 0, Math.PI / 2, Math.PI / 2 + rad, arcR, viz.colors.orange, '');

                            // Angle labels
                            var angLabel1 = viz.toScreen(arcR * 1.4 * Math.sin(-rad / 2), arcR * 1.4 * Math.cos(rad / 2));
                            var angLabel2 = viz.toScreen(arcR * 1.4 * Math.sin(rad / 2), arcR * 1.4 * Math.cos(rad / 2));
                            viz.screenText('θi = ' + incidentAngle + '°', angLabel1[0] - 25, angLabel1[1], viz.colors.blue, 13);
                            viz.screenText('θr = ' + incidentAngle + '°', angLabel2[0] + 25, angLabel2[1], viz.colors.orange, 13);

                            // Title
                            viz.screenText('Law of Reflection: θi = θr', viz.width / 2, 20, viz.colors.white, 15);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch16-ex01',
                    type: 'numeric',
                    question: 'A light ray strikes a plane mirror at an angle of 35 degrees to the surface. What is the angle of reflection (measured from the normal)?',
                    hint: 'The angle to the surface is different from the angle to the normal. The angle to the normal = 90 - angle to surface.',
                    answer: 55,
                    tolerance: 0.5,
                    solution: 'The angle of incidence is measured from the normal, not the surface. If the ray makes 35 degrees with the surface, the angle of incidence = 90 - 35 = 55 degrees. By the law of reflection, the angle of reflection is also 55 degrees.'
                },
                {
                    id: 'ch16-ex02',
                    type: 'numeric',
                    question: 'You stand 3.0 m in front of a plane mirror. How far behind the mirror does your image appear to be (in metres)?',
                    hint: 'The image distance equals the object distance for a plane mirror.',
                    answer: 3.0,
                    tolerance: 0.1,
                    solution: 'For a plane mirror, the image is formed at the same distance behind the mirror as the object is in front. So the image is 3.0 m behind the mirror.'
                },
                {
                    id: 'ch16-ex03',
                    type: 'numeric',
                    question: 'Two plane mirrors are placed at right angles (90 degrees). A ray strikes the first mirror at 30 degrees to the normal. At what angle (in degrees from the normal) does it leave the second mirror?',
                    hint: 'After reflecting from the first mirror, the ray travels to the second mirror. Use geometry: the angles at the two mirrors and the right angle between them must add to 180 degrees in the triangle formed.',
                    answer: 60,
                    tolerance: 0.5,
                    solution: 'The ray reflects off the first mirror at 30 degrees. The angle it makes with the first mirror surface is 60 degrees. In the triangle formed between the two mirrors and the ray, the angles must sum to 180 degrees: 60 + 90 + angle at second mirror surface = 180, giving 30 degrees to the second mirror surface, or 60 degrees from the normal.'
                },
                {
                    id: 'ch16-ex04',
                    type: 'multiple-choice',
                    question: 'Which of the following describes the image formed by a plane mirror?',
                    options: [
                        'Real, inverted, and the same size',
                        'Virtual, upright, and the same size',
                        'Virtual, inverted, and magnified',
                        'Real, upright, and diminished'
                    ],
                    correct: 1,
                    hint: 'Think about whether light actually passes through the image location.',
                    solution: 'A plane mirror produces a virtual (cannot be projected on a screen), upright, and same-size image. The image appears to be behind the mirror.'
                },
                {
                    id: 'ch16-ex05',
                    type: 'numeric',
                    question: 'A person walks toward a plane mirror at 1.5 m/s. At what speed (in m/s) does the gap between the person and their image decrease?',
                    hint: 'Both the person and the image move toward the mirror.',
                    answer: 3.0,
                    tolerance: 0.1,
                    solution: 'As the person moves 1.5 m/s toward the mirror, the image also moves 1.5 m/s toward the mirror from the other side. So the gap closes at 1.5 + 1.5 = 3.0 m/s.'
                }
            ]
        },

        // ===== SECTION 2: Refraction and Snell's Law =====
        {
            id: 'ch16-sec02',
            title: "Refraction and Snell's Law",
            content: `
                <h2>Refraction and Snell's Law</h2>

                <p>When light passes from one transparent medium to another (for example, from air into water), it changes speed and, in general, changes direction. This bending of light at a boundary is called <strong>refraction</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Refraction)</div>
                    <div class="env-body"><p><strong>Refraction</strong> is the change in direction of a wave as it passes from one medium to another, caused by a change in speed.</p></div>
                </div>

                <h3>Refractive Index</h3>

                <p>The <strong>refractive index</strong> (or index of refraction) of a medium describes how much slower light travels in that medium compared to a vacuum:</p>

                <p>\\[n = \\frac{c}{v}\\]</p>

                <p>where \\(c \\approx 3.00 \\times 10^8\\) m/s is the speed of light in a vacuum and \\(v\\) is the speed of light in the medium. Since \\(v \\le c\\), we always have \\(n \\ge 1\\).</p>

                <div class="env-block example">
                    <div class="env-title">Common Refractive Indices</div>
                    <div class="env-body">
                        <p>Air: \\(n \\approx 1.00\\), Water: \\(n \\approx 1.33\\), Glass: \\(n \\approx 1.50\\), Diamond: \\(n \\approx 2.42\\).</p>
                    </div>
                </div>

                <h3>Snell's Law</h3>

                <div class="env-block theorem">
                    <div class="env-title">Snell's Law (Law of Refraction)</div>
                    <div class="env-body">
                        <p>When light passes from a medium with refractive index \\(n_1\\) to a medium with refractive index \\(n_2\\), the angles of incidence and refraction are related by:</p>
                        <p>\\[n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\]</p>
                        <p>where \\(\\theta_1\\) is the angle of incidence and \\(\\theta_2\\) is the angle of refraction, both measured from the normal to the boundary.</p>
                    </div>
                </div>

                <p>The key insight: when light enters a denser medium (higher \\(n\\)), it slows down and bends <em>toward</em> the normal. When it enters a less dense medium (lower \\(n\\)), it speeds up and bends <em>away</em> from the normal.</p>

                <div class="viz-placeholder" data-viz="viz-snell-law"></div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Remember that \\(\\theta_1\\) and \\(\\theta_2\\) are measured from the <em>normal</em> (the perpendicular to the surface), not from the surface itself. This is the most common source of errors in refraction problems.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Light entering water</div>
                    <div class="env-body">
                        <p>A light ray in air (\\(n_1 = 1.00\\)) hits a water surface (\\(n_2 = 1.33\\)) at an angle of incidence of 40 degrees. Find the angle of refraction.</p>
                        <p>Using Snell's law: \\(1.00 \\times \\sin 40° = 1.33 \\times \\sin\\theta_2\\)</p>
                        <p>\\(\\sin\\theta_2 = \\frac{\\sin 40°}{1.33} = \\frac{0.643}{1.33} = 0.483\\)</p>
                        <p>\\(\\theta_2 = \\sin^{-1}(0.483) \\approx 28.9°\\)</p>
                        <p>The light bends toward the normal as it enters the denser medium.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-snell-law',
                    title: "Snell's Law Interactive",
                    description: 'Adjust the angle of incidence and the refractive indices to see how light bends at a boundary.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 40, originX: 350, originY: 210 });
                        var ctx = viz.ctx;

                        var theta1 = 40;
                        var n1 = 1.00;
                        var n2 = 1.50;

                        VizEngine.createSlider(controls, 'Angle of incidence (deg)', 0, 89, 40, 1, function(v) { theta1 = v; draw(); });
                        VizEngine.createSlider(controls, 'n1 (top medium)', 1.0, 2.5, 1.0, 0.01, function(v) { n1 = v; draw(); });
                        VizEngine.createSlider(controls, 'n2 (bottom medium)', 1.0, 2.5, 1.5, 0.01, function(v) { n2 = v; draw(); });

                        function draw() {
                            viz.clear();

                            // Draw interface
                            var intY = 0;
                            var p1 = viz.toScreen(-8, intY);
                            var p2 = viz.toScreen(8, intY);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(p1[0], p1[1]);
                            ctx.lineTo(p2[0], p2[1]);
                            ctx.stroke();

                            // Medium labels
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(0, 0, viz.width, viz.originY);
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.fillRect(0, viz.originY, viz.width, viz.height - viz.originY);

                            viz.screenText('Medium 1 (n1 = ' + n1.toFixed(2) + ')', viz.width - 100, 25, viz.colors.blue, 13);
                            viz.screenText('Medium 2 (n2 = ' + n2.toFixed(2) + ')', viz.width - 100, viz.height - 20, viz.colors.teal, 13);

                            // Normal (dashed)
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([5, 4]);
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, 20);
                            ctx.lineTo(viz.originX, viz.height - 20);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Normal', viz.originX + 35, 30, viz.colors.text, 11);

                            // Incident ray
                            var rad1 = theta1 * Math.PI / 180;
                            var rayLen = 4.5;
                            var ix = -rayLen * Math.sin(rad1);
                            var iy = rayLen * Math.cos(rad1);
                            viz.drawVector(ix, iy, 0, 0, viz.colors.blue, '', 2.5);

                            // Compute refracted angle
                            var sinT2 = n1 * Math.sin(rad1) / n2;
                            var totalReflection = Math.abs(sinT2) > 1;

                            if (!totalReflection) {
                                var theta2 = Math.asin(sinT2);
                                var rx = rayLen * Math.sin(theta2);
                                var ry = -rayLen * Math.cos(theta2);
                                viz.drawVector(0, 0, rx, ry, viz.colors.teal, '', 2.5);

                                // Angle arcs
                                viz.drawAngle(0, 0, Math.PI / 2 - rad1, Math.PI / 2, 1.4, viz.colors.blue, '');
                                viz.drawAngle(0, 0, -Math.PI / 2, -Math.PI / 2 + theta2, 1.4, viz.colors.teal, '');

                                var t2deg = (theta2 * 180 / Math.PI).toFixed(1);
                                viz.screenText('θ1 = ' + theta1 + '°', viz.originX - 80, viz.originY - 70, viz.colors.blue, 14);
                                viz.screenText('θ2 = ' + t2deg + '°', viz.originX - 80, viz.originY + 70, viz.colors.teal, 14);
                                viz.screenText("Snell's Law: n1 sin θ1 = n2 sin θ2", viz.width / 2, viz.height - 5, viz.colors.white, 13);
                            } else {
                                // Total internal reflection
                                var refX = rayLen * Math.sin(rad1);
                                var refY = rayLen * Math.cos(rad1);
                                viz.drawVector(0, 0, refX, refY, viz.colors.orange, '', 2.5);
                                viz.screenText('Total Internal Reflection!', viz.width / 2, viz.originY + 60, viz.colors.orange, 15);
                                viz.screenText('θ1 = ' + theta1 + '°', viz.originX - 80, viz.originY - 70, viz.colors.blue, 14);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch16-ex06',
                    type: 'numeric',
                    question: 'Light travels from air (n = 1.00) into glass (n = 1.52) at an angle of incidence of 30 degrees. What is the angle of refraction in degrees?',
                    hint: 'Use Snell\'s law: n1 sin(theta1) = n2 sin(theta2). Solve for theta2.',
                    answer: 19.2,
                    tolerance: 0.5,
                    solution: 'n1 sin(theta1) = n2 sin(theta2). So sin(theta2) = (1.00)(sin 30)/(1.52) = 0.500/1.52 = 0.329. theta2 = arcsin(0.329) = 19.2 degrees.'
                },
                {
                    id: 'ch16-ex07',
                    type: 'numeric',
                    question: 'The speed of light in a certain medium is 2.0 x 10^8 m/s. What is the refractive index of this medium? (Use c = 3.0 x 10^8 m/s.)',
                    hint: 'n = c / v.',
                    answer: 1.5,
                    tolerance: 0.05,
                    solution: 'n = c/v = (3.0 x 10^8)/(2.0 x 10^8) = 1.5.'
                },
                {
                    id: 'ch16-ex08',
                    type: 'numeric',
                    question: 'Light passes from water (n = 1.33) into diamond (n = 2.42) at an angle of incidence of 20 degrees. Find the angle of refraction in degrees.',
                    hint: 'Apply Snell\'s law: 1.33 sin(20) = 2.42 sin(theta2).',
                    answer: 10.8,
                    tolerance: 0.5,
                    solution: 'sin(theta2) = 1.33 sin(20)/2.42 = 1.33(0.342)/2.42 = 0.455/2.42 = 0.188. theta2 = arcsin(0.188) = 10.8 degrees.'
                },
                {
                    id: 'ch16-ex09',
                    type: 'multiple-choice',
                    question: 'When light passes from a less dense medium to a denser medium, it bends:',
                    options: [
                        'Away from the normal',
                        'Toward the normal',
                        'Along the surface',
                        'It does not bend'
                    ],
                    correct: 1,
                    hint: 'A higher refractive index means slower light speed.',
                    solution: 'When entering a denser medium (higher n), light slows down and bends toward the normal. This follows from Snell\'s law: since n2 > n1, we need sin(theta2) < sin(theta1), so theta2 < theta1.'
                },
                {
                    id: 'ch16-ex10',
                    type: 'numeric',
                    question: 'A ray in glass (n = 1.50) hits an air boundary (n = 1.00) at 25 degrees from the normal. At what angle (in degrees) does it refract into the air?',
                    hint: 'The light goes from denser to less dense, so the refracted angle will be larger.',
                    answer: 39.3,
                    tolerance: 0.5,
                    solution: '1.50 sin(25) = 1.00 sin(theta2). sin(theta2) = 1.50(0.4226) = 0.6339. theta2 = arcsin(0.6339) = 39.3 degrees.'
                }
            ]
        },

        // ===== SECTION 3: Total Internal Reflection =====
        {
            id: 'ch16-sec03',
            title: 'Total Internal Reflection',
            content: `
                <h2>Total Internal Reflection</h2>

                <p>When light travels from a denser medium (higher \\(n\\)) to a less dense medium (lower \\(n\\)), Snell's law tells us that the refracted ray bends away from the normal. As we increase the angle of incidence, there comes a special angle at which the refracted ray would travel exactly along the boundary surface. Beyond this angle, no refraction occurs at all; instead, all the light is reflected back into the denser medium.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Critical Angle)</div>
                    <div class="env-body">
                        <p>The <strong>critical angle</strong> \\(\\theta_c\\) is the angle of incidence (in the denser medium) at which the angle of refraction is exactly 90 degrees:</p>
                        <p>\\[\\sin\\theta_c = \\frac{n_2}{n_1}\\]</p>
                        <p>where \\(n_1 > n_2\\). This angle exists only when light travels from a denser to a less dense medium.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Total Internal Reflection)</div>
                    <div class="env-body"><p><strong>Total internal reflection</strong> (TIR) occurs when light strikes a boundary at an angle greater than the critical angle. All the light is reflected; none is refracted into the second medium.</p></div>
                </div>

                <p>Use the visualization below to find the critical angle for different pairs of media. Watch how the refracted ray disappears at the critical angle.</p>

                <div class="viz-placeholder" data-viz="viz-tir-demo"></div>

                <h3>Conditions for Total Internal Reflection</h3>
                <p>Two conditions must be met for TIR to occur:</p>
                <ol>
                    <li>Light must travel from a <strong>denser</strong> medium to a <strong>less dense</strong> medium (\\(n_1 > n_2\\)).</li>
                    <li>The angle of incidence must be <strong>greater than</strong> the critical angle (\\(\\theta_i > \\theta_c\\)).</li>
                </ol>

                <h3>Applications of Total Internal Reflection</h3>

                <div class="env-block example">
                    <div class="env-title">Applications</div>
                    <div class="env-body">
                        <p><strong>Optical fibres:</strong> Light enters a thin glass fibre and bounces repeatedly by TIR along its length. This is the basis of modern telecommunications and medical endoscopes.</p>
                        <p><strong>Prisms in binoculars:</strong> Right-angle glass prisms use TIR to redirect light with minimal loss, replacing mirrors.</p>
                        <p><strong>Diamond sparkle:</strong> Diamond has a very high refractive index (2.42), giving a small critical angle (about 24.4 degrees). Much of the light entering a cut diamond undergoes TIR, bouncing around inside before exiting, which creates the characteristic brilliance.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out</div>
                    <div class="env-body"><p>Total internal reflection can only happen when going from a denser to a less dense medium. Light going from air into glass will never undergo TIR, no matter how large the angle of incidence.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-tir-demo',
                    title: 'Total Internal Reflection Explorer',
                    description: 'Increase the angle of incidence past the critical angle to observe total internal reflection.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 420, scale: 40, originX: 350, originY: 210 });
                        var ctx = viz.ctx;

                        var theta = 30;
                        var n1 = 1.50;
                        var n2 = 1.00;

                        VizEngine.createSlider(controls, 'Angle of incidence (deg)', 0, 89, 30, 1, function(v) { theta = v; draw(); });
                        VizEngine.createSlider(controls, 'n1 (denser, bottom)', 1.2, 2.5, 1.5, 0.01, function(v) { n1 = v; draw(); });
                        VizEngine.createSlider(controls, 'n2 (less dense, top)', 1.0, 2.0, 1.0, 0.01, function(v) { n2 = v; draw(); });

                        function draw() {
                            viz.clear();

                            // Swap display: denser medium on bottom (light goes up)
                            // Fill media regions
                            ctx.fillStyle = viz.colors.teal + '18';
                            ctx.fillRect(0, 0, viz.width, viz.originY);
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(0, viz.originY, viz.width, viz.height - viz.originY);

                            // Interface
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(0, viz.originY);
                            ctx.lineTo(viz.width, viz.originY);
                            ctx.stroke();

                            // Normal
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([5, 4]);
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, 20);
                            ctx.lineTo(viz.originX, viz.height - 20);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('n2 = ' + n2.toFixed(2) + ' (less dense)', viz.width - 100, 25, viz.colors.teal, 12);
                            viz.screenText('n1 = ' + n1.toFixed(2) + ' (denser)', viz.width - 100, viz.height - 20, viz.colors.blue, 12);

                            // Critical angle
                            var criticalAngle = (n1 > n2) ? Math.asin(n2 / n1) * 180 / Math.PI : 90;
                            viz.screenText('Critical angle = ' + criticalAngle.toFixed(1) + '°', 120, 25, viz.colors.yellow, 13);

                            var rad = theta * Math.PI / 180;
                            var rayLen = 4.5;

                            // Incident ray from below
                            var incSX = -rayLen * Math.sin(rad);
                            var incSY = -rayLen * Math.cos(rad);
                            viz.drawVector(incSX, incSY, 0, 0, viz.colors.blue, '', 2.5);

                            // Check TIR
                            var isTIR = (n1 > n2) && (theta >= criticalAngle);
                            var sinT2 = n1 * Math.sin(rad) / n2;

                            if (!isTIR && Math.abs(sinT2) <= 1) {
                                // Refracted ray
                                var theta2 = Math.asin(sinT2);
                                var rx = rayLen * Math.sin(theta2);
                                var ry = rayLen * Math.cos(theta2);
                                viz.drawVector(0, 0, rx, ry, viz.colors.teal, '', 2.5);

                                // Weak reflected ray
                                var refRX = rayLen * Math.sin(rad);
                                var refRY = -rayLen * Math.cos(rad);
                                ctx.globalAlpha = 0.3;
                                viz.drawVector(0, 0, refRX, refRY, viz.colors.orange, '', 1.5);
                                ctx.globalAlpha = 1.0;

                                var t2deg = (theta2 * 180 / Math.PI).toFixed(1);
                                viz.screenText('θ2 = ' + t2deg + '°', viz.originX + 90, viz.originY - 60, viz.colors.teal, 13);
                            } else {
                                // Total internal reflection
                                var refRX2 = rayLen * Math.sin(rad);
                                var refRY2 = -rayLen * Math.cos(rad);
                                viz.drawVector(0, 0, refRX2, refRY2, viz.colors.orange, '', 2.5);

                                viz.screenText('TOTAL INTERNAL REFLECTION', viz.width / 2, viz.originY - 40, viz.colors.orange, 15);
                            }

                            viz.screenText('θ1 = ' + theta + '°', viz.originX - 90, viz.originY + 60, viz.colors.blue, 13);

                            var status = isTIR ? 'θ > θc: TIR occurs' : 'θ < θc: refraction occurs';
                            var statusColor = isTIR ? viz.colors.orange : viz.colors.green;
                            viz.screenText(status, viz.width / 2, viz.height - 5, statusColor, 13);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch16-ex11',
                    type: 'numeric',
                    question: 'Calculate the critical angle for light going from glass (n = 1.50) to air (n = 1.00). Give your answer in degrees.',
                    hint: 'sin(theta_c) = n2/n1.',
                    answer: 41.8,
                    tolerance: 0.5,
                    solution: 'sin(theta_c) = n2/n1 = 1.00/1.50 = 0.667. theta_c = arcsin(0.667) = 41.8 degrees.'
                },
                {
                    id: 'ch16-ex12',
                    type: 'numeric',
                    question: 'What is the critical angle for a diamond-air boundary? (n_diamond = 2.42, n_air = 1.00). Give your answer in degrees.',
                    hint: 'Use the same formula: sin(theta_c) = n_air / n_diamond.',
                    answer: 24.4,
                    tolerance: 0.5,
                    solution: 'sin(theta_c) = 1.00/2.42 = 0.413. theta_c = arcsin(0.413) = 24.4 degrees. This small critical angle explains why diamonds sparkle so much.'
                },
                {
                    id: 'ch16-ex13',
                    type: 'multiple-choice',
                    question: 'Total internal reflection can occur when light travels from:',
                    options: [
                        'Air to glass',
                        'Air to water',
                        'Water to air',
                        'Vacuum to glass'
                    ],
                    correct: 2,
                    hint: 'TIR requires light to go from a denser to a less dense medium.',
                    solution: 'TIR requires n1 > n2 (denser to less dense). Water (n = 1.33) to air (n = 1.00) satisfies this condition. All other options have light going from less dense to denser.'
                },
                {
                    id: 'ch16-ex14',
                    type: 'numeric',
                    question: 'Light travels in water (n = 1.33) toward a water-air boundary at 55 degrees to the normal. The critical angle for this boundary is about 48.8 degrees. What fraction of the light is refracted into the air?',
                    hint: 'Is the angle of incidence above or below the critical angle?',
                    answer: 0,
                    tolerance: 0.01,
                    solution: 'Since 55 degrees > 48.8 degrees (the critical angle), total internal reflection occurs. No light is refracted into the air; 100% is reflected. The fraction refracted is 0.'
                },
                {
                    id: 'ch16-ex15',
                    type: 'numeric',
                    question: 'An optical fibre has a glass core with n = 1.62 and a cladding with n = 1.52. What is the critical angle (in degrees) at the core-cladding boundary?',
                    hint: 'sin(theta_c) = n_cladding / n_core.',
                    answer: 69.8,
                    tolerance: 0.5,
                    solution: 'sin(theta_c) = n_cladding/n_core = 1.52/1.62 = 0.9383. theta_c = arcsin(0.9383) = 69.8 degrees.'
                }
            ]
        },

        // ===== SECTION 4: Lenses =====
        {
            id: 'ch16-sec04',
            title: 'Lenses',
            content: `
                <h2>Lenses</h2>

                <p>A <strong>lens</strong> is a piece of transparent material (usually glass or plastic) with curved surfaces that refracts light to form images. Lenses are the building blocks of cameras, eyeglasses, microscopes, and telescopes.</p>

                <h3>Converging and Diverging Lenses</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition (Converging Lens)</div>
                    <div class="env-body"><p>A <strong>converging (convex) lens</strong> is thicker at the centre than at the edges. It brings parallel rays of light together at a point called the <strong>focal point</strong> (\\(F\\)). The distance from the centre of the lens to the focal point is the <strong>focal length</strong> (\\(f\\)), which is positive for a converging lens.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Diverging Lens)</div>
                    <div class="env-body"><p>A <strong>diverging (concave) lens</strong> is thinner at the centre than at the edges. It spreads parallel rays of light apart so they appear to come from a focal point behind the lens. The focal length is negative for a diverging lens.</p></div>
                </div>

                <h3>The Thin Lens Equation</h3>

                <div class="env-block theorem">
                    <div class="env-title">Thin Lens Equation</div>
                    <div class="env-body">
                        <p>For a thin lens with focal length \\(f\\), object distance \\(u\\), and image distance \\(v\\):</p>
                        <p>\\[\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}\\]</p>
                        <p><strong>Sign convention (real-is-positive):</strong></p>
                        <ul>
                            <li>\\(u\\) is negative (object is on the incoming side of the lens)</li>
                            <li>\\(v\\) is positive for a real image (on the opposite side from the object)</li>
                            <li>\\(v\\) is negative for a virtual image (on the same side as the object)</li>
                            <li>\\(f\\) is positive for a converging lens, negative for a diverging lens</li>
                        </ul>
                    </div>
                </div>

                <p>An equivalent and often simpler form uses magnitudes with the convention that \\(u\\) and \\(v\\) are positive distances:</p>
                <p>\\[\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}\\]</p>
                <p>This version works directly for a converging lens forming a real image.</p>

                <h3>Magnification</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition (Magnification)</div>
                    <div class="env-body">
                        <p>The <strong>linear magnification</strong> \\(m\\) is the ratio of image height to object height:</p>
                        <p>\\[m = \\frac{h_i}{h_o} = \\frac{v}{u}\\]</p>
                        <p>If \\(|m| > 1\\), the image is magnified. If \\(|m| < 1\\), it is diminished. A negative \\(m\\) means the image is inverted.</p>
                    </div>
                </div>

                <h3>Ray Diagrams for Thin Lenses</h3>

                <p>To find the image position graphically, draw any two of these three special rays:</p>
                <ol>
                    <li><strong>Parallel ray:</strong> arrives parallel to the principal axis, then passes through \\(F\\) (converging) or diverges as if from \\(F\\) (diverging).</li>
                    <li><strong>Focal ray:</strong> passes through \\(F\\) on the incoming side (converging) or aims toward \\(F\\) on the far side (diverging), then exits parallel to the axis.</li>
                    <li><strong>Central ray:</strong> passes straight through the centre of the lens without bending.</li>
                </ol>

                <p>Try the interactive ray diagram builder below:</p>

                <div class="viz-placeholder" data-viz="viz-lens-ray-diagram"></div>

                <div class="env-block remark">
                    <div class="env-title">Key Cases for a Converging Lens</div>
                    <div class="env-body">
                        <ul>
                            <li>Object beyond \\(2F\\): real, inverted, diminished image between \\(F\\) and \\(2F\\).</li>
                            <li>Object at \\(2F\\): real, inverted, same-size image at \\(2F\\) on the other side.</li>
                            <li>Object between \\(F\\) and \\(2F\\): real, inverted, magnified image beyond \\(2F\\).</li>
                            <li>Object at \\(F\\): no image (rays emerge parallel).</li>
                            <li>Object inside \\(F\\): virtual, upright, magnified image on the same side as the object.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-lens-ray-diagram',
                    title: 'Thin Lens Ray Diagram Builder',
                    description: 'Move the object to explore real and virtual images. Switch between converging and diverging lenses.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 30, originX: 350, originY: 200 });
                        var ctx = viz.ctx;

                        var objDist = -6;
                        var objHeight = 2;
                        var focalLen = 3;
                        var lensType = 1; // 1 = converging, -1 = diverging

                        VizEngine.createSlider(controls, 'Object distance', 1, 12, 6, 0.1, function(v) { objDist = -v; draw(); });
                        VizEngine.createSlider(controls, 'Focal length', 1, 6, 3, 0.1, function(v) { focalLen = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Converging/Diverging', function() {
                            lensType *= -1;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(2);

                            // Principal axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(0, viz.originY);
                            ctx.lineTo(viz.width, viz.originY);
                            ctx.stroke();

                            var f = focalLen * lensType;

                            // Draw lens
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            var lensH = 5;
                            var lp1 = viz.toScreen(0, lensH);
                            var lp2 = viz.toScreen(0, -lensH);
                            ctx.beginPath();
                            ctx.moveTo(lp1[0], lp1[1]);
                            ctx.lineTo(lp2[0], lp2[1]);
                            ctx.stroke();

                            // Arrow tips on lens
                            if (lensType === 1) {
                                // Converging: arrows pointing inward
                                ctx.beginPath();
                                ctx.moveTo(lp1[0] - 8, lp1[1] + 10);
                                ctx.lineTo(lp1[0], lp1[1]);
                                ctx.lineTo(lp1[0] + 8, lp1[1] + 10);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(lp2[0] - 8, lp2[1] - 10);
                                ctx.lineTo(lp2[0], lp2[1]);
                                ctx.lineTo(lp2[0] + 8, lp2[1] - 10);
                                ctx.stroke();
                            } else {
                                // Diverging: arrows pointing outward
                                ctx.beginPath();
                                ctx.moveTo(lp1[0] - 8, lp1[1] - 10);
                                ctx.lineTo(lp1[0], lp1[1]);
                                ctx.lineTo(lp1[0] + 8, lp1[1] - 10);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(lp2[0] - 8, lp2[1] + 10);
                                ctx.lineTo(lp2[0], lp2[1]);
                                ctx.lineTo(lp2[0] + 8, lp2[1] + 10);
                                ctx.stroke();
                            }

                            // Focal points
                            viz.drawPoint(f, 0, viz.colors.yellow, 'F', 4);
                            viz.drawPoint(-f, 0, viz.colors.yellow, "F'", 4);
                            viz.drawPoint(2 * f, 0, viz.colors.text, '2F', 3);
                            viz.drawPoint(-2 * f, 0, viz.colors.text, "2F'", 3);

                            // Object arrow
                            var u = objDist; // negative
                            viz.drawVector(u, 0, u, objHeight, viz.colors.green, '', 2.5);
                            viz.drawText('Object', u, objHeight + 0.5, viz.colors.green, 12);

                            // Compute image using 1/f = 1/v + 1/u (with u negative)
                            // 1/v = 1/f - 1/u
                            var invV = 1 / f - 1 / u;
                            if (Math.abs(invV) < 0.001) {
                                // Object at focal point, rays go parallel
                                viz.screenText('Object at F: rays emerge parallel (image at infinity)', viz.width / 2, 20, viz.colors.orange, 13);
                                // Draw parallel ray
                                var rayEndX = 10;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(u, objHeight)[0], viz.toScreen(u, objHeight)[1]);
                                ctx.lineTo(viz.toScreen(0, objHeight)[0], viz.toScreen(0, objHeight)[1]);
                                ctx.lineTo(viz.toScreen(rayEndX, objHeight)[0], viz.toScreen(rayEndX, objHeight)[1]);
                                ctx.stroke();
                                // Central ray
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(u, objHeight)[0], viz.toScreen(u, objHeight)[1]);
                                var slope = objHeight / u;
                                ctx.lineTo(viz.toScreen(rayEndX, slope * rayEndX)[0], viz.toScreen(rayEndX, slope * rayEndX)[1]);
                                ctx.stroke();
                                return;
                            }

                            var v = 1 / invV;
                            var m = v / u;
                            var imgHeight = m * objHeight;

                            // Ray 1: parallel to axis, then through F
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            var p1a = viz.toScreen(u, objHeight);
                            var p1b = viz.toScreen(0, objHeight);
                            ctx.beginPath();
                            ctx.moveTo(p1a[0], p1a[1]);
                            ctx.lineTo(p1b[0], p1b[1]);
                            ctx.stroke();

                            if (v > 0) {
                                // Real image: ray goes to image point
                                var p1c = viz.toScreen(v, imgHeight);
                                ctx.beginPath();
                                ctx.moveTo(p1b[0], p1b[1]);
                                ctx.lineTo(p1c[0], p1c[1]);
                                ctx.stroke();
                            } else {
                                // Virtual image: ray goes forward but appears to come from behind
                                // Extend through focal point
                                var slope1 = (imgHeight - objHeight) / (v - 0);
                                var extX = 10;
                                ctx.beginPath();
                                ctx.moveTo(p1b[0], p1b[1]);
                                ctx.lineTo(viz.toScreen(extX, objHeight + slope1 * extX)[0], viz.toScreen(extX, objHeight + slope1 * extX)[1]);
                                ctx.stroke();
                                // Dashed extension backward
                                ctx.setLineDash([5, 4]);
                                ctx.beginPath();
                                ctx.moveTo(p1b[0], p1b[1]);
                                ctx.lineTo(viz.toScreen(v, imgHeight)[0], viz.toScreen(v, imgHeight)[1]);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Ray 2: through centre of lens (straight line)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            var slope2 = objHeight / u;
                            var extRayX = v > 0 ? Math.min(v + 2, 10) : 10;
                            var p2a = viz.toScreen(u, objHeight);
                            var p2b = viz.toScreen(extRayX, slope2 * extRayX);
                            ctx.beginPath();
                            ctx.moveTo(p2a[0], p2a[1]);
                            ctx.lineTo(p2b[0], p2b[1]);
                            ctx.stroke();

                            if (v < 0) {
                                // Dashed extension backward for central ray
                                ctx.setLineDash([5, 4]);
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(0, 0)[0], viz.toScreen(0, 0)[1]);
                                ctx.lineTo(viz.toScreen(v, imgHeight)[0], viz.toScreen(v, imgHeight)[1]);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Image arrow
                            var imgColor = v > 0 ? viz.colors.red : viz.colors.pink;
                            viz.drawVector(v, 0, v, imgHeight, imgColor, '', 2.5);
                            var imgLabel = v > 0 ? 'Real image' : 'Virtual image';
                            viz.drawText(imgLabel, v, imgHeight + (imgHeight > 0 ? 0.6 : -0.6), imgColor, 11);

                            // Info text
                            var uAbs = Math.abs(u).toFixed(1);
                            var vAbs = Math.abs(v).toFixed(1);
                            var mAbs = Math.abs(m).toFixed(2);
                            var typeStr = lensType === 1 ? 'Converging' : 'Diverging';
                            viz.screenText(typeStr + ' lens | f = ' + Math.abs(f).toFixed(1), viz.width / 2, 15, viz.colors.white, 13);
                            viz.screenText('u = ' + uAbs + ' | v = ' + vAbs + ' | |m| = ' + mAbs, viz.width / 2, viz.height - 10, viz.colors.text, 12);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch16-ex16',
                    type: 'numeric',
                    question: 'An object is placed 30 cm from a converging lens of focal length 10 cm. Using 1/f = 1/u + 1/v (with positive distances), find the image distance v in cm.',
                    hint: '1/v = 1/f - 1/u = 1/10 - 1/30.',
                    answer: 15,
                    tolerance: 0.5,
                    solution: '1/v = 1/f - 1/u = 1/10 - 1/30 = 3/30 - 1/30 = 2/30. v = 30/2 = 15 cm.'
                },
                {
                    id: 'ch16-ex17',
                    type: 'numeric',
                    question: 'A converging lens has focal length 20 cm. An object is placed 20 cm from the lens. Where is the image formed? (Give the image distance in cm, or enter 9999 for infinity.)',
                    hint: 'What happens when the object is exactly at the focal point?',
                    answer: 9999,
                    tolerance: 1,
                    solution: '1/v = 1/f - 1/u = 1/20 - 1/20 = 0. So v = infinity. When the object is at the focal point of a converging lens, the refracted rays are parallel and no image is formed (or the image forms at infinity).'
                },
                {
                    id: 'ch16-ex18',
                    type: 'numeric',
                    question: 'An object 5.0 cm tall is placed 40 cm from a converging lens of focal length 15 cm. What is the height of the image in cm? (Give magnitude only.)',
                    hint: 'First find v, then m = v/u, then image height = m times object height.',
                    answer: 3.0,
                    tolerance: 0.2,
                    solution: '1/v = 1/15 - 1/40 = (40 - 15)/(15 x 40) = 25/600. v = 600/25 = 24 cm. m = v/u = 24/40 = 0.60. Image height = 0.60 x 5.0 = 3.0 cm.'
                },
                {
                    id: 'ch16-ex19',
                    type: 'multiple-choice',
                    question: 'An object placed inside the focal length of a converging lens produces:',
                    options: [
                        'A real, inverted, magnified image',
                        'A virtual, upright, magnified image',
                        'A real, upright, diminished image',
                        'No image at all'
                    ],
                    correct: 1,
                    hint: 'Think about what happens to the ray diagram when the object is between F and the lens.',
                    solution: 'When the object is inside the focal length, the refracted rays diverge and appear to come from a point on the same side as the object. This produces a virtual, upright, magnified image. This is the principle behind a simple magnifying glass.'
                },
                {
                    id: 'ch16-ex20',
                    type: 'numeric',
                    question: 'A diverging lens has a focal length of -12 cm. An object is placed 24 cm from the lens. Find the image distance in cm. (Use the convention where diverging lenses have negative f; give the signed value.)',
                    hint: '1/v = 1/f - 1/u. Remember f is negative.',
                    answer: -8,
                    tolerance: 0.5,
                    solution: '1/v = 1/(-12) - 1/(-24) = -1/12 + 1/24 = -2/24 + 1/24 = -1/24. v = -24 cm... Wait, let me redo with the sign convention 1/f = 1/v - 1/u. With u = -24 (object on left): 1/v = 1/f + 1/u = 1/(-12) + 1/(-24) = -1/12 - 1/24 = -3/24 = -1/8. v = -8 cm. The negative sign means the image is virtual (on the same side as the object).'
                },
                {
                    id: 'ch16-ex21',
                    type: 'numeric',
                    question: 'A converging lens forms a real image 45 cm from the lens. The object is 90 cm from the lens. What is the focal length in cm?',
                    hint: '1/f = 1/u + 1/v (using positive distances for a real image from a converging lens).',
                    answer: 30,
                    tolerance: 0.5,
                    solution: '1/f = 1/u + 1/v = 1/90 + 1/45 = 1/90 + 2/90 = 3/90 = 1/30. f = 30 cm.'
                }
            ]
        },

        // ===== SECTION 5: Optical Instruments =====
        {
            id: 'ch16-sec05',
            title: 'Optical Instruments',
            content: `
                <h2>Optical Instruments</h2>

                <p>Now that we understand how lenses form images, we can see how multiple lenses work together in practical optical instruments.</p>

                <h3>The Magnifying Glass</h3>

                <div class="env-block definition">
                    <div class="env-title">Magnifying Glass</div>
                    <div class="env-body">
                        <p>A magnifying glass is simply a converging lens used with the object placed inside the focal length. It produces a virtual, upright, magnified image. The <strong>angular magnification</strong> for an object at the near point (\\(D \\approx 25\\) cm) is approximately:</p>
                        <p>\\[M \\approx \\frac{D}{f}\\]</p>
                        <p>where \\(f\\) is the focal length of the lens.</p>
                    </div>
                </div>

                <h3>The Compound Microscope</h3>

                <p>A compound microscope uses two converging lenses:</p>
                <ul>
                    <li><strong>Objective lens:</strong> a short focal length lens close to the specimen. It creates a real, magnified, inverted intermediate image.</li>
                    <li><strong>Eyepiece (ocular) lens:</strong> a lens with moderate focal length that acts as a magnifying glass on the intermediate image, producing a further magnified virtual image.</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Microscope Magnification</div>
                    <div class="env-body">
                        <p>The total magnification of a compound microscope is approximately:</p>
                        <p>\\[M_{\\text{total}} \\approx \\frac{L}{f_o} \\times \\frac{D}{f_e}\\]</p>
                        <p>where \\(L\\) is the tube length (distance between the lenses minus the focal lengths), \\(f_o\\) is the focal length of the objective, \\(f_e\\) is the focal length of the eyepiece, and \\(D \\approx 25\\) cm is the near-point distance.</p>
                    </div>
                </div>

                <h3>The Refracting Telescope</h3>

                <p>A simple refracting telescope also uses two converging lenses, but arranged differently from a microscope (the object is very far away):</p>
                <ul>
                    <li><strong>Objective lens:</strong> a long focal length lens that collects light from a distant object and forms a real, inverted image at its focal point.</li>
                    <li><strong>Eyepiece lens:</strong> a short focal length lens that magnifies this intermediate image for the observer's eye.</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Telescope Angular Magnification</div>
                    <div class="env-body">
                        <p>For a telescope in normal adjustment (final image at infinity):</p>
                        <p>\\[M = \\frac{f_o}{f_e}\\]</p>
                        <p>where \\(f_o\\) is the focal length of the objective and \\(f_e\\) is the focal length of the eyepiece.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-magnification-explorer"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Telescope Magnification</div>
                    <div class="env-body">
                        <p>A telescope has an objective lens with \\(f_o = 100\\) cm and an eyepiece with \\(f_e = 5\\) cm. The angular magnification is \\(M = 100/5 = 20\\times\\). Objects appear 20 times closer.</p>
                    </div>
                </div>

                <h3>The Human Eye</h3>

                <p>The eye itself is an optical instrument. The cornea and lens together act as a converging lens system that focuses light onto the retina. The eye adjusts its focal length by changing the shape of the lens (a process called <strong>accommodation</strong>).</p>

                <div class="env-block remark">
                    <div class="env-title">Common Vision Defects</div>
                    <div class="env-body">
                        <p><strong>Myopia (nearsightedness):</strong> the eye focuses images in front of the retina. Corrected with a diverging lens.</p>
                        <p><strong>Hyperopia (farsightedness):</strong> the eye focuses images behind the retina. Corrected with a converging lens.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-eye-correction"></div>
            `,
            visualizations: [
                {
                    id: 'viz-magnification-explorer',
                    title: 'Telescope vs. Microscope Magnification',
                    description: 'Adjust focal lengths to see how magnification changes for a telescope and a microscope.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 30, originX: 100, originY: 190 });
                        var ctx = viz.ctx;

                        var fo = 10;
                        var fe = 2;
                        var mode = 'telescope';

                        VizEngine.createSlider(controls, 'Objective f_o (cm)', 2, 20, 10, 0.5, function(v) { fo = v; draw(); });
                        VizEngine.createSlider(controls, 'Eyepiece f_e (cm)', 1, 10, 2, 0.5, function(v) { fe = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Telescope/Microscope', function() {
                            mode = (mode === 'telescope') ? 'microscope' : 'telescope';
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            if (mode === 'telescope') {
                                var M = fo / fe;
                                viz.screenText('Refracting Telescope', viz.width / 2, 20, viz.colors.white, 15);
                                viz.screenText('M = f_o / f_e = ' + fo.toFixed(1) + ' / ' + fe.toFixed(1) + ' = ' + M.toFixed(1) + 'x', viz.width / 2, 45, viz.colors.teal, 14);

                                // Draw objective lens
                                var objLensX = 3;
                                var lp1 = viz.toScreen(objLensX, 4);
                                var lp2 = viz.toScreen(objLensX, -4);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(lp1[0], lp1[1]);
                                ctx.lineTo(lp2[0], lp2[1]);
                                ctx.stroke();
                                viz.drawText('Objective', objLensX, -5, viz.colors.blue, 11);
                                viz.drawText('f = ' + fo.toFixed(1), objLensX, -5.8, viz.colors.blue, 10);

                                // Draw eyepiece
                                var separation = fo + fe;
                                var eyeLensX = objLensX + separation / 2;
                                if (eyeLensX > 16) eyeLensX = 16;
                                var elp1 = viz.toScreen(eyeLensX, 3);
                                var elp2 = viz.toScreen(eyeLensX, -3);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(elp1[0], elp1[1]);
                                ctx.lineTo(elp2[0], elp2[1]);
                                ctx.stroke();
                                viz.drawText('Eyepiece', eyeLensX, -4.2, viz.colors.orange, 11);
                                viz.drawText('f = ' + fe.toFixed(1), eyeLensX, -5, viz.colors.orange, 10);

                                // Parallel incoming rays
                                var rayH1 = 2;
                                var rayH2 = -1;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 1.5;
                                // Ray 1
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(-2, rayH1)[0], viz.toScreen(-2, rayH1)[1]);
                                ctx.lineTo(viz.toScreen(objLensX, rayH1)[0], viz.toScreen(objLensX, rayH1)[1]);
                                ctx.stroke();
                                // After objective, converges to focal point
                                var focalX = objLensX + fo / 2;
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(objLensX, rayH1)[0], viz.toScreen(objLensX, rayH1)[1]);
                                ctx.lineTo(viz.toScreen(focalX, 0)[0], viz.toScreen(focalX, 0)[1]);
                                ctx.stroke();

                                // Focal point
                                viz.drawPoint(focalX, 0, viz.colors.yellow, 'F', 4);

                                // Principal axis
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(0, viz.originY);
                                ctx.lineTo(viz.width, viz.originY);
                                ctx.stroke();

                                // Magnification bar display
                                var barX = viz.width - 120;
                                var barH = 30;
                                var magBarH = Math.min(barH * M, 150);
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.fillRect(barX, 240, 30, barH);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.strokeRect(barX, 240, 30, barH);
                                viz.screenText('Object', barX + 15, 240 + barH + 12, viz.colors.green, 10);

                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.fillRect(barX + 50, 240 + barH - magBarH, 30, magBarH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.strokeRect(barX + 50, 240 + barH - magBarH, 30, magBarH);
                                viz.screenText('Image', barX + 65, 240 + barH + 12, viz.colors.orange, 10);
                                viz.screenText(M.toFixed(1) + 'x', barX + 65, 240 + barH - magBarH - 10, viz.colors.orange, 11);

                            } else {
                                // Microscope
                                var L = 16; // tube length in cm
                                var D = 25;
                                var Mmicro = (L / fo) * (D / fe);
                                viz.screenText('Compound Microscope', viz.width / 2, 20, viz.colors.white, 15);
                                viz.screenText('M = (L/f_o)(D/f_e) = (' + L + '/' + fo.toFixed(1) + ')(25/' + fe.toFixed(1) + ') = ' + Mmicro.toFixed(1) + 'x', viz.width / 2, 45, viz.colors.purple, 13);

                                // Draw objective
                                var mObjX = 4;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(mObjX, 3)[0], viz.toScreen(mObjX, 3)[1]);
                                ctx.lineTo(viz.toScreen(mObjX, -3)[0], viz.toScreen(mObjX, -3)[1]);
                                ctx.stroke();
                                viz.drawText('Objective', mObjX, -4, viz.colors.blue, 11);

                                // Draw eyepiece
                                var mEyeX = 14;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(mEyeX, 2.5)[0], viz.toScreen(mEyeX, 2.5)[1]);
                                ctx.lineTo(viz.toScreen(mEyeX, -2.5)[0], viz.toScreen(mEyeX, -2.5)[1]);
                                ctx.stroke();
                                viz.drawText('Eyepiece', mEyeX, -3.5, viz.colors.orange, 11);

                                // Sample object
                                var sampleX = 2;
                                viz.drawVector(sampleX, 0, sampleX, 0.8, viz.colors.green, '', 2);
                                viz.drawText('Sample', sampleX, -0.8, viz.colors.green, 10);

                                // Intermediate image
                                var intImgX = 10;
                                viz.drawVector(intImgX, 0, intImgX, -2, viz.colors.red, '', 1.5);
                                viz.drawText('Intermediate', intImgX, 2.8, viz.colors.red, 10);
                                viz.drawText('image', intImgX, 2.2, viz.colors.red, 10);

                                // Light cone from sample through objective
                                ctx.strokeStyle = viz.colors.teal + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(sampleX, 0.8)[0], viz.toScreen(sampleX, 0.8)[1]);
                                ctx.lineTo(viz.toScreen(mObjX, 2)[0], viz.toScreen(mObjX, 2)[1]);
                                ctx.lineTo(viz.toScreen(intImgX, -2)[0], viz.toScreen(intImgX, -2)[1]);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(viz.toScreen(sampleX, 0.8)[0], viz.toScreen(sampleX, 0.8)[1]);
                                ctx.lineTo(viz.toScreen(mObjX, -2)[0], viz.toScreen(mObjX, -2)[1]);
                                ctx.lineTo(viz.toScreen(intImgX, -2)[0], viz.toScreen(intImgX, -2)[1]);
                                ctx.stroke();

                                // Principal axis
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(0, viz.originY);
                                ctx.lineTo(viz.width, viz.originY);
                                ctx.stroke();

                                // Eye symbol
                                var eyeX = viz.toScreen(17, 0);
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.ellipse(eyeX[0], eyeX[1], 12, 8, 0, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.bg;
                                ctx.beginPath();
                                ctx.arc(eyeX[0], eyeX[1], 4, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }

                        draw();
                    }
                },
                {
                    id: 'viz-eye-correction',
                    title: 'Vision Correction',
                    description: 'See how converging and diverging lenses correct myopia and hyperopia.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 340, scale: 30, originX: 100, originY: 170 });
                        var ctx = viz.ctx;

                        var mode = 'normal';

                        VizEngine.createButton(controls, 'Normal Eye', function() { mode = 'normal'; draw(); });
                        VizEngine.createButton(controls, 'Myopia (nearsighted)', function() { mode = 'myopia'; draw(); });
                        VizEngine.createButton(controls, 'Hyperopia (farsighted)', function() { mode = 'hyperopia'; draw(); });
                        VizEngine.createButton(controls, 'Myopia Corrected', function() { mode = 'myopia-fix'; draw(); });
                        VizEngine.createButton(controls, 'Hyperopia Corrected', function() { mode = 'hyperopia-fix'; draw(); });

                        function drawEye(eyeX, radius, focalShift) {
                            var sx = viz.toScreen(eyeX, 0);
                            // Eye outline
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(sx[0], sx[1], radius * viz.scale, radius * 0.7 * viz.scale, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Lens
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            var lensX = eyeX - radius * 0.7;
                            var lp = viz.toScreen(lensX, 0);
                            ctx.beginPath();
                            ctx.ellipse(lp[0], lp[1], 4, radius * 0.5 * viz.scale, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Retina
                            var retX = eyeX + radius * 0.85;
                            var rp = viz.toScreen(retX, 0);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(rp[0], rp[1], radius * 0.4 * viz.scale, -Math.PI * 0.4, Math.PI * 0.4);
                            ctx.stroke();
                            viz.drawText('Retina', retX + 0.8, -1.8, viz.colors.red, 10);

                            return { lensX: lensX, retX: retX };
                        }

                        function draw() {
                            viz.clear();

                            var eyeX = 10;
                            var eyeR = 2.5;

                            // Parallel rays from the left
                            var rayH = [1.5, 0.5, -0.5, -1.5];

                            if (mode === 'normal') {
                                viz.screenText('Normal Eye: light focuses on the retina', viz.width / 2, 20, viz.colors.green, 14);
                                var parts = drawEye(eyeX, eyeR, 0);

                                for (var i = 0; i < rayH.length; i++) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(0, rayH[i])[0], viz.toScreen(0, rayH[i])[1]);
                                    ctx.lineTo(viz.toScreen(parts.lensX, rayH[i])[0], viz.toScreen(parts.lensX, rayH[i])[1]);
                                    ctx.lineTo(viz.toScreen(parts.retX, 0)[0], viz.toScreen(parts.retX, 0)[1]);
                                    ctx.stroke();
                                }
                                viz.drawPoint(parts.retX, 0, viz.colors.yellow, '', 4);

                            } else if (mode === 'myopia') {
                                viz.screenText('Myopia: light focuses in front of retina', viz.width / 2, 20, viz.colors.orange, 14);
                                var parts2 = drawEye(eyeX, eyeR, 0);
                                var focusX = parts2.retX - 1.2;

                                for (var i2 = 0; i2 < rayH.length; i2++) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(0, rayH[i2])[0], viz.toScreen(0, rayH[i2])[1]);
                                    ctx.lineTo(viz.toScreen(parts2.lensX, rayH[i2])[0], viz.toScreen(parts2.lensX, rayH[i2])[1]);
                                    ctx.lineTo(viz.toScreen(focusX, 0)[0], viz.toScreen(focusX, 0)[1]);
                                    ctx.stroke();
                                    // Rays continue and diverge after focus
                                    var spread = rayH[i2] * 0.4;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(focusX, 0)[0], viz.toScreen(focusX, 0)[1]);
                                    ctx.lineTo(viz.toScreen(parts2.retX, spread)[0], viz.toScreen(parts2.retX, spread)[1]);
                                    ctx.stroke();
                                }
                                viz.drawPoint(focusX, 0, viz.colors.orange, 'Focus', 4);

                            } else if (mode === 'hyperopia') {
                                viz.screenText('Hyperopia: light would focus behind retina', viz.width / 2, 20, viz.colors.orange, 14);
                                var parts3 = drawEye(eyeX, eyeR, 0);
                                var behindX = parts3.retX + 1.5;

                                for (var i3 = 0; i3 < rayH.length; i3++) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(0, rayH[i3])[0], viz.toScreen(0, rayH[i3])[1]);
                                    ctx.lineTo(viz.toScreen(parts3.lensX, rayH[i3])[0], viz.toScreen(parts3.lensX, rayH[i3])[1]);
                                    ctx.lineTo(viz.toScreen(parts3.retX, rayH[i3] * 0.3)[0], viz.toScreen(parts3.retX, rayH[i3] * 0.3)[1]);
                                    ctx.stroke();
                                    // Dashed continuation
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(parts3.retX, rayH[i3] * 0.3)[0], viz.toScreen(parts3.retX, rayH[i3] * 0.3)[1]);
                                    ctx.lineTo(viz.toScreen(behindX, 0)[0], viz.toScreen(behindX, 0)[1]);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                                viz.drawPoint(behindX, 0, viz.colors.orange, 'Focus', 4);

                            } else if (mode === 'myopia-fix') {
                                viz.screenText('Myopia Corrected: diverging lens shifts focus back to retina', viz.width / 2, 20, viz.colors.green, 14);
                                var parts4 = drawEye(eyeX, eyeR, 0);

                                // Draw diverging lens
                                var corrLensX = 3;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                var clp1 = viz.toScreen(corrLensX, 2.2);
                                var clp2 = viz.toScreen(corrLensX, -2.2);
                                ctx.beginPath();
                                ctx.moveTo(clp1[0], clp1[1]);
                                ctx.lineTo(clp2[0], clp2[1]);
                                ctx.stroke();
                                // Outward arrows
                                ctx.beginPath();
                                ctx.moveTo(clp1[0] - 6, clp1[1] - 8);
                                ctx.lineTo(clp1[0], clp1[1]);
                                ctx.lineTo(clp1[0] + 6, clp1[1] - 8);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(clp2[0] - 6, clp2[1] + 8);
                                ctx.lineTo(clp2[0], clp2[1]);
                                ctx.lineTo(clp2[0] + 6, clp2[1] + 8);
                                ctx.stroke();
                                viz.drawText('Diverging lens', corrLensX, -3.2, viz.colors.purple, 11);

                                for (var i4 = 0; i4 < rayH.length; i4++) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    var rh = rayH[i4];
                                    var rhAfterCorr = rh * 1.15;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(0, rh)[0], viz.toScreen(0, rh)[1]);
                                    ctx.lineTo(viz.toScreen(corrLensX, rh)[0], viz.toScreen(corrLensX, rh)[1]);
                                    ctx.lineTo(viz.toScreen(parts4.lensX, rhAfterCorr)[0], viz.toScreen(parts4.lensX, rhAfterCorr)[1]);
                                    ctx.lineTo(viz.toScreen(parts4.retX, 0)[0], viz.toScreen(parts4.retX, 0)[1]);
                                    ctx.stroke();
                                }
                                viz.drawPoint(parts4.retX, 0, viz.colors.green, '', 4);

                            } else if (mode === 'hyperopia-fix') {
                                viz.screenText('Hyperopia Corrected: converging lens brings focus forward to retina', viz.width / 2, 20, viz.colors.green, 14);
                                var parts5 = drawEye(eyeX, eyeR, 0);

                                // Draw converging lens
                                var corrLensX2 = 3;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                var clp3 = viz.toScreen(corrLensX2, 2.2);
                                var clp4 = viz.toScreen(corrLensX2, -2.2);
                                ctx.beginPath();
                                ctx.moveTo(clp3[0], clp3[1]);
                                ctx.lineTo(clp4[0], clp4[1]);
                                ctx.stroke();
                                // Inward arrows
                                ctx.beginPath();
                                ctx.moveTo(clp3[0] - 6, clp3[1] + 8);
                                ctx.lineTo(clp3[0], clp3[1]);
                                ctx.lineTo(clp3[0] + 6, clp3[1] + 8);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(clp4[0] - 6, clp4[1] - 8);
                                ctx.lineTo(clp4[0], clp4[1]);
                                ctx.lineTo(clp4[0] + 6, clp4[1] - 8);
                                ctx.stroke();
                                viz.drawText('Converging lens', corrLensX2, -3.2, viz.colors.purple, 11);

                                for (var i5 = 0; i5 < rayH.length; i5++) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    var rh2 = rayH[i5];
                                    var rhAfterCorr2 = rh2 * 0.85;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.toScreen(0, rh2)[0], viz.toScreen(0, rh2)[1]);
                                    ctx.lineTo(viz.toScreen(corrLensX2, rh2)[0], viz.toScreen(corrLensX2, rh2)[1]);
                                    ctx.lineTo(viz.toScreen(parts5.lensX, rhAfterCorr2)[0], viz.toScreen(parts5.lensX, rhAfterCorr2)[1]);
                                    ctx.lineTo(viz.toScreen(parts5.retX, 0)[0], viz.toScreen(parts5.retX, 0)[1]);
                                    ctx.stroke();
                                }
                                viz.drawPoint(parts5.retX, 0, viz.colors.green, '', 4);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch16-ex22',
                    type: 'numeric',
                    question: 'A magnifying glass has a focal length of 5.0 cm. What is its angular magnification when the image is at the near point (D = 25 cm)?',
                    hint: 'M = D/f.',
                    answer: 5.0,
                    tolerance: 0.2,
                    solution: 'M = D/f = 25/5.0 = 5.0x.'
                },
                {
                    id: 'ch16-ex23',
                    type: 'numeric',
                    question: 'A telescope has an objective lens of focal length 80 cm and an eyepiece of focal length 4 cm. What is the angular magnification?',
                    hint: 'M = f_o / f_e for a telescope in normal adjustment.',
                    answer: 20,
                    tolerance: 0.5,
                    solution: 'M = f_o / f_e = 80 / 4 = 20x.'
                },
                {
                    id: 'ch16-ex24',
                    type: 'multiple-choice',
                    question: 'A person who is nearsighted (myopic) needs corrective lenses that are:',
                    options: [
                        'Converging (convex)',
                        'Diverging (concave)',
                        'Cylindrical',
                        'Flat (plano)'
                    ],
                    correct: 1,
                    hint: 'Myopia means the eye converges light too strongly. What kind of lens would counteract this?',
                    solution: 'In myopia, the eye focuses light in front of the retina. A diverging (concave) lens spreads the light slightly before it enters the eye, moving the focus back onto the retina.'
                },
                {
                    id: 'ch16-ex25',
                    type: 'numeric',
                    question: 'A compound microscope has an objective with f_o = 0.5 cm and an eyepiece with f_e = 2.5 cm. The tube length L is 16 cm. What is the total magnification? (Use D = 25 cm.)',
                    hint: 'M = (L/f_o)(D/f_e).',
                    answer: 320,
                    tolerance: 5,
                    solution: 'M = (L/f_o)(D/f_e) = (16/0.5)(25/2.5) = 32 x 10 = 320x.'
                },
                {
                    id: 'ch16-ex26',
                    type: 'numeric',
                    question: 'The length of a refracting telescope in normal adjustment (image at infinity) is the sum of the focal lengths of the two lenses. If the objective has f = 120 cm and the eyepiece has f = 6 cm, what is the total length in cm?',
                    hint: 'In normal adjustment, the focal points of the two lenses coincide.',
                    answer: 126,
                    tolerance: 0.5,
                    solution: 'Total length = f_o + f_e = 120 + 6 = 126 cm.'
                }
            ]
        }
    ]
});
