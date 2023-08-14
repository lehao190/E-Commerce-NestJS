type IdType = string | number;

export interface ICrudBase<Model> {
  create(data: unknown): Promise<Model>
  getAll(): Promise<Model[]>
  findOne(id: IdType): Promise<Model>
  update(id: IdType, data: unknown): Promise<Model>
  delete(id: IdType): unknown
}