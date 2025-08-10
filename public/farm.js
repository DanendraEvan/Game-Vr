// Enhanced Farm Location - locations/farm.js
function loadEnhancedFarmLocation(sceneEl) {
    console.log('Loading Enhanced Farm Location...');
    
    updateLocationUI('🌾 Ladang Petani Desa Harmoni', 
        'Anda berada di area pertanian seluas 15 hektar. Terlihat perbedaan kondisi tanaman di berbagai area. Pak Seno, petani senior dengan 20 tahun pengalaman, menunggu untuk diwawancarai.');
    
    // Enhanced Ground with varied terrain
    const mainGround = document.createElement('a-plane');
    mainGround.setAttribute('position', '0 0 0');
    mainGround.setAttribute('rotation', '-90 0 0');
    mainGround.setAttribute('width', '120');
    mainGround.setAttribute('height', '120');
    mainGround.setAttribute('material', 'color: #7CB342; roughness: 0.9; metalness: 0.1');
    mainGround.setAttribute('shadow', 'receive: true');
    sceneEl.appendChild(mainGround);
    
    // Soil patches with different conditions
    const soilPatches = [
        {pos: '-15 0.01 -10', color: '#8BC34A', condition: 'healthy'},
        {pos: '15 0.01 -10', color: '#689F38', condition: 'moderate'},
        {pos: '-15 0.01 10', color: '#558B2F', condition: 'poor'},
        {pos: '15 0.01 10', color: '#33691E', condition: 'damaged'}
    ];
    
    soilPatches.forEach(patch => {
        const soil = document.createElement('a-plane');
        soil.setAttribute('position', patch.pos);
        soil.setAttribute('rotation', '-90 0 0');
        soil.setAttribute('width', '25');
        soil.setAttribute('height', '25');
        soil.setAttribute('material', `color: ${patch.color}; opacity: 0.8`);
        sceneEl.appendChild(soil);
    });
    
    // Detailed Rice Fields with different conditions
    createRiceFieldSection(sceneEl, -20, -15, 'healthy', '#4CAF50');
    createRiceFieldSection(sceneEl, 0, -15, 'moderate', '#8BC34A');
    createRiceFieldSection(sceneEl, 20, -15, 'poor', '#FFA726');
    createRiceFieldSection(sceneEl, -20, 5, 'damaged', '#FF7043');
    
    // Enhanced Pak Seno NPC
    const pakSeno = document.createElement('a-entity');
    pakSeno.setAttribute('position', '3 0.9 -5');
    pakSeno.setAttribute('mixin', 'npc');
    pakSeno.setAttribute('data-dialog', 'pak_seno');
    
    // Detailed character model
    createDetailedFarmer(pakSeno);
    sceneEl.appendChild(pakSeno);
    
    // Irrigation System
    createIrrigationSystem(sceneEl);
    
    // Farm Buildings
    createFarmBuildings(sceneEl);
    
    // Agricultural Tools and Equipment
    createFarmEquipment(sceneEl);
    
    // Environmental Details
    createFarmEnvironment(sceneEl);
    
    // Return Portal
    addEnhancedReturnPortal(sceneEl, '🏠 KEMBALI KE BALAI DESA', '0 0.1 15');
    
    console.log('Enhanced Farm Location loaded successfully');
}

