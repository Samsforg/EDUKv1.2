import type { Metadata } from "next";

export const metadata: Metadata = { title: "Modifier la Fiche - EduKora BAC" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-primary-fixed-dim" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center px-4 md:px-32 h-16 w-full z-50 bg-surface border-b border-outline-variant fixed top-0 left-0">
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-100 flex items-center text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="close">close</span>
<span className="ml-2 font-label-md text-label-md hidden md:block">Annuler</span>
</button>
<div className="h-6 w-[1px] bg-outline-variant"></div>
<h1 className="font-headline-md text-headline-md font-bold text-primary">EduKora BAC</h1>
</div>
<div className="flex items-center gap-3">
<div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full border border-validation-amber status-badge">
<span className="w-2 h-2 rounded-full bg-validation-amber"></span>
<span className="text-label-md font-label-md text-on-surface-variant">Révision en cours</span>
</div>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-title-md text-title-md hover:bg-primary-container transition-colors active:scale-95 duration-100 shadow-sm">
                Soumettre
            </button>
</div>
</header>
<main className="pt-24 pb-32 px-4 md:px-gutter max-w-[1200px] mx-auto">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-4 flex flex-col gap-stack-md">

<section className="bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden">
<div className="bg-expert-purple/10 p-4 border-b border-expert-purple/20 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-expert-purple/20 flex items-center justify-center text-expert-purple">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
</div>
<div>
<p className="font-label-md text-label-md text-expert-purple uppercase tracking-wider">Commentaires de l'expert</p>
<h3 className="font-title-md text-title-md text-on-surface">Dr. Aris Thorne</h3>
</div>
</div>
<div className="p-4 space-y-4">
<div className="flex gap-3">
<span className="material-symbols-outlined text-validation-amber" data-icon="info">info</span>
<p className="font-body-md text-body-md text-on-surface-variant">
                                "La structure globale est excellente. Cependant, la partie sur la <strong className="text-on-surface">Cinématique Vectorielle</strong> manque de rigueur dans l'application de la seconde loi de Newton. Merci de rajouter les diagrammes de forces."
                            </p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg border-l-4 border-validation-amber">
<ul className="space-y-2 font-label-md text-label-md text-on-surface">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]" data-icon="check_circle">check_circle</span>
                                    Clarifier les notations de vecteurs
                                </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]" data-icon="check_circle">check_circle</span>
                                    Ajouter le schéma du pendule simple
                                </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]" data-icon="check_circle">check_circle</span>
                                    Préciser les unités (S.I.)
                                </li>
</ul>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col gap-4">
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant font-bold">Titre de la fiche</label>
<input className="w-full bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body-md text-on-surface transition-all outline-none" type="text" value="Mécanique du Point - Lois de Newton" />
</div>
<div className="grid grid-cols-2 gap-3">
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant font-bold">Matière</label>
<select className="w-full bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body-md text-on-surface outline-none">
<option selected={true}>Physique-Chimie</option>
<option>Mathématiques</option>
<option>SVT</option>
<option>Philosophie</option>
</select>
</div>
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant font-bold">Niveau</label>
<select className="w-full bg-white border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body-md text-on-surface outline-none">
<option selected={true}>Terminale C</option>
<option>Terminale D</option>
<option>Première C</option>
</select>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<h4 className="font-title-md text-title-md mb-4 text-on-surface">Documents &amp; Graphiques</h4>
<div className="grid grid-cols-2 gap-2 mb-4">
<div className="relative group aspect-square rounded-lg overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-126.png" alt="A clean, technical scientific diagram of a simple pendulum with vector arrows for gravity and tension forces, rendered in a professional educational textbook style with soft blue and grey tones on a white background." />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
<button className="p-1.5 bg-white rounded-full text-error"><span className="material-symbols-outlined">delete</span></button>
<button className="p-1.5 bg-white rounded-full text-primary"><span className="material-symbols-outlined">visibility</span></button>
</div>
</div>
<button className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all text-on-surface-variant group">
<span className="material-symbols-outlined text-3xl group-hover:text-primary">add_photo_alternate</span>
<span className="text-label-md font-label-md">Ajouter</span>
</button>
</div>
</section>
</div>

<div className="md:col-span-8">
<div className="bg-surface-container-lowest border border-surface-border rounded-xl flex flex-col h-full shadow-sm">

