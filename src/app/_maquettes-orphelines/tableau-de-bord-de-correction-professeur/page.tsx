import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Grading - Correction des Épreuves" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col gap-2 py-6 h-screen w-72 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant z-40">
<div className="px-6 mb-8">
<h1 className="font-headline text-display-lg-mobile font-bold text-primary">Edukora</h1>
</div>
<nav className="flex flex-col gap-1">
<a className="text-on-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="bg-primary-container text-on-primary-container rounded-full mx-2 px-4 py-3 flex items-center gap-3 font-bold" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>edit_note</span>
<span className="font-body text-body-md">Correction Hub</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body text-body-md">Results Analysis</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-body text-body-md">Class Management</span>
</a>
</nav>
<div className="mt-auto px-6 py-4 flex items-center gap-3 border-t border-outline-variant">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-350.png" alt="A professional portrait of an academic professor in a modern educational environment. The lighting is soft and natural, emphasizing a trustworthy and expert character. The background is a blurred academic library with blue and white tones, matching the Edukora brand's corporate and stable identity." />
</div>
<div>
<p className="text-on-surface font-semibold text-label-sm">Dr. Koffi</p>
<p className="text-on-surface-variant text-label-xs">Academic Faculty</p>
</div>
</div>
</aside>

<main className="md:ml-72 min-h-screen pb-24 md:pb-8">

<header className="w-full top-0 sticky z-30 bg-surface border-b border-outline-variant flex justify-between items-center px-6 py-4">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<h2 className="font-headline text-headline-md font-semibold text-primary">Correction des Épreuves</h2>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
<span className="material-symbols-outlined">search</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<div className="hidden md:block w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-351.png" alt="A small circular avatar representing a professor profile. The image shows a professional individual with a friendly yet authoritative expression, set against a clean, light-colored backdrop that reflects the academic authority of the Edukora brand." />
</div>
</div>
</header>
<div className="px-6 py-8 max-w-6xl mx-auto">

<section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
<div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
<div className="z-10">
<div className="flex items-center gap-2 mb-2">
<span className="px-2 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase rounded-sm tracking-widest">Bac Blanc 2024</span>
<span className="text-on-surface-variant text-label-xs">• Mathématiques</span>
</div>
<h3 className="font-headline text-3xl font-bold text-on-surface mb-4">Bac Blanc Mathématiques</h3>
<div className="space-y-4 max-w-md">
<div className="flex justify-between items-end">
<span className="text-label-sm font-medium text-on-surface-variant">Progression de correction</span>
<span className="text-headline-md font-bold text-primary">35%</span>
</div>
<div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[35%] rounded-full shadow-[0_0_8px_rgba(253,129,0,0.4)]"></div>
</div>
<p className="text-on-surface-variant text-label-sm">42/120 copies corrigées</p>
</div>
</div>
<div className="z-10 mt-8 flex gap-4">
<button className="px-6 py-2.5 bg-secondary text-on-secondary rounded-lg font-semibold text-label-sm active:scale-95 transition-transform">
                            Continuer la correction
                        </button>
<button className="px-6 py-2.5 border border-primary text-primary rounded-lg font-semibold text-label-sm hover:bg-primary-fixed transition-colors">
                            Voir statistiques
                        </button>
</div>

<div className="absolute -right-8 -bottom-8 opacity-5">
<span className="material-symbols-outlined text-[200px]" style={{"fontVariationSettings":"'wght' 200"}}>functions</span>
</div>
</div>
<div className="bg-primary text-on-primary p-6 rounded-xl flex flex-col justify-center items-center text-center shadow-lg">
<span className="material-symbols-outlined text-4xl mb-4" style={{"fontVariationSettings":"'FILL' 1"}}>timer</span>
<h4 className="text-label-sm font-medium opacity-80 uppercase tracking-widest mb-1">Délai estimé</h4>
<p className="text-2xl font-bold mb-2">4 Heures Restantes</p>
<p className="text-xs opacity-70">Basé sur votre vitesse moyenne de 8 min / copie</p>
<div className="mt-6 w-full pt-6 border-t border-white/10">
<div className="flex justify-around">
<div>
<p className="text-xl font-bold">14.2</p>
<p className="text-[10px] opacity-70 uppercase">Moy. Actuelle</p>
</div>
<div>
<p className="text-xl font-bold">18/20</p>
<p className="text-[10px] opacity-70 uppercase">Note maximale</p>
</div>
</div>
</div>
</div>
</section>

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
<div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
<button className="px-5 py-2 bg-primary-container text-on-primary-container rounded-full text-label-sm font-semibold whitespace-nowrap">
                        À corriger (78)
                    </button>
<button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-variant rounded-full text-label-sm font-medium whitespace-nowrap transition-colors">
                        Complétés (42)
                    </button>
<button className="px-5 py-2 bg-surface-container-high text-on-surface-variant hover:bg-surface-variant rounded-full text-label-sm font-medium whitespace-nowrap transition-colors">
                        Validés (30)
                    </button>
