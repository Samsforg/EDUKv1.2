import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Vérification d'identité" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full bg-surface dark:bg-on-background border-b border-surface-border dark:border-outline-variant fixed top-0 z-50">
<button className="mr-4 p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Vérification d'identité</h1>
</header>
<main className="flex-grow pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-4xl mx-auto w-full">

<div className="flex items-center justify-between mb-8 max-w-md mx-auto">
<div className="flex flex-col items-center gap-2">
<div className="h-1.5 w-12 rounded-full bg-primary"></div>
<span className="font-label-md text-label-md text-primary">Accueil</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="h-1.5 w-12 rounded-full bg-primary"></div>
<span className="font-label-md text-label-md text-primary">Documents</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="h-1.5 w-12 rounded-full bg-surface-container-highest"></div>
<span className="font-label-md text-label-md text-outline">Biométrie</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="h-1.5 w-12 rounded-full bg-surface-container-highest"></div>
<span className="font-label-md text-label-md text-outline">Statut</span>
</div>
</div>

<div className="mb-gutter text-center md:text-left">
<h2 className="font-headline-lg text-headline-lg text-primary mb-2">Téléchargement de la pièce d'identité</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Veuillez photographier ou télécharger le recto et le verso de votre pièce d'identité officielle (CNI ou Passeport).</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all hover:bg-surface-container-low group relative overflow-hidden">
<input className="absolute inset-0 opacity-0 cursor-pointer z-10" id="recto-upload" type="file" />
<div className="flex flex-col items-center text-center" id="recto-empty">
<div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-4 icon-bounce transition-transform duration-300">
<span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">Recto de la pièce</h3>
<p className="font-label-md text-label-md text-outline">Cliquez ou glissez le fichier ici</p>
</div>
<div className="hidden absolute inset-0 bg-white p-4 flex flex-col items-center" id="recto-preview">
<div className="w-full h-4/5 rounded bg-surface-container-high overflow-hidden relative">
<img className="w-full h-full object-cover" src="/images/ecran-344.png" alt="A realistic high-definition macro shot of a blue and white French National Identity card placed on a clean wooden desk with soft natural sunlight coming from a nearby window. The image conveys a professional and secure atmosphere suitable for a banking or identity verification dashboard. Minimalist composition with high contrast and sharp details of the plastic texture and micro-printing." />
<div className="absolute top-2 right-2 bg-impact-emerald text-white p-1 rounded-full shadow-lg">
<span className="material-symbols-outlined text-sm">check</span>
</div>
</div>
<button className="mt-4 text-error font-label-md flex items-center gap-1 hover:underline z-20">
<span className="material-symbols-outlined text-sm">delete</span> Supprimer
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all hover:bg-surface-container-low group relative overflow-hidden">
<input className="absolute inset-0 opacity-0 cursor-pointer z-10" id="verso-upload" type="file" />
<div className="flex flex-col items-center text-center" id="verso-empty">
<div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-4 icon-bounce transition-transform duration-300">
<span className="material-symbols-outlined text-primary text-3xl">add_photo_alternate</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">Verso de la pièce</h3>
<p className="font-label-md text-label-md text-outline">Cliquez ou glissez le fichier ici</p>
</div>
<div className="hidden absolute inset-0 bg-white p-4 flex flex-col items-center" id="verso-preview">
<div className="w-full h-4/5 rounded bg-surface-container-high overflow-hidden relative">
<img className="w-full h-full object-cover" src="/images/ecran-345.png" alt="A high-quality top-down view of the back side of a passport or ID card showing security holographic features and machine-readable zones. The lighting is crisp and cool, highlighting the fine security patterns and official stamps. The setting is a minimalist office workspace with a soft-focus background of a silver laptop and a cup of coffee, emphasizing a corporate environment." />
<div className="absolute top-2 right-2 bg-impact-emerald text-white p-1 rounded-full shadow-lg">
<span className="material-symbols-outlined text-sm">check</span>
</div>
</div>
<button className="mt-4 text-error font-label-md flex items-center gap-1 hover:underline z-20">
<span className="material-symbols-outlined text-sm">delete</span> Supprimer
                    </button>
</div>
</div>

<div className="md:col-span-2 bg-secondary-container/30 border-l-4 border-primary p-6 rounded-r-xl flex gap-4 items-start">
<span className="material-symbols-outlined text-primary mt-1">lightbulb</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface mb-1">Conseil pour une validation rapide</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Assurez-vous que le document est bien éclairé, sans reflets, et que les quatre coins sont visibles. Le texte doit être parfaitement lisible pour notre système d'analyse automatique.</p>
</div>
</div>
</div>
</main>

<div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-border p-4 z-50">
<div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
<button className="px-6 py-3 rounded-lg border border-primary text-primary font-bold hover:bg-surface-container-low transition-colors">
                Précédent
            </button>
<button className="px-10 py-3 rounded-lg bg-primary text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed active:opacity-80" disabled={true} id="next-button">
                Suivant
            </button>
</div>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface dark:bg-on-background px-4 pb-safe border-t border-surface-border dark:border-outline-variant z-10 hidden">
<div className="flex flex-col items-center justify-center text-outline dark:text-outline-variant scale-95 duration-150 ease-in-out">
<span className="material-symbols-outlined">doorbell</span>
<span className="font-label-md text-label-md">Bienvenue</span>
</div>
<div className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold">
<span className="material-symbols-outlined">id_card</span>
<span className="font-label-md text-label-md">Documents</span>
</div>
<div className="flex flex-col items-center justify-center text-outline dark:text-outline-variant">
<span className="material-symbols-outlined">face</span>
<span className="font-label-md text-label-md">Biometrics</span>
</div>
<div className="flex flex-col items-center justify-center text-outline dark:text-outline-variant">
<span className="material-symbols-outlined">verified</span>
<span className="font-label-md text-label-md">Statut</span>
</div>
</nav>
<script>
        const uploadedState = &#123;
            recto: false,
            verso: false
        &#125;;

        function handleFile(input, previewId) &#123;
            if (input.files &amp;&amp; input.files[0]) &#123;
                const side = previewId.split('-')[0];
                document.getElementById(`$&#123;side&#125;-empty`).classList.add('hidden');
                document.getElementById(`$&#123;side&#125;-preview`).classList.remove('hidden');
                uploadedState[side] = true;
                checkNextState();
            &#125;
        &#125;

        function resetUpload(side) &#123;
            event.stopPropagation();
            document.getElementById(`$&#123;side&#125;-empty`).classList.remove('hidden');
            document.getElementById(`$&#123;side&#125;-preview`).classList.add('hidden');
            document.getElementById(`$&#123;side&#125;-upload`).value = '';
            uploadedState[side] = false;
            checkNextState();
        &#125;

        function checkNextState() &#123;
            const btn = document.getElementById('next-button');
            if (uploadedState.recto &amp;&amp; uploadedState.verso) &#123;
                btn.disabled = false;
                btn.classList.remove('opacity-40');
                btn.classList.add('shadow-lg', 'bg-primary-container');
            &#125; else &#123;
                btn.disabled = true;
                btn.classList.add('opacity-40');
                btn.classList.remove('shadow-lg', 'bg-primary-container');
            &#125;
        &#125;

        // Atmospheric micro-interaction for the background
        document.addEventListener('mousemove', (e) =&gt; &#123;
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            document.body.style.backgroundColor = `rgba(247, 249, 251, 1)`;
        &#125;);
    </script>

    </div>
  );
}
