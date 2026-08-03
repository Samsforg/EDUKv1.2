import type { Metadata } from "next";

export const metadata: Metadata = { title: "Classement Ambassadeurs - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding-mobile h-16 bg-surface border-b border-surface-border">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary" data-icon="menu">menu</span>
<h1 className="text-title-md font-title-md text-primary">Ambassadeurs Edukora</h1>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="military_tech">military_tech</span>
</div>
</header>

<aside className="hidden md:flex fixed left-0 top-0 h-full w-[280px] bg-surface flex-col py-6 gap-2 shadow-sm z-40">
<div className="px-6 mb-8">
<h2 className="text-headline-md font-headline-md text-primary">Edukora</h2>
</div>
<div className="px-4 py-3 mx-2 flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="text-label-md font-label-md">Tableau de bord</span>
</div>

<div className="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-full px-4 py-3 mx-2">
<span className="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span className="text-label-md font-label-md">Classement</span>
</div>
<div className="px-4 py-3 mx-2 flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
<span className="material-symbols-outlined" data-icon="group">group</span>
<span className="text-label-md font-label-md">Mes Filleuls</span>
</div>
<div className="px-4 py-3 mx-2 flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
<span className="material-symbols-outlined" data-icon="workspace_premium">workspace_premium</span>
<span className="text-label-md font-label-md">Récompenses</span>
</div>
<div className="mt-auto px-4 py-3 mx-2 flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-full cursor-pointer">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="text-label-md font-label-md">Paramètres</span>
</div>
</aside>

<main className="pt-16 pb-32 md:pl-[280px] min-h-screen">

<div className="sticky top-16 z-30 bg-surface/80 backdrop-blur-md px-container-padding-mobile py-4 border-b border-surface-border">
<div className="flex bg-surface-container-low p-1 rounded-xl max-w-md mx-auto">
<button className="flex-1 py-2 text-label-md font-label-md rounded-lg bg-surface shadow-sm text-primary">National</button>
<button className="flex-1 py-2 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors">Ma Commune</button>
</div>
</div>

<section className="px-container-padding-mobile py-base md:px-container-padding-desktop">
<div className="max-w-4xl mx-auto flex items-end justify-center gap-4 md:gap-12 pt-12 pb-8">

<div className="flex flex-col items-center flex-1">
<div className="relative mb-4">
<div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-surface-variant overflow-hidden shadow-lg">
<img className="w-full h-full object-cover" src="/images/ecran-059.png" alt="Close-up portrait of a professional African woman in a modern office environment, warm sunlight, sophisticated corporate style, elite professor aesthetic." />
</div>
<div className="absolute -top-2 -right-2 bg-slate-300 text-slate-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white">
<span className="text-label-md font-bold">2</span>
</div>
</div>
<div className="text-center">
<p className="text-body-md font-bold truncate">Amina Diallo</p>
<p className="text-label-md text-on-surface-variant">142 parrainages</p>
</div>
<div className="w-full h-24 bg-surface-container-high rounded-t-2xl mt-4 flex items-start justify-center pt-2">
<span className="material-symbols-outlined text-slate-400" data-icon="military_tech">military_tech</span>
</div>
</div>

<div className="flex flex-col items-center flex-1 -translate-y-4">
<div className="relative mb-4 scale-110">
<div className="absolute -top-10 left-1/2 -translate-x-1/2">
<span className="material-symbols-outlined text-validation-amber text-4xl animate-bounce" data-icon="star" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-validation-amber overflow-hidden shadow-xl ring-4 ring-validation-amber/20">
<img className="w-full h-full object-cover" src="/images/ecran-060.png" alt="Portrait of a distinguished man in a dark navy blue suit, intellectual clarity, ivory background, high-end professional lighting, elite status representation." />
</div>
<div className="absolute -top-2 -right-2 bg-validation-amber text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white">
<span className="text-title-md font-bold">1</span>
</div>
</div>
<div className="text-center">
<p className="text-title-md font-bold truncate">Jean-Marc Yao</p>
<p className="text-label-md text-primary font-bold">189 parrainages</p>
</div>
<div className="w-full h-32 bg-primary-container rounded-t-2xl mt-4 flex items-start justify-center pt-4">
<span className="material-symbols-outlined text-white" data-icon="workspace_premium" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
</div>

<div className="flex flex-col items-center flex-1">
<div className="relative mb-4">
<div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-surface-variant overflow-hidden shadow-lg">
<img className="w-full h-full object-cover" src="/images/ecran-061.png" alt="Close-up professional headshot of a smiling young African scholar, glasses, natural lighting, academic excellence, reliable expert style." />
</div>
<div className="absolute -top-2 -right-2 bg-orange-300 text-orange-900 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white">
<span className="text-label-md font-bold">3</span>
</div>
</div>
<div className="text-center">
<p className="text-body-md font-bold truncate">Fatou Sarr</p>
<p className="text-label-md text-on-surface-variant">128 parrainages</p>
</div>
<div className="w-full h-20 bg-surface-container rounded-t-2xl mt-4 flex items-start justify-center pt-2">
<span className="material-symbols-outlined text-orange-400" data-icon="medal">test_clone</span>
</div>
</div>
</div>
</section>

<section className="px-container-padding-mobile md:px-container-padding-desktop max-w-4xl mx-auto">
<h3 className="text-title-md font-bold mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="format_list_numbered">format_list_numbered</span>
                Top 100 Ambassadeurs
            </h3>
<div className="space-y-2">


<div className="flex items-center gap-4 p-4 bg-surface border border-surface-border rounded-xl hover:bg-surface-container-low transition-all">
<span className="w-8 text-title-md font-bold text-on-surface-variant">4</span>
<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-062.png" alt="Portrait of a young professional woman, modern educational setting, soft colors, corporate clarity." />
</div>
<div className="flex-1 min-w-0">
<p className="font-bold text-body-md truncate">Cédric Konan</p>
<p className="text-label-md text-on-surface-variant">112 parrainages</p>
</div>
<div className="px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="stars">stars</span>
<span className="text-label-md">Élite</span>
</div>
</div>

<div className="flex items-center gap-4 p-4 bg-surface border border-surface-border rounded-xl hover:bg-surface-container-low transition-all">
<span className="w-8 text-title-md font-bold text-on-surface-variant">5</span>
<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-063.png" alt="Friendly male teacher headshot, smart casual, bright classroom background, high quality professional photography." />
</div>
<div className="flex-1 min-w-0">
<p className="font-bold text-body-md truncate">Marie-Noëlle B.</p>
<p className="text-label-md text-on-surface-variant">98 parrainages</p>
</div>
<div className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="school">school</span>
<span className="text-label-md">Expert</span>
</div>
</div>

<div className="flex items-center gap-4 p-4 bg-surface border border-surface-border rounded-xl opacity-80">
<span className="w-8 text-title-md font-bold text-on-surface-variant">6</span>
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold">PB</div>
<div className="flex-1 min-w-0">
<p className="font-bold text-body-md truncate">Pascal Brou</p>
<p className="text-label-md text-on-surface-variant">85 parrainages</p>
</div>
<div className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="star_half">star_half</span>
<span className="text-label-md">Expert</span>
</div>
</div>
<div className="flex items-center gap-4 p-4 bg-surface border border-surface-border rounded-xl opacity-70">
<span className="w-8 text-title-md font-bold text-on-surface-variant">7</span>
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold">SD</div>
<div className="flex-1 min-w-0">
<p className="font-bold text-body-md truncate">Sarah Diop</p>
<p className="text-label-md text-on-surface-variant">72 parrainages</p>
</div>
<div className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="new_releases">new_releases</span>
<span className="text-label-md">Novice</span>
</div>
</div>
<div className="py-8 text-center">
<button className="text-primary font-bold text-label-md hover:underline">Charger plus d'ambassadeurs</button>
</div>
</div>
</section>
</main>

<div className="fixed bottom-16 md:bottom-0 left-0 md:left-[280px] right-0 z-40 px-container-padding-mobile py-4 bg-primary-container text-white shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
<div className="max-w-4xl mx-auto flex items-center gap-4">
<div className="relative">
<div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-064.png" alt="Professional user profile picture, friendly expression, clean blue background, high quality corporate aesthetic." />
</div>
<div className="absolute -bottom-1 -right-1 bg-validation-amber text-on-primary-fixed font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary-container">
                    12
                </div>
</div>
<div className="flex-1">
<div className="flex justify-between items-end mb-1">
<div>
<p className="text-label-md font-bold uppercase tracking-wider opacity-80">Votre Rang National</p>
<p className="text-title-md font-bold">Koffi Kouassi <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-[10px] uppercase">Elite</span></p>
</div>
<div className="text-right">
<p className="text-label-md font-bold">#12 <span className="opacity-70 font-normal">/ 1.2k</span></p>
</div>
</div>

<div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
<div className="bg-validation-amber h-full w-[75%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
</div>
<p className="text-[10px] mt-1 text-white/80">Plus que 8 parrainages pour atteindre le Top 10 !</p>
</div>
<button className="bg-white text-primary-container p-2 rounded-lg active:scale-95 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="share">share</span>
</button>
</div>
</div>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl border-t border-surface-border bg-surface/90 backdrop-blur-md flex justify-around items-center h-16 pb-safe">
<div className="flex flex-col items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="text-label-md font-label-md">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" data-icon="person_add">person_add</span>
<span className="text-label-md font-label-md">Amis</span>
</div>

<div className="flex flex-col items-center justify-center text-primary font-bold">
<span className="material-symbols-outlined" data-icon="emoji_events" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="text-label-md font-label-md">Classement</span>
</div>
<div className="flex flex-col items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="text-label-md font-label-md">Profil</span>
</div>
</nav>
<script>
        // Simple Interaction logic for tabs
        const tabButtons = document.querySelectorAll('button');
        tabButtons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                if (btn.innerText === 'National' || btn.innerText === 'Ma Commune') &#123;
                    tabButtons.forEach(b =&gt; &#123;
                        if (b.innerText === 'National' || b.innerText === 'Ma Commune') &#123;
                            b.classList.remove('bg-surface', 'shadow-sm', 'text-primary');
                            b.classList.add('text-on-surface-variant');
                        &#125;
                    &#125;);
                    btn.classList.add('bg-surface', 'shadow-sm', 'text-primary');
                    btn.classList.remove('text-on-surface-variant');
                &#125;
            &#125;);
        &#125;);

        // Floating user bar animation on scroll
        let lastScrollTop = 0;
        const userBar = document.querySelector('.fixed.bottom-16');
        window.addEventListener('scroll', () =&gt; &#123;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop &gt; lastScrollTop) &#123;
                // Scroll Down - hide bar slightly if needed or change opacity
            &#125; else &#123;
                // Scroll Up
            &#125;
            lastScrollTop = scrollTop &lt;= 0 ? 0 : scrollTop;
        &#125;, false);
    </script>

    </div>
  );
}
