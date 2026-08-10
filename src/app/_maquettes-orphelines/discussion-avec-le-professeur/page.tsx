import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Messagerie" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-surface flex flex-col h-screen overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 glass-header border-b border-outline-variant h-16 flex items-center px-4 justify-between">
<div className="flex items-center gap-3">
<button className="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<div className="relative">
<div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-122.png" alt="A professional headshot of an African male teacher in his late 40s, wearing a crisp white shirt and a blue blazer. He has a warm, trustworthy smile and is set against a blurred academic background with bookshelves. The lighting is soft and natural, emphasizing a high-end corporate educational aesthetic with clear skin textures and professional color grading." />
</div>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-container border-2 border-surface rounded-full"></div>
</div>
<div className="flex flex-col">
<span className="font-headline text-on-surface font-semibold leading-tight">M. Koffi</span>
<span className="text-label-xs text-tertiary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    En ligne
                </span>
</div>
</div>
<div className="flex items-center gap-1">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined text-primary">call</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined text-primary">more_vert</span>
</button>
</div>
</header>

<main className="flex-1 overflow-y-auto pt-20 pb-24 px-4 space-y-6 hide-scrollbar" id="chat-container">

<div className="flex justify-center">
<span className="bg-surface-container-low px-3 py-1 rounded-full text-label-xs text-on-surface-variant uppercase tracking-wider">Aujourd'hui</span>
</div>

<div className="flex items-end gap-2 max-w-[85%] animate-fade-in">
<div className="flex flex-col gap-1">
<div className="bg-surface-container-highest text-on-surface p-3 rounded-xl rounded-bl-none message-shadow">
<p className="text-body-md">Bonjour M. Bakayoko, j'ai bien reçu les exercices de Moussa. Voici le compte-rendu de son dernier test blanc.</p>
</div>
<span className="text-label-xs text-outline ml-1">09:15</span>
</div>
</div>

<div className="flex items-end gap-2 max-w-[85%]">
<div className="flex flex-col gap-1 w-full">
<div className="bg-surface-container-highest p-3 rounded-xl rounded-bl-none message-shadow border border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>description</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<span className="text-label-sm font-semibold truncate">Résultat d'Examen - Moussa.pdf</span>
<span className="text-label-xs text-on-surface-variant">2.4 MB • PDF</span>
</div>
<span className="material-symbols-outlined text-outline">download</span>
</div>
</div>
<span className="text-label-xs text-outline ml-1">09:16</span>
</div>
</div>

<div className="flex flex-row-reverse items-end gap-2 max-w-[85%] ml-auto">
<div className="flex flex-col items-end gap-1">
<div className="bg-primary text-on-primary p-3 rounded-xl rounded-br-none message-shadow">
<p className="text-body-md">Merci M. Koffi. Je regarde cela tout de suite. Pensez-vous qu'il ait besoin de cours de soutien supplémentaires en Mathématiques ?</p>
</div>
<div className="flex items-center gap-1 mr-1">
<span className="text-label-xs text-outline">09:22</span>
<span className="material-symbols-outlined text-[16px] text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>done_all</span>
</div>
</div>
</div>

<div className="flex flex-row-reverse items-end gap-2 max-w-[85%] ml-auto">
<div className="flex flex-col items-end gap-1 w-full">
<div className="bg-primary text-on-primary p-3 rounded-xl rounded-br-none message-shadow border border-primary-container hover:brightness-110 transition-all cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-on-primary-container/20 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>auto_stories</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<span className="text-label-sm font-semibold truncate">Fiche de Révision - Algebre.pdf</span>
<span className="text-label-xs text-on-primary-container/80">1.8 MB • PDF</span>
</div>
<span className="material-symbols-outlined text-on-primary">visibility</span>
</div>
</div>
<div className="flex items-center gap-1 mr-1">
<span className="text-label-xs text-outline">09:25</span>
<span className="material-symbols-outlined text-[16px] text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>done_all</span>
</div>
</div>
</div>

