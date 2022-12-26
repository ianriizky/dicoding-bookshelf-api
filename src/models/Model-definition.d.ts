export type Id = string;
export type CreatedAt = string;
export type UpdatedAt = string;
export type Timestamps = {
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
};

export type Payload = {
  id: Id;
};

export type Resource = Payload & Timestamps;
export type PartialResource = Partial<Resource>;

export type Predicate = (
  value: Resource,
  index: number,
  array: Array<Resource>
) => Resource;

export type Options = {
  /** Model name. */
  name: string;

  /** Alias name for "createdAt". */
  createdAt: string;

  /** Alias name for "updatedAt". */
  updatedAt: string;
};
