import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Création de Quiz" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-primary dark:bg-primary-container z-50 shadow-sm">
<div className="flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-7xl mx-auto">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary dark:text-on-primary-container cursor-pointer">menu</span>
<h1 className="font-headline text-2xl font-bold text-on-primary dark:text-inverse-primary">Edukora Pro</h1>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-6">
<a className="text-on-primary font-bold border-b-2 border-secondary transition-all" href="#">Tableau de bord</a>
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors" href="#">Mes Quiz</a>
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors" href="#">Aide</a>
</nav>
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center overflow-hidden border-2 border-on-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-091.png" alt="A professional headshot of an African professor in a clean office setting, soft natural lighting, high resolution photography, looking confident and friendly. Corporate light mode aesthetic." />
</div>
</div>
</div>
</header>
<main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 max-w-5xl mx-auto w-full">

<div className="w-full mb-10 mt-4">
<div className="flex items-center justify-between relative max-w-md mx-auto">
<div className="flex flex-col items-center z-10">
<div className="w-10 h-10 rounded-full step-active flex items-center justify-center font-bold shadow-md">1</div>
<span className="text-xs font-semibold mt-2 text-primary uppercase tracking-wider">Infos</span>
</div>
<div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-container -z-0"></div>
<div className="flex flex-col items-center z-10">
<div className="w-10 h-10 rounded-full step-inactive flex items-center justify-center font-bold">2</div>
<span className="text-xs font-medium mt-2 text-on-surface-variant uppercase tracking-wider">Questions</span>
</div>
<div className="flex flex-col items-center z-10">
<div className="w-10 h-10 rounded-full step-inactive flex items-center justify-center font-bold">3</div>
<span className="text-xs font-medium mt-2 text-on-surface-variant uppercase tracking-wider">Publier</span>
</div>
</div>
</div>

<div className="w-full flex flex-col md:flex-row gap-8 mb-8 items-center bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
<div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-092.png" alt="A minimalist conceptual 3D illustration of an academic shield and a glowing pencil, representing education and progress. The background is a clean soft blue gradient consistent with academic authority and professionalism. High key studio lighting." />
</div>
<div className="flex-1">
<h2 className="font-headline text-3xl font-bold text-primary mb-2">Nouveau Quiz</h2>
<p className="text-on-surface-variant text-lg">Préparez vos élèves pour l'excellence. Renseignez les informations générales pour commencer la configuration de votre évaluation.</p>
</div>
</div>

<section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">

<div className="md:col-span-8 bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm">
<form className="space-y-8">

<div className="group">
<label className="block text-label-sm font-semibold text-primary mb-2" htmlFor="quiz_title">Titre du Quiz</label>
<div className="relative">
<input className="w-full px-4 py-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none placeholder:text-outline" id="quiz_title" name="quiz_title" placeholder="Ex: Devoir de Mathématiques - Probabilités" type="text" />
</div>
<p className="mt-2 text-xs text-on-surface-variant">Ce titre sera visible par tous vos étudiants sur leur tableau de bord.</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

<div>
<label className="block text-label-sm font-semibold text-primary mb-2" htmlFor="subject">Matière</label>
<div className="relative">
<select className="w-full appearance-none px-4 py-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none pr-10" id="subject" name="subject">
<option disabled={true} selected={true} value="">Sélectionner...</option>
<option value="maths">Mathématiques</option>
<option value="physics">Physique-Chimie</option>
<option value="svt">SVT</option>
<option value="french">Français</option>
<option value="history">Histoire-Géo</option>
<option value="english">Anglais</option>
</select>
<div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
<span className="material-symbols-outlined text-outline">expand_more</span>
</div>
</div>
</div>

<div>
<label className="block text-label-sm font-semibold text-primary mb-2" htmlFor="time_limit">Durée Limite (Minutes)</label>
<div className="relative">
<input className="w-full px-4 py-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none" id="time_limit" max={240} min={5} name="time_limit" placeholder="Ex: 45" type="number" />
<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
<span className="material-symbols-outlined text-outline">timer</span>
</div>
</div>
</div>
</div>

<div>
<label className="block text-label-sm font-semibold text-primary mb-2" htmlFor="description">Description (Optionnel)</label>
<textarea className="w-full px-4 py-4 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md outline-none" id="description" name="description" placeholder="Instructions particulières pour les élèves..." rows={4}></textarea>
</div>

<div className="pt-4 flex justify-end">
<button className="w-full md:w-auto bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-secondary-container hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md" type="submit">
                            Continuer vers les questions
                            <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</form>
</div>

<div className="md:col-span-4 space-y-6">

<div className="bg-primary-container/10 p-6 rounded-xl border border-primary-container/20">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-primary-container" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
<h3 className="font-headline font-bold text-primary">Conseils d'Expert</h3>
</div>
<ul className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
<li className="flex gap-2">
<span className="text-tertiary font-bold">•</span>
<span>Choisissez un titre explicite qui mentionne le chapitre abordé.</span>
</li>
<li className="flex gap-2">
<span className="text-tertiary font-bold">•</span>
<span>Pour un examen blanc, réglez une durée similaire à l'épreuve officielle du BEPC ou BAC.</span>
</li>
</ul>
</div>

<div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant border-dashed">
<h3 className="font-headline font-bold text-on-surface-variant mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-lg">visibility</span> Aperçu de la carte
                    </h3>
<div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant">
<div className="flex justify-between items-start mb-3">
<div className="p-2 bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary">school</span>
</div>
<span className="text-[10px] font-bold uppercase tracking-widest bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded">Nouveau</span>
</div>
<h4 className="font-bold text-on-surface mb-1" id="preview_title">Sans titre</h4>
<p className="text-xs text-on-surface-variant mb-4" id="preview_subject">Matière non définie</p>
<div className="flex items-center gap-4 text-xs font-medium text-outline">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> <span id="preview_time">--</span> min</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">quiz</span> 0 Questions</span>
</div>
</div>
</div>
</div>
</section>
</main>

<nav className="md:hidden flex justify-around items-center h-16 w-full fixed bottom-0 bg-surface-container-lowest border-t border-outline-variant shadow-lg z-50 rounded-t-xl px-4">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-[10px] font-medium">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 cursor-pointer">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label text-[10px] font-medium">Quiz</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined">help</span>
<span className="font-label text-[10px] font-medium">Aide</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-[10px] font-medium">Profil</span>
</div>
</nav>
<script>
        // Simple micro-interaction for the preview
        const titleInput = document.getElementById('quiz_title');
        const subjectSelect = document.getElementById('subject');
        const timeInput = document.getElementById('time_limit');

        const previewTitle = document.getElementById('preview_title');
        const previewSubject = document.getElementById('preview_subject');
        const previewTime = document.getElementById('preview_time');

        titleInput.addEventListener('input', (e) =&gt; &#123;
            previewTitle.innerText = e.target.value || 'Sans titre';
        &#125;);

        subjectSelect.addEventListener('change', (e) =&gt; &#123;
            previewSubject.innerText = e.target.options[e.target.selectedIndex].text;
        &#125;);

        timeInput.addEventListener('input', (e) =&gt; &#123;
            previewTime.innerText = e.target.value || '--';
        &#125;);

        // Form submission handling (Mock)
        document.querySelector('form').addEventListener('submit', (e) =&gt; &#123;
            e.preventDefault();
            alert('Enregistrement en cours... Passage à l\'étape de création des questions.');
        &#125;);
    </script>

    </div>
  );
}
