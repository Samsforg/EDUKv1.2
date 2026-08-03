import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Minuteur Pomodoro" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-primary dark:bg-primary-container shadow-sm">
<div className="flex items-center gap-3">
<button className="text-on-primary hover:bg-primary-container/20 p-2 rounded-lg transition-colors">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full border-2 border-on-primary overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-244.png" alt="A portrait of a young Ivorian student smiling, wearing a clean school uniform. The lighting is bright and natural, set against a blurred academic background with deep blues and soft whites. The image is professional, modern, and conveys a sense of academic ambition and national pride." />
</div>
</div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto flex flex-col gap-8">

<section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="p-3 bg-primary-container/10 rounded-xl text-primary">
<span className="material-symbols-outlined text-4xl">functions</span>
</div>
<div>
<p className="text-label-sm text-outline uppercase tracking-wider font-semibold">Session Actuelle</p>
<h2 className="font-headline text-headline-md font-bold text-primary">Mathématiques : Les Intégrales</h2>
</div>
</div>
<div className="hidden md:block text-right">
<span className="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-label-xs font-bold">
                    BAC D
                </span>
</div>
</section>

<section className="flex flex-col items-center gap-8 py-4">

<div className="flex bg-surface-container-high p-1 rounded-full w-full max-w-sm">
<button className="flex-1 py-2 rounded-full text-label-sm font-semibold transition-all bg-primary text-on-primary shadow-md" id="btn-work">Travail</button>
<button className="flex-1 py-2 rounded-full text-label-sm font-semibold transition-all text-on-surface-variant hover:bg-surface-container-highest" id="btn-short">Courte Pause</button>
<button className="flex-1 py-2 rounded-full text-label-sm font-semibold transition-all text-on-surface-variant hover:bg-surface-container-highest" id="btn-long">Longue Pause</button>
</div>

<div className="relative flex items-center justify-center">
<svg className="w-72 h-72 md:w-80 md:h-80">

<circle className="text-surface-container-highest stroke-current" cx="144" cy="144" fill="transparent" r="130" strokeWidth="12" />

<circle className="progress-ring__circle text-secondary-container stroke-current" cx="144" cy="144" fill="transparent" id="progress-circle" r="130" strokeLinecap="round" strokeWidth="12" style={{"strokeDasharray":"816.8","strokeDashoffset":"0"}} />
</svg>

<div className="absolute flex flex-col items-center">
<span className="font-display text-7xl font-bold tracking-tighter text-on-surface" id="timer-display">25:00</span>
<span className="text-label-sm font-medium text-outline uppercase tracking-[0.2em] mt-2" id="timer-label">Prêt à réviser</span>
</div>
</div>

<div className="flex items-center gap-6">
<button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-outline-variant text-outline hover:bg-surface-container-low transition-all active:scale-90" id="reset-btn">
<span className="material-symbols-outlined text-2xl">replay</span>
</button>
<button className="w-20 h-20 flex items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg hover:shadow-xl active:scale-95 transition-all" id="play-btn">
<span className="material-symbols-outlined text-5xl" id="play-icon" style={{"fontVariationSettings":"'FILL' 1"}}>play_arrow</span>
</button>
<button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-outline-variant text-outline hover:bg-surface-container-low transition-all active:scale-90" id="settings-btn">
<span className="material-symbols-outlined text-2xl">tune</span>
</button>
</div>
</section>

<section className="bg-primary-container rounded-2xl p-5 text-on-primary-container relative overflow-hidden">
<div className="relative z-10 flex gap-4">
<div className="flex-shrink-0">
<div className="w-12 h-12 bg-on-primary-container text-primary rounded-xl flex items-center justify-center">
<span className="material-symbols-outlined text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
</div>
<div className="flex flex-col gap-1">
<span className="text-label-sm font-bold uppercase tracking-widest opacity-80">Astuce de Kora</span>
<p className="text-body-md leading-relaxed">
                        "Pour les intégrales, visualise l'aire sous la courbe. Prends 25 minutes de focus intense sans téléphone pour ancrer les formules de base dans ta mémoire à long terme."
                    </p>
</div>
</div>

<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-9xl">psychology_alt</span>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-on-surface h-16 px-2 pb-safe border-t border-outline-variant flex justify-around items-center shadow-md rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label text-label-xs">Examens</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>timer</span>
<span className="font-label text-label-xs">Pomodoro</span>
</a>
</nav>
<script>
        let timeLeft = 25 * 60;
        let totalTime = 25 * 60;
        let timerId = null;
        let isWorkSession = true;

        const display = document.getElementById('timer-display');
        const progressCircle = document.getElementById('progress-circle');
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const resetBtn = document.getElementById('reset-btn');
        const timerLabel = document.getElementById('timer-label');
        
        const circumference = 130 * 2 * Math.PI;

        function updateDisplay() &#123;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            display.textContent = `$&#123;minutes.toString().padStart(2, '0')&#125;:$&#123;seconds.toString().padStart(2, '0')&#125;`;
            
            const offset = circumference - (timeLeft / totalTime) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        &#125;

        function setTimer(minutes) &#123;
            pauseTimer();
            totalTime = minutes * 60;
            timeLeft = totalTime;
            updateDisplay();
            
            // UI Switcher state
            const buttons = ['btn-work', 'btn-short', 'btn-long'];
            const targetId = minutes === 25 ? 'btn-work' : (minutes === 5 ? 'btn-short' : 'btn-long');
            
            buttons.forEach(id =&gt; &#123;
                const btn = document.getElementById(id);
                if(id === targetId) &#123;
                    btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
                    btn.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-highest');
                    timerLabel.textContent = id === 'btn-work' ? 'Concentration' : 'Pause';
                &#125; else &#123;
                    btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
                    btn.classList.add('text-on-surface-variant', 'hover:bg-surface-container-highest');
                &#125;
            &#125;);
        &#125;

        function toggleTimer() &#123;
            if (timerId) &#123;
                pauseTimer();
            &#125; else &#123;
                startTimer();
            &#125;
        &#125;

        function startTimer() &#123;
            if (timerId) return;
            playIcon.textContent = 'pause';
            timerId = setInterval(() =&gt; &#123;
                timeLeft--;
                updateDisplay();
                if (timeLeft &lt;= 0) &#123;
                    clearInterval(timerId);
                    timerId = null;
                    playIcon.textContent = 'play_arrow';
                    alert("C'est l'heure !");
                &#125;
            &#125;, 1000);
        &#125;

        function pauseTimer() &#123;
            clearInterval(timerId);
            timerId = null;
            playIcon.textContent = 'play_arrow';
        &#125;

        function resetTimer() &#123;
            pauseTimer();
            timeLeft = totalTime;
            updateDisplay();
        &#125;

        playBtn.addEventListener('click', toggleTimer);
        resetBtn.addEventListener('click', resetTimer);

        // Initialize
        updateDisplay();
    </script>

    </div>
  );
}
