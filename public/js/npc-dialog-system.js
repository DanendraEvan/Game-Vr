// 3D Dialog Component dengan scroll untuk choices yang banyak
AFRAME.registerComponent('npc-dialog-3d', {
  schema: { 
    npcId: { type: 'string' }, 
    distance: { type: 'number', default: 2.5 } 
  },
  
  init: function () {
    this.dialogStack = []; // Stack untuk tracking menu navigasi
    this.currentPanel = null; // Reference ke panel yang sedang aktif
    this.currentChoices = []; // Store current choices for scrolling
    this.scrollOffset = 0; // Current scroll position
    this.maxVisibleChoices = 4; // Maximum choices visible at once
    
    this.el.addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.dialogStack = []; // reset stack
      this.scrollOffset = 0; // reset scroll
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
    panel.setAttribute('geometry', { primitive: 'plane', width: 4, height: 3.5 });
    panel.setAttribute('material', { color: '#282c34', opacity: 0.92 });

    // Dapatkan posisi NPC dan kamera
    const npc = this.el;
    const camera = scene.querySelector('[camera]');
    
    // Hitung posisi di depan NPC (1.5 meter di depan)
    const npcPos = new THREE.Vector3();
    npc.object3D.getWorldPosition(npcPos);
    
    const direction = new THREE.Vector3();
    camera.object3D.getWorldDirection(direction); // Arah kamera
    direction.y = 0; // Abaikan komponen vertikal
    direction.normalize();
    
    const panelPos = new THREE.Vector3();
    panelPos.copy(npcPos).add(direction.multiplyScalar(1.5));
    panelPos.y = 3; // Tinggi panel 2 meter dari tanah
    panel.setAttribute('position', panelPos);
    
    // Atur rotasi agar menghadap ke depan relatif terhadap NPC
    const npcRotation = this.el.object3D.rotation;
    const yRotationInDegrees = THREE.MathUtils.radToDeg(npcRotation.y);
    panel.setAttribute('rotation', `-2.3 ${yRotationInDegrees} 0`); // Menjaga kemiringan X, menyesuaikan rotasi Y

    // Border panel
    const border = document.createElement('a-plane');
    border.setAttribute('id', 'dialog-border');
    border.setAttribute('geometry', { primitive: 'plane', width: 4.1, height: 3.6 });
    border.setAttribute('material', { color: '#00bcd4', opacity: 1 });
    border.setAttribute('position', '0 0 -0.01');
    panel.appendChild(border);

    // Header dengan nama NPC dan tag
    const header = document.createElement('a-plane');
    header.setAttribute('id', 'dialog-header');
    header.setAttribute('geometry', { primitive: 'plane', width: 3.8, height: 0.4 });
    header.setAttribute('material', { color: '#323842' });
    header.setAttribute('position', '0 1.5 0.02');
    
    const title = document.createElement('a-text');
    title.setAttribute('id', 'dialog-title');
    title.setAttribute('align', 'center');
    title.setAttribute('width', 3);
    title.setAttribute('position', '0 0 0.02');
    title.setAttribute('color', 'white');
    title.setAttribute('font', 'roboto');
    header.appendChild(title);

    // Tag dialog
    const tag = document.createElement('a-plane');
    tag.setAttribute('id', 'dialog-tag');
    tag.setAttribute('geometry', { primitive: 'plane', width: 1, height: 0.2 });
    tag.setAttribute('material', { color: '#ffc107', opacity: 1 });
    tag.setAttribute('position', '1.4 1.5 0.03');
    
    const tagText = document.createElement('a-text');
    tagText.setAttribute('id', 'dialog-tag-text');
    tagText.setAttribute('align', 'center');
    tagText.setAttribute('width', 2.5);
    tagText.setAttribute('position', '0 0 0.02');
    tagText.setAttribute('color', '#1a1a1a');
    tagText.setAttribute('font', 'roboto');
    tag.appendChild(tagText);
    panel.appendChild(tag);
    
    panel.appendChild(header);

    // Dialog text area
    const dialogArea = document.createElement('a-plane');
    dialogArea.setAttribute('id', 'dialog-text-area');
    dialogArea.setAttribute('geometry', { primitive: 'plane', width: 3.8, height: 0.6 });
    dialogArea.setAttribute('material', { color: '#e0e0e0', opacity: 1 });
    dialogArea.setAttribute('position', '0 0.9 0.02');
    
    const dialogText = document.createElement('a-text');
    dialogText.setAttribute('id', 'dialog-main-text');
    dialogText.setAttribute('align', 'center');
    dialogText.setAttribute('color', '#000000');
    dialogText.setAttribute('width', 3.2);
    dialogText.setAttribute('position', '0 0 0.02');
    dialogText.setAttribute('wrap-count', 60);
    dialogText.setAttribute('line-height', 30);
    dialogText.setAttribute('font', 'roboto');
    dialogArea.appendChild(dialogText);
    panel.appendChild(dialogArea);

    // Scroll container untuk choices
    const scrollContainer = document.createElement('a-entity');
    scrollContainer.setAttribute('id', 'dialog-scroll-container');
    scrollContainer.setAttribute('position', '0 -0.1 0.02');
    panel.appendChild(scrollContainer);

    // Scroll viewport (clipping area)
    const scrollViewport = document.createElement('a-plane');
    scrollViewport.setAttribute('id', 'dialog-scroll-viewport');
    scrollViewport.setAttribute('geometry', { primitive: 'plane', width: 3.2, height: 1.2 });
    scrollViewport.setAttribute('material', { color: '#ffffff', opacity: 0.01 }); // Almost transparent
    scrollViewport.setAttribute('position', '0 0 -0.01');
    scrollContainer.appendChild(scrollViewport);

    // Choices container (will be scrolled)
    const choicesContainer = document.createElement('a-entity');
    choicesContainer.setAttribute('id', 'dialog-choices-container');
    choicesContainer.setAttribute('position', '0 0 0');
    scrollViewport.appendChild(choicesContainer);

    // Scroll indicators
    this.createScrollIndicators(panel);

    // Navigation buttons container
    const navContainer = document.createElement('a-entity');
    navContainer.setAttribute('id', 'dialog-nav-container');
    navContainer.setAttribute('position', '0 -1.5 0.02');
    panel.appendChild(navContainer);

    scene.appendChild(panel);
    this.currentPanel = panel;
  },

  createScrollIndicators: function(panel) {
    // Scroll up button
    const scrollUpBtn = document.createElement('a-plane');
    scrollUpBtn.setAttribute('id', 'scroll-up-btn');
    scrollUpBtn.setAttribute('geometry', { primitive: 'plane', width: 0.8, height: 0.3 });
    scrollUpBtn.setAttribute('material', { color: '#607D8B', opacity: 0.8 });
    scrollUpBtn.setAttribute('position', '-1 -1.0 0.03');
    scrollUpBtn.classList.add('clickable');
    
    const upArrow = document.createElement('a-text');
    upArrow.setAttribute('value', 'Prev');
    upArrow.setAttribute('align', 'center');
    upArrow.setAttribute('color', 'white');
    upArrow.setAttribute('width', 4);
    upArrow.setAttribute('position', '0 0 0.02');
    scrollUpBtn.appendChild(upArrow);

    // Scroll down button
    const scrollDownBtn = document.createElement('a-plane');
    scrollDownBtn.setAttribute('id', 'scroll-down-btn');
    scrollDownBtn.setAttribute('geometry', { primitive: 'plane', width: 0.8, height: 0.3 });
    scrollDownBtn.setAttribute('material', { color: '#607D8B', opacity: 0.8 });
    scrollDownBtn.setAttribute('position', '1 -1.0 0.03');
    scrollDownBtn.classList.add('clickable');
    
    const downArrow = document.createElement('a-text');
    downArrow.setAttribute('value', 'Next');
    downArrow.setAttribute('align', 'center');
    downArrow.setAttribute('color', 'white');
    downArrow.setAttribute('width', 4);
    downArrow.setAttribute('position', '0 0 0.02');
    scrollDownBtn.appendChild(downArrow);

    // Scroll indicator (shows current position)
    const scrollIndicator = document.createElement('a-plane');
    scrollIndicator.setAttribute('id', 'scroll-indicator');
    scrollIndicator.setAttribute('geometry', { primitive: 'plane', width: 1, height: 0.1 });
    scrollIndicator.setAttribute('material', { color: '#9E9E9E', opacity: 0.3 });
    scrollIndicator.setAttribute('position', '0 -1.0 0.02');
    
    const scrollThumb = document.createElement('a-plane');
    scrollThumb.setAttribute('id', 'scroll-thumb');
    scrollThumb.setAttribute('geometry', { primitive: 'plane', width: 0.1, height: 0.1 });
    scrollThumb.setAttribute('material', { color: '#4CAF50', opacity: 0.8 });
    scrollThumb.setAttribute('position', '-0.45 0 0.02');
    scrollIndicator.appendChild(scrollThumb);

    panel.appendChild(scrollUpBtn);
    panel.appendChild(scrollDownBtn);
    panel.appendChild(scrollIndicator);

    // Add scroll event listeners
    const self = this;
    scrollUpBtn.addEventListener('click', function(evt) {
      evt.stopPropagation();
      self.scrollUp();
    });

    scrollDownBtn.addEventListener('click', function(evt) {
      evt.stopPropagation();
      self.scrollDown();
    });
  },

  updateDialogContent: function(dialog, dialogId) {
    // Reset scroll offset
    this.scrollOffset = 0;
    
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

    // Store choices and update display
    this.currentChoices = dialog.choices || [];
    this.updateChoicesDisplay(dialogId);

    // Update navigation buttons
    this.updateNavigationButtons(dialogId);
    
    // Update scroll indicators
    this.updateScrollIndicators();
  },

  updateChoicesDisplay: function(dialogId) {
    const choicesContainer = this.currentPanel.querySelector('#dialog-choices-container');
    this.clearContainer(choicesContainer);

    if (this.currentChoices.length === 0) return;

    // Calculate visible choices
    const startIndex = this.scrollOffset;
    const endIndex = Math.min(startIndex + this.maxVisibleChoices, this.currentChoices.length);
    const visibleChoices = this.currentChoices.slice(startIndex, endIndex);

    visibleChoices.forEach((choice, displayIndex) => {
      const actualIndex = startIndex + displayIndex;
      const choiceBtn = document.createElement('a-plane');
      const btnHeight = 0.3;
      const spacing = 0.35;
      const startY = ((this.maxVisibleChoices - 1) * spacing) / 2;
      
      choiceBtn.setAttribute('geometry', { primitive: 'plane', width: 3.0, height: btnHeight });
      
      // Tentukan warna berdasarkan jenis pilihan
      let btnColor = '#673ab7'; // New purple for submenu
      if (choice.response) {
        btnColor = '#009688'; // New teal for response
      }
      
      choiceBtn.setAttribute('material', { color: btnColor, side: 'double' });
      choiceBtn.setAttribute('position', `0 ${startY - (displayIndex * spacing)} 0`);
      choiceBtn.classList.add('clickable');
      choiceBtn.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200');
      choiceBtn.setAttribute('animation__leave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');

      const choiceLabel = document.createElement('a-text');
      choiceLabel.setAttribute('value', `${actualIndex + 1}. ${choice.text}`);
      choiceLabel.setAttribute('align', 'center');
      choiceLabel.setAttribute('color', 'white');
      choiceLabel.setAttribute('width', 2.4);
      choiceLabel.setAttribute('wrap-count', 40);
      choiceLabel.setAttribute('position', '0 0 0.02');
      choiceLabel.setAttribute('font', 'roboto');
      choiceBtn.appendChild(choiceLabel);

      const self = this;
      choiceBtn.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        
        if (choice.submenu) {
          // Navigate to submenu - update stack and content
          self.dialogStack.push(dialogId);
          self.showDialog(choice.submenu);
        } else if (choice.response) {
          // Show response - update content to response mode
          self.showResponse(choice.response);
        }
        
        // Update dialog history
        self.updateDialogHistory(dialogId, choice);
      });

      choicesContainer.appendChild(choiceBtn);
    });
  },

  scrollUp: function() {
    if (this.scrollOffset > 0) {
      this.scrollOffset--;
      this.updateChoicesDisplay(gameState.currentDialog);
      this.updateScrollIndicators();
    }
  },

  scrollDown: function() {
    const maxOffset = Math.max(0, this.currentChoices.length - this.maxVisibleChoices);
    if (this.scrollOffset < maxOffset) {
      this.scrollOffset++;
      this.updateChoicesDisplay(gameState.currentDialog);
      this.updateScrollIndicators();
    }
  },

  updateScrollIndicators: function() {
    const scrollUpBtn = this.currentPanel.querySelector('#scroll-up-btn');
    const scrollDownBtn = this.currentPanel.querySelector('#scroll-down-btn');
    const scrollThumb = this.currentPanel.querySelector('#scroll-thumb');
    const scrollIndicator = this.currentPanel.querySelector('#scroll-indicator');

    if (!scrollUpBtn || !scrollDownBtn || !scrollThumb || !scrollIndicator) return;

    // Show/hide scroll buttons
    const canScrollUp = this.scrollOffset > 0;
    const canScrollDown = this.scrollOffset < Math.max(0, this.currentChoices.length - this.maxVisibleChoices);
    const hasScroll = this.currentChoices.length > this.maxVisibleChoices;

    scrollUpBtn.setAttribute('visible', hasScroll);
    scrollDownBtn.setAttribute('visible', hasScroll);
    scrollIndicator.setAttribute('visible', hasScroll);
    
    scrollUpBtn.setAttribute('material', { 
      color: canScrollUp ? '#607D8B' : '#BDBDBD', 
      opacity: canScrollUp ? 0.8 : 0.4 
    });
    scrollDownBtn.setAttribute('material', { 
      color: canScrollDown ? '#607D8B' : '#BDBDBD', 
      opacity: canScrollDown ? 0.8 : 0.4 
    });

    // Update scroll thumb position
    if (hasScroll && this.currentChoices.length > 0) {
      const progress = this.scrollOffset / Math.max(1, this.currentChoices.length - this.maxVisibleChoices);
      const thumbX = -0.45 + (progress * 0.9); // Range from -0.45 to 0.45
      scrollThumb.setAttribute('position', `${thumbX} 0 0.02`);
    }

    // Show choice counter
    this.updateChoiceCounter();
  },

  updateChoiceCounter: function() {
    let counter = this.currentPanel.querySelector('#choice-counter');
    if (!counter && this.currentChoices.length > this.maxVisibleChoices) {
      counter = document.createElement('a-text');
      counter.setAttribute('id', 'choice-counter');
      counter.setAttribute('align', 'center');
      counter.setAttribute('color', '#666666');
      counter.setAttribute('width', 2);
      counter.setAttribute('position', '0 -1.2 0.02');
      this.currentPanel.appendChild(counter);
    }

    if (counter) {
      if (this.currentChoices.length > this.maxVisibleChoices) {
        const start = this.scrollOffset + 1;
        const end = Math.min(this.scrollOffset + this.maxVisibleChoices, this.currentChoices.length);
        counter.setAttribute('value', `Menampilkan ${start}-${end} dari ${this.currentChoices.length} pilihan`);
        counter.setAttribute('visible', true);
      } else {
        counter.setAttribute('visible', false);
      }
    }
  },

  updateNavigationButtons: function(dialogId) {
    const navContainer = this.currentPanel.querySelector('#dialog-nav-container');
    this.clearContainer(navContainer);

    // Back button for submenus
    if (this.dialogStack.length > 0) {
      const backBtn = document.createElement('a-plane');
      backBtn.setAttribute('geometry', { primitive: 'plane', width: 1.5, height: 0.25 });
      backBtn.setAttribute('material', { color: '#ff9800' });
      backBtn.setAttribute('position', '-1 0 0');
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
    closeBtn.setAttribute('geometry', { primitive: 'plane', width: 1, height: 0.25 });
    closeBtn.setAttribute('material', { color: '#e91e63' });
    closeBtn.setAttribute('position', '1 0 0');
    closeBtn.classList.add('clickable');
    closeBtn.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200');
    closeBtn.setAttribute('animation__leave', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');
    
    const closeLabel = document.createElement('a-text');
    closeLabel.setAttribute('value', '✕ Tutup');
    closeLabel.setAttribute('align', 'center');
    closeLabel.setAttribute('color', 'white');
    closeLabel.setAttribute('width', 2);
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

    // Clear choices and hide scroll indicators
    this.currentChoices = [];
    this.updateChoicesDisplay('');
    this.updateScrollIndicators();

    // Update navigation for response mode
    const navContainer = this.currentPanel.querySelector('#dialog-nav-container');
    this.clearContainer(navContainer);

    // Back to dialog button
    const backBtn = document.createElement('a-plane');
    backBtn.setAttribute('geometry', { primitive: 'plane', width: 2, height: 0.3 });
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

    // Auto return to dialog after 20 seconds
    setTimeout(() => {
      if (self.currentPanel && self.currentPanel.parentNode) {
        const previousDialog = self.dialogStack.length > 0 ? self.dialogStack[self.dialogStack.length - 1] : self.data.npcId;
        self.showDialog(previousDialog);
      }
    }, 20000);
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
    this.currentChoices = [];
    this.scrollOffset = 0;
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
            distance: dialogComponent.distance || 2
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

// Keyboard controls untuk scroll (optional)
document.addEventListener('keydown', function(event) {
  const activeDialog = document.querySelector('#dialog-panel');
  if (activeDialog) {
    const npc = document.querySelector('[npc-dialog-3d]');
    const component = npc && npc.components['npc-dialog-3d'];
    
    if (component) {
      switch(event.key) {
        case 'ArrowUp':
          event.preventDefault();
          component.scrollUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          component.scrollDown();
          break;
        case 'Escape':
          event.preventDefault();
          component.closeDialog();
          break;
      }
    }
  }
});