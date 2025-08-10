// Enhanced Library Location - locations/library.js
function loadEnhancedLibraryLocation(sceneEl) {
    console.log('Loading Enhanced Library Location...');
    
    updateLocationUI('📚 Perpustakaan Desa Harmoni', 
        'Anda berada di perpustakaan desa yang dilengkapi dengan arsip digital dan pusat data. Tersedia dokumen historis, laporan penelitian, data statistik desa, dan akses database online untuk mendukung investigasi sosiologi Anda.');
    
    // Library ground with wooden flooring
    const mainGround = document.createElement('a-plane');
    mainGround.setAttribute('position', '0 0 0');
    mainGround.setAttribute('rotation', '-90 0 0');
    mainGround.setAttribute('width', '100');
    mainGround.setAttribute('height', '100');
    mainGround.setAttribute('material', 'color: #8D6E63; roughness: 0.9; metalness: 0.1');
    mainGround.setAttribute('shadow', 'receive: true');
    sceneEl.appendChild(mainGround);
    
    // Wooden pattern overlay
    for (let i = 0; i < 10; i++) {
        const plank = document.createElement('a-plane');
        plank.setAttribute('position', `${-45 + i * 10} 0.001 0`);
        plank.setAttribute('rotation', '-90 0 0');
        plank.setAttribute('width', '9.8');
        plank.setAttribute('height', '100');
        plank.setAttribute('material', `color: ${i % 2 === 0 ? '#795548' : '#6D4C41'}; opacity: 0.8; transparent: true`);
        sceneEl.appendChild(plank);
    }
    
    // Main library building complex
    createLibraryBuilding(sceneEl);
    createBookShelves(sceneEl);
    createReadingAreas(sceneEl);
    createDigitalCenter(sceneEl);
    createArchiveSection(sceneEl);
    
    // Interactive document stations
    createDocumentStations(sceneEl);
    
    // Library environment and atmosphere
    createLibraryEnvironment(sceneEl);
    
    // Return Portal
    addEnhancedReturnPortal(sceneEl, '🏠 KEMBALI KE BALAI DESA', '0 0.1 15');
    
    console.log('Enhanced Library Location loaded successfully');
}

function createLibraryBuilding(sceneEl) {
    // Main library building
    const mainBuilding = document.createElement('a-box');
    mainBuilding.setAttribute('position', '0 4 -10');
    mainBuilding.setAttribute('width', '25');
    mainBuilding.setAttribute('height', '8');
    mainBuilding.setAttribute('depth', '20');
    mainBuilding.setAttribute('material', 'color: #5D4037; roughness: 0.8; metalness: 0.2');
    mainBuilding.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(mainBuilding);
    
    // Library roof
    const roof = document.createElement('a-box');
    roof.setAttribute('position', '0 8.5 -10');
    roof.setAttribute('width', '27');
    roof.setAttribute('height', '1');
    roof.setAttribute('depth', '22');
    roof.setAttribute('material', 'color: #4E342E; metalness: 0.3; roughness: 0.9');
    sceneEl.appendChild(roof);
    
    // Classical columns
    const columnPositions = [-8, -4, 0, 4, 8];
    columnPositions.forEach(x => {
        const column = document.createElement('a-cylinder');
        column.setAttribute('position', `${x} 4 0`);
        column.setAttribute('radius', '0.4');
        column.setAttribute('height', '8');
        column.setAttribute('material', 'color: #8D6E63; roughness: 0.7; metalness: 0.2');
        column.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(column);
        
        // Column capital
        const capital = document.createElement('a-cylinder');
        capital.setAttribute('position', `${x} 8.2 0`);
        capital.setAttribute('radius', '0.6');
        capital.setAttribute('height', '0.4');
        capital.setAttribute('material', 'color: #A1887F; roughness: 0.6');
        sceneEl.appendChild(capital);
        
        // Column base
        const base = document.createElement('a-cylinder');
        base.setAttribute('position', `${x} 0.2 0`);
        base.setAttribute('radius', '0.6');
        base.setAttribute('height', '0.4');
        base.setAttribute('material', 'color: #A1887F; roughness: 0.6');
        sceneEl.appendChild(base);
    });
    
    // Grand entrance
    const entrance = document.createElement('a-box');
    entrance.setAttribute('position', '0 2 1');
    entrance.setAttribute('width', '6');
    entrance.setAttribute('height', '4');
    entrance.setAttribute('depth', '0.5');
    entrance.setAttribute('material', 'color: #3E2723; roughness: 0.9');
    sceneEl.appendChild(entrance);
    
    // Entrance steps
    for (let i = 0; i < 3; i++) {
        const step = document.createElement('a-box');
        step.setAttribute('position', `0 ${0.2 + i * 0.2} ${2 + i * 0.3}`);
        step.setAttribute('width', `${8 - i}`);
        step.setAttribute('height', '0.2');
        step.setAttribute('depth', '0.8');
        step.setAttribute('material', 'color: #6D4C41; roughness: 0.8');
        step.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(step);
    }
    
    // Library sign
    const librarySign = document.createElement('a-text');
    librarySign.setAttribute('position', '0 6.5 1.1');
    librarySign.setAttribute('value', 'PERPUSTAKAAN DESA HARMONI Pusat Informasi & Dokumentasi Est. 1995');
    librarySign.setAttribute('align', 'center');
    librarySign.setAttribute('color', '#FFFFFF');
    librarySign.setAttribute('font', 'roboto');
    librarySign.setAttribute('text', 'width: 18; wrapCount: 35');
    librarySign.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    librarySign.setAttribute('material', 'color: rgba(93,64,55,0.9); opacity: 0.9');
    sceneEl.appendChild(librarySign);
    
    // Windows with warm light
    const windowPositions = [
        {x: -10, y: 4, z: 1}, {x: -6, y: 4, z: 1}, {x: 6, y: 4, z: 1}, {x: 10, y: 4, z: 1},
        {x: -10, y: 6, z: 1}, {x: -6, y: 6, z: 1}, {x: 6, y: 6, z: 1}, {x: 10, y: 6, z: 1}
    ];
    
    windowPositions.forEach(pos => {
        const window = document.createElement('a-plane');
        window.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
        window.setAttribute('width', '2');
        window.setAttribute('height', '1.5');
        window.setAttribute('material', 'color: #FFF8E1; opacity: 0.8; transparent: true; emissive: #FFF8E1; emissiveIntensity: 0.2');
        sceneEl.appendChild(window);
        
        // Window frame
        const frame = document.createElement('a-plane');
        frame.setAttribute('position', `${pos.x} ${pos.y} ${pos.z - 0.01}`);
        frame.setAttribute('width', '2.2');
        frame.setAttribute('height', '1.7');
        frame.setAttribute('material', 'color: #3E2723; opacity: 0.9');
        sceneEl.appendChild(frame);
    });
}

