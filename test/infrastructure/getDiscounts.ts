import { expect, test } from "vitest";
import { getDiscounts } from "../../infrastructure/getDiscounts";
import { Discount } from "../../interfaces/Discount";

test("get discounts", async () => {
  const discounts: false | Discount[] = await getDiscounts();
  expect(discounts).toStrictEqual([
    { type: "2-for-1", itemNumber: 12 },
    { type: "spend-X-to-save-Y", threshold: 20, discountAmount: 5 },
    { type: "menu-pack", items: [12, 21, 37], fixedPrice: 14 },
  ]);
});
