import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Session en Direct" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-background min-h-screen flex flex-col overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container font-headline text-headline-md font-semibold docked full-width top-0 sticky z-50 shadow-md flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="hover:opacity-80 transition-opacity active:scale-95 duration-150 flex items-center justify-center">
<span className="material-symbols-outlined">school</span>
</button>
<h1 className="font-headline text-display-lg-mobile font-bold tracking-tight text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
<div className="w-2 h-2 bg-white rounded-full"></div>
<span className="text-label-xs font-semibold uppercase tracking-wider">Direct</span>
</div>
<button className="hover:opacity-80 transition-opacity active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="hover:opacity-80 transition-opacity active:scale-95 duration-150">
<span className="material-symbols-outlined">close</span>
</button>
</div>
</header>
<main className="flex-1 flex flex-col md:flex-row overflow-hidden">

<section className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-black relative">

<div className="relative flex-1 bg-neutral-900 overflow-hidden group">
<div className="absolute inset-0 flex items-center justify-center">
<img className="w-full h-full object-cover opacity-90" src="/images/ecran-327.png" alt="A high-definition cinematic shot of a professional mathematics teacher in a modern studio, writing complex calculus equations on a glowing transparent glass board. The lighting is crisp and professional with Academic Blue backlighting, creating an institutional yet technologically advanced atmosphere. The teacher is engaging and looking towards the camera, illustrating the concept of limits and continuity for terminale students." />
</div>

<div className="absolute top-4 left-4 flex flex-col gap-2">
<div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white">
<p className="text-label-xs font-bold uppercase tracking-widest opacity-80">Sujet du jour</p>
<p className="text-body-md font-semibold">Calcul Intégral &amp; Primitives</p>
</div>
</div>
<div className="absolute bottom-4 right-4 flex items-center gap-2">
<div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">group</span>
<span className="text-label-sm">1,240 élèves</span>
</div>
</div>

<div className="absolute bottom-4 left-4 w-64 hidden sm:block">
<div className="bg-surface-container-lowest/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border-l-4 border-primary">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
<span className="text-label-xs font-bold text-primary">TUTEUR IA • ASTUCE</span>
</div>
<p className="text-label-sm text-on-surface leading-tight">
                            N'oubliez pas : $\int \frac&#123;u'&#125;&#123;u&#125; = \ln|u| + C$. C'est crucial pour l'exercice en cours !
                        </p>
</div>
</div>

<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
<div className="flex items-center justify-between text-white">
<div className="flex items-center gap-4">
<button className="hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">play_arrow</span></button>
<button className="hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">volume_up</span></button>
<span className="text-label-sm">24:15 / 60:00</span>
</div>
<div className="flex items-center gap-4">
<button className="hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">settings</span></button>
<button className="hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">fullscreen</span></button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low px-4 py-3 flex items-center justify-between border-b border-outline-variant">
<div className="flex items-center gap-2">
<button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full text-label-sm font-semibold active:scale-95 transition-transform shadow-sm" id="btn-raise-hand">
<span className="material-symbols-outlined text-[20px]">back_hand</span>
                        Lever la main
                    </button>
<button className="flex items-center gap-2 bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-full text-label-sm font-semibold hover:bg-surface-container-high active:scale-95 transition-transform">
<span className="material-symbols-outlined text-[20px]">quiz</span>
                        Poser une question
                    </button>
</div>
<div className="flex items-center gap-3 relative">
<div className="absolute bottom-full mb-4 right-0 pointer-events-none" id="reaction-container"></div>
<button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-error shadow-sm hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>favorite</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-secondary shadow-sm hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>celebration</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary shadow-sm hover:scale-110 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
</button>
</div>
</div>
</section>

<section className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-surface border-l border-outline-variant">
<div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
<h2 className="font-headline text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Chat en direct</h2>
<div className="flex items-center gap-1">
<span className="w-2 h-2 bg-forest-green bg-[#009E60] rounded-full"></span>
<span className="text-[10px] font-bold text-outline uppercase">Actif</span>
</div>
</div>

<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar" id="chat-messages">

<div className="bg-primary-fixed p-3 rounded-xl border border-primary/20 relative">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-primary text-[16px]">keep</span>
<span className="text-[10px] font-bold text-on-primary-fixed uppercase">Message épinglé</span>
</div>
<p className="text-label-sm text-on-primary-fixed leading-relaxed">
                        Le PDF des exercices de la session est disponible dans l'onglet "Ressources".
                    </p>
