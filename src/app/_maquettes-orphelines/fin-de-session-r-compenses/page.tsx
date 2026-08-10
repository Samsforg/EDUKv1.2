import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Session Terminée" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-hidden h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>
<canvas id="confetti-canvas"></canvas>

<header className="h-16 flex items-center px-margin-mobile z-20">
<button aria-label="Fermer" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-90">
<span className="material-symbols-outlined text-on-surface-variant">close</span>
</button>
</header>

<main className="flex-1 overflow-y-auto px-margin-mobile pb-32 relative z-10 flex flex-col items-center">

<div className="mt-8 mb-6 relative group">
<div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 scale-150"></div>
<div className="relative w-48 h-48 bg-white rounded-full border-2 border-primary-container flex items-center justify-center shadow-md animate-bounce">
<span className="material-symbols-outlined text-primary" style={{"fontSize":"80px","fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
</div>

<span className="material-symbols-outlined absolute -top-4 -right-4 text-secondary-container animate-pulse" style={{"fontSize":"32px","fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined absolute bottom-4 -left-6 text-tertiary-fixed-dim" style={{"fontSize":"24px","fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
</div>

<div className="text-center mb-stack-lg">
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight mb-2">Félicitations, Koffi !</h1>
<p className="font-body-md text-on-surface-variant">Tu viens de terminer ta révision quotidienne avec brio.</p>
</div>

<div className="grid grid-cols-2 gap-gutter w-full mb-stack-lg">
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

<div className="w-full bento-card p-margin-mobile rounded-xl mb-stack-lg">
<div className="flex justify-between items-end mb-3">
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant mb-1 uppercase tracking-widest">Progression</span>
<span className="font-headline-md text-headline-md text-on-surface">Niveau 4</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold">850 / 1000 XP</span>
</div>

<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full transition-all duration-1000 ease-out" id="progress-bar" style={{"width":"0%"}}></div>
</div>
<div className="flex justify-between mt-2">
<span className="text-[10px] font-bold text-on-surface-variant opacity-50">Lvl 4</span>
<span className="text-[10px] font-bold text-primary">Lvl 5</span>
</div>
</div>

<div className="w-full flex justify-between gap-4">
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
