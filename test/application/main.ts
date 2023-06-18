import { expect, test } from "vitest";
import { getDiscounts } from "../../infrastructure/getDiscounts";
import { Discount } from "../../interfaces/Discount";
import { getProducts } from "../../infrastructure/getProducts";
import { Product } from "../../interfaces/Product";
import { MyOrderHandler } from "../../domain/OrderHandler";
import { OrderHandler } from "../../interfaces/OrderHandler";

test("main", async () => {
  const discounts: false | Discount[] = await getDiscounts();
  const products: false | Product[] = await getProducts();
  const orderHandler: OrderHandler = new MyOrderHandler(products, discounts);
  orderHandler.add(12, 4);
  orderHandler.add(21, 2);
  const total = orderHandler.getTotal();
  expect(total).toBe(16);
});
