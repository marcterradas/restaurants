import { expect, test } from "vitest";
import { MyOrderHandler } from "../../domain/OrderHandler";
import { OrderHandler } from "../../interfaces/OrderHandler";

const products = [
  { number: 12, name: "Spring rolls", price: 4.5 },
  { number: 21, name: "Fried rice with pork", price: 6 },
  { number: 37, name: "Chicken with almond sauce", price: 6.5 },
];

const discounts = [
  { type: "2-for-1", itemNumber: 12 },
  { type: "spend-X-to-save-Y", threshold: 20, discountAmount: 5 },
  { type: "menu-pack", items: [12, 21, 37], fixedPrice: 14 },
];

test("test order handler", () => {
  const orderHandler: OrderHandler = new MyOrderHandler(products, discounts);
  orderHandler.add(12, 4);
  orderHandler.add(21, 2);
  const total = orderHandler.getTotal();
  expect(total).toBe(16);
});

test("add throws error for invalid product number", () => {
  const orderHandler: OrderHandler = new MyOrderHandler(products, discounts);
  let errorMessage: string = "";
  try {
    orderHandler.add(1, 1);
  } catch (error) {
    errorMessage = error.message;
  }
  expect(errorMessage).toBe("product 1 does not exist");
});

test("add throws error for invalid quantity", () => {
  const orderHandler: OrderHandler = new MyOrderHandler(products, discounts);
  let errorMessage: string = "";
  try {
    orderHandler.add(12, 0);
  } catch (error) {
    errorMessage = error.message;
  }
  expect(errorMessage).toBe("quantity must be bigger than 0");
});
