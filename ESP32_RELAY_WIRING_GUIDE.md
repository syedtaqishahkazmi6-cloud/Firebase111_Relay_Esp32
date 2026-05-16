# ESP32 & 8-Channel Relay Module 12V - Complete Wiring Guide

---

# PART 1: ESP32 DEVKIT V1 PINOUT

## ESP32 Pin Layout Diagram

```
                    ┌─────────────────┐
                    │   USB (Data)    │
                    └────────┬────────┘
                             │
        ┌──────────────────────┴──────────────────────┐
        │                                             │
    GND ├─────────────────────────────────────────────┤ 3V3
    D23 ├─────────────────────────────────────────────┤ EN (Reset)
    D22 ├─────────────────────────────────────────────┤ SVP (Analog)
    TXD ├─────────────────────────────────────────────┤ SVN (Analog)
    RXD ├─────────────────────────────────────────────┤ A0
    D21 ├─────────────────────────────────────────────┤ A3
    GND ├─────────────────────────────────────────────┤ A4
    D19 ├─────────────────────────────────────────────┤ A5
    D18 ├─────────────────────────────────────────────┤ A6
    D5  ├─────────────────────────────────────────────┤ A7
    D17 ├─────────────────────────────────────────────┤ A8
    D16 ├─────────────────────────────────────────────┤ A9
    D4  ├─────────────────────────────────────────────┤ A10
    D2  ├─────────────────────────────────────────────┤ A11
    D15 ├─────────────────────────────────────────────┤ A12
    D14 ├─────────────────────────────────────────────┤ A13
    D13 ├─────────────────────────────────────────────┤ GND
    GND ├─────────────────────────────────────────────┤ VIN (5V)
    VIN ├─────────────────────────────────────────────┤ GND
        └─────────────────────────────────────────────┘
```

---

# PART 2: 8-CHANNEL RELAY MODULE 12V PINOUT

## Relay Module Pin Description

```
8-Channel Relay Module (JZC-FF-2-12VDC)

Top View:
┌─────────────────────────────────┐
│ IN1 IN2 IN3 IN4 IN5 IN6 IN7 IN8 │  ← Signal Inputs
├─────────────────────────────────┤
│    [Relay Coils Inside]         │
├─────────────────────────────────┤
│ VCC GND                         │  ← Power
└─────────────────────────────────┘

Relay Connector Terminals:
Each relay has 3 terminals:
├── NO  (Normally Open)    - normally disconnected
├── COM (Common)           - always connected to one of above
└── NC  (Normally Closed)  - normally connected to COM
```

---

# PART 3: COMPLETE WIRING TABLE

## ESP32 to 8-Channel Relay Module Connection

| Channel | Relay IN Pin | ESP32 GPIO | Status | Function |
|---------|--------------|-----------|--------|----------|
| CH1 | IN1 | GPIO 23 | ✅ Used | Light |
| CH2 | IN2 | GPIO 22 | ✅ Used | Fan |
| CH3 | IN3 | GPIO 21 | ✅ Used | Hardware |
| CH4 | IN4 | GPIO 19 | ✅ Used | Studio |
| CH5 | IN5 | GPIO 18 | ✅ Used | Class |
| CH6 | IN6 | GPIO 13 | ✅ Used | Light 2 |
| CH7 | IN7 | GPIO 12 | ✅ Used | Printer |
| CH8 | IN8 | GPIO 2 | ✅ Used | LED |

---

## Power Supply Connections

| Device | Pin | Connects To | Wire Color | Function |
|--------|-----|-------------|-----------|----------|
| **Relay Module** | VCC | 12V Power Supply | **RED** | Power (+) |
| **Relay Module** | GND | 12V Power Supply | **BLACK** | Ground (-) |
| **ESP32** | GND | 12V Power Supply GND | **BLACK** | Common Ground |
| **ESP32** | 5V | USB Power OR 5V Supply | **RED** | Power (5V) |

---

# PART 4: STEP-BY-STEP WIRING INSTRUCTIONS

## What You Need:
- ✅ ESP32 DOIT DEVKIT V1
- ✅ 8-Channel Relay Module 12V
- ✅ 12V Power Supply (at least 2A)
- ✅ 8 Relays (usually built into module)
- ✅ Jumper wires (Male-to-Female)
- ✅ USB cable (for ESP32 programming)

---

## Step 1: Signal Wires (ESP32 to Relay)

Connect these GPIO pins from ESP32 to relay IN pins:

