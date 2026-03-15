window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch03',
  number: 3,
  title: 'Circular Motion',
  subtitle: 'Motion Along Curved Paths',
  sections: [

    // ─── SECTION 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch03-sec01',
      title: '1. Angular Quantities',
      content: `
<div class="env-block intuition"><div class="env-title">From Straight Lines to Circles</div><div class="env-body"><p>In Chapters 1 and 2, you studied motion along straight lines and parabolas. Now we turn to a fundamentally different kind of motion: objects moving along circular paths. From the spin of a wheel to the orbit of a satellite, circular motion is everywhere. To describe it, we need a new set of quantities based on angles rather than linear displacement.</p></div></div>

<h2>Angular Quantities</h2>
<p class="section-roadmap"><em>In this section, you will learn the angular description of circular motion: angular displacement, angular velocity, period, frequency, and their relationships to linear quantities.</em></p>

<h3>Angular Displacement and Radians</h3>
<div class="definition">
<strong>Angular Displacement (\\(\\Delta\\theta\\))</strong>: The angle swept by the radius vector as an object moves along a circular arc. Measured in <strong>radians</strong> (rad).
<br><br>
One full revolution = \\(2\\pi\\) rad = 360 degrees. The radian is defined so that an arc of length \\(s\\) on a circle of radius \\(r\\) subtends an angle \\(\\theta = s/r\\).
</div>

<h3>Angular Velocity</h3>
<div class="definition">
<strong>Angular Velocity (\\(\\omega\\))</strong>: The rate of change of angular displacement.
\\[\\omega = \\frac{\\Delta\\theta}{\\Delta t}\\]
Units: rad/s. For uniform circular motion, \\(\\omega\\) is constant.
</div>

<h3>Period and Frequency</h3>
<p>Two closely related quantities describe how fast an object goes around:</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
<thead>
<tr style="background:#1a1a40;">
<th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Quantity</th>
<th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Symbol</th>
<th style="padding:8px;border:1px solid #30363d;color:#f0883e;">Definition</th>
<th style="padding:8px;border:1px solid #30363d;color:#bc8cff;">Unit</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #30363d;">Period</td><td style="padding:8px;border:1px solid #30363d;">\\(T\\)</td><td style="padding:8px;border:1px solid #30363d;">Time for one complete revolution</td><td style="padding:8px;border:1px solid #30363d;">seconds (s)</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Frequency</td><td style="padding:8px;border:1px solid #30363d;">\\(f\\)</td><td style="padding:8px;border:1px solid #30363d;">Number of revolutions per second</td><td style="padding:8px;border:1px solid #30363d;">hertz (Hz) = s\\(^{-1}\\)</td></tr>
</tbody>
</table>

<p>These are related by:</p>
\\[
f = \\frac{1}{T}, \\qquad \\omega = \\frac{2\\pi}{T} = 2\\pi f
\\]

<h3>Relationship Between Linear and Angular Quantities</h3>
<p>For an object moving in a circle of radius \\(r\\):</p>
<div class="env-block theorem"><div class="env-title">Linear-Angular Relations</div><div class="env-body">
\\[
s = r\\theta, \\qquad v = r\\omega, \\qquad a_c = r\\omega^2 = \\frac{v^2}{r}
\\]
<p>Here \\(s\\) is arc length, \\(v\\) is the linear (tangential) speed, and \\(a_c\\) is the centripetal acceleration (covered in the next section).</p>
</div></div>

<div class="env-block remark"><div class="env-title">Speed vs. Velocity in Circular Motion</div><div class="env-body"><p>In uniform circular motion, the <em>speed</em> \\(v\\) is constant, but the <em>velocity</em> (a vector) is continuously changing direction. This change in velocity direction is what gives rise to centripetal acceleration.</p></div></div>

<div class="env-block example"><div class="env-title">Example: Bicycle Wheel</div><div class="env-body">
<p>A bicycle wheel of radius 0.35 m rotates at 2 revolutions per second. Find (a) the angular velocity, (b) the period, and (c) the linear speed of a point on the rim.</p>
<p><strong>Solution:</strong></p>
<p>(a) \\(\\omega = 2\\pi f = 2\\pi \\times 2 = 4\\pi \\approx 12.6\\) rad/s</p>
<p>(b) \\(T = 1/f = 1/2 = 0.5\\) s</p>
<p>(c) \\(v = r\\omega = 0.35 \\times 4\\pi \\approx 4.4\\) m/s</p>
</div></div>

<div class="viz-placeholder" data-viz="viz-circular-motion-basics"></div>
`,
      visualizations: [
        {
          id: 'viz-circular-motion-basics',
          title: 'Circular Motion: Angular Quantities',
          description: 'Watch the object orbit in a circle. The angular velocity, period, and linear speed are displayed. Adjust the radius and angular velocity to explore the relationships.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 400, scale: 50,
              originX: 200, originY: 200
            });
            let omega = 2.0;
            let radius = 2.5;

            VizEngine.createSlider(controls, '\u03C9 (rad/s)', 0.5, 8, omega, 0.5, val => { omega = val; });
            VizEngine.createSlider(controls, 'r (m)', 0.5, 3.5, radius, 0.25, val => { radius = val; });

            viz.animate(function(time) {
              viz.clear();
              const ctx = viz.ctx;
              const t = time / 1000;
              const angle = omega * t;
              const sc = viz.scale;
              const ox = viz.originX, oy = viz.originY;

              // grid
              viz.drawGrid(1);

              // circle path
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.arc(ox, oy, radius * sc, 0, Math.PI * 2); ctx.stroke();

              // radius line
              const px = ox + radius * sc * Math.cos(angle);
              const py = oy - radius * sc * Math.sin(angle);
              ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(px, py); ctx.stroke();

              // angle arc
              ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5;
              const arcR = 25;
              const displayAngle = angle % (2 * Math.PI);
              ctx.beginPath();
              ctx.arc(ox, oy, arcR, -displayAngle, 0);
              ctx.stroke();

              // swept arc (trail)
              const trailLength = Math.min(angle, Math.PI * 2);
              ctx.strokeStyle = viz.colors.teal + '55'; ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(ox, oy, radius * sc, -(angle), -(angle - trailLength));
              ctx.stroke();

              // object
              ctx.fillStyle = viz.colors.blue;
              ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();

              // velocity vector (tangent)
              const v = radius * omega;
              const vScale = 15;
              const vx = -Math.sin(angle) * vScale;
              const vy = -Math.cos(angle) * vScale;
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + vx, py + vy); ctx.stroke();
              // arrowhead
              const vAngle = Math.atan2(vy, vx);
              ctx.fillStyle = viz.colors.red; ctx.beginPath();
              ctx.moveTo(px + vx, py + vy);
              ctx.lineTo(px + vx - 8 * Math.cos(vAngle - Math.PI / 6), py + vy - 8 * Math.sin(vAngle - Math.PI / 6));
              ctx.lineTo(px + vx - 8 * Math.cos(vAngle + Math.PI / 6), py + vy - 8 * Math.sin(vAngle + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // center
              ctx.fillStyle = viz.colors.white;
              ctx.beginPath(); ctx.arc(ox, oy, 3, 0, Math.PI * 2); ctx.fill();

              // info panel
              const period = (2 * Math.PI / omega);
              const freq = 1 / period;
              const linSpeed = radius * omega;
              viz.screenText('\u03C9 = ' + omega.toFixed(1) + ' rad/s', 420, 30, viz.colors.white, 13);
              viz.screenText('T = ' + period.toFixed(2) + ' s', 420, 50, viz.colors.teal, 12);
              viz.screenText('f = ' + freq.toFixed(2) + ' Hz', 420, 68, viz.colors.orange, 12);
              viz.screenText('v = r\u03C9 = ' + linSpeed.toFixed(1) + ' m/s', 420, 86, viz.colors.red, 12);
              viz.screenText('r = ' + radius.toFixed(2) + ' m', 420, 104, viz.colors.blue, 12);

              // labels
              viz.screenText('v (tangent)', 420, 130, viz.colors.red, 11);
            });
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A record turntable rotates at 33.3 RPM (revolutions per minute). Find (a) the frequency in Hz, (b) the period, and (c) the angular velocity.',
          hint: 'Convert RPM to Hz by dividing by 60.',
          solution: '(a) \\(f = 33.3/60 = 0.556\\) Hz. (b) \\(T = 1/f = 1.80\\) s. (c) \\(\\omega = 2\\pi f = 2\\pi \\times 0.556 = 3.49\\) rad/s.'
        },
        {
          question: 'The Earth completes one rotation about its axis in approximately 24 hours. Calculate the angular velocity of the Earth in rad/s.',
          hint: 'One full rotation = \\(2\\pi\\) rad. Convert 24 hours to seconds.',
          solution: '\\(T = 24 \\times 3600 = 86400\\) s. \\(\\omega = 2\\pi / T = 2\\pi / 86400 \\approx 7.27 \\times 10^{-5}\\) rad/s.'
        },
        {
          question: 'A point on the edge of a spinning disc of radius 0.20 m has a linear speed of 5.0 m/s. What is the angular velocity of the disc?',
          hint: 'Use \\(v = r\\omega\\).',
          solution: '\\(\\omega = v/r = 5.0/0.20 = 25\\) rad/s.'
        },
        {
          question: 'Two points on a rotating disc are at distances 10 cm and 20 cm from the center. Compare their (a) angular velocities and (b) linear speeds.',
          hint: 'All points on a rigid body have the same angular velocity.',
          solution: '(a) Both have the same angular velocity \\(\\omega\\) since they are on the same rigid disc. (b) \\(v_1 = r_1 \\omega\\) and \\(v_2 = r_2 \\omega = 2r_1 \\omega = 2v_1\\). The outer point has twice the linear speed.'
        },
        {
          question: 'A satellite orbits the Earth with a period of 90 minutes at an altitude where the orbital radius is 6700 km. Find its orbital speed.',
          hint: 'First find \\(\\omega\\), then use \\(v = r\\omega\\). Convert units carefully.',
          solution: '\\(T = 90 \\times 60 = 5400\\) s, \\(r = 6.7 \\times 10^6\\) m. \\(\\omega = 2\\pi/5400 = 1.16 \\times 10^{-3}\\) rad/s. \\(v = r\\omega = 6.7 \\times 10^6 \\times 1.16 \\times 10^{-3} \\approx 7800\\) m/s \\(\\approx 7.8\\) km/s.'
        }
      ]
    },

    // ─── SECTION 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch03-sec02',
      title: '2. Centripetal Acceleration',
      content: `
<h2>Centripetal Acceleration</h2>
<p class="section-roadmap"><em>In this section, you will understand why uniform circular motion requires acceleration, derive the centripetal acceleration formula, and build intuition for why the acceleration always points toward the center.</em></p>

<h3>Why Does Circular Motion Need Acceleration?</h3>
<div class="env-block intuition"><div class="env-title">Changing Direction = Acceleration</div><div class="env-body"><p>Recall that acceleration is the rate of change of <em>velocity</em>, which is a vector. Even if the speed is constant, if the direction of motion changes, there is acceleration. In uniform circular motion, the direction changes continuously, so there is always acceleration, even though the object never speeds up or slows down.</p></div></div>

<h3>Direction of Centripetal Acceleration</h3>
<p>Consider an object moving in a circle. At any instant, its velocity is tangent to the circle. A moment later, the velocity has the same magnitude but a slightly different direction. The change in velocity \\(\\Delta \\vec{v}\\) points <strong>toward the center of the circle</strong>.</p>

<div class="env-block theorem"><div class="env-title">Centripetal Acceleration</div><div class="env-body">
<p>For an object moving with speed \\(v\\) in a circle of radius \\(r\\), the centripetal ("center-seeking") acceleration has magnitude:</p>
\\[
a_c = \\frac{v^2}{r} = \\omega^2 r = v\\omega
\\]
<p>The direction is always <strong>radially inward</strong>, toward the center of the circle.</p>
</div></div>

<h3>Derivation Sketch</h3>
<p>Consider two velocity vectors \\(\\vec{v}_1\\) and \\(\\vec{v}_2\\) at times \\(t\\) and \\(t + \\Delta t\\), with the object sweeping a small angle \\(\\Delta\\theta\\). Since both have magnitude \\(v\\), the change \\(|\\Delta\\vec{v}| \\approx v\\,\\Delta\\theta\\) for small angles. Therefore:</p>
\\[
a_c = \\frac{|\\Delta\\vec{v}|}{\\Delta t} = v \\cdot \\frac{\\Delta\\theta}{\\Delta t} = v\\omega = \\frac{v^2}{r}
\\]
<p>The direction of \\(\\Delta\\vec{v}\\) is perpendicular to \\(\\vec{v}\\), which means it points toward the center.</p>

<div class="env-block remark"><div class="env-title">Three Equivalent Forms</div><div class="env-body">
<p>The three forms are useful in different situations:</p>
<ul>
<li>\\(a_c = v^2/r\\) when you know the linear speed</li>
<li>\\(a_c = \\omega^2 r\\) when you know the angular velocity</li>
<li>\\(a_c = v\\omega\\) is occasionally handy as a bridge between the two</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example: Car on a Curve</div><div class="env-body">
<p>A car drives at 20 m/s around a curve of radius 50 m. What is the centripetal acceleration?</p>
<p><strong>Solution:</strong> \\(a_c = v^2/r = 400/50 = 8.0\\) m/s\\(^2\\), which is approximately \\(0.82g\\). The driver feels a significant sideways "pull."</p>
</div></div>

<div class="env-block warning"><div class="env-title">Centripetal vs. Centrifugal</div><div class="env-body"><p>"Centripetal" means center-seeking. The acceleration truly points inward. "Centrifugal force" (center-fleeing) is a fictitious force that appears in the rotating reference frame. In an inertial frame, only centripetal acceleration and centripetal force exist. Exam tip: always use "centripetal" in your answers.</p></div></div>

<div class="viz-placeholder" data-viz="viz-centripetal-accel"></div>
`,
      visualizations: [
        {
          id: 'viz-centripetal-accel',
          title: 'Centripetal Acceleration Vectors',
          description: 'The blue dot moves in a circle. The red arrow shows velocity (tangent), and the green arrow shows centripetal acceleration (pointing to center). Adjust speed and radius to see how acceleration changes.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 400, scale: 50,
              originX: 230, originY: 200
            });
            let speed = 3;
            let radius = 2.0;

            VizEngine.createSlider(controls, 'v (m/s)', 1, 8, speed, 0.5, val => { speed = val; });
            VizEngine.createSlider(controls, 'r (m)', 0.5, 3.5, radius, 0.25, val => { radius = val; });

            viz.animate(function(time) {
              viz.clear();
              const ctx = viz.ctx;
              const sc = viz.scale;
              const ox = viz.originX, oy = viz.originY;
              const omega = speed / radius;
              const t = time / 1000;
              const angle = omega * t;
              const ac = speed * speed / radius;

              // grid
              viz.drawGrid(1);

              // circle path
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.arc(ox, oy, radius * sc, 0, Math.PI * 2); ctx.stroke();

              // object position
              const px = ox + radius * sc * Math.cos(angle);
              const py = oy - radius * sc * Math.sin(angle);

              // radius line (dashed)
              ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(px, py); ctx.stroke();
              ctx.setLineDash([]);

              // velocity vector (tangent, red)
              const vScale = 12;
              const vxDir = -Math.sin(angle);
              const vyDir = -Math.cos(angle);
              const vEndX = px + vxDir * speed * vScale;
              const vEndY = py + vyDir * speed * vScale;
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2.5;
              ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(vEndX, vEndY); ctx.stroke();
              const vA = Math.atan2(vEndY - py, vEndX - px);
              ctx.fillStyle = viz.colors.red; ctx.beginPath();
              ctx.moveTo(vEndX, vEndY);
              ctx.lineTo(vEndX - 10 * Math.cos(vA - Math.PI / 6), vEndY - 10 * Math.sin(vA - Math.PI / 6));
              ctx.lineTo(vEndX - 10 * Math.cos(vA + Math.PI / 6), vEndY - 10 * Math.sin(vA + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // centripetal acceleration vector (toward center, green)
              const aScale = 5;
              const acx = -Math.cos(angle) * ac * aScale;
              const acy = Math.sin(angle) * ac * aScale;
              const aEndX = px + acx;
              const aEndY = py + acy;
              ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2.5;
              ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(aEndX, aEndY); ctx.stroke();
              const aA = Math.atan2(aEndY - py, aEndX - px);
              ctx.fillStyle = viz.colors.green; ctx.beginPath();
              ctx.moveTo(aEndX, aEndY);
              ctx.lineTo(aEndX - 10 * Math.cos(aA - Math.PI / 6), aEndY - 10 * Math.sin(aA - Math.PI / 6));
              ctx.lineTo(aEndX - 10 * Math.cos(aA + Math.PI / 6), aEndY - 10 * Math.sin(aA + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // object
              ctx.fillStyle = viz.colors.blue;
              ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();

              // center
              ctx.fillStyle = viz.colors.white;
              ctx.beginPath(); ctx.arc(ox, oy, 3, 0, Math.PI * 2); ctx.fill();

              // info panel
              viz.screenText('v = ' + speed.toFixed(1) + ' m/s', 430, 30, viz.colors.red, 13);
              viz.screenText('r = ' + radius.toFixed(2) + ' m', 430, 50, viz.colors.blue, 12);
              viz.screenText('\u03C9 = ' + omega.toFixed(2) + ' rad/s', 430, 68, viz.colors.teal, 12);
              viz.screenText('ac = v\u00B2/r = ' + ac.toFixed(1) + ' m/s\u00B2', 430, 88, viz.colors.green, 12);
              viz.screenText('ac = ' + (ac / 9.8).toFixed(2) + ' g', 430, 106, viz.colors.orange, 12);

              // legend
              viz.screenText('v (velocity)', 430, 140, viz.colors.red, 11);
              viz.screenText('ac (centripetal)', 430, 156, viz.colors.green, 11);
            });
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A ball on a string is swung in a horizontal circle of radius 0.80 m at 4.0 m/s. What is the centripetal acceleration?',
          hint: 'Use \\(a_c = v^2/r\\).',
          solution: '\\(a_c = v^2/r = 16/0.80 = 20\\) m/s\\(^2\\) (about 2g).'
        },
        {
          question: 'The Moon orbits the Earth with a period of about 27.3 days at a distance of \\(3.84 \\times 10^8\\) m. Calculate the centripetal acceleration of the Moon.',
          hint: 'Use \\(a_c = \\omega^2 r\\) where \\(\\omega = 2\\pi/T\\). Convert T to seconds.',
          solution: '\\(T = 27.3 \\times 86400 = 2.36 \\times 10^6\\) s. \\(\\omega = 2\\pi / (2.36 \\times 10^6) = 2.66 \\times 10^{-6}\\) rad/s. \\(a_c = \\omega^2 r = (2.66 \\times 10^{-6})^2 \\times 3.84 \\times 10^8 = 2.72 \\times 10^{-3}\\) m/s\\(^2\\).'
        },
        {
          question: 'If the speed of a car going around a curve doubles (same curve radius), by what factor does the centripetal acceleration change?',
          hint: 'Since \\(a_c = v^2/r\\), how does \\(a_c\\) scale with \\(v\\)?',
          solution: 'Since \\(a_c \\propto v^2\\), doubling \\(v\\) quadruples \\(a_c\\). The centripetal acceleration increases by a factor of 4.'
        },
        {
          question: 'Two objects move in circles at the same speed. Object A has radius 2 m and Object B has radius 8 m. Compare their centripetal accelerations.',
          hint: 'Use \\(a_c = v^2/r\\) for each.',
          solution: '\\(a_A/a_B = (v^2/r_A)/(v^2/r_B) = r_B/r_A = 8/2 = 4\\). Object A has 4 times the centripetal acceleration of Object B.'
        },
        {
          question: 'An astronaut in a centrifuge experiences \\(6g\\) of centripetal acceleration. If the centrifuge arm is 10 m long, what is the rotation speed in RPM?',
          hint: 'First find \\(\\omega\\) from \\(a_c = \\omega^2 r\\), then convert to RPM.',
          solution: '\\(a_c = 6 \\times 9.8 = 58.8\\) m/s\\(^2\\). \\(\\omega = \\sqrt{a_c/r} = \\sqrt{58.8/10} = 2.42\\) rad/s. Converting: \\(f = \\omega/(2\\pi) = 0.386\\) Hz \\(= 0.386 \\times 60 = 23.1\\) RPM.'
        }
      ]
    },

    // ─── SECTION 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch03-sec03',
      title: '3. Centripetal Force',
      content: `
<h2>Centripetal Force</h2>
<p class="section-roadmap"><em>In this section, you will learn that centripetal force is not a new type of force but the net inward force responsible for circular motion. You will analyze what provides the centripetal force in various real-world scenarios.</em></p>

<h3>Newton's Second Law for Circular Motion</h3>
<div class="definition">
<strong>Centripetal Force</strong>: The net force directed toward the center of the circular path. By Newton's second law:
\\[F_c = ma_c = \\frac{mv^2}{r} = m\\omega^2 r\\]
<p>This is <em>not</em> a new kind of force. It is the resultant of all forces acting on the object in the radial direction.</p>
</div>

<div class="env-block warning"><div class="env-title">Centripetal Force is a Role, Not a Type</div><div class="env-body"><p>There is no "centripetal force" entry in a free-body diagram as a separate force. Instead, identify which real forces (gravity, tension, normal force, friction, etc.) contribute to the net inward force. The centripetal force is the net radial component of all real forces.</p></div></div>

<h3>What Provides the Centripetal Force?</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
<thead>
<tr style="background:#1a1a40;">
<th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Scenario</th>
<th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Source of Centripetal Force</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #30363d;">Ball on a string (horizontal circle)</td><td style="padding:8px;border:1px solid #30363d;">Tension in the string</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Car on a flat curve</td><td style="padding:8px;border:1px solid #30363d;">Static friction</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Car on a banked curve (no friction)</td><td style="padding:8px;border:1px solid #30363d;">Horizontal component of normal force</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Satellite in orbit</td><td style="padding:8px;border:1px solid #30363d;">Gravitational force</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Electron around a nucleus</td><td style="padding:8px;border:1px solid #30363d;">Electrostatic (Coulomb) force</td></tr>
<tr><td style="padding:8px;border:1px solid #30363d;">Roller coaster loop (top)</td><td style="padding:8px;border:1px solid #30363d;">Weight + normal force (both point inward)</td></tr>
</tbody>
</table>

<h3>Car on a Flat Curve</h3>
<p>When a car negotiates a flat, unbanked curve, static friction provides the centripetal force:</p>
\\[
f_s = \\frac{mv^2}{r} \\leq \\mu_s mg
\\]
<p>The maximum safe speed is:</p>
\\[
v_{\\max} = \\sqrt{\\mu_s g r}
\\]

<div class="env-block example"><div class="env-title">Example: Maximum Speed on a Curve</div><div class="env-body">
<p>A flat curve has radius 100 m. The coefficient of static friction between tires and road is 0.70. What is the maximum safe speed? (\\(g = 10\\,\\text{m/s}^2\\))</p>
<p><strong>Solution:</strong> \\(v_{\\max} = \\sqrt{\\mu_s g r} = \\sqrt{0.70 \\times 10 \\times 100} = \\sqrt{700} \\approx 26.5\\) m/s \\(\\approx 95\\) km/h.</p>
</div></div>

<h3>Banked Curves</h3>
<p>A banked curve is tilted at angle \\(\\alpha\\) so that the horizontal component of the normal force provides (or assists) the centripetal force. For the ideal banking angle (no friction needed):</p>
\\[
\\tan\\alpha = \\frac{v^2}{rg}
\\]
<p>At this design speed, the car can navigate the curve without any friction.</p>

<div class="viz-placeholder" data-viz="viz-centripetal-force"></div>

<div class="viz-placeholder" data-viz="viz-banked-curve"></div>
`,
      visualizations: [
        {
          id: 'viz-centripetal-force',
          title: 'Centripetal Force Explorer',
          description: 'A ball on a string moves in a horizontal circle. Adjust mass, speed, and radius to see how the required centripetal force (tension) changes. The force arrow scales with magnitude.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 380, scale: 60,
              originX: 220, originY: 190
            });
            let mass = 0.5;
            let speed = 3;
            let radius = 1.5;

            VizEngine.createSlider(controls, 'm (kg)', 0.1, 2.0, mass, 0.1, val => { mass = val; });
            VizEngine.createSlider(controls, 'v (m/s)', 1, 8, speed, 0.5, val => { speed = val; });
            VizEngine.createSlider(controls, 'r (m)', 0.5, 3.0, radius, 0.25, val => { radius = val; });

            viz.animate(function(time) {
              viz.clear();
              const ctx = viz.ctx;
              const sc = viz.scale;
              const ox = viz.originX, oy = viz.originY;
              const omega = speed / radius;
              const t = time / 1000;
              const angle = omega * t;
              const Fc = mass * speed * speed / radius;

              // circle path
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.arc(ox, oy, radius * sc, 0, Math.PI * 2); ctx.stroke();

              // object position
              const px = ox + radius * sc * Math.cos(angle);
              const py = oy - radius * sc * Math.sin(angle);

              // string (tension line)
              ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(px, py); ctx.stroke();

              // force arrow (toward center)
              const fScale = Math.min(Fc * 3, 100);
              const fEndX = px + (-Math.cos(angle)) * fScale;
              const fEndY = py + (Math.sin(angle)) * fScale;
              ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 3;
              ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(fEndX, fEndY); ctx.stroke();
              const fA = Math.atan2(fEndY - py, fEndX - px);
              ctx.fillStyle = viz.colors.orange; ctx.beginPath();
              ctx.moveTo(fEndX, fEndY);
              ctx.lineTo(fEndX - 10 * Math.cos(fA - Math.PI / 6), fEndY - 10 * Math.sin(fA - Math.PI / 6));
              ctx.lineTo(fEndX - 10 * Math.cos(fA + Math.PI / 6), fEndY - 10 * Math.sin(fA + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // object
              const ballR = Math.max(6, mass * 10);
              ctx.fillStyle = viz.colors.blue;
              ctx.beginPath(); ctx.arc(px, py, ballR, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = viz.colors.white; ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
              ctx.fillText('m', px, py);

              // center pin
              ctx.fillStyle = viz.colors.white;
              ctx.beginPath(); ctx.arc(ox, oy, 4, 0, Math.PI * 2); ctx.fill();

              // info
              viz.screenText('Fc = mv\u00B2/r', 430, 25, viz.colors.white, 13);
              viz.screenText('= ' + Fc.toFixed(1) + ' N', 430, 43, viz.colors.orange, 13);
              viz.screenText('m = ' + mass.toFixed(1) + ' kg', 430, 70, viz.colors.text, 12);
              viz.screenText('v = ' + speed.toFixed(1) + ' m/s', 430, 88, viz.colors.red, 12);
              viz.screenText('r = ' + radius.toFixed(2) + ' m', 430, 106, viz.colors.blue, 12);
              viz.screenText('\u03C9 = ' + omega.toFixed(1) + ' rad/s', 430, 124, viz.colors.teal, 12);

              viz.screenText('Fc (tension)', 430, 155, viz.colors.orange, 11);
            });
            return viz;
          }
        },
        {
          id: 'viz-banked-curve',
          title: 'Banked Curve Physics',
          description: 'See how the normal force on a banked curve provides the centripetal force. Adjust the speed and banking angle. At the ideal angle, no friction is needed.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 380, scale: 1,
              originX: 0, originY: 0
            });
            let speed = 20;
            let bankAngle = 25;
            const g = 9.8;
            const r = 100;
            const mass = 1200;

            VizEngine.createSlider(controls, 'v (m/s)', 5, 40, speed, 1, val => { speed = val; draw(); });
            VizEngine.createSlider(controls, 'Bank angle (deg)', 5, 60, bankAngle, 1, val => { bankAngle = val; draw(); });

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              const alpha = bankAngle * Math.PI / 180;
              const idealSpeed = Math.sqrt(r * g * Math.tan(alpha));

              // banked road cross-section
              const cx = 200, cy = 220;
              const roadLen = 200;
              const cosA = Math.cos(alpha), sinA = Math.sin(alpha);

              // road surface
              const x1 = cx - roadLen / 2 * cosA;
              const y1 = cy + roadLen / 2 * sinA;
              const x2 = cx + roadLen / 2 * cosA;
              const y2 = cy - roadLen / 2 * sinA;

              ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 3;
              ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

              // road fill below
              ctx.fillStyle = '#1a1a40';
              ctx.beginPath();
              ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
              ctx.lineTo(x2, y1); ctx.closePath(); ctx.fill();

              // car (rectangle on road)
              const carCx = cx, carCy = cy - 5;
              const carW = 50, carH = 25;
              ctx.save();
              ctx.translate(carCx, carCy);
              ctx.rotate(-alpha);
              ctx.fillStyle = viz.colors.blue;
              ctx.fillRect(-carW / 2, -carH, carW, carH);
              ctx.strokeStyle = viz.colors.white + '44';
              ctx.lineWidth = 1;
              ctx.strokeRect(-carW / 2, -carH, carW, carH);
              ctx.restore();

              // Forces on the car
              const forceScale = 0.6;

              // Weight (down)
              const W = mass * g;
              const wLen = W * forceScale * 0.005;
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2.5;
              ctx.beginPath(); ctx.moveTo(carCx, carCy);
              ctx.lineTo(carCx, carCy + wLen); ctx.stroke();
              ctx.fillStyle = viz.colors.red;
              ctx.beginPath(); ctx.moveTo(carCx, carCy + wLen);
              ctx.lineTo(carCx - 5, carCy + wLen - 8);
              ctx.lineTo(carCx + 5, carCy + wLen - 8);
              ctx.closePath(); ctx.fill();
              viz.screenText('mg', carCx + 15, carCy + wLen - 10, viz.colors.red, 12, 'left');

              // Normal force (perpendicular to road surface)
              const N = mass * g / Math.cos(alpha);
              const nLen = N * forceScale * 0.005;
              const nx = -Math.sin(alpha);
              const ny = -Math.cos(alpha);
              ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2.5;
              ctx.beginPath(); ctx.moveTo(carCx, carCy);
              ctx.lineTo(carCx + nx * nLen, carCy + ny * nLen); ctx.stroke();
              const nAngle = Math.atan2(ny * nLen, nx * nLen);
              ctx.fillStyle = viz.colors.green;
              ctx.beginPath();
              const nTipX = carCx + nx * nLen, nTipY = carCy + ny * nLen;
              ctx.moveTo(nTipX, nTipY);
              ctx.lineTo(nTipX - 8 * Math.cos(nAngle - Math.PI / 6), nTipY - 8 * Math.sin(nAngle - Math.PI / 6));
              ctx.lineTo(nTipX - 8 * Math.cos(nAngle + Math.PI / 6), nTipY - 8 * Math.sin(nAngle + Math.PI / 6));
              ctx.closePath(); ctx.fill();
              viz.screenText('N', nTipX - 15, nTipY - 5, viz.colors.green, 12);

              // Horizontal component of N (centripetal)
              const Nh = N * Math.sin(alpha);
              const nhLen = Nh * forceScale * 0.005;
              ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
              ctx.setLineDash([4, 3]);
              ctx.beginPath(); ctx.moveTo(carCx, carCy);
              ctx.lineTo(carCx - nhLen, carCy); ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = viz.colors.orange;
              ctx.beginPath();
              ctx.moveTo(carCx - nhLen, carCy);
              ctx.lineTo(carCx - nhLen + 6, carCy - 4);
              ctx.lineTo(carCx - nhLen + 6, carCy + 4);
              ctx.closePath(); ctx.fill();
              viz.screenText('N sin\u03B1', carCx - nhLen - 10, carCy - 12, viz.colors.orange, 11, 'right');

              // angle arc
              ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(x2, y2, 30, Math.PI / 2 - alpha, Math.PI / 2);
              ctx.stroke();
              viz.screenText('\u03B1', x2 + 5, y2 + 35, viz.colors.yellow, 12, 'left');

              // center of circle (to the left)
              viz.screenText('\u2190 Center of curve', 30, cy + 55, viz.colors.text, 11, 'left');

              // info panel
              viz.screenText('Banked Curve Analysis', 420, 25, viz.colors.white, 14);
              viz.screenText('Bank angle: ' + bankAngle + '\u00B0', 420, 50, viz.colors.yellow, 12);
              viz.screenText('v = ' + speed + ' m/s', 420, 70, viz.colors.blue, 12);
              viz.screenText('Ideal speed: ' + idealSpeed.toFixed(1) + ' m/s', 420, 90, viz.colors.teal, 12);

              const needed = mass * speed * speed / r;
              const provided = mass * g * Math.tan(alpha);
              viz.screenText('Fc needed: ' + needed.toFixed(0) + ' N', 420, 120, viz.colors.orange, 12);
              viz.screenText('N sin\u03B1: ' + provided.toFixed(0) + ' N', 420, 138, viz.colors.green, 12);

              const diff = needed - provided;
              if (Math.abs(diff) < 50) {
                viz.screenText('No friction needed!', 420, 165, viz.colors.green, 13);
              } else if (diff > 0) {
                viz.screenText('Friction needed (inward): ' + diff.toFixed(0) + ' N', 420, 165, viz.colors.red, 11);
                viz.screenText('Car tends to slide outward', 420, 182, viz.colors.red, 10);
              } else {
                viz.screenText('Friction needed (outward): ' + (-diff).toFixed(0) + ' N', 420, 165, viz.colors.purple, 11);
                viz.screenText('Car tends to slide inward', 420, 182, viz.colors.purple, 10);
              }

              // formula
              viz.screenText('tan \u03B1 = v\u00B2 / (rg)', 420, 210, viz.colors.text, 11);
            }
            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A 1500 kg car rounds a flat curve of radius 80 m at 25 m/s. What is the required friction force?',
          hint: 'Use \\(F_c = mv^2/r\\).',
          solution: '\\(F_c = mv^2/r = 1500 \\times 625 / 80 = 11719\\) N \\(\\approx 11.7\\) kN.'
        },
        {
          question: 'A highway curve of radius 200 m is designed for a speed of 25 m/s with no friction. What should the banking angle be? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Use \\(\\tan\\alpha = v^2/(rg)\\).',
          solution: '\\(\\tan\\alpha = 625/(200 \\times 10) = 0.3125\\). \\(\\alpha = \\arctan(0.3125) \\approx 17.4^\\circ\\).'
        },
        {
          question: 'A 0.20 kg ball on a 1.0 m string is swung in a horizontal circle. The string can withstand a maximum tension of 50 N. What is the maximum speed of the ball?',
          hint: 'Set \\(T = mv^2/r\\) and solve for \\(v\\).',
          solution: '\\(v_{\\max} = \\sqrt{Tr/m} = \\sqrt{50 \\times 1.0 / 0.20} = \\sqrt{250} \\approx 15.8\\) m/s.'
        },
        {
          question: 'On a rainy day, the coefficient of friction between tires and road drops to 0.40. What is the maximum safe speed for a flat curve of radius 50 m? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'Use \\(v_{\\max} = \\sqrt{\\mu_s g r}\\).',
          solution: '\\(v_{\\max} = \\sqrt{0.40 \\times 10 \\times 50} = \\sqrt{200} \\approx 14.1\\) m/s \\(\\approx 51\\) km/h.'
        },
        {
          question: 'A conical pendulum has a string of length 1.0 m making an angle of 30 degrees with the vertical. Find the period of revolution. (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'The radius is \\(r = L\\sin\\theta\\). The vertical component of tension balances weight: \\(T\\cos\\theta = mg\\). The horizontal component provides centripetal force: \\(T\\sin\\theta = m\\omega^2 r\\).',
          solution: 'Dividing the equations: \\(\\tan\\theta = \\omega^2 r / g\\). With \\(r = L\\sin\\theta\\): \\(\\tan\\theta = \\omega^2 L\\sin\\theta / g\\), so \\(\\omega^2 = g/(L\\cos\\theta) = 10/(1.0 \\times \\cos 30^\\circ) = 10/0.866 = 11.55\\). \\(\\omega = 3.40\\) rad/s. \\(T = 2\\pi/\\omega = 1.85\\) s.'
        }
      ]
    },

    // ─── SECTION 4 ────────────────────────────────────────────────────────────
    {
      id: 'ch03-sec04',
      title: '4. Applications of Circular Motion',
      content: `
<h2>Applications of Circular Motion</h2>
<p class="section-roadmap"><em>In this section, you will apply circular motion principles to vertical circles, satellites in orbit, and other real-world scenarios. These problems combine centripetal force analysis with gravity and normal forces.</em></p>

<h3>Vertical Circular Motion</h3>
<p>When an object moves in a vertical circle (e.g., a roller coaster loop, a bucket of water swung overhead), the centripetal force equation must account for gravity, which acts differently at different positions.</p>

<h4>At the Top of the Loop</h4>
<p>Both weight and normal force point toward the center (downward):</p>
\\[
mg + N = \\frac{mv^2}{r}
\\]
<p>The <strong>minimum speed</strong> at the top occurs when \\(N = 0\\) (the object barely maintains contact):</p>
\\[
v_{\\min,\\text{top}} = \\sqrt{gr}
\\]

<h4>At the Bottom of the Loop</h4>
<p>Weight points downward (away from center) while normal force points upward (toward center):</p>
\\[
N - mg = \\frac{mv^2}{r} \\quad \\Rightarrow \\quad N = mg + \\frac{mv^2}{r}
\\]
<p>The normal force at the bottom is always greater than the weight, which is why you feel heavier at the bottom of a roller coaster loop.</p>

<div class="env-block example"><div class="env-title">Example: Roller Coaster Loop</div><div class="env-body">
<p>A roller coaster loop has radius 10 m. What is the minimum speed at the top so that passengers remain in their seats without a harness? (\\(g = 10\\,\\text{m/s}^2\\))</p>
<p><strong>Solution:</strong> \\(v_{\\min} = \\sqrt{gr} = \\sqrt{10 \\times 10} = 10\\) m/s = 36 km/h.</p>
<p>If the actual speed at the top is 14 m/s, the normal force is: \\(N = m(v^2/r - g) = m(196/10 - 10) = 9.6m\\) N, so the passenger feels about \\(0.98g\\) pressing them into the seat.</p>
</div></div>

<h3>Satellites and Orbits</h3>
<p>For a satellite in circular orbit around a planet of mass \\(M\\), gravity provides the centripetal force:</p>
\\[
\\frac{GMm}{r^2} = \\frac{mv^2}{r}
\\]
<p>This gives the orbital speed:</p>
\\[
v = \\sqrt{\\frac{GM}{r}}
\\]
<p>And the orbital period (from \\(v = 2\\pi r / T\\)):</p>
\\[
T = 2\\pi\\sqrt{\\frac{r^3}{GM}}
\\]

<div class="env-block remark"><div class="env-title">Key Insight: Mass Cancellation</div><div class="env-body"><p>The satellite mass \\(m\\) cancels out of the orbital equations. This means all objects at the same orbital radius orbit at the same speed, regardless of their mass. This is directly connected to the equivalence of gravitational and inertial mass.</p></div></div>

<h3>Apparent Weightlessness</h3>
<p>Astronauts in orbit are not beyond Earth's gravity (at 400 km altitude, \\(g\\) is still about 8.7 m/s\\(^2\\)). They feel "weightless" because they and their spacecraft are in free fall together, both accelerating toward Earth at the same rate. The normal force is zero, which is the sensation of weightlessness.</p>

<div class="viz-placeholder" data-viz="viz-vertical-circle"></div>

<div class="viz-placeholder" data-viz="viz-satellite-orbit"></div>

<div class="env-block intuition"><div class="env-title">Chapter Summary</div><div class="env-body">
<p>Circular motion is described by angular quantities (\\(\\theta\\), \\(\\omega\\), \\(T\\), \\(f\\)) linked to linear quantities by \\(v = r\\omega\\). Any object moving in a circle must have a centripetal acceleration \\(a_c = v^2/r\\) directed toward the center, which requires a net inward force \\(F_c = mv^2/r\\). The source of this force varies: friction on roads, tension in strings, gravity for satellites, normal force components on banked curves. Vertical circles require careful analysis of how gravity and contact forces combine at each position. These principles govern everything from car handling to orbital mechanics.</p>
</div></div>
`,
      visualizations: [
        {
          id: 'viz-vertical-circle',
          title: 'Vertical Circular Motion',
          description: 'Watch a ball move in a vertical circle. The green arrow shows the normal/tension force and the red arrow shows gravity. At the top, the minimum speed condition is highlighted. Adjust speed to see when the ball loses contact.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 400, scale: 1,
              originX: 0, originY: 0
            });
            let speedFactor = 1.5;
            const g = 9.8;
            const R = 100; // pixels
            const cx = 200, cy = 200;

            VizEngine.createSlider(controls, 'Speed factor', 0.5, 3.0, speedFactor, 0.1, val => { speedFactor = val; });

            viz.animate(function(time) {
              viz.clear();
              const ctx = viz.ctx;
              const rMeters = 2.0; // 2 m radius
              const vTop = speedFactor * Math.sqrt(g * rMeters);
              // Using energy conservation: v^2 = vTop^2 + 2g*r*(1+cos(angle))
              const t = time / 1000;
              // We parametrize by angle with non-uniform speed
              const omega0 = vTop / rMeters;
              // For simplicity, use approximate uniform speed (good enough for visualization)
              const avgOmega = omega0 * speedFactor;
              const angle = avgOmega * t;

              const px = cx + R * Math.sin(angle);
              const py = cy + R * Math.cos(angle);

              // Speed at current angle (using energy conservation from top)
              // height from top = R + R*cos(angle) = R(1 + cos(angle))
              const h = rMeters * (1 + Math.cos(angle));
              const v2 = vTop * vTop + 2 * g * h;
              const v = Math.sqrt(Math.max(v2, 0));

              // circle track
              ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

              // position markers
              ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Top', cx, cy - R - 10);
              ctx.fillText('Bottom', cx, cy + R + 18);
              ctx.fillText('Left', cx - R - 20, cy + 4);
              ctx.fillText('Right', cx + R + 20, cy + 4);

              // ball
              ctx.fillStyle = viz.colors.blue;
              ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();

              // weight (always down)
              const wLen = 40;
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + wLen); ctx.stroke();
              ctx.fillStyle = viz.colors.red; ctx.beginPath();
              ctx.moveTo(px, py + wLen); ctx.lineTo(px - 4, py + wLen - 7); ctx.lineTo(px + 4, py + wLen - 7);
              ctx.closePath(); ctx.fill();

              // Normal/tension force (toward center)
              const dirX = cx - px;
              const dirY = cy - py;
              const dirLen = Math.sqrt(dirX * dirX + dirY * dirY);
              const ux = dirX / dirLen, uy = dirY / dirLen;
              // N = m(v^2/r - g*cos(angle from top)) ... simplified
              const cosFromTop = Math.cos(angle);
              const accel = v * v / rMeters;
              const nForce = accel - g * cosFromTop; // N/m
              const nLen = Math.max(nForce * 3, 0);

              if (nLen > 1) {
                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + ux * nLen, py + uy * nLen); ctx.stroke();
                const nA = Math.atan2(uy * nLen, ux * nLen);
                ctx.fillStyle = viz.colors.green; ctx.beginPath();
                const ntx = px + ux * nLen, nty = py + uy * nLen;
                ctx.moveTo(ntx, nty);
                ctx.lineTo(ntx - 7 * Math.cos(nA - Math.PI / 6), nty - 7 * Math.sin(nA - Math.PI / 6));
                ctx.lineTo(ntx - 7 * Math.cos(nA + Math.PI / 6), nty - 7 * Math.sin(nA + Math.PI / 6));
                ctx.closePath(); ctx.fill();
              }

              // center dot
              ctx.fillStyle = viz.colors.white + '44';
              ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

              // info
              viz.screenText('v at top = ' + vTop.toFixed(1) + ' m/s', 440, 30, viz.colors.teal, 12);
              viz.screenText('v(min,top) = ' + Math.sqrt(g * rMeters).toFixed(1) + ' m/s', 440, 50, viz.colors.yellow, 12);
              viz.screenText('Current v = ' + v.toFixed(1) + ' m/s', 440, 70, viz.colors.blue, 12);
              viz.screenText('r = ' + rMeters.toFixed(1) + ' m', 440, 90, viz.colors.text, 12);

              // legend
              viz.screenText('mg (weight)', 440, 130, viz.colors.red, 11);
              viz.screenText('N (normal)', 440, 148, viz.colors.green, 11);

              if (vTop < Math.sqrt(g * rMeters) * 0.95) {
                viz.screenText('Too slow! Ball loses contact.', 440, 180, viz.colors.red, 12);
              } else if (vTop < Math.sqrt(g * rMeters) * 1.05) {
                viz.screenText('Critical speed! N \u2248 0 at top.', 440, 180, viz.colors.yellow, 12);
              } else {
                viz.screenText('N > 0 everywhere: safe.', 440, 180, viz.colors.green, 12);
              }
            });
            return viz;
          }
        },
        {
          id: 'viz-satellite-orbit',
          title: 'Satellite Orbit',
          description: 'A satellite orbits a planet. Gravity provides the centripetal force. Adjust the orbital radius to see how orbital speed and period change. The arrow shows the gravitational (centripetal) force.',
          setup(container, controls) {
            const viz = new VizEngine(container, {
              width: 560, height: 380, scale: 1,
              originX: 0, originY: 0
            });
            let orbRadius = 2.0; // in units where planet radius = 1
            const pcx = 220, pcy = 190;
            const planetR = 50; // pixels
            const G_M = 4000; // arbitrary constant GM for visual

            VizEngine.createSlider(controls, 'Orbit radius (R)', 1.3, 4.0, orbRadius, 0.1, val => { orbRadius = val; });

            viz.animate(function(time) {
              viz.clear();
              const ctx = viz.ctx;
              const t = time / 1000;
              const rPx = orbRadius * planetR;
              const v = Math.sqrt(G_M / rPx);
              const omega = v / rPx;
              const angle = omega * t;
              const period = 2 * Math.PI / omega;

              // stars
              ctx.fillStyle = viz.colors.white + '33';
              for (let i = 0; i < 30; i++) {
                const sx = (i * 97 + 13) % 560;
                const sy = (i * 53 + 7) % 380;
                ctx.beginPath(); ctx.arc(sx, sy, 1, 0, Math.PI * 2); ctx.fill();
              }

              // orbit path
              ctx.strokeStyle = viz.colors.axis + '88'; ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath(); ctx.arc(pcx, pcy, rPx, 0, Math.PI * 2); ctx.stroke();
              ctx.setLineDash([]);

              // planet
              const gradient = ctx.createRadialGradient(pcx - 10, pcy - 10, 5, pcx, pcy, planetR);
              gradient.addColorStop(0, '#4488ff');
              gradient.addColorStop(1, '#1144aa');
              ctx.fillStyle = gradient;
              ctx.beginPath(); ctx.arc(pcx, pcy, planetR, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
              ctx.fillText('M', pcx, pcy);

              // satellite
              const sx = pcx + rPx * Math.cos(angle);
              const sy = pcy - rPx * Math.sin(angle);
              ctx.fillStyle = viz.colors.orange;
              ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
              // solar panels
              ctx.fillStyle = viz.colors.teal + '88';
              ctx.fillRect(sx - 12, sy - 2, 6, 4);
              ctx.fillRect(sx + 6, sy - 2, 6, 4);

              // gravity vector (toward planet)
              const gdx = pcx - sx, gdy = pcy - sy;
              const gLen = Math.sqrt(gdx * gdx + gdy * gdy);
              const gux = gdx / gLen, guy = gdy / gLen;
              const fLen = Math.min(G_M / (rPx * rPx) * 500, 60);
              ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(sx, sy);
              ctx.lineTo(sx + gux * fLen, sy + guy * fLen); ctx.stroke();
              const gA = Math.atan2(guy * fLen, gux * fLen);
              ctx.fillStyle = viz.colors.red; ctx.beginPath();
              const gtx = sx + gux * fLen, gty = sy + guy * fLen;
              ctx.moveTo(gtx, gty);
              ctx.lineTo(gtx - 8 * Math.cos(gA - Math.PI / 6), gty - 8 * Math.sin(gA - Math.PI / 6));
              ctx.lineTo(gtx - 8 * Math.cos(gA + Math.PI / 6), gty - 8 * Math.sin(gA + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // velocity vector (tangent)
              const vLen = v * 3;
              const vvx = Math.sin(angle) * vLen;
              const vvy = Math.cos(angle) * vLen;
              ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(sx, sy);
              ctx.lineTo(sx + vvx, sy + vvy); ctx.stroke();
              const vA = Math.atan2(vvy, vvx);
              ctx.fillStyle = viz.colors.green; ctx.beginPath();
              const vtx = sx + vvx, vty = sy + vvy;
              ctx.moveTo(vtx, vty);
              ctx.lineTo(vtx - 8 * Math.cos(vA - Math.PI / 6), vty - 8 * Math.sin(vA - Math.PI / 6));
              ctx.lineTo(vtx - 8 * Math.cos(vA + Math.PI / 6), vty - 8 * Math.sin(vA + Math.PI / 6));
              ctx.closePath(); ctx.fill();

              // info
              viz.screenText('Satellite Orbit', 440, 25, viz.colors.white, 14);
              viz.screenText('r = ' + orbRadius.toFixed(1) + ' R', 440, 55, viz.colors.blue, 12);
              viz.screenText('v \u221D 1/\u221Ar', 440, 75, viz.colors.green, 12);
              viz.screenText('T \u221D r^(3/2)', 440, 95, viz.colors.teal, 12);
              viz.screenText('Period = ' + period.toFixed(1) + ' s (sim)', 440, 120, viz.colors.orange, 11);

              // formulas
              viz.screenText('v = \u221A(GM/r)', 440, 160, viz.colors.text, 11);
              viz.screenText('Fg = GMm/r\u00B2 = mv\u00B2/r', 440, 178, viz.colors.text, 11);

              // legend
              viz.screenText('Fg (gravity)', 440, 210, viz.colors.red, 11);
              viz.screenText('v (velocity)', 440, 228, viz.colors.green, 11);
            });
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'A bucket of water is swung in a vertical circle of radius 0.80 m. What is the minimum speed at the top so the water does not fall out? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'At the minimum speed, \\(N = 0\\) and gravity alone provides centripetal force.',
          solution: '\\(v_{\\min} = \\sqrt{gr} = \\sqrt{10 \\times 0.80} = \\sqrt{8} \\approx 2.83\\) m/s.'
        },
        {
          question: 'A 60 kg person rides a roller coaster loop of radius 8 m. At the bottom, the speed is 15 m/s. What is the normal force on the person? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'At the bottom: \\(N - mg = mv^2/r\\).',
          solution: '\\(N = mg + mv^2/r = 60(10 + 225/8) = 60(10 + 28.1) = 60 \\times 38.1 = 2288\\) N. This is about 3.8 times the person\'s weight (3.8g).'
        },
        {
          question: 'A satellite orbits Earth at a height where the orbital radius is \\(R = 6.4 \\times 10^6\\) m (just above the surface). Given \\(g = 9.8\\) m/s\\(^2\\) at the surface, estimate the orbital speed.',
          hint: 'At the surface, \\(g = GM/R^2\\), so \\(GM = gR^2\\). Use \\(v = \\sqrt{GM/R}\\).',
          solution: '\\(v = \\sqrt{GM/R} = \\sqrt{gR} = \\sqrt{9.8 \\times 6.4 \\times 10^6} = \\sqrt{6.27 \\times 10^7} \\approx 7920\\) m/s \\(\\approx 7.9\\) km/s.'
        },
        {
          question: 'A car drives over a hill that has a circular profile with radius 40 m at the top. What is the maximum speed so that the car stays on the road? (\\(g = 10\\,\\text{m/s}^2\\))',
          hint: 'At the top of the hill, \\(mg - N = mv^2/r\\). The car lifts off when \\(N = 0\\).',
          solution: 'When \\(N = 0\\): \\(mg = mv^2/r\\), so \\(v_{\\max} = \\sqrt{gr} = \\sqrt{10 \\times 40} = 20\\) m/s = 72 km/h.'
        },
        {
          question: 'Explain why astronauts on the International Space Station experience apparent weightlessness, even though they are still within Earth\'s gravitational field.',
          hint: 'Think about what "weight" actually means in terms of forces you can feel (contact forces).',
          solution: 'Astronauts feel weightless because both they and the space station are in free fall (orbiting Earth). They are all accelerating toward Earth at the same rate (the centripetal acceleration equals the gravitational acceleration at that altitude). Since there is no relative acceleration between the astronaut and the station, the normal force is zero. It is this absence of a contact force (not the absence of gravity) that creates the sensation of weightlessness.'
        }
      ]
    }
  ]
});
