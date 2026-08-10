import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chat de Groupe - Commune de Cocody" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col max-w-5xl mx-auto shadow-sm border-x border-outline-variant/30" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface sticky top-0 z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full border-b border-outline-variant">
<div className="flex items-center gap-3">
<button aria-label="Retour" className="material-symbols-outlined text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors active:scale-95">
                arrow_back
            </button>
<div className="flex flex-col">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Commune de Cocody</h1>
<span className="font-label-xs text-label-xs text-on-surface-variant flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                    1.2k élèves en ligne
                </span>
</div>
</div>
<div className="flex items-center gap-2">
<button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-full transition-colors">search</button>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-231.png" alt="A professional close-up portrait of a young Ivorian student wearing a clean white school uniform, smiling warmly against a soft-focus academic background. The lighting is bright and natural, emphasizing a high-quality light-mode aesthetic with soft shadows and sharp details. The visual style is modern, trustworthy, and academic." />
</div>
</div>
</header>

<main className="flex-1 flex flex-col relative overflow-hidden bg-surface-bright">

<div className="absolute top-0 left-0 right-0 z-10 px-margin-mobile pt-3 pb-2">
<div className="bg-secondary-container/10 border border-secondary-container/30 backdrop-blur-md rounded-xl p-3 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-secondary-container text-white rounded-lg flex items-center justify-center shadow-md">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>swords</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-secondary-container font-bold uppercase tracking-wider">Inter-Communes</p>
<h2 className="font-body-md text-body-md text-on-surface font-semibold">Défi vs Abobo : J-2 !</h2>
</div>
</div>
<button className="bg-secondary-container text-white px-4 py-1.5 rounded-full font-label-sm text-label-sm font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all">Participer</button>
</div>
</div>

<div className="flex-1 overflow-y-auto chat-scrollbar px-margin-mobile pt-24 pb-6 flex flex-col gap-6">

<div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%] message-animation">
<div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-232.png" alt="A friendly teenage boy with short hair and a determined expression, wearing a polo shirt. He is sitting in a modern Ivorian classroom setting with soft morning light coming through a window. The style is bright and clean, fitting a premium educational app aesthetic with a focus on trust and academic focus." />
</div>
<div className="flex flex-col gap-1">
<span className="font-label-xs text-label-xs text-on-surface-variant ml-2">Kouassi • 10:42</span>
<div className="bg-white border border-outline-variant p-3 rounded-2xl rounded-bl-none shadow-sm text-on-surface">
                        On va gagner ce défi ! Cocody ne lâche rien. On est à combien de points là ? 🇨🇮
                    </div>
</div>
</div>

<div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%] message-animation" style={{"animationDelay":"0.1s"}}>
<div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-233.png" alt="A young West African girl with braided hair and a cheerful smile, looking directly at the camera. She is in a well-lit study space with books in the background. The image has a soft, professional lighting style with a primary palette of blue and white, reflecting an atmosphere of academic excellence and positivity." />
</div>
<div className="flex flex-col gap-1">
<span className="font-label-xs text-label-xs text-on-surface-variant ml-2">Aminata • 10:45</span>
<div className="bg-white border border-outline-variant p-3 rounded-2xl rounded-bl-none shadow-sm text-on-surface">
                        Qui est chaud pour une session de maths ? Je bloque sur les fonctions exponentielles... 📉🆘
                    </div>
</div>
</div>

<div className="self-center w-full max-w-sm my-2 message-animation" style={{"animationDelay":"0.2s"}}>
<div className="bg-primary-container/5 border border-primary-container/20 rounded-xl p-4 flex flex-col gap-3">
<div className="flex items-center gap-2 text-primary font-bold">
<span className="material-symbols-outlined text-xl">smart_toy</span>
<span className="font-label-sm text-label-sm uppercase">Conseil du Tuteur AI</span>
</div>
<p className="text-on-surface text-body-md italic font-medium leading-relaxed">
                        "Aminata, as-tu essayé de décomposer la dérivée ? Rappelle-toi : (e^u)' = u'e^u. Viens me voir pour un exercice guidé !"
                    </p>
<button className="w-full py-2 bg-primary text-white rounded-lg font-label-sm text-label-sm font-bold hover:bg-primary/90 transition-colors">Ouvrir le Tuteur</button>
</div>
</div>

<div className="flex flex-col items-end gap-1 self-end max-w-[85%] md:max-w-[70%] message-animation" style={{"animationDelay":"0.3s"}}>
<div className="bg-primary text-white p-3 rounded-2xl rounded-br-none shadow-md text-body-md">
                    Moi je suis dispo à 14h pour les maths ! J'ai des fiches de révision super claires sur ce chapitre.
                </div>