<div className="flex items-end gap-2 max-w-[85%]">
<div className="flex flex-col gap-1">
<div className="bg-surface-container-highest text-on-surface p-3 rounded-xl rounded-bl-none message-shadow">
<p className="text-body-md">Il progresse bien, mais une heure supplémentaire par semaine sur les fonctions linéaires serait idéale pour sécuriser son BAC.</p>
</div>
<span className="text-label-xs text-outline ml-1">09:30</span>
</div>
</div>
</main>

<div className="fixed bottom-20 left-0 w-full px-4 overflow-x-auto hide-scrollbar pb-2 z-40 bg-gradient-to-t from-background to-transparent">
<div className="flex gap-2 whitespace-nowrap">
<button className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-full text-label-sm font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 shadow-sm">
                Proposer un créneau
            </button>
<button className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-full text-label-sm font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 shadow-sm">
                Demander un rdv
            </button>
<button className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-full text-label-sm font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 shadow-sm">
                Envoyer un devoir
            </button>
</div>
</div>

<footer className="fixed bottom-0 w-full bg-surface border-t border-outline-variant px-4 pt-3 pb-safe z-50">
<div className="flex items-center gap-2 pb-3">
<button className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90">
<span className="material-symbols-outlined">attach_file</span>
</button>
<div className="flex-1 bg-surface-container-low rounded-xl border border-outline-variant px-4 py-2.5 focus-within:border-primary focus-within:bg-surface transition-all">
<input className="w-full bg-transparent border-none focus:ring-0 text-body-md p-0 placeholder:text-outline" placeholder="Écrire un message..." type="text" />
</div>
<button className="w-10 h-10 flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-full shadow-lg active:scale-90 transition-transform" id="send-btn">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>send</span>
</button>
</div>
</footer>
<script>
        // Micro-interactions for the chat
        const input = document.querySelector('input');
        const sendBtn = document.getElementById('send-btn');
        const chatContainer = document.getElementById('chat-container');

        // Auto-scroll to bottom on load
        window.onload = () =&gt; &#123;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        &#125;;

        // Simulated send behavior
        sendBtn.onclick = () =&gt; &#123;
            if (input.value.trim() !== "") &#123;
                const msg = input.value;
                const msgDiv = document.createElement('div');
                msgDiv.className = "flex flex-row-reverse items-end gap-2 max-w-[85%] ml-auto animate-fade-in";
                msgDiv.innerHTML = `
                    &lt;div class="flex flex-col items-end gap-1"&gt;
                        &lt;div class="bg-primary text-on-primary p-3 rounded-xl rounded-br-none message-shadow"&gt;
                            &lt;p class="text-body-md"&gt;$&#123;msg&#125;&lt;/p&gt;
                        &lt;/div&gt;
                        &lt;div class="flex items-center gap-1 mr-1"&gt;
                            &lt;span class="text-label-xs text-outline"&gt;$&#123;new Date().getHours()&#125;:$&#123;new Date().getMinutes().toString().padStart(2, '0')&#125;&lt;/span&gt;
                            &lt;span class="material-symbols-outlined text-[16px] text-outline"&gt;done&lt;/span&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                `;
                chatContainer.appendChild(msgDiv);
                input.value = "";
                chatContainer.scrollTo(&#123;
                    top: chatContainer.scrollHeight,
                    behavior: 'smooth'
                &#125;);

                // Simulate "Read" status update
                setTimeout(() =&gt; &#123;
                    const status = msgDiv.querySelector('.material-symbols-outlined');
                    status.innerHTML = 'done_all';
                    status.classList.replace('text-outline', 'text-primary');
                    status.style.fontVariationSettings = "'FILL' 1";
                &#125;, 2000);
            &#125;
        &#125;;

        // Listen for Enter key
        input.addEventListener('keypress', (e) =&gt; &#123;
            if (e.key === 'Enter') sendBtn.click();
        &#125;);

        // Add fade-in animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn &#123;
                from &#123; opacity: 0; transform: translateY(10px); &#125;
                to &#123; opacity: 1; transform: translateY(0); &#125;
            &#125;
            .animate-fade-in &#123;
                animation: fadeIn 0.3s ease-out forwards;
            &#125;
        `;
        document.head.appendChild(style);
    </script>

    </div>
  );
}
