import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Live Replay & Ressources" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container shadow-md docked full-width top-0 sticky z-50 flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="text-on-primary dark:text-on-primary-container active:scale-95 duration-150">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-primary dark:text-on-primary-container">school</span>
<h1 className="font-headline text-headline-md font-semibold text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-on-primary dark:text-on-primary-container hover:opacity-80 transition-opacity active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">
                JD
            </div>
</div>
</header>
<main className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">

<section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

<div className="lg:col-span-2">
<div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-xl group">
<div className="absolute inset-0 flex items-center justify-center cursor-pointer">
<div className="w-full h-full bg-cover bg-center opacity-60" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeIocEuoXUlYCdthir3AYdkxZcu4SUd58elRoc8P6AKhDg6AT2qKsxWy-DeuD2KFzSBBmrd6CpVxzG0NF8PR28tNeD6b9tcrtPTGQJ_88X3wVT5V2OLbzZ5uavLdu7jVGYp_QG45OQinA7OGLBXABTvHMieIHGl3_l48UJfX6cJsySs4mDe1lsUHkYO-oQVcuQVN5BHjUXXRdN5yGxDePrUmpD3U1AV6WpvXmTdBVoWX0GMe-l9sl1')"}}></div>
<div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
<button className="z-10 bg-secondary-container text-on-secondary-container p-6 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-200">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>play_arrow</span>
</button>
</div>

<div className="absolute bottom-0 left-0 w-full p-4 video-gradient flex flex-col gap-2">
<div className="w-full h-1 bg-white/30 rounded-full relative overflow-hidden">
<div className="absolute top-0 left-0 h-full w-1/3 bg-secondary-container"></div>
</div>
<div className="flex justify-between items-center text-white text-sm">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer">play_circle</span>
<span className="material-symbols-outlined cursor-pointer">volume_up</span>
<span className="font-label">12:45 / 45:00</span>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer">settings</span>
<span className="material-symbols-outlined cursor-pointer">fullscreen</span>
</div>
</div>
</div>
</div>
<div className="mt-4">
<div className="flex flex-wrap gap-2 mb-2">
<span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">BAC 2024</span>
<span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">Mathématiques</span>
</div>
<h2 className="font-headline text-display-lg-mobile md:text-headline-md font-bold text-primary mb-2">Révision : Fonctions Exponentielles &amp; Logarithmes</h2>
<p className="text-on-surface-variant text-body-md leading-relaxed">
                        Session enregistrée le 12 Octobre. Maîtrisez les dérivées, les limites et les applications concrètes pour votre examen final.
                    </p>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm h-full max-h-[500px]">
<div className="p-4 bg-surface-container border-b border-outline-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary">list_alt</span>
<h3 className="font-headline font-bold text-on-surface">Chapitres du Live</h3>
</div>
<div className="overflow-y-auto flex-1">
<div className="p-3 flex items-center gap-4 hover:bg-surface-container-low cursor-pointer transition-colors border-b border-outline-variant/30">
<span className="text-xs font-bold text-primary w-10">00:00</span>
<div className="flex-1">
<p className="text-label-sm font-semibold text-on-surface">Introduction et Rappels</p>
</div>
<span className="material-symbols-outlined text-outline-variant text-sm">play_circle</span>
</div>
<div className="p-3 flex items-center gap-4 bg-primary-fixed/30 cursor-pointer border-b border-primary/10">
<span className="text-xs font-bold text-primary w-10">05:24</span>
<div className="flex-1 border-l-2 border-primary pl-3">
<p className="text-label-sm font-bold text-primary">Propriétés de l'exponentielle</p>
<p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">En cours</p>
</div>
<span className="material-symbols-outlined text-primary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>play_circle</span>
</div>
<div className="p-3 flex items-center gap-4 hover:bg-surface-container-low cursor-pointer transition-colors border-b border-outline-variant/30">
<span className="text-xs font-bold text-primary w-10">15:10</span>
<div className="flex-1">
<p className="text-label-sm font-semibold text-on-surface">Exercice Type 1 : Étude de fonction</p>
</div>
<span className="material-symbols-outlined text-outline-variant text-sm">play_circle</span>
</div>
<div className="p-3 flex items-center gap-4 hover:bg-surface-container-low cursor-pointer transition-colors border-b border-outline-variant/30">
<span className="text-xs font-bold text-primary w-10">28:45</span>
<div className="flex-1">
<p className="text-label-sm font-semibold text-on-surface">Limites aux bornes</p>
</div>
<span className="material-symbols-outlined text-outline-variant text-sm">play_circle</span>
</div>
<div className="p-3 flex items-center gap-4 hover:bg-surface-container-low cursor-pointer transition-colors border-b border-outline-variant/30">
<span className="text-xs font-bold text-primary w-10">35:20</span>
<div className="flex-1">
<p className="text-label-sm font-semibold text-on-surface">Le logarithme népérien (LN)</p>
</div>
<span className="material-symbols-outlined text-outline-variant text-sm">play_circle</span>
</div>
<div className="p-3 flex items-center gap-4 hover:bg-surface-container-low cursor-pointer transition-colors border-b border-outline-variant/30">
<span className="text-xs font-bold text-primary w-10">42:15</span>
<div className="flex-1">
<p className="text-label-sm font-semibold text-on-surface">Q&amp;A Final et Conseils</p>
</div>
<span className="material-symbols-outlined text-outline-variant text-sm">play_circle</span>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

