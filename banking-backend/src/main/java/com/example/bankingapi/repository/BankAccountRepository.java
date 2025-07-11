package com.example.bankingapi.repository;

import com.example.bankingapi.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
}
