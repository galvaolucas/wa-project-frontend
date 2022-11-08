export interface DeleteModalProps {
    open: boolean;
    transaction_id: string;
    closeModal: () => void;
    deleteTransaction: (id: string) => Promise<void>;
    reloadTransactions: (id: string) => Promise<void>;
}