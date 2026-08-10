import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Informations Personnelles" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 z-50 bg-surface dark:bg-on-background flex justify-between items-center px-4 h-16 border-b border-surface-container-high md:max-w-3xl md:mx-auto md:rounded-b-xl md:mt-4 shadow-sm">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary active:scale-95 transition-transform">arrow_back</button>
<h1 className="font-headline text-headline-md font-semibold text-on-surface">Mon Profil</h1>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-165.png" alt="A professional studio portrait of a young West African male student wearing a clean white shirt, smiling confidently against a soft academic blue background. The lighting is bright and even, conveying a sense of intelligence and aspiration, fitting for a modern educational PWA." />
</div>
</header>
<main className="w-full max-w-3xl px-4 py-8 flex-grow space-y-8 pb-32">

<section className="flex flex-col items-center space-y-4">
<div className="relative group">
<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container shadow-md">
<img className="w-full h-full object-cover" src="/images/ecran-166.png" alt="A close-up portrait of Koffi Kouassi, a serious and ambitious student from Côte d'Ivoire. He is positioned against a minimalist background with a subtle geometric pattern in light blue and orange. The image is crisp, with high resolution, reflecting the academic and professional tone of the Edukora brand." />
</div>
<button className="absolute bottom-0 right-0 bg-secondary-container text-on-secondary-container p-2 rounded-full shadow-lg active:scale-90 transition-transform">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<div className="text-center">
<h2 className="text-xl font-bold font-headline text-primary">Koffi Kouassi</h2>
<p className="text-on-surface-variant font-medium">Prép BAC C • Cocody</p>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<h3 className="text-lg font-bold font-headline uppercase tracking-wide text-on-surface-variant">Informations Personnelles</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="flex flex-col space-y-1">
<label className="text-label-sm font-semibold text-on-surface-variant px-1">Nom Complet</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-sm">badge</span>
<input className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" type="text" value="Koffi Kouassi" />
</div>
</div>

<div className="flex flex-col space-y-1">
<label className="text-label-sm font-semibold text-on-surface-variant px-1">Adresse Email</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-sm">mail</span>
<input className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" type="email" value="koffi@email.ci" />
</div>
</div>

<div className="flex flex-col space-y-1">
<label className="text-label-sm font-semibold text-on-surface-variant px-1">Numéro de Téléphone</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-sm">phone_iphone</span>
<input className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" type="tel" value="+225 07 00 00 00 00" />
</div>
</div>

<div className="flex flex-col space-y-1">
<label className="text-label-sm font-semibold text-on-surface-variant px-1">Ville / Commune</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-sm">location_on</span>
<input className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" type="text" value="Cocody" />
</div>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
<h3 className="text-lg font-bold font-headline uppercase tracking-wide text-on-surface-variant">Parcours Académique</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="p-4 bg-primary-container/10 border-2 border-primary-container rounded-xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
<div className="flex items-center gap-4">
<div className="bg-primary-container text-on-primary p-2 rounded-lg">
<span className="material-symbols-outlined">analytics</span>
</div>
<div>
<p className="text-label-xs font-bold text-primary uppercase">Série</p>
<p className="text-body-md font-semibold text-on-surface">Série C (Math &amp; Physique)</p>
</div>
</div>
<span className="material-symbols-outlined text-primary">expand_more</span>
</div>

<div className="p-4 bg-secondary-container/10 border-2 border-secondary-container/30 rounded-xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
<div className="flex items-center gap-4">
<div className="bg-secondary-container text-on-secondary p-2 rounded-lg">
<span className="material-symbols-outlined">event_note</span>
</div>
<div>
<p className="text-label-xs font-bold text-secondary uppercase">Objectif</p>
<p className="text-body-md font-semibold text-on-surface">BAC 2024</p>
</div>
</div>
<span className="material-symbols-outlined text-secondary">expand_more</span>
</div>
</div>
</section>

<section className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant">
<div className="flex items-center gap-3">
<div className="w-10 h-10 flex items-center justify-center bg-tertiary-container rounded-lg text-on-tertiary">
<span className="material-symbols-outlined">notifications_active</span>
</div>
<div>
<h4 className="font-bold text-on-surface">Rappels d'examen</h4>
<p className="text-label-sm text-on-surface-variant">Recevoir les alertes de révision</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</section>
</main>

<footer className="fixed bottom-0 left-0 w-full p-4 bg-surface-container-lowest/80 backdrop-blur-md border-t border-surface-container-high flex justify-center z-50">
<button className="w-full max-w-xl bg-secondary-container text-on-secondary-container font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 text-lg">
<span className="material-symbols-outlined">save</span>
            Enregistrer les modifications
        </button>
</footer>

<nav className="md:hidden hidden">

</nav>
<script>
        // Micro-interaction for input fields
        document.querySelectorAll('input').forEach(input =&gt; &#123;
            input.addEventListener('focus', () =&gt; &#123;
                input.parentElement.querySelector('.material-symbols-outlined').style.color = '#0047ab';
            &#125;);
            input.addEventListener('blur', () =&gt; &#123;
                input.parentElement.querySelector('.material-symbols-outlined').style.color = '#737784';
            &#125;);
        &#125;);

        // Simple button feedback
        const saveBtn = document.querySelector('footer button');
        saveBtn.addEventListener('click', () =&gt; &#123;
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Enregistrement...';
            saveBtn.classList.add('opacity-80');
            
            setTimeout(() =&gt; &#123;
                saveBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Modifié !';
                saveBtn.classList.remove('bg-secondary-container');
                saveBtn.classList.add('bg-tertiary-container', 'text-on-tertiary');
                
                setTimeout(() =&gt; &#123;
                    saveBtn.innerHTML = originalText;
                    saveBtn.classList.remove('bg-tertiary-container', 'text-on-tertiary', 'opacity-80');
                    saveBtn.classList.add('bg-secondary-container', 'text-on-secondary-container');
                &#125;, 2000);
            &#125;, 1200);
        &#125;);
    </script>

    </div>
  );
}
