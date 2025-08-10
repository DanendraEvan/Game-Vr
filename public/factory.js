// Enhanced Factory Location - locations/factory.js
function loadEnhancedFactoryLocation(sceneEl) {
    console.log('Loading Enhanced Factory Location...');
    
    updateLocationUI('🏭 Pabrik Pengolahan Makanan', 
        'Anda berada di kompleks pabrik pengolahan makanan modern seluas 5 hektar. Fasilitas dilengkapi IPAL (Instalasi Pengolah Air Limbah) dan sistem monitoring lingkungan. Bu Anita, pemilik berlatar teknik lingkungan, siap memberikan penjelasan teknis.');
    
    // Industrial ground with concrete texture
    const mainGround = document.createElement('a-plane');
    mainGround.setAttribute('position', '0 0 0');
    mainGround.setAttribute('rotation', '-90 0 0');
    mainGround.setAttribute('width', '120');
    mainGround.setAttribute('height', '120');
    mainGround.setAttribute('material', 'color: #BDBDBD; roughness: 0.8; metalness: 0.2');
    mainGround.setAttribute('shadow', 'receive: true');
    sceneEl.appendChild(mainGround);
    
    // Factory complex buildings
    createMainFactoryBuilding(sceneEl);
    createIPALFacility(sceneEl);
    createWarehouseBuildings(sceneEl);
    createOfficeBuilding(sceneEl);
    
    // Enhanced Bu Anita NPC
    const buAnita = document.createElement('a-entity');
    buAnita.setAttribute('position', '-10 0.9 5');
    buAnita.setAttribute('mixin', 'npc');
    buAnita.setAttribute('data-dialog', 'bu_anita');
    
    createDetailedFactoryOwner(buAnita);
    sceneEl.appendChild(buAnita);
    
    // Industrial equipment and infrastructure
    createIndustrialEquipment(sceneEl);
    createPipingSystem(sceneEl);
    createMonitoringStations(sceneEl);
    
    // Environmental elements
    createFactoryEnvironment(sceneEl);
    
    // Return Portal
    addEnhancedReturnPortal(sceneEl, '🏠 KEMBALI KE BALAI DESA', '0 0.1 18');
    
    console.log('Enhanced Factory Location loaded successfully');
}

function createMainFactoryBuilding(sceneEl) {
    // Main production building
    const mainBuilding = document.createElement('a-box');
    mainBuilding.setAttribute('position', '0 6 -15');
    mainBuilding.setAttribute('width', '20');
    mainBuilding.setAttribute('height', '12');
    mainBuilding.setAttribute('depth', '15');
    mainBuilding.setAttribute('material', 'color: #455A64; roughness: 0.8; metalness: 0.3');
    mainBuilding.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(mainBuilding);
    
    // Factory roof
    const roof = document.createElement('a-box');
    roof.setAttribute('position', '0 12.5 -15');
    roof.setAttribute('width', '22');
    roof.setAttribute('height', '1');
    roof.setAttribute('depth', '17');
    roof.setAttribute('material', 'color: #37474F; metalness: 0.6; roughness: 0.4');
    sceneEl.appendChild(roof);
    
    // Company sign
    const sign = document.createElement('a-plane');
    sign.setAttribute('position', '0 9 -7.4');
    sign.setAttribute('width', '15');
    sign.setAttribute('height', '3');
    sign.setAttribute('material', 'color: #FFFFFF');
    sceneEl.appendChild(sign);
    
    const signText = document.createElement('a-text');
    signText.setAttribute('position', '0 9 -7.3');
    signText.setAttribute('value', 'PT. HARMONI FOOD PROCESSING\nPengolahan Makanan Berkelanjutan');
    signText.setAttribute('align', 'center');
    signText.setAttribute('color', '#2E7D32');
    signText.setAttribute('font', 'roboto');
    signText.setAttribute('text', 'width: 20; wrapCount: 40');
    sceneEl.appendChild(signText);
    
    // Industrial smokestacks with realistic smoke
    const smokestackPositions = [-6, 0, 6];
    smokestackPositions.forEach((x, index) => {
        // Smokestack
        const smokestack = document.createElement('a-cylinder');
        smokestack.setAttribute('position', `${x} 15 -15`);
        smokestack.setAttribute('radius', '0.8');
        smokestack.setAttribute('height', '8');
        smokestack.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
        smokestack.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(smokestack);
        
        // Smokestack cap
        const cap = document.createElement('a-cylinder');
        cap.setAttribute('position', `${x} 19.5 -15`);
        cap.setAttribute('radius', '1');
        cap.setAttribute('height', '0.3');
        cap.setAttribute('material', 'color: #263238; metalness: 0.9');
        sceneEl.appendChild(cap);
        
        // Smoke particles system
        for (let i = 0; i < 5; i++) {
            const smoke = document.createElement('a-sphere');
            smoke.setAttribute('position', `${x + (Math.random() - 0.5) * 0.5} ${20 + i * 1.5} ${-15 + (Math.random() - 0.5) * 0.5}`);
            smoke.setAttribute('radius', `${0.3 + i * 0.2}`);
            smoke.setAttribute('material', `color: #E0E0E0; opacity: ${0.8 - i * 0.15}; transparent: true`);
            smoke.setAttribute('animation__rise', `property: position; to: ${x + (Math.random() - 0.5) * 2} ${25 + i * 2} ${-15 + (Math.random() - 0.5) * 2}; dur: ${3000 + i * 500}; loop: true; dir: alternate; easing: easeInOutSine`);
            smoke.setAttribute('animation__fade', `property: material.opacity; to: 0.1; dur: ${2000 + i * 300}; loop: true; dir: alternate`);
            sceneEl.appendChild(smoke);
        }
    });
    
    // Factory windows
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            const window = document.createElement('a-plane');
            window.setAttribute('position', `${-8 + i * 3} ${3 + j * 3} -7.4`);
            window.setAttribute('width', '2');
            window.setAttribute('height', '2');
            window.setAttribute('material', 'color: #81D4FA; opacity: 0.7; transparent: true; metalness: 0.8; roughness: 0.1');
            sceneEl.appendChild(window);
            
            // Window frame
            const frame = document.createElement('a-plane');
            frame.setAttribute('position', `${-8 + i * 3} ${3 + j * 3} -7.39`);
            frame.setAttribute('width', '2.2');
            frame.setAttribute('height', '2.2');
            frame.setAttribute('material', 'color: #37474F; opacity: 0.8');
            sceneEl.appendChild(frame);
        }
    }
    
    // Loading docks
    for (let i = 0; i < 3; i++) {
        const dock = document.createElement('a-box');
        dock.setAttribute('position', `${-6 + i * 6} 2 -22.5`);
        dock.setAttribute('width', '4');
        dock.setAttribute('height', '4');
        dock.setAttribute('depth', '1');
        dock.setAttribute('material', 'color: #FF6B35; metalness: 0.4; roughness: 0.6');
        dock.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(dock);
    }
}

