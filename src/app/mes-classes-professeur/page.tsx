import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Tableau de Bord Professeur" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary shadow-md w-full top-0 sticky flex items-center justify-between px-8 h-16 w-full z-40">
<div className="flex items-center gap-4">
<button className="text-on-primary md:hidden active:opacity-90">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-2xl">Edukora</h1>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex items-center gap-4 text-on-primary/80 font-label text-label-sm">
<span className="text-on-primary font-bold">Tableau de bord</span>
<span className="hover:bg-primary-container transition-colors px-3 py-1 rounded cursor-pointer">My Classes</span>
<span className="hover:bg-primary-container transition-colors px-3 py-1 rounded cursor-pointer">Resources</span>
</div>
<div className="flex items-center gap-3">
<div className="text-right hidden sm:block">
<p className="text-on-primary font-bold text-sm">Dr. Koffi</p>
<p className="text-on-primary/70 text-xs">Faculty</p>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-220.png" alt="A professional portrait of a distinguished West African professor with a warm, scholarly expression, wearing a crisp white shirt and a navy blazer. The background is a soft-focus academic library with leather-bound books and warm ambient lighting, reflecting a prestigious and authoritative light-mode aesthetic." />
</div>
</div>
</div>
</header>
<div className="flex">

<aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-80 bg-surface border-r border-outline-variant flex-col p-4 z-30">
<div className="flex items-center gap-4 p-4 mb-6 bg-surface-container-low rounded-xl">
<div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">school</span>
</div>
<div>
<h3 className="text-primary font-headline font-bold">Lycée Scientifique</h3>
<p className="text-on-surface-variant text-xs">Yamoussoukro, CI</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full cursor-pointer active:scale-95 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">groups</span>
<span>My Classes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">person_search</span>
<span>Student Records</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">quiz</span>
<span>Quiz Builder</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">folder_open</span>
<span>Resources</span>
</a>
</nav>
<div className="mt-auto p-4 bg-primary-fixed/30 rounded-xl">
<div className="flex items-center justify-between mb-2">
<span className="text-primary font-bold text-sm">Saison des examens</span>
<span className="bg-secondary text-on-secondary text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Actif</span>
</div>
<p className="text-on-surface-variant text-xs mb-3">BAC session starts in 42 days. Keep track of student progress.</p>
<div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary-container w-2/3 h-full"></div>
</div>
</div>
</aside>

<main className="flex-1 md:ml-80 p-6 md:p-8 pb-24">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
<div>
<h2 className="text-display-lg font-headline text-primary mb-1">Class Overview</h2>
<p className="text-on-surface-variant">Manage your students and monitor academic performance for the 2024 academic year.</p>
</div>
<button className="flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-bold px-6 py-3 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all self-start md:self-center">
<span className="material-symbols-outlined">add_circle</span>
<span>Create a new class</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-full">
<div className="flex justify-between items-start mb-4">
<div>
<span className="inline-block px-2 py-1 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase mb-2">Sciences</span>
<h3 className="text-xl font-headline font-bold text-primary">Terminale C1</h3>
</div>
<button className="text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="flex items-center gap-4 mb-6">
<div className="flex flex-col">
<span className="text-outline text-xs uppercase font-semibold">Students</span>
<span className="text-lg font-bold">32</span>
</div>
<div className="h-8 w-px bg-outline-variant"></div>
<div className="flex flex-col">
<span className="text-outline text-xs uppercase font-semibold">Avg Perf.</span>
<span className="text-lg font-bold text-tertiary-container">14.8/20</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-3 mb-6 flex items-center gap-3 border border-dashed border-outline">
<div className="w-10 h-10 rounded bg-secondary-container/20 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>assignment</span>
</div>
<div>
<p className="text-xs font-semibold text-on-surface-variant">Devoirs en attente</p>
<p className="text-sm font-bold text-secondary">4 to grade</p>
</div>
</div>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-221.png" alt="A small avatar of a student looking studious with glasses, set against a clean educational backdrop in a bright blue and white palette." />
</div>
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-222.png" alt="A small avatar of a smiling young woman student with a backpack, in a brightly lit school environment following the corporate academic aesthetic." />
</div>
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                                +30
                            </div>
