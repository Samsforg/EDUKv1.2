import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Live - Sessions" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-primary-container/20 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-xl font-bold">Edukora Live</h1>
</div>
<div className="flex items-center gap-2">
<button className="p-2 hover:bg-primary-container/20 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">search</span>
</button>
</div>
</header>
<main className="pt-20 px-4 max-w-5xl mx-auto space-y-8">

<section className="relative overflow-hidden rounded-xl bg-primary-container aspect-[16/9] md:aspect-[21/9] shadow-lg">
<div className="absolute inset-0 z-0">
<div className="w-full h-full" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEeGTTJDDBIoSEHZCPZ7tSD37EzVi7HLfenSO3sugRVEQmAvV3Hs6P_6VieaBTgkjOX8F8grmkIbO5YD24oeqq7ODAVaCEqUymY7FrW8CF1ZhmaGYY3ze7GDSk-2qLMS0bc6BCM1rBVpWMQOpIbL-9udXgMkfx8ZcgYpR1DW2s41tqKvTKzpn-LXNlniHXzSugmn4vAJbCeQv8TdSB4GIN0OjOKvL63K0dellUZnf8X8URBp7ZrPRd')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
</div>
<div className="absolute top-4 left-4 z-10 flex gap-2">
<span className="bg-error text-on-error px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
<span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    En Direct
                </span>
<span className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">visibility</span>
                    1.2k élèves
                </span>
</div>
<div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div className="max-w-lg">
<p className="text-on-primary-container font-semibold text-sm mb-1 uppercase tracking-widest">Révision Intensive BAC</p>
<h2 className="text-white font-headline text-2xl md:text-3xl font-extrabold leading-tight">Mathématiques : Maîtriser les Intégrales Complexes</h2>
<p className="text-white/80 mt-2 line-clamp-2 md:line-clamp-none">Session animée par le Dr. Koffi. Astuces pour réussir l'épreuve de mathématiques et résolution de sujets types.</p>
</div>
<button className="bg-secondary-container text-on-secondary-container font-bold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md hover:brightness-110">
                    REJOINDRE
                    <span className="material-symbols-outlined">play_arrow</span>
</button>
</div>
</section>

<section className="space-y-4">
<div className="flex justify-between items-center">
<h3 className="font-headline text-headline-md text-on-surface font-semibold">Catégories</h3>
<button className="text-primary font-semibold text-sm hover:underline">Voir tout</button>
</div>
<div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
<div className="flex-none bg-primary-container text-on-primary-container px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[120px] shadow-sm">
<span className="material-symbols-outlined text-3xl">calculate</span>
<span className="font-semibold text-sm">Sciences</span>
</div>
<div className="flex-none bg-surface-container-high text-on-surface-variant px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[120px] hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-3xl">history_edu</span>
<span className="font-semibold text-sm">Littérature</span>
</div>
<div className="flex-none bg-surface-container-high text-on-surface-variant px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[120px] hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-3xl">public</span>
<span className="font-semibold text-sm">Langues</span>
</div>
<div className="flex-none bg-surface-container-high text-on-surface-variant px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[120px] hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-3xl">menu_book</span>
<span className="font-semibold text-sm">SVT</span>
</div>
<div className="flex-none bg-surface-container-high text-on-surface-variant px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[120px] hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-3xl">science</span>
<span className="font-semibold text-sm">Physique</span>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-headline-md text-on-surface font-semibold">Prochains Lives</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
<div className="relative h-40">
<div className="w-full h-full" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuB4cJn5vrXJKwgpArtxUCaKmaIhYKkXHQ14xf2g4u9QW7aWQT4GmFcd2gCfOjwI_Ok7bL8XQ8sJOkbgu5P903-tqDPSu14Hpd0-0Og4y-YNuLXIV8Nn7pZmGObjY3JOoLnvOEqWB9AMvzxyK4GIJp3OlUdy6iAA0wAD4bfBkA1yR33fol3sCtsHjvXykqPyAKv8ZZ6NJ8HjimD8JdpA3dlkavSgbDKT5MfnF30JubssJXjf5VGrXYix')"}}></div>
<div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">timer</span>
                            2h 15m
                        </div>
<div className="absolute bottom-3 left-3 flex items-center gap-2">
<div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-136.png" alt="Small round profile picture of a professional educator in a suit, professional photography style." />
</div>
<span className="text-white text-xs font-bold drop-shadow-md">Mme. Yao</span>
</div>
</div>
<div className="p-4 flex-1 flex flex-col">
<span className="text-tertiary font-bold text-xs uppercase tracking-tight mb-1">Français - Dissertation</span>
<h4 className="font-bold text-on-surface text-lg leading-snug">L'art de l'introduction et de la conclusion</h4>
<div className="mt-4 flex items-center justify-between">
<div className="text-on-surface-variant text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                                Aujourd'hui, 16:00
                            </div>