function createIPALFacility(sceneEl) {
    // IPAL main building
    const ipalBuilding = document.createElement('a-box');
    ipalBuilding.setAttribute('position', '-20 2.5 -5');
    ipalBuilding.setAttribute('width', '12');
    ipalBuilding.setAttribute('height', '5');
    ipalBuilding.setAttribute('depth', '8');
    ipalBuilding.setAttribute('material', 'color: #4CAF50; roughness: 0.7; metalness: 0.3');
    ipalBuilding.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(ipalBuilding);
    
    // IPAL sign
    const ipalSign = document.createElement('a-text');
    ipalSign.setAttribute('position', '-20 6 -0.9');
    ipalSign.setAttribute('value', 'IPAL\n(Instalasi Pengolah Air Limbah)\nSistem Biologis Aerobik');
    ipalSign.setAttribute('align', 'center');
    ipalSign.setAttribute('color', '#FFFFFF');
    ipalSign.setAttribute('font', 'roboto');
    ipalSign.setAttribute('text', 'width: 15; wrapCount: 30');
    ipalSign.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    ipalSign.setAttribute('material', 'color: rgba(76,175,80,0.9); opacity: 0.9');
    sceneEl.appendChild(ipalSign);
    
    // Treatment tanks
    const tankPositions = [
        {pos: '-25 1 -5', color: '#2196F3', label: 'Tangki Aerasi'},
        {pos: '-20 1 -10', color: '#4CAF50', label: 'Tangki Sedimentasi'},
        {pos: '-15 1 -5', color: '#FF9800', label: 'Tangki Clarifier'}
    ];
    
    tankPositions.forEach(tank => {
        // Tank structure
        const tankEntity = document.createElement('a-cylinder');
        tankEntity.setAttribute('position', tank.pos);
        tankEntity.setAttribute('radius', '2');
        tankEntity.setAttribute('height', '2');
        tankEntity.setAttribute('material', `color: ${tank.color}; opacity: 0.8; transparent: true; metalness: 0.4; roughness: 0.6`);
        tankEntity.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(tankEntity);
        
        // Tank label
        const label = document.createElement('a-text');
        label.setAttribute('position', `${tank.pos.split(' ')[0]} 3 ${tank.pos.split(' ')[2]}`);
        label.setAttribute('value', tank.label);
        label.setAttribute('align', 'center');
        label.setAttribute('color', '#2F4F4F');
        label.setAttribute('font', 'roboto');
        label.setAttribute('text', 'width: 8; wrapCount: 15');
        sceneEl.appendChild(label);
        
        // Bubbling effect for aerobic process
        if (tank.label.includes('Aerasi')) {
            for (let i = 0; i < 8; i++) {
                const bubble = document.createElement('a-sphere');
                bubble.setAttribute('position', 
                    `${parseFloat(tank.pos.split(' ')[0]) + (Math.random() - 0.5) * 3} ${parseFloat(tank.pos.split(' ')[1]) + 0.5} ${parseFloat(tank.pos.split(' ')[2]) + (Math.random() - 0.5) * 3}`);
                bubble.setAttribute('radius', `${0.05 + Math.random() * 0.1}`);
                bubble.setAttribute('material', 'color: #E3F2FD; opacity: 0.7; transparent: true');
                bubble.setAttribute('animation__bubble', 
                    `property: position; to: ${parseFloat(tank.pos.split(' ')[0]) + (Math.random() - 0.5) * 3} ${parseFloat(tank.pos.split(' ')[1]) + 2} ${parseFloat(tank.pos.split(' ')[2]) + (Math.random() - 0.5) * 3}; dur: ${2000 + Math.random() * 2000}; loop: true; easing: easeOutQuad`);
                sceneEl.appendChild(bubble);
            }
        }
    });
    
    // Water quality monitoring station
    const monitorStation = document.createElement('a-box');
    monitorStation.setAttribute('position', '-18 1.5 0');
    monitorStation.setAttribute('width', '2');
    monitorStation.setAttribute('height', '3');
    monitorStation.setAttribute('depth', '1');
    monitorStation.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
    monitorStation.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(monitorStation);
    
    // Digital display
    const display = document.createElement('a-plane');
    display.setAttribute('position', '-18 2.2 0.6');
    display.setAttribute('width', '1.5');
    display.setAttribute('height', '1');
    display.setAttribute('material', 'color: #000; emissive: #00FF00; emissiveIntensity: 0.3');
    sceneEl.appendChild(display);
    
    const displayText = document.createElement('a-text');
    displayText.setAttribute('position', '-18 2.2 0.61');
    displayText.setAttribute('value', 'pH: 6.8\nBOD: 15mg/L\nCOD: 45mg/L\nStatus: NORMAL');
    displayText.setAttribute('align', 'center');
    displayText.setAttribute('color', '#00FF00');
    displayText.setAttribute('font', 'monospace');
    displayText.setAttribute('text', 'width: 8; wrapCount: 15');
    displayText.setAttribute('animation__blink', 'property: material.emissiveIntensity; to: 0.6; dur: 1000; dir: alternate; loop: true');
    sceneEl.appendChild(displayText);
}

