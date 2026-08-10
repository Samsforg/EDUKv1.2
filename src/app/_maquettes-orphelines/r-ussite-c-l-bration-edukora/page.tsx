import type { Metadata } from "next";

export const metadata: Metadata = { title: "Réussite & Célébration - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden relative" style={{ minHeight: "max(884px, 100dvh)" }}>
<canvas className="fixed inset-0 pointer-events-none z-0" id="confetti-canvas"></canvas>
<header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-4 py-4">
<div className="flex items-center gap-3">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-2xl text-primary">Bravo, Koffi !</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</header>
<main className="max-w-2xl mx-auto px-4 pt-8 pb-32 relative z-10">
<div className="flex flex-col items-center mb-10">
<div className="relative w-64 h-64 flex items-center justify-center animate-float">
<div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
<img className="w-full h-full object-contain drop-shadow-2xl z-10" src="/images/ecran-302.png" alt="A high-quality, professional gold medal with a large star in the center, hanging from a deep academic blue ribbon. The medal has a glossy finish and intricate engraved details, set against a clean minimalist light gray background that reflects the Edukora design system's focus on academic authority and success. Soft lighting highlights the metallic textures and vibrant blue fabric of the ribbon." />
<div className="absolute -bottom-4 bg-secondary-container text-white px-6 py-2 rounded-full font-headline font-bold text-lg shadow-lg z-20">
                    Badge Débloqué !
                </div>
</div>
<p className="text-on-surface-variant font-medium mt-8 text-center max-w-xs">
                Tu as terminé ta session de révision en Mathématiques avec succès.
            </p>
</div>
<div className="grid grid-cols-2 gap-4 mb-8">
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center justify-center group hover:border-primary transition-colors">
<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
</div>
<span className="text-sm font-label font-medium text-on-surface-variant">XP Gagnés</span>
<span className="text-2xl font-headline font-bold text-primary">+120 XP</span>
</div>
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center justify-center group hover:border-secondary-container transition-colors">
<div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
</div>
<span className="text-sm font-label font-medium text-on-surface-variant">Série Actuelle</span>
<span className="text-2xl font-headline font-bold text-secondary">7 Jours</span>
</div>
</div>
<div className="bg-primary text-on-primary p-6 rounded-xl mb-8 relative overflow-hidden">
<div className="relative z-10">
<div className="flex justify-between items-center mb-4">
<h3 className="font-headline font-semibold text-lg flex items-center gap-2">
<span className="material-symbols-outlined text-on-primary-container">leaderboard</span>
                        Classement Cocody
                    </h3>
<span className="text-sm bg-white/20 px-3 py-1 rounded-full">Top 15%</span>
</div>
<p className="text-on-primary-container mb-4 font-medium">
                    Impressionnant ! Tu es à <span className="font-bold text-white">50 XP</span> du Top 10 de ta commune.
                </p>
<div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
<div className="h-full bg-secondary-container w-[85%] rounded-full shadow-[0_0_10px_rgba(253,129,0,0.5)]"></div>
</div>
</div>
<div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
</div>
<div className="flex flex-col gap-4">
<button className="w-full py-4 bg-primary text-white rounded-xl font-headline font-bold text-lg shadow-md hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2">
                Continuer mes révisions
                <span className="material-symbols-outlined">trending_flat</span>
</button>
<div className="flex gap-4">
<button className="flex-1 py-4 bg-surface-container-lowest border border-outline-variant text-primary rounded-xl font-headline font-bold hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">share</span>
                    Partager
                </button>
<button className="flex-1 py-4 bg-surface-container-lowest border border-outline-variant text-on-surface-variant rounded-xl font-headline font-bold hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">home</span>
                    Accueil
                </button>
</div>
</div>
</main>
<nav className="fixed bottom-0 w-full z-50 rounded-t-xl shadow-[0_-4px_10px_rgba(0,50,125,0.1)] bg-surface-container-lowest flex justify-around items-center h-16 px-4">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-[12px] font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="text-[12px] font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<span className="text-[12px] font-semibold">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">bookmark</span>
<span className="text-[12px] font-semibold">Favoris</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-[12px] font-semibold">Profil</span>
</a>
</nav>
<script>
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() &#123;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        &#125;

        window.addEventListener('resize', resize);
        resize();

        class Particle &#123;
            constructor() &#123;
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.size = Math.random() * 8 + 4;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 + 2;
                this.color = ['#0047ab', '#FF8200', '#009E60', '#ffd700'][Math.floor(Math.random() * 4)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
            &#125;

            update() &#123;
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                if (this.y &gt; canvas.height) &#123;
                    this.y = -10;
                    this.x = Math.random() * canvas.width;
                &#125;
            &#125;

            draw() &#123;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            &#125;
        &#125;

        function init() &#123;
            for (let i = 0; i &lt; 50; i++) &#123;
                particles.push(new Particle());
            &#125;
        &#125;

        function animate() &#123;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p =&gt; &#123;
                p.update();
                p.draw();
            &#125;);
            requestAnimationFrame(animate);
        &#125;

        init();
        animate();
    </script>

    </div>
  );
}