function createBookShelves(sceneEl) {
    // Main book collection areas
    const shelfSections = [
        {center: [-15, 0, -10], rows: 4, cols: 3, category: 'Sejarah Lokal'},
        {center: [15, 0, -10], rows: 4, cols: 3, category: 'Pertanian & Teknologi'},
        {center: [-15, 0, -20], rows: 4, cols: 3, category: 'Sosial & Ekonomi'},
        {center: [15, 0, -20], rows: 4, cols: 3, category: 'Lingkungan & Ekologi'}
    ];
    
    shelfSections.forEach(section => {
        // Section label
        const sectionLabel = document.createElement('a-text');
        sectionLabel.setAttribute('position', `${section.center[0]} 4 ${section.center[2] + 5}`);
        sectionLabel.setAttribute('value', `📚 ${section.category.toUpperCase()}`);
        sectionLabel.setAttribute('align', 'center');
        sectionLabel.setAttribute('color', '#3E2723');
        sectionLabel.setAttribute('font', 'roboto');
        sectionLabel.setAttribute('text', 'width: 12; wrapCount: 25');
        sceneEl.appendChild(sectionLabel);
        
        for (let row = 0; row < section.rows; row++) {
            for (let col = 0; col < section.cols; col++) {
                const shelfX = section.center[0] + (col - 1) * 4;
                const shelfY = section.center[1] + 2;
                const shelfZ = section.center[2] + (row - 1.5) * 3;
                
                // Shelf structure
                const shelf = document.createElement('a-box');
                shelf.setAttribute('position', `${shelfX} ${shelfY} ${shelfZ}`);
                shelf.setAttribute('width', '3');
                shelf.setAttribute('height', '4');
                shelf.setAttribute('depth', '0.4');
                shelf.setAttribute('material', 'color: #8D6E63; roughness: 0.8; metalness: 0.1');
                shelf.setAttribute('shadow', 'cast: true');
                shelf.classList.add('clickable');
                shelf.setAttribute('data-dialog', 'bookshelf');
                sceneEl.appendChild(shelf);
                
                // Books on shelves
                for (let shelfLevel = 0; shelfLevel < 4; shelfLevel++) {
                    for (let bookPos = 0; bookPos < 15; bookPos++) {
                        const book = document.createElement('a-box');
                        book.setAttribute('position', 
                            `${shelfX - 1.4 + bookPos * 0.2} ${0.5 + shelfLevel * 0.9} ${shelfZ + 0.15}`);
                        book.setAttribute('width', '0.15');
                        book.setAttribute('height', `${0.6 + Math.random() * 0.3}`);
                        
                        book.setAttribute('depth', '0.08');
                        
                        // Color books by category
                        let bookColor;
                        switch(section.category.split(' ')[0]) {
                            case 'Sejarah': bookColor = `hsl(${30 + bookPos * 10}, 70%, 50%)`; break;
                            case 'Pertanian': bookColor = `hsl(${120 + bookPos * 8}, 60%, 45%)`; break;
                            case 'Sosial': bookColor = `hsl(${200 + bookPos * 12}, 65%, 55%)`; break;
                            case 'Lingkungan': bookColor = `hsl(${90 + bookPos * 15}, 70%, 40%)`; break;
                            default: bookColor = `hsl(${bookPos * 24}, 60%, 50%)`;
                        }
                        
                        book.setAttribute('material', `color: ${bookColor}; roughness: 0.8`);
                        sceneEl.appendChild(book);
                    }
                }
                
                // Shelf labels
                const shelfLabel = document.createElement('a-text');
                shelfLabel.setAttribute('position', `${shelfX} ${shelfY + 2.2} ${shelfZ + 0.25}`);
                shelfLabel.setAttribute('value', `${section.category}
Seksi ${row + 1}.${col + 1}`);
                shelfLabel.setAttribute('align', 'center');
                shelfLabel.setAttribute('color', '#5D4037');
                shelfLabel.setAttribute('font', 'roboto');
                shelfLabel.setAttribute('text', 'width: 6; wrapCount: 15');
                sceneEl.appendChild(shelfLabel);
            }
        }
    });
}

