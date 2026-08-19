import type { Metadata } from "next";
import { getPremiumPlans, planFeatures, formatPlanPrice, type PlanRow } from "@/lib/plans";
import PromoRentreeBanner from "@/components/PromoRentreeBanner";
import { isRentreePromoActive } from "@/lib/promo";

export const metadata: Metadata = {
  title: "Abonnement Premium",
  description:
    "Choisissez votre abonnement Edukora Premium et payez en toute sécurité par Mobile Money (Orange, MTN, Moov) en FCFA. Accédez à toutes les fiches, le simulateur et le tuteur IA.",
  alternates: { canonical: "/plans-d-abonnement-edukora-1" },
};

// Rendu à la volée : le pré-rendu au build s'exécute sans DATABASE_URL (SQLite local),
// ce qui figerait l'état « plans indisponibles » au déploiement. Ne jamais mettre en cache.
export const dynamic = "force-dynamic";

async function fetchPlansRobustly(): Promise<PlanRow[]> {
  // Pas de fallback silencieux et pas de cache figé : au cold start la base Neon
  // (autosuspend) peut mettre 5-15 s à se réveiller et chaque tentative échoue
  // vite (ECONNREFUSED / ETIMEDOUT). On étale les retries sur ~25 s avant de conclure.
  const delays = [0, 1000, 2500, 4500, 7000, 10000];
  for (let attempt = 0; attempt < delays.length; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, delays[attempt]));
    try {
      return await getPremiumPlans();
    } catch (err) {
      console.error(`[plans] tentative ${attempt + 1} échouée :`, err);
    }
  }
  return [];
}

