import { EnsoraService } from './ensora.service';
import { QboService } from './qbo.service';

// A mock mapping of CPT codes to QBO item details
const CPT_CODE_MAP: { [key: string]: { name: string; price: number } } = {
  '92557': { name: 'Comprehensive Audiometry', price: 150 },
  'V5261': { name: 'Binaural BTE HA', price: 2500 },
};

export class SyncService {
  private ensoraService: EnsoraService;
  private qboService: QboService;

  constructor() {
    this.ensoraService = new EnsoraService();
    this.qboService = new QboService();
  }

  /**
   * Runs the full mock synchronization process for a patient.
   * @returns A promise that resolves with a log of operations.
   */
  async runSync(patientId: string): Promise<string[]> {
    const log: string[] = [];

    try {
      log.push('Starting sync process...');

      // 1. Fetch patient data from Ensora
      const patient = await this.ensoraService.getPatient(patientId);
      log.push(`[SUCCESS] Fetched patient '${patient.name}' from Ensora.`);

      // 2. Create a corresponding customer in QBO
      const customerPayload = { DisplayName: patient.name };
      const qboCustomer = await this.qboService.createCustomer(customerPayload);
      log.push(`[SUCCESS] Created QBO Customer with ID: ${qboCustomer.Customer.Id}`);

      // 3. Transform patient CPT codes into QBO invoice lines
      const invoiceLines = patient.cptCodes.map((code: string) => {
        const item = CPT_CODE_MAP[code] || { name: 'Unknown Item', price: 0 };
        return {
          DetailType: 'SalesItemLineDetail',
          Amount: item.price,
          SalesItemLineDetail: {
            ItemRef: { name: item.name, value: code },
          },
        };
      });
      log.push(`[INFO] Prepared ${invoiceLines.length} line items for the invoice.`);

      // 4. Create the invoice in QBO
      const invoicePayload = {
        CustomerRef: { value: qboCustomer.Customer.Id },
        Line: invoiceLines,
      };
      const qboInvoice = await this.qboService.createInvoice(invoicePayload);
      log.push(`[SUCCESS] Created QBO Invoice with ID: ${qboInvoice.Invoice.Id} for a total of $${qboInvoice.Invoice.TotalAmt}.`);

      log.push('\nSync process completed successfully!');
    } catch (error) {
      console.error(error);
      log.push(`[ERROR] Sync process failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return log;
  }
}