function createReadingAreas(sceneEl) {
    // Central reading tables
    const tablePositions = [
        {pos: [-5, 0, 0], seats: 4},
        {pos: [5, 0, 0], seats: 4},
        {pos: [0, 0, 5], seats: 6},
        {pos: [-8, 0, 8], seats: 2},
        {pos: [8, 0, 8], seats: 2}
    ];
    
    tablePositions.forEach(tableInfo => {
        // Reading table
        const table = document.createElement('a-cylinder');
        table.setAttribute('position', `${tableInfo.pos[0]} 0.8 ${tableInfo.pos[1]}`);
        table.setAttribute('radius', tableInfo.seats === 6 ? '2' : '1.5');
        table.setAttribute('height', '0.1');
        table.setAttribute('material', 'color: #6D4C41; roughness: 0.7; metalness: 0.2');
        table.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(table);
        
        // Table legs
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI * 2) / 4;
            const radius = tableInfo.seats === 6 ? 1.5 : 1.2;
            leg.setAttribute('position', 
                `${tableInfo.pos[0] + Math.cos(angle) * radius} 0.4 ${tableInfo.pos[1] + Math.sin(angle) * radius}`);
            leg.setAttribute('radius', '0.05');
            leg.setAttribute('height', '0.8');
            leg.setAttribute('material', 'color: #5D4037; roughness: 0.8');
            sceneEl.appendChild(leg);
        }
        
        // Chairs around table
        for (let i = 0; i < tableInfo.seats; i++) {
            const angle = (i * Math.PI * 2) / tableInfo.seats;
            const chairRadius = tableInfo.seats === 6 ? 2.5 : 2;
            const chairX = tableInfo.pos[0] + Math.cos(angle) * chairRadius;
            const chairZ = tableInfo.pos[1] + Math.sin(angle) * chairRadius;
            
            // Chair seat
            const chairSeat = document.createElement('a-cylinder');
            chairSeat.setAttribute('position', `${chairX} 0.5 ${chairZ}`);
            chairSeat.setAttribute('radius', '0.3');
            chairSeat.setAttribute('height', '0.05');
            chairSeat.setAttribute('material', 'color: #8D6E63; roughness: 0.8');
            sceneEl.appendChild(chairSeat);
            
            // Chair back
            const chairBack = document.createElement('a-box');
            chairBack.setAttribute('position', 
                `${chairX + Math.cos(angle) * 0.25} 0.9 ${chairZ + Math.sin(angle) * 0.25}`);
            chairBack.setAttribute('width', '0.6');
            chairBack.setAttribute('height', '0.8');
            chairBack.setAttribute('depth', '0.05');
            chairBack.setAttribute('material', 'color: #8D6E63; roughness: 0.8');
            chairBack.setAttribute('rotation', `0 ${angle * 180 / Math.PI} 0`);
            sceneEl.appendChild(chairBack);
            
            // Chair legs
            for (let j = 0; j < 4; j++) {
                const legAngle = (j * Math.PI) / 2;
                const leg = document.createElement('a-cylinder');
                leg.setAttribute('position', 
                    `${chairX + Math.cos(legAngle) * 0.2} 0.25 ${chairZ + Math.sin(legAngle) * 0.2}`);
                leg.setAttribute('radius', '0.02');
                leg.setAttribute('height', '0.5');
                leg.setAttribute('material', 'color: #5D4037; roughness: 0.9');
                sceneEl.appendChild(leg);
            }
        }
        
        // Reading materials on tables
        if (Math.random() > 0.5) {
            const book = document.createElement('a-box');
            book.setAttribute('position', 
                `${tableInfo.pos[0] + (Math.random() - 0.5) * 2} 0.87 ${tableInfo.pos[1] + (Math.random() - 0.5) * 2}`);
            book.setAttribute('width', '0.3');
            book.setAttribute('height', '0.04');
            book.setAttribute('depth', '0.4');
            book.setAttribute('material', `color: hsl(${Math.random() * 360}, 70%, 60%); roughness: 0.8`);
            sceneEl.appendChild(book);
        }
        
        // Table lamp
        const lampPost = document.createElement('a-cylinder');
        lampPost.setAttribute('position', `${tableInfo.pos[0]} 1.5 ${tableInfo.pos[1]}`);
        lampPost.setAttribute('radius', '0.02');
        lampPost.setAttribute('height', '0.7');
        lampPost.setAttribute('material', 'color: #37474F; metalness: 0.8');
        sceneEl.appendChild(lampPost);
        
        const lampShade = document.createElement('a-cone');
        lampShade.setAttribute('position', `${tableInfo.pos[0]} 1.9 ${tableInfo.pos[1]}`);
        lampShade.setAttribute('radius-bottom', '0.3');
        lampShade.setAttribute('radius-top', '0.1');
        lampShade.setAttribute('height', '0.3');
        lampShade.setAttribute('material', 'color: #FFF8E1; opacity: 0.8; emissive: #FFF8E1; emissiveIntensity: 0.3');
        sceneEl.appendChild(lampShade);
    });
}