function createRiceFieldSection(sceneEl, x, z, condition, color) {
    // Create terraced rice fields
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            const field = document.createElement('a-plane');
            field.setAttribute('position', `${x + j * 4} ${0.02 + i * 0.01} ${z + i * 3}`);
            field.setAttribute('rotation', '-90 0 0');
            field.setAttribute('width', '3.5');
            field.setAttribute('height', '2.5');
            field.setAttribute('material', `color: ${color}; opacity: 0.9; roughness: 0.8`);
            sceneEl.appendChild(field);
            
            // Rice plants based on condition
            if (condition === 'healthy' || condition === 'moderate') {
                for (let k = 0; k < 8; k++) {
                    const rice = document.createElement('a-cylinder');
                    rice.setAttribute('position', 
                        `${x + j * 4 + (Math.random() - 0.5) * 3} ${0.3} ${z + i * 3 + (Math.random() - 0.5) * 2}`);
                    rice.setAttribute('radius', '0.05');
                    rice.setAttribute('height', condition === 'healthy' ? '0.6' : '0.4');
                    rice.setAttribute('material', `color: ${condition === 'healthy' ? '#4CAF50' : '#8BC34A'}`);
                    sceneEl.appendChild(rice);
                }
            }
        }
    }
    
    // Field boundaries
    const boundary = document.createElement('a-box');
    boundary.setAttribute('position', `${x + 6} 0.1 ${z + 4}`);
    boundary.setAttribute('width', '16');
    boundary.setAttribute('height', '0.2');
    boundary.setAttribute('depth', '12');
    boundary.setAttribute('material', 'color: #8D6E63; opacity: 0.6');
    sceneEl.appendChild(boundary);
}

function createDetailedFarmer(parentEntity) {
    parentEntity.setAttribute('gltf-model', 'url(models/farmer.glb)');
    parentEntity.setAttribute('scale', '1 1 1'); // sesuaikan ukuran lama
    parentEntity.setAttribute('shadow', 'cast: true');
}


function createIrrigationSystem(sceneEl) {
    // Main irrigation channel
    const mainChannel = document.createElement('a-box');
    mainChannel.setAttribute('position', '0 0.05 0');
    mainChannel.setAttribute('width', '80');
    mainChannel.setAttribute('height', '0.3');
    mainChannel.setAttribute('depth', '2');
    mainChannel.setAttribute('material', 'color: #4FC3F7; opacity: 0.8; transparent: true');
    sceneEl.appendChild(mainChannel);
    
    // Secondary channels
    for (let i = -3; i <= 3; i++) {
        if (i !== 0) {
            const channel = document.createElement('a-box');
            channel.setAttribute('position', `${i * 15} 0.05 0`);
            channel.setAttribute('width', '1.5');
            channel.setAttribute('height', '0.2');
            channel.setAttribute('depth', '60');
            channel.setAttribute('material', 'color: #29B6F6; opacity: 0.7; transparent: true');
            sceneEl.appendChild(channel);
        }
    }
    
    // Water pumps
    const pump1 = document.createElement('a-cylinder');
    pump1.setAttribute('position', '-25 0.8 0');
    pump1.setAttribute('radius', '0.6');
    pump1.setAttribute('height', '1.6');
    pump1.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
    pump1.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(pump1);
    
    // Pump motor sound indicator
    const motorSound = document.createElement('a-sphere');
    motorSound.setAttribute('position', '-25 1.8 0');
    motorSound.setAttribute('radius', '0.2');
    motorSound.setAttribute('material', 'color: #FF5722; emissive: #FF5722; emissiveIntensity: 0.3');
    motorSound.setAttribute('animation__blink', 'property: material.emissiveIntensity; to: 0.8; dur: 1000; dir: alternate; loop: true');
    sceneEl.appendChild(motorSound);
}

