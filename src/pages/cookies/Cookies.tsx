import { Link as RouterLink } from "react-router";
import {
  Box,
  Container,
  Heading,
  Button,
  List,
  Separator,
  Table,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";

export default function Cookies() {
  return (
    <Container maxW="3xl" py={{ base: 8, sm: 16 }} px={{ base: 4, sm: 8 }}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="3xl" mb={2}>
            Politika kolačića
          </Heading>
          <Text color="fg.muted" fontSize="sm">
            Posljednje ažuriranje: 2. kolovoza 2026.
          </Text>
        </Box>

        <Separator />

        {/* 1. Što su kolačići */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">1. Što su kolačići?</Heading>
          <Text>
            Kolačići (eng. <em>cookies</em>) su male tekstualne datoteke koje
            web stranica sprema na vaše računalo ili mobilni uređaj prilikom
            posjeta. Služe za pamćenje vaših postavki, održavanje sesije prijave
            i poboljšanje korisničkog iskustva.
          </Text>
        </VStack>

        {/* 2. Koje kolačiće koristimo */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">2. Koje kolačiće koristimo</Heading>
          <Text>
            e-Rokovnik koristi isključivo nužne i funkcionalne kolačiće. Ne
            koristimo marketinške, analitičke niti kolačiće za praćenje trećih
            strana.
          </Text>

          <Table.Root size="sm" variant="line" mt={2}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Naziv</Table.ColumnHeader>
                <Table.ColumnHeader>Svrha</Table.ColumnHeader>
                <Table.ColumnHeader>Trajanje</Table.ColumnHeader>
                <Table.ColumnHeader>Kategorija</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell whiteSpace="nowrap">
                  Firebase Auth sesija
                </Table.Cell>
                <Table.Cell>
                  Održava vašu prijavu na aplikaciju; omogućuje siguran pristup
                  vašem računu
                </Table.Cell>
                <Table.Cell>Trajanje sesije</Table.Cell>
                <Table.Cell>Nužni</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell whiteSpace="nowrap">
                  chakra-ui-color-mode
                </Table.Cell>
                <Table.Cell>
                  Pamti vaš odabir tamnog ili svijetlog načina prikaza
                  aplikacije
                </Table.Cell>
                <Table.Cell>Trajno (lokalna pohrana)</Table.Cell>
                <Table.Cell>Funkcionalni</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Text fontSize="sm" color="fg.muted" mt={1}>
            Navedeni kolačići ne sadrže osobne podatke i ne koriste se za
            praćenje vašeg ponašanja na internetu.
          </Text>
        </VStack>

        {/* 3. Kako upravljati kolačićima */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">3. Kako upravljati kolačićima</Heading>
          <Text>
            Većina preglednika omogućuje vam kontrolu nad kolačićima putem
            postavki. Možete:
          </Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              Blokirati sve kolačiće (što može onemogućiti prijavu u aplikaciju)
            </List.Item>
            <List.Item>
              Brisati postojeće kolačiće putem postavki preglednika
            </List.Item>
            <List.Item>
              Postaviti preglednik da vas upozorava prije spremanja kolačića
            </List.Item>
          </List.Root>
          <Text>
            Upute za upravljanje kolačićima u najčešćim preglednicima:
          </Text>
          <List.Root gap={2} pl={4}>
            <List.Item>
              <strong>Chrome:</strong> Postavke → Privatnost i sigurnost →
              Kolačići i drugi podaci o web-lokacijama
            </List.Item>
            <List.Item>
              <strong>Firefox:</strong> Postavke → Privatnost i sigurnost →
              Kolačići i podaci o web-lokacijama
            </List.Item>
            <List.Item>
              <strong>Safari:</strong> Postavke → Privatnost → Kolačići i podaci
              o web-lokacijama
            </List.Item>
            <List.Item>
              <strong>Edge:</strong> Postavke → Kolačići i dozvole za
              web-lokacije
            </List.Item>
          </List.Root>
        </VStack>

        {/* 4. Povezane politike */}
        <VStack gap={3} align="stretch">
          <Heading size="lg">4. Povezane politike</Heading>
          <Text>
            Za više informacija o tome kako obrađujemo vaše osobne podatke,
            pročitajte našu{" "}
            <Link
              asChild
              fontWeight="bold"
              css={{ textDecorationColor: "currentColor" }}
            >
              <RouterLink to="/politika-privatnosti">
                Politiku privatnosti
              </RouterLink>
            </Link>
            .
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
