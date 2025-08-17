// Global state
let gameState = {
  currentDialog: null,
  dialogHistory: [],
  vrMode: false,
  currentNPC: null
};

// Komponen utama untuk dialog NPC
AFRAME.registerComponent('npc-dialog-3d', {
  schema: {
    npcId: { type: 'string' }
  },

  init: function () {
    this.el.addEventListener('click', this.onNPCClick.bind(this));
    this.dialogPanel = null;
    this.isDialogOpen = false;
  },

  onNPCClick: function (evt) {
    console.log('NPC clicked:', this.data.npcId);
    
    // Mencegah multiple clicks
    if (this.isDialogOpen) return;
    
    this.openDialog(this.data.npcId);
  },

  openDialog: function (npcId) {
    // Mapping NPC ID ke dialog key
    const npcMapping = {
      'koordinator': 'koordinator',
      'petani': 'farmer',
      'kepala desa': 'village_head',
      'ketua tani': 'farmer_leader',
      'aktivis pengairan': 'water_activist',
      'pengamat petani lokal': 'agri_observer'
    };

    const dialogKey = npcMapping[npcId] || npcId;
    const dialogData = NPC_DIALOGS[dialogKey];

    if (!dialogData) {
      console.warn('Dialog not found for NPC:', npcId);
      return;
    }

    gameState.currentNPC = npcId;
    gameState.currentDialog = dialogKey;
    
    this.createDialogPanel(dialogData);
    this.isDialogOpen = true;
  },

  createDialogPanel: function (dialogData) {
    // Hapus dialog yang ada
    if (this.dialogPanel) {
      this.dialogPanel.parentNode.removeChild(this.dialogPanel);
    }

    // Buat container dialog
    this.dialogPanel = document.createElement('a-entity');
    this.dialogPanel.setAttribute('id', 'dialog-panel');
    
    // Posisi dialog di depan player
    const camera = document.querySelector('#player');
    const cameraPos = camera.object3D.position;
    const cameraRot = camera.object3D.rotation;
    
    // Kalkulasi posisi dialog
    const dialogDistance = 3;
    const dialogPos = {
      x: cameraPos.x + Math.sin(cameraRot.y) * dialogDistance,
      y: cameraPos.y,
      z: cameraPos.z - Math.cos(cameraRot.y) * dialogDistance
    };

    this.dialogPanel.setAttribute('position', `${dialogPos.x} ${dialogPos.y} ${dialogPos.z}`);
    this.dialogPanel.setAttribute('look-at', '#player');

    // Background panel
    const background = document.createElement('a-plane');
    background.setAttribute('width', '6');
    background.setAttribute('height', '4');
    background.setAttribute('color', '#1a1a1a');
    background.setAttribute('opacity', '0.9');
    background.setAttribute('material', 'shader: flat');
    this.dialogPanel.appendChild(background);

    // Speaker name
    const speakerText = document.createElement('a-text');
    speakerText.setAttribute('value', dialogData.speaker);
    speakerText.setAttribute('position', '0 1.5 0.01');
    speakerText.setAttribute('align', 'center');
    speakerText.setAttribute('color', '#FFD700');
    speakerText.setAttribute('width', '8');
    this.dialogPanel.appendChild(speakerText);

    // Dialog text
    const dialogText = document.createElement('a-text');
    dialogText.setAttribute('value', dialogData.text);
    dialogText.setAttribute('position', '0 0.5 0.01');
    dialogText.setAttribute('align', 'center');
    dialogText.setAttribute('color', '#FFFFFF');
    dialogText.setAttribute('width', '5');
    dialogText.setAttribute('wrap-count', '60');
    this.dialogPanel.appendChild(dialogText);

    // Choices
    if (dialogData.choices && dialogData.choices.length > 0) {
      dialogData.choices.forEach((choice, index) => {
        const choiceButton = this.createChoiceButton(choice, index, dialogData.choices.length);
        this.dialogPanel.appendChild(choiceButton);
      });
    }

    // Close button
    const closeButton = this.createCloseButton();
    this.dialogPanel.appendChild(closeButton);

    // Tambahkan ke scene
    document.querySelector('#scene').appendChild(this.dialogPanel);
  },

  createChoiceButton: function (choice, index, totalChoices) {
    const button = document.createElement('a-entity');
    
    // Posisi button
    const buttonWidth = 5;
    const buttonHeight = 0.4;
    const spacing = 0.6;
    const startY = -0.5 - (index * spacing);
    
    button.setAttribute('position', `0 ${startY} 0.02`);
    button.setAttribute('class', 'clickable');

    // Background button
    const buttonBg = document.createElement('a-plane');
    buttonBg.setAttribute('width', buttonWidth);
    buttonBg.setAttribute('height', buttonHeight);
    buttonBg.setAttribute('color', '#333333');
    buttonBg.setAttribute('opacity', '0.8');
    button.appendChild(buttonBg);

    // Button text
    const buttonText = document.createElement('a-text');
    buttonText.setAttribute('value', choice.text);
    buttonText.setAttribute('position', '0 0 0.01');
    buttonText.setAttribute('align', 'center');
    buttonText.setAttribute('color', '#FFFFFF');
    buttonText.setAttribute('width', '4');
    buttonText.setAttribute('wrap-count', '40');
    button.appendChild(buttonText);

    // Click handler
    button.addEventListener('click', () => {
      this.handleChoiceClick(choice);
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
      buttonBg.setAttribute('color', '#555555');
    });

    button.addEventListener('mouseleave', () => {
      buttonBg.setAttribute('color', '#333333');
    });

    return button;
  },

  createCloseButton: function () {
    const closeButton = document.createElement('a-entity');
    closeButton.setAttribute('position', '2.5 1.5 0.02');
    closeButton.setAttribute('class', 'clickable');

    const closeBg = document.createElement('a-plane');
    closeBg.setAttribute('width', '0.8');
    closeBg.setAttribute('height', '0.4');
    closeBg.setAttribute('color', '#CC0000');
    closeBg.setAttribute('opacity', '0.8');
    closeButton.appendChild(closeBg);

    const closeText = document.createElement('a-text');
    closeText.setAttribute('value', 'X');
    closeText.setAttribute('position', '0 0 0.01');
    closeText.setAttribute('align', 'center');
    closeText.setAttribute('color', '#FFFFFF');
    closeText.setAttribute('width', '6');
    closeButton.appendChild(closeText);

    closeButton.addEventListener('click', () => {
      this.closeDialog();
    });

    return closeButton;
  },

  handleChoiceClick: function (choice) {
    console.log('Choice clicked:', choice);

    // Jika ada submenu, buka dialog baru
    if (choice.submenu) {
      const newDialogData = NPC_DIALOGS[choice.submenu];
      if (newDialogData) {
        // Simpan ke history
        gameState.dialogHistory.push(gameState.currentDialog);
        gameState.currentDialog = choice.submenu;
        
        // Buat dialog baru
        this.createDialogPanel(newDialogData);
      }
    } 
    // Jika ada response langsung
    else if (choice.response) {
      // Tampilkan response
      this.showResponse(choice.response, choice.text);
    }
  },

  showResponse: function (response, choiceText) {
    // Hapus dialog yang ada
    if (this.dialogPanel) {
      this.dialogPanel.parentNode.removeChild(this.dialogPanel);
    }

    // Buat response panel
    this.dialogPanel = document.createElement('a-entity');
    this.dialogPanel.setAttribute('id', 'response-panel');
    
    // Posisi yang sama dengan dialog sebelumnya
    const camera = document.querySelector('#player');
    const cameraPos = camera.object3D.position;
    const cameraRot = camera.object3D.rotation;
    
    const dialogDistance = 3;
    const dialogPos = {
      x: cameraPos.x + Math.sin(cameraRot.y) * dialogDistance,
      y: cameraPos.y,
      z: cameraPos.z - Math.cos(cameraRot.y) * dialogDistance
    };

    this.dialogPanel.setAttribute('position', `${dialogPos.x} ${dialogPos.y} ${dialogPos.z}`);
    this.dialogPanel.setAttribute('look-at', '#player');

    // Background
    const background = document.createElement('a-plane');
    background.setAttribute('width', '6');
    background.setAttribute('height', '4');
    background.setAttribute('color', '#1a1a1a');
    background.setAttribute('opacity', '0.9');
    this.dialogPanel.appendChild(background);

    // Choice text (what player said)
    const choiceDisplay = document.createElement('a-text');
    choiceDisplay.setAttribute('value', `Anda: "${choiceText}"`);
    choiceDisplay.setAttribute('position', '0 1.5 0.01');
    choiceDisplay.setAttribute('align', 'center');
    choiceDisplay.setAttribute('color', '#87CEEB');
    choiceDisplay.setAttribute('width', '5');
    choiceDisplay.setAttribute('wrap-count', '50');
    this.dialogPanel.appendChild(choiceDisplay);

    // Response text
    const responseText = document.createElement('a-text');
    responseText.setAttribute('value', response);
    responseText.setAttribute('position', '0 0 0.01');
    responseText.setAttribute('align', 'center');
    responseText.setAttribute('color', '#FFFFFF');
    responseText.setAttribute('width', '5');
    responseText.setAttribute('wrap-count', '60');
    this.dialogPanel.appendChild(responseText);

    // Back button
    const backButton = this.createBackButton();
    this.dialogPanel.appendChild(backButton);

    // Close button
    const closeButton = this.createCloseButton();
    this.dialogPanel.appendChild(closeButton);

    document.querySelector('#scene').appendChild(this.dialogPanel);
  },

  createBackButton: function () {
    const backButton = document.createElement('a-entity');
    backButton.setAttribute('position', '0 -1.5 0.02');
    backButton.setAttribute('class', 'clickable');

    const backBg = document.createElement('a-plane');
    backBg.setAttribute('width', '2');
    backBg.setAttribute('height', '0.5');
    backBg.setAttribute('color', '#4A90E2');
    backBg.setAttribute('opacity', '0.8');
    backButton.appendChild(backBg);

    const backText = document.createElement('a-text');
    backText.setAttribute('value', 'Kembali');
    backText.setAttribute('position', '0 0 0.01');
    backText.setAttribute('align', 'center');
    backText.setAttribute('color', '#FFFFFF');
    backText.setAttribute('width', '6');
    backButton.appendChild(backText);

    backButton.addEventListener('click', () => {
      // Kembali ke dialog sebelumnya atau dialog utama NPC
      if (gameState.dialogHistory.length > 0) {
        const previousDialog = gameState.dialogHistory.pop();
        const dialogData = NPC_DIALOGS[previousDialog];
        if (dialogData) {
          gameState.currentDialog = previousDialog;
          this.createDialogPanel(dialogData);
        }
      } else {
        // Kembali ke dialog utama NPC
        this.openDialog(gameState.currentNPC);
      }
    });

    return backButton;
  },

  closeDialog: function () {
    if (this.dialogPanel) {
      this.dialogPanel.parentNode.removeChild(this.dialogPanel);
      this.dialogPanel = null;
    }
    
    this.isDialogOpen = false;
    gameState.currentDialog = null;
    gameState.currentNPC = null;
    gameState.dialogHistory = [];
  }
});

// Inisialisasi saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('NPC Dialog System loaded');
});