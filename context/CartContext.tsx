"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";

import { Product, getProduct } from "@/lib/api";
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from "@/lib/api";
import { useAuth } from "../context/AuthContext";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  syncCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  loading: false,
  error: null,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
  syncCart: async () => {},
});

interface Props {
  children: ReactNode;
}

const LOCAL_CART_KEY = "cart";

function getLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
}

function clearLocalCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_CART_KEY);
}

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const isSyncing = useRef(false);

  const syncCart = useCallback(async () => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    try {
      setLoading(true);
      setError(null);
      const backendCart = await apiGetCart();

      const cartItems: CartItem[] = await Promise.all(
        backendCart.items.map(async (item) => {
          try {
            const product = await getProduct(item.productId);
            return { ...product, quantity: item.quantity };
          } catch {
            return null;
          }
        }),
      ).then((items) =>
        items.filter((item): item is CartItem => item !== null),
      );

      setCart(cartItems);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load cart";
      setError(message);
      console.error("🔴 syncCart failed:", err);
    } finally {
      setLoading(false);
      isSyncing.current = false;
    }
  }, []);

  useEffect(() => {
    if (user) {
      const mergeAndSync = async () => {
        const localCart = getLocalCart();

        if (localCart.length > 0) {
          try {
            await Promise.all(
              localCart.map((item) =>
                apiAddToCart({ productId: item.id, quantity: item.quantity }),
              ),
            );
            clearLocalCart();
          } catch (err) {
            console.error("⚠️ Failed to merge guest cart:", err);
          }
        }

        await syncCart();
      };

      mergeAndSync();
    } else {
      setCart(getLocalCart());
    }
  }, [user, syncCart]);

  useEffect(() => {
    if (!user) {
      saveLocalCart(cart);
    }
  }, [cart, user]);

  const addToCart = useCallback(
    async (product: Product) => {
      if (user) {
        setCart((prev) => {
          const existing = prev.find((item) => item.id === product.id);
          if (existing) {
            return prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });

        try {
          await apiAddToCart({ productId: product.id, quantity: 1 });
          await syncCart();
        } catch (err) {
          await syncCart();
          const message =
            err instanceof Error ? err.message : "Failed to add item";
          setError(message);
          console.error("🔴 Failed to add to cart:", err);
        }
      } else {
        setCart((prev) => {
          const existing = prev.find((item) => item.id === product.id);
          if (existing) {
            return prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      }
    },
    [user, syncCart],
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (user) {
        const previous = cart;
        setCart((prev) => prev.filter((item) => item.id !== productId));

        try {
          await apiRemoveFromCart(productId);
        } catch (err) {
          setCart(previous);
          const message =
            err instanceof Error ? err.message : "Failed to remove item";
          setError(message);
          console.error("🔴 Failed to remove from cart:", err);
        }
      } else {
        setCart((prev) => prev.filter((item) => item.id !== productId));
      }
    },
    [user, cart],
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      if (user) {
        const previous = cart;
        setCart((prev) =>
          prev.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        );

        try {
          await apiUpdateCartItem(productId, { quantity });
        } catch (err) {
          setCart(previous);
          const message =
            err instanceof Error ? err.message : "Failed to update cart";
          setError(message);
          console.error("🔴 Failed to update cart:", err);
        }
      } else {
        setCart((prev) =>
          prev.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        );
      }
    },
    [user, cart, removeFromCart],
  );

  const clearCart = useCallback(async () => {
    if (user) {
      const previous = cart;
      setCart([]);

      try {
        await apiClearCart();
      } catch (err) {
        setCart(previous);
        const message =
          err instanceof Error ? err.message : "Failed to clear cart";
        setError(message);
        console.error("🔴 Failed to clear cart:", err);
      }
    } else {
      setCart([]);
      clearLocalCart();
    }
  }, [user, cart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
