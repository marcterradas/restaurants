import { OrderHandler } from "../interfaces/OrderHandler";
import { Discount } from "../interfaces/Discount";
import { Product } from "../interfaces/Product";

export class MyOrderHandler implements OrderHandler {
  orderProductQuantity: Record<number, number> = {};
  discounts: Discount[];
  products: Record<number, Product>;

  /**
   * @param {Product[]} products
   * @param {Discount[]} discounts
   */
  constructor(products: Product[], discounts: Discount[]) {
    this.discounts = discounts;
    this.products = generateProductsHashMap(products);
  }

  /**
   * @public
   * @param number
   * @param quantity
   */
  add(number: number, quantity: number): void {
    // if product does not exist, throw error
    if (typeof this.products[number] === "undefined") {
      throw new Error(`product ${number} does not exist`);
    }
    if (quantity < 1) {
      throw new Error(`quantity must be bigger than 0`);
    }
    // if product is the first time that appears in the order, set quantity to 0
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
    let total: number = calculateTotalPriceWithoutDiscounts(
      this.orderProductQuantity,
      this.products
    );

    total = calculateTotalWithDiscounts(
      this.discounts,
      this.orderProductQuantity,
      this.products,
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
    // product number is the key and the product is the value
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
