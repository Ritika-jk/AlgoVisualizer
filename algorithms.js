// Data structures and mock trace steps for the AlgoBoho Visualizer.
// Each algorithm includes metadata, raw pseudocode (tokenized for coloring), and step-by-step trace states.

const ALGORITHMS = {
  bubble_sort: {
    name: "Bubble Sort",
    category: "sorting",
    description: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    pseudocode: [
      { text: "function bubbleSort(arr):", indent: 0, tag: "def" },
      { text: "  n = arr.length", indent: 0, tag: "stmt" },
      { text: "  for i from 0 to n-1:", indent: 0, tag: "loop" },
      { text: "    for j from 0 to n-i-2:", indent: 0, tag: "loop" },
      { text: "      if arr[j] > arr[j+1]:", indent: 0, tag: "cond" },
      { text: "        swap(arr[j], arr[j+1])", indent: 0, tag: "stmt" },
      { text: "  return arr", indent: 0, tag: "return" }
    ],
    // Custom workspace default code representation
    defaultInput: "25, 45, 12, 35, 18",
    initialVisuals: {
      type: "array",
      data: [25, 45, 12, 35, 18]
    },
    // Traced states for the exact array: [25, 45, 12, 35, 18]
    steps: [
      {
        line: 0,
        memory: { arr: "[25, 45, 12, 35, 18]" },
        explanation: "Entering the bubbleSort function with our initial unsorted array.",
        visuals: { active: [], compared: [], sorted: [] }
      },
      {
        line: 1,
        memory: { arr: "[25, 45, 12, 35, 18]", n: 5 },
        explanation: "Initialize n as the length of the array, which is 5.",
        visuals: { active: [], compared: [], sorted: [] }
      },
      {
        line: 2,
        memory: { arr: "[25, 45, 12, 35, 18]", n: 5, i: 0 },
        explanation: "Outer loop starts: i = 0. We will perform the first bubble-up pass.",
        visuals: { active: [], compared: [], sorted: [] }
      },
      {
        line: 3,
        memory: { arr: "[25, 45, 12, 35, 18]", n: 5, i: 0, j: 0 },
        explanation: "Inner loop starts: j = 0. Comparing the first pair of elements.",
        visuals: { active: [], compared: [0, 1], sorted: [] }
      },
      {
        line: 4,
        memory: { arr: "[25, 45, 12, 35, 18]", n: 5, i: 0, j: 0 },
        explanation: "Check: Is arr[0] (25) > arr[1] (45)? No, 25 is smaller. No swap needed.",
        visuals: { active: [], compared: [0, 1], sorted: [] }
      },
      {
        line: 3,
        memory: { arr: "[25, 45, 12, 35, 18]", n: 5, i: 0, j: 1 },
        explanation: "Inner loop increments: j = 1. Moving to the next adjacent pair.",
        visuals: { active: [], compared: [1, 2], sorted: [] }
      },
      {
        line: 4,
        memory: { arr: "[25, 45, 12, 35, 18]", n: 5, i: 0, j: 1 },
        explanation: "Check: Is arr[1] (45) > arr[2] (12)? Yes, 45 is larger. We need to swap.",
        visuals: { active: [], compared: [1, 2], sorted: [] }
      },
      {
        line: 5,
        memory: { arr: "[25, 12, 45, 35, 18]", n: 5, i: 0, j: 1, temp: 45 },
        explanation: "Swap arr[1] and arr[2]. Element 45 slides forward and 12 slides back.",
        visuals: { active: [1, 2], compared: [], sorted: [] }
      },
      {
        line: 3,
        memory: { arr: "[25, 12, 45, 35, 18]", n: 5, i: 0, j: 2 },
        explanation: "Inner loop increments: j = 2. Checking if 45 is larger than 35.",
        visuals: { active: [], compared: [2, 3], sorted: [] }
      },
      {
        line: 4,
        memory: { arr: "[25, 12, 45, 35, 18]", n: 5, i: 0, j: 2 },
        explanation: "Check: Is arr[2] (45) > arr[3] (35)? Yes, 45 is larger. Swapping is required.",
        visuals: { active: [], compared: [2, 3], sorted: [] }
      },
      {
        line: 5,
        memory: { arr: "[25, 12, 35, 45, 18]", n: 5, i: 0, j: 2, temp: 45 },
        explanation: "Swap arr[2] and arr[3]. 45 continues bubbling towards the end.",
        visuals: { active: [2, 3], compared: [], sorted: [] }
      },
      {
        line: 3,
        memory: { arr: "[25, 12, 35, 45, 18]", n: 5, i: 0, j: 3 },
        explanation: "Inner loop increments: j = 3. Checking the final pair of this pass.",
        visuals: { active: [], compared: [3, 4], sorted: [] }
      },
      {
        line: 4,
        memory: { arr: "[25, 12, 35, 45, 18]", n: 5, i: 0, j: 3 },
        explanation: "Check: Is arr[3] (45) > arr[4] (18)? Yes, 45 is larger. Swapping.",
        visuals: { active: [], compared: [3, 4], sorted: [] }
      },
      {
        line: 5,
        memory: { arr: "[25, 12, 35, 18, 45]", n: 5, i: 0, j: 3, temp: 45 },
        explanation: "Swap arr[3] and arr[4]. 45 has successfully bubbled to the end of the array.",
        visuals: { active: [3, 4], compared: [], sorted: [] }
      },
      {
        line: 2,
        memory: { arr: "[25, 12, 35, 18, 45]", n: 5, i: 1 },
        explanation: "Outer loop increments: i = 1. Element 45 is sorted. Starting second pass.",
        visuals: { active: [], compared: [], sorted: [4] }
      },
      {
        line: 3,
        memory: { arr: "[25, 12, 35, 18, 45]", n: 5, i: 1, j: 0 },
        explanation: "Inner loop restarts: j = 0. Comparing arr[0] (25) and arr[1] (12).",
        visuals: { active: [], compared: [0, 1], sorted: [4] }
      },
      {
        line: 4,
        memory: { arr: "[25, 12, 35, 18, 45]", n: 5, i: 1, j: 0 },
        explanation: "Check: Is arr[0] (25) > arr[1] (12)? Yes, swap 25 and 12.",
        visuals: { active: [], compared: [0, 1], sorted: [4] }
      },
      {
        line: 5,
        memory: { arr: "[12, 25, 35, 18, 45]", n: 5, i: 1, j: 0, temp: 25 },
        explanation: "Swap arr[0] and arr[1]. The array becomes [12, 25, 35, 18, 45].",
        visuals: { active: [0, 1], compared: [], sorted: [4] }
      },
      {
        line: 3,
        memory: { arr: "[12, 25, 35, 18, 45]", n: 5, i: 1, j: 1 },
        explanation: "Inner loop increments: j = 1. Comparing arr[1] (25) and arr[2] (35).",
        visuals: { active: [], compared: [1, 2], sorted: [4] }
      },
      {
        line: 4,
        memory: { arr: "[12, 25, 35, 18, 45]", n: 5, i: 1, j: 1 },
        explanation: "Check: Is arr[1] (25) > arr[2] (35)? No. No swap required.",
        visuals: { active: [], compared: [1, 2], sorted: [4] }
      },
      {
        line: 3,
        memory: { arr: "[12, 25, 35, 18, 45]", n: 5, i: 1, j: 2 },
        explanation: "Inner loop increments: j = 2. Comparing arr[2] (35) and arr[3] (18).",
        visuals: { active: [], compared: [2, 3], sorted: [4] }
      },
      {
        line: 4,
        memory: { arr: "[12, 25, 35, 18, 45]", n: 5, i: 1, j: 2 },
        explanation: "Check: Is arr[2] (35) > arr[3] (18)? Yes. 35 is larger than 18.",
        visuals: { active: [], compared: [2, 3], sorted: [4] }
      },
      {
        line: 5,
        memory: { arr: "[12, 25, 18, 35, 45]", n: 5, i: 1, j: 2, temp: 35 },
        explanation: "Swap arr[2] and arr[3]. 35 has bubbled to its final position.",
        visuals: { active: [2, 3], compared: [], sorted: [4] }
      },
      {
        line: 2,
        memory: { arr: "[12, 25, 18, 35, 45]", n: 5, i: 2 },
        explanation: "Outer loop increments: i = 2. Both 35 and 45 are sorted. Beginning third pass.",
        visuals: { active: [], compared: [], sorted: [3, 4] }
      },
      {
        line: 3,
        memory: { arr: "[12, 25, 18, 35, 45]", n: 5, i: 2, j: 0 },
        explanation: "Inner loop restarts: j = 0. Comparing arr[0] (12) and arr[1] (25).",
        visuals: { active: [], compared: [0, 1], sorted: [3, 4] }
      },
      {
        line: 4,
        memory: { arr: "[12, 25, 18, 35, 45]", n: 5, i: 2, j: 0 },
        explanation: "Check: Is arr[0] (12) > arr[1] (25)? No. No swap required.",
        visuals: { active: [], compared: [0, 1], sorted: [3, 4] }
      },
      {
        line: 3,
        memory: { arr: "[12, 25, 18, 35, 45]", n: 5, i: 2, j: 1 },
        explanation: "Inner loop increments: j = 1. Comparing arr[1] (25) and arr[2] (18).",
        visuals: { active: [], compared: [1, 2], sorted: [3, 4] }
      },
      {
        line: 4,
        memory: { arr: "[12, 25, 18, 35, 45]", n: 5, i: 2, j: 1 },
        explanation: "Check: Is arr[1] (25) > arr[2] (18)? Yes. 25 is larger. Swapping.",
        visuals: { active: [], compared: [1, 2], sorted: [3, 4] }
      },
      {
        line: 5,
        memory: { arr: "[12, 18, 25, 35, 45]", n: 5, i: 2, j: 1, temp: 25 },
        explanation: "Swap arr[1] and arr[2]. Array is now [12, 18, 25, 35, 45].",
        visuals: { active: [1, 2], compared: [], sorted: [3, 4] }
      },
      {
        line: 2,
        memory: { arr: "[12, 18, 25, 35, 45]", n: 5, i: 3 },
        explanation: "Outer loop increments: i = 3. Elements 25, 35, 45 are sorted. Fourth pass starts.",
        visuals: { active: [], compared: [], sorted: [2, 3, 4] }
      },
      {
        line: 3,
        memory: { arr: "[12, 18, 25, 35, 45]", n: 5, i: 3, j: 0 },
        explanation: "Inner loop: j = 0. Comparing arr[0] (12) and arr[1] (18).",
        visuals: { active: [], compared: [0, 1], sorted: [2, 3, 4] }
      },
      {
        line: 4,
        memory: { arr: "[12, 18, 25, 35, 45]", n: 5, i: 3, j: 0 },
        explanation: "Check: Is 12 > 18? No. All sorting steps completed successfully.",
        visuals: { active: [], compared: [0, 1], sorted: [2, 3, 4] }
      },
      {
        line: 6,
        memory: { arr: "[12, 18, 25, 35, 45]", n: 5, i: 3 },
        explanation: "Function completed. Returning the fully sorted array!",
        visuals: { active: [], compared: [], sorted: [0, 1, 2, 3, 4] }
      }
    ]
  },

  dfs_traversal: {
    name: "Depth-First Search (DFS)",
    category: "graph",
    description: "DFS is a graph traversal algorithm that starts at a root node and explores as far as possible along each branch before backtracking.",
    pseudocode: [
      { text: "function dfs(graph, start):", indent: 0, tag: "def" },
      { text: "  visited = new Set()", indent: 0, tag: "stmt" },
      { text: "  stack = [start]", indent: 0, tag: "stmt" },
      { text: "  while stack is not empty:", indent: 0, tag: "loop" },
      { text: "    node = stack.pop()", indent: 0, tag: "stmt" },
      { text: "    if node not in visited:", indent: 0, tag: "cond" },
      { text: "      visited.add(node)", indent: 0, tag: "stmt" },
      { text: "      for neighbor in graph[node]:", indent: 0, tag: "loop" },
      { text: "        stack.push(neighbor)", indent: 0, tag: "stmt" }
    ],
    defaultInput: "A, B, C, D, E",
    initialVisuals: {
      type: "graph",
      nodes: [
        { id: "A", x: 150, y: 100, label: "" },
        { id: "B", x: 80, y: 220, label: "" },
        { id: "C", x: 220, y: 220, label: "" },
        { id: "D", x: 80, y: 350, label: "" },
        { id: "E", x: 220, y: 350, label: "" }
      ],
      edges: [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "B", to: "D" },
        { from: "C", to: "E" },
        { from: "B", to: "C" }
      ]
    },
    steps: [
      {
        line: 0,
        memory: { start: "A", stack: "[]", visited: "{}" },
        explanation: "Entering dfs starting at node 'A'.",
        visuals: { active: [], visited: [], queued: [] }
      },
      {
        line: 1,
        memory: { start: "A", stack: "[]", visited: "{}" },
        explanation: "Initialize an empty Set to track visited nodes.",
        visuals: { active: [], visited: [], queued: [] }
      },
      {
        line: 2,
        memory: { start: "A", stack: "['A']", visited: "{}" },
        explanation: "Push the starting node 'A' onto the DFS stack.",
        visuals: { active: [], visited: [], queued: ["A"] }
      },
      {
        line: 3,
        memory: { start: "A", stack: "['A']", visited: "{}" },
        explanation: "Checking stack: stack contains ['A'], loop continues.",
        visuals: { active: [], visited: [], queued: ["A"] }
      },
      {
        line: 4,
        memory: { node: "A", stack: "[]", visited: "{}" },
        explanation: "Pop from stack: node 'A'. It is now our active node.",
        visuals: { active: ["A"], visited: [], queued: [] }
      },
      {
        line: 5,
        memory: { node: "A", stack: "[]", visited: "{}" },
        explanation: "Check: Is 'A' in visited? No, it hasn't been visited yet.",
        visuals: { active: ["A"], visited: [], queued: [] }
      },
      {
        line: 6,
        memory: { node: "A", stack: "[]", visited: "{A}" },
        explanation: "Mark node 'A' as visited.",
        visuals: { active: [], visited: ["A"], queued: [] }
      },
      {
        line: 7,
        memory: { node: "A", stack: "[]", visited: "{A}", neighbors: "['B', 'C']" },
        explanation: "Find neighbors of 'A': 'B' and 'C'. We will push them to stack.",
        visuals: { active: [], visited: ["A"], queued: [] }
      },
      {
        line: 8,
        memory: { node: "A", stack: "['B', 'C']", visited: "{A}" },
        explanation: "Pushing neighbors 'B' and 'C' to stack. Stack is now ['B', 'C'].",
        visuals: { active: [], visited: ["A"], queued: ["B", "C"] }
      },
      {
        line: 3,
        memory: { stack: "['B', 'C']", visited: "{A}" },
        explanation: "Checking stack: stack is not empty. Continue loop.",
        visuals: { active: [], visited: ["A"], queued: ["B", "C"] }
      },
      {
        line: 4,
        memory: { node: "C", stack: "['B']", visited: "{A}" },
        explanation: "Pop from stack: node 'C' (last in, first out). It is active.",
        visuals: { active: ["C"], visited: ["A"], queued: ["B"] }
      },
      {
        line: 5,
        memory: { node: "C", stack: "['B']", visited: "{A}" },
        explanation: "Check: Is 'C' in visited? No. We proceed to visit it.",
        visuals: { active: ["C"], visited: ["A"], queued: ["B"] }
      },
      {
        line: 6,
        memory: { node: "C", stack: "['B']", visited: "{A, C}" },
        explanation: "Mark node 'C' as visited.",
        visuals: { active: [], visited: ["A", "C"], queued: ["B"] }
      },
      {
        line: 7,
        memory: { node: "C", stack: "['B']", visited: "{A, C}", neighbors: "['A', 'B', 'E']" },
        explanation: "Find neighbors of 'C': 'A', 'B', and 'E'.",
        visuals: { active: [], visited: ["A", "C"], queued: ["B"] }
      },
      {
        line: 8,
        memory: { node: "C", stack: "['B', 'B', 'E']", visited: "{A, C}" },
        explanation: "Push neighbors. Node 'A' is ignored since visited. Push 'B' and 'E'. Stack: ['B', 'B', 'E'].",
        visuals: { active: [], visited: ["A", "C"], queued: ["B", "E"] }
      },
      {
        line: 3,
        memory: { stack: "['B', 'B', 'E']", visited: "{A, C}" },
        explanation: "Check stack: stack is not empty.",
        visuals: { active: [], visited: ["A", "C"], queued: ["B", "E"] }
      },
      {
        line: 4,
        memory: { node: "E", stack: "['B', 'B']", visited: "{A, C}" },
        explanation: "Pop node 'E' from stack. It is now active.",
        visuals: { active: ["E"], visited: ["A", "C"], queued: ["B"] }
      },
      {
        line: 5,
        memory: { node: "E", stack: "['B', 'B']", visited: "{A, C}" },
        explanation: "Check: Is 'E' visited? No. Proceeding.",
        visuals: { active: ["E"], visited: ["A", "C"], queued: ["B"] }
      },
      {
        line: 6,
        memory: { node: "E", stack: "['B', 'B']", visited: "{A, C, E}" },
        explanation: "Mark node 'E' as visited.",
        visuals: { active: [], visited: ["A", "C", "E"], queued: ["B"] }
      },
      {
        line: 7,
        memory: { node: "E", stack: "['B', 'B']", visited: "{A, C, E}", neighbors: "['C']" },
        explanation: "Find neighbors of 'E': 'C'. Already visited, so nothing is pushed.",
        visuals: { active: [], visited: ["A", "C", "E"], queued: ["B"] }
      },
      {
        line: 3,
        memory: { stack: "['B', 'B']", visited: "{A, C, E}" },
        explanation: "Check stack: stack is not empty.",
        visuals: { active: [], visited: ["A", "C", "E"], queued: ["B"] }
      },
      {
        line: 4,
        memory: { node: "B", stack: "['B']", visited: "{A, C, E}" },
        explanation: "Pop node 'B' from stack. Active node is 'B'.",
        visuals: { active: ["B"], visited: ["A", "C", "E"], queued: ["B"] }
      },
      {
        line: 5,
        memory: { node: "B", stack: "['B']", visited: "{A, C, E}" },
        explanation: "Check: Is 'B' in visited? No.",
        visuals: { active: ["B"], visited: ["A", "C", "E"], queued: [] }
      },
      {
        line: 6,
        memory: { node: "B", stack: "['B']", visited: "{A, B, C, E}" },
        explanation: "Mark node 'B' as visited.",
        visuals: { active: [], visited: ["A", "B", "C", "E"], queued: [] }
      },
      {
        line: 7,
        memory: { node: "B", stack: "['B']", visited: "{A, B, C, E}", neighbors: "['A', 'C', 'D']" },
        explanation: "Neighbors of 'B': 'A', 'C', 'D'. We push 'D' to the stack.",
        visuals: { active: [], visited: ["A", "B", "C", "E"], queued: [] }
      },
      {
        line: 8,
        memory: { node: "B", stack: "['B', 'D']", visited: "{A, B, C, E}" },
        explanation: "Pushing neighbor 'D'. Stack: ['B', 'D'].",
        visuals: { active: [], visited: ["A", "B", "C", "E"], queued: ["D"] }
      },
      {
        line: 3,
        memory: { stack: "['B', 'D']", visited: "{A, B, C, E}" },
        explanation: "Check stack: not empty. Continuing.",
        visuals: { active: [], visited: ["A", "B", "C", "E"], queued: ["D"] }
      },
      {
        line: 4,
        memory: { node: "D", stack: "['B']", visited: "{A, B, C, E}" },
        explanation: "Pop node 'D'. Active node: 'D'.",
        visuals: { active: ["D"], visited: ["A", "B", "C", "E"], queued: [] }
      },
      {
        line: 5,
        memory: { node: "D", stack: "['B']", visited: "{A, B, C, E}" },
        explanation: "Check: Is 'D' visited? No.",
        visuals: { active: ["D"], visited: ["A", "B", "C", "E"], queued: [] }
      },
      {
        line: 6,
        memory: { node: "D", stack: "['B']", visited: "{A, B, C, D, E}" },
        explanation: "Mark node 'D' as visited. All nodes are now visited.",
        visuals: { active: [], visited: ["A", "B", "C", "D", "E"], queued: [] }
      },
      {
        line: 3,
        memory: { stack: "['B']", visited: "{A, B, C, D, E}" },
        explanation: "Check stack: contains ['B'].",
        visuals: { active: [], visited: ["A", "B", "C", "D", "E"], queued: [] }
      },
      {
        line: 4,
        memory: { node: "B", stack: "[]", visited: "{A, B, C, D, E}" },
        explanation: "Pop node 'B' from stack.",
        visuals: { active: ["B"], visited: ["A", "B", "C", "D", "E"], queued: [] }
      },
      {
        line: 5,
        memory: { node: "B", stack: "[]", visited: "{A, B, C, D, E}" },
        explanation: "Check: Is 'B' in visited? Yes, 'B' is already visited. Skipping node.",
        visuals: { active: [], visited: ["A", "B", "C", "D", "E"], queued: [] }
      },
      {
        line: 3,
        memory: { stack: "[]", visited: "{A, B, C, D, E}" },
        explanation: "Check stack: stack is empty. We are finished!",
        visuals: { active: [], visited: ["A", "B", "C", "D", "E"], queued: [] }
      }
    ]
  },

  bst_insertion: {
    name: "BST Insertion",
    category: "trees",
    description: "Inserts a new value into a Binary Search Tree by recursively comparing the value with current node keys to find the proper leaf position.",
    pseudocode: [
      { text: "function insert(node, val):", indent: 0, tag: "def" },
      { text: "  if node is null:", indent: 0, tag: "cond" },
      { text: "    return new Node(val)", indent: 0, tag: "stmt" },
      { text: "  if val < node.val:", indent: 0, tag: "cond" },
      { text: "    node.left = insert(node.left, val)", indent: 0, tag: "stmt" },
      { text: "  else:", indent: 0, tag: "cond" },
      { text: "    node.right = insert(node.right, val)", indent: 0, tag: "stmt" },
      { text: "  return node", indent: 0, tag: "return" }
    ],
    defaultInput: "15",
    initialVisuals: {
      type: "tree",
      nodes: [
        { id: "20", x: 200, y: 70, label: "Root" },
        { id: "10", x: 100, y: 170, label: "" },
        { id: "30", x: 300, y: 170, label: "" },
        { id: "5", x: 50, y: 270, label: "" }
      ],
      edges: [
        { from: "20", to: "10" },
        { from: "20", to: "30" },
        { from: "10", to: "5" }
      ]
    },
    steps: [
      {
        line: 0,
        memory: { val: 15, node: "Root (20)" },
        explanation: "Start insertion helper with target value 15 at root node (20).",
        visuals: { active: "20", visited: [], queued: [], newNodePos: null }
      },
      {
        line: 1,
        memory: { val: 15, node: "20" },
        explanation: "Check: Is current node null? No, it contains value 20.",
        visuals: { active: "20", visited: [], queued: [], newNodePos: null }
      },
      {
        line: 3,
        memory: { val: 15, node: "20" },
        explanation: "Check: Is val (15) < node.val (20)? Yes, 15 is smaller than 20. Go to left child.",
        visuals: { active: "20", visited: [], queued: [], newNodePos: null }
      },
      {
        line: 4,
        memory: { val: 15, node: "20", parent: "20" },
        explanation: "Calling insert recursively with node.left, which is 10.",
        visuals: { active: "10", visited: ["20"], queued: [], newNodePos: null }
      },
      {
        line: 0,
        memory: { val: 15, node: "10" },
        explanation: "Recursion entered. Current node is 10.",
        visuals: { active: "10", visited: ["20"], queued: [], newNodePos: null }
      },
      {
        line: 1,
        memory: { val: 15, node: "10" },
        explanation: "Check: Is node null? No, node has value 10.",
        visuals: { active: "10", visited: ["20"], queued: [], newNodePos: null }
      },
      {
        line: 3,
        memory: { val: 15, node: "10" },
        explanation: "Check: Is val (15) < node.val (10)? No, 15 is greater. Go to right child.",
        visuals: { active: "10", visited: ["20"], queued: [], newNodePos: null }
      },
      {
        line: 6,
        memory: { val: 15, node: "10", parent: "10" },
        explanation: "Calling insert recursively on node.right, which is null (empty).",
        visuals: { active: null, visited: ["20", "10"], queued: [], newNodePos: { x: 150, y: 270, parent: "10", side: "right" } }
      },
      {
        line: 0,
        memory: { val: 15, node: "null" },
        explanation: "Recursion entered. Current node is null.",
        visuals: { active: null, visited: ["20", "10"], queued: [], newNodePos: { x: 150, y: 270, parent: "10", side: "right" } }
      },
      {
        line: 1,
        memory: { val: 15, node: "null" },
        explanation: "Check: Is node null? Yes.",
        visuals: { active: null, visited: ["20", "10"], queued: [], newNodePos: { x: 150, y: 270, parent: "10", side: "right" } }
      },
      {
        line: 2,
        memory: { val: 15, node: "null" },
        explanation: "Create and return a new Node with value 15, attaching it to parent 10.",
        visuals: { active: "15", visited: ["20", "10"], queued: [], insertNew: { id: "15", x: 150, y: 270, parent: "10" } }
      },
      {
        line: 7,
        memory: { val: 15, node: "20" },
        explanation: "Backtracking complete. Node 15 successfully integrated into our BST!",
        visuals: { active: null, visited: [], queued: [] }
      }
    ]
  },

  fib_dp: {
    name: "Fibonacci (DP)",
    category: "dynamic_programming",
    description: "Computes the n-th Fibonacci number using a bottom-up Dynamic Programming table (tabulation) to store subproblems and achieve O(n) runtime.",
    pseudocode: [
      { text: "function fibonacci(n):", indent: 0, tag: "def" },
      { text: "  fib = new Array(n + 1)", indent: 0, tag: "stmt" },
      { text: "  fib[0] = 0", indent: 0, tag: "stmt" },
      { text: "  fib[1] = 1", indent: 0, tag: "stmt" },
      { text: "  for i from 2 to n:", indent: 0, tag: "loop" },
      { text: "    fib[i] = fib[i-1] + fib[i-2]", indent: 0, tag: "stmt" },
      { text: "  return fib[n]", indent: 0, tag: "return" }
    ],
    defaultInput: "6",
    initialVisuals: {
      type: "fib",
      n: 6,
      cells: [
        { index: 0, value: null },
        { index: 1, value: null },
        { index: 2, value: null },
        { index: 3, value: null },
        { index: 4, value: null },
        { index: 5, value: null },
        { index: 6, value: null }
      ]
    },
    steps: [
      {
        line: 0,
        memory: { n: 6, fib: "[]" },
        explanation: "Entering fibonacci function for n = 6.",
        visuals: { currentIdx: null, calculated: [] }
      },
      {
        line: 1,
        memory: { n: 6, fib: "[empty x 7]" },
        explanation: "Initialize an array of size n + 1 (7 cells) to hold subproblem answers.",
        visuals: { currentIdx: null, calculated: [] }
      },
      {
        line: 2,
        memory: { n: 6, fib: "[0, empty x 6]" },
        explanation: "Base Case: set fib[0] to 0.",
        visuals: { currentIdx: 0, calculated: [0] }
      },
      {
        line: 3,
        memory: { n: 6, fib: "[0, 1, empty x 5]" },
        explanation: "Base Case: set fib[1] to 1.",
        visuals: { currentIdx: 1, calculated: [0, 1] }
      },
      {
        line: 4,
        memory: { n: 6, fib: "[0, 1, empty x 5]", i: 2 },
        explanation: "DP Loop begins: i = 2. We will compute fib[2] using values of index 1 and 0.",
        visuals: { currentIdx: 2, calculated: [0, 1] }
      },
      {
        line: 5,
        memory: { n: 6, fib: "[0, 1, 1, empty x 4]", i: 2 },
        explanation: "fib[2] = fib[1] (1) + fib[0] (0) = 1.",
        visuals: { currentIdx: 2, calculated: [0, 1, 2] }
      },
      {
        line: 4,
        memory: { n: 6, fib: "[0, 1, 1, empty x 4]", i: 3 },
        explanation: "Loop increments: i = 3. Compute fib[3] using index 2 and 1.",
        visuals: { currentIdx: 3, calculated: [0, 1, 2] }
      },
      {
        line: 5,
        memory: { n: 6, fib: "[0, 1, 1, 2, empty x 3]", i: 3 },
        explanation: "fib[3] = fib[2] (1) + fib[1] (1) = 2.",
        visuals: { currentIdx: 3, calculated: [0, 1, 2, 3] }
      },
      {
        line: 4,
        memory: { n: 6, fib: "[0, 1, 1, 2, empty x 3]", i: 4 },
        explanation: "Loop increments: i = 4. Compute fib[4] using index 3 and 2.",
        visuals: { currentIdx: 4, calculated: [0, 1, 2, 3] }
      },
      {
        line: 5,
        memory: { n: 6, fib: "[0, 1, 1, 2, 3, empty x 2]", i: 4 },
        explanation: "fib[4] = fib[3] (2) + fib[2] (1) = 3.",
        visuals: { currentIdx: 4, calculated: [0, 1, 2, 3, 4] }
      },
      {
        line: 4,
        memory: { n: 6, fib: "[0, 1, 1, 2, 3, empty x 2]", i: 5 },
        explanation: "Loop increments: i = 5. Compute fib[5] using index 4 and 3.",
        visuals: { currentIdx: 5, calculated: [0, 1, 2, 3, 4] }
      },
      {
        line: 5,
        memory: { n: 6, fib: "[0, 1, 1, 2, 3, 5, empty]", i: 5 },
        explanation: "fib[5] = fib[4] (3) + fib[3] (2) = 5.",
        visuals: { currentIdx: 5, calculated: [0, 1, 2, 3, 4, 5] }
      },
      {
        line: 4,
        memory: { n: 6, fib: "[0, 1, 1, 2, 3, 5, empty]", i: 6 },
        explanation: "Loop increments: i = 6 (final loop iteration). Compute fib[6] from index 5 and 4.",
        visuals: { currentIdx: 6, calculated: [0, 1, 2, 3, 4, 5] }
      },
      {
        line: 5,
        memory: { n: 6, fib: "[0, 1, 1, 2, 3, 5, 8]", i: 6 },
        explanation: "fib[6] = fib[5] (5) + fib[4] (3) = 8.",
        visuals: { currentIdx: 6, calculated: [0, 1, 2, 3, 4, 5, 6] }
      },
      {
        line: 6,
        memory: { n: 6, fib: "[0, 1, 1, 2, 3, 5, 8]", result: 8 },
        explanation: "Done! Returning fib[6] which is 8.",
        visuals: { currentIdx: 6, calculated: [0, 1, 2, 3, 4, 5, 6] }
      }
    ]
  }
};
