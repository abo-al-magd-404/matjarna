"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

import { Product, getProduct } from "@/lib/api";
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from "@/lib/api";
import { isAuthenticated } from "@/lib/auth-utils";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
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

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount (for unauthenticated users)
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated()) {
        // Load cart from backend for authenticated users
        await syncCart();
      } else {
        // Load from localStorage for guests
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("cart");
          if (stored) {
            try {
              setCart(JSON.parse(stored));
            } catch (error) {
              console.error("Failed to parse cart from localStorage:", error);
              setCart([]);
            }
          }
        }
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage for unauthenticated users
  useEffect(() => {
    if (!isAuthenticated() && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Sync cart with backend
  const syncCart = async () => {
    if (!isAuthenticated()) {
      console.log("🔵 syncCart: Not authenticated, skipping");
      return;
    }

    try {
      setLoading(true);
      console.log("🔵 syncCart: Fetching cart from backend...");
      const backendCart = await apiGetCart();
      console.log("🔵 syncCart: Backend cart response:", backendCart);
      console.log("🔵 syncCart: Cart items:", backendCart.items);

      // Log first item to see structure
      if (backendCart.items.length > 0) {
        console.log(
          "🔵 syncCart: First cart item structure:",
          backendCart.items[0]
        );
      }

      // Backend doesn't include product data, so we need to fetch it
      const cartItems: CartItem[] = await Promise.all(
        backendCart.items.map(async (item) => {
          try {
            const product = await getProduct(item.productId);
            return {
              ...product,
              quantity: item.quantity,
            };
          } catch (error) {
            console.error(
              `⚠️ Failed to fetch product ${item.productId}:`,
              error
            );
            return null;
          }
        })
      ).then((items) =>
        items.filter((item): item is CartItem => item !== null)
      );

      console.log("🔵 syncCart: Converted cart items:", cartItems);
      console.log(
        "🔵 syncCart: Setting cart state with",
        cartItems.length,
        "items"
      );
      setCart(cartItems);
      console.log("🟢 syncCart: Cart state updated successfully");
    } catch (error) {
      console.error("🔴 syncCart: Failed to sync cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    console.log("🔵 addToCart called for product:", product.id);
    console.log("🔵 isAuthenticated:", isAuthenticated());

    if (isAuthenticated()) {
      // Add to backend cart
      try {
        setLoading(true);
        console.log("🔵 Adding to cart:", {
          productId: product.id,
          quantity: 1,
        });

        const result = await apiAddToCart({
          productId: product.id,
          quantity: 1,
        });
        console.log("🟢 Cart API response:", result);

        console.log("🔵 Syncing cart after add...");
        await syncCart();
        console.log("🟢 Cart synced successfully");
      } catch (error) {
        console.error("🔴 Failed to add to cart:", error);
        alert("Failed to add item to cart. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("🔵 Adding to local cart (not authenticated)");
      // Add to local cart
      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += 1;
          console.log("🟢 Updated existing item in local cart:", updated);
          return updated;
        }
        const newCart = [...prev, { ...product, quantity: 1 }];
        console.log("🟢 Added new item to local cart:", newCart);
        return newCart;
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    if (isAuthenticated()) {
      // Remove from backend cart
      try {
        setLoading(true);
        await apiRemoveFromCart(productId);
        await syncCart();
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        alert("Failed to remove item from cart. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Remove from local cart
      setCart((prev) => prev.filter((item) => item.id !== productId));
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated()) {
      // Update in backend cart
      try {
        setLoading(true);
        await apiUpdateCartItem(productId, { quantity });
        await syncCart();
      } catch (error) {
        console.error("Failed to update cart:", error);
        alert("Failed to update cart. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Update in local cart
      setCart((prev) => {
        const updated = prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        return updated;
      });
    }
  };

  const clearCart = async () => {
    if (isAuthenticated()) {
      // Clear backend cart
      try {
        setLoading(true);
        await apiClearCart();
        setCart([]);
      } catch (error) {
        console.error("Failed to clear cart:", error);
        alert("Failed to clear cart. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Clear local cart
      setCart([]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
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
