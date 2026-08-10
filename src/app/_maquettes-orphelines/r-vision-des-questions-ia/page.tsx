import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Review Questions" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-surface-container-highest text-on-primary dark:text-primary-fixed-dim font-headline text-headline-md w-full top-0 sticky shadow-sm flex justify-between items-center px-4 h-16 w-full z-40">
<div className="flex items-center gap-4">
<button className="hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary dark:text-primary-fixed-dim">Edukora Professor</h1>
</div>
<div className="flex items-center gap-3">
<div className="hidden md:flex gap-6 mr-6 text-body-md">
<a className="text-on-primary font-bold" href="#">Bibliothèque</a>
<a className="text-on-primary/80 hover:text-on-primary" href="#">Generate</a>
<a className="text-on-primary/80 hover:text-on-primary" href="#">Drafts</a>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-303.png" alt="A professional studio portrait of an African professor with a warm, scholarly expression, wearing business casual attire. The lighting is soft and cinematic, set against a blurred academic office background with books and a soft blue tint to match the corporate Edukora brand identity." />
</div>
</div>
</header>
<main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-8 mb-24">

<div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 md:pb-0">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm">
<span className="material-symbols-outlined text-sm">check</span>
</span>
<span className="text-sm font-semibold text-tertiary">Paramètres</span>
</div>
<div className="h-px bg-outline-variant flex-1 mx-4 min-w-[20px]"></div>
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm">
<span className="material-symbols-outlined text-sm">check</span>
</span>
<span className="text-sm font-semibold text-tertiary">Contenu</span>
</div>
<div className="h-px bg-outline-variant flex-1 mx-4 min-w-[20px]"></div>
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">3</span>
<span className="text-sm font-semibold text-primary">Révision</span>
</div>
<div className="h-px bg-outline-variant flex-1 mx-4 min-w-[20px]"></div>
<div className="flex items-center gap-2 opacity-40">
<span className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-sm">4</span>
<span className="text-sm font-semibold">Publication</span>
</div>
</div>

<div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline text-3xl font-bold text-primary mb-2">Questions Générées (12)</h2>
<p className="text-on-surface-variant max-w-2xl font-body">Révisez, modifiez ou régénérez les questions proposées par l'IA pour garantir une précision académique optimale pour vos élèves.</p>
</div>
<div className="flex items-center gap-3">
<label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors">
<input className="w-5 h-5 rounded text-primary focus:ring-primary border-outline" id="selectAll" type="checkbox" />
<span className="text-label-sm font-semibold text-on-surface">Tout sélectionner</span>
</label>
</div>
</div>

<div className="space-y-4 custom-scrollbar">

<div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex flex-col md:flex-row gap-6">
<div className="pt-1">
<input checked={true} className="w-6 h-6 rounded text-primary focus:ring-primary border-outline" type="checkbox" />
</div>
<div className="flex-1 space-y-4">
<div className="flex justify-between items-start gap-4">
<textarea className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body text-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none" rows={2}>Quelle est la capitale économique de la Côte d'Ivoire ?</textarea>
<div className="flex gap-1 shrink-0">
<button className="p-2 text-outline hover:text-secondary hover:bg-secondary-fixed transition-colors rounded-lg" title="Régénérer">
<span className="material-symbols-outlined">refresh</span>
</button>
<button className="p-2 text-outline hover:text-error hover:bg-error-container transition-colors rounded-lg" title="Supprimer">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div className="flex items-center gap-3 p-3 rounded-lg border-2 border-tertiary bg-tertiary-fixed-dim/20">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<input className="bg-transparent border-none p-0 w-full font-semibold text-on-tertiary-fixed-variant focus:ring-0" type="text" value="Abidjan" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="Yamoussoukro" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="Bouaké" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="San-Pédro" />
</div>
</div>
</div>
</div>
</div>

<div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex flex-col md:flex-row gap-6">
<div className="pt-1">
<input checked={true} className="w-6 h-6 rounded text-primary focus:ring-primary border-outline" type="checkbox" />
</div>
<div className="flex-1 space-y-4">
<div className="flex justify-between items-start gap-4">
<textarea className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body text-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none" rows={2}>En quelle année la Côte d'Ivoire a-t-elle obtenu son indépendance ?</textarea>
<div className="flex gap-1 shrink-0">
<button className="p-2 text-outline hover:text-secondary hover:bg-secondary-fixed transition-colors rounded-lg" title="Régénérer">
<span className="material-symbols-outlined">refresh</span>
</button>
<button className="p-2 text-outline hover:text-error hover:bg-error-container transition-colors rounded-lg" title="Supprimer">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="1958" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border-2 border-tertiary bg-tertiary-fixed-dim/20">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<input className="bg-transparent border-none p-0 w-full font-semibold text-on-tertiary-fixed-variant focus:ring-0" type="text" value="1960" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="1962" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="1956" />
</div>
</div>
</div>
</div>
</div>

