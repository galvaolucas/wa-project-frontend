import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { DeleteModalProps } from "./dtos";

export function DeleteTransactionConfirmationModal ({open, closeModal, transaction_id, deleteTransaction, reloadTransactions} : DeleteModalProps) {
    const toast = useToast();

    const showToast = () => {
        toast({
            title: 'Transação excluída com sucesso!',
            status: "info",
            duration: 3000,
            isClosable: true,
        })
    }
    
    return (
        <Modal
            isOpen={open}
            onClose={closeModal}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Excluir Transação</ModalHeader>
                <ModalCloseButton />
                
                <ModalBody alignItems='center' justifyContent='center'>
                    <Flex>Tem certeza que deseja excluir essa transação?</Flex>
                </ModalBody>

                <ModalFooter gap={5} alignItems="center" justifyContent="center">
                    <Button
                        w="150px"
                        onClick={() => {
                            closeModal();
                        }}
                        bgColor="green_logo"
                        color="black"
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                    >
                        Fechar
                    </Button>
                    <Button
                        w="150px"
                        bgColor="green_logo"
                        color="black"
                        mr={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }} 
                        onClick={() => {
                            deleteTransaction(transaction_id);
                            showToast();
                            closeModal();
                        }}
                    >
                        Confirmar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}