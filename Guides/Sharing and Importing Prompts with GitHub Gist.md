<div align="center">
<h1>Import a sdílení promptů přes GitHub Gist</h1>
<p>My Prompt umí importovat jednotlivé prompty i celé balíčky promptů přes <b>GitHub Gist</b>. Aby skript soubor správně rozpoznal, je potřeba dodržet několik jednoduchých pravidel pro název souboru a jeho obsah.</p>

<img src="https://i.ibb.co/S4ncR2hw/1.gif" width="800" height="485.172"></img>

---

## Název souboru

Aby se na GitHub Gist automaticky zobrazilo tlačítko **„Importovat prompt“**, musí název souboru obsahovat řetězec `.mp.prompt.` před příponou.

| Správně | Špatně |
|:-------:|:------:|
| `Prekladatel.mp.prompt.txt` | `Prekladatel.txt` |
| `Prompty.mp.prompt.json` | `Prompty.json` |
| `Analyza-dat.mp.prompt.md` | `Analyza-dat.md` |

---

## Nastavení promptu

U formátů `.txt` a `.md` platí, že jeden soubor představuje **jeden prompt**. Pokud chceš nastavit čistý název promptu a zapnout pokročilé vlastnosti, přidej na první řádek konfigurační hlavičku.

</div>

**Jak hlavička funguje:**

* Musí být **úplně na prvním řádku** souboru.
* Musí být uzavřená ve dvojitých složených závorkách: `{{ ... }}`.
* Jednotlivé parametry odděluj **středníkem** `;`.

**Dostupné parametry:**

* `title:` název promptu.
* `usePlaceholders:` hodnota `true` zapne režim dynamického promptu.
* `autoExecute:` hodnota `true` po kliknutí prompt rovnou odešle.

**Příklad prvního řádku:**

```text
{{title: Můj pracovní prompt; usePlaceholders: true; autoExecute: true}}
```

> Tento první řádek se při importu automaticky odstraní a nebude součástí textu promptu. Pokud ho nepoužiješ, systém vezme název ze souboru a pokročilé volby nechá vypnuté.

---

<div align="center">

## Výběr vhodného formátu

My Prompt podporuje tři formáty. Každý se hodí pro jiný způsob sdílení.
</div>

### 1. JSON - doporučená volba

JSON je nejspolehlivější a nejpraktičtější formát. Jako jediný umožňuje importovat **více promptů najednou**, takže se hodí pro balíčky typu „SEO sada“, „Vývojářské prompty“ nebo „Analytické šablony“.

```json
[
  {
    "title": "Efektivní shrnutí",
    "text": "Přečti následující text a vytvoř stručné, přehledné shrnutí.\\n\\nZachovej hlavní myšlenku, důležitá fakta a případné akční kroky.\\n\\nVýstup rozděl do těchto částí:\\n- Hlavní sdělení\\n- Důležité body\\n- Doporučené další kroky",
    "usePlaceholders": true,
    "autoExecute": true
  }
]
```

### 2. TXT - rychlé a jednoduché

TXT je ideální, když chceš prompt rychle napsat v poznámkovém bloku a sdílet ho bez další struktury. Text se načte tak, jak je napsaný, včetně řádkování.

```text
{{title: Jednoduché shrnutí; usePlaceholders: true; autoExecute: true}}
Přečti následující text a vytvoř stručné shrnutí.

Zachovej hlavní význam a vypiš jen informace, které jsou důležité pro rozhodnutí.

Výstup napiš takto:
- Hlavní sdělení
- Důležité body
- Doporučené další kroky
```

### 3. MARKDOWN - použitelné, ale opatrně

Markdown je podporovaný, ale GitHub Gist ho na stránce vykresluje jako HTML. My Prompt proto používá zpětný převod z viditelného obsahu zpět do Markdown textu. Hodí se, pokud chceš, aby byl Gist dobře čitelný i pro člověka, ale pro technicky nejčistší sdílení je lepší JSON.

```md
{{title: Markdown prompt; usePlaceholders: true; autoExecute: true}}
# Úkol

Přečti dodaný text a připrav výstup pro pracovní poradu.

## Výstup

* **Shrnutí:** hlavní myšlenka v několika větách.
* **Rizika:** body, které mohou způsobit problém.
* **Další kroky:** konkrétní návrhy navazujících akcí.

> Zachovej věcný tón a nevymýšlej informace, které v textu nejsou.
```

---

<div align="center"><h2>Jak prompt sdílet</h2></div>

1. **Účet na GitHubu:** Pro sdílení potřebuješ GitHub účet a přístup ke službě [gist.github.com](https://gist.github.com). Pro samotný import veřejných promptů přihlášení nutné není.
2. **Název souboru:** Do pole **„Filename including extension...“** zadej název se suffixem `.mp.prompt.`, například `analyza-zapisu.mp.prompt.txt`.
3. **Obsah promptu:** Do hlavního editoru vlož strukturovaný obsah promptu v jednom z podporovaných formátů.
4. **Viditelnost:** Pokud chceš, aby prompt našli i ostatní uživatelé, zvol **„Create public gist“**. Soukromý nebo tajný Gist lze sdílet odkazem, ale nemusí být dostupný přes veřejné vyhledávání.
5. **Sdílení odkazu:** Po publikování použij URL v adresním řádku pro sdílení.

<div align="center">
<p>Při otevření stránky s promptem na Gistu vloží My Prompt tlačítko <b>„Importovat prompt“</b> vedle tlačítka <b>„Raw“</b>. Kliknutím se spustí import do knihovny promptů.</p>

<img src="https://i.ibb.co/Z6nz7Vn5/2.gif" width="800" height="630.297"></img>

---

## Vyhledávání ukázek

Veřejné ukázky promptů můžeš hledat podle technické přípony `.mp.prompt.`:

**[Vyhledat veřejné prompty na GitHub Gist](https://gist.github.com/search?o=desc&q=%22.mp.prompt.%22&s=updated)**

</div>

---

## Bezpečnostní poznámky

- Importuj jen prompty, kterým rozumíš. Prompt je sice text, ale může obsahovat instrukce, které pošlou citlivý obsah do AI.
- Neumisťuj do veřejných Gistů API klíče, hesla, interní dokumenty ani osobní údaje.
- Pokud prompt obsahuje automatické odeslání (`autoExecute: true`), před prvním použitím si zkontroluj jeho text.
- U balíčků v JSONu si ověř, kolik promptů importuješ a zda názvy odpovídají očekávání.
