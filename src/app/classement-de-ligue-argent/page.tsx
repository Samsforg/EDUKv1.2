import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Classement de la Ligue" };

export default function Page() {
  return (
    <div className="text-on-surface antialiased" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface border-b border-surface-border h-16">
<div className="flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-full max-w-7xl mx-auto">
<div className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-054.png" alt="A professional studio portrait of a university professor with a warm, encouraging smile, wearing a modern navy blazer. The background is a softly blurred academic office with books and a soft, natural window light illuminating the scene in a clean, light-mode aesthetic." />
</div>
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
</div>
<div className="p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95">
<span className="material-symbols-outlined text-primary" data-icon="notifications">notifications</span>
</div>
</div>
</header>

<main className="pt-20 pb-24 px-4 md:px-container-padding-desktop max-w-5xl mx-auto">

<section className="mb-gutter relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary">
<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="bg-surface-container-lowest/20 p-3 rounded-xl backdrop-blur-sm">
<span className="material-symbols-outlined text-4xl" data-icon="emoji_events" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold">Ligue Argent</h1>
<p className="font-body-md text-body-md opacity-90">Commune de Saint-Étienne • Division 4</p>
</div>
</div>
<div className="bg-surface-container-lowest text-primary px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-lg" data-icon="timer">timer</span>
<span className="font-label-md text-label-md font-bold uppercase tracking-wider">Fin de saison dans 3 jours</span>
</div>
</div>

<div className="absolute -right-10 -bottom-10 opacity-10">
<span className="material-symbols-outlined text-[160px]" data-icon="school">school</span>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-gutter">
<div className="bg-surface-container-lowest border border-surface-border p-5 rounded-xl">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">Votre Rang</span>
<span className="material-symbols-outlined text-impact-emerald" data-icon="trending_up">trending_up</span>
</div>
<div className="font-metric-num text-metric-num text-primary">#14</div>
<div className="font-body-md text-body-md text-impact-emerald mt-1 flex items-center gap-1">
<span>+3 places aujourd'hui</span>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-5 rounded-xl">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">Points de Ligue</span>
</div>
<div className="font-metric-num text-metric-num text-primary">2,450 LP</div>
<div className="font-body-md text-body-md text-on-surface-variant mt-1">À 120 pts du Top 10</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-5 rounded-xl">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">Zone Actuelle</span>
</div>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
<span className="font-label-md text-label-md font-bold uppercase">Maintien</span>
</div>
<div className="font-body-md text-body-md text-on-surface-variant mt-2">Gagnez 450 pts pour la promotion</div>
</div>
</div>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden shadow-sm">
<div className="p-4 border-b border-surface-border bg-surface-container-low flex items-center justify-between">
<h3 className="font-title-md text-title-md text-primary">Classement de la commune</h3>
<span className="text-on-surface-variant font-body-md text-body-md">52 étudiants actifs</span>
</div>

<div className="grid grid-cols-12 px-6 py-3 border-b border-surface-border bg-surface-container-lowest font-label-md text-label-md text-outline uppercase tracking-wider">
<div className="col-span-1">Rang</div>
<div className="col-span-7 md:col-span-8">Étudiant</div>
<div className="col-span-4 md:col-span-3 text-right">Points</div>
</div>

<div className="divide-y divide-surface-border">

<div className="px-6 py-2 bg-impact-emerald/10 border-l-4 border-impact-emerald">
<span className="font-label-md text-label-md text-impact-emerald font-bold uppercase flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="keyboard_double_arrow_up">keyboard_double_arrow_up</span>
                        Zone de Promotion (Top 10)
                    </span>
</div>

<div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-surface-container-low transition-colors">
<div className="col-span-1 font-metric-num text-lg text-primary">01</div>
<div className="col-span-7 md:col-span-8 flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-surface-border overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-055.png" alt="A clean, minimalist 3D avatar of a student with a friendly expression and short dark hair, wearing a white hoodie and designer glasses. High-quality render, soft lighting, professional light-mode aesthetic, corporate 3D character style." />
</div>
<div>
<p className="font-title-md text-title-md">Marc Durant</p>
<p className="font-label-md text-label-md text-on-surface-variant">Lycée Jean Moulin</p>
</div>
</div>
<div className="col-span-4 md:col-span-3 text-right font-metric-num text-primary">4,820 LP</div>
</div>

<div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-surface-container-low transition-colors">
<div className="col-span-1 font-metric-num text-lg text-primary">02</div>
<div className="col-span-7 md:col-span-8 flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-surface-border overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-056.png" alt="A stylish 3D character portrait of a female student with braided hair and a green sweater. The character has a smart and focused expression. Modern corporate illustration style with soft ambient occlusion and bright, clean studio lighting." />
</div>
<div>
<p className="font-title-md text-title-md">Léa Petit</p>
<p className="font-label-md text-label-md text-on-surface-variant">Lycée Fauriel</p>
</div>
</div>
<div className="col-span-4 md:col-span-3 text-right font-metric-num text-primary">4,510 LP</div>
</div>

<div className="px-6 py-3 bg-surface text-center">
<span className="material-symbols-outlined text-outline" data-icon="more_horiz">more_horiz</span>
</div>

<div className="px-6 py-2 bg-validation-amber/10 border-l-4 border-validation-amber">
<span className="font-label-md text-label-md text-validation-amber font-bold uppercase flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="pause_circle">pause_circle</span>
                        Zone de Maintien
                    </span>
</div>

<div className="grid grid-cols-12 px-6 py-4 items-center bg-primary-container/10 border-l-4 border-primary shadow-[inset_0_0_12px_rgba(0,50,125,0.05)] scale-[1.01] z-10">
<div className="col-span-1 font-metric-num text-lg text-primary">14</div>
<div className="col-span-7 md:col-span-8 flex items-center gap-4">
<div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-057.png" alt="A close-up studio portrait of a university professor with a warm, encouraging smile, wearing a modern navy blazer. Clean professional academic setting background." />
</div>
<div>
<p className="font-title-md text-title-md text-primary font-bold">Vous (Moi)</p>
<p className="font-label-md text-label-md text-on-surface-variant">Lycée Jean Monnet</p>
</div>
<div className="bg-primary text-on-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">C'est vous !</div>
</div>
<div className="col-span-4 md:col-span-3 text-right font-metric-num text-primary">2,450 LP</div>
</div>

<div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-surface-container-low transition-colors">
<div className="col-span-1 font-metric-num text-lg text-on-surface-variant">15</div>
<div className="col-span-7 md:col-span-8 flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-surface-border overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-058.png" alt="A 3D character design of a student with curly hair and a yellow polo shirt, smiling brightly. The aesthetic is clean, modern, and friendly with soft light and high contrast details suitable for a high-end educational platform." />
</div>
<div>
<p className="font-title-md text-title-md">Thomas Brun</p>
<p className="font-label-md text-label-md text-on-surface-variant">Lycée Claude Fauriel</p>
</div>
</div>
<div className="col-span-4 md:col-span-3 text-right font-metric-num text-on-surface-variant">2,390 LP</div>
</div>

<div className="px-6 py-2 bg-error/5 border-l-4 border-error">
<span className="font-label-md text-label-md text-error font-bold uppercase flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="keyboard_double_arrow_down">keyboard_double_arrow_down</span>
                        Zone de Relégation (Derniers 5)
                    </span>
</div>
</div>
</section>

<section className="mt-gutter text-center">
<button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-title-md text-title-md shadow-lg active:scale-95 transition-all hover:bg-primary-container flex items-center gap-3 mx-auto">
<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
                Gagner plus de points
            </button>
<p className="mt-4 font-body-md text-body-md text-on-surface-variant">Complétez votre cours d'IA pour +500 LP</p>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t border-surface-border py-2 px-2 pb-safe flex justify-around items-center rounded-t-xl shadow-md">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-md text-label-md mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="school">school</span>
<span className="font-label-md text-label-md mt-1">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label-md text-label-md mt-1">IA Tuteur</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="emoji_events" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="font-label-md text-label-md mt-1">Ligues</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label-md text-label-md mt-1">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for the cards
        document.querySelectorAll('section, div.bg-surface-container-lowest').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                if(!card.classList.contains('bg-primary-container/10')) &#123;
                    card.style.transform = 'translateY(-2px)';
                    card.style.transition = 'transform 0.2s ease-out';
                &#125;
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
