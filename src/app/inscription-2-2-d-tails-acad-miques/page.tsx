import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Finalisation de l'inscription" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-container-padding-mobile md:p-container-padding-desktop" style={{ minHeight: "max(884px, 100dvh)" }}>

<div className="fixed inset-0 overflow-hidden -z-10">
<div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary-container/20 rounded-full blur-3xl opacity-50"></div>
<div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-3xl opacity-50"></div>
</div>

<main className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-surface-border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">

<header className="px-8 pt-8 pb-6 border-b border-surface-border bg-surface-container-low/30">
<div className="flex justify-between items-center mb-6">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-white text-[20px]">school</span>
</div>
<h1 className="font-headline-md text-headline-md text-primary">Edukora</h1>
</div>
<div className="text-right">
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Étape 2 sur 2</p>
<div className="flex gap-1 mt-2 justify-end">
<div className="w-8 h-1.5 rounded-full bg-primary-container/20"></div>
<div className="w-12 h-1.5 rounded-full bg-primary-container"></div>
</div>
</div>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Personnalisez votre parcours</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Dites-nous en plus sur votre cursus académique pour que l'IA puisse adapter vos cours et statistiques.</p>
</header>
<form className="p-8 space-y-8">

<section className="space-y-4">
<label className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">assignment</span>
                    Quel examen préparez-vous ?
                </label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="relative">
<input checked={true} className="hidden custom-radio" id="bac" name="examen" type="radio" value="BAC" />
<label className="flex items-center justify-between p-4 border border-surface-border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low active:scale-[0.98]" htmlFor="bac">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
<span className="font-bold text-primary">B</span>
</div>
<div>
<span className="block font-title-md text-title-md">BAC</span>
<span className="block font-label-md text-label-md text-on-surface-variant">Baccalauréat</span>
</div>
</div>
<span className="material-symbols-outlined text-primary hidden check-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</label>
</div>
<div className="relative">
<input className="hidden custom-radio" id="bepc" name="examen" type="radio" value="BEPC" />
<label className="flex items-center justify-between p-4 border border-surface-border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low active:scale-[0.98]" htmlFor="bepc">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center">
<span className="font-bold text-secondary">BE</span>
</div>
<div>
<span className="block font-title-md text-title-md">BEPC</span>
<span className="block font-label-md text-label-md text-on-surface-variant">Brevet d'Études</span>
</div>
</div>
<span className="material-symbols-outlined text-primary hidden check-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</label>
</div>
</div>
</section>

<section className="space-y-4">
<label className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">category</span>
                    Choisissez votre Série
                </label>
<div className="grid grid-cols-3 gap-3">
<div className="relative">
<input checked={true} className="hidden custom-radio" id="serie-a" name="serie" type="radio" value="A" />
<label className="flex flex-col items-center justify-center p-6 border border-surface-border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low active:scale-[0.98]" htmlFor="serie-a">
<span className="font-metric-num text-metric-num text-primary">A</span>
<span className="font-label-md text-label-md mt-1 text-on-surface-variant">Littéraire</span>
<span className="material-symbols-outlined absolute top-2 right-2 text-primary hidden check-icon text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</label>
</div>
<div className="relative">
<input className="hidden custom-radio" id="serie-c" name="serie" type="radio" value="C" />
<label className="flex flex-col items-center justify-center p-6 border border-surface-border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low active:scale-[0.98]" htmlFor="serie-c">
<span className="font-metric-num text-metric-num text-primary">C</span>
<span className="font-label-md text-label-md mt-1 text-on-surface-variant">Maths/Phys</span>
<span className="material-symbols-outlined absolute top-2 right-2 text-primary hidden check-icon text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</label>
</div>
<div className="relative">
<input className="hidden custom-radio" id="serie-d" name="serie" type="radio" value="D" />
<label className="flex flex-col items-center justify-center p-6 border border-surface-border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low active:scale-[0.98]" htmlFor="serie-d">
<span className="font-metric-num text-metric-num text-primary">D</span>
<span className="font-label-md text-label-md mt-1 text-on-surface-variant">SVT/Phys</span>
<span className="material-symbols-outlined absolute top-2 right-2 text-primary hidden check-icon text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</label>
</div>
</div>
</section>

