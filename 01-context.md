We have a shared basic and functional prototype: a simple HTML page. We have a Git repository (local and on GitHub), Netlify for deployment, and an overall plan.

**Goal:** Expand the prototype into an application that emulates a small client zone (KZ = Client Zone). The app will be written in JavaScript and use the existing Netlify setup.

**Prototype scope:** Simple working app only – no data storage, no backend, no real compliance. Forms and flows are for demo; nothing is persisted. ČKP/ČAP/ČNB details below are for context and future product, not for implementation in this prototype.

**URLs:**
- **My prototype** (what we build from): https://splendid-klepon-3109c1.netlify.app/
- **Target / inspiration** (styling, colors, feel): https://lnd-poj.netlify.app/ (JerryPoj by Lundegaard)

**Feature requirements:**
- Basic login and hiding from the public
- Multi-step form with basic validations
- Use of camera for file upload
- Option to view contract in lightweight client zone
- Styling and colors of the target (JerryPoj / lnd-poj)
- <---add your feature here--->
- Civil liability insurance (both types below)

**Civil liability scope (both):**
- **Motor liability** (povinné ručení) – pojištění odpovědnosti z provozu vozidla
- **General civil liability** (pojištění odpovědnosti za škodu) – e.g. občanskoprávní odpovědnost, odpovědnost z povolání

**Regulatory context (for reference only – not implemented in this prototype):**

| Area | Motor liability | General civil liability |
|------|-----------------|-------------------------|
| **Law** | Zákon č. 30/2024 Sb., Vyhláška č. 69/2024 Sb. | Zákon č. 277/2009 Sb. (pojišťovnictví) |
| **Regulator** | ČNB (supervises ČKP and insurers) | ČNB |
| **ČKP** | Yes – guarantee fund, vehicle DB (SPZ), etc. | Not applicable |
| **ČAP** | Industry standards, self-regulation | Industry standards, self-regulation |

For the prototype: use labels and flows that *evoke* both products (e.g. "Povinné ručení" / "Odpovědnost za škodu") so it feels realistic; no real checks, no data storage.

---

**Relevant for the public liability form (this prototype):**

- **Product:** Pojištění odpovědnosti za škodu (general civil liability). No vehicle, no SPZ, no ČKP – just the form flow and labels.
- **Typical form steps** (for a realistic multi-step form):
  1. **Účel / typ pojištění** – e.g. občanskoprávní (civil life), z povolání (professional), provoz domácnosti.
  2. **Pojištěný** – jméno, adresa, rodné číslo / IČO (for demo: basic fields only).
  3. **Rozsah** – limit plnění (sum insured), případně spoluúčast (deductible); optional for prototype.
  4. **Doba pojištění** – od–do, obvykle 1 rok.
  5. **Souhrn a cena** – pojistné (premium), shrnutí; can be mock.
- **Czech terminology:** pojištění odpovědnosti za škodu, limit plnění, pojistné, doba pojištění, pojištěný, pojistník.
- **Inspiration (form structure):** [Generali – pojištění odpovědnosti](https://sjednat.generaliceska.cz/pojisteni-majetku/odpovednost/), [pojištění.cz](https://www.pojisteni.cz/odpovednost). Coverage often includes: domácnost, rekreace, sport, zvířata, běžný občanský život.