export default async function Page() {
  const plans = await fetchPlansRobustly();
  const monthPlan = plans.find((p) => p.price_cents > 0 && p.interval === "month") ?? null;
  const quarterPlan =
    plans.find((p) => p.price_cents > 0 && p.interval === "quarter" && p.name.includes("Trimestriel")) ??
    plans.find((p) => p.price_cents > 0 && p.interval === "quarter") ??
    null;
  const quarterDisplay = quarterPlan ?? (monthPlan ? { ...monthPlan, id: 0, interval: "quarter" as const, price_cents: 0 } : null);
  const monthFeatures = monthPlan ? planFeatures(monthPlan) : [];
  const quarterFeatures = quarterPlan?.features
    ? planFeatures(quarterPlan)
    : monthFeatures.map((f) => (f.includes("Kora IA") ? "100 questions par trimestre à Kora IA" : f));

  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-on-background border-b border-outline-variant dark:border-on-surface-variant flex items-center justify-between px-margin-mobile h-16 z-50">
<div className="flex items-center gap-4">
<button className="transition-colors duration-200 active:scale-95 text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Paiement Sécurisé</h1>
</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low">
<span className="material-symbols-outlined text-outline">help_outline</span>
</div>
</header>
<main className="pt-24 px-margin-mobile max-w-4xl mx-auto">

<section className="text-center mb-10">
<h2 className="text-3xl font-bold text-primary mb-2">Passez au niveau supérieur</h2>
<p className="text-on-surface-variant max-w-md mx-auto">Débloquez tout le potentiel de votre réussite scolaire avec nos outils d'apprentissage avancés.</p>
</section>

{isRentreePromoActive() && <div className="max-w-4xl mx-auto mb-8"><PromoRentreeBanner /></div>}

<div className="flex justify-center mb-8">
<div className="bg-surface-container-high p-1 rounded-xl flex gap-1">
<button className="px-6 py-2 rounded-lg bg-surface-container-lowest text-primary font-semibold shadow-sm transition-all" id="toggle-monthly">Mensuel</button>
<button className="px-6 py-2 rounded-lg text-on-surface-variant font-semibold hover:bg-surface-container transition-all" id="toggle-trim">Trimestriel</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col transition-transform hover:scale-[1.02]">
<div className="mb-6">
<h3 className="text-xl font-bold text-on-surface mb-1">Découverte</h3>
<p className="text-sm text-on-surface-variant">Idéal pour explorer nos ressources de base.</p>
</div>
<div className="mb-8">
<span className="text-4xl font-extrabold text-on-surface">Gratuit</span>
</div>
<ul className="space-y-4 mb-10 flex-grow">
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span>Accès limité aux cours</span>
</li>
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span>5 questions/mois au Tuteur AI</span>
</li>
<li className="flex items-center gap-3 text-outline opacity-50">
<span className="material-symbols-outlined text-xl">block</span>
<span className="line-through">Mode Hors-ligne</span>
</li>
<li className="flex items-center gap-3 text-outline opacity-50">
<span className="material-symbols-outlined text-xl">block</span>
<span className="line-through">Simulateur d'examen complet</span>
</li>
</ul>
<a href="/accueil-edukora" className="block w-full py-3 px-4 rounded-lg border border-primary text-primary font-bold transition-all active:scale-95 hover:bg-primary-container hover:text-on-primary-container text-center">
                    Continuer en gratuit
                </a>
</div>

<div className="relative bg-primary text-on-primary rounded-xl p-8 flex flex-col shadow-xl transition-transform hover:scale-[1.02] overflow-hidden">
{monthPlan ? (
<>
<div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Le plus populaire
                </div>
<div className="mb-6">
<h3 className="text-xl font-bold mb-1">Réussite</h3>
<p className="text-sm text-on-primary-container/80">L'expérience complète pour réussir votre examen.</p>
</div>
<div className="mb-8">
<div id="price-container" data-price-month={`${monthPlan.price_cents}`} data-price-quarter={`${quarterDisplay?.id ? quarterDisplay.price_cents : 0}`} data-plan-month={`${monthPlan.id}`} data-plan-quarter={`${quarterDisplay?.id ?? 0}`}>
<span className="text-4xl font-extrabold" id="price-value">{formatPlanPrice(monthPlan.price_cents).replace(/ FCFA$/, "")}</span>
<span className="text-xl font-bold ml-1">FCFA</span>
<span className="text-sm font-normal opacity-80" id="price-period">/ mois</span>
</div>
<div className="hidden mt-1 text-xs font-bold text-secondary-fixed" id="savings-badge">Prix 3 mois sans engagement</div>
</div>
<ul id="features-month" className="space-y-4 mb-10 flex-grow">
{monthFeatures.map((f) => (
<li className="flex items-center gap-3" key={f}>
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">{f}</span>
</li>
))}
</ul>
<ul id="features-quarter" className="space-y-4 mb-10 flex-grow hidden">
{quarterFeatures.map((f) => (
<li className="flex items-center gap-3" key={f}>
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">{f}</span>
</li>
))}
</ul>
<button
  id="subscribe-btn"
  type="button"
  className="w-full py-4 px-4 rounded-lg bg-secondary-container text-on-secondary-container font-extrabold text-lg shadow-lg transition-all active:scale-95 hover:brightness-110"
>
  S&apos;abonner maintenant
</button>
<div id="promo-box" className="mt-4 space-y-2">
<div className="flex gap-2">
<input id="promo-input" type="text" placeholder="Code promo (ex. RENTREE30)" autoComplete="off"
       className="flex-1 min-w-0 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors" />
<button id="promo-apply" type="button"
        className="px-4 py-3 rounded-lg bg-surface-container-high text-on-surface font-bold text-sm transition-colors active:scale-95">
Appliquer
</button>
</div>
<p id="promo-status" className="hidden text-xs rounded-lg px-3 py-2"></p>
</div>
<div id="phone-required" className="hidden mt-4 rounded-xl bg-surface-container-low p-4 space-y-3">
<p className="text-sm font-bold text-on-surface">Ajoutez votre numéro Mobile Money</p>
<p className="text-xs text-on-surface-variant">Indispensable pour recevoir le paiement d&apos;abonnement (Orange, MTN, Moov, Wave).</p>
<input id="phone-input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+225 07 00 00 00 00"
       className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:outline-none focus:border-primary transition-colors" />
<button id="phone-save" type="button"
        className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary font-bold text-base hover:bg-primary-container transition-colors">
Enregistrer et continuer
</button>
<p id="phone-error" className="hidden text-xs text-error bg-error-container/30 rounded-lg px-3 py-2"></p>
</div>
<p className="mt-4 text-[10px] text-center opacity-60">Sans engagement. Annulez à tout moment.</p>
</>
) : (
<div className="flex flex-col items-center justify-center text-center py-16">
<span className="material-symbols-outlined text-5xl mb-4 opacity-90">hourglass_empty</span>
<h3 className="text-xl font-bold mb-2">Plans temporairement indisponibles</h3>
<p className="text-sm text-on-primary-container/80 max-w-xs">Veuillez recharger la page dans quelques instants pour souscrire à Réussite.</p>
</div>
)}
</div>
</div>

<div className="mt-12 grid grid-cols-3 gap-4">
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">verified_user</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface-variant">Sécurisé</span>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">school</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface-variant">Certifié</span>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">support_agent</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface-variant">Support 24/7</span>
</div>
</div>

<div className="mt-16 bg-surface-container-low rounded-xl p-6">
<h4 className="font-bold text-on-surface mb-4">Questions fréquentes</h4>
<div className="space-y-4">
<details className="group">
<summary className="list-none flex justify-between items-center cursor-pointer font-semibold text-sm text-on-surface-variant">
                        Quels sont les moyens de paiement ?
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<p className="mt-2 text-sm text-on-surface-variant/80">Nous acceptons Orange Money, MTN MoMo, Wave et les cartes bancaires locales pour une transaction fluide en Côte d'Ivoire.</p>
</details>
<div className="h-px bg-outline-variant"></div>
<details className="group">
<summary className="list-none flex justify-between items-center cursor-pointer font-semibold text-sm text-on-surface-variant">
                        Comment fonctionne le tutorat IA ?
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<p className="mt-2 text-sm text-on-surface-variant/80">Notre IA est entraînée spécifiquement sur le programme national ivoirien pour répondre à vos questions 24h/24 comme un vrai tuteur.</p>
</details>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 pb-safe bg-surface dark:bg-on-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="/accueil-edukora">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="/fiches">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="/tuteur-ia">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90" href="/profil">
<span className="material-symbols-outlined fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        const btnMonthly = document.getElementById('toggle-monthly');
        const btnTrim = document.getElementById('toggle-trim');
        const priceVal = document.getElementById('price-value');
        const pricePeriod = document.getElementById('price-period');
        const savingsBadge = document.getElementById('savings-badge');
        const pc = document.getElementById('price-container');

        let currentPlanId = pc.getAttribute('data-plan-month');
        let appliedPromo = null;
        let promoDiscount = 0;

        const effectivePrice = (monthly) =&gt; &#123;
            const base = Number(pc.getAttribute(monthly ? 'data-price-month' : 'data-price-quarter'));
            return promoDiscount &gt; 0 ? Math.max(0, Math.round((base * (100 - promoDiscount)) / 100)) : base;
        &#125;;

        const renderPrice = (monthly) =&gt; &#123;
            currentPlanId = pc.getAttribute(monthly ? 'data-plan-month' : 'data-plan-quarter');
            pc.setAttribute('data-current-plan', currentPlanId);
            priceVal.innerText = String(effectivePrice(monthly));
            pricePeriod.innerText = monthly ? '/ mois' : '/ trimestre';
            savingsBadge.classList.toggle('hidden', monthly);
            const fm = document.getElementById('features-month');
            const fq = document.getElementById('features-quarter');
            if (fm && fq) &#123;
                fm.classList.toggle('hidden', !monthly);
                fq.classList.toggle('hidden', monthly);
            &#125;
        &#125;;

        const hasQuarter = pc.getAttribute('data-plan-quarter') !== '0';
        pc.setAttribute('data-current-plan', currentPlanId);
        if (!hasQuarter) &#123;
            btnTrim.disabled = true;
            btnTrim.classList.add('opacity-40', 'cursor-not-allowed');
        &#125;

        const promoInput = document.getElementById('promo-input');
        const promoApply = document.getElementById('promo-apply');
        const promoStatus = document.getElementById('promo-status');
        const promoBox = document.getElementById('promo-box');

        if (promoApply && promoInput && promoStatus) &#123;
            const setStatus = (msg, ok) =&gt; &#123;
                promoStatus.textContent = msg;
                promoStatus.classList.remove('hidden', 'bg-error-container/30', 'bg-tertiary-container/40', 'text-error', 'text-tertiary');
                promoStatus.classList.add(ok ? 'bg-tertiary-container/40' : 'bg-error-container/30', ok ? 'text-tertiary' : 'text-error');
            &#125;;
            promoApply.addEventListener('click', () =&gt; &#123;
                const code = (promoInput.value || '').trim().toUpperCase();
                if (!code) &#123; setStatus('Saisissez un code promo.', false); return; &#125;
                promoApply.disabled = true;
                promoApply.innerHTML = '...';
                fetch('/api/promo/check?code=' + encodeURIComponent(code), &#123; credentials: 'same-origin' &#125;)
                    .then((r) =&gt; r.json().catch(() =&gt; (&#123; valid: false &#125;)))
                    .then((d) =&gt; &#123;
                        if (d &amp;&amp; d.valid &amp;&amp; d.discount_type === 'percent') &#123;
                            appliedPromo = d.code;
                            promoDiscount = Number(d.discount_value) || 0;
                            renderPrice(!btnTrim.classList.contains('bg-surface-container-lowest'));
                            setStatus('Code appliqué : -' + promoDiscount + ' %. Le prix affiché est votre prix final.', true);
                        &#125; else &#123;
                            promoDiscount = 0;
                            setStatus((d &amp;&amp; d.message) || 'Ce code promo ne peut pas être utilisé ici.', false);
                        &#125;
                    &#125;)
                    .catch(() =&gt; &#123; setStatus('Erreur réseau. Réessayez.', false); &#125;)
                    .finally(() =&gt; &#123; promoApply.disabled = false; promoApply.innerHTML = 'Appliquer'; &#125;);
            &#125;);
            if (promoInput) &#123;
                promoInput.addEventListener('keydown', (e) =&gt; &#123; if (e.key === 'Enter') promoApply.click(); &#125;);
            &#125;
        &#125;

        btnMonthly.addEventListener('click', () =&gt; &#123;
            btnMonthly.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnTrim.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnTrim.classList.add('text-on-surface-variant');
            renderPrice(true);
        &#125;);

        btnTrim.addEventListener('click', () =&gt; &#123;
            btnTrim.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnMonthly.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnMonthly.classList.add('text-on-surface-variant');
            renderPrice(false);
        &#125;);
    </script>

    <script>
        (function() &#123;
          var btn = document.getElementById('subscribe-btn');
          if (!btn) return;
          var phoneBox = document.getElementById('phone-required');
          var phoneInput = document.getElementById('phone-input');
          var phoneSave = document.getElementById('phone-save');
          var phoneError = document.getElementById('phone-error');

          function doCheckout() &#123;
            var pc = document.getElementById('price-container');
            var planId = pc ? pc.getAttribute('data-current-plan') || pc.getAttribute('data-plan-month') : null;
            var pid = Number(planId || 0);
            try &#123;
              if (window.edukoraTrack) &#123;
                var priceTxt = document.getElementById('price-value');
                var priceVal = priceTxt ? Number(priceTxt.innerText.replace(/[^0-9]/g, '')) : 0;
                window.edukoraTrack('begin_checkout', &#123;
                  plan_id: pid,
                  value: priceVal,
                  currency: 'XOF',
                  interval: btnTrim.classList.contains('bg-surface-container-lowest') ? 'quarter' : 'month',
                  promo: appliedPromo || undefined
                &#125;);
              &#125;
            &#125; catch (e) &#123;&#125;
            if (!pid || pid &lt;= 0) &#123;
              btn.disabled = false;
              btn.innerHTML = "S'abonner maintenant";
              phoneError.textContent = 'Le plan est en cours de chargement. Rechargez la page dans quelques instants.';
              phoneError.classList.remove('hidden');
              return;
            &#125;
            btn.disabled = true;
            btn.innerHTML = 'Redirection vers le paiement...';
            var ctrl = new AbortController();
            var guard = setTimeout(function () &#123; ctrl.abort(); &#125;, 25000);
            return fetch('/api/premium/checkout', &#123;
              method: 'POST',
              headers: &#123; 'Content-Type': 'application/json' &#125;,
              credentials: 'same-origin',
              signal: ctrl.signal,
              body: JSON.stringify(&#123; plan_id: pid, promo: appliedPromo &#125;)
            &#125;)
                .then(function(r) &#123;
                  return r.json().then(function(d) &#123; return &#123; status: r.status, d: d &#125;; &#125;);
                &#125;)
                .then(function(res) &#123;
                  var d = res.d;
                  if (res.status === 401) &#123; window.location.href = '/connexion-edukora?from=/plans-d-abonnement-edukora-1'; return; &#125;
                  if (d.url) &#123; window.location.href = d.url; return; &#125;
                  if (d.code === 'PHONE_REQUIRED' && phoneBox) &#123;
                    btn.disabled = false;
                    btn.innerHTML = "S'abonner maintenant";
                    phoneBox.classList.remove('hidden');
                    phoneError.classList.add('hidden');
                    phoneInput.focus();
                    return;
                  &#125;
                  if (d.code === 'PROMO_INVALID') &#123;
                    appliedPromo = null;
                    promoDiscount = 0;
                    var ps = document.getElementById('promo-status');
                    if (ps) &#123; ps.textContent = d.error || 'Code promo invalide.'; ps.classList.remove('hidden'); &#125;
                  &#125;
                  btn.disabled = false; btn.innerHTML = d.error || 'Erreur';
                &#125;)
                .catch(function() &#123;
                  btn.disabled = false;
                  btn.innerHTML = 'Erreur réseau. Réessayez.';
                  phoneError.textContent = 'Le paiement a echoue. Verifiez votre connexion puis reessayez.';
                  phoneError.classList.remove('hidden');
                &#125;)
                .finally(function() &#123; clearTimeout(guard); &#125;);
          &#125;

          btn.addEventListener('click', doCheckout);

          if (phoneSave && phoneInput) &#123;
            phoneSave.addEventListener('click', function() &#123;
              var p = (phoneInput.value || '').trim();
              if (!p) &#123;
                phoneError.textContent = 'Veuillez saisir votre numéro de téléphone.';
                phoneError.classList.remove('hidden');
                return;
              &#125;
              phoneSave.disabled = true;
              phoneSave.innerHTML = 'Enregistrement...';
              fetch('/api/me/profile', &#123;
                method: 'PATCH',
                headers: &#123; 'Content-Type': 'application/json' &#125;,
                credentials: 'same-origin',
                body: JSON.stringify(&#123; phone: p &#125;)
              &#125;)
                .then(function(r) &#123; return r.json().catch(function() &#123; return &#123;&#125;; &#125;); &#125;)
                .then(function(d) &#123;
                  phoneSave.disabled = false;
                  phoneSave.innerHTML = 'Enregistrer et continuer';
                  if (d && d.error) &#123;
                    phoneError.textContent = d.error;
                    phoneError.classList.remove('hidden');
                    return;
                  &#125;
                  phoneBox.classList.add('hidden');
                  doCheckout();
                &#125;)
                .catch(function() &#123;
                  phoneSave.disabled = false;
                  phoneSave.innerHTML = 'Enregistrer et continuer';
                  phoneError.textContent = 'Erreur réseau. Réessayez.';
                  phoneError.classList.remove('hidden');
                &#125;);
            &#125;);
          &#125;
        &#125;)();
    </script>

    </div>
  );
}
