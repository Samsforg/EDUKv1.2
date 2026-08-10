import type { Metadata } from "next";

export const metadata: Metadata = { title: "Héros de la Commune - Edukora" };

export default function Page() {
  return (
    <div className="bg-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline w-full sticky top-0 z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors active:scale-95 transition-transform p-2">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">Héros de la Commune</h1>
</div>
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-181.png" alt="A professional and friendly portrait of a young West African student with a warm smile, wearing a clean white school shirt. The background is a soft-focus academic setting with warm sunlight. The image is crisp, bright, and conveys high intellectual energy and reliability." />
</div>
</div>
</header>
<main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg space-y-stack-lg">

<section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<div className="md:col-span-8 bg-primary-container text-on-primary rounded-xl p-gutter shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[180px]">
<div className="z-10">
<p className="font-label-sm text-label-sm uppercase tracking-widest opacity-90">Ton Impact à Cocody</p>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mt-2">Rang #12 de la Commune</h2>
<p className="font-body-md text-body-md mt-2 max-w-md">Tu as aidé 24 camarades cette semaine. Continue comme ça pour atteindre le Top 10 !</p>
</div>
<div className="z-10 mt-4 flex gap-4">
<div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/30">
<p className="text-xs font-semibold">Points d'entraide</p>
<p className="text-xl font-bold">1,240 XP</p>
</div>
<div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/30">
<p className="text-xs font-semibold">Questions résolues</p>
<p className="text-xl font-bold">18</p>
</div>
<div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/30"><p className="text-xs font-semibold">Fiches certifiées</p><p className="text-xl font-bold">12</p></div></div>

<div className="absolute -right-10 -bottom-10 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-30"></div>
</div>

<div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-gutter flex flex-col items-center justify-center text-center space-y-3">
<div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center shadow-lg transform rotate-12">
<span className="material-symbols-outlined text-on-secondary-container text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-secondary">Tuteur Émérite</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Badge débloqué pour 10 partages de fiches certifiées.</p>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2 mt-2">
<div className="bg-secondary h-full rounded-full" style={{"width":"85%"}}></div>
</div>
<p className="text-xs font-bold text-secondary">Prochain niveau : Mentor National</p>
</div>
</section>

<section className="flex flex-col md:flex-row items-center justify-between bg-tertiary-container text-white p-gutter rounded-xl gap-gutter shadow-sm border border-tertiary">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-4xl text-tertiary-fixed">quiz</span>
<div>
<h4 className="font-headline-md text-headline-md leading-none">Aider un camarade</h4>
<p className="text-sm opacity-80 mt-1">15 nouvelles questions attendent une réponse à Cocody.</p>
</div>
</div>
<button className="w-full md:w-auto bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">forum</span>
                Ouvrir le forum d'entraide
            </button>
</section>

<section className="space-y-stack-md">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-primary">Classement Cocody</h2>
<button className="text-primary font-bold text-label-sm flex items-center gap-1 hover:underline">
                    Voir tout <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="glass-card rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow">
<div className="relative">
<div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-182.png" alt="A headshot of a brilliant Ivorian male student with glasses, looking professional and approachable. He is in a modern library with wooden shelves and soft blue ambient light. The style is sharp, corporate yet warm, highlighting a sense of academic leadership and communal support." />
</div>
<div className="absolute -bottom-1 -right-1 bg-secondary text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-white">1</div>
</div>
<div className="flex-1">
<h4 className="font-bold text-primary">Kouassi Jean-Philippe</h4>
<p className="text-xs text-on-surface-variant">Cocody - Angré</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-secondary text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-xs font-bold text-secondary">2,450 pts</span>
</div>
</div>
<div className="text-right">
<p className="text-[10px] uppercase font-bold text-outline">Aidés</p>
<p className="text-lg font-extrabold text-primary">142</p>
</div>
</div>

<div className="glass-card rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow border-l-4 border-l-primary">
<div className="relative">
<div className="w-14 h-14 rounded-full overflow-hidden border-2 border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-183.png" alt="Close up portrait of a young Ivorian woman with braided hair, smiling confidently. She is wearing a modern academic polo. The background is a high-tech learning space with subtle geometric patterns on the wall. Soft, natural lighting. Professional corporate photography style for an educational platform." />
</div>
<div className="absolute -bottom-1 -right-1 bg-slate-400 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-white">2</div>
</div>
<div className="flex-1">
<h4 className="font-bold text-primary">Amina Ouattara</h4>
<p className="text-xs text-on-surface-variant">Cocody - Riviera 3</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-secondary text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-xs font-bold text-secondary">2,100 pts</span>
</div>
</div>
<div className="text-right">
<p className="text-[10px] uppercase font-bold text-outline">Aidés</p>
<p className="text-lg font-extrabold text-primary">128</p>
</div>
</div>

<div className="glass-card rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow">
<div className="relative">
<div className="w-14 h-14 rounded-full overflow-hidden border-2 border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-184.png" alt="Portrait of a focused young student studying in a bright, modern cafe in Abidjan. He looks helpful and smart. The visual style is clean and high-contrast, with primary blue accents. Professional depth of field, high-end digital photography." />
</div>
<div className="absolute -bottom-1 -right-1 bg-amber-700 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-white">3</div>
</div>
<div className="flex-1">
<h4 className="font-bold text-primary">Marc-Antoine Yao</h4>
<p className="text-xs text-on-surface-variant">Cocody - II Plateaux</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-secondary text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-xs font-bold text-secondary">1,980 pts</span>
</div>
</div>
<div className="text-right">
<p className="text-[10px] uppercase font-bold text-outline">Aidés</p>
<p className="text-lg font-extrabold text-primary">115</p>
</div>
</div>

<div className="glass-card rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow opacity-90">
<div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-185.png" alt="Portrait of an Ivorian female student looking enthusiastic, in a clean, brightly lit study hall. Corporate professional aesthetic, soft morning light, very high resolution." />
</div>
<div className="flex-1">
<h4 className="font-bold text-primary">Fatou Diop</h4>
<p className="text-xs text-on-surface-variant">Cocody - Danga</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-secondary text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-xs font-bold text-secondary">1,560 pts</span>
</div>
</div>
<div className="text-right">
<p className="text-[10px] uppercase font-bold text-outline">Aidés</p>
<p className="text-lg font-extrabold text-primary">92</p>
</div>
</div>

<div className="glass-card rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow opacity-90">
<div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-186.png" alt="Close-up face of a friendly-looking young man with a slight smile, academic background, neutral tones with vibrant blue elements. Minimalist and professional." />
</div>
<div className="flex-1">
<h4 className="font-bold text-primary">Yannick N'guessan</h4>
<p className="text-xs text-on-surface-variant">Cocody - Lycée Technique</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-secondary text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-xs font-bold text-secondary">1,420 pts</span>
</div>
</div>
<div className="text-right">
<p className="text-[10px] uppercase font-bold text-outline">Aidés</p>
<p className="text-lg font-extrabold text-primary">85</p>
</div>
</div>

<div className="glass-card rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow opacity-90">
<div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-187.png" alt="Portrait of a young woman student with a bright future look, soft focus backrgound, intellectual vibe. Professional grade lighting." />
</div>
<div className="flex-1">
<h4 className="font-bold text-primary">Sarah Koné</h4>
<p className="text-xs text-on-surface-variant">Cocody - Mermoz</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-secondary text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-xs font-bold text-secondary">1,390 pts</span>
</div>
</div>
<div className="text-right">
<p className="text-[10px] uppercase font-bold text-outline">Aidés</p>
<p className="text-lg font-extrabold text-primary">77</p>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-low p-gutter rounded-xl border border-outline-variant">
<h3 className="font-headline-md text-headline-md text-primary mb-4">Statistiques de Cocody</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="text-center p-4">
<p className="text-3xl font-extrabold text-primary">1.2k</p>
<p className="text-xs uppercase font-bold text-outline-variant">Fiches certifiées</p>
</div>
<div className="text-center p-4 border-l border-outline-variant">
<p className="text-3xl font-extrabold text-primary">458</p>
<p className="text-xs uppercase font-bold text-outline-variant">Questions résolues</p>
</div>
<div className="text-center p-4 border-l border-outline-variant">
<p className="text-3xl font-extrabold text-primary">92%</p>
<p className="text-xs uppercase font-bold text-outline-variant">Taux de réponse</p>
</div>
<div className="text-center p-4 border-l border-outline-variant">
<p className="text-3xl font-extrabold text-secondary">#1</p>
<p className="text-xs uppercase font-bold text-outline-variant">Commune la plus solidaire</p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-on-background shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe w-full">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>swords</span>
<span className="font-label-sm text-label-sm">Défis</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-sm text-label-sm">Tuteur AI</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Profil</span>
</button>
</nav>
<script>
        // Simple micro-interaction for cards
        document.querySelectorAll('.glass-card').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-2px)';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0px)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
