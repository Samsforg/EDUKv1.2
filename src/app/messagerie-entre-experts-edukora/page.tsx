import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Messagerie Sécurisée" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-white" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-low border-r border-surface-border flex flex-col p-4 gap-base z-30">
<div className="flex items-center gap-3 mb-8 px-4">
<div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center text-white">
<span className="material-symbols-outlined">school</span>
</div>
<h1 className="font-headline-md text-headline-md text-primary font-bold">Edukora</h1>
</div>
<div className="flex items-center gap-3 p-4 mb-6">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-235.png" alt="A professional headshot of an academic professor, mid-40s, with a friendly and authoritative expression. The lighting is soft and studio-quality, emphasizing clarity and intellectual focus. The background is a blurred academic library with rich mahogany textures and soft blue-toned ambient lighting, matching the primary color palette of the Edukora dashboard." />
</div>
<div className="flex flex-col">
<span className="font-body-md text-body-md font-bold text-on-surface">Dr. Sophie Martin</span>
<span className="font-label-md text-label-md text-on-surface-variant">Expert Pédagogique</span>
</div>
</div>
<nav className="flex flex-col gap-1">

<a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer rounded" href="#">
<span className="material-symbols-outlined">queue_play_next</span>
<span className="font-body-md text-body-md">File d'attente</span>
</a>
<a className="flex items-center gap-3 text-primary font-bold bg-secondary-container rounded-lg px-4 py-2 transition-all cursor-pointer" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-md text-body-md">Mes validations</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer rounded" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body-md text-body-md">Statistiques</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer rounded" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body-md text-body-md">Ressources</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer rounded" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
</nav>
<div className="mt-auto p-4">
<div className="bg-primary-container text-on-primary rounded-xl p-4 flex flex-col gap-2">
<span className="font-label-md text-label-md opacity-80 uppercase">Statut Expert</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="font-body-md text-body-md font-bold">Certifié Senior</span>
</div>
</div>
</div>
</aside>

<main className="ml-[280px] min-h-screen flex flex-col">

<header className="sticky top-0 z-20 w-full h-16 bg-surface-container-lowest border-b border-surface-border flex justify-between items-center px-container-padding-desktop mx-auto">
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container-low p-2 rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h2 className="font-headline-md text-headline-md text-primary font-bold">Validation de Fiche</h2>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center bg-surface-container px-3 py-1.5 rounded-lg border border-surface-border">
<span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-md placeholder:text-on-surface-variant w-64" placeholder="Rechercher une discussion..." type="text" />
</div>
<button className="bg-primary text-on-primary px-4 py-2 rounded font-body-md font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
<span className="material-symbols-outlined">add</span>
                    Valider la Fiche
                </button>
</div>
</header>

<section className="p-container-padding-desktop flex-grow grid grid-cols-12 gap-gutter">

<div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-base overflow-hidden">
<div className="flex justify-between items-center mb-2">
<h3 className="font-title-md text-title-md text-on-surface">Discussions Actives</h3>
<button className="text-primary hover:bg-primary/5 px-2 py-1 rounded font-label-md text-label-md flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span>
                        FILTRER
                    </button>
</div>
<div className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide h-[calc(100vh-200px)]">

<div className="group bg-surface-container-lowest border border-surface-border rounded-xl p-4 flex flex-col gap-3 cursor-pointer hover:border-primary/30 hover:bg-white transition-all border-l-4 border-l-impact-emerald shadow-sm">
<div className="flex justify-between items-start">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-expert-purple">MATHEMATICS</span>
<h4 className="font-title-md text-title-md text-on-surface font-bold">Théorème de Green-Riemann</h4>
</div>
<div className="bg-impact-emerald/10 text-impact-emerald px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-label-md text-label-md">Certifié</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
<span className="font-bold text-on-surface">Dr. Aris :</span> La démonstration sur les domaines non-convexes nécessite une clarification sur la décomposition en domaines simples...
                        </p>
<div className="flex justify-between items-center mt-1">
<span className="font-label-md text-label-md text-on-surface-variant">Il y a 12 minutes</span>
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-surface-dim"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-surface-dim"></div>
</div>
</div>
</div>

