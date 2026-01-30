"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullOnboardingSchema } from "@/lib/data/onboarding-schema";
import {
  Button,
  Stepper,
  Stack,
  TextInput,
  NumberInput,
  Select,
  Radio,
  Group,
  Paper,
  Title,
  Text,
  Divider,
} from "@mantine/core";
import { step1Schema, step2Schema, step3Schema, step4Schema } from "@/lib/data/onboarding-schema";
import { CameraCapture } from "@/components/CameraCapture";
import type { OnboardingFormValues } from "@/lib/types/onboarding";

const STEP1_DEFAULT = { productType: "general" as const, liabilitySubType: "obcanskopravni" as const };
const STEP2_DEFAULT = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};
const STEP3_DEFAULT = { limitAmount: 1_000_000, deductible: 0 };
const STEP4_DEFAULT = {
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
};

const productLabels = {
  motor: "Povinné ručení (pojištění odpovědnosti z provozu vozidla)",
  general: "Odpovědnost za škodu (občanskoprávní, z povolání, domácnost)",
};
const subTypeLabels = {
  obcanskopravni: "Občanskoprávní odpovědnost",
  z_povolani: "Odpovědnost z povolání",
  domacnost: "Provoz domácnosti",
};

export function OnboardingWizard() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [documentImage, setDocumentImage] = useState<string | null>(null);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(fullOnboardingSchema),
    defaultValues: {
      ...STEP1_DEFAULT,
      ...STEP2_DEFAULT,
      ...STEP3_DEFAULT,
      ...STEP4_DEFAULT,
    },
    mode: "onChange",
  });

  const step1Valid = step1Schema.safeParse({
    productType: form.watch("productType"),
    liabilitySubType: form.watch("liabilitySubType"),
  }).success;
  const step2Valid = step2Schema.safeParse({
    firstName: form.watch("firstName"),
    lastName: form.watch("lastName"),
    email: form.watch("email"),
    phone: form.watch("phone"),
    address: form.watch("address"),
    city: form.watch("city"),
    postalCode: form.watch("postalCode"),
  }).success;
  const step3Valid = step3Schema.safeParse({
    limitAmount: form.watch("limitAmount"),
    deductible: form.watch("deductible"),
  }).success;
  const step4Valid = step4Schema.safeParse({
    startDate: form.watch("startDate"),
    endDate: form.watch("endDate"),
  }).success;

  const nextStep = () => {
    form.trigger();
    if (active === 0 && step1Valid) setActive(1);
    else if (active === 1 && step2Valid) setActive(2);
    else if (active === 2 && step3Valid) setActive(3);
    else if (active === 3 && step4Valid) setActive(4);
    else if (active === 4) setActive(5);
  };
  const prevStep = () => setActive((a) => Math.max(0, a - 1));

  const handleSubmit = form.handleSubmit(() => {
    // Mock: no backend, just go to dashboard with "new" contract
    router.push("/dashboard?new=1");
    router.refresh();
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step label="Typ pojištění" description="Účel pojištění">
          <Stack gap="md" mt="md">
            <Radio.Group
              label="Druh pojištění"
              withAsterisk
              value={form.watch("productType")}
              onChange={(v) => form.setValue("productType", v as "motor" | "general")}
            >
              <Stack gap="xs">
                <Radio value="motor" label={productLabels.motor} />
                <Radio value="general" label={productLabels.general} />
              </Stack>
            </Radio.Group>
            {form.watch("productType") === "general" && (
              <Select
                label="Typ odpovědnosti"
                data={[
                  { value: "obcanskopravni", label: subTypeLabels.obcanskopravni },
                  { value: "z_povolani", label: subTypeLabels.z_povolani },
                  { value: "domacnost", label: subTypeLabels.domacnost },
                ]}
                value={form.watch("liabilitySubType") ?? "obcanskopravni"}
                onChange={(v) => form.setValue("liabilitySubType", (v as keyof typeof subTypeLabels) ?? "obcanskopravni")}
              />
            )}
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Pojištěný" description="Údaje o pojistníkovi">
          <Stack gap="md" mt="md">
            <Group grow>
              <TextInput label="Jméno" placeholder="Jan" required {...form.register("firstName")} error={form.formState.errors.firstName?.message} />
              <TextInput label="Příjmení" placeholder="Novák" required {...form.register("lastName")} error={form.formState.errors.lastName?.message} />
            </Group>
            <TextInput label="E-mail" type="email" placeholder="jan@email.cz" required {...form.register("email")} error={form.formState.errors.email?.message} />
            <TextInput label="Telefon" placeholder="+420 123 456 789" required {...form.register("phone")} error={form.formState.errors.phone?.message} />
            <TextInput label="Adresa" placeholder="Ulice 123" required {...form.register("address")} error={form.formState.errors.address?.message} />
            <Group grow>
              <TextInput label="Město" placeholder="Praha" required {...form.register("city")} error={form.formState.errors.city?.message} />
              <TextInput label="PSČ" placeholder="123 45" required {...form.register("postalCode")} error={form.formState.errors.postalCode?.message} />
            </Group>
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Rozsah" description="Limit plnění">
          <Stack gap="md" mt="md">
            <NumberInput
              label="Limit plnění (Kč)"
              placeholder="1 000 000"
              min={100_000}
              max={10_000_000}
              step={100_000}
              thousandSeparator=" "
              required
              value={form.watch("limitAmount")}
              onChange={(v) => form.setValue("limitAmount", Number(v) || 0)}
              error={form.formState.errors.limitAmount?.message}
            />
            <NumberInput
              label="Spoluúčast (Kč) – volitelné"
              placeholder="0"
              min={0}
              value={form.watch("deductible") ?? 0}
              onChange={(v) => form.setValue("deductible", Number(v) || 0)}
            />
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Doba pojištění" description="Od–do">
          <Stack gap="md" mt="md">
            <TextInput
              label="Počátek pojištění"
              type="date"
              required
              value={form.watch("startDate")}
              onChange={(e) => form.setValue("startDate", e.target.value)}
              error={form.formState.errors.startDate?.message}
            />
            <TextInput
              label="Konec pojištění"
              type="date"
              required
              value={form.watch("endDate")}
              onChange={(e) => form.setValue("endDate", e.target.value)}
              error={form.formState.errors.endDate?.message}
            />
          </Stack>
        </Stepper.Step>

        <Stepper.Step label="Dokument" description="Volitelně – foto">
          <Stack gap="md" mt="md">
            <CameraCapture
              onCapture={(dataUrl) => {
                setDocumentImage(dataUrl);
                form.setValue("documentImage", dataUrl);
              }}
              onSkip={() => nextStep()}
            />
            <Button variant="subtle" onClick={nextStep}>
              Přeskočit a pokračovat na souhrn
            </Button>
          </Stack>
        </Stepper.Step>

        <Stepper.Completed>
          <Paper p="lg" radius="md" withBorder mt="md">
            <Title order={3} mb="md">
              Souhrn a cena
            </Title>
            <Stack gap="xs">
              <Text><strong>Typ:</strong> {productLabels[form.getValues("productType")]}</Text>
              <Text><strong>Pojištěný:</strong> {form.getValues("firstName")} {form.getValues("lastName")}</Text>
              <Text><strong>Limit plnění:</strong> {form.getValues("limitAmount").toLocaleString("cs-CZ")} Kč</Text>
              <Text><strong>Doba pojištění:</strong> {form.getValues("startDate")} – {form.getValues("endDate")}</Text>
              <Divider my="sm" />
              <Text size="lg" fw={600}>
                Pojistné (nabídka): <span style={{ color: "var(--mantine-color-brand-6)" }}>2 400 Kč/rok</span>
              </Text>
              <Text size="xs" c="dimmed">
                Prototyp – cena je pouze ilustrativní.
              </Text>
            </Stack>
            <Button type="submit" fullWidth mt="lg" size="md">
              Odeslat a zobrazit smlouvu
            </Button>
          </Paper>
        </Stepper.Completed>
      </Stepper>

      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Zpět
        </Button>
        {active < 5 && (
          <Button onClick={nextStep} disabled={
            (active === 0 && !step1Valid) ||
            (active === 1 && !step2Valid) ||
            (active === 2 && !step3Valid) ||
            (active === 3 && !step4Valid)
          }>
            Další
          </Button>
        )}
      </Group>
    </form>
  );
}
