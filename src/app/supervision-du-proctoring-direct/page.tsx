import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Proctor - Supervision en Direct" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-md flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-4">
<button className="text-on-primary hover:bg-primary-container/20 transition-colors p-2 rounded-full">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-xl md:text-2xl">Edukora Proctor</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex flex-col text-right">
<span className="text-on-primary text-sm font-semibold">Prof. Kouassi</span>
<span className="text-on-primary-container/70 text-xs">Examen de Mathématiques</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-338.png" alt="A professional studio portrait of an African male professor in a crisp navy blue suit, standing against a clean academic library background. The lighting is bright and authoritative, reflecting the modern Edukora brand identity with high contrast and sharp focus. The professor has a confident and supportive expression." />
</div>
</div>
</header>

<aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-72 bg-surface border-r border-outline-variant flex-col gap-2 py-6">
<div className="px-6 mb-8 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
</div>
<div>
<p className="font-headline font-bold text-primary">EduKora Admin</p>
<p className="text-sm text-on-surface-variant">Academic Faculty</p>
</div>
</div>
<nav className="flex flex-col gap-1 px-2">
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">cloud_download</span>
<span className="font-body text-body-md">Paramètres d'examen</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-4 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="font-body text-body-md">AI Configuration</span>
</a>
<a className="bg-primary-container text-on-primary-container rounded-full px-4 py-3 flex items-center gap-4 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-body text-body-md font-semibold">Sessions en direct</span>
</a>
</nav>
</aside>

<main className="pt-20 pb-24 md:pl-72 md:pb-8 px-4 md:px-8">

<div className="flex flex-col gap-6 max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<div className="flex items-center gap-2 text-primary mb-1">
<span className="relative flex h-3 w-3">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
</span>
<span className="text-xs font-bold uppercase tracking-widest">En Direct</span>
</div>
<h2 className="font-headline text-3xl font-extrabold text-primary">Supervision en Direct</h2>
<p className="text-on-surface-variant">Session active : BEPC Blanc 2024 - Mathématiques</p>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-2 bg-surface border border-outline-variant px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span>
                        Filtrer
                    </button>
<button className="flex items-center gap-2 bg-surface border border-outline-variant px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">download</span>
                        Rapport
                    </button>
</div>
</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4">
<div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-full text-primary">
<span className="material-symbols-outlined">groups</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-medium">Total Élèves</p>
<p className="text-2xl font-bold text-primary">120</p>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4">
<div className="w-12 h-12 bg-tertiary-fixed flex items-center justify-center rounded-full text-tertiary">
<span className="material-symbols-outlined">person_check</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-medium">Actifs</p>
<p className="text-2xl font-bold text-tertiary">115</p>
</div>
</div>
<div className="bg-error-container/20 p-4 rounded-xl border border-error-container flex items-center gap-4">
<div className="w-12 h-12 bg-error-container flex items-center justify-center rounded-full text-error">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
</div>
<div>
<p className="text-xs text-on-error-container font-medium">Alertes AI</p>
<p className="text-2xl font-bold text-error">2</p>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-on-surface-variant">
<span className="material-symbols-outlined">wifi_off</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-medium">Hors-ligne</p>
<p className="text-2xl font-bold text-on-surface-variant">3</p>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

<div className="lg:col-span-1 flex flex-col gap-4">
<div className="flex items-center justify-between">
<h3 className="font-headline font-bold text-lg text-primary flex items-center gap-2">
<span className="material-symbols-outlined text-error">notification_important</span>
                            Alertes Prioritaires
                        </h3>
<span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">ACTION REQUISE</span>
</div>
<div className="flex flex-col gap-3">

<div className="bg-white border-2 border-error/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
<div className="p-4 flex flex-col gap-3">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-339.png" alt="A close-up biometric ID photo of a young Ivorian female student, looking slightly anxious. The image is filtered with a red surveillance overlay and AI tracking markers around her face. The environment is a dimly lit classroom setting, consistent with a high-stakes exam atmosphere. Professional digital aesthetic." />
</div>
<div>
<p className="font-bold text-sm text-on-surface leading-none">Kouamé Edwige</p>
<p className="text-[10px] text-on-surface-variant mt-1">Série C1 • Flagged 2 mins ago</p>
</div>
</div>
<span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-1 rounded">HAUTE</span>
</div>
<div className="bg-error-container/10 p-3 rounded-lg border border-error/10 flex items-start gap-3">
<span className="material-symbols-outlined text-error text-lg">face</span>
<p className="text-xs text-on-error-container leading-tight">Multiples visages détectés dans le champ de la caméra. Présence possible d'un tiers.</p>
</div>
<div className="flex gap-2">
<button className="flex-1 bg-primary text-on-primary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined text-sm">visibility</span>
                                        View Stream
                                    </button>
