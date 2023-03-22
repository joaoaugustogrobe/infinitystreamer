import { ApiProperty } from '@nestjs/swagger';

export class PaginatedList<TData> {
  @ApiProperty({ type: Object })
  public readonly data: TData[];

  @ApiProperty()
  public readonly totalCount: number;

  @ApiProperty()
  public readonly pageSize: number;

  @ApiProperty()
  public readonly totalPages: number;

  @ApiProperty()
  public readonly currentPage: number;

  @ApiProperty()
  public readonly from: number;

  @ApiProperty()
  public readonly to: number;

  @ApiProperty()
  public readonly next: number | null;

  @ApiProperty()
  public readonly previous: number | null;

  constructor(data: TData[], total: number, pageSize: number, skip: number) {
    this.data = data;
    this.totalCount = total;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(total / pageSize);
    this.currentPage = Math.floor(skip / pageSize) + 1;
    this.from = skip + 1;
    this.to = skip + data.length;
    this.next = skip + pageSize;
    this.next = this.next >= total ? null : this.next;
    this.previous = skip - pageSize;
    this.previous = this.previous < 0 ? null : this.previous;
  }
}
