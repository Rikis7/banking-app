package com.example.bankingapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Transaction {

    @Id
    @GeneratedValue
    private Long id;

    private String type;
    private double amount;
    private LocalDateTime dateTime;

    @ManyToOne
    private BankAccount account;

    public Transaction() {}

    public Transaction(String type, double amount, BankAccount account) {
        this.type = type;
        this.amount = amount;
        this.account = account;
        this.dateTime = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() { return id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }

    public BankAccount getAccount() { return account; }
    public void setAccount(BankAccount account) { this.account = account; }
}
