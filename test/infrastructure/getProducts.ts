import { expect, test } from "vitest";
import { getProducts } from "../../infrastructure/getProducts";
import { Product } from "../../interfaces/Product";

test("get products", async () => {
  const products: false | Product[] = await getProducts();
  expect(products).toStrictEqual([
    { number: 12, name: "Spring rolls", price: 4.5 },
    { number: 21, name: "Fried rice with pork", price: 6 },
    { number: 37, name: "Chicken with almond sauce", price: 6.5 },
  ]);
});

test("products invalid path", async () => {
  await getProducts("random url").catch((error) => {
    expect(error).toBe(false);
  });
});
