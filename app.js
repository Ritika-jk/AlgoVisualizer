// Main controller logic for AlgoBoho Algorithm and Pseudocode Visualizer

document.addEventListener("DOMContentLoaded", () => {
  // --- APPLICATION STATE ---
  let currentAlgoId = "bubble-sort";
  let stepIndex = 0;
  let isPlaying = false;
  let playInterval = null;
  let animationSpeed = 5; // 1 to 10 scale
  let customSteps = null; // Dynamically generated steps if custom input is entered
  let currentLanguage = "pseudocode";

  // Declaring persistent tracker states
  let currentUser = localStorage.getItem("algo_current_user") || null;
  let completedAlgos = currentUser ? (JSON.parse(localStorage.getItem(`algo_completed_${currentUser}`)) || []) : [];
  let visitedAlgos = currentUser ? (JSON.parse(localStorage.getItem(`algo_visited_${currentUser}`)) || []) : [];
  let seenAlgos = currentUser ? (JSON.parse(localStorage.getItem(`algo_seen_${currentUser}`)) || []) : [];
  let authMode = "signin";

  // --- DOM SELECTORS ---
  const body = document.body;
  const landingPage = document.getElementById("landing-page");
  const btnStart = document.getElementById("btn-start");
  const btnThemeToggle = document.getElementById("theme-toggle");
  const langSelect = document.getElementById("lang-select");

  // Header Logo elements
  const logoImage = document.getElementById("logo-image");
  const logoTextFallback = document.getElementById("logo-text-fallback");

  // Sidebar elements
  const mainLayout = document.getElementById("main-layout");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const openSidebarBtn = document.getElementById("open-sidebar");

  // Workspace elements
  const editorCodeContainer = document.getElementById("editor-code");
  const lineHighlight = document.getElementById("line-highlight");
  const visualizerTitle = document.getElementById("visualizer-title");
  const canvasContainer = document.getElementById("canvas-container");
  const explanationText = document.getElementById("explanation-text");
  const explanationBanner = document.getElementById("explanation-banner");
  const btnCloseExplanation = document.getElementById("close-explanation");

  // Controls & Tracking elements
  const btnStepBack = document.getElementById("btn-step-back");
  const btnPlayPause = document.getElementById("btn-play-pause");
  const btnStepForward = document.getElementById("btn-step-forward");
  const speedSlider = document.getElementById("speed-slider");
  const memoryContent = document.getElementById("memory-content");

  // Custom workspace search input
  const searchInput = document.getElementById("search-input");

  // --- LOGO AND MEDIA FALLBACK CHECK ---
  // Try loading logo images and animated video assets.
  // If they don't load or exist, style fallbacks will remain active.
  const checkAssets = () => {
    // Check if the logo image exists
    const img = new Image();
    img.src = "logo.png";
    img.onload = () => {
      logoImage.src = "logo.png";
      logoImage.classList.remove("hidden");
      logoTextFallback.style.display = "none";
    };
    img.onerror = () => {
      // Try SVG version
      const imgSvg = new Image();
      imgSvg.src = "logo.svg";
      imgSvg.onload = () => {
        logoImage.src = "logo.svg";
        logoImage.classList.remove("hidden");
        logoTextFallback.style.display = "none";
      };
      imgSvg.onerror = () => {
        // Try Screenshot logo version
        const imgScreenshot = new Image();
        imgScreenshot.src = "Screenshot 2026-07-15 124319.png";
        imgScreenshot.onload = () => {
          logoImage.src = "Screenshot 2026-07-15 124319.png";
          logoImage.classList.remove("hidden");
          logoTextFallback.style.display = "none";
        };
      };
    };

    // If an animated logo video exists, start it
    const video = document.querySelector(".logo-video");
    if (video) {
      video.addEventListener("error", () => {
        // Video file missing -> fallback to animated SVG Boho Art
        document.getElementById("fallback-art").style.display = "flex";
        video.style.display = "none";
      });
      // Test if source exists
      const source = video.querySelector("source");
      if (source && !source.src) {
        document.getElementById("fallback-art").style.display = "flex";
        video.style.display = "none";
      }

      // Convert VTT files content to Blob URLs to bypass CORS restrictions under file:// protocol
      const subtitlesVTT = `WEBVTT

00:00:00.000 --> 00:00:05.000
[Earthy, atmospheric ambient music playing]

00:00:05.000 --> 00:00:10.000
[Subtle sound of nature and gentle wind chimes]`;

      const descriptionsVTT = `WEBVTT

00:00:00.000 --> 00:00:05.000
An artistic logo animation for AlgoVisualizer with organic concentric circles and flowing paths.

00:00:05.000 --> 00:00:10.000
The design pulses gently, evoking structural trees and algorithmic graphs in a relaxed workspace.`;

      const trackSubtitles = video.querySelector('track[kind="subtitles"]');
      if (trackSubtitles) {
        const blob = new Blob([subtitlesVTT], { type: "text/vtt" });
        trackSubtitles.src = URL.createObjectURL(blob);
      }

      const trackDescriptions = video.querySelector('track[kind="descriptions"]');
      if (trackDescriptions) {
        const blob = new Blob([descriptionsVTT], { type: "text/vtt" });
        trackDescriptions.src = URL.createObjectURL(blob);
      }
    }
  };

  checkAssets();

  // --- DAY/NIGHT THEME CONTROL ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem("boho-theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      body.classList.add("dark-theme");
      updateThemeToggleButton(true);
    } else {
      body.classList.remove("dark-theme");
      updateThemeToggleButton(false);
    }
  };

  const toggleTheme = () => {
    const isDark = body.classList.toggle("dark-theme");
    localStorage.setItem("boho-theme", isDark ? "dark" : "light");
    updateThemeToggleButton(isDark);
  };

  const updateThemeToggleButton = (isDark) => {
    if (isDark) {
      btnThemeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.38 5.38 0 0 1-4.4 2.26 5.4 5.4 0 0 1-4.14-9.5c.3-.15.6-.26.9-.35A8.8 8.8 0 0 0 12 3z"/>
        </svg>
      `;
    } else {
      btnThemeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM5.64 4.22a1 1 0 1 1 1.41 1.41L5.64 7.05a1 1 0 0 1-1.41-1.41zm12.72 12.72a1 1 0 1 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41-1.41zM2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zM6.34 19.07a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 1.41zm12.02-12.02a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 1.41z"/>
        </svg>
      `;
    }
  };

  btnThemeToggle.addEventListener("click", toggleTheme);
  initTheme();

  // --- COLLAPSIBLE SIDEBAR ---
  const collapseSidebar = () => {
    mainLayout.classList.add("sidebar-collapsed");
  };

  const expandSidebar = () => {
    mainLayout.classList.remove("sidebar-collapsed");
  };

  closeSidebarBtn.addEventListener("click", collapseSidebar);
  openSidebarBtn.addEventListener("click", expandSidebar);

  if (btnCloseExplanation && explanationBanner) {
    btnCloseExplanation.addEventListener("click", () => {
      explanationBanner.classList.add("hidden");
    });
  }

  // --- LANDING SCREEN FADE ---
  btnStart.addEventListener("click", () => {
    if (currentUser) {
      landingPage.classList.add("slide-up");
    } else {
      document.getElementById("auth-modal").classList.remove("hidden");
    }
  });

  // --- DYNAMIC SIDEBAR LIBRARY BUILDER ---
  const buildSidebar = () => {
    const sidebarContent = document.querySelector(".sidebar-content");
    if (!sidebarContent) return;

    sidebarContent.innerHTML = "";

    ALGORITHMS_DB.forEach(cat => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "algo-category";

      const titleSpan = document.createElement("span");
      titleSpan.className = "category-title";
      titleSpan.innerText = cat.category;
      categoryDiv.appendChild(titleSpan);

      const listUl = document.createElement("ul");
      listUl.className = "algo-list";

      cat.algorithms.forEach(algo => {
        const itemLi = document.createElement("li");
        itemLi.className = "algo-item";
        itemLi.dataset.algo = algo.id;

        // Auto-mark as Seen when rendered in sidebar library
        if (currentUser && !seenAlgos.includes(algo.id)) {
          seenAlgos.push(algo.id);
          localStorage.setItem(`algo_seen_${currentUser}`, JSON.stringify(seenAlgos));
        }

        // Left Name
        const nameSpan = document.createElement("span");
        nameSpan.className = "algo-name";
        nameSpan.innerText = algo.name;
        itemLi.appendChild(nameSpan);

        // Right Status Checkboxes
        const statusesDiv = document.createElement("div");
        statusesDiv.className = "algo-statuses";

        // 1. Seen Indicator
        const seenBox = document.createElement("span");
        seenBox.className = "algo-status status-seen";
        seenBox.setAttribute("data-label", "S");
        seenBox.title = "Seen";
        if (seenAlgos.includes(algo.id)) {
          seenBox.classList.add("active");
        }
        statusesDiv.appendChild(seenBox);

        // 2. Visited Indicator
        const visitedBox = document.createElement("span");
        visitedBox.className = "algo-status status-visited";
        visitedBox.setAttribute("data-label", "V");
        visitedBox.title = "Visited";
        if (visitedAlgos.includes(algo.id)) {
          visitedBox.classList.add("active");
        }
        statusesDiv.appendChild(visitedBox);

        // 3. Completed Indicator
        const completedBox = document.createElement("span");
        completedBox.className = "algo-status status-completed";
        completedBox.setAttribute("data-label", "C");
        completedBox.title = "Completed";
        if (completedAlgos.includes(algo.id)) {
          completedBox.classList.add("active");
        }
        statusesDiv.appendChild(completedBox);

        itemLi.appendChild(statusesDiv);

        if (algo.id === currentAlgoId) {
          itemLi.classList.add("active");
        }

        itemLi.addEventListener("click", () => {
          loadAlgorithm(algo.id);
          if (window.innerWidth <= 768) {
            collapseSidebar();
          }
        });

        listUl.appendChild(itemLi);
      });

      categoryDiv.appendChild(listUl);
      sidebarContent.appendChild(categoryDiv);
    });
  };

  // --- ALGORITHM DATA INITIALIZATION ---
  const loadAlgorithm = (algoId) => {
    currentAlgoId = algoId;
    stepIndex = 0;
    customSteps = null;
    pause();

    // Mark as Visited
    if (currentUser && !visitedAlgos.includes(algoId)) {
      visitedAlgos.push(algoId);
      localStorage.setItem(`algo_visited_${currentUser}`, JSON.stringify(visitedAlgos));
      buildSidebar();
    }

    // Reset Sidebar selection styling
    document.querySelectorAll(".algo-item").forEach(item => {
      if (item.dataset.algo === algoId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // 1. Fetch info from ALGORITHMS_DB
    let dbAlgo = null;
    for (const cat of ALGORITHMS_DB) {
      const found = cat.algorithms.find(a => a.id === algoId);
      if (found) {
        dbAlgo = found;
        break;
      }
    }
    if (!dbAlgo) return;

    // Update Visualizer Titles and Metadata badge panel
    visualizerTitle.innerText = dbAlgo.name;
    document.getElementById("algo-difficulty").innerText = dbAlgo.difficulty;
    document.getElementById("complexity-badge-best").innerText = `Best: ${dbAlgo.timeComplexity.best}`;
    document.getElementById("complexity-badge-avg").innerText = `Avg: ${dbAlgo.timeComplexity.average}`;
    document.getElementById("complexity-badge-worst").innerText = `Worst: ${dbAlgo.timeComplexity.worst}`;
    document.getElementById("algo-desc-text").innerText = dbAlgo.description;

    // Render raw pseudocode
    const translated = translatePseudocodeToLanguage(dbAlgo.pseudocode, currentLanguage);
    renderPseudocode(translated);

    // Render Step 0 state
    renderStep();

    // Update the done checkmark button UI
    updateMarkDoneButtonUI();
  };


  const translatePseudocodeToLanguage = (lines, lang) => {
    let rawLines = lines.map((line, idx) => {
      let text = typeof line === "string" ? line : line.text;
      return { text, originalIndex: idx };
    });

    if (lang === "pseudocode") {
      return rawLines;
    }

    let result = [];
    let indentStack = [];

    for (let i = 0; i < rawLines.length; i++) {
      let lineObj = rawLines[i];
      let line = lineObj.text;
      let match = line.match(/^(\s*)/);
      let currentIndent = match ? match[0].length : 0;
      let trimmed = line.trim();

      // Check if indent decreased, if so close previous blocks
      while (indentStack.length > 0 && currentIndent < indentStack[indentStack.length - 1]) {
        let prevIndent = indentStack.pop();
        let closeIndent = " ".repeat(prevIndent);
        result.push({
          text: closeIndent + "}",
          originalIndex: null
        });
      }

      let isBlockStart = trimmed.endsWith(":");
      if (isBlockStart) {
        trimmed = trimmed.slice(0, -1);
        indentStack.push(currentIndent);
      }

      let translated = trimmed;

      if (lang === "python") {
        translated = trimmed;
        if (isBlockStart) {
          translated += ":";
        }
        translated = translated.replace(/length\((\w+)\)/g, "len($1)");
        translated = translated.replace(/for\s+(\w+)\s+from\s+(.+?)\s+to\s+(.+?)$/g, (match, v, start, end) => {
          let stopVal = end.trim();
          if (stopVal.endsWith("-1")) {
            stopVal = stopVal.slice(0, -2).trim();
          } else {
            stopVal = stopVal + " + 1";
          }
          return `for ${v} in range(${start}, ${stopVal})`;
        });
        translated = translated.replace(/swap\((\w+\[.*?\]),\s*(\w+\[.*?\])\)/g, "$1, $2 = $2, $1");
        translated = translated.replace(/\btrue\b/g, "True").replace(/\bfalse\b/g, "False").replace(/\bnull\b/g, "None");
      } else {
        // Javascript, C++, C, Go
        // Replace length(x)
        if (lang === "javascript") {
          translated = translated.replace(/length\((\w+)\)/g, "$1.length");
        } else if (lang === "cpp") {
          translated = translated.replace(/length\((\w+)\)/g, "$1.size()");
        } else if (lang === "go") {
          translated = translated.replace(/length\((\w+)\)/g, "len($1)");
        } else {
          translated = translated.replace(/length\((\w+)\)/g, "n");
        }

        // Replace function definition: def funcName(args)
        translated = translated.replace(/def\s+(\w+)\((.*?)\)/g, (match, funcName, args) => {
          if (lang === "javascript") return `function ${funcName}(${args})`;
          if (lang === "go") return `func ${funcName}(${args})`;
          if (lang === "cpp") {
            if (args.includes("arr")) {
              return `void ${funcName}(std::vector<int>& arr)`;
            }
            return `int ${funcName}(${args})`;
          }
          // C style
          if (args.includes("arr")) {
            return `void ${funcName}(int arr[], int n)`;
          }
          return `int ${funcName}(${args})`;
        });

        // translate: for x from A to B
        translated = translated.replace(/for\s+(\w+)\s+from\s+(.+?)\s+to\s+(.+?)$/g, (match, v, start, end) => {
          let stopVal = end.trim();
          if (lang === "go") {
            return `for ${v} := ${start}; ${v} <= ${stopVal}; ${v}++`;
          }
          let type = (lang === "cpp" || lang === "c") ? "int " : "let ";
          return `for (${type}${v} = ${start}; ${v} <= ${stopVal}; ${v}++)`;
        });

        // translate: while cond
        translated = translated.replace(/while\s+(.+?)$/g, (match, cond) => {
          if (lang === "go") return `for ${cond}`;
          return `while (${cond})`;
        });

        // translate: if/elif/else cond
        translated = translated.replace(/if\s+(.+?)$/g, (match, cond) => {
          if (lang === "go") return `if ${cond}`;
          return `if (${cond})`;
        });
        translated = translated.replace(/elif\s+(.+?)$/g, (match, cond) => {
          if (lang === "go") return `else if ${cond}`;
          return `else if (${cond})`;
        });
        translated = translated.replace(/else$/g, () => {
          return `else`;
        });

        // translate assignments: x = y
        // only match standalone assignments like "left = 0"
        translated = translated.replace(/^(\w+)\s*=\s*([^=+\-*/<>!]+)$/g, (match, v, val) => {
          let trimmedVal = val.trim();
          if (lang === "go") {
            return `${v} := ${trimmedVal}`;
          }
          let type = (lang === "cpp" || lang === "c") ? "int " : "let ";
          return `${type}${v} = ${trimmedVal};`;
        });

        // translate: swap(a, b)
        translated = translated.replace(/swap\((\w+\[.*?\]),\s*(\w+\[.*?\])\)/g, (match, a, b) => {
          if (lang === "javascript") return `[${a}, ${b}] = [${b}, ${a}];`;
          if (lang === "go") return `${a}, ${b} = ${b}, ${a}`;
          if (lang === "cpp") return `std::swap(${a}, ${b});`;
          return `swap(&${a}, &${b});`;
        });

        // return statements
        translated = translated.replace(/return\s+(.+)$/g, (match, val) => {
          if (lang === "go") return `return ${val}`;
          return `return ${val};`;
        });

        // append brace open
        if (isBlockStart) {
          translated += " {";
        }
      }

      result.push({
        text: " ".repeat(currentIndent) + translated,
        originalIndex: lineObj.originalIndex
      });
    }

    // Close remaining blocks
    while (indentStack.length > 0) {
      let prevIndent = indentStack.pop();
      result.push({
        text: " ".repeat(prevIndent) + "}",
        originalIndex: null
      });
    }

    return result;
  };

  const renderPseudocode = (translatedLines) => {
    editorCodeContainer.innerHTML = "";
    translatedLines.forEach((lineObj, index) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "code-line";
      if (lineObj.originalIndex !== null) {
        lineDiv.dataset.lineIndex = lineObj.originalIndex;
      }

      const lineNoSpan = document.createElement("span");
      lineNoSpan.className = "line-number";
      lineNoSpan.innerText = index + 1;

      const lineContentSpan = document.createElement("span");
      lineContentSpan.className = "line-content";

      lineContentSpan.innerHTML = highlightTokens(lineObj.text);

      lineDiv.appendChild(lineNoSpan);
      lineDiv.appendChild(lineContentSpan);

      // Manual click navigation through mock states
      lineDiv.addEventListener("click", () => {
        if (lineObj.originalIndex !== null) {
          const steps = getSteps();
          const firstMatchingStepIdx = steps.findIndex(s => s.line === lineObj.originalIndex);
          if (firstMatchingStepIdx !== -1) {
            stepIndex = firstMatchingStepIdx;
            renderStep();
          }
        }
      });

      editorCodeContainer.appendChild(lineDiv);
    });
  };

  // Easy boho styling/coloring parser
  const highlightTokens = (text) => {
    const keywords = ["function", "def", "func", "void", "int", "var", "let", "const", "for", "while", "if", "elif", "else", "return", "from", "to", "new", "Set", "Array", "not", "in", "is", "and", "or", "down", "up", "break", "continue"];
    const operators = [">", "<", "=", "+", "-", "*", "/", "==", "!=", "<=", ">=", "node.left", "node.right", "swap", "std::swap", "{", "}", "[", "]", ";", ":"];

    // Compute leading spaces and create indent string
    const leadingSpacesMatch = text.match(/^(\s*)/);
    const leadingSpaces = leadingSpacesMatch ? leadingSpacesMatch[0].length : 0;
    let outputHtml = "&nbsp;".repeat(leadingSpaces);

    let words = text.trim().replace(/([(),[\]{}&.:;])/g, " $1 ").split(/\s+/);

    words.forEach(word => {
      let trimmed = word.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
        outputHtml += `<span class="comment">${word} </span>`;
        return;
      }

      if (keywords.includes(trimmed)) {
        outputHtml += `<span class="keyword">${trimmed}</span> `;
      } else if (operators.includes(trimmed)) {
        outputHtml += `<span class="operator">${trimmed}</span> `;
      } else if (!Number.isNaN(Number(trimmed))) {
        outputHtml += `<span class="string">${trimmed}</span> `;
      } else if (trimmed.match(/^[A-Z]/)) {
        outputHtml += `<span class="type">${trimmed}</span> `;
      } else if (trimmed.includes("(")) {
        outputHtml += `<span class="function">${trimmed}</span> `;
      } else {
        outputHtml += `<span class="variable">${trimmed}</span> `;
      }
    });

    return outputHtml;
  };

  // Determine standard vs custom execution trace steps
  const getSteps = () => {
    if (customSteps) return customSteps;
    return generateSteps(currentAlgoId);
  };

  // --- RENDER VISUALIZATION AND STATE UPDATE ---
  const renderStep = () => {
    const steps = getSteps();
    if (steps.length === 0) return;

    const step = steps[stepIndex];
    if (!step) return;

    // 1. Move Active Code Line Highlight
    const matchingLineEl = editorCodeContainer.querySelector(`[data-line-index="${step.line}"]`);
    if (matchingLineEl) {
      const offsetTop = matchingLineEl.offsetTop;
      const offsetHeight = matchingLineEl.offsetHeight;

      lineHighlight.style.transform = `translateY(${offsetTop}px)`;
      lineHighlight.style.height = `${offsetHeight}px`;
      matchingLineEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // 2. Render Canvas Workspace
    renderCanvas(step.visuals);

    // 3. Update Memory Tracker Panel variables
    renderMemory(step.memory);

    // 4. Update Dual Explanation Windows (What is Happening & Literal Code Meaning)
    if (explanationText) {
      explanationText.innerHTML = step.explanation;
    }

    const literalCodeText = document.getElementById("literal-code-text");
    if (literalCodeText) {
      let activeLineText = "";
      if (dbAlgo && dbAlgo.pseudocode && dbAlgo.pseudocode[step.line] !== undefined) {
        const lineItem = dbAlgo.pseudocode[step.line];
        activeLineText = typeof lineItem === "string" ? lineItem : (lineItem.text || "");
      }
      if (!activeLineText && matchingLineEl) {
        const contentSpan = matchingLineEl.querySelector(".line-content");
        if (contentSpan) {
          activeLineText = contentSpan.textContent || contentSpan.innerText || "";
        }
      }
      activeLineText = activeLineText.replace(/\u00A0/g, " ").trim();
      literalCodeText.innerHTML = getLiteralCodeMeaning(activeLineText, step.memory, dbAlgo);
    }

    if (explanationBanner) {
      explanationBanner.classList.remove("hidden");
    }
  };

  const getLiteralCodeMeaning = (lineText, memory = {}, dbAlgo = null) => {
    if (!lineText || !lineText.trim()) return "Select or play a step to see literal syntax explanation.";
    const trimmed = lineText.replace(/\u00A0/g, " ").trim();
    
    // Function definition
    if (/^(function|def|func|void|int)\s+(\w+)\s*\((.*?)\)/i.test(trimmed)) {
      const match = trimmed.match(/^(function|def|func|void|int)\s+(\w+)\s*\((.*?)\)/i);
      return `Declares function <code>${match[2]}</code> taking parameters <code>(${match[3] || 'none'})</code> to initialize algorithm execution.`;
    }
    // Pseudocode loop: for i from X to Y
    if (/^for\s+(\w+)\s+from\s+(.*?)\s+to\s+(.*)/i.test(trimmed)) {
      const match = trimmed.match(/^for\s+(\w+)\s+from\s+(.*?)\s+to\s+(.*)/i);
      const varName = match[1];
      const startVal = match[2];
      const endVal = match[3].replace(/:$/, '');
      const currentVal = memory[varName] !== undefined ? memory[varName] : startVal;
      return `Loop counter <code>${varName}</code> initialized from ${startVal} to ${endVal} (currently <code>${varName} = ${currentVal}</code>). Runs inner code block each iteration.`;
    }
    // JS/C/Python loop: for (...) / for var in range(...)
    if (/^for\s*\(/i.test(trimmed) || /^for\s+\w+\s+in\s+range/i.test(trimmed)) {
      return `Loop statement: initializes index counter, tests loop boundary condition, and advances index step by step.`;
    }
    // While loop
    if (/^while\s*(.*)/i.test(trimmed)) {
      const cond = trimmed.replace(/^while\s*/i, '').replace(/[:{]$/, '');
      return `While loop: repeatedly evaluates condition <code>(${cond})</code>. Continues as long as result is TRUE.`;
    }
    // Conditional: if / elif / else if
    if (/^(if|elif|else\s+if)\s*(.*)/i.test(trimmed)) {
      const match = trimmed.match(/^(if|elif|else\s+if)\s*(.*)/i);
      const cond = match[2].replace(/[:{]$/, '');
      return `Branch test <code>(${match[1]})</code>: checks if <code>${cond}</code> is TRUE. If met, enters conditional block; otherwise skips.`;
    }
    // Else statement
    if (/^else\b/i.test(trimmed)) {
      return `Default branch: executes when preceding <code>if</code> / <code>elif</code> conditions evaluate to FALSE.`;
    }
    // Swap statement
    if (/swap\((.*?)\)/i.test(trimmed)) {
      const args = trimmed.match(/swap\((.*?)\)/i)[1];
      return `Exchanges element values at positions <code>(${args})</code> using a temporary holding variable.`;
    }
    // Return statement
    if (/^return\s*(.*)/i.test(trimmed)) {
      const val = trimmed.replace(/^return\s*/i, '').replace(/;$/, '');
      return `Terminates procedure and returns final output value <code>${val || 'result'}</code> back to caller.`;
    }
    // Assignment: x = y
    if (trimmed.includes("=")) {
      const parts = trimmed.split("=");
      const lhs = parts[0].trim();
      const rhs = parts.slice(1).join("=").trim().replace(/;$/, '');
      return `Evaluates expression <code>${rhs}</code> and assigns the resulting value into variable <code>${lhs}</code>.`;
    }
    return `Executes code statement: <code>${trimmed}</code>.`;
  };

  // Render variables to glassmorphic tracker
  const renderMemory = (memory) => {
    memoryContent.innerHTML = "";
    if (!memory) return;

    Object.keys(memory).forEach(key => {
      const card = document.createElement("div");
      card.className = "memory-card";

      const nameSpan = document.createElement("span");
      nameSpan.className = "var-name";
      nameSpan.innerText = key;

      const valSpan = document.createElement("span");
      valSpan.className = "var-val";
      valSpan.innerText = memory[key];

      card.appendChild(nameSpan);
      card.appendChild(document.createTextNode(": "));
      card.appendChild(valSpan);
      memoryContent.appendChild(card);
    });
  };

  // Default coordinate layouts for dynamic tree/graph renders
  const DEFAULT_TREE_LAYOUT = {
    nodes: [
      { id: "20", x: 200, y: 70, label: "Root" },
      { id: "10", x: 100, y: 170, label: "" },
      { id: "30", x: 300, y: 170, label: "" },
      { id: "5", x: 50, y: 270, label: "" },
      { id: "15", x: 150, y: 270, label: "" }
    ],
    edges: [
      { from: "20", to: "10" },
      { from: "20", to: "30" },
      { from: "10", to: "5" },
      { from: "10", to: "15" }
    ]
  };

  const DEFAULT_GRAPH_LAYOUT = {
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
  };

  // Canvas visual rendering switcher
  const renderCanvas = (visuals) => {
    canvasContainer.innerHTML = "";
    if (!visuals) return;

    let dbAlgo = null;
    for (const cat of ALGORITHMS_DB) {
      const found = cat.algorithms.find(a => a.id === currentAlgoId);
      if (found) {
        dbAlgo = found;
        break;
      }
    }
    const canvasType = visuals.type || (dbAlgo ? dbAlgo.mockVisualState.type : "array");

    // Manage container state classes
    canvasContainer.className = "canvas-container";
    if (canvasType === "graph" || canvasType === "tree" || canvasType === "grid") {
      canvasContainer.classList.add("align-start");
    }
    const steps = getSteps();
    if (steps.length > 0 && stepIndex === steps.length - 1) {
      canvasContainer.classList.add("final-result");
    }

    if (canvasType === "array") {
      // --- ARRAY BAR RENDERING ---
      const visualizerDiv = document.createElement("div");
      visualizerDiv.className = "canvas-visualizer";

      const currentStepsList = getSteps();
      const currentStep = currentStepsList[stepIndex];
      let arrString = currentStep.memory ? (currentStep.memory.arr || "[]") : "[]";
      let arr = [];
      try {
        arr = JSON.parse(arrString.replace(/'/g, '"'));
      } catch (e) {
        arr = [10, 20, 30, 40, 50];
      }

      const maxVal = Math.max(...arr, 50);
      const memory = currentStep.memory || {};

      arr.forEach((val, idx) => {
        const wrapper = document.createElement("div");
        wrapper.className = "array-bar-wrapper";

        // Check pointers in memory (e.g. i: 0, j: 1, pivot: 4)
        const activePointers = [];
        Object.keys(memory).forEach(varName => {
          if (["i", "j", "k", "pivot", "min_idx", "mid", "low", "high", "left", "right"].includes(varName)) {
            const varVal = Number(memory[varName]);
            if (!Number.isNaN(varVal) && varVal === idx) {
              activePointers.push(varName);
            }
          }
        });

        if (visuals.read && visuals.read.includes(idx)) {
          activePointers.push("read");
        }
        if (visuals.write && visuals.write.includes(idx)) {
          activePointers.push("write");
        }

        // Build pointer container if any pointers point to this index
        if (activePointers.length > 0) {
          const pointerContainer = document.createElement("div");
          pointerContainer.className = "pointer-container";
          
          activePointers.forEach(pName => {
            const badge = document.createElement("div");
            badge.className = `pointer-badge ${pName}`;
            badge.innerText = pName;
            pointerContainer.appendChild(badge);
          });

          const arrow = document.createElement("div");
          arrow.className = "pointer-arrow";
          pointerContainer.appendChild(arrow);
          wrapper.appendChild(pointerContainer);
        }

        const bar = document.createElement("div");
        bar.className = "array-bar";

        const percentageHeight = (val / maxVal) * 75;
        bar.style.height = `${percentageHeight}%`;

        if (visuals.active && visuals.active.includes(idx)) {
          bar.classList.add("active-swap");
        } else if (visuals.write && visuals.write.includes(idx)) {
          bar.classList.add("write");
        } else if (visuals.compared && visuals.compared.includes(idx)) {
          bar.classList.add("compared");
        } else if (visuals.read && visuals.read.includes(idx)) {
          bar.classList.add("read");
        } else if (visuals.sorted && visuals.sorted.includes(idx)) {
          bar.classList.add("sorted");
        } else if (visuals.pivot !== undefined && visuals.pivot === idx) {
          bar.classList.add("pivot");
        }

        const valueSpan = document.createElement("span");
        valueSpan.className = "array-bar-value";
        valueSpan.innerText = val;

        wrapper.appendChild(bar);
        wrapper.appendChild(valueSpan);
        visualizerDiv.appendChild(wrapper);
      });

      canvasContainer.appendChild(visualizerDiv);

    } else if (canvasType === "grid") {
      // --- GRID / MATRIX RENDERING ---
      const gridWrapper = document.createElement("div");
      gridWrapper.className = "grid-container";

      let matrix = visuals.grid || [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      let activeRow = visuals.active ? visuals.active[0] : -1;
      let activeCol = visuals.active ? visuals.active[1] : -1;

      matrix.forEach((row, rIdx) => {
        const rowEl = document.createElement("div");
        rowEl.className = "grid-row";

        row.forEach((val, cIdx) => {
          const cell = document.createElement("div");
          cell.className = "grid-cell";
          cell.innerText = val !== null ? val : "-";

          if (rIdx === activeRow && cIdx === activeCol) {
            cell.classList.add("active-cell");
          } else if (rIdx < activeRow || (rIdx === activeRow && cIdx < activeCol)) {
            cell.classList.add("visited-cell");
          } else if (visuals.highlight && visuals.highlight.includes(`${rIdx},${cIdx}`)) {
            cell.classList.add("highlight-cell");
          }

          rowEl.appendChild(cell);
        });
        gridWrapper.appendChild(rowEl);
      });

      canvasContainer.appendChild(gridWrapper);

    } else if (canvasType === "string") {
      // --- STRING / CHARACTER BLOCK RENDERING ---
      const strWrapper = document.createElement("div");
      strWrapper.className = "string-container";

      let text = visuals.text || "BOHO";
      let activeIdx = visuals.active !== undefined ? visuals.active : -1;
      let processed = visuals.processed || [];

      for (let i = 0; i < text.length; i++) {
        const charBlock = document.createElement("div");
        charBlock.className = "string-char-block";
        charBlock.innerText = text[i];

        if (i === activeIdx) {
          charBlock.classList.add("active");
        } else if (processed.includes(i)) {
          charBlock.classList.add("processed");
        }

        const idxSpan = document.createElement("span");
        idxSpan.className = "char-index";
        idxSpan.innerText = i;
        charBlock.appendChild(idxSpan);

        strWrapper.appendChild(charBlock);
      }

      canvasContainer.appendChild(strWrapper);

    } else if (canvasType === "graph" || canvasType === "tree") {
      // --- GRAPH & TREE LAYOUT RENDER ---
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "graph-svg-container");
      canvasContainer.appendChild(svg);

      const nodesLayer = document.createElement("div");
      nodesLayer.className = "nodes-layer";
      canvasContainer.appendChild(nodesLayer);

      // Load specific layout metadata
      let staticAlgo = null;
      let staticId = currentAlgoId.replace(/-/g, "_");
      if (currentAlgoId === "bubble-sort") staticId = "bubble_sort";
      else if (currentAlgoId === "dfs") staticId = "dfs_traversal";
      else if (currentAlgoId === "bst-insertion") staticId = "bst_insertion";

      if (ALGORITHMS[staticId]) {
        staticAlgo = ALGORITHMS[staticId];
      }

      const layout = staticAlgo ? staticAlgo.initialVisuals : (canvasType === "tree" ? DEFAULT_TREE_LAYOUT : DEFAULT_GRAPH_LAYOUT);
      let currentNodes = [...layout.nodes];
      let currentEdges = [...layout.edges];

      if (visuals.insertNew) {
        currentNodes.push({ id: visuals.insertNew.id, x: visuals.insertNew.x, y: visuals.insertNew.y, label: "Inserted" });
        currentEdges.push({ from: visuals.insertNew.parent, to: visuals.insertNew.id });
      }

      // Draw Edges
      currentEdges.forEach(edge => {
        const fromNode = currentNodes.find(n => n.id === edge.from);
        const toNode = currentNodes.find(n => n.id === edge.to);
        if (!fromNode || !toNode) return;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", "graph-edge");
        line.setAttribute("x1", fromNode.x);
        line.setAttribute("y1", fromNode.y);
        line.setAttribute("x2", toNode.x);
        line.setAttribute("y2", toNode.y);

        const isActive = (Array.isArray(visuals.active) && (visuals.active.includes(edge.from) || visuals.active.includes(edge.to))) ||
          (typeof visuals.active === "string" && (visuals.active === edge.from || visuals.active === edge.to));
        if (isActive) {
          line.classList.add("active");
        }
        svg.appendChild(line);
      });

      // Draw Nodes
      currentNodes.forEach(node => {
        const nodeEl = document.createElement("div");
        nodeEl.className = "graph-node";
        nodeEl.style.left = `${node.x}px`;
        nodeEl.style.top = `${node.y}px`;
        nodeEl.innerText = node.id;

        const isActive = (Array.isArray(visuals.active) && visuals.active.includes(node.id)) ||
          (typeof visuals.active === "string" && visuals.active === node.id);
        const isVisited = Array.isArray(visuals.visited) && visuals.visited.includes(node.id);
        const isQueued = (Array.isArray(visuals.queued) && visuals.queued.includes(node.id)) ||
          (visuals.newNodePos && node.id === "15");

        if (isActive) {
          nodeEl.classList.add("active");
          const label = document.createElement("span");
          label.className = "node-label";
          label.innerText = "active";
          nodeEl.appendChild(label);
        } else if (isVisited) {
          nodeEl.classList.add("visited");
        } else if (isQueued) {
          nodeEl.classList.add("queued");
          const label = document.createElement("span");
          label.className = "node-label";
          label.innerText = node.id === "15" ? "new leaf" : "queued";
          nodeEl.appendChild(label);
        }

        nodesLayer.appendChild(nodeEl);
      });

      // Draw Null position ghost node
      if (visuals.newNodePos) {
        const ghostNode = document.createElement("div");
        ghostNode.className = "graph-node queued";
        ghostNode.style.left = `${visuals.newNodePos.x}px`;
        ghostNode.style.top = `${visuals.newNodePos.y}px`;
        ghostNode.style.borderStyle = "dashed";
        ghostNode.innerText = "?";

        const label = document.createElement("span");
        label.className = "node-label";
        label.innerText = "null position";
        ghostNode.appendChild(label);

        nodesLayer.appendChild(ghostNode);
      }
    } else if (canvasType === "fib" || canvasType === "math") {
      // --- TABULATION CELL / MATH EQUATION RENDERING ---
      const wrapper = document.createElement("div");
      wrapper.className = "fib-visualizer";

      const arrContainer = document.createElement("div");
      arrContainer.className = "fib-array-container";

      const currentStepsList = getSteps();
      const currentStep = currentStepsList[stepIndex];
      let fibString = currentStep.memory.fib || "[]";
      let sanitizedStr = fibString.replace(/empty x (\d+)/g, (match, p1) => {
        return Array(Number.parseInt(p1, 10)).fill("null").join(",");
      }).replace("[", "").replace("]", "");

      let fibArray = sanitizedStr.split(",").map(val => {
        let trimmed = val.trim();
        return (trimmed === "null" || trimmed === "" || trimmed.startsWith("empty")) ? null : trimmed;
      });

      // If no fib array is computed, render general math variable blocks
      if (fibArray.length <= 1) {
        const mathContent = document.createElement("div");
        mathContent.className = "math-container";
        mathContent.style.display = "flex";
        mathContent.style.gap = "1.5rem";
        mathContent.style.flexWrap = "wrap";
        mathContent.style.justifyContent = "center";

        Object.keys(currentStep.memory).forEach(key => {
          if (key === "status") return;
          const block = document.createElement("div");
          block.className = "memory-card";
          block.style.padding = "1rem 1.5rem";
          block.style.fontSize = "1.2rem";
          block.innerHTML = `<span class="var-name" style="font-size:1.3rem;">${key}</span>: <span class="var-val">${currentStep.memory[key]}</span>`;
          mathContent.appendChild(block);
        });
        wrapper.appendChild(mathContent);
      } else {
        fibArray.forEach((val, idx) => {
          const cell = document.createElement("div");
          cell.className = "fib-cell";

          if (visuals.currentIdx === idx) {
            cell.classList.add("current");
          } else if (visuals.calculated && visuals.calculated.includes(idx)) {
            cell.classList.add("calculated");
          }

          const valSpan = document.createElement("span");
          valSpan.className = "fib-cell-val";
          valSpan.innerText = val !== null ? val : "-";

          const indexSpan = document.createElement("span");
          indexSpan.className = "fib-cell-index";
          indexSpan.innerText = `[${idx}]`;

          cell.appendChild(valSpan);
          cell.appendChild(indexSpan);
          arrContainer.appendChild(cell);
        });
        wrapper.appendChild(arrContainer);
      }

      canvasContainer.appendChild(wrapper);
    }
  };

  // --- PLAYBACK CONTROLS ---
  const stepForward = () => {
    const steps = getSteps();
    if (stepIndex < steps.length - 1) {
      stepIndex++;
      renderStep();
    } else {
      pause();
    }
  };

  const stepBackward = () => {
    if (stepIndex > 0) {
      stepIndex--;
      renderStep();
    }
  };

  const play = () => {
    if (isPlaying) return;
    isPlaying = true;
    btnPlayPause.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
      Pause
    `;
    btnPlayPause.classList.add("primary-btn");

    const intervalDelay = 2000 - (animationSpeed * 180);
    playInterval = setInterval(stepForward, intervalDelay);
  };

  const pause = () => {
    if (!isPlaying) return;
    isPlaying = false;
    btnPlayPause.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
      Play
    `;
    btnPlayPause.classList.remove("primary-btn");
    clearInterval(playInterval);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  btnPlayPause.addEventListener("click", togglePlayPause);
  btnStepForward.addEventListener("click", stepForward);
  btnStepBack.addEventListener("click", stepBackward);

  speedSlider.addEventListener("input", (e) => {
    animationSpeed = Number.parseInt(e.target.value, 10);
    if (isPlaying) {
      pause();
      play();
    }
  });

  // --- SEARCH PILL CONTROLLER ---
  const searchAlgorithm = (query) => {
    query = query.toLowerCase().trim();
    for (const cat of ALGORITHMS_DB) {
      for (const algo of cat.algorithms) {
        if (algo.name.toLowerCase().includes(query) || algo.id.toLowerCase().includes(query)) {
          return algo.id;
        }
      }
    }
    return null;
  };

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const inputStr = searchInput.value.trim();
      if (!inputStr) return;

      landingPage.classList.add("slide-up");

      const foundAlgoId = searchAlgorithm(inputStr);
      if (foundAlgoId) {
        loadAlgorithm(foundAlgoId);
        searchInput.value = "";
        return;
      }

      const numbers = inputStr.split(",")
        .map(num => Number.parseInt(num.trim(), 10))
        .filter(num => !Number.isNaN(num));

      if (numbers.length > 0) {
        runCustomInput(numbers);
      } else {
        alert(`No algorithm found matching "${inputStr}". Enter an algorithm name or input comma-separated numbers (e.g. 15, 8, 42).`);
      }
    }
  });

  const runCustomInput = (numbers) => {
    let dbAlgo = null;
    for (const cat of ALGORITHMS_DB) {
      const found = cat.algorithms.find(a => a.id === currentAlgoId);
      if (found) {
        dbAlgo = found;
        break;
      }
    }
    if (!dbAlgo) return;

    const visualType = dbAlgo.mockVisualState.type;

    if (visualType === "array") {
      customSteps = generateSteps(dbAlgo.id, numbers);
      stepIndex = 0;
      pause();
      visualizerTitle.innerText = `Custom ${dbAlgo.name} Workspace`;
      renderStep();
    } else if (visualType === "math" || dbAlgo.id === "fibonacci-memoized") {
      const n = numbers[0];
      if (n > 0 && n <= 10) {
        customSteps = runGenericMockSimulation(dbAlgo, { n: n, memo: {} });
        stepIndex = 0;
        pause();
        visualizerTitle.innerText = `Custom ${dbAlgo.name} (n = ${n})`;
        renderStep();
      } else {
        alert("Please enter a number between 1 and 10 to calculate Fibonacci.");
      }
    } else {
      alert(`Custom numeric input is only supported for array-based or calculation-based algorithms. Currently loaded: ${dbAlgo.name} (${visualType})`);
    }
  };

  // --- DYNAMIC TRACE GENERATORS ---
  const generateSteps = (algoId, customInput = null) => {
    let algoMeta = null;
    for (const cat of ALGORITHMS_DB) {
      const found = cat.algorithms.find(a => a.id === algoId);
      if (found) {
        algoMeta = found;
        break;
      }
    }
    if (!algoMeta) return [];

    let targetStaticId = null;
    if (algoId === "bubble-sort") targetStaticId = "bubble_sort";
    else if (algoId === "dfs") targetStaticId = "dfs_traversal";
    else if (algoId === "bst-insertion") targetStaticId = "bst_insertion";
    else if (algoId === "fibonacci-memoized" && !customInput) targetStaticId = "fib_dp";

    if (targetStaticId && ALGORITHMS[targetStaticId] && !customInput) {
      return ALGORITHMS[targetStaticId].steps;
    }

    const visualState = algoMeta.mockVisualState;
    let data = customInput || visualState.initialData;

    if (algoId === "linear-search") {
      return runLinearSearchSimulation(data, 23);
    } else if (algoId === "binary-search") {
      let arr = Array.isArray(data) ? [...data].sort((a, b) => a - b) : [3, 8, 12, 16, 23, 38, 56, 72];
      return runBinarySearchSimulation(arr, 23);
    } else if (algoId === "selection-sort") {
      let arr = Array.isArray(data) ? [...data] : [64, 25, 12, 22, 11];
      return runSelectionSortSimulation(arr);
    } else if (algoId === "insertion-sort") {
      let arr = Array.isArray(data) ? [...data] : [12, 11, 13, 5, 6];
      return runInsertionSortSimulation(arr);
    } else if (algoId === "bubble-sort" || targetStaticId === "bubble_sort") {
      let arr = Array.isArray(data) ? [...data] : [29, 10, 14, 37, 13];
      return runBubbleSortSimulation(arr);
    } else if (algoId === "two-pointers-target-sum") {
      let arr = Array.isArray(data) ? [...data].sort((a, b) => a - b) : [1, 2, 4, 6, 8, 9, 14, 15];
      return runTwoPointersSimulation(arr, 15);
    } else if (algoId === "sliding-window-max-subarray") {
      let arr = Array.isArray(data) ? [...data] : [2, 1, 5, 1, 3, 2];
      return runSlidingWindowSimulation(arr, 3);
    } else if (algoId === "caesar-cipher") {
      let text = (data && data.text) ? data.text : "HELLO";
      let shift = (data && data.shift) ? data.shift : 3;
      return runCaesarCipherSimulation(text, shift);
    } else if (algoId === "xor-cipher") {
      let text = (data && data.data) ? data.data : "SECRET";
      let key = (data && data.key) ? data.key : "KEY";
      return runXORCipherSimulation(text, key);
    }

    return runGenericMockSimulation(algoMeta, data);
  };

  const runLinearSearchSimulation = (arr, target) => {
    let trace = [];
    trace.push({
      line: 0,
      memory: { arr: JSON.stringify(arr), target: target },
      explanation: `Entering linear_search seeking value ${target}.`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    let foundIdx = -1;
    for (let i = 0; i < arr.length; i++) {
      trace.push({
        line: 1,
        memory: { arr: JSON.stringify(arr), target: target, i: i, "arr[i]": arr[i] },
        explanation: `Checking index i = ${i}: element value is ${arr[i]}.`,
        visuals: { active: [i], compared: [i], sorted: [] }
      });
      trace.push({
        line: 2,
        memory: { arr: JSON.stringify(arr), target: target, i: i, "arr[i]": arr[i] },
        explanation: `Compare: Does arr[i] (${arr[i]}) == target (${target})?`,
        visuals: { active: [], compared: [i], sorted: [] }
      });

      if (arr[i] === target) {
        foundIdx = i;
        trace.push({
          line: 3,
          memory: { arr: JSON.stringify(arr), target: target, i: i, "arr[i]": arr[i], result: i },
          explanation: `Found target! Returning index ${i}.`,
          visuals: { active: [], compared: [], sorted: [i] }
        });
        break;
      }
    }

    if (foundIdx === -1) {
      trace.push({
        line: 4,
        memory: { arr: JSON.stringify(arr), target: target, result: -1 },
        explanation: `Searched entire array. Target not found. Returning -1.`,
        visuals: { active: [], compared: [], sorted: [] }
      });
    }

    return trace;
  };

  const runBinarySearchSimulation = (arr, target) => {
    let trace = [];
    trace.push({
      line: 0,
      memory: { arr: JSON.stringify(arr), target: target },
      explanation: `Entering binary_search seeking value ${target} in sorted array.`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    let left = 0;
    let right = arr.length - 1;

    trace.push({
      line: 1,
      memory: { arr: JSON.stringify(arr), target: target, left: left },
      explanation: `Initialize left pointer at start (0).`,
      visuals: { active: [left], compared: [], sorted: [] }
    });

    trace.push({
      line: 2,
      memory: { arr: JSON.stringify(arr), target: target, left: left, right: right },
      explanation: `Initialize right pointer at end (${right}).`,
      visuals: { active: [left, right], compared: [], sorted: [] }
    });

    let foundIdx = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      let comparedRange = Array.from({ length: right - left + 1 }, (v, k) => k + left);

      trace.push({
        line: 3,
        memory: { arr: JSON.stringify(arr), target: target, left: left, right: right },
        explanation: `Loop check: left (${left}) <= right (${right}). Continue search.`,
        visuals: { active: comparedRange, compared: [], sorted: [] }
      });

      trace.push({
        line: 4,
        memory: { arr: JSON.stringify(arr), target: target, left: left, right: right, mid: mid, "arr[mid]": arr[mid] },
        explanation: `Calculate mid-point index: mid = ${mid}. Value is ${arr[mid]}.`,
        visuals: { active: [mid], compared: [left, right], sorted: [] }
      });

      trace.push({
        line: 5,
        memory: { arr: JSON.stringify(arr), target: target, mid: mid, "arr[mid]": arr[mid] },
        explanation: `Check: Does arr[mid] (${arr[mid]}) == target (${target})?`,
        visuals: { active: [], compared: [mid], sorted: [] }
      });

      if (arr[mid] === target) {
        foundIdx = mid;
        trace.push({
          line: 6,
          memory: { arr: JSON.stringify(arr), target: target, mid: mid, result: mid },
          explanation: `Found target! Returning index ${mid}.`,
          visuals: { active: [], compared: [], sorted: [mid] }
        });
        break;
      } else if (arr[mid] < target) {
        let oldMid = mid;
        left = mid + 1;
        trace.push({
          line: 7,
          memory: { arr: JSON.stringify(arr), target: target, mid: oldMid, "arr[mid]": arr[oldMid], left: left },
          explanation: `Since arr[mid] (${arr[oldMid]}) < target (${target}), search right half: left = mid + 1 (${left}).`,
          visuals: { active: [left], compared: [oldMid], sorted: [] }
        });
      } else {
        let oldMid = mid;
        right = mid - 1;
        trace.push({
          line: 9,
          memory: { arr: JSON.stringify(arr), target: target, mid: oldMid, "arr[mid]": arr[oldMid], right: right },
          explanation: `Since arr[mid] (${arr[oldMid]}) > target (${target}), search left half: right = mid - 1 (${right}).`,
          visuals: { active: [right], compared: [oldMid], sorted: [] }
        });
      }
    }

    if (foundIdx === -1) {
      trace.push({
        line: 10,
        memory: { arr: JSON.stringify(arr), target: target, result: -1 },
        explanation: `Search range collapsed (left > right). Target not found. Returning -1.`,
        visuals: { active: [], compared: [], sorted: [] }
      });
    }

    return trace;
  };

  const runSelectionSortSimulation = (arr) => {
    let trace = [];
    let n = arr.length;
    trace.push({
      line: 0,
      memory: { arr: JSON.stringify(arr) },
      explanation: "Entering selection_sort function.",
      visuals: { active: [], compared: [], sorted: [] }
    });

    trace.push({
      line: 1,
      memory: { arr: JSON.stringify(arr), n: n },
      explanation: `Initialize n = ${n}.`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    let sorted = [];
    for (let i = 0; i < n - 1; i++) {
      trace.push({
        line: 2,
        memory: { arr: JSON.stringify(arr), i: i },
        explanation: `Outer loop: Pass i = ${i}. Find smallest element from index ${i} to ${n - 1}.`,
        visuals: { active: [i], compared: [], sorted: [...sorted] }
      });

      let min_idx = i;
      trace.push({
        line: 3,
        memory: { arr: JSON.stringify(arr), i: i, min_idx: min_idx },
        explanation: `Assume current index i (${i}) holds minimum element. min_idx = ${min_idx}.`,
        visuals: { active: [min_idx], compared: [], sorted: [...sorted] }
      });

      for (let j = i + 1; j < n; j++) {
        trace.push({
          line: 4,
          memory: { arr: JSON.stringify(arr), i: i, min_idx: min_idx, j: j },
          explanation: `Inner loop: Compare elements at j (${j}) and min_idx (${min_idx}).`,
          visuals: { active: [j], compared: [min_idx], sorted: [...sorted] }
        });

        trace.push({
          line: 5,
          memory: { arr: JSON.stringify(arr), j: j, min_idx: min_idx },
          explanation: `Check: Is arr[j] (${arr[j]}) < arr[min_idx] (${arr[min_idx]})?`,
          visuals: { active: [], compared: [j, min_idx], sorted: [...sorted] }
        });

        if (arr[j] < arr[min_idx]) {
          min_idx = j;
          trace.push({
            line: 6,
            memory: { arr: JSON.stringify(arr), i: i, min_idx: min_idx, j: j },
            explanation: `Yes, new minimum element found at index ${min_idx}.`,
            visuals: { active: [min_idx], compared: [], sorted: [...sorted] }
          });
        }
      }

      if (min_idx !== i) {
        let temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
        trace.push({
          line: 7,
          memory: { arr: JSON.stringify(arr), i: i, min_idx: min_idx },
          explanation: `Swap minimum element arr[min_idx] (${arr[i]}) with arr[i] (${temp}).`,
          visuals: { active: [i, min_idx], compared: [], sorted: [...sorted] }
        });
      } else {
        trace.push({
          line: 7,
          memory: { arr: JSON.stringify(arr), i: i, min_idx: min_idx },
          explanation: `Minimum element is already in place. No swap needed.`,
          visuals: { active: [i], compared: [], sorted: [...sorted] }
        });
      }
      sorted.push(i);
    }
    sorted.push(n - 1);

    trace.push({
      line: 8,
      memory: { arr: JSON.stringify(arr), result: JSON.stringify(arr) },
      explanation: "Selection Sort completed! Returning fully sorted array.",
      visuals: { active: [], compared: [], sorted: sorted }
    });

    return trace;
  };

  const runInsertionSortSimulation = (arr) => {
    let trace = [];
    let n = arr.length;
    trace.push({
      line: 0,
      memory: { arr: JSON.stringify(arr) },
      explanation: "Entering insertion_sort function.",
      visuals: { active: [], compared: [], sorted: [0] }
    });

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      trace.push({
        line: 1,
        memory: { arr: JSON.stringify(arr), i: i, key: key },
        explanation: `Outer loop: Picking element arr[i] (${key}) as key to insert.`,
        visuals: { active: [i], compared: [], sorted: Array.from({ length: i }, (v, k) => k) }
      });

      trace.push({
        line: 2,
        memory: { arr: JSON.stringify(arr), i: i, key: key, j: j },
        explanation: `Initialize index j = ${j} (index of sorted element to compare).`,
        visuals: { active: [j], compared: [], sorted: Array.from({ length: i }, (v, k) => k) }
      });

      while (j >= 0 && arr[j] > key) {
        trace.push({
          line: 3,
          memory: { arr: JSON.stringify(arr), key: key, j: j, "arr[j]": arr[j] },
          explanation: `Shift condition met: arr[j] (${arr[j]}) > key (${key}).`,
          visuals: { active: [j, j + 1], compared: [], sorted: Array.from({ length: i + 1 }, (v, k) => k) }
        });

        arr[j + 1] = arr[j];
        trace.push({
          line: 4,
          memory: { arr: JSON.stringify(arr), key: key, j: j },
          explanation: `Shift arr[j] (${arr[j]}) forward to index ${j + 1}.`,
          visuals: { active: [j, j + 1], compared: [], sorted: [] }
        });

        j = j - 1;
        trace.push({
          line: 5,
          memory: { arr: JSON.stringify(arr), key: key, j: j },
          explanation: `Decrement pointer j to ${j}.`,
          visuals: { active: [], compared: [], sorted: [] }
        });
      }

      arr[j + 1] = key;
      trace.push({
        line: 6,
        memory: { arr: JSON.stringify(arr), key: key, "inserted_at": j + 1 },
        explanation: `Insert key (${key}) into correct position at index ${j + 1}.`,
        visuals: { active: [j + 1], compared: [], sorted: Array.from({ length: i + 1 }, (v, k) => k) }
      });
    }

    trace.push({
      line: 7,
      memory: { arr: JSON.stringify(arr), result: JSON.stringify(arr) },
      explanation: "Insertion Sort completed! Returning fully sorted array.",
      visuals: { active: [], compared: [], sorted: Array.from({ length: n }, (v, k) => k) }
    });

    return trace;
  };

  const runTwoPointersSimulation = (arr, target) => {
    let trace = [];
    trace.push({
      line: 0,
      memory: { arr: JSON.stringify(arr), target: target },
      explanation: `Entering two_sum seeking elements that sum to ${target}.`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    let left = 0;
    let right = arr.length - 1;

    trace.push({
      line: 1,
      memory: { arr: JSON.stringify(arr), target: target, left: left },
      explanation: `Initialize left pointer at index 0 (value: ${arr[left]}).`,
      visuals: { active: [left], compared: [], sorted: [] }
    });

    trace.push({
      line: 2,
      memory: { arr: JSON.stringify(arr), target: target, left: left, right: right },
      explanation: `Initialize right pointer at index ${right} (value: ${arr[right]}).`,
      visuals: { active: [left, right], compared: [], sorted: [] }
    });

    let found = false;
    while (left < right) {
      let current_sum = arr[left] + arr[right];

      trace.push({
        line: 3,
        memory: { arr: JSON.stringify(arr), target: target, left: left, right: right },
        explanation: `Loop check: left (${left}) < right (${right}). Continue searching.`,
        visuals: { active: [left, right], compared: [], sorted: [] }
      });

      trace.push({
        line: 4,
        memory: { arr: JSON.stringify(arr), left: left, right: right, current_sum: current_sum },
        explanation: `Calculate sum: arr[left] (${arr[left]}) + arr[right] (${arr[right]}) = ${current_sum}.`,
        visuals: { active: [left, right], compared: [], sorted: [] }
      });

      trace.push({
        line: 5,
        memory: { arr: JSON.stringify(arr), current_sum: current_sum, target: target },
        explanation: `Check: Does sum (${current_sum}) == target (${target})?`,
        visuals: { active: [], compared: [left, right], sorted: [] }
      });

      if (current_sum === target) {
        found = true;
        trace.push({
          line: 6,
          memory: { arr: JSON.stringify(arr), result: `(${left}, ${right})` },
          explanation: `Target sum found! Returning indices (${left}, ${right}).`,
          visuals: { active: [], compared: [], sorted: [left, right] }
        });
        break;
      } else if (current_sum < target) {
        let oldL = left;
        left += 1;
        trace.push({
          line: 7,
          memory: { arr: JSON.stringify(arr), current_sum: current_sum, target: target, left: left },
          explanation: `Since sum (${current_sum}) < target (${target}), increment left pointer to increase sum: left = ${left}.`,
          visuals: { active: [left], compared: [oldL], sorted: [] }
        });
      } else {
        let oldR = right;
        right -= 1;
        trace.push({
          line: 9,
          memory: { arr: JSON.stringify(arr), current_sum: current_sum, target: target, right: right },
          explanation: `Since sum (${current_sum}) > target (${target}), decrement right pointer to decrease sum: right = ${right}.`,
          visuals: { active: [right], compared: [oldR], sorted: [] }
        });
      }
    }

    if (!found) {
      trace.push({
        line: 10,
        memory: { arr: JSON.stringify(arr), target: target, result: -1 },
        explanation: `Pointers crossed (left >= right). No matching pair found. Returning -1.`,
        visuals: { active: [], compared: [], sorted: [] }
      });
    }

    return trace;
  };

  const runSlidingWindowSimulation = (arr, k) => {
    let trace = [];
    let n = arr.length;
    trace.push({
      line: 0,
      memory: { arr: JSON.stringify(arr), k: k },
      explanation: `Entering max_subarray_sum looking for maximum sum of ${k} consecutive elements.`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    trace.push({
      line: 1,
      memory: { arr: JSON.stringify(arr), n: n },
      explanation: `Initialize n = length of array (${n}).`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    if (n < k) {
      trace.push({
        line: 2,
        memory: { arr: JSON.stringify(arr), n: n, k: k },
        explanation: `Array length is smaller than window size! Error: Returning -1.`,
        visuals: { active: [], compared: [], sorted: [] }
      });
      return trace;
    }

    let initialWindow = arr.slice(0, k);
    let window_sum = initialWindow.reduce((a, b) => a + b, 0);
    let max_sum = window_sum;
    let initialIndices = Array.from({ length: k }, (v, k) => k);

    trace.push({
      line: 3,
      memory: { arr: JSON.stringify(arr), window_sum: window_sum },
      explanation: `Calculate sum of the first window (indices 0 to ${k - 1}): ${window_sum}.`,
      visuals: { active: initialIndices, compared: [], sorted: [] }
    });

    trace.push({
      line: 4,
      memory: { arr: JSON.stringify(arr), max_sum: max_sum },
      explanation: `Initialize max_sum to current window_sum (${max_sum}).`,
      visuals: { active: [], compared: [], sorted: initialIndices }
    });

    for (let i = k; i < n; i++) {
      let activeIndices = Array.from({ length: k }, (v, idx) => idx + i - k + 1);
      let prevWindowIdx = i - k;

      trace.push({
        line: 5,
        memory: { arr: JSON.stringify(arr), i: i, window_sum: window_sum },
        explanation: `Loop: Shift window to index ${i - k + 1} (adds arr[${i}], removes arr[${prevWindowIdx}]).`,
        visuals: { active: activeIndices, compared: [prevWindowIdx], sorted: [] }
      });

      let oldSum = window_sum;
      window_sum = window_sum + arr[i] - arr[prevWindowIdx];
      trace.push({
        line: 6,
        memory: { arr: JSON.stringify(arr), i: i, window_sum: window_sum },
        explanation: `Update sum: ${oldSum} + arr[${i}] (${arr[i]}) - arr[${prevWindowIdx}] (${arr[prevWindowIdx]}) = ${window_sum}.`,
        visuals: { active: activeIndices, compared: [], sorted: [] }
      });

      let oldMax = max_sum;
      max_sum = Math.max(max_sum, window_sum);
      trace.push({
        line: 7,
        memory: { arr: JSON.stringify(arr), window_sum: window_sum, max_sum: max_sum },
        explanation: `Update max_sum: max(${oldMax}, ${window_sum}) = ${max_sum}.`,
        visuals: { active: [], compared: [], sorted: activeIndices }
      });
    }

    trace.push({
      line: 8,
      memory: { max_sum: max_sum },
      explanation: `Sliding Window completed! Maximum subarray sum is ${max_sum}.`,
      visuals: { active: [], compared: [], sorted: [] }
    });

    return trace;
  };

  const runCaesarCipherSimulation = (text, shift) => {
    let trace = [];
    trace.push({
      line: 0,
      memory: { text: text, shift: shift },
      explanation: `Entering encrypt_caesar shifting characters of "${text}" by ${shift}.`,
      visuals: { type: "string", text: text, active: -1, processed: [] }
    });

    trace.push({
      line: 1,
      memory: { text: text, shift: shift, result: "" },
      explanation: `Initialize empty result string.`,
      visuals: { type: "string", text: text, active: -1, processed: [] }
    });

    let result = "";
    let processed = [];

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      let isLetter = /[a-zA-Z]/.test(char);

      trace.push({
        line: 2,
        memory: { text: text, char: char, result: result },
        explanation: `Loop: Processing character at index ${i}: '${char}'.`,
        visuals: { type: "string", text: text, active: i, processed: [...processed] }
      });

      trace.push({
        line: 3,
        memory: { text: text, char: char, isLetter: isLetter },
        explanation: `Check: Is '${char}' an alphabetic letter? ${isLetter ? "Yes" : "No"}.`,
        visuals: { type: "string", text: text, active: i, processed: [...processed] }
      });

      if (isLetter) {
        let code = char.charCodeAt(0);
        let base = code >= 65 && code <= 90 ? 65 : 97;
        let encryptedChar = String.fromCharCode(((code - base + shift) % 26) + base);
        result += encryptedChar;

        trace.push({
          line: 5,
          memory: { text: text, char: char, shift: shift, encryptedChar: encryptedChar, result: result },
          explanation: `Shift letter: shift '${char}' by ${shift} positions -> '${encryptedChar}'.`,
          visuals: { type: "string", text: text, active: i, processed: [...processed, i] }
        });
      } else {
        result += char;
        trace.push({
          line: 8,
          memory: { text: text, char: char, result: result },
          explanation: `Non-letter character '${char}' is appended unchanged.`,
          visuals: { type: "string", text: text, active: i, processed: [...processed, i] }
        });
      }
      processed.push(i);
    }

    trace.push({
      line: 9,
      memory: { text: text, result: result },
      explanation: `Encryption completed successfully! Encrypted text: "${result}".`,
      visuals: { type: "string", text: text, active: -1, processed: processed }
    });

    return trace;
  };

  const runXORCipherSimulation = (text, key) => {
    let trace = [];
    trace.push({
      line: 0,
      memory: { data: text, key: key },
      explanation: `Entering encrypt_XOR with text "${text}" and key "${key}".`,
      visuals: { type: "string", text: text, active: -1, processed: [] }
    });

    let result = "";
    let processed = [];

    trace.push({
      line: 1,
      memory: { data: text, key: key, result: "[]" },
      explanation: `Initialize a byte array for the XOR output.`,
      visuals: { type: "string", text: text, active: -1, processed: [] }
    });

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      let charCode = char.charCodeAt(0);
      let keyChar = key[i % key.length];
      let keyCode = keyChar.charCodeAt(0);
      let xorVal = charCode ^ keyCode;
      let xorChar = String.fromCharCode(xorVal);

      let displayChar = xorVal < 32 ? `\\x${xorVal.toString(16)}` : xorChar;
      result += xorChar;

      trace.push({
        line: 2,
        memory: { data: text, char: char, keyChar: keyChar, index: i },
        explanation: `Loop: Process index ${i}: text character '${char}' XOR key character '${keyChar}'.`,
        visuals: { type: "string", text: text, active: i, processed: [...processed] }
      });

      trace.push({
        line: 3,
        memory: {
          data: text,
          "char_code": `0x${charCode.toString(16)}`,
          "key_code": `0x${keyCode.toString(16)}`,
          "xor_result": `0x${xorVal.toString(16)} (${displayChar})`
        },
        explanation: `Compute bitwise XOR: 0x${charCode.toString(16)} ^ 0x${keyCode.toString(16)} = 0x${xorVal.toString(16)}.`,
        visuals: { type: "string", text: text, active: i, processed: [...processed, i] }
      });
      processed.push(i);
    }

    trace.push({
      line: 4,
      memory: { data: text, result: result },
      explanation: `XOR Encryption completed! Returning encrypted byte stream.`,
      visuals: { type: "string", text: text, active: -1, processed: processed }
    });

    return trace;
  };

  const runGenericMockSimulation = (algoMeta, data) => {
    let trace = [];
    const pseudocode = algoMeta.pseudocode;
    const trackerVars = algoMeta.mockVisualState.trackedVariables || [];
    const type = algoMeta.mockVisualState.type;

    trace.push({
      line: 0,
      memory: Object.assign({ status: "Entered" }, typeof data === 'object' ? data : { input: JSON.stringify(data) }),
      explanation: `Entering the ${algoMeta.name} workspace visualization.`,
      visuals: getGenericVisuals(type, data, 0)
    });

    let memSetup = { status: "Setup" };
    trackerVars.forEach(v => {
      memSetup[v] = "-";
    });
    trace.push({
      line: Math.min(1, pseudocode.length - 1),
      memory: Object.assign(memSetup, typeof data === 'object' ? data : { input: JSON.stringify(data) }),
      explanation: `Initialize workspace tracker variables: ${trackerVars.join(", ")}.`,
      visuals: getGenericVisuals(type, data, 1)
    });

    const executionLines = Array.from({ length: pseudocode.length - 2 }, (v, k) => k + 2);
    let stepCount = Math.min(6, executionLines.length || 4);

    for (let s = 0; s < stepCount; s++) {
      let lineNum = executionLines[s % executionLines.length] || 1;

      let stepMem = { status: `Running (Step ${s + 1})` };
      trackerVars.forEach((v, vIdx) => {
        if (v === "i" || v === "j" || v === "index" || v === "step" || v === "r" || v === "c") {
          stepMem[v] = s;
        } else if (v.includes("array") || v.includes("matrix") || v.includes("dp")) {
          stepMem[v] = `[${s} calculations done]`;
        } else {
          stepMem[v] = `value_${s}`;
        }
      });

      trace.push({
        line: lineNum,
        memory: stepMem,
        explanation: `Executing line ${lineNum + 1}: ${pseudocode[lineNum].trim()}`,
        visuals: getGenericVisuals(type, data, s + 2)
      });
    }

    let finalMem = { status: "Success", result: "Completed" };
    trackerVars.forEach(v => {
      finalMem[v] = "Done";
    });
    trace.push({
      line: pseudocode.length - 1,
      memory: finalMem,
      explanation: `Algorithm completed execution. Returning results.`,
      visuals: getGenericVisuals(type, data, 99)
    });

    return trace;
  };

  const getGenericVisuals = (type, data, step) => {
    if (type === "array") {
      let arr = Array.isArray(data) ? data : (data.initialData || [10, 20, 30, 40, 50]);
      return { active: [step % arr.length], compared: [], sorted: [] };
    } else if (type === "grid") {
      let grid = Array.isArray(data) ? data : (data.initialData || [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
      let matrix = Array.isArray(grid) ? grid : [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      let rows = matrix.length;
      let cols = matrix[0] ? matrix[0].length : 0;

      let simulatedGrid = matrix.map((row, r) =>
        row.map((val, c) => {
          if (r * cols + c < step) {
            return typeof val === 'number' ? (val + r + c + step) % 100 : val;
          }
          return null;
        })
      );

      let activeRow = Math.floor(step / cols) % rows;
      let activeCol = step % cols;
      return { type: "grid", grid: simulatedGrid, active: [activeRow, activeCol] };
    } else if (type === "string") {
      let text = typeof data === 'string' ? data : (data.text || "WORKSPACE");
      let active = step % text.length;
      let processed = Array.from({ length: Math.min(step, text.length) }, (v, k) => k);
      return { type: "string", text: text, active: active, processed: processed };
    } else if (type === "tree") {
      let activeNode = "10";
      if (step === 0) activeNode = "20";
      else if (step === 1) activeNode = "10";
      else if (step === 2) activeNode = "5";

      return {
        active: activeNode,
        visited: ["20", "10"].slice(0, step),
        queued: []
      };
    } else if (type === "graph") {
      let activeNode = "A";
      if (step === 0) activeNode = "A";
      else if (step === 1) activeNode = "B";
      else if (step === 2) activeNode = "C";

      return {
        active: [activeNode],
        visited: ["A", "B", "C"].slice(0, step),
        queued: []
      };
    }
    return {};
  };

  // Bind Pseudocode & Code Tab click events
  const tabPseudocode = document.getElementById("tab-pseudocode");
  const tabCode = document.getElementById("tab-code");
  const langSelectorWrapper = document.getElementById("lang-selector-wrapper");

  if (tabPseudocode && tabCode && langSelectorWrapper && langSelect) {
    tabPseudocode.addEventListener("click", () => {
      tabPseudocode.classList.add("active");
      tabCode.classList.remove("active");
      langSelectorWrapper.classList.add("hidden");
      currentLanguage = "pseudocode";
      loadAlgorithm(currentAlgoId);
    });

    tabCode.addEventListener("click", () => {
      tabCode.classList.add("active");
      tabPseudocode.classList.remove("active");
      langSelectorWrapper.classList.remove("hidden");
      
      if (currentLanguage === "pseudocode") {
        currentLanguage = langSelect.value;
      }
      loadAlgorithm(currentAlgoId);
    });

    langSelect.addEventListener("change", (e) => {
      currentLanguage = e.target.value;
      loadAlgorithm(currentAlgoId);
    });
  }

  // --- CODE SANDBOX CONTROLLER ---
  const sandboxPane = document.getElementById("sandbox-pane");
  const btnSandboxToggle = document.getElementById("btn-sandbox-toggle");
  const closeSandboxBtn = document.getElementById("close-sandbox");
  const btnSandboxRun = document.getElementById("btn-sandbox-run");
  const sandboxArrayInput = document.getElementById("sandbox-array-input");
  const sandboxCodeInput = document.getElementById("sandbox-code-input");
  const sandboxLangSelect = document.getElementById("sandbox-lang-select");

  const SANDBOX_TEMPLATES = {
    javascript: `// JavaScript Bubble Sort
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      // Swap elements
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
    python: `# Python Bubble Sort
n = len(arr)
for i in range(n):
    for j in range(0, n - i - 1):
        if arr[j] > arr[j + 1]:
            # Swap elements
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp`,
    cpp: `// C++ Bubble Sort
int n = arr.size();
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            // Swap elements
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}`,
    c: `// C Bubble Sort
int n = arr_length;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            // Swap elements
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}`,
    go: `// Go Bubble Sort
n := len(arr)
for i := 0; i < n; i++ {
    for j := 0; j < n - i - 1; j++ {
        if arr[j] > arr[j + 1] {
            // Swap elements
            temp := arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
        }
    }
}`
  };

  const translateSandboxCodeToJS = (code, lang) => {
    if (lang === "javascript") return code;

    if (lang === "python") {
      let lines = code.split("\n");
      let result = [];
      let indentStack = [];

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        if (!trimmed) {
          result.push("");
          continue;
        }

        // Python comment
        if (trimmed.startsWith("#")) {
          result.push("//" + trimmed.slice(1));
          continue;
        }

        let indentMatch = line.match(/^(\s*)/);
        let indent = indentMatch ? indentMatch[0].length : 0;

        while (indentStack.length > 0 && indent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          result.push(" ".repeat(indent) + "}");
        }

        let isBlock = trimmed.endsWith(":");
        if (isBlock) {
          trimmed = trimmed.slice(0, -1).trim();
          indentStack.push(indent);
        }

        let translated = trimmed
          .replace(/(\b\w+\[.*?\]),\s*(\b\w+\[.*?\])\s*=\s*(\b\w+\[.*?\]),\s*(\b\w+\[.*?\])/g, "[$1, $2] = [$3, $4]")
          .replace(/(\w+|\d+)\s*\/\/\s*(\w+|\d+)/g, "Math.floor($1 / $2)")
          .replace(/\blen\(arr\)/g, "arr.length")
          .replace(/\bNone\b/g, "null")
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false");

        // Loop: for var in range(...)
        translated = translated.replace(/for\s+(\w+)\s+in\s+range\((.*?)\)/g, (match, v, args) => {
          let parts = args.split(",").map(p => p.trim());
          if (parts.length === 1) {
            return `for (${v} = 0; ${v} < ${parts[0]}; ${v}++)`;
          } else if (parts.length === 2) {
            return `for (${v} = ${parts[0]}; ${v} < ${parts[1]}; ${v}++)`;
          } else if (parts.length === 3) {
            let step = parts[2];
            let op = step.startsWith("-") ? ">" : "<";
            let inc = step.startsWith("-") ? `${v} -= ${step.slice(1)}` : `${v} += ${step}`;
            return `for (${v} = ${parts[0]}; ${v} ${op} ${parts[1]}; ${inc})`;
          }
          return match;
        });

        translated = translated.replace(/while\s+(.+)/g, "while ($1)");
        translated = translated.replace(/if\s+(.+)/g, "if ($1)");
        translated = translated.replace(/elif\s+(.+)/g, "else if ($1)");
        translated = translated.replace(/else/g, "else");

        if (isBlock) {
          translated += " {";
        }

        result.push(" ".repeat(indent) + translated);
      }

      while (indentStack.length > 0) {
        indentStack.pop();
        result.push("}");
      }

      return result.join("\n");
    }

    // C++, C, Go
    let cleaned = code
      .replace(/\b(int|float|double|auto|let|var|const|void|func|function|std::vector<int>&)\b/g, "")
      .replace(/\barr\.size\(\)/g, "arr.length")
      .replace(/\blen\(arr\)/g, "arr.length")
      .replace(/\barr_length\b/g, "arr.length")
      .replace(/:=/g, "=")
      .replace(/#include.*/g, "")
      .replace(/using namespace.*/g, "")
      .replace(/package main/g, "")
      .replace(/import.*/g, "");

    return cleaned;
  };

  // Sandbox structure type tabs
  let sandboxStructType = "array";

  const structButtons = document.querySelectorAll(".struct-type-btn");
  structButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      structButtons.forEach(b => {
        b.classList.remove("active");
        b.style.backgroundColor = "var(--bg-base)";
        b.style.color = "var(--text-muted)";
      });
      btn.classList.add("active");
      btn.style.backgroundColor = "var(--sage)";
      btn.style.color = "#fff";

      sandboxStructType = btn.dataset.type || "array";
      const inputLabel = document.getElementById("sandbox-input-label");

      if (sandboxStructType === "array") {
        if (inputLabel) inputLabel.innerText = "Initial Array";
        if (sandboxArrayInput) sandboxArrayInput.value = "25, 45, 12, 35, 18";
      } else if (sandboxStructType === "grid") {
        if (inputLabel) inputLabel.innerText = "Initial Matrix (JSON format)";
        if (sandboxArrayInput) sandboxArrayInput.value = "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]";
      } else if (sandboxStructType === "string") {
        if (inputLabel) inputLabel.innerText = "Initial String";
        if (sandboxArrayInput) sandboxArrayInput.value = "WORKSPACE";
      }
    });
  });

  if (sandboxLangSelect) {
    sandboxLangSelect.addEventListener("change", (e) => {
      const selectedLang = e.target.value;
      if (SANDBOX_TEMPLATES[selectedLang]) {
        sandboxCodeInput.value = SANDBOX_TEMPLATES[selectedLang];
      }
    });
  }

  if (btnSandboxToggle && sandboxPane) {
    btnSandboxToggle.addEventListener("click", () => {
      const isHidden = sandboxPane.classList.contains("hidden");
      sandboxPane.classList.toggle("hidden");
      if (isHidden) {
        if (sandboxArrayInput && !sandboxArrayInput.value.trim()) {
          sandboxArrayInput.value = "25, 45, 12, 35, 18";
        }
        if (sandboxCodeInput && !sandboxCodeInput.value.trim()) {
          const lang = sandboxLangSelect ? sandboxLangSelect.value : "javascript";
          sandboxCodeInput.value = SANDBOX_TEMPLATES[lang] || SANDBOX_TEMPLATES.javascript;
        }
      }
    });
  }

  if (closeSandboxBtn && sandboxPane) {
    closeSandboxBtn.addEventListener("click", () => {
      sandboxPane.classList.add("hidden");
    });
  }

  if (btnSandboxRun) {
    btnSandboxRun.addEventListener("click", () => {
      const rawInput = sandboxArrayInput ? sandboxArrayInput.value.trim() : "";
      const userCode = sandboxCodeInput ? sandboxCodeInput.value : "";
      const userLang = sandboxLangSelect ? sandboxLangSelect.value : "javascript";

      let trace = [];

      if (sandboxStructType === "array") {
        const initialArray = rawInput.split(",")
          .map(x => parseInt(x.trim(), 10))
          .filter(x => !Number.isNaN(x));

        if (initialArray.length === 0) {
          alert("Please enter a valid comma-separated list of numbers in the Initial Array box (e.g. 25, 45, 12, 35, 18).");
          return;
        }

        const translatedCode = translateSandboxCodeToJS(userCode, userLang);

        const recordStep = (targetArray, readIdxs = [], writeIdxs = [], memoryVars = {}, explanation = "") => {
          trace.push({
            line: 0,
            memory: Object.assign({
              arr: JSON.stringify(targetArray),
              status: explanation || "Execution step"
            }, memoryVars),
            explanation: explanation || `Array state: ${JSON.stringify(targetArray)}`,
            visuals: {
              type: "array",
              read: readIdxs,
              write: writeIdxs,
              active: writeIdxs,
              compared: readIdxs,
              sorted: []
            }
          });
        };

        recordStep(initialArray, [], [], {}, `Initial array loaded in sandbox (${userLang.toUpperCase()}).`);

        let currentVars = { i: 0, j: 0 };

        let proxyHandler = {
          get(target, prop) {
            if (prop === 'length') return target.length;
            if (typeof target[prop] === 'function') {
              return target[prop].bind(target);
            }
            if (typeof prop === 'string' && !Number.isNaN(Number(prop))) {
              const idx = parseInt(prop, 10);
              recordStep([...target], [idx], [], { ...currentVars }, `Read element at index ${idx} (value: ${target[idx]})`);
            }
            return target[prop];
          },
          set(target, prop, value) {
            if (typeof prop === 'string' && !Number.isNaN(Number(prop))) {
              const idx = parseInt(prop, 10);
              const oldVal = target[idx];
              target[prop] = value;
              recordStep([...target], [], [idx], { ...currentVars }, `Write value ${value} to index ${idx} (was ${oldVal})`);
            } else {
              target[prop] = value;
            }
            return true;
          }
        };

        let proxyArr = new Proxy([...initialArray], proxyHandler);

        try {
          const runCode = new Function("arr", `
            let i = 0, j = 0, k = 0, temp = 0, n = arr.length, left = 0, right = arr.length - 1, mid = 0, min_idx = 0;
            ${translatedCode}
          `);
          runCode(proxyArr);

          recordStep([...proxyArr], [], [], {}, "Sandbox execution completed successfully.");
        } catch (err) {
          alert("Runtime error in custom code:\n" + err.message + "\n\n(Translated JavaScript code was:\n" + translatedCode + ")");
          return;
        }

      } else if (sandboxStructType === "grid") {
        let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        try {
          matrix = JSON.parse(rawInput);
        } catch (e) {
          matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        }

        const rows = matrix.length;
        const cols = matrix[0] ? matrix[0].length : 0;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            trace.push({
              line: 0,
              memory: { r: r, c: c, val: matrix[r][c], status: `Scanning cell [${r}, ${c}]` },
              explanation: `Visiting cell [${r}, ${c}] with value ${matrix[r][c]}`,
              visuals: {
                type: "grid",
                grid: matrix,
                active: [r, c]
              }
            });
          }
        }

      } else if (sandboxStructType === "string") {
        let text = rawInput || "WORKSPACE";
        for (let i = 0; i < text.length; i++) {
          trace.push({
            line: 0,
            memory: { index: i, char: text[i], status: `Processing character ${text[i]}` },
            explanation: `Inspecting character '${text[i]}' at index ${i}`,
            visuals: {
              type: "string",
              text: text,
              active: i,
              processed: Array.from({ length: i }, (_, k) => k)
            }
          });
        }
      }

      // Load recorded trace into player
      customSteps = trace;
      stepIndex = 0;
      pause();

      const codeLines = userCode.split("\n").map((lineText, idx) => ({
        text: lineText,
        originalIndex: idx
      }));
      renderPseudocode(codeLines);

      visualizerTitle.innerText = `Custom Sandbox (${sandboxStructType.toUpperCase()} - ${userLang.toUpperCase()})`;
      document.getElementById("algo-difficulty").innerText = "Interactive Sandbox";
      document.getElementById("complexity-badge-best").innerText = "Best: N/A";
      document.getElementById("complexity-badge-avg").innerText = "Avg: N/A";
      document.getElementById("complexity-badge-worst").innerText = "Worst: N/A";
      document.getElementById("algo-desc-text").innerText = `Interactive ${sandboxStructType} execution visualization logged from user-written code.`;

      renderStep();
      sandboxPane.classList.add("hidden");
    });
  }

  // --- USER TRACKER & AUTH FUNCTIONS ---
  
  const updateAuthUI = () => {
    const initialsSpan = document.getElementById("profile-initials");
    const svgIcon = document.getElementById("profile-svg");
    const dropdownUsername = document.getElementById("dropdown-username");
    
    if (currentUser && currentUser !== "guest") {
      if (svgIcon) svgIcon.classList.add("hidden");
      if (initialsSpan) {
        initialsSpan.classList.remove("hidden");
        initialsSpan.innerText = currentUser.substring(0, 2).toUpperCase();
      }
      if (dropdownUsername) dropdownUsername.innerText = currentUser;
    } else if (currentUser === "guest") {
      if (svgIcon) svgIcon.classList.add("hidden");
      if (initialsSpan) {
        initialsSpan.classList.remove("hidden");
        initialsSpan.innerText = "GS";
      }
      if (dropdownUsername) dropdownUsername.innerText = "Guest Scholar";
    } else {
      if (svgIcon) svgIcon.classList.remove("hidden");
      if (initialsSpan) {
        initialsSpan.classList.add("hidden");
        initialsSpan.innerText = "";
      }
      if (dropdownUsername) dropdownUsername.innerText = "Not Signed In";
    }

    updateProgressUI();
  };

  const updateProgressUI = () => {
    const totalAlgos = 45; // Fixed count
    const completedCount = completedAlgos.length;
    const percentage = totalAlgos > 0 ? Math.round((completedCount / totalAlgos) * 100) : 0;
    
    const progressPercent = document.getElementById("progress-percent");
    const progressBarFill = document.getElementById("progress-bar-fill");
    
    if (progressPercent) {
      progressPercent.innerText = `${percentage}% (${completedCount}/${totalAlgos})`;
    }
    if (progressBarFill) {
      progressBarFill.style.width = `${percentage}%`;
    }
  };

  const updateMarkDoneButtonUI = () => {
    const btnMarkDone = document.getElementById("btn-mark-done");
    if (!btnMarkDone) return;
    
    const doneText = btnMarkDone.querySelector(".btn-mark-done-text");
    
    if (completedAlgos.includes(currentAlgoId)) {
      btnMarkDone.classList.add("completed");
      if (doneText) doneText.innerText = "Marked as Done ✓";
    } else {
      btnMarkDone.classList.remove("completed");
      if (doneText) doneText.innerText = "Mark as Done";
    }
  };

  const handleSuccessfulLogin = (username) => {
    currentUser = username;
    localStorage.setItem("algo_current_user", currentUser);
    completedAlgos = JSON.parse(localStorage.getItem(`algo_completed_${currentUser}`)) || [];
    visitedAlgos = JSON.parse(localStorage.getItem(`algo_visited_${currentUser}`)) || [];
    seenAlgos = JSON.parse(localStorage.getItem(`algo_seen_${currentUser}`)) || [];
    
    // Hide auth modal
    const authModal = document.getElementById("auth-modal");
    if (authModal) authModal.classList.add("hidden");
    
    // Slide up landing page if start button was clicked
    landingPage.classList.add("slide-up");
    
    // Refresh visual state
    updateAuthUI();
    buildSidebar();
    loadAlgorithm(currentAlgoId);
  };

  // 1. Mark as Completed Button Handler
  const btnMarkDone = document.getElementById("btn-mark-done");
  if (btnMarkDone) {
    btnMarkDone.addEventListener("click", () => {
      if (!currentUser) {
        // Prompt user to sign in
        const authModal = document.getElementById("auth-modal");
        if (authModal) authModal.classList.remove("hidden");
        return;
      }
      
      const idx = completedAlgos.indexOf(currentAlgoId);
      if (idx !== -1) {
        // Toggle off
        completedAlgos.splice(idx, 1);
      } else {
        // Toggle on
        completedAlgos.push(currentAlgoId);
      }
      
      // Save status
      localStorage.setItem(`algo_completed_${currentUser}`, JSON.stringify(completedAlgos));
      
      // Update displays
      updateMarkDoneButtonUI();
      updateProgressUI();
      buildSidebar();
    });
  }

  // 2. Profile Dropdown & Sign Out Handlers
  const profileBtn = document.getElementById("profile-btn");
  const profileDropdown = document.getElementById("profile-dropdown");
  const btnSignOut = document.getElementById("btn-sign-out");

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("hidden");
    });
  }

  if (btnSignOut) {
    btnSignOut.addEventListener("click", () => {
      currentUser = null;
      localStorage.removeItem("algo_current_user");
      completedAlgos = [];
      
      if (profileDropdown) profileDropdown.classList.add("hidden");
      
      // Reset view to landing page
      landingPage.classList.remove("slide-up");
      
      updateAuthUI();
      buildSidebar();
      loadAlgorithm(currentAlgoId);
    });
  }

  document.addEventListener("click", (e) => {
    const wrapper = document.querySelector(".profile-wrapper");
    if (wrapper && !wrapper.contains(e.target) && profileDropdown) {
      profileDropdown.classList.add("hidden");
    }
  });

  // 3. Auth Modal Forms & Action Handlers
  const authModal = document.getElementById("auth-modal");
  const authForm = document.getElementById("auth-form");
  const authUsernameInput = document.getElementById("auth-username");
  const authPasswordInput = document.getElementById("auth-password");
  const authTitle = document.getElementById("auth-title");
  const authSubtitle = document.getElementById("auth-subtitle");
  const btnAuthSubmit = document.getElementById("btn-auth-submit");
  const authToggleMode = document.getElementById("auth-toggle-mode");
  const btnAuthGuest = document.getElementById("btn-auth-guest");

  if (authToggleMode) {
    authToggleMode.addEventListener("click", (e) => {
      e.preventDefault();
      if (authMode === "signin") {
        authMode = "signup";
        if (authTitle) authTitle.innerText = "Create Account";
        if (authSubtitle) authSubtitle.innerText = "Register to start tracking your learning achievements.";
        if (btnAuthSubmit) btnAuthSubmit.innerText = "Sign Up";
        authToggleMode.innerText = "Already have an account? Sign In";
      } else {
        authMode = "signin";
        if (authTitle) authTitle.innerText = "Welcome Scholar";
        if (authSubtitle) authSubtitle.innerText = "Sign in to save and track your algorithm learning progress.";
        if (btnAuthSubmit) btnAuthSubmit.innerText = "Sign In";
        authToggleMode.innerText = "Don't have an account? Sign Up";
      }
    });
  }

  if (btnAuthGuest) {
    btnAuthGuest.addEventListener("click", (e) => {
      e.preventDefault();
      handleSuccessfulLogin("guest");
    });
  }

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = authUsernameInput.value.trim().toLowerCase();
      const password = authPasswordInput.value;

      if (!username || !password) return;

      let users = JSON.parse(localStorage.getItem("algo_users")) || {};

      if (authMode === "signup") {
        if (users[username]) {
          alert("Username already exists! Please choose another one or Sign In.");
          return;
        }
        users[username] = password;
        localStorage.setItem("algo_users", JSON.stringify(users));
        handleSuccessfulLogin(username);
      } else {
        // signin
        if (users[username] && users[username] === password) {
          handleSuccessfulLogin(username);
        } else {
          alert("Invalid username or password! Please check credentials or sign up.");
        }
      }

      // Reset inputs
      authUsernameInput.value = "";
      authPasswordInput.value = "";
    });
  }

  // --- INITIALIZE APPLICATION PAGE STATE ---
  updateAuthUI();
  buildSidebar();
  loadAlgorithm("bubble-sort");
});
