/* tslint:disable */
/* eslint-disable */

export class ApiClient {
  private http: (
    url: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response>;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: (url: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  ) {
    this.http = http ?? window.fetch.bind(window);
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : "http://localhost:5019";
  }

  protected getRequestOptions(): RequestInit {
    return {
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  }

  async getProducts(): Promise<Product[]> {
    let url_ = this.baseUrl + "/api/Products";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };

    try {
      console.log("Fetching products from:", url_);
      console.log("With options:", options_);
      const response = await this.http(url_, options_);
      console.log("Response received:", response);
      return this.processGetProducts(response);
    } catch (error) {
      console.error("API Request failed:", error);
      console.error("Request URL:", url_);
      console.error("Request options:", options_);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw new ApiException(
        `Failed to connect to the API server at ${url_}. Please check if the server is running.`,
        0,
        error instanceof Error ? error.message : "Network Error",
        {},
        error
      );
    }
  }

  protected async processGetProducts(response: Response): Promise<Product[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        return result;
      } else {
        throw new ApiException(
          "Unexpected content type: " + contentType,
          status,
          response.statusText,
          _headers,
          null
        );
      }
    } else {
      const responseText = await response.text();
      throw new ApiException(
        "An error occurred while fetching products. Server response: " +
          responseText,
        status,
        response.statusText,
        _headers,
        responseText
      );
    }
  }

  async getProduct(id: number): Promise<Product> {
    let url_ = this.baseUrl + "/api/Products/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
    };

    return this.http(url_, options_).then((_response: Response) => {
      return this.processGetProduct(_response);
    });
  }

  protected async processGetProduct(response: Response): Promise<Product> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.json();
    } else {
      return Promise.reject(
        new ApiException(
          "An error occurred while fetching the product.",
          status,
          response.statusText,
          _headers,
          null
        )
      );
    }
  }

  async createProduct(product: Product): Promise<Product> {
    let url_ = this.baseUrl + "/api/Products";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(product);

    let options_: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: content_,
      mode: "cors",
    };

    return this.http(url_, options_).then((_response: Response) => {
      return this.processCreateProduct(_response);
    });
  }

  protected async processCreateProduct(response: Response): Promise<Product> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 201) {
      return response.json();
    } else {
      return Promise.reject(
        new ApiException(
          "An error occurred while creating the product.",
          status,
          response.statusText,
          _headers,
          null
        )
      );
    }
  }

  async updateProduct(id: number, product: Product): Promise<void> {
    let url_ = this.baseUrl + "/api/Products/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(product);

    let options_: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: content_,
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };

    try {
      console.log("Updating product:", url_);
      console.log("Update payload:", content_);
      const response = await this.http(url_, options_);
      console.log("Update response:", response);
      return this.processUpdateProduct(response);
    } catch (error) {
      console.error("Product update failed:", error);
      console.error("Request URL:", url_);
      console.error("Request options:", options_);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw new ApiException(
        `Failed to update the product. Please try again.`,
        0,
        error instanceof Error ? error.message : "Network Error",
        {},
        error
      );
    }
  }

  protected async processUpdateProduct(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }

    if (status === 204 || status === 200) {
      return;
    } else {
      const responseText = await response.text();
      console.error("Update failed with status:", status);
      console.error("Response text:", responseText);
      throw new ApiException(
        `Failed to update the product. Server returned status ${status}.`,
        status,
        response.statusText,
        _headers,
        responseText
      );
    }
  }

  async deleteProduct(id: number): Promise<void> {
    let url_ = this.baseUrl + "/api/Products/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {},
      mode: "cors",
    };

    return this.http(url_, options_).then((_response: Response) => {
      return this.processDeleteProduct(_response);
    });
  }

  protected async processDeleteProduct(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 204) {
      return;
    } else {
      return Promise.reject(
        new ApiException(
          "An error occurred while deleting the product.",
          status,
          response.statusText,
          _headers,
          null
        )
      );
    }
  }

  async getCustomers(): Promise<Customer[]> {
    let url_ = this.baseUrl + "/api/Customers";
    url_ = url_.replace(/[?&]$/, "");

    const options_ = {
      ...this.getRequestOptions(),
      method: "GET",
    };

    try {
      const response = await this.http(url_, options_);
      return this.processGetCustomers(response);
    } catch (error) {
      console.error("API Request failed:", error);
      throw new ApiException(
        `Failed to fetch customers. Please try again.`,
        0,
        error instanceof Error ? error.message : "Network Error",
        {},
        error
      );
    }
  }

  protected async processGetCustomers(response: Response): Promise<Customer[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.json();
    } else {
      const responseText = await response.text();
      throw new ApiException(
        "An error occurred while fetching customers. Server response: " +
          responseText,
        status,
        response.statusText,
        _headers,
        responseText
      );
    }
  }

  async getSuppliers(): Promise<Supplier[]> {
    let url_ = this.baseUrl + "/api/Suppliers";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };

    try {
      const response = await this.http(url_, options_);
      return this.processGetSuppliers(response);
    } catch (error) {
      console.error("API Request failed:", error);
      throw new ApiException(
        `Failed to fetch suppliers. Please try again.`,
        0,
        error instanceof Error ? error.message : "Network Error",
        {},
        error
      );
    }
  }

  protected async processGetSuppliers(response: Response): Promise<Supplier[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.json();
    } else {
      const responseText = await response.text();
      throw new ApiException(
        "An error occurred while fetching suppliers. Server response: " +
          responseText,
        status,
        response.statusText,
        _headers,
        responseText
      );
    }
  }

  async getOrders(): Promise<Order[]> {
    let url_ = this.baseUrl + "/api/Orders";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
    };

    try {
      const response = await this.http(url_, options_);
      return this.processGetOrders(response);
    } catch (error) {
      console.error("API Request failed:", error);
      throw new ApiException(
        `Failed to fetch orders. Please try again.`,
        0,
        error instanceof Error ? error.message : "Network Error",
        {},
        error
      );
    }
  }

  protected async processGetOrders(response: Response): Promise<Order[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.json();
    } else {
      const responseText = await response.text();
      throw new ApiException(
        "An error occurred while fetching orders. Server response: " +
          responseText,
        status,
        response.statusText,
        _headers,
        responseText
      );
    }
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const response = await fetch(`${this.baseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to create customer",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }

    return response.json();
  }

  async updateCustomer(id: number, customer: Customer): Promise<Customer> {
    const response = await fetch(`${this.baseUrl}/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to update customer",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }

    return response.json();
  }

  async deleteCustomer(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/customers/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to delete customer",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }
  }

  async createSupplier(supplier: Supplier): Promise<Supplier> {
    const response = await fetch(`${this.baseUrl}/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to create supplier",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }

    return response.json();
  }

  async updateSupplier(id: number, supplier: Supplier): Promise<Supplier> {
    const response = await fetch(`${this.baseUrl}/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to update supplier",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }

    return response.json();
  }

  async deleteSupplier(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/suppliers/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to delete supplier",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }
  }

  async createOrder(order: Order): Promise<Order> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to create order",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }

    return response.json();
  }

  async updateOrder(id: number, order: Order): Promise<Order> {
    const response = await fetch(`${this.baseUrl}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to update order",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }

    return response.json();
  }

  async deleteOrder(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/orders/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new ApiException(
        "Failed to delete order",
        response.status,
        await response.text(),
        response.headers,
        {}
      );
    }
  }
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
  brand: string;
  category: string;
  specifications: string;
  costPrice: number;
  supplierInfo: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  warrantyInfo: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  companyName: string;
  customerType: string;
  creditLimit: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  taxIdentificationNumber: string;
  paymentTerms: string;
  bankAccountDetails: string;
  creditLimit: number;
  rating: string;
  isActive: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  taxAmount: number;
  shippingCost: number;
  shippingAddress: string;
  paymentStatus: string;
  paymentMethod: string;
  trackingNumber: string;
  shippedDate?: string;
  deliveredDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
  product?: Product;
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}
