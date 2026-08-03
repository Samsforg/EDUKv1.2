import type { Metadata } from "next";

export const metadata: Metadata = { title: "Console de support Edukora - Ticket Detail" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex items-center justify-between px-8 h-16 w-full">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-display-lg-mobile" data-icon="admin_panel_settings">admin_panel_settings</span>
<h1 className="font-headline text-headline-md font-semibold">Console de support Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<span className="text-on-primary font-bold cursor-pointer">Subscription Tickets</span>
<span className="text-on-primary/70 cursor-pointer hover:bg-primary-container/20 transition-colors px-3 py-1 rounded">File</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/30 overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-114.png" alt="A professional headshot of a female support administrator in a modern office, soft high-key lighting, focused look, Edukora brand colors in the background, sharp details, minimalist professional photography." />
</div>
</div>
</header>

<aside className="hidden md:flex flex-col py-6 h-screen w-72 fixed left-0 top-0 bg-surface-container-low dark:bg-inverse-surface border-r border-outline-variant mt-16">
<div className="px-6 mb-8 flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">E</div>
<div>
<p className="font-headline font-bold text-primary">Responsable support</p>
<p className="text-xs text-on-surface-variant">admin@edukora.ci</p>
</div>
</div>
<nav className="flex flex-col gap-1">
<div className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</div>
<div className="flex items-center gap-3 px-6 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined fill-icon" data-icon="confirmation_number" style={{"fontVariationSettings":"'FILL' 1"}}>confirmation_number</span>
<span className="font-body text-body-md">Subscription Tickets</span>
</div>
<div className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span className="font-body text-body-md">Vérification de facturation</span>
</div>
<div className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span className="font-body text-body-md">Moyens de paiement</span>
</div>
<div className="mt-auto">
<div className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</div>
</div>
</nav>
</aside>

<main className="md:pl-72 pt-20 pb-24 md:pb-8 min-h-screen">
<div className="max-w-6xl mx-auto px-4 md:px-8 py-6">

<nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-6">
<span className="cursor-pointer hover:text-primary transition-colors">Tickets</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="cursor-pointer hover:text-primary transition-colors">Litiges de facturation</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="font-semibold text-primary">Ticket #EDU-4921-CI</span>
</nav>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-8 space-y-6">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
<div className="flex items-center gap-4">
<div className="relative">
<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-fixed">
<img className="w-full h-full object-cover" src="/images/ecran-115.png" alt="A portrait of a young Ivorian student wearing a clean white shirt, looking towards the camera with a hopeful expression. The background is a soft-focus classroom setting in Abidjan, Côte d'Ivoire. Lighting is natural and bright, conveying a professional academic tone." />
</div>
<div className="absolute bottom-0 right-0 w-5 h-5 bg-tertiary rounded-full border-2 border-white flex items-center justify-center">
<span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>
</div>
</div>
<div>
<h2 className="text-xl font-headline font-bold text-on-surface">Koffi Kouassi Marc</h2>
<p className="text-sm text-on-surface-variant font-mono">User ID: CI-2023-9948</p>
</div>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold rounded-full uppercase tracking-wider">Priority: High</span>
<span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-bold rounded-full uppercase tracking-wider">Statut : En attente</span>
</div>
</div>
<div className="bg-surface-container-low p-5 rounded-lg border-l-4 border-secondary">
<h3 className="font-headline font-semibold text-on-surface mb-2">Subject: Paid via Orange Money but Premium not active</h3>
<p className="text-body-md text-on-surface-variant leading-relaxed italic">
                                "I made the payment for the Terminale BAC Revision pack via Orange Money last night (around 8:15 PM). The transaction was successful and money was debited from my account, but my access is still limited to the free version. I need to start my mock exams today. Please help!"
                            </p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-4">
<h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">receipt_long</span>
                                Justificatif de paiement
                            </h3>
<button className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
<span className="material-symbols-outlined text-sm">download</span> Download Original
                            </button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="relative group cursor-zoom-in overflow-hidden rounded-lg border border-outline-variant aspect-[3/4] bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="/images/ecran-116.png" alt="A high-quality scan of a digital payment receipt on a smartphone screen showing an Orange Money transaction in Côte d'Ivoire. Details show 15,000 CFA Francs, a transaction ID ending in 7748, dated yesterday. Professional studio lighting, sharp focus on the digital text, Edukora blue accents in the background." />
<div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<span className="bg-white text-primary p-3 rounded-full shadow-lg material-symbols-outlined">zoom_in</span>
</div>
</div>

<div className="space-y-4">
<div className="bg-surface-container p-4 rounded-lg">
<p className="text-xs uppercase text-on-surface-variant font-bold mb-1">Réf. transaction</p>
<p className="text-body-md font-mono text-primary">OM_CI_88294711029</p>
</div>
<div className="bg-surface-container p-4 rounded-lg">
<p className="text-xs uppercase text-on-surface-variant font-bold mb-1">Date &amp; Time</p>
<p className="text-body-md text-on-surface">12 Oct 2023, 20:14:42</p>
</div>
<div className="bg-surface-container p-4 rounded-lg">
<p className="text-xs uppercase text-on-surface-variant font-bold mb-1">Montant</p>
<p className="text-headline-md font-bold text-tertiary">15,000 CFA</p>
</div>
<div className="flex items-center gap-2 p-2 px-3 bg-tertiary-container/10 text-on-tertiary-fixed-variant rounded-md border border-tertiary-container/20">
<span className="material-symbols-outlined text-sm fill-icon">verified</span>
<span className="text-xs font-semibold">Vérification OCR : l'ID de transaction correspond au reçu</span>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4">
<div className="sticky top-24 space-y-6">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-md border-t-4 border-primary">
<h3 className="font-headline font-bold text-on-surface text-lg mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">gavel</span>
                                Resolution Center
                            </h3>
<div className="space-y-4">
<div>
<label className="block text-sm font-semibold text-on-surface-variant mb-2">Notes internes admin</label>
<textarea className="w-full min-h-[120px] p-3 bg-surface-container border border-outline rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-on-surface-variant/50" placeholder="Verify transaction with Orange backend API..."></textarea>
</div>
<div className="space-y-3 pt-4 border-t border-outline-variant">
<button className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
<span className="material-symbols-outlined group-hover:rotate-12 transition-transform">verified_user</span>
                                        Validate Subscription
                                    </button>
<button className="w-full py-3 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined">help_center</span>
                                        Demander plus d'informations
                                    </button>
<button className="w-full py-3 border border-error text-error font-semibold rounded-lg hover:bg-error-container/20 transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined">cancel</span>
                                        Rejeter le litige
                                    </button>
</div>
</div>
</div>

<div className="bg-surface-container-highest/30 p-6 rounded-xl border border-outline-variant/50">
<h4 className="text-xs uppercase font-bold text-on-surface-variant mb-4 tracking-widest">Ticket Activity</h4>
<div className="space-y-4">
<div className="flex gap-3">
<div className="flex flex-col items-center">
<div className="w-2 h-2 rounded-full bg-tertiary"></div>
<div className="w-0.5 h-full bg-outline-variant"></div>
</div>
<div className="pb-4">
<p className="text-xs font-bold text-on-surface">Ticket Created</p>
<p className="text-[10px] text-on-surface-variant">Today, 08:30 AM</p>
</div>
</div>
<div className="flex gap-3">
<div className="flex flex-col items-center">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-0.5 h-full bg-outline-variant opacity-0"></div>
</div>
<div>
<p className="text-xs font-bold text-on-surface">Assigned to Responsable support</p>
<p className="text-[10px] text-on-surface-variant">Today, 09:15 AM</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-highest dark:bg-surface-dim border-t border-outline-variant shadow-lg flex justify-around items-center px-4 py-2 h-16">
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2 cursor-pointer transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-label text-label-xs">Stats</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl p-2 cursor-pointer shadow-sm">
<span className="material-symbols-outlined fill-icon" data-icon="list_alt" style={{"fontVariationSettings":"'FILL' 1"}}>list_alt</span>
<span className="font-label text-label-xs">File</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2 cursor-pointer transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="forum">forum</span>
<span className="font-label text-label-xs">Discussion</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2 cursor-pointer transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>

<script>
        // Simple micro-interaction for buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                const originalText = this.innerHTML;
                if (this.innerText.includes('Validate')) &#123;
                    this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Validating...';
                    setTimeout(() =&gt; &#123;
                        this.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Subscription Active';
                        this.classList.remove('bg-secondary-container');
                        this.classList.add('bg-tertiary', 'text-white');
                    &#125;, 1500);
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