function createWarehouseBuildings(sceneEl) {
    // Raw material warehouse
    const rawWarehouse = document.createElement('a-box');
    rawWarehouse.setAttribute('position', '20 4 -5');
    rawWarehouse.setAttribute('width', '15');
    rawWarehouse.setAttribute('height', '8');
    rawWarehouse.setAttribute('depth', '12');
    rawWarehouse.setAttribute('material', 'color: #607D8B; roughness: 0.8; metalness: 0.2');
    rawWarehouse.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(rawWarehouse);
    
    // Warehouse label
    const warehouseLabel = document.createElement('a-text');
    warehouseLabel.setAttribute('position', '20 8.5 1.1');
    warehouseLabel.setAttribute('value', 'GUDANG BAHAN BAKU\nKapasitas: 500 Ton');
    warehouseLabel.setAttribute('align', 'center');
    warehouseLabel.setAttribute('color', '#FFFFFF');
    warehouseLabel.setAttribute('font', 'roboto');
    warehouseLabel.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    warehouseLabel.setAttribute('material', 'color: rgba(96,125,139,0.9); opacity: 0.9');
    sceneEl.appendChild(warehouseLabel);
    
    // Finished goods warehouse
    const finishedWarehouse = document.createElement('a-box');
    finishedWarehouse.setAttribute('position', '20 4 10');
    finishedWarehouse.setAttribute('width', '15');
    finishedWarehouse.setAttribute('height', '8');
    finishedWarehouse.setAttribute('depth', '10');
    finishedWarehouse.setAttribute('material', 'color: #795548; roughness: 0.8; metalness: 0.2');
    finishedWarehouse.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(finishedWarehouse);
    
    // Storage containers
    for (let i = 0; i < 6; i++) {
        const container = document.createElement('a-box');
        container.setAttribute('position', `${15 + (i % 3) * 3} 2 ${-8 + Math.floor(i / 3) * 4}`);
        container.setAttribute('width', '2.5');
        container.setAttribute('height', '4');
        container.setAttribute('depth', '2.5');
        container.setAttribute('material', `color: hsl(${i * 60}, 60%, 50%); metalness: 0.6; roughness: 0.4`);
        container.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(container);
    }
}

