import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from '../../../data/cart.js';
import { loadProducts } from "../../../data/products.js";

describe('test suite: renderOrderSummary', () => {

  // ✅ moved beforeAll outside `it`
  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  it('displays the cart', () => {
    // ✅ changed: setup correct DOM elements expected by renderOrderSummary
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionsId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionsId: '2'
        }
      ]);
    });

    loadFromStorage();
    renderOrderSummary();

    // ✅ fixed: added real expectations
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
  });

  it('removes a product', () => {
    // ✅ added proper DOM setup
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionsId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionsId: '2'
        }
      ]);
    });

    loadFromStorage();
    renderOrderSummary();

    // simulate delete
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // ✅ added expectation to avoid "no expectations" warning
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
  });
});
