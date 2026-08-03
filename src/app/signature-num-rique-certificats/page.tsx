import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Signature du Certificat" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-surface-container-lowest dark:bg-inverse-surface border-b border-surface-border dark:border-outline-variant flex justify-between items-center px-gutter h-16 w-full z-40">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Tableau de bord Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<span className="text-on-surface-variant font-label-md text-label-md cursor-pointer hover:text-primary transition-colors">File</span>
<span className="text-primary font-bold font-label-md text-label-md cursor-pointer">Sign</span>
<span className="text-on-surface-variant font-label-md text-label-md cursor-pointer hover:text-primary transition-colors">Archive</span>
</div>
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-330.png" alt="A professional portrait of an academic expert, Dr. Aris Thorne, in a high-key studio setting. The lighting is soft and neutral, emphasizing a clean and authoritative look suitable for a professor dashboard. The background is a subtle, out-of-focus academic library with deep blue and white tones that match the Edukora design system." />
</div>
</div>
</header>
<div className="flex min-h-[calc(100vh-64px)]">

<aside className="hidden md:flex flex-col p-stack-md gap-base bg-surface-container-lowest dark:bg-inverse-surface border-r border-surface-border dark:border-outline-variant w-[280px]">
<div className="flex items-center gap-3 p-4 mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>account_circle</span>
</div>
<div>
<p className="font-title-md text-title-md text-primary leading-tight">Dr. Aris Thorne</p>
<p className="font-body-md text-body-md text-on-surface-variant">Senior Validator</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-md text-body-md">File de validation</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container font-semibold rounded-lg" href="#">
<span className="material-symbols-outlined">draw</span>
<span className="font-body-md text-body-md">Signature du Certificat</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">verified</span>
<span className="font-body-md text-body-md">Certified Materials</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">verified_user</span>
<span className="font-body-md text-body-md">Paramètres de sécurité</span>
</a>
</nav>
<div className="mt-auto p-4 bg-surface-container rounded-xl border border-surface-border">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="font-label-md text-label-md text-expert-purple uppercase tracking-wider">Statut d'expert</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Verified Academician</p>
<div className="w-full bg-outline-variant h-1 rounded-full mt-3 overflow-hidden">
<div className="bg-impact-emerald h-full w-[85%]"></div>
</div>
</div>
</aside>

<main className="flex-1 p-gutter md:p-container-padding-desktop">
<div className="max-w-5xl mx-auto">
<header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<nav className="flex items-center gap-2 text-on-surface-variant mb-2">
<span className="font-label-md text-label-md">Tableau de bord</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="font-label-md text-label-md">Signature</span>
</nav>
<h2 className="font-headline-lg text-headline-lg text-primary">Signature du Certificat</h2>
</div>
<div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-surface-border">
<span className="w-2 h-2 rounded-full bg-impact-emerald animate-pulse"></span>
<span className="font-label-md text-label-md text-on-surface-variant">Session Sécurisée : Aris Thorne</span>
</div>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-5 space-y-gutter">
<div className="bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden flex flex-col h-full">
<div className="p-4 border-b border-surface-border bg-surface-container-low flex justify-between items-center">
<span className="font-title-md text-title-md text-primary">Aperçu de la Ressource</span>
<span className="material-symbols-outlined text-on-surface-variant">open_in_full</span>
</div>
<div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
<div className="w-24 h-32 bg-white border border-outline-variant shadow-sm rounded-sm mb-4 relative flex flex-col p-3 overflow-hidden">
<div className="w-full h-1 bg-primary-container mb-2"></div>
<div className="w-3/4 h-1 bg-surface-variant mb-1"></div>
<div className="w-full h-1 bg-surface-variant mb-1"></div>
<div className="w-2/3 h-1 bg-surface-variant mb-4"></div>
<div className="w-full h-8 bg-surface-container-low rounded-sm"></div>
<div className="absolute bottom-2 right-2 opacity-20">
<span className="material-symbols-outlined text-[40px]">functions</span>
</div>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">Mathématiques - Intégrales</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">ID: EDU-2023-MATH-089</p>
<div className="w-full grid grid-cols-2 gap-2 text-left">
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="font-label-md text-label-md text-on-surface-variant uppercase">Niveau</p>
<p className="font-body-md text-body-md font-bold">Licence 1</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="font-label-md text-label-md text-on-surface-variant uppercase">Pages</p>
<p className="font-body-md text-body-md font-bold">12 fiches</p>
</div>
</div>
</div>
<div className="p-4 bg-surface-container-lowest border-t border-surface-border">
<button className="w-full py-2 border border-primary text-primary font-bold rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[20px]">visibility</span>
                                    Lire le contenu complet
                                </button>
</div>
</div>
</div>

<div className="lg:col-span-7 space-y-gutter">
<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 md:p-8">
<div className="flex justify-between items-center mb-6">
<h3 className="font-title-md text-title-md text-on-surface">Espace de Signature Digitale</h3>
<button className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 font-label-md text-label-md uppercase" id="clear-btn">
<span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                                    Effacer
                                </button>
