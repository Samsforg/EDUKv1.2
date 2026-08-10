import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Aperçu du Quiz" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-primary dark:bg-primary-container z-40 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full shadow-sm">
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-primary-container/20 transition-colors text-on-primary">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 className="font-headline text-display-lg-mobile font-bold text-on-primary dark:text-inverse-primary">Edukora Pro</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-4">
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors font-medium" href="#">Tableau de bord</a>
<a className="text-on-primary font-bold border-b-2 border-secondary" href="#">Mes Quiz</a>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-019.png" alt="A formal professional headshot of an African professor in his fifties, wearing a sharp navy blue suit and glasses, smiling confidently against a soft-focus academic background of a library. The lighting is warm and authoritative, reflecting the trust and academic excellence of the Edukora brand." />
</div>
</div>
</header>
<div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">

<aside className="hidden md:flex flex-col gap-stack-sm p-4 h-auto w-72 bg-surface-container-low dark:bg-inverse-surface border-r border-outline-variant dark:border-outline">
<div className="flex items-center gap-3 p-3 mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary-container" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<div>
<p className="font-headline text-headline-md font-bold text-primary">Prof. Kouassi</p>
<p className="text-on-surface-variant text-sm">Faculté des Sciences</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="quiz" style={{"fontVariationSettings":"'FILL' 1"}}>quiz</span>
<span className="font-body text-body-md">Mes Quiz</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="database">database</span>
<span className="font-body text-body-md">Banque de questions</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface pb-24 md:pb-8">
<div className="max-w-4xl mx-auto">

<nav className="flex items-center text-sm text-on-surface-variant mb-6 gap-2">
<span className="hover:text-primary cursor-pointer">Mes Quiz</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="hover:text-primary cursor-pointer">Création</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="font-semibold text-primary">Aperçu &amp; Confirmation</span>
</nav>
<div className="flex flex-col gap-stack-lg">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Examen Blanc : Physique-Chimie (BAC 2024)</h2>
<p className="text-on-surface-variant max-w-xl">Veuillez vérifier les détails de votre évaluation avant de la rendre accessible à vos étudiants.</p>
</div>
<div className="flex gap-3">
<button className="px-6 py-2.5 rounded-xl border border-outline text-primary font-semibold hover:bg-surface-container-high transition-all">
                                Modifier
                            </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-3 text-primary mb-2">
<span className="material-symbols-outlined">help_center</span>
<span className="font-bold text-lg">Questions</span>
</div>
<p className="text-3xl font-extrabold text-on-surface">25</p>
<p className="text-on-surface-variant text-sm">15 QCM, 10 Réponses libres</p>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-3 text-secondary mb-2">
<span className="material-symbols-outlined">timer</span>
<span className="font-bold text-lg">Durée</span>
</div>
<p className="text-3xl font-extrabold text-on-surface">90 <span className="text-lg font-normal">min</span></p>
<p className="text-on-surface-variant text-sm">Temps imparti par défaut</p>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-3 text-tertiary-container mb-2">
<span className="material-symbols-outlined">groups</span>
<span className="font-bold text-lg">Destinataires</span>
</div>
<p className="text-3xl font-extrabold text-on-surface">2 <span className="text-lg font-normal">Classes</span></p>
<p className="text-on-surface-variant text-sm">Terminale C1, Terminale C2</p>
</div>
</div>

<div className="space-y-4">
<h3 className="font-headline text-xl font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary">visibility</span>
                            Aperçu des questions
                        </h3>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant hover:border-primary/30 transition-all group">
<div className="flex justify-between items-start mb-3">
<span className="bg-primary-fixed text-on-primary-fixed text-xs font-bold px-2 py-1 rounded">Question 01 • QCM</span>
<span className="text-on-surface-variant text-xs">4 Points</span>
</div>
<p className="font-medium text-on-surface mb-4">Quelle est la formule chimique de l'acide sulfurique ?</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
<div className="p-3 bg-surface-container rounded-lg border border-transparent text-sm">A) H2CO3</div>
<div className="p-3 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg border border-tertiary-container/30 text-sm flex justify-between items-center">
<span>B) H2SO4</span>
<span className="material-symbols-outlined text-sm">check_circle</span>
</div>
<div className="p-3 bg-surface-container rounded-lg border border-transparent text-sm">C) HCl</div>
<div className="p-3 bg-surface-container rounded-lg border border-transparent text-sm">D) NaOH</div>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant hover:border-primary/30 transition-all">
<div className="flex justify-between items-start mb-3">
<span className="bg-primary-fixed text-on-primary-fixed text-xs font-bold px-2 py-1 rounded">Question 02 • Libre</span>
<span className="text-on-surface-variant text-xs">6 Points</span>
</div>
<p className="font-medium text-on-surface mb-4">Énoncez la deuxième loi de Newton (Principe fondamental de la dynamique).</p>
<div className="p-4 bg-surface-container-low rounded-lg italic text-sm text-on-surface-variant border-l-4 border-outline">
                                "La somme vectorielle des forces extérieures appliquées à un système est égale au produit de sa masse par le vecteur accélération..."
                            </div>
