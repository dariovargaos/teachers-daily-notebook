import { Link as RouterLink } from "react-router";
import {
  Box,
  Button,
  Container,
  Heading,
  List,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Terms() {
  return (
    <Container maxW="3xl" py={{ base: 8, sm: 16 }} px={{ base: 4, sm: 8 }}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="3xl" mb={2}>
            Uvjeti korištenja
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
            Dobrodošli u <strong>e-Rokovnik</strong> (&quot;Usluga&quot;),
            digitalni planer za učitelje. Korištenjem naše Usluge prihvaćate ove
            Uvjete korištenja (&quot;Uvjeti&quot;). Ako se ne slažete s ovim
            Uvjetima, nemojte koristiti Uslugu.
          </Text>
          <Text>
            e-Rokovnik je u vlasništvu i pod upravljanjem fizičke osobe —
            vlasnika projekta. Za sva pitanja možete nas kontaktirati putem
            e-pošte navedene u odjeljku Kontakt.
          </Text>
        </VStack>

        {/* 2. Prihvatljiva upotreba */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">2. Prihvatljiva upotreba</Heading>
          <Text>Slažete se da nećete:</Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              Koristiti Uslugu u nezakonite svrhe ili na način koji krši važeće
              zakone Republike Hrvatske i Europske unije.
            </List.Item>
            <List.Item>
              Pokušati neovlašteno pristupiti dijelovima Usluge, serverima ili
              povezanim sustavima.
            </List.Item>
            <List.Item>
              Prenositi zlonamjeran kod, viruse ili druge štetne sadržaje.
            </List.Item>
            <List.Item>
              Koristiti Uslugu za uznemiravanje, zlostavljanje ili ugrožavanje
              prava drugih korisnika.
            </List.Item>
            <List.Item>
              Dijeliti svoje korisničke podatke za prijavu s trećim osobama.
            </List.Item>
          </List.Root>
        </VStack>

        {/* 3. Korisnički račun */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">3. Korisnički račun</Heading>
          <Text>
            Za korištenje Usluge potrebno je otvoriti korisnički račun.
            Odgovorni ste za čuvanje povjerljivosti svojih podataka za prijavu i
            za sve aktivnosti koje se odvijaju na vašem računu. Obvezni ste
            odmah nas obavijestiti o bilo kakvoj neovlaštenoj upotrebi vašeg
            računa.
          </Text>
          <Text>
            Zadržavamo pravo onemogućiti korisnički račun u bilo kojem trenutku,
            bez prethodne najave, ako utvrdimo kršenje ovih Uvjeta.
          </Text>
        </VStack>

        {/* 4. Intelektualno vlasništvo */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">4. Intelektualno vlasništvo</Heading>
          <Text>
            Svi sadržaji, uključujući ali ne ograničavajući se na tekst,
            grafiku, logotipe, ikone, slike i softver, vlasništvo su e-Rokovnika
            ili njegovih davatelja licenci i zaštićeni su međunarodnim zakonima
            o autorskim pravima.
          </Text>
          <Text>
            Sadržaj koji vi unosite u Uslugu (bilješke, planove, podatke o
            učenicima) ostaje vaše vlasništvo. Korištenjem Usluge dajete nam
            ograničeno pravo na obradu tih podataka isključivo u svrhu pružanja
            Usluge.
          </Text>
        </VStack>

        {/* 5. Ograničenje odgovornosti */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">5. Ograničenje odgovornosti</Heading>
          <Text>
            Usluga se pruža &quot;kako jest&quot; (&quot;as is&quot;) i
            &quot;prema dostupnosti&quot; (&quot;as available&quot;), bez
            ikakvih jamstava, izričitih ili podrazumijevanih. Ne jamčimo da će
            Usluga biti neprekinuta, pravovremena, sigurna ili bez grešaka.
          </Text>
          <Text>
            Ni u kojem slučaju e-Rokovnik, njegov vlasnik, zaposlenici ili
            partneri neće biti odgovorni za bilo kakvu izravnu, neizravnu,
            slučajnu, posebnu ili posljedičnu štetu proizašlu iz korištenja ili
            nemogućnosti korištenja Usluge.
          </Text>
        </VStack>

        {/* 6. Promjene uvjeta */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">6. Promjene uvjeta</Heading>
          <Text>
            Zadržavamo pravo izmjene ovih Uvjeta u bilo kojem trenutku. O
            značajnim promjenama obavijestit ćemo vas putem e-pošte ili
            istaknute obavijesti unutar Usluge. Nastavak korištenja Usluge nakon
            stupanja izmjena na snagu smatra se prihvaćanjem izmijenjenih
            Uvjeta.
          </Text>
        </VStack>

        {/* 7. Prekid korištenja */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">7. Prekid korištenja</Heading>
          <Text>
            Možete prestati koristiti Uslugu u bilo kojem trenutku. Za trajno
            brisanje vašeg računa i svih povezanih podataka, koristite opciju
            &quot;Obriši račun&quot; u izborniku aplikacije ili nas
            kontaktirajte izravno.
          </Text>
          <Text>
            Zadržavamo pravo obustaviti ili ukinuti Uslugu u bilo kojem
            trenutku, s razlogom ili bez njega, uz prethodnu obavijest kada je
            to razumno moguće.
          </Text>
        </VStack>

        {/* 8. Mjerodavno pravo */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">8. Mjerodavno pravo</Heading>
          <Text>
            Ovi Uvjeti podliježu zakonima Republike Hrvatske i primjenjivim
            propisima Europske unije. Svi sporovi proizašli iz ovih Uvjeta
            rješavat će se pred nadležnim sudom u Republici Hrvatskoj.
          </Text>
        </VStack>

        {/* 9. Kontakt */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">9. Kontakt</Heading>
          <Text>
            Za sva pitanja vezana uz ove Uvjete korištenja, možete nas
            kontaktirati putem e-pošte na adresu navedenu u Politici privatnosti
            ili putem kontakt obrasca unutar aplikacije.
          </Text>
        </VStack>

        <Separator />

        {/* Back link */}
        <Box textAlign="center">
          <Button asChild colorPalette="primary" size="sm" rounded="sm">
            <RouterLink to="/">← Povratak na početnu</RouterLink>
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}
