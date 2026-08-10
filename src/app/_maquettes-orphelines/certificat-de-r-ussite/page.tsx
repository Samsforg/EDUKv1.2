import type { Metadata } from "next";

export const metadata: Metadata = { title: "certificat_de_r_ussite" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-surface-container-highest shadow-md flex items-center justify-between px-4 md:px-8 h-16 no-print">
<div className="flex items-center gap-4">
<button className="text-on-primary dark:text-primary-fixed hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 transition-transform">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-on-primary">Certificat de Réussite</h1>
</div>
<div className="flex items-center gap-2">
<button className="text-on-primary dark:text-primary-fixed hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 transition-transform">
<span className="material-symbols-outlined">share</span>
</button>
</div>
</header>
<main className="pt-24 pb-32 px-4 md:px-8 max-w-5xl mx-auto print-padding">

<div className="relative bg-white shadow-2xl rounded-lg overflow-hidden certificate-border p-8 md:p-16">

<div className="absolute inset-0 certificate-guilloche pointer-events-none"></div>
<div className="relative z-10 flex flex-col items-center text-center">

<div className="mb-10">
<img alt="Edukora Logo" className="w-20 h-20 mb-4 mx-auto object-contain" src="/images/ecran-050.png" />
<span className="font-headline font-extrabold text-2xl text-primary tracking-tight">EDUKORA</span>
</div>

<div className="mb-8">
<h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">Certificat d'Excellence</h2>
<div className="h-1 w-32 bg-secondary-container mx-auto rounded-full"></div>
</div>

<div className="mb-8">
<p className="text-on-surface-variant font-label text-label-sm uppercase tracking-widest mb-4">Ce certificat est fièrement décerné à</p>
<p className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface italic mb-4">Koffi Konan</p>
<div className="max-w-xl mx-auto border-b-2 border-outline-variant w-full"></div>
</div>

<div className="mb-12">
<p className="text-body-lg text-on-surface-variant mb-4">
                        Pour avoir démontré une maîtrise exceptionnelle et des résultats remarquables dans le module de formation
                    </p>
<p className="text-2xl md:text-3xl font-bold text-primary px-6 py-3 bg-primary-fixed/30 rounded-xl inline-block">
                        Mathématiques - Analyse de Fonctions
                    </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8 items-center mb-12">
<div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
<p className="text-label-xs font-semibold text-on-surface-variant uppercase">Date de délivrance</p>
<p className="text-body-md font-bold text-on-surface">15 Janvier 2024</p>
<div className="mt-4">
<p className="text-label-xs font-semibold text-on-surface-variant uppercase">ID du certificat</p>
<p className="text-body-md font-mono text-on-surface">ID: EDU-2024-8829</p>
</div>
</div>
<div className="flex justify-center order-1 md:order-2">
<div className="relative w-32 h-32 flex items-center justify-center">
<div className="absolute inset-0 bg-secondary-container rounded-full animate-pulse opacity-20"></div>
<div className="relative z-10 bg-secondary text-on-secondary rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg border-4 border-secondary-fixed">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
<span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Edukora Elite</span>
</div>
</div>
</div>
<div className="flex flex-col items-center md:items-end text-center md:text-right order-3">
<div className="mb-2">
<div className="w-40 h-16 border-b border-outline-variant flex items-end justify-center mb-2">

<div className="w-full h-12 bg-contain bg-center bg-no-repeat opacity-80" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhTXsJQUmc3WHqPC6CWYK7slnsVP1FR0pDgqG9iywvRA412c2Eix5k6sX7-vXpUhY1B-j6I1IsivQrEA1T--sLrFXOzgVkQyF7-07_AG3NpnmPF04Uif7WGY2-jmCliNSSkZgUBWmsn3_7KFxu8o6W8wGZB07piF6EPUFOe6Se-pG5f0S7llsVHnFVahBy-p-LBm98E4ppwkc3Vh7Bk-11yE91Vx-P5En6puHNGj2Cok9sdybyEv2G')"}}></div>
</div>
<p className="text-body-md font-bold text-on-surface">Expert Edukora</p>
<p className="text-label-xs text-on-surface-variant">Direction Académique</p>
</div>
</div>
</div>

<div className="w-full pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-4 text-label-xs text-outline">
<p>Ce certificat est authentifié par Edukora.io</p>
<p>© 2024 Edukora - Plateforme d'Excellence Académique en Côte d'Ivoire</p>
</div>
</div>
</div>

<div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 no-print">
<button className="bg-secondary-container text-on-secondary-container font-headline font-bold px-8 py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
<span className="material-symbols-outlined">download</span>
                Télécharger le PDF
            </button>
<button className="bg-surface-container-highest text-on-surface font-headline font-bold px-8 py-4 rounded-xl shadow-md hover:bg-surface-dim active:scale-95 transition-all flex items-center justify-center gap-3">
<span className="material-symbols-outlined">share</span>
                Partager sur les réseaux sociaux
            </button>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant dark:border-outline shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] no-print">
