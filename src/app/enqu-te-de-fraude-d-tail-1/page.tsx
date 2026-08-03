import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Investigation" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-md flex justify-between items-center px-4 md:px-8 py-3 h-16">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary text-2xl" data-icon="security">security</span>
<h1 className="font-headline text-display-lg-mobile md:text-headline-md font-bold text-on-primary">Edukora Admin</h1>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-6">
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-3 py-1 rounded" href="#">Alertes de fraude</a>
<a className="text-on-primary font-bold underline decoration-secondary decoration-2 px-3 py-1" href="#">Investigations</a>
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-3 py-1 rounded" href="#">Moteur de règles</a>
</nav>
<div className="cursor-pointer active:scale-95 transition-transform">
<img className="w-10 h-10 rounded-full border-2 border-on-primary/20 object-cover" src="/images/ecran-127.png" alt="A professional headshot of a system administrator in a clean, modern corporate environment. The lighting is bright and professional, emphasizing a high-trust academic authority aesthetic consistent with the Edukora brand. The person wears a crisp white shirt against a soft blue gradient background." />
</div>
</div>
</header>

<aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 hidden lg:flex flex-col gap-2 p-4 bg-surface-container-low border-r border-outline-variant">
<div className="flex items-center gap-3 mb-6 px-2">
<div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary-container" data-icon="shield_person">shield_person</span>
</div>
<div>
<p className="font-headline text-body-md font-semibold text-primary">Panneau Admin</p>
<p className="text-label-xs text-on-surface-variant">Surveillance de la fraude</p>
</div>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span className="font-body text-body-md">Alertes de fraude</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold shadow-sm" href="#">
<span className="material-symbols-outlined" data-icon="search_check">search_check</span>
<span className="font-body text-body-md">Investigations</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined" data-icon="rule">rule</span>
<span className="font-body text-body-md">Moteur de règles</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-body text-body-md">Journal d'audit</span>
</a>
</nav>
</aside>

<main className="pt-20 pb-24 lg:pb-8 lg:ml-64 px-4 md:px-8">

<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
<div>
<nav className="flex items-center gap-2 text-label-sm text-on-surface-variant mb-2">
<span>Investigations</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-primary font-semibold">Case #4829-SUSP</span>
</nav>
<h2 className="font-headline text-headline-md font-bold text-on-surface">User Investigation: @m_traore225</h2>
</div>
<div className="flex flex-wrap gap-3">
<button className="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface hover:bg-surface-container-high rounded-xl transition-colors font-semibold">
<span className="material-symbols-outlined text-sm">visibility_off</span>
                    Shadowban
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-on-tertiary-fixed-variant text-on-tertiary rounded-xl hover:opacity-90 transition-opacity font-semibold">
<span className="material-symbols-outlined text-sm">verified</span>
                    Mark as Safe
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-error text-on-error rounded-xl hover:bg-error/90 transition-colors font-semibold">
<span className="material-symbols-outlined text-sm">block</span>
                    Deactivate Account
                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline text-body-lg font-bold">Infos du compte</h3>
<span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase tracking-wider">High Risk</span>
</div>
<div className="flex flex-col items-center mb-6">
<div className="relative mb-3">
<img className="w-24 h-24 rounded-full object-cover ring-4 ring-error-container" src="/images/ecran-128.png" alt="A profile picture of a young male student wearing a neat polo shirt, representing an academic profile on the Edukora platform. The image is framed in a clean circular crop, styled to look like an official educational system avatar. The background is a soft, warm neutral tone." />
<div className="absolute bottom-0 right-0 bg-error text-white p-1 rounded-full border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-sm block" data-icon="priority_high">priority_high</span>
</div>
</div>
<p className="font-bold text-body-md">Moussa Traoré</p>
<p className="text-label-sm text-on-surface-variant">m.traore@edu.ci</p>
</div>
<div className="space-y-4 pt-4 border-t border-outline-variant">
<div className="flex justify-between items-center">
<span className="text-label-sm text-on-surface-variant">Signup Date</span>
<span className="text-label-sm font-semibold">12 May 2024</span>
</div>
<div className="flex justify-between items-center">
<span className="text-label-sm text-on-surface-variant">Account Type</span>
<span className="text-label-sm font-semibold">BAC Prep (Premium)</span>
</div>
<div className="flex justify-between items-center">
<span className="text-label-sm text-on-surface-variant">Region</span>
<span className="text-label-sm font-semibold">Abidjan, CI</span>
</div>
<div className="flex justify-between items-center">
<span className="text-label-sm text-on-surface-variant">Device IDs</span>
<span className="text-[10px] font-mono bg-surface-container p-1 rounded">DV-49A-X2...</span>
</div>
</div>
</section>

