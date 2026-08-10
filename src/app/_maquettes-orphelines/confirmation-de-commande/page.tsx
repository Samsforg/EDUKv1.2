import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confirmation de Commande - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface sticky top-0 z-50 flex justify-between items-center px-4 h-16 w-full shadow-sm">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95">arrow_back</button>
<h1 className="font-headline text-headline-md font-bold text-primary">Confirmation</h1>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-080.png" alt="Close up portrait of a smiling West African student in a modern academic setting, bright natural lighting, professional photography style, representing the Edukora student community with a high-key light mode aesthetic and vibrant clarity." />
</div>
</header>
<main className="flex-grow flex flex-col items-center p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6">

<div className="w-full text-center space-y-2 mb-4">
<div className="inline-flex items-center justify-center p-3 bg-primary-container/10 rounded-full mb-2">
<span className="material-symbols-outlined text-primary text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<h2 className="text-2xl font-bold text-on-surface">Finalisez votre abonnement</h2>
<p className="text-on-surface-variant text-sm">Une étape de plus vers l'excellence académique</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

<div className="md:col-span-7 space-y-6">

<div className="bento-card rounded-xl p-6 shadow-sm">
<div className="flex justify-between items-start mb-6">
<div>
<span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-fixed px-2 py-1 rounded">Plan Choisi</span>
<h3 className="text-xl font-bold mt-2">Premium Réussite</h3>
</div>
<div className="text-right">
<p className="text-2xl font-extrabold text-secondary">2000 FCFA</p>
<p className="text-xs text-on-surface-variant">/ mois</p>
</div>
</div>
<div className="space-y-3">
<div className="flex items-center gap-3 text-sm text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                            Accès illimité à tous les cours
                        </div>
<div className="flex items-center gap-3 text-sm text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                            tuteur IA disponible 24h/24
                        </div>
<div className="flex items-center gap-3 text-sm text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                            Simulateurs d'examen BEPC/BAC
                        </div>
</div>
</div>

<div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-dashed border-outline-variant">
<span className="material-symbols-outlined text-outline">lock</span>
<p className="text-xs text-on-surface-variant leading-relaxed">
<span className="font-semibold block text-on-surface">Paiement sécurisé par cryptage SSL</span>
                        Vos données de transaction sont protégées par les standards de sécurité les plus élevés.
                    </p>
</div>
</div>

<div className="md:col-span-5 space-y-6">
<div className="bento-card rounded-xl p-6 shadow-sm border-2 border-secondary-container/20">
<h3 className="font-bold text-lg mb-4">Méthode de Paiement</h3>

<div className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface mb-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-white rounded flex items-center justify-center p-1 border shadow-sm">
<img className="h-full w-auto object-contain" src="/images/ecran-081.png" alt="Official logo of Orange Money mobile payment service, featuring its iconic orange and white square branding, rendered as a crisp digital icon for a professional financial transaction interface." />
</div>
<span className="font-semibold">Orange Money</span>
</div>
<span className="text-xs text-primary font-bold">Modifier</span>
</div>

<div className="space-y-4">
<label className="block text-sm font-semibold text-on-surface-variant">Numéro de téléphone</label>
<div className="flex items-stretch orange-glow border border-outline rounded-lg overflow-hidden transition-all bg-white h-14">
<div className="flex items-center px-4 bg-surface-container-high text-on-surface font-bold border-r border-outline">
                                +225
                            </div>
<input className="flex-grow px-4 border-none focus:ring-0 text-lg font-medium tracking-widest bg-transparent" placeholder="07 -- -- -- --" type="tel" />
</div>
<p className="text-[10px] text-on-surface-variant italic">Un code de confirmation vous sera envoyé par SMS par votre opérateur.</p>
</div>

<button className="w-full mt-8 bg-secondary-container hover:bg-secondary text-on-secondary font-bold py-4 rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group">
                        Confirmer et Payer
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<div className="mt-6 pt-6 border-t border-surface-container flex justify-center items-center gap-6 opacity-60">
<span className="material-symbols-outlined text-3xl">verified</span>
<span className="material-symbols-outlined text-3xl">format_image_left</span>
<span className="material-symbols-outlined text-3xl">lock_reset</span>
</div>
</div>
<div className="text-center">
<button className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4">Annuler la transaction</button>
</div>
</div>
</div>
</main>

<footer className="p-6 text-center text-on-surface-variant/50 text-[10px]">
        © 2024 Edukora - Tous droits réservés. Plateforme éducative agréée.
    </footer>

<script>
        // Form input auto-formatting placeholder (visual only)
        const input = document.querySelector('input[type="tel"]');
        input.addEventListener('input', (e) =&gt; &#123;
            let value = e.target.value.replace(/\D/g, '');
            if (value.length &gt; 10) value = value.slice(0, 10);
            
            // Basic formatting for Ivorian numbers (XX XX XX XX XX)
            let formattedValue = '';
            for (let i = 0; i &lt; value.length; i++) &#123;
                if (i &gt; 0 &amp;&amp; i % 2 === 0) formattedValue += ' ';
                formattedValue += value[i];
            &#125;
            e.target.value = formattedValue;
        &#125;);

        // Add subtle hover effect to bento cards
        document.querySelectorAll('.bento-card').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.borderColor = '#0047AB20';
                card.style.transform = 'translateY(-2px)';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.borderColor = '#e2e8f0';
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