<div className="flex justify-around items-center h-16 w-full max-w-screen-xl mx-auto">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</div>
</nav>

<div className="fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0 w-80 bg-surface dark:bg-surface-container-low shadow-xl z-[60] transition-transform duration-300 no-print hidden" id="drawer">
<div className="flex flex-col p-4 gap-4 h-full">
<div className="flex items-center gap-4 p-4 border-b border-surface-container">
<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<h3 className="font-headline font-bold text-on-surface">Étudiant Edukora</h3>
<p className="text-label-xs text-on-surface-variant">ID: EDU-2024-88</p>
</div>
</div>
<nav className="flex-1 flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-fixed text-on-secondary-fixed-variant font-bold rounded-lg transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">verified</span>
                    Mes Certificats
                </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">quiz</span>
                    Simulateur d'Examen
                </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">calendar_month</span>
                    Calendrier Scolaire
                </a>
<div className="mt-auto flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">settings</span>
                        Paramètres
                    </a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">help</span>
                        Aide
                    </a>
</div>
</nav>
</div>
</div>
<script>
        // Simple Interaction logic for sharing and downloading
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', (e) =&gt; &#123;
                const text = e.currentTarget.innerText.trim();
                if (text.includes('Télécharger')) &#123;
                    window.print();
                &#125; else if (text.includes('Partager')) &#123;
                    if (navigator.share) &#123;
                        navigator.share(&#123;
                            title: 'Certificat d\'Excellence - Edukora',
                            text: 'Je viens d\'obtenir mon certificat d\'excellence en Mathématiques sur Edukora !',
                            url: window.location.href
                        &#125;).catch(() =&gt; &#123;
                            alert('Partage annulé ou non supporté par votre navigateur.');
                        &#125;);
                    &#125; else &#123;
                        alert('Fonctionnalité de partage non supportée sur ce navigateur.');
                    &#125;
                &#125;
            &#125;);
        &#125;);

        // Atmospheric effect: Subtle floating particles behind the certificate
        const body = document.querySelector('body');
        for(let i = 0; i &lt; 15; i++) &#123;
            const dot = document.createElement('div');
            dot.className = 'fixed bg-primary-fixed-dim rounded-full opacity-10 pointer-events-none no-print';
            const size = Math.random() * 8 + 4;
            dot.style.width = `$&#123;size&#125;px`;
            dot.style.height = `$&#123;size&#125;px`;
            dot.style.left = `$&#123;Math.random() * 100&#125;vw`;
            dot.style.top = `$&#123;Math.random() * 100&#125;vh`;
            dot.style.animation = `float $&#123;Math.random() * 10 + 10&#125;s infinite ease-in-out`;
            body.appendChild(dot);
        &#125;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float &#123;
                0%, 100% &#123; transform: translateY(0) translateX(0); &#125;
                50% &#123; transform: translateY(-50px) translateX(30px); &#125;
            &#125;
        `;
        document.head.appendChild(style);
    </script>

    </div>
  );
}
