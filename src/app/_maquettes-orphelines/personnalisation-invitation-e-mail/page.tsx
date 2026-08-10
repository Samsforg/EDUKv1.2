import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Expert - Invitation E-mail" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-surface border-b border-surface-border dark:border-on-surface-variant flex items-center justify-between px-gutter w-full h-16 sticky top-0 z-50">
<div className="flex items-center gap-4">
<button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors duration-200">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Invitation E-mail</h1>
</div>
<div className="hidden md:flex items-center gap-8">
<nav className="flex gap-6">
<a className="text-on-surface-variant dark:text-outline-variant font-label-md hover:text-primary transition-colors" href="#">Tableau de bord</a>
<a className="text-primary dark:text-primary-fixed-dim font-bold font-label-md" href="#">Network</a>
<a className="text-on-surface-variant dark:text-outline-variant font-label-md hover:text-primary transition-colors" href="#">Resources</a>
</nav>
</div>
</header>

<main className="flex-grow w-full max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-4 space-y-gutter">
<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<h2 className="font-title-md text-title-md text-primary mb-4">Informations du destinataire</h2>
<div className="space-y-4">
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant">NOM COMPLET</label>
<input className="w-full border border-surface-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Dr. Sarah Martin" type="text" />
</div>
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant">ADRESSE E-MAIL</label>
<input className="w-full border border-surface-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="sarah.martin@university.edu" type="email" />
</div>
</div>
</section><section className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<h2 className="font-title-md text-title-md text-primary mb-4">Personnalisation du contenu</h2>
<div className="space-y-4">
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant">SUJET DE L'E-MAIL</label>
<input className="w-full border border-surface-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" value="Invitation à rejoindre le réseau d'experts Edukora" />
</div>
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface-variant">MESSAGE</label>
<textarea className="w-full border border-surface-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]" rows={4}>C'est avec grand plaisir que je vous invite à rejoindre Edukora, la plateforme de certification académique de référence qui réunit les esprits les plus brillants de notre discipline.</textarea>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface-variant">TON</label>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium transition-all">Institutionnel</button>
<button className="px-4 py-1.5 rounded-full border border-surface-border text-on-surface-variant text-sm font-medium hover:bg-surface-container-low transition-all">Convivial</button>
<button className="px-4 py-1.5 rounded-full border border-surface-border text-on-surface-variant text-sm font-medium hover:bg-surface-container-low transition-all">Scientifique</button>
</div>
</div>
</div>
</section>
<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<h2 className="font-title-md text-title-md text-primary mb-4">Statistiques d'invitation</h2>
<div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">group_add</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase">Places restantes</p>
<p className="font-metric-num text-metric-num text-primary">12</p>
</div>
</div>
</section>
</div>

<div className="lg:col-span-8">
<div className="email-preview-container border border-surface-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[600px]">

<div className="bg-surface-container-high px-6 py-3 flex items-center justify-between border-b border-surface-border">
<div className="flex items-center gap-2">
<div className="flex gap-1.5 mr-4">
<div className="w-3 h-3 rounded-full bg-red-400"></div>
<div className="w-3 h-3 rounded-full bg-amber-400"></div>
<div className="w-3 h-3 rounded-full bg-green-400"></div>
</div>
<span className="text-on-surface-variant text-sm font-medium">Aperçu de l'invitation</span>
</div>
<div className="flex gap-2">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">desktop_windows</span>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">smartphone</span>
</div>
</div>

<div className="flex-grow p-8 md:p-12 bg-white overflow-y-auto">
<div className="max-w-2xl mx-auto bg-white border border-surface-border p-8 md:p-12 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.03)]">

<div className="flex justify-center mb-10">
<div className="flex items-center gap-2">
<div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-white" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
</div>
</div>

<div className="mb-8 pb-4 border-b border-surface-border">
<p className="text-on-surface-variant font-label-md mb-1 uppercase tracking-wider">Objet:</p>
<h3 className="font-title-md text-title-md text-on-surface">Invitation à rejoindre le réseau d'experts Edukora</h3>
</div>

<div className="space-y-6 text-on-surface-variant leading-relaxed font-body-lg">
<p>Cher/Chère <span className="text-primary font-bold">[Nom du Collègue]</span>,</p>
<p>C'est avec grand plaisir que je vous invite à rejoindre <strong className="text-on-surface">Edukora</strong>, la plateforme de certification académique de référence qui réunit les esprits les plus brillants de notre discipline.</p>
<p>En tant que membre de ce réseau exclusif, vous aurez l'opportunité de valider des cursus innovants, de collaborer avec des experts internationaux et d'accroître l'impact de vos recherches pédagogiques.</p>

<div className="py-8 flex justify-center">
<a className="inline-flex items-center px-8 py-4 bg-primary-container text-white font-bold rounded-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" href="#">
                                        Join the Network
                                        <span className="material-symbols-outlined ml-2">chevron_right</span>
</a>
</div>
<p>Votre expertise serait un atout majeur pour notre communauté. Au plaisir de vous y retrouver.</p>
<div className="pt-8 mt-8 border-t border-surface-border italic text-sm">
                                    Cordialement,<br />
<span className="font-bold text-on-surface">L'équipe Edukora &amp; Votre Collègue</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<div className="sticky bottom-0 bg-white border-t border-surface-border p-4 z-40">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-impact-emerald" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="text-sm font-medium">Modèle validé par le comité académique</span>
</div>
<div className="flex items-center gap-3 w-full md:w-auto">
<button className="flex-1 md:flex-none px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-all">
                    Enregistrer le brouillon
                </button>
<button className="flex-1 md:flex-none px-10 py-3 bg-primary text-white font-bold rounded-lg hover:bg-on-primary-fixed-variant transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">send</span>
                    Envoyer par email
                </button>
</div>
</div>
</div>

<nav className="md:hidden fixed bottom-0 w-full flex justify-around items-center py-2 px-container-padding-mobile bg-surface dark:bg-on-surface border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-[10px]">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>hub</span>
<span className="font-label-md text-[10px]">Network</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all" href="#">
<span className="material-symbols-outlined">mail</span>
<span className="font-label-md text-[10px]">Inviter</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-[10px]">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for input synchronization
        const nameInput = document.querySelector('input[placeholder="Dr. Sarah Martin"]');
        const placeholderName = document.querySelector('.text-primary.font-bold');

        nameInput.addEventListener('input', (e) =&gt; &#123;
            const value = e.target.value.trim();
            placeholderName.textContent = value || '[Nom du Collègue]';
        &#125;);

        // Toggle device views
        const deviceButtons = document.querySelectorAll('.material-symbols-outlined.cursor-pointer');
        deviceButtons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                deviceButtons.forEach(b =&gt; b.classList.remove('text-primary'));
                btn.classList.add('text-primary');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
