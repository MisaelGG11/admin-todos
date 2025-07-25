import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";


export const getCookieCart = async (): Promise<{
  [key: string]: number;
}> => {
  const cart = await getCookie('cart');
  if (!cart) return {};

  return JSON.parse(cart);
}


export const addProductToCart = async (productId: string): Promise<void> => {
  const cart = await getCookieCart();
  const currentQuantity = cart[productId] || 0;
  
  cart[productId] = currentQuantity + 1;

  // Set the updated cart back to the cookie
  await setCookie('cart', JSON.stringify(cart), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
}

export const removeProductFromCart = async (productId: string): Promise<void> => {
  const cart = await getCookieCart();
  
  if (cart[productId]) {
    
    delete cart[productId];

    // Set the updated cart back to the cookie
    await setCookie('cart', JSON.stringify(cart), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }
};
