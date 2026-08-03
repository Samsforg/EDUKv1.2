import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Session Live" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface h-screen flex flex-col overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center w-full px-4 h-16 sticky top-0 z-50 bg-primary dark:bg-primary-container">
<div className="flex items-center gap-4">
<button className="text-on-primary dark:text-on-primary-container p-2 hover:bg-primary-container/20 transition-colors active:scale-95">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-display-lg-mobile font-bold text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-325.png" alt="A focused close-up profile picture of an Ivorian student wearing a clean academic uniform, looking confident and smiling slightly. The background is a soft-focus library with books, rendered in a professional, light-mode aesthetic with bright, airy lighting that highlights textures and high-quality skin tones." />
</div>
</div>
</header>
<main className="flex-1 flex flex-col md:flex-row overflow-hidden">

<section className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-black">

<div className="relative w-full aspect-video bg-inverse-surface group cursor-pointer overflow-hidden">
<img className="w-full h-full object-cover opacity-90" src="/images/ecran-326.png" alt="A cinematic widescreen shot of a professional academic teacher in an high-tech classroom setting. He is standing in front of a digital whiteboard filled with complex mathematical integral and primitive equations. The lighting is bright and corporate, highlighting the teacher's engagement. The background features blurred educational equipment and Côte d'Ivoire national colors subtly integrated into the room's decor." />

<div className="absolute inset-0 video-gradient-overlay flex flex-col justify-end p-4 transition-opacity group-hover:opacity-100 opacity-0 md:opacity-100">
<div className="flex justify-between items-end">
<div className="flex items-center gap-4 text-white">
<button className="material-symbols-outlined text-3xl">play_circle</button>
<button className="material-symbols-outlined text-2xl">volume_up</button>
<span className="text-label-sm font-medium">14:22 / 45:00</span>
</div>
<div className="flex items-center gap-4 text-white">
<span className="material-symbols-outlined">settings</span>
<span className="material-symbols-outlined">fullscreen</span>
</div>
</div>
</div>

<div className="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-lg text-label-xs font-bold flex items-center live-indicator">
                    DIRECT
                </div>
</div>

<div className="bg-surface p-4 md:p-6 flex flex-col gap-2 border-b border-outline-variant">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 className="font-headline text-headline-md font-semibold text-primary leading-tight">Révision Intégrales &amp; Primitives</h2>
<div className="flex items-center gap-3 mt-1">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">group</span>
<span className="text-label-sm font-semibold">1,240 spectateurs</span>
</div>
<span className="text-outline-variant">•</span>
<div className="text-label-sm font-medium text-tertiary-container flex items-center gap-1">
<span className="material-symbols-outlined text-[18px]">person</span>
                                Prof. Kouassi
                            </div>
</div>
</div>
<div className="flex gap-2">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-on-secondary rounded-xl font-bold shadow-md hover:bg-secondary-container transition-all active:scale-95" id="raiseHandBtn">
<span className="material-symbols-outlined" id="handIcon">front_hand</span>
<span>Lever la main</span>
</button>
<button className="flex items-center justify-center p-3 bg-surface-container-high rounded-xl text-primary hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">share</span>
</button>
</div>
</div>
</div>
</section>

<aside className="flex-1 md:w-1/3 lg:w-1/4 bg-surface-container-lowest flex flex-col border-l border-outline-variant">

<div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
<h3 className="font-headline text-body-lg font-bold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">forum</span>
                    Chat en direct
                </h3>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
</div>

<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 chat-container" id="chatStream">

<div className="bg-primary-fixed p-3 rounded-xl flex gap-3 items-start border border-primary-container/20">
<span className="material-symbols-outlined text-primary text-[20px]">keep</span>
<p className="text-label-sm text-on-primary-fixed leading-snug">
<strong>Edukora :</strong> Bienvenue ! Posez vos questions ici. Le Professeur répondra aux questions prioritaires à la fin de chaque démonstration.
                    </p>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-bold text-label-xs text-secondary-container">Aya Koffi</span>
