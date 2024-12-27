export interface DocumentExists<T> {
  exists(documentId: string): Promise<T>
}
