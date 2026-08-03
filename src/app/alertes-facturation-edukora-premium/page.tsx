import type { Metadata } from "next";

export const metadata: Metadata = { title: "Alertes Facturation | Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="sticky top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-4">
<button className="p-2 transition-colors duration-200 active:scale-95 hover:bg-primary-container/20 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold tracking-tight">Alertes Facturation</h1>
</div>
<button className="p-2 transition-colors duration-200 active:scale-95 hover:bg-primary-container/20 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined">settings</span>
</button>
</header>
<main className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-8 space-y-6">

<div className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary shadow-sm">
<div className="relative z-10 flex items-start justify-between">
<div>
<h2 className="text-xl font-bold mb-2">Gestion des prélèvements</h2>
<p className="text-on-primary-container/90 text-sm max-w-[80%]">Personnalisez la manière dont vous souhaitez être informé de vos échéances Edukora Premium.</p>
</div>
<span className="material-symbols-outlined text-4xl opacity-50">account_balance_wallet</span>
</div>
<div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
</div>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">notifications_active</span>
</div>
<div>
<h3 className="font-semibold text-lg">Alertes de prélèvement</h3>
<p className="text-on-surface-variant text-sm">Recevoir un rappel avant le débit</p>
</div>
</div>
<div className="relative inline-block w-11 h-6 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="switch-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 top-0.5 left-0.5 transition-transform duration-200 ease-in-out" id="toggle_all" name="toggle_all" type="checkbox" />
<label className="switch-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors duration-200" htmlFor="toggle_all"></label>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline font-bold text-lg text-primary px-1">Canaux de notification</h3>
<div className="grid gap-3">

<label className="flex items-center p-4 bg-surface-container-lowest border border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-primary mr-4">notifications</span>
<div className="flex-1">
<div className="flex items-center gap-2">
<span className="font-semibold">Notifications Push</span>
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Recommandé</span>
</div>
<p className="text-on-surface-variant text-sm">Directement sur votre smartphone</p>
</div>
<input checked={true} className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
</label>

<label className="flex items-center p-4 bg-surface-container-lowest border border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-primary mr-4">mail</span>
<div className="flex-1 text-on-surface">
<span className="font-semibold">E-mail</span>
<p className="text-on-surface-variant text-sm">Récapitulatif envoyé à votre adresse</p>
</div>
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
</label>

<div className="relative overflow-hidden group">
<label className="flex items-center p-4 bg-surface-container-low/50 border border-outline-variant/50 rounded-xl cursor-not-allowed grayscale opacity-70">
<span className="material-symbols-outlined text-primary mr-4">sms</span>
<div className="flex-1">
<div className="flex items-center gap-2">
<span className="font-semibold">SMS</span>
<span className="bg-secondary text-on-secondary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Premium Plus</span>
</div>
<p className="text-on-surface-variant text-sm">Alerte par message texte local</p>
</div>
<span className="material-symbols-outlined text-outline">lock</span>
</label>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline font-bold text-lg text-primary px-1">Délai de prévenance</h3>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="flex flex-col">
<label className="flex items-center justify-between p-4 border-b border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
<span className="font-medium">24 heures avant le débit</span>
<input checked={true} className="w-5 h-5 border-outline text-primary focus:ring-primary" name="delay" type="radio" value="24" />
</label>
<label className="flex items-center justify-between p-4 border-b border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
<span className="font-medium">48 heures avant le débit</span>
<input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="delay" type="radio" value="48" />
</label>
<label className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container transition-colors">
<div className="flex flex-col">
<span className="font-medium">1 semaine avant</span>
<span className="text-xs text-on-surface-variant italic">Conseillé pour les plans annuels</span>
</div>
<input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="delay" type="radio" value="week" />
</label>
</div>
</div>
</section>

<div className="bg-secondary-fixed/30 border-l-4 border-secondary p-4 rounded-r-lg flex gap-3 items-start">
<span className="material-symbols-outlined text-secondary">info</span>
<p className="text-sm text-on-secondary-fixed-variant leading-relaxed">
                Nous vous préviendrons avant chaque prélèvement automatique de <span className="font-bold">1 000 FCFA</span> pour que vous gardiez le contrôle sur votre budget et votre apprentissage.
            </p>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant p-4 flex justify-center z-50">
<button className="w-full max-w-lg bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-headline font-bold py-4 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-secondary/20" id="saveBtn">
            Enregistrer les préférences
            <span className="material-symbols-outlined">save</span>
</button>
</footer>

<nav className="fixed bottom-0 left-0 w-full z-40 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-md flex justify-around items-center px-4 py-2 pb-safe md:hidden opacity-0 translate-y-full pointer-events-none transition-all" id="mainNav">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 transition-all duration-300 ease-in-out active:scale-90">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 transition-all duration-300 ease-in-out active:scale-90">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant/80 transition-all duration-300 ease-in-out active:scale-90">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">Tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 transition-all duration-300 ease-in-out active:scale-90">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Micro-interactions
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.addEventListener('click', () =&gt; &#123;
            const originalContent = saveBtn.innerHTML;
            saveBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;progress_activity&lt;/span&gt; Enregistrement...';
            saveBtn.disabled = true;
            
            setTimeout(() =&gt; &#123;
                saveBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Modifié avec succès';
                saveBtn.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                saveBtn.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
                
                setTimeout(() =&gt; &#123;
                    saveBtn.innerHTML = originalContent;
                    saveBtn.classList.replace('bg-tertiary-container', 'bg-secondary-container');
                    saveBtn.classList.replace('text-on-tertiary-container', 'text-on-secondary-container');
                    saveBtn.disabled = false;
                &#125;, 2000);
            &#125;, 1200);
        &#125;);

        // Switch handling logic for visual feedback
        const toggleAll = document.getElementById('toggle_all');
        const options = document.querySelectorAll('input[name="delay"], input[type="checkbox"]:not(#toggle_all)');
        
        toggleAll.addEventListener('change', (e) =&gt; &#123;
            const opacity = e.target.checked ? '1' : '0.5';
            const pointerEvents = e.target.checked ? 'auto' : 'none';
            
            document.querySelectorAll('section:not(:first-of-type)').forEach(section =&gt; &#123;
                section.style.opacity = opacity;
                section.style.pointerEvents = pointerEvents;
                section.style.transition = 'all 0.3s ease';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