<section className="md:col-span-8 bg-error-container/20 border border-error/20 rounded-xl p-6 relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-9xl text-error" data-icon="report">report</span>
</div>
<h3 className="font-headline text-body-lg font-bold text-on-error-container mb-4">Critical Behavioral Triggers</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
<div className="bg-white p-4 rounded-lg border border-error/30 shadow-sm">
<div className="flex items-center gap-3 text-error mb-2">
<span className="material-symbols-outlined" data-icon="map">map</span>
<p className="font-bold text-body-md">IP Anomaly</p>
</div>
<p className="text-headline-md font-bold text-on-surface">15 IP addresses</p>
<p className="text-label-sm text-on-surface-variant">Détecté au cours des 2 dernières heures (VPN suspecté)</p>
</div>
<div className="bg-white p-4 rounded-lg border border-error/30 shadow-sm">
<div className="flex items-center gap-3 text-error mb-2">
<span className="material-symbols-outlined" data-icon="speed">speed</span>
<p className="font-bold text-body-md">Alerte de vitesse</p>
</div>
<p className="text-headline-md font-bold text-on-surface">43 Lessons</p>
<p className="text-label-sm text-on-surface-variant">Completed in &lt; 5 mins (Bot interaction?)</p>
</div>
<div className="bg-white p-4 rounded-lg border border-outline-variant shadow-sm">
<div className="flex items-center gap-3 text-secondary mb-2">
<span className="material-symbols-outlined" data-icon="devices">devices</span>
<p className="font-bold text-body-md">Shared Access</p>
</div>
<p className="text-headline-md font-bold text-on-surface">3 Devices</p>
<p className="text-label-sm text-on-surface-variant">Concurrent sessions active from 3 locations</p>
</div>
<div className="bg-white p-4 rounded-lg border border-outline-variant shadow-sm">
<div className="flex items-center gap-3 text-primary mb-2">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<p className="font-bold text-body-md">Infos de paiement</p>
</div>
<p className="text-headline-md font-bold text-on-surface">Orange Money</p>
<p className="text-label-sm text-on-surface-variant">Multiple failed recharge attempts (x5)</p>
</div>
</div>
</section>

<section className="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-6 border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline text-body-lg font-bold">Historique des transactions</h3>
<button className="text-primary text-label-sm font-bold hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container text-on-surface-variant text-label-xs uppercase">
<tr>
<th className="px-6 py-3 font-semibold">Date</th>
<th className="px-6 py-3 font-semibold">Type</th>
<th className="px-6 py-3 font-semibold">Montant</th>
<th className="px-6 py-3 font-semibold">Statut</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm">24 May, 14:20</td>
<td className="px-6 py-4 text-label-sm font-medium">Monthly Subscription</td>
<td className="px-6 py-4 text-label-sm">5,000 FCFA</td>
<td className="px-6 py-4">
<span className="bg-on-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full text-label-xs font-bold">Succès</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm">24 May, 14:18</td>
<td className="px-6 py-4 text-label-sm font-medium">Credits Top-up</td>
<td className="px-6 py-4 text-label-sm">2,000 FCFA</td>
<td className="px-6 py-4">
<span className="bg-error-container text-error px-2 py-0.5 rounded-full text-label-xs font-bold">Échec</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm">24 May, 14:15</td>
<td className="px-6 py-4 text-label-sm font-medium">Credits Top-up</td>
<td className="px-6 py-4 text-label-sm">2,000 FCFA</td>
<td className="px-6 py-4">
<span className="bg-error-container text-error px-2 py-0.5 rounded-full text-label-xs font-bold">Échec</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm">12 May, 09:12</td>
<td className="px-6 py-4 text-label-sm font-medium">Initial Signup</td>
<td className="px-6 py-4 text-label-sm">0 FCFA</td>
<td className="px-6 py-4">
<span className="bg-on-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full text-label-xs font-bold">Succès</span>
</td>
</tr>
</tbody>
</table>
</div>
</section>

