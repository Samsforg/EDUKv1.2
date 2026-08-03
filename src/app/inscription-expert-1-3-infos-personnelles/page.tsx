import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Teacher Onboarding" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex items-center px-4 md:px-8 h-16 w-full top-0 bg-surface border-b border-outline-variant z-50">
<div className="flex items-center gap-4">
<button aria-label="Go back" className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-primary">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-2xl text-primary tracking-tight">Vérification d'identité</h1>
</div>
</header>
<main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
<div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-5 flex flex-col gap-6">
<div className="space-y-4">
<span className="text-secondary font-bold text-sm tracking-widest uppercase">Étape 01/03</span>
<h2 className="text-4xl font-extrabold text-on-background leading-tight">Rejoignez l'élite éducative de Côte d'Ivoire.</h2>
<p className="text-on-surface-variant text-lg">Partagez votre expertise avec les futurs bacheliers et participez à l'excellence académique nationale.</p>
</div>
<div className="grid grid-cols-1 gap-4">

<div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-start gap-4 shadow-sm">
<div className="p-2 bg-tertiary-container rounded-lg text-on-tertiary-container">
<span className="material-symbols-outlined">verified</span>
</div>
<div>
<h3 className="font-bold text-on-surface">Certification d'État</h3>
<p className="text-sm text-on-surface-variant">Processus conforme aux normes du Ministère de l'Éducation Nationale.</p>
</div>
</div>

<div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-start gap-4 shadow-sm">
<div className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg">
<span className="material-symbols-outlined">security</span>
</div>
<div>
<h3 className="font-bold text-on-surface">Données Sécurisées</h3>
<p className="text-sm text-on-surface-variant">Chiffrement AES-256 pour la protection de vos documents officiels.</p>
</div>
</div>
</div>
<div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-video">
<div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10"></div>
<img className="w-full h-full object-cover" src="/images/ecran-190.png" alt="A professional portrait of an Ivorian professor in a bright, modern academic setting. He is wearing a formal suit and smiling confidently, holding a digital tablet. The background is a clean university library with soft natural lighting, reflecting a high-end corporate light-mode aesthetic using shades of academic blue and national orange accents." />
</div>
</div>

<div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-10 shadow-xl shadow-primary/5">
<form className="space-y-8">

<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-1/3 transition-all duration-500"></div>
</div>
<div className="space-y-6">
<h3 className="text-xl font-bold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">person</span>
                            Informations Personnelles
                        </h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-2">
<label className="block text-sm font-semibold text-on-surface-variant" htmlFor="full_name">Nom Complet (tel que sur CNI)</label>
<input className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" id="full_name" placeholder="Ex: Koffi Kouassi" type="text" />
</div>
<div className="space-y-2">
<label className="block text-sm font-semibold text-on-surface-variant" htmlFor="email">Email Professionnel</label>
<input className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" id="email" placeholder="koffi.k@institution.ci" type="email" />
</div>
</div>

<div className="space-y-2">
<label className="block text-sm font-semibold text-on-surface-variant" htmlFor="phone">Numéro de Téléphone</label>
<div className="flex">
<span className="inline-flex items-center px-3 px-4 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant font-medium">
                                    +225
                                </span>
<input className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" id="phone" placeholder="07 00 00 00 00" type="tel" />
</div>
</div>

<div className="space-y-3">
<label className="block text-sm font-semibold text-on-surface-variant">Titre Académique</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">

<label className="title-card cursor-pointer group">
<input checked={true} className="hidden" name="title" type="radio" />
<div className="p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center text-center gap-2 group-hover:border-primary transition-all bg-surface">
<span className="material-symbols-outlined text-3xl">school</span>
<span className="text-sm font-bold">Professor</span>
</div>
</label>

<label className="title-card cursor-pointer group">
<input className="hidden" name="title" type="radio" />
<div className="p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center text-center gap-2 group-hover:border-primary transition-all bg-surface">
<span className="material-symbols-outlined text-3xl">science</span>
<span className="text-sm font-bold">Researcher</span>
</div>
</label>

<label className="title-card cursor-pointer group">
<input className="hidden" name="title" type="radio" />
<div className="p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center text-center gap-2 group-hover:border-primary transition-all bg-surface">
<span className="material-symbols-outlined text-3xl">psychology</span>
<span className="text-sm font-bold">Subject Matter Expert</span>
</div>
</label>
</div>
</div>

<div className="space-y-2">
<label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">Créer un Mot de Passe</label>
<div className="relative">
<input className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" id="password" placeholder="••••••••" type="password" />
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline" type="button">
<span className="material-symbols-outlined">visibility</span>
</button>
</div>
<p className="text-xs text-outline flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-xs">info</span>
                                Minimum 8 caractères, incluant un chiffre et un symbole.
                            </p>
</div>
</div>

<div className="pt-6 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
<p className="text-sm text-on-surface-variant">
                            Déjà inscrit ? <a className="text-primary font-bold hover:underline" href="#">Se connecter</a>
</p>
<button className="btn-primary w-full md:w-auto px-8 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-secondary-container/20">
                            Continuer vers l'étape 2
                            <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</form>
</div>
</div>
</main>

<footer className="mt-12 py-8 bg-surface-container-low text-center px-4">
<p className="text-sm text-outline">© 2024 Edukora Côte d'Ivoire. Tous droits réservés.</p>
<div className="flex justify-center gap-6 mt-4 text-xs font-medium text-on-surface-variant">
<a className="hover:text-primary transition-colors" href="#">Politique de Confidentialité</a>
<a className="hover:text-primary transition-colors" href="#">Conditions d'Utilisation</a>
<a className="hover:text-primary transition-colors" href="#">Support Académique</a>
</div>
</footer>
<script>
        // Interactive title selection effect
        const titleRadios = document.querySelectorAll('input[name="title"]');
        titleRadios.forEach(radio =&gt; &#123;
            radio.addEventListener('change', () =&gt; &#123;
                // The CSS already handles the visual toggle via the :checked selector
            &#125;);
        &#125;);

        // Simple validation visualization
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input =&gt; &#123;
            input.addEventListener('blur', () =&gt; &#123;
                if (input.value.trim() !== '') &#123;
                    input.classList.add('border-tertiary');
                    input.classList.remove('border-outline-variant');
                &#125; else &#123;
                    input.classList.remove('border-tertiary');
                    input.classList.add('border-outline-variant');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
