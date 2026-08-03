import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Live - Tableau de Bord Expert" };

export default function Page() {
  return (
    <div className="h-screen overflow-hidden flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full flex justify-between items-center px-4 h-16 w-full z-50 bg-primary shadow-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary">menu</span>
<span className="font-headline text-xl font-bold text-on-primary">Edukora Live</span>
<div className="ml-4 px-3 py-1 bg-error rounded-full flex items-center gap-2 animate-pulse">
<div className="w-2 h-2 rounded-full bg-white"></div>
<span className="text-xs font-bold text-on-error uppercase tracking-wider">En Direct</span>
</div>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex items-center gap-4">
<div className="flex flex-col items-end">
<span className="text-on-primary font-bold text-sm">Pr. Mamadou Koné</span>
<span className="text-on-primary/70 text-xs">Mathématiques - Terminale C</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-348.png" alt="A professional headshot of a West African male professor in his late 40s, wearing a clean white shirt and glasses, smiling warmly with a blurred academic library background. The lighting is bright and professional, following the clean and institutional Edukora light-mode aesthetic." />
</div>
</div>
<span className="material-symbols-outlined text-on-primary">search</span>
</div>
</header>

<main className="flex-1 mt-16 pb-20 flex overflow-hidden">

<section className="flex-1 flex flex-col p-4 relative overflow-hidden">

<div className="absolute top-8 left-8 z-20 flex gap-4">
<div className="glass-panel rounded-xl p-3 shadow-lg border border-outline-variant flex items-center gap-3">
<div className="p-2 bg-primary-fixed rounded-lg text-primary">
<span className="material-symbols-outlined">group</span>
</div>
<div>
<p className="text-[10px] uppercase font-bold text-outline">Spectateurs</p>
<p className="text-lg font-bold text-on-surface">1,248</p>
</div>
</div>
<div className="glass-panel rounded-xl p-3 shadow-lg border border-outline-variant flex items-center gap-3">
<div className="p-2 bg-tertiary-fixed rounded-lg text-tertiary">
<span className="material-symbols-outlined">bolt</span>
</div>
<div>
<p className="text-[10px] uppercase font-bold text-outline">Engagement</p>
<p className="text-lg font-bold text-on-surface">87%</p>
</div>
</div>
</div>

<div className="flex-1 bg-white rounded-2xl shadow-inner border border-outline-variant relative overflow-hidden">

<div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{"backgroundImage":"radial-gradient(#00327d 1px, transparent 1px)","backgroundSize":"20px 20px"}}></div>

<div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
<div className="w-full max-w-2xl">
<h2 className="text-primary font-bold text-3xl mb-6">Théorème de Pythagore</h2>
<div className="aspect-video w-full border-2 border-dashed border-primary-container/30 rounded-xl flex items-center justify-center bg-primary-fixed/5">
<span className="text-primary/40 font-medium">Zone de dessin interactive active</span>
</div>
</div>
</div>

<div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-2xl border border-outline-variant p-2 flex gap-1 shadow-2xl z-30">
<button className="p-3 rounded-xl active-tool hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined">edit</span>
</button>
<button className="p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">gesture</span>
</button>
<button className="p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">square</span>
</button>
<button className="p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">change_history</span>
</button>
<div className="w-px h-8 bg-outline-variant mx-1 self-center"></div>
<button className="p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">palette</span>
</button>
<button className="p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">ink_eraser</span>
</button>
<div className="w-px h-8 bg-outline-variant mx-1 self-center"></div>
<button className="p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>

<div className="absolute top-8 right-8 w-48 aspect-video bg-inverse-surface rounded-xl border-2 border-white shadow-xl overflow-hidden z-20 group">
<img className="w-full h-full object-cover opacity-90" src="/images/ecran-349.png" alt="A POV perspective of a webcam feed showing a professor in a bright studio environment, gesturing towards the camera while explaining mathematical concepts. The studio has soft professional lighting and the teacher is centered in the frame, wearing professional attire consistent with the Edukora academic brand." />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
<p className="text-[10px] text-white font-bold uppercase flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> Retour Caméra
                    </p>
</div>
</div>
</section>

<aside className="w-96 bg-surface-container-low border-l border-outline-variant flex flex-col">
<div className="p-4 border-b border-outline-variant bg-white">
<h3 className="font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">forum</span>
                    Questions des Étudiants
                </h3>
<p className="text-xs text-on-surface-variant mt-1">4 nouvelles questions en attente</p>
</div>
<div className="flex-1 overflow-y-auto p-4 space-y-4">

<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-secondary transition-all hover:shadow-md cursor-pointer">
<div className="flex items-center gap-2 mb-2">
<div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-primary">KD</div>
<span className="text-xs font-bold text-on-surface">Koffi D.</span>
<span className="text-[10px] text-outline ml-auto">Il y a 2 min</span>
</div>
<p className="text-sm text-on-surface leading-snug">Est-ce que cette règle s'applique aussi aux triangles non-rectangles ?</p>
<div className="mt-3 flex gap-2">
<button className="flex-1 py-1.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-lg uppercase tracking-wider">Répondre</button>
<button className="p-1.5 text-outline hover:text-error transition-colors">
<span className="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</div>

<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-outline-variant transition-all hover:shadow-md cursor-pointer">
<div className="flex items-center gap-2 mb-2">
<div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center text-[10px] font-bold text-tertiary">AM</div>
<span className="text-xs font-bold text-on-surface">Awa M.</span>
<span className="text-[10px] text-outline ml-auto">Il y a 5 min</span>
</div>
<p className="text-sm text-on-surface leading-snug">Pouvez-vous refaire l'exemple n°2 s'il vous plaît ? Je n'ai pas bien saisi le calcul final.</p>
<div className="mt-3 flex gap-2">
<button className="flex-1 py-1.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-lg uppercase tracking-wider">Mettre en file</button>
</div>
</div>

<div className="bg-primary-container p-4 rounded-xl text-on-primary-container">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined">psychology</span>
<div>
<p className="text-xs font-bold uppercase">Suggestion IA</p>
<p className="text-sm mt-1">Plusieurs élèves semblent bloqués sur l'étape 3. Envisagez de lancer un sondage rapide.</p>
</div>
</div>
</div>

<div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-outline-variant opacity-60">
<div className="flex items-center gap-2 mb-2">
<div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
<span className="text-xs font-bold text-on-surface">Marc A.</span>
</div>
<p className="text-sm text-on-surface">Merci pour l'explication !</p>
</div>
</div>

<div className="p-4 bg-white border-t border-outline-variant">
<button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2">
<span className="material-symbols-outlined">poll</span>
                    Lancer un Sondage
                </button>
</div>
</aside>
</main>

<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-surface border-t border-outline-variant shadow-lg">
<div className="flex items-center gap-4">
<button className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-2 group">
<span className="material-symbols-outlined">mic</span>
<span className="text-sm font-bold pr-2">Micro</span>
</button>
<button className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all flex items-center gap-2 group">
<span className="material-symbols-outlined">videocam</span>
<span className="text-sm font-bold pr-2">Caméra</span>
</button>
</div>
<div className="flex items-center gap-2 px-6 py-2 bg-primary-container/10 rounded-full border border-primary-container/20">
<span className="material-symbols-outlined text-primary-container animate-spin-slow" style={{"animation":"spin 8s linear infinite"}}>settings</span>
<span className="text-sm font-medium text-primary">Qualité HD • Latence : 42ms</span>
</div>
<div className="flex items-center gap-4">
<button className="p-3 rounded-xl bg-surface-container-high text-on-surface font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all">
<span className="material-symbols-outlined">present_to_all</span>
                Partager l'écran
            </button>
<button className="p-3 rounded-xl bg-error text-on-error font-bold flex items-center gap-2 hover:brightness-110 transition-all px-8">
<span className="material-symbols-outlined">call_end</span>
                Terminer la Session
            </button>
</div>
</footer>

<style>
        @keyframes spin &#123;
            from &#123; transform: rotate(0deg); &#125;
            to &#123; transform: rotate(360deg); &#125;
        &#125;
        .animate-spin-slow &#123;
            animation: spin 3s linear infinite;
        &#125;
    </style>

<script>
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.classList.add('scale-95');
                setTimeout(() =&gt; this.classList.remove('scale-95'), 100);
            &#125;);
        &#125;);

        // Toggle state for Mic/Camera
        const controlButtons = document.querySelectorAll('.group');
        controlButtons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                const icon = this.querySelector('.material-symbols-outlined');
                if (this.classList.contains('bg-error')) &#123;
                    this.classList.remove('bg-error', 'text-on-error');
                    this.classList.add('bg-surface-container-high', 'text-on-surface');
                    if (icon.innerText === 'mic_off') icon.innerText = 'mic';
                    if (icon.innerText === 'videocam_off') icon.innerText = 'videocam';
                &#125; else &#123;
                    this.classList.add('bg-error', 'text-on-error');
                    this.classList.remove('bg-surface-container-high', 'text-on-surface');
                    if (icon.innerText === 'mic') icon.innerText = 'mic_off';
                    if (icon.innerText === 'videocam') icon.innerText = 'videocam_off';
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
