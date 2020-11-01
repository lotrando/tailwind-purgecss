'use strict';

/*
Copyright (c) 2018 Tobias Faller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// By: Chad Smith from http://detectmobilebrowsers.com/ under 'UNLICENSE'.
function isMobileDevice() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var simpleRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
    var fullRegex = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

    return (simpleRegex.test(userAgent) || fullRegex.test(userAgent.substr(0, 4)));
}

// Load only if regular desktop device is present
if (!isMobileDevice()) {
    (function () {
        // Configuration parameters
        //var colors = ['#4EE7dd', '#1ED1dd', '#36BBF7', '#00ddF7', '#0084F7', '#4148dd', '#001548', '#156157', '#121494', '#5CEDdd'];
        var speedFactor = 1.8;
        var rotationFactor = 0.04;
        var minSize = 2.5;
        var maxSize = 10.0;
        var alphaFactor = 0.5;
        var spawnFactor = 1;
        var dissolveFactor = 0.009;

        var starProb = 1.5;
        var circleProb = 0.1;
        var squareProb = 0.1;

        var hueStart = 360 * 5/24;
        var hueEnd = 360 * 12/24;

        // Global variables
        var loaded = false;
        var currentWith = -1;
        var currentHeight = -1;
        var currentFrame = 0;
        var mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var objects = [];

        var initScript = function initScript(e) {
            if (loaded) {
                return;
            }

            loaded = true;

            // Create canvas element to paint on and fix it to the background
            var canvas = document.createElement('canvas');
            canvas.style['position'] = 'fixed';
            canvas.style['left'] = '0';
            canvas.style['right'] = '0';
            canvas.style['top'] = '0';
            canvas.style['bottom'] = '0';
            canvas.style['z-index'] = '-1';
            document.body.prepend(canvas);

            var ctx = canvas.getContext('2d');

            // From https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
            // by Densi Tensy 4045078
            var drawStar = function drawStar(x, y, n, r, inset, phi) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(x, y);
                ctx.rotate(phi);
                ctx.moveTo(0, r);
                for (var i = 0; i < n; i++) {
                    ctx.rotate(Math.PI / n);
                    ctx.lineTo(0, (r*inset));
                    ctx.rotate(Math.PI / n);
                    ctx.lineTo(0, r);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            };

            var drawSquare = function drawSquare(x, y, size, phi) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(x, y);
                ctx.rotate(phi);
                ctx.moveTo(-size, -size);
                ctx.lineTo(size, -size);
                ctx.lineTo(size, size);
                ctx.lineTo(-size, size);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }

            var drawCircle = function drawCircle(x, y, r) {
                ctx.beginPath();
                ctx.ellipse(x - r, y - r, r, r, 0, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }

            var drawScreen = function drawScreen() {
                // Clear screen
                ctx.clearRect(0, 0, currentWith, currentHeight);

                for (var i = 0, l = objects.length; i < l; i++) {
                    var object = objects[i];
                    if (object.alpha > 0) {
                        object.alpha -= dissolveFactor;
                    }

                    // Exclude fully transparent (dissolved) objects
                    if (object.alpha <= 0) {
                        objects.splice(i, 1);
                        l--;
                        i--;
                        continue;
                    }

                    // Move and rotate
                    object.x += object.vx;
                    object.y += object.vy;
                    object.phi += object.omega;

                    // Apply color and alpha
                    ctx.globalAlpha = object.alpha;
                    ctx.fillStyle = object.color;

                    // Draw object
                    switch (object.type) {
                    case 'star':
                        drawStar(object.x, object.y, 5, object.size * 1.75, 0.5, object.phi);
                        break;
                    case 'square':
                        drawSquare(object.x, object.y, object.size, object.phi);
                        break;
                    case 'circle':
                        drawCircle(object.x, object.y, object.size);
                        break;
                    }
                    
                }
            };

            var hueToRGB = function hueToRGB(hue) {
                hue = Math.trunc(hue * 6 * 256 / 360);

                var r = 0;
                var g = 0;
                var b = 0;

                if (hue < 256) {
                    r = 255;
                    g = hue - 256;
                } else if (hue < 512) {
                    r = 255 - (hue - 256);
                    g = 255;
                } else if (hue < 768) {
                    g = 255;
                    b = hue - 512;
                } else if (hue < 1024) {
                    g = 255 - (hue - 768);
                    b = 255;
                } else if (hue < 1280) {
                    b = 255;
                    r = hue - 1024;
                } else {
                    b = 256 - (hue - 1280);
                    r = 255;
                }

                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }

            var generateColor = function generateColor() {
                return hueToRGB(hueStart + Math.random() * (hueEnd - hueStart));
            }

            var spawnParticle = function spawnParticle() {
                var obj = {
                    x: mousePosition.x,
                    y: mousePosition.y,
                    phi: Math.random() * 6.282,
                    vx: (Math.random() * 2 - 1) * speedFactor,
                    vy: (Math.random() * 2 - 1) * speedFactor,
                    omega: (Math.random() * 2 - 1) * rotationFactor,
                    alpha: (Math.random() * alphaFactor + (1 - alphaFactor)),
                    color: generateColor(),
                    //color: colors[Math.trunc(Math.random() * colors.length)],
                    size: (Math.random() * (maxSize - minSize)) + minSize
                };

                var rand = Math.random() * (starProb + circleProb + squareProb);
                if (rand <= starProb) {
                    obj["type"] = 'star';
                } else if (rand <= (circleProb + starProb)) {
                    obj["type"] = "circle";
                } else {
                    obj["type"] = "square";
                }

                objects.push(obj);
            }

            var resize = function resize() {
                currentWith = window.innerWidth;
                currentHeight = window.innerHeight;
                canvas.width = currentWith;
                canvas.height = currentHeight;
            };

            var draw = function draw() {
                requestAnimationFrame(draw);

                currentFrame++;
                if (currentFrame % spawnFactor == 0) {
                    spawnParticle();
                }

                drawScreen();
            };

            resize();
            draw();

            window.addEventListener('resize', resize);
            window.addEventListener('mousemove', function (e) {
                mousePosition.x = e.clientX;
                mousePosition.y = e.clientY;
            });
        };

        document.addEventListener("DOMContentLoaded", initScript);
        document.addEventListener('load', initScript);
    }) ();
}