<div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex flex-col md:flex-row gap-6">
<div className="pt-1">
<input checked={true} className="w-6 h-6 rounded text-primary focus:ring-primary border-outline" type="checkbox" />
</div>
<div className="flex-1 space-y-4">
<div className="flex justify-between items-start gap-4">
<textarea className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body text-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none" rows={2}>Quel est le nom de cet instrument traditionnel représenté ci-dessous ?</textarea>
<div className="flex gap-1 shrink-0">
<button className="p-2 text-outline hover:text-secondary hover:bg-secondary-fixed transition-colors rounded-lg" title="Régénérer">
<span className="material-symbols-outlined">refresh</span>
</button>
<button className="p-2 text-outline hover:text-error hover:bg-error-container transition-colors rounded-lg" title="Supprimer">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<div className="w-full md:w-64 h-32 rounded-lg overflow-hidden border border-outline-variant mb-2">
<img className="w-full h-full object-cover" src="/images/ecran-304.png" alt="A detailed close-up shot of a traditional West African Balafon, showing the polished wooden slats and the gourd resonators underneath. The lighting is warm and emphasizes the texture of the organic materials. The background is a soft-focus museum-style display with academic lighting in the Ivory Coast colors of orange and green subtly integrated." />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="Djembe" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="Kora" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border-2 border-tertiary bg-tertiary-fixed-dim/20">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<input className="bg-transparent border-none p-0 w-full font-semibold text-on-tertiary-fixed-variant focus:ring-0" type="text" value="Balafon" />
</div>
<div className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface">
<span className="w-6 h-6 rounded-full border border-outline shrink-0"></span>
<input className="bg-transparent border-none p-0 w-full text-on-surface-variant focus:ring-0" type="text" value="Shekere" />
</div>
</div>
</div>
</div>
</div>

<button className="w-full py-8 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center gap-3 text-outline hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group">
<span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_circle</span>
<span className="font-semibold">Ajouter manuellement une question</span>
</button>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-surface-container-lowest flex justify-around items-center h-20 px-2 pb-2 shadow-md border-t border-outline-variant dark:border-outline">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-1 rounded-full active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">book</span>
<span className="font-label text-label-xs">Bibliothèque</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
<span className="font-label text-label-xs">Generate</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-1 rounded-full active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">edit_note</span>
<span className="font-label text-label-xs">Drafts</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-1 rounded-full active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</a>
</nav>

<footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-outline-variant p-4 z-40 hidden md:block">
<div className="max-w-5xl mx-auto flex items-center justify-between">
<div className="flex items-center gap-4">
<span className="text-label-sm font-semibold text-on-surface-variant">12 questions sélectionnées</span>
<button className="text-error font-semibold text-sm flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-sm">delete_sweep</span>
                    Tout rejeter
                </button>
</div>
<div className="flex items-center gap-4">
<button className="px-6 py-2 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all active:scale-95">
                    Ajouter manuellement
                </button>
<button className="px-10 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-bold shadow-lg shadow-secondary-container/20 hover:bg-secondary transition-all hover:text-white active:scale-95 flex items-center gap-2">
                    Finaliser le quiz
                    <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</footer>

<div className="md:hidden fixed bottom-20 left-0 right-0 px-4 py-3 bg-white/90 backdrop-blur-sm border-t border-outline-variant flex gap-3 z-40">
<button className="flex-1 py-3 rounded-lg border-2 border-primary text-primary font-bold text-sm">
            Ajouter
        </button>
<button className="flex-[2] py-3 rounded-lg bg-secondary-container text-on-secondary-container font-bold text-sm shadow-md">
            Finaliser le quiz
        </button>
</div>
<script>
        // Simple Interaction logic
        document.getElementById('selectAll')?.addEventListener('change', function(e) &#123;
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb =&gt; cb.checked = e.target.checked);
        &#125;);

        // Add a subtle entrance animation to cards
        document.querySelectorAll('.bg-white.rounded-xl').forEach((card, index) =&gt; &#123;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() =&gt; &#123;
                card.style.transition = 'all 0.4s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            &#125;, index * 100);
        &#125;);
    </script>

    </div>
  );
}
