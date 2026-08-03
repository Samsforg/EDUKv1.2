import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Gérer mon abonnement" };

export default function Page() {
  return (
    <div className="text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container flex items-center justify-between px-4 h-16 shadow-none">
<div className="flex items-center gap-4">
<button className="hover:opacity-80 transition-opacity active:scale-95 transition-transform">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold">Abonnement</h1>
</div>
<button className="hover:opacity-80 transition-opacity active:scale-95 transition-transform">
<span className="material-symbols-outlined">help_outline</span>
</button>
</header>
<main className="flex-grow p-4 md:p-8 max-w-2xl mx-auto w-full space-y-6 pb-24">

<section className="premium-card-gradient rounded-xl p-6 text-on-primary shadow-lg relative overflow-hidden">

<div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
<div className="flex justify-between items-start mb-6">
<div>
<span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">Actif</span>
<h2 className="text-2xl font-headline font-bold mt-2">Pass Premium Mensuel</h2>
</div>
<div className="text-right">
<p className="text-3xl font-bold font-headline">1 000 <span className="text-sm font-normal opacity-80">FCFA/mois</span></p>
</div>
</div>
<div className="space-y-3 pt-4 border-t border-white/20">
<div className="flex items-center gap-2 text-sm opacity-90">
<span className="material-symbols-outlined text-sm">calendar_today</span>
<p>Prochain prélèvement : <strong>12 Octobre 2023</strong></p>
</div>
<div className="flex items-center gap-2 text-sm opacity-90">
<span className="material-symbols-outlined text-sm">check_circle</span>
<p>Accès illimité à tous les cours BEPC/BAC</p>
</div>
</div>
<button className="mt-6 w-full py-3 bg-white text-primary font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
<span className="material-symbols-outlined">receipt_long</span>
                Voir les factures
            </button>
</section>

<section className="bg-white border border-outline-variant rounded-xl p-5 space-y-4">
<h3 className="font-headline font-bold text-lg text-on-surface">Mode de paiement</h3>
<div className="flex items-center justify-between p-4 bg-surface-container rounded-lg border border-transparent hover:border-primary-container transition-colors group cursor-pointer">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1 border border-outline-variant">
<img className="w-full h-full object-contain" src="/images/ecran-160.png" alt="Official Orange Money logo with distinctive orange square and white lettering, high contrast corporate branding for a digital payment service, clean and professional design suitable for a financial transaction UI." />
</div>
<div>
<p className="font-bold text-on-surface">Orange Money</p>
<p className="text-sm text-on-surface-variant">Prélèvement automatique</p>
</div>
</div>
<button className="text-primary-container font-semibold hover:underline flex items-center gap-1">
                    Modifier
                    <span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
</section>

<section className="space-y-3">
<button className="w-full py-4 px-6 bg-surface-container-high text-primary font-bold rounded-xl flex items-center justify-between hover:bg-surface-container-highest transition-colors active:scale-[0.99]">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">swap_horiz</span>
                    Changer de forfait
                </div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</button>
<button className="w-full py-3 text-error font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-error-container/20 transition-colors mt-8 opacity-70 hover:opacity-100">
<span className="material-symbols-outlined">cancel</span>
                Résilier l'abonnement
            </button>
</section>

<div className="text-center pt-4">
<p className="text-sm text-on-surface-variant px-6">
                Besoin d'aide avec votre abonnement ? Contactez notre support technique disponible 24/7.
            </p>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-inverse-surface shadow-lg flex justify-around items-center h-20 px-2 pb-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 hover:opacity-90 transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>

<div className="fixed inset-0 z-[100] bg-black/50 hidden flex items-end sm:items-center justify-center p-4" id="paymentModal">
<div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up sm:animate-fade-in shadow-2xl">
<div className="flex justify-between items-center mb-6">
<h4 className="font-headline font-bold text-xl">Modifier le mode de paiement</h4>
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high">
<span className="material-symbols-outlined text-xl">close</span>
</button>
</div>
<div className="space-y-3">
<label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-primary/5 transition-colors border-primary ring-2 ring-primary/20">
<input checked={true} className="text-primary focus:ring-primary h-5 w-5" name="operator" type="radio" />
<div className="w-10 h-10 bg-white p-1 rounded border border-outline-variant flex items-center justify-center">
<img className="w-full h-full object-contain" src="/images/ecran-161.png" alt="Clean corporate logo for Orange Money, specifically designed for mobile interface icons with vibrant orange and white elements on a clean white background." />
</div>
<span className="font-bold">Orange Money</span>
</label>
<label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-primary/5 transition-colors border-outline-variant">
<input className="text-primary focus:ring-primary h-5 w-5" name="operator" type="radio" />
<div className="w-10 h-10 bg-white p-1 rounded border border-outline-variant flex items-center justify-center">
<img className="w-full h-full object-contain" src="/images/ecran-162.png" alt="The MTN MoMo logo featuring its signature bright yellow color and corporate typography, presented as a high-quality vector-style icon for a professional financial application UI." />
</div>
<span className="font-bold">MTN MoMo</span>
</label>
<label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-primary/5 transition-colors border-outline-variant">
<input className="text-primary focus:ring-primary h-5 w-5" name="operator" type="radio" />
<div className="w-10 h-10 bg-white p-1 rounded border border-outline-variant flex items-center justify-center">
<img className="w-full h-full object-contain" src="/images/ecran-163.png" alt="Wave mobile money logo with the iconic blue penguin illustration, modern and friendly branding for a fintech service, styled for a minimalist smartphone application interface." />
</div>
<span className="font-bold">Wave</span>
</label>
</div>
<button className="w-full mt-8 py-4 bg-primary text-on-primary font-bold rounded-xl active:scale-[0.98] transition-transform">
                Confirmer la modification
            </button>
</div>
</div>
<script>
        function togglePaymentModal() &#123;
            const modal = document.getElementById('paymentModal');
            if (modal.classList.contains('hidden')) &#123;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            &#125; else &#123;
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            &#125;
        &#125;

        // Close modal when clicking outside content
        document.getElementById('paymentModal').addEventListener('click', function(e) &#123;
            if (e.target === this) togglePaymentModal();
        &#125;);
    </script>

    </div>
  );
}
