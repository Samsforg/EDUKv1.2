import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Gestion des Utilisateurs" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface-container-high dark:bg-surface-container-highest shadow-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-icon="school">school</span>
<h1 className="text-headline-md font-headline font-bold text-primary dark:text-primary-fixed-dim">Edukora</h1>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-171.png" alt="A professional studio portrait of a high-ranking academic administrator in a clean white environment. The lighting is soft and professional, reflecting the Edukora corporate light-mode aesthetic with subtle hints of Academic Blue. The person has a friendly, authoritative expression, embodying trust and academic excellence." />
</div>
</header>
<main className="pt-20 px-4 max-w-md mx-auto">

<div className="mt-4 mb-6">
<div className="relative group">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline" data-icon="search">search</span>
</div>
<input className="w-full pl-11 pr-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary text-body-md placeholder:text-on-surface-variant transition-all" placeholder="Rechercher par nom, email..." type="text" />
</div>
</div>

<div className="flex overflow-x-auto gap-2 mb-8 hide-scrollbar">
<button className="px-6 py-2 rounded-full bg-primary text-on-primary text-label-sm whitespace-nowrap shadow-sm font-semibold transition-transform active:scale-95">Tous</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm whitespace-nowrap hover:bg-surface-variant transition-colors">Students</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm whitespace-nowrap hover:bg-surface-variant transition-colors">Professors</button>
<button className="px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm whitespace-nowrap hover:bg-surface-variant transition-colors">Admins</button>
</div>

<div className="flex justify-between items-center mb-4 px-1">
<p className="text-label-sm text-outline uppercase tracking-wider">Total: 1,248 Users</p>
<button className="text-primary font-semibold flex items-center gap-1 text-label-sm">
<span className="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
                Filtres
            </button>
</div>

<div className="space-y-3">

<div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant hover:border-primary transition-all group">
<div className="flex items-center gap-4">
<div className="relative">
<img className="w-12 h-12 rounded-full object-cover" src="/images/ecran-172.png" alt="Close-up headshot of a young Ivorian student with a bright, motivated expression, wearing a simple polo shirt. The background is a soft, blurred library setting with warm, clean lighting. The aesthetic aligns with the Edukora mission of academic growth and professionalism, using high-quality light-mode photography." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-container border-2 border-surface-container-low rounded-full"></div>
</div>
<div>
<h3 className="font-headline font-semibold text-on-surface">Koffi Kouadio</h3>
<div className="flex items-center gap-2">
<span className="text-label-xs text-outline">Student</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-label-xs text-tertiary-container font-bold">Actif</span>
</div>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>

<div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant hover:border-primary transition-all group">
<div className="flex items-center gap-4">
<div className="relative">
<img className="w-12 h-12 rounded-full object-cover" src="/images/ecran-173.png" alt="A portrait of an experienced West African female professor in her 50s with an intelligent and encouraging look. She wears modern professional attire. The background is an abstract, clean academic office with blurred books. Lighting is crisp and bright, focusing on the educator's face to represent trust and authority in the Edukora portal." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-container border-2 border-surface-container-low rounded-full"></div>
</div>
<div>
<h3 className="font-headline font-semibold text-on-surface">Dr. Aminata Diallo</h3>
<div className="flex items-center gap-2">
<span className="text-label-xs text-outline">Expert Prof</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-label-xs text-secondary-container font-bold">In Class</span>
</div>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>

<div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant hover:border-primary transition-all group">
<div className="flex items-center gap-4">
<div className="relative">
<img className="w-12 h-12 rounded-full object-cover grayscale opacity-70" src="/images/ecran-174.png" alt="Professional profile photo of a young man in his late 20s, wearing glasses and looking focused. The shot is well-lit with a neutral, bright background consistent with corporate software design. Minimalist and clear, representing a new user awaiting system verification on the Edukora educational platform." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-outline border-2 border-surface-container-low rounded-full"></div>
</div>
<div>
<h3 className="font-headline font-semibold text-on-surface-variant italic">Yao Jean-Marc</h3>
<div className="flex items-center gap-2">
<span className="text-label-xs text-outline">Student</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-label-xs text-outline font-bold">Vérification en attente</span>
</div>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>

<div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant hover:border-primary transition-all group">
<div className="flex items-center gap-4">
<div className="relative">
<img className="w-12 h-12 rounded-full object-cover" src="/images/ecran-175.png" alt="Portrait of a young woman with a confident smile, appearing as a teaching assistant. She is outdoors on a modern campus with natural sunlight illuminating her face. High clarity and vibrant colors like Forest Green and National Orange are subtly present in the surroundings to keep branding consistent." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-container border-2 border-surface-container-low rounded-full"></div>
</div>
<div>
<h3 className="font-headline font-semibold text-on-surface">Marie-Claire Tanoh</h3>
<div className="flex items-center gap-2">
<span className="text-label-xs text-outline">Professor</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-label-xs text-tertiary-container font-bold">Actif</span>
</div>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>

<div className="bg-primary-container/5 p-4 rounded-xl flex items-center justify-between border border-primary/20 hover:border-primary transition-all group">
<div className="flex items-center gap-4">
<div className="relative">
<img className="w-12 h-12 rounded-full object-cover border-2 border-primary" src="/images/ecran-176.png" alt="A sharp, professional headshot of a middle-aged man with a neat beard, representing a technical administrator. The image is high-contrast with a clean, light blue background. Lighting is energetic and optimistic, fitting the Edukora portal's institutional yet approachable vibe." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-surface-container-low rounded-full"></div>
</div>
<div>
<h3 className="font-headline font-semibold text-primary">Ibrahim Bakayoko</h3>
<div className="flex items-center gap-2">
<span className="text-label-xs text-primary font-medium">Admin</span>
<span className="w-1 h-1 rounded-full bg-primary/30"></span>
<span className="text-label-xs text-tertiary-container font-bold uppercase">System</span>
</div>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
</div>

<button className="fixed bottom-24 right-6 w-14 h-14 bg-secondary-container text-on-secondary shadow-lg rounded-xl flex items-center justify-center transition-transform active:scale-90 z-40">
<span className="material-symbols-outlined text-3xl" data-icon="person_add">person_add</span>
</button>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface dark:bg-surface-dim border-t border-outline-variant shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high rounded-full transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="text-label-xs font-label mt-1">Overview</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" data-icon="group" style={{"fontVariationSettings":"'FILL' 1"}}>group</span>
<span className="text-label-xs font-label font-bold mt-0.5">Users</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high rounded-full transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="book">book</span>
<span className="text-label-xs font-label mt-1">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container-high rounded-full transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="text-label-xs font-label mt-1">Analytics</span>
</a>
</nav>

<script>
        // Simple search feedback
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) =&gt; &#123;
            console.log('Filtering users for:', e.target.value);
        &#125;);

        // Tab selection logic
        const tabs = document.querySelectorAll('button.rounded-full');
        tabs.forEach(tab =&gt; &#123;
            tab.addEventListener('click', () =&gt; &#123;
                if (tab.innerText === 'All' || tab.innerText === 'Students' || tab.innerText === 'Professors' || tab.innerText === 'Admins') &#123;
                    tabs.forEach(t =&gt; &#123;
                        t.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm', 'font-semibold');
                        t.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                    &#125;);
                    tab.classList.add('bg-primary', 'text-on-primary', 'shadow-sm', 'font-semibold');
                    tab.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
