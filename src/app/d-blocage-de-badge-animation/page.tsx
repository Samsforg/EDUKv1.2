import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Badge Débloqué" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen overflow-hidden flex flex-col items-center justify-center" style={{ minHeight: "max(884px, 100dvh)" }}>

<div className="fixed inset-0 z-0 opacity-20 pointer-events-none select-none">
<div className="p-margin-mobile">
<div className="h-16 w-full bg-surface-container rounded-xl mb-gutter"></div>
<div className="grid grid-cols-1 gap-gutter">
<div className="h-40 bg-surface-container rounded-xl"></div>
<div className="h-40 bg-surface-container rounded-xl"></div>
<div className="h-40 bg-surface-container rounded-xl"></div>
</div>
</div>
</div>

<div className="fixed inset-0 z-[100] bg-surface/80 backdrop-blur-md flex flex-col items-center justify-center p-margin-mobile" id="overlay">

<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden shader-container">

<div className="w-[120%] h-[120%] sm:w-[80%] sm:h-[80%] opacity-60" style={{"display":"block"}}>
<canvas id="shader-canvas-ANIMATION_26" style={{"display":"block","width":"100%","height":"100%"}}></canvas>
<script>
(function() &#123;
  const canvas = document.getElementById('shader-canvas-ANIMATION_26');

  // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
  // This fires on initial layout and whenever the element is resized.
  function syncSize() &#123;
    const w = canvas.clientWidth  || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) &#123;
      canvas.width  = w;
      canvas.height = h;
    &#125;
  &#125;
  if (typeof ResizeObserver !== 'undefined') &#123;
    new ResizeObserver(syncSize).observe(canvas);
  &#125;
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() &#123;
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
&#125;`;
  const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) &#123;
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
&#125;

void main() &#123;
    vec2 uv = (v_texCoord - 0.5) * u_resolution.xy / min(u_resolution.x, u_resolution.y);
    float dist = length(uv);
    
    // Core glow
    float glow = 0.05 / (dist + 0.01);
    glow *= smoothstep(0.5, 0.2, dist);
    
    // Sparkling particles
    float sparkles = 0.0;
    for(float i = 0.0; i &lt; 8.0; i++) &#123;
        float angle = i * 0.785 + u_time * 0.2;
        vec2 p = vec2(cos(angle), sin(angle)) * (0.2 + 0.1 * sin(u_time + i));
        float s = 0.002 / length(uv - p);
        sparkles += s * step(0.5, hash(vec2(i, floor(u_time * 2.0))));
    &#125;
    
    // Light rays
    float rays = 0.0;
    float angle = atan(uv.y, uv.x);
    rays = pow(abs(sin(angle * 6.0 + u_time)), 10.0) * (0.1 / dist);
    
    vec3 color = vec3(0.0, 0.28, 0.67); // Edukora Blue #0047ab
    vec3 accent = vec3(1.0, 0.84, 0.0); // Gold
    
    vec3 finalColor = color * glow + accent * (sparkles + rays * 0.3);
    float alpha = clamp(glow + sparkles + rays, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, alpha * smoothstep(1.0, 0.0, dist * 2.0));
&#125;`;
  function cs(type, src) &#123;
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  &#125;
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  // u_mouse is in pixel coordinates matching u_resolution (ShaderToy convention).
  // Shaders that need normalized coords should use: u_mouse / u_resolution.
  let mouse = &#123; x: canvas.width / 2, y: canvas.height / 2 &#125;;
  window.addEventListener('mousemove', (event) =&gt; &#123;
    const rect = canvas.getBoundingClientRect();
    if (rect.width &amp;&amp; rect.height) &#123;
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = 1.0 - (event.clientY - rect.top) / rect.height;
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    &#125;
  &#125;);

  function render(t) &#123;
    if (typeof ResizeObserver === 'undefined') syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  &#125;
  render(0);
&#125;)();
</script>
</div>

</div>

<div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

<div className="relative mb-stack-lg animate-badge-pop">
<div className="animate-float">
<img alt="Badge Excellence" className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-2xl" src="/images/ecran-093.png" />
</div>

<div className="absolute -top-4 -right-4 text-secondary-container animate-pulse">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
</div>
<div className="absolute -bottom-2 -left-6 text-tertiary-fixed-dim animate-pulse delay-700">
<span className="material-symbols-outlined text-[40px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
</div>

<h1 className="font-headline-md text-headline-md text-primary mb-stack-sm animate-fade-in-up">
                Félicitations !
            </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg animate-fade-in-up" style={{"animationDelay":"0.5s"}}>
                Tu as débloqué le badge Excellence
            </p>

<div className="flex gap-gutter mb-stack-lg animate-fade-in-up" style={{"animationDelay":"0.6s"}}>
<div className="flex items-center gap-base px-4 py-2 bg-primary-container/10 border border-primary-container/20 rounded-full">
<span className="material-symbols-outlined text-primary text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
<span className="font-label-sm text-label-sm text-primary">+500 XP</span>
</div>
<div className="flex items-center gap-base px-4 py-2 bg-tertiary-container/10 border border-tertiary-container/20 rounded-full">
<span className="material-symbols-outlined text-tertiary-container text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
<span className="font-label-sm text-label-sm text-tertiary-container">Série : 7 jours</span>
</div>
</div>

<button className="w-full sm:w-auto px-12 py-4 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full shadow-lg hover:bg-secondary transition-all active:scale-95 animate-fade-in-up" style={{"animationDelay":"0.7s"}}>
                Continuer
            </button>
</div>

<script>
            // Simple confetti particle system for extra polish
            function createConfetti() &#123;
                const colors = ['#00327d', '#fd8100', '#005934', '#ffdcc6'];
                for (let i = 0; i &lt; 50; i++) &#123;
                    const particle = document.createElement('div');
                    const size = Math.random() * 8 + 4;
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.position = 'absolute';
                    particle.style.borderRadius = Math.random() &gt; 0.5 ? '50%' : '2px';
                    particle.style.left = '50%';
                    particle.style.top = '50%';
                    particle.style.zIndex = '50';
                    particle.style.pointerEvents = 'none';
                    
                    document.body.appendChild(particle);

                    const destinationX = (Math.random() - 0.5) * window.innerWidth * 0.8;
                    const destinationY = (Math.random() - 0.5) * window.innerHeight * 0.8;
                    const rotation = Math.random() * 720;

                    const animation = particle.animate([
                        &#123; transform: `translate(-50%, -50%) scale(0) rotate(0deg)`, opacity: 1 &#125;,
                        &#123; transform: `translate(calc(-50% + $&#123;destinationX&#125;px), calc(-50% + $&#123;destinationY&#125;px)) scale(1) rotate($&#123;rotation&#125;deg)`, opacity: 0 &#125;
                    ], &#123;
                        duration: 1000 + Math.random() * 1000,
                        easing: 'cubic-bezier(0, .9, .57, 1)',
                        fill: 'forwards'
                    &#125;);

                    animation.onfinish = () =&gt; particle.remove();
                &#125;
            &#125;
            
            // Run on load
            window.addEventListener('load', () =&gt; &#123;
                setTimeout(createConfetti, 300);
            &#125;);
        </script>
</div>

    </div>
  );
}