<span className="font-label-xs text-label-xs text-on-surface-variant mr-2">10:48 • Lu</span>
</div><div className="flex flex-col items-end gap-1 self-end max-w-[85%] md:max-w-[70%] message-animation" style={{"animationDelay":"0.35s"}}><div className="bg-white border border-outline-variant p-4 rounded-2xl rounded-br-none shadow-md flex flex-col gap-3 w-full"><div className="flex justify-between items-start"><div className="flex items-center gap-2"><div className="w-10 h-10 bg-tertiary-container/10 rounded-lg flex items-center justify-center text-tertiary"><span className="material-symbols-outlined">description</span></div><div><h3 className="font-bold text-on-surface text-sm">Fiche : Fonctions Exponentielles</h3><p className="text-label-xs text-on-surface-variant">Mathématiques • Par Moi</p></div></div><span className="bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full border border-secondary-container/30 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>CERTIFIÉ</span></div><button className="w-full py-2 border border-primary text-primary rounded-lg font-label-sm text-label-sm font-bold hover:bg-primary-container/10 transition-colors">Voir la fiche</button></div><span className="font-label-xs text-label-xs text-on-surface-variant mr-2">10:49 • Lu</span></div>

<div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%] message-animation" style={{"animationDelay":"0.4s"}}>
<div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-234.png" alt="A focused young Ivorian male student wearing glasses, looking at a tablet screen with an expression of curiosity. The background is a clean, modern library setting. The image is captured with professional studio lighting, using a cool blue and white color scheme to evoke a sense of high-tech academic support and clarity." />
</div>
<div className="flex flex-col gap-1">
<span className="font-label-xs text-label-xs text-on-surface-variant ml-2">Moussa • 10:50</span>
<div className="bg-white border border-outline-variant p-3 rounded-2xl rounded-bl-none shadow-sm text-on-surface">
                        Top ! N'oubliez pas que pour le défi Inter-Communes, chaque quiz réussi rapporte 10 points. On doit battre le score d'Abobo d'hier ! 🏆
                    </div>
</div>
</div>

<div className="self-center bg-tertiary-container/10 text-on-tertiary-fixed-variant px-4 py-1.5 rounded-full border border-tertiary-container/20 flex items-center gap-2 font-label-sm text-label-sm font-semibold message-animation" style={{"animationDelay":"0.5s"}}>
<span className="material-symbols-outlined text-sm">trending_up</span>
                Cocody est en tête du classement aujourd'hui !
            </div>
</div>

<div className="bg-surface p-margin-mobile border-t border-outline-variant flex flex-col gap-3">

<div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"><button className="flex-shrink-0 px-4 py-1.5 rounded-full border border-primary text-primary bg-primary-container/10 font-label-sm text-label-sm hover:bg-primary-container/20 transition-colors whitespace-nowrap flex items-center gap-1"><span className="material-symbols-outlined text-sm">note_add</span> Partager une fiche</button>
<button className="flex-shrink-0 px-4 py-1.5 rounded-full border border-outline-variant bg-white text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap">📚 Partager mes notes</button>
<button className="flex-shrink-0 px-4 py-1.5 rounded-full border border-outline-variant bg-white text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap">🔥 On gagne !</button>
<button className="flex-shrink-0 px-4 py-1.5 rounded-full border border-outline-variant bg-white text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap">❓ Aide en SVT</button>
</div>
<div className="flex items-center gap-3">
<button className="material-symbols-outlined text-primary p-2 hover:bg-primary-container/10 rounded-full transition-colors">add_circle</button>
<div className="flex-1 relative">
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md placeholder:text-on-surface-variant/50" placeholder="Encouragez votre commune..." type="text" />
<button className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">sentiment_satisfied</button>
</div>
<button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-110 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>send</span>
</button>
</div>
</div>
</main>

<nav className="md:hidden flex justify-around items-center h-20 px-2 pb-safe w-full bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] border-t border-outline-variant/30">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-label-xs text-label-xs">Héros</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>groups</span>
<span className="font-label-xs text-label-xs">Cocody</span>
</div>
</nav>
<script>
        // Simple Interaction Script
        document.querySelector('input').addEventListener('keypress', function (e) &#123;
            if (e.key === 'Enter') &#123;
                const text = this.value;
                if(text.trim() !== "") &#123;
                    // Visual feedback only for demo
                    this.value = '';
                    console.log("Message sent:", text);
                &#125;
            &#125;
        &#125;);

        // Auto-scroll to bottom of chat
        const chatArea = document.querySelector('.chat-scrollbar');
        chatArea.scrollTop = chatArea.scrollHeight;
    </script>

    </div>
  );
}