function createDigitalCenter(sceneEl) {
    // Computer workstations
    const computerArea = document.createElement('a-entity');
    computerArea.setAttribute('position', '20 0 5');
    
    // Computer desks
    for (let i = 0; i < 6; i++) {
        const deskX = (i % 3) * 3 - 3;
        const deskZ = Math.floor(i / 3) * 2.5;
        
        // Desk
        const desk = document.createElement('a-box');
        desk.setAttribute('position', `${deskX} 0.8 ${deskZ}`);
        desk.setAttribute('width', '2.5');
        desk.setAttribute('height', '0.1');
        desk.setAttribute('depth', '1.5');
        desk.setAttribute('material', 'color: #6D4C41; roughness: 0.7; metalness: 0.2');
        desk.setAttribute('shadow', 'cast: true');
        computerArea.appendChild(desk);
        
        // Computer monitor
        const monitor = document.createElement('a-box');
        monitor.setAttribute('position', `${deskX} 1.3 ${deskZ - 0.3}`);
        monitor.setAttribute('width', '1.2');
        monitor.setAttribute('height', '0.8');
        monitor.setAttribute('depth', '0.1');
        monitor.setAttribute('material', 'color: #212121; metalness: 0.8; roughness: 0.2');
        computerArea.appendChild(monitor);
        
        // Monitor screen
        const screen = document.createElement('a-plane');
        screen.setAttribute('position', `${deskX} 1.3 ${deskZ - 0.25}`);
        screen.setAttribute('width', '1');
        screen.setAttribute('height', '0.6');
        screen.setAttribute('material', 'color: #1976D2; emissive: #1976D2; emissiveIntensity: 0.4');
        screen.classList.add('clickable');
        screen.setAttribute('data-dialog', 'digital_database');
        computerArea.appendChild(screen);
        
        // Screen content
        const screenText = document.createElement('a-text');
        screenText.setAttribute('position', `${deskX} 1.3 ${deskZ - 0.24}`);
        screenText.setAttribute('value', 'DATABASE DESA Data Demografis Laporan Tahunan Arsip Digital Akses Internet');
        screenText.setAttribute('align', 'center');
        screenText.setAttribute('color', '#E3F2FD');
        screenText.setAttribute('font', 'monospace');
        screenText.setAttribute('text', 'width: 6; wrapCount: 20');
        computerArea.appendChild(screenText);
        
        // Keyboard
        const keyboard = document.createElement('a-box');
        keyboard.setAttribute('position', `${deskX} 0.87 ${deskZ + 0.2}`);
        keyboard.setAttribute('width', '0.8');
        keyboard.setAttribute('height', '0.04');
        keyboard.setAttribute('depth', '0.3');
        keyboard.setAttribute('material', 'color: #424242; roughness: 0.8');
        computerArea.appendChild(keyboard);
        
        // Mouse
        const mouse = document.createElement('a-box');
        mouse.setAttribute('position', `${deskX + 0.6} 0.87 ${deskZ + 0.2}`);
        mouse.setAttribute('width', '0.15');
        mouse.setAttribute('height', '0.03');
        mouse.setAttribute('depth', '0.2');
        mouse.setAttribute('material', 'color: #616161; roughness: 0.7');
        computerArea.appendChild(mouse);
        
        // Office chair
        const chair = document.createElement('a-cylinder');
        chair.setAttribute('position', `${deskX} 0.5 ${deskZ + 1}`);
        chair.setAttribute('radius', '0.4');
        chair.setAttribute('height', '0.05');
        chair.setAttribute('material', 'color: #1976D2; roughness: 0.6');
        computerArea.appendChild(chair);
    }
    
    // Digital center sign
    const digitalSign = document.createElement('a-text');
    digitalSign.setAttribute('position', '20 3 8');
    digitalSign.setAttribute('value', '💻 PUSAT DIGITAL Akses Database & Internet Reservasi: 30 menit');
    digitalSign.setAttribute('align', 'center');
    digitalSign.setAttribute('color', '#1976D2');
    digitalSign.setAttribute('font', 'roboto');
    digitalSign.setAttribute('text', 'width: 12; wrapCount: 25');
    digitalSign.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    digitalSign.setAttribute('material', 'color: rgba(255,255,255,0.9); opacity: 0.9');
    computerArea.appendChild(digitalSign);
    
    sceneEl.appendChild(computerArea);
}

