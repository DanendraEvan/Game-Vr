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
    this.isTyping = false; // Flag to prevent actions during typewriter effect

    this.isPaused = false; // flag untuk status animasi
    this.defaultScale = this.el.object3D.scale.clone(); // simpan scale awal

    this.el.addEventListener('click', (evt) => {
      if (this.isTyping) return; // Jangan mulai dialog baru jika sedang mengetik
      evt.stopPropagation();
      evt.preventDefault();

      // Pause animasi saat diklik
      if (this.el.getAttribute('animation-mixer')) {
        if (!this.isPaused) {
          this.el.setAttribute('animation-mixer', 'timeScale: 0'); // freeze
          this.isPaused = true;

          // Resume otomatis setelah 45 detik
          setTimeout(() => {
            if (this.isPaused) {
              this.el.setAttribute('animation-mixer', 'timeScale: 1');
              this.isPaused = false;
            }
          }, 45000);
        }
      }

      this.dialogStack = [];
      this.scrollOffset = 0;
      this.showDialog(this.data.npcId);
    });

    // Add hover effects
    this.el.addEventListener('mouseenter', this.onHover.bind(this));
    this.el.addEventListener('mouseleave', this.onLeave.bind(this));
  },

  onHover: function () {
    const s = this.defaultScale;
    this.el.setAttribute('animation__hover', {
      property: 'scale',
      to: `${s.x * 1.1} ${s.y * 1.1} ${s.z * 1.1}`,
      dur: 200
    });
  },

  onLeave: function () {
    const s = this.defaultScale;
    this.el.setAttribute('animation__hover', {
      property: 'scale',
      to: `${s.x} ${s.y} ${s.z}`,
      dur: 200
    });
  },

  showDialog: function (dialogId) {
    const dialog = NPC_DIALOGS[dialogId];
    if (!dialog) {
      console.error('Dialog not found:', dialogId);
      return;
    }

    if (!this.currentPanel || !this.currentPanel.parentNode) {
      this.createDialogPanel();
    }

    this.updateDialogContent(dialog, dialogId);
    gameState.currentDialog = dialogId;
  },

  typewriterEffect: function (textEl, text, callback) {
    this.isTyping = true;
    let i = 0;
    textEl.setAttribute('value', ''); // Clear text before typing
    const typing = setInterval(() => {
      if (i < text.length) {
        const currentText = textEl.getAttribute('value');
        textEl.setAttribute('value', currentText + text.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        this.isTyping = false;
        if (callback) {
          callback();
        }
      }
    }, 30); // Typing speed in milliseconds
  },

  createDialogPanel: function () {
    const scene = this.el.sceneEl;
    const existing = scene.querySelector('#dialog-panel');
    if (existing) existing.parentNode.removeChild(existing);

    const panel = document.createElement('a-entity');
    panel.setAttribute('id', 'dialog-panel');
    panel.setAttribute('geometry', { primitive: 'plane', width: 4, height: 3.5 });
    panel.setAttribute('material', { color: '#282c34', opacity: 0.92 });

    const npc = this.el;
    const camera = scene.querySelector('[camera]');
    const npcPos = new THREE.Vector3();
    npc.object3D.getWorldPosition(npcPos);
    const direction = new THREE.Vector3();
    camera.object3D.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();
    const panelPos = new THREE.Vector3();
    panelPos.copy(npcPos).add(direction.multiplyScalar(1.5));
    panelPos.y = 3;
    panel.setAttribute('position', panelPos);
    const npcRotation = this.el.object3D.rotation;
    const yRotationInDegrees = THREE.MathUtils.radToDeg(npcRotation.y);
    panel.setAttribute('rotation', `-2.3 ${yRotationInDegrees} 0`);

    const border = document.createElement('a-plane');
    border.setAttribute('id', 'dialog-border');
    border.setAttribute('geometry', { primitive: 'plane', width: 4.1, height: 3.6 });
    border.setAttribute('material', { color: '#00bcd4', opacity: 1 });
    border.setAttribute('position', '0 0 -0.01');
    panel.appendChild(border);

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
    panel.appendChild(header);

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

    const dialogArea = document.createElement('a-plane');
    dialogArea.setAttribute('id', 'dialog-text-area');
    dialogArea.setAttribute('geometry', { primitive: 'plane', width: 3.8, height: 0.6 });
    dialogArea.setAttribute('material', { color: '#e0e0e0', opacity: 1 });
    dialogArea.setAttribute('position', '0 0.9 0.02');
    const dialogText = document.createElement('a-text');
    dialogText.setAttribute('id', 'dialog-main-text');
    dialogText.setAttribute('align', 'left');
    dialogText.setAttribute('baseline', 'top');
    dialogText.setAttribute('anchor', 'left');
    dialogText.setAttribute('color', '#000000');
    dialogText.setAttribute('width', 3.6);
    dialogText.setAttribute('position', '-1.8 0.25 0.02');
    dialogText.setAttribute('wrap-count', 55);
    dialogText.setAttribute('line-height', 40);
    dialogText.setAttribute('font', 'roboto');
    dialogArea.appendChild(dialogText);
    panel.appendChild(dialogArea);

    const scrollContainer = document.createElement('a-entity');
    scrollContainer.setAttribute('id', 'dialog-scroll-container');
    scrollContainer.setAttribute('position', '0 -0.1 0.02');
    panel.appendChild(scrollContainer);

    const scrollViewport = document.createElement('a-plane');
    scrollViewport.setAttribute('id', 'dialog-scroll-viewport');
    scrollViewport.setAttribute('geometry', { primitive: 'plane', width: 3.2, height: 1.2 });
    scrollViewport.setAttribute('material', { color: '#ffffff', opacity: 0.01 });
    scrollViewport.setAttribute('position', '0 0 -0.01');
    scrollContainer.appendChild(scrollViewport);

    const choicesContainer = document.createElement('a-entity');
    choicesContainer.setAttribute('id', 'dialog-choices-container');
    choicesContainer.setAttribute('position', '0 0 0');
    scrollViewport.appendChild(choicesContainer);

    this.createScrollIndicators(panel);

    const navContainer = document.createElement('a-entity');
    navContainer.setAttribute('id', 'dialog-nav-container');
    navContainer.setAttribute('position', '0 -1.5 0.02');
    panel.appendChild(navContainer);

    scene.appendChild(panel);
    this.currentPanel = panel;
  },

  createScrollIndicators: function (panel) {
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

    panel.appendChild(scrollUpBtn);
    panel.appendChild(scrollDownBtn);

    scrollUpBtn.addEventListener('click', (evt) => {
      if (this.isTyping) return;
      evt.stopPropagation();
      this.scrollUp();
    });
    scrollDownBtn.addEventListener('click', (evt) => {
      if (this.isTyping) return;
      evt.stopPropagation();
      this.scrollDown();
    });
  },

  updateDialogContent: function (dialog, dialogId) {
    this.scrollOffset = 0;
    const title = this.currentPanel.querySelector('#dialog-title');
    title.setAttribute('value', dialog.speaker);

    const tagText = this.currentPanel.querySelector('#dialog-tag-text');
    if (dialog.tag) {
      tagText.setAttribute('value', dialog.tag);
      this.currentPanel.querySelector('#dialog-tag').setAttribute('visible', true);
    } else {
      this.currentPanel.querySelector('#dialog-tag').setAttribute('visible', false);
    }

    const mainText = this.currentPanel.querySelector('#dialog-main-text');
    this.currentChoices = dialog.choices || [];

    const choicesContainer = this.currentPanel.querySelector('#dialog-choices-container');
    this.clearContainer(choicesContainer);
    this.updateScrollIndicators();

    this.typewriterEffect(mainText, dialog.text, () => {
      this.updateChoicesDisplay(dialogId);
      this.updateScrollIndicators();
      this.updateNavigationButtons(dialogId);
    });
  },

  // --- MODIFICATION: Update choice button design ---
  updateChoicesDisplay: function (dialogId) {
    if (this.isTyping) return;
    const choicesContainer = this.currentPanel.querySelector('#dialog-choices-container');
    this.clearContainer(choicesContainer);

    if (this.currentChoices.length === 0) return;

    const startIndex = this.scrollOffset;
    const endIndex = Math.min(startIndex + this.maxVisibleChoices, this.currentChoices.length);
    const visibleChoices = this.currentChoices.slice(startIndex, endIndex);

    visibleChoices.forEach((choice, displayIndex) => {
      const choiceBtn = document.createElement('a-plane');
      const btnHeight = 0.3;
      const spacing = 0.35;
      const startY = ((this.maxVisibleChoices - 1) * spacing) / 2;
      
      choiceBtn.setAttribute('geometry', { primitive: 'plane', width: 3.0, height: btnHeight });
      choiceBtn.setAttribute('material', { color: '#444444', opacity: 0.85 });
      choiceBtn.setAttribute('position', `0 ${startY - (displayIndex * spacing)} 0`);
      choiceBtn.classList.add('clickable');

      // Animations for hover effect
      choiceBtn.setAttribute('animation__scale_in', 'property: scale; to: 1.03 1.03 1.03; startEvents: mouseenter; dur: 200');
      choiceBtn.setAttribute('animation__scale_out', 'property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200');
      choiceBtn.setAttribute('animation__color_in', 'property: material.color; to: #666666; startEvents: mouseenter; dur: 200');
      choiceBtn.setAttribute('animation__color_out', 'property: material.color; to: #444444; startEvents: mouseleave; dur: 200');

      const choiceLabel = document.createElement('a-text');
      choiceLabel.setAttribute('value', choice.text); // Removed numbering
      choiceLabel.setAttribute('align', 'left'); // Left-align text
      choiceLabel.setAttribute('anchor', 'left');
      choiceLabel.setAttribute('color', 'white');
      choiceLabel.setAttribute('width', 2.8); // Adjust width for padding
      choiceLabel.setAttribute('wrap-count', 45);
      choiceLabel.setAttribute('position', '-1.4 0 0.02'); // Add left padding
      choiceLabel.setAttribute('font', 'roboto');
      choiceBtn.appendChild(choiceLabel);

      choiceBtn.addEventListener('click', (evt) => {
        if (this.isTyping) return;
        evt.stopPropagation();
        evt.preventDefault();
        if (choice.submenu) {
          this.dialogStack.push(dialogId);
          this.showDialog(choice.submenu);
        } else if (choice.response) {
          this.showResponse(choice.response);
        }
        this.updateDialogHistory(dialogId, choice);
      });
      choicesContainer.appendChild(choiceBtn);
    });
  },

  scrollUp: function () {
    if (this.scrollOffset > 0) {
      this.scrollOffset--;
      this.updateChoicesDisplay(gameState.currentDialog);
      this.updateScrollIndicators();
    }
  },

  scrollDown: function () {
    const maxOffset = Math.max(0, this.currentChoices.length - this.maxVisibleChoices);
    if (this.scrollOffset < maxOffset) {
      this.scrollOffset++;
      this.updateChoicesDisplay(gameState.currentDialog);
      this.updateScrollIndicators();
    }
  },

  updateScrollIndicators: function () {
    const scrollUpBtn = this.currentPanel.querySelector('#scroll-up-btn');
    const scrollDownBtn = this.currentPanel.querySelector('#scroll-down-btn');
    if (!scrollUpBtn || !scrollDownBtn) return;

    const hasScroll = this.currentChoices.length > this.maxVisibleChoices;
    scrollUpBtn.setAttribute('visible', hasScroll && !this.isTyping);
    scrollDownBtn.setAttribute('visible', hasScroll && !this.isTyping);

    if (hasScroll) {
      const canScrollUp = this.scrollOffset > 0;
      const canScrollDown = this.scrollOffset < Math.max(0, this.currentChoices.length - this.maxVisibleChoices);
      scrollUpBtn.setAttribute('material', { color: canScrollUp ? '#607D8B' : '#BDBDBD', opacity: canScrollUp ? 0.8 : 0.4 });
      scrollDownBtn.setAttribute('material', { color: canScrollDown ? '#607D8B' : '#BDBDBD', opacity: canScrollDown ? 0.8 : 0.4 });
    }
    this.updateChoiceCounter();
  },

  updateChoiceCounter: function () {
    let counter = this.currentPanel.querySelector('#choice-counter');
    if (!counter) {
      counter = document.createElement('a-text');
      counter.setAttribute('id', 'choice-counter');
      counter.setAttribute('align', 'center');
      counter.setAttribute('color', '#666666');
      counter.setAttribute('width', 2);
      counter.setAttribute('position', '0 -1.2 0.02');
      this.currentPanel.appendChild(counter);
    }
    if (this.currentChoices.length > this.maxVisibleChoices && !this.isTyping) {
      const start = this.scrollOffset + 1;
      const end = Math.min(this.scrollOffset + this.maxVisibleChoices, this.currentChoices.length);
      counter.setAttribute('value', `Menampilkan ${start}-${end} dari ${this.currentChoices.length} pilihan`);
      counter.setAttribute('visible', true);
    } else {
      counter.setAttribute('visible', false);
    }
  },

  updateNavigationButtons: function (dialogId) {
    const navContainer = this.currentPanel.querySelector('#dialog-nav-container');
    this.clearContainer(navContainer);

    if (this.isTyping) return;

    if (this.dialogStack.length > 0) {
      const backBtn = document.createElement('a-plane');
      backBtn.setAttribute('geometry', { primitive: 'plane', width: 1.5, height: 0.25 });
      backBtn.setAttribute('material', { color: '#ff9800' });
      backBtn.setAttribute('position', '-1 0 0');
      backBtn.classList.add('clickable');
      const backLabel = document.createElement('a-text');
      backLabel.setAttribute('value', '← Kembali');
      backLabel.setAttribute('align', 'center');
      backLabel.setAttribute('color', 'white');
      backLabel.setAttribute('width', 2.5);
      backLabel.setAttribute('position', '0 0 0.02');
      backBtn.appendChild(backLabel);
      backBtn.addEventListener('click', (evt) => {
        if (this.isTyping) return;
        evt.stopPropagation();
        const previousDialog = this.dialogStack.pop();
        if (previousDialog) {
          this.showDialog(previousDialog);
        }
      });
      navContainer.appendChild(backBtn);
    }

    const closeBtn = document.createElement('a-plane');
    closeBtn.setAttribute('geometry', { primitive: 'plane', width: 1, height: 0.25 });
    closeBtn.setAttribute('material', { color: '#e91e63' });
    closeBtn.setAttribute('position', '1 0 0');
    closeBtn.classList.add('clickable');
    const closeLabel = document.createElement('a-text');
    closeLabel.setAttribute('value', '✕ Tutup');
    closeLabel.setAttribute('align', 'center');
    closeLabel.setAttribute('color', 'white');
    closeLabel.setAttribute('width', 2);
    closeLabel.setAttribute('position', '0 0 0.02');
    closeBtn.appendChild(closeLabel);
    closeBtn.addEventListener('click', (evt) => {
      if (this.isTyping) return;
      evt.stopPropagation();
      this.closeDialog();
    });
    navContainer.appendChild(closeBtn);
  },

  showResponse: function (responseText) {
    const mainText = this.currentPanel.querySelector('#dialog-main-text');
    this.currentChoices = [];
    this.updateChoicesDisplay('');
    this.updateScrollIndicators();

    const navContainer = this.currentPanel.querySelector('#dialog-nav-container');
    this.clearContainer(navContainer);

    this.typewriterEffect(mainText, responseText, () => {
      const backBtn = document.createElement('a-plane');
      backBtn.setAttribute('geometry', { primitive: 'plane', width: 2, height: 0.3 });
      backBtn.setAttribute('material', { color: '#1976D2' });
      backBtn.setAttribute('position', '0 0 0');
      backBtn.classList.add('clickable');
      const backLabel = document.createElement('a-text');
      backLabel.setAttribute('value', '← Kembali ke Dialog');
      backLabel.setAttribute('align', 'center');
      backLabel.setAttribute('color', 'white');
      backLabel.setAttribute('width', 2.5);
      backLabel.setAttribute('position', '0 0 0.02');
      backBtn.appendChild(backLabel);

      backBtn.addEventListener('click', (evt) => {
        if (this.isTyping) return;
        evt.stopPropagation();
        const previousDialog = this.dialogStack.length > 0 ? this.dialogStack[this.dialogStack.length - 1] : this.data.npcId;
        this.showDialog(previousDialog);
      });
      navContainer.appendChild(backBtn);
    });
  },

  updateDialogHistory: function (npcId, choice) {
    if (!gameState.dialogHistory) gameState.dialogHistory = {};
    if (!gameState.dialogHistory[npcId]) gameState.dialogHistory[npcId] = [];
    gameState.dialogHistory[npcId].push({
      choice: choice.text,
      timestamp: Date.now(),
      submenu: choice.submenu || null,
      response: choice.response || null
    });
  },

  closeDialog: function () {
    if (this.currentPanel && this.currentPanel.parentNode) {
      this.currentPanel.parentNode.removeChild(this.currentPanel);
      this.currentPanel = null;
    }
    if (this.isPaused) {
      this.el.setAttribute('animation-mixer', 'timeScale: 1');
      this.isPaused = false;
    }
    gameState.currentDialog = null;
    this.dialogStack = [];
    this.currentChoices = [];
    this.scrollOffset = 0;
  },

  clearContainer: function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
});