function createOfficeBuilding(sceneEl) {
    // Administrative office
    const office = document.createElement('a-box');
    office.setAttribute('position', '-15 3 10');
    office.setAttribute('width', '12');
    office.setAttribute('height', '6');
    office.setAttribute('depth', '8');
    office.setAttribute('material', 'color: #8BC34A; roughness: 0.6; metalness: 0.3');
    office.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(office);
    
    // Office sign
    const officeSign = document.createElement('a-text');
    officeSign.setAttribute('position', '-15 6.5 14.1');
    officeSign.setAttribute('value', 'KANTOR ADMINISTRASI\n& LABORATORIUM QC');
    officeSign.setAttribute('align', 'center');
    officeSign.setAttribute('color', '#FFFFFF');
    officeSign.setAttribute('font', 'roboto');
    officeSign.setAttribute('text', 'width: 12; wrapCount: 25');
    officeSign.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    officeSign.setAttribute('material', 'color: rgba(139,195,74,0.9); opacity: 0.9');
    sceneEl.appendChild(officeSign);
    
    // Office windows
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            const window = document.createElement('a-plane');
            window.setAttribute('position', `${-18 + i * 1.5} ${2 + j * 2} 14.1`);
            window.setAttribute('width', '1');
            window.setAttribute('height', '1.5');
            window.setAttribute('material', 'color: #FFF9C4; opacity: 0.8; transparent: true');
            sceneEl.appendChild(window);
        }
    }
    
    // Laboratory equipment visible through windows
    const labEquipment = document.createElement('a-cylinder');
    labEquipment.setAttribute('position', '-15 2.5 12');
    labEquipment.setAttribute('radius', '0.5');
    labEquipment.setAttribute('height', '1');
    labEquipment.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
    sceneEl.appendChild(labEquipment);
}

function createDetailedFactoryOwner(parentEntity) {
    // Professional business attire
    const body = document.createElement('a-cylinder');
    body.setAttribute('position', '0 0 0');
    body.setAttribute('radius', '0.4');
    body.setAttribute('height', '1.8');
    body.setAttribute('material', 'color: #1976D2; roughness: 0.7; metalness: 0.1');
    body.setAttribute('shadow', 'cast: true');
    parentEntity.appendChild(body);
    
    // Head
    const head = document.createElement('a-sphere');
    head.setAttribute('position', '0 1.4 0');
    head.setAttribute('radius', '0.3');
    head.setAttribute('material', 'color: #FDBCB4; roughness: 0.9');
    parentEntity.appendChild(head);
    
    // Professional glasses
    const glasses = document.createElement('a-torus');
    glasses.setAttribute('position', '0 1.45 0.25');
    glasses.setAttribute('radius', '0.15');
    glasses.setAttribute('radius-tubular', '0.02');
    glasses.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
    parentEntity.appendChild(glasses);
    
    // Hair
    const hair = document.createElement('a-sphere');
    hair.setAttribute('position', '0 1.6 0');
    hair.setAttribute('radius', '0.32');
    hair.setAttribute('material', 'color: #3E2723; roughness: 0.9');
    parentEntity.appendChild(hair);
    
    // Arms
    const leftArm = document.createElement('a-cylinder');
    leftArm.setAttribute('position', '-0.5 0.8 0');
    leftArm.setAttribute('radius', '0.12');
    leftArm.setAttribute('height', '0.8');
    leftArm.setAttribute('material', 'color: #FDBCB4');
    leftArm.setAttribute('rotation', '0 0 15');
    parentEntity.appendChild(leftArm);
    
    const rightArm = document.createElement('a-cylinder');
    rightArm.setAttribute('position', '0.5 0.8 0');
    rightArm.setAttribute('radius', '0.12');
    rightArm.setAttribute('height', '0.8');
    rightArm.setAttribute('material', 'color: #FDBCB4');
    rightArm.setAttribute('rotation', '0 0 -15');
    parentEntity.appendChild(rightArm);
    
    // Briefcase in hand
    const briefcase = document.createElement('a-box');
    briefcase.setAttribute('position', '0.7 1 0');
    briefcase.setAttribute('width', '0.4');
    briefcase.setAttribute('height', '0.3');
    briefcase.setAttribute('depth', '0.1');
    briefcase.setAttribute('material', 'color: #6D4C41; metalness: 0.6; roughness: 0.4');
    parentEntity.appendChild(briefcase);
    
    // Enhanced name tag with credentials
    const nameTag = document.createElement('a-text');
    nameTag.setAttribute('position', '0 2.5 0');
    nameTag.setAttribute('value', 'Bu Anita Sari, S.T.\nPemilik Pabrik\n(Teknik Lingkungan ITB)');
    nameTag.setAttribute('align', 'center');
    nameTag.setAttribute('color', '#1976D2');
    nameTag.setAttribute('font', 'roboto');
    nameTag.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    nameTag.setAttribute('material', 'color: rgba(255,255,255,0.95); opacity: 0.95');
    nameTag.setAttribute('text', 'width: 12; wrapCount: 25');
    nameTag.setAttribute('animation__bob', 'property: position; to: 0 2.7 0; dir: alternate; dur: 2500; loop: true');
    parentEntity.appendChild(nameTag);
    
    // Professional interaction indicator
    const indicator = document.createElement('a-ring');
    indicator.setAttribute('position', '0 0.1 0');
    indicator.setAttribute('radius-inner', '0.8');
    indicator.setAttribute('radius-outer', '1.2');
    indicator.setAttribute('rotation', '-90 0 0');
    indicator.setAttribute('material', 'color: #1976D2; opacity: 0.7');
    indicator.setAttribute('animation__spin', 'property: rotation; to: -90 360 0; dur: 5000; loop: true; easing: linear');
    parentEntity.appendChild(indicator);
    
    const hitbox = document.createElement('a-cylinder');
    hitbox.classList.add('clickable');
    hitbox.setAttribute('radius', '1.2');
    hitbox.setAttribute('height', '2.5');
    hitbox.setAttribute('material', 'opacity: 0; transparent: true');
    hitbox.setAttribute('position', '0 0.5 0');
    parentEntity.appendChild(hitbox);
}

