import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Tuteur AI" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-369.png" alt="A professional high-resolution studio portrait of a young Ivorian student smiling confidently. The lighting is warm and academic, with a soft-focus library background. The image uses the corporate blue and white color palette to convey a sense of trust and educational excellence." />
</div>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Edukora</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</header>

<main className="pt-20 pb-40 px-margin-mobile flex flex-col min-h-screen">

<div className="space-y-6 flex-grow" id="chat-container">
<div className="flex flex-col items-center text-center space-y-4 py-6">
<div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-on-primary-container text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Bonjour, Je suis Kora</h2>
<p className="font-body-md text-on-surface-variant max-w-xs mx-auto">Ton tuteur personnel pour réussir ton BAC et ton BEPC.</p>
</div>
</div>

<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-primary-container text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="message-bubble ai-bubble bg-surface border border-primary p-4 rounded-2xl shadow-sm">
<p className="font-body-md text-on-surface">Comment puis-je t'aider aujourd'hui ? Nous pouvons réviser les mathématiques, explorer l'histoire ou pratiquer ton anglais.</p>
</div>
</div>

<div className="grid grid-cols-2 gap-3 mt-4">
<button className="flex flex-col items-start p-4 bg-surface border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all active:scale-95">
<span className="material-symbols-outlined text-secondary mb-2">functions</span>
<span className="font-label-sm text-on-surface">Réviser les Maths</span>
</button>
<button className="flex flex-col items-start p-4 bg-surface border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all active:scale-95">
<span className="material-symbols-outlined text-tertiary mb-2">history_edu</span>
<span className="font-label-sm text-on-surface">Quiz d'Histoire</span>
</button>
<button className="flex flex-col items-start p-4 bg-surface border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all active:scale-95">
<span className="material-symbols-outlined text-primary mb-2">translate</span>
<span className="font-label-sm text-on-surface">Pratique Anglais</span>
</button>
<button className="flex flex-col items-start p-4 bg-surface border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all active:scale-95">
<span className="material-symbols-outlined text-secondary-container mb-2">science</span>
<span className="font-label-sm text-on-surface">Physique-Chimie</span>
</button>
</div>

<div className="space-y-4" id="dynamic-messages"></div>
</div>
</main>

<div className="fixed bottom-20 left-0 w-full px-4 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-10 z-40">
<div className="max-w-xl mx-auto flex items-end gap-2 bg-surface-container-lowest p-2 rounded-2xl shadow-lg border border-outline-variant custom-blur">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">add_circle</span>
</button>
<textarea className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-on-surface py-2 resize-none max-h-32" id="chat-input" placeholder="Pose ta question ici..." rows={1}></textarea>
<button className="w-12 h-12 flex items-center justify-center bg-secondary-container rounded-full text-on-secondary shadow-sm active:scale-90 transition-transform disabled:opacity-50" id="send-btn">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>

<nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe w-full px-2 rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#"><div className="relative">
<span className="material-symbols-outlined">bookmark</span>
<span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-error border border-surface text-[10px] font-bold text-on-error">3</span>
</div>
<span className="font-label-xs text-label-xs">Favoris</span></a><a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const messageContainer = document.getElementById('dynamic-messages');

        // Auto-resize textarea
        input.addEventListener('input', function() &#123;
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        &#125;);

        function createMessage(text, isUser = true) &#123;
            const wrapper = document.createElement('div');
            wrapper.className = `flex $&#123;isUser ? 'justify-end' : 'justify-start'&#125; gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300`;
            
            const content = isUser 
                ? `
                    &lt;div class="message-bubble user-bubble bg-primary-container text-on-primary-container p-4 rounded-2xl shadow-sm"&gt;
                        &lt;p class="font-body-md"&gt;$&#123;text&#125;&lt;/p&gt;
                    &lt;/div&gt;
                  `
                : `
                    &lt;div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0"&gt;
                        &lt;span class="material-symbols-outlined text-on-primary-container text-sm" style="font-variation-settings: 'FILL' 1;"&gt;smart_toy&lt;/span&gt;
                    &lt;/div&gt;
                    &lt;div class="message-bubble ai-bubble bg-surface border border-primary p-4 rounded-2xl shadow-sm"&gt;
                        &lt;p class="font-body-md text-on-surface"&gt;$&#123;text&#125;&lt;/p&gt;
                    &lt;/div&gt;
                  `;
            
            wrapper.innerHTML = content;
            messageContainer.appendChild(wrapper);
            window.scrollTo(&#123; top: document.body.scrollHeight, behavior: 'smooth' &#125;);
        &#125;

        sendBtn.addEventListener('click', () =&gt; &#123;
            const text = input.value.trim();
            if (text) &#123;
                createMessage(text, true);
                input.value = '';
                input.style.height = 'auto';
                
                // Simulate AI response
                setTimeout(() =&gt; &#123;
                    createMessage("C'est une excellente question ! Laisse-moi t'expliquer ce concept de manière simple...", false);
                &#125;, 1000);
            &#125;
        &#125;);

        // Add interaction to suggestion chips
        document.querySelectorAll('button.grid-cols-2').forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                const label = btn.querySelector('.font-label-sm').innerText;
                createMessage(label, true);
                setTimeout(() =&gt; &#123;
                    createMessage(`D'accord, commençons notre session sur : $&#123;label&#125;. Es-tu prêt pour la première question ?`, false);
                &#125;, 800);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
