// 3D Dialog Component dengan scrolling choices dan layout yang lebih rapi
AFRAME.registerComponent('npc-dialog-3d', {
  schema: { 
    npcId: { type: 'string' }, 
    distance: { type: 'number', default: 2.5 } 
  },
  
  init: function () {
    this.dialogStack = []; // Stack untuk tracking menu navigasi
    this.currentPanel = null; // Reference ke panel yang sedang aktif
    this.scrollPosition = 0; // Posisi scroll untuk choices
    this.maxVisibleChoices = 4; // Maksimal pilihan yang terlihat sekaligus
    this.currentChoices = []; // Array pilihan yang sedang aktif
    
    this.el.addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.dialogStack = []; // reset stack
      this.scrollPosition = 0; // reset scroll
      this.showDialog(this.data.npcId);
    });
    
    // Add hover effects
    this.el.addEventListener('mouseenter', this.onHover.bind(this));
    this.el.addEventListener('mouseleave', this.onLeave.bind(this));
  },
  
  onHover: function () {
    // Efek hover - ubah cursor atau highlight
    this.el.setAttribute('animation__hover', {
      property: 'scale',
      to: '1.1 1.1 1.1',
      dur: 200
    });
  },
  
  onLeave: function () {
    // Kembalikan ke ukuran normal
    this.el.setAttribute('animation__hover', {
      property: 'scale',
      to: '1 1 1',
      dur: 200
    });
  },
  
  showDialog: function (dialogId) {
    const scene = this.el.sceneEl;
    const dialog = NPC_DIALOGS[dialogId];
    if (!dialog) {
      console.error('Dialog not found:', dialogId);
      return;
    }

    // Jika panel belum ada, buat panel baru
    if (!this.currentPanel || !this.currentPanel.parentNode) {
      this.createDialogPanel();
    }

    // Reset scroll position saat dialog baru
    this.scrollPosition = 0;
    this.currentChoices = dialog.choices || [];

    // Update konten panel yang sudah ada
    this.updateDialogContent(dialog, dialogId);
    
    // Update game state
    gameState.currentDialog = dialogId;
  },

  createDialogPanel: function() {
    const scene = this.el.sceneEl;
    
    // Hapus panel lama jika ada
    const existing = scene.querySelector('#dialog-panel');
    if (existing) existing.parentNode.removeChild(existing);

    const panel = document.createElement('a-entity');
    panel.setAttribute('id', 'dialog-panel');
    panel.setAttribute('geometry', { primitive: 'plane', width: 5, height: 4 }); // Perbesar panel
    panel.setAttribute('material', { color: '#1a1a1a', opacity: 0.95 });

    // Posisi panel di depan kamera menggunakan world coordinates
    const camera = scene.querySelector('[camera]');
    const camPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(camPos);
    const camDir = new THREE.Vector3();
    camera.object3D.getWorldDirection(camDir);

    const panelPos = camPos.clone().add(camDir.multiplyScalar(this.data.distance));
    panelPos.y -= 0.2;
    panel.setAttribute('position', `${panelPos.x} ${panelPos.y} ${panelPos.z}`);

    const lookAtPos = camPos.clone();
    lookAtPos.y = panelPos.y;
    panel.object3D.lookAt(lookAtPos);

    // Border panel
    const border = document.createElement('a-plane');
    border.setAttribute('id', 'dialog-border');
    border.setAttribute('geometry', { primitive: 'plane', width: 5.1, height: 4.1 });
    border.setAttribute('material', { color: '#4CAF50', opacity: 0.8 });
    border.setAttribute('position', '0 0 -0.01');
    panel.appendChild(border);

    // Header dengan nama NPC dan tag
    const header = document.createElement('a-plane');
    header.setAttribute('id', 'dialog-header');
    header.setAttribute('geometry', { primitive: 'plane', width: 4.8, height: 0.4 });
    header.setAttribute('material', { color: '#2196F3' });
    header.setAttribute('position', '0 1.7 0.02');
    
    const title = document.createElement('a-text');
    title.setAttribute('id', 'dialog-title');
    title.setAttribute('align', 'center');
    title.setAttribute('width', 3);
    title.setAttribute('position', '0 0 0.02');
    title.setAttribute('color', 'white');
    title.setAttribute('font', 'dejavu');
    header.appendChild(title);

    // Tag dialog
    const tag = document.createElement('a-plane');
    tag.setAttribute('id', 'dialog-tag');
    tag.setAttribute('geometry', { primitive: 'plane', width: 1.2, height: 0.25 });
    tag.setAttribute('material', { color: '#FFD700', opacity: 0.9 });
    tag.setAttribute('position', '1.8 1.1 0.03'); // Turunkan lebih jauh dari 1.4 ke 1.1
    
    const tagText = document.createElement('a-text');
    tagText.setAttribute('id', 'dialog-tag-text');
    tagText.setAttribute('align', 'center');
    tagText.setAttribute('width', 2.5);
    tagText.setAttribute('position', '0 0 0.02');
    tagText.setAttribute('color', '#1a1a1a');
    tagText.setAttribute('font', 'dejavu');
    tag.appendChild(tagText);
    panel.appendChild(tag);
    
    panel.appendChild(header);

    // Dialog text area - diperbesar dan posisi disesuaikan
    const dialogArea = document.createElement('a-plane');
    dialogArea.setAttribute('id', 'dialog-text-area');
    dialogArea.setAttribute('geometry', { primitive: 'plane', width: 4.8, height: 1.2 });
    dialogArea.setAttribute('material', { color: '#f8fafc', opacity: 0.95 });
    dialogArea.setAttribute('position', '0 0.5 0.02'); // Turunkan lebih jauh dari 0.8 ke 0.5
    
    const dialogText = document.createElement('a-text');
    dialogText.setAttribute('id', 'dialog-main-text');
    dialogText.setAttribute('align', 'center');
    dialogText.setAttribute('color', '#1a1a1a');
    dialogText.setAttribute('width', 3.5);
    dialogText.setAttribute('position', '0 0 0.02');
    dialogText.setAttribute('wrap-count', 70);
    dialogText.setAttribute('line-height', 35);
    dialogArea.appendChild(dialogText);
    panel.appendChild(dialogArea);

    // Choices viewport dengan scroll - posisi disesuaikan
    const choicesViewport = document.createElement('a-plane');
    choicesViewport.setAttribute('id', 'dialog-choices-viewport');
    choicesViewport.setAttribute('geometry', { primitive: 'plane', width: 4.8, height: 1.6 });
    choicesViewport.setAttribute('material', { color: '#2a2a2a', opacity: 0.3 });
    choicesViewport.setAttribute('position', '0 -0.4 0.02'); // Turunkan lebih jauh dari -0.1 ke -0.4
    panel.appendChild(choicesViewport);

    // Choices container yang bisa di-scroll - posisi disesuaikan
    const choicesContainer = document.createElement('a-entity');
    choicesContainer.setAttribute('id', 'dialog-choices-container');
    choicesContainer.setAttribute('position', '0 0.1 0.05'); // Turunkan lebih jauh dari 0.4 ke 0.1
    choicesViewport.appendChild(choicesContainer);

    // Scroll indicators
    const scrollUpBtn = document.createElement('a-plane');
    scrollUpBtn.setAttribute('id', 'scroll-up-btn');
    scrollUpBtn.setAttribute('geometry', { primitive: 'plane', width: 0.4, height: 0.25 });
    scrollUpBtn.setAttribute('material', { color: '#6b7280' });
    scrollUpBtn.setAttribute('position', '2.2 0.1 0.05'); // Sesuaikan dengan choices container
    scrollUpBtn.classList.add('clickable');
    
    const scrollUpText = document.createElement('a-text');
    scrollUpText.setAttribute('value', '▲');
    scrollUpText.setAttribute('align', 'center');
    scrollUpText.setAttribute('color', 'white');
    scrollUpText.setAttribute('width', 4);
    scrollUpText.setAttribute('position', '0 0 0.02');
    scrollUpBtn.appendChild(scrollUpText);
    choicesViewport.appendChild(scrollUpBtn);

    const scrollDownBtn = document.createElement('a-plane');
    scrollDownBtn.setAttribute('id', 'scroll-down-btn');
    scrollDownBtn.setAttribute('geometry', { primitive: 'plane', width: 0.4, height: 0.25 });
    scrollDownBtn.setAttribute('material', { color: '#6b7280' });
    scrollDownBtn.setAttribute('position', '2.2 -1.1 0.05'); // Turunkan lebih jauh sesuai viewport
    scrollDownBtn.classList.add('clickable');
    
    const scrollDownText = document.createElement('a-text');
    scrollDownText.setAttribute('value', '▼');
    scrollDownText.setAttribute('align', 'center');
    scrollDownText.setAttribute('color', 'white');
    scrollDownText.setAttribute('width', 4);
    scrollDownText.setAttribute('position', '0 0 0.02');
    scrollDownBtn.appendChild(scrollDownText);
    choicesViewport.appendChild(scrollDownBtn);

    // Event listeners untuk scroll
    const self = this;
    scrollUpBtn.addEventListener('click', function(evt) {
      evt.stopPropagation();
      self.scrollChoices(-1);
    });

    scrollDownBtn.addEventListener('click', function(evt) {
      evt.stopPropagation();
      self.scrollChoices(1);
    });

    // Navigation buttons container
    const navContainer = document.createElement('a-entity');
    navContainer.setAttribute('id', 'dialog-nav-container');
    navContainer.setAttribute('position', '0 -1.5 0.02');
    panel.appendChild(navContainer);

    scene.appendChild(panel);
    this.currentPanel = panel;
  },

  updateDialogContent: function(dialog, dialogId) {
    // Update title
    const title = this.currentPanel.querySelector('#dialog-title');
    title.setAttribute('value', dialog.speaker);

    // Update tag
    const tagText = this.currentPanel.querySelector('#dialog-tag-text');
    if (dialog.tag) {
      tagText.setAttribute('value', dialog.tag);
      this.currentPanel.querySelector('#dialog-tag').setAttribute('visible', true);
    } else {
      this.currentPanel.querySelector('#dialog-tag').setAttribute('visible', false);
    }

    // Update main text
    const mainText = this.currentPanel.querySelector('#dialog-main-text');
    mainText.setAttribute('value', dialog.text);

    // Update choices dengan scroll
    this.updateChoicesDisplay();

    // Update navigation buttons
    this.updateNavigationButtons(dialogId);
  },

  updateChoicesDisplay: function() {
    const choicesContainer = this.currentPanel.querySelector('#dialog-choices-container');
    this.clearContainer(choicesContainer);

    if (!this.currentChoices || this.currentChoices.length === 0) {
      this.updateScrollButtons();
      return;
    }

    // Hitung range pilihan yang akan ditampilkan
    const startIndex = this.scrollPosition;
    const endIndex = Math.min(startIndex + this.maxVisibleChoices, this.currentChoices.length);
    const visibleChoices = this.currentChoices.slice(startIndex, endIndex);

    // Buat pilihan yang terlihat
    visibleChoices.forEach((choice, index) => {
      const choiceBtn = document.createElement('a-plane');
      const btnHeight = 0.3;
      const spacing = 0.35;
      const startY = ((visibleChoices.length - 1) * spacing) / 2;
      
      choiceBtn.setAttribute('geometry', { primitive: 'plane', width: 4.4, height: btnHeight });
      
      // Tentukan warna berdasarkan jenis pilihan
      let btnColor = '#3b82f6'; // default blue untuk submenu
      if (choice.response) {
        btnColor = '#10b981'; // green untuk pilihan yang ada responsenya
      }
      
      choiceBtn.setAttribute('material', { color: btnColor });
      choiceBtn.setAttribute('position', `0 ${startY - (index * spacing)} 0`);
      choiceBtn.classList.add('clickable');
      choiceBtn.setAttribute('animation__hover', 'property: scale; to: 1.02 1.02 1.02; startEvents: mouseenter; dur: 150');
      choiceBtn.setAttribute('animation__leave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 150');

      const choiceLabel = document.createElement('a-text');
      choiceLabel.setAttribute('value', choice.text);
      choiceLabel.setAttribute('align', 'center');
      choiceLabel.setAttribute('color', 'white');
      choiceLabel.setAttribute('width', 2.5);
      choiceLabel.setAttribute('wrap-count', 60);
      choiceLabel.setAttribute('line-height', 30);
      choiceLabel.setAttribute('position', '0 0 0.02');
      choiceBtn.appendChild(choiceLabel);

      const self = this;
      const originalIndex = startIndex + index; // Index asli di array choices
      const originalChoice = this.currentChoices[originalIndex];
      
      choiceBtn.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        
        if (originalChoice.submenu) {
          // Navigate to submenu - update stack and content
          self.dialogStack.push(gameState.currentDialog);
          self.showDialog(originalChoice.submenu);
        } else if (originalChoice.response) {
          // Show response - update content to response mode
          self.showResponse(originalChoice.response);
        }
        
        // Update dialog history
        self.updateDialogHistory(gameState.currentDialog, originalChoice);
      });

      choicesContainer.appendChild(choiceBtn);
    });

    // Update scroll buttons visibility
    this.updateScrollButtons();
  },

  scrollChoices: function(direction) {
    const maxScroll = Math.max(0, this.currentChoices.length - this.maxVisibleChoices);
    
    if (direction > 0) { // Scroll down
      this.scrollPosition = Math.min(this.scrollPosition + 1, maxScroll);
    } else { // Scroll up
      this.scrollPosition = Math.max(this.scrollPosition - 1, 0);
    }
    
    this.updateChoicesDisplay();
  },

  updateScrollButtons: function() {
    const scrollUpBtn = this.currentPanel.querySelector('#scroll-up-btn');
    const scrollDownBtn = this.currentPanel.querySelector('#scroll-down-btn');
    
    if (!scrollUpBtn || !scrollDownBtn) return;

    const maxScroll = Math.max(0, this.currentChoices.length - this.maxVisibleChoices);
    
    // Show/hide scroll buttons based on scroll position
    if (this.scrollPosition > 0) {
      scrollUpBtn.setAttribute('visible', true);
      scrollUpBtn.setAttribute('material', 'color', '#4CAF50');
    } else {
      scrollUpBtn.setAttribute('material', 'color', '#6b7280');
    }
    
    if (this.scrollPosition < maxScroll) {
      scrollDownBtn.setAttribute('visible', true);
      scrollDownBtn.setAttribute('material', 'color', '#4CAF50');
    } else {
      scrollDownBtn.setAttribute('material', 'color', '#6b7280');
    }

    // Hide scroll buttons if no scrolling needed
    if (this.currentChoices.length <= this.maxVisibleChoices) {
      scrollUpBtn.setAttribute('visible', false);
      scrollDownBtn.setAttribute('visible', false);
    } else {
      scrollUpBtn.setAttribute('visible', true);
      scrollDownBtn.setAttribute('visible', true);
    }
  },

  updateNavigationButtons: function(dialogId) {
    const navContainer = this.currentPanel.querySelector('#dialog-nav-container');
    this.clearContainer(navContainer);

    // Back button for submenus
    if (this.dialogStack.length > 0) {
      const backBtn = document.createElement('a-plane');
      backBtn.setAttribute('geometry', { primitive: 'plane', width: 1.8, height: 0.3 });
      backBtn.setAttribute('material', { color: '#6b7280' });
      backBtn.setAttribute('position', '-1.2 0 0');
      backBtn.classList.add('clickable');
      backBtn.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200');
      backBtn.setAttribute('animation__leave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');
      
      const backLabel = document.createElement('a-text');
      backLabel.setAttribute('value', '← Kembali');
      backLabel.setAttribute('align', 'center');
      backLabel.setAttribute('color', 'white');
      backLabel.setAttribute('width', 2.5);
      backLabel.setAttribute('position', '0 0 0.02');
      backBtn.appendChild(backLabel);

      const self = this;
      backBtn.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const previousDialog = self.dialogStack.pop();
        if (previousDialog) {
          self.showDialog(previousDialog);
        }
      });

      navContainer.appendChild(backBtn);
    }

    // Close button
    const closeBtn = document.createElement('a-plane');
    closeBtn.setAttribute('geometry', { primitive: 'plane', width: 1.2, height: 0.3 });
    closeBtn.setAttribute('material', { color: '#f44336' });
    closeBtn.setAttribute('position', '1.2 0 0');
    closeBtn.classList.add('clickable');
    closeBtn.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200');
    closeBtn.setAttribute('animation__leave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');
    
    const closeLabel = document.createElement('a-text');
    closeLabel.setAttribute('value', '✕ Tutup');
    closeLabel.setAttribute('align', 'center');
    closeLabel.setAttribute('color', 'white');
    closeLabel.setAttribute('width', 2.5);
    closeLabel.setAttribute('position', '0 0 0.02');
    closeBtn.appendChild(closeLabel);
    
    const self = this;
    closeBtn.addEventListener('click', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      self.closeDialog();
    });

    navContainer.appendChild(closeBtn);
  },

  showResponse: function(responseText) {
    // Update panel to response mode instead of creating new panel
    const mainText = this.currentPanel.querySelector('#dialog-main-text');
    mainText.setAttribute('value', responseText);

    // Hide choices and scroll buttons
    const choicesContainer = this.currentPanel.querySelector('#dialog-choices-container');
    this.clearContainer(choicesContainer);
    
    const scrollUpBtn = this.currentPanel.querySelector('#scroll-up-btn');
    const scrollDownBtn = this.currentPanel.querySelector('#scroll-down-btn');
    if (scrollUpBtn) scrollUpBtn.setAttribute('visible', false);
    if (scrollDownBtn) scrollDownBtn.setAttribute('visible', false);

    // Update navigation for response mode
    const navContainer = this.currentPanel.querySelector('#dialog-nav-container');
    this.clearContainer(navContainer);

    // Back to dialog button
    const backBtn = document.createElement('a-plane');
    backBtn.setAttribute('geometry', { primitive: 'plane', width: 2.5, height: 0.35 });
    backBtn.setAttribute('material', { color: '#1976D2' });
    backBtn.setAttribute('position', '0 0 0');
    backBtn.classList.add('clickable');
    backBtn.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200');
    backBtn.setAttribute('animation__leave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');
    
    const backLabel = document.createElement('a-text');
    backLabel.setAttribute('value', '← Kembali ke Dialog');
    backLabel.setAttribute('align', 'center');
    backLabel.setAttribute('color', 'white');
    backLabel.setAttribute('width', 2.5);
    backLabel.setAttribute('position', '0 0 0.02');
    backBtn.appendChild(backLabel);

    const self = this;
    backBtn.addEventListener('click', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      // Go back to previous dialog or main menu
      const previousDialog = self.dialogStack.length > 0 ? self.dialogStack[self.dialogStack.length - 1] : self.data.npcId;
      self.showDialog(previousDialog);
    });

    navContainer.appendChild(backBtn);

    // Auto return to dialog after 10 seconds
    setTimeout(() => {
      if (self.currentPanel && self.currentPanel.parentNode) {
        const previousDialog = self.dialogStack.length > 0 ? self.dialogStack[self.dialogStack.length - 1] : self.data.npcId;
        self.showDialog(previousDialog);
      }
    }, 10000);
  },

  updateDialogHistory: function(npcId, choice) {
    // Update dialog history
    if (!gameState.dialogHistory) {
      gameState.dialogHistory = {};
    }
    if (!gameState.dialogHistory[npcId]) {
      gameState.dialogHistory[npcId] = [];
    }
    gameState.dialogHistory[npcId].push({
      choice: choice.text,
      timestamp: Date.now(),
      submenu: choice.submenu || null,
      response: choice.response || null
    });
  },

  closeDialog: function() {
    if (this.currentPanel && this.currentPanel.parentNode) {
      this.currentPanel.parentNode.removeChild(this.currentPanel);
      this.currentPanel = null;
    }
    gameState.currentDialog = null;
    this.dialogStack = [];
    this.scrollPosition = 0;
    this.currentChoices = [];
  },

  clearContainer: function(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
});

