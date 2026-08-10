import { useEffect, useState, type FormEvent } from "react";

type Language = "de" | "en" | "ar";

const heroCopy = {
  de: {
    eyebrow: "Aufenthaltsverfahren · Fachkräfteeinwanderung",
    headline: "Brücke zwischen Fachkräften, Unternehmen und Behörden.",
    intro:
      "Mit fünf Jahren Erfahrung in der Ausländerbehörde, juristischer Qualifikation und einem klaren Blick für die Praxis begleite ich Menschen und Unternehmen sicher durch komplexe Verfahren.",
    book: "Kostenloses Kennenlerngespräch",
    services: "Leistungen entdecken",
    support: "Wie ich Sie unterstütze",
    cards: [
      ["Aufenthaltsverfahren", "Von der Vorbereitung bis zur Entscheidung – strukturiert und verständlich."],
      ["Fachkräfteeinwanderung", "Wege für qualifizierte Fachkräfte – klar, effizient und praxisnah."],
      ["Beratung für Unternehmen", "Verlässliche Begleitung für HR, Management und internationale Teams."],
    ],
  },
  en: {
    eyebrow: "Residence procedures · Skilled immigration",
    headline: "A bridge between skilled professionals, companies and authorities.",
    intro:
      "With five years of experience at a German immigration authority, legal qualifications and a practical perspective, I guide people and companies through complex procedures with confidence.",
    book: "Book a free introductory call",
    services: "Explore services",
    support: "How I support you",
    cards: [
      ["Residence procedures", "From preparation to decision – structured and easy to understand."],
      ["Skilled immigration", "Clear, efficient and practical pathways for qualified professionals."],
      ["Support for companies", "Reliable guidance for HR, management and international teams."],
    ],
  },
  ar: {
    eyebrow: "إجراءات الإقامة · هجرة الكفاءات",
    headline: "جسر يربط بين الكفاءات والشركات والجهات الرسمية.",
    intro:
      "بخبرة خمس سنوات في دائرة شؤون الأجانب، وتأهيل قانوني، وفهم عملي للإجراءات، أرافق الأفراد والشركات بثقة خلال المعاملات المعقدة.",
    book: "احجز مكالمة تعارف مجانية",
    services: "اكتشف الخدمات",
    support: "كيف أساندكم",
    cards: [
      ["إجراءات الإقامة", "من التحضير حتى صدور القرار — بخطوات منظمة وواضحة."],
      ["هجرة الكفاءات", "مسارات واضحة وفعالة وعملية للكفاءات المؤهلة."],
      ["دعم الشركات", "مرافقة موثوقة للموارد البشرية والإدارة والفرق الدولية."],
    ],
  },
} as const;

const nav = {
  de: ["Startseite", "Über mich", "Leistungen", "FAQ", "Kontakt"],
  en: ["Home", "About", "Services", "FAQ", "Contact"],
  ar: ["الرئيسية", "من أنا", "الخدمات", "الأسئلة", "التواصل"],
};

