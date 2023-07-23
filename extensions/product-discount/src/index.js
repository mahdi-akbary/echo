// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
* @type {FunctionResult}
*/
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default /**
* @param {InputQuery} input
* @returns {FunctionResult}
*/
  (input) => {
    const total = input.cart.cost.totalAmount.amount

    if (total < 800) {
      return EMPTY_DISCOUNT;
    }

    let quantity = 1
    const filteredList = input.cart.lines
      .filter(line => line.merchandise.id == 'gid://shopify/ProductVariant/45509861671192' &&
        line.merchandise.__typename == "ProductVariant")


    if (filteredList.length == 0) {
      return EMPTY_DISCOUNT;
    }


    quantity = filteredList[0].quantity

    const variant = /** @type {ProductVariant} */ (filteredList[0].merchandise);
    const target = [ /** @type {Target} */ ({
      productVariant: {
        id: variant.id
      }
    })];


    const percentage = (100 / quantity)
    console.log('>>>', quantity, percentage)

    return {
      discounts: [
        {
          targets: target,
          value: {
            percentage: {
              value: `${percentage}`
            }
          }
        }
      ],
      discountApplicationStrategy: DiscountApplicationStrategy.First
    };
  };
