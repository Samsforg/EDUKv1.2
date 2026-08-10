import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Diagnostic Onboarding" };

export default function Page() {
  return (
    <div className="academic-mesh min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 bg-surface/80 backdrop-blur-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-headline-md">school</span>
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
</div>
</header>
<main className="flex-grow flex items-center justify-center pt-20 pb-16 px-container-padding-mobile md:px-container-padding-desktop">
<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">

<div className="md:col-span-6 flex flex-col items-center md:items-start space-y-stack-md text-center md:text-left">
<div className="relative group">
<div className="absolute -inset-1 bg-gradient-to-r from-primary to-expert-purple rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
<img className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-xl" src="/images/ecran-037.png" alt="A sophisticated and friendly AI avatar named Kora, appearing as a clean, translucent holographic bust with a soft inner glow. The background is a minimalist academic office with shelves of digital books and warm, ambient lighting. The visual style is high-end corporate minimalism with a palette of deep blues, whites, and soft purple accents to convey intelligence and empathy." />
</div>
<div className="space-y-2">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-expert-purple/10 text-expert-purple font-label-md text-label-md uppercase tracking-wider">
<span className="material-symbols-outlined text-sm mr-1" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
                        Tuteur IA personnel
                    </span>
<h1 className="font-display-lg text-display-lg text-primary md:text-5xl leading-tight">
                        Bonjour, je suis <span className="text-expert-purple">Kora</span>.
                    </h1>
</div>
<p className="font-body-lg text-body-lg text-secondary max-w-md">
                    Je suis là pour vous accompagner dans votre réussite académique. Avant de commencer, apprenons à mieux connaître vos points forts.
                </p>
</div>

<div className="md:col-span-6">
<div className="bg-white border border-surface-border rounded-xl p-8 md:p-12 shadow-sm relative overflow-hidden">

<div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
<svg className="w-full h-full fill-primary" viewBox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="2" />
<path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
</svg>
</div>
<div className="space-y-stack-md relative z-10">
<div className="space-y-2">
<h2 className="font-headline-lg text-headline-lg text-on-surface">Diagnostic Académique</h2>
<p className="font-body-md text-body-md text-secondary">
                                Nous allons évaluer votre niveau avec <span className="font-bold text-primary">5 questions rapides</span> pour construire votre plan d'étude personnalisé.
                            </p>
</div>

<div className="space-y-3">
<div className="flex justify-between items-end">
<span className="font-label-md text-label-md text-primary uppercase tracking-widest">Progression</span>
<span className="font-title-md text-title-md text-on-surface">Étape 1 sur 4</span>
</div>
<div className="flex gap-2">
<div className="h-2 rounded-full step-active transition-all duration-500"></div>
<div className="h-2 rounded-full step-inactive"></div>
<div className="h-2 rounded-full step-inactive"></div>
<div className="h-2 rounded-full step-inactive"></div>
</div>
</div>

<div className="grid grid-cols-1 gap-4 py-4 border-y border-surface-border">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-primary">timer</span>
</div>
<div>
<p className="font-title-md text-body-md font-bold text-on-surface">~3 minutes</p>
<p className="font-body-md text-label-md text-secondary">Rapide et efficace</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-primary">auto_graph</span>
</div>
<div>
<p className="font-title-md text-body-md font-bold text-on-surface">Plan adaptatif</p>
<p className="font-body-md text-label-md text-secondary">Basé sur vos réponses</p>
</div>
</div>
</div>
<button className="w-full bg-primary-container text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-md active:scale-95 group">
<span>Démarrer le Diagnostic</span>
<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<p className="text-center font-label-md text-label-md text-outline">
                            Vos données sont protégées et utilisées uniquement pour votre apprentissage.
                        </p>
</div>
</div>
</div>
</div>
</main>

<footer className="w-full py-8 px-container-padding-mobile md:px-container-padding-desktop border-t border-surface-border bg-white mt-auto">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
<div className="flex items-center gap-4">
<p className="font-label-md text-label-md text-outline">© 2024 Edukora Academic System</p>
</div>
<div className="flex gap-6">
<a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="#">Assistance</a>
<a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="#">Confidentialité</a>
<a className="font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="#">Conditions</a>
</div>
</div>
</footer>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            // Subtle entrance animations
            const cards = document.querySelectorAll('.bg-white');
            cards.forEach((card, i) =&gt; &#123;
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() =&gt; &#123;
                    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                &#125;, 200 * i);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
