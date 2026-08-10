import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Parrainage" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary" data-icon="school">school</span>
<h1 className="font-headline text-display-lg-mobile font-bold tracking-tight text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<button className="p-2 hover:bg-primary-container/20 transition-colors active:scale-95 duration-150 rounded-full">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="mt-4">
<div className="bg-primary-container text-on-primary-container p-6 rounded-xl relative overflow-hidden">
<div className="relative z-10">
<h2 className="text-2xl font-bold mb-2">Gagne du temps Premium</h2>
<p className="text-on-primary-container/90 leading-relaxed">
                        Partage l'expérience Edukora avec tes amis ! Pour chaque proche qui s'inscrit avec ton code, vous recevez chacun <span className="font-bold underline decoration-secondary-container underline-offset-4">7 jours d'accès Premium gratuit</span>.
                    </p>
</div>
<div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
<span className="material-symbols-outlined text-9xl" data-icon="bolt">bolt</span>
</div>
</div>
</section>

<section className="grid grid-cols-2 gap-4">
<div className="glass-card p-4 rounded-xl flex flex-col items-center text-center shadow-sm border-l-4 border-l-secondary-container">
<span className="material-symbols-outlined text-secondary mb-1" data-icon="verified_user">verified_user</span>
<span className="text-2xl font-bold text-primary">14 jours</span>
<span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Premium gagnés</span>
</div>
<div className="glass-card p-4 rounded-xl flex flex-col items-center text-center shadow-sm border-l-4 border-l-tertiary">
<span className="material-symbols-outlined text-tertiary mb-1" data-icon="group">group</span>
<span className="text-2xl font-bold text-primary">2 amis</span>
<span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Inscrits</span>
</div>
</section>

<section className="rounded-xl overflow-hidden shadow-sm border border-outline-variant">
<div className="relative h-48 w-full">
<img className="w-full h-full object-cover" src="/images/ecran-359.png" alt="A warm, professional digital illustration of two high school students, a boy and a girl, sitting together at a modern wooden desk studying. They are smiling and looking at a tablet screen together. The style is clean and academic with soft lighting, featuring a color palette of ivory, academic blue, and vibrant orange accents. The background is a minimalist classroom with a bright, optimistic light-mode atmosphere." />
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
<p className="text-white font-semibold text-sm">L'union fait la force ! Réussissez ensemble le BAC/BEPC.</p>
</div>
</div>
</section>

<section className="space-y-3">
<h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest px-1">Mon Code de Parrainage</h3>
<div className="bg-surface-container flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-primary/30">
<code className="text-lg font-bold tracking-widest text-primary select-all">EDUK-KOFFI-2024</code>
<button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-container active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm" data-icon="content_copy">content_copy</span>
<span>Copier</span>
</button>
</div>
</section>

<section className="space-y-4">
<h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest px-1">Partage Rapide</h3>
<div className="grid grid-cols-1 gap-3">
<button className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:brightness-105 active:scale-[0.98] transition-all">
<span className="material-symbols-outlined" data-icon="chat">chat</span>
                    Partager sur WhatsApp
                </button>
<div className="grid grid-cols-2 gap-3">
<button className="flex items-center justify-center gap-2 bg-[#0084FF] text-white py-3 rounded-xl font-semibold shadow-sm hover:brightness-105 active:scale-[0.98] transition-all">
<span className="material-symbols-outlined" data-icon="forum">forum</span>
                        Messenger
                    </button>
<button className="flex items-center justify-center gap-2 bg-surface-container-highest text-primary py-3 rounded-xl font-semibold shadow-sm hover:bg-surface-dim active:scale-[0.98] transition-all">
<span className="material-symbols-outlined" data-icon="link">link</span>
                        Lien direct
                    </button>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full rounded-t-xl z-50 bg-surface dark:bg-surface-container-low border-t border-outline-variant dark:border-outline shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe w-full">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs font-medium">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="bookmark">bookmark</span>
<span className="font-label text-label-xs font-medium">Favoris</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        function copyToClipboard(text) &#123;
            navigator.clipboard.writeText(text).then(() =&gt; &#123;
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full text-sm font-medium shadow-lg z-[100] flex items-center gap-2 transition-opacity duration-300';
                toast.innerHTML = '&lt;span class="material-symbols-outlined text-tertiary-fixed"&gt;check_circle&lt;/span&gt; Code copié !';
                document.body.appendChild(toast);
                setTimeout(() =&gt; &#123;
                    toast.style.opacity = '0';
                    setTimeout(() =&gt; toast.remove(), 300);
                &#125;, 2000);
            &#125;);
        &#125;
    </script>

    </div>
  );
}
