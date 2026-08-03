import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mur de Gloire - Cocody" };

export default function Page() {
  return (
    <div className="text-on-surface antialiased" >

<header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-surface-border">
<div className="flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop py-base">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="military_tech">military_tech</span>
<h1 className="font-headline-md text-headline-md text-primary tracking-tight">Mur de Gloire - Cocody</h1>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-outline" data-icon="notifications">notifications</span>
</button>
<div className="w-10 h-10 rounded-full bg-secondary-container border-2 border-primary overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-253.png" alt="A professional studio portrait of a West African male professor in his late 40s, Dr. Koffi, wearing a modern blue suit and spectacles, smiling warmly in a bright academic office environment with soft natural lighting and a bookshelf in the background." />
</div>
</div>
</div>
</header>
<main className="pt-24 pb-24 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto space-y-8">

<section className="relative overflow-hidden rounded-xl bg-primary-container p-8 text-on-primary-container shadow-lg">
<div className="absolute inset-0 confetti-overlay"></div>
<div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
<div className="flex-1 space-y-4">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-validation-amber/20 text-validation-amber border border-validation-amber/30">
<span className="material-symbols-outlined text-sm" data-icon="stars" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md uppercase tracking-widest">Major de Promotion</span>
</div>
<h2 className="font-display-lg text-display-lg text-white">Félicitations, Koffi Kouassi !</h2>
<p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
                        Reconnu pour son excellence académique exceptionnelle et son engagement envers la communauté de Cocody. Voici votre Diplôme d'Honneur pour ce trimestre.
                    </p>
<div className="pt-4 flex gap-4">
<button className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="download">download</span>
                            Télécharger
                        </button>
<button className="px-6 py-3 border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="share">share</span>
                            Partager
                        </button>
</div>
</div>
<div className="w-full md:w-1/3 aspect-[3/4] relative">
<div className="absolute inset-0 bg-white rounded-lg shadow-2xl rotate-3 overflow-hidden border-8 border-white">
<img className="w-full h-full object-cover" src="/images/ecran-254.png" alt="A prestigious academic certificate of achievement with ornate gold borders and a central golden seal of a mortarboard cap and laurel wreath. The text is elegant and formal, featuring the name 'Koffi Kouassi' in bold calligraphy. The background is a crisp, cream-colored parchment with professional signatures at the bottom. The lighting is soft, highlighting the metallic gold texture of the seal." />
</div>
<div className="absolute -bottom-4 -left-4 w-24 h-24 bg-validation-amber rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
<span className="material-symbols-outlined text-4xl" data-icon="workspace_premium" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<div className="md:col-span-7 glass-card rounded-xl p-6">
<div className="flex justify-between items-end mb-6">
<div>
<h3 className="font-headline-md text-headline-md text-primary">Héros de l'Entraide</h3>
<p className="font-body-md text-outline">Les piliers de notre communauté cette semaine</p>
</div>
<a className="text-primary font-bold text-sm hover:underline" href="#">Voir tout</a>
</div>
<div className="space-y-4">

<div className="flex items-center justify-between p-4 rounded-lg bg-white border border-surface-border hover:border-primary/30 transition-all">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full border-2 border-impact-emerald p-0.5 overflow-hidden">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-255.png" alt="A portrait of a cheerful young woman with braided hair, wearing a vibrant yellow patterned top, in a modern cafe setting with soft focus background. She is looking at the camera with a helpful and friendly expression. The lighting is bright and airy." />
</div>
<div>
<p className="font-title-md text-title-md">Amina Traoré</p>
<p className="font-label-md text-label-md text-impact-emerald flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="volunteer_activism">volunteer_activism</span>
                                    Niveau Expert
                                </p>
</div>
</div>
<div className="text-right">
<p className="font-metric-num text-metric-num text-primary">42</p>
<p className="font-label-md text-label-md text-outline">Étudiants aidés</p>
</div>
</div>

<div className="flex items-center justify-between p-4 rounded-lg bg-white border border-surface-border">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full border-2 border-outline p-0.5 overflow-hidden">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-256.png" alt="Close-up portrait of a young man with a focused and intelligent gaze, wearing a clean white t-shirt. He is positioned against a clean, minimalist blue background. He has a slight smile, suggesting approachability and helpfulness." />
</div>
<div>
<p className="font-title-md text-title-md">Moussa Diop</p>
<p className="font-label-md text-label-md text-outline">Mentor Junior</p>
</div>
</div>
<div className="text-right">
<p className="font-metric-num text-metric-num text-primary">38</p>
<p className="font-label-md text-label-md text-outline">Étudiants aidés</p>
</div>
</div>
</div>
</div>

<div className="md:col-span-5 glass-card rounded-xl p-6 overflow-hidden">
<div className="mb-6">
<h3 className="font-headline-md text-headline-md text-primary">Séries de Légende</h3>
<p className="font-body-md text-outline">La persévérance incarnée</p>
</div>
<div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">

<div className="flex-shrink-0 w-32 flex flex-col items-center text-center space-y-2 p-3 rounded-xl bg-gradient-to-b from-primary/5 to-transparent border border-primary/10">
<img alt="1 Year Streak" className="w-16 h-16 object-contain drop-shadow-lg" src="/images/ecran-257.png" />
<div>
<p className="font-bold text-primary">Jean P.</p>
<p className="text-[10px] uppercase font-black text-validation-amber tracking-tighter">365 JOURS</p>
</div>
</div>

<div className="flex-shrink-0 w-32 flex flex-col items-center text-center space-y-2 p-3 rounded-xl bg-gradient-to-b from-outline/5 to-transparent border border-outline/10">
<img alt="100 Day Streak" className="w-16 h-16 object-contain drop-shadow-md" src="/images/ecran-258.png" />
<div>
<p className="font-bold text-primary">Sarah O.</p>
<p className="text-[10px] uppercase font-black text-outline tracking-tighter">124 JOURS</p>
</div>
</div>

<div className="flex-shrink-0 w-32 flex flex-col items-center text-center space-y-2 p-3 rounded-xl bg-gradient-to-b from-primary/5 to-transparent border border-outline/10">
<img alt="100 Day Streak" className="w-16 h-16 object-contain drop-shadow-md opacity-80" src="/images/ecran-258.png" />
<div>
<p className="font-bold text-primary">Marc K.</p>
<p className="text-[10px] uppercase font-black text-outline tracking-tighter">102 JOURS</p>
</div>
</div>
</div>
</div>
</div>

<section className="glass-card rounded-xl p-6">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-expert-purple" data-icon="auto_awesome">auto_awesome</span>
<h3 className="font-headline-md text-headline-md text-primary">Célébrations</h3>
</div>
<div className="space-y-4">

<div className="flex items-start gap-4 p-4 rounded-xl bg-white border-l-4 border-expert-purple shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 flex-shrink-0 bg-expert-purple/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-expert-purple" data-icon="emoji_events">emoji_events</span>
</div>
<div className="flex-1">
<p className="font-body-lg text-body-lg">
<span className="font-bold text-primary">Sarah O.</span> vient de débloquer le badge <span className="text-expert-purple font-bold">Excellence Académique</span> !
                        </p>
<p className="text-outline text-xs mt-1">Il y a 10 minutes • Cocody Centre</p>
<div className="mt-4 flex items-center gap-2">
<button className="flex items-center gap-1 px-4 py-2 rounded-full bg-secondary-container/30 text-primary font-bold text-xs hover:bg-secondary-container transition-colors active:scale-95">
<span className="material-symbols-outlined text-sm" data-icon="thumb_up">thumb_up</span>
                                Féliciter
                            </button>
<div className="flex -space-x-2 ml-2">
<div className="w-6 h-6 rounded-full border border-white bg-slate-200"></div>
<div className="w-6 h-6 rounded-full border border-white bg-slate-300"></div>
<div className="w-6 h-6 rounded-full border border-white bg-slate-400"></div>
</div>
<span className="text-[10px] text-outline ml-2">+12 félicitations</span>
</div>
</div>
<div className="w-20 h-20">
<img className="w-full h-full object-contain" src="/images/ecran-259.png" alt="A stylized minimalist badge icon representing academic excellence. A gold star is centered within a deep blue circular emblem, suspended by a formal blue ribbon. The word EXCELLENCE is inscribed in gold lettering at the bottom. Flat vector aesthetic with clean lines and premium color palette." />
</div>
</div>

<div className="flex items-start gap-4 p-4 rounded-xl bg-white border-l-4 border-impact-emerald shadow-sm">
<div className="w-12 h-12 flex-shrink-0 bg-impact-emerald/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-impact-emerald" data-icon="moving">moving</span>
</div>
<div className="flex-1">
<p className="font-body-lg text-body-lg">
<span className="font-bold text-primary">Marc K.</span> a progressé de <span className="text-impact-emerald font-bold">15 places</span> dans le classement municipal !
                        </p>
<p className="text-outline text-xs mt-1">Il y a 45 minutes • Cocody Riviera</p>
<div className="mt-4 flex items-center gap-2">
<button className="flex items-center gap-1 px-4 py-2 rounded-full bg-secondary-container/30 text-primary font-bold text-xs hover:bg-secondary-container transition-colors active:scale-95">
<span className="material-symbols-outlined text-sm" data-icon="rocket_launch">rocket_launch</span>
                                Féliciter
                            </button>
</div>
</div>
<div className="w-20 h-20">
<img className="w-full h-full object-contain" src="/images/ecran-260.png" alt="A prestigious municipal award medal icon featuring a golden architectural silhouette of a university building centered on a deep blue shield. The medal is encircled by a golden laurel wreath and has the words TOP STUDENT MUNICIPAL AWARD 2024 inscribed. A royal blue ribbon supports the circular gold frame." />
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-surface-border shadow-sm">
<div className="flex justify-around items-center h-16 w-full">
<a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold" href="#">
<span className="material-symbols-outlined" data-icon="workspace_premium" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
<span className="font-label-md text-label-md">Hall of Fame</span>
</a>
<a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="flag">flag</span>
<span className="font-label-md text-label-md">Objectifs</span>
</a>
<a className="flex flex-col items-center justify-center text-outline hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</div>
</nav>
<script>
        // Micro-interaction for congratulation buttons
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            if(button.innerText.includes('Féliciter')) &#123;
                button.addEventListener('click', function() &#123;
                    const icon = this.querySelector('.material-symbols-outlined');
                    icon.style.fontVariationSettings = "'FILL' 1";
                    this.classList.add('bg-impact-emerald/20', 'text-impact-emerald');
                    this.innerText = 'Félicité !';
                    
                    // Simple sparkle effect
                    const rect = this.getBoundingClientRect();
                    for(let i=0; i&lt;8; i++) &#123;
                        const sparkle = document.createElement('div');
                        sparkle.className = 'fixed pointer-events-none w-1 h-1 bg-validation-amber rounded-full z-[100]';
                        sparkle.style.left = (rect.left + rect.width/2) + 'px';
                        sparkle.style.top = (rect.top + rect.height/2) + 'px';
                        document.body.appendChild(sparkle);
                        
                        const angle = Math.random() * Math.PI * 2;
                        const dist = 30 + Math.random() * 50;
                        const tx = Math.cos(angle) * dist;
                        const ty = Math.sin(angle) * dist;
                        
                        sparkle.animate([
                            &#123; transform: 'translate(0, 0) scale(1)', opacity: 1 &#125;,
                            &#123; transform: `translate($&#123;tx&#125;px, $&#123;ty&#125;px) scale(0)`, opacity: 0 &#125;
                        ], &#123; duration: 600, easing: 'ease-out' &#125;).onfinish = () =&gt; sparkle.remove();
                    &#125;
                &#125;, &#123; once: true &#125;);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
