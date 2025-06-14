package com.example.bankingapi;

import static org.junit.jupiter.api.Assertions.*;

import com.example.bankingapi.model.BankAccount;
import com.example.bankingapi.repository.BankAccountRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BankAccountRepositoryTest {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Test
    public void testCreateBankAccount() {
        BankAccount account = new BankAccount("John Doe", 1000.00);
        BankAccount savedAccount = bankAccountRepository.save(account);
        assertNotNull(savedAccount.getId());
    }

    @Test
    public void testFindBankAccountById() {
        BankAccount account = new BankAccount("Jane Doe", 500.00);
        bankAccountRepository.save(account);
        BankAccount foundAccount = bankAccountRepository.findById(account.getId()).orElse(null);
        assertNotNull(foundAccount);
        assertEquals(account.getAccountHolder(), foundAccount.getAccountHolder());
    }
}
