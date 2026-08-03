import type { Metadata } from "next";

export const metadata: Metadata = { title: "shader" };

export default function Page() {
  return (
    <div className="" style={{ minHeight: "max(884px, 100dvh)" }}>

<div className="fixed inset-0 w-full h-full" style={{"display":"block"}}>
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
  );
}
