# Průvodce dynamickými prompty

Tento dokument vysvětluje, jak v My Prompt vytvářet interaktivní formuláře, sbírat hodnoty do proměnných, skládat výběrové nabídky a automaticky vkládat data do promptu ještě před jeho odesláním umělé inteligenci.

---

## Přehled syntaxe

Níže jsou uvedené hlavní příkazy, které systém podporuje. Můžeš je kombinovat od jednoduchých formulářů až po složité prompty s větvením, proměnnými a přílohami.

| Funkce | Syntaxe / příklad | Význam |
| :--- | :--- | :--- |
| **Volný text** | `[Popisek]` | Vytvoří jednoduché textové pole. Text v hranatých závorkách se použije jako název pole ve formuláři. |
| **Text + proměnná** | `[Popisek = $promenna]` | Vytvoří pole, vloží odpověď na místo deklarace a zároveň ji uloží do proměnné `$promenna` pro další použití. |
| **Skrytá deklarace proměnné** | `{Popisek = $promenna}` | Hodnotu uloží, ale samotnou deklaraci nevloží do finálního promptu. Výsledek se zobrazí až tam, kde později zavoláš `$promenna`. |
| **Použití proměnné** | `$promenna` | Vloží dříve vyplněnou nebo vybranou hodnotu kamkoliv v promptu. |
| **Výchozí textová hodnota** | `[Popisek :: Výchozí text]` | Předvyplní textové pole nebo proměnnou výchozí hodnotou. |
| **Výchozí volba v nabídce** | `[Možnost :: x]` | Označí danou možnost jako předvybranou, aby ji uživatel nemusel ručně zaškrtávat. |
| **Komentář / nápověda** | `[Popisek](Tip)` | Přidá k prvku krátkou vizuální nápovědu. Závorka musí navazovat přímo na prvek, bez mezery. |
| **Blok nabídky** | `#start` ... `#end` | Vymezí oblast výběrové nabídky. Otevírací a zavírací značka musí být symetrická, například `###start` patří k `###end`. |
| **Nadpis skupiny** | `# Název skupiny` | Vytvoří nadpis uvnitř nabídky a pomůže oddělit skupiny možností. |
| **Vícenásobný výběr** | `+ [Možnost]` | Umožní vybrat více možností současně. |
| **Jedna volba** | `- [Možnost]` | Po výběru této možnosti se ostatní možnosti ve stejné skupině automaticky odznačí. |
| **Vyloučení podle ID** | `1 [Možnost A]`<br>`1 [Možnost B]` | Pokročilé pravidlo: možnosti se stejným ID číslem nelze vybrat současně. |
| **Nabídka na jednom řádku** | `#start // + [A] // #end` | Vytvoří celou nabídku v jedné řádce. Oddělovač `//` je povinný mezi názvem a možnostmi. |
| **Volba „Jiné“** | `[#]` | Speciální volba, která po zaškrtnutí otevře volné textové pole. Nepotřebuje prefix `+` ani `-`. |
| **Skrytá hodnota pro AI** | `'Text pro AI'` | Uživatel vidí krátkou možnost, ale do promptu se odešle text v uvozovkách. Uvnitř lze použít i proměnné. |
| **Ochranný blok** | `#ignore` ... `#end` | Zakáže čtení dynamické syntaxe uvnitř bloku. Hodí se pro ukázky kódu nebo texty s hranatými závorkami. |
| **Escape znaku** | `\[Text\]` nebo `\:\:` | Zpětné lomítko `\` zruší speciální význam konkrétního znaku. Například zabrání tomu, aby se hranaté závorky změnily na textové pole. |
| **Datum a čas** | `#date` / `#time` | Vloží aktuální datum nebo čas. Podporuje kombinace a přípony jako `-SS`, `-YY`, `+date`, `+time`. |
| **Nahrání souboru** | `#file(Pokyn)` | Vytvoří místo pro přiložení dokumentů, které se použijí jen v aktuální relaci a zbytečně nezatěžují uložená data. |

---