<span className="text-[10px] text-on-surface-variant">10:04</span>
</div>
<div className="bg-surface-container p-3 rounded-xl rounded-tl-none border border-outline-variant/30 text-body-md">
                        Monsieur, est-ce que l'intégration par parties sera au BAC cette année ?
                    </div>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-bold text-label-xs text-primary">Ibrahim S.</span>
<span className="text-[10px] text-on-surface-variant">10:05</span>
</div>
<div className="bg-surface-container p-3 rounded-xl rounded-tl-none border border-outline-variant/30 text-body-md">
                        Super clair le rappel sur les primitives de ln(x) ! Merci.
                    </div>
</div>

<div className="flex flex-col gap-1 border-l-4 border-secondary pl-3 py-1">
<div className="flex items-center gap-2">
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] px-2 py-0.5 rounded-full font-bold">PRIORITAIRE</span>
<span className="font-bold text-label-xs text-on-surface">Jean-Marc B.</span>
</div>
<div className="text-body-md italic text-on-surface-variant">
                        "Pouvez-vous réexpliquer la borne supérieure dans l'intégrale de Chasles ?"
                    </div>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-bold text-label-xs text-tertiary">Marie-Laure</span>
<span className="text-[10px] text-on-surface-variant">10:07</span>
</div>
<div className="bg-surface-container p-3 rounded-xl rounded-tl-none border border-outline-variant/30 text-body-md">
                        +1 j'ai aussi un doute sur ce point là.
                    </div>
</div>
</div>

<div className="p-4 bg-surface border-t border-outline-variant">
<div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
<button className="whitespace-nowrap px-3 py-1.5 bg-surface-container-high rounded-full text-label-xs font-semibold hover:bg-outline-variant/20">Merci Prof !</button>
<button className="whitespace-nowrap px-3 py-1.5 bg-surface-container-high rounded-full text-label-xs font-semibold hover:bg-outline-variant/20">J'ai compris</button>
<button className="whitespace-nowrap px-3 py-1.5 bg-surface-container-high rounded-full text-label-xs font-semibold hover:bg-outline-variant/20">Une question ?</button>
</div>
<div className="relative group">
<textarea className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md resize-none transition-all" placeholder="Envoyez un message..." rows={1}></textarea>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container transition-colors">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>
</aside>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-md">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>live_tv</span>
<span className="font-label text-label-xs font-semibold">Directs</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        let handRaised = false;
        function toggleRaiseHand() &#123;
            const btn = document.getElementById('raiseHandBtn');
            const icon = document.getElementById('handIcon');
            handRaised = !handRaised;

            if(handRaised) &#123;
                btn.classList.remove('bg-secondary', 'text-on-secondary');
                btn.classList.add('bg-tertiary-container', 'text-on-tertiary-container', 'ring-2', 'ring-tertiary');
                icon.innerText = 'check_circle';
                btn.querySelector('span:last-child').innerText = 'Main levée !';
                
                // Add simulated system message to chat
                addSystemMessage("Vous avez levé la main. Le professeur sera notifié.");
            &#125; else &#123;
                btn.classList.add('bg-secondary', 'text-on-secondary');
                btn.classList.remove('bg-tertiary-container', 'text-on-tertiary-container', 'ring-2', 'ring-tertiary');
                icon.innerText = 'front_hand';
                btn.querySelector('span:last-child').innerText = 'Lever la main';
            &#125;
        &#125;

        function addSystemMessage(text) &#123;
            const chatStream = document.getElementById('chatStream');
            const msgDiv = document.createElement('div');
            msgDiv.className = 'flex justify-center my-2';
            msgDiv.innerHTML = `&lt;span class="bg-surface-container-highest text-on-surface-variant text-[10px] px-3 py-1 rounded-full font-medium"&gt;$&#123;text&#125;&lt;/span&gt;`;
            chatStream.appendChild(msgDiv);
            chatStream.scrollTop = chatStream.scrollHeight;
        &#125;

        // Auto-scroll chat to bottom
        window.onload = () =&gt; &#123;
            const chatStream = document.getElementById('chatStream');
            chatStream.scrollTop = chatStream.scrollHeight;
        &#125;;
    </script>

    </div>
  );
}
