import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Validation de Paiement" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col items-center" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background w-full sticky top-0 z-50 flex justify-between items-center px-4 h-16 transition-colors">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">menu</span>
<h1 className="font-headline text-2xl font-bold text-primary dark:text-primary-fixed">Edukora</h1>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-026.png" alt="A professional studio portrait of a young Ivorian student wearing a clean white shirt, looking confident and smiling. The background is a soft, blurred library setting with warm lighting, maintaining the academic and professional aesthetic of the Edukora platform. The image is crisp, with natural skin tones and high-quality lighting." />
</div>
</header>

<main className="flex-grow w-full max-w-lg px-6 py-8 flex flex-col items-center justify-center text-center">

<div className="relative w-64 h-64 mb-10 flex items-center justify-center">

<div className="absolute inset-0 flex items-center justify-center">
<div className="w-48 h-48 rounded-full border-2 border-primary/20 animate-pulse-ring"></div>
<div className="w-64 h-64 rounded-full border-2 border-primary/10 animate-pulse-ring" style={{"animationDelay":"1s"}}></div>
</div>

<div className="relative z-10 w-40 h-72 bg-inverse-surface rounded-[2.5rem] border-[6px] border-on-surface-variant shadow-2xl flex flex-col overflow-hidden">
<div className="w-16 h-1 bg-on-surface-variant/30 rounded-full mx-auto mt-3 mb-4"></div>
<div className="flex-grow bg-surface-container-lowest px-4 py-6 flex flex-col items-center">
<div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-secondary text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>sms</span>
</div>
<div className="w-full space-y-2">
<div className="h-2 w-3/4 bg-surface-container-high rounded-full"></div>
<div className="h-2 w-full bg-surface-container-high rounded-full"></div>
<div className="h-2 w-1/2 bg-surface-container-high rounded-full"></div>
</div>

<div className="mt-8 w-full bg-primary-container p-3 rounded-xl shadow-md border-l-4 border-secondary translate-y-4 animate-bounce">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-on-primary-container text-xs">shield</span>
<div className="h-1.5 w-12 bg-on-primary-container/30 rounded-full"></div>
</div>
<div className="h-2 w-full bg-on-primary-container/50 rounded-full"></div>
</div>
</div>
<div className="w-12 h-1 bg-on-surface-variant/30 rounded-full mx-auto mb-2"></div>
</div>

<div className="absolute -right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center shadow-lg border-2 border-white">
<span className="material-symbols-outlined text-on-tertiary-container text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
</div>

<div className="space-y-4 mb-10">
<h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Vérifiez votre mobile</h2>
<p className="text-body-lg text-on-surface-variant leading-relaxed">
                Une demande de paiement a été envoyée au <span className="font-bold text-on-surface whitespace-nowrap">07 08 -- -- --</span>.
            </p>
<div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full text-label-sm text-on-surface-variant border border-outline-variant/30">
<span className="material-symbols-outlined text-sm">lock</span>
                Saisissez votre code PIN secret sur votre téléphone
            </div>
</div>

<div className="w-full space-y-4">

<div className="relative h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden mb-8">
<div className="absolute top-0 left-0 h-full bg-secondary w-1/3 rounded-full transition-all duration-1000 ease-out shimmer" id="progress-bar"></div>
</div>
<button className="w-full h-14 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-headline font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-3">
                J'ai terminé la validation
                <span className="material-symbols-outlined">chevron_right</span>
</button>
<button className="w-full h-14 bg-transparent border-2 border-outline-variant text-on-surface-variant font-headline font-semibold rounded-xl hover:bg-surface-container-low transition-all">
                Je n'ai rien reçu
            </button>
</div>

<div className="mt-12 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-2xl">security</span>
<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Sécurisé</span>
</div>
<div className="w-px h-8 bg-outline-variant"></div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-2xl">electric_bolt</span>
<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Instantané</span>
</div>
<div className="w-px h-8 bg-outline-variant"></div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-2xl">support_agent</span>
<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Support 24h/24</span>
</div>
</div>
</main>

<footer className="w-full max-w-lg px-6 py-6 text-center text-label-sm text-on-surface-variant mb-20 md:mb-0">
<p>Besoin d'aide ? <a className="text-primary font-bold underline" href="#">Contactez notre support</a> ou consultez notre <a className="text-primary font-bold underline" href="#">FAQ</a>.</p>
</footer>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest dark:bg-on-background h-20 pb-2 px-2 flex justify-around items-center rounded-t-xl shadow-md border-t border-surface-container">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">library_books</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</div>
</nav>
<script>
        // Simple micro-interaction for the progress bar
        let progress = 33;
        const bar = document.getElementById('progress-bar');
        
        setInterval(() =&gt; &#123;
            progress = (progress + 1) % 100;
            if (progress &lt; 10) progress = 10; // keep it visible
            bar.style.width = progress + '%';
        &#125;, 3000);

        // Interaction for buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.classList.add('scale-95');
                setTimeout(() =&gt; this.classList.remove('scale-95'), 150);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
