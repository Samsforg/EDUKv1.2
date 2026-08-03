import type { Metadata } from "next";

export const metadata: Metadata = { title: "Félicitations - Edukora Professeur" };

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden" >

<header className="bg-surface-container-lowest dark:bg-surface-container-low w-full top-0 sticky z-50 flex justify-between items-center px-container-padding-desktop h-16 border-b border-surface-border dark:border-outline-variant transition-colors duration-200">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary dark:text-primary-fixed p-2 rounded-full hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors">menu</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">Edukora Professeur</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-4">
<span className="font-label-md text-label-md text-on-surface-variant cursor-pointer hover:text-primary">Actualités</span>
<span className="font-label-md text-label-md text-on-surface-variant cursor-pointer hover:text-primary">Espace Expert</span>
</div>
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-298.png" alt="A professional headshot of an experienced academic professor with a kind smile, set against a blurred university office background with books and a warm ambient light. The image has a clean, high-contrast light mode aesthetic, emphasizing professional trust and intellectual authority." />
</div>
</div>
</header>
<main className="relative pt-12 pb-24 md:pb-12 px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">

<div className="text-center mb-12 animate-fade-in-up">
<div className="inline-flex items-center px-4 py-1 rounded-full bg-expert-purple/10 text-expert-purple font-label-md text-label-md mb-4 border border-expert-purple/20">
<span className="material-symbols-outlined mr-2 text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                ACCOMPLISSEMENT EXCEPTIONNEL
            </div>
<h2 className="font-display-lg text-display-lg text-primary mb-2">Félicitations, Major !</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Votre dévouement et votre excellence pédagogique vous ont propulsé au sommet de la hiérarchie académique.
            </p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-8 glass-card rounded-xl overflow-hidden relative group min-h-[400px] flex flex-col items-center justify-center p-gutter">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

<div className="relative z-10 diploma-float max-w-full drop-shadow-2xl">
<img className="rounded-lg border-[12px] border-white shadow-2xl max-h-[450px] w-auto" src="/images/ecran-250.svg" />

<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-validation-amber rounded-full border-4 border-white flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-white text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
</div>
<div className="mt-12 text-center relative z-10">
<h3 className="font-headline-md text-headline-md text-primary mb-1">Gagnant de la Ligue Or</h3>
<p className="font-title-md text-title-md text-on-surface-variant">Saison de Printemps • 2024</p>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-gutter">

<div className="glass-card rounded-xl p-stack-md flex-1 border-l-4 border-validation-amber">
<div className="flex items-start gap-4 mb-6">
<div className="w-12 h-12 rounded-full bg-validation-amber/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-validation-amber">local_shipping</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-primary mb-2">Récompense Physique</h4>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Votre diplôme imprimé sera expédié à votre établissement scolaire d'ici 10 jours ouvrés.
                            </p>
</div>
</div>
<div className="space-y-4 pt-4 border-t border-surface-border">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-expert-purple text-sm">school</span>
<span className="font-label-md text-label-md text-on-surface">Lycée Henri-IV, Paris</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-expert-purple text-sm">verified_user</span>
<span className="font-label-md text-label-md text-on-surface">Signature de Direction Validée</span>
</div>
</div>
</div>

<div className="glass-card rounded-xl p-stack-md flex flex-col gap-4">
<button className="w-full bg-primary text-white font-title-md text-title-md py-4 px-6 rounded-lg font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 group">
<span>Partager le succès</span>
<span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">share</span>
</button>
<button className="w-full bg-white border border-primary text-primary font-title-md text-title-md py-4 px-6 rounded-lg font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
<span>Continuer vers le prochain défi</span>
<span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>

<div className="glass-card rounded-xl p-stack-md">
<div className="flex justify-between items-end">
<div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Impact Académique</p>
<span className="font-metric-num text-metric-num text-impact-emerald">+84%</span>
</div>
<div className="w-24 h-12 flex items-end gap-1">
<div className="bg-impact-emerald/20 w-full h-[30%] rounded-t-sm"></div>
<div className="bg-impact-emerald/40 w-full h-[50%] rounded-t-sm"></div>
<div className="bg-impact-emerald/60 w-full h-[80%] rounded-t-sm"></div>
<div className="bg-impact-emerald w-full h-[100%] rounded-t-sm"></div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full bg-surface-container-lowest border-t border-surface-border z-50 flex justify-around items-center py-2 px-4 h-16 shadow-lg">
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md mt-1">Tableau de bord</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>fact_check</span>
<span className="font-label-md text-label-md mt-1">Validation</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-md text-label-md mt-1">Stats</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md mt-1">Profil</span>
</div>
</nav>

<canvas className="confetti-canvas" id="confetti"></canvas>
<script>
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
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.size = Math.random() * 8 + 4;
                this.speedY = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 5 - 2.5;
                this.color = ['#0047AB', '#6366F1', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)];
            &#125;

            update() &#123;
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                if (this.y &gt; canvas.height) &#123;
                    this.y = -10;
                    this.x = Math.random() * canvas.width;
                &#125;
            &#125;

            draw() &#123;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                ctx.restore();
            &#125;
        &#125;

        for (let i = 0; i &lt; 50; i++) &#123;
            particles.push(new Particle());
        &#125;

        function animate() &#123;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p =&gt; &#123;
                p.update();
                p.draw();
            &#125;);
            requestAnimationFrame(animate);
        &#125;

        animate();
    </script>

    </div>
  );
}
