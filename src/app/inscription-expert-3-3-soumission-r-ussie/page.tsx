import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Verification Status" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex items-center px-4 md:px-8 h-16 w-full border-b border-surface-border bg-surface sticky top-0 z-50">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-primary active:opacity-80">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-2xl font-semibold text-primary">Vérification d'identité</h1>
</div>
</header>
<main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
<div className="max-w-2xl w-full">

<div className="mb-12">
<div className="flex justify-between items-center mb-4">
<span className="text-label text-sm font-medium text-outline">Application Progress</span>
<span className="text-label text-sm font-bold text-primary">Step 3 of 3</span>
</div>
<div className="flex items-center gap-2">
<div className="h-2 flex-grow rounded-full bg-primary"></div>
<div className="h-2 flex-grow rounded-full bg-primary"></div>
<div className="h-2 flex-grow rounded-full bg-primary relative overflow-hidden">
<div className="absolute inset-0 bg-primary w-full transition-all duration-1000"></div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm border border-outline-variant flex flex-col items-center text-center">

<div className="relative mb-8 seal-animation">
<div className="absolute inset-0 bg-primary-fixed blur-3xl opacity-20 rounded-full"></div>
<div className="relative w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-primary rounded-full flex items-center justify-center overflow-hidden shadow-lg">
<img className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90" src="/images/ecran-192.png" alt="A highly detailed, elegant academic seal or crest for a prestigious educational institution. The seal features a central open book and a torch of knowledge, surrounded by a laurel wreath. The aesthetic uses Academic Blue and National Orange accents, set against a pristine white background. The style is professional and institutional, conveying authority and trust." />
<div className="absolute inset-0 border-8 border-primary-container/10 rounded-full"></div>
</div>
<div className="absolute -bottom-2 -right-2 bg-tertiary text-on-tertiary w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md border-4 border-surface">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
</div>

<h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">Application Received</h2>
<p className="text-body-lg text-on-surface-variant mb-8 max-w-lg">
                    Congratulations! Your teaching credentials for the Edukora platform have been successfully submitted for review.
                </p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10 text-left">
<div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-3">
<div className="flex items-center gap-3 text-primary">
<span className="material-symbols-outlined">schedule</span>
<span className="font-bold text-sm uppercase tracking-wider">Fenêtre de vérification</span>
</div>
<p className="text-body-md text-on-surface">Our academic committee performs manual verification within <span className="font-bold">24-48 hours</span>.</p>
</div>
<div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-3">
<div className="flex items-center gap-3 text-secondary">
<span className="material-symbols-outlined">notifications_active</span>
<span className="font-bold text-sm uppercase tracking-wider">Stay Updated</span>
</div>
<p className="text-body-md text-on-surface">You will receive a confirmation email once your status has been updated to 'Certified'.</p>
</div>
</div>

<div className="flex flex-col gap-4 w-full sm:w-auto min-w-[280px]">
<button className="bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-bold py-4 px-8 rounded-lg shadow-sm transition-all transform active:scale-95 flex items-center justify-center gap-2">
<span>Return to Home</span>
<span className="material-symbols-outlined">home</span>
</button>
<a className="text-primary font-semibold py-2 px-4 hover:underline flex items-center justify-center gap-2" href="#">
<span className="material-symbols-outlined text-sm">menu_book</span>
                        Academy Guidelines
                    </a>
</div>
</div>

<div className="mt-8 text-center text-outline text-sm">
                Questions about your application? 
                <a className="text-primary-container font-medium hover:underline" href="#">Contacter le support académique</a>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface border-t border-surface-border px-4 pb-safe z-50">
<div className="flex flex-col items-center justify-center text-outline">
<span className="material-symbols-outlined">doorbell</span>
<span className="text-xs mt-1">Bienvenue</span>
</div>
<div className="flex flex-col items-center justify-center text-outline">
<span className="material-symbols-outlined">id_card</span>
<span className="text-xs mt-1">Documents</span>
</div>
<div className="flex flex-col items-center justify-center text-outline">
<span className="material-symbols-outlined">face</span>
<span className="text-xs mt-1">Biometrics</span>
</div>
<div className="flex flex-col items-center justify-center text-primary font-bold">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="text-xs mt-1">Statut</span>
</div>
</nav>

<aside className="hidden lg:flex fixed left-0 top-16 flex-col h-[calc(100vh-64px)] w-[280px] border-r border-surface-border bg-surface py-6">
<div className="px-6 mb-8 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-193.png" alt="A professional portrait of a senior professor, Dr. Aris Thorne. He has a kind but authoritative expression, wearing a navy blue suit and glasses. The background is a blurred academic library with warm lighting. The image style is clean, sharp, and corporate, representing a high-level subject matter expert for an online education platform." />
</div>
<div>
<p className="font-bold text-on-surface leading-tight">Dr. Aris Thorne</p>
<p className="text-xs text-outline">Subject Matter Expert</p>
</div>
</div>
<div className="flex-grow space-y-1">
<div className="mx-2 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-all flex items-center gap-3">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-body-md">Overview</span>
</div>
<div className="mx-2 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-full cursor-pointer transition-all flex items-center gap-3">
<span className="material-symbols-outlined">badge</span>
<span className="text-body-md font-medium">Vérification d'identité</span>
</div>
<div className="mx-2 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-all flex items-center gap-3">
<span className="material-symbols-outlined">school</span>
<span className="text-body-md">Academic Credentials</span>
</div>
<div className="mx-2 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-all flex items-center gap-3">
<span className="material-symbols-outlined">lock</span>
<span className="text-body-md">Paramètres de sécurité</span>
</div>
</div>
<div className="px-6 py-4 mt-auto">
<div className="p-4 bg-tertiary-fixed-dim/20 rounded-xl border border-tertiary/10">
<p className="text-xs font-bold text-tertiary-fixed-dim uppercase tracking-tighter mb-1">Statut</p>
<p className="text-sm text-on-background font-medium">Vérification en cours</p>
</div>
</div>
</aside>
<script>
        // Micro-interaction for the button
        document.querySelector('button').addEventListener('mousedown', function() &#123;
            this.style.transform = 'scale(0.98)';
        &#125;);
        document.querySelector('button').addEventListener('mouseup', function() &#123;
            this.style.transform = 'scale(1)';
        &#125;);

        // Simple check to toggle sidebar/nav based on viewport
        window.addEventListener('resize', () =&gt; &#123;
            const width = window.innerWidth;
            const drawer = document.querySelector('aside');
            if (width &gt;= 1024) &#123;
                document.body.style.paddingLeft = '280px';
            &#125; else &#123;
                document.body.style.paddingLeft = '0px';
            &#125;
        &#125;);
        
        // Trigger initial layout check
        window.dispatchEvent(new Event('resize'));
    </script>

    </div>
  );
}