<button className="text-primary-container hover:bg-primary-fixed p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
<div className="relative h-40">
<div className="w-full h-full" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKKoftKdmX2DZ_A8WfFs65rs97JI744a3BbUJ6U41csPjJIDMBx_NYRqXGdcRctLOl2rQ_HSBhrY0WdbZyUIy1XLNofe6O6tr78JtNPf5CDuztQY9-Fgyjx6jLDbc5XFvxUD1oIfNgMovYI4-Mm8SnbCiC7uCwuOpYvjH1Bb3XOCwxFwpg9SI8Zwz3l3raoC9oRwUlOtxR4bRyz8JjoRDcBfepoR-gkoA9qL1oA8WSsRV3KSB9e6jm')"}}></div>
<div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">timer</span>
                            4h 45m
                        </div>
<div className="absolute bottom-3 left-3 flex items-center gap-2">
<div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-137.png" alt="Professional avatar of a science teacher, middle-aged man with a confident look, academic lighting." />
</div>
<span className="text-white text-xs font-bold drop-shadow-md">M. Traoré</span>
</div>
</div>
<div className="p-4 flex-1 flex flex-col">
<span className="text-tertiary font-bold text-xs uppercase tracking-tight mb-1">Physique-Chimie</span>
<h4 className="font-bold text-on-surface text-lg leading-snug">Réactions Acido-Basiques et pH-métrie</h4>
<div className="mt-4 flex items-center justify-between">
<div className="text-on-surface-variant text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                                Aujourd'hui, 18:30
                            </div>
<button className="text-primary-container hover:bg-primary-fixed p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
<div className="relative h-40">
<div className="w-full h-full" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuATYK6rTJC0vFqYk1Lz_2przy0ObhExH8NpDTg1Ex0T7T1FsX7Uz1AFW-jpR6fpCa7kPjEt4-BK4sx1xfc3b5YJJPqVOTZkdTu8C1hUw076DQJZHYhqmypOPgn-swmQl0PB_f0zCerXmpcNA1dBDeMAwd7JNzUd4vIosD1G0j-NOcpIGPJWjLBAdlKtvNPsm1PX8uBhznDKo7wNN_ovTKbtAjGUDOPhyFWVr_O18rXc0u1h5MgSinMT')"}}></div>
<div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">timer</span>
                            Demain
                        </div>
<div className="absolute bottom-3 left-3 flex items-center gap-2">
<div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-138.png" alt="Professional avatar of an English teacher, young and dynamic, professional photography." />
</div>
<span className="text-white text-xs font-bold drop-shadow-md">Mr. Smith</span>
</div>
</div>
<div className="p-4 flex-1 flex flex-col">
<span className="text-tertiary font-bold text-xs uppercase tracking-tight mb-1">Anglais - LV1</span>
<h4 className="font-bold text-on-surface text-lg leading-snug">Perfecting Your Speaking Skills for BAC</h4>
<div className="mt-4 flex items-center justify-between">
<div className="text-on-surface-variant text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                                Demain, 09:00
                            </div>
<button className="text-primary-container hover:bg-primary-fixed p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</div>
</div>
</div>
</section>

<section className="bg-tertiary-container text-on-tertiary-container p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
<div className="flex-1 space-y-2">
<h4 className="font-headline text-xl font-bold">Ne manquez aucun direct !</h4>
<p className="text-on-tertiary-container/80 text-sm">Activez les notifications pour être informé 15 minutes avant chaque session stratégique pour votre réussite.</p>
</div>
<button className="w-full md:w-auto bg-on-tertiary-container text-tertiary-container font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>notifications_active</span>
                M'ABONNER AUX ALERTES
            </button>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-6 py-1 scale-95 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>live_tv</span>
<span className="font-label text-label-xs font-medium">Direct</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for category selection
        document.querySelectorAll('.flex-none').forEach(category =&gt; &#123;
            category.addEventListener('click', function() &#123;
                document.querySelectorAll('.flex-none').forEach(c =&gt; &#123;
                    c.classList.remove('bg-primary-container', 'text-on-primary-container');
                    c.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                &#125;);
                this.classList.add('bg-primary-container', 'text-on-primary-container');
                this.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            &#125;);
        &#125;);

        // Simple notification toggle interaction
        document.querySelectorAll('button .material-symbols-outlined').forEach(icon =&gt; &#123;
            if(icon.innerText === 'notifications') &#123;
                icon.parentElement.addEventListener('click', function() &#123;
                    const iconElement = this.querySelector('.material-symbols-outlined');
                    if(iconElement.innerText === 'notifications') &#123;
                        iconElement.innerText = 'notifications_active';
                        iconElement.style.fontVariationSettings = "'FILL' 1";
                        iconElement.classList.add('text-secondary');
                    &#125; else &#123;
                        iconElement.innerText = 'notifications';
                        iconElement.style.fontVariationSettings = "'FILL' 0";
                        iconElement.classList.remove('text-secondary');
                    &#125;
                &#125;);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
