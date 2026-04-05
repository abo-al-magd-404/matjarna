"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Package,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  LayoutGrid,
  LogOut,
  X,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import {
  getAllProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  Product,
  Category,
} from "@/lib/api";
import Image from "next/image";

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  revenue: number;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Dashboard State
  const [activeTab, setActiveTab] = useState<"products" | "categories">(
    "categories",
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Modal State for Products
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [modalLoading, setModalLoading] = useState(false);

  // Modal State for Categories
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState<"add" | "edit">(
    "add",
  );
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({});

  // Check if user is admin
  const isAdmin =
    user?.role === "Admin" || user?.email === "admin@matjarna.com";

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/account/login");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setStats({
        totalProducts: productsData.length,
        totalCategories: categoriesData.length,
        totalOrders: 0, // Would come from Order API
        revenue: productsData.reduce((sum, p) => sum + p.price, 0),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Product Management
  const openAddProductModal = () => {
    setModalMode("add");
    setCurrentProduct({
      name: "",
      price: 0,
      description: "",
      categoryId: categories[0]?.id || 1,
      imageUrl: "",
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setModalMode("edit");
    setCurrentProduct(product);
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);

    try {
      if (modalMode === "add") {
        await createProduct(currentProduct);
      } else {
        if (currentProduct.id) {
          await updateProduct(currentProduct.id, currentProduct);
        }
      }
      await fetchData(); // Refresh data
      setIsProductModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await fetchData();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  // Category Management
  const openAddCategoryModal = () => {
    setCategoryModalMode("add");
    setCurrentCategory({
      name: "",
      description: "",
      imageUrl: "",
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category: Category) => {
    setCategoryModalMode("edit");
    setCurrentCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);

    try {
      if (categoryModalMode === "add") {
        await createCategory(currentCategory);
      } else {
        if (currentCategory.id) {
          await updateCategory(currentCategory.id, currentCategory);
        }
      }
      await fetchData();
      setIsCategoryModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (
      confirm(
        "Delete this category? Products in this category will not be deleted.",
      )
    ) {
      try {
        await deleteCategory(id);
        await fetchData();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      }
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        {/* Dashboard Title */}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-rose-500">
            Admin Dashboard
          </h1>
          <p className="text-green-500 mt-1 text-sm sm:text-base">
            Manage your store efficiently
          </p>
        </div>

        {/* Exit Button */}
        <button
          onClick={() => router.push("/account")}
          className="flex items-center gap-2 mt-4 sm:mt-0 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Exit Admin
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Categories */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-purple-500 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-800 rounded-xl">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">
            Total Categories
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {stats.totalCategories}
          </p>
        </div>

        {/* Total Products */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-blue-500 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-800 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold text-white mt-2">
            {stats.totalProducts}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {/* Categories Tab */}
        <button
          onClick={() => setActiveTab("categories")}
          className={`relative pb-3 px-4 flex items-center gap-2 font-medium transition-colors duration-200 ${
            activeTab === "categories"
              ? "text-blue-600"
              : "text-gray-100 hover:text-gray-600"
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Categories</span>
          {activeTab === "categories" && (
            <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-blue-600 rounded-full" />
          )}
        </button>

        {/* Products Tab */}
        <button
          onClick={() => setActiveTab("products")}
          className={`relative pb-3 px-4 flex items-center gap-2 font-medium transition-colors duration-200 ${
            activeTab === "products"
              ? "text-blue-600"
              : "text-gray-100 hover:text-gray-600"
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Products</span>
          {activeTab === "products" && (
            <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Categories Tab */}
            {activeTab === "categories" && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Categories</h2>
                  <button
                    onClick={openAddCategoryModal}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="group bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-900 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          <LayoutGrid className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditCategoryModal(category)}
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-900 rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-900 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white capitalize mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {
                          products.filter((p) => p.categoryId === category.id)
                            .length
                        }{" "}
                        Products
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="p-6">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-white">Products</h2>
                  <button
                    onClick={openAddProductModal}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-gray-300">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <Image
                                src={
                                  product.imageUrl || "/imgs/placeholder.jpg"
                                }
                                alt={product.name}
                                width={48}
                                height={48}
                                className="rounded-lg bg-gray-700 object-contain"
                              />
                              <div className="max-w-xs">
                                <p className="font-medium truncate text-white">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                  ID: {product.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-700 text-white rounded-full text-sm font-medium capitalize">
                              {categories.find(
                                (c) => c.id === product.categoryId,
                              )?.name || "Unknown"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-semibold text-white">
                              ${product.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditProductModal(product)}
                                className="p-2 text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-500 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-800">
              <h3 className="text-lg font-bold text-white">
                {modalMode === "add" ? "Add New Product" : "Edit Product"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={currentProduct.name || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={currentProduct.price || ""}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={currentProduct.categoryId || ""}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={currentProduct.description || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Product description..."
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={currentProduct.imageUrl || ""}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium flex items-center gap-2"
                >
                  {modalLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {modalMode === "add" ? "Create Product" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {categoryModalMode === "add"
                  ? "Add New Category"
                  : "Edit Category"}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={currentCategory.name || ""}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={currentCategory.description || ""}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Category description..."
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  {modalLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {categoryModalMode === "add"
                    ? "Create Category"
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
