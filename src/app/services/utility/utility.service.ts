import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  checkFileUpload: any;


  constructor() { }

  setuploadFile(checked: boolean) {
    this.checkFileUpload = checked
  }
  getuplaodFile() {
    return this.checkFileUpload;
  }

  additionalDoc: Array<any> = [
    { name: 'Signed Form', value: 'SIGNED_FORM' },
    { name: 'Death Certificate', value: 'DEATH_CERTIFICATE ' },
    { name: 'Borrower Kyc Proof', value: 'BORROWER_KYC_PROOF' },
    { name: 'Nominee Kyc Proof', value: 'NOMINEE_KYC_PROOF' },
    { name: 'Postmortem Report', value: 'POSTMORTEM_REPORT' },
    { name: 'Bank Account Proof - Borrower', value: 'BANK_ACCOUNT_PROOF' },
    { name: 'Bank Account Proof - Nominee', value: 'BANK_ACCOUNT_PROOF' },
    { name: 'Police FIR Report', value: 'FIR_REPORT' },
    { name: 'Additional Document', value: 'ADDITIONAL' },
    { name: 'Bank Passbook - Borrower', value: 'BANK_PASSBOOK' },
    { name: 'Bank Passbook - Nominee', value: 'BANK_PASSBOOK' },
    { name: 'Bank Statement - Borrower', value: 'BANK_STATEMENT' },
    { name: 'Bank Statement - Nominee', value: 'BANK_STATEMENT' },
    { name: 'Cheque Leaf / Cancelled cheque', value: 'CHEQUE_LEAF' },
    { name: 'Neft Form', value: 'NEFT_FORM' },
    { name: 'Income Tax Returns', value: 'INCOME_TAX_RETURN' },
    { name: 'Medical Records', value: 'MEDICAL_RECORDS' },
    { name: 'Legal Heir Certificate', value: 'LEGAL_HEIR_CERTIFICATE' },
    { name: 'Police Investigation Report', value: 'POLICE_INVESTIGATION_REPORT' },
    { name: 'Relationship Proof', value: 'RELATIONSHIP_PROOF' },
    { name: 'Guardian Id Proof', value: 'GUARDIAN_ID_PROOF' },
    { name: 'Guardian Address Proof', value: 'GUARDIAN_ADD_PROOF' },
    { name: 'Stamped Affidavit', value: 'STAMPED_AFFIDAVIT' },
    { name: 'Medical Attendant Certificate', value: 'MEDICAL_ATTENDANT_CERTIFICATE' },
    { name: 'Any utility bill', value: '  ANY_UTILITY_BILL' },
    { name: 'Other Document', value: '  OTHER' },
  ]
}