// Komponen untuk dialog mapping (auto-fix ID mismatch)
AFRAME.registerComponent('dialog-mapper', {
  init: function () {
    const dialogMapping = {
      'koordinator': 'koordinator',
      'kepala desa': 'kepala_desa',
      'petani': 'petani_senior',
      'pengamat petani lokal': 'pengamat_pertanian',
      'aktivis pengairan': 'aktivis_perairan',
      'ketua tani': 'ketua_tani',
      'pemilik pabrik': 'bu_anita'
    };
    Object.keys(dialogMapping).forEach(npcId => {
      const npcElement = document.getElementById(npcId);
      if (npcElement) {
        const dialogComponent = npcElement.getAttribute('npc-dialog-3d');
        if (dialogComponent) {
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

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.setAttribute('dialog-mapper', '');
    }
    const infoDialog = document.getElementById('info-dialog');
    if (infoDialog) {
      setTimeout(() => {
        infoDialog.setAttribute('visible', false);
      }, 5000);
    }
  }, 1000);
});

window.testDialog = function (npcId) {
  const npc = document.getElementById('koordinator');
  if (npc && npc.components['npc-dialog-3d']) {
    npc.components['npc-dialog-3d'].showDialog(npcId);
  }
};

document.addEventListener('keydown', function (event) {
  const activeDialog = document.querySelector('#dialog-panel');
  if (activeDialog) {
    const npc = document.querySelector('[npc-dialog-3d]');
    const component = npc && npc.components['npc-dialog-3d'];
    if (component && !component.isTyping) {
      switch (event.key) {
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