<div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">folder_zip</span>
<h3 className="font-headline text-headline-md font-bold text-on-surface">Ressources du cours</h3>
</div>
<button className="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline">
                        Tout télécharger <span className="material-symbols-outlined text-sm">download</span>
</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="flex items-center p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all cursor-pointer group">
<div className="w-12 h-12 bg-error-container text-on-error-container rounded flex items-center justify-center mr-4">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>description</span>
</div>
<div className="flex-1">
<p className="text-label-sm font-bold text-on-surface">Résumé PDF - Fonctions</p>
<p className="text-xs text-on-surface-variant">2.4 MB • PDF</p>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</div>
<div className="flex items-center p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all cursor-pointer group">
<div className="w-12 h-12 bg-primary-fixed text-on-primary-fixed rounded flex items-center justify-center mr-4">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>calculate</span>
</div>
<div className="flex-1">
<p className="text-label-sm font-bold text-on-surface">Fiche Formulaire BAC</p>
<p className="text-xs text-on-surface-variant">1.1 MB • PDF</p>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</div>
<div className="flex items-center p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all cursor-pointer group">
<div className="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed rounded flex items-center justify-center mr-4">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>task</span>
</div>
<div className="flex-1">
<p className="text-label-sm font-bold text-on-surface">Exercices Corrigés</p>
<p className="text-xs text-on-surface-variant">4.8 MB • ZIP</p>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</div>
<div className="flex items-center p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all cursor-pointer group">
<div className="w-12 h-12 bg-secondary-fixed text-on-secondary-fixed rounded flex items-center justify-center mr-4">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
</div>
<div className="flex-1">
<p className="text-label-sm font-bold text-on-surface">Astuces Calculatrice</p>
<p className="text-xs text-on-surface-variant">0.8 MB • PDF</p>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</div>
</div>
</div>

<div className="bg-primary text-on-primary rounded-xl p-6 shadow-lg relative overflow-hidden">
<div className="absolute -top-4 -right-4 opacity-10">
<span className="material-symbols-outlined text-[120px]">forum</span>
</div>
<div className="relative z-10">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined">psychology</span>
<h3 className="font-headline text-body-lg font-bold">Résumé du Q&amp;A</h3>
</div>
<div className="space-y-4">
<div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
<p className="text-xs font-bold text-secondary-container uppercase mb-1">Top Question</p>
<p className="text-sm font-semibold italic">"Comment différencier e^x et ln(x) dans les limites ?"</p>
<p className="text-xs mt-2 opacity-80">Réponse à 32:15 dans la vidéo.</p>
</div>
<div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
<p className="text-xs font-bold text-secondary-container uppercase mb-1">Top Question</p>
<p className="text-sm font-semibold italic">"Le tableau de signes est-il obligatoire au BAC ?"</p>
<p className="text-xs mt-2 opacity-80">Réponse à 40:05 - Recommandé pour la clarté.</p>
</div>
<button className="w-full py-2 bg-secondary-container text-on-secondary-container rounded font-bold text-sm mt-2 hover:bg-secondary-container/90 transition-colors">
                            Voir toutes les questions (12)
                        </button>
</div>
</div>
</div>
</section>

<section>
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline text-headline-md font-bold text-on-surface">Sessions similaires recommandées</h3>
<button className="text-primary font-bold text-sm hover:underline">Voir tout</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
<div className="relative aspect-[16/9]">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXRL91qSk_XydxRcW-3cV8dCbjdXT2X6aM4lo1fDKJLQ5hF0C3Yj1kLChzvfeeK2GdlbGBxClAanmWm6i1kXF47TD_JpDANdfm-PbFZhXUIVwI7cLOyy9tjL7EoIa4rPFI2hB_Y9EjdAPDui-NzLVGY-xxYeJxg9s3hWzfwkXxkS2zjnTgrmY0HIxEB3Xh_e0eudwdnQIqEszkAFuIEmCVKbjAubqigUSWWDQql9UGND7Cg7KOeJ9e')"}}></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">52:10</div>
</div>
<div className="p-3">
<p className="text-[10px] text-tertiary font-bold uppercase mb-1">SVT - Terminale</p>
<h4 className="text-label-sm font-bold text-on-surface line-clamp-2">Génétique et Évolution des espèces</h4>
</div>
</div>

