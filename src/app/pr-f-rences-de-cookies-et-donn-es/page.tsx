import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confidentialité - Edukora" };

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm w-full top-0 sticky z-50 flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-4">
<button className="transition-colors duration-200 active:scale-95 hover:bg-primary-container/20 p-2 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Confidentialité</h1>
</div>
<div className="w-10"></div> 
</header>

<main className="flex-grow p-4 md:p-8 max-w-2xl mx-auto w-full">

<section className="mb-8 text-center sm:text-left">
<div className="inline-flex items-center justify-center p-3 bg-primary-fixed rounded-xl mb-4">
<span className="material-symbols-outlined text-primary text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>security</span>
</div>
<h2 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">Votre réussite, vos données</h2>
<p className="text-on-surface-variant leading-relaxed font-body">
                Chez <span className="font-bold text-primary">Edukora</span>, nous croyons que la transparence est la clé de l'apprentissage. Nous utilisons vos données uniquement pour sécuriser votre compte, améliorer nos cours et permettre à l'tuteur IA Kora de personnaliser votre parcours vers le succès au BEPC/BAC.
            </p>
</section>

<div className="space-y-4">

<div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm transition-all duration-300">
<div className="flex items-start justify-between">
<div className="flex-1 pr-4">
<div className="flex items-center gap-2 mb-1">
<h3 className="font-bold text-on-surface text-lg">Essentiels</h3>
<span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Obligatoire</span>
</div>
<p className="text-sm text-on-surface-variant">Indispensables pour la connexion, la sécurité et la sauvegarde de votre progression en temps réel.</p>
</div>
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-outline-variant appearance-none cursor-pointer translate-x-0.5 mt-0.5" disabled={true} id="toggle_essential" name="toggle_essential" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer" htmlFor="toggle_essential">
<span className="toggle-dot absolute block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out translate-x-0.5 mt-0.5"></span>
</label>
</div>
</div>
</div>

<div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm hover:border-primary/30 transition-all duration-300">
<div className="flex items-start justify-between">
<div className="flex-1 pr-4">
<div className="flex items-center gap-2 mb-1">
<h3 className="font-bold text-on-surface text-lg">Analytiques</h3>
</div>
<p className="text-sm text-on-surface-variant">Nous permettent de comprendre quelles leçons sont les plus consultées pour améliorer l'expérience globale.</p>
</div>
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-outline appearance-none cursor-pointer translate-x-0.5 mt-0.5 peer" id="toggle_analytics" name="toggle_analytics" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors duration-200 peer-checked:bg-primary-container" htmlFor="toggle_analytics">
<span className="toggle-dot absolute block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out translate-x-0.5 mt-0.5 peer-checked:translate-x-4"></span>
</label>
</div>
</div>
</div>

<div className="bg-primary-fixed/30 border border-primary/20 p-5 rounded-xl shadow-sm hover:border-primary/40 transition-all duration-300">
<div className="flex items-start justify-between">
<div className="flex-1 pr-4">
<div className="flex items-center gap-2 mb-1">
<h3 className="font-bold text-primary text-lg flex items-center gap-2">
<span className="material-symbols-outlined text-sm">smart_toy</span>
                                Personnalisation IA
                            </h3>
</div>
<p className="text-sm text-on-primary-fixed-variant">Autorise l'tuteur IA Kora à analyser vos points faibles pour vous proposer des exercices de remédiation ciblés.</p>
</div>
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-primary appearance-none cursor-pointer translate-x-0.5 mt-0.5 peer" id="toggle_ia" name="toggle_ia" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-container cursor-pointer transition-colors duration-200 peer-checked:bg-primary" htmlFor="toggle_ia">
<span className="toggle-dot absolute block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out translate-x-[1.25rem] mt-0.5"></span>
</label>
</div>
</div>
</div>
</div>

<div className="mt-8 relative h-32 rounded-xl overflow-hidden border border-outline-variant">
<div className="absolute inset-0 bg-gradient-to-br from-primary-container via-primary to-secondary"></div>
<div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCte9Kkah8vt7GGorohOjXT1SBrE3kKMwfGbzayMA427IGtPh5lpq7MMNXw5ngAYp8o-gU58pRwObSdtiynFHFv2iQrzC6uZmtFKggZGHfX69eFg_qe_cUGMCt3DwuT1fCEnQs-bArnRuk2RrT8xM-XxJ5tPRpSNZ1cB62w_kDvAj7IovCwS79N7-8pSe8jqGJxHIIF26z72b9msouHEyzkJLWNDediFOQ3Yi3qI-lEnGeLhME5HDWY')"}}></div>
<div className="absolute inset-0 flex items-center justify-center p-4">
<p className="text-white text-center text-sm font-medium italic">"L'éducation est l'arme la plus puissante pour changer le monde."</p>
</div>
</div>
<div className="h-32"></div> 
</main>

<footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant p-4 md:px-8 z-50 flex flex-col gap-3 max-w-2xl mx-auto w-full">
<button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-95 shadow-md" id="acceptAllBtn">
            Tout accepter
        </button>
<button className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold py-3.5 rounded-xl border border-outline-variant transition-all duration-300 active:scale-95" id="saveSelectionBtn">
            Enregistrer mes choix
        </button>
</footer>
<script>
        // Micro-interactions for toggles
        document.querySelectorAll('.toggle-checkbox').forEach(toggle =&gt; &#123;
            if (!toggle.disabled) &#123;
                toggle.addEventListener('change', function() &#123;
                    const label = this.nextElementSibling;
                    const dot = label.querySelector('.toggle-dot');
                    if (this.checked) &#123;
                        dot.style.transform = 'translateX(1.25rem)';
                        label.style.backgroundColor = this.id === 'toggle_ia' ? '#00327d' : '#0047ab';
                    &#125; else &#123;
                        dot.style.transform = 'translateX(0.125rem)';
                        label.style.backgroundColor = '#c3c6d5';
                    &#125;
                &#125;);
            &#125;
        &#125;);

        // Button Ripple/Feedback Effects
        const buttons = [document.getElementById('acceptAllBtn'), document.getElementById('saveSelectionBtn')];
        buttons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.classList.add('opacity-80');
                setTimeout(() =&gt; this.classList.remove('opacity-80'), 150);
                
                // Mock success toast
                const originalText = this.innerText;
                this.innerText = 'C\'est noté !';
                setTimeout(() =&gt; this.innerText = originalText, 1500);
            &#125;);
        &#125;);

        // Initialize Toggle states visually (since we can't use complex CSS selectors for all nuances)
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            document.querySelectorAll('.toggle-checkbox').forEach(cb =&gt; &#123;
                if(cb.checked &amp;&amp; !cb.disabled) &#123;
                    cb.nextElementSibling.querySelector('.toggle-dot').style.transform = 'translateX(1.25rem)';
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
