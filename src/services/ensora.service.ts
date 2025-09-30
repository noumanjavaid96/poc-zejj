// MOCK SERVICE
// This service simulates interactions with the Ensora Echo API.

export class EnsoraService {
  constructor() {}

  /**
   * Simulates fetching a patient from Ensora.
   * @returns A promise that resolves with mock patient data.
   */
  async getPatient(patientId: string): Promise<any> {
    console.log(`[EnsoraService] Fetching patient ${patientId}...`);
    // In a real implementation, this would be an API call.
    // For this demo, we return a hardcoded patient object.
    return {
      id: patientId,
      name: 'John Doe',
      dob: '1985-04-12',
      cptCodes: ['92557', 'V5261'], // Comprehensive audiometry, Binaural BTE HA
    };
  }
}