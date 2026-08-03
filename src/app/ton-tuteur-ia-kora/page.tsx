import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Onboarding - Kora Tuteur IA" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky flex justify-between items-center px-4 py-4 w-full max-w-md mx-auto bg-surface z-50">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="school">school</span>
<span className="font-headline text-[24px] font-bold text-primary tracking-tight">Edukora</span>
</div>
<button className="text-on-surface-variant font-label text-label-sm hover:opacity-80 transition-opacity">
            Passer
        </button>
</header>

<main className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full pb-24">

<div className="w-full relative h-72 mb-10 flex items-center justify-center">

<div className="absolute inset-0 bg-primary-fixed opacity-20 rounded-full blur-3xl scale-75"></div>

<div className="relative z-10 w-full flex flex-col gap-4">

<div className="flex justify-end translate-x-2">
<div className="chat-bubble-user bg-primary text-on-primary px-4 py-3 max-w-[80%] shadow-sm text-sm font-body">
                        "Kora, peux-tu m'expliquer le théorème de Pythagore ?"
                    </div>
</div>

<div className="flex items-center gap-3">
<div className="floating-bot w-16 h-16 bg-surface-container-lowest rounded-full border border-primary-container flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-primary text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>

<div className="chat-bubble-ai bg-white border border-outline-variant px-4 py-3 max-w-[75%] shadow-sm">
<div className="flex gap-1 mb-1">
<div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"></div>
<div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{"animationDelay":"0.2s"}}></div>
<div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{"animationDelay":"0.4s"}}></div>
</div>
<p className="text-on-surface text-sm font-body leading-relaxed">
                            Bien sûr ! Dans un triangle rectangle, le carré de l'hypoténuse est égal à...
                        </p>
</div>
</div>

<div className="absolute -bottom-4 right-4 bg-tertiary text-on-tertiary px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md animate-pulse">
<span className="material-symbols-outlined text-sm">schedule</span>
<span className="text-[10px] font-bold uppercase tracking-wider">Disponible 24h/24</span>
</div>
</div>
</div>

<div className="text-center space-y-4">
<h1 className="text-display-lg-mobile md:text-display-lg text-primary leading-tight font-bold">
                Rencontre Kora, ton Tuteur IA
            </h1>
<p className="text-body-md text-on-surface-variant leading-relaxed px-2">
                Besoin d'explications sur un cours ? Kora répond à toutes tes questions 24h/24 et t'aide à surmonter tes blocages.
            </p>
</div>

<div className="mt-8 flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant w-full">
<div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-container text-lg" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
</div>
<p className="text-label-sm font-semibold text-on-surface">
                Une aide pédagogique instantanée et personnalisée.
            </p>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-md px-6 pt-4 pb-8 max-w-md mx-auto left-1/2 -translate-x-1/2 z-50">

<div className="flex justify-center gap-2 mb-6">
<div className="h-2 w-2 rounded-full bg-outline-variant"></div>
<div className="h-2 step-active rounded-full transition-all duration-300"></div>
<div className="h-2 w-2 rounded-full bg-outline-variant"></div>
<div className="h-2 w-2 rounded-full bg-outline-variant"></div>
</div>

<button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
<span>Suivant</span>
<span className="material-symbols-outlined">arrow_forward</span>
</button>
</footer>

<div className="hidden">
<div style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBh9RwJyCB0oAht95HSI-ZivXKG3bvHOwNnkYGi8F4jMyou2CgAXaf_z5TYY4LB75b1EMHq723WOMdUrGnbci013j5oJsYcYREDydtMD4u_lGykvQIawtCk7qo9uRT-D9YqOo-mMxAKHm7dOZ2RnJcUUTYo9WmgNEzQb3mMhVzzTroJI3kWV8iGUFg4DJL9lcuUbkt87SlWfb1wT4POeG4mLgyBpVJL0Uoab-Y01XXFKE9o-PFJ2RwU')"}}></div>
</div>
<script>
        // Micro-interactions for engagement
        document.querySelector('button.w-full').addEventListener('click', function() &#123;
            // Placeholder for navigation logic
            this.style.opacity = '0.7';
            setTimeout(() =&gt; &#123;
                this.style.opacity = '1';
            &#125;, 200);
        &#125;);

        // Simulating text appearance in AI bubble
        const text = "Bien sûr ! Dans un triangle rectangle, le carré de l'hypoténuse est égal à...";
        const container = document.querySelector('.chat-bubble-ai p');
        container.textContent = '';
        let i = 0;
        
        function typeWriter() &#123;
            if (i &lt; text.length) &#123;
                container.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            &#125; else &#123;
                // Remove loading dots when finished
                document.querySelector('.chat-bubble-ai .flex.gap-1').classList.add('hidden');
            &#125;
        &#125;

        // Delay typing start
        setTimeout(typeWriter, 1000);
    </script>

    </div>
  );
}
