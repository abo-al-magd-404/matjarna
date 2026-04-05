import { getAuthHeader, clearAuthData } from "./auth-utils";

const BASE_URL = "/api/backend";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  category?: Category;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}

export interface Cart {
  id?: number;
  userId?: number;
  items: CartItem[];
  total?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrderRequest {
  items: Array<{ productId: number; quantity: number }>;
  shippingAddress?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const raw = await response.text();

  if (response.status === 401) {
    clearAuthData();
    if (typeof window !== "undefined") {
      window.location.href = "/account/login";
    }
  }

  if (!response.ok) {
    let message: string;

    try {
      const parsed = JSON.parse(raw);
      message =
        parsed.message ||
        parsed.error ||
        `HTTP error! status: ${response.status}`;
    } catch {
      message = raw || `HTTP error! status: ${response.status}`;
    }

    console.error("🔴 API Error:", {
      status: response.status,
      url: response.url,
      message,
      rawBody: raw,
    });

    throw new Error(message);
  }

  if (raw.trim() === "") {
    return {} as T;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return {} as T;
  }
}

async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const url = `${BASE_URL}/Auth/login`;
  console.log("🟡 API: Making login request to:", url);
  console.log("🟡 API: Credentials:", {
    email: credentials.email,
    password: "***",
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  console.log("🟡 API: Login response status:", response.status);
  console.log("🟡 API: Login response ok:", response.ok);

  const result = await handleResponse<LoginResponse>(response);
  console.log("🟡 API: Login result after handleResponse:", result);

  return result;
}

export async function register(userData: RegisterData): Promise<User> {
  const response = await fetch(`${BASE_URL}/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

export async function refreshToken(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  const response = await fetch(
    `${BASE_URL}/Auth/refresh-token?refreshToken=${encodeURIComponent(
      refreshToken,
    )}`,
    {
      method: "POST",
    },
  );
  return handleResponse<RefreshTokenResponse>(response);
}

export async function getProfile(): Promise<User> {
  const response = await authenticatedFetch(`${BASE_URL}/Auth/profile`);
  return handleResponse<User>(response);
}

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/Product`);
  return handleResponse<Product[]>(response);
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/Product/${id}`);
  return handleResponse<Product>(response);
}

export async function createProduct(
  product: Partial<Product>,
): Promise<Product> {
  const response = await authenticatedFetch(`${BASE_URL}/Product`, {
    method: "POST",
    body: JSON.stringify(product),
  });
  return handleResponse<Product>(response);
}

export async function updateProduct(
  id: number,
  product: Partial<Product>,
): Promise<Product> {
  const response = await authenticatedFetch(`${BASE_URL}/Product/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  return handleResponse<Product>(response);
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await authenticatedFetch(`${BASE_URL}/Product/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/Categories`);
  return handleResponse<Category[]>(response);
}

export async function getCategory(id: number): Promise<Category> {
  const response = await fetch(`${BASE_URL}/Categories/${id}`);
  return handleResponse<Category>(response);
}

export async function createCategory(
  category: Partial<Category>,
): Promise<Category> {
  const response = await authenticatedFetch(`${BASE_URL}/Categories`, {
    method: "POST",
    body: JSON.stringify(category),
  });
  return handleResponse<Category>(response);
}

export async function updateCategory(
  id: number,
  category: Partial<Category>,
): Promise<Category> {
  const response = await authenticatedFetch(`${BASE_URL}/Categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
  return handleResponse<Category>(response);
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await authenticatedFetch(`${BASE_URL}/Categories/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

export async function getCart(): Promise<Cart> {
  const response = await authenticatedFetch(`${BASE_URL}/Cart`);
  return handleResponse<Cart>(response);
}

export async function addToCart(item: AddToCartRequest): Promise<Cart> {
  const response = await authenticatedFetch(`${BASE_URL}/Cart/add`, {
    method: "POST",
    body: JSON.stringify(item),
  });
  return handleResponse<Cart>(response);
}

export async function updateCartItem(
  productId: number,
  data: UpdateCartRequest,
): Promise<Cart> {
  const response = await authenticatedFetch(
    `${BASE_URL}/Cart/update/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
  return handleResponse<Cart>(response);
}

export async function removeFromCart(productId: number): Promise<Cart> {
  const response = await authenticatedFetch(
    `${BASE_URL}/Cart/remove/${productId}`,
    {
      method: "DELETE",
    },
  );
  return handleResponse<Cart>(response);
}

export async function clearCart(): Promise<void> {
  const response = await authenticatedFetch(`${BASE_URL}/Cart/clear`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

export async function createOrder(
  orderData: CreateOrderRequest,
): Promise<Order> {
  const response = await authenticatedFetch(`${BASE_URL}/Order`, {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  return handleResponse<Order>(response);
}

export async function getUserOrders(): Promise<Order[]> {
  const response = await authenticatedFetch(`${BASE_URL}/Order`);
  return handleResponse<Order[]>(response);
}

export async function getOrder(id: number): Promise<Order> {
  const response = await authenticatedFetch(`${BASE_URL}/Order/${id}`);
  return handleResponse<Order>(response);
}

export async function getAllOrders(): Promise<Order[]> {
  const response = await authenticatedFetch(`${BASE_URL}/Order/all`);
  return handleResponse<Order[]>(response);
}

export async function getAllUsers(): Promise<User[]> {
  const response = await authenticatedFetch(`${BASE_URL}/Users`);
  return handleResponse<User[]>(response);
}

export async function getUser(id: number): Promise<User> {
  const response = await authenticatedFetch(`${BASE_URL}/Users/${id}`);
  return handleResponse<User>(response);
}

export async function updateUser(
  id: number,
  userData: Partial<User>,
): Promise<User> {
  const response = await authenticatedFetch(`${BASE_URL}/Users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

export async function deleteUser(id: number): Promise<void> {
  const response = await authenticatedFetch(`${BASE_URL}/Users/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

export async function updateUserRole(id: number, role: string): Promise<User> {
  const response = await authenticatedFetch(`${BASE_URL}/Users/${id}/role`, {
    method: "PUT",
    body: JSON.stringify({ role }),
  });
  return handleResponse<User>(response);
}

export async function getProductsByCategory(
  categoryId: number,
): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.categoryId === categoryId);
}