const detailCopy = {
  de: {
    aboutTag: "Über mich",
    aboutTitle: "Verwaltung verstehen. Perspektiven verbinden.",
    aboutLead:
      "2015 kam ich mit meiner damals einjährigen Tochter nach Deutschland. Nach meinem Jurastudium in Damaskus entschied ich mich bewusst für einen Neuanfang in der deutschen Verwaltung.",
    aboutBody:
      "Als Verwaltungsfachangestellte, Sachbearbeiterin, fachliche Teamleiterin und Projektmanagerin für Digitalisierung habe ich die Abläufe der Ausländerbehörde aus nächster Nähe kennengelernt. Heute verbinde ich juristische Qualifikation, Verwaltungserfahrung und persönliche Migrationserfahrung, um internationale Fachkräfte und Unternehmen bundesweit zu unterstützen.",
    profile: "Salwa Saada",
    profileRole: "Gründerin · Saada Global Mobility",
    credentials: [
      "LL.M. · Universität Tübingen (2023)",
      "Refugee Law Clinic · Aufenthalts- und Asylrecht (2024)",
      "Ehem. fachliche Teamleiterin Ausländerbehörde",
      "Ehem. Projektleiterin Digitalisierung",
      "Beratung auf Deutsch, Englisch und Arabisch",
    ],
    audienceTag: "Für wen ich arbeite",
    audienceTitle: "Zwei Perspektiven. Ein klares Ziel.",
    audience: [
      {
        title: "Internationale Fachkräfte",
        text: "Sie möchten in Deutschland arbeiten, Ihren Aufenthalt sichern oder einen neuen Aufenthaltstitel beantragen? Ich helfe Ihnen, Anforderungen zu verstehen und Ihr Verfahren strukturiert vorzubereiten.",
        benefits: ["Mehr Klarheit", "Weniger Unsicherheit", "Strukturierte Vorbereitung", "Zeitersparnis"],
      },
      {
        title: "Unternehmen & HR",
        text: "Sie beschäftigen internationale Fachkräfte oder möchten Mitarbeitende aus dem Ausland gewinnen? Ich begleite Aufenthalts- und Beschäftigungsverfahren praxisnah.",
        benefits: ["Entlastung interner Ressourcen", "Bessere Planbarkeit", "Effizientere Verfahren", "Praxisnahe Unterstützung"],
      },
    ],
    servicesTag: "Leistungen",
    servicesTitle: "So individuell wie Ihre Situation.",
    servicesLead: "Transparente Orientierung, strukturierte Vorbereitung und verlässliche Begleitung.",
    plans: [
      {
        title: "Fallanalyse & Maßnahmenplan",
        price: "ab 250 €",
        meta: "bis zu 2 Stunden",
        text: "Bezahlte Analyse Ihrer Situation mit konkretem, schriftlichem Fahrplan für die nächsten Schritte.",
        features: ["Analyse des Aufenthaltsstatus", "Sichtung vorhandener Unterlagen", "Risiko- und Verfahrenseinschätzung", "Individueller Maßnahmenplan", "Schriftliche nächste Schritte"],
      },
      {
        title: "Begleitung für internationale Fachkräfte",
        price: "450–1.200 €",
        meta: "nach individueller Vereinbarung",
        text: "Für Personen, die ihr Aufenthaltsverfahren besser vorbereiten und strukturieren möchten.",
        features: ["Fallanalyse und Unterlagenprüfung", "Individuelle Dokumentencheckliste", "Unterstützung bei der Zusammenstellung", "Begleitung behördlicher Anforderungen", "E-Mail-Support während der Bearbeitung"],
      },
      {
        title: "Unternehmensberatung Fachkräfteeinwanderung",
        price: "ab 900 €",
        meta: "individuelles Angebot",
        text: "Für Arbeitgeber, die internationale Fachkräfte beschäftigen oder einstellen möchten. Der Preis richtet sich nach Fallzahl und Komplexität.",
        features: ["Fallanalyse und Abstimmung mit HR", "Prüfung der erforderlichen Unterlagen", "Individueller Maßnahmenplan", "Begleitung der Verfahrensphase", "Rückfragen im vereinbarten Umfang"],
      },
    ],
    retainerTag: "Laufende Unternehmensbegleitung",
    retainerTitle: "Laufende Begleitung für Unternehmen",
    retainers: [
      { name: "Individuelles Retainer-Modell", price: "ab 1.500 € / Monat", fit: "Nach Fallzahl, Komplexität und Betreuungsbedarf", points: ["Laufende Begleitung aktiver Fälle", "Regelmäßige Abstimmung mit HR oder Management", "Feste Ansprechpartnerin", "Individuell vereinbarter Leistungsumfang"] },
    ],
    legal:
      "Die Preisangaben dienen der Orientierung. Das konkrete Angebot richtet sich nach Umfang und Komplexität und wird vor Beginn schriftlich vereinbart. Die Leistungen erfolgen im Rahmen der zulässigen Beratungs- und Unterstützungsleistungen; eine anwaltliche Vertretung oder gerichtliche Tätigkeit ist nicht Bestandteil des Angebots.",
    processTag: "Zusammenarbeit",
    processTitle: "Klarheit in fünf Schritten.",
    process: [
      ["Kennenlerngespräch", "Wir besprechen Ihre Situation und Ihren Unterstützungsbedarf – kostenlos für 15–20 Minuten."],
      ["Analyse & Maßnahmenplan", "Ich analysiere die Ausgangslage und entwickle einen strukturierten Fahrplan."],
      ["Individuelles Angebot", "Sie erhalten ein transparentes Angebot mit Umfang und Kosten."],
      ["Begleitung", "Ich unterstütze Sie bei der Vorbereitung und Strukturierung des Verfahrens."],
      ["Laufende Abstimmung", "Während der Zusammenarbeit stehe ich für vereinbarte Rückfragen zur Verfügung."],
    ],
    faqTag: "Häufige Fragen",
    faqTitle: "Gut informiert starten.",
    faqs: [
      ["Für wen ist das Angebot geeignet?", "Für internationale Fachkräfte, Arbeitgeber und Personalverantwortliche mit Fragen zu Aufenthaltsverfahren, Fachkräfteeinwanderung und behördlichen Prozessen."],
      ["Unterstützen Sie bundesweit?", "Ja. Die Zusammenarbeit erfolgt überwiegend digital und ist bundesweit möglich."],
      ["In welchen Sprachen arbeiten Sie?", "Deutsch, Englisch und Arabisch."],
      ["Sind Sie Rechtsanwältin?", "Nein. Eine anwaltliche Vertretung oder gerichtliche Tätigkeit gehört nicht zum Leistungsangebot."],
      ["Können Sie eine Erfolgsgarantie geben?", "Nein. Entscheidungen über Aufenthaltsverfahren werden ausschließlich von den zuständigen Behörden getroffen."],
      ["Was kostet die Unterstützung?", "Die Vergütung richtet sich nach Art, Umfang und Komplexität. Nach dem Kennenlerngespräch erhalten Sie ein transparentes Angebot."],
    ],
    contactTag: "Kontakt",
    contactTitle: "Lassen Sie uns sprechen.",
    contactText: "Vereinbaren Sie ein kostenloses Kennenlerngespräch und erfahren Sie, wie ich Sie oder Ihr Unternehmen unterstützen kann.",
    name: "Name",
    email: "E-Mail",
    message: "Worum geht es?",
    send: "Anfrage per E-Mail vorbereiten",
    bookingTitle: "Kostenloses Kennenlerngespräch",
    bookingIntro: "Wählen Sie für diese Demonstration einen Termin. Der echte Calendly-Link wird später an derselben Stelle eingebunden.",
    choose: "Termin wählen",
    continue: "Weiter",
    details: "Ihre Angaben",
    concern: "Kurzbeschreibung (optional)",
    confirm: "Demo-Buchung abschließen",
    success: "So sieht die Bestätigung aus",
    successText: "Mit dem echten Calendly-Link erhalten Kunde und Beraterin jetzt automatisch eine Bestätigungs-E-Mail und der Termin wird in den verbundenen Kalender eingetragen.",
    demoNote: "Demo-Modus: Es wurde kein echter Termin erstellt und keine E-Mail versendet.",
    close: "Schließen",
  },
  en: {
    aboutTag: "About me",
    aboutTitle: "Understanding administration. Connecting perspectives.",
    aboutLead: "In 2015, I came to Germany with my then one-year-old daughter. After studying law in Damascus, I consciously chose a new beginning in German public administration.",
    aboutBody: "As an administrative professional, case worker, team lead and digitalisation project manager, I learned the inner workings of the immigration authority first-hand. Today, I combine legal qualifications, administrative experience and my own migration experience to support international professionals and companies throughout Germany.",
    profile: "Salwa Saada", profileRole: "Founder · Saada Global Mobility",
    credentials: ["LL.M. · University of Tübingen (2023)", "Refugee Law Clinic · Residence and asylum law (2024)", "Former team lead at an immigration authority", "Former digitalisation project manager", "Support in German, English and Arabic"],
    audienceTag: "Who I work with", audienceTitle: "Two perspectives. One clear goal.",
    audience: [
      { title: "International professionals", text: "Do you want to work in Germany, secure your residence or apply for a new residence title? I help you understand the requirements and prepare your procedure in a structured way.", benefits: ["More clarity", "Less uncertainty", "Structured preparation", "Time saved"] },
      { title: "Companies & HR", text: "Do you employ international professionals or want to recruit abroad? I provide practical guidance through residence and employment procedures.", benefits: ["Reduced internal workload", "Better planning", "More efficient procedures", "Practical support"] },
    ],
    servicesTag: "Services", servicesTitle: "As individual as your situation.", servicesLead: "Clear orientation, structured preparation and reliable guidance.",
    plans: [
      { title: "Case analysis & action plan", price: "from €250", meta: "up to 2 hours", text: "A paid analysis of your situation with a concrete written roadmap for the next steps.", features: ["Residence-status analysis", "Review of available documents", "Risk and process assessment", "Individual action plan", "Written next steps"] },
      { title: "Support for international professionals", price: "€450–1,200", meta: "individually agreed", text: "For people who want to prepare and structure their residence procedure.", features: ["Case analysis and document review", "Individual document checklist", "Help compiling documents", "Guidance on authority requirements", "Email support during processing"] },
      { title: "Skilled-immigration support for employers", price: "from €900", meta: "individual proposal", text: "For employers recruiting or employing international professionals. Pricing depends on the number and complexity of cases.", features: ["Case analysis and HR alignment", "Review of required documents", "Individual action plan", "Guidance during the agreed phase", "Questions within the agreed scope"] },
    ],
    retainerTag: "Ongoing company support", retainerTitle: "Continuous support for companies",
    retainers: [
      { name: "Tailored retainer", price: "from €1,500 / month", fit: "Based on case volume, complexity and support needs", points: ["Ongoing guidance for active cases", "Regular coordination with HR or management", "Dedicated contact person", "Individually agreed scope"] },
    ],
    legal: "Prices are provided for orientation. The final proposal depends on scope and complexity and is agreed in writing before work begins. Services are provided within the legally permitted scope of advisory and support services; legal representation or court work is not included.",
    processTag: "How it works", processTitle: "Clarity in five steps.",
    process: [["Introductory call", "We discuss your situation and support needs – free for 15–20 minutes."], ["Analysis & action plan", "I analyse the starting point and develop a structured roadmap."], ["Individual proposal", "You receive a transparent proposal covering scope and cost."], ["Guidance", "I support you in preparing and structuring the procedure."], ["Ongoing coordination", "I remain available for agreed questions throughout our work."]],
    faqTag: "Frequently asked questions", faqTitle: "Start well informed.",
    faqs: [["Who is the service for?", "International professionals, employers and HR teams seeking support with residence procedures, skilled immigration and administrative processes."], ["Do you work throughout Germany?", "Yes. Our work is mainly digital and available nationwide."], ["Which languages do you offer?", "German, English and Arabic."], ["Are you a lawyer?", "No. Legal representation and court work are not part of the service."], ["Can you guarantee success?", "No. Decisions on residence procedures are made exclusively by the responsible authorities."], ["What does support cost?", "Fees depend on the type, scope and complexity. You receive a transparent proposal after the introductory call."]],
    contactTag: "Contact", contactTitle: "Let’s talk.", contactText: "Book a free introductory call and find out how I can support you or your company.",
    name: "Name", email: "Email", message: "How can I help?", send: "Prepare email enquiry",
    bookingTitle: "Free introductory call", bookingIntro: "Choose a time to experience the demonstration. Your real Calendly link will later appear in exactly this place.", choose: "Choose a time", continue: "Continue", details: "Your details", concern: "Short description (optional)", confirm: "Complete demo booking", success: "This is the confirmation", successText: "With the live Calendly link, the client and consultant now automatically receive confirmation emails and the meeting is added to the connected calendar.", demoNote: "Demo mode: no real meeting was created and no email was sent.", close: "Close",
  },
  ar: {
    aboutTag: "من أنا", aboutTitle: "أفهم الإدارة وأربط بين وجهات النظر.",
    aboutLead: "وصلتُ إلى ألمانيا عام 2015 مع ابنتي التي كانت تبلغ عاماً واحداً. وبعد دراسة القانون في دمشق، اخترت أن أبدأ من جديد داخل الإدارة الألمانية.",
    aboutBody: "عملتُ كموظفة إدارية، ومسؤولة ملفات، وقائدة فريق، ومديرة مشروع للتحول الرقمي، مما أتاح لي فهم إجراءات دائرة شؤون الأجانب عن قرب. واليوم أجمع بين التأهيل القانوني والخبرة الإدارية وتجربتي الشخصية مع الهجرة لدعم الكفاءات الدولية والشركات في جميع أنحاء ألمانيا.",
    profile: "سلوى سعادة", profileRole: "المؤسِّسة · Saada Global Mobility",
    credentials: ["ماجستير قانون LL.M. · جامعة توبنغن (2023)", "Refugee Law Clinic · قانون الإقامة واللجوء (2024)", "قائدة فريق سابقة في دائرة شؤون الأجانب", "مديرة مشروع سابقة للتحول الرقمي", "دعم بالألمانية والإنجليزية والعربية"],
    audienceTag: "لمن أعمل", audienceTitle: "منظوران وهدف واضح واحد.",
    audience: [
      { title: "الكفاءات الدولية", text: "هل ترغبون في العمل في ألمانيا أو تثبيت إقامتكم أو التقدّم لإقامة جديدة؟ أساعدكم على فهم المتطلبات والتحضير المنظم للإجراءات.", benefits: ["وضوح أكبر", "قلق أقل", "تحضير منظم", "توفير الوقت"] },
      { title: "الشركات والموارد البشرية", text: "هل توظفون كفاءات دولية أو ترغبون في استقطاب موظفين من الخارج؟ أرافق إجراءات الإقامة والعمل بخبرة عملية.", benefits: ["تخفيف العبء الداخلي", "تخطيط أفضل", "إجراءات أكثر كفاءة", "دعم عملي"] },
    ],
    servicesTag: "الخدمات", servicesTitle: "حلول تناسب كل حالة.", servicesLead: "توجيه واضح وتحضير منظم ومرافقة موثوقة.",
    plans: [
      { title: "تحليل الحالة وخطة العمل", price: "ابتداءً من 250 €", meta: "حتى ساعتين", text: "تحليل مدفوع للحالة مع خطة مكتوبة وواضحة للخطوات التالية.", features: ["تحليل وضع الإقامة", "مراجعة المستندات المتوفرة", "تقييم المخاطر والإجراءات", "خطة عمل فردية", "ملخص كتابي للخطوات التالية"] },
      { title: "مرافقة الكفاءات الدولية", price: "450–1,200 €", meta: "بحسب الاتفاق", text: "لمن يريد التحضير المنظم لإجراءات الإقامة.", features: ["تحليل الحالة ومراجعة المستندات", "قائمة مستندات فردية", "المساعدة في تجهيز الأوراق", "مرافقة متطلبات الجهات الرسمية", "دعم عبر البريد الإلكتروني"] },
      { title: "استشارات هجرة الكفاءات للشركات", price: "ابتداءً من 900 €", meta: "عرض فردي", text: "لأصحاب العمل الذين يوظفون أو يستقطبون كفاءات دولية. تتحدد التكلفة بحسب عدد الحالات وتعقيدها.", features: ["تحليل الحالات والتنسيق مع الموارد البشرية", "مراجعة المستندات المطلوبة", "خطة عمل فردية", "المرافقة خلال المرحلة المتفق عليها", "الإجابة عن الأسئلة ضمن النطاق المتفق عليه"] },
    ],
    retainerTag: "دعم مستمر للشركات", retainerTitle: "مرافقة مستمرة للشركات",
    retainers: [
      { name: "اشتراك مصمم حسب الحاجة", price: "ابتداءً من 1,500 € / شهرياً", fit: "بحسب عدد الحالات وتعقيدها وحجم الدعم", points: ["مرافقة مستمرة للحالات النشطة", "تنسيق منتظم مع الموارد البشرية أو الإدارة", "جهة اتصال ثابتة", "نطاق خدمات يُتفق عليه بشكل فردي"] },
    ],
    legal: "الأسعار المعروضة هي أسعار استرشادية. ويتحدد العرض النهائي بحسب نطاق الحالة وتعقيدها ويُتفق عليه كتابياً قبل بدء العمل. تُقدَّم الخدمات ضمن نطاق الاستشارات والمساندة المسموح بها قانونياً، ولا تشمل التمثيل القانوني أمام المحاكم.",
    processTag: "آلية العمل", processTitle: "خمس خطوات واضحة.",
    process: [["مكالمة تعارف", "نناقش الحالة والاحتياج مجاناً لمدة 15–20 دقيقة."], ["التحليل وخطة العمل", "أحلل نقطة البداية وأضع مساراً منظماً."], ["عرض فردي", "تحصلون على عرض شفاف يشمل النطاق والتكلفة."], ["المرافقة", "أساندكم في تحضير الإجراءات وتنظيمها."], ["التواصل المستمر", "أبقى متاحة للأسئلة المتفق عليها خلال التعاون."]],
    faqTag: "الأسئلة الشائعة", faqTitle: "ابدؤوا على دراية.",
    faqs: [["لمن تناسب هذه الخدمات؟", "للكفاءات الدولية وأصحاب العمل ومسؤولي الموارد البشرية الذين يحتاجون دعماً في إجراءات الإقامة وهجرة الكفاءات والمعاملات الرسمية."], ["هل تقدمون الدعم في جميع أنحاء ألمانيا؟", "نعم. يتم التعاون في الغالب رقمياً وهو متاح في جميع أنحاء ألمانيا."], ["ما اللغات المتاحة؟", "الألمانية والإنجليزية والعربية."], ["هل أنتِ محامية؟", "لا. التمثيل القانوني أو العمل أمام المحاكم ليس ضمن الخدمات."], ["هل يمكن ضمان نجاح الطلب؟", "لا. القرارات المتعلقة بالإقامة تتخذها الجهات الرسمية المختصة حصراً."], ["ما تكلفة الدعم؟", "تختلف التكلفة بحسب نوع الحالة ونطاقها وتعقيدها. تحصلون على عرض شفاف بعد مكالمة التعارف."]],
    contactTag: "التواصل", contactTitle: "لنتحدث.", contactText: "احجزوا مكالمة تعارف مجانية واكتشفوا كيف يمكنني دعمكم أو دعم شركتكم.",
    name: "الاسم", email: "البريد الإلكتروني", message: "كيف يمكنني مساعدتكم؟", send: "تجهيز رسالة بريد إلكتروني",
    bookingTitle: "مكالمة تعارف مجانية", bookingIntro: "اختاروا موعداً لتجربة العرض. سيظهر رابط Calendly الحقيقي لاحقاً في المكان نفسه.", choose: "اختيار الموعد", continue: "متابعة", details: "بياناتكم", concern: "وصف مختصر (اختياري)", confirm: "إكمال الحجز التجريبي", success: "هكذا يظهر التأكيد", successText: "مع رابط Calendly الحقيقي سيتلقى العميل والمستشارة رسالة تأكيد تلقائية، ويُضاف الموعد إلى التقويم المتصل.", demoNote: "الوضع التجريبي: لم يُنشأ موعد حقيقي ولم تُرسل رسالة بريد.", close: "إغلاق",
  },
} as const;

