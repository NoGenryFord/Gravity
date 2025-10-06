# Gravity Simulator / Симулятор Гравітації

[🇺🇦 Українська](#українська) | [🇬🇧 English](#english)

---

## Українська

### 📖 Опис

Інтерактивний симулятор гравітації, який дозволяє створювати об'єкти та спостерігати за їх взаємодією через гравітаційні сили. Реалізована реалістична фізика з пружними зіткненнями, відскоком від стін та збереженням імпульсу.

### ✨ Особливості

- **Реалістична гравітація** - об'єкти притягуються один до одного за законом всесвітнього тяжіння (F = G × m₁ × m₂ / r²)
- **Пружні зіткнення** - збереження імпульсу при зіткненнях між об'єктами
- **Відскок від стін** - об'єкти відбиваються від меж екрану
- **Групова гравітація** - багато об'єктів разом створюють сильніше гравітаційне поле
- **60 FPS** - плавна анімація фізичних взаємодій
- **Інтерактивність** - створюйте об'єкти кліком миші

### 🎮 Як користуватися

- **Лівий клік миші** - створити статичний об'єкт (без початкової швидкості)
- **Правий клік миші** - створити об'єкт з випадковою швидкістю (для орбіт)

### 🚀 Розгортання проекту

#### Вимоги

- **Node.js** версії 14 або вище
- **npm**

#### Крок 1: Клонування репозиторію

```bash
git clone https://github.com/NoGenryFord/Gravity.git
cd Gravity
```

#### Крок 2: Встановлення залежностей

```bash
npm install
```

#### Крок 3: Запуск dev-сервера

```bash
npm run dev
```

Проект буде доступний за адресою: `http://localhost:5173`

### 🔧 Структура проекту

```
Gravity/
├── index.html              # Головна HTML-сторінка
├── package.json            # Конфігурація проекту
├── src/
│   ├── js/
│   │   ├── main.js        # Обробники подій (клік миші)
│   │   └── object.js      # Фізичний движок (гравітація, колізії)
│   ├── scss/              # Стилі SCSS
│   └── styles/            # Скомпільовані CSS стилі
└── public/                # Статичні файли
```

### ⚙️ Як працює фізика

#### 1. **Гравітація**

Кожен об'єкт притягується до всіх інших об'єктів за формулою:

```
F = G × (m₁ × m₂) / r²
```

де:

- `F` - сила гравітації
- `G` - гравітаційна константа (налаштовується)
- `m₁, m₂` - маси об'єктів
- `r` - відстань між об'єктами

#### 2. **Колізії**

При зіткненні об'єктів:

- Обчислюється відносна швидкість
- Застосовується закон збереження імпульсу
- Об'єкти відштовхуються з коефіцієнтом пружності (restitution)

#### 3. **Відскок від стін**

Швидкість інвертується при зіткненні зі стіною:

```
v_new = -v_old × restitution
```

#### 4. **Групова гравітація**

Коли багато об'єктів близько один до одного, їх сумарна гравітаційна сила:

```
F_total = F₁ + F₂ + F₃ + ... + Fₙ
```

### 🎛️ Налаштування

У файлі `src/js/object.js` можна змінити:

```javascript
const G = 1; // Гравітаційна константа (більше = сильніша гравітація)
const restitution = 0.9; // Пружність (0-1, де 1 = ідеальний відскок)
const damping = 0.999; // Затухання швидкості (0-1, де 1 = без втрат)
```

У файлі `src/js/main.js` можна змінити початкову швидкість:

```javascript
const speed = Math.random() * 5 + 2; // Від 2 до 7
```

## English

### 📖 Description

An interactive gravity simulator that allows you to create objects and observe their interaction through gravitational forces. Features realistic physics with elastic collisions, wall bouncing, and momentum conservation.

### ✨ Features

- **Realistic gravity** - objects attract each other following Newton's law of universal gravitation (F = G × m₁ × m₂ / r²)
- **Elastic collisions** - momentum conservation during object collisions
- **Wall bouncing** - objects bounce off screen boundaries
- **Group gravity** - multiple objects together create a stronger gravitational field
- **60 FPS** - smooth physics animation
- **Interactivity** - create objects with mouse clicks

### 🎮 How to Use

- **Left mouse click** - create a static object (no initial velocity)
- **Right mouse click** - create an object with random velocity (for orbits)

### 🚀 Project Setup

#### Requirements

- **Node.js** version 14 or higher
- **npm**

#### Step 1: Clone the repository

```bash
git clone https://github.com/NoGenryFord/Gravity.git
cd Gravity
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Start dev server

```bash
npm run dev
```

The project will be available at: `http://localhost:5173`

### 🔧 Project Structure

```
Gravity/
├── index.html              # Main HTML page
├── package.json            # Project configuration
├── src/
│   ├── js/
│   │   ├── main.js        # Event handlers (mouse clicks)
│   │   └── object.js      # Physics engine (gravity, collisions)
│   ├── scss/              # SCSS styles
│   └── styles/            # Compiled CSS styles
└── public/                # Static files
```

### ⚙️ How Physics Works

#### 1. **Gravity**

Each object attracts all other objects using the formula:

```
F = G × (m₁ × m₂) / r²
```

where:

- `F` - gravitational force
- `G` - gravitational constant (adjustable)
- `m₁, m₂` - object masses
- `r` - distance between objects

#### 2. **Collisions**

When objects collide:

- Relative velocity is calculated
- Law of conservation of momentum is applied
- Objects bounce with a restitution coefficient

#### 3. **Wall Bouncing**

Velocity is inverted when hitting a wall:

```
v_new = -v_old × restitution
```

#### 4. **Group Gravity**

When many objects are close together, their total gravitational force:

```
F_total = F₁ + F₂ + F₃ + ... + Fₙ
```

### 🎛️ Configuration

In `src/js/object.js` you can change:

```javascript
const G = 1; // Gravitational constant (higher = stronger gravity)
const restitution = 0.9; // Elasticity (0-1, where 1 = perfect bounce)
const damping = 0.999; // Velocity damping (0-1, where 1 = no loss)
```

In `src/js/main.js` you can change initial velocity:

```javascript
const speed = Math.random() * 5 + 2; // From 2 to 7
```

## 🛠️ Tech Stack

- **Vite** - build tool and dev server
- **Vanilla JavaScript** - no frameworks, pure ES6+
- **SCSS** - CSS preprocessing
- **HTML5 Canvas** - rendering

## 👨‍💻 Author

Created with ❤️ by Stanislav K.
