import type { Metadata } from "next";

export const metadata: Metadata = { title: "Invitation Réussie - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface-bright text-on-surface min-h-screen flex flex-col" >

<header className="bg-surface-bright dark:bg-on-background w-full top-0 sticky border-b border-surface-border dark:border-outline-variant z-40 transition-colors duration-200">
<div className="flex justify-between items-center px-gutter py-base w-full max-w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-surface-border">
<span className="material-symbols-outlined text-primary">person</span>
</div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant transition-colors duration-200 text-on-surface-variant dark:text-outline">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</header>

<div className="flex flex-1 overflow-hidden">

<aside className="hidden md:flex flex-col h-screen p-stack-md bg-surface-container-lowest dark:bg-on-background w-[280px] fixed left-0 top-0 border-r border-surface-border dark:border-outline-variant z-30 transition-all duration-150 ease-in-out">
<div className="flex items-center gap-4 mb-8 mt-16 px-2">
<div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-lg">E</div>
<div>
<p className="font-title-md text-title-md font-bold text-primary dark:text-primary-fixed">Edukora Étudiant</p>
<p className="font-label-md text-label-md text-secondary">Plan Découverte</p>
</div>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-3 p-3 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant group transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant group transition-all" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body-md text-body-md">Mes Cours</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-primary dark:text-primary-fixed font-bold border-r-4 border-primary bg-surface-container-low" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="font-body-md text-body-md">Abonnement</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant group transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant group transition-all" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body-md text-body-md">Aide</span>
</a>
</nav>
</aside>

<main className="flex-1 md:ml-[280px] w-full flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop relative">
<canvas className="confetti-canvas" id="confetti"></canvas>

<div className="max-w-xl w-full bg-surface-container-lowest rounded-xl border border-surface-border shadow-sm overflow-hidden flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">

<div className="w-full h-32 bg-secondary-container/30 flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 opacity-20" style={{"backgroundImage":"radial-gradient(circle at 2px 2px, #0047ab 1px, transparent 0)","backgroundSize":"24px 24px"}}></div>
<div className="z-10 w-24 h-24 transform -translate-y-4">
<img alt="Success Badge" className="w-full h-full object-contain drop-shadow-xl" src="/images/ecran-196.png" />
</div>
</div>

<div className="px-8 pb-10 pt-4 space-y-6">
<div className="space-y-3">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">Invitation Sent!</h2>
<p className="font-title-md text-title-md text-secondary font-medium">You're one step closer to your Premium rewards.</p>
</div>
<div className="bg-surface-container-low p-4 rounded-lg flex items-start gap-4 text-left border border-surface-border/50">
<div className="bg-impact-emerald/10 p-2 rounded-full text-impact-emerald">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>info</span>
</div>
<div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                When your friend subscribes, your Premium time will be added automatically to your account balance.
                            </p>
</div>
</div>
<div className="flex flex-col sm:flex-row gap-4 w-full">
<button className="flex-1 py-4 px-6 bg-primary-container text-white font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">person_add</span>
                            Invite another friend
                        </button>
<button className="flex-1 py-4 px-6 border-2 border-primary text-primary font-bold rounded-lg hover:bg-surface-container-low active:scale-[0.98] transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">grid_view</span>
                            Retour au tableau de bord
                        </button>
</div>
</div>

<div className="w-full border-t border-surface-border px-8 py-4 bg-surface-bright flex items-center justify-between">
<span className="font-label-md text-label-md text-secondary">SHARE AGAIN:</span>
<div className="flex gap-4">
<button className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-lg">content_copy</span>
</button>
<button className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-lg">share</span>
</button>
</div>
</div>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low px-4 py-1 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low px-4 py-1 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold hover:bg-surface-container-low px-4 py-1 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low px-4 py-1 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        // Simple confetti effect for the success celebration
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() &#123;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        &#125;

        window.addEventListener('resize', resize);
        resize();

        class Particle &#123;
            constructor() &#123;
                this.x = canvas.width / 2;
                this.y = canvas.height / 2;
                this.size = Math.random() * 8 + 4;
                this.color = ['#0047AB', '#10B981', '#F59E0B', '#6366F1', '#B1C5FF'][Math.floor(Math.random() * 5)];
                this.vx = (Math.random() - 0.5) * 15;
                this.vy = (Math.random() - 0.5) * 15 - 5;
                this.gravity = 0.2;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.005;
            &#125;

            update() &#123;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
            &#125;

            draw() &#123;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            &#125;
        &#125;

        function createConfetti() &#123;
            for (let i = 0; i &lt; 100; i++) &#123;
                particles.push(new Particle());
            &#125;
        &#125;

        function animate() &#123;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter(p =&gt; p.life &gt; 0);
            particles.forEach(p =&gt; &#123;
                p.update();
                p.draw();
            &#125;);
            requestAnimationFrame(animate);
        &#125;

        // Trigger on load
        setTimeout(() =&gt; &#123;
            createConfetti();
            animate();
        &#125;, 300);

        // Micro-interaction for buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function(e) &#123;
                if (this.innerText.includes('Invite')) &#123;
                    createConfetti();
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
