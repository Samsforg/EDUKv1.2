import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Session Terminée" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-hidden h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>
<canvas height="884" id="confetti-canvas" width="390"></canvas>

<header className="h-16 flex items-center px-margin-mobile z-20">
<button aria-label="Fermer" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-90">
<span className="material-symbols-outlined text-on-surface-variant">close</span>
</button>
</header>

<main className="flex-1 overflow-y-auto px-margin-mobile pb-32 relative z-10 flex flex-col items-center"><div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden shader-container z-0">
<div className="w-[120%] h-[120%] sm:w-[80%] sm:h-[80%] opacity-60" style={{"display":"block"}}>
<canvas height="984" id="shader-canvas-ANIMATION_26" style={{"display":"block","width":"100%","height":"100%"}} width="390"></canvas>
<script>
(function() &#123;
  const canvas = document.getElementById('shader-canvas-ANIMATION_26');
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
  const vs = `attribute vec2 a_position;\nvarying vec2 v_texCoord;\nvoid main() &#123;\n  v_texCoord = a_position * 0.5 + 0.5;\n  gl_Position = vec4(a_position, 0.0, 1.0);\n&#125;`;
  const fs = `precision highp float;\nvarying vec2 v_texCoord;\nuniform float u_time;\nuniform vec2 u_resolution;\nfloat hash(vec2 p) &#123; p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); &#125;\nvoid main() &#123;\n    vec2 uv = (v_texCoord - 0.5) * u_resolution.xy / min(u_resolution.x, u_resolution.y);\n    float dist = length(uv);\n    float glow = 0.05 / (dist + 0.01);\n    glow *= smoothstep(0.5, 0.2, dist);\n    float sparkles = 0.0;\n    for(float i = 0.0; i &lt; 8.0; i++) &#123;\n        float angle = i * 0.785 + u_time * 0.2;\n        vec2 p = vec2(cos(angle), sin(angle)) * (0.2 + 0.1 * sin(u_time + i));\n        float s = 0.002 / length(uv - p);\n        sparkles += s * step(0.5, hash(vec2(i, floor(u_time * 2.0))));\n    &#125;\n    float rays = 0.0;\n    float angle = atan(uv.y, uv.x);\n    rays = pow(abs(sin(angle * 6.0 + u_time)), 10.0) * (0.1 / dist);\n    vec3 color = vec3(0.0, 0.28, 0.67);\n    vec3 accent = vec3(1.0, 0.84, 0.0);\n    vec3 finalColor = color * glow + accent * (sparkles + rays * 0.3);\n    float alpha = clamp(glow + sparkles + rays, 0.0, 1.0);\n    gl_FragColor = vec4(finalColor, alpha * smoothstep(1.0, 0.0, dist * 2.0));\n&#125;`;
  function cs(type, src) &#123; const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; &#125;
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  function render(t) &#123;
    if (typeof ResizeObserver === 'undefined') syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  &#125;
  render(0);
&#125;)();
</script>
</div>
</div>

<div className="mt-8 mb-6 relative group"><div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up">
<div className="bg-secondary-container text-on-secondary px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-xs uppercase tracking-widest">Session Parfaite</span>
</div>
</div>
<div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 scale-150"></div>
<div className="relative w-48 h-48 sm:w-64 sm:h-64 animate-badge-pop">
<div className="animate-float">
<img alt="Badge Excellence" className="w-full h-full object-contain drop-shadow-2xl" src="/images/ecran-093.png" />
</div>
</div>

<span className="material-symbols-outlined absolute -top-4 -right-4 text-secondary-container animate-pulse" style={{"fontSize":"32px","fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined absolute bottom-4 -left-6 text-tertiary-fixed-dim" style={{"fontSize":"24px","fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
</div>

<div className="text-center mb-stack-lg animate-fade-in-up">
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight mb-2">Score Parfait, Koffi !</h1>
<p className="font-body-md text-on-surface-variant">100% de réussite ! Tu as maîtrisé cette session sans aucune erreur.</p>
</div>

<div className="grid grid-cols-2 gap-gutter w-full mb-stack-lg animate-fade-in-up">
<div className="bento-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-primary mb-1" style={{"fontSize":"28px","fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-headline-md text-headline-md text-primary">50 XP</span>
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Expérience</span>
</div>
<div className="bento-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-secondary mb-1" style={{"fontSize":"28px","fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-headline-md text-headline-md text-secondary">5 Flammes</span>
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Série</span>
</div>
</div>

<div className="w-full bento-card p-margin-mobile rounded-xl mb-stack-lg animate-fade-in-up">
<div className="flex justify-between items-end mb-3">
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant mb-1 uppercase tracking-widest">Progression</span>
<span className="font-headline-md text-headline-md text-on-surface">Niveau 4</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold">850 / 1000 XP</span>
</div>

<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full transition-all duration-1000 ease-out" id="progress-bar" style={{"width":"85%"}}></div>
</div>
<div className="flex justify-between mt-2">
<span className="text-[10px] font-bold text-on-surface-variant opacity-50">Lvl 4</span>
<span className="text-[10px] font-bold text-primary">Lvl 5</span>
</div>
</div>

<div className="w-full flex justify-between gap-4 animate-fade-in-up">
<div className="flex flex-1 items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{"fontSize":"20px"}}>task_alt</span>
</div>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">Précision</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface">100%</span>
</div>
</div>
<div className="flex flex-1 items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
<div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary" style={{"fontSize":"20px"}}>timer</span>
</div>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">Temps</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface">2m 45s</span>
</div>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full p-margin-mobile bg-gradient-to-t from-surface via-surface to-transparent pt-10 z-30">
<div className="max-w-md mx-auto space-y-3">
<button className="w-full h-14 bg-primary text-on-primary font-label-sm text-label-sm rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                Continuer
                <span className="material-symbols-outlined" style={{"fontSize":"20px"}}>arrow_forward</span>
</button>
<button className="w-full h-14 bg-surface text-primary border-2 border-primary-fixed-dim font-label-sm text-label-sm rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform">
<span className="material-symbols-outlined" style={{"fontSize":"20px"}}>share</span>
                Partager mon score
            </button>
</div>
</footer>
<script>
        // Simple Confetti Generator
        function createConfetti() &#123;
            const canvas = document.getElementById('confetti-canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const pieces = [];
            const numberOfPieces = 50;
            const colors = ['#00327d', '#fd8100', '#005934', '#ffdcc6', '#b1c5ff'];

            class ConfettiPiece &#123;
                constructor() &#123;
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height - canvas.height;
                    this.size = Math.random() * 10 + 5;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.speed = Math.random() * 3 + 2;
                    this.rotation = Math.random() * 360;
                    this.rotationSpeed = Math.random() * 10 - 5;
                &#125;
                update() &#123;
                    this.y += this.speed;
                    this.rotation += this.rotationSpeed;
                    if (this.y &gt; canvas.height) &#123;
                        this.y = -20;
                        this.x = Math.random() * canvas.width;
                    &#125;
                &#125;
                draw() &#123;
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation * Math.PI / 180);
                    ctx.fillStyle = this.color;
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    ctx.restore();
                &#125;
            &#125;

            for (let i = 0; i &lt; numberOfPieces; i++) &#123;
                pieces.push(new ConfettiPiece());
            &#125;

            function animate() &#123;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                pieces.forEach(p =&gt; &#123;
                    p.update();
                    p.draw();
                &#125;);
                requestAnimationFrame(animate);
            &#125;
            animate();
        &#125;

        // Initialize progress and animations
        window.onload = () =&gt; &#123;
            createConfetti();
            
            // Animate progress bar after a small delay
            setTimeout(() =&gt; &#123;
                document.getElementById('progress-bar').style.width = '85%';
            &#125;, 500);
        &#125;;

        // Accessibility/Interactions
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('touchstart', () =&gt; &#123;
                btn.style.opacity = '0.8';
            &#125;);
            btn.addEventListener('touchend', () =&gt; &#123;
                btn.style.opacity = '1';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
