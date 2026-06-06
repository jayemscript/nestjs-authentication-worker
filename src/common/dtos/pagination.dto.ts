//src/common/dtos/pagination.dto.ts
export class PaginationDto {
  data!: any[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
  hasNextPage!: boolean;
  hasPreviousPage!: boolean;
}