import type { Metadata } from "next";

export const metadata: Metadata = { title: "Connexion Sécurisée | Edukora Admin" };

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-background" >

<div className="absolute inset-0 security-pattern pointer-events-none"></div>
<div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-fixed/30 rounded-full blur-[120px] pointer-events-none"></div>
<div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-secondary-fixed/20 rounded-full blur-[100px] pointer-events-none"></div>
<main className="w-full max-w-md px-6 z-10">

<div className="text-center mb-8">
<div className="inline-flex items-center justify-center mb-6">
<img alt="Edukora Logo" className="h-16 w-16 drop-shadow-sm" src="/images/ecran-082.png" />
</div>
<h1 className="font-headline text-3xl font-bold text-primary tracking-tight mb-2">Edukora Admin</h1>
<p className="font-body text-on-surface-variant text-sm font-medium tracking-wide uppercase">Portail Administrateur</p>
</div>

<div className="glass-panel rounded-xl shadow-sm p-8 flex flex-col gap-6">
<div className="flex items-center gap-3 text-primary bg-primary-fixed/50 p-4 rounded-lg">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>shield_person</span>
<span className="text-xs font-semibold uppercase tracking-wider">Accès Sécurisé de Niveau 4</span>
</div>
<form className="flex flex-col gap-5" id="loginForm">

<div className="space-y-1.5">
<label className="block text-sm font-semibold text-on-surface" htmlFor="email">Adresse Email</label>
<div className="relative">
<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
<span className="material-symbols-outlined text-[20px]">alternate_email</span>
</span>
<input className="block w-full pl-10 pr-3 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50" id="email" name="email" placeholder="admin@edukora.ci" required={true} type="email" />
</div>
</div>

<div className="space-y-1.5">
<div className="flex justify-between items-center">
<label className="block text-sm font-semibold text-on-surface" htmlFor="password">Mot de Passe</label>
</div>
<div className="relative">
<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
<span className="material-symbols-outlined text-[20px]">lock</span>
</span>
<input className="block w-full pl-10 pr-10 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50" id="password" name="password" placeholder="••••••••••••" required={true} type="password" />
<button className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>

<div className="space-y-1.5 pt-2 border-t border-outline-variant/30 mt-2">
<div className="flex items-center justify-between">
<label className="block text-sm font-semibold text-on-surface" htmlFor="2fa">Clé de Sécurité / 2FA</label>
<span className="text-[10px] bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded font-bold uppercase">Optionnel</span>
</div>
<div className="relative">
<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
<span className="material-symbols-outlined text-[20px]">key</span>
</span>
<input className="block w-full pl-10 pr-3 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50" id="2fa" name="2fa" placeholder="Code 6 chiffres ou jeton" type="text" />
</div>
<p className="text-[11px] text-outline italic">Requis uniquement si activé sur votre profil.</p>
</div>

<button className="w-full mt-2 bg-secondary text-on-secondary py-3.5 rounded-lg font-bold text-sm uppercase tracking-widest shadow-md hover:bg-secondary-container hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
<span>Connexion Sécurisée</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">verified_user</span>
</button>
</form>
<div className="flex flex-col gap-3 mt-4 items-center">
<a className="text-xs font-semibold text-primary hover:text-primary-container underline underline-offset-4 decoration-primary/30 transition-all" href="#">
                    Mot de passe oublié ?
                </a>
<a className="text-xs font-semibold text-on-surface-variant hover:text-error transition-all flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-[14px]">report</span>
                    Signaler un problème d'accès
                </a>
</div>
</div>

<div className="mt-8 flex justify-center">
<div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-full">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
</span>
<span className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Serveurs Opérationnels - UTC+0</span>
</div>
</div>
</main>

<footer className="mt-auto py-8 px-margin-desktop w-full border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-outline z-10">
<p className="text-[11px] font-medium">© 2024 Edukora Admin - Portail de Sécurité Académique</p>
<div className="flex items-center gap-6">
<a className="text-[11px] font-semibold hover:text-primary transition-colors uppercase tracking-wider" href="#">Protocoles de Sécurité</a>
<a className="text-[11px] font-semibold hover:text-primary transition-colors uppercase tracking-wider" href="#">Assistance</a>
</div>
</footer>
<script>
        // Simple Interaction logic
        document.getElementById('loginForm').addEventListener('submit', function(e) &#123;
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = `
                &lt;svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"&gt;
                  &lt;circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"&gt;&lt;/circle&gt;
                  &lt;path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"&gt;&lt;/path&gt;
                &lt;/svg&gt;
                &lt;span&gt;Authentification...&lt;/span&gt;
            `;
            
            // Mock authentication delay
            setTimeout(() =&gt; &#123;
                btn.classList.replace('bg-secondary', 'bg-tertiary-container');
                btn.classList.add('text-on-tertiary-container');
                btn.innerHTML = `
                    &lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt;
                    &lt;span&gt;Accès Autorisé&lt;/span&gt;
                `;
                console.log('Redirecting to dashboard...');
            &#125;, 2000);
        &#125;);

        // Toggle Password Visibility
        const togglePass = document.querySelector('button[type="button"]');
        const passInput = document.getElementById('password');
        togglePass.addEventListener('click', () =&gt; &#123;
            const isPass = passInput.type === 'password';
            passInput.type = isPass ? 'text' : 'password';
            togglePass.querySelector('span').textContent = isPass ? 'visibility_off' : 'visibility';
        &#125;);
    </script>

    </div>
  );
}