```
ESP32 GPIO 23 ——→ Relay IN1 (CH1)
ESP32 GPIO 22 ——→ Relay IN2 (CH2)
ESP32 GPIO 21 ——→ Relay IN3 (CH3)
ESP32 GPIO 19 ——→ Relay IN4 (CH4)
ESP32 GPIO 18 ——→ Relay IN5 (CH5)
ESP32 GPIO 13 ——→ Relay IN6 (CH6)
ESP32 GPIO 12 ——→ Relay IN7 (CH7)
ESP32 GPIO 2  ——→ Relay IN8 (CH8)
```

**Wire Type:** Use thin jumper wires (22 AWG)

---

## Step 2: Ground Connection

```
ESP32 GND ——→ Relay Module GND
ESP32 GND ——→ 12V Power Supply GND (Common Ground)
```

**Why?** All grounds must be connected together (common reference)

---

## Step 3: Power Supply to Relay Module

```
12V Power Supply (+) ——→ Relay Module VCC (with fuse 2A)
12V Power Supply (-) ——→ Relay Module GND
```

**IMPORTANT:** 
- Use a **2A fuse** on the 12V line
- Use wires rated for 2A (18 AWG minimum)
- Power supply must be 12V DC, at least 2A

---

## Step 4: ESP32 Power

```
USB Cable ——→ ESP32 (for programming & 5V power)
OR
5V Power Supply ——→ ESP32 5V & GND (for standalone operation)
```

---

# PART 5: RELAY TERMINAL CONNECTIONS (For Your Devices)

## How to Connect Your Loads (Lights, Fans, etc.)

Each relay has 3 terminals:

```
┌─────────────────┐
│  NO │ COM │ NC  │
│   ↓  │  ↓  │  ↓ │
│ Open │ ref │Closed
└─────────────────┘
```

### Example: Connecting a Light Bulb

```
Light Wire A ——→ Relay COM (Common)
Light Wire B ——→ Relay NO (Normally Open)

When relay activates:
├─ COM connects to NO
├─ Current flows through light
└─ Light turns ON
```

---

# PART 6: COMPLETE WIRING SUMMARY TABLE

## All Connections at a Glance

| From | To | Wire Color | Purpose | Current |
|------|--|----|---------|---------|
| ESP32 GND | Relay Module GND | Black | Signal Ground | 0mA |
| ESP32 GPIO 23 | Relay IN1 | White/Gray | CH1 Control | 5mA |
| ESP32 GPIO 22 | Relay IN2 | White/Gray | CH2 Control | 5mA |
| ESP32 GPIO 21 | Relay IN3 | White/Gray | CH3 Control | 5mA |
| ESP32 GPIO 19 | Relay IN4 | White/Gray | CH4 Control | 5mA |
| ESP32 GPIO 18 | Relay IN5 | White/Gray | CH5 Control | 5mA |
| ESP32 GPIO 13 | Relay IN6 | White/Gray | CH6 Control | 5mA |
| ESP32 GPIO 12 | Relay IN7 | White/Gray | CH7 Control | 5mA |
| ESP32 GPIO 2 | Relay IN8 | White/Gray | CH8 Control | 5mA |
| **12V PSU (+)** | **Relay VCC** | **Red** | **Power** | **~1500mA** |
| **12V PSU (-)** | **Relay GND** | **Black** | **Ground** | **~1500mA** |
| **12V PSU (-)** | **ESP32 GND** | **Black** | **Common Ground** | **0mA** |
| **USB/5V PSU** | **ESP32 5V/GND** | **Red/Black** | **ESP32 Power** | **500mA** |

---

# PART 7: QUICK REFERENCE - GPIO PINS USED

```
USED PINS (Signal Control):
├── GPIO 23 ← Relay CH1
├── GPIO 22 ← Relay CH2
├── GPIO 21 ← Relay CH3
├── GPIO 19 ← Relay CH4
├── GPIO 18 ← Relay CH5
├── GPIO 13 ← Relay CH6
├── GPIO 12 ← Relay CH7
├── GPIO 2  ← Relay CH8
└── GND     ← Signal Ground

POWER PINS:
├── VIN     ← 5V Power (from USB or external)
├── GND     ← Power Ground
└── 3.3V    ← NOT USED (relay needs 5V logic)
```

---

# PART 8: RELAY SPECIFICATIONS

## 8-Channel Relay Module 12V Specs

| Parameter | Value |
|-----------|-------|
| **Module Name** | JZC-FF-2-12VDC |
| **Number of Relays** | 8 |
| **Coil Voltage** | 12V DC |
| **Coil Current** | ~80mA per relay |
| **Contact Rating** | 10A @ 250V AC / 10A @ 30V DC |
| **Switching Time** | ~15ms |
| **Type** | Electromagnetic relay with optocoupler |
| **Logic Voltage** | 5V DC (for IN pins) |
| **Module Power** | ~640mA (all 8 relays active) |

---

# PART 9: TROUBLESHOOTING

## Problem: Relays Don't Activate

