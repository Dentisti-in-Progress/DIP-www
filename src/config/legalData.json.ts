// src/config/legalData.json.ts - contenu des pages privacy et terms, une version par langue : copie generique, prete a personnaliser.

import type { Locale } from "@i18n";
import type { LegalDocument } from "./types/configDataTypes";

// Deux documents rendus par le meme template de page. La copie est volontairement
// generique ("nous", "le service") : l'utilisateur l'adapte et la fait valider par
// son conseil. Aucun passage entre crochets ici : les champs a completer vivent
// dans les mentions legales, sous src/i18n/ui/en/pages.ts et son equivalent
// francais. Ceci n'est pas un avis juridique, et la version francaise n'en est
// pas davantage une : les deux textes disent la meme chose, aucun ne fait foi
// sur l'autre.

type LegalPages = { privacy: LegalDocument; terms: LegalDocument };

const en: LegalPages = {
  privacy: {
    title: "Privacy policy",
    description: "What we collect, why we collect it, and the choices you have over your data.",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Who we are",
        body: "This policy describes how we collect, use and protect personal information when you visit our website or use our service. It applies to visitors, trial users and paying customers alike. If you have any question about it, you can reach us at any time through the contact page.",
      },
      {
        title: "Information we collect",
        body: "We collect the information you give us directly, such as your name, email address and company details when you create an account or contact us. We also collect usage information generated as you use the service, such as pages visited, features used and device data, along with any content you choose to store in your workspace.",
      },
      {
        title: "How we use your information",
        body: "We use your information to provide and improve the service, to secure accounts, to respond to your requests, and to send service messages such as billing notices and important changes. With your consent, we may also send product news, and every such message includes a way to opt out.",
      },
      {
        title: "Legal bases for processing",
        body: "Where data protection law requires a legal basis, we rely on the performance of our contract with you, on our legitimate interest in operating and improving the service, on your consent where we ask for it, and on our legal obligations, for example in accounting matters.",
      },
      {
        title: "Cookies and analytics",
        body: "We use a small number of cookies to keep you signed in and to remember your preferences. Our analytics measure aggregate usage of the site and never build advertising profiles. You can block cookies in your browser; the parts of the site that do not require an account will keep working.",
      },
      {
        title: "How we share information",
        body: "We never sell personal information. We share it only with the processors that help us run the service, such as hosting, payment and email providers, each bound by a data processing agreement, and with authorities where the law requires it. A current list of processors is available on request.",
      },
      {
        title: "Data retention and deletion",
        body: "We keep personal information for as long as your account is active and for a limited period afterwards to comply with legal obligations. When you delete your account, or ask us to, we delete or anonymize your data within 30 days, except where a longer retention is required by law.",
      },
      {
        title: "Your rights",
        body: "Depending on where you live, you may have the right to access, correct, export, restrict or delete the personal information we hold about you, and to object to certain processing. To exercise any of these rights, contact us through the contact page and we will respond within the legal deadline.",
      },
      {
        title: "Changes to this policy",
        body: "We may update this policy as the service or the law evolves. When we make a material change, we will notify account holders by email or through the service before the change takes effect, and the date at the top of this page will always reflect the latest version.",
      },
    ],
  },

  terms: {
    title: "Terms of service",
    description: "The agreement that governs your use of the service, in plain language.",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Agreement to these terms",
        body: "By creating an account or using the service, you agree to these terms on your own behalf or on behalf of the organization you represent. If you do not agree with them, please do not use the service. If you accept for an organization, you confirm that you have authority to bind it.",
      },
      {
        title: "Your account",
        body: "You are responsible for your account credentials and for the activity that happens under your account. Keep your password secure, use accurate registration information, and tell us promptly if you suspect unauthorized access. Accounts are for organizations and their members, not for resale.",
      },
      {
        title: "Acceptable use",
        body: "You agree to use the service lawfully and respectfully. You will not attempt to breach its security, disrupt its operation, access data that is not yours, or use it to store or distribute unlawful, infringing or harmful content. We may suspend accounts that put the service or its users at risk.",
      },
      {
        title: "Your content and data",
        body: "You retain all rights to the content and data you bring into the service. You grant us the limited license needed to host, process and display that content in order to provide the service to you, and nothing more. You can export your data at any time in standard formats.",
      },
      {
        title: "Subscriptions and billing",
        body: "Paid plans are billed in advance, monthly or yearly, and renew automatically until cancelled. You can cancel at any time from the billing page, effective at the end of the current period. Prices may change with at least 30 days notice, and changes never apply retroactively to a period you have already paid.",
      },
      {
        title: "Termination",
        body: "You may stop using the service and delete your account at any time. We may suspend or terminate accounts that materially breach these terms, after notice where practical. After termination we make your data available for export for 30 days, then delete it in line with our privacy policy.",
      },
      {
        title: "Disclaimers and limitation of liability",
        body: "The service is provided as is, without warranties beyond those that cannot be excluded by law. To the maximum extent permitted, our total liability for any claim related to the service is limited to the amounts you paid us in the twelve months before the event giving rise to the claim.",
      },
      {
        title: "Changes to the service and these terms",
        body: "We improve the service continuously and may add, change or retire features. We may also update these terms; when a change is material, we will give account holders reasonable advance notice. Continued use of the service after a change takes effect constitutes acceptance of the new terms.",
      },
      {
        title: "Contact",
        body: "Questions about these terms, or about anything else in this document, are welcome through the contact page. For legal notices, use the postal or email address listed there, and we will confirm receipt as soon as possible.",
      },
    ],
  },
};

const byLocale: Record<Locale, LegalPages> = { it: en, en };

/** Les deux documents legaux dans la langue demandee. */
export function getLegalData(locale: Locale): { privacy: LegalDocument; terms: LegalDocument } {
  return byLocale[locale];
}
