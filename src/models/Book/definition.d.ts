import { Id as ModelId, Payload as ModelPayload } from '../Model-definition';

export type Id = ModelId;
export type Timestamps = {
  insertedAt: CreatedAt;
  updatedAt: UpdatedAt;
};

export type Payload = ModelPayload & {
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
};

export type Resource = Payload & Timestamps;
export type PartialResource = Partial<Resource>;

export type Predicate = (
  value: Resource,
  index: number,
  array: Array<Resource>
) => Resource;