<div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
<div className="relative aspect-[16/9]">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSbLiobqXK5RmP4CNoW-RAQaHtpsdQiS0H5nVhLQV-6M5InRm4l6RlbcCVEqZljwiSrleI_RvUwUtQC6C7Su6sIY-glYHcfQ-sGlJ_HfgGssf73t4y9kAswepkyn2Pvw1xAjQgXK1DNbvU7k4WsWLYWP2Enr6d3mnA6EBww_KU1PLRDm_gpq5cstxbrka_63-lPDr2vY1WS4oDfgTKpKmCAONf-gcD-BzrzGYHoTH2PVnMfOr-HBk-')"}}></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">38:45</div>
</div>
<div className="p-3">
<p className="text-[10px] text-primary font-bold uppercase mb-1">Physique - Terminale</p>
<h4 className="text-label-sm font-bold text-on-surface line-clamp-2">Lois de Newton et Mécanique céleste</h4>
</div>
</div>

<div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
<div className="relative aspect-[16/9]">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUjj5Hcm5dIQKNnQbpNyzAP5tliEG4TH-6LgGAkgWHUtyLMyZMsfrw4RbEvLKX1dNZ3sNsNNlwdJo1_F_R0ScIQouJP9ant9vhiwS2O7nF0J3yOtbTmBF3Em9mYiu5BpQV2GaAEmkQ_6419sKYom0vYTe15NjxisZre6qerPjbYvAfCzevRiVcHkLWebVfYz-2LbZUlWdISU2O9tlvhEtt2IFWh3O2FlhHFSIUHguf4BF-rpbjC7PW')"}}></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">45:20</div>
</div>
<div className="p-3">
<p className="text-[10px] text-secondary font-bold uppercase mb-1">Français - BAC</p>
<h4 className="text-label-sm font-bold text-on-surface line-clamp-2">Méthodologie du Commentaire de texte</h4>
</div>
</div>

<div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
<div className="relative aspect-[16/9]">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuC84VYmAgWMrlsJyFfbUGF86c6ZxTEEWkAWCKqFop2ru_atZhMqScz8fUKiuoOf95_5DTwAb6v_eS5qo0TY1EH22jf5uRMyjbi0w19mcyX2fokV5c3m_5UNjXidzMwK9vh7DRYpNQ78Ze5wMyHxUrVCAO5BG3qGp_Ow4_J3VSgSe1RNzCiED2P152TIJ_DPgeNbCMxa4mNrW_tchfUmyVoEbk4sFYUjcmxQpjsajX0xlDvLBBswMGlY')"}}></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">30:00</div>
</div>
<div className="p-3">
<p className="text-[10px] text-primary font-bold uppercase mb-1">Maths - Terminale</p>
<h4 className="text-label-sm font-bold text-on-surface line-clamp-2">Suites Numériques et Récurrence</h4>
</div>
</div>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center pt-2 pb-4 px-2 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 rounded-t-xl">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 duration-200">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-5 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>live_tv</span>
<span className="font-label text-label-xs font-semibold">Revision</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 duration-200">
<span className="material-symbols-outlined">psychology</span>
<span className="font-label text-label-xs font-semibold">tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</button>
</nav>

<div className="hidden md:flex fixed top-20 left-4 flex-col gap-4 z-40">
<div className="bg-white p-2 rounded-xl shadow-md border border-outline-variant flex flex-col gap-2">
<button className="p-3 bg-secondary-container text-on-secondary-container rounded-lg shadow-sm" title="Revision">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>live_tv</span>
</button>
<button className="p-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg" title="Ressources">
<span className="material-symbols-outlined">folder_zip</span>
</button>
<button className="p-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg" title="Communauté">
<span className="material-symbols-outlined">groups</span>
</button>
<div className="h-px bg-outline-variant mx-2"></div>
<button className="p-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg" title="Aide">
<span className="material-symbols-outlined">help</span>
</button>
</div>
</div>
<script>
        // Simple interactivity for the chapter list active state
        document.querySelectorAll('.overflow-y-auto &gt; div').forEach(chapter =&gt; &#123;
            chapter.addEventListener('click', function() &#123;
                document.querySelectorAll('.overflow-y-auto &gt; div').forEach(c =&gt; &#123;
                    c.classList.remove('bg-primary-fixed/30');
                    const inner = c.querySelector('.flex-1');
                    if(inner) inner.classList.remove('border-l-2', 'border-primary', 'pl-3');
                    const label = c.querySelector('p');
                    if(label) label.classList.replace('text-primary', 'text-on-surface');
                    if(label) label.classList.remove('font-bold');
                    const badge = c.querySelector('p:last-child');
                    if(badge &amp;&amp; badge.textContent === 'En cours') badge.classList.add('hidden');
                &#125;);

                this.classList.add('bg-primary-fixed/30');
                const inner = this.querySelector('.flex-1');
                if(inner) inner.classList.add('border-l-2', 'border-primary', 'pl-3');
                const label = this.querySelector('p');
                if(label) label.classList.replace('text-on-surface', 'text-primary');
                if(label) label.classList.add('font-bold');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