function createArchiveSection(sceneEl) {
    // Archive storage area
    const archiveArea = document.createElement('a-entity');
    archiveArea.setAttribute('position', '-20 0 5');
    
    // Archive cabinets
    for (let i = 0; i < 8; i++) {
        const cabinetX = (i % 4) * 2.5 - 3.75;
        const cabinetZ = Math.floor(i / 4) * 3;
        
        const cabinet = document.createElement('a-box');
        cabinet.setAttribute('position', `${cabinetX} 1.5 ${cabinetZ}`);
        cabinet.setAttribute('width', '2');
        cabinet.setAttribute('height', '3');
        cabinet.setAttribute('depth', '1');
        cabinet.setAttribute('material', 'color: #5D4037; roughness: 0.8; metalness: 0.2');
        cabinet.setAttribute('shadow', 'cast: true');
        cabinet.classList.add('clickable');
        cabinet.setAttribute('data-dialog', 'archive_documents');
        archiveArea.appendChild(cabinet);
        
        // Cabinet drawers
        for (let j = 0; j < 3; j++) {
            const drawer = document.createElement('a-box');
            drawer.setAttribute('position', `${cabinetX} ${0.5 + j} ${cabinetZ + 0.45}`);
            drawer.setAttribute('width', '1.8');
            drawer.setAttribute('height', '0.8');
            drawer.setAttribute('depth', '0.1');
            drawer.setAttribute('material', 'color: #6D4C41; roughness: 0.9');
            archiveArea.appendChild(drawer);
            
            // Drawer handle
            const handle = document.createElement('a-cylinder');
            handle.setAttribute('position', `${cabinetX + 0.7} ${0.5 + j} ${cabinetZ + 0.52}`);
            handle.setAttribute('radius', '0.03');
            handle.setAttribute('height', '0.15');
            handle.setAttribute('material', 'color: #37474F; metalness: 0.8');
            handle.setAttribute('rotation', '0 0 90');
            archiveArea.appendChild(handle);
        }
        
        // Cabinet labels
        const label = document.createElement('a-text');
        label.setAttribute('position', `${cabinetX} 3.2 ${cabinetZ + 0.6}`);
        label.setAttribute('value', `ARSIP ${String.fromCharCode(65 + i)}
${2015 + i}-${2023}`);
        label.setAttribute('align', 'center');
        label.setAttribute('color', '#3E2723');
        label.setAttribute('font', 'roboto');
        label.setAttribute('text', 'width: 6; wrapCount: 15');
        archiveArea.appendChild(label);
    }
    
    // Archive sign
    const archiveSign = document.createElement('a-text');
    archiveSign.setAttribute('position', '-20 3.5 8');
    archiveSign.setAttribute('value', '📁 ARSIP DOKUMEN Dokumen Historis 2015-2023 Akses Terbatas');
    archiveSign.setAttribute('align', 'center');
    archiveSign.setAttribute('color', '#5D4037');
    archiveSign.setAttribute('font', 'roboto');
    archiveSign.setAttribute('text', 'width: 12; wrapCount: 25');
    archiveSign.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    archiveSign.setAttribute('material', 'color: rgba(255,255,255,0.9); opacity: 0.9');
    archiveArea.appendChild(archiveSign);
    
    sceneEl.appendChild(archiveArea);
}

