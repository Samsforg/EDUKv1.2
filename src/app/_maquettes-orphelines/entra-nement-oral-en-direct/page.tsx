import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Session Orale IA" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col overflow-hidden" >


<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 h-16">
<div className="flex items-center gap-4">
<button className="hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 duration-200">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-headline-md">Oral d'Anglais - BAC</h1>
</div>
<div className="flex items-center gap-2">
<div className="hidden md:flex flex-col items-end mr-2">
<span className="font-label text-label-xs font-medium opacity-80">Session en cours</span>
<span className="font-headline font-bold" id="timer">04:12</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img alt="Student" className="w-full h-full object-cover" src="/images/ecran-132.png" />
</div>
</div>
</header>

<main className="flex-grow flex flex-col items-center justify-center pt-16 pb-32 px-6 relative">

<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl glow-pulse"></div>
<div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl"></div>
</div>

<section className="z-10 flex flex-col items-center text-center space-y-8">
<div className="relative group">

<div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-125 animate-ping opacity-20"></div>

<div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-surface-container-lowest shadow-xl border border-outline-variant flex items-center justify-center p-4 relative overflow-hidden">

<div className="absolute inset-0 opacity-5 pointer-events-none" style={{"backgroundImage":"radial-gradient(#0047AB 0.5px, transparent 0.5px)","backgroundSize":"10px 10px"}}></div>
<img className="w-4/5 h-4/5 object-contain z-10 filter drop-shadow-lg" src="/images/ecran-133.png" alt="A futuristic, friendly robot mascot named Kora, designed with a sleek matte white finish and academic blue accents. The robot has large expressive digital eyes and is presented in a clean, professional 3D render style against a soft studio backdrop. The overall aesthetic is educational, authoritative yet approachable, perfectly matching the Ivorian academic brand identity." />
</div>

<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full font-headline font-bold text-sm shadow-md">
                    KORA IA
                </div>
</div>

<div className="flex items-center gap-1.5 h-12">
<div className="wave-bar w-1.5 bg-primary rounded-full"></div>
<div className="wave-bar w-1.5 bg-secondary-container rounded-full"></div>
<div className="wave-bar w-1.5 bg-primary rounded-full"></div>
<div className="wave-bar w-1.5 bg-tertiary-container rounded-full"></div>
<div className="wave-bar w-1.5 bg-primary rounded-full"></div>
<div className="wave-bar w-1.5 bg-secondary-container rounded-full"></div>
<div className="wave-bar w-1.5 bg-primary rounded-full"></div>
</div>
<div className="space-y-2">
<h2 className="font-headline text-2xl font-semibold text-primary">Prêt pour la question ?</h2>
<p className="text-on-surface-variant max-w-md mx-auto">"Describe your last vacation and how it influenced your choice of studies."</p>
</div>
</section>

<section className="fixed bottom-32 w-full max-w-2xl px-6 z-20">
<div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant p-4 rounded-xl shadow-lg flex items-start gap-4 transition-all duration-300 hover:border-primary/50">
<div className="p-2 bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>mic</span>
</div>
<div className="flex-grow">
<p className="text-on-surface-variant font-label text-label-xs mb-1">Transcription en direct</p>
<p className="text-on-surface font-medium italic">"Kora vous écoute..."</p>
<div className="text-primary font-body mt-2 min-h-[1.5rem]" id="dynamic-text">

</div>
</div>
</div>
</section>
</main>


<footer className="fixed bottom-0 w-full bg-surface border-t border-outline-variant p-6 z-30">
<div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
<div className="flex items-center gap-3">
<button className="flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl transition-all active:scale-95">
<span className="material-symbols-outlined">pause</span>
<span className="font-label text-label-sm">Pause</span>
</button>
<button className="flex items-center justify-center gap-2 px-6 py-3 bg-tertiary-container/10 hover:bg-tertiary-container/20 text-tertiary-container border border-tertiary-container rounded-xl transition-all active:scale-95">
<span className="material-symbols-outlined">lightbulb</span>
<span className="font-label text-label-sm">Demander un indice</span>
</button>
</div>
<button className="flex-grow md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-headline font-bold rounded-xl shadow-lg shadow-secondary-container/20 transition-all active:scale-95">
<span className="font-headline">Terminer la session</span>
<span className="material-symbols-outlined">check_circle</span>
</button>
</div>
</footer>

<script>
        // Simple Timer Logic
        let seconds = 252; // 4:12
        const timerDisplay = document.getElementById('timer');
        setInterval(() =&gt; &#123;
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = `$&#123;mins.toString().padStart(2, '0')&#125;:$&#123;secs.toString().padStart(2, '0')&#125;`;
        &#125;, 1000);

        // Simulation of real-time text appearing
        const dynamicDiv = document.getElementById('dynamic-text');
        const simulatedWords = ["Last", "summer", "I", "visited", "Yamoussoukro...", "It", "was", "an", "inspiring", "journey..."];
        let wordIndex = 0;

        function addWord() &#123;
            if (wordIndex &lt; simulatedWords.length) &#123;
                const span = document.createElement('span');
                span.textContent = simulatedWords[wordIndex] + " ";
                span.className = "opacity-0 translate-y-2 inline-block transition-all duration-300";
                dynamicDiv.appendChild(span);
                
                // Trigger animation
                setTimeout(() =&gt; &#123;
                    span.classList.remove('opacity-0', 'translate-y-2');
                    span.classList.add('opacity-100', 'translate-y-0');
                &#125;, 10);

                wordIndex++;
                setTimeout(addWord, 800 + Math.random() * 500);
            &#125;
        &#125;

        // Start simulation after 2 seconds
        setTimeout(addWord, 2000);
    </script>

    </div>
  );
}
