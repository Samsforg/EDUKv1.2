import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Inscription Enseignant (Étape 2)" };

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 flex items-center px-4 md:px-8 h-16 w-full bg-surface border-b border-surface-border z-50">
<button className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="ml-4 font-headline-md text-headline-md text-primary font-bold">Vérification d'identité</h1>
</header>
<main className="w-full max-w-4xl px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8">

<div className="md:w-1/3 flex flex-col gap-6">
<div className="relative rounded-xl overflow-hidden aspect-square shadow-lg hidden md:block">
<img className="object-cover w-full h-full" src="/images/ecran-191.png" alt="A focused academic professor in a modern library setting in Abidjan, Côte d'Ivoire. The lighting is bright and professional, with hints of academic blue and national orange in the background decor. The professor is holding a tablet, looking optimistic and authoritative, representing academic excellence and trustworthy technology." />
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
<p className="text-white font-headline text-lg">"Rejoignez l'excellence académique ivoirienne."</p>
</div>
</div>

<div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
<div className="flex justify-between items-center mb-4">
<span className="text-label-sm text-outline uppercase font-bold tracking-wider">Étape 2 sur 3</span>
<span className="text-primary font-bold">66%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full progress-bar-glow transition-all duration-700" style={{"width":"66.6%"}}></div>
</div>
<div className="mt-4 flex flex-col gap-2">
<div className="flex items-center gap-2 text-tertiary">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="text-label-sm">Informations Personnelles</span>
</div>
<div className="flex items-center gap-2 text-primary font-bold">
<span className="material-symbols-outlined text-sm">radio_button_checked</span>
<span className="text-label-sm">Titres Académiques</span>
</div>
<div className="flex items-center gap-2 text-outline">
<span className="material-symbols-outlined text-sm">radio_button_unchecked</span>
<span className="text-label-sm">Validation Finale</span>
</div>
</div>
</div>
</div>

<div className="flex-1">
<div className="mb-8">
<h2 className="text-display-lg-mobile md:text-display-lg text-primary mb-2">Qualifications Académiques</h2>
<p className="text-body-md text-on-surface-variant">Veuillez renseigner vos diplômes et vos domaines d'expertise pour la préparation aux examens nationaux.</p>
</div>
<form className="space-y-6">

<div className="flex flex-col gap-2">
<label className="text-label-sm font-semibold text-on-surface" htmlFor="institution">Université ou Institution</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">school</span>
<input className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" id="institution" placeholder="Ex: École Normale Supérieure (ENS)" type="text" />
</div>
</div>

<div className="flex flex-col gap-2">
<label className="text-label-sm font-semibold text-on-surface" htmlFor="experience">Années d'expérience en enseignement</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">history_edu</span>
<select className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest appearance-none" id="experience">
<option value="">Sélectionner</option>
<option value="1-3">1 à 3 ans</option>
<option value="4-7">4 à 7 ans</option>
<option value="8-12">8 à 12 ans</option>
<option value="12+">Plus de 12 ans</option>
</select>
</div>
</div>

<div className="flex flex-col gap-3">
<label className="text-label-sm font-semibold text-on-surface">Matières de Spécialisation</label>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-2 rounded-full border border-outline-variant text-body-md hover:bg-surface-container-high transition-all flex items-center gap-2" type="button">
<span>Mathématiques</span>
<span className="material-symbols-outlined text-sm">add</span>
</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-body-md hover:bg-surface-container-high transition-all flex items-center gap-2" type="button">
<span>Physique-Chimie</span>
<span className="material-symbols-outlined text-sm">add</span>
</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-body-md hover:bg-surface-container-high transition-all flex items-center gap-2" type="button">
<span>Français</span>
<span className="material-symbols-outlined text-sm">add</span>
</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-body-md hover:bg-surface-container-high transition-all flex items-center gap-2" type="button">
<span>SVT</span>
<span className="material-symbols-outlined text-sm">add</span>
</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-body-md hover:bg-surface-container-high transition-all flex items-center gap-2" type="button">
<span>Histoire-Géo</span>
<span className="material-symbols-outlined text-sm">add</span>
</button>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="text-label-sm font-semibold text-on-surface">Copie du Diplôme ou Certification (PDF/JPG)</label>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-lowest hover:border-primary hover:bg-primary-fixed/20 transition-all cursor-pointer group">
<input className="hidden" id="diploma-upload" type="file" />
<label className="flex flex-col items-center cursor-pointer" htmlFor="diploma-upload">
<span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary mb-2">upload_file</span>
<span className="text-body-md font-medium text-on-surface">Cliquez pour téléverser</span>
<span className="text-label-xs text-outline mt-1">Maximum 5 MB. PDF, JPG ou PNG supportés.</span>
</label>
</div>
</div>

