import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Espace Live" };

export default function Page() {
  return (
    <div className="bg-background text-on-background pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container shadow-md docked full-width top-0 sticky z-50 flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary dark:text-on-primary-container text-2xl">school</span>
<h1 className="font-headline text-display-lg-mobile font-bold tracking-tight text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<button className="text-on-primary dark:text-on-primary-container hover:opacity-80 transition-opacity active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<main className="max-w-7xl mx-auto px-4 py-6 md:px-8">

<section className="mb-8">
<h2 className="text-headline-md font-semibold text-primary mb-2">Espace Live</h2>
<p className="text-on-surface-variant font-body">Retrouvez vos professeurs en direct et interagissez en temps réel.</p>
</section>

<section className="mb-10">
<div className="flex items-center gap-2 mb-4">
<span className="relative flex h-3 w-3">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
</span>
<h3 className="font-headline text-xl font-bold uppercase tracking-wide text-error">En Direct Maintenant</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<div className="md:col-span-8 relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest group">
<div className="absolute top-4 left-4 z-10">
<span className="bg-error text-on-error px-3 py-1 rounded-lg text-label-xs font-bold flex items-center gap-1 shadow-lg">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>fiber_manual_record</span>
                            LIVE
                        </span>
</div>
<div className="absolute top-4 right-4 z-10">
<span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-label-xs font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-sm">group</span>
                            1,240 élèves
                        </span>
</div>
<div className="aspect-video w-full relative">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[5]"></div>
<div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWK-YtfNtRfn1OGJPHjGLHoaBxqxRaLtWeNM9iYqTgXS_aau78KCaB3Z_symvAW4hK-jfCpTOSXYMXYvTxB10tmxQht8sGC7I6oAfJQazfNGyXIBnNlnQuE2V53ILhHpSfrnpm2-K1Llg-TWJKE-uNNYpdxMsdJ6QeorIxdG1LkXQPXz16KzD-sVu6IUGrPKKDM2k78mZBfdxnbI8WSeNgduvdUnOkvFDofICQVsBNL29RbQeZrZzR')"}}></div>
<div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<p className="text-secondary-fixed font-semibold text-label-sm mb-1">Mathématiques • Terminale C</p>
<h4 className="text-white text-2xl font-bold leading-tight mb-2">Probabilités : Variables aléatoires et lois usuelles</h4>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-134.png" alt="Portrait of an experienced and friendly African male professor, Prof. Koffi, wearing glasses and a professional shirt, smiling at the camera against a library background. High definition, soft studio lighting." />
</div>
<span className="text-white text-body-md font-medium">Prof. Koffi</span>
</div>
</div>
<button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl whitespace-nowrap">
                                Rejoindre le cours
                                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</div>

<div className="md:col-span-4 flex flex-col gap-4">
<div className="bg-primary-container p-6 rounded-xl text-on-primary-container flex-1 border border-primary">
<h5 className="font-headline font-bold mb-4 flex items-center gap-2">
<span className="material-symbols-outlined">psychology</span>
                            Pourquoi rejoindre ?
                        </h5>
<ul className="space-y-4 text-sm">
<li className="flex gap-3">
<span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
<span>Posez vos questions en direct au Professeur.</span>
</li>
<li className="flex gap-3">
<span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
<span>Quiz interactifs pour tester vos acquis.</span>
</li>
<li className="flex gap-3">
<span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
<span>Fiches de révision exclusives offertes.</span>
</li>
</ul>
</div>
<div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant">
<p className="text-on-surface-variant text-label-xs uppercase font-bold mb-3">Sujet Suivant</p>
<div className="flex items-center gap-4">
<div className="bg-tertiary-container text-on-tertiary-container w-12 h-12 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">science</span>
</div>
<div>
<p className="text-on-surface font-bold text-sm">Physique-Chimie</p>
<p className="text-on-surface-variant text-xs">Débute à 16:30</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="mb-12">
<div className="flex items-center justify-between mb-6">
<h3 className="text-headline-md font-bold text-on-surface">Prochaines Sessions</h3>
<button className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                    Tout voir <span className="material-symbols-outlined text-sm">calendar_month</span>
</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl hover:border-primary transition-colors cursor-pointer group">
<div className="flex justify-between items-start mb-4">
<div className="bg-primary/10 text-primary px-3 py-1 rounded text-label-xs font-bold uppercase">Aujourd'hui • 16:30</div>
<button className="text-outline hover:text-secondary-container transition-colors" title="M'alerter">
<span className="material-symbols-outlined">notifications_active</span>
</button>
</div>
<h4 className="text-on-surface font-bold text-lg mb-1 group-hover:text-primary transition-colors">Énergie Cinétique et Travail d'une force</h4>
<p className="text-on-surface-variant text-sm mb-4">Physique-Chimie • Prof. Touré</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-400"></div>
</div>
<span className="text-label-xs text-on-surface-variant">450 inscrits</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl hover:border-primary transition-colors cursor-pointer group">
<div className="flex justify-between items-start mb-4">
<div className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded text-label-xs font-bold uppercase">Demain • 09:00</div>
<button className="text-outline hover:text-secondary-container transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
<h4 className="text-on-surface font-bold text-lg mb-1 group-hover:text-primary transition-colors">Français : Commentaire composé</h4>
<p className="text-on-surface-variant text-sm mb-4">Littérature • Mme. Kouamé</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
</div>
<span className="text-label-xs text-on-surface-variant">210 inscrits</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl hover:border-primary transition-colors cursor-pointer group">
<div className="flex justify-between items-start mb-4">
<div className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded text-label-xs font-bold uppercase">Demain • 14:00</div>
<button className="text-outline hover:text-secondary-container transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
<h4 className="text-on-surface font-bold text-lg mb-1 group-hover:text-primary transition-colors">Anglais : Mastering Tenses</h4>
<p className="text-on-surface-variant text-sm mb-4">Langues • Mr. Wilson</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
</div>
<span className="text-label-xs text-on-surface-variant">85 inscrits</span>
</div>
</div>
</div>
</section>

<section>
<div className="flex items-center justify-between mb-6">
<h3 className="text-headline-md font-bold text-on-surface">Rediffusions (Replays)</h3>
<div className="flex items-center gap-2">
<select className="bg-surface-container border-none text-on-surface-variant text-sm rounded-lg py-1 px-3 focus:ring-2 focus:ring-primary">
<option>Toutes les matières</option>
<option>Mathématiques</option>
<option>Français</option>
</select>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="flex flex-col group">
<div className="relative aspect-video rounded-lg overflow-hidden mb-3">
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlzGLBphxjT8lJSgu40fY5Rk-W54dCoZC94a4PCP5CeoUJidhDUHTkt2zIyE9sfqjrN6CN8BhtDpJajN0WLsb_HBgDO0iOTNH97MxQ8AS65VBWZeGYqxyQvpQ21g4NANkmhRicWRd412loBTOlJFXK_GaxENlLQ-v7grda7xd-kUIg-pWQaddQL9TeESKFaAmeuhO_IcqC9HRAKfSmiiEOtGqX3Rr4mCJf87jCcUW5ehi3V2NjIDqh')"}}></div>
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-white text-5xl">play_circle</span>
</div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                            45:12
                        </div>
</div>
<h5 className="text-on-surface font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary">Les fonctions exponentielles - Partie 1</h5>
<p className="text-on-surface-variant text-xs mt-1">Il y a 2 jours • 3.2k vues</p>
</div>

<div className="flex flex-col group">
<div className="relative aspect-video rounded-lg overflow-hidden mb-3">
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBvL9XrNqUJbILj6ZkSOie83El30hsyYiCFT_yeX6UqHvCG7hGd3BRVe3PSWBMInxU_jP1w8D-DLT1bWxCtxyTzdfbrq2l-VoAEYgt7pwUtHK6dPEofM3_ENV0G8b2snUFjXyt-YaBT-_74IPc2Ij1qWcvw9YjEOL9TmX41PJbfSq1V757ROYKV1OWq-V3hieE8VXMArtk7RLBhGY_BFwr5B07aMa8fUYmgsy_UqPcL06vqSZbBpN9')"}}></div>
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-white text-5xl">play_circle</span>
</div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                            58:05
                        </div>
</div>
<h5 className="text-on-surface font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary">Analyse de texte : "Une vie de boy" d'Oyono</h5>
<p className="text-on-surface-variant text-xs mt-1">Il y a 3 jours • 1.8k vues</p>
</div>

<div className="flex flex-col group">
<div className="relative aspect-video rounded-lg overflow-hidden mb-3">
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdhBSeo1R5K4tRVlg4rocVOhR0bkjwVsrO9X6swbckwPI3JEOk6DtEyR2z92kC168pdxYbATeaElOHbGPWrridnjx9qnDJYGFaVbY2BEvtJCMapkQGahV19uosYIS1gF-ZTRUs7tXtCXIO_8bhEcrhrHXGdQFyeJAUafC9akJf0jYfAy4dFnb7xum0LLPNSE0692I37RUlz2N5NKQ7WnEW-RLClXhFGyzGevs6TQHOvxGRDfsrirdP')"}}></div>
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-white text-5xl">play_circle</span>
</div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                            32:44
                        </div>
</div>
<h5 className="text-on-surface font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary">Oxydoréduction : Équilibrer les équations</h5>
<p className="text-on-surface-variant text-xs mt-1">Il y a 5 jours • 2.5k vues</p>
</div>

<div className="flex flex-col group">
<div className="relative aspect-video rounded-lg overflow-hidden mb-3">
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgPpjPD1nvbuM8Av7H8h86-j5ut2g_LSXLfEwjY-X_OmYRYH_TLUb7NQJQfvfvfQZ7ciUOwlTg6TMoqj8ZolCcqfAYcBUqL17kkz3luKDTAVMp38AdlgtkaCn7xCFMojUMGAhPmkzBYltz0Doio36Kz0EHtqG68kUai8RRo5kfDyBsFc4NFLt1GvVug2l6uRXjcIXu06RxeYMOnrdaNIpangQpvZCQM3UvsK_w_YRYLAQf2a7Hptw1')"}}></div>
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
<span className="material-symbols-outlined text-white text-5xl">play_circle</span>
</div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                            51:20
                        </div>
</div>
<h5 className="text-on-surface font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary">Histoire : La décolonisation de l'Afrique de l'Ouest</h5>
<p className="text-on-surface-variant text-xs mt-1">Il y a une semaine • 4.1k vues</p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pt-2 pb-4 px-2 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors px-4 py-1 rounded-full active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs font-semibold mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-5 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>live_tv</span>
<span className="font-label text-label-xs font-semibold mt-1">Revision</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors px-4 py-1 rounded-full active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="font-label text-label-xs font-semibold mt-1">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors px-4 py-1 rounded-full active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold mt-1">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for live status updates or simple UI reactions
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                button.classList.add('scale-95');
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
        &#125;);

        // Simulating the feeling of a dynamic hub
        console.log("Espace Live Edukora chargé avec succès.");
    </script>

    </div>
  );
}
