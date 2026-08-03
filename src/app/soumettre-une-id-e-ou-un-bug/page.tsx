import type { Metadata } from "next";

export const metadata: Metadata = { title: "Support Edukora - Report & Suggest" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pb-24 md:pb-0" >

<header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 h-16 w-full bg-primary dark:bg-primary-container">
<div className="flex items-center gap-3">
<button className="text-on-primary dark:text-on-primary-container active:scale-95 transition-transform p-2 hover:bg-primary-container/20 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<div className="flex items-center gap-2">
<img alt="Edukora Logo" className="w-8 h-8 rounded-lg" src="/images/ecran-332.png" />
<h1 className="font-headline font-bold text-on-primary text-headline-md tracking-tight">Support Edukora</h1>
</div>
</div>
<button className="text-on-primary dark:text-on-primary-container active:scale-95 transition-transform p-2 hover:bg-primary-container/20 rounded-full">
<span className="material-symbols-outlined">account_circle</span>
</button>
</header>

<main className="mt-20 px-4 md:px-8 max-w-4xl mx-auto w-full flex-grow">

<section className="py-6">
<h2 className="font-headline text-3xl font-bold text-primary mb-2">Centre d'Assistance</h2>
<p className="text-on-surface-variant body-md">Signalez un problème technique ou suggérez une amélioration pour aider la communauté Edukora à progresser.</p>
</section>

<form className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12" id="submission-form">

<div className="md:col-span-4 space-y-6">

<div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<label className="font-headline font-semibold text-primary block mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-lg">category</span> Catégorie
                    </label>
<div className="space-y-3">
<label className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors">
<input checked={true} className="text-primary focus:ring-primary h-4 w-4" name="category" type="radio" value="bug" />
<span className="text-on-surface label-sm">Bug Technique</span>
</label>
<label className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors">
<input className="text-primary focus:ring-primary h-4 w-4" name="category" type="radio" value="idea" />
<span className="text-on-surface label-sm">Suggestion d'idée</span>
</label>
<label className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors">
<input className="text-primary focus:ring-primary h-4 w-4" name="category" type="radio" value="content" />
<span className="text-on-surface label-sm">Erreur de Cours</span>
</label>
</div>
</div>

<div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<label className="font-headline font-semibold text-primary block mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-lg">priority_high</span> Priorité
                    </label>
<div className="grid grid-cols-1 gap-2" id="priority-selector">
<button className="priority-btn flex items-center justify-between px-4 py-3 border border-outline-variant rounded-lg text-label-sm transition-all hover:bg-surface-container-low" type="button">
                            Faible <span className="w-2 h-2 rounded-full bg-tertiary"></span>
</button>
<button className="priority-btn flex items-center justify-between px-4 py-3 border border-outline-variant rounded-lg text-label-sm transition-all hover:bg-surface-container-low" data-active="true" type="button">
                            Moyenne <span className="w-2 h-2 rounded-full bg-secondary"></span>
</button>
<button className="priority-btn flex items-center justify-between px-4 py-3 border border-outline-variant rounded-lg text-label-sm transition-all hover:bg-surface-container-low" type="button">
                            Élevée <span className="w-2 h-2 rounded-full bg-error"></span>
</button>
</div>
</div>
</div>

<div className="md:col-span-8 space-y-6">

<div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm flex flex-col h-full">
<label className="font-headline font-semibold text-primary block mb-2">Description du ticket</label>

<div className="flex items-center gap-1 mb-2 p-1 bg-surface-container border border-outline-variant rounded-lg">
<button className="p-2 hover:bg-surface-container-highest rounded transition-colors" type="button"><span className="material-symbols-outlined text-md">format_bold</span></button>
<button className="p-2 hover:bg-surface-container-highest rounded transition-colors" type="button"><span className="material-symbols-outlined text-md">format_italic</span></button>
<button className="p-2 hover:bg-surface-container-highest rounded transition-colors" type="button"><span className="material-symbols-outlined text-md">format_list_bulleted</span></button>
<div className="h-6 w-px bg-outline-variant mx-1"></div>
<button className="p-2 hover:bg-surface-container-highest rounded transition-colors" type="button"><span className="material-symbols-outlined text-md">link</span></button>
<button className="p-2 hover:bg-surface-container-highest rounded transition-colors" type="button"><span className="material-symbols-outlined text-md">code</span></button>
</div>
<textarea className="flex-grow w-full border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest text-body-md min-h-[200px] custom-scrollbar p-4 resize-none" placeholder="Décrivez le problème ou votre idée en détail. Mentionnez les étapes pour reproduire un bug si nécessaire..."></textarea>
</div>

<div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-4">
<label className="font-headline font-semibold text-primary flex items-center gap-2">
<span className="material-symbols-outlined text-lg">attachment</span> Captures d'écran (Optionnel)
                        </label>
<span className="text-label-xs text-on-surface-variant">PNG, JPG jusqu'à 5MB</span>
</div>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group" id="drop-zone">
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
</div>
<p className="text-body-md font-medium text-on-surface">Glissez-déposez vos fichiers ici</p>
<p className="text-label-sm text-on-surface-variant">ou <span className="text-primary font-semibold underline">parcourez vos fichiers</span></p>
</div>

<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 hidden" id="attachment-list">

</div>
</div>
</div>

<div className="md:col-span-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-primary-container/5 border border-primary-container/20 p-8 rounded-xl mt-4">
<div className="flex items-start gap-4">
<div className="p-3 bg-white rounded-full shadow-sm text-primary">
<span className="material-symbols-outlined">verified_user</span>
</div>
<div>
<h4 className="font-headline font-bold text-on-primary-fixed">Engagement Edukora</h4>
<p className="text-label-sm text-on-surface-variant max-w-md">Notre équipe examine chaque retour sous 48h ouvrées. Merci de participer à l'excellence académique en Côte d'Ivoire.</p>
</div>
</div>
<button className="w-full md:w-auto px-10 py-4 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3" type="submit">
                    Soumettre le Ticket
                    <span className="material-symbols-outlined">send</span>
</button>
</div>
</form>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-2 pb-2 w-full bg-surface dark:bg-inverse-surface border-t border-outline-variant shadow-md">
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-xl transition-all">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-xl transition-all">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-xl transition-all">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">Tuteur IA</span>
</button>

<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Priority Selector logic
        function setPriority(level, element) &#123;
            const buttons = document.querySelectorAll('.priority-btn');
            buttons.forEach(btn =&gt; btn.setAttribute('data-active', 'false'));
            element.setAttribute('data-active', 'true');
        &#125;

        // Mock Dropzone interaction
        const dropZone = document.getElementById('drop-zone');
        const attachmentList = document.getElementById('attachment-list');

        dropZone.addEventListener('click', () =&gt; &#123;
            // Simulate adding an attachment
            attachmentList.classList.remove('hidden');
            const chip = document.createElement('div');
            chip.className = "flex items-center gap-2 p-2 border border-outline-variant rounded bg-white shadow-sm animate-pulse";
            chip.innerHTML = `
                &lt;span class="material-symbols-outlined text-primary text-sm"&gt;image&lt;/span&gt;
                &lt;span class="text-xs truncate max-w-[80px]"&gt;capture_$&#123;Math.floor(Math.random()*1000)&#125;.png&lt;/span&gt;
                &lt;span class="material-symbols-outlined text-error text-sm cursor-pointer ml-auto" onclick="this.parentElement.remove()"&gt;close&lt;/span&gt;
            `;
            attachmentList.appendChild(chip);
            
            setTimeout(() =&gt; chip.classList.remove('animate-pulse'), 1000);
        &#125;);

        // Form submission animation
        document.getElementById('submission-form').addEventListener('submit', (e) =&gt; &#123;
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            btn.innerHTML = `&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Envoi en cours...`;
            btn.disabled = true;
            
            setTimeout(() =&gt; &#123;
                btn.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                btn.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
                btn.innerHTML = `&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Envoyé avec succès`;
                
                setTimeout(() =&gt; &#123;
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.classList.replace('bg-tertiary-container', 'bg-secondary-container');
                    btn.classList.replace('text-on-tertiary-container', 'text-on-secondary-container');
                    e.target.reset();
                    attachmentList.innerHTML = '';
                    attachmentList.classList.add('hidden');
                &#125;, 3000);
            &#125;, 2000);
        &#125;);
    </script>

    </div>
  );
}