function createFarmBuildings(sceneEl) {
    // Farmer's shed
    const shed = document.createElement('a-box');
    shed.setAttribute('position', '-15 2 -25');
    shed.setAttribute('width', '8');
    shed.setAttribute('height', '4');
    shed.setAttribute('depth', '6');
    shed.setAttribute('material', 'color: #8B4513; roughness: 0.9');
    shed.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(shed);
    
    // Shed roof
    const shedRoof = document.createElement('a-box');
    shedRoof.setAttribute('position', '-15 4.5 -25');
    shedRoof.setAttribute('width', '9');
    shedRoof.setAttribute('height', '0.4');
    shedRoof.setAttribute('depth', '7');
    shedRoof.setAttribute('material', 'color: #654321');
    sceneEl.appendChild(shedRoof);
    
    // Storage silos
    const silo1 = document.createElement('a-cylinder');
    silo1.setAttribute('position', '20 3 -20');
    silo1.setAttribute('radius', '2');
    silo1.setAttribute('height', '6');
    silo1.setAttribute('material', 'color: #E0E0E0; metalness: 0.7; roughness: 0.3');
    silo1.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(silo1);
    
    // Silo top
    const siloTop = document.createElement('a-cone');
    siloTop.setAttribute('position', '20 6.5 -20');
    siloTop.setAttribute('radius-bottom', '2');
    siloTop.setAttribute('radius-top', '0.5');
    siloTop.setAttribute('height', '1');
    siloTop.setAttribute('material', 'color: #BDBDBD; metalness: 0.8');
    sceneEl.appendChild(siloTop);
    
    // Greenhouse structure
    const greenhouse = document.createElement('a-box');
    greenhouse.setAttribute('position', '25 2 5');
    greenhouse.setAttribute('width', '12');
    greenhouse.setAttribute('height', '4');
    greenhouse.setAttribute('depth', '8');
    greenhouse.setAttribute('material', 'color: #E8F5E8; opacity: 0.7; transparent: true');
    greenhouse.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(greenhouse);
    
    // Greenhouse frame
    for (let i = 0; i < 5; i++) {
        const frame = document.createElement('a-cylinder');
        frame.setAttribute('position', `${19 + i * 3} 2 5`);
        frame.setAttribute('radius', '0.05');
        frame.setAttribute('height', '4');
        frame.setAttribute('material', 'color: #37474F; metalness: 0.8');
        sceneEl.appendChild(frame);
    }
}

function createFarmEquipment(sceneEl) {
    // Tractor
    const tractor = document.createElement('a-entity');
    tractor.setAttribute('position', '10 0 -15');
    
    // Tractor body
    const tractorBody = document.createElement('a-box');
    tractorBody.setAttribute('position', '0 1 0');
    tractorBody.setAttribute('width', '4');
    tractorBody.setAttribute('height', '2');
    tractorBody.setAttribute('depth', '6');
    tractorBody.setAttribute('material', 'color: #FF5722; metalness: 0.6; roughness: 0.4');
    tractorBody.setAttribute('shadow', 'cast: true');
    tractor.appendChild(tractorBody);
    
    // Tractor wheels
    const wheel1 = document.createElement('a-cylinder');
    wheel1.setAttribute('position', '-2.2 0.8 -2');
    wheel1.setAttribute('radius', '0.8');
    wheel1.setAttribute('height', '0.4');
    wheel1.setAttribute('material', 'color: #212121');
    wheel1.setAttribute('rotation', '0 0 90');
    tractor.appendChild(wheel1);
    
    const wheel2 = document.createElement('a-cylinder');
    wheel2.setAttribute('position', '2.2 0.8 -2');
    wheel2.setAttribute('radius', '0.8');
    wheel2.setAttribute('height', '0.4');
    wheel2.setAttribute('material', 'color: #212121');
    wheel2.setAttribute('rotation', '0 0 90');
    tractor.appendChild(wheel2);
    
    const wheel3 = document.createElement('a-cylinder');
    wheel3.setAttribute('position', '-2.2 1.2 2');
    wheel3.setAttribute('radius', '1.2');
    wheel3.setAttribute('height', '0.6');
    wheel3.setAttribute('material', 'color: #212121');
    wheel3.setAttribute('rotation', '0 0 90');
    tractor.appendChild(wheel3);
    
    const wheel4 = document.createElement('a-cylinder');
    wheel4.setAttribute('position', '2.2 1.2 2');
    wheel4.setAttribute('radius', '1.2');
    wheel4.setAttribute('height', '0.6');
    wheel4.setAttribute('material', 'color: #212121');
    wheel4.setAttribute('rotation', '0 0 90');
    tractor.appendChild(wheel4);
    
    sceneEl.appendChild(tractor);
    
    // Farm tools scattered around
    const tools = [
        {pos: '-8 0.1 -10', type: 'hoe'},
        {pos: '-5 0.1 -12', type: 'shovel'},
        {pos: '15 0.1 -8', type: 'bucket'},
        {pos: '12 0.1 -10', type: 'rake'}
    ];
    
    tools.forEach(tool => {
        const toolEntity = document.createElement('a-entity');
        toolEntity.setAttribute('position', tool.pos);
        
        switch(tool.type) {
            case 'hoe':
                const hoe = document.createElement('a-cylinder');
                hoe.setAttribute('radius', '0.03');
                hoe.setAttribute('height', '1.5');
                hoe.setAttribute('material', 'color: #8B4513');
                hoe.setAttribute('rotation', '45 0 0');
                toolEntity.appendChild(hoe);
                break;
            case 'shovel':
                const shovel = document.createElement('a-cylinder');
                shovel.setAttribute('radius', '0.04');
                shovel.setAttribute('height', '1.2');
                shovel.setAttribute('material', 'color: #8B4513');
                const shovelBlade = document.createElement('a-box');
                shovelBlade.setAttribute('position', '0 0.7 0');
                shovelBlade.setAttribute('width', '0.3');
                shovelBlade.setAttribute('height', '0.4');
                shovelBlade.setAttribute('depth', '0.05');
                shovelBlade.setAttribute('material', 'color: #757575; metalness: 0.8');
                toolEntity.appendChild(shovel);
                toolEntity.appendChild(shovelBlade);
                break;
            case 'bucket':
                const bucket = document.createElement('a-cylinder');
                bucket.setAttribute('radius', '0.3');
                bucket.setAttribute('height', '0.4');
                bucket.setAttribute('material', 'color: #9E9E9E; metalness: 0.7');
                toolEntity.appendChild(bucket);
                break;
            case 'rake':
                const rake = document.createElement('a-cylinder');
                rake.setAttribute('radius', '0.03');
                rake.setAttribute('height', '1.2');
                rake.setAttribute('material', 'color: #8B4513');
                rake.setAttribute('rotation', '30 0 0');
                toolEntity.appendChild(rake);
                break;
        }
        
        sceneEl.appendChild(toolEntity);
    });
}

