import type { Metadata } from "next";

export const metadata: Metadata = { title: "EduKora BAC - Résultats" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 md:pb-0" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center px-margin-mobile h-16 w-full z-50 bg-surface dark:bg-surface-container-high border-b border-outline-variant dark:border-outline fixed top-0">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary dark:text-primary-container cursor-pointer">menu</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-container">EduKora BAC</h1>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-on-surface-variant hidden md:block">Session 2024</span>
<div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover" src="/images/ecran-301.png" alt="A professional studio portrait of a young West African student smiling warmly, dressed in a clean school uniform. The lighting is bright and optimistic, reflecting a high-quality academic environment. The background is a soft, out-of-focus classroom setting with neutral professional colors that align with the Corporate Modern design system." />
</div>
</div>
</header>
<main className="pt-24 px-margin-mobile max-w-5xl mx-auto pb-12 relative overflow-hidden">

<canvas className="confetti-canvas" height="2042" id="confetti" width="390"></canvas>

<section className="text-center mb-stack-lg">
<div className="mb-stack-md inline-flex items-center justify-center p-4 rounded-full bg-tertiary/10 animate-float">
<span className="material-symbols-outlined text-6xl text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-base">Félicitations, Candidat !</h2>
<p className="text-on-surface-variant font-body-lg">Vous avez franchi une étape majeure vers votre BAC.</p>
</section>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-5 glass-card p-stack-lg rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
<p className="font-label-sm text-outline uppercase tracking-widest mb-base">Score Final</p>
<div className="relative w-48 h-48 flex items-center justify-center mb-stack-md">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
<circle className="text-tertiary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="165.87" strokeLinecap="round" strokeWidth="12" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-display-lg text-display-lg text-on-surface">14/20</span>
<span className="font-label-sm text-tertiary font-bold px-3 py-1 bg-tertiary/10 rounded-full">ADMIS</span>
</div>
</div>
<p className="text-on-surface-variant font-body-md italic">"Excellent travail. Vous maîtrisez les concepts fondamentaux de la Série C."</p>
</div>

<div className="md:col-span-7 space-y-gutter">
<div className="glass-card p-stack-md rounded-xl shadow-sm h-full">
<h3 className="font-headline-md text-headline-md text-on-surface mb-stack-md flex items-center gap-2">
<span className="material-symbols-outlined text-primary">analytics</span>
                        Performance par Matière
                    </h3>
<div className="space-y-4">

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-sm">Mathématiques</span>
<span className="font-label-sm font-bold">16/20</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"80%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-sm">Physique-Chimie</span>
<span className="font-label-sm font-bold">12/20</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"60%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-sm">SVT</span>
<span className="font-label-sm font-bold">15/20</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{"width":"75%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-sm">Français</span>
<span className="font-label-sm font-bold">11/20</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-outline h-full rounded-full" style={{"width":"55%"}}></div>
</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-gutter mt-4">

<div className="bg-primary-container text-on-primary-container p-stack-lg rounded-xl flex items-start gap-4 transition-transform active:scale-95 cursor-pointer overflow-hidden relative">
<div className="relative z-10 flex-1">
<h4 className="font-headline-md text-headline-md mb-base">Besoin d'explications ?</h4>
<p className="font-body-md opacity-90 mb-stack-md">L'IA EduKora peut analyser vos erreurs et vous expliquer les points complexes en Physique.</p>
<button className="bg-surface text-primary px-6 py-2 rounded-full font-label-sm flex items-center gap-2 hover:bg-surface-bright transition-colors">
<span className="material-symbols-outlined text-sm">smart_toy</span>
                            Discuter avec le Tuteur IA
                        </button>
</div>
<div className="absolute right-[-20px] bottom-[-20px] opacity-20 transform rotate-12">
<span className="material-symbols-outlined text-[140px]" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
</div>
</div>

<div className="bg-surface-container-highest p-stack-lg rounded-xl border border-outline-variant flex flex-col justify-between hover:border-primary transition-all group">
<div>
<h4 className="font-headline-md text-headline-md text-on-surface mb-base">Revoir mes erreurs</h4>
<p className="font-body-md text-on-surface-variant mb-stack-md">Consultez le corrigé détaillé pour chaque question où vous avez perdu des points.</p>
</div>
<button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-sm flex items-center justify-center gap-2 group-hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined">history_edu</span>
                        Accéder au corrigé détaillé
                    </button>
</div>
</div>
</div>

<section className="mt-stack-lg glass-card p-stack-lg rounded-xl">
<h3 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Évolution du niveau</h3>
<div className="h-48 w-full flex items-end gap-2 px-2">

<div className="flex-1 bg-primary-fixed-dim/20 rounded-t-lg relative group transition-all hover:bg-primary-fixed-dim/40 h-[40%]">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-label-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">08/20</div>
</div>
<div className="flex-1 bg-primary-fixed-dim/20 rounded-t-lg relative group transition-all hover:bg-primary-fixed-dim/40 h-[55%]">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-label-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">11/20</div>
</div>
<div className="flex-1 bg-primary-fixed-dim/20 rounded-t-lg relative group transition-all hover:bg-primary-fixed-dim/40 h-[50%]">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-label-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">10/20</div>
</div>
<div className="flex-1 bg-primary h-full rounded-t-lg relative group">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-label-xs font-bold text-primary">14/20</div>
</div>
</div>
<div className="flex justify-between mt-4 text-outline font-label-xs">
<span className="">Simul. #1</span>
<span className="">Simul. #2</span>
<span className="">Simul. #3</span>
<span className="text-primary font-bold">Aujourd'hui</span>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-surface-container-highest shadow-[0_-2px_8px_rgba(0,0,0,0.05)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="library_books">library_books</span>
<span className="font-label-xs text-label-xs">Sujets</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
<span className="font-label-xs text-label-xs">Simulateur</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="bookmark">bookmark</span>
<span className="font-label-xs text-label-xs">Favoris</span>
</a><a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple confetti effect for celebration
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#00327d', '#fd8100', '#005934', '#b1c5ff'];

        function createParticle() &#123;
            return &#123;
                x: Math.random() * canvas.width,
                y: -20,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 6.28,
                spin: Math.random() * 0.2 - 0.1
            &#125;;
        &#125;

        for (let i = 0; i &lt; 50; i++) &#123;
            particles.push(createParticle());
        &#125;

        function draw() &#123;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) =&gt; &#123;
                p.y += p.speed;
                p.x += Math.sin(p.angle) * 2;
                p.angle += p.spin;

                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);

                if (p.y &gt; canvas.height) &#123;
                    particles[i] = createParticle();
                &#125;
            &#125;);
            requestAnimationFrame(draw);
        &#125;

        draw();

        window.addEventListener('resize', () =&gt; &#123;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        &#125;);
    </script>

    </div>
  );
}
