// Predefined database of exactly 45 algorithms categorized by type.
// Structured as an array of categories, where each category contains an array of algorithm objects.

const ALGORITHMS_DB = [
  {
    category: "Searching",
    algorithms: [
      {
        id: "linear-search",
        name: "Linear Search",
        category: "Searching",
        difficulty: "Beginner",
        description: "Checks every element in a list sequentially from start to end until a match is found. It is like searching for a specific card in a shuffled deck by turning them over one by one.",
        timeComplexity: {
          best: "O(1)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def linear_search(arr, target):",
          "  for i from 0 to length(arr) - 1:",
          "    if arr[i] == target:",
          "      return i",
          "  return -1"
        ],
        mockVisualState: {
          type: "array",
          initialData: [4, 8, 15, 16, 23, 42],
          trackedVariables: ["i", "target", "arr[i]"]
        }
      },
      {
        id: "binary-search",
        name: "Binary Search",
        category: "Searching",
        difficulty: "Beginner",
        description: "Repeatedly divides a sorted search interval in half to find a target value. It is like looking up a word in a physical dictionary by opening it in the middle and choosing which half to keep searching.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)"
        },
        pseudocode: [
          "def binary_search(arr, target):",
          "  left = 0",
          "  right = length(arr) - 1",
          "  while left <= right:",
          "    mid = left + (right - left) / 2",
          "    if arr[mid] == target:",
          "      return mid",
          "    elif arr[mid] < target:",
          "      left = mid + 1",
          "    else:",
          "      right = mid - 1",
          "  return -1"
        ],
        mockVisualState: {
          type: "array",
          initialData: [3, 8, 12, 16, 23, 38, 56, 72],
          trackedVariables: ["left", "right", "mid"]
        }
      },
      {
        id: "jump-search",
        name: "Jump Search",
        category: "Searching",
        difficulty: "Intermediate",
        description: "Searches in a sorted array by jumping ahead by fixed steps and then performing a linear search backwards from the jump point. It is like checking every 10th page of a book until you overshoot your chapter, then flipping back page by page.",
        timeComplexity: {
          best: "O(1)",
          average: "O(sqrt(n))",
          worst: "O(sqrt(n))"
        },
        pseudocode: [
          "def jump_search(arr, target):",
          "  n = length(arr)",
          "  step = sqrt(n)",
          "  prev = 0",
          "  while arr[min(step, n) - 1] < target:",
          "    prev = step",
          "    step = step + sqrt(n)",
          "    if prev >= n:",
          "      return -1",
          "  while arr[prev] < target:",
          "    prev = prev + 1",
          "    if prev == min(step, n):",
          "      return -1",
          "  if arr[prev] == target:",
          "    return prev",
          "  return -1"
        ],
        mockVisualState: {
          type: "array",
          initialData: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
          trackedVariables: ["step", "prev", "index"]
        }
      },
      {
        id: "exponential-search",
        name: "Exponential Search",
        category: "Searching",
        difficulty: "Intermediate",
        description: "Finds the range where the target resides by doubling the index step size exponentially, and then performs a binary search within that range. It is like searching for a house on a long street by checking house 1, 2, 4, 8, 16, etc., until you pass the target, then looking between the last two houses.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)"
        },
        pseudocode: [
          "def exponential_search(arr, target):",
          "  n = length(arr)",
          "  if arr[0] == target:",
          "    return 0",
          "  i = 1",
          "  while i < n and arr[i] <= target:",
          "    i = i * 2",
          "  return binary_search_range(arr, target, i / 2, min(i, n - 1))"
        ],
        mockVisualState: {
          type: "array",
          initialData: [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31],
          trackedVariables: ["i", "left", "right"]
        }
      }
    ]
  },
  {
    category: "Sorting",
    algorithms: [
      {
        id: "bubble-sort",
        name: "Bubble Sort",
        category: "Sorting",
        difficulty: "Beginner",
        description: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It is like bubbles rising to the surface of water as larger values bubble to the top of the array.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n^2)",
          worst: "O(n^2)"
        },
        pseudocode: [
          "def bubble_sort(arr):",
          "  n = length(arr)",
          "  for i from 0 to n - 1:",
          "    for j from 0 to n - i - 2:",
          "      if arr[j] > arr[j + 1]:",
          "        swap(arr[j], arr[j + 1])",
          "  return arr"
        ],
        mockVisualState: {
          type: "array",
          initialData: [29, 10, 14, 37, 13],
          trackedVariables: ["i", "j", "swapped"]
        }
      },
      {
        id: "selection-sort",
        name: "Selection Sort",
        category: "Sorting",
        difficulty: "Beginner",
        description: "Divides the array into sorted and unsorted parts, repeatedly selects the smallest element from the unsorted part, and swaps it into the sorted position. It is like picking the smallest card in your hand and moving it to the far left, then repeating for the rest.",
        timeComplexity: {
          best: "O(n^2)",
          average: "O(n^2)",
          worst: "O(n^2)"
        },
        pseudocode: [
          "def selection_sort(arr):",
          "  n = length(arr)",
          "  for i from 0 to n - 1:",
          "    min_idx = i",
          "    for j from i + 1 to n - 1:",
          "      if arr[j] < arr[min_idx]:",
          "        min_idx = j",
          "    swap(arr[i], arr[min_idx])",
          "  return arr"
        ],
        mockVisualState: {
          type: "array",
          initialData: [64, 25, 12, 22, 11],
          trackedVariables: ["i", "j", "min_idx"]
        }
      },
      {
        id: "insertion-sort",
        name: "Insertion Sort",
        category: "Sorting",
        difficulty: "Beginner",
        description: "Builds a sorted array one element at a time by picking the next unsorted element and inserting it into its correct position relative to the sorted elements. It is like sorting a hand of playing cards by picking one card at a time and sliding it into the correct position.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n^2)",
          worst: "O(n^2)"
        },
        pseudocode: [
          "def insertion_sort(arr):",
          "  for i from 1 to length(arr) - 1:",
          "    key = arr[i]",
          "    j = i - 1",
          "    while j >= 0 and arr[j] > key:",
          "      arr[j + 1] = arr[j]",
          "      j = j - 1",
          "    arr[j + 1] = key",
          "  return arr"
        ],
        mockVisualState: {
          type: "array",
          initialData: [12, 11, 13, 5, 6],
          trackedVariables: ["i", "j", "key"]
        }
      },
      {
        id: "merge-sort",
        name: "Merge Sort",
        category: "Sorting",
        difficulty: "Intermediate",
        description: "A divide-and-conquer algorithm that recursively splits the array in half, sorts each half, and merges the sorted halves back together. It is like sorting small piles of papers individually, then combining them into larger sorted piles.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        pseudocode: [
          "def merge_sort(arr):",
          "  if length(arr) <= 1:",
          "    return arr",
          "  mid = length(arr) / 2",
          "  left = merge_sort(arr[0...mid])",
          "  right = merge_sort(arr[mid...end])",
          "  return merge(left, right)"
        ],
        mockVisualState: {
          type: "array",
          initialData: [38, 27, 43, 3, 9, 82, 10],
          trackedVariables: ["left", "right", "mid"]
        }
      },
      {
        id: "quick-sort",
        name: "Quick Sort",
        category: "Sorting",
        difficulty: "Intermediate",
        description: "Selects a pivot element and partitions the array such that elements smaller than the pivot go to the left and larger ones to the right, recursively sorting the partitions. It is like sorting a classroom by height relative to a teacher (the pivot), then doing the same for the left and right groups.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n^2)"
        },
        pseudocode: [
          "def quick_sort(arr, low, high):",
          "  if low < high:",
          "    pivot_idx = partition(arr, low, high)",
          "    quick_sort(arr, low, pivot_idx - 1)",
          "    quick_sort(arr, pivot_idx + 1, high)"
        ],
        mockVisualState: {
          type: "array",
          initialData: [10, 80, 30, 90, 40, 50, 70],
          trackedVariables: ["low", "high", "pivot"]
        }
      },
      {
        id: "heap-sort",
        name: "Heap Sort",
        category: "Sorting",
        difficulty: "Advanced",
        description: "Visualizes the array as a binary heap tree, repeatedly extracts the maximum element to the end of the array, and rebuilds the heap. It is like sorting items by repeatedly placing the highest priority item into a delivery queue, then organizing what remains.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        pseudocode: [
          "def heap_sort(arr):",
          "  n = length(arr)",
          "  build_max_heap(arr)",
          "  for i from n - 1 down to 1:",
          "    swap(arr[0], arr[i])",
          "    heapify(arr, i, 0)"
        ],
        mockVisualState: {
          type: "array",
          initialData: [4, 10, 3, 5, 1],
          trackedVariables: ["i", "heap_size"]
        }
      },
      {
        id: "counting-sort",
        name: "Counting Sort",
        category: "Sorting",
        difficulty: "Intermediate",
        description: "A non-comparison sort that counts the occurrences of each unique value in an array and computes their correct index positions. It is like sorting votes in an election by placing ballots into separate boxes for each candidate, then stacking them in order.",
        timeComplexity: {
          best: "O(n + k)",
          average: "O(n + k)",
          worst: "O(n + k)"
        },
        pseudocode: [
          "def counting_sort(arr):",
          "  max_val = find_max(arr)",
          "  count = array of size (max_val + 1) filled with 0",
          "  output = array of same size as arr",
          "  for x in arr:",
          "    count[x] += 1",
          "  for i from 1 to max_val:",
          "    count[i] += count[i - 1]",
          "  for i from length(arr) - 1 down to 0:",
          "    output[count[arr[i]] - 1] = arr[i]",
          "    count[arr[i]] -= 1",
          "  return output"
        ],
        mockVisualState: {
          type: "array",
          initialData: [4, 2, 2, 8, 3, 3, 1],
          trackedVariables: ["count_array", "output_array"]
        }
      },
      {
        id: "radix-sort",
        name: "Radix Sort",
        category: "Sorting",
        difficulty: "Advanced",
        description: "Sorts integers digit by digit, from the least significant digit (ones place) to the most significant digit (tens, hundreds, etc.), using counting sort as a subroutine. It is like organizing index cards with 3-digit numbers by first sorting by the last digit, then the middle digit, then the first digit.",
        timeComplexity: {
          best: "O(nk)",
          average: "O(nk)",
          worst: "O(nk)"
        },
        pseudocode: [
          "def radix_sort(arr):",
          "  max_val = find_max(arr)",
          "  exp = 1",
          "  while max_val / exp > 0:",
          "    counting_sort_by_digit(arr, exp)",
          "    exp *= 10"
        ],
        mockVisualState: {
          type: "array",
          initialData: [170, 45, 75, 90, 802, 24, 2, 66],
          trackedVariables: ["exp", "max_val"]
        }
      }
    ]
  },
  {
    category: "Trees & Tries",
    algorithms: [
      {
        id: "bst-insertion",
        name: "BST Insertion",
        category: "Trees & Tries",
        difficulty: "Beginner",
        description: "Inserts a value into a Binary Search Tree by comparing the value to the current node and moving left if it is smaller or right if it is larger, until an empty spot is found. It is like adding a folder to an alphabetical filing cabinet, recursively narrowing down the path.",
        timeComplexity: {
          best: "O(log n)",
          average: "O(log n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def insert(root, value):",
          "  if root is null:",
          "    return Node(value)",
          "  if value < root.value:",
          "    root.left = insert(root.left, value)",
          "  else:",
          "    root.right = insert(root.right, value)",
          "  return root"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 10, left: { value: 5 }, right: { value: 15 } },
          trackedVariables: ["root", "value", "current"]
        }
      },
      {
        id: "bst-search",
        name: "BST Search",
        category: "Trees & Tries",
        difficulty: "Beginner",
        description: "Traverses a Binary Search Tree looking for a target value, navigating left if the target is smaller than the current node or right if it is larger. It is like traversing a directional pathway in a maze where signs tell you to go left or right based on numbers.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def search(root, target):",
          "  if root is null or root.value == target:",
          "    return root",
          "  if target < root.value:",
          "    return search(root.left, target)",
          "  return search(root.right, target)"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 10, left: { value: 5, left: { value: 3 } }, right: { value: 15 } },
          trackedVariables: ["current_node", "target"]
        }
      },
      {
        id: "bst-deletion",
        name: "BST Deletion",
        category: "Trees & Tries",
        difficulty: "Advanced",
        description: "Removes a node from a BST and restructures the tree to preserve properties, handling three cases: leaf nodes, nodes with one child, and nodes with two children. It is like deleting a manager from an organization chart and promoting the correct successor to keep the team structure intact.",
        timeComplexity: {
          best: "O(log n)",
          average: "O(log n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def delete_node(root, key):",
          "  if root is null: return root",
          "  if key < root.key:",
          "    root.left = delete_node(root.left, key)",
          "  elif key > root.key:",
          "    root.right = delete_node(root.right, key)",
          "  else:",
          "    if root.left is null: return root.right",
          "    if root.right is null: return root.left",
          "    temp = min_value_node(root.right)",
          "    root.key = temp.key",
          "    root.right = delete_node(root.right, temp.key)",
          "  return root"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 10, left: { value: 5 }, right: { value: 15, left: { value: 12 } } },
          trackedVariables: ["key", "successor", "current"]
        }
      },
      {
        id: "in-order-traversal",
        name: "In-Order Traversal",
        category: "Trees & Tries",
        difficulty: "Beginner",
        description: "Traverses a binary tree recursively in the order: Left child, Root, then Right child. For a Binary Search Tree, this visits nodes in sorted ascending order, just like sorting a list of family names by branches.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def in_order(node):",
          "  if node is not null:",
          "    in_order(node.left)",
          "    visit(node.value)",
          "    in_order(node.right)"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 4, left: { value: 2, left: { value: 1 }, right: { value: 3 } }, right: { value: 5 } },
          trackedVariables: ["current_node", "visited_list"]
        }
      },
      {
        id: "pre-order-traversal",
        name: "Pre-Order Traversal",
        category: "Trees & Tries",
        difficulty: "Beginner",
        description: "Visits the current root node first, then recursively traverses the left subtree, followed by the right subtree. It is like cloning a directory structure, where you must create the parent directory folder before you can copy the contents of its left and right subfolders.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def pre_order(node):",
          "  if node is not null:",
          "    visit(node.value)",
          "    pre_order(node.left)",
          "    pre_order(node.right)"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 4, left: { value: 2, left: { value: 1 }, right: { value: 3 } }, right: { value: 5 } },
          trackedVariables: ["current_node", "visited_list"]
        }
      },
      {
        id: "post-order-traversal",
        name: "Post-Order Traversal",
        category: "Trees & Tries",
        difficulty: "Beginner",
        description: "Traverses the left subtree first, then the right subtree, and finally visits the root node. It is like calculating folder sizes on your computer, where you must count the sizes of all subfolders before you can compute the total size of the parent folder.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def post_order(node):",
          "  if node is not null:",
          "    post_order(node.left)",
          "    post_order(node.right)",
          "    visit(node.value)"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 4, left: { value: 2, left: { value: 1 }, right: { value: 3 } }, right: { value: 5 } },
          trackedVariables: ["current_node", "visited_list"]
        }
      },
      {
        id: "level-order-traversal",
        name: "Level-Order Traversal (BFS)",
        category: "Trees & Tries",
        difficulty: "Intermediate",
        description: "Visits nodes level by level from top to bottom, and left to right within each level, using a queue. It is like reading the lines of a textbook page by page, reading each word in a line before moving to the next line.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def level_order(root):",
          "  if root is null: return",
          "  queue = Queue()",
          "  queue.enqueue(root)",
          "  while queue is not empty:",
          "    node = queue.dequeue()",
          "    visit(node.value)",
          "    if node.left is not null:",
          "      queue.enqueue(node.left)",
          "    if node.right is not null:",
          "      queue.enqueue(node.right)"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 1, left: { value: 2 }, right: { value: 3 } },
          trackedVariables: ["queue", "current_node"]
        }
      },
      {
        id: "lowest-common-ancestor",
        name: "Lowest Common Ancestor (LCA)",
        category: "Trees & Tries",
        difficulty: "Intermediate",
        description: "Finds the lowest node in a tree that has both node A and node B as descendants. It is like looking at a family tree to find the nearest shared grandparent or ancestor of two relatives.",
        timeComplexity: {
          best: "O(log n)",
          average: "O(log n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def find_lca(root, p, q):",
          "  if root is null or root == p or root == q:",
          "    return root",
          "  left = find_lca(root.left, p, q)",
          "  right = find_lca(root.right, p, q)",
          "  if left is not null and right is not null:",
          "    return root",
          "  return left if left is not null else right"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: 3, left: { value: 5, left: { value: 6 }, right: { value: 2 } }, right: { value: 1 } },
          trackedVariables: ["p", "q", "current_ancestor"]
        }
      },
      {
        id: "trie-insertion",
        name: "Trie (Prefix Tree) Insertion",
        category: "Trees & Tries",
        difficulty: "Intermediate",
        description: "Inserts a word into a prefix tree character by character, creating path nodes for characters if they do not exist. It is like spelling a word in a word search game, where each letter branches out into options for the next letter.",
        timeComplexity: {
          best: "O(L)",
          average: "O(L)",
          worst: "O(L)"
        },
        pseudocode: [
          "def insert_word(root, word):",
          "  current = root",
          "  for char in word:",
          "    if char not in current.children:",
          "      current.children[char] = TrieNode()",
          "    current = current.children[char]",
          "  current.is_end_of_word = true"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { value: "*", children: { c: { value: "c", children: { a: { value: "a", children: { t: { value: "t", isEndOfWord: true, children: {} } } } } } } },
          trackedVariables: ["word", "char", "current"]
        }
      }
    ]
  },
  {
    category: "Graphs",
    algorithms: [
      {
        id: "bfs",
        name: "Breadth-First Search (BFS)",
        category: "Graphs",
        difficulty: "Intermediate",
        description: "Explores nodes in a graph layer by layer, visiting all neighbors of a node before moving to their neighbors, using a queue. It is like water ripples spreading out from a splash, wetting nearest points first.",
        timeComplexity: {
          best: "O(V + E)",
          average: "O(V + E)",
          worst: "O(V + E)"
        },
        pseudocode: [
          "def BFS(graph, start):",
          "  visited = Set([start])",
          "  queue = Queue([start])",
          "  while queue is not empty:",
          "    vertex = queue.dequeue()",
          "    visit(vertex)",
          "    for neighbor in graph.neighbors(vertex):",
          "      if neighbor not in visited:",
          "        visited.add(neighbor)",
          "        queue.enqueue(neighbor)"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: [1, 2, 3, 4], adjacencyList: { "1": [2, 3], "2": [1, 4], "3": [1, 4], "4": [2, 3] } },
          trackedVariables: ["queue", "visited", "vertex"]
        }
      },
      {
        id: "dfs",
        name: "Depth-First Search (DFS)",
        category: "Graphs",
        difficulty: "Intermediate",
        description: "Explores as deep as possible along each branch before backtracking, utilizing a call stack. It is like navigating a maze where you walk down a path until you hit a dead end, then turn back to the last fork.",
        timeComplexity: {
          best: "O(V + E)",
          average: "O(V + E)",
          worst: "O(V + E)"
        },
        pseudocode: [
          "def DFS(graph, vertex, visited):",
          "  visited.add(vertex)",
          "  visit(vertex)",
          "  for neighbor in graph.neighbors(vertex):",
          "    if neighbor not in visited:",
          "      DFS(graph, neighbor, visited)"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: [1, 2, 3, 4], adjacencyList: { "1": [2, 3], "2": [4], "3": [4], "4": [] } },
          trackedVariables: ["stack", "visited", "vertex"]
        }
      },
      {
        id: "dijkstras-shortest-path",
        name: "Dijkstra’s Shortest Path",
        category: "Graphs",
        difficulty: "Intermediate",
        description: "Finds the shortest path from a starting source node to all other nodes in a weighted graph by greedily selecting the nearest unvisited node. It is like planning the fastest GPS route from your house to all surrounding cities.",
        timeComplexity: {
          best: "O((V + E) log V)",
          average: "O((V + E) log V)",
          worst: "O((V + E) log V)"
        },
        pseudocode: [
          "def dijkstra(graph, start):",
          "  dist = Map(infinity for all nodes, dist[start] = 0)",
          "  pq = PriorityQueue(with (0, start))",
          "  while pq is not empty:",
          "    (d, u) = pq.extract_min()",
          "    for (v, weight) in graph.neighbors(u):",
          "      if dist[u] + weight < dist[v]:",
          "        dist[v] = dist[u] + weight",
          "        pq.insert((dist[v], v))",
          "  return dist"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: ["A", "B", "C"], adjacencyList: { A: [["B", 4], ["C", 2]], B: [["C", 1]], C: [] } },
          trackedVariables: ["dist", "pq", "u"]
        }
      },
      {
        id: "kruskals-mst",
        name: "Kruskal’s Minimum Spanning Tree",
        category: "Graphs",
        difficulty: "Advanced",
        description: "Finds the Minimum Spanning Tree of a weighted graph by sorting all edges from smallest to largest weight and adding them to the tree if they don't form a cycle. It is like laying down power cables to connect a set of houses with the absolute minimum cable length, avoiding redundant loops.",
        timeComplexity: {
          best: "O(E log E)",
          average: "O(E log E)",
          worst: "O(E log E)"
        },
        pseudocode: [
          "def kruskal(graph):",
          "  mst = Set()",
          "  edges = sorted(graph.edges, by=weight)",
          "  ds = DisjointSet(graph.vertices)",
          "  for edge (u, v, weight) in edges:",
          "    if ds.find(u) != ds.find(v):",
          "      mst.add(edge)",
          "      ds.union(u, v)",
          "  return mst"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: ["A", "B", "C"], edges: [["A", "B", 1], ["B", "C", 3], ["A", "C", 2]] },
          trackedVariables: ["mst", "ds", "edges"]
        }
      },
      {
        id: "prims-mst",
        name: "Prim's Minimum Spanning Tree",
        category: "Graphs",
        difficulty: "Advanced",
        description: "Finds the MST of a weighted graph by growing the tree outward one vertex at a time, always selecting the cheapest edge connecting an inside vertex to an outside vertex. It is like expanding a clean water pipe system from a single central well, connecting the nearest house first.",
        timeComplexity: {
          best: "O((V + E) log V)",
          average: "O((V + E) log V)",
          worst: "O((V + E) log V)"
        },
        pseudocode: [
          "def prim(graph, start):",
          "  mst = Set()",
          "  visited = Set([start])",
          "  pq = PriorityQueue(edges connected to start)",
          "  while pq is not empty:",
          "    edge (u, v, weight) = pq.extract_min()",
          "    if v not in visited:",
          "      visited.add(v)",
          "      mst.add(edge)",
          "      for next_edge in graph.edges_from(v):",
          "        pq.insert(next_edge)",
          "  return mst"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: ["A", "B", "C"], adjacencyList: { A: [["B", 2], ["C", 4]], B: [["C", 1]], C: [] } },
          trackedVariables: ["visited", "pq", "mst"]
        }
      },
      {
        id: "topological-sort",
        name: "Topological Sort",
        category: "Graphs",
        difficulty: "Intermediate",
        description: "Orders the vertices of a directed acyclic graph (DAG) linearly such that for every directed edge U to V, U comes before V. It is like arranging college courses in order of prerequisites, making sure you take Math 101 before Math 201.",
        timeComplexity: {
          best: "O(V + E)",
          average: "O(V + E)",
          worst: "O(V + E)"
        },
        pseudocode: [
          "def topological_sort(graph):",
          "  visited = Set()",
          "  stack = Stack()",
          "  for vertex in graph.vertices:",
          "    if vertex not in visited:",
          "      dfs_sort(vertex, visited, stack)",
          "  return stack.reverse()"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: ["Job A", "Job B", "Job C"], edges: [["Job A", "Job B"], ["Job B", "Job C"]] },
          trackedVariables: ["visited", "stack", "vertex"]
        }
      },
      {
        id: "bellman-ford",
        name: "Bellman-Ford Algorithm",
        category: "Graphs",
        difficulty: "Advanced",
        description: "Calculates the shortest paths from a single source vertex to all other vertices in a weighted graph, and is capable of handling negative edge weights and detecting negative cycles. It is like mapping a financial arbitrage route where traveling some roads actually gains you money, but you must avoid infinite profit loops.",
        timeComplexity: {
          best: "O(E)",
          average: "O(VE)",
          worst: "O(VE)"
        },
        pseudocode: [
          "def bellman_ford(graph, source):",
          "  dist = Array(size V filled with infinity, dist[source] = 0)",
          "  for i from 1 to V - 1:",
          "    for edge (u, v, weight) in graph.edges:",
          "      if dist[u] + weight < dist[v]:",
          "        dist[v] = dist[u] + weight",
          "  for edge (u, v, weight) in graph.edges:",
          "    if dist[u] + weight < dist[v]:",
          "      error 'Graph contains a negative-weight cycle'",
          "  return dist"
        ],
        mockVisualState: {
          type: "graph",
          initialData: { nodes: ["A", "B", "C"], edges: [["A", "B", 6], ["B", "C", -2], ["A", "C", 5]] },
          trackedVariables: ["distance", "u", "v"]
        }
      },
      {
        id: "flood-fill",
        name: "Flood Fill (Matrix traversal)",
        category: "Graphs",
        difficulty: "Beginner",
        description: "Replaces target values in a multi-dimensional grid of cells connected to a starting cell with a replacement color. It is like using the 'bucket fill' tool in a drawing app to color an enclosed shape.",
        timeComplexity: {
          best: "O(R * C)",
          average: "O(R * C)",
          worst: "O(R * C)"
        },
        pseudocode: [
          "def flood_fill(grid, r, c, target_color, new_color):",
          "  if r < 0 or r >= rows or c < 0 or c >= cols: return",
          "  if grid[r][c] != target_color: return",
          "  grid[r][c] = new_color",
          "  flood_fill(grid, r + 1, c, target_color, new_color)",
          "  flood_fill(grid, r - 1, c, target_color, new_color)",
          "  flood_fill(grid, r, c + 1, target_color, new_color)",
          "  flood_fill(grid, r, c - 1, target_color, new_color)"
        ],
        mockVisualState: {
          type: "grid",
          initialData: [[1, 1, 0], [1, 1, 2], [0, 2, 2]],
          trackedVariables: ["r", "c", "target_color"]
        }
      }
    ]
  },
  {
    category: "Dynamic Programming",
    algorithms: [
      {
        id: "fibonacci-memoized",
        name: "Fibonacci Sequence (Memoized)",
        category: "Dynamic Programming",
        difficulty: "Beginner",
        description: "Computes the n-th Fibonacci number recursively but stores intermediate results in a dictionary/cache to avoid duplicate calculations. It is like writing down math answers on a scratch sheet so you do not have to solve them again when they reappear.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def fib(n, memo):",
          "  if n <= 1: return n",
          "  if n in memo: return memo[n]",
          "  memo[n] = fib(n - 1, memo) + fib(n - 2, memo)",
          "  return memo[n]"
        ],
        mockVisualState: {
          type: "math",
          initialData: { n: 6, memo: {} },
          trackedVariables: ["n", "memo", "ans"]
        }
      },
      {
        id: "01-knapsack",
        name: "0/1 Knapsack Problem",
        category: "Dynamic Programming",
        difficulty: "Advanced",
        description: "Determines the maximum value of items you can fit in a backpack of capacity W without splitting items, using a 2D grid of subproblems. It is like a thief planning a heist to pack high-value jewelry in a bag with weight limits, choosing either to steal or leave each item.",
        timeComplexity: {
          best: "O(nW)",
          average: "O(nW)",
          worst: "O(nW)"
        },
        pseudocode: [
          "def knapsack(weights, values, W):",
          "  n = length(values)",
          "  dp = 2D_Array(size (n+1) x (W+1) filled with 0)",
          "  for i from 1 to n:",
          "    for w from 1 to W:",
          "      if weights[i-1] <= w:",
          "        dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])",
          "      else:",
          "        dp[i][w] = dp[i-1][w]",
          "  return dp[n][W]"
        ],
        mockVisualState: {
          type: "grid",
          initialData: { weights: [1, 2, 3], values: [6, 10, 12], W: 5 },
          trackedVariables: ["dp_matrix", "i", "w"]
        }
      },
      {
        id: "longest-common-subsequence",
        name: "Longest Common Subsequence (LCS)",
        category: "Dynamic Programming",
        difficulty: "Intermediate",
        description: "Finds the longest sequence of characters that appear in the same order in two different strings (though not necessarily consecutively). It is like comparing two spellings of a word to find the matching structural backbone of letters.",
        timeComplexity: {
          best: "O(mn)",
          average: "O(mn)",
          worst: "O(mn)"
        },
        pseudocode: [
          "def LCS(str1, str2):",
          "  m = length(str1)",
          "  n = length(str2)",
          "  dp = 2D_Array(size (m+1) x (n+1) filled with 0)",
          "  for i from 1 to m:",
          "    for j from 1 to n:",
          "      if str1[i-1] == str2[j-1]:",
          "        dp[i][j] = 1 + dp[i-1][j-1]",
          "      else:",
          "        dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
          "  return dp[m][n]"
        ],
        mockVisualState: {
          type: "grid",
          initialData: { str1: "ABCDGH", str2: "AEDFHR" },
          trackedVariables: ["i", "j", "dp_matrix"]
        }
      },
      {
        id: "coin-change",
        name: "Coin Change Problem",
        category: "Dynamic Programming",
        difficulty: "Intermediate",
        description: "Finds the minimum number of coins needed to make a target amount of money using a set of coin denominations. It is like making correct change at a store registry utilizing the fewest pennies, nickels, and quarters.",
        timeComplexity: {
          best: "O(n * amount)",
          average: "O(n * amount)",
          worst: "O(n * amount)"
        },
        pseudocode: [
          "def coin_change(coins, amount):",
          "  dp = Array(size amount + 1 filled with infinity, dp[0] = 0)",
          "  for i from 1 to amount:",
          "    for coin in coins:",
          "      if coin <= i:",
          "        dp[i] = min(dp[i], dp[i - coin] + 1)",
          "  return dp[amount] if dp[amount] != infinity else -1"
        ],
        mockVisualState: {
          type: "array",
          initialData: { coins: [1, 2, 5], amount: 11 },
          trackedVariables: ["dp_array", "coin", "i"]
        }
      },
      {
        id: "longest-increasing-subsequence",
        name: "Longest Increasing Subsequence (LIS)",
        category: "Dynamic Programming",
        difficulty: "Intermediate",
        description: "Finds the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order. It is like choosing steps to step on while crossing a stream such that every step you take is higher than the last.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n^2)",
          worst: "O(n^2)"
        },
        pseudocode: [
          "def LIS(arr):",
          "  n = length(arr)",
          "  dp = Array(size n filled with 1)",
          "  for i from 1 to n - 1:",
          "    for j from 0 to i - 1:",
          "      if arr[i] > arr[j]:",
          "        dp[i] = max(dp[i], dp[j] + 1)",
          "  return max_val(dp)"
        ],
        mockVisualState: {
          type: "array",
          initialData: [10, 22, 9, 33, 21, 50, 41, 60],
          trackedVariables: ["i", "j", "dp_array"]
        }
      },
      {
        id: "edit-distance",
        name: "Edit Distance (Levenshtein)",
        category: "Dynamic Programming",
        difficulty: "Advanced",
        description: "Measures the minimum number of operations (insertions, deletions, substitutions) required to transform one string into another. It is like a spelling corrector program checking how closely the misspelled word matches dictionary words.",
        timeComplexity: {
          best: "O(mn)",
          average: "O(mn)",
          worst: "O(mn)"
        },
        pseudocode: [
          "def edit_distance(str1, str2):",
          "  m = length(str1)",
          "  n = length(str2)",
          "  dp = 2D_Array(size (m+1) x (n+1))",
          "  for i from 0 to m: dp[i][0] = i",
          "  for j from 0 to n: dp[0][j] = j",
          "  for i from 1 to m:",
          "    for j from 1 to n:",
          "      if str1[i-1] == str2[j-1]:",
          "        dp[i][j] = dp[i-1][j-1]",
          "      else:",
          "        dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])",
          "  return dp[m][n]"
        ],
        mockVisualState: {
          type: "grid",
          initialData: { str1: "horse", str2: "ros" },
          trackedVariables: ["i", "j", "dp_matrix"]
        }
      }
    ]
  },
  {
    category: "Greedy & Patterns",
    algorithms: [
      {
        id: "fractional-knapsack",
        name: "Fractional Knapsack",
        category: "Greedy & Patterns",
        difficulty: "Intermediate",
        description: "Solves the knapsack problem where items can be broken into smaller fractions, choosing items greedily based on their value-to-weight ratio. It is like buying spices at a market by weight, always purchasing the most expensive spice per gram first.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        pseudocode: [
          "def fractional_knapsack(weights, values, capacity):",
          "  items = List(items with density = value / weight)",
          "  sort_descending(items, by=density)",
          "  total_value = 0",
          "  for item in items:",
          "    if capacity >= item.weight:",
          "      capacity -= item.weight",
          "      total_value += item.value",
          "    else:",
          "      total_value += (item.density * capacity)",
          "      break",
          "  return total_value"
        ],
        mockVisualState: {
          type: "array",
          initialData: { weights: [10, 20, 30], values: [60, 100, 120], capacity: 50 },
          trackedVariables: ["items", "capacity", "total_value"]
        }
      },
      {
        id: "huffman-coding",
        name: "Huffman Coding",
        category: "Greedy & Patterns",
        difficulty: "Advanced",
        description: "A lossless data compression algorithm that assigns variable-length binary codes to characters based on their frequency of occurrence. It is like replacing common words in a diary with short abbreviations, while rare words keep their long forms.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)"
        },
        pseudocode: [
          "def build_huffman_tree(frequencies):",
          "  pq = PriorityQueue()",
          "  for char, freq in frequencies:",
          "    pq.insert(LeafNode(char, freq))",
          "  while pq.size() > 1:",
          "    left = pq.extract_min()",
          "    right = pq.extract_min()",
          "    parent = InternalNode(left.freq + right.freq, left, right)",
          "    pq.insert(parent)",
          "  return pq.peek()"
        ],
        mockVisualState: {
          type: "tree",
          initialData: { char: "*", freq: 10, left: { char: "A", freq: 4 }, right: { char: "B", freq: 6 } },
          trackedVariables: ["pq", "frequencies", "root"]
        }
      },
      {
        id: "two-pointers-target-sum",
        name: "Two Pointers (Target Sum in sorted array)",
        category: "Greedy & Patterns",
        difficulty: "Beginner",
        description: "Finds if a sorted array has two elements that sum to a target value by moving left and right pointers towards each other. It is like two friends scanning opposite ends of an alphabetical row of books until they find the matching pair.",
        timeComplexity: {
          best: "O(1)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def two_sum(arr, target):",
          "  left = 0",
          "  right = length(arr) - 1",
          "  while left < right:",
          "    current_sum = arr[left] + arr[right]",
          "    if current_sum == target:",
          "      return (left, right)",
          "    elif current_sum < target:",
          "      left += 1",
          "    else:",
          "      right -= 1",
          "  return -1"
        ],
        mockVisualState: {
          type: "array",
          initialData: [1, 2, 4, 6, 8, 9, 14, 15],
          trackedVariables: ["left", "right", "current_sum"]
        }
      },
      {
        id: "sliding-window-max-subarray",
        name: "Sliding Window (Maximum Subarray Sum)",
        category: "Greedy & Patterns",
        difficulty: "Beginner",
        description: "Computes the maximum sum of K consecutive elements in an array by sliding a window of size K from left to right. It is like measuring temperatures over consecutive 3-day windows by removing the oldest day and adding the newest.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def max_subarray_sum(arr, k):",
          "  n = length(arr)",
          "  if n < k: return -1",
          "  window_sum = sum(arr[0...k-1])",
          "  max_sum = window_sum",
          "  for i from k to n - 1:",
          "    window_sum = window_sum + arr[i] - arr[i - k]",
          "    max_sum = max(max_sum, window_sum)",
          "  return max_sum"
        ],
        mockVisualState: {
          type: "array",
          initialData: [2, 1, 5, 1, 3, 2],
          trackedVariables: ["window_sum", "max_sum", "i"]
        }
      }
    ]
  },
  {
    category: "Ciphers & Security",
    algorithms: [
      {
        id: "caesar-cipher",
        name: "Caesar Cipher",
        category: "Ciphers & Security",
        difficulty: "Beginner",
        description: "Shifts every character in a message by a fixed number of positions down the alphabet. It is like a secret decoder ring where you shift letters by three clicks to encrypt your diary.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def encrypt_caesar(text, shift):",
          "  result = ''",
          "  for char in text:",
          "    if char is letter:",
          "      base = ascii('A') if char is uppercase else ascii('a')",
          "      new_char = char(((ascii(char) - base + shift) % 26) + base)",
          "      result += new_char",
          "    else:",
          "      result += char",
          "  return result"
        ],
        mockVisualState: {
          type: "string",
          initialData: { text: "HELLO WORLD", shift: 3 },
          trackedVariables: ["char", "result", "shift"]
        }
      },
      {
        id: "vigenere-cipher",
        name: "Vigenère Cipher",
        category: "Ciphers & Security",
        difficulty: "Intermediate",
        description: "Encrypts alphabetic text by using a series of interwoven Caesar ciphers based on the letters of a repeating keyword. It is like shifting each letter in a message using a different secret number determined by a repeating passcode phrase.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def encrypt_vigenere(text, key):",
          "  result = ''",
          "  key_len = length(key)",
          "  for i from 0 to length(text) - 1:",
          "    char = text[i]",
          "    if char is letter:",
          "      shift = ascii(key[i % key_len]) - ascii('A')",
          "      base = ascii('A') if char is uppercase else ascii('a')",
          "      new_char = char(((ascii(char) - base + shift) % 26) + base)",
          "      result += new_char",
          "    else:",
          "      result += char",
          "  return result"
        ],
        mockVisualState: {
          type: "string",
          initialData: { text: "HELLO", key: "KEY" },
          trackedVariables: ["i", "shift", "result"]
        }
      },
      {
        id: "xor-cipher",
        name: "XOR Cipher",
        category: "Ciphers & Security",
        difficulty: "Beginner",
        description: "Encrypts data by applying the bitwise XOR operation to every byte with a key value. It is like a simple switchboard where flipping matching state gates locks the lock, and flipping them again opens it.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def encrypt_XOR(data, key):",
          "  result = byte_array(length(data))",
          "  for i from 0 to length(data) - 1:",
          "    result[i] = data[i] XOR key[i % length(key)]",
          "  return result"
        ],
        mockVisualState: {
          type: "string",
          initialData: { data: "SECRET", key: "KEY" },
          trackedVariables: ["i", "xor_result"]
        }
      },
      {
        id: "rsa-key-gen-encrypt",
        name: "RSA (Basic Key Generation/Encryption concept)",
        category: "Ciphers & Security",
        difficulty: "Advanced",
        description: "Generates public and private keys using prime numbers and modulo arithmetic, enabling asymmetric data encryption. It is like sending a padlock open to everyone so they can lock boxes for you, but only you hold the physical key to unlock them.",
        timeComplexity: {
          best: "O(log n)",
          average: "O(log n)",
          worst: "O(log n)"
        },
        pseudocode: [
          "def basic_RSA(p, q, message):",
          "  n = p * q",
          "  phi = (p - 1) * (q - 1)",
          "  choose e such that gcd(e, phi) == 1",
          "  compute d such that (d * e) % phi == 1",
          "  ciphertext = (message^e) % n",
          "  decrypted = (ciphertext^d) % n",
          "  return (ciphertext, decrypted)"
        ],
        mockVisualState: {
          type: "math",
          initialData: { p: 61, q: 53, message: 65 },
          trackedVariables: ["n", "phi", "ciphertext"]
        }
      },
      {
        id: "base64-encoding",
        name: "Base64 Encoding",
        category: "Ciphers & Security",
        difficulty: "Intermediate",
        description: "Converts binary data into a text string representation by splitting every 3 bytes into four 6-bit numbers mapped to a character index table. It is like translating Morse code sounds into clean printed characters so they can pass safely through letters.",
        timeComplexity: {
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)"
        },
        pseudocode: [
          "def encode_base64(data):",
          "  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'",
          "  result = ''",
          "  for every 3 bytes (b1, b2, b3) in data:",
          "    n = (b1 << 16) + (b2 << 8) + b3",
          "    c1 = alphabet[(n >> 18) & 63]",
          "    c2 = alphabet[(n >> 12) & 63]",
          "    c3 = alphabet[(n >> 6) & 63]",
          "    c4 = alphabet[n & 63]",
          "    result += c1 + c2 + c3 + c4",
          "  return result"
        ],
        mockVisualState: {
          type: "string",
          initialData: { data: [77, 97, 110] },
          trackedVariables: ["n", "result", "bytes"]
        }
      },
      {
        id: "simple-hash-modulo",
        name: "Simple Hash Function (Modulo-based)",
        category: "Ciphers & Security",
        difficulty: "Beginner",
        description: "Maps a key value to a bucket index by calculating the modulo of the key divided by the number of buckets. It is like placing books on shelves by looking at their last ISBN digit, ensuring each book goes to shelf 0 to 9.",
        timeComplexity: {
          best: "O(1)",
          average: "O(1)",
          worst: "O(1)"
        },
        pseudocode: [
          "def simple_hash(key, num_buckets):",
          "  hash_val = 0",
          "  for char in str(key):",
          "    hash_val = (hash_val * 31 + ascii(char))",
          "  return hash_val % num_buckets"
        ],
        mockVisualState: {
          type: "math",
          initialData: { key: "BOHEMIA", num_buckets: 10 },
          trackedVariables: ["hash_val", "bucket_index"]
        }
      }
    ]
  }
];

// If node environment, export the module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALGORITHMS_DB };
}