<div className="p-3 border-b border-surface-border flex flex-wrap gap-1 bg-surface-container-low/50">
<button className="p-2 hover:bg-white rounded transition-colors" title="Bold"><span className="material-symbols-outlined">format_bold</span></button>
<button className="p-2 hover:bg-white rounded transition-colors" title="Italic"><span className="material-symbols-outlined">format_italic</span></button>
<button className="p-2 hover:bg-white rounded transition-colors" title="Heading 1"><span className="material-symbols-outlined">format_h1</span></button>
<button className="p-2 hover:bg-white rounded transition-colors" title="Heading 2"><span className="material-symbols-outlined">format_h2</span></button>
<div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
<button className="p-2 hover:bg-white rounded transition-colors" title="Formula"><span className="material-symbols-outlined">functions</span></button>
<button className="p-2 hover:bg-white rounded transition-colors" title="Code"><span className="material-symbols-outlined">code</span></button>
<div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
<button className="p-2 hover:bg-white rounded transition-colors" title="List"><span className="material-symbols-outlined">format_list_bulleted</span></button>
<button className="p-2 hover:bg-white rounded transition-colors" title="Quote"><span className="material-symbols-outlined">format_quote</span></button>
<div className="ml-auto flex items-center gap-2 pr-2">
<span className="text-label-md font-label-md text-on-surface-variant">Markdown supporté</span>
</div>
</div>

<div className="p-8 flex-grow"><div className="mb-4 p-3 bg-expert-purple/10 border border-expert-purple/20 rounded-lg flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
<span className="font-label-md text-label-md text-expert-purple uppercase tracking-wider">Assistant IA EduKora</span>
</div>
<div className="flex gap-2">
<button className="px-3 py-1.5 bg-white border border-expert-purple/20 rounded text-label-md font-label-md text-on-surface hover:bg-expert-purple/5 transition-colors flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
            Reformuler
        </button>
<button className="px-3 py-1.5 bg-white border border-expert-purple/20 rounded text-label-md font-label-md text-on-surface hover:bg-expert-purple/5 transition-colors flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">compress</span>
            Simplifier
        </button>
<button className="px-3 py-1.5 bg-expert-purple text-white rounded text-label-md font-label-md hover:bg-expert-purple/90 transition-colors flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-[18px]">fact_check</span>
            Vérifier la rigueur
        </button>
</div>
</div>
<textarea className="w-full h-full border-none focus:ring-0 font-body-lg text-body-lg text-on-surface-variant markdown-editor leading-relaxed resize-none" placeholder="Commencez à rédiger votre fiche ici...">### I. Cinématique Vectorielle

La position d'un point mobile M est repérée par son vecteur position $\vec&#123;OM&#125;$ dans un repère donné.

**1. Vecteur Vitesse**
Le vecteur vitesse instantanée $\vec&#123;v&#125;$ est la dérivée par rapport au temps du vecteur position :
$\vec&#123;v&#125; = \frac&#123;d\vec&#123;OM&#125;&#125;&#123;dt&#125;$

**2. Vecteur Accélération**
$\vec&#123;a&#125; = \frac&#123;d\vec&#123;v&#125;&#125;&#123;dt&#125; = \frac&#123;d^2\vec&#123;OM&#125;&#125;&#123;dt^2&#125;$

### II. Lois de Newton (Rappel)

*   **Principe d'Inertie :** Dans un référentiel galiléen, si la somme des forces extérieures est nulle, le vecteur vitesse est constant.
*   **Relation Fondamentale de la Dynamique (RFD) :** $\sum \vec&#123;F&#125;_&#123;ext&#125; = m \cdot \vec&#123;a&#125;$

[Ajustement Dr. Thorne : Préciser le cas du mouvement circulaire uniforme ici]
                        </textarea>
</div>

<div className="p-4 border-t border-surface-border bg-surface-container-low/30 flex justify-between items-center text-label-md font-label-md text-on-surface-variant">
<div className="flex gap-4">
<span>Mots: 142</span>
<span>Caractères: 856</span>
</div>
<div className="flex items-center gap-2 text-impact-emerald">
<span className="material-symbols-outlined text-[16px]">cloud_done</span>
<span>Enregistré à 14:32</span>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface shadow-[0_-2px_8px_rgba(0,0,0,0.05)] rounded-t-xl border-t border-outline-variant">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" data-icon="library_books">library_books</span>
<span className="font-label-xs text-label-xs">Sujets</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
<span className="font-label-xs text-label-xs">Simulateur</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Micro-interactions for editor
        const textarea = document.querySelector('textarea');
        textarea.addEventListener('focus', () =&gt; &#123;
            textarea.parentElement.parentElement.classList.add('border-primary/40');
        &#125;);
        textarea.addEventListener('blur', () =&gt; &#123;
            textarea.parentElement.parentElement.classList.remove('border-primary/40');
        &#125;);

        // Toggle simple autosave visual effect
        let lastSaved = new Date();
        setInterval(() =&gt; &#123;
            const now = new Date();
            const timeSpan = document.querySelector('.text-impact-emerald span:last-child');
            timeSpan.textContent = `Enregistré à $&#123;now.getHours()&#125;:$&#123;String(now.getMinutes()).padStart(2, '0')&#125;`;
        &#125;, 60000);
    </script>

    </div>
  );
}
