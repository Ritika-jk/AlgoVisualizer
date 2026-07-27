# 🌿 AlgoVisualizer

> Algorithm Visualizations Made Simple, Visual, and Satisfying.

Welcome to **AlgoVisualizer**! 🚀 Whether you are preparing for coding interviews, studying computer science fundamentals, or just love seeing data structures come to life, this tool was built to make learning algorithms feel intuitive, interactive, and visually engaging.

🌐 **[Try the Live Web App Here!](https://ritika-jk.github.io/AlgoVisualizer/)**

---

## 💡 Why I Built This

Learning algorithms from text descriptions or static diagrams can often feel dry or confusing. I wanted to build a workspace that gives you **full control** over algorithm execution — allowing you to watch values move, step through pseudocode line-by-line, and experiment with your own custom data.

### Highlights & Design Philosophy

- **🎨 Organic & Earthy Aesthetic**: A calm, distraction-free environment with soft glassmorphism panels and fluid Day/Night theme toggles.
- **⏯️ Step-by-Step Playback**: Pause, step forward, step backward, or change animation speed whenever you want to pause and reflect on a step.
- **🔍 Real-Time Variable Tracking**: Watch exact variable states (`left`, `right`, `mid`, `i`, `j`, `pivot`, etc.) change dynamically alongside pseudocode highlights.
- **💻 Built-in Code Sandbox**: Want to test your own JavaScript logic? Switch to the sandbox tab and run custom algorithm code live in your browser.
- **⚡ 45+ Pre-configured Algorithms**: Covering everything from elementary sorting algorithms to advanced dynamic programming and string matching.

---

## 🗂️ What You Can Explore

### 🔍 Searching Algorithms
- Linear Search, Binary Search, Jump Search, Interpolation Search, Exponential Search

### 🔄 Sorting Algorithms
- Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort, Heap Sort, Radix Sort, Shell Sort

### 🕸️ Graph & Pathfinding Algorithms
- Dijkstra's Algorithm, Breadth-First Search (BFS), Depth-First Search (DFS), A* Search, Bellman-Ford, Kruskal's, Prim's

### 🧩 Dynamic Programming
- Fibonacci (Memoization & Tabulation), 0/1 Knapsack, Longest Common Subsequence (LCS), Edit Distance, Coin Change

### 🌲 Trees & Data Structures
- Binary Search Tree (BST), AVL Tree, Min & Max Heaps, Trie, Segment Tree, Disjoint Set (Union-Find)

### 🔤 String Matching
- Knuth-Morris-Pratt (KMP), Rabin-Karp, Z-Algorithm, Naive Pattern Matching

---

## 🚀 How to Run it Locally

Since this project is crafted with pure **HTML5, Vanilla CSS, and JavaScript**, there are no heavy build tools or `npm install` steps required.

1. **Clone the repo**:
   ```bash
   git clone https://github.com/ritika-jk/AlgoVisualizer.git
   cd AlgoVisualizer
   ```

2. **Launch a quick local server**:
   - With Python:
     ```bash
     python -m http.server 8000
     ```
   - Or with Node.js:
     ```bash
     npx serve .
     ```

3. Open `http://localhost:8000` in your favorite web browser!

---

## 📁 Repository Structure

```text
├── index.html       # Clean HTML5 structure & visualizer UI
├── style.css        # Custom CSS design system, glassmorphism, & day/night theme tokens
├── app.js           # Core event handling, state control & user interactions
├── algorithms.js    # Step execution engines & visual animation handlers
├── algorithms_db.js # Database of 45+ algorithm definitions, descriptions, & pseudocode
└── README.md        # You are here!
```

---

## 💬 Feedback & Suggestions

Got an idea for a new algorithm visualization or UI feature? Feel free to open an issue or submit a pull request. 

Made with ❤️ by [Ritika](https://github.com/ritika-jk). Happy Coding! ✨
