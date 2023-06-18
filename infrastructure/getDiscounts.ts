import fs from "fs";
import { Discount } from "../interfaces/Discount";
const DISCOUNT_PATH = "./infrastructure/discounts.json";
/**
 * get discount list
 * @returns A Promise that resolves to an array of discounts or `false` if an error occurs.
 */
export function getDiscounts(
  discountPath = DISCOUNT_PATH
): Promise<Discount[] | false> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      discountPath,
      "utf8",
      (error: NodeJS.ErrnoException | null, data: string) => {
        if (error) {
          //   console.error("Error reading file:", error);
          reject(false);
        }
        try {
          const discounts: Discount[] = JSON.parse(data);
          resolve(discounts);
        } catch (error: NodeJS.ErrnoException) {
          //   console.error("Error parsing JSON:", error);
          reject(false);
        }
      }
    );
  });
}
