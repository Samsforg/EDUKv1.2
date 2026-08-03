import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Connexion Expert" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex items-center px-4 md:px-8 h-16 w-full bg-surface border-b border-surface-border sticky top-0 z-50">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[32px]">school</span>
<span className="font-headline text-2xl font-extrabold text-primary tracking-tight">Edukora</span>
</div>
<div className="ml-auto">
<a className="text-label-sm font-semibold text-primary hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors" href="#">
                Contacter l'assistance
            </a>
</div>
</header>
<main className="flex-grow flex items-center justify-center p-4 md:p-8">
<div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

<div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-12 expert-gradient rounded-xl text-on-primary relative overflow-hidden">

<div className="absolute inset-0 opacity-10 pointer-events-none" style={{"backgroundImage":"radial-gradient(circle at 2px 2px, white 1px, transparent 0)","backgroundSize":"24px 24px"}}></div>
<div className="relative z-10">
<span className="inline-flex items-center gap-2 bg-on-primary/10 border border-on-primary/20 rounded-full px-4 py-1 text-label-xs mb-8 uppercase tracking-widest">
<span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
                        Expert Faculty Portal
                    </span>
<h1 className="font-display text-5xl font-bold leading-tight mb-6">
                        Shape the Future of <br />Ivorian Excellence.
                    </h1>
<p className="text-on-primary-container text-body-lg max-w-md">
                        Access your pedagogical tools, monitor student progress in real-time, and refine the BEPC/BAC preparation experience with AI-driven insights.
                    </p>
</div>
<div className="relative z-10 mt-12 grid grid-cols-2 gap-6">
<div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg bento-shadow">
<div className="text-3xl font-bold mb-1">15k+</div>
<div className="text-label-sm opacity-80">Students Guided</div>
</div>
<div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg bento-shadow">
<div className="text-3xl font-bold mb-1">98%</div>
<div className="text-label-sm opacity-80">Success Rate</div>
</div>
</div>

<div className="absolute bottom-[-10%] right-[-5%] w-2/3 h-2/3 opacity-20 pointer-events-none">
<img className="w-full h-full object-contain" src="/images/ecran-084.png" alt="A professional portrait of a confident West African educator in a modern academic setting, looking thoughtfully at a digital tablet. The background is a blurred university library with soft, warm golden hour lighting and Academic Blue architectural details. The image evokes deep trust, pedagogical authority, and national pride." />
</div>
</div>

<div className="lg:col-span-5 flex flex-col justify-center">
<div className="bg-surface-container-lowest border border-outline-variant p-8 md:p-12 rounded-xl bento-shadow">
<div className="mb-8">
<h2 className="font-display text-2xl font-bold text-primary mb-2">Vérification d'identité</h2>
<p className="text-on-surface-variant text-body-md">Bon retour, Expert. Saisissez vos identifiants pour accéder au tableau de bord professeur.</p>
</div>
<form className="space-y-6">

<div className="group">
<label className="block text-label-sm font-semibold text-on-surface mb-2 transition-colors group-focus-within:text-primary" htmlFor="email">
                                Adresse e-mail professionnelle
                            </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
<input className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md" id="email" name="email" placeholder="name@edukora.ci" required={true} type="email" />
</div>
</div>

<div className="group">
<label className="block text-label-sm font-semibold text-on-surface mb-2 transition-colors group-focus-within:text-primary" htmlFor="password">
                                Mot de passe
                            </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
<input className="w-full pl-10 pr-12 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md" id="password" name="password" placeholder="••••••••" required={true} type="password" />
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<div className="flex items-center justify-between">
<label className="flex items-center cursor-pointer select-none">
<input className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" type="checkbox" />
<span className="ml-2 text-label-sm text-on-surface-variant">Keep me logged in</span>
</label>
<a className="text-label-sm font-semibold text-primary hover:underline" href="#">Mot de passe oublié ?</a>
</div>
<button className="w-full bg-secondary-container text-on-secondary-container font-bold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg" type="submit">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>login</span>
                            Connexion Expert
                        </button>
</form>
<div className="mt-8 pt-8 border-t border-outline-variant text-center">
<p className="text-body-md text-on-surface-variant mb-4">Are you a qualified educator looking to join?</p>
<a className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-6 py-3 rounded-lg hover:bg-primary-fixed transition-colors w-full justify-center" href="#">
<span className="material-symbols-outlined">assignment_ind</span>
                            Apply as an Expert
                        </a>
</div>
</div>
<div className="mt-6 flex justify-center gap-4 text-label-xs text-outline font-medium">
<a className="hover:text-primary transition-colors" href="#">Politique de sécurité</a>
<span className="text-outline-variant">•</span>
<a className="hover:text-primary transition-colors" href="#">Teaching Guidelines</a>
<span className="text-outline-variant">•</span>
<a className="hover:text-primary transition-colors" href="#">Help Center</a>
</div>
</div>
</div>
</main>

<footer className="p-6 text-center text-label-xs text-outline-variant">
<p>© 2024 Edukora Côte d'Ivoire. Academic Excellence Secured. v2.4.0-faculty</p>
</footer>
<script>
        // Micro-interactions for input focus
        document.querySelectorAll('input').forEach(input =&gt; &#123;
            input.addEventListener('focus', () =&gt; &#123;
                input.parentElement.parentElement.classList.add('scale-[1.01]');
            &#125;);
            input.addEventListener('blur', () =&gt; &#123;
                input.parentElement.parentElement.classList.remove('scale-[1.01]');
            &#125;);
        &#125;);

        // Form submission ripple simulation
        const form = document.querySelector('form');
        form.addEventListener('submit', (e) =&gt; &#123;
            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;progress_activity&lt;/span&gt; Authenticating...';
            setTimeout(() =&gt; &#123;
                btn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;verified&lt;/span&gt; Welcome, Dr. Thorne';
                btn.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                btn.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
            &#125;, 1500);
        &#125;);
    </script>

    </div>
  );
}