**Check:**
1. ✓ IN pins connected to correct GPIO pins
2. ✓ 12V power supply connected to VCC/GND
3. ✓ 12V power supply switched ON
4. ✓ ESP32 Ground connected to Relay GND
5. ✓ Code is uploading without errors

---

## Problem: Intermittent Relay Activation

**Check:**
1. ✓ Jumper wires are fully inserted
2. ✓ No loose connections
3. ✓ 12V power supply can deliver 2A
4. ✓ GND connection is solid

---

## Problem: ESP32 Won't Program

**Check:**
1. ✓ USB cable is good (try different cable)
2. ✓ COM port selected correctly
3. ✓ Board is set to: DOIT ESP32 DEVKIT V1
4. ✓ Don't touch GPIO wires while programming

---

# PART 10: SAFETY WARNINGS ⚠️

## High Voltage - Be Careful!

```
❌ DO NOT:
  - Touch 12V terminals with wet hands
  - Connect 110V/220V AC directly to relays (not rated for it)
  - Use undersized wires (use 18 AWG minimum for 12V)
  - Forget fuse on 12V line

✅ DO:
  - Use proper 2A fuse on 12V positive
  - Keep 12V circuits away from 5V circuits
  - Use common ground for all circuits
  - Test with LEDs before connecting real load
```

---

# PART 11: TESTING WITH LEDs (Before Real Devices)

## Safe Testing Method

Instead of connecting real 12V devices, test with LEDs first:

```
Relay COM  ——→ 12V (+)
Relay NO   ——→ LED Anode (+)
LED Cathode (-) ——→ 12V GND

When relay activates:
├─ COM connects to NO
├─ LED gets 12V
└─ LED lights up!

Replace LED with real device when working.
```

---

# PART 12: REFERENCE DIAGRAMS

## Full System Block Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Your Phone                       │
│              (WiFi or Mobile Data)                  │
└────────────────────────┬────────────────────────────┘
                         │
                    Firebase Cloud
                         │
        ┌────────────────┴────────────────┐
        │                                 │
   ┌────▼─────────┐              ┌───────▼──────┐
   │ WiFi Router  │              │  12V Power   │
   │  (Home)      │              │   Supply     │
   └────┬─────────┘              └───────┬──────┘
        │                                │
   ┌────▼──────────────────────────────┬─▼──┐
   │           ESP32                   │ GND│
   │ GPIO 23,22,21,19,18,13,12,2 ◄────┼────┘
   │           │ │ │ │ │ │ │ │        
   └───────────┼─┼─┼─┼─┼─┼─┼─┼────────┘
               │ │ │ │ │ │ │ │
         ┌─────▼─┼─┼─┼─┼─┼─┼─┼─────┬──────┐
         │8-Channel Relay Module 12V│      │
         │                          │      │
         │ IN1 IN2 IN3 IN4 IN5 IN6 IN7 IN8│
         │  │   │   │   │   │   │   │   │ │
         │ CH1 CH2 CH3 CH4 CH5 CH6 CH7 CH8│
         └────┬────┬────┬────┬────┬────┬───┘
              │    │    │    │    │    │
           Device Device Device Device Device Device Device Device
```

---

# PART 13: WIRE COLOR CODING STANDARD

## Follow This Standard

| Wire Type | Color | Use |
|-----------|-------|-----|
| **Positive (12V)** | Red | Power line |
| **Negative/Ground** | Black | Ground/Return |
| **Signal (5V)** | White/Gray | Data lines |
| **Optional** | Yellow/Orange | Alternative signals |
| **Optional** | Green/Blue | Additional signals |

---

# PART 14: PARTS CHECKLIST

## Everything You Need

- [ ] ESP32 DOIT DEVKIT V1 board
- [ ] 8-Channel Relay Module 12V (JZC-FF-2 type)
- [ ] 12V DC Power Supply (2A minimum)
- [ ] USB Cable for ESP32
- [ ] Jumper Wires (20 pieces minimum)
- [ ] 2A Fuse & Fuse Holder (for 12V line)
- [ ] Breadboard (optional, helps with connections)
- [ ] Multi-meter (for testing)
- [ ] Schematic & Guide (this file!)

---

# QUICK START SUMMARY

1. **Connect Signal Wires:**
   - 8 GPIO pins to 8 relay IN pins

2. **Connect Ground:**
   - ESP32 GND to Relay GND
   - Relay GND to 12V PSU GND (common)

3. **Connect Power:**
   - 12V PSU to Relay VCC/GND (with fuse)
   - USB cable to ESP32

4. **Test:**
   - Open web app
   - Tap buttons
   - Relays should click!

5. **Connect Loads:**
   - Connect your 12V devices to relay COM/NO terminals

---

**Wiring Complete!** Ready to upload code and test! ✅
