export type MetalType = 'Gold' | 'Silver';

export type PaymentType = 'Full' | 'Partial';

export interface CollateralItem {
  id: string;
  metal: MetalType;
  type: string;
  grossWeightGrams: number;
  purity: string;
}

export interface Payment {
  id: string;
  loanId: string;
  date: string;
  amount: number;
  type: PaymentType;
  note?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  kycId: string;
}

export interface Loan {
  id: string;
  customerId: string;
  groupId: number;
  principal: number;
  interestRate: number;
  startDate: string;
  status: 'Active' | 'Closed';
  collateral: CollateralItem[];
}

export const customers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ram Manohar',
    phone: '+91 98765 43210',
    address: '12, Mahatma Nagar, Pune',
    kycId: 'AADHAR-2941',
  },
  {
    id: 'cust-2',
    name: 'Shweta Rao',
    phone: '+91 90123 45678',
    address: '88, Main Bazaar, Nashik',
    kycId: 'PAN-ADZPR',
  },
];

export const loans: Loan[] = [
  {
    id: 'loan-1',
    customerId: 'cust-1',
    groupId: 1,
    principal: 15000,
    interestRate: 1.8,
    startDate: '2023-11-25',
    status: 'Active',
    collateral: [
      {
        id: 'col-1',
        metal: 'Silver',
        type: 'Bichua',
        grossWeightGrams: 42.5,
        purity: '92%',
      },
    ],
  },
  {
    id: 'loan-2',
    customerId: 'cust-2',
    groupId: 1,
    principal: 45000,
    interestRate: 2.1,
    startDate: '2023-08-14',
    status: 'Active',
    collateral: [
      {
        id: 'col-2',
        metal: 'Gold',
        type: 'Chain',
        grossWeightGrams: 18.2,
        purity: '22K',
      },
      {
        id: 'col-3',
        metal: 'Gold',
        type: 'Ring',
        grossWeightGrams: 6.4,
        purity: '22K',
      },
    ],
  },
];

export const payments: Payment[] = [
  {
    id: 'pay-1',
    loanId: 'loan-1',
    date: '2024-01-15',
    amount: 2500,
    type: 'Partial',
    note: 'Monthly interest + part principal',
  },
  {
    id: 'pay-2',
    loanId: 'loan-1',
    date: '2024-03-10',
    amount: 5000,
    type: 'Partial',
  },
  {
    id: 'pay-3',
    loanId: 'loan-2',
    date: '2024-02-01',
    amount: 8000,
    type: 'Partial',
  },
];
