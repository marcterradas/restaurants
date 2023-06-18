interface Discount {
  type: string;
  itemNumber?: number;
  threshold?: number;
  discountAmount?: number;
  items?: number[];
  fixedPrice?: number;
}
