import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {

  getAllProducts: async (): Promise<{ products: Product[]; total: number }> => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },


  getProducts: async (limit: number = 10, skip: number = 0): Promise<{ products: Product[]; total: number }> => {
    try {
      const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },


  getProduct: async (id: number): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  },


  searchProducts: async (query: string): Promise<{ products: Product[]; total: number }> => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  },


  getProductsByCategory: async (category: string): Promise<{ products: Product[]; total: number }> => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  },


  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  },


  getBeautyProducts: async (): Promise<{ products: Product[]; total: number }> => {
    try {
      const allProducts = await productService.getAllProducts();
      const beautyKeywords = [
        'mascara', 'lipstick', 'foundation', 'concealer', 'eyeshadow',
        'blush', 'powder', 'serum', 'moisturizer', 'cleanser',
        'perfume', 'fragrance', 'nail', 'beauty', 'cosmetic',
        'makeup', 'skin', 'face', 'eye', 'lip'
      ];

      const beautyProducts = allProducts.products.filter(product =>
        beautyKeywords.some(keyword =>
          product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes('beauty') ||
          product.category.toLowerCase().includes('fragrance')
        )
      );

      return {
        products: beautyProducts,
        total: beautyProducts.length
      };
    } catch (error) {
      console.error('Error fetching beauty products:', error);
      throw new Error('Failed to fetch beauty products');
    }
  },
};

export default api;