function createFarmEnvironment(sceneEl) {
    // Farm trees and vegetation
    const farmTrees = [
        {pos: '-25 0 -10', size: 1.5, color: '#2E7D32'},
        {pos: '30 0 -5', size: 2, color: '#388E3C'},
        {pos: '-20 0 15', size: 1.8, color: '#43A047'},
        {pos: '25 0 20', size: 1.6, color: '#4CAF50'}
    ];
    
    farmTrees.forEach(tree => {
        const treeEntity = document.createElement('a-entity');
        treeEntity.setAttribute('position', tree.pos);
        
        // Trunk
        const trunk = document.createElement('a-cylinder');
        trunk.setAttribute('position', `0 ${tree.size} 0`);
        trunk.setAttribute('radius', '0.2');
        trunk.setAttribute('height', `${tree.size * 2}`);
        trunk.setAttribute('material', 'color: #5D4037');
        treeEntity.appendChild(trunk);
        
        // Canopy
        const canopy = document.createElement('a-sphere');
        canopy.setAttribute('position', `0 ${tree.size * 2.5} 0`);
        canopy.setAttribute('radius', `${tree.size * 1.2}`);
        canopy.setAttribute('material', `color: ${tree.color}; opacity: 0.9`);
        treeEntity.appendChild(canopy);
        
        // Tree shadow
        const shadow = document.createElement('a-circle');
        shadow.setAttribute('position', '0 0.02 0');
        shadow.setAttribute('radius', `${tree.size * 1.5}`);
        shadow.setAttribute('rotation', '-90 0 0');
        shadow.setAttribute('material', 'color: #000; opacity: 0.3');
        treeEntity.appendChild(shadow);
        
        sceneEl.appendChild(treeEntity);
    });
    
    // Scarecrow
    const scarecrow = document.createElement('a-entity');
    scarecrow.setAttribute('position', '0 0 -20');
    
    // Scarecrow post
    const post = document.createElement('a-cylinder');
    post.setAttribute('position', '0 1.5 0');
    post.setAttribute('radius', '0.08');
    post.setAttribute('height', '3');
    post.setAttribute('material', 'color: #8B4513');
    scarecrow.appendChild(post);
    
    // Scarecrow head
    const head = document.createElement('a-sphere');
    head.setAttribute('position', '0 2.8 0');
    head.setAttribute('radius', '0.25');
    head.setAttribute('material', 'color: #FFEB3B');
    scarecrow.appendChild(head);
    
    // Hat
    const hat = document.createElement('a-cylinder');
    hat.setAttribute('position', '0 3.2 0');
    hat.setAttribute('radius', '0.3');
    hat.setAttribute('height', '0.2');
    hat.setAttribute('material', 'color: #8B4513');
    scarecrow.appendChild(hat);
    
    // Arms
    const arm = document.createElement('a-cylinder');
    arm.setAttribute('position', '0 2.3 0');
    arm.setAttribute('radius', '0.05');
    arm.setAttribute('height', '2');
    arm.setAttribute('material', 'color: #8B4513');
    arm.setAttribute('rotation', '0 0 90');
    scarecrow.appendChild(arm);
    
    // Clothes hanging
    const shirt = document.createElement('a-box');
    shirt.setAttribute('position', '0 2.3 0');
    shirt.setAttribute('width', '0.8');
    shirt.setAttribute('height', '1');
    shirt.setAttribute('depth', '0.3');
    shirt.setAttribute('material', 'color: #2196F3; opacity: 0.8');
    scarecrow.appendChild(shirt);
    
    sceneEl.appendChild(scarecrow);
    
    // Birds flying around
    for (let i = 0; i < 3; i++) {
        const bird = document.createElement('a-sphere');
        bird.setAttribute('position', `${Math.random() * 40 - 20} ${8 + Math.random() * 5} ${Math.random() * 40 - 20}`);
        bird.setAttribute('radius', '0.1');
        bird.setAttribute('material', 'color: #424242');
        bird.setAttribute('animation__fly', `property: position; to: ${Math.random() * 40 - 20} ${8 + Math.random() * 5} ${Math.random() * 40 - 20}; dur: ${5000 + Math.random() * 5000}; loop: true; dir: alternate; easing: easeInOutSine`);
        sceneEl.appendChild(bird);
    }
    
    // Wind effect on grass
    for (let i = 0; i < 20; i++) {
        const grass = document.createElement('a-cylinder');
        grass.setAttribute('position', `${Math.random() * 60 - 30} 0.2 ${Math.random() * 60 - 30}`);
        grass.setAttribute('radius', '0.02');
        grass.setAttribute('height', '0.4');
        grass.setAttribute('material', 'color: #66BB6A');
        grass.setAttribute('animation__sway', `property: rotation; to: ${Math.random() * 10 - 5} 0 ${Math.random() * 10 - 5}; dur: ${2000 + Math.random() * 2000}; loop: true; dir: alternate; easing: easeInOutSine`);
        sceneEl.appendChild(grass);
    }
}

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
    
    // Portal particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('a-sphere');
        particle.setAttribute('position', `${Math.cos(i * Math.PI / 4) * 3} ${0.5 + Math.random() * 2} ${Math.sin(i * Math.PI / 4) * 3}`);
        particle.setAttribute('radius', '0.05');
        particle.setAttribute('material', 'color: #64B5F6; emissive: #64B5F6; emissiveIntensity: 0.5; opacity: 0.8');
        particle.setAttribute('animation__float', `property: position; to: ${Math.cos(i * Math.PI / 4) * 3} ${3 + Math.random() * 2} ${Math.sin(i * Math.PI / 4) * 3}; dur: ${3000 + Math.random() * 2000}; loop: true; dir: alternate; easing: easeInOutSine`);
        portalContainer.appendChild(particle);
    }
    
    portalContainer.appendChild(returnPortal);
    sceneEl.appendChild(portalContainer);
}

// Export function for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadEnhancedFarmLocation };
}