const enhancementCopy = {
  de: {
    individual: "Ich bin eine internationale Fachkraft",
    company: "Ich vertrete ein Unternehmen",
    placeholder: "KI-Platzhalter · nicht Salwa",
    topicsTag: "Konkrete Anliegen",
    topicsTitle: "Unterstützung für die entscheidenden Schritte.",
    topics: ["EU Blue Card", "§§ 18a / 18b Fachkräfte", "Anerkennung von Qualifikationen", "Arbeitgeberwechsel", "Familiennachzug", "Niederlassungserlaubnis", "§ 81a beschleunigtes Verfahren", "Unterlagen & Behördenkommunikation"],
    checkTag: "Orientierung in 60 Sekunden",
    checkTitle: "Welche Unterstützung passt zu Ihrer Situation?",
    checkText: "Wählen Sie den Ausgangspunkt. Sie erhalten eine unverbindliche Orientierung – keine Rechtsberatung.",
    options: ["Ich habe eine konkrete Frage", "Ich bereite einen Antrag vor", "Wir stellen international ein"],
    results: [
      "Starten Sie mit der Fallanalyse & dem schriftlichen Maßnahmenplan ab 250 €.",
      "Die individuelle Begleitung hilft bei Checkliste, Unterlagen und der strukturierten Vorbereitung.",
      "Für HR und Arbeitgeber empfiehlt sich ein Erstcheck des Falls mit anschließendem individuellen Angebot.",
    ],
    resultLabel: "Empfohlener Einstieg",
    book: "Kostenlos kennenlernen",
  },
  en: {
    individual: "I am an international professional",
    company: "I represent a company",
    placeholder: "AI placeholder · not Salwa",
    topicsTag: "Specific needs",
    topicsTitle: "Support for the steps that matter.",
    topics: ["EU Blue Card", "Sections 18a / 18b", "Qualification recognition", "Changing employers", "Family reunification", "Permanent residence", "Section 81a fast-track procedure", "Documents & authority communication"],
    checkTag: "Guidance in 60 seconds",
    checkTitle: "Which support fits your situation?",
    checkText: "Choose your starting point for non-binding orientation. This is not legal advice.",
    options: ["I have a specific question", "I am preparing an application", "We hire internationally"],
    results: [
      "Start with the case analysis and written action plan from €250.",
      "Individual guidance supports your checklist, documents and structured preparation.",
      "For HR and employers, start with a case check followed by a tailored proposal.",
    ],
    resultLabel: "Recommended starting point",
    book: "Book a free introduction",
  },
  ar: {
    individual: "أنا من الكفاءات الدولية",
    company: "أمثل شركة",
    placeholder: "صورة مؤقتة بالذكاء الاصطناعي · ليست سلوى",
    topicsTag: "احتياجات محددة",
    topicsTitle: "دعم في الخطوات الحاسمة.",
    topics: ["البطاقة الزرقاء للاتحاد الأوروبي", "المادتان 18a و18b", "الاعتراف بالمؤهلات", "تغيير صاحب العمل", "لمّ الشمل الأسري", "الإقامة الدائمة", "الإجراء المعجّل وفق §81a", "المستندات والتواصل مع الدوائر"],
    checkTag: "توجيه خلال 60 ثانية",
    checkTitle: "ما نوع الدعم المناسب لحالتكم؟",
    checkText: "اختاروا نقطة البداية للحصول على توجيه أولي غير ملزم. هذا ليس استشارة قانونية.",
    options: ["لدي سؤال محدد", "أحضّر لتقديم طلب", "نستقطب موظفين دوليين"],
    results: [
      "ابدؤوا بتحليل الحالة وخطة العمل المكتوبة ابتداءً من 250 €.",
      "تساعد المرافقة الفردية في قائمة المستندات وتجهيزها والتحضير المنظم.",
      "للشركات والموارد البشرية نوصي بفحص أولي للحالة ثم عرض مصمم حسب الحاجة.",
    ],
    resultLabel: "البداية المقترحة",
    book: "احجزوا تعارفاً مجانياً",
  },
} as const;