function createDocumentStations(sceneEl) {
    // Interactive document examination stations
    const stationPositions = [
        {pos: [0, 0, -5], type: 'harvest_data', title: 'Data Hasil Panen'},
        {pos: [-8, 0, -5], type: 'water_report', title: 'Laporan Kualitas Air'},
        {pos: [8, 0, -5], type: 'economic_report', title: 'Laporan Ekonomi Desa'},
        {pos: [0, 0, -15], type: 'environmental_study', title: 'Studi Lingkungan'}
    ];
    
    stationPositions.forEach(station => {
        // Document table
        const table = document.createElement('a-box');
        table.setAttribute('position', `${station.pos[0]} 0.8 ${station.pos[1]}`);
        table.setAttribute('width', '3');
        table.setAttribute('height', '0.1');
        table.setAttribute('depth', '2');
        table.setAttribute('material', 'color: #6D4C41; roughness: 0.7; metalness: 0.2');
        table.setAttribute('shadow', 'cast: true');
        sceneEl.appendChild(table);
        
        // Documents on table
        const document1 = document.createElement('a-plane');
        document1.setAttribute('position', `${station.pos[0] - 0.5} 0.87 ${station.pos[1]}`);
        document1.setAttribute('width', '0.8');
        document1.setAttribute('height', '1');
        document1.setAttribute('material', 'color: #FFFFFF; roughness: 0.9');
        document1.setAttribute('rotation', '-90 0 15');
        document1.classList.add('clickable');
        document1.setAttribute('data-dialog', station.type);
        sceneEl.appendChild(document1);
        
        const document2 = document.createElement('a-plane');
        document2.setAttribute('position', `${station.pos[0] + 0.5} 0.87 ${station.pos[1]}`);
        document2.setAttribute('width', '0.8');
        document2.setAttribute('height', '1');
        document2.setAttribute('material', 'color: #E3F2FD; roughness: 0.9');
        document2.setAttribute('rotation', '-90 0 -10');
        document2.classList.add('clickable');
        document2.setAttribute('data-dialog', station.type + '_supplement');
        sceneEl.appendChild(document2);
        
        // Magnifying glass
        const magnifier = document.createElement('a-ring');
        magnifier.setAttribute('position', `${station.pos[0]} 0.88 ${station.pos[1] + 0.5}`);
        magnifier.setAttribute('radius', '0.15');
        magnifier.setAttribute('radius-outer', '0.18');
        magnifier.setAttribute('rotation', '-90 0 0');
        magnifier.setAttribute('material', 'color: #37474F; metalness: 0.8; roughness: 0.2');
        sceneEl.appendChild(magnifier);
        
        const magnifierHandle = document.createElement('a-cylinder');
        magnifierHandle.setAttribute('radius', '0.02');
        magnifierHandle.setAttribute('height', '0.3');
        magnifierHandle.setAttribute('material', 'color: #8D6E63; roughness: 0.8');
        magnifierHandle.setAttribute('rotation', '0 0 0');
        sceneEl.appendChild(magnifierHandle);
        
        // Station label
        const stationLabel = document.createElement('a-text');
        stationLabel.setAttribute('position', `${station.pos[0]} 1.5 ${station.pos[1] + 1.2}`);
        stationLabel.setAttribute('value', `📄 ${station.title.toUpperCase()}
Klik dokumen untuk membaca`);
        stationLabel.setAttribute('align', 'center');
        stationLabel.setAttribute('color', '#3E2723');
        stationLabel.setAttribute('font', 'roboto');
        stationLabel.setAttribute('text', 'width: 10; wrapCount: 25');
        stationLabel.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
        stationLabel.setAttribute('material', 'color: rgba(255,255,255,0.8); opacity: 0.8');
        sceneEl.appendChild(stationLabel);
        
        // Reading lamp
        const lampBase = document.createElement('a-cylinder');
        lampBase.setAttribute('position', `${station.pos[0] + 1} 0.85 ${station.pos[1] - 0.8}`);
        lampBase.setAttribute('radius', '0.1');
        lampBase.setAttribute('height', '0.1');
        lampBase.setAttribute('material', 'color: #37474F; metalness: 0.8');
        sceneEl.appendChild(lampBase);
        
        const lampArm = document.createElement('a-cylinder');
        lampArm.setAttribute('position', `${station.pos[0] + 1} 1.3 ${station.pos[1] - 0.5}`);
        lampArm.setAttribute('radius', '0.03');
        lampArm.setAttribute('height', '0.8');
        lampArm.setAttribute('material', 'color: #37474F; metalness: 0.8');
        lampArm.setAttribute('rotation', '45 0 0');
        sceneEl.appendChild(lampArm);
        
        const lampHead = document.createElement('a-sphere');
        lampHead.setAttribute('position', `${station.pos[0] + 1} 1.6 ${station.pos[1] - 0.2}`);
        lampHead.setAttribute('radius', '0.1');
        lampHead.setAttribute('material', 'color: #FFF8E1; emissive: #FFF8E1; emissiveIntensity: 0.4');
        sceneEl.appendChild(lampHead);
    });
}