</div>

<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-outline">person</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="text-label-xs font-bold text-on-surface">Koffi Kouamé</span>
<span className="text-[10px] text-outline">10:24</span>
</div>
<div className="bg-surface-container p-2.5 rounded-xl rounded-tl-none mt-1">
<p className="text-body-md text-on-surface-variant leading-normal">Monsieur, pouvez-vous réexpliquer le passage de la ligne 3 à 4 ?</p>
</div>
</div>
</div>
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-container flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-white">psychology</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="text-label-xs font-bold text-tertiary-container">Edukora AI</span>
<span className="bg-tertiary-fixed text-on-tertiary-fixed px-1 rounded text-[8px] font-black uppercase">BOT</span>
</div>
<div className="bg-tertiary-container/10 border border-tertiary/20 p-2.5 rounded-xl rounded-tl-none mt-1">
<p className="text-body-md text-on-surface-variant leading-normal leading-relaxed italic">@Koffi, il s'agit d'une intégration par parties : $\int uv' = uv - \int u'v$.</p>
</div>
</div>
</div>
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container/20 flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-secondary">person</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="text-label-xs font-bold text-on-surface">Mariam Koné</span>
<span className="text-[10px] text-outline">10:26</span>
</div>
<div className="bg-surface-container p-2.5 rounded-xl rounded-tl-none mt-1">
<p className="text-body-md text-on-surface-variant leading-normal">Ah merci ! Je n'avais pas vu le signe -</p>
</div>
</div>
</div>

<div id="new-message-zone"></div>
</div>

<div className="p-4 bg-surface-container-lowest border-t border-outline-variant">
<div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-xl focus-within:ring-2 ring-primary transition-all">
<input className="flex-1 bg-transparent border-none focus:ring-0 text-body-md py-1" placeholder="Posez votre question..." type="text" />
<button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-white active:scale-95 transition-transform">
<span className="material-symbols-outlined text-[20px]">send</span>
</button>
</div>
<div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
<button className="whitespace-nowrap px-3 py-1 rounded-full border border-outline-variant text-[10px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-tight">C'est clair !</button>
<button className="whitespace-nowrap px-3 py-1 rounded-full border border-outline-variant text-[10px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-tight">Plus lentement svp</button>
<button className="whitespace-nowrap px-3 py-1 rounded-full border border-outline-variant text-[10px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-tight">Un exemple ?</button>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pt-2 pb-4 px-2 md:hidden border-t border-outline-variant dark:border-outline bg-surface dark:bg-inverse-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-5 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-label text-label-xs font-semibold">Revision</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="font-label text-label-xs font-semibold">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        function sendReaction(type) &#123;
            const container = document.getElementById('reaction-container');
            const reaction = document.createElement('div');
            reaction.className = 'reaction-float absolute text-2xl';
            
            const icons = &#123;
                'favorite': '❤️',
                'celebration': '👏',
                'thumb_up': '👍'
            &#125;;

            reaction.textContent = icons[type];
            reaction.style.left = Math.random() * 50 + 'px';
            
            container.appendChild(reaction);
            
            setTimeout(() =&gt; &#123;
                reaction.remove();
            &#125;, 2000);
        &#125;

        const raiseHandBtn = document.getElementById('btn-raise-hand');
        let isHandRaised = false;

        raiseHandBtn.addEventListener('click', () =&gt; &#123;
            isHandRaised = !isHandRaised;
            if(isHandRaised) &#123;
                raiseHandBtn.classList.remove('bg-primary');
                raiseHandBtn.classList.add('bg-forest-green', 'bg-[#009E60]');
                raiseHandBtn.innerHTML = '&lt;span class="material-symbols-outlined text-[20px]" style="font-variation-settings: \'FILL\' 1;"&gt;back_hand&lt;/span&gt; Main Levée';
            &#125; else &#123;
                raiseHandBtn.classList.remove('bg-forest-green', 'bg-[#009E60]');
                raiseHandBtn.classList.add('bg-primary');
                raiseHandBtn.innerHTML = '&lt;span class="material-symbols-outlined text-[20px]"&gt;back_hand&lt;/span&gt; Lever la main';
            &#125;
        &#125;);

        // Autoscroll chat
        const chatBox = document.getElementById('chat-messages');
        const scrollToBottom = () =&gt; &#123;
            chatBox.scrollTop = chatBox.scrollHeight;
        &#125;;
        scrollToBottom();
    </script>

    </div>
  );
}