function createIndustrialEquipment(sceneEl) {
    // Conveyor belts
    for (let i = 0; i < 3; i++) {
        const conveyor = document.createElement('a-box');
        conveyor.setAttribute('position', `${-5 + i * 5} 1 -15`);
        conveyor.setAttribute('width', '12');
        conveyor.setAttribute('height', '0.2');
        conveyor.setAttribute('depth', '1');
        conveyor.setAttribute('material', 'color: #424242; metalness: 0.8; roughness: 0.3');
        sceneEl.appendChild(conveyor);
        
        // Conveyor supports
        for (let j = 0; j < 4; j++) {
            const support = document.createElement('a-cylinder');
            support.setAttribute('position', `${-8 + i * 5 + j * 4} 0.5 -15`);
            support.setAttribute('radius', '0.1');
            support.setAttribute('height', '1');
            support.setAttribute('material', 'color: #616161; metalness: 0.7');
            sceneEl.appendChild(support);
        }
        
        // Moving boxes on conveyor
        for (let k = 0; k < 3; k++) {
            const box = document.createElement('a-box');
            box.setAttribute('position', `${-8 + i * 5 + k * 4} 1.3 -15`);
            box.setAttribute('width', '0.8');
            box.setAttribute('height', '0.6');
            box.setAttribute('depth', '0.8');
            box.setAttribute('material', 'color: #FF9800; roughness: 0.8');
            box.setAttribute('animation__move', 
                `property: position; to: ${2 + i * 5 + k * 4} 1.3 -15; dur: ${4000 + k * 500}; loop: true; easing: linear`);
            sceneEl.appendChild(box);
        }
    }
    
    // Processing machinery
    const machinery = [
        {pos: '8 2 -20', type: 'mixer', color: '#757575'},
        {pos: '12 3 -18', type: 'dryer', color: '#FF5722'},
        {pos: '16 2.5 -22', type: 'packaging', color: '#4CAF50'}
    ];
    
    machinery.forEach(machine => {
        // Main machine body
        const machineBody = document.createElement('a-cylinder');
        machineBody.setAttribute('position', machine.pos);
        machineBody.setAttribute('radius', '1.5');
        machineBody.setAttribute('height', machine.type === 'dryer' ? '6' : '4');
        machineBody.setAttribute('material', `color: ${machine.color}; metalness: 0.6; roughness: 0.4`);
        machineBody.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(machineBody);
        
        // Machine controls
        const controls = document.createElement('a-box');
        controls.setAttribute('position', `${machine.pos.split(' ')[0]} ${parseFloat(machine.pos.split(' ')[1]) + 1} ${parseFloat(machine.pos.split(' ')[2]) + 2}`);
        controls.setAttribute('width', '1');
        controls.setAttribute('height', '1.5');
        controls.setAttribute('depth', '0.3');
        controls.setAttribute('material', 'color: #37474F; metalness: 0.8');
        sceneEl.appendChild(controls);
        
        // Status lights
        for (let i = 0; i < 3; i++) {
            const light = document.createElement('a-sphere');
            light.setAttribute('position', 
                `${parseFloat(machine.pos.split(' ')[0]) - 0.3 + i * 0.3} ${parseFloat(machine.pos.split(' ')[1]) + 1.5} ${parseFloat(machine.pos.split(' ')[2]) + 2.2}`);
            light.setAttribute('radius', '0.05');
            light.setAttribute('material', `color: ${i === 0 ? '#4CAF50' : i === 1 ? '#FF9800' : '#F44336'}; emissive: ${i === 0 ? '#4CAF50' : i === 1 ? '#FF9800' : '#F44336'}; emissiveIntensity: 0.5`);
            light.setAttribute('animation__blink', 
                `property: material.emissiveIntensity; to: 0.1; dur: ${1000 + i * 200}; dir: alternate; loop: true`);
            sceneEl.appendChild(light);
        }
    });
    
    // Forklifts
    for (let i = 0; i < 2; i++) {
        const forklift = document.createElement('a-entity');
        forklift.setAttribute('position', `${10 + i * 8} 0 ${5 + i * 3}`);
        
        // Forklift body
        const body = document.createElement('a-box');
        body.setAttribute('position', '0 1 0');
        body.setAttribute('width', '2');
        body.setAttribute('height', '2');
        body.setAttribute('depth', '3');
        body.setAttribute('material', 'color: #FFC107; metalness: 0.5; roughness: 0.6');
        forklift.appendChild(body);
        
        // Forklift mast
        const mast = document.createElement('a-box');
        mast.setAttribute('position', '0 2.5 -1.2');
        mast.setAttribute('width', '0.2');
        mast.setAttribute('height', '3');
        mast.setAttribute('depth', '0.2');
        mast.setAttribute('material', 'color: #FF9800; metalness: 0.7');
        forklift.appendChild(mast);
        
        // Forklift forks
        const fork1 = document.createElement('a-box');
        fork1.setAttribute('position', '-0.3 1.5 -2');
        fork1.setAttribute('width', '0.1');
        fork1.setAttribute('height', '0.1');
        fork1.setAttribute('depth', '1.5');
        fork1.setAttribute('material', 'color: #757575; metalness: 0.8');
        forklift.appendChild(fork1);
        
        const fork2 = document.createElement('a-box');
        fork2.setAttribute('position', '0.3 1.5 -2');
        fork2.setAttribute('width', '0.1');
        fork2.setAttribute('height', '0.1');
        fork2.setAttribute('depth', '1.5');
        fork2.setAttribute('material', 'color: #757575; metalness: 0.8');
        forklift.appendChild(fork2);
        
        // Wheels
        const wheels = [
            {pos: '-0.8 0.3 -1', size: '0.3'},
            {pos: '0.8 0.3 -1', size: '0.3'},
            {pos: '-0.8 0.4 1', size: '0.4'},
            {pos: '0.8 0.4 1', size: '0.4'}
        ];
        
        wheels.forEach(wheel => {
            const wheelEntity = document.createElement('a-cylinder');
            wheelEntity.setAttribute('position', wheel.pos);
            wheelEntity.setAttribute('radius', wheel.size);
            wheelEntity.setAttribute('height', '0.2');
            wheelEntity.setAttribute('material', 'color: #212121; roughness: 0.9');
            wheelEntity.setAttribute('rotation', '0 0 90');
            forklift.appendChild(wheelEntity);
        });
        
        sceneEl.appendChild(forklift);
    }
}

