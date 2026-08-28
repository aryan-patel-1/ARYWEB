export const legalConfig = {
  legalName: process.env.LEGAL_NAME ?? "",
  status: process.env.LEGAL_STATUS ?? "",
  address: process.env.LEGAL_ADDRESS ?? "",
  registration: process.env.LEGAL_REGISTRATION ?? "",
  editorPhone: process.env.LEGAL_PHONE ?? "",
  publicationDirector: process.env.LEGAL_PUBLICATION_DIRECTOR ?? "",
  hostName: process.env.HOST_NAME ?? "",
  hostAddress: process.env.HOST_ADDRESS ?? "",
  hostPhone: process.env.HOST_PHONE ?? "",
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