<section className="space-y-4">
<label className="font-title-md text-title-md text-on-surface flex items-center gap-2" htmlFor="commune">
<span className="material-symbols-outlined text-primary">location_on</span>
                    Votre Commune de résidence
                </label>
<div className="relative">
<select className="w-full h-14 pl-12 pr-4 bg-white border border-surface-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none font-body-md text-on-surface" id="commune">
<option disabled={true} selected={true} value="">Sélectionner une commune</option>
<option value="abobo">Abobo</option>
<option value="adjame">Adjamé</option>
<option value="anyama">Anyama</option>
<option value="attécoubé">Attécoubé</option>
<option value="bingerville">Bingerville</option>
<option value="cocody">Cocody</option>
<option value="koumassi">Koumassi</option>
<option value="marcory">Marcory</option>
<option value="plateau">Plateau</option>
<option value="port-bouet">Port-Bouët</option>
<option value="treichville">Treichville</option>
<option value="yopougon">Yopougon</option>
</select>
<span className="material-symbols-outlined absolute left-4 top-4 text-on-surface-variant">map</span>
<span className="material-symbols-outlined absolute right-4 top-4 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</section>

<div className="pt-4 border-t border-surface-border flex flex-col md:flex-row gap-4 items-center justify-between">
<button className="order-2 md:order-1 text-on-surface-variant font-title-md hover:text-primary transition-colors flex items-center gap-2 px-4 py-2" type="button">
<span className="material-symbols-outlined">arrow_back</span>
                    Retour
                </button>
<button className="order-1 md:order-2 w-full md:w-auto bg-primary text-white font-title-md px-10 py-4 rounded-xl shadow-md hover:bg-primary-container transition-all active:scale-[0.97] flex items-center justify-center gap-3 group" type="submit">
                    Start my journey
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>
</button>
</div>
</form>

<div className="hidden md:block w-full h-48 bg-surface-container relative overflow-hidden">
<div className="absolute inset-0 bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDZ6q2xsFJvL8N5cWsobkE48ASZ54D6fQZRGoGDQGSPAUbOosbO3Wb7-jLx0xP_U7utA1GT6OWGwJqrcANZ8XW1Uzf6RVCGqAg7fIggKLZL4uSU1TsO-ZwlFkZWzX97dMn_ER76jSJBNGOQMqIlg0lgL3y5KsYZd3i7IwLRQdOHCjIr0h0j5jl0H4gmMDz_gF_KarFQgo80i6DHekl2-lnk5pZX1GWuQMpAoqL9CeT4CtyQa1mAn6B')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
</div>
</main>

<footer className="mt-8 text-center">
<p className="font-label-md text-label-md text-on-surface-variant flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
            Propulsé par le moteur IA Edukora
        </p>
</footer>
<script>
        // Simple micro-interaction for form submission
        document.querySelector('form').addEventListener('submit', function(e) &#123;
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Initialisation...';
            btn.classList.add('opacity-80', 'pointer-events-none');
            
            setTimeout(() =&gt; &#123;
                alert('Félicitations ! Votre profil est prêt. Redirection vers votre tableau de bord expert...');
                btn.innerHTML = originalContent;
                btn.classList.remove('opacity-80', 'pointer-events-none');
            &#125;, 1500);
        &#125;);

        // Toggle focus state on select wrapper
        const select = document.getElementById('commune');
        select.addEventListener('focus', () =&gt; &#123;
            select.parentElement.classList.add('ring-2', 'ring-primary/20');
        &#125;);
        select.addEventListener('blur', () =&gt; &#123;
            select.parentElement.classList.remove('ring-2', 'ring-primary/20');
        &#125;);
    </script>

    </div>
  );
}