</div>
<button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                            View details
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-full">
<div className="flex justify-between items-start mb-4">
<div>
<span className="inline-block px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase mb-2">Mathematics</span>
<h3 className="text-xl font-headline font-bold text-primary">Première D2</h3>
</div>
<button className="text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="flex items-center gap-4 mb-6">
<div className="flex flex-col">
<span className="text-outline text-xs uppercase font-semibold">Students</span>
<span className="text-lg font-bold">45</span>
</div>
<div className="h-8 w-px bg-outline-variant"></div>
<div className="flex flex-col">
<span className="text-outline text-xs uppercase font-semibold">Avg Perf.</span>
<span className="text-lg font-bold text-primary">12.2/20</span>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-3 mb-6 flex items-center gap-3 border border-dashed border-outline">
<div className="w-10 h-10 rounded bg-secondary-container/20 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>assignment</span>
</div>
<div>
<p className="text-xs font-semibold text-on-surface-variant">Devoirs en attente</p>
<p className="text-sm font-bold text-secondary">12 to grade</p>
</div>
</div>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-223.png" alt="Small professional avatar of a focused male student with short hair, presented in a clean, modern academic profile style with soft lighting." />
</div>
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-224.png" alt="Small professional avatar of a bright female student wearing a yellow shirt, set against a blurred ivory background with high legibility." />
</div>
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                                +43
                            </div>
</div>
<button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                            View details
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-full">
<div className="flex justify-between items-start mb-4">
<div>
<span className="inline-block px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase mb-2">History</span>
<h3 className="text-xl font-headline font-bold text-primary">Seconde A</h3>
</div>
<button className="text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="flex items-center gap-4 mb-6">
<div className="flex flex-col">
<span className="text-outline text-xs uppercase font-semibold">Students</span>
<span className="text-lg font-bold">28</span>
</div>
<div className="h-8 w-px bg-outline-variant"></div>
<div className="flex flex-col">
<span className="text-outline text-xs uppercase font-semibold">Avg Perf.</span>
<span className="text-lg font-bold text-tertiary-container">16.5/20</span>
</div>
</div>
<div className="bg-tertiary-container/10 rounded-lg p-3 mb-6 flex items-center gap-3 border border-tertiary-container/30">
<div className="w-10 h-10 rounded bg-tertiary-container/20 flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="text-xs font-semibold text-on-surface-variant">Devoirs en attente</p>
<p className="text-sm font-bold text-tertiary-container">Aucune tâche en attente</p>
</div>
</div>
<div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-225.png" alt="Small professional avatar of a student looking into the distance with inspiration, academic environment, blue and orange accents, corporate style." />
</div>
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-226.png" alt="Small professional avatar of a young male student in a library setting, clear professional photography with high contrast and academic blue hues." />
</div>
<div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-dim flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                                +26
                            </div>
</div>
<button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                            View details
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>

<div className="group border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-surface-container-low hover:border-primary transition-all cursor-pointer min-h-[250px]">
<div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline group-hover:bg-primary-container group-hover:text-on-primary transition-all mb-4">
<span className="material-symbols-outlined text-3xl">add</span>
</div>
<h3 className="text-lg font-headline font-bold text-outline group-hover:text-primary">Add a new class</h3>
<p className="text-sm text-outline-variant mt-2 max-w-[200px]">Define the subject, level, and invite your students.</p>
</div>
</div>

<section className="mt-12">
<h3 className="text-headline-md font-headline text-primary mb-6">Recent Activity</h3>
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
<div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<span className="text-sm font-bold text-on-surface-variant">Latest updates from your classes</span>
<button className="text-primary text-xs font-bold uppercase tracking-wider">Clear all</button>
</div>
<div className="divide-y divide-outline-variant">
<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined">quiz</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<h4 className="font-bold text-sm">New Quiz Submission</h4>
<span className="text-xs text-outline">10m ago</span>
</div>
<p className="text-sm text-on-surface-variant">Jean Kouamé from <span className="font-semibold">Terminale C1</span> submitted "Algèbre Linéaire - Test 2".</p>
</div>
</div>
<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-container shrink-0">
<span className="material-symbols-outlined">person_add</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<h4 className="font-bold text-sm">New Student Enrollment</h4>
<span className="text-xs text-outline">2h ago</span>
</div>
<p className="text-sm text-on-surface-variant">Aissatou Diallo joined <span className="font-semibold">Seconde A</span> via the invite link.</p>
</div>
</div>
<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined">info</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<h4 className="font-bold text-sm">System Update</h4>
<span className="text-xs text-outline">Hier</span>
</div>
<p className="text-sm text-on-surface-variant">New BAC simulation exams for Mathematics are now available in the Resource center.</p>
</div>
</div>
</div>
</div>
</section>
</main>
</div>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-110 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-110 transition-transform" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label-xs">Classes</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-110 transition-transform" href="#">
<span className="material-symbols-outlined">assignment</span>
<span className="font-label text-label-xs">Quizzes</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-110 transition-transform" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</a>
</nav>
<script>
        // Simple interactivity for demonstration
        document.querySelectorAll('.bento-card').forEach(card =&gt; &#123;
            card.addEventListener('click', () =&gt; &#123;
                console.log('Navigating to class details...');
                // Integration logic here
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