function BrandLogo({ variant = "compact" }: { variant?: "compact" | "hero" | "footer" }) {
  return (
    <span className={`brand-logo brand-logo-${variant}`}>
      <img
        alt="Saada Global Mobility"
        src="/saada-logo-theme.webp"
      />
    </span>
  );
}

function BridgeMotion() {
  return (
    <svg aria-hidden="true" className="bridge-motion" viewBox="0 0 760 520">
      <defs>
        <linearGradient id="bridgeGlow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f6d981" stopOpacity="0.15" />
          <stop offset="0.52" stopColor="#d2aa4f" />
          <stop offset="1" stopColor="#f6d981" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path className="bridge-horizon" d="M55 394 C195 300 272 310 380 208 C488 310 565 300 705 394" />
      <path className="bridge-deck" d="M55 394 C210 349 291 351 380 292 C469 351 550 349 705 394" />
      <path className="bridge-cable" d="M133 374 C226 253 311 253 380 208 C449 253 534 253 627 374" />
      <path className="bridge-tower" d="M380 116 V320 M358 143 H402" />
      <path className="bridge-route" d="M128 448 C250 414 285 468 386 420 C480 376 533 425 652 365" />
      <g className="bridge-suspenders">
        {[190, 238, 286, 334, 426, 474, 522, 570].map((x) => (
          <line key={x} x1={x} x2={x} y1={x < 380 ? 300 - (x - 190) * 0.42 : 220 + (x - 380) * 0.42} y2="365" />
        ))}
      </g>
      <circle className="route-node route-node-one" cx="128" cy="448" r="8" />
      <circle className="route-node route-node-two" cx="386" cy="420" r="8" />
      <circle className="route-node route-node-three" cx="652" cy="365" r="8" />
      <circle className="route-traveller" cx="0" cy="0" r="7">
        <animateMotion dur="7s" path="M128 448 C250 414 285 468 386 420 C480 376 533 425 652 365" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [slot, setSlot] = useState("");
  const [needSelected, setNeedSelected] = useState<number | null>(null);
  const copy = heroCopy[language];
  const details = detailCopy[language];
  const enhanced = enhancementCopy[language];
  const rtl = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [language, rtl]);

  const openBooking = () => {
    setBookingStep(0);
    setSlot("");
    setBookingOpen(true);
  };

  const anchors = ["home", "about", "services", "faq", "contact"];

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Anfrage über saada-global-mobility.de");
    const body = encodeURIComponent(`${details.name}: ${data.get("name")}\n${details.email}: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:info@saada-global-mobility.de?subject=${subject}&body=${body}`;
  };

  return (
    <main className="site-shell" dir={rtl ? "rtl" : "ltr"}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Saada Global Mobility home">
          <BrandLogo />
        </a>

        <nav className={`desktop-nav ${menuOpen ? "menu-open" : ""}`} aria-label="Primary navigation">
          {nav[language].map((item, index) => (
            <a key={item} className={index === 0 ? "active" : ""} href={`#${anchors[index]}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="language-switch" aria-label="Language selector">
          {(["de", "en", "ar"] as Language[]).map((code) => (
            <button
              aria-pressed={language === code}
              className={language === code ? "selected" : ""}
              key={code}
              onClick={() => setLanguage(code)}
              type="button"
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)} type="button"><span /><span /></button>
      </header>

      <section className="hero" id="home">
        <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
        <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.headline}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={openBooking} type="button">
              {copy.book}
            </button>
            <a className="text-link" href="#services">
              {copy.services} <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-paths" aria-label={details.audienceTag}>
            <a href="#individuals"><span aria-hidden="true">01</span>{enhanced.individual}</a>
            <a href="#companies"><span aria-hidden="true">02</span>{enhanced.company}</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Saada Global Mobility – connection and shared progress">
          <BridgeMotion />
          <div className="hero-portrait-card">
            <img alt="Saada Global Mobility consultant portrait" src="/hero-consultant-placeholder.webp" />
          </div>
        </div>
      </section>

      <section className="trust-band" aria-label="Qualifications">
        <span><b>7</b> {language === "de" ? "Jahre Verwaltungspraxis" : language === "en" ? "years in public administration" : "سنوات خبرة إدارية"}</span>
        <span><b>LL.M.</b> Universität Tübingen</span>
        <span><b>DE</b> · EN · AR</span>
        <button onClick={openBooking} type="button">{copy.book} <span aria-hidden="true">↗</span></button>
      </section>

      <section className="support-preview" id="services-overview">
        <div className="section-kicker"><span>{copy.support}</span><i /></div>
        <div className="preview-grid">
          {copy.cards.map(([title, description], index) => (
            <article className="preview-card" key={title}>
              <span className="card-number">0{index + 1}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="section-heading">
          <p className="eyebrow">{details.aboutTag}</p>
          <h2>{details.aboutTitle}</h2>
        </div>
        <div className="about-grid">
          <div className="about-story">
            <p className="lead-paragraph">{details.aboutLead}</p>
            <p>{details.aboutBody}</p>
            <blockquote>“{language === "de" ? "Einige Jahre zuvor saß ich selbst auf der anderen Seite des Schreibtisches." : language === "en" ? "Only a few years earlier, I had been sitting on the other side of that desk myself." : "قبل سنوات قليلة فقط، كنتُ أنا نفسي أجلس على الجانب الآخر من ذلك المكتب."}”</blockquote>
          </div>
          <aside className="profile-card">
            <div className="profile-monogram" aria-hidden="true">SS</div>
            <h3>{details.profile}</h3>
            <p>{details.profileRole}</p>
            <ul>{details.credentials.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="audience-section section-pad">
        <div className="section-heading centered">
          <p className="eyebrow">{details.audienceTag}</p>
          <h2>{details.audienceTitle}</h2>
        </div>
        <div className="audience-grid">
          {details.audience.map((audience, index) => (
            <article className="audience-card" id={index === 0 ? "individuals" : "companies"} key={audience.title}>
              <span className="large-index">0{index + 1}</span>
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
              <ul>{audience.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="needs-check section-pad" aria-labelledby="needs-check-title">
        <div className="needs-check-copy">
          <p className="eyebrow">{enhanced.checkTag}</p>
          <h2 id="needs-check-title">{enhanced.checkTitle}</h2>
          <p>{enhanced.checkText}</p>
        </div>
        <div className="needs-check-panel">
          <div className="need-options">
            {enhanced.options.map((option, index) => (
              <button className={needSelected === index ? "selected" : ""} key={option} onClick={() => setNeedSelected(index)} type="button">
                <span>0{index + 1}</span>{option}
              </button>
            ))}
          </div>
          {needSelected !== null && <div className="need-result" aria-live="polite"><small>{enhanced.resultLabel}</small><p>{enhanced.results[needSelected]}</p><button onClick={openBooking} type="button">{enhanced.book} <span>→</span></button></div>}
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">{details.servicesTag}</p><h2>{details.servicesTitle}</h2></div>
          <p>{details.servicesLead}</p>
        </div>
        <div className="service-topics" aria-label={enhanced.topicsTag}>
          <div className="topic-heading"><p className="eyebrow">{enhanced.topicsTag}</p><h3>{enhanced.topicsTitle}</h3></div>
          <div className="topic-grid">{enhanced.topics.map((topic, index) => <span key={topic}><b>0{index + 1}</b>{topic}</span>)}</div>
        </div>
        <div className="plans-grid">
          {details.plans.map((plan, index) => (
            <article className={`plan-card ${index === 1 ? "featured" : ""}`} key={plan.title}>
              <div className="plan-top"><span>0{index + 1}</span><small>{plan.meta}</small></div>
              <h3>{plan.title}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.text}</p>
              <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <button className="plan-link" onClick={openBooking} type="button">{copy.book} <span>→</span></button>
            </article>
          ))}
        </div>
        <div className="legal-note"><span>i</span><p>{details.legal}</p></div>
      </section>

      <section className="retainer-section section-pad">
        <div className="section-heading centered light-heading">
          <p className="eyebrow">{details.retainerTag}</p>
          <h2>{details.retainerTitle}</h2>
        </div>
        <div className="retainer-grid">
          {details.retainers.map((plan) => (
            <article className="retainer-card" key={plan.name}>
              <p className="retainer-fit">{plan.fit}</p>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <ul>{plan.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <button className="retainer-cta" onClick={openBooking} type="button">{copy.book} <span>→</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="section-heading centered">
          <p className="eyebrow">{details.processTag}</p>
          <h2>{details.processTitle}</h2>
        </div>
        <ol className="process-list">
          {details.process.map(([title, text], index) => (
            <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="faq-intro section-heading">
          <p className="eyebrow">{details.faqTag}</p>
          <h2>{details.faqTitle}</h2>
          <p>{details.contactText}</p>
          <button className="button button-primary" onClick={openBooking} type="button">{copy.book}</button>
        </div>
        <div className="faq-list">
          {details.faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">{details.contactTag}</p>
          <h2>{details.contactTitle}</h2>
          <p>{details.contactText}</p>
          <div className="contact-details">
            <a href="mailto:info@saada-global-mobility.de">info@saada-global-mobility.de</a>
            <a href="tel:+491775453357">+49 177 545 33 57</a>
            <span>Saada Global Mobility · LinkedIn</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <label>{details.name}<input name="name" required /></label>
          <label>{details.email}<input name="email" type="email" required /></label>
          <label>{details.message}<textarea name="message" rows={5} required /></label>
          <button className="button button-primary" type="submit">{details.send}</button>
        </form>
      </section>

      <footer className="site-footer">
        <div><a className="brand footer-brand" href="#home"><BrandLogo variant="footer" /></a><p>{copy.headline}</p></div>
        <div className="footer-links"><a href="#contact">{nav[language][4]}</a><a href="#legal">Impressum</a><a href="#legal">Datenschutz</a></div>
        <div id="legal" className="legal-placeholder">{language === "de" ? "Impressum und Datenschutzerklärung werden vor der öffentlichen Veröffentlichung mit den vollständigen Unternehmensangaben ergänzt." : language === "en" ? "The legal notice and privacy policy will be completed with the full company details before public launch." : "سيتم استكمال بيانات الناشر وسياسة الخصوصية بجميع بيانات الشركة قبل الإطلاق العام."}</div>
        <small>© {new Date().getFullYear()} Saada Global Mobility</small>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}>
          <section aria-labelledby="booking-title" aria-modal="true" className="booking-modal" role="dialog">
            <button className="modal-close" aria-label={details.close} onClick={() => setBookingOpen(false)} type="button">×</button>
            <div className="modal-brand"><span className="mini-mark">S</span><div><b>Saada Global Mobility</b><small>Calendly · Demo</small></div></div>
            {bookingStep === 0 && <>
              <p className="eyebrow">{details.choose}</p><h2 id="booking-title">{details.bookingTitle}</h2><p>{details.bookingIntro}</p>
              <div className="slot-grid">{["Mo · 10:00", "Mo · 14:30", "Di · 09:30", "Mi · 16:00", "Do · 11:00", "Fr · 13:30"].map((item) => <button className={slot === item ? "chosen" : ""} key={item} onClick={() => setSlot(item)} type="button">{item}</button>)}</div>
              <button className="button button-primary modal-action" disabled={!slot} onClick={() => setBookingStep(1)} type="button">{details.continue} →</button>
            </>}
            {bookingStep === 1 && <form onSubmit={(event) => { event.preventDefault(); setBookingStep(2); }}>
              <p className="eyebrow">{details.details}</p><h2 id="booking-title">{slot}</h2>
              <label>{details.name}<input required autoFocus /></label><label>{details.email}<input type="email" required /></label><label>{details.concern}<textarea rows={3} /></label>
              <button className="button button-primary modal-action" type="submit">{details.confirm}</button>
            </form>}
            {bookingStep === 2 && <div className="success-state"><span className="success-icon">✓</span><p className="eyebrow">{details.success}</p><h2 id="booking-title">{slot}</h2><p>{details.successText}</p><div className="demo-note">{details.demoNote}</div><button className="button button-primary" onClick={() => setBookingOpen(false)} type="button">{details.close}</button></div>}
          </section>
        </div>
      )}
    </main>
  );
}
