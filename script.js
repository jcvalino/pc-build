document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("section");
  const heroSection = document.querySelector(".hero");
  const dashboardSection = document.getElementById("dashboard");
  const pcBuildToolSection = document.getElementById("pc-build-tool");
  const laptopToolSection = document.getElementById("laptop-tool");
  const savedRecommendationsSection = document.getElementById(
    "saved-recommendations",
  );
  const beginBtn = document.querySelector(".begin-btn");
  const sidebarLinks = document.querySelectorAll(".nav-item");
  const pcBuildStartBtn = document.querySelector(
    '.card-start-btn[data-type="pc-build"]',
  );
  const laptopStartBtn = document.querySelector(
    '.card-start-btn[data-type="laptop"]',
  );
  const recommendBuildBtn = document.querySelector(".recommend-build-btn");
  const recommendLaptopBtn = document.querySelector(".recommend-laptop-btn");
  const newRequestBtn = document.querySelectorAll(".new-request-btn");
  const saveRecommendationBtn = document.querySelectorAll(
    ".save-recommendation-btn",
  );
  const budgetRangeSelect = document.getElementById("budget-range");
  const laptopBudgetRangeSelect = document.getElementById(
    "laptop-budget-range",
  );
  const useCaseSelect = document.getElementById("use-case");
  const laptopUseCaseSelect = document.getElementById("laptop-use-case");

  const savedLaptopSection = document.getElementById(
    "saved-laptop-recommendations",
  );
  const savedPcSection = document.getElementById("saved-pc-recommendations");

  if (dashboardSection) dashboardSection.style.display = "none";
  if (pcBuildToolSection) pcBuildToolSection.style.display = "none";
  if (laptopToolSection) laptopToolSection.style.display = "none";
  if (savedRecommendationsSection)
    savedRecommendationsSection.style.display = "none";
  if (savedLaptopSection) savedLaptopSection.style.display = "none";
  if (savedPcSection) savedPcSection.style.display = "none";

  let savedRecommendations = {
    laptop: [],
    pc: [],
  };

  function loadSavedRecommendations() {
    const saved = localStorage.getItem("smartPcSavedRecommendations");
    if (saved) {
      savedRecommendations = JSON.parse(saved);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem(
      "smartPcSavedRecommendations",
      JSON.stringify(savedRecommendations),
    );
  }

  function showSavedLaptopRecommendations() {
    hideAllSections();
    if (savedLaptopSection) {
      savedLaptopSection.style.display = "flex";
      renderSavedLaptopRecommendations();
    }
    document.querySelector(".navbar").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showSavedPcRecommendations() {
    hideAllSections();
    if (savedPcSection) {
      savedPcSection.style.display = "flex";
      renderSavedPcRecommendations();
    }
    document.querySelector(".navbar").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function hideAllSections() {
    sections.forEach((section) => {
      section.style.display = "none";
    });
    if (savedLaptopSection) savedLaptopSection.style.display = "none";
    if (savedPcSection) savedPcSection.style.display = "none";
  }

  function renderSavedLaptopRecommendations() {
    const grid = document.querySelector(
      "#saved-laptop-recommendations .saved-recommendations-grid",
    );
    if (!grid) return;

    if (savedRecommendations.laptop.length === 0) {
      grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <h3>No Saved Laptop Recommendations</h3>
                    <p>Save some laptop recommendations to see them here.</p>
                </div>
            `;
      return;
    }

    grid.innerHTML = savedRecommendations.laptop
      .map(
        (rec, index) => `
            <div class="saved-recommendation-card">
                <button class="delete-btn" onclick="deleteLaptopRecommendation(${index})">
                    <i class="fas fa-times"></i>
                </button>
                <div class="model-name">${rec.model}</div>
                <div class="specs-section">
                    <div class="spec-item">
                        <span class="spec-label">CPU:</span>
                        <span class="spec-value">${rec.cpu}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">GPU:</span>
                        <span class="spec-value">${rec.gpu}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">RAM:</span>
                        <span class="spec-value">${rec.ram}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">STORAGE:</span>
                        <span class="spec-value">${rec.storage}</span>
                    </div>
                </div>
                <div class="store-section">
                    <div class="store-name">${rec.store}</div>
                </div>
                <div class="cost-section">
                    <div class="cost-amount">${rec.cost}</div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  function renderSavedPcRecommendations() {
    const grid = document.querySelector(
      "#saved-pc-recommendations .saved-recommendations-grid",
    );
    if (!grid) return;

    if (savedRecommendations.pc.length === 0) {
      grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bookmark"></i>
                    <h3>No Saved PC Build Recommendations</h3>
                    <p>Save some PC build recommendations to see them here.</p>
                </div>
            `;
      return;
    }

    grid.innerHTML = savedRecommendations.pc
      .map(
        (rec, index) => `
            <div class="saved-recommendation-card">
                <button class="delete-btn" onclick="deletePcRecommendation(${index})">
                    <i class="fas fa-times"></i>
                </button>
                <div class="model-name">${rec.name}</div>
                <div class="specs-section">
                    <div class="spec-item">
                        <span class="spec-label">CPU:</span>
                        <span class="spec-value">${rec.cpu}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">GPU:</span>
                        <span class="spec-value">${rec.gpu}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">RAM:</span>
                        <span class="spec-value">${rec.ram}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">STORAGE:</span>
                        <span class="spec-value">${rec.storage}</span>
                    </div>
                </div>
                <div class="cost-section">
                    <div class="cost-amount">${rec.cost}</div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  window.deleteLaptopRecommendation = function (index) {
    if (
      confirm("Are you sure you want to delete this laptop recommendation?")
    ) {
      savedRecommendations.laptop.splice(index, 1);
      saveToLocalStorage();
      renderSavedLaptopRecommendations();
      updateSavedCount(-1);
    }
  };

  window.deletePcRecommendation = function (index) {
    if (
      confirm("Are you sure you want to delete this PC build recommendation?")
    ) {
      savedRecommendations.pc.splice(index, 1);
      saveToLocalStorage();
      renderSavedPcRecommendations();
      updateSavedCount(-1);
    }
  };

  function saveLaptopRecommendation() {
    const laptopSelection = document.getElementById("laptop-selection");
    const selectedLaptop = laptopSelection
      ? laptopSelection.options[laptopSelection.selectedIndex].text
      : "ASUS ROG Strix G15";

    const laptopSpecs = {
      "ASUS ROG Strix G15": {
        cpu: "Intel Core i7-12700H",
        gpu: "NVIDIA RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB NVMe SSD",
        store: "PC Express",
        cost: "₱89,999",
      },
      "MSI Katana GF66": {
        cpu: "Intel Core i5-12500H",
        gpu: "NVIDIA RTX 4050",
        ram: "16GB DDR5",
        storage: "512GB NVMe SSD",
        store: "Villman",
        cost: "₱64,999",
      },
      "Lenovo Legion 5": {
        cpu: "AMD Ryzen 7 6800H",
        gpu: "NVIDIA RTX 3060",
        ram: "16GB DDR5",
        storage: "1TB NVMe SSD",
        store: "PC Gilmore",
        cost: "₱79,999",
      },
      "Acer Predator Helios 300": {
        cpu: "Intel Core i7-12700H",
        gpu: "NVIDIA RTX 4060",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        store: "DynaQuest PC",
        cost: "₱99,999",
      },
      "Dell G15 Gaming Laptop": {
        cpu: "Intel Core i5-12500H",
        gpu: "NVIDIA RTX 3050",
        ram: "8GB DDR5",
        storage: "512GB NVMe SSD",
        store: "Easy PC",
        cost: "₱54,999",
      },
    };

    const specs =
      laptopSpecs[selectedLaptop] || laptopSpecs["ASUS ROG Strix G15"];

    const recommendation = {
      model: selectedLaptop,
      cpu: specs.cpu,
      gpu: specs.gpu,
      ram: specs.ram,
      storage: specs.storage,
      store: specs.store,
      cost: specs.cost,
      timestamp: new Date().toISOString(),
    };

    savedRecommendations.laptop.push(recommendation);
    saveToLocalStorage();
  }

  function savePcBuildRecommendation() {
    const cpuLabel = document.querySelector(
      "#pc-build-tool .component-item:nth-child(1) label",
    );
    const gpuLabel = document.querySelector(
      "#pc-build-tool .component-item:nth-child(2) label",
    );
    const ramLabel = document.querySelector(
      "#pc-build-tool .component-item:nth-child(3) label",
    );
    const storageLabel = document.querySelector(
      "#pc-build-tool .component-item:nth-child(4) label",
    );

    const useCase = useCaseSelect
      ? useCaseSelect.options[useCaseSelect.selectedIndex].text
      : "Gaming";
    const budget = budgetRangeSelect
      ? budgetRangeSelect.options[budgetRangeSelect.selectedIndex].text
      : "₱100,000 - ₱150,000";

    const recommendation = {
      name: `${useCase} Build - ${budget}`,
      cpu: cpuLabel
        ? cpuLabel.textContent.replace("CPU: ", "")
        : "Ryzen 7 5800X",
      gpu: gpuLabel ? gpuLabel.textContent.replace("GPU: ", "") : "RTX 4070",
      ram: ramLabel ? ramLabel.textContent.replace("RAM: ", "") : "32GB",
      storage: storageLabel
        ? storageLabel.textContent.replace("STORAGE: ", "")
        : "1TB NVMe",
      cost: budget,
      timestamp: new Date().toISOString(),
    };

    savedRecommendations.pc.push(recommendation);
    saveToLocalStorage();
  }

  function updateActiveNav() {
    let current = "";
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      if (
        section.id === "dashboard" ||
        section.id === "pc-build-tool" ||
        section.id === "laptop-tool" ||
        section.id === "saved-recommendations"
      )
        return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href === "#" && (current === "" || window.scrollY < 100)) {
        link.classList.add("active");
      } else if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  function showMainPage() {
    sections.forEach((section) => {
      section.style.display = "block";
    });

    if (dashboardSection) dashboardSection.style.display = "none";
    if (pcBuildToolSection) pcBuildToolSection.style.display = "none";
    if (laptopToolSection) laptopToolSection.style.display = "none";
    if (savedRecommendationsSection)
      savedRecommendationsSection.style.display = "none";
    if (savedLaptopSection) savedLaptopSection.style.display = "none";
    if (savedPcSection) savedPcSection.style.display = "none";

    document.querySelector(".navbar").style.display = "grid";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showDashboard() {
    sections.forEach((section) => {
      if (
        section.id !== "dashboard" &&
        section.id !== "pc-build-tool" &&
        section.id !== "laptop-tool" &&
        section.id !== "saved-recommendations"
      ) {
        section.style.display = "none";
      }
    });

    if (dashboardSection) dashboardSection.style.display = "flex";
    if (pcBuildToolSection) pcBuildToolSection.style.display = "none";
    if (laptopToolSection) laptopToolSection.style.display = "none";
    if (savedRecommendationsSection)
      savedRecommendationsSection.style.display = "none";
    if (savedLaptopSection) savedLaptopSection.style.display = "none";
    if (savedPcSection) savedPcSection.style.display = "none";

    document.querySelector(".navbar").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showPcBuildTool() {
    sections.forEach((section) => {
      if (section.id !== "pc-build-tool") {
        section.style.display = "none";
      }
    });

    if (pcBuildToolSection) pcBuildToolSection.style.display = "flex";
    document.querySelector(".navbar").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showLaptopTool() {
    sections.forEach((section) => {
      if (section.id !== "laptop-tool") {
        section.style.display = "none";
      }
    });

    if (laptopToolSection) laptopToolSection.style.display = "flex";
    document.querySelector(".navbar").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showSavedRecommendations() {
    sections.forEach((section) => {
      if (section.id !== "saved-recommendations") {
        section.style.display = "none";
      }
    });

    if (savedRecommendationsSection) {
      savedRecommendationsSection.style.display = "flex";
    }

    document.querySelector(".navbar").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initializeSavedRecommendations() {
    const categoryCards = document.querySelectorAll(".saved-category-card");
    categoryCards.forEach((card) => {
      card.addEventListener("click", function () {
        const type = this.getAttribute("data-type");

        if (type === "laptop") {
          showSavedLaptopRecommendations();
        } else if (type === "pc-build") {
          showSavedPcRecommendations();
        }
      });
    });
  }

  function updateSavedCount(change) {
    const totalSaved =
      savedRecommendations.laptop.length + savedRecommendations.pc.length;
    const savedCountElements = document.querySelectorAll(".nav-badge");
    savedCountElements.forEach((element) => {
      element.textContent = `(${totalSaved})`;
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") {
        showMainPage();

        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = heroSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        showMainPage();

        const targetSection = document.getElementById(targetId.substring(1));

        if (targetSection) {
          navLinks.forEach((item) => item.classList.remove("active"));
          this.classList.add("active");

          const navbarHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") {
        showMainPage();
      } else if (targetId === "#dashboard") {
        showDashboard();
      } else if (targetId === "#saved") {
        showSavedRecommendations();
      }

      sidebarLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  if (beginBtn) {
    beginBtn.addEventListener("click", function () {
      showDashboard();
    });
  }

  if (pcBuildStartBtn) {
    pcBuildStartBtn.addEventListener("click", function () {
      showPcBuildTool();
    });
  }

  if (laptopStartBtn) {
    laptopStartBtn.addEventListener("click", function () {
      showLaptopTool();
    });
  }

  if (recommendBuildBtn) {
    recommendBuildBtn.addEventListener("click", function () {
      const useCase = useCaseSelect ? useCaseSelect.value : "gaming";
      const budget = budgetRangeSelect ? budgetRangeSelect.value : "100000";
      generatePCRecommendations(useCase, budget);
    });
  }

  if (recommendLaptopBtn) {
    recommendLaptopBtn.addEventListener("click", function () {
      const useCase = laptopUseCaseSelect
        ? laptopUseCaseSelect.value
        : "gaming";
      const budget = laptopBudgetRangeSelect
        ? laptopBudgetRangeSelect.value
        : "75000";
      generateLaptopRecommendations(useCase, budget);
    });
  }

  newRequestBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (useCaseSelect) useCaseSelect.value = "gaming";
      if (budgetRangeSelect) budgetRangeSelect.value = "100000";
      if (laptopUseCaseSelect) laptopUseCaseSelect.value = "gaming";
      if (laptopBudgetRangeSelect) laptopBudgetRangeSelect.value = "75000";

      const checkboxes = document.querySelectorAll(
        '#pc-build-tool input[type="checkbox"]',
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    });
  });

  saveRecommendationBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isLaptopTool = this.closest("#laptop-tool");
      const isPcTool = this.closest("#pc-build-tool");

      if (isLaptopTool) {
        saveLaptopRecommendation();
      } else if (isPcTool) {
        savePcBuildRecommendation();
      }

      showDashboard();
      updateSavedCount(1);
      alert("Recommendation saved successfully!");
    });
  });

  function generatePCRecommendations(useCase, budget) {
    const recommendations = {
      gaming: {
        50000: {
          cpu: "Ryzen 5 5600X",
          gpu: "RTX 3060",
          ram: "16GB",
          storage: "512GB NVMe",
        },
        75000: {
          cpu: "Ryzen 5 7600X",
          gpu: "RTX 4060",
          ram: "16GB",
          storage: "1TB NVMe",
        },
        100000: {
          cpu: "Ryzen 7 5800X",
          gpu: "RTX 4070",
          ram: "32GB",
          storage: "1TB NVMe",
        },
        150000: {
          cpu: "Ryzen 7 7800X3D",
          gpu: "RTX 4070 Ti",
          ram: "32GB",
          storage: "2TB NVMe",
        },
        200000: {
          cpu: "Ryzen 9 7900X",
          gpu: "RTX 4080",
          ram: "64GB",
          storage: "2TB NVMe",
        },
        250000: {
          cpu: "Ryzen 9 7950X3D",
          gpu: "RTX 4090",
          ram: "64GB",
          storage: "4TB NVMe",
        },
      },
      workstation: {
        50000: {
          cpu: "Ryzen 7 5700X",
          gpu: "RTX 3060",
          ram: "32GB",
          storage: "1TB NVMe",
        },
        75000: {
          cpu: "Ryzen 7 7700X",
          gpu: "RTX 4060",
          ram: "32GB",
          storage: "1TB NVMe",
        },
        100000: {
          cpu: "Ryzen 9 5900X",
          gpu: "RTX 4070",
          ram: "64GB",
          storage: "2TB NVMe",
        },
        150000: {
          cpu: "Ryzen 9 7900X",
          gpu: "RTX 4070 Ti",
          ram: "64GB",
          storage: "2TB NVMe",
        },
        200000: {
          cpu: "Ryzen 9 7950X",
          gpu: "RTX 4080",
          ram: "128GB",
          storage: "4TB NVMe",
        },
        250000: {
          cpu: "Ryzen Threadripper",
          gpu: "RTX 4090",
          ram: "128GB",
          storage: "4TB NVMe",
        },
      },
    };

    const selectedRecommendation =
      recommendations[useCase] && recommendations[useCase][budget]
        ? recommendations[useCase][budget]
        : {
            cpu: "Ryzen 7 5800X",
            gpu: "RTX 4070",
            ram: "32GB",
            storage: "1TB NVMe",
          };

    document.querySelector(
      "#pc-build-tool .component-item:nth-child(1) label",
    ).textContent = `CPU: ${selectedRecommendation.cpu}`;
    document.querySelector(
      "#pc-build-tool .component-item:nth-child(2) label",
    ).textContent = `GPU: ${selectedRecommendation.gpu}`;
    document.querySelector(
      "#pc-build-tool .component-item:nth-child(3) label",
    ).textContent = `RAM: ${selectedRecommendation.ram}`;
    document.querySelector(
      "#pc-build-tool .component-item:nth-child(4) label",
    ).textContent = `STORAGE: ${selectedRecommendation.storage}`;
  }

  function generateLaptopRecommendations(useCase, budget) {
    const laptopSelection = document.getElementById("laptop-selection");
    if (laptopSelection) {
      updateLaptopSpecs(laptopSelection.value);
    }
  }

  const laptopSelection = document.getElementById("laptop-selection");

  function updateLaptopSpecs(laptopModel) {
    const specs = {
      "asus-rog": {
        cpu: "Intel Core i7-12700H",
        gpu: "NVIDIA RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB NVMe SSD",
        store: "PC Express",
        price: "₱89,999",
      },
      "msi-katana": {
        cpu: "Intel Core i5-12500H",
        gpu: "NVIDIA RTX 4050",
        ram: "16GB DDR5",
        storage: "512GB NVMe SSD",
        store: "Villman",
        price: "₱64,999",
      },
      "lenovo-legion": {
        cpu: "AMD Ryzen 7 6800H",
        gpu: "NVIDIA RTX 3060",
        ram: "16GB DDR5",
        storage: "1TB NVMe SSD",
        store: "PC Gilmore",
        price: "₱79,999",
      },
      "acer-predator": {
        cpu: "Intel Core i7-12700H",
        gpu: "NVIDIA RTX 4060",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        store: "DynaQuest PC",
        price: "₱99,999",
      },
      "dell-g15": {
        cpu: "Intel Core i5-12500H",
        gpu: "NVIDIA RTX 3050",
        ram: "8GB DDR5",
        storage: "512GB NVMe SSD",
        store: "Easy PC",
        price: "₱54,999",
      },
    };

    const selectedSpecs = specs[laptopModel] || specs["asus-rog"];

    const cpuValue = document.getElementById("laptop-cpu-value");
    const gpuValue = document.getElementById("laptop-gpu-value");
    const ramValue = document.getElementById("laptop-ram-value");
    const storageValue = document.getElementById("laptop-storage-value");
    const storeValue = document.getElementById("laptop-store-value");

    if (cpuValue) cpuValue.textContent = selectedSpecs.cpu;
    if (gpuValue) gpuValue.textContent = selectedSpecs.gpu;
    if (ramValue) ramValue.textContent = selectedSpecs.ram;
    if (storageValue) storageValue.textContent = selectedSpecs.storage;
    if (storeValue) storeValue.textContent = selectedSpecs.store;
  }

  if (laptopSelection) {
    laptopSelection.addEventListener("change", function () {
      updateLaptopSpecs(this.value);
    });
    updateLaptopSpecs(laptopSelection.value);
  }

  loadSavedRecommendations();

  initializeSavedRecommendations();

  const getStartedBtn = document.getElementById("getStartedBtn");
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        const targetPosition = featuresSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  const continueBtn = document.querySelector(".continue-btn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const beginSection = document.getElementById("begin");
      if (beginSection) {
        const targetPosition = beginSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
});

