import type { Metadata } from "next";

export const metadata: Metadata = { title: "Planifier une session d'étude - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex items-center justify-between px-4 h-16">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-primary-container/20 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-semibold">Edukora</h1>
</div>
<div className="flex items-center gap-3">
<span className="hidden md:block font-label text-label-sm">Session de groupe</span>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-283.png" alt="A professional headshot of a young West African student with a warm, confident expression, wearing a clean white shirt, set against a soft academic library background with blurred books and warm lighting, emphasizing a modern light-mode educational aesthetic." />
</div>
</div>
</header>
<main className="pt-24 px-4 max-w-4xl mx-auto">

<section className="mb-8">
<h2 className="font-headline text-display-lg-mobile md:text-display-lg text-primary mb-2">Organiser une session d'étude</h2>
<p className="text-on-surface-variant font-body text-body-md">Collaborez avec vos pairs pour renforcer vos acquis académiques.</p>
</section>

<form className="space-y-6">
<div className="bento-grid">

<div className="md:col-span-2 bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<label className="block text-primary font-label text-label-sm mb-2" htmlFor="subject">Matière</label>
<div className="relative">
<select className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none" id="subject">
<option>Mathématiques</option>
<option>Sciences Physiques</option>
<option>SVT</option>
<option>Français / Philosophie</option>
<option>Anglais</option>
<option>Histoire-Géo</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline">expand_more</span>
</div>
</div>

<div className="md:col-span-2 bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<label className="block text-primary font-label text-label-sm mb-2" htmlFor="topic">Thème ou Chapitre</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="topic" placeholder="Ex: Les suites numériques" type="text" />
</div>

<div className="md:col-span-2 grid grid-cols-2 gap-4 bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<div>
<label className="block text-primary font-label text-label-sm mb-2" htmlFor="date">Date</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="date" type="date" />
</div>
<div>
<label className="block text-primary font-label text-label-sm mb-2" htmlFor="time">Heure</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="time" type="time" />
</div>
</div>

<div className="md:col-span-2 bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm flex flex-col justify-center">
<div className="flex justify-between items-center mb-4">
<label className="text-primary font-label text-label-sm" htmlFor="participants">Participants Max.</label>
<span className="text-secondary font-headline font-bold text-headline-md" id="participant-value">5</span>
</div>
<input className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer" id="participants" max={20} min={2} type="range" value="5" />
<div className="flex justify-between text-label-xs text-outline mt-2">
<span>2</span>
<span>10</span>
<span>20</span>
</div>
</div>

<div className="md:col-span-1 bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<label className="block text-primary font-label text-label-sm mb-4">Visibilité</label>
<div className="flex flex-col gap-3">
<label className="flex items-center gap-3 cursor-pointer group">
<input checked={true} className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="privacy" type="radio" value="public" />
<span className="text-body-md text-on-surface group-hover:text-primary transition-colors">Public</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="privacy" type="radio" value="private" />
<span className="text-body-md text-on-surface group-hover:text-primary transition-colors">Privé</span>
</label>
</div>
</div>

<div className="md:col-span-3 bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-sm">
<label className="block text-primary font-label text-label-sm mb-2" htmlFor="description">Description de la session</label>
<textarea className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" id="description" placeholder="Précisez les objectifs de cette séance (ex: résolution d'exercices types BAC)..." rows={3}></textarea>
</div>
</div>

<div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm border border-outline-variant">
<div className="absolute inset-0 bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiQh1fJIkqYSnYZsD48Ro13TRCDVYJW9wvkNYrWjIpto-FyasBDFw9h-cmKdgSgO3YvOqrIBOasUm8ReHRf9W2c66m-JH8gPv-T1aJdzldkjo1k7EgaXddrYF8867wfs00ARO9eEnAyLTVKpNx8qxUjnkYD8MY7Q2BlVcdKu47JuU9qxdYyRxBQY-8oDeYUgZ1IB2DOyynexKxqhE3vBUSvrDY_qXmQigOJFbNTTZUjNDlg4jvJZud')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
<div className="text-on-primary">
<p className="font-headline font-bold text-body-lg">Ensemble, on va plus loin.</p>
<p className="text-label-sm opacity-90">Les sessions de groupe augmentent le taux de réussite de 30%.</p>
</div>
</div>
</div>

<div className="flex flex-col md:flex-row gap-4 pt-4">
<button className="flex-1 bg-secondary text-on-secondary py-4 rounded-lg font-headline font-bold text-body-lg hover:bg-secondary-container transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined">event_available</span>
                    Confirmer la création
                </button>
<button className="md:w-1/3 border border-outline text-on-surface-variant py-4 rounded-lg font-headline font-semibold text-body-md hover:bg-surface-container-low transition-all" type="button">
                    Annuler
                </button>
</div>
</form>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface dark:bg-on-surface border-t border-outline-variant dark:border-outline shadow-md flex justify-around items-center h-16 px-2 pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label text-label-xs">Groupes</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label text-label-xs">Examens</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">timer</span>
<span className="font-label text-label-xs">Pomodoro</span>
</a>
</nav>
<script>
        // Form submission animation or feedback
        document.querySelector('form').addEventListener('submit', (e) =&gt; &#123;
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Création en cours...';
            
            setTimeout(() =&gt; &#123;
                btn.classList.replace('bg-secondary', 'bg-tertiary');
                btn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Session créée !';
                
                setTimeout(() =&gt; &#123;
                    btn.disabled = false;
                    btn.classList.replace('bg-tertiary', 'bg-secondary');
                    btn.innerHTML = originalContent;
                &#125;, 2000);
            &#125;, 1500);
        &#125;);

        // Simple interaction for cards
        const cards = document.querySelectorAll('.bg-surface-container-lowest');
        cards.forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.classList.add('shadow-md', '-translate-y-1');
                card.style.transition = 'all 0.3s ease';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.classList.remove('shadow-md', '-translate-y-1');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
