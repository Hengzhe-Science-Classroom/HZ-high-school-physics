window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Describing Motion',
    subtitle: 'The Language of Kinematics',
    sections: [
        // ============================================================
        // Section 1: Reference Frames & Position
        // ============================================================
        {
            id: 'reference-frames-position',
            title: 'Reference Frames & Position',
            content: `
                <h2>Reference Frames &amp; Position</h2>

                <div class="env-block intuition">
                    <div class="env-title">Welcome to Kinematics</div>
                    <div class="env-body"><p>Before we can study why things move (that is the job of dynamics), we must learn how to <em>describe</em> motion precisely. Kinematics is the branch of physics devoted to this task. In this chapter you will acquire the vocabulary, the graphs, and the mathematical tools that form the language of motion.</p></div>
                </div>

                <p>Imagine you are sitting on a train. To a fellow passenger, you are still. To a farmer watching from a field, you are rushing past at 120 km/h. Who is correct? Both of them! The answer depends on the <strong>reference frame</strong> each observer chooses.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Reference Frame)</div>
                    <div class="env-body"><p>A <strong>reference frame</strong> (or frame of reference) is a coordinate system attached to an observer. All positions and velocities are measured <em>relative</em> to this frame. Different frames may give different descriptions of the same motion.</p></div>
                </div>

                <p>To describe where an object is, we pick an origin and one or more axes. In one dimension a single number, the <strong>position</strong> \\(x\\), tells us the location of the object along the axis.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Position)</div>
                    <div class="env-body"><p>The <strong>position</strong> of an object is its location relative to a chosen origin. In one dimension we write it as \\(x\\), measured in metres (m).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-reference-frame"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A car is parked 30 m east of a traffic light. If we place the origin at the traffic light and let the positive direction point east, the car's position is \\(x = +30\\,\\text{m}\\). If instead we choose the car itself as the origin, the traffic light sits at \\(x = -30\\,\\text{m}\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Reference Frames Matter</div>
                    <div class="env-body"><p>Every measurement in physics is made relative to something. There is no absolute "position" floating in space. Choosing a convenient reference frame can make a problem much simpler. For most problems on the ground we attach the frame to the Earth, but in astronomy we might attach it to the Sun or the center of our galaxy.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Sign Convention</div>
                    <div class="env-body"><p>Once you pick a positive direction, stick with it throughout the problem. A negative position simply means the object is on the opposite side of the origin from the positive direction.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-reference-frame',
                    title: 'Interactive Reference Frames',
                    description: 'Drag the observer (orange dot) to change the reference frame. Watch how the position reading of the car changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 40, originX: 350, originY: 250 });

                        var observerX = 0;
                        var carX = 3;

                        var observer = viz.addDraggable('observer', observerX, 0, viz.colors.orange, 10, function(x) {
                            observer.x = Math.round(x * 2) / 2;
                            observer.y = 0;
                        });

                        var car = viz.addDraggable('car', carX, 0, viz.colors.blue, 10, function(x) {
                            car.x = Math.round(x * 2) / 2;
                            car.y = 0;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);

                            // Ground line
                            viz.drawGround(-8, -1, 8);

                            // Axes from observer
                            var ctx = viz.ctx;
                            var oScreen = viz.toScreen(observer.x, 0);
                            ctx.strokeStyle = viz.colors.orange + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(0, oScreen[1]);
                            ctx.lineTo(viz.width, oScreen[1]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Displacement vector from observer to car
                            var dx = car.x - observer.x;
                            if (Math.abs(dx) > 0.1) {
                                viz.drawVector(observer.x, 0.6, car.x, 0.6, viz.colors.teal, 'x = ' + dx.toFixed(1) + ' m');
                            }

                            // Car representation
                            var carS = viz.toScreen(car.x, 0);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(carS[0] - 20, carS[1] - 18, 40, 14);
                            ctx.fillRect(carS[0] - 12, carS[1] - 28, 24, 12);
                            ctx.fillStyle = viz.colors.text;
                            ctx.beginPath(); ctx.arc(carS[0] - 12, carS[1], 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(carS[0] + 12, carS[1], 5, 0, Math.PI * 2); ctx.fill();

                            viz.drawDraggables();

                            // Labels
                            viz.drawText('Observer', observer.x, 1.2, viz.colors.orange, 12);
                            viz.drawText('Car', car.x, 1.8, viz.colors.blue, 12);

                            // Info
                            viz.screenText('Position of car in observer frame: x = ' + dx.toFixed(1) + ' m', viz.width / 2, 24, viz.colors.white, 14);
                            viz.screenText('Drag the orange observer or blue car to explore', viz.width / 2, viz.height - 16, viz.colors.text, 11);

                            requestAnimationFrame(draw);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A cyclist is 15 m to the west of a lamppost. If west is the negative direction, what is the cyclist\'s position?',
                    hint: 'West is negative. Express the distance with a negative sign.',
                    solution: 'Since west is the negative direction, \\(x = -15\\,\\text{m}\\).'
                },
                {
                    question: 'Two students describe the same boat on a river. Student A, standing on the north bank, says the boat moves east. Student B, on a raft drifting east at the same speed as the boat, says the boat is stationary. Can both be correct? Explain.',
                    hint: 'Think about the reference frame each student uses.',
                    solution: 'Yes. In Student A\'s ground frame the boat moves east. In Student B\'s raft frame, both the raft and the boat have zero relative velocity, so the boat appears stationary. Different reference frames give different but equally valid descriptions.'
                },
                {
                    question: 'An origin is placed at the entrance of a 100 m hallway with the positive direction pointing into the hallway. A student stands at position \\(x = 60\\,\\text{m}\\). How far is the student from (a) the entrance and (b) the far end of the hallway?',
                    hint: 'Distance from the entrance is just \\(|x|\\). Distance from the far end is \\(|100 - x|\\).',
                    solution: '(a) Distance from entrance = \\(|60| = 60\\,\\text{m}\\). (b) Distance from far end = \\(|100 - 60| = 40\\,\\text{m}\\).'
                },
                {
                    question: 'Why is there no such thing as an "absolute position" in physics?',
                    hint: 'Consider what happens when you change the origin of your coordinate system.',
                    solution: 'Position is always measured relative to a chosen origin. Shifting the origin changes every position value, so there is no single "correct" position for an object; it depends on the reference frame.'
                },
                {
                    question: 'A helicopter hovers at a fixed point 200 m above the ground. Is it at rest or in motion? Discuss with respect to two different reference frames.',
                    hint: 'Consider the ground frame and the frame of the rotating Earth.',
                    solution: 'In the ground frame the helicopter is at rest (its position does not change). In the frame of a distant star, both the helicopter and the ground are moving because the Earth rotates and orbits the Sun. "At rest" depends on the reference frame.'
                }
            ]
        },

        // ============================================================
        // Section 2: Displacement & Distance
        // ============================================================
        {
            id: 'displacement-distance',
            title: 'Displacement & Distance',
            content: `
                <h2>Displacement &amp; Distance</h2>

                <p>When an object moves from one position to another, we can describe "how much" it moved in two ways: <strong>distance</strong> and <strong>displacement</strong>. These two quantities sound similar, but they carry very different information.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Distance)</div>
                    <div class="env-body"><p><strong>Distance</strong> is the total length of the path traveled. It is always non-negative and has no direction. Distance is a <strong>scalar</strong>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Displacement)</div>
                    <div class="env-body"><p><strong>Displacement</strong> is the change in position from start to finish:</p>
                    <p>\\[\\Delta x = x_f - x_i\\]</p>
                    <p>It has both magnitude and direction. Displacement is a <strong>vector</strong>.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>You walk 3 m east, then 4 m west. Your distance traveled is \\(3 + 4 = 7\\,\\text{m}\\). Your displacement is \\(3 - 4 = -1\\,\\text{m}\\) (1 m west of your start).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-displacement-distance"></div>

                <div class="env-block intuition">
                    <div class="env-title">Key Difference</div>
                    <div class="env-body"><p>Distance asks "how far did you walk in total?" Displacement asks "how far are you from where you started, and in which direction?" If you walk in a complete circle, your distance is the circumference but your displacement is zero.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Students often confuse distance and displacement. Remember: displacement can be negative (it has direction), while distance is always non-negative. If you retrace your steps, your distance increases but your displacement can decrease or even return to zero.</p></div>
                </div>

                <p>In general, for any trip with multiple segments, the distance is the sum of the absolute values of each leg, while the displacement is the algebraic sum (accounting for direction).</p>
            `,
            visualizations: [
                {
                    id: 'viz-displacement-distance',
                    title: 'Displacement vs. Distance',
                    description: 'Use the slider to move the object along a winding path. Compare the total distance traveled with the net displacement.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 35, originX: 350, originY: 200 });

                        // Path waypoints
                        var waypoints = [
                            { x: -6, y: 0 },
                            { x: -2, y: 2 },
                            { x: 2, y: -1 },
                            { x: 5, y: 1 },
                            { x: 3, y: -2 },
                            { x: -1, y: -1 }
                        ];

                        // Compute cumulative distances
                        var cumDist = [0];
                        for (var i = 1; i < waypoints.length; i++) {
                            var dx = waypoints[i].x - waypoints[i - 1].x;
                            var dy = waypoints[i].y - waypoints[i - 1].y;
                            cumDist.push(cumDist[i - 1] + Math.sqrt(dx * dx + dy * dy));
                        }
                        var totalPathLen = cumDist[cumDist.length - 1];

                        var progress = 0;
                        VizEngine.createSlider(controls, 'Progress', 0, 1, 0, 0.01, function(v) {
                            progress = v;
                        });

                        function getPositionAtProgress(t) {
                            var targetDist = t * totalPathLen;
                            for (var i = 1; i < cumDist.length; i++) {
                                if (targetDist <= cumDist[i]) {
                                    var segFrac = (targetDist - cumDist[i - 1]) / (cumDist[i] - cumDist[i - 1]);
                                    return {
                                        x: waypoints[i - 1].x + segFrac * (waypoints[i].x - waypoints[i - 1].x),
                                        y: waypoints[i - 1].y + segFrac * (waypoints[i].y - waypoints[i - 1].y)
                                    };
                                }
                            }
                            return { x: waypoints[waypoints.length - 1].x, y: waypoints[waypoints.length - 1].y };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);

                            // Draw full path (faded)
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i < waypoints.length; i++) {
                                var s = viz.toScreen(waypoints[i].x, waypoints[i].y);
                                if (i === 0) ctx.moveTo(s[0], s[1]);
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw traveled path
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var targetDist = progress * totalPathLen;
                            var s0 = viz.toScreen(waypoints[0].x, waypoints[0].y);
                            ctx.moveTo(s0[0], s0[1]);
                            for (var i = 1; i < waypoints.length; i++) {
                                if (cumDist[i] <= targetDist) {
                                    var si = viz.toScreen(waypoints[i].x, waypoints[i].y);
                                    ctx.lineTo(si[0], si[1]);
                                } else {
                                    var pos = getPositionAtProgress(progress);
                                    var sp = viz.toScreen(pos.x, pos.y);
                                    ctx.lineTo(sp[0], sp[1]);
                                    break;
                                }
                            }
                            ctx.stroke();

                            // Start point
                            viz.drawPoint(waypoints[0].x, waypoints[0].y, viz.colors.green, 'Start', 6);

                            // Current position
                            var pos = getPositionAtProgress(progress);
                            viz.drawPoint(pos.x, pos.y, viz.colors.orange, 'Now', 7);

                            // Displacement arrow
                            var dispX = pos.x - waypoints[0].x;
                            var dispY = pos.y - waypoints[0].y;
                            var dispMag = Math.sqrt(dispX * dispX + dispY * dispY);
                            if (dispMag > 0.2) {
                                viz.drawVector(waypoints[0].x, waypoints[0].y, pos.x, pos.y, viz.colors.blue, '', 2);
                            }

                            // Info box
                            var distTraveled = (progress * totalPathLen).toFixed(1);
                            viz.screenText('Distance traveled (path length): ' + distTraveled + ' units', viz.width / 2, 24, viz.colors.teal, 13);
                            viz.screenText('Displacement (straight line): ' + dispMag.toFixed(1) + ' units', viz.width / 2, 44, viz.colors.blue, 13);
                            viz.screenText('Displacement can never exceed distance!', viz.width / 2, viz.height - 16, viz.colors.text, 11);

                            requestAnimationFrame(draw);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A runner jogs 400 m around a circular track and returns to the starting point. What are (a) the distance traveled and (b) the displacement?',
                    hint: 'Think about the net change in position after a complete loop.',
                    solution: '(a) Distance = 400 m (the full lap). (b) Displacement = 0 m, because the runner ends at the starting position.'
                },
                {
                    question: 'A ball rolls 5 m to the right, then 2 m to the left. Calculate the distance and displacement (take rightward as positive).',
                    hint: 'Distance is total path length. Displacement is final minus initial position.',
                    solution: 'Distance = \\(5 + 2 = 7\\,\\text{m}\\). Displacement = \\(5 - 2 = +3\\,\\text{m}\\) (3 m to the right).'
                },
                {
                    question: 'Can the magnitude of displacement ever be greater than the distance traveled? Explain.',
                    hint: 'Consider the triangle inequality.',
                    solution: 'No. The shortest path between two points is a straight line, and displacement measures this straight-line distance. The actual path (distance) is always at least as long. Mathematically, \\(|\\Delta x| \\le d\\).'
                },
                {
                    question: 'An ant walks 10 cm north, then 10 cm east. Find the distance and the magnitude of the displacement.',
                    hint: 'Use the Pythagorean theorem for displacement magnitude.',
                    solution: 'Distance = \\(10 + 10 = 20\\,\\text{cm}\\). Displacement magnitude = \\(\\sqrt{10^2 + 10^2} = \\sqrt{200} \\approx 14.1\\,\\text{cm}\\), directed northeast.'
                },
                {
                    question: 'Under what condition are distance and displacement equal?',
                    hint: 'Think about what kind of path gives the shortest distance.',
                    solution: 'Distance equals the magnitude of displacement when the object moves in a straight line without reversing direction. Any backtracking or curving will make the distance greater.'
                }
            ]
        },

        // ============================================================
        // Section 3: Speed & Velocity
        // ============================================================
        {
            id: 'speed-velocity',
            title: 'Speed & Velocity',
            content: `
                <h2>Speed &amp; Velocity</h2>

                <p>Knowing <em>where</em> an object is matters, but we often want to know <em>how fast</em> it is moving and in which direction. This brings us to speed and velocity.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Average Speed)</div>
                    <div class="env-body"><p><strong>Average speed</strong> is the total distance traveled divided by the total time elapsed:</p>
                    <p>\\[\\text{average speed} = \\frac{\\text{distance}}{\\Delta t}\\]</p>
                    <p>It is a scalar (no direction) and is always non-negative.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Average Velocity)</div>
                    <div class="env-body"><p><strong>Average velocity</strong> is displacement divided by time:</p>
                    <p>\\[\\bar{v} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_f - x_i}{t_f - t_i}\\]</p>
                    <p>It is a vector: it has magnitude and direction (sign in 1D).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Instantaneous Velocity)</div>
                    <div class="env-body"><p><strong>Instantaneous velocity</strong> is the velocity at a single instant. Mathematically it is the limit of average velocity as \\(\\Delta t \\to 0\\):</p>
                    <p>\\[v = \\lim_{\\Delta t \\to 0}\\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt}\\]</p>
                    <p>The speedometer in a car reads the magnitude of instantaneous velocity, which is the instantaneous speed.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-velocity-demo"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A student walks 80 m east in 40 s, then 40 m west in 20 s.</p>
                        <p>Average speed = \\(\\frac{80 + 40}{40 + 20} = \\frac{120}{60} = 2\\,\\text{m/s}\\).</p>
                        <p>Average velocity = \\(\\frac{80 - 40}{60} = \\frac{40}{60} \\approx 0.67\\,\\text{m/s}\\) (east).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Average speed is <em>not</em> the magnitude of average velocity (except when the object moves in a straight line without turning around). Always compute them from their own definitions: speed from distance, velocity from displacement.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Scalar vs. Vector</div>
                    <div class="env-body"><p>Speed and velocity are related the same way distance and displacement are. Speed tells you "how fast," while velocity tells you "how fast and in which direction."</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-velocity-demo',
                    title: 'Speed vs. Velocity',
                    description: 'Watch an object move back and forth. The dashboard shows instantaneous and average values for both speed and velocity.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 40, originX: 350, originY: 220 });

                        var running = true;
                        VizEngine.createButton(controls, 'Play / Pause', function() { running = !running; });
                        VizEngine.createButton(controls, 'Reset', function() { tStart = null; totalDist = 0; startX = null; });

                        var tStart = null;
                        var totalDist = 0;
                        var prevX = null;
                        var startX = null;

                        function posAtTime(t) {
                            // Object moves: right for 2s, left for 1s, right for 2s
                            var T = t % 5;
                            if (T < 2) return -4 + 3 * T;
                            else if (T < 3) return 2 - 3 * (T - 2);
                            else return -1 + 2 * (T - 3);
                        }

                        viz.animate(function(timestamp) {
                            if (!tStart) { tStart = timestamp; startX = posAtTime(0); prevX = startX; }
                            var elapsed = running ? (timestamp - tStart) / 1000 : 0;
                            if (!running) { tStart = timestamp - elapsed * 1000; }

                            var x = posAtTime(elapsed);
                            if (prevX !== null) {
                                totalDist += Math.abs(x - prevX);
                            }
                            prevX = x;

                            var dt = elapsed || 0.001;
                            var displacement = x - startX;
                            var avgSpeed = totalDist / dt;
                            var avgVel = displacement / dt;
                            var h = 0.01;
                            var instVel = (posAtTime(elapsed + h) - posAtTime(elapsed - h)) / (2 * h);

                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes('x (m)', '');

                            // Ground
                            viz.drawGround(-8, -1.5, 8);

                            // Object
                            viz.drawMass(x, 0, 0.6, viz.colors.blue, '');
                            viz.drawPoint(x, 0, viz.colors.orange, '', 6);

                            // Start marker
                            viz.drawPoint(startX, 0, viz.colors.green, 'Start', 5);

                            // Velocity arrow
                            if (Math.abs(instVel) > 0.1) {
                                viz.drawVector(x, 0.8, x + instVel * 0.5, 0.8, viz.colors.red, 'v');
                            }

                            // Displacement arrow
                            if (Math.abs(displacement) > 0.2) {
                                viz.drawVector(startX, -0.8, x, -0.8, viz.colors.teal, '', 1.5);
                            }

                            // Dashboard
                            viz.screenText('t = ' + dt.toFixed(1) + ' s', 120, 24, viz.colors.white, 13);
                            viz.screenText('Inst. speed = ' + Math.abs(instVel).toFixed(2) + ' m/s', 120, 44, viz.colors.yellow, 12);
                            viz.screenText('Inst. velocity = ' + instVel.toFixed(2) + ' m/s', 120, 62, viz.colors.red, 12);
                            viz.screenText('Avg speed = ' + avgSpeed.toFixed(2) + ' m/s', 530, 24, viz.colors.yellow, 12);
                            viz.screenText('Avg velocity = ' + avgVel.toFixed(2) + ' m/s', 530, 44, viz.colors.teal, 12);
                            viz.screenText('Distance = ' + totalDist.toFixed(1) + ' m', 530, 62, viz.colors.text, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A car drives 150 km north in 2 hours, then 50 km south in 1 hour. Find (a) the average speed and (b) the average velocity.',
                    hint: 'Total distance = 150 + 50. Net displacement = 150 - 50 (northward). Total time = 3 h.',
                    solution: '(a) Average speed = \\(\\frac{150 + 50}{3} = \\frac{200}{3} \\approx 66.7\\,\\text{km/h}\\). (b) Average velocity = \\(\\frac{150 - 50}{3} = \\frac{100}{3} \\approx 33.3\\,\\text{km/h}\\) north.'
                },
                {
                    question: 'A sprinter runs 100 m in 10.0 s in a straight line. What is her average velocity? Is it the same as her average speed?',
                    hint: 'Straight-line motion with no reversal.',
                    solution: 'Average velocity = \\(\\frac{100}{10.0} = 10.0\\,\\text{m/s}\\) in the direction of motion. Since she moves in a straight line without turning back, her average speed also equals 10.0 m/s. In this special case, they are the same.'
                },
                {
                    question: 'Can an object have zero velocity but nonzero speed at some moment? Can an object have zero average velocity but nonzero average speed over some time interval?',
                    hint: 'Instantaneous speed is the magnitude of instantaneous velocity. Think about a round trip for the average case.',
                    solution: 'Instantaneous speed = |instantaneous velocity|, so if velocity is zero, speed is also zero at that instant. However, over a time interval, an object can return to its start (zero average velocity) while having traveled a nonzero distance (nonzero average speed).'
                },
                {
                    question: 'A particle moves along the x-axis. At \\(t = 0\\) it is at \\(x = 2\\,\\text{m}\\), and at \\(t = 5\\,\\text{s}\\) it is at \\(x = -3\\,\\text{m}\\). What is its average velocity?',
                    hint: 'Use \\(\\bar{v} = \\Delta x / \\Delta t\\).',
                    solution: '\\(\\bar{v} = \\frac{-3 - 2}{5 - 0} = \\frac{-5}{5} = -1\\,\\text{m/s}\\). The negative sign indicates motion in the negative x-direction.'
                },
                {
                    question: 'Explain why a speedometer in a car always shows a non-negative number, while a velocity-meter (if it existed) could show a negative number.',
                    hint: 'Think about what each quantity represents.',
                    solution: 'A speedometer shows instantaneous speed, which is the magnitude of velocity and therefore always \\(\\ge 0\\). A velocity reading includes direction (sign), so it could be negative when the car moves in the negative direction of the chosen axis.'
                }
            ]
        },

        // ============================================================
        // Section 4: Acceleration
        // ============================================================
        {
            id: 'acceleration',
            title: 'Acceleration',
            content: `
                <h2>Acceleration</h2>

                <p>Velocity tells us how position changes with time. But velocity itself can change. The rate at which velocity changes is called <strong>acceleration</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Average Acceleration)</div>
                    <div class="env-body"><p><strong>Average acceleration</strong> is the change in velocity divided by the time interval:</p>
                    <p>\\[\\bar{a} = \\frac{\\Delta v}{\\Delta t} = \\frac{v_f - v_i}{t_f - t_i}\\]</p>
                    <p>Its SI unit is metres per second squared (\\(\\text{m/s}^2\\)).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Instantaneous Acceleration)</div>
                    <div class="env-body"><p><strong>Instantaneous acceleration</strong> is the limit as \\(\\Delta t \\to 0\\):</p>
                    <p>\\[a = \\lim_{\\Delta t \\to 0}\\frac{\\Delta v}{\\Delta t} = \\frac{dv}{dt}\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-acceleration-demo"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A car accelerates from rest (\\(v_i = 0\\)) to \\(v_f = 20\\,\\text{m/s}\\) in 5 s.</p>
                        <p>\\[\\bar{a} = \\frac{20 - 0}{5} = 4\\,\\text{m/s}^2\\]</p>
                        <p>This means the car gains 4 m/s of speed every second.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Positive vs. Negative Acceleration</div>
                    <div class="env-body"><p>Positive acceleration does <em>not</em> always mean speeding up. If an object moves in the negative direction and has positive acceleration, it is actually slowing down. What matters is whether \\(a\\) and \\(v\\) have the same sign:</p>
                    <ul>
                        <li>Same sign: the object speeds up.</li>
                        <li>Opposite signs: the object slows down (decelerates).</li>
                    </ul></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Deceleration Misconception</div>
                    <div class="env-body"><p>"Deceleration" is informal language for slowing down. In physics, we simply say the acceleration is in the opposite direction to the velocity. Avoid thinking that deceleration always means negative acceleration; a car moving in the negative direction that slows down has <em>positive</em> acceleration.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Units</div>
                    <div class="env-body"><p>The unit \\(\\text{m/s}^2\\) can be read as "metres per second, per second." Each second, the velocity changes by some number of metres per second.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-acceleration-demo',
                    title: 'Acceleration Explorer',
                    description: 'Adjust the acceleration slider and watch how the velocity and position of the object change over time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 30, originX: 100, originY: 250 });

                        var accel = 2;
                        var v0 = 0;
                        var running = false;
                        var t = 0;

                        VizEngine.createSlider(controls, 'a (m/s^2)', -5, 5, 2, 0.5, function(v) { accel = v; });
                        VizEngine.createSlider(controls, 'v0 (m/s)', -5, 5, 0, 0.5, function(v) { v0 = v; });
                        VizEngine.createButton(controls, 'Start', function() { running = true; });
                        VizEngine.createButton(controls, 'Stop', function() { running = false; });
                        VizEngine.createButton(controls, 'Reset', function() { running = false; t = 0; });

                        var lastTime = null;

                        viz.animate(function(timestamp) {
                            if (lastTime === null) lastTime = timestamp;
                            var dt = (timestamp - lastTime) / 1000;
                            lastTime = timestamp;

                            if (running) {
                                t += dt;
                                if (t > 8) { t = 0; }
                            }

                            var v = v0 + accel * t;
                            var x = v0 * t + 0.5 * accel * t * t;

                            viz.clear();

                            // Draw number line for position
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(40, viz.originY);
                            ctx.lineTo(viz.width - 20, viz.originY);
                            ctx.stroke();

                            // Tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var m = 0; m <= 18; m += 2) {
                                var sx = viz.originX + m * viz.scale;
                                if (sx > viz.width - 10) break;
                                ctx.beginPath();
                                ctx.moveTo(sx, viz.originY - 4);
                                ctx.lineTo(sx, viz.originY + 4);
                                ctx.stroke();
                                ctx.fillText(m + ' m', sx, viz.originY + 8);
                            }

                            // Object on the number line
                            var objScreenX = viz.originX + x * viz.scale;
                            if (objScreenX > 40 && objScreenX < viz.width - 20) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(objScreenX, viz.originY, 12, 0, Math.PI * 2);
                                ctx.fill();

                                // Velocity arrow
                                if (Math.abs(v) > 0.2) {
                                    var arrowLen = v * 8;
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 3;
                                    ctx.beginPath();
                                    ctx.moveTo(objScreenX, viz.originY - 25);
                                    ctx.lineTo(objScreenX + arrowLen, viz.originY - 25);
                                    ctx.stroke();
                                    // Arrowhead
                                    var dir = v > 0 ? 1 : -1;
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.moveTo(objScreenX + arrowLen, viz.originY - 25);
                                    ctx.lineTo(objScreenX + arrowLen - dir * 8, viz.originY - 30);
                                    ctx.lineTo(objScreenX + arrowLen - dir * 8, viz.originY - 20);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // Acceleration arrow
                                if (Math.abs(accel) > 0.2) {
                                    var aLen = accel * 6;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(objScreenX, viz.originY - 45);
                                    ctx.lineTo(objScreenX + aLen, viz.originY - 45);
                                    ctx.stroke();
                                    var aDir = accel > 0 ? 1 : -1;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.moveTo(objScreenX + aLen, viz.originY - 45);
                                    ctx.lineTo(objScreenX + aLen - aDir * 6, viz.originY - 49);
                                    ctx.lineTo(objScreenX + aLen - aDir * 6, viz.originY - 41);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Legend
                            viz.screenText('v (red arrow)    a (orange arrow)', viz.width / 2, viz.originY + 40, viz.colors.text, 11);

                            // Dashboard
                            viz.screenText('t = ' + t.toFixed(2) + ' s', 120, 30, viz.colors.white, 14);
                            viz.screenText('v = ' + v.toFixed(2) + ' m/s', 120, 52, viz.colors.red, 13);
                            viz.screenText('x = ' + x.toFixed(2) + ' m', 120, 72, viz.colors.blue, 13);
                            viz.screenText('a = ' + accel.toFixed(1) + ' m/s\u00B2', 120, 92, viz.colors.orange, 13);

                            // Speeding up or slowing down?
                            var status = '';
                            if (Math.abs(v) < 0.1) {
                                status = 'Momentarily at rest';
                            } else if (v * accel > 0) {
                                status = 'Speeding up';
                            } else if (v * accel < 0) {
                                status = 'Slowing down';
                            } else {
                                status = 'Constant velocity';
                            }
                            viz.screenText(status, viz.width / 2, 115, viz.colors.yellow, 14);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bicycle goes from 2 m/s to 8 m/s in 3 s. What is the average acceleration?',
                    hint: 'Use \\(\\bar{a} = \\Delta v / \\Delta t\\).',
                    solution: '\\(\\bar{a} = \\frac{8 - 2}{3} = \\frac{6}{3} = 2\\,\\text{m/s}^2\\).'
                },
                {
                    question: 'A car moving at 25 m/s brakes to a stop in 5 s. Find the average acceleration.',
                    hint: 'Final velocity is zero. Determine the sign.',
                    solution: '\\(\\bar{a} = \\frac{0 - 25}{5} = -5\\,\\text{m/s}^2\\). The negative sign indicates the acceleration opposes the direction of motion (braking).'
                },
                {
                    question: 'An object moves in the negative x-direction at \\(v = -10\\,\\text{m/s}\\). It has an acceleration of \\(a = +2\\,\\text{m/s}^2\\). Is the object speeding up or slowing down?',
                    hint: 'Compare the signs of \\(v\\) and \\(a\\).',
                    solution: 'Since \\(v\\) is negative and \\(a\\) is positive, they have opposite signs. The object is slowing down; it will eventually stop and then begin moving in the positive direction if the acceleration continues.'
                },
                {
                    question: 'What is the physical meaning of \\(a = 3\\,\\text{m/s}^2\\)?',
                    hint: 'Read the unit carefully.',
                    solution: 'It means the velocity increases by 3 m/s every second. After 1 s the velocity is 3 m/s larger than before; after 2 s it is 6 m/s larger, and so on.'
                },
                {
                    question: 'Can an object have a nonzero acceleration at an instant when its velocity is zero? Give an example.',
                    hint: 'Think about a ball thrown straight up at the highest point of its trajectory.',
                    solution: 'Yes. A ball thrown upward has \\(v = 0\\) at the top of its arc, but its acceleration is \\(-9.8\\,\\text{m/s}^2\\) (downward due to gravity) at every instant, including the top. The velocity is momentarily zero but is changing from upward to downward.'
                }
            ]
        },

        // ============================================================
        // Section 5: Motion Graphs
        // ============================================================
        {
            id: 'motion-graphs',
            title: 'Motion Graphs',
            content: `
                <h2>Motion Graphs</h2>

                <p>Graphs are one of the most powerful tools in kinematics. A well-drawn graph can reveal at a glance whether an object is speeding up, slowing down, moving forward or backward, or standing still.</p>

                <h3>Position-Time Graphs (x-t)</h3>

                <div class="env-block intuition">
                    <div class="env-title">Reading an x-t Graph</div>
                    <div class="env-body">
                        <ul>
                            <li>The <strong>slope</strong> of an x-t graph at any point equals the <strong>velocity</strong> at that instant.</li>
                            <li>A straight line means constant velocity.</li>
                            <li>A curve means the velocity is changing (the object is accelerating).</li>
                            <li>A horizontal line means the object is at rest.</li>
                        </ul>
                    </div>
                </div>

                <h3>Velocity-Time Graphs (v-t)</h3>

                <div class="env-block intuition">
                    <div class="env-title">Reading a v-t Graph</div>
                    <div class="env-body">
                        <ul>
                            <li>The <strong>slope</strong> of a v-t graph equals the <strong>acceleration</strong>.</li>
                            <li>The <strong>area under the curve</strong> (between the graph and the time axis) equals the <strong>displacement</strong>.</li>
                            <li>Area above the time axis is positive displacement; area below is negative.</li>
                        </ul>
                    </div>
                </div>

                <h3>Acceleration-Time Graphs (a-t)</h3>

                <div class="env-block intuition">
                    <div class="env-title">Reading an a-t Graph</div>
                    <div class="env-body">
                        <ul>
                            <li>The area under an a-t graph gives the <strong>change in velocity</strong>.</li>
                            <li>A horizontal line at \\(a = 0\\) means constant velocity.</li>
                            <li>A horizontal line at \\(a \\ne 0\\) means constant (uniform) acceleration.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-motion-graphs"></div>

                <div class="env-block theorem">
                    <div class="env-title">Connections Between Graphs</div>
                    <div class="env-body">
                        <p>The three motion graphs are deeply connected:</p>
                        <ul>
                            <li>Slope of x-t = v</li>
                            <li>Slope of v-t = a</li>
                            <li>Area under v-t = \\(\\Delta x\\)</li>
                            <li>Area under a-t = \\(\\Delta v\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Reading a v-t Graph</div>
                    <div class="env-body">
                        <p>A v-t graph shows a straight line from \\(v = 0\\) at \\(t = 0\\) to \\(v = 10\\,\\text{m/s}\\) at \\(t = 5\\,\\text{s}\\).</p>
                        <p>Acceleration = slope = \\(\\frac{10 - 0}{5 - 0} = 2\\,\\text{m/s}^2\\).</p>
                        <p>Displacement = area of triangle = \\(\\frac{1}{2} \\times 5 \\times 10 = 25\\,\\text{m}\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Graph Pitfall</div>
                    <div class="env-body"><p>Do not confuse the shape of a graph with the path of the object! An x-t graph that curves upward does not mean the object moves in a curve; it means the object moves along a straight line with increasing speed.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-motion-graphs',
                    title: 'Motion Graph Plotter',
                    description: 'Choose a motion type and see all three graphs (x-t, v-t, a-t) update simultaneously alongside an animation of the object.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 440, scale: 1, originX: 0, originY: 0 });

                        var mode = 0; // 0: constant v, 1: constant a, 2: braking, 3: back-and-forth
                        var modes = ['Constant Velocity', 'Constant Acceleration', 'Braking to Stop', 'Back and Forth'];
                        var modeIdx = 0;

                        VizEngine.createButton(controls, 'Next Motion Type', function() {
                            modeIdx = (modeIdx + 1) % modes.length;
                            mode = modeIdx;
                        });

                        // Motion functions returning {x, v, a} at time t (0 to 5)
                        function getMotion(t, m) {
                            switch (m) {
                                case 0: // constant velocity
                                    return { x: 2 * t, v: 2, a: 0 };
                                case 1: // constant acceleration from rest
                                    return { x: 0.5 * 1.5 * t * t, v: 1.5 * t, a: 1.5 };
                                case 2: // braking: v0=8, a=-2
                                    var tt = Math.min(t, 4);
                                    return { x: 8 * tt - 0.5 * 2 * tt * tt, v: Math.max(8 - 2 * t, 0), a: t <= 4 ? -2 : 0 };
                                case 3: // back and forth: v0=4, a=-2
                                    return { x: 4 * t - 0.5 * 2 * t * t, v: 4 - 2 * t, a: -2 };
                                default:
                                    return { x: 0, v: 0, a: 0 };
                            }
                        }

                        var tCurrent = 0;
                        var lastTS = null;

                        viz.animate(function(timestamp) {
                            if (!lastTS) lastTS = timestamp;
                            var dt = (timestamp - lastTS) / 1000;
                            lastTS = timestamp;
                            tCurrent += dt * 0.5;
                            if (tCurrent > 5) tCurrent = 0;

                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Motion Type: ' + modes[mode], W / 2, 20);

                            // Layout: top strip for animation, then 3 graphs side by side
                            var animY = 35;
                            var animH = 60;
                            var graphTop = animY + animH + 15;
                            var graphH = (H - graphTop - 30) ;
                            var graphW = (W - 60) / 3;
                            var graphMarginX = 20;

                            // --- Animation strip ---
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(40, animY + animH);
                            ctx.lineTo(W - 20, animY + animH);
                            ctx.stroke();

                            // Position range: 0 to 20
                            var xMax = 20;
                            var state = getMotion(tCurrent, mode);
                            var objSX = 40 + (state.x / xMax) * (W - 60);
                            objSX = Math.max(40, Math.min(W - 20, objSX));
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(objSX, animY + animH - 10, 8, 0, Math.PI * 2);
                            ctx.fill();

                            // Ticks on animation strip
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var m = 0; m <= xMax; m += 5) {
                                var tx = 40 + (m / xMax) * (W - 60);
                                ctx.fillText(m + ' m', tx, animY + animH + 12);
                            }

                            // --- Helper to draw a graph ---
                            function drawGraph(gx, gy, gw, gh, label, yLabel, color, dataFn, yMin, yMax) {
                                // Background
                                ctx.fillStyle = '#0f0f28';
                                ctx.fillRect(gx, gy, gw, gh);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(gx, gy, gw, gh);

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                // x axis at y=0 if within range
                                var zeroY = gy + gh - (0 - yMin) / (yMax - yMin) * gh;
                                if (zeroY > gy && zeroY < gy + gh) {
                                    ctx.beginPath();
                                    ctx.moveTo(gx, zeroY);
                                    ctx.lineTo(gx + gw, zeroY);
                                    ctx.stroke();
                                }

                                // Labels
                                ctx.fillStyle = color;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(label, gx + gw / 2, gy - 4);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(yMax.toFixed(0), gx - 3, gy + 10);
                                ctx.fillText(yMin.toFixed(0), gx - 3, gy + gh);
                                ctx.textAlign = 'center';
                                ctx.fillText('t(s)', gx + gw, gy + gh + 12);
                                ctx.textAlign = 'left';
                                ctx.fillText(yLabel, gx + 2, gy + 12);

                                // Plot
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var steps = 100;
                                for (var i = 0; i <= steps; i++) {
                                    var tt = (i / steps) * 5;
                                    var val = dataFn(tt);
                                    var px = gx + (tt / 5) * gw;
                                    var py = gy + gh - (val - yMin) / (yMax - yMin) * gh;
                                    py = Math.max(gy, Math.min(gy + gh, py));
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Current point
                                var curVal = dataFn(tCurrent);
                                var cpx = gx + (tCurrent / 5) * gw;
                                var cpy = gy + gh - (curVal - yMin) / (yMax - yMin) * gh;
                                cpy = Math.max(gy, Math.min(gy + gh, cpy));
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.arc(cpx, cpy, 4, 0, Math.PI * 2);
                                ctx.fill();

                                // Value readout
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(curVal.toFixed(1), cpx + 6, cpy - 6);
                            }

                            // Determine y ranges
                            var xRange = [0, 20], vRange = [-6, 10], aRange = [-4, 4];
                            if (mode === 0) { xRange = [0, 12]; vRange = [-1, 4]; aRange = [-2, 2]; }
                            if (mode === 1) { xRange = [0, 20]; vRange = [0, 8]; aRange = [-1, 3]; }
                            if (mode === 2) { xRange = [0, 18]; vRange = [-1, 10]; aRange = [-4, 2]; }
                            if (mode === 3) { xRange = [-6, 6]; vRange = [-8, 6]; aRange = [-4, 1]; }

                            drawGraph(graphMarginX, graphTop, graphW, graphH, 'x-t (Position)', 'x(m)', viz.colors.blue,
                                function(t) { return getMotion(t, mode).x; }, xRange[0], xRange[1]);
                            drawGraph(graphMarginX + graphW + 10, graphTop, graphW, graphH, 'v-t (Velocity)', 'v(m/s)', viz.colors.red,
                                function(t) { return getMotion(t, mode).v; }, vRange[0], vRange[1]);
                            drawGraph(graphMarginX + 2 * (graphW + 10), graphTop, graphW, graphH, 'a-t (Acceleration)', 'a(m/s\u00B2)', viz.colors.orange,
                                function(t) { return getMotion(t, mode).a; }, aRange[0], aRange[1]);

                            // Time readout
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('t = ' + tCurrent.toFixed(2) + ' s', W / 2, H - 6);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'An x-t graph shows a straight line with a positive slope. What does this tell you about the velocity and acceleration?',
                    hint: 'The slope of an x-t graph is the velocity.',
                    solution: 'A straight line with positive slope means constant positive velocity. Since the velocity is constant, the acceleration is zero.'
                },
                {
                    question: 'A v-t graph shows a horizontal line at \\(v = -3\\,\\text{m/s}\\) for 4 s. Find (a) the acceleration and (b) the displacement during this interval.',
                    hint: 'Slope gives acceleration. Area (with sign) gives displacement.',
                    solution: '(a) Acceleration = slope = 0 (horizontal line). (b) Displacement = area = \\((-3)(4) = -12\\,\\text{m}\\). The object moves 12 m in the negative direction.'
                },
                {
                    question: 'A v-t graph is a straight line from \\((0, 4)\\) to \\((4, -4)\\). Find the acceleration and the time at which the object is momentarily at rest.',
                    hint: 'The object is at rest when \\(v = 0\\). Use the slope formula.',
                    solution: 'Acceleration = \\(\\frac{-4 - 4}{4 - 0} = -2\\,\\text{m/s}^2\\). The object is at rest when \\(v = 0\\): \\(4 + (-2)t = 0 \\implies t = 2\\,\\text{s}\\).'
                },
                {
                    question: 'On an x-t graph, how would you distinguish an object moving forward at constant speed from one that is accelerating forward?',
                    hint: 'Think about what straight vs. curved lines mean on an x-t graph.',
                    solution: 'Constant speed: straight line (constant slope). Accelerating forward: upward-curving line (increasing slope). Both go "up and to the right," but the accelerating object\'s graph bends.'
                },
                {
                    question: 'A v-t graph has a triangular shape: v increases linearly from 0 to 6 m/s over 3 s, then decreases linearly back to 0 over the next 3 s. What is the total displacement?',
                    hint: 'Area of the triangle = \\(\\frac{1}{2} \\times \\text{base} \\times \\text{height}\\). Here the "triangle" has base 6 s and height 6 m/s.',
                    solution: 'The area under the v-t graph is the displacement. The shape is a triangle with base = 6 s and height = 6 m/s: displacement = \\(\\frac{1}{2}(6)(6) = 18\\,\\text{m}\\).'
                }
            ]
        }
    ]
});
