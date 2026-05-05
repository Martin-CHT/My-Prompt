# Jak používat a nastavit funkci „Vylepšit pomocí AI“

Tento průvodce popisuje pokročilé nastavení funkce **„Vylepšit pomocí AI“**. Zaměřuje se na dvě oblasti: práci s více systémovými prompty a rotaci API klíčů, která pomáhá zvýšit dostupnost služby a omezit výpadky při dosažení limitů poskytovatele.

---

## Více systémových promptů

**Systémový prompt** určuje, jak má jazykový model chápat a zpracovávat vstup uživatele. Může to být například role korektora, překladatele, technického analytika nebo asistenta pro tvorbu strukturovaných instrukcí.

Místo jedné pevné instrukce může My Prompt nabídnout výběrové menu. Díky tomu si připravíš několik pracovních režimů a při spuštění funkce „Vylepšit pomocí AI“ vybereš ten, který se pro aktuální úlohu hodí nejlépe.

### Kde nastavení najít

V rozhraní otevři:

```text
Nastavení > Pokročilé > Nastavení „Vylepšit pomocí AI“
```

Najdi textové pole pro výchozí systémový prompt. Pokud chceš použít menu s více režimy, vymaž stávající obsah a vlož bloky podle syntaxe níže.

### Pravidla zápisu

Každá možnost se skládá z názvu, krátkého popisu a vlastního systémového promptu:

```text
Název(Popis){{Prompt}}
```

Dodrž tyto zásady:

1. **Musí existovat alespoň dvě možnosti.** Pokud vložíš jen jeden blok v tomto formátu, systém ho nebude brát jako výběrové menu.
2. **Jednotlivé bloky odděluj prázdným řádkem.** Díky tomu parser spolehlivě rozpozná hranice mezi možnostmi.
3. **Instrukce musí být v dvojitých složených závorkách.** Používej `{{ ... }}`, ne jednoduché `{ ... }`.

### Jednořádkový příklad

```text
Korektor(Opraví pravopis a stylistiku){{Zkontroluj dodaný text, oprav pravopisné a gramatické chyby a zachovej původní význam.}}
```

### Víceřádkový příklad

```text
Firemní překladatel(Formální překlad do angličtiny){{
Chovej se jako firemní překladatel.
Přelož dodaný text do angličtiny.
Zachovej profesionální tón vhodný pro obchodní komunikaci.
Nezkracuj význam a neměň věcný obsah.
}}
```

### Hotová šablona k vyzkoušení

Následující blok můžeš vložit do pole pro systémový prompt a rovnou vyzkoušet. Po spuštění funkce se zobrazí výběr režimu.

```text
Revize kódu(Analyzuje a zpřesňuje úryvky kódu){{
Chovej se jako seniorní softwarový inženýr.
Po obdržení kódu:
1. Najdi možné syntaktické, logické nebo bezpečnostní chyby.
2. Navrhni úpravy pro lepší čitelnost a výkon.
3. Vrať opravený kód a přidej krátké technické vysvětlení změn.
}}

Stručné shrnutí(Převede dlouhý text na přehledné body){{
Chovej se jako analytik.
Přečti text od uživatele a vytáhni nejdůležitější informace.
Výsledek napiš v bodech tak, aby zůstal zachovaný hlavní význam, ale text byl kratší a přehlednější.
}}
```

### Návrat k jednoduchému režimu

Pokud už výběrové menu nechceš používat, vymaž obsah pole a napiš do něj obyčejný systémový prompt bez názvů, závorek a bloků `{{ ... }}`.

---

## Rotace API klíčů

Funkce **„Vylepšit pomocí AI“** komunikuje s externími poskytovateli umělé inteligence. K tomu potřebuje API klíče, které slouží jako přístupové údaje k dané službě.

### Podporovaní poskytovatelé

My Prompt aktuálně pracuje s těmito poskytovateli. U vybraného poskytovatele si vytvoř účet a vygeneruj API klíč.

| Poskytovatel | Odkaz pro vytvoření klíče |
| :--- | :--- |
| **Google Gemini** | https://aistudio.google.com/api-keys |
| **LongCat** | https://longcat.chat/platform/api_keys |
| **Groq** | https://console.groq.com/keys |
| **OpenRouter** | https://openrouter.ai/settings/keys |
| **Hugging Face** | https://huggingface.co/settings/tokens/new?tokenType=read |

### Jak rotace funguje

Při častém používání jednoho API klíče může poskytovatel dočasně odmítat další požadavky. Obvykle se to projeví chybou typu *Rate Limit* nebo *Too Many Requests*.

Rotace klíčů umožňuje uložit více klíčů pro stejného poskytovatele. My Prompt pak při dalších požadavcích střídá, který klíč použije. Tím se zátěž rozloží mezi více klíčů a sníží se riziko, že práce skončí uprostřed kvůli dočasnému limitu.

Rotace není způsob, jak obcházet pravidla poskytovatele. Ber ji jako praktickou pomůcku pro stabilnější práci v rámci povolených limitů.

### Jak klíče zadat

1. Otevři znovu:

   ```text
   Nastavení > Pokročilé > Nastavení „Vylepšit pomocí AI“
   ```

2. Najdi pole odpovídající zvolenému poskytovateli.
3. Vlož jeden nebo více klíčů. Více klíčů odděl čárkou nebo mezerou.

Správné příklady zápisu:

```text
key1, key2, key3
```

```text
key1 key2 key3
```

---

## Bezpečnost a údržba

- **Pravidelně kontroluj platnost klíčů.** Pokud poskytovatel klíč zruší nebo přestane fungovat, odeber ho z nastavení, aby se na něj rotace zbytečně nepokoušela posílat požadavky.
- **Nevkládej klíče do veřejných souborů.** API klíč se chová podobně jako heslo. Nepatří do GitHub repozitáře, Gistu, screenshotu ani veřejného chatu.
- **Používej jen vlastní účty a klíče.** Cizí nebo sdílené klíče mohou přestat fungovat bez varování a mohou porušovat pravidla poskytovatele.
- **Nezneužívej automatizované zakládání účtů.** Poskytovatelé mohou takové chování vyhodnotit jako obcházení limitů a účet trvale zablokovat.
- **U citlivých dat zvaž poskytovatele.** Funkce „Vylepšit pomocí AI“ posílá text externí službě. Neposílej přes ni tajné údaje, osobní údaje nebo interní dokumenty, pokud nemáš jistotu, že to odpovídá tvým pravidlům práce s daty.
