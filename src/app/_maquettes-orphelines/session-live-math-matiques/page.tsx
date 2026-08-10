import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Live - Session en cours" };

export default function Page() {
  return (
    <div className="bg-black text-white overflow-hidden h-screen w-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 pointer-events-none">
<div className="flex items-center gap-3 pointer-events-auto">
<div className="bg-error px-3 py-1 rounded-lg flex items-center gap-2">
<span className="w-2 h-2 bg-white rounded-full animate-pulse-red"></span>
<span className="font-headline font-bold text-sm tracking-wider uppercase">LIVE</span>
</div>
<div className="glass-panel px-3 py-1 rounded-lg flex items-center gap-2 text-white">
<span className="material-symbols-outlined text-sm">visibility</span>
<span className="font-label text-sm font-medium">1.2k</span>
</div>
</div>
<button className="pointer-events-auto w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-all active:scale-90">
<span className="material-symbols-outlined">close</span>
</button>
</header>

<main className="relative flex-grow flex items-center justify-center bg-zinc-950 overflow-hidden">

<div className="relative w-full h-full flex flex-col md:flex-row">

<div className="relative flex-grow h-full w-full bg-black">
<img className="w-full h-full object-cover opacity-90" src="/images/ecran-328.png" alt="A high-quality wide shot of a professional mathematics professor in a modern educational studio. The professor is standing in front of a large, glowing blue digital interactive board filled with complex algebraic equations and geometric diagrams. The lighting is crisp and studio-grade, emphasizing the Academic Blue color palette. The professor looks engaged and clear, conveying a sense of academic authority and support." />

<div className="absolute bottom-24 left-4 md:left-8 pointer-events-none">
<div className="glass-panel p-4 rounded-xl max-w-xs md:max-w-md">
<p className="text-on-primary-container text-xs font-bold uppercase tracking-widest mb-1">Session BAC 2024</p>
<h1 className="text-white font-headline text-lg md:text-xl font-bold leading-tight">Calcul Intégral &amp; Dérivées Complexes</h1>
<div className="flex items-center gap-2 mt-2 opacity-80">
<span className="material-symbols-outlined text-sm">person</span>
<span className="text-xs font-medium">Dr. Kouamé N'Guessan</span>
</div>
</div>
</div>
</div>

<aside className="absolute md:relative right-0 top-0 bottom-0 w-full md:w-80 lg:w-96 flex flex-col pointer-events-none md:pointer-events-auto z-40">
<div className="flex-grow flex flex-col justify-end p-4 md:p-6 pb-32 md:pb-24 overflow-hidden">
<div className="space-y-4 chat-mask overflow-y-auto pointer-events-auto pr-2 scrollbar-hide">

<div className="flex items-start gap-3 opacity-90 animate-fade-in">
<div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/20">AM</div>
<div className="bg-white/10 backdrop-blur-md p-3 rounded-tr-xl rounded-b-xl max-w-[80%] border border-white/5">
<p className="text-white/60 text-[10px] font-bold mb-1">Awa Moussa</p>
<p className="text-sm text-white/90 leading-relaxed">Monsieur, pourquoi l'intégrale s'annule sur cet intervalle ?</p>
</div>
</div>

<div className="flex items-start gap-3 opacity-90">
<div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/20">TK</div>
<div className="bg-white/10 backdrop-blur-md p-3 rounded-tr-xl rounded-b-xl max-w-[80%] border border-white/5">
<p className="text-white/60 text-[10px] font-bold mb-1">Tiémoko Koné</p>
<p className="text-sm text-white/90 leading-relaxed">Merci pour l'explication, c'est beaucoup plus clair maintenant ! 👏</p>
</div>
</div>

<div className="text-center py-2">
<span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-white/40 font-medium">Salif joined the stream</span>
</div>

<div className="flex items-start gap-3 opacity-90">
<div className="w-8 h-8 rounded-full bg-tertiary flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/20">JS</div>
<div className="bg-white/10 backdrop-blur-md p-3 rounded-tr-xl rounded-b-xl max-w-[80%] border border-white/5">
<p className="text-white/60 text-[10px] font-bold mb-1">Jean S.</p>
<p className="text-sm text-white/90 leading-relaxed">Est-ce que cet exercice tombe souvent au BAC ?</p>
</div>
</div>
</div>
</div>
</aside>
</div>
</main>

<footer className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex flex-col gap-4">
<div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-4">

<div className="flex-grow max-w-2xl group">
<div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 py-3 border border-white/20 focus-within:border-secondary transition-all">
<input className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 text-sm flex-grow" placeholder="Poser une question..." type="text" />
<button className="text-secondary-container hover:text-secondary transition-colors p-1">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>

<div className="flex items-center gap-3">

<button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 group" id="raise-hand">
<span className="material-symbols-outlined group-active:animate-bounce">front_hand</span>
</button>

<div className="relative group">
<button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
<span className="material-symbols-outlined">mood</span>
</button>

<div className="absolute bottom-16 right-0 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
<button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-xl">🔥</button>
<button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-xl">👏</button>
<button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-xl">💡</button>
<button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-xl">💯</button>
</div>
</div>

<button className="hidden md:flex w-12 h-12 rounded-full glass-panel items-center justify-center hover:bg-white/20 transition-all">
<span className="material-symbols-outlined">volume_up</span>
</button>
</div>
</div>
</footer>

<div className="fixed inset-0 pointer-events-none z-[1]">

<div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 bg-primary/20 blur-[120px] rounded-full"></div>
</div>
<script>
        // Micro-interaction for the "Raise Hand" button
        const raiseHandBtn = document.getElementById('raise-hand');
        let isHandRaised = false;

        raiseHandBtn.addEventListener('click', () =&gt; &#123;
            isHandRaised = !isHandRaised;
            if (isHandRaised) &#123;
                raiseHandBtn.classList.add('bg-secondary-container', 'text-on-secondary-container');
                raiseHandBtn.classList.remove('glass-panel');
                // Simulate system notification
                console.log('Hand raised notification sent to professor');
            &#125; else &#123;
                raiseHandBtn.classList.remove('bg-secondary-container', 'text-on-secondary-container');
                raiseHandBtn.classList.add('glass-panel');
            &#125;
        &#125;);

        // Auto-scroll chat to bottom logic
        const chatContainer = document.querySelector('.chat-mask div');
        if(chatContainer) &#123;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        &#125;

        // Floating emoji animation logic
        document.querySelectorAll('.absolute button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', (e) =&gt; &#123;
                const emoji = e.target.innerText;
                const floatingEmoji = document.createElement('div');
                floatingEmoji.innerText = emoji;
                floatingEmoji.style.position = 'fixed';
                floatingEmoji.style.left = `$&#123;e.clientX&#125;px`;
                floatingEmoji.style.top = `$&#123;e.clientY&#125;px`;
                floatingEmoji.style.fontSize = '24px';
                floatingEmoji.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                floatingEmoji.style.pointerEvents = 'none';
                floatingEmoji.style.zIndex = '100';
                
                document.body.appendChild(floatingEmoji);

                requestAnimationFrame(() =&gt; &#123;
                    floatingEmoji.style.transform = `translateY(-200px) scale(2)`;
                    floatingEmoji.style.opacity = '0';
                &#125;);

                setTimeout(() =&gt; floatingEmoji.remove(), 1500);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