function createPipingSystem(sceneEl) {
    // Main water pipes
    const pipeRoutes = [
        {start: [-20, 2, -5], end: [0, 2, -15], color: '#2196F3'},
        {start: [0, 2, -15], end: [20, 2, -5], color: '#4CAF50'},
        {start: [-20, 3, -5], end: [-15, 3, 0], color: '#FF9800'}
    ];
    
    pipeRoutes.forEach(route => {
        const pipe = document.createElement('a-cylinder');
        const midX = (route.start[0] + route.end[0]) / 2;
        const midY = (route.start[1] + route.end[1]) / 2;
        const midZ = (route.start[2] + route.end[2]) / 2;
        
        pipe.setAttribute('position', `${midX} ${midY} ${midZ}`);
        pipe.setAttribute('radius', '0.1');
        pipe.setAttribute('height', Math.sqrt(
            Math.pow(route.end[0] - route.start[0], 2) +
            Math.pow(route.end[1] - route.start[1], 2) +
            Math.pow(route.end[2] - route.start[2], 2)
        ));
        pipe.setAttribute('material', `color: ${route.color}; metalness: 0.8; roughness: 0.2`);
        
        // Calculate rotation to align with route
        const dx = route.end[0] - route.start[0];
        const dy = route.end[1] - route.start[1];
        const dz = route.end[2] - route.start[2];
        const rotX = Math.atan2(dz, Math.sqrt(dx*dx + dy*dy)) * 180 / Math.PI;
        const rotY = Math.atan2(dx, dy) * 180 / Math.PI;
        
        pipe.setAttribute('rotation', `${90 - rotX} ${rotY} 0`);
        sceneEl.appendChild(pipe);
        
        // Pipe valves
        const valve = document.createElement('a-box');
        valve.setAttribute('position', `${midX} ${midY + 0.2} ${midZ}`);
        valve.setAttribute('width', '0.3');
        valve.setAttribute('height', '0.2');
        valve.setAttribute('depth', '0.3');
        valve.setAttribute('material', 'color: #607D8B; metalness: 0.8; roughness: 0.3');
        sceneEl.appendChild(valve);
    });
}

