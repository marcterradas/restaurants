import { OrderHandler } from "../interfaces/OrderHandler";
import { Discount } from "../interfaces/Discount";
import { Product } from "../interfaces/Product";

export class MyOrderHandler implements OrderHandler {
  orderProductQuantity: Record<number, number> = {};
  discounts: Discount[];
  products: Product[];

  constructor(products: Product[], discounts: Discount[]) {
    this.products = products;
    this.discounts = discounts;
  }

  /**
   * @public
   * @param number
   * @param quantity
   */
  add(number: number, quantity: number): void {
    if (typeof this.orderProductQuantity[number] === "undefined") {
      this.orderProductQuantity[number] = 0;
    }
    this.orderProductQuantity[number] += quantity;
  }

  /**
   * @public
   * @returns {number} total
   */
  getTotal(): number {
    const productsHashMap: Record<number, Product> = generateProductsHashMap(
      this.products
    );

    let total: number = calculateTotalPriceWithoutDiscounts(
      this.orderProductQuantity,
      productsHashMap
    );

    total = calculateTotalWithDiscounts(
      this.discounts,
      this.orderProductQuantity,
      productsHashMap,
      total
    );

    return total;
  }
}

/**
 * @param {Product[]} products
 * @returns {Record<number, Product>}
 */
function generateProductsHashMap(products: Product[]): Record<number, Product> {
  const productsHashMap: Record<number, Product> = {};

  for (const product of products) {
    productsHashMap[product.number] = product;
  }

  return productsHashMap;
}

/**
 * @private
 * @param {Record<number, number>} orderProductQuantity
 * @param {Record<number, Product>} productsHashMap
 * @throws {Error} If a product with the given code does not exist.
 * @returns {number} total
 */
function calculateTotalPriceWithoutDiscounts(
  orderProductQuantity: Record<number, number>,
  productsHashMap: Record<number, Product>
): number {
  let total: number = 0;

  for (let productNumber in orderProductQuantity) {
    const quantity: number = orderProductQuantity[productNumber];
    const product: Product = productsHashMap[productNumber];
    if (!product)
      throw new Error(`product with code ${productNumber} does not exist`);
    total += product.price * quantity;
  }

  return total;
}

/**
 * @private
 * @param {Discount[]} discounts
 * @param {Record<number, number>} orderProductQuantity
 * @param {Record<number, Product>} productsHashMap
 * @param {number} total
 * @returns {number} total
 */
function calculateTotalWithDiscounts(
  discounts: Discount[],
  orderProductQuantity: Record<number, number>,
  productsHashMap: Record<number, Product>,
  total: number
): number {
  for (const discount of discounts) {
    switch (discount.type) {
      case "2-for-1":
        const productQuantity = orderProductQuantity[discount.itemNumber];
        const product = productsHashMap[discount.itemNumber];
        if (
          typeof productQuantity !== "undefined" &&
          typeof product !== "undefined" &&
          productQuantity > 2
        ) {
          const discountQuantity = Math.floor(productQuantity / 2);
          const discountAmount = discountQuantity * product.price;
          total -= discountAmount;
        }
        break;
      case "spend-X-to-save-Y":
        if (total >= discount.threshold) {
          total -= discount.discountAmount;
        }
        break;
      case "menu-pack":
        // TODO
        break;
    }
  }

  return total;
}
