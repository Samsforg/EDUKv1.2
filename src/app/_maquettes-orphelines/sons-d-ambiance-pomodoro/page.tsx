import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sons d'Ambiance - Edukora" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-surface mb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary shadow-sm h-16 flex items-center px-4 justify-between">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-primary-container/20 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold">Sons d'Ambiance</h1>
</div>
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border-2 border-on-primary/20 shadow-sm">
<img className="w-full h-full object-cover" src="/images/ecran-331.png" alt="A professional close-up studio portrait of a young Ivorian student with a friendly expression. The lighting is bright and clean, following a modern educational app aesthetic. The background is a soft, out-of-focus academic setting with subtle hints of blue and orange, matching the Edukora brand colors of professional stability and optimistic energy." />
</div>
</div>
</header>

<main className="pt-24 px-4 max-w-2xl mx-auto space-y-8 pb-12">

<section className="relative h-48 rounded-xl overflow-hidden bg-primary-container shadow-md group">

<div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-primary/80 to-transparent">
<h2 className="font-headline text-2xl font-bold text-on-primary">Concentration Maximale</h2>
<p className="text-on-primary-container text-body-md">Optimisez votre Pomodoro avec un fond sonore apaisant.</p>
</div>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-headline text-lg font-bold text-primary uppercase tracking-wider">Bibliothèque Sonore</h3>
<span className="text-label-xs bg-secondary-container/10 text-secondary px-2 py-1 rounded-full font-semibold">4 disponibles</span>
</div>
<div className="grid grid-cols-2 gap-4">

<div className="relative group cursor-pointer bg-surface-container-low border border-outline-variant rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 active-sound-card" id="card-1">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">water_drop</span>
</div>
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>pause</span>
</button>
</div>
<h4 className="font-headline font-bold text-on-surface">Pluie Tropicale</h4>
<p className="text-label-sm text-on-surface-variant">Calme &amp; Rythmique</p>
</div>

<div className="relative group cursor-pointer bg-surface-container-low border border-outline-variant rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1" id="card-2">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">nature</span>
</div>
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">play_arrow</span>
</button>
</div>
<h4 className="font-headline font-bold text-on-surface">Forêt du Banco</h4>
<p className="text-label-sm text-on-surface-variant">Oiseaux &amp; Vent</p>
</div>

<div className="relative group cursor-pointer bg-surface-container-low border border-outline-variant rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1" id="card-3">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">waves</span>
</div>
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">play_arrow</span>
</button>
</div>
<h4 className="font-headline font-bold text-on-surface">Bruit Blanc</h4>
<p className="text-label-sm text-on-surface-variant">Concentration Pure</p>
</div>

<div className="relative group cursor-pointer bg-surface-container-low border border-outline-variant rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1" id="card-4">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined">coffee</span>
</div>
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">play_arrow</span>
</button>
</div>
<h4 className="font-headline font-bold text-on-surface">Café Calme</h4>
<p className="text-label-sm text-on-surface-variant">Ambiance Urbaine</p>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-6">

<div className="space-y-4">
<div className="flex items-center justify-between">
<label className="font-headline font-bold text-on-surface">Volume d'ambiance</label>
<span className="font-mono text-primary font-bold" id="volume-label">65%</span>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-outline">volume_mute</span>
<input className="w-full h-1.5 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary custom-slider" max={100} min={0} type="range" value="65" />
<span className="material-symbols-outlined text-outline">volume_up</span>
</div>
</div>
<hr className="border-outline-variant" />

<div className="flex items-center justify-between">
<div className="space-y-0.5">
<p className="font-headline font-bold text-on-surface">Démarrer automatiquement</p>
<p className="text-label-sm text-on-surface-variant">Active le son avec le minuteur Pomodoro</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
</label>
</div>
</section>

<section className="bg-tertiary/5 border border-tertiary-container/20 rounded-xl p-4 flex gap-4 items-center">
<span className="material-symbols-outlined text-tertiary-container text-3xl">lightbulb</span>
<p className="text-body-md text-tertiary leading-tight">
<strong>Astuce :</strong> La "Pluie Tropicale" est idéale pour bloquer les bruits de circulation lors de vos révisions intensives.
            </p>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-on-surface border-t border-outline-variant dark:border-outline shadow-md h-16 flex justify-around items-center px-2 pb-safe">
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label text-label-xs">Examens</span>
</button>

<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>timer</span>
<span className="font-label text-label-xs">Pomodoro</span>
</button>
</nav>
<script>
        function toggleActive(id) &#123;
            // Simple visual toggle for selection
            const cards = document.querySelectorAll('.grid &gt; div');
            cards.forEach(card =&gt; card.classList.remove('active-sound-card'));
            
            const selectedCard = document.getElementById('card-' + id);
            selectedCard.classList.add('active-sound-card');

            // Toggle play/pause icon logic (simplified for UI demonstration)
            const allButtons = document.querySelectorAll('.grid button');
            allButtons.forEach(btn =&gt; &#123;
                btn.innerHTML = '&lt;span class="material-symbols-outlined text-[20px]"&gt;play_arrow&lt;/span&gt;';
                btn.classList.replace('bg-secondary-container', 'bg-surface-container-high');
                btn.classList.replace('text-on-secondary-container', 'text-on-surface-variant');
            &#125;);

            const currentBtn = selectedCard.querySelector('button');
            currentBtn.innerHTML = '&lt;span class="material-symbols-outlined text-[20px]" style="font-variation-settings: \'FILL\' 1;"&gt;pause&lt;/span&gt;';
            currentBtn.classList.replace('bg-surface-container-high', 'bg-secondary-container');
            currentBtn.classList.replace('text-on-surface-variant', 'text-on-secondary-container');
        &#125;

        function updateVolume(val) &#123;
            document.getElementById('volume-label').textContent = val + '%';
        &#125;
    </script>

    </div>
  );
}
