import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Vérification Biométrique" };

export default function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background border-b border-surface-border dark:border-outline-variant flex items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full sticky top-0 z-50">
<button className="text-primary dark:text-primary-fixed mr-4 active:opacity-80 transition-opacity">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Vérification d'identité</h1>
</header>

<main className="flex-grow flex flex-col lg:flex-row h-full overflow-hidden">

<aside className="hidden lg:flex flex-col h-full border-r border-surface-border w-[280px] bg-surface dark:bg-on-background shrink-0">
<div className="p-6 flex flex-col items-start">
<div className="w-16 h-16 rounded-full bg-primary-container mb-4 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-370.png" alt="A professional portrait of Dr. Aris Thorne, an elderly male academic with gray hair and glasses, wearing a sharp charcoal suit and tie. He has a serious but kind expression, set against a soft-focus background of a prestigious university library with mahogany shelves. High-end editorial photography style with cinematic lighting." />
</div>
<h2 className="font-title-md text-title-md font-bold">Dr. Aris Thorne</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Subject Matter Expert</p>
<div className="mt-2 inline-flex items-center px-2 py-1 bg-expert-purple/10 text-expert-purple rounded-full text-[10px] font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-[12px] mr-1" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
                    Vérification en cours
                </div>
</div>
<nav className="flex-grow space-y-1">
<a className="flex items-center px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-full mx-2 font-body-md text-body-md transition-all" href="#">
<span className="material-symbols-outlined mr-3">dashboard</span> Overview
                </a>
<a className="flex items-center px-4 py-3 bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-on-secondary-fixed rounded-full mx-2 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined mr-3">badge</span> Vérification d'identité
                </a>
<a className="flex items-center px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-full mx-2 font-body-md text-body-md transition-all" href="#">
<span className="material-symbols-outlined mr-3">school</span> Academic Credentials
                </a>
<a className="flex items-center px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-full mx-2 font-body-md text-body-md transition-all" href="#">
<span className="material-symbols-outlined mr-3">lock</span> Paramètres de sécurité
                </a>
</nav>
</aside>

<section className="flex-grow flex flex-col items-center justify-center p-container-padding-mobile md:p-container-padding-desktop bg-[#f8fafc]">
<div className="max-w-xl w-full flex flex-col items-center text-center">

<div className="mb-8">
<h2 className="font-headline-lg text-headline-lg text-primary mb-2">Vérification Biométrique</h2>
<p className="font-body-lg text-body-lg text-outline">Placez votre visage au centre du cadre pour confirmer qu'il s'agit bien de vous.</p>
</div>

<div className="w-full grid grid-cols-1 gap-gutter">

<div className="glass-card rounded-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[440px]">

<div className="absolute inset-0 opacity-10 pointer-events-none">

</div>

<div className="relative biometric-scanner-ring w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8">
<div className="absolute inset-0 rounded-full border-4 border-primary-container/20"></div>

<div className="w-full h-full rounded-full overflow-hidden bg-surface-container relative">
<div className="w-full h-full bg-cover bg-center opacity-60" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuATA2J8JPjXeYvddQ6dWRsZjgXyNp0KRMKYLdSRaZSCY6v2Q-VkTzi8rCd_kZ1HF-UOYKiKAzfeHLU5oMOSJhfYNPLkHIDNxEajCJRMeGVRlklFMVTTWksYf0g61JdRl3RzD7eCh_OC5ImlRRNgVs2nlU8TebXJr9CFkK07T3dJywTcyQHywpTJtWl3hRGC2mc1f0QM_YdPrbf0uWZzcvSNc5qERVjMU1wuvRys8CVSiB9-t_cAr8vX')"}}></div>

<div className="absolute inset-0 flex items-center justify-center">
<svg className="w-3/4 h-3/4 text-primary opacity-40" viewBox="0 0 200 200">
<path d="M100,20c-30,0-55,25-55,55c0,20,10,40,25,50v15c0,10,10,20,20,25s10,5,10,5s0-0.5,10-5s20-15,20-25v-15c15-10,25-30,25-50C155,45,130,20,100,20z M100,135c-20,0-35-15-35-35c0-10,5-20,15-25V60c0-10,10-20,20-20s20,10,20,20v15c10,5,15,15,15,25C135,120,120,135,100,135z" fill="currentColor" />
</svg>
</div>

<div className="scan-line"></div>
</div>

<div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
<div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
<div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
<div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
</div>

<div className="w-full space-y-4 relative z-10">
<button className="w-full bg-primary-container text-on-primary hover:bg-primary transition-all font-bold py-4 rounded-xl shadow-lg flex items-center justify-center group active:scale-95 duration-150" id="captureBtn">
<span className="material-symbols-outlined mr-2 group-hover:rotate-12 transition-transform">photo_camera</span>
                                Capturer mon selfie
                            </button>
<div className="flex items-center justify-center text-impact-emerald font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px] mr-1" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
                                Chiffrement biométrique sécurisé
                            </div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg flex items-start space-x-4">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined">light_mode</span>
</div>
<div className="text-left">
<p className="font-title-md text-title-md mb-1">Éclairage Optimal</p>
<p className="font-body-md text-body-md text-outline">Assurez-vous d'être dans un endroit bien éclairé pour une détection rapide.</p>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg flex items-start space-x-4">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined">face_retouching_natural</span>
</div>
<div className="text-left">
<p className="font-title-md text-title-md mb-1">Visage Dégagé</p>
<p className="font-body-md text-body-md text-outline">Retirez vos lunettes de soleil ou tout couvre-chef masquant vos traits.</p>
</div>
</div>
</div>
</div>

<p className="mt-8 font-label-md text-label-md text-outline-variant max-w-sm">
                    Les données biométriques sont traitées localement et immédiatement supprimées après validation de l'identité. Edukora respecte les normes RGPD.
                </p>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface dark:bg-on-background px-4 pb-safe border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant hover:bg-surface-container-low transition-colors px-2 py-1" href="#">
<span className="material-symbols-outlined">doorbell</span>
<span className="font-label-md text-label-md">Bienvenue</span>
</a>
<a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant hover:bg-surface-container-low transition-colors px-2 py-1" href="#">
<span className="material-symbols-outlined">id_card</span>
<span className="font-label-md text-label-md">Documents</span>
</a>
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold px-2 py-1" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>face</span>
<span className="font-label-md text-label-md">Biometrics</span>
</a>
<a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant hover:bg-surface-container-low transition-colors px-2 py-1" href="#">
<span className="material-symbols-outlined">verified</span>
<span className="font-label-md text-label-md">Statut</span>
</a>
</nav>
<script>
        // Micro-interaction for capture button
        const captureBtn = document.getElementById('captureBtn');
        if (captureBtn) &#123;
            captureBtn.addEventListener('click', () =&gt; &#123;
                const icon = captureBtn.querySelector('.material-symbols-outlined');
                icon.textContent = 'hourglass_empty';
                captureBtn.classList.add('opacity-80');
                captureBtn.innerText = 'Traitement en cours...';
                
                // Simulate processing
                setTimeout(() =&gt; &#123;
                    captureBtn.innerHTML = '&lt;span class="material-symbols-outlined mr-2"&gt;check_circle&lt;/span&gt; Vérifié';
                    captureBtn.classList.remove('bg-primary-container');
                    captureBtn.classList.add('bg-impact-emerald');
                &#125;, 2000);
            &#125;);
        &#125;
    </script>

    </div>
  );
}
