package com.example.bankingapi.controller;

import com.example.bankingapi.model.BankAccount;
import com.example.bankingapi.model.Transaction;
import com.example.bankingapi.repository.BankAccountRepository;
import com.example.bankingapi.repository.TransactionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/banking")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://banking-app-rust-beta.vercel.app"
})
public class BankAccountController {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private TransactionRepository transactionRepository;


    // Create a new bank account
    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@Valid @RequestBody BankAccount account, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        return ResponseEntity.ok(bankAccountRepository.save(account));
    }


    // Get all bank accounts
    @GetMapping("/accounts")
    public List<BankAccount> getAllAccounts() {
        return bankAccountRepository.findAll();
    }

    // Get a specific account by ID
    @GetMapping("/account/{id}")
    public BankAccount getAccountById(@PathVariable Long id) {
        return bankAccountRepository.findById(id).orElse(null);
    }

    @GetMapping("/account/{id}/transactions")
    public List<Transaction> getTransactions(@PathVariable Long id) {
        return transactionRepository.findByAccountId(id);
    }


    @DeleteMapping("/account/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        if (!bankAccountRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }
        bankAccountRepository.deleteById(id);
        return ResponseEntity.ok("Account deleted successfully");
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(
            @RequestParam Long fromId,
            @RequestParam Long toId,
            @RequestParam double amount) {

        BankAccount from = bankAccountRepository.findById(fromId).orElse(null);
        BankAccount to = bankAccountRepository.findById(toId).orElse(null);

        if (from == null || to == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("One of the accounts not found");
        }

        if (from.getBalance() < amount) {
            return ResponseEntity.badRequest().body("Insufficient funds");
        }

        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        bankAccountRepository.save(from);
        bankAccountRepository.save(to);

        // Save transactions...
        transactionRepository.save(new Transaction("transfer-out", amount * -1, from));
        transactionRepository.save(new Transaction("transfer-in", amount, to));

        return ResponseEntity.ok("Transfer successful");
    }




    @PutMapping("/account/{id}")
    public ResponseEntity<BankAccount> updateAccount(@PathVariable Long id, @RequestBody BankAccount account) {
        return bankAccountRepository.findById(id)
                .map(existing -> {
                    existing.setAccountHolder(account.getAccountHolder());
                    return ResponseEntity.ok(bankAccountRepository.save(existing));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


    // Deposit money into an account
    @PutMapping("/deposit/{id}")
    public ResponseEntity<BankAccount> depositMoney(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload) {

        double amount = Double.parseDouble(payload.get("balance").toString());
        BankAccount account = bankAccountRepository.findById(id).orElse(null);
        if (account != null) {
            account.setBalance(account.getBalance() + amount);
            return ResponseEntity.ok(bankAccountRepository.save(account));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    // Withdraw money from an account
    @PutMapping("/withdraw/{id}")
    public ResponseEntity<?> withdrawMoney(@PathVariable Long id, @RequestBody BankAccount request) {
        BankAccount account = bankAccountRepository.findById(id).orElse(null);
        if (account != null) {
            account.setBalance(account.getBalance() - request.getBalance());
            bankAccountRepository.save(account);
            return ResponseEntity.ok("Withdraw successful");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
    }



}