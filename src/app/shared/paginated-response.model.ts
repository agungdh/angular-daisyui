export interface PaginatedResponse<T> {
  data: T,
  next_cursor: string | null,
  next_page_url: string
  path: string,
  per_page: number,
  prev_cursor: string,
  prev_page_url: string,
}