</div>
<button className="w-full py-4 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-medium hover:bg-surface-container-high transition-all">
                            + Voir les 23 autres questions
                        </button>
</div>

<div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-outline-variant">
<button className="flex-1 px-8 py-4 rounded-xl bg-surface-container-highest text-primary font-bold hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">calendar_today</span>
                            Programmer pour plus tard
                        </button>
<button className="flex-1 px-8 py-4 rounded-xl bg-secondary text-on-secondary font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/20">
<span className="material-symbols-outlined">publish</span>
                            Publier maintenant
                        </button>
</div>
</div>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest border-t border-outline-variant shadow-md flex justify-around items-center h-16 px-4">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label text-label-xs font-medium">Quiz</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label text-label-xs font-medium">Aide</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>

<div className="hidden fixed inset-0 z-[60] flex items-center justify-center p-4" id="successModal">
<div className="absolute inset-0 bg-on-background/60 backdrop-blur-sm"></div>
<div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-8 modal-enter overflow-hidden">

<div className="absolute -top-12 -right-12 w-32 h-32 bg-tertiary-fixed rounded-full opacity-30"></div>
<div className="flex flex-col items-center text-center">
<div className="w-20 h-20 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-full flex items-center justify-center mb-6 scale-110">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Quiz Publié avec Succès !</h3>
<p className="text-on-surface-variant mb-8">Votre examen est maintenant accessible aux classes de Terminale C1 et C2. Les étudiants recevront une notification instantanée.</p>
<div className="w-full space-y-3">
<button className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-all">
                        Retour au Tableau de bord
                    </button>
<button className="w-full py-3 text-primary font-semibold hover:bg-surface-container transition-all">
                        Partager le lien du quiz
                    </button>
</div>
</div>
</div>
</div>

<div className="hidden fixed inset-0 z-[60] flex items-center justify-center p-4" id="scheduleModal">
<div className="absolute inset-0 bg-on-background/60 backdrop-blur-sm"></div>
<div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-8 modal-enter">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline text-xl font-bold text-on-surface">Programmer la publication</h3>
<button className="material-symbols-outlined text-on-surface-variant">close</button>
</div>
<div className="space-y-4 mb-8">
<div>
<label className="block text-sm font-semibold text-on-surface-variant mb-2">Date de publication</label>
<div className="relative">
<input className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" type="date" />
</div>
</div>
<div>
<label className="block text-sm font-semibold text-on-surface-variant mb-2">Heure de début</label>
<div className="relative">
<input className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" type="time" />
</div>
</div>
</div>
<div className="flex gap-3">
<button className="flex-1 py-3 bg-surface-container-high text-on-surface font-semibold rounded-xl transition-all">Annuler</button>
<button className="flex-1 py-3 bg-secondary text-on-secondary font-bold rounded-xl hover:opacity-90 transition-all">Confirmer</button>
</div>
</div>
</div>
<script>
        function showModal(id) &#123;
            const modal = document.getElementById(id);
            modal.classList.remove('hidden');
            const content = modal.querySelector('.modal-enter');
            setTimeout(() =&gt; &#123;
                content.classList.add('modal-enter-active');
            &#125;, 10);
        &#125;

        function hideModal(id) &#123;
            const modal = document.getElementById(id);
            const content = modal.querySelector('.modal-enter');
            content.classList.remove('modal-enter-active');
            setTimeout(() =&gt; &#123;
                modal.classList.add('hidden');
            &#125;, 300);
        &#125;

        // Close on escape key
        document.addEventListener('keydown', (e) =&gt; &#123;
            if (e.key === 'Escape') &#123;
                hideModal('successModal');
                hideModal('scheduleModal');
            &#125;
        &#125;);
    </script>

    </div>
  );
}
