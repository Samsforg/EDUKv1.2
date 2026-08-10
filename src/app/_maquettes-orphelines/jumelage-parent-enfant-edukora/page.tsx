import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Jumelage Parent-Enfant" };

export default function Page() {
  return (
    <div className="text-on-background min-h-screen flex flex-col" >

<header className="fixed top-0 w-full z-50 shadow-sm bg-primary dark:bg-primary-container flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="h-10 w-10 rounded-lg bg-white p-1" src="/images/ecran-199.png" />
<h1 className="font-headline text-2xl font-bold text-on-primary">Edukora Parent</h1>
</div>
<div className="flex items-center gap-2">
<button className="p-2 rounded-full hover:bg-primary-container/20 transition-colors duration-200 text-on-primary">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center border-2 border-on-primary">
<span className="material-symbols-outlined text-on-secondary-fixed text-sm">person</span>
</div>
</div>
</header>

<main className="flex-grow pt-24 pb-12 px-4 max-w-2xl mx-auto w-full">

<section className="text-center mb-10">
<div className="inline-flex items-center justify-center w-16 h-16 bg-primary-fixed rounded-2xl mb-6">
<span className="material-symbols-outlined text-primary text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>family_restroom</span>
</div>
<h2 className="font-headline text-3xl font-bold text-primary mb-4">Jumelage Parent-Enfant</h2>
<p className="text-on-surface-variant text-lg leading-relaxed px-2">
                Suivez la réussite de votre enfant en temps réel. Entrez le code de jumelage généré par l'application de votre enfant pour commencer.
            </p>
</section>

<div className="bg-white rounded-xl shadow-md border border-outline-variant p-6 mb-8">
<form className="space-y-6" id="pairingForm">
<div>
<label className="block text-sm font-semibold text-on-surface-variant mb-2" htmlFor="pairing_code">Code de jumelage (6 caractères)</label>
<div className="relative">
<input className="pairing-input block w-full px-5 py-4 text-2xl font-bold tracking-[0.5em] text-center uppercase bg-surface border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-0 transition-all duration-200 placeholder:opacity-30" id="pairing_code" maxLength={6} placeholder="A1B2C3" type="text" />
<div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined">vpn_key</span>
</div>
</div>
</div>
<button className="w-full py-4 bg-primary text-on-primary font-bold text-lg rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2" type="submit">
                    Valider le jumelage
                    <span className="material-symbols-outlined">arrow_forward</span>
</button>
</form>
<div className="mt-6 flex justify-center">
<button className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
                    Plus tard, explorer l'interface
                </button>
</div>
</div>

<section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/50">
<h3 className="font-headline text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">help</span>
                Où trouver ce code ?
            </h3>
<div className="space-y-8 relative">

<div className="flex gap-6 relative z-10">
<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">1</div>
<div className="flex-grow">
<h4 className="font-bold text-on-surface mb-1">Ouvrez l'application Edukora</h4>
<p className="text-sm text-on-surface-variant">Sur le téléphone ou la tablette de votre enfant, lancez l'application Edukora Apprenant.</p>
<div className="mt-3 overflow-hidden rounded-lg border border-outline-variant aspect-video relative">
<img className="w-full h-full object-cover" src="/images/ecran-200.png" alt="A clean UI mockup of a mobile learning application interface on a tablet screen, showing a dashboard with bright colors and a large avatar in the top right corner. The style is modern academic with a focus on ease of use. Soft studio lighting on the device." />
</div>
</div>
</div>

<div className="step-line"></div>

<div className="flex gap-6 relative z-10">
<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">2</div>
<div className="flex-grow">
<h4 className="font-bold text-on-surface mb-1">Profil &gt; Jumelage</h4>
<p className="text-sm text-on-surface-variant">Allez dans l'onglet 'Profil' et cliquez sur le bouton 'Générer un code de jumelage'.</p>
<div className="mt-3 overflow-hidden rounded-lg border border-outline-variant aspect-video relative">
<img className="w-full h-full object-cover" src="/images/ecran-201.png" alt="A macro shot of a smartphone screen displaying a user profile section in an educational app. A large orange button clearly displays a 6-digit alphanumeric code. The background is a crisp white interface with academic blue accents. High clarity and professional mobile UI design." />
</div>
</div>
</div>
</div>
</section>
</main>

<div className="fixed inset-0 z-[100] bg-on-background/40 backdrop-blur-sm flex items-center justify-center p-4 hidden opacity-0 transition-opacity duration-300" id="successModal">
<div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl scale-95 transition-transform duration-300">
<div className="w-20 h-20 bg-tertiary-container rounded-full flex items-center justify-center mx-auto mb-6">
<span className="material-symbols-outlined text-on-tertiary-container text-5xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Jumelage Réussi !</h3>
<p className="text-on-surface-variant mb-8">Vous êtes maintenant connecté au compte de votre enfant. Vous pouvez suivre ses progrès dès maintenant.</p>
<button className="w-full py-4 bg-tertiary text-on-tertiary font-bold rounded-xl hover:bg-tertiary-container transition-colors">
                Accéder au tableau de bord
            </button>
</div>
</div>

<script>
        const form = document.getElementById('pairingForm');
        const modal = document.getElementById('successModal');
        const codeInput = document.getElementById('pairing_code');

        form.addEventListener('submit', (e) =&gt; &#123;
            e.preventDefault();
            if (codeInput.value.length === 6) &#123;
                // Simulate success
                modal.classList.remove('hidden');
                setTimeout(() =&gt; &#123;
                    modal.classList.remove('opacity-0');
                    modal.querySelector('div').classList.remove('scale-95');
                &#125;, 10);
            &#125; else &#123;
                // Visual feedback for error
                codeInput.classList.add('border-error');
                codeInput.classList.add('shake');
                setTimeout(() =&gt; codeInput.classList.remove('shake'), 500);
            &#125;
        &#125;);

        function closeModal() &#123;
            modal.classList.add('opacity-0');
            modal.querySelector('div').classList.add('scale-95');
            setTimeout(() =&gt; &#123;
                modal.classList.add('hidden');
                window.location.reload(); // Simulate going to dashboard
            &#125;, 300);
        &#125;

        // Auto-focus on load
        window.onload = () =&gt; &#123;
            codeInput.focus();
        &#125;;
    </script>
<style>
        @keyframes shake &#123;
            0%, 100% &#123; transform: translateX(0); &#125;
            25% &#123; transform: translateX(-8px); &#125;
            75% &#123; transform: translateX(8px); &#125;
        &#125;
        .shake &#123; animation: shake 0.2s ease-in-out 0s 2; &#125;
        .border-error &#123; border-color: #ba1a1a !important; &#125;
    </style>

    </div>
  );
}
