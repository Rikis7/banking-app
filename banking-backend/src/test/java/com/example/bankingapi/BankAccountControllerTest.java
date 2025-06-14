package com.example.bankingapi;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.bankingapi.controller.BankAccountController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BankAccountController.class)
public class BankAccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCreateBankAccount() throws Exception {
        mockMvc.perform(post("/api/banking/create")
                        .contentType("application/json")
                        .content("{\"accountHolder\":\"John Doe\", \"balance\":1000.00}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountHolder").value("John Doe"));
    }

    @Test
    public void testGetAllAccounts() throws Exception {
        mockMvc.perform(get("/api/banking/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