<div className="flex gap-3 p-4 bg-surface-container rounded-lg border border-outline-variant">
<span className="material-symbols-outlined text-primary shrink-0">verified_user</span>
<p className="text-label-xs text-on-surface-variant leading-relaxed">
<strong>Avis de vérification :</strong> En soumettant ces documents, vous autorisez Edukora à procéder à une vérification d'authenticité auprès des institutions concernées. Toute fausse déclaration entraînera la suspension immédiate du compte conformément aux lois ivoiriennes sur la certification académique.
                    </p>
</div>

<div className="flex items-center gap-4 pt-4">
<button className="flex-1 py-3 px-6 rounded-lg font-bold border border-primary text-primary hover:bg-primary-fixed transition-all" type="button">
                        Précédent
                    </button>
<button className="flex-[2] py-3 px-6 rounded-lg font-bold bg-secondary text-on-secondary hover:opacity-90 shadow-md transform active:scale-95 transition-all" type="submit">
                        Continuer vers l'étape finale
                    </button>
</div>
</form>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface border-t border-surface-border px-4 pb-safe z-50">
<div className="flex flex-col items-center justify-center text-outline">
<span className="material-symbols-outlined">doorbell</span>
<span className="text-label-md">Bienvenue</span>
</div>
<div className="flex flex-col items-center justify-center text-primary font-bold">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>id_card</span>
<span className="text-label-md">Documents</span>
</div>
<div className="flex flex-col items-center justify-center text-outline">
<span className="material-symbols-outlined">face</span>
<span className="text-label-md">Biometrics</span>
</div>
<div className="flex flex-col items-center justify-center text-outline">
<span className="material-symbols-outlined">verified</span>
<span className="text-label-md">Statut</span>
</div>
</nav>
<script>
        function toggleChip(button) &#123;
            const icon = button.querySelector('.material-symbols-outlined');
            if (button.classList.contains('active-chip')) &#123;
                button.classList.remove('active-chip', 'bg-primary', 'text-white');
                button.classList.add('border-outline-variant');
                icon.innerText = 'add';
            &#125; else &#123;
                button.classList.add('active-chip', 'bg-primary', 'text-white');
                button.classList.remove('border-outline-variant');
                icon.innerText = 'check';
            &#125;
        &#125;

        // Mock File Upload interaction
        const fileInput = document.getElementById('diploma-upload');
        fileInput.addEventListener('change', (e) =&gt; &#123;
            if (e.target.files.length &gt; 0) &#123;
                const fileName = e.target.files[0].name;
                const container = fileInput.closest('div');
                container.innerHTML = `
                    &lt;div class="flex items-center gap-3 w-full bg-tertiary-fixed/30 p-4 rounded-lg"&gt;
                        &lt;span class="material-symbols-outlined text-tertiary"&gt;check_circle&lt;/span&gt;
                        &lt;div class="flex-1"&gt;
                            &lt;p class="text-body-md font-bold text-on-surface truncate"&gt;$&#123;fileName&#125;&lt;/p&gt;
                            &lt;p class="text-label-xs text-outline"&gt;Fichier prêt pour analyse&lt;/p&gt;
                        &lt;/div&gt;
                        &lt;button onclick="location.reload()" class="text-error font-bold text-label-sm"&gt;Retirer&lt;/button&gt;
                    &lt;/div&gt;
                `;
            &#125;
        &#125;);
    </script>

    </div>
  );
}
