// MOCK SERVICE
// This service simulates interactions with the QuickBooks Online API.

export class QboService {
  constructor() {}

  /**
   * Simulates creating a customer in QBO.
   * @returns A promise that resolves with a mock customer creation response.
   */
  async createCustomer(customerData: any): Promise<any> {
    console.log('[QboService] Creating customer:', customerData.DisplayName);
    // Simulate API call
    return {
      Customer: {
        Id: `qbo-customer-${Math.floor(Math.random() * 1000)}`,
        DisplayName: customerData.DisplayName,
      },
      time: new Date().toISOString(),
    };
  }

  /**
   * Simulates creating an invoice in QBO.
   * @returns A promise that resolves with a mock invoice creation response.
   */
  async createInvoice(invoiceData: any): Promise<any> {
    console.log(`[QboService] Creating invoice for customer ID: ${invoiceData.CustomerRef.value}`);
    // Simulate API call
    return {
      Invoice: {
        Id: `qbo-invoice-${Math.floor(Math.random() * 1000)}`,
        CustomerRef: invoiceData.CustomerRef,
        Line: invoiceData.Line,
        TotalAmt: invoiceData.Line.reduce((acc: number, line: any) => acc + line.Amount, 0),
      },
      time: new Date().toISOString(),
    };
  }
}