<button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
</button>
</div>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
<div className="p-4 flex flex-col gap-3">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-340.png" alt="A biometric student profile photo of a young West African male with short hair and a focused expression. The image has a yellow-tinted 'Warning' status overlay with UI elements showing browser tab switching detection. The style is academic, professional, and incorporates modern AI monitoring visual cues." />
</div>
<div>
<p className="font-bold text-sm text-on-surface leading-none">Moussa Adama</p>
<p className="text-[10px] text-on-surface-variant mt-1">Série D • Flagged 5 mins ago</p>
</div>
</div>
<span className="bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded">MOYENNE</span>
</div>
<div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-lg">tab</span>
<p className="text-xs text-on-surface-variant leading-tight">Changement d'onglet détecté. Navigation externe bloquée.</p>
</div>
<button className="w-full bg-secondary text-on-secondary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-sm">campaign</span>
                                    Warn Student
                                </button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-2 flex flex-col gap-4">
<div className="flex items-center justify-between">
<h3 className="font-headline font-bold text-lg text-primary">Tous les Étudiants</h3>
<div className="flex gap-4 text-xs font-medium text-on-surface-variant">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary"></span> Correct</span>
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error"></span> Alerte</span>
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-outline-variant"></span> Inactif</span>
</div>
</div>

<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">

<script>
                            const students = [
                                &#123; name: "Bakayoko A.", status: "ok" &#125;,
                                &#123; name: "Cissé M.", status: "ok" &#125;,
                                &#123; name: "Kouamé E.", status: "alert" &#125;,
                                &#123; name: "Moussa A.", status: "alert" &#125;,
                                &#123; name: "N'Guessan J.", status: "ok" &#125;,
                                &#123; name: "Diallo F.", status: "ok" &#125;,
                                &#123; name: "Touré Y.", status: "offline" &#125;,
                                &#123; name: "Koné S.", status: "ok" &#125;,
                                &#123; name: "Diomandé L.", status: "ok" &#125;,
                                &#123; name: "Sidibé O.", status: "ok" &#125;,
                                &#123; name: "Ouattara T.", status: "ok" &#125;,
                                &#123; name: "Bamba K.", status: "ok" &#125;,
                                &#123; name: "Goué D.", status: "offline" &#125;,
                                &#123; name: "Yao B.", status: "ok" &#125;,
                                &#123; name: "Dossou R.", status: "ok" &#125;,
                                &#123; name: "Traoré I.", status: "ok" &#125;,
                                &#123; name: "Keïta M.", status: "ok" &#125;,
                                &#123; name: "Doumbia A.", status: "offline" &#125;,
                                &#123; name: "Sanogo P.", status: "ok" &#125;,
                                &#123; name: "Koffi J.", status: "ok" &#125;
                            ];

                            document.write(students.map(s =&gt; `
                                &lt;div class="bg-surface-container-lowest border $&#123;s.status === 'alert' ? 'border-error animate-pulse-slow' : 'border-outline-variant'&#125; rounded-lg p-2 flex flex-col items-center text-center gap-2 hover:border-primary transition-all cursor-pointer"&gt;
                                    &lt;div class="relative"&gt;
                                        &lt;div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant"&gt;
                                            &lt;span class="material-symbols-outlined text-outline"&gt;person&lt;/span&gt;
                                        &lt;/div&gt;
                                        &lt;div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full $&#123;s.status === 'ok' ? 'bg-tertiary' : s.status === 'alert' ? 'bg-error' : 'bg-outline-variant'&#125; border-2 border-white flex items-center justify-center"&gt;
                                            &lt;span class="material-symbols-outlined text-[10px] text-white" style="font-variation-settings: 'FILL' 1;"&gt;
                                                $&#123;s.status === 'ok' ? 'check' : s.status === 'alert' ? 'warning' : 'wifi_off'&#125;
                                            &lt;/span&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;span class="text-[10px] font-bold text-on-surface truncate w-full"&gt;$&#123;s.name&#125;&lt;/span&gt;
                                &lt;/div&gt;
                            `).join(''));
                        </script>
</div>
<button className="mt-4 w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-semibold text-sm hover:bg-surface-container transition-colors">
                        Charger plus d'étudiants (100 restants)
                    </button>
</div>
</div>
</div>
</main>

<button className="fixed bottom-24 md:bottom-8 right-6 md:right-8 w-14 h-14 bg-secondary shadow-lg rounded-full flex items-center justify-center text-on-secondary hover:scale-105 active:scale-95 transition-all z-40 group">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>campaign</span>

<span className="absolute right-16 bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Diffuser un Message</span>
</button>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-surface border-t border-outline-variant z-50 shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>visibility</span>
<span className="font-label text-label-xs">Monitor</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-150 relative" href="#">
<span className="material-symbols-outlined">warning</span>
<span className="font-label text-label-xs">Alertes</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">tune</span>
<span className="font-label text-label-xs">Paramètres</span>
</a>
</nav>
<script>
        // Micro-interaction: Update time every second
        function updateSessionTime() &#123;
            // Static simulation for a mock UI
        &#125;

        // Handle Alert Card interactions
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.classList.add('active:scale-95');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