// Komponen untuk dialog mapping (auto-fix ID mismatch)
AFRAME.registerComponent('dialog-mapper', {
  init: function () {
    // Mapping antara ID di HTML dengan ID di NPC_DIALOGS
    const dialogMapping = {
      'koordinator': 'koordinator',
      'pengamat petani lokal': 'agri_observer',
      'anak petani': 'farmer', // atau buat dialog khusus untuk anak petani
      'petani': 'farmer',
      'aktivis pengairan': 'water_activist',
      'ketua tani': 'farmer_leader',
      'kepala desa': 'village_head',
      'pemilik pabrik': 'factory_owner'
    };
    
    // Update semua NPC dengan dialog mapping yang benar
    Object.keys(dialogMapping).forEach(npcId => {
      const npcElement = document.getElementById(npcId);
      if (npcElement) {
        const dialogComponent = npcElement.getAttribute('npc-dialog-3d');
        if (dialogComponent) {
          // Update npcId di komponen dialog
          npcElement.setAttribute('npc-dialog-3d', {
            npcId: dialogMapping[npcId],
            distance: dialogComponent.distance || 2.5
          });
          console.log(`Updated NPC ${npcId} to use dialog ${dialogMapping[npcId]}`);
        }
      }
    });
  }
});

// Auto-initialize dialog mapper dan hide info dialog
document.addEventListener('DOMContentLoaded', function() {
  // Wait for A-Frame to load
  setTimeout(() => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.setAttribute('dialog-mapper', '');
    }
    
    // Hide info dialog after 5 seconds
    const infoDialog = document.getElementById('info-dialog');
    if (infoDialog) {
      setTimeout(() => {
        infoDialog.setAttribute('visible', false);
      }, 5000);
    }
  }, 1000);
});

// Global function untuk testing dialog dari console
window.testDialog = function(npcId) {
  const npc = document.getElementById('koordinator'); // use any NPC as test
  if (npc && npc.components['npc-dialog-3d']) {
    npc.components['npc-dialog-3d'].showDialog(npcId);
  }
};

// Helper function untuk scroll dengan keyboard (optional)
document.addEventListener('keydown', function(event) {
  const activePanel = document.querySelector('#dialog-panel');
  if (!activePanel) return;
  
  // Find the dialog component
  let dialogComponent = null;
  document.querySelectorAll('[npc-dialog-3d]').forEach(el => {
    if (el.components && el.components['npc-dialog-3d'] && el.components['npc-dialog-3d'].currentPanel === activePanel) {
      dialogComponent = el.components['npc-dialog-3d'];
    }
  });
  
  if (!dialogComponent) return;
  
  // Arrow keys untuk scroll
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    dialogComponent.scrollChoices(-1);
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    dialogComponent.scrollChoices(1);
  }
});