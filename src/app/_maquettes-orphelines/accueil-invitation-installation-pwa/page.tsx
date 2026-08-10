import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Accueil" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" data-icon="school">school</span>
<h1 className="font-headline text-2xl font-bold text-primary dark:text-primary-fixed">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-1.5 px-2 py-1 bg-tertiary-container/10 rounded-full border border-tertiary/20">
<span className="material-symbols-outlined text-tertiary text-[18px]" data-icon="offline_pin">offline_pin</span>
<span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Prêt hors ligne</span>
</div>
<button className="relative hover:bg-surface-container-high transition-colors p-2 rounded-full active:opacity-80 transition-opacity">
<span className="material-symbols-outlined text-on-surface-variant dark:text-surface-variant" data-icon="notifications">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
</button>
</div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="bg-pwa-banner rounded-xl p-5 text-white shadow-lg flex items-center gap-4 relative overflow-hidden group transition-all hover:shadow-xl">
<div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
<span className="material-symbols-outlined text-9xl" data-icon="install_mobile">install_mobile</span>
</div>
<div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-inner">
<img className="w-10 h-10 object-contain" src="/images/ecran-005.png" alt="A professional, minimalist app icon for Edukora, featuring a stylized blue open book and a bright orange mortarboard cap. The icon is rendered in a high-gloss 3D style with soft studio lighting and clean vector lines, sitting against a pristine white background. The corporate academic blue and energetic national orange palette reflects professional education and Ivorian progress." />
</div>
<div className="flex-1 space-y-2">
<h2 className="font-headline font-bold text-lg leading-tight">Installer Edukora sur votre écran d'accueil</h2>
<button className="bg-secondary text-white font-bold px-4 py-2 rounded-lg text-sm active:scale-95 transition-transform">
                    Installer
                </button>
</div>
</section>

<section className="flex items-end justify-between py-2">
<div>
<p className="text-on-surface-variant text-sm font-medium">Bonjour,</p>
<h2 className="font-headline text-3xl font-extrabold text-primary">Salut, Koffi</h2>
</div>
<div className="w-12 h-12 rounded-full border-2 border-primary-container p-0.5 overflow-hidden">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-006.png" alt="A high-quality studio portrait of a confident young Ivorian student in his late teens, smiling warmly. He wears a clean, professional white polo shirt, representing the academic focus of Edukora. The lighting is soft and natural, with a shallow depth of field against a blurred classroom background. The overall aesthetic is optimistic, academic, and modern." />
</div>
</section>

<section className="grid grid-cols-2 gap-4">

<div className="col-span-2 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm space-y-4">
<div className="flex justify-between items-center">
<span className="text-on-surface-variant font-semibold text-sm">Progression BAC 2024</span>
<span className="text-tertiary font-bold font-headline text-xl">68%</span>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[68%] rounded-full relative">
<div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
</div>
</div>
<p className="text-xs text-on-surface-variant italic">Encore 4 chapitres pour atteindre votre objectif de la semaine.</p>
</div>

<div className="bg-secondary-container/10 border border-secondary/20 p-4 rounded-xl flex flex-col justify-between h-32">
<span className="material-symbols-outlined text-secondary" data-icon="timer">timer</span>
<div>
<h3 className="font-bold text-on-secondary-container">Mode Examen</h3>
<p className="text-[10px] text-on-secondary-container/70">Simulateur intensif</p>
</div>
</div>

<div className="bg-primary-container/10 border border-primary/20 p-4 rounded-xl flex flex-col justify-between h-32">
<span className="material-symbols-outlined text-primary" data-icon="quiz">quiz</span>
<div>
<h3 className="font-bold text-primary">Quiz du jour</h3>
<p className="text-[10px] text-primary/70">10 questions rapides</p>
</div>
</div>
</section>

<section className="space-y-3">
<div className="flex justify-between items-center">
<h3 className="font-headline font-bold text-lg">Continuer l'étude</h3>
<a className="text-primary text-sm font-bold" href="#">Voir tout</a>
</div>
<div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
<div className="flex h-36">
<div className="w-1/3 bg-surface-container relative">
<img className="w-full h-full object-cover" src="/images/ecran-007.png" alt="A sophisticated scientific illustration of complex mathematical equations and geometric shapes like parabolas and spheres floating in a digital blue space. The style is clean and academic, using Academic Blue and Forest Green accents. It conveys a sense of high-level secondary education and intellectual rigor, perfect for a Baccalaureate prep course." />
<div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
</div>
<div className="w-2/3 p-4 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Mathématiques</span>
<span className="text-on-surface-variant text-[10px]">• 45 min restantes</span>
</div>
<h4 className="font-bold text-lg text-on-surface leading-snug">Calcul Intégral &amp; Dérivées</h4>
</div>
<button className="flex items-center justify-center gap-2 w-full py-2 bg-secondary text-white font-bold rounded-lg active:scale-95 transition-transform">
<span className="material-symbols-outlined text-[20px]" data-icon="play_circle">play_circle</span>
                            Reprendre
                        </button>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/50 flex items-center gap-4">
<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="smart_toy">smart_toy</span>
</div>
<div className="flex-1">
<p className="text-sm font-bold text-on-surface">Besoin d'aide pour un exercice ?</p>
<p className="text-xs text-on-surface-variant">Demandez au tuteur IA Edukora</p>
</div>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="chevron_right">chevron_right</span>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-surface-dim shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center px-2 py-3">

<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim bg-secondary-container/10 rounded-xl p-2 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="home" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary dark:hover:text-primary-fixed active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary dark:hover:text-primary-fixed active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary dark:hover:text-primary-fixed active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="local_library">local_library</span>
<span className="font-label text-label-xs font-semibold">Bibliothèque</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary dark:hover:text-primary-fixed active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for the PWA banner
        document.querySelector('.bg-pwa-banner button').addEventListener('click', function() &#123;
            this.textContent = 'Téléchargement...';
            this.classList.add('animate-pulse');
            setTimeout(() =&gt; &#123;
                this.textContent = 'Installé';
                this.classList.remove('animate-pulse');
                this.classList.replace('bg-secondary', 'bg-tertiary');
            &#125;, 1500);
        &#125;);

        // Simple visibility effect for cards on scroll
        const observerOptions = &#123;
            threshold: 0.1
        &#125;;

        const observer = new IntersectionObserver((entries) =&gt; &#123;
            entries.forEach(entry =&gt; &#123;
                if (entry.isIntersecting) &#123;
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                &#125;
            &#125;);
        &#125;, observerOptions);

        document.querySelectorAll('section').forEach(section =&gt; &#123;
            section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
            observer.observe(section);
        &#125;);
    </script>

    </div>
  );
}