<div className="group bg-white border border-primary/20 rounded-xl p-4 flex flex-col gap-3 cursor-pointer ring-1 ring-primary/10 border-l-4 border-l-validation-amber shadow-md scale-[1.02]">
<div className="flex justify-between items-start">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-expert-purple">PHYSICS</span>
<h4 className="font-title-md text-title-md text-on-surface font-bold">Relativité Restreinte : Fiche #12</h4>
</div>
<div className="bg-validation-amber/10 text-validation-amber px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs">pending</span>
<span className="font-label-md text-label-md">In Review</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface">
<span className="font-bold text-primary">Vous :</span> J'ai ajouté les diagrammes de Minkowski demandés. Pouvez-vous vérifier la précision des échelles temporelles ?
                        </p>
<div className="flex justify-between items-center mt-1">
<span className="font-label-md text-label-md text-primary font-bold">Actif maintenant</span>
<div className="flex items-center gap-2">
<span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
<span className="font-label-md text-label-md text-on-surface-variant">2 experts</span>
</div>
</div>
</div>

<div className="group bg-surface-container-lowest border border-surface-border rounded-xl p-4 flex flex-col gap-3 cursor-pointer hover:border-primary/30 hover:bg-white transition-all border-l-4 border-l-on-surface-variant/30 opacity-80">
<div className="flex justify-between items-start">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-expert-purple">CHEMISTRY</span>
<h4 className="font-title-md text-title-md text-on-surface font-bold">Équilibres Acido-Basiques</h4>
</div>
<div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs">archive</span>
<span className="font-label-md text-label-md">Archived</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">
<span className="font-bold text-on-surface">Pr. Leroy :</span> Validation finale effectuée. La fiche est prête pour la publication...
                        </p>
<div className="flex justify-between items-center mt-1">
<span className="font-label-md text-label-md text-on-surface-variant">Hier, 16:45</span>
</div>
</div>

<div className="group bg-surface-container-lowest border border-surface-border rounded-xl p-4 flex flex-col gap-3 cursor-pointer hover:border-primary/30 hover:bg-white transition-all border-l-4 border-l-validation-amber shadow-sm">
<div className="flex justify-between items-start">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-expert-purple">BIOLOGY</span>
<h4 className="font-title-md text-title-md text-on-surface font-bold">Transcription de l'ADN</h4>
</div>
<div className="bg-validation-amber/10 text-validation-amber px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs">pending</span>
<span className="font-label-md text-label-md">In Review</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
<span className="font-bold text-on-surface">Dr. Chen :</span> La distinction entre ARN polymérase I, II et III n'est pas assez marquée dans le résumé...
                        </p>
<div className="flex justify-between items-center mt-1">
<span className="font-label-md text-label-md text-on-surface-variant">Hier, 10:20</span>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col bg-surface-container-lowest border border-surface-border rounded-xl shadow-sm overflow-hidden relative">

<div className="p-4 border-b border-surface-border bg-white flex justify-between items-center">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-expert-purple/10 text-expert-purple rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">science</span>
</div>
<div>
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-on-surface font-bold">Relativité Restreinte : Fiche #12</h3>
<span className="bg-validation-amber/10 text-validation-amber px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">In Review</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant">Discussions entre Dr. Sophie Martin &amp; Dr. Marcus Aurelius</p>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined">attachment</span></button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
</div>
</div>

