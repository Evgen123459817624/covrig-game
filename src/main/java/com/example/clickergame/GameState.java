package com.example.clickergame;

public class GameState {
    private int score = 0;
    private double money = 0;
    private int autoClickers = 0;
    private int autoClickerCost = 10;
    private int ovenCost = 500;
    private int nrOfOvens = 0;
    private int level = 1;
    private int upgradeCost = 500;
    private int factoryCost = 1000;
    private int nrOfFactories = 0;
    private int rebirths = 0;

    public int getScore() { return score; }
    public double getMoney() { return money; }
    public int getAutoClickers() { return autoClickers; }
    public int getAutoClickerCost() { return autoClickerCost; }
    public int getOvenCost() { return ovenCost; }
    public int getNrOfOvens() { return nrOfOvens; }
    public int getLevel() { return level; }
    public int getUpgradeCost() { return upgradeCost; }
    public int getNrOfFactories() { return nrOfFactories; }
    public int getFactoryCost() { return factoryCost; }
    public int getRebirths() { return rebirths; }

    public void click() {
        score++;
    }

    public boolean buyAutoClicker() {
        if (money >= autoClickerCost) {
            money -= autoClickerCost;
            autoClickers++;
            autoClickerCost += 10;
            autoClickerCost *= (int)Math.sqrt(rebirths + 1);
            return true;
        }
        return false;
    }

    public boolean buyOven() {
        if (money >= ovenCost) {
            money -= ovenCost;
            nrOfOvens++;
            ovenCost += (int)(Math.pow(3, nrOfOvens + 1) * 5);
            ovenCost *= (int)Math.sqrt(rebirths + 2);
            return true;
        }
        return false;
    }

    public void tick() {
        score += autoClickers;
        score += (nrOfOvens * 3);
        score += (nrOfFactories * 7);
    }

    public boolean upgrade() {
        if(money >= upgradeCost) {
            money -= upgradeCost;
            level++;
            upgradeCost += (int)(Math.pow(level, 1.5) * upgradeCost / 2);
            upgradeCost *= (int)Math.sqrt(rebirths + 3);
            return true;
        }
        return false;
    }

    public void totalReset() {
        score = 0;
        money = 0;
        autoClickers = 0;
        autoClickerCost = 25;
        ovenCost = 500;
        nrOfOvens = 0;
        level = 1;
        upgradeCost = 500;
        factoryCost = 1000;
        nrOfFactories = 0;
    }

    public void sell(double price) {
        money += (score * price);
        score = 0;
    }

    public void reRoll() {
        money = money - money / 20.0;
    }

    public boolean buyFactory() {
        if(money >= factoryCost) {
            nrOfFactories++;
            money -= factoryCost;
            factoryCost += (int)(Math.pow(4, nrOfFactories + 1) * 5);
            factoryCost *= (int)Math.sqrt(rebirths + 3);
            return true;
        }
        return false;
    }

    public void rebirth() {
        rebirths++;
        totalReset();
    }
}
