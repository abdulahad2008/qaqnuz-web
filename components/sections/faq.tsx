"use client";

import { Section, Container, SectionHeader } from "@/components/ui/section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";

const faqs = [
  {
    q: "What exactly is Qaqnuz?",
    a: "Qaqnuz is an AI-native automation platform that manages Instagram DMs, comments, and story mentions for Uzbekistan-based brands. It runs every incoming message through an 8-stage AI pipeline — qualify, classify, retrieve, compose, guard, evaluate, trust gate, publish — with 9 safety checks on every response. Operators retain full control through the Mission Control dashboard, with human override always one click away.",
  },
  {
    q: "How long does setup take?",
    a: "Most brands are live within 1–3 business days. The setup process involves connecting your Instagram Business account, configuring your brand profile (voice, products, FAQs, guardrails), and starting at Trust Level L1 where every response is reviewed before publishing. Your customer success manager guides you through onboarding.",
  },
  {
    q: "Which languages does Qaqnuz support?",
    a: "Qaqnuz natively supports Uzbek (Latin script), Russian, and English. The AI classifies the language of each incoming message and responds in the same language. Mid-conversation language switches are handled automatically. There is no translation step — the AI works natively in all three languages.",
  },
  {
    q: "How is Qaqnuz priced?",
    a: "Pricing is based on the number of Instagram accounts and monthly message volume. All plans include the full 8-stage pipeline and 9 safety guardrails — you pay for scale, not for features. Contact us for a customized quote. We do not charge per API call or per LLM token — cost governance is handled internally with configurable per-brand budgets.",
  },
  {
    q: "How does Qaqnuz handle customer data and privacy?",
    a: "Customer messages are processed in real-time and not stored beyond your configured retention period. PII is detected and handled according to your compliance settings. Customers can opt out of AI responses at any time by sending the STOP keyword — their account is flagged immediately and all future messages route to a human operator. We do not use customer data to train models.",
  },
  {
    q: "Is the AI transparent with customers — do they know they're talking to AI?",
    a: "AI disclosure is configurable per brand. You can set Qaqnuz to include a disclosure message in its first reply, add a note in the brand bio, or operate without disclosure (where local regulations permit). We recommend transparency and provide templated disclosure language in Uzbek, Russian, and English.",
  },
  {
    q: "What integrations does Qaqnuz support?",
    a: "Qaqnuz integrates with Instagram Business API (DMs, comments, story mentions), Click, Payme, Uzum, and Humo payment systems, and Telegram for operator notifications. The platform is designed as a standalone system — it does not require third-party CRM integration to function, though export APIs are available in the Enterprise tier.",
  },
  {
    q: "What kind of support does Qaqnuz offer?",
    a: "All plans include onboarding assistance and documentation. Growth plans include priority email/chat support with a dedicated customer success manager. Enterprise plans include an SLA, named account support, and a dedicated Slack or Telegram channel with your team.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" variant="surface">
      <Container size="sm">
        <FadeIn>
          <SectionHeader
            overline="FAQ"
            title="Common questions."
            description="Everything you need to know before booking a demo."
            center
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </Container>
    </Section>
  );
}