<div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide bg-[#FDFDFE]">

<div className="flex items-center gap-4 py-2">
<div className="flex-grow h-[1px] bg-surface-border"></div>
<span className="font-label-md text-label-md text-on-surface-variant">Mardi, 14 Mai</span>
<div className="flex-grow h-[1px] bg-surface-border"></div>
</div>

<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-236.png" alt="A portrait of a male professor in his late 50s, wearing classic glasses, looking thoughtfully at a tablet. Professional academic attire, neutral gray background, soft lighting that highlights skin texture and wisdom. Cohesive with the professional minimalist aesthetic of the platform." />
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold">Dr. Marcus Aurelius</span>
<span className="font-label-md text-label-md text-on-surface-variant">10:45</span>
</div>
<div className="bg-white border border-surface-border p-4 rounded-xl rounded-tl-none shadow-sm text-body-md text-on-surface leading-relaxed">
                                Sophie, j'ai relu la section sur la dilatation du temps. Le paragraphe 3 manque de rigueur mathématique concernant le facteur de Lorentz. Pourriez-vous ajouter la dérivation complète ?
                            </div>
</div>
</div>

<div className="flex items-start gap-3 max-w-[85%] self-end flex-row-reverse">
<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-237.png" alt="Close up profile photo of a female expert with glasses, focused and professional. Soft daylight, clean office background. Consistent with the Edukora corporate identity." />
</div>
<div className="flex flex-col gap-1 items-end">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface-variant">11:15</span>
<span className="font-label-md text-label-md font-bold text-primary">Vous</span>
</div>
<div className="bg-primary text-on-primary p-4 rounded-xl rounded-tr-none shadow-md text-body-md leading-relaxed">
                                C'est noté Marcus. Je viens de mettre à jour le document partagé avec la dérivation matricielle. Est-ce que cela convient mieux aux standards de L3 ?
                            </div>
</div>
</div>

<div className="self-center bg-surface-container px-4 py-2 rounded-full border border-surface-border flex items-center gap-2">
<span className="material-symbols-outlined text-sm text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>update</span>
<span className="font-label-md text-label-md text-on-surface-variant">Document mis à jour par <span className="font-bold">Sophie Martin</span></span>
</div>

<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-238.png" alt="The same male professor as before, Dr. Marcus Aurelius, shown in a different pose, now smiling slightly with approval. Detailed academic portrait in high resolution, consistent lighting and blue/white tones." />
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold">Dr. Marcus Aurelius</span>
<span className="font-label-md text-label-md text-on-surface-variant">Il y a 5 minutes</span>
</div>
<div className="bg-white border border-surface-border p-4 rounded-xl rounded-tl-none shadow-sm text-body-md text-on-surface leading-relaxed">
                                C'est parfait. J'ai également ajouté une note sur les diagrammes de Minkowski. Si vous pouvez finaliser ces schémas, nous pourrons passer la fiche au statut "Certifié" avant la fin de journée.
                            </div>
</div>
</div>
</div>

<div className="p-4 bg-white border-t border-surface-border">
<div className="relative flex items-end gap-2 bg-surface-container-low border border-surface-border rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">add_circle</span>
</button>
<textarea className="w-full bg-transparent border-none focus:ring-0 text-body-md py-2 resize-none max-h-32 scrollbar-hide" placeholder="Écrire un commentaire d'expert..." rows={1}></textarea>
<button className="bg-primary text-white p-2 rounded-lg hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined">send</span>
</button>
</div>
<div className="flex justify-between items-center mt-3 px-1">
<div className="flex gap-4">
<label className="flex items-center gap-2 cursor-pointer group">
<input className="rounded text-primary focus:ring-primary/20" type="checkbox" />
<span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">Avis de certification</span>
</label>
<label className="flex items-center gap-2 cursor-pointer group">
<input className="rounded text-primary focus:ring-primary/20" type="checkbox" />
<span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">Confidentiel</span>
</label>
</div>
<span className="font-label-md text-label-md text-on-surface-variant/50 italic">Canal sécurisé AES-256</span>
</div>
</div>
</div>
</section>
</main>

<button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50">
<span className="material-symbols-outlined text-3xl">chat</span>
</button>
<script>
        // Auto-expand textarea
        const textarea = document.querySelector('textarea');
        textarea.addEventListener('input', function() &#123;
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        &#125;);

        // Simple interaction simulation for discussion items
        const discussionItems = document.querySelectorAll('.group.bg-surface-container-lowest, .group.bg-white');
        discussionItems.forEach(item =&gt; &#123;
            item.addEventListener('click', () =&gt; &#123;
                discussionItems.forEach(i =&gt; &#123;
                    i.classList.remove('ring-1', 'ring-primary/10', 'border-primary/20', 'shadow-md', 'scale-[1.02]');
                    i.classList.add('bg-surface-container-lowest', 'border-surface-border');
                    i.classList.remove('bg-white');
                &#125;);
                item.classList.remove('bg-surface-container-lowest', 'border-surface-border');
                item.classList.add('bg-white', 'ring-1', 'ring-primary/10', 'border-primary/20', 'shadow-md', 'scale-[1.02]');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
