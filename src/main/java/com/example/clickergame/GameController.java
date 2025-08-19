package com.example.clickergame;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// GameController.java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class GameController {

    private final GameState state = new GameState();

    @GetMapping("/status")
    public GameState getStatus() {
        return state;
    }

    @PostMapping("/click")
    public void click() {
        state.click();
    }

    @PostMapping("/buy-upgrade")
    public ResponseEntity<String> buyUpgrade() {
        boolean bought = state.buyAutoClicker();
        return ResponseEntity.ok(bought ? "Upgrade cumpărat" : "Scor insuficient");
    }

    @PostMapping("/tick")
    public void tick() {
        state.tick();
    }

    @PostMapping("/buy-oven")
    public ResponseEntity<String> buyOven() {
        boolean bought = state.buyOven();
        return ResponseEntity.ok(bought ? "Rola cumparata" : "Scor insuficient");
    }

    @PostMapping("/upgrade")
    public ResponseEntity<String> upgrade() {
        boolean bought = state.upgrade();
        return ResponseEntity.ok(bought ? "Upgrade cu succes" : "Scor insuficient");

    }

    @PostMapping("/total-reset")
    public void reset() {
        state.totalReset();
    }

    public static class SellRequest {
        private double price;

        // getter și setter
        public double getPrice() { return price; }
        public void setPrice(float price) { this.price = price; }
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sell(@RequestBody SellRequest request) {
        state.sell(request.getPrice());
        return ResponseEntity.ok("Produs vândut cu prețul " + request.getPrice());
    }

    @PostMapping("/reroll")
    public void reRoll() {
        state.reRoll();
    }

    @PostMapping("/buy-factory")
    public ResponseEntity<String> buyFactory() {
        boolean bought = state.buyFactory();
        return ResponseEntity.ok(bought ? "Factory cumparat cu succes" : "Bani insuficient");
    }

    @PostMapping("/rebirth")
    public void rebirth() {
        state.rebirth();
    }
}
