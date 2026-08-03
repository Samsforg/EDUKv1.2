import type { Metadata } from "next";

export const metadata: Metadata = { title: "Console de support Edukora" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md h-16 px-8 flex items-center justify-between">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
<h1 className="font-headline text-headline-md font-semibold">Console de support Edukora</h1>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex gap-4">
<button className="text-on-primary font-bold hover:bg-primary-container/20 px-3 py-1 rounded transition-colors">Tableau de bord</button>
<button className="text-on-primary/70 hover:bg-primary-container/20 px-3 py-1 rounded transition-colors">Tickets</button>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-368.png" alt="A professional headshot of a female IT administrator in a modern office setting. She has a confident smile, wearing professional business attire. The background is a brightly lit, high-end office with soft bokeh, reflecting the academic and corporate aesthetic of the Edukora brand." />
</div>
</div>
</header>

<aside className="hidden md:flex h-screen w-72 fixed left-0 top-0 bg-surface-container-low dark:bg-inverse-surface flex-col py-6 border-r border-outline-variant mt-16">
<div className="px-6 mb-8 flex flex-col items-start">
<div className="flex items-center gap-3 mb-2">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<h2 className="font-headline font-bold text-primary text-body-md">Responsable support</h2>
<p className="text-on-surface-variant text-label-xs">admin@edukora.ci</p>
</div>
</div>
<span className="bg-secondary-container/20 text-on-secondary-container text-label-xs px-2 py-0.5 rounded-full font-semibold">Level 3 Access</span>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-6 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">confirmation_number</span>
<span>Subscription Tickets</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">receipt_long</span>
<span>Vérification de facturation</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">payments</span>
<span>Moyens de paiement</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span>Paramètres</span>
</a>
</nav>
</aside>

<main className="pt-24 pb-20 md:pb-8 md:pl-80 px-4 md:px-margin-desktop min-h-screen">

<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<h2 className="font-headline text-display-lg-mobile md:text-display-lg text-primary">System Overview</h2>
<p className="text-on-surface-variant">Real-time support operations monitoring</p>
</div>
<div className="relative w-full md:w-96 group">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Search tickets, IDs, or students..." type="text" />
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center justify-between shadow-sm">
<div>
<p className="text-on-surface-variant text-label-sm font-medium mb-1">Total Tickets</p>
<h3 className="text-4xl font-bold text-primary">156</h3>
<p className="text-tertiary text-label-xs mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
                        +12% from yesterday
                    </p>
</div>
<div className="p-4 bg-primary-fixed rounded-xl text-on-primary-fixed">
<span className="material-symbols-outlined text-3xl">confirmation_number</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center justify-between shadow-sm">
<div>
<p className="text-on-surface-variant text-label-sm font-medium mb-1">Subscription Issues</p>
<h3 className="text-4xl font-bold text-secondary">42</h3>
<p className="text-error text-label-xs mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">warning</span>
                        8 critical needs
                    </p>
</div>
<div className="p-4 bg-secondary-fixed rounded-xl text-on-secondary-fixed">
<span className="material-symbols-outlined text-3xl">subscriptions</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center justify-between shadow-sm">
<div>
<p className="text-on-surface-variant text-label-sm font-medium mb-1">Avg Resolution Time</p>
<h3 className="text-4xl font-bold text-tertiary">4.2h</h3>
<p className="text-tertiary text-label-xs mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
                        -15m improvement
                    </p>
</div>
<div className="p-4 bg-tertiary-fixed rounded-xl text-on-tertiary-fixed">
<span className="material-symbols-outlined text-3xl">timer</span>
</div>
</div>
</div>

<section className="mb-12">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-3xl">priority_high</span>
<h2 className="font-headline text-headline-md font-semibold">Priority Tickets</h2>
</div>
<button className="text-primary font-semibold text-label-sm hover:underline">View All Tickets</button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 ticket-card-hover transition-all duration-300 relative overflow-hidden">
<div className="absolute top-0 right-0 h-1 w-full bg-error"></div>
<div className="flex justify-between items-start mb-4">
<span className="text-label-xs font-bold text-outline uppercase tracking-wider">#TK-8842</span>
<span className="bg-error-container text-on-error-container text-label-xs px-2 py-1 rounded-md font-bold uppercase">High Priority</span>
</div>
<h4 className="font-headline font-bold text-lg mb-1">Subscription Not Activated</h4>
<p className="text-on-surface-variant text-body-md mb-6">User paid via Mobile Money but BAC premium access is still locked.</p>
<div className="flex items-center gap-3 border-t border-outline-variant pt-4">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">MK</div>
<div className="flex-1">
<p className="text-label-sm font-semibold">Moussa Koné</p>
<p className="text-label-xs text-outline">Student (BAC-S)</p>
</div>
<button className="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined">launch</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 ticket-card-hover transition-all duration-300 relative overflow-hidden">
<div className="absolute top-0 right-0 h-1 w-full bg-error"></div>
<div className="flex justify-between items-start mb-4">
<span className="text-label-xs font-bold text-outline uppercase tracking-wider">#TK-8845</span>
<span className="bg-error-container text-on-error-container text-label-xs px-2 py-1 rounded-md font-bold uppercase">High Priority</span>
</div>
<h4 className="font-headline font-bold text-lg mb-1">Problème de boucle de connexion</h4>
<p className="text-on-surface-variant text-body-md mb-6">Student cannot bypass the verification screen after email change.</p>
<div className="flex items-center gap-3 border-t border-outline-variant pt-4">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">AT</div>
<div className="flex-1">
<p className="text-label-sm font-semibold">Awa Touré</p>
<p className="text-label-xs text-outline">Student (BEPC)</p>
</div>
<button className="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined">launch</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 ticket-card-hover transition-all duration-300 relative overflow-hidden">
<div className="absolute top-0 right-0 h-1 w-full bg-secondary-container"></div>
<div className="flex justify-between items-start mb-4">
<span className="text-label-xs font-bold text-outline uppercase tracking-wider">#TK-8851</span>
<span className="bg-secondary-fixed text-on-secondary-fixed text-label-xs px-2 py-1 rounded-md font-bold uppercase">Medium Priority</span>
</div>
<h4 className="font-headline font-bold text-lg mb-1">Score du quiz non sauvegardé</h4>
<p className="text-on-surface-variant text-body-md mb-6">History quiz completed but progress bar remains at 40%.</p>
<div className="flex items-center gap-3 border-t border-outline-variant pt-4">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">SD</div>
<div className="flex-1">
<p className="text-label-sm font-semibold">Seydou Diaby</p>
<p className="text-label-xs text-outline">Student (BAC-L)</p>
</div>
<button className="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined">launch</span>
</button>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
<div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<h3 className="font-headline font-bold text-lg mb-6">Recent Activity Log</h3>
<div className="space-y-4">
<div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg group">
<div className="p-2 bg-tertiary/10 text-tertiary rounded-full">
<span className="material-symbols-outlined text-sm">done_all</span>
</div>
<div>
<p className="text-body-md"><span className="font-bold">Jean-Luc B.</span> resolved <span className="font-bold text-primary">#TK-8840</span> (Litige de facturation)</p>
<p className="text-label-xs text-outline">2 minutes ago</p>
</div>
</div>
<div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg">
<div className="p-2 bg-secondary/10 text-secondary rounded-full">
<span className="material-symbols-outlined text-sm">reply</span>
</div>
<div>
<p className="text-body-md"><span className="font-bold">System AI</span> sent automated response to <span className="font-bold text-primary">#TK-8855</span></p>
<p className="text-label-xs text-outline">15 minutes ago</p>
</div>
</div>
<div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg">
<div className="p-2 bg-error/10 text-error rounded-full">
<span className="material-symbols-outlined text-sm">priority_high</span>
</div>
<div>
<p className="text-body-md"><span className="font-bold">New High Priority</span> ticket assigned: <span className="font-bold text-primary">#TK-8856</span></p>
<p className="text-label-xs text-outline">42 minutes ago</p>
</div>
</div>
</div>
</div>
<div className="bg-primary text-on-primary rounded-xl p-6 flex flex-col justify-between">
<div>
<h3 className="font-headline font-bold text-lg mb-2">Team Capacity</h3>
<p className="text-on-primary/70 text-label-sm mb-6">Current load per agent is high. Consider enabling overflow AI.</p>
<div className="space-y-4">
<div>
<div className="flex justify-between text-label-xs mb-1">
<span>Agents actifs</span>
<span>12/15</span>
</div>
<div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary-fixed h-full w-[80%]"></div>
</div>
</div>
<div>
<div className="flex justify-between text-label-xs mb-1">
<span>Charge de la file</span>
<span>Critical</span>
</div>
<div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[95%]"></div>
</div>
</div>
</div>
</div>
<button className="mt-8 bg-on-primary text-primary font-bold py-3 rounded-lg hover:bg-primary-fixed transition-transform active:scale-95">
                    Launch AI Assistant
                </button>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-highest border-t border-outline-variant shadow-lg h-16 flex justify-around items-center px-4 py-2">
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<span className="font-label text-label-xs">Stats</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant transition-transform" href="#">
<span className="material-symbols-outlined">list_alt</span>
<span className="font-label text-label-xs">File</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant transition-transform" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-label text-label-xs">Discussion</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant transition-transform" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for search bar
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () =&gt; &#123;
            searchInput.parentElement.classList.add('scale-[1.02]');
            searchInput.parentElement.style.transition = 'transform 0.2s ease-out';
        &#125;);
        searchInput.addEventListener('blur', () =&gt; &#123;
            searchInput.parentElement.classList.remove('scale-[1.02]');
        &#125;);

        // Simulating real-time metric updates
        setInterval(() =&gt; &#123;
            if (Math.random() &gt; 0.8) &#123;
                const counter = document.querySelector('h3.text-primary');
                let val = parseInt(counter.innerText);
                counter.innerText = val + 1;
                counter.classList.add('scale-110', 'text-secondary');
                setTimeout(() =&gt; &#123;
                    counter.classList.remove('scale-110', 'text-secondary');
                &#125;, 500);
            &#125;
        &#125;, 5000);
    </script>

    </div>
  );
}
