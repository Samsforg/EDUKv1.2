import type { Metadata } from "next";

export const metadata: Metadata = { title: "Détails de la Fiche - Edukora" };

export default function Page() {
  return (
    <div className="font-body-md text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface sticky top-0 z-50 border-b border-outline-variant flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Fiche de Révision</h1>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1 bg-tertiary-container text-on-tertiary px-3 py-1.5 rounded-full font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span>Certifiée</span>
</button>
</div>
</header>
<main className="max-w-[1200px] mx-auto p-margin-mobile md:p-margin-desktop space-y-stack-lg pb-32">

<section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
<div className="md:col-span-8 space-y-gutter">
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-xl font-label-sm text-label-sm uppercase tracking-wider">Mathématiques</span>
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-xl font-label-sm text-label-sm uppercase tracking-wider">Terminales C &amp; D</span>
</div>
<h2 className="font-display-lg text-display-lg text-primary leading-tight">Étude de Fonctions Logarithmes &amp; Exponentielles</h2>
<div className="flex items-center gap-4 py-2">
<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-098.png" alt="A professional headshot of a smiling West African educator in their late 30s, wearing a crisp white academic shirt against a soft blurred library background. The lighting is bright and natural, reflecting a clean academic and trustworthy atmosphere consistent with the Edukora primary blue palette." />
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant">Rédigé par</p>
<p className="font-body-md text-body-md font-bold text-on-surface">Prof. Amadou Koné</p>
</div>
<div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
<div className="flex flex-col">
<p className="font-label-sm text-label-sm text-on-surface-variant">Validation</p>
<div className="flex items-center gap-1 text-tertiary-container font-bold text-label-sm">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>Expert Edukora</span>
</div>
</div>
</div>
</div>

<div className="md:col-span-4 sticky top-24 space-y-stack-md">
<div className="content-card rounded-xl p-stack-md space-y-stack-md">
<button className="w-full py-3 bg-primary text-white rounded-xl font-label-sm text-label-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined">download</span>
                        Télécharger le PDF
                    </button>
<button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-label-sm text-label-sm flex items-center justify-center gap-2 hover:bg-primary-fixed/20 transition-colors">
<span className="material-symbols-outlined">favorite</span>
                        Enregistrer en favoris
                    </button>
<div className="pt-stack-sm border-t border-outline-variant">
<p className="text-center font-label-xs text-label-xs text-on-surface-variant mb-stack-sm uppercase">Cette fiche vous a aidé ?</p>
<div className="flex justify-center gap-4">
<button className="flex flex-col items-center gap-1 group">
<div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-green-50 group-hover:border-green-500 transition-all">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-green-600">thumb_up</span>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">Utile</span>
</button>
<button className="flex flex-col items-center gap-1 group">
<div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-500 transition-all">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-red-600">thumb_down</span>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">Pas utile</span>
</button>
</div>
</div>
</div>
<div className="bg-primary-container text-on-primary-container p-stack-md rounded-xl flex items-center gap-3">
<span className="material-symbols-outlined text-secondary-container">auto_awesome</span>
<p className="font-label-sm text-label-sm leading-snug">Le tuteur IA peut vous expliquer chaque point de cette fiche. <span className="underline font-bold cursor-pointer">Lancer le chat</span></p>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<div className="md:col-span-8 space-y-gutter">
<div className="content-card rounded-xl overflow-hidden">
<div className="p-6 md:p-10 space-y-8">

<div className="space-y-4">
<h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
<span className="w-2 h-8 bg-secondary-container rounded-full"></span>
                                Points Clés à Retenir
                            </h3>
<ul className="space-y-3 font-body-md text-body-md text-on-surface">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
<span>La fonction ln(x) est définie sur ]0; +∞[ et s'annule en x=1.</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
<span>La dérivée de ln(u(x)) est u'(x)/u(x).</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
<span>La fonction exponentielle exp(x) est toujours strictement positive.</span>
</li>
</ul>
</div>

<div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
<h4 className="font-label-sm text-label-sm font-bold uppercase text-on-surface-variant mb-4">Formules Essentielles</h4>
<div className="space-y-4 font-mono text-body-md text-primary text-center">
<div className="p-3 bg-white rounded border border-outline-variant italic">ln(a × b) = ln(a) + ln(b)</div>
<div className="p-3 bg-white rounded border border-outline-variant italic">exp(a + b) = exp(a) × exp(b)</div>
<div className="p-3 bg-white rounded border border-outline-variant italic">lim (x→+∞) ln(x)/x = 0</div>
</div>
</div>

<div className="space-y-4">
<h3 className="font-headline-md text-headline-md text-primary">Représentation Graphique</h3>
<div className="aspect-video bg-surface-variant rounded-xl flex items-center justify-center relative overflow-hidden group">
<img className="w-full h-full object-cover" src="/images/ecran-099.png" alt="A clean, minimalist mathematical coordinate system plot showing the curves of y=ln(x) in Academic Blue and y=exp(x) in National Orange. The background is a subtle white grid. Professional digital illustration style used in textbooks, with clear labels and high contrast, maintaining a serene and educational mood." />
<div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<button className="bg-white text-primary px-6 py-2 rounded-full font-bold flex items-center gap-2">
<span className="material-symbols-outlined">zoom_in</span>
                                        Agrandir
                                    </button>
</div>
</div>
</div>
</div>

<div className="h-24 bg-gradient-to-t from-white to-transparent -mt-24 pointer-events-none"></div>
<div className="p-6 text-center border-t border-outline-variant">
<button className="text-primary font-bold hover:underline">Lire la fiche complète (7 pages)</button>
</div>
</div>

<section className="space-y-stack-md">
<h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                        Questions &amp; Entraide
                        <span className="bg-surface-container-highest px-2 py-0.5 rounded text-body-md">12</span>
</h3>

<div className="content-card rounded-xl p-4 flex gap-4">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary">person</span>
</div>
<div className="flex-1 space-y-3">
<textarea className="w-full border-none focus:ring-0 p-0 text-body-md placeholder:text-on-surface-variant bg-transparent resize-none h-12" placeholder="Posez une question sur cette fiche..."></textarea>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant">
<div className="flex gap-2">
<button className="p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-on-surface-variant text-[20px]">image</span></button>
<button className="p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-on-surface-variant text-[20px]">functions</span></button>
</div>
<button className="bg-primary text-white px-4 py-1.5 rounded-full font-label-sm text-label-sm">Envoyer</button>
</div>
</div>
</div>

<div className="space-y-4">
<div className="flex gap-4 p-2">
<div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-100.png" alt="A portrait of a young Ivorian student in high school uniform, focused and smiling gently. The photography is professional, bright, and uses soft daylight, perfectly aligning with a modern, high-quality educational app interface. Warm color tones reflect optimism." />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="font-bold text-on-surface">Kouassi Marc</span>
<span className="text-label-xs text-on-surface-variant">il y a 2h</span>
</div>
<p className="text-body-md text-on-surface">Est-ce que cette fiche couvre aussi les primitives des fonctions logarithmes ? Je ne les vois pas dans le résumé.</p>
<div className="flex items-center gap-4 pt-1">
<button className="text-label-xs text-primary font-bold hover:underline">Répondre</button>
<button className="flex items-center gap-1 text-label-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
                                        3
                                    </button>
</div>
</div>
</div>
<div className="flex gap-4 p-2 ml-14 border-l-2 border-primary-container">
<div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-tertiary-container">
<img className="w-full h-full object-cover" src="/images/ecran-101.png" alt="A portrait of a young professional female tutor with glasses, wearing a smart casual blazer. She looks approachable and authoritative. The image is bright with high contrast, set against a clean white and blue architectural background, consistent with the corporate academic style of the Edukora app." />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="font-bold text-on-surface">Admin Edukora</span>
<span className="bg-tertiary-container text-on-tertiary px-2 py-0.5 rounded text-[10px] uppercase font-bold">Expert</span>
<span className="text-label-xs text-on-surface-variant">il y a 1h</span>
</div>
<p className="text-body-md text-on-surface">Bonjour Marc ! Les primitives sont traitées dans la fiche n°42 "Calcul Intégral". Cette fiche-ci se concentre uniquement sur l'étude de variations et les limites.</p>
<div className="flex items-center gap-4 pt-1">
<button className="text-label-xs text-primary font-bold hover:underline">Répondre</button>
<button className="flex items-center gap-1 text-label-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">thumb_up</span>
                                        8
                                    </button>
</div>
</div>
</div>
</div>
</section>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant shadow-lg flex justify-around items-center h-20 px-2 pb-safe">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>swords</span>
<span className="font-label-sm text-label-sm">Défis</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-sm text-label-sm">Tuteur AI</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for favorite button
        document.querySelector('button:has(.material-symbols-outlined:contains("favorite"))')?.addEventListener('click', function() &#123;
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon.style.fontVariationSettings.includes("'FILL' 1")) &#123;
                icon.style.fontVariationSettings = "'FILL' 0";
                this.classList.remove('bg-primary-fixed');
            &#125; else &#123;
                icon.style.fontVariationSettings = "'FILL' 1";
                this.classList.add('bg-primary-fixed');
            &#125;
        &#125;);

        // Simple check for "contains" equivalent since textContent is used
        const spans = document.getElementsByTagName('span');
        for (let span of spans) &#123;
            if (span.textContent === 'favorite' &amp;&amp; span.classList.contains('material-symbols-outlined')) &#123;
                span.parentElement.addEventListener('click', function() &#123;
                    const icon = this.querySelector('.material-symbols-outlined');
                    const isFilled = icon.style.fontVariationSettings.includes("'FILL' 1");
                    icon.style.fontVariationSettings = isFilled ? "'FILL' 0" : "'FILL' 1";
                &#125;);
            &#125;
        &#125;
    </script>

    </div>
  );
}
