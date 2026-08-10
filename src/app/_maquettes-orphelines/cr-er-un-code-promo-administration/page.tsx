import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Créer un code promo" };

export default function Page() {
  return (
    <div className="text-on-surface min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky z-40 bg-surface border-b border-outline-variant flex items-center justify-between px-4 md:px-8 h-16">
<div className="flex items-center gap-4">
<button aria-label="Retour" className="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95 transition-transform">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary">Créer un code promo</h1>
</div>
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95 transition-transform">
<span className="material-symbols-outlined text-on-surface-variant">help</span>
</button>
</header>

<main className="max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-8">

<section className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-5 flex items-start gap-4">
<div className="bg-primary-container p-3 rounded-lg text-on-primary">
<span className="material-symbols-outlined">confirmation_number</span>
</div>
<div>
<h2 className="text-on-surface font-semibold text-lg">Nouveau Coupon</h2>
<p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                    Créez des remises attractives pour encourager les inscriptions aux cours BEPC et BAC.
                </p>
</div>
</section>

<form className="space-y-8" id="promoForm">

<div className="space-y-4">
<label className="block group">
<span className="text-label-sm font-semibold text-on-surface-variant mb-2 block group-focus-within:text-primary transition-colors">Code Promotionnel</span>
<input className="w-full bg-surface-container-lowest border-outline-variant rounded-lg p-4 text-on-surface font-headline font-bold tracking-wider placeholder:font-normal placeholder:tracking-normal focus:ring-2 focus:ring-primary focus:border-primary transition-all uppercase" placeholder="REUSSITE2024" type="text" />
</label>
<div>
<span className="text-label-sm font-semibold text-on-surface-variant mb-3 block">Type de remise</span>
<div className="grid grid-cols-2 gap-3">
<button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-primary bg-primary-container/5 text-primary font-semibold transition-all" id="type-percentage" type="button">
<span className="material-symbols-outlined text-[20px]">percent</span>
                            Pourcentage %
                        </button>
<button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-outline-variant text-on-surface-variant font-medium hover:bg-surface-container transition-all" id="type-fixed" type="button">
<span className="material-symbols-outlined text-[20px]">payments</span>
                            Montant Fixe FCFA
                        </button>
</div>
</div>
<label className="block group">
<span className="text-label-sm font-semibold text-on-surface-variant mb-2 block group-focus-within:text-primary transition-colors">Valeur de la remise</span>
<div className="relative">
<input className="w-full bg-surface-container-lowest border-outline-variant rounded-lg p-4 pr-16 focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="0.00" type="number" />
<span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant" id="discount-suffix">%</span>
</div>
</label>
</div>

<div className="space-y-4 pt-4 border-t border-outline-variant">
<h3 className="font-headline font-bold text-on-surface text-lg">Conditions &amp; Limites</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<label className="block group">
<span className="text-label-sm font-semibold text-on-surface-variant mb-2 block">Date d'expiration</span>
<div className="relative">
<input className="w-full bg-surface-container-lowest border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" type="date" />
</div>
</label>
<label className="block group">
<span className="text-label-sm font-semibold text-on-surface-variant mb-2 block">Limite d'utilisations totales</span>
<input className="w-full bg-surface-container-lowest border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="Ex: 500" type="number" />
</label>
</div>
<label className="block group">
<span className="text-label-sm font-semibold text-on-surface-variant mb-2 block">Utilisations par utilisateur</span>
<select className="w-full bg-surface-container-lowest border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none">
<option value="1">1 utilisation unique</option>
<option value="2">2 utilisations maximum</option>
<option value="5">5 utilisations maximum</option>
<option value="unlimited">Illimité</option>
</select>
</label>
</div>

<div className="space-y-4 pt-4 border-t border-outline-variant">
<div className="flex justify-between items-end mb-2">
<h3 className="font-headline font-bold text-on-surface text-lg">Matières éligibles</h3>
<span className="text-label-xs text-primary font-bold">4 sélectionnées</span>
</div>
<div className="flex flex-wrap gap-2">

<label className="cursor-pointer">
<input checked={true} className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-primary bg-primary text-on-primary text-sm font-medium peer-checked:bg-primary peer-checked:text-on-primary transition-all">Toutes</span>
</label>
<label className="cursor-pointer">
<input className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm font-medium peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all">Mathématiques</span>
</label>
<label className="cursor-pointer">
<input className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm font-medium peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all">Français</span>
</label>
<label className="cursor-pointer">
<input className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm font-medium peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all">Physique-Chimie</span>
</label>
<label className="cursor-pointer">
<input className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm font-medium peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all">Anglais</span>
</label>
<label className="cursor-pointer">
<input className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm font-medium peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all">SVT</span>
</label>
<label className="cursor-pointer">
<input className="hidden peer" type="checkbox" />
<span className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant text-sm font-medium peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary transition-all">Histoire-Géo</span>
</label>
</div>
</div>
</form>
</main>

<div className="fixed bottom-0 left-0 w-full p-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant md:relative md:bg-transparent md:border-none md:mt-10">
<div className="max-w-2xl mx-auto">
<button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-headline font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2" id="submitBtn">
                Générer le code promo
                <span className="material-symbols-outlined">auto_fix_high</span>
</button>
</div>
</div>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-surface border-t border-outline-variant z-50 md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs font-medium">Tableau de bord</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">confirmation_number</span>
<span className="font-label text-label-xs font-medium">Promos</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>

<script>
        function toggleDiscountType(type) &#123;
            const percBtn = document.getElementById('type-percentage');
            const fixedBtn = document.getElementById('type-fixed');
            const suffix = document.getElementById('discount-suffix');

            if (type === 'percentage') &#123;
                percBtn.classList.remove('border-outline-variant', 'text-on-surface-variant');
                percBtn.classList.add('border-primary', 'bg-primary-container/5', 'text-primary');
                
                fixedBtn.classList.remove('border-primary', 'bg-primary-container/5', 'text-primary');
                fixedBtn.classList.add('border-outline-variant', 'text-on-surface-variant');
                fixedBtn.classList.remove('bg-primary-container/5');
                
                suffix.innerText = '%';
            &#125; else &#123;
                fixedBtn.classList.remove('border-outline-variant', 'text-on-surface-variant');
                fixedBtn.classList.add('border-primary', 'bg-primary-container/5', 'text-primary');
                
                percBtn.classList.remove('border-primary', 'bg-primary-container/5', 'text-primary');
                percBtn.classList.add('border-outline-variant', 'text-on-surface-variant');
                percBtn.classList.remove('bg-primary-container/5');
                
                suffix.innerText = 'FCFA';
            &#125;
        &#125;

        // Simple feedback on click
        document.getElementById('submitBtn').addEventListener('click', function() &#123;
            this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Création en cours...';
            setTimeout(() =&gt; &#123;
                this.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Code créé avec succès !';
                this.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                this.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
            &#125;, 1500);
        &#125;);
    </script>

    </div>
  );
}