</div>
<div className="flex items-center gap-3 w-full md:w-auto">
<div className="relative flex-grow md:flex-grow-0 md:w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
<input className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-0 text-sm" placeholder="Chercher un étudiant..." type="text" />
</div>
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined">filter_list</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-352.png" alt="A portrait of an Ivorian high school student, male, looking determined and academic. The setting is a clean, modern study environment with soft, professional lighting. The color palette follows the Edukora brand with hints of academic blue and bright orange." />
</div>
<div>
<h5 className="text-label-sm font-bold text-on-surface">Jean-Marc Kouadio</h5>
<p className="text-[10px] text-on-surface-variant uppercase">Matricule: AB2340</p>
</div>
</div>
<div className="flex justify-between items-center mb-6">
<div className="px-2 py-1 bg-surface-container rounded-sm text-[10px] font-medium text-on-surface-variant">
                            Statut: En attente
                        </div>
<div className="text-on-surface-variant">
<span className="material-symbols-outlined text-lg">description</span>
</div>
</div>
<button className="w-full py-2 bg-secondary text-on-secondary rounded-lg text-label-sm font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">edit</span>
                        Corriger
                    </button>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-353.png" alt="A portrait of an Ivorian high school student, female, with a bright and intelligent expression. She is in a high-quality academic setting with natural lighting. The image style is modern and clean, aligning with the Edukora brand's academic reliability and optimistic youth energy." />
</div>
<div>
<h5 className="text-label-sm font-bold text-on-surface">Awa Traoré</h5>
<p className="text-[10px] text-on-surface-variant uppercase">Matricule: AB2345</p>
</div>
</div>
<div className="flex justify-between items-center mb-6">
<div className="px-2 py-1 bg-tertiary-container text-on-tertiary-container rounded-sm text-[10px] font-bold">
                            Score: 16.5/20
                        </div>
<div className="text-tertiary">
<span className="material-symbols-outlined text-lg" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
</div>
<button className="w-full py-2 border border-outline-variant text-on-surface-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container transition-colors">
                        Modifier
                    </button>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-354.png" alt="A portrait of a male high school student with a serious academic focus. The background is a minimalist classroom with deep slate and white tones. The lighting is crisp, highlighting the student's face as he represents the next generation of BEPC/BAC candidates in Côte d'Ivoire." />
</div>
<div>
<h5 className="text-label-sm font-bold text-on-surface">Moussa Bakayoko</h5>
<p className="text-[10px] text-on-surface-variant uppercase">Matricule: AB2349</p>
</div>
</div>
<div className="flex justify-between items-center mb-6">
<div className="px-2 py-1 bg-surface-container rounded-sm text-[10px] font-medium text-on-surface-variant">
                            Statut: En attente
                        </div>
<div className="text-on-surface-variant">
<span className="material-symbols-outlined text-lg">description</span>
</div>
</div>
<button className="w-full py-2 bg-secondary text-on-secondary rounded-lg text-label-sm font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">edit</span>
                        Corriger
                    </button>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-355.png" alt="A portrait of a young Ivorian woman, a student preparing for exams. She has an expression of confidence and poise. The setting is bright and professional, utilizing a low-bandwidth elegance style with high-quality whitespace, consistent with the Edukora corporate design." />
</div>
<div>
<h5 className="text-label-sm font-bold text-on-surface">Kadiatou Sangaré</h5>
<p className="text-[10px] text-on-surface-variant uppercase">Matricule: AB2351</p>
</div>
</div>
<div className="flex justify-between items-center mb-6">
<div className="px-2 py-1 bg-tertiary-container text-on-tertiary-container rounded-sm text-[10px] font-bold">
                            Score: 12.0/20
                        </div>
<div className="text-tertiary">
<span className="material-symbols-outlined text-lg" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
</div>
<button className="w-full py-2 border border-outline-variant text-on-surface-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container transition-colors">
                        Modifier
                    </button>
</div>

<div className="bg-surface border-2 border-dashed border-outline-variant rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-60">
<span className="material-symbols-outlined text-3xl mb-2 text-outline">group_add</span>
<p className="text-label-xs font-medium text-outline">Inviter d'autres correcteurs</p>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-2 pt-2 md:hidden bg-surface border-t border-outline-variant shadow-lg">
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>grading</span>
<span className="font-label text-label-xs font-medium">Note</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined">assessment</span>
<span className="font-label text-label-xs font-medium">Rapports</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs font-medium">Paramètres</span>
</a>
</nav>

<button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center active:scale-90 transition-transform z-40 group">
<span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
<span className="absolute right-16 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Nouvelle Épreuve</span>
</button>
<script>
        // Simple interactivity for demonstration
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.classList.add('scale-95');
                setTimeout(() =&gt; this.classList.remove('scale-95'), 150);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
