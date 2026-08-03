import type { Metadata } from "next";

export const metadata: Metadata = { title: "Classement Global - BAC Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile py-base">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-100 rounded-full">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md-mobile font-bold text-primary">Classement par Commune</h1>
</div>
<button className="p-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-100 rounded-full">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</header>
<main className="pb-32">

<div className="px-margin-mobile pt-stack-md">
<div className="bg-surface-container-low p-1 rounded-full flex items-center"><button className="flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all bg-primary-container text-on-primary-container shadow-sm" id="toggle-streaks">Ma Commune</button><button className="flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all text-on-surface-variant hover:bg-surface-container-high" id="toggle-score">National</button></div>
</div>

<section className="mt-stack-lg px-margin-mobile podium-gradient rounded-b-[40px] pb-8">
<div className="flex justify-center items-end gap-2 sm:gap-6">

<div className="flex flex-col items-center mb-4 order-1 w-1/3 max-w-[100px]">
<div className="relative mb-3">
<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-outline-variant overflow-hidden bg-white">
<img className="w-full h-full object-cover" src="/images/ecran-065.png" alt="A professional studio portrait of a young Ivorian student smiling confidently, soft academic lighting, wearing a clean polo shirt, set against a blurred modern educational background with Academic Blue tones." />
</div>
<div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
<span className="material-symbols-outlined medal-silver text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface text-center truncate w-full">Ibrahim K.</span>
<span className="font-label-xs text-label-xs text-secondary font-bold">42 Jours</span>
</div>

<div className="flex flex-col items-center order-2 w-1/3 max-w-[120px]">
<div className="relative mb-4">
<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-secondary-container overflow-hidden bg-white shadow-xl">
<img className="w-full h-full object-cover" src="/images/ecran-066.png" alt="Close up portrait of an ambitious female student in Abidjan, natural daylight, looking focused and proud, modern professional photography style, high-end corporate aesthetic with a hint of National Orange and Academic Blue accents." />
</div>
<div className="absolute -top-3 left-1/2 -translate-x-1/2">
<span className="material-symbols-outlined text-secondary-container text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
<span className="material-symbols-outlined medal-gold text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
</div>
<span className="font-headline-md text-label-sm font-extrabold text-primary text-center truncate w-full">Sarah Ouat.</span>
<span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-0.5 rounded-full mt-1">58 Jours</span>
</div>

<div className="flex flex-col items-center mb-2 order-3 w-1/3 max-w-[100px]">
<div className="relative mb-3">
<div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full border-2 border-outline-variant overflow-hidden bg-white">
<img className="w-full h-full object-cover" src="/images/ecran-067.png" alt="A professional headshot of a motivated Ivorian high school student with a friendly expression, soft natural indoor lighting, clean minimalist composition, emphasizing the professional and academic focus of the Edukora platform." />
</div>
<div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
<span className="material-symbols-outlined medal-bronze text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface text-center truncate w-full">Jean-Marc</span>
<span className="font-label-xs text-label-xs text-secondary font-bold">39 Jours</span>
</div>
</div>
</section>

<section className="mt-4 px-margin-mobile space-y-3">

<div className="flex items-center bg-surface-container-lowest p-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
<span className="w-8 font-bold text-on-surface-variant">4</span>
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img className="w-full h-full object-cover" src="/images/ecran-068.png" alt="High-quality portrait of a young male student, professional aesthetic, neutral grey background, clean and trustworthy look, aligned with the corporate and academic identity of the Edukora platform." />
</div>
<div className="flex-1">
<p className="font-bold text-on-surface">Moussa Traoré</p>
<p className="text-[10px] text-outline uppercase tracking-wider">Série de 31 jours</p>
<span className="inline-block mt-1 px-2 py-0.5 bg-surface-container-high text-outline text-[9px] font-bold rounded uppercase tracking-tighter">Cocody</span></div>
<div className="flex items-center text-secondary gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-bold">31</span>
</div>
</div>

<div className="flex items-center bg-surface-container-lowest p-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
<span className="w-8 font-bold text-on-surface-variant">5</span>
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img className="w-full h-full object-cover" src="/images/ecran-069.png" alt="Portrait of a diligent female student in a classroom setting, soft shallow depth of field, high-end photography, bright light-mode atmosphere, reflecting academic success and educational ambition." />
</div>
<div className="flex-1">
<p className="font-bold text-on-surface">Aminata C.</p>
<p className="text-[10px] text-outline uppercase tracking-wider">Série de 28 jours</p>
<span className="inline-block mt-1 px-2 py-0.5 bg-surface-container-high text-outline text-[9px] font-bold rounded uppercase tracking-tighter">Cocody</span></div>
<div className="flex items-center text-secondary gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-bold">28</span>
</div>
</div>

<div className="flex items-center bg-surface-container-lowest p-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
<span className="w-8 font-bold text-on-surface-variant">6</span>
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img className="w-full h-full object-cover" src="/images/ecran-070.png" alt="Detailed studio headshot of a focused young man, academic professional style, wearing glasses, soft professional lighting, serene and high-tech feel, matching the Edukora blue and white theme." />
</div>
<div className="flex-1">
<p className="font-bold text-on-surface">Fabrice Yao</p>
<p className="text-[10px] text-outline uppercase tracking-wider">Série de 25 jours</p>
<span className="inline-block mt-1 px-2 py-0.5 bg-surface-container-high text-outline text-[9px] font-bold rounded uppercase tracking-tighter">Cocody</span></div>
<div className="flex items-center text-secondary gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-bold">25</span>
</div>
</div>

<div className="flex items-center bg-surface-container-lowest p-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
<span className="w-8 font-bold text-on-surface-variant">7</span>
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img className="w-full h-full object-cover" src="/images/ecran-071.png" alt="Portrait of a happy high school student, bright and airy lighting, professional modern style, blurred school environment background, consistent with a premium educational platform design." />
</div>
<div className="flex-1">
<p className="font-bold text-on-surface">Marie-Claire</p>
<p className="text-[10px] text-outline uppercase tracking-wider">Série de 22 jours</p>
<span className="inline-block mt-1 px-2 py-0.5 bg-surface-container-high text-outline text-[9px] font-bold rounded uppercase tracking-tighter">Cocody</span></div>
<div className="flex items-center text-secondary gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-bold">22</span>
</div>
</div>
</section>
</main>

<div className="fixed bottom-16 left-0 w-full px-4 py-2 z-40">
<div className="bg-primary text-on-primary flex items-center p-4 rounded-full shadow-2xl border-2 border-white">
<span className="w-8 font-bold">3</span>
<div className="w-8 h-8 rounded-full border-2 border-primary-container overflow-hidden mr-3">
<img className="w-full h-full object-cover" src="/images/ecran-072.png" alt="A professional avatar of a young student, modern clean style, representing the user in an educational mobile application, high quality, corporate lighting, set in a light mode UI environment." />
</div>
<div className="flex-1"><p className="font-bold font-label-sm text-label-sm">Moi (Toi)</p><p className="text-[9px] opacity-80 uppercase tracking-tighter">3e à Cocody • Top 1% local</p></div>
<div className="flex items-center gap-1 bg-primary-container text-white px-3 py-1 rounded-full">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-bold">14</span>
</div>
</div>
</div>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl shadow-lg bg-surface-container-lowest shadow-[0_-4px_10px_rgba(0,50,125,0.1)] flex justify-around items-center h-16 px-gutter">
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bookmark</span>
<span className="font-label-xs text-label-xs">Favoris</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</button>
</nav>
<script>
        const streakBtn = document.getElementById('toggle-streaks');
        const scoreBtn = document.getElementById('toggle-score');

        streakBtn.addEventListener('click', () =&gt; &#123;
            streakBtn.classList.add('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
            streakBtn.classList.remove('text-on-surface-variant');
            scoreBtn.classList.remove('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
            scoreBtn.classList.add('text-on-surface-variant');
        &#125;);

        scoreBtn.addEventListener('click', () =&gt; &#123;
            scoreBtn.classList.add('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
            scoreBtn.classList.remove('text-on-surface-variant');
            streakBtn.classList.remove('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
            streakBtn.classList.add('text-on-surface-variant');
        &#125;);
    </script>

    </div>
  );
}
