import {
  Id as ModelId,
  Payload as ModelPayload,
  Timestamps,
} from '../Model-definition';

export type Id = ModelId;

export type Payload = ModelPayload & {
  title: string;
  tags: string[];
  body: string;
};

export type Resource = Payload & Timestamps;
export type PartialResource = Partial<Resource>;
