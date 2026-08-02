import { Link as RouterLink } from "react-router";
import {
  Box,
  Container,
  Heading,
  Link,
  List,
  Separator,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Privacy() {
  return (
    <Container maxW="3xl" py={{ base: 8, sm: 16 }} px={{ base: 4, sm: 8 }}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="3xl" mb={2}>
            Politika privatnosti
          </Heading>
          <Text color="fg.muted" fontSize="sm">
            Posljednje ažuriranje: 2. kolovoza 2026.
          </Text>
        </Box>

        <Separator />

        {/* 1. Uvod */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">1. Uvod</Heading>
          <Text>
            Ova Politika privatnosti opisuje kako <strong>e-Rokovnik</strong>{" "}
            (&quot;mi&quot;, &quot;nas&quot; ili &quot;naš&quot;) prikuplja,
            koristi, obrađuje i štiti vaše osobne podatke prilikom korištenja
            naše web aplikacije (&quot;Usluga&quot;).
          </Text>
          <Text>
            Obrada osobnih podataka provodi se u skladu s Općom uredbom o
            zaštiti podataka (GDPR — Uredba EU 2016/679), Zakonom o provedbi
            Opće uredbe o zaštiti podataka (NN 42/2018) te ostalim primjenjivim
            propisima Republike Hrvatske i Europske unije.
          </Text>
        </VStack>

        {/* 2. Voditelj obrade */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">2. Voditelj obrade podataka</Heading>
          <Text>
            Voditelj obrade vaših osobnih podataka je vlasnik projekta
            e-Rokovnik. Za sva pitanja vezana uz zaštitu podataka možete nas
            kontaktirati putem e-pošte. Kontakt podaci dostupni su u odjeljku
            &quot;Kontakt&quot; na dnu ove politike.
          </Text>
        </VStack>

        {/* 3. Koje podatke prikupljamo */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">3. Koje podatke prikupljamo</Heading>

          <Heading size="md">3.1. Podaci koje nam dajete izravno</Heading>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Adresa e-pošte</strong> — koristi se za prijavu i
              komunikaciju
            </List.Item>
            <List.Item>
              <strong>Ime</strong> — koristi se za personalizaciju unutar
              aplikacije
            </List.Item>
            <List.Item>
              <strong>Lozinka</strong> — pohranjena u kriptiranom obliku putem
              Firebase Authentication; nikada je ne vidimo u čitljivom obliku
            </List.Item>
          </List.Root>

          <Heading size="md" mt={2}>
            3.2. Podaci koje unosite u aplikaciju
          </Heading>
          <List.Root gap={2} pl={4}>
            <List.Item>Dnevne bilješke i planove nastavnih sati</List.Item>
            <List.Item>
              Podatke o učenicima (ime, prezime, bilješke) — unutar digitalnog
              rokovnika
            </List.Item>
            <List.Item>Raspored sati i kalendarske unose</List.Item>
          </List.Root>

          <Heading size="md" mt={2}>
            3.3. Podaci prikupljeni automatski
          </Heading>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Tehnički podaci:</strong> IP adresa, vrsta preglednika,
              verzija preglednika, vremenska zona, operativni sustav
            </List.Item>
            <List.Item>
              <strong>Podaci o korištenju:</strong> stranice koje posjećujete,
              vrijeme provedeno na stranicama, interakcije s elementima
              aplikacije
            </List.Item>
            <List.Item>
              <strong>Kolačići (cookies):</strong> koristimo isključivo nužne
              kolačiće za funkcioniranje aplikacije (npr. sesija prijave putem
              Firebase Authentication) i funkcionalne kolačiće za pamćenje
              postavki (npr. tamni/svijetli način rada)
            </List.Item>
          </List.Root>
        </VStack>

        {/* 4. Svrha obrade */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">4. Svrha i pravna osnova obrade</Heading>
          <Table.Root size="sm" variant="line" mt={2}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Svrha</Table.ColumnHeader>
                <Table.ColumnHeader>Pravna osnova</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Pružanje Usluge i upravljanje računom</Table.Cell>
                <Table.Cell>Izvršenje ugovora (čl. 6/1/b GDPR)</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sigurnost i zaštita od zlouporabe</Table.Cell>
                <Table.Cell>Legitimni interes (čl. 6/1/f GDPR)</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Pohrana korisničkog sadržaja (bilješke, planovi)
                </Table.Cell>
                <Table.Cell>Izvršenje ugovora (čl. 6/1/b GDPR)</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kolačići nužni za rad aplikacije</Table.Cell>
                <Table.Cell>Legitimni interes (čl. 6/1/f GDPR)</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </VStack>

        {/* 5. Gdje pohranjujemo podatke */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">5. Pohrana i obrada podataka</Heading>
          <Text>
            Vaši podaci pohranjuju se i obrađuju putem sljedećih pružatelja
            usluga:
          </Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Firebase Authentication (Google LLC)</strong> —
              autentifikacija korisnika (e-pošta, lozinka u hashiranom obliku)
            </List.Item>
            <List.Item>
              <strong>Cloud Firestore (Google LLC)</strong> — pohrana
              korisničkih podataka (ime, bilješke, planovi, podaci o učenicima);
              podaci se pohranjuju na serverima unutar Europske unije (eur3
              regija)
            </List.Item>
            <List.Item>
              <strong>Firebase Hosting (Google LLC)</strong> — posluživanje web
              aplikacije
            </List.Item>
          </List.Root>
          <Text>
            Google LLC je certificiran prema EU-US Data Privacy Frameworku
            (DPF), što osigurava odgovarajuću razinu zaštite podataka pri
            međunarodnom prijenosu.
          </Text>
        </VStack>

        {/* 6. Razdoblje čuvanja */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">6. Razdoblje čuvanja podataka</Heading>
          <Text>
            Vaše osobne podatke čuvamo onoliko dugo koliko je potrebno za
            pružanje Usluge:
          </Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Podaci korisničkog računa:</strong> čuvaju se dok je račun
              aktivan. Nakon brisanja računa, svi povezani podaci trajno se
              brišu u roku od 14 dana.
            </List.Item>
            <List.Item>
              <strong>Korisnički sadržaj (bilješke, planovi):</strong> čuvaju se
              dok ih sami ne obrišete ili dok ne obrišete račun.
            </List.Item>
            <List.Item>
              <strong>Sigurnosni zapisi:</strong> čuvaju se do 6 mjeseci radi
              zaštite od zlouporabe.
            </List.Item>
          </List.Root>
        </VStack>

        {/* 7. Vaša prava */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">7. Vaša prava prema GDPR-u</Heading>
          <Text>Kao ispitanik, imate sljedeća prava:</Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Pravo na pristup</strong> — možete zatražiti uvid u osobne
              podatke koje čuvamo o vama.
            </List.Item>
            <List.Item>
              <strong>Pravo na ispravak</strong> — možete zatražiti ispravak
              netočnih ili nepotpunih podataka.
            </List.Item>
            <List.Item>
              <strong>Pravo na brisanje (&quot;pravo na zaborav&quot;)</strong>{" "}
              — možete zatražiti brisanje svih vaših osobnih podataka. Opciju za
              brisanje računa možete pronaći u izborniku aplikacije.
            </List.Item>
            <List.Item>
              <strong>Pravo na ograničenje obrade</strong> — možete zatražiti
              ograničenje obrade vaših podataka.
            </List.Item>
            <List.Item>
              <strong>Pravo na prijenos podataka</strong> — možete zatražiti
              kopiju svojih podataka u strukturiranom, strojno čitljivom
              formatu.
            </List.Item>
            <List.Item>
              <strong>Pravo na prigovor</strong> — možete uložiti prigovor na
              obradu vaših osobnih podataka.
            </List.Item>
            <List.Item>
              <strong>Pravo na podnošenje pritužbe</strong> — možete podnijeti
              pritužbu nadzornom tijelu: Agencija za zaštitu osobnih podataka
              (AZOP), Selska cesta 136, 10000 Zagreb, azop@azop.hr.
            </List.Item>
          </List.Root>
        </VStack>

        {/* 8. Sigurnost */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">8. Sigurnost podataka</Heading>
          <Text>
            Primjenjujemo odgovarajuće tehničke i organizacijske mjere za
            zaštitu vaših osobnih podataka od neovlaštenog pristupa, izmjene,
            otkrivanja ili uništenja:
          </Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              Sva komunikacija između vašeg preglednika i naših servera
              šifrirana je putem HTTPS/TLS protokola.
            </List.Item>
            <List.Item>
              Lozinke se pohranjuju isključivo u hashiranom i salted obliku
              putem Firebase Authentication.
            </List.Item>
            <List.Item>
              Pristup osobnim podacima ograničen je isključivo na vlasnika
              projekta.
            </List.Item>
            <List.Item>
              Redovito ažuriramo softver i sigurnosne zakrpe.
            </List.Item>
          </List.Root>
        </VStack>

        {/* 9. Kolačići */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">9. Kolačići (Cookies)</Heading>
          <Text>
            e-Rokovnik koristi isključivo sljedeće kategorije kolačića:
          </Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Nužni kolačići:</strong> potrebni za funkcioniranje
              aplikacije — sesijski kolačić za prijavu (Firebase
              Authentication). Bez njih Usluga ne može raditi.
            </List.Item>
            <List.Item>
              <strong>Funkcionalni kolačići:</strong> pamte vaše postavke (npr.
              odabir tamnog/svijetlog načina prikaza) kako bi poboljšali vaše
              korisničko iskustvo.
            </List.Item>
          </List.Root>
          <Text>
            <strong>Ne koristimo</strong> marketinške kolačiće, kolačiće za
            praćenje trećih strana niti analitičke kolačiće (poput Google
            Analyticsa).
          </Text>
        </VStack>

        {/* 10. Promjene politike */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">10. Promjene politike privatnosti</Heading>
          <Text>
            Zadržavamo pravo povremeno ažurirati ovu Politiku privatnosti. O
            značajnim promjenama obavijestit ćemo vas putem e-pošte ili
            istaknute obavijesti unutar aplikacije. Datum posljednje izmjene
            uvijek je naveden na vrhu ove stranice.
          </Text>
        </VStack>

        {/* 11. Kontakt */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">11. Kontakt</Heading>
          <Text>
            Za sva pitanja vezana uz ovu Politiku privatnosti ili za
            ostvarivanje vaših prava prema GDPR-u, kontaktirajte nas putem
            e-pošte. Kontakt podaci bit će objavljeni nakon finalizacije
            projekta.
          </Text>
        </VStack>

        <Separator />

        {/* Back link */}
        <Box textAlign="center">
          <Link asChild colorPalette="primary">
            <RouterLink to="/">← Povratak na početnu</RouterLink>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
}