<section className="md:col-span-5 flex flex-col h-full bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
<div className="p-6 border-b border-outline-variant flex items-center justify-between">
<h3 className="font-headline text-body-lg font-bold">Notes internes admin</h3>
<span className="flex items-center gap-1 text-label-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm" data-icon="groups">groups</span>
                        3 collaborating
                    </span>
</div>
<div className="flex-grow p-6 space-y-4 overflow-y-auto max-h-[300px]">
<div className="flex gap-3">
<img className="w-8 h-8 rounded-full" src="/images/ecran-129.png" alt="A tiny profile circle of a female administrator, wearing glasses and a focused expression. Professional, academic vibe with a soft forest green accent in her attire." />
<div className="bg-surface-container-low p-3 rounded-lg rounded-tl-none flex-grow">
<p className="text-label-xs font-bold text-primary mb-1">Amina Diallo <span className="text-on-surface-variant font-normal ml-2">10:45 AM</span></p>
<p className="text-label-sm italic">"Checked the session logs. The 15 IPs originate from different ASN providers in rapid succession. Classic account sharing pattern for premium content."</p>
</div>
</div>
<div className="flex gap-3 justify-end">
<div className="bg-primary text-on-primary p-3 rounded-lg rounded-tr-none flex-grow max-w-[80%]">
<p className="text-label-xs font-bold mb-1">Audit système <span className="text-on-primary/70 font-normal ml-2">11:15 AM</span></p>
<p className="text-label-sm">Alerte automatique : accès au simulateur d'examen depuis plusieurs zones géographiques en 15 minutes.</p>
</div>
</div>
</div>
<div className="p-4 border-t border-outline-variant mt-auto">
<div className="relative">
<textarea className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary text-body-md p-3 pr-12 h-20 resize-none" placeholder="Add a note for other admins..."></textarea>
<button className="absolute bottom-3 right-3 text-primary hover:text-primary-container p-1">
<span className="material-symbols-outlined" data-icon="send">send</span>
</button>
</div>
<div className="flex gap-2 mt-3">
<span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant cursor-pointer">#InvestigationNeeded</span>
<span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant cursor-pointer">#AccountSharing</span>
</div>
</div>
</section>
</div>

<section className="mt-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline text-body-lg font-bold mb-4">Geo-Access Timeline</h3>
<div className="relative h-64 rounded-lg overflow-hidden bg-surface-container">
<div className="absolute inset-0 grayscale opacity-40">
<img className="w-full h-full object-cover" data-location="Abidjan" src="/images/ecran-130.png" alt="A stylized map of Abidjan, Côte d'Ivoire, showing urban areas and neighborhoods. The map is presented in a modern, data-driven aesthetic with subtle glowing dots representing various user access points across the city. The color scheme is predominantly slate and academic blue with high-contrast forest green markers." />
</div>

<div className="absolute inset-0 flex items-center justify-center">
<div className="relative">
<div className="absolute -top-12 -left-20 bg-white shadow-lg p-2 rounded border border-error animate-pulse">
<p className="text-[10px] font-bold text-error">Suspected Bot Node</p>
</div>
<span className="material-symbols-outlined text-error text-4xl fill-icon" data-icon="location_on">location_on</span>
</div>
</div>
<div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg text-label-xs font-semibold border border-outline-variant">
                    Displaying last 24h activity clusters
                </div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 lg:hidden bg-surface dark:bg-surface-container-highest border-t border-outline-variant shadow-lg flex justify-around items-center pt-2 pb-safe px-4 h-16">
<a className="flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="manage_search">manage_search</span>
<span className="font-label text-label-xs">Investigate</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="settings_suggest">settings_suggest</span>
<span className="font-label text-label-xs">Rules</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for action buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                const text = this.innerText.trim();
                if (text.includes('Deactivate')) &#123;
                    if(confirm('Are you sure you want to deactivate @m_traore225? This action is immediate.')) &#123;
                        this.innerText = 'Account Deactivated';
                        this.disabled = true;
                        this.classList.replace('bg-error', 'bg-outline');
                    &#125;
                &#125; else if (text.includes('Safe')) &#123;
                    alert('Case marked as safe. Closing investigation.');
                    window.location.reload();
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
