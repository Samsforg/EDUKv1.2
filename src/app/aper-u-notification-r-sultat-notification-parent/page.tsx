import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Parent - Dashboard" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md push-animation">
<div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-[24px] shadow-2xl p-4 border border-outline-variant/30 flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-[10px] text-white font-bold">E</div>
<span className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Edukora Parent</span>
</div>
<span className="text-on-surface-variant text-[11px]">Il y a 2 min</span>
</div>
<div className="flex flex-col gap-1">
<h4 className="text-on-surface font-bold text-sm">Nouveau résultat : Mathématiques</h4>
<p className="text-on-surface-variant text-sm leading-snug">Koffi Konan a obtenu 16/20 à son examen blanc de ce matin. Félicitez-le !</p>
</div>
<div className="mt-1 h-1.5 w-12 bg-outline-variant/50 rounded-full mx-auto"></div>
</div>
</div>

<div className="notification-blur min-h-screen flex flex-col">

<header className="bg-surface dark:bg-surface-dim fixed top-0 w-full z-50 border-b border-outline-variant dark:border-on-surface-variant flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-020.png" alt="A professional close-up portrait of a West African parent smiling warmly, set against a blurred academic background with soft daylight. The image uses a clean, light-mode aesthetic with high-quality focus on facial details, reflecting the Edukora brand's focus on trust and academic support. Soft blues and neutral tones dominate the composition." />
</div>
<h1 className="font-headline font-bold text-primary dark:text-primary-fixed-dim text-headline-md">Edukora Parent</h1>
</div>
<div className="relative active:scale-95 transition-transform duration-150 hover:bg-surface-container-high p-2 rounded-full">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
</div>
</header>
<main className="pt-20 pb-24 px-4 flex-grow max-w-5xl mx-auto w-full">

<section className="mb-8">
<h2 className="text-display-lg-mobile font-bold text-on-surface mb-1">Bonjour, M. Konan</h2>
<p className="text-on-surface-variant font-body">Voici le suivi de la progression de vos enfants aujourd'hui.</p>
</section>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-xl overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-021.png" alt="A bright, energetic portrait of a young Ivorian student wearing a school uniform, looking confident and happy. The background is a modern classroom with soft focus. The lighting is optimistic and bright, aligning with the Forest Green progress theme of the Edukora brand for student success." />
</div>
<div>
<h3 className="font-bold text-lg text-on-surface leading-tight">Koffi Konan</h3>
<p className="text-sm text-on-surface-variant font-medium">3ème - Préparation BEPC</p>
</div>
</div>
<div className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">trending_up</span>
                            En progression
                        </div>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container p-4 rounded-lg">
<p className="text-xs text-on-surface-variant font-bold uppercase mb-1">Moyenne Générale</p>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-extrabold text-primary">15.42</span>
<span className="text-xs text-outline font-bold">/20</span>
</div>
</div>
<div className="bg-surface-container p-4 rounded-lg">
<p className="text-xs text-on-surface-variant font-bold uppercase mb-1">Assiduité</p>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-extrabold text-tertiary">98%</span>
</div>
</div>
</div>

<div className="space-y-4">
<h4 className="text-sm font-bold text-on-surface">Progrès par matière</h4>
<div className="space-y-3">
<div>
<div className="flex justify-between text-xs mb-1 font-semibold">
<span>Mathématiques</span>
<span>85%</span>
</div>
<div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary w-[85%] rounded-full"></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs mb-1 font-semibold">
<span>Physique-Chimie</span>
<span>62%</span>
</div>
<div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-secondary-container w-[62%] rounded-full"></div>
</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-1 flex flex-col gap-4">
<div className="bg-primary text-on-primary rounded-xl p-5 shadow-lg relative overflow-hidden">
<div className="relative z-10">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-secondary-fixed">psychology</span>
<span className="font-bold text-sm tracking-wide">CONSEIL IA</span>
</div>
<p className="text-sm font-medium leading-relaxed opacity-90">
                                "Koffi excelle en calcul mais semble ralentir sur la géométrie. Encouragez-le à utiliser le simulateur d'examen Edukora ce soir."
                            </p>
<button className="mt-4 w-full bg-on-primary text-primary py-2 rounded-lg font-bold text-xs hover:bg-primary-fixed transition-colors">
                                Voir les recommandations
                            </button>
</div>
<div className="absolute -bottom-4 -right-4 opacity-10">
<span className="material-symbols-outlined text-9xl">school</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
<h4 className="text-sm font-bold text-on-surface mb-4">Examens à venir</h4>
<div className="space-y-4">
<div className="flex gap-3 items-start border-l-2 border-secondary pl-3">
<div>
<p className="text-sm font-bold text-on-surface">Français (Dissertation)</p>
<p className="text-xs text-on-surface-variant">Demain • 08:00</p>
</div>
</div>
<div className="flex gap-3 items-start border-l-2 border-primary pl-3">
<div>
<p className="text-sm font-bold text-on-surface">Anglais (Oral)</p>
<p className="text-xs text-on-surface-variant">Jeudi 14 Oct • 14:30</p>
</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-3 bg-surface-container-low rounded-xl p-4 border border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-022.png" alt="A sweet portrait of a younger Ivorian girl in a school setting, smiling brightly. The image has soft lighting and a warm, supportive atmosphere. The colors include subtle hints of academic blue and national orange, maintaining the Edukora design language for primary school students." />
</div>
<div>
<h3 className="font-bold text-on-surface">Awa Konan</h3>
<p className="text-xs text-on-surface-variant">CM2 - Objectif Entrée en 6ème</p>
</div>
</div>
<button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                        Gérer le profil
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest dark:bg-inverse-surface shadow-md h-16 pb-safe flex justify-around items-center">
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs">Tableau</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined">description</span>
<span className="font-label text-label-xs">Examens</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined">event_available</span>
<span className="font-label text-label-xs">Assiduité</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
</div>
<script>
        // Simple micro-interaction for the notification
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const notification = document.querySelector('.push-animation');
            
            // Auto-hide or dismiss on click simulation
            notification.addEventListener('click', () =&gt; &#123;
                notification.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                notification.style.transform = 'translateY(-120%) translateX(-50%)';
                notification.style.opacity = '0';
                
                // Remove blur effect from background
                setTimeout(() =&gt; &#123;
                    document.querySelector('.notification-blur').style.backdropFilter = 'none';
                    document.querySelector('.notification-blur').style.filter = 'none';
                &#125;, 100);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