function createLibraryEnvironment(sceneEl) {
    // Ambient lighting fixtures
    const lightPositions = [
        {pos: [0, 6, -10]},
        {pos: [-15, 6, -10]},
        {pos: [15, 6, -10]},
        {pos: [-15, 6, -20]},
        {pos: [15, 6, -20]},
        {pos: [0, 6, 0]}
    ];
    
    lightPositions.forEach(light => {
        // Ceiling light fixture
        const fixture = document.createElement('a-cylinder');
        fixture.setAttribute('position', `${light.pos[0]} ${light.pos[1]} ${light.pos[2]}`);
        fixture.setAttribute('radius', '0.5');
        fixture.setAttribute('height', '0.2');
        fixture.setAttribute('material', 'color: #FFF8E1; emissive: #FFF8E1; emissiveIntensity: 0.3; opacity: 0.8');
        sceneEl.appendChild(fixture);
        
        // Light glow effect
        const glow = document.createElement('a-sphere');
        glow.setAttribute('position', `${light.pos[0]} ${light.pos[1] - 0.3} ${light.pos[2]}`);
        glow.setAttribute('radius', '1.2');
        glow.setAttribute('material', 'color: #FFF8E1; opacity: 0.1; transparent: true');
        glow.setAttribute('animation__glow', 'property: material.opacity; to: 0.2; dur: 3000; dir: alternate; loop: true; easing: easeInOutSine');
        sceneEl.appendChild(glow);
    });
    
    // Information desk
    const infoDesk = document.createElement('a-box');
    infoDesk.setAttribute('position', '0 1 8');
    infoDesk.setAttribute('width', '4');
    infoDesk.setAttribute('height', '0.15');
    infoDesk.setAttribute('depth', '2');
    infoDesk.setAttribute('material', 'color: #6D4C41; roughness: 0.7; metalness: 0.2');
    infoDesk.setAttribute('shadow', 'cast: true');
    sceneEl.appendChild(infoDesk);
    
    // Information display
    const infoBoard = document.createElement('a-plane');
    infoBoard.setAttribute('position', '0 2 7');
    infoBoard.setAttribute('width', '3');
    infoBoard.setAttribute('height', '2');
    infoBoard.setAttribute('material', 'color: #E8F5E8; roughness: 0.9');
    sceneEl.appendChild(infoBoard);
    
    const infoText = document.createElement('a-text');
    infoText.setAttribute('position', '0 2 7.01');
    infoText.setAttribute('value', `INFORMASI PERPUSTAKAAN
📖 Jam Buka: 08:00 - 17:00
💻 Akses Digital: 30 menit
📚 Peminjaman: Maks 3 buku
🔍 Bantuan: Tanya petugas

📊 Koleksi Khusus:
• Data Statistik Desa
• Laporan Penelitian
• Arsip Historis
• Database Online`);
    infoText.setAttribute('align', 'center');
    infoText.setAttribute('color', '#2E7D32');
    infoText.setAttribute('font', 'roboto');
    infoText.setAttribute('text', 'width: 12; wrapCount: 30');
    sceneEl.appendChild(infoText);
    
    // Librarian NPC
    const librarian = document.createElement('a-entity');
    librarian.setAttribute('position', '0 0.9 6');
    librarian.setAttribute('mixin', 'npc');
    librarian.setAttribute('data-dialog', 'librarian');
    
    // Librarian character
    const librarianBody = document.createElement('a-cylinder');
    librarianBody.setAttribute('position', '0 0 0');
    librarianBody.setAttribute('radius', '0.35');
    librarianBody.setAttribute('height', '1.8');
    librarianBody.setAttribute('material', 'color: #7B1FA2; roughness: 0.8');
    librarianBody.setAttribute('shadow', 'cast: true');
    librarian.appendChild(librarianBody);
    
    const librarianHead = document.createElement('a-sphere');
    librarianHead.setAttribute('position', '0 1.4 0');
    librarianHead.setAttribute('radius', '0.28');
    librarianHead.setAttribute('material', 'color: #FDBCB4; roughness: 0.9');
    librarian.appendChild(librarianHead);
    
    // Librarian glasses
    const glasses = document.createElement('a-torus');
    glasses.setAttribute('position', '0 1.42 0.25');
    glasses.setAttribute('radius', '0.12');
    glasses.setAttribute('radius-tubular', '0.015');
    glasses.setAttribute('material', 'color: #424242; metalness: 0.8; roughness: 0.2');
    librarian.appendChild(glasses);
    
    // Hair bun
    const hair = document.createElement('a-sphere');
    hair.setAttribute('position', '0 1.65 -0.15');
    hair.setAttribute('radius', '0.15');
    hair.setAttribute('material', 'color: #3E2723; roughness: 0.9');
    librarian.appendChild(hair);
    
    // Book in hand
    const book = document.createElement('a-box');
    book.setAttribute('position', '0.4 1.1 0');
    book.setAttribute('width', '0.2');
    book.setAttribute('height', '0.3');
    book.setAttribute('depth', '0.05');
    book.setAttribute('material', 'color: #1976D2; roughness: 0.8');
    librarian.appendChild(book);
    
    // Librarian name tag
    const librarianTag = document.createElement('a-text');
    librarianTag.setAttribute('position', '0 2.2 0');
    librarianTag.setAttribute('value', 'Bu Sari Pustakawan');
    librarianTag.setAttribute('align', 'center');
    librarianTag.setAttribute('color', '#7B1FA2');
    librarianTag.setAttribute('font', 'roboto');
    librarianTag.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    librarianTag.setAttribute('material', 'color: rgba(255,255,255,0.9); opacity: 0.9');
    librarianTag.setAttribute('text', 'width: 8; wrapCount: 15');
    librarianTag.setAttribute('animation__bob', 'property: position; to: 0 2.4 0; dir: alternate; dur: 2800; loop: true');
    librarian.appendChild(librarianTag);
    
    const hitbox = document.createElement('a-cylinder');
    hitbox.classList.add('clickable');
    hitbox.setAttribute('radius', '1.2');
    hitbox.setAttribute('height', '2.5');
    hitbox.setAttribute('material', 'opacity: 0; transparent: true');
    hitbox.setAttribute('position', '0 0.5 0');
    librarian.appendChild(hitbox);
    
    sceneEl.appendChild(librarian);
    
    // Study atmosphere elements
    createStudyAtmosphere(sceneEl);
    
    // Decorative plants
    const plantPositions = [
        {pos: [-12, 0, 12]},
        {pos: [12, 0, 12]},
        {pos: [-8, 0, -25]},
        {pos: [8, 0, -25]}
    ];
    
    plantPositions.forEach(plant => {
        // Plant pot
        const pot = document.createElement('a-cylinder');
        pot.setAttribute('position', `${plant.pos[0]} 0.3 ${plant.pos[1]}`);
        pot.setAttribute('radius', '0.4');
        pot.setAttribute('height', '0.6');
        pot.setAttribute('material', 'color: #8D6E63; roughness: 0.8');
        sceneEl.appendChild(pot);
        
        // Plant
        const plantEntity = document.createElement('a-sphere');
        plantEntity.setAttribute('position', `${plant.pos[0]} 0.8 ${plant.pos[1]}`);
        plantEntity.setAttribute('radius', '0.6');
        plantEntity.setAttribute('material', 'color: #4CAF50; opacity: 0.8; roughness: 0.9');
        sceneEl.appendChild(plantEntity);
        
        // Plant leaves
        for (let i = 0; i < 5; i++) {
            const leaf = document.createElement('a-box');
            const angle = (i * Math.PI * 2) / 5;
            leaf.setAttribute('position', 
                `${plant.pos[0] + Math.cos(angle) * 0.4} ${0.8 + Math.random() * 0.3} ${plant.pos[1] + Math.sin(angle) * 0.4}`);
            leaf.setAttribute('width', '0.2');
            leaf.setAttribute('height', '0.4');
            leaf.setAttribute('depth', '0.02');
            leaf.setAttribute('material', 'color: #388E3C; roughness: 0.9');
            leaf.setAttribute('rotation', `0 ${angle * 180 / Math.PI} ${Math.random() * 30 - 15}`);
            leaf.setAttribute('animation__sway', 
                `property: rotation; to: 0 ${angle * 180 / Math.PI} ${Math.random() * 30 - 15 + 10}; dur: ${3000 + Math.random() * 2000}; dir: alternate; loop: true; easing: easeInOutSine`);
            sceneEl.appendChild(leaf);
        }
    });
}

