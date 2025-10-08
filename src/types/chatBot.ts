export type ChatBotAnswer = {
  roomId: number;
  title: string;
  message: string;
  similarCases: SimilarCase[];
  similarLaws: SimilarLaw[];
};

export type SimilarCase = {
  id: string;
  text: string;
  media: Media;
  meatadata: MetaData;
  score: number;
};

export type SimilarLaw = {
  id: string;
  text: string;
  media: Media;
  meatadata: MetaData;
  score: number;
};

export type Media = {
  id: string;
  mimetype: MimeType;
  data: string;
  name: string;
  dataAsByteArray: string;
};

export type MetaData = {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
};

export type MimeType = {
  type: string;
  subtype: string;
  parameters: MetaData;
  wildcardType: boolean;
  wildcardSubtype: boolean;
  subtypeSuffix: string;
  concrete: boolean;
  charset: string;
};
