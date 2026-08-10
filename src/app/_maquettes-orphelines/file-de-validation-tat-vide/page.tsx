import type { Metadata } from "next";

export const metadata: Metadata = { title: "File de validation - Edukora Professor" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex fixed left-0 top-0 h-full w-[280px] bg-surface border-r border-surface-border dark:border-outline-variant flex-col py-16 gap-4 z-40">
<div className="px-8 mb-8">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-3xl">school</span>
<span className="font-headline text-2xl font-bold text-primary">Edukora</span>
</div>
</div>
<div className="px-4 mb-10">
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low">
<img className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-fixed" src="/images/ecran-154.png" alt="A professional high-resolution headshot of a distinguished professor, Dr. Elena Vance, in a brightly lit academic office. She is smiling warmly, wearing a professional blazer. The background is softly blurred with bookshelves and a window. The lighting is clean and institutional, consistent with a modern light-mode education portal." />
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Dr. Elena Vance</span>
<span className="text-xs text-on-surface-variant">Senior Faculty</span>
</div>
</div>
</div>
<nav className="flex flex-col gap-1 px-4">
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-medium">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-fixed-dim/10 transition-all" href="#">
<span className="material-symbols-outlined active-icon" style={{"fontVariationSettings":"'FILL' 1"}}>fact_check</span>
<span className="font-medium">Validation Lab</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">insights</span>
<span className="font-medium">Impact Analytics</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-medium">Paramètres</span>
</a>
</nav>
</aside>

<header className="md:ml-[280px] w-full top-0 h-16 flex justify-between items-center px-6 md:px-8 bg-surface border-b border-surface-border dark:border-outline-variant z-30 sticky">
<div className="flex items-center gap-4 md:hidden">
<span className="material-symbols-outlined text-primary">school</span>
<span className="text-xl font-bold text-primary">Edukora Professor</span>
</div>
<div className="hidden md:block">
<h1 className="text-xl font-bold text-primary">Validation Lab</h1>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-surface-container-low transition-colors relative">
<span className="material-symbols-outlined text-on-surface-variant">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary text-xs font-bold md:hidden">
                EV
            </div>
</div>
</header>

<main className="md:ml-[280px] flex-1 academic-gradient min-h-[calc(100vh-64px)] p-6 md:p-12 flex flex-col items-center justify-center">

<div className="max-w-4xl w-full flex flex-col items-center">

<div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[2rem] p-10 md:p-16 border border-outline-variant/30 text-center shadow-sm">

<div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden rounded-[2rem]">
<div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-fixed rounded-full blur-[100px]"></div>
<div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary-fixed rounded-full blur-[100px]"></div>
</div>

<div className="relative z-10 mb-10 flex justify-center">
<div className="relative group">

<div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-fixed rounded-xl flex items-center justify-center shadow-sm transform rotate-12 transition-transform group-hover:scale-110">
<span className="material-symbols-outlined text-secondary font-bold">star</span>
</div>
<div className="absolute -bottom-2 -left-6 w-10 h-10 bg-tertiary-fixed rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:-translate-y-2">
<span className="material-symbols-outlined text-tertiary text-lg">check</span>
</div>

<div className="w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] bg-surface-container overflow-hidden ring-8 ring-surface-container-lowest shadow-md">
<img className="w-full h-full object-cover" src="/images/ecran-155.png" alt="A clean, minimalist 3D isometric illustration of a modern teacher's desk. The desk is white and uncluttered, featuring only a single glowing tablet showing a green checkmark and a small potted plant. The lighting is soft and serene with a bright, airy atmosphere. Academic Blue and Forest Green accents highlight the sense of completion and organized success. High-end, corporate aesthetic for a professional dashboard." />
</div>
</div>
</div>

<div className="relative z-10 space-y-4 max-w-lg mx-auto">
<h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight">
                        Tout est à jour !
                    </h2>
<p className="text-lg text-on-surface-variant font-body leading-relaxed">
                        Il n'y a aucune fiche en attente de validation pour le moment. Profitez-en pour consulter vos statistiques d'impact.
                    </p>
</div>

<div className="relative z-10 mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
<button className="w-full md:w-auto px-8 py-4 bg-secondary rounded-xl text-white font-bold text-lg hover:bg-secondary-container hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3">
<span className="material-symbols-outlined">monitoring</span>
                        Voir mes statistiques
                    </button>
<button className="w-full md:w-auto px-8 py-4 bg-surface-container-high rounded-xl text-on-surface font-semibold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-3">
<span className="material-symbols-outlined">refresh</span>
                        Actualiser la file
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
<div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 flex flex-col gap-3">
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">schedule</span>
</div>
<h3 className="font-bold text-on-surface">Prochaine mise à jour</h3>
<p className="text-sm text-on-surface-variant">Les nouvelles soumissions sont traitées toutes les 15 minutes.</p>
</div>
<div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 flex flex-col gap-3">
<div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">history_edu</span>
</div>
<h3 className="font-bold text-on-surface">Historique récent</h3>
<p className="text-sm text-on-surface-variant">Vous avez validé 24 fiches au cours des dernières 24 heures.</p>
</div>
<div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 flex flex-col gap-3">
<div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">verified</span>
</div>
<h3 className="font-bold text-on-surface">Score de qualité</h3>
<p className="text-sm text-on-surface-variant">Votre précision de validation est de 99,8 % (Statut Élite).</p>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 pb-safe bg-surface border-t border-surface-border shadow-sm z-50 md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-high transition-transform scale-95" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold active:bg-surface-container-high transition-transform scale-95" href="#">
<span className="material-symbols-outlined active-icon" style={{"fontVariationSettings":"'FILL' 1"}}>approval</span>
<span className="text-[10px] font-medium">Vérifier</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-high transition-transform scale-95" href="#">
<span className="material-symbols-outlined">monitoring</span>
<span className="text-[10px] font-medium">Metrics</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-high transition-transform scale-95" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-[10px] font-medium">Profil</span>
</a>
</nav>

<script>
        document.addEventListener('mousemove', (e) =&gt; &#123;
            const blobs = document.querySelectorAll('.blur-\\[100px\\]');
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            
            blobs.forEach((blob, index) =&gt; &#123;
                const multiplier = index === 0 ? 1 : -1;
                blob.style.transform = `translate($&#123;x * multiplier&#125;px, $&#123;y * multiplier&#125;px)`;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
