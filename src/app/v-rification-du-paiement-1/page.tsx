import type { Metadata } from "next";

export const metadata: Metadata = { title: "Console de Support Edukora | Vérification de Paiement" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-md flex items-center justify-between px-8 h-16">
<div className="flex items-center gap-4">
<img alt="Edukora Logo" className="h-10 w-10 object-contain rounded-lg" src="/images/ecran-373.png" />
<h1 className="font-headline text-2xl font-bold text-on-primary">Console de support Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<span className="text-on-primary/70 font-label text-label-sm cursor-pointer hover:text-on-primary transition-colors">Statut File</span>
<span className="text-on-primary/70 font-label text-label-sm cursor-pointer hover:text-on-primary transition-colors">Logs Globaux</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container border-2 border-on-primary-container flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-374.png" alt="A professional headshot of an African support administrator" />
</div>
</div>
</header>

<aside className="hidden md:flex h-screen w-72 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex-col py-6 pt-20 z-40">
<div className="px-6 mb-8">
<div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl">
<div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">SL</div>
<div>
<p className="font-headline font-bold text-primary text-sm">Chef de Support</p>
<p className="text-xs text-on-surface-variant">admin@edukora.ci</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de Bord</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">confirmation_number</span>
<span className="font-body text-body-md">Tickets d'Abonnement</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">receipt_long</span>
<span className="font-body text-body-md">Vérification Facturation</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="font-body text-body-md">Méthodes de Paiement</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
<div className="mt-auto px-6">
<div className="p-4 bg-tertiary-container/10 border border-tertiary/20 rounded-xl">
<p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Niveau d'Accès</p>
<p className="text-sm font-semibold text-on-surface">Accès Niveau 3</p>
</div>
</div>
</aside>

<main className="md:ml-72 pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
<header className="mb-8">
<div className="flex items-center gap-2 text-primary font-semibold mb-2 cursor-pointer hover:underline">
<span className="material-symbols-outlined">arrow_back</span>
<span>Retour à la File de Vérification</span>
</div>
<h2 className="font-headline text-3xl font-bold text-on-surface">Vérifier la transaction : <span className="text-primary">#VER-8829-CI</span></h2>
<p className="text-on-surface-variant max-w-2xl">Un étudiant a signalé un délai d'activation de l'abonnement après un paiement par mobile money. Comparez les logs du fournisseur avec la capture d'écran téléchargée.</p>
</header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="glass-card rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
<div className="flex justify-between items-start">
<div>
<h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">dns</span>
                            Log du Fournisseur Système
                        </h3>
<p className="text-xs text-on-surface-variant">Source : Passerelle API Orange Money</p>
</div>
<span className="px-2 py-1 bg-primary-container/20 text-primary text-[10px] font-bold rounded uppercase">AUTO-ENREGISTRÉ</span>
</div>
<div className="space-y-4">
<div className="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">NUMÉRO DE RÉFÉRENCE</label>
<p className="font-mono text-sm font-bold text-on-surface break-all">OM-20231124-99812-TXN</p>
</div>
<div className="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">MONTANT DE LA TRANSACTION</label>
<p className="font-headline text-xl font-extrabold text-on-surface">5,500 FCFA</p>
</div>
<div className="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">HORODATAGE</label>
<p className="text-sm font-medium text-on-surface">24 Nov 2023 — 14:22:18</p>
</div>
<div className="p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">STATUT DU FOURNISSEUR</label>
<div className="flex items-center gap-2 text-error font-bold text-sm">
<span className="material-symbols-outlined text-sm">pending</span>
                            EN ATTENTE DE RAPPEL
                        </div>
</div>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden bg-white">
<div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
<div className="flex justify-between items-start">
<div>
<h3 className="font-headline text-lg font-bold text-secondary flex items-center gap-2">
<span className="material-symbols-outlined">image</span>
                            Reçu Téléchargé par l'Utilisateur
                        </h3>
<p className="text-xs text-on-surface-variant">Soumis par : Kouassi Jean-Marc</p>
</div>
<button className="material-symbols-outlined p-1 hover:bg-surface-container rounded transition-colors" title="Agrandir">zoom_in</button>
</div>
<div className="flex-grow aspect-[3/4] bg-surface-container rounded-lg relative group cursor-zoom-in overflow-hidden border border-outline-variant/50">
<img className="w-full h-full object-cover" src="/images/ecran-375.png" alt="Screenshot of payment" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
                        Cliquer pour Agrandir
                    </div>
</div>
<div className="flex items-center justify-between text-xs font-medium text-on-surface-variant">
<span>receipt_screenshot_final.png</span>
<span>1.4 MB</span>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-6">

<div className="bg-primary text-on-primary rounded-xl p-6 shadow-xl">
<h3 className="font-headline text-xl font-bold mb-6">Checklist Critique</h3>
<div className="space-y-6">

<label className="flex items-start gap-4 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-on-primary/30 rounded-md checked:bg-secondary checked:border-secondary transition-all" type="checkbox" />
<span className="material-symbols-outlined absolute text-on-primary opacity-0 peer-checked:opacity-100 text-lg">check</span>
</div>
<div>
<p className="font-bold text-sm group-hover:text-secondary-fixed transition-colors">Le Numéro de Référence Correspond</p>
<p className="text-xs text-on-primary/70">Assurez-vous que la chaîne <span className="font-mono bg-on-primary/10 px-1 rounded">OM-20231124-99812-TXN</span> est identique.</p>
</div>
</label>

<label className="flex items-start gap-4 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-on-primary/30 rounded-md checked:bg-secondary checked:border-secondary transition-all" type="checkbox" />
<span className="material-symbols-outlined absolute text-on-primary opacity-0 peer-checked:opacity-100 text-lg">check</span>
</div>
<div>
<p className="font-bold text-sm group-hover:text-secondary-fixed transition-colors">Le Montant Correspond</p>
<p className="text-xs text-on-primary/70">Confirmez exactement 5 500 FCFA (pas de paiements partiels).</p>
</div>
</label>

<label className="flex items-start gap-4 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-on-primary/30 rounded-md checked:bg-secondary checked:border-secondary transition-all" type="checkbox" />
<span className="material-symbols-outlined absolute text-on-primary opacity-0 peer-checked:opacity-100 text-lg">check</span>
</div>
<div>
<p className="font-bold text-sm group-hover:text-secondary-fixed transition-colors">La Date Correspond</p>
<p className="text-xs text-on-primary/70">L'horodatage sur le reçu doit correspondre à la fenêtre du fournisseur (+/- 5 min).</p>
</div>
</label>
</div>
<div className="mt-10 pt-6 border-t border-on-primary/20">
<label className="block text-xs font-bold uppercase mb-2 text-on-primary/60">NOTE D'AUDIT INTERNE</label>
<textarea className="w-full bg-on-primary/5 border border-on-primary/20 rounded-lg text-sm p-3 focus:ring-secondary focus:border-secondary outline-none placeholder:text-on-primary/30" placeholder="Ajouter des détails pour le journal d'audit..." rows={3}></textarea>
</div>
</div>

<div className="flex flex-col gap-3">
<button className="w-full py-4 bg-secondary text-on-secondary font-bold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg" id="confirmBtn">
<span className="material-symbols-outlined">verified_user</span>
                    Confirmer la Vérification
                </button>
<button className="w-full py-3 bg-white border border-error text-error font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-error-container/20 transition-all">
<span className="material-symbols-outlined">cancel</span>
                    Rejeter &amp; Signaler pour Fraude
                </button>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface-container-highest border-t border-outline-variant flex justify-around items-center px-4 py-2">
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs">Stats</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2">
<span className="material-symbols-outlined">list_alt</span>
<span className="font-label text-label-xs">File</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl p-2 px-4 shadow-sm">
<span className="material-symbols-outlined">payments</span>
<span className="font-label text-label-xs">Vérifier</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant p-2">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>

<div className="fixed inset-0 z-[100] flex items-center justify-center px-4 hidden" id="successModal">
<div className="absolute inset-0 bg-primary/40 backdrop-blur-md"></div>
<div className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
<div className="w-20 h-20 bg-tertiary-fixed text-on-tertiary-fixed rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-5xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Vérification Réussie</h3>
<p className="text-on-surface-variant mb-8">L'utilisateur <strong>Kouassi Jean-Marc</strong> a été manuellement mis à niveau vers <strong>BAC Prep Premium</strong>. Une notification SMS a été envoyée.</p>
<button className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg">Retour au Tableau de Bord</button>
</div>
</div>
<script>
    document.getElementById('confirmBtn').addEventListener('click', function() &#123;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(c =&gt; c.checked);
        
        if (!allChecked) &#123;
            alert('Veuillez vérifier tous les éléments de la checklist avant de confirmer.');
            return;
        &#125;

        this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Traitement...';
        this.classList.add('opacity-80', 'pointer-events-none');
        
        setTimeout(() =&gt; &#123;
            document.getElementById('successModal').classList.remove('hidden');
        &#125;, 1500);
    &#125;);
</script>

    </div>
  );
}
