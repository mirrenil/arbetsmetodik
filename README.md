# Grupprojekt-Arbetsmetodik

## How to run

### Locally:

1. Clone the project to your computer
2. Open terminal in your IDE
3. Run command: npm i
4. Run command: npm start
5. The site will open in your browser on http://localhost:3000/

### Deployed website

https://chubbydog.vercel.app/

---

Limitations:

"About chubby dog" & "Terms and conditions" and social links in footer does not work.
Adding a message with a request is not implemented yet.

---

Av:
**Linnea Albertsson [**github**](https://github.com/liinneea-a)**

**Hazem Kawas [**github**](https://github.com/hazem-89)**

**Adam Hepsever [**github**](https://github.com/AdaHep)**

**Erik Isaksson [**github**](https://github.com/Erikisak)**

**Miranda Nilhag [**github**](https://github.com/mirrenil)**

[Demo](https://chubbydog.vercel.app/)

[Design sketches](https://www.figma.com/file/Z2MXDsZBj8RUHxH7S7ZfXo/Arbetsmetodik?node-id=0%3A1&t=zhZcrKMunr98Z4jP-1)

---

## Kravspecifikation:

-   [x] Det ska gå att skapa ett konto, logga in och logga ut

-   [x] Den som inte är inloggad ska kunna se befintliga annonser men inte lägga upp annonser eller skicka förfrågan om att hyra

-   [x] Det ska gå att klicka på en användare för att se alla användarens annonser

-   [x] En inloggad användare ska kunna gå in på en annons och skicka förfrågan om att hyra

-   [x] En inloggad användare ska kunna lägga upp egna annonser och svara på förfrågningar (godkänna eller neka)

-   [x] Annonser som läggs upp ska ha en bild (med länk eller genom filuppladdning), titel, beskrivning och pris (kan även vara gratis)

-   [x] Det ska finnas ett kategorisystem för annonserna

-   [x] Sidan ska vara fullt responsiv, men med tyngdpunkten på mobil användning

-   [x] Det ska finnas validering på samtliga inputfält

## Övriga önskemål (nice-to-haves):

-   [x] Användaren ska kunna ta bort och ändra sina egna annonser

-   [x] Annonserna ska även tala om var varje föremål finns (stadsdel)

-   [x] Det ska gå att filtrera annonser för att enbart se det som lånas ut gratis

## Krav för godkänt:

-   [ ] Uppgiften är inlämnad i tid på ItsLearning (zippat repo med kompletta startinstruktioner i README-fil, länk till deployad sida och designskisser)

-   [x] Projektet är deployat på t.ex. Netlify eller Vercel

-   [x] Projektet fungerar tillfredsställande och uppfyller kravspecifikationen

-   [x] Genomförd halvtidsavstämning med demo och godkänd opponering

-   [x] Genomförd slutpresentation

-   [x] GitHub har använts på ett strukturerat sätt med tydligt formulerade och avgränsade issues, branches, PR:s, branch protection och code reviews

-   [x] Ett projektbräde i GitHub Projects har använts aktivt och uppdaterats kontinuerligt under projektets gång

-   [x] Ett workflow i GitHub Actions har implementerats i projektet

-   [x] Cypress har implementerats i projektet och minst två tester har skapats för att testa funktionaliteten efter feedback från opponeringen

## Krav för väl godkänt:

-   [x] Kraven för godkänt är uppfyllda

-   [x] Minst tre punkter från listan med övriga önskemål har implementerats i projektet (specificera vilka i README-filen)

-   [x] Ytterligare två Cypress-tester (totalt minst fyra tester) har skapats för att testa funktionalitet som ändrats/tillkommit efter feedback från opponeringen. Testerna ska baseras på buggar eller brister i funktionaliteten som kommit fram vid opponeringen.

-   [x] Projektet har ett CI-flöde (eller CI/CD) som omfattar Prettier, lintning med ESLint och testning med Cypress för samtliga PR:s som görs mot main-branchen