function createMonitoringStations(sceneEl) {
    // Environmental monitoring stations
    const stations = [
        {pos: '5 0 5', type: 'air_quality'},
        {pos: '-10 0 8', type: 'noise_monitor'},
        {pos: '15 0 12', type: 'water_quality'}
    ];
    
    stations.forEach(station => {
        const stationEntity = document.createElement('a-entity');
        stationEntity.setAttribute('position', station.pos);
        
        // Station pole
        const pole = document.createElement('a-cylinder');
        pole.setAttribute('position', '0 2 0');
        pole.setAttribute('radius', '0.08');
        pole.setAttribute('height', '4');
        pole.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
        stationEntity.appendChild(pole);
        
        // Sensor equipment
        const sensor = document.createElement('a-box');
        sensor.setAttribute('position', '0 3.5 0');
        sensor.setAttribute('width', '0.4');
        sensor.setAttribute('height', '0.6');
        sensor.setAttribute('depth', '0.3');
        sensor.setAttribute('material', 'color: #FFC107; metalness: 0.6; roughness: 0.4');
        stationEntity.appendChild(sensor);
        
        // Blinking status light
        const statusLight = document.createElement('a-sphere');
        statusLight.setAttribute('position', '0 4 0.2');
        statusLight.setAttribute('radius', '0.05');
        statusLight.setAttribute('material', 'color: #4CAF50; emissive: #4CAF50; emissiveIntensity: 0.8');
        statusLight.setAttribute('animation__blink', 'property: material.emissiveIntensity; to: 0.2; dur: 1500; dir: alternate; loop: true');
        stationEntity.appendChild(statusLight);
        
        // Station label
        const label = document.createElement('a-text');
        label.setAttribute('position', '0 1 0');
        label.setAttribute('value', `${station.type.replace('_', ' ').toUpperCase()}\nMONITORING`);
        label.setAttribute('align', 'center');
        label.setAttribute('color', '#37474F');
        label.setAttribute('font', 'roboto');
        label.setAttribute('text', 'width: 6; wrapCount: 15');
        stationEntity.appendChild(label);
        
        sceneEl.appendChild(stationEntity);
    });
}

function createFactoryEnvironment(sceneEl) {
    // Security fence around perimeter
    for (let i = 0; i < 20; i++) {
        const fencePost = document.createElement('a-cylinder');
        fencePost.setAttribute('position', `${-30 + i * 3} 1.5 ${-30}`);
        fencePost.setAttribute('radius', '0.05');
        fencePost.setAttribute('height', '3');
        fencePost.setAttribute('material', 'color: #424242; metalness: 0.8');
        sceneEl.appendChild(fencePost);
        
        if (i < 19) {
            const fencePanel = document.createElement('a-plane');
            fencePanel.setAttribute('position', `${-28.5 + i * 3} 1.5 -30`);
            fencePanel.setAttribute('width', '3');
            fencePanel.setAttribute('height', '2.5');
            fencePanel.setAttribute('material', 'color: #616161; opacity: 0.8; transparent: true');
            fencePanel.setAttribute('rotation', '0 0 0');
            sceneEl.appendChild(fencePanel);
        }
    }
    
    // Parking area with vehicles
    const vehicles = [
        {pos: '-8 0 15', type: 'truck', color: '#1976D2'},
        {pos: '-4 0 15', type: 'car', color: '#D32F2F'},
        {pos: '0 0 15', type: 'van', color: '#388E3C'}
    ];
    
    vehicles.forEach(vehicle => {
        const vehicleEntity = document.createElement('a-entity');
        vehicleEntity.setAttribute('position', vehicle.pos);
        
        // Vehicle body
        const body = document.createElement('a-box');
        body.setAttribute('position', '0 1 0');
        body.setAttribute('width', vehicle.type === 'truck' ? '2.5' : '2');
        body.setAttribute('height', vehicle.type === 'truck' ? '2.5' : '1.5');
        body.setAttribute('depth', vehicle.type === 'truck' ? '6' : '4');
        body.setAttribute('material', `color: ${vehicle.color}; metalness: 0.7; roughness: 0.3`);
        vehicleEntity.appendChild(body);
        
        // Vehicle wheels
        for (let i = 0; i < 4; i++) {
            const wheel = document.createElement('a-cylinder');
            wheel.setAttribute('position', 
                `${i % 2 === 0 ? -1 : 1} 0.3 ${i < 2 ? -1.5 : 1.5}`);
            wheel.setAttribute('radius', '0.4');
            wheel.setAttribute('height', '0.2');
            wheel.setAttribute('material', 'color: #212121');
            wheel.setAttribute('rotation', '0 0 90');
            vehicleEntity.appendChild(wheel);
        }
        
        sceneEl.appendChild(vehicleEntity);
    });
    
    // Landscaping - Industrial style with some greenery
    const landscaping = [
        {pos: '25 0 25', type: 'tree'},
        {pos: '-25 0 20', type: 'tree'},
        {pos: '8 0 22', type: 'bush'},
        {pos: '-12 0 18', type: 'bush'}
    ];
    
    landscaping.forEach(item => {
        const plant = document.createElement('a-entity');
        plant.setAttribute('position', item.pos);
        
        if (item.type === 'tree') {
            // Industrial-appropriate tree
            const trunk = document.createElement('a-cylinder');
            trunk.setAttribute('position', '0 1.5 0');
            trunk.setAttribute('radius', '0.2');
            trunk.setAttribute('height', '3');
            trunk.setAttribute('material', 'color: #5D4037');
            plant.appendChild(trunk);
            
            const canopy = document.createElement('a-sphere');
            canopy.setAttribute('position', '0 3.5 0');
            canopy.setAttribute('radius', '1.2');
            canopy.setAttribute('material', 'color: #388E3C; opacity: 0.9');
            plant.appendChild(canopy);
        } else {
            // Industrial bush
            const bush = document.createElement('a-sphere');
            bush.setAttribute('position', '0 0.5 0');
            bush.setAttribute('radius', '0.8');
            bush.setAttribute('material', 'color: #4CAF50; opacity: 0.8');
            plant.appendChild(bush);
        }
        
        sceneEl.appendChild(plant);
    });
    
    // Atmospheric particles (dust/steam)
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('a-sphere');
        particle.setAttribute('position', 
            `${Math.random() * 60 - 30} ${2 + Math.random() * 8} ${Math.random() * 60 - 30}`);
        particle.setAttribute('radius', `${0.05 + Math.random() * 0.1}`);
        particle.setAttribute('material', 'color: #E0E0E0; opacity: 0.4; transparent: true');
        particle.setAttribute('animation__drift', 
            `property: position; to: ${Math.random() * 60 - 30} ${4 + Math.random() * 8} ${Math.random() * 60 - 30}; dur: ${8000 + Math.random() * 4000}; loop: true; dir: alternate; easing: easeInOutSine`);
        sceneEl.appendChild(particle);
    }
}