function createStudyAtmosphere(sceneEl) {
    // Floating paper particles (research atmosphere)
    for (let i = 0; i < 8; i++) {
        const paper = document.createElement('a-plane');
        paper.setAttribute('position', 
            `${Math.random() * 40 - 20} ${3 + Math.random() * 2} ${Math.random() * 30 - 15}`);
        paper.setAttribute('width', '0.15');
        paper.setAttribute('height', '0.2');
        paper.setAttribute('material', 'color: #FFFFFF; opacity: 0.7; transparent: true');
        paper.setAttribute('animation__float', 
            `property: position; to: ${Math.random() * 40 - 20} ${4 + Math.random() * 2} ${Math.random() * 30 - 15}; dur: ${6000 + Math.random() * 4000}; dir: alternate; loop: true; easing: easeInOutSine`);
        paper.setAttribute('animation__rotate', 
            `property: rotation; to: ${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}; dur: ${8000 + Math.random() * 4000}; loop: true; easing: linear`);
        sceneEl.appendChild(paper);
    }
    
    // Ambient sound visualization (knowledge waves)
    for (let i = 0; i < 5; i++) {
        const wave = document.createElement('a-ring');
        wave.setAttribute('position', `0 ${1 + i * 0.5} 0`);
        wave.setAttribute('radius-inner', `${8 + i * 2}`);
        wave.setAttribute('radius-outer', `${8.2 + i * 2}`);
        wave.setAttribute('rotation', '-90 0 0');
        wave.setAttribute('material', `color: #E1F5FE; opacity: ${0.1 - i * 0.02}; transparent: true`);
        wave.setAttribute('animation__expand', 
            `property: scale; to: ${1.2 + i * 0.1} ${1.2 + i * 0.1} ${1.2 + i * 0.1}; dur: ${8000 + i * 1000}; dir: alternate; loop: true; easing: easeInOutSine`);
        sceneEl.appendChild(wave);
    }
    
    // Inspirational quotes floating above
    const quotes = [
        "Knowledge is Power",
        "Reading Opens Minds", 
        "Information is Key",
        "Research Reveals Truth"
    ];
    
    quotes.forEach((quote, index) => {
        const quoteText = document.createElement('a-text');
        quoteText.setAttribute('position', 
            `${Math.cos(index * Math.PI / 2) * 15} ${6 + Math.sin(index * 0.5)} ${Math.sin(index * Math.PI / 2) * 15}`);
        quoteText.setAttribute('value', quote);
        quoteText.setAttribute('align', 'center');
        quoteText.setAttribute('color', '#7B1FA2');
        quoteText.setAttribute('font', 'roboto');
        quoteText.setAttribute('text', 'width: 10; wrapCount: 20');
        quoteText.setAttribute('opacity', '0.6');
        quoteText.setAttribute('animation__drift', 
            `property: position; to: ${Math.cos(index * Math.PI / 2) * 18} ${7 + Math.sin(index * 0.5)} ${Math.sin(index * Math.PI / 2) * 18}; dur: ${10000 + index * 1000}; dir: alternate; loop: true; easing: easeInOutSine`);
        sceneEl.appendChild(quoteText);
    });
}

// Enhanced return portal (reusing from previous files)
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
    module.exports = { loadEnhancedLibraryLocation };
}