## Jak dynamický prompt navrhnout

Dynamický prompt si představ jako spojení formuláře a instrukce pro AI. Nemusíš programovat; stačí promyslet, která data má uživatel vyplnit, kde se mají použít a které části promptu mají zůstat přehledné.

1. **Začni sběrem údajů**

   Pokud prompt potřebuje obecné informace, například jméno zákazníka, styl komunikace nebo cílový formát, dej je na začátek. Pro hodnoty, které nemají být vidět hned v úvodu výsledného promptu, použij skrytou deklaraci `{Popisek = $promenna}` a potom hodnotu vlož až v místě, kde ji má AI skutečně číst.

2. **Vytvoř výběrové nabídky**

   Možnosti obal značkami `#start` a `#end`. Přidej srozumitelný nadpis, například `# Vyber formát výstupu`, a zvol správný typ výběru: `+` pro více možností, `-` pro jednu možnost. Pokud má být rozhraní jednoduché, ale instrukce pro AI podrobná, použij skryté hodnoty v uvozovkách.

3. **Zapoj systémové prvky**

   Potřebuješ do promptu přidat přílohu, tabulku nebo PDF? Použij `#file(Přilož dokument)`. Pokud chceš do výstupu vložit okamžik vytvoření zprávy, přidej například `#date+time`.

4. **Chraň text, který není příkaz**

   Když prompt obsahuje ukázky kódu, hranaté závorky nebo jiné znaky, které mají zůstat obyčejným textem, použij `\[` a `\]`, případně celý úsek vlož mezi `#ignore` a `#end`.

---

## Časté chyby a doporučení

- **Neuzavřené bloky a závorky:** Nenechávej otevřený prvek typu `[Popisek` a nikdy nezačínej `#start` nebo `#ignore` bez odpovídajícího `#end`.
- **Porušená symetrie značek:** Pokud otevřeš blok jako `###start`, musíš ho zavřít jako `###end`. Stejný princip platí i u skrytých hodnot s vícenásobnými uvozovkami.
- **Mezery na nesprávném místě:** Proměnná musí být zapsaná jako `$jmeno`, ne `$ jmeno`. Komentář musí navazovat bez mezery: `[Možnost](Tip)`, ne `[Možnost] (Tip)`.
- **Zbytečné množení příloh:** Jeden prvek `#file` už umožňuje přidat více souborů. Není potřeba v promptu opakovat několik stejných polí pro nahrání.
- **Příliš složitý první návrh:** U komplikovaných promptů začni malým funkčním formulářem a teprve potom přidávej výjimky, skryté hodnoty a pravidla vyloučení.

---

## Praktický příklad pro import

Nejrychlejší způsob, jak si dynamický prompt osahat, je vytvořit malý `.mp.prompt.json` nebo `.mp.prompt.txt` soubor a importovat ho přes funkci My Prompt. Na GitHub Gist můžeš také vyhledat veřejné ukázky podle přípony `.mp.prompt.`:

**[Vyhledat ukázkové prompty na GitHub Gist](https://gist.github.com/search?o=desc&q=%22.mp.prompt.%22&s=updated)**

Při používání cizích ukázek si vždy zkontroluj obsah promptu před importem. Prompt je textová instrukce, takže by měl být srozumitelný, bez podezřelých odkazů a bez vložených tajných údajů.

---

## Další studium

Pokud ti dělá potíže symetrie bloků, skryté hodnoty, skupinové nabídky nebo proměnné, vrať se k jednoduchému příkladu a rozšiřuj ho po jedné funkci. Dobře navržený dynamický prompt bývá čitelný i po týdnech: názvy polí jsou jasné, proměnné mají smysluplná jména a složité instrukce pro AI jsou schované tam, kde nezahlcují uživatele.

Související dokumenty:

- [Vylepšení promptu pomocí AI](Enhance%20with%20AI.md)
- [Import a sdílení promptů přes GitHub Gist](Sharing%20and%20Importing%20Prompts%20with%20GitHub%20Gist.md)
