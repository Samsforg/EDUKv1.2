import type { Metadata } from "next";

export const metadata: Metadata = { title: "Connexion | Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-4" style={{ minHeight: "max(884px, 100dvh)" }}>
<main className="w-full max-cols-4 md:max-w-md bg-white rounded-xl border border-surface-border p-8 md:p-12 shadow-sm relative overflow-hidden">

<div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

<div className="flex flex-col items-center mb-10">
<div className="w-16 h-16 bg-primary-container rounded-lg flex items-center justify-center mb-4 text-white">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">Edukora</h1>
</div>

<div className="text-center mb-8">
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Ravi de vous revoir</h2>
<p className="font-body-md text-on-surface-variant">Connectez-vous à votre tableau de bord professeur pour gérer vos indicateurs et validations.</p>
</div>

<form className="space-y-6">

<div className="space-y-1">
<label className="block font-body-md font-bold text-on-surface" htmlFor="identifier">Email ou Numéro de téléphone</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
<input className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-surface-container-lowest" id="identifier" name="identifier" placeholder="professeur@edukora.edu" type="text" />
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between items-center">
<label className="block font-body-md font-bold text-on-surface" htmlFor="password">Mot de passe</label>
<a className="font-label-md text-primary hover:underline transition-all" href="#">Mot de passe oublié ?</a>
</div>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
<input className="w-full pl-10 pr-12 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-surface-container-lowest" id="password" name="password" placeholder="••••••••" type="password" />
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button">
<span className="material-symbols-outlined" id="visibility-icon">visibility</span>
</button>
</div>
</div>

<button className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:bg-primary transition-all active:scale-[0.98] duration-100 flex items-center justify-center gap-2" type="submit">
                Se connecter
                <span className="material-symbols-outlined text-lg">login</span>
</button>

<div className="relative flex items-center py-4">
<div className="flex-grow border-t border-outline-variant"></div>
<span className="flex-shrink mx-4 font-label-md text-outline uppercase tracking-widest">OU CONTINUER AVEC</span>
<div className="flex-grow border-t border-outline-variant"></div>
</div>

<div className="grid grid-cols-2 gap-4">
<button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-outline-variant rounded-lg font-body-md font-bold hover:bg-surface-container transition-all active:scale-95" type="button">
<svg className="w-5 h-5" viewBox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
</svg>
                    Google
                </button>
<button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-outline-variant rounded-lg font-body-md font-bold hover:bg-surface-container transition-all active:scale-95" type="button">
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.3 16.92 3.75 10.1 7.2 9.77c1.32.13 2.18.92 2.94.92.73 0 1.95-.98 3.44-.86 1.83.14 3.19 1 3.94 2.33-3.73 1.96-3.14 7.15.57 8.12zm-3.92-12.16c-.03-2.13 1.76-3.96 3.8-4.12.22 2.45-2.18 4.35-3.8 4.12z" />
</svg>
                    Apple
                </button>
</div>

<div className="text-center pt-4">
<p className="font-body-md text-on-surface-variant">
                    Nouveau sur Edukora ? 
                    <a className="text-primary font-bold hover:underline" href="#">Créer un compte</a>
</p>
</div>
</form>

<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
<div className="absolute -top-10 -left-10 w-32 h-32 bg-expert-purple/5 rounded-full blur-3xl"></div>
</main>

<aside className="hidden lg:flex flex-col justify-center ml-12 max-w-lg space-y-8">
<div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
<div className="flex items-center gap-4 mb-4">
<div className="p-2 bg-expert-purple/10 rounded-lg">
<span className="material-symbols-outlined text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<h3 className="font-title-md text-on-surface">Autorité Pédagogique</h3>
</div>
<p className="font-body-md text-on-surface-variant">Accédez à vos files d'attente de validation et aux indicateurs d'impact haute densité avec un espace de travail conçu pour les intellectuels et les experts.</p>
</div>

<div className="bg-white p-6 rounded-xl border border-surface-border shadow-sm">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-outline uppercase tracking-wider">File d'attente</span>
<span className="text-impact-emerald font-bold font-body-md">+12%</span>
</div>
<div className="flex items-baseline gap-2">
<span className="font-metric-num text-metric-num text-on-surface">432</span>
<span className="font-body-md text-on-surface-variant">Cours révisés</span>
</div>
<div className="mt-4 w-full bg-surface-container rounded-full h-1.5">
<div className="bg-impact-emerald h-1.5 rounded-full" style={{"width":"78%"}}></div>
</div>
</div>
<div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-083.png" alt="Une photographie professionnelle et haut de gamme d'un espace architectural universitaire moderne avec des lignes épurées et une lumière naturelle douce." />
<div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
</div>
</aside>
<script>
        function togglePassword() &#123;
            const passwordInput = document.getElementById('password');
            const visibilityIcon = document.getElementById('visibility-icon');
            if (passwordInput.type === 'password') &#123;
                passwordInput.type = 'text';
                visibilityIcon.innerText = 'visibility_off';
            &#125; else &#123;
                passwordInput.type = 'password';
                visibilityIcon.innerText = 'visibility';
            &#125;
        &#125;

        // Lightweight atmospheric effect: mouse track glow
        document.addEventListener('mousemove', (e) =&gt; &#123;
            const main = document.querySelector('main');
            const rect = main.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only update if inside or very close
            if (x &gt; -100 &amp;&amp; x &lt; rect.width + 100 &amp;&amp; y &gt; -100 &amp;&amp; y &lt; rect.height + 100) &#123;
                main.style.boxShadow = `0 4px 20px rgba(0, 71, 171, 0.05), $&#123;x/10&#125;px $&#123;y/10&#125;px 30px rgba(99, 102, 241, 0.03)`;
            &#125;
        &#125;);
    </script>

    </div>
  );
}