</div>
<div className="relative w-full aspect-[16/9] border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low overflow-hidden">
<canvas className="signature-pad w-full h-full" id="signature-pad"></canvas>
<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40" id="pad-placeholder">
<span className="material-symbols-outlined text-[48px] mb-2">draw</span>
<p className="font-body-md text-body-md">Signez ici manuellement ou avec un stylet</p>
</div>
</div>
<div className="mt-8 space-y-6">
<label className="flex items-start gap-4 cursor-pointer group">
<div className="pt-1">
<input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container transition-all" type="checkbox" />
</div>
<span className="font-body-md text-body-md text-on-surface leading-snug group-hover:text-primary transition-colors">
                                        Je certifie que le contenu de cette fiche respecte les standards académiques d'Edukora et que j'ai personnellement vérifié l'exactitude pédagogique des concepts présentés.
                                    </span>
</label>
<div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-surface-border">
<button className="flex-1 w-full bg-primary-container text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-3 shadow-sm hover:opacity-90 active:scale-[0.98] transition-all" id="sign-btn">
<span className="material-symbols-outlined">fingerprint</span>
                                        Signer et Certifier
                                    </button>
<div className="flex items-center gap-2 text-on-surface-variant px-4 py-2 bg-surface-container-low rounded-lg border border-surface-border">
<span className="material-symbols-outlined text-impact-emerald">security</span>
<span className="font-label-md text-label-md">Chiffrement AES-256</span>
</div>
</div>
</div>
</div>

<div className="bg-secondary-container/30 border border-secondary-container rounded-xl p-4 flex gap-4 items-center">
<div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary">info</span>
</div>
<div>
<p className="font-title-md text-title-md text-primary text-[16px]">Impact de la Certification</p>
<p className="font-body-md text-body-md text-on-secondary-container">Une fois signée, cette ressource sera instantanément disponible pour 4,200+ étudiants avec votre badge de certification expert.</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 pb-safe bg-surface-container-lowest border-t border-surface-border md:hidden z-50">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">list_alt</span>
<span className="font-label-md text-label-md">File</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined">draw</span>
<span className="font-label-md text-label-md">Sign</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">inventory_2</span>
<span className="font-label-md text-label-md">Archive</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">lock</span>
<span className="font-label-md text-label-md">Vault</span>
</div>
</nav>

<div className="fixed inset-0 z-[100] hidden items-center justify-center p-4 bg-on-background/20 backdrop-blur-sm" id="success-modal">
<div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform scale-95 transition-transform">
<div className="w-20 h-20 bg-impact-emerald/10 text-impact-emerald rounded-full flex items-center justify-center mx-auto mb-6">
<span className="material-symbols-outlined text-[48px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<h3 className="font-headline-md text-headline-md text-primary mb-2">Certification Réussie</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">La fiche "Mathématiques - Intégrales" a été signée avec succès et archivée dans le coffre-fort académique.</p>
<button className="w-full bg-primary py-3 text-white rounded-lg font-bold">Retour au Tableau de Bord</button>
</div>
</div>
<script>
        // Simple Signature Pad Implementation
        const canvas = document.getElementById('signature-pad');
        const ctx = canvas.getContext('2d');
        const clearBtn = document.getElementById('clear-btn');
        const signBtn = document.getElementById('sign-btn');
        const placeholder = document.getElementById('pad-placeholder');
        const modal = document.getElementById('success-modal');

        let drawing = false;

        function resizeCanvas() &#123;
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            ctx.scale(ratio, ratio);
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#00327d';
        &#125;

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function startPosition(e) &#123;
            drawing = true;
            placeholder.classList.add('hidden');
            draw(e);
        &#125;

        function finishedPosition() &#123;
            drawing = false;
            ctx.beginPath();
        &#125;

        function draw(e) &#123;
            if (!drawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        &#125;

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('touchstart', startPosition);
        window.addEventListener('mouseup', finishedPosition);
        window.addEventListener('touchend', finishedPosition);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchmove', (e) =&gt; &#123;
            e.preventDefault();
            draw(e);
        &#125;);

        clearBtn.addEventListener('click', () =&gt; &#123;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            placeholder.classList.remove('hidden');
        &#125;);

        signBtn.addEventListener('click', () =&gt; &#123;
            // Check if signed (very crude check)
            const blank = document.createElement('canvas');
            blank.width = canvas.width;
            blank.height = canvas.height;
            if (canvas.toDataURL() === blank.toDataURL()) &#123;
                alert("Veuillez apposer votre signature avant de valider.");
                return;
            &#125;

            // Simulate loading and success
            signBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;refresh&lt;/span&gt; Traitement...';
            signBtn.disabled = true;
            
            setTimeout(() =&gt; &#123;
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                setTimeout(() =&gt; &#123;
                    modal.querySelector('div').classList.remove('scale-95');
                    modal.querySelector('div').classList.add('scale-100');
                &#125;, 50);
            &#125;, 1500);
        &#125;);
    </script>

    </div>
  );
}
