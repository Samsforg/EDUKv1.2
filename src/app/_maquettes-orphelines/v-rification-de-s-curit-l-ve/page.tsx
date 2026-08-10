import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Proctor - Vérification de Sécurité" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-md flex items-center justify-between px-4 md:px-8 h-16">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary cursor-pointer hover:bg-primary-container/20 p-2 rounded-full transition-colors">menu</span>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-xl">Edukora Proctor</h1>
</div>
<div className="flex items-center gap-2">
<span className="text-on-primary text-sm font-medium hidden md:block">Session: BAC Mathématiques</span>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/30 overflow-hidden bg-primary-container flex items-center justify-center">
<img className="w-full h-full object-cover" src="/images/ecran-371.png" alt="A professional close-up portrait of a West African male professor in his 40s wearing a crisp white shirt and scholarly glasses. The lighting is soft and natural, suggesting a bright office environment. The style is professional and authoritative, matching the Edukora brand's academic and formal tone." />
</div>
</div>
</header>

<main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-5 space-y-6">
<section className="space-y-2">
<h2 className="font-headline font-bold text-primary text-3xl tracking-tight">Vérification de Sécurité</h2>
<p className="text-on-surface-variant text-body-md leading-relaxed">
                    Cet examen est protégé par le Proctoring IA. Veuillez autoriser les accès suivants pour commencer.
                </p>
</section>

<div className="space-y-3">

<div className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<div className="bg-primary-container/10 p-3 rounded-lg text-primary">
<span className="material-symbols-outlined">videocam</span>
</div>
<div>
<p className="font-semibold text-on-surface">Accès à la Caméra</p>
<p className="text-xs text-on-surface-variant">Requis pour l'identité</p>
</div>
</div>
<div className="flex items-center gap-2 text-on-tertiary-container font-semibold">
<span className="material-symbols-outlined text-xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="text-sm">Activé</span>
</div>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-outline-variant">
<div className="flex items-center gap-4">
<div className="bg-primary-container/10 p-3 rounded-lg text-primary">
<span className="material-symbols-outlined">mic</span>
</div>
<div>
<p className="font-semibold text-on-surface">Accès au Microphone</p>
<p className="text-xs text-on-surface-variant">Requis pour l'environnement sonore</p>
</div>
</div>
<div className="flex items-center gap-2 text-primary status-pulse">
<span className="material-symbols-outlined text-xl animate-spin">sync</span>
<span className="text-sm">Chargement...</span>
</div>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-outline-variant">
<div className="flex items-center gap-4">
<div className="bg-primary-container/10 p-3 rounded-lg text-primary">
<span className="material-symbols-outlined">screen_share</span>
</div>
<div>
<p className="font-semibold text-on-surface">Partage de l'Écran</p>
<p className="text-xs text-on-surface-variant">Requis pour le verrouillage</p>
</div>
</div>
<div className="flex items-center gap-2 text-outline">
<span className="material-symbols-outlined text-xl">pending</span>
<span className="text-sm">En attente</span>
</div>
</div>
</div>

<div className="bg-error-container/20 border-l-4 border-error p-4 rounded-r-lg flex gap-3">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
<p className="text-sm text-on-error-container font-medium">
                    Toute tentative de fraude sera signalée instantanément à votre professeur.
                </p>
</div>
</div>

<div className="lg:col-span-7 flex flex-col items-center justify-center space-y-8 lg:mt-10">

<div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full border-4 border-primary shadow-2xl overflow-hidden bg-inverse-surface group">
<img className="w-full h-full object-cover" src="/images/ecran-372.png" alt="A high-quality close-up photograph from a webcam perspective of a young Ivorian student in their early 20s. They are centered perfectly within a circular frame, looking directly into the camera with a focused and serious expression. The lighting is bright and even, highlighting their features against a blurred, tidy indoor study room background. The overall aesthetic is professional, sharp, and optimized for an AI identity verification interface." />

<div className="absolute inset-0 face-guide m-8 pointer-events-none"></div>
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary/80 backdrop-blur-md text-on-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    LIVE
                </div>
</div>
<p className="text-center text-on-surface-variant text-sm max-w-xs">
                Positionnez votre visage au centre du cercle et assurez-vous que l'éclairage est suffisant.
            </p>

<div className="w-full max-w-sm">
<button className="w-full py-4 bg-outline text-surface-container-lowest font-headline font-bold text-lg rounded-xl shadow-lg cursor-not-allowed transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3" disabled={true} id="startBtn">
<span className="material-symbols-outlined">lock_open</span>
                    Démarrer l'examen
                </button>
<p className="text-center text-[10px] uppercase tracking-widest text-outline mt-3 font-semibold">
                    Authentification sécurisée par IA Edukora
                </p>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-surface border-t border-outline-variant flex justify-around items-center px-4 z-50">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-semibold mt-0.5">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>visibility</span>
<span className="text-[10px] font-bold mt-0.5">Vérifier</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">warning</span>
<span className="text-[10px] font-semibold mt-0.5">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">tune</span>
<span className="text-[10px] font-semibold mt-0.5">Réglages</span>
</div>
</nav>
<script>
        // Micro-interaction simulation
        setTimeout(() =&gt; &#123;
            const checklistItems = document.querySelectorAll('.status-pulse');
            checklistItems.forEach(item =&gt; &#123;
                item.innerHTML = `
                    &lt;span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;"&gt;check_circle&lt;/span&gt;
                    &lt;span class="text-sm"&gt;Activé&lt;/span&gt;
                `;
                item.classList.remove('text-primary', 'status-pulse');
                item.classList.add('text-on-tertiary-container', 'font-semibold');
            &#125;);

            // Enable Start Button
            const btn = document.getElementById('startBtn');
            btn.disabled = false;
            btn.classList.remove('bg-outline', 'cursor-not-allowed');
            btn.classList.add('bg-secondary-container', 'text-on-secondary-container', 'hover:brightness-110');
            btn.querySelector('.material-symbols-outlined').innerText = 'play_arrow';
        &#125;, 3000);

        // Interaction for sharing screen simulation
        document.querySelectorAll('.border-outline-variant').forEach(card =&gt; &#123;
           card.addEventListener('click', function() &#123;
               if(this.querySelector('.text-outline')) &#123;
                   this.querySelector('.text-outline').innerHTML = `
                    &lt;span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;"&gt;check_circle&lt;/span&gt;
                    &lt;span class="text-sm"&gt;Activé&lt;/span&gt;
                   `;
                   this.querySelector('.text-outline').className = "flex items-center gap-2 text-on-tertiary-container font-semibold";
               &#125;
           &#125;);
        &#125;);
    </script>

    </div>
  );
}
