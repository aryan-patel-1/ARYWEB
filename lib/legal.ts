export const legalConfig = {
  legalName: process.env.LEGAL_NAME ?? "",
  status: process.env.LEGAL_STATUS ?? "",
  address: process.env.LEGAL_ADDRESS ?? "",
  registration: process.env.LEGAL_REGISTRATION ?? "",
  editorPhone: process.env.LEGAL_PHONE ?? "",
  publicationDirector: process.env.LEGAL_PUBLICATION_DIRECTOR ?? "",
  hostName: process.env.HOST_NAME ?? "Cloudflare, Inc.",
  hostAddress:
    process.env.HOST_ADDRESS ?? "101 Townsend St., San Francisco, CA 94107, États-Unis",
  hostPhone: process.env.HOST_PHONE ?? "+1 (650) 319-8930",
  paymentTerms: process.env.CGV_PAYMENT_TERMS ?? "Selon l’échéancier indiqué sur le devis",
  depositTerms: process.env.CGV_DEPOSIT_TERMS ?? "Selon les conditions indiquées sur le devis",
};

export const legalConfigIsComplete = Boolean(
  legalConfig.legalName
  && legalConfig.status
  && legalConfig.address
  && legalConfig.registration
  && legalConfig.editorPhone
  && legalConfig.publicationDirector
  && legalConfig.hostName
  && legalConfig.hostAddress
  && legalConfig.hostPhone,
);

export const cgvConfigIsComplete = Boolean(
  legalConfig.legalName
  && legalConfig.status
  && legalConfig.address
  && legalConfig.registration
  && legalConfig.editorPhone,
);
