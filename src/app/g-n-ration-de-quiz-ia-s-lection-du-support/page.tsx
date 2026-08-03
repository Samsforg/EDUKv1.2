import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Générer par IA" };

export default function Page() {
  return (
    <div className="text-on-surface min-h-screen pb-24 md:pb-0" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary w-full top-0 sticky flex justify-between items-center px-4 h-16 z-40 shadow-sm">
<div className="flex items-center gap-4">
<button className="text-on-primary hover:bg-primary-container/20 transition-colors p-2 rounded-lg active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary text-2xl tracking-tight">Edukora Professor</h1>
</div>
<div className="flex items-center gap-3">
<div className="hidden md:flex gap-4 mr-6">
<span className="text-on-primary/80 font-label text-label-sm hover:text-on-primary cursor-pointer transition-colors">Bibliothèque</span>
<span className="text-on-primary font-bold font-label text-label-sm border-b-2 border-secondary-container">Generate</span>
<span className="text-on-primary/80 font-label text-label-sm hover:text-on-primary cursor-pointer transition-colors">Drafts</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-159.png" alt="A professional close-up portrait of an Ivorian academic professor with a kind expression, wearing a navy blue suit and glasses, set against a blurred university library background. The lighting is soft and professional, emphasizing a modern light-mode corporate aesthetic with deep blues and crisp whites." />
</div>
</div>
</header>
<main className="max-w-5xl mx-auto px-4 py-8 md:py-12">

<div className="mb-10 text-center md:text-left">
<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-3">Générer par IA</h2>
<p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">Analysez vos supports de cours pour créer des questions en quelques secondes.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

<div className="lg:col-span-2 space-y-8">

<section className="bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant p-8 md:p-12 transition-all hover:border-primary group">
<input accept=".pdf,.docx,.txt" className="hidden" id="file-upload" type="file" />
<label className="cursor-pointer flex flex-col items-center justify-center text-center" htmlFor="file-upload">
<div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
<span className="material-symbols-outlined text-primary text-4xl">cloud_upload</span>
</div>
<h3 className="font-headline text-xl font-bold text-on-surface mb-2">Glissez-déposez ou parcourez</h3>
<p className="text-on-surface-variant mb-4">Formats acceptés : PDF, DOCX, TXT</p>
<span className="px-4 py-1.5 bg-surface-container-high rounded-full text-label-xs font-bold text-outline uppercase tracking-wider">Max 20Mo</span>
</label>
</section>

<section className="space-y-4">
<h4 className="font-headline text-lg font-semibold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">settings_suggest</span>
                        Mode d'analyse
                    </h4>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<button className="mode-btn active p-4 rounded-xl border-2 border-primary bg-primary-fixed text-primary flex items-start gap-3 transition-all text-left">
<span className="material-symbols-outlined mt-1">description</span>
<div>
<div className="font-bold">Document complet</div>
<div className="text-sm opacity-80">L'IA analyse l'intégralité du fichier pour extraire les concepts clés.</div>
</div>
</button>
<button className="mode-btn p-4 rounded-xl border-2 border-outline-variant bg-surface-container-lowest text-on-surface-variant flex items-start gap-3 transition-all text-left hover:border-primary/50">
<span className="material-symbols-outlined mt-1">segment</span>
<div>
<div className="font-bold">Sélection de texte spécifique</div>
<div className="text-sm opacity-80">Indiquez précisément les pages ou chapitres à traiter.</div>
</div>
</button>
</div>
</section>
</div>

<aside className="space-y-6">
<div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
<h4 className="font-headline text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">history</span>
                        Documents récents
                    </h4>
<div className="space-y-3">

<div className="doc-item relative group bg-surface-container-lowest p-3 rounded-lg border border-outline-variant hover:border-primary transition-all flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3 overflow-hidden">
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="text-sm font-medium truncate">Cours_Logarithmes.pdf</span>
</div>
<div className="check-box w-5 h-5 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-xs font-bold text-white hidden">check</span>
</div>
</div>

<div className="doc-item relative group bg-surface-container-lowest p-3 rounded-lg border border-outline-variant hover:border-primary transition-all flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3 overflow-hidden">
<span className="material-symbols-outlined text-primary-container">description</span>
<span className="text-sm font-medium truncate">SVT_Immunologie.docx</span>
</div>
<div className="check-box w-5 h-5 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-xs font-bold text-white hidden">check</span>
</div>
</div>

<div className="doc-item relative group bg-surface-container-lowest p-3 rounded-lg border border-outline-variant hover:border-primary transition-all flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3 overflow-hidden">
<span className="material-symbols-outlined text-primary-container">description</span>
<span className="text-sm font-medium truncate">Histoire_CI_BAC.docx</span>
</div>
<div className="check-box w-5 h-5 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-xs font-bold text-white hidden">check</span>
</div>
</div>
</div>
</div>

<div className="bg-secondary-container/10 border-l-4 border-secondary p-4 rounded-r-lg">
<p className="text-on-secondary-container text-sm leading-relaxed">
<strong>Conseil :</strong> Pour de meilleurs résultats avec l'IA, assurez-vous que vos documents sont bien structurés avec des titres clairs.
                    </p>
</div>
</aside>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant p-4 flex justify-between items-center z-50 md:sticky md:mt-12">
<div className="hidden md:flex flex-col">
<span className="text-xs text-on-surface-variant font-medium">Étape 1 sur 3</span>
<span className="text-sm font-bold text-primary">Sélection des sources</span>
</div>
<div className="flex items-center gap-4 w-full md:w-auto">
<button className="flex-1 md:flex-none px-6 py-3 text-primary font-bold hover:bg-primary-container/10 transition-colors rounded-lg">Annuler</button>
<button className="flex-1 md:flex-none px-8 py-3 bg-outline text-on-primary font-bold rounded-lg opacity-50 cursor-not-allowed transition-all flex items-center justify-center gap-2" disabled={true} id="next-btn">
                Suivant : Configurer l'IA
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</footer>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-surface-container-lowest flex justify-around items-center h-20 px-2 pb-2 border-t border-outline-variant shadow-md">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-1 rounded-full active:scale-90 duration-200">
<span className="material-symbols-outlined">book</span>
<span className="font-label text-label-xs">Bibliothèque</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined">psychology</span>
<span className="font-label text-label-xs">Generate</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-1 rounded-full active:scale-90 duration-200">
<span className="material-symbols-outlined">edit_note</span>
<span className="font-label text-label-xs">Drafts</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-1 rounded-full active:scale-90 duration-200">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</div>
</nav>
<script>
        let selectedFileCount = 0;

        function toggleSelection(el) &#123;
            const checkBox = el.querySelector('.check-box');
            const icon = checkBox.querySelector('span');
            
            if (el.classList.contains('selected')) &#123;
                el.classList.remove('selected', 'border-primary', 'bg-primary-fixed');
                checkBox.classList.remove('bg-primary', 'border-primary');
                checkBox.classList.add('border-outline-variant');
                icon.classList.add('hidden');
                selectedFileCount--;
            &#125; else &#123;
                el.classList.add('selected', 'border-primary', 'bg-primary-fixed');
                checkBox.classList.remove('border-outline-variant');
                checkBox.classList.add('bg-primary', 'border-primary');
                icon.classList.remove('hidden');
                selectedFileCount++;
            &#125;
            updateButtonState();
        &#125;

        function selectMode(btn) &#123;
            document.querySelectorAll('.mode-btn').forEach(b =&gt; &#123;
                b.classList.remove('active', 'border-primary', 'bg-primary-fixed', 'text-primary');
                b.classList.add('border-outline-variant', 'bg-surface-container-lowest', 'text-on-surface-variant');
            &#125;);
            btn.classList.add('active', 'border-primary', 'bg-primary-fixed', 'text-primary');
            btn.classList.remove('border-outline-variant', 'bg-surface-container-lowest', 'text-on-surface-variant');
        &#125;

        function updateButtonState() &#123;
            const nextBtn = document.getElementById('next-btn');
            if (selectedFileCount &gt; 0) &#123;
                nextBtn.disabled = false;
                nextBtn.classList.remove('bg-outline', 'opacity-50', 'cursor-not-allowed');
                nextBtn.classList.add('bg-secondary-container', 'hover:bg-secondary', 'cursor-pointer');
            &#125; else &#123;
                nextBtn.disabled = true;
                nextBtn.classList.add('bg-outline', 'opacity-50', 'cursor-not-allowed');
                nextBtn.classList.remove('bg-secondary-container', 'hover:bg-secondary', 'cursor-pointer');
            &#125;
        &#125;

        // Simulating file upload interaction
        document.getElementById('file-upload').addEventListener('change', function(e) &#123;
            if(this.files.length &gt; 0) &#123;
                // In a real app, we'd add this to the list
                // For the UI demo, we just enable the button
                selectedFileCount = 1;
                updateButtonState();
            &#125;
        &#125;);
    </script>

    </div>
  );
}
