import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Expert - Invitation WhatsApp" };

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface border-b border-surface-border flex items-center justify-between px-container-padding-mobile md:px-gutter w-full h-16 sticky top-0 z-50">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary font-bold">Invitation WhatsApp</h1>
</div>
<div className="hidden md:flex items-center gap-6">
<span className="font-label-md text-label-md text-on-surface-variant cursor-pointer hover:text-primary transition-colors">Aide</span>
<span className="font-label-md text-label-md text-on-surface-variant cursor-pointer hover:text-primary transition-colors">Paramètres</span>
</div>
</header>
<main className="flex-grow w-full max-w-2xl mx-auto px-container-padding-mobile pt-8 pb-32">

<div className="mb-8">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">Agrandissez votre réseau</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Personnalisez et prévisualisez votre message avant de l'envoyer à vos confrères experts. Votre expertise mérite d'être partagée.</p>
</div>

<div className="relative w-full max-w-sm mx-auto bg-inverse-surface rounded-[3rem] p-3 shadow-2xl border-4 border-surface-container-highest">

<div className="bg-[#075E54] text-white p-4 pt-8 rounded-t-[2.5rem] flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
<span className="material-symbols-outlined text-white">person</span>
</div>
<div>
<p className="font-title-md text-title-md font-bold leading-none">Contact</p>
<p className="text-[10px] opacity-80 mt-1">en ligne</p>
</div>
</div>

<div className="whatsapp-bg h-[400px] overflow-hidden p-4 flex flex-col justify-end">
<div className="flex flex-col items-start max-w-[85%]">
<div className="whatsapp-bubble p-3 mb-1">
<p className="font-body-md text-body-md text-[#111111] leading-snug">
                            Bonjour ! Je fais partie du réseau d'experts <span className="font-bold">Edukora</span> et je pense que ton expertise serait un atout majeur pour certifier nos fiches de révision. Rejoins-nous ici : <span className="text-blue-600 underline">https://edukora.com/expert/ref/jdoe</span>
</p>
<div className="flex justify-end mt-1">
<span className="text-[10px] text-gray-500">14:02</span>
</div>
</div>
</div>
</div>

<div className="bg-[#F0F0F0] p-3 rounded-b-[2.5rem] flex items-center gap-2">
<div className="flex-grow bg-white rounded-full px-4 py-2 text-xs text-gray-400">Tapez un message</div>
<div className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white">
<span className="material-symbols-outlined text-sm">send</span>
</div>
</div>
</div>

<div className="mt-8 bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex items-start gap-4">
<div className="bg-expert-purple/10 p-3 rounded-full">
<span className="material-symbols-outlined text-expert-purple">hub</span>
</div>
<div>
<p className="font-title-md text-title-md text-primary font-bold mb-1">Pourquoi parrainer ?</p>
<p className="font-body-md text-body-md text-on-surface-variant">Chaque expert que vous invitez renforce la qualité académique de notre plateforme. Recevez des crédits de validation supplémentaires pour chaque inscription validée.</p>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-border p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-4 z-50">
<button className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-3 transition-transform duration-150 active:scale-95 shadow-lg">
<span className="material-symbols-outlined">share</span>
<span className="font-title-md text-title-md">Envoyer via WhatsApp</span>
</button>
<button className="w-full md:w-auto px-10 py-4 border border-primary text-primary font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-primary/5 transition-colors duration-200">
<span className="material-symbols-outlined">content_copy</span>
<span className="font-title-md text-title-md">Copier le lien</span>
</button>
</footer>

<nav className="md:hidden fixed bottom-20 left-0 w-full flex justify-around items-center py-2 px-container-padding-mobile bg-surface/90 backdrop-blur-md border-t border-surface-border/50">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">hub</span>
<span className="font-label-md text-label-md">Network</span>
</div>
<div className="flex flex-col items-center justify-center text-primary font-bold">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>mail</span>
<span className="font-label-md text-label-md">Inviter</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for the send button
        const sendBtn = document.querySelector('button.bg-primary');
        sendBtn.addEventListener('click', () =&gt; &#123;
            // Simulated haptic feedback/visual confirmation
            sendBtn.innerHTML = `
                &lt;span class="material-symbols-outlined animate-bounce"&gt;check_circle&lt;/span&gt;
                &lt;span class="font-title-md text-title-md"&gt;Redirection...&lt;/span&gt;
            `;
            setTimeout(() =&gt; &#123;
                console.log("Redirecting to WhatsApp web/app...");
                // In a real app: window.open(`https://wa.me/?text=$&#123;encodeURIComponent(msg)&#125;`);
            &#125;, 800);
        &#125;);

        // Copy link functionality
        const copyBtn = document.querySelector('button.border-primary');
        copyBtn.addEventListener('click', () =&gt; &#123;
            const originalContent = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                &lt;span class="material-symbols-outlined"&gt;check&lt;/span&gt;
                &lt;span class="font-title-md text-title-md"&gt;Copié !&lt;/span&gt;
            `;
            copyBtn.classList.add('bg-impact-emerald', 'text-white', 'border-transparent');
            copyBtn.classList.remove('text-primary', 'border-primary');
            
            setTimeout(() =&gt; &#123;
                copyBtn.innerHTML = originalContent;
                copyBtn.classList.remove('bg-impact-emerald', 'text-white', 'border-transparent');
                copyBtn.classList.add('text-primary', 'border-primary');
            &#125;, 2000);
        &#125;);
    </script>

    </div>
  );
}
