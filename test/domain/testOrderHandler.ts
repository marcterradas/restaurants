import { expect, test } from "vitest";
import { MyOrderHandler } from "../../domain/OrderHandler";
import { OrderHandler } from "../../interfaces/OrderHandler";

const products = [
  { number: 12, name: "Spring rolls", price: 4.5 },
  { number: 21, name: "Fried rice with pork", price: 6 },
  { number: 37, name: "Chicken with almond sauce", price: 6.5 },
];

const disscounts = [
  { type: "2-for-1", itemNumber: 12 },
  { type: "spend-X-to-save-Y", threshold: 20, discountAmount: 5 },
  { type: "menu-pack", items: [12, 21, 37], fixedPrice: 14 },
];

test("test order handler", () => {
  const orderHandler: OrderHandler = new MyOrderHandler(products, disscounts);
  orderHandler.add(12, 4);
  orderHandler.add(21, 2);
  const total = orderHandler.getTotal();
  expect(total).toBe(16);
});