// Enhanced return portal (same as farm version)
function addEnhancedReturnPortal(sceneEl, text, position) {
    const portalContainer = document.createElement('a-entity');
    portalContainer.setAttribute('position', position);
    
    // Main portal
    const returnPortal = document.createElement('a-cylinder');
    returnPortal.setAttribute('position', '0 0 0');
    returnPortal.setAttribute('radius', '2.5');
    returnPortal.setAttribute('height', '0.3');
    returnPortal.setAttribute('material', 'color: #2196F3; opacity: 0.8; metalness: 0.3; roughness: 0.7');
    returnPortal.classList.add('clickable', 'portal');
    returnPortal.setAttribute('data-location', 'balai_desa');
    returnPortal.setAttribute('shadow', 'cast: true');
    
    // Portal animations
    returnPortal.setAttribute('animation__pulse', 'property: scale; to: 1.05 1.05 1.05; dir: alternate; dur: 2000; loop: true; easing: easeInOutSine');
    returnPortal.setAttribute('animation__glow', 'property: material.opacity; to: 0.9; dir: alternate; dur: 1500; loop: true');
    
    // Portal text
    const returnText = document.createElement('a-text');
    returnText.setAttribute('position', '0 1 0');
    returnText.setAttribute('value', text);
    returnText.setAttribute('align', 'center');
    returnText.setAttribute('color', '#FFFFFF');
    returnText.setAttribute('font', 'roboto');
    returnText.setAttribute('text', 'width: 12; wrapCount: 20');
    returnText.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    returnText.setAttribute('material', 'color: rgba(33,150,243,0.8); opacity: 0.9');
    returnPortal.appendChild(returnText);
    
    // Portal effect rings
    for (let i = 1; i <= 3; i++) {
        const ring = document.createElement('a-ring');
        ring.setAttribute('position', `0 ${0.1 + i * 0.1} 0`);
        ring.setAttribute('radius-inner', `${2.5 + i * 0.5}`);
        ring.setAttribute('radius-outer', `${3 + i * 0.5}`);
        ring.setAttribute('rotation', '-90 0 0');
        ring.setAttribute('material', `color: #2196F3; opacity: ${0.4 - i * 0.1}; transparent: true`);
        ring.setAttribute('animation__rotate', `property: rotation; to: -90 ${360 * i} 0; dur: ${8000 + i * 2000}; loop: true; easing: linear`);
        portalContainer.appendChild(ring);
    }
    
    portalContainer.appendChild(returnPortal);
    sceneEl.appendChild(portalContainer);
}

// Export function for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadEnhancedFactoryLocation };
}