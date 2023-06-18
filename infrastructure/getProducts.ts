import fs from "fs";
import { Product } from "../interfaces/Product";
const PRODUCTS_PATH = "./infrastructure/products.json";
/**
 * get products list
 * @returns A Promise that resolves to an array of products or `false` if an error occurs.
 */
export function getProducts(
  productsPath = PRODUCTS_PATH
): Promise<Product[] | false> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      productsPath,
      "utf8",
      (error: NodeJS.ErrnoException | null, data: string) => {
        if (error) {
          reject(false);
        }
        try {
          const products: Product[] = JSON.parse(data);
          resolve(products);
        } catch (error: NodeJS.ErrnoException) {
          reject(false);
        }
      }
    );
  });
}
