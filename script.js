document.addEventListener('DOMContentLoaded', () => {
    const mouth = document.getElementById('mouth');
    const foodContainer = document.getElementById('food-container');
    const calorieCountEl = document.getElementById('calorie-count');
    const eatenListEl = document.getElementById('eaten-list');
    const torso = document.getElementById('torso');
    const flashOverlay = document.getElementById('flash-overlay');
    const bodyGroup = document.getElementById('body-group');
    
    let totalCalories = 0;
    const foodsEaten = [];

    const foodData = [
        { name: '피자', emoji: '🍕', kcal: 250, nutrients: { protein: 10, fat: 12, carbs: 30, vitA: 10, vitB: 5, vitC: 2, calcium: 15, iron: 2, zinc: 1, copper: 0.1, manganese: 0.2, iodine: 5, selenium: 5, fiber: 2 } },
        { name: '햄버거', emoji: '🍔', kcal: 500, nutrients: { protein: 25, fat: 30, carbs: 40, vitA: 5, vitB: 15, vitC: 4, calcium: 10, iron: 4, zinc: 3, copper: 0.2, manganese: 0.3, iodine: 10, selenium: 15, fiber: 3 } },
        { name: '치킨', emoji: '🍗', kcal: 300, nutrients: { protein: 20, fat: 18, carbs: 10, vitA: 2, vitB: 10, vitC: 0, calcium: 3, iron: 1, zinc: 2, copper: 0.1, manganese: 0.1, iodine: 2, selenium: 10, fiber: 0 } },
        { name: '삼겹살', emoji: '🥓', kcal: 600, nutrients: { protein: 15, fat: 55, carbs: 0, vitA: 1, vitB: 20, vitC: 0, calcium: 2, iron: 1.5, zinc: 3, copper: 0.1, manganese: 0.05, iodine: 1, selenium: 12, fiber: 0 } },
        { name: '아이스크림', emoji: '🍦', kcal: 200, nutrients: { protein: 3, fat: 10, carbs: 25, vitA: 8, vitB: 5, vitC: 0, calcium: 10, iron: 0.2, zinc: 0.5, copper: 0.05, manganese: 0.02, iodine: 5, selenium: 2, fiber: 0 } },
        { name: '맥주', emoji: '🍺', kcal: 150, nutrients: { protein: 1, fat: 0, carbs: 12, vitA: 0, vitB: 2, vitC: 0, calcium: 1, iron: 0.1, zinc: 0.1, copper: 0.05, manganese: 0.1, iodine: 0, selenium: 1, fiber: 0 } },
        { name: '밥', emoji: '🍚', kcal: 300, nutrients: { protein: 6, fat: 1, carbs: 65, vitA: 0, vitB: 5, vitC: 0, calcium: 1, iron: 1, zinc: 1, copper: 0.1, manganese: 0.5, iodine: 0, selenium: 2, fiber: 2 } },
        { name: '라면', emoji: '🍜', kcal: 500, nutrients: { protein: 10, fat: 16, carbs: 80, vitA: 2, vitB: 8, vitC: 0, calcium: 2, iron: 2, zinc: 1.5, copper: 0.2, manganese: 0.4, iodine: 15, selenium: 8, fiber: 2 } },
        { name: '케이크', emoji: '🍰', kcal: 400, nutrients: { protein: 4, fat: 20, carbs: 50, vitA: 5, vitB: 5, vitC: 1, calcium: 5, iron: 1, zinc: 0.5, copper: 0.1, manganese: 0.2, iodine: 5, selenium: 4, fiber: 1 } },
        { name: '콜라', emoji: '🥤', kcal: 140, nutrients: { protein: 0, fat: 0, carbs: 35, vitA: 0, vitB: 0, vitC: 0, calcium: 0, iron: 0, zinc: 0, copper: 0, manganese: 0, iodine: 0, selenium: 0, fiber: 0 } },
        { name: '과자', emoji: '🍪', kcal: 450, nutrients: { protein: 5, fat: 25, carbs: 55, vitA: 1, vitB: 3, vitC: 0, calcium: 1, iron: 1, zinc: 0.5, copper: 0.1, manganese: 0.2, iodine: 2, selenium: 3, fiber: 2 } },
        { name: '소주', emoji: '🍶', kcal: 400, nutrients: { protein: 0, fat: 0, carbs: 0, vitA: 0, vitB: 0, vitC: 0, calcium: 0, iron: 0, zinc: 0, copper: 0, manganese: 0, iodine: 0, selenium: 0, fiber: 0 } },
        { name: '브로콜리', emoji: '🥦', kcal: 30, nutrients: { protein: 3, fat: 0, carbs: 6, vitA: 30, vitB: 10, vitC: 90, calcium: 5, iron: 1, zinc: 0.5, copper: 0.1, manganese: 0.3, iodine: 1, selenium: 1, fiber: 10 } },
        { name: '당근', emoji: '🥕', kcal: 40, nutrients: { protein: 1, fat: 0, carbs: 10, vitA: 100, vitB: 5, vitC: 10, calcium: 3, iron: 0.5, zinc: 0.2, copper: 0.05, manganese: 0.1, iodine: 1, selenium: 0.5, fiber: 8 } },
        { name: '토마토', emoji: '🍅', kcal: 20, nutrients: { protein: 1, fat: 0, carbs: 4, vitA: 20, vitB: 5, vitC: 30, calcium: 2, iron: 0.5, zinc: 0.2, copper: 0.1, manganese: 0.1, iodine: 0, selenium: 0.5, fiber: 5 } },
        { name: '샐러드', emoji: '🥗', kcal: 100, nutrients: { protein: 2, fat: 5, carbs: 10, vitA: 50, vitB: 15, vitC: 50, calcium: 10, iron: 2, zinc: 1, copper: 0.2, manganese: 0.5, iodine: 2, selenium: 2, fiber: 15 } },
        // New Extra Foods
        { name: '사과', emoji: '🍎', kcal: 50, nutrients: { protein: 0, fat: 0, carbs: 14, vitA: 1, vitB: 2, vitC: 10, calcium: 1, iron: 0, zinc: 0, copper: 0, manganese: 0, iodine: 0, selenium: 0, fiber: 2 } },
        { name: '바나나', emoji: '🍌', kcal: 90, nutrients: { protein: 1, fat: 0, carbs: 23, vitA: 1, vitB: 10, vitC: 10, calcium: 1, iron: 0, zinc: 0, copper: 0, manganese: 0, iodine: 0, selenium: 0, fiber: 3 } },
        { name: '아보카도', emoji: '🥑', kcal: 160, nutrients: { protein: 2, fat: 15, carbs: 9, vitA: 5, vitB: 25, vitC: 15, calcium: 1, iron: 1, zinc: 1, copper: 1, manganese: 1, iodine: 0, selenium: 1, fiber: 7 } },
        { name: '스시', emoji: '🍣', kcal: 350, nutrients: { protein: 15, fat: 5, carbs: 50, vitA: 5, vitB: 15, vitC: 0, calcium: 2, iron: 1, zinc: 1, copper: 0, manganese: 0, iodine: 30, selenium: 10, fiber: 1 } },
        { name: '스테이크', emoji: '🥩', kcal: 500, nutrients: { protein: 40, fat: 35, carbs: 0, vitA: 0, vitB: 35, vitC: 0, calcium: 2, iron: 15, zinc: 25, copper: 1, manganese: 0, iodine: 0, selenium: 20, fiber: 0 } },
        { name: '샌드위치', emoji: '🥪', kcal: 350, nutrients: { protein: 15, fat: 10, carbs: 45, vitA: 5, vitB: 10, vitC: 5, calcium: 5, iron: 2, zinc: 1, copper: 0, manganese: 0, iodine: 2, selenium: 5, fiber: 4 } },
        { name: '도넛', emoji: '🍩', kcal: 300, nutrients: { protein: 3, fat: 15, carbs: 35, vitA: 1, vitB: 5, vitC: 0, calcium: 1, iron: 1, zinc: 0, copper: 0, manganese: 0, iodine: 1, selenium: 1, fiber: 1 } },
        { name: '감자튀김', emoji: '🍟', kcal: 400, nutrients: { protein: 4, fat: 20, carbs: 50, vitA: 0, vitB: 15, vitC: 15, calcium: 2, iron: 2, zinc: 1, copper: 1, manganese: 1, iodine: 2, selenium: 2, fiber: 4 } },
        { name: '핫도그', emoji: '🌭', kcal: 290, nutrients: { protein: 10, fat: 15, carbs: 25, vitA: 0, vitB: 10, vitC: 0, calcium: 2, iron: 2, zinc: 1, copper: 0, manganese: 0, iodine: 5, selenium: 3, fiber: 1 } }
    ];

    const currentNutrients = {
        protein: 0, fat: 0, carbs: 0,
        vitA: 0, vitB: 0, vitC: 0,
        calcium: 0, iron: 0, zinc: 0, copper: 0, manganese: 0, iodine: 0, selenium: 0, fiber: 0
    };

    // Target values roughly scaled to a 2000kcal day
    const targetNutrients = {
        protein: 60, fat: 50, carbs: 250,
        vitA: 100, vitB: 100, vitC: 100, // relative score
        calcium: 100, iron: 15, zinc: 15, copper: 2, manganese: 3, iodine: 150, selenium: 55, fiber: 30
    };

    const nutrientLabels = {
        protein: '단백질 (Protein)', fat: '지방 (Fat)', carbs: '탄수화물 (Carbs)',
        vitA: '비타민A (Vit-A)', vitB: '비타민B (Vit-B)', vitC: '비타민C (Vit-C)',
        calcium: '칼슘 (Calcium)', iron: '철 (Iron)', zinc: '아연 (Zinc)',
        copper: '구리 (Copper)', manganese: '망간 (Manganese)', iodine: '요오드 (Iodine)',
        selenium: '셀레늄 (Selenium)', fiber: '식이섬유 (Fiber)'
    };

    // Disease mappings based on excess/deficiency
    const malnutritionDiseases = {
        protein_low: '근손실', protein_high: '신장 부담',
        fat_low: '탈모/호르몬이상', fat_high: '고지혈증',
        carbs_low: '에너지 고갈', carbs_high: '당뇨 위험',
        vitA_low: '야맹증', vitA_high: '간독성',
        vitB_low: '피로/각기병', vitC_low: '괴혈병',
        calcium_low: '골다공증', calcium_high: '신장결석',
        iron_low: '빈혈', iron_high: '간 손상',
        zinc_low: '미각/후각 상실', copper_low: '혈관파열', 
        manganese_low: '골격 기형', iodine_low: '갑상선 비대증',
        selenium_low: '심근증', fiber_low: '변비', fiber_high: '장폐색'
    };

    function getCategoryByKcal(kcal) {
        if (kcal >= 400) return 'red';
        if (kcal >= 200) return 'yellow';
        return 'green';
    }

    function getCategoryCoords(category) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        let x, y;
        
        switch(category) {
            case 'green':
                // middle-left
                x = Math.random() * (w * 0.3) + (w * 0.05);
                y = Math.random() * (h * 0.5) + (h * 0.15);
                break;
            case 'yellow':
                // middle-right
                x = Math.random() * (w * 0.3) + (w * 0.6);
                y = Math.random() * (h * 0.5) + (h * 0.2);
                break;
            case 'red':
            default:
                // bottom stretch, avoiding corners mostly
                x = Math.random() * (w * 0.6) + (w * 0.2);
                y = Math.random() * (h * 0.2) + (h * 0.7);
                break;
        }
        return {x, y};
    }

    // Initialize foods spread across the viewport
    function spawnFoods() {
        foodData.forEach((food) => {
            const el = document.createElement('div');
            el.className = 'food-item draggable-item';
            
            // Re-adding category logic perfectly
            const category = getCategoryByKcal(food.kcal);
            const coords = getCategoryCoords(category);

            el.style.left = `${coords.x}px`;
            el.style.top = `${coords.y}px`;
            el.innerHTML = `<span class="emoji">${food.emoji}</span><div class="calorie-label">${food.name} +${food.kcal}</div>`;
            el.dataset.kcal = food.kcal;
            el.dataset.name = food.name;

            el.dataset.index = foodData.indexOf(food); // Save index to access nutrients

            foodContainer.appendChild(el);
            makeDraggable(el);
        });
    }

    function playChewSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("냐");
            utterance.pitch = 1.5;
            utterance.rate = 1.2;
            utterance.volume = 0.5;
            window.speechSynthesis.speak(utterance);
        }
    }

    // Make mouth draggable
    makeDraggable(mouth);

    // Dragging Logic
    let activeElement = null;
    let offsetX = 0;
    let offsetY = 0;
    let initialX = 0;
    let initialY = 0;

    function makeDraggable(el) {
        el.addEventListener('mousedown', dragStart);
        el.addEventListener('touchstart', dragStart, {passive: false});
    }

    function dragStart(e) {
        activeElement = this;
        // Bring to front
        activeElement.style.zIndex = 1000;

        const rect = activeElement.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        } else {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            e.preventDefault(); // prevent text selection
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, {passive: false});
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }

    function drag(e) {
        if (!activeElement) return;
        
        // Prevent default only for touch to prevent scrolling while dragging
        if (e.type === 'touchmove') e.preventDefault();

        let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        const newX = clientX - offsetX;
        const newY = clientY - offsetY;

        // Note: For mouth, it has transform translate(-50%, -50%) from CSS
        // To keep things simple and avoid complex transform math, we set left/top and reset transform
        if (activeElement.id === 'mouth') {
            activeElement.style.transform = 'none';
        }
        
        activeElement.style.left = `${newX}px`;
        activeElement.style.top = `${newY}px`;

        checkCollisions();
    }

    function dragEnd(e) {
        if (!activeElement) return;
        
        // Reset z-index
        activeElement.style.zIndex = activeElement.id === 'mouth' ? 100 : 50;
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);

        activeElement = null;
    }

    // Collision Detection
    function checkCollisions() {
        if (!activeElement) return;

        const mouthRect = mouth.getBoundingClientRect();
        const foods = document.querySelectorAll('.food-item:not(.eaten)');

        foods.forEach(food => {
            const foodRect = food.getBoundingClientRect();
            
            if (isOverlapping(mouthRect, foodRect)) {
                eatFood(food);
            }
        });
    }

    function isOverlapping(rect1, rect2) {
        // slightly smaller hit area for better feel
        const shrink = 20; 
        return !(
            rect1.right - shrink < rect2.left || 
            rect1.left + shrink > rect2.right || 
            rect1.bottom - shrink < rect2.top || 
            rect1.top + shrink > rect2.bottom
        );
    }

    function eatFood(foodElement) {
        const kcal = parseInt(foodElement.dataset.kcal);
        const name = foodElement.dataset.name;
        const index = parseInt(foodElement.dataset.index !== undefined ? foodElement.dataset.index : -1);
        eatFoodLogic(name, kcal, foodElement, index);
    }

    function eatFoodLogic(name, kcal, sourceElement = null, foodIndex = -1) {
        // Add unique ID to reference this instance
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        
        totalCalories += kcal;
        let foodItemStats = {id, name, kcal};

        // Add nutrients if available
        if (foodIndex !== -1 && foodData[foodIndex].nutrients) {
            const n = foodData[foodIndex].nutrients;
            foodItemStats.nutrients = n;
            for(let key in currentNutrients) {
                currentNutrients[key] += n[key];
            }
        }

        foodsEaten.push(foodItemStats);
        
        updateUI();
        playChewSound();
        
        // Flash overlay effect
        flashOverlay.classList.remove('flash-active');
        void flashOverlay.offsetWidth; // trigger reflow
        flashOverlay.classList.add('flash-active');
        setTimeout(() => flashOverlay.classList.remove('flash-active'), 300);

        // Feedback on mouth (chewing animation) - Extended duration
        mouth.textContent = '냠';
        mouth.style.transform = 'scale(1.3) rotate(10deg)';
        setTimeout(() => {
            // Keep text as 냠 for a while longer
            mouth.textContent = '냠';
            mouth.style.transform = 'scale(1.1) rotate(-10deg)';
        }, 400);
        setTimeout(() => {
            mouth.textContent = '입';
            if (mouth !== activeElement) {
                mouth.style.transform = mouth.style.left ? 'scale(1)' : 'translate(-50%, -50%) scale(1)';
            } else {
                mouth.style.transform = 'none';
            }
        }, 800);

        if (sourceElement) {
            sourceElement.classList.add('eaten');
            // Reappear food after 5 seconds
            setTimeout(() => {
                // Determine its original category by its actual kcal value
                const foodObj = foodIndex !== -1 ? foodData[foodIndex] : null;
                const kcalVal = foodObj ? foodObj.kcal : parseInt(sourceElement.dataset.kcal);
                const category = getCategoryByKcal(kcalVal);
                const coords = getCategoryCoords(category);
                
                sourceElement.style.left = `${coords.x}px`;
                sourceElement.style.top = `${coords.y}px`;
                
                sourceElement.classList.remove('eaten');
                
                // Re-apply scale to 1 if it got mutated
                if(sourceElement.id !== 'mouth') {
                    sourceElement.style.transform = 'scale(1)';
                }
            }, 5000);
        }
    }

    // Cancel food function logic added here to avoid polluting global scope
    window.cancelFood = function(id) {
        const index = foodsEaten.findIndex(f => f.id === id);
        if (index !== -1) {
            const f = foodsEaten[index];
            totalCalories -= f.kcal;
            
            if (f.nutrients) {
                for(let key in currentNutrients) {
                    currentNutrients[key] -= f.nutrients[key];
                }
            }

            foodsEaten.splice(index, 1);
            if (totalCalories < 0) totalCalories = 0;
            
            // Ensure no negative nutrients due to floats/cancels
            for(let key in currentNutrients) {
                if (currentNutrients[key] < 0) currentNutrients[key] = 0;
            }

            updateUI();
        }
    };

    function renderBars() {
        const leftBars = document.getElementById('left-bars');
        const rightBars = document.getElementById('right-bars');
        if (!leftBars || !rightBars) return;

        // Clear contents except headers
        leftBars.innerHTML = '<h3>주요 영양소 (Macros)</h3>';
        rightBars.innerHTML = '<h3>미량 영양소 (Micros)</h3>';

        const renderGroup = (keys, container) => {
            keys.forEach(k => {
                const ratio = currentNutrients[k] / targetNutrients[k];
                let percent = Math.min(Math.round(ratio * 100), 200); // capped visual at 200%
                let fillClass = '';
                if (ratio > 1.5) fillClass = 'excess';
                if (ratio > 2.0) fillClass = 'danger';

                container.innerHTML += `
                    <div class="nutrient-bar-group">
                        <div class="label">
                            <span>${nutrientLabels[k]}</span>
                            <span>${Math.round(currentNutrients[k])} / ${targetNutrients[k]}</span>
                        </div>
                        <div class="bar-outline">
                            <div class="bar-fill ${fillClass}" style="width: ${Math.min(percent, 100)}%;"></div>
                        </div>
                    </div>
                `;
            });
        };

        renderGroup(['protein', 'fat', 'carbs', 'vitA', 'vitB', 'vitC'], leftBars);
        renderGroup(['calcium', 'iron', 'zinc', 'copper', 'manganese', 'iodine', 'selenium', 'fiber'], rightBars);
    }

    function updateUI() {
        // Update number
        calorieCountEl.innerHTML = `${totalCalories} <span class="unit">kcal</span>`;
        const quickCounter = document.getElementById('quick-calorie-counter');
        if (quickCounter) quickCounter.innerHTML = `${totalCalories} <span>kcal</span>`;
        
        
        // Update list
        eatenListEl.innerHTML = ''; // always clear
        if (foodsEaten.length > 0) {
            foodsEaten.forEach(f => {
                const badge = document.createElement('span');
                badge.className = 'eaten-badge';
                
                // Add name and kcal
                const textNode = document.createTextNode(`${f.name} (+${f.kcal}) `);
                badge.appendChild(textNode);
                
                // Add cancel button
                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'cancel-btn';
                cancelBtn.textContent = '✕';
                cancelBtn.onclick = () => window.cancelFood(f.id);
                badge.appendChild(cancelBtn);
                
                eatenListEl.appendChild(badge);
            });
        } else {
            eatenListEl.textContent = 'No food eaten yet.';
        }

        // Render Bars
        renderBars();

        // Update body shape based on calories
        // Baseline rx is 30. Max calories let's say 3000 -> rx = 100
        const baselineRx = 30;
        const maxRx = 120;
        const maxKcal = 3500;
        
        let newRx = baselineRx + (totalCalories / maxKcal) * (maxRx - baselineRx);
        if (newRx > maxRx) newRx = maxRx;
        
        torso.setAttribute('rx', newRx);

        const head = document.getElementById('head');
        const criticalWarning = document.querySelector('.critical-warning');
        
        // Re-evaluate color and glow based on calories
        if (totalCalories >= 3000) {
            bodyGroup.classList.add('body-gross');
            document.body.classList.add('hospital-mode');
            if (criticalWarning) criticalWarning.classList.remove('hidden');
        } else {
            bodyGroup.classList.remove('body-gross');
            document.body.classList.remove('hospital-mode');
            if (criticalWarning) criticalWarning.classList.add('hidden');
        }
        
        spawnDiseasesAndAnalyze();
    }

    function spawnDiseasesAndAnalyze() {
        const defElem = document.getElementById('deficiency-analysis');
        const diseaseContainer = document.getElementById('disease-container');
        if (!defElem) return;

        if (foodsEaten.length === 0) {
            defElem.innerHTML = '<div class="deficiency-warning">아직 먹은 음식이 없습니다. 우측 좌측 바를 채워보세요.</div>';
            if (diseaseContainer) diseaseContainer.innerHTML = '';
            return;
        }

        const msgs = [];
        const activeDiseases = new Set();
        
        // Check excesses/deficiencies contextually
        const ratioThreshold = (Math.max(1, totalCalories) / 2000); // 2000 is baseline

        for (const k of Object.keys(targetNutrients)) {
            const actual = currentNutrients[k];
            const target = targetNutrients[k] * ratioThreshold;
            
            // Allow more strict tolerance when they eat more foods
            if (foodsEaten.length >= 3) {
                if (actual < target * 0.5) {
                    activeDiseases.add(malnutritionDiseases[`${k}_low`]);
                    msgs.push(`${nutrientLabels[k]} 부족: 인체 기능 저하 (${malnutritionDiseases[`${k}_low`]}).`);
                } else if (actual > target * 1.5) {
                    activeDiseases.add(malnutritionDiseases[`${k}_high`]);
                    msgs.push(`${nutrientLabels[k]} 과다: 장기 무리 발생 (${malnutritionDiseases[`${k}_high`]}).`);
                }
            }
        }
        
        if (msgs.length === 0 && foodsEaten.length >= 3) {
            defElem.innerHTML = '<div style="color: #00ffaa;">완벽한 영양 밸런스입니다! (Perfect functional balance!)</div>';
        } else if (msgs.length > 0) {
            defElem.innerHTML = msgs.map(m => `<div class="deficiency-alert">⚠️ ${m}</div>`).join('');
        } else {
            defElem.innerHTML = '<div class="deficiency-warning">계속 드래그하여 영양을 섭취하세요.</div>';
        }

        // Render diseases to body layout systematically
        if (diseaseContainer) {
            diseaseContainer.innerHTML = '';
            let leftCount = 0;
            let rightCount = 0;
            
            activeDiseases.forEach(d => {
                if(!d) return;
                const el = document.createElement('div');
                el.className = 'disease-label';
                el.textContent = d;
                
                // Stack cleanly alternating left and right with overlapping bubbles
                if (leftCount <= rightCount) {
                    el.style.left = `-55px`; // Pull left of the base SVG
                    el.style.top = `${50 + leftCount * 45}px`; // 80px high, 45px offset = overlapping!
                    leftCount++;
                } else {
                    el.style.right = `-55px`; // Pull right of the base SVG
                    el.style.left = 'auto';
                    el.style.top = `${50 + rightCount * 45}px`;
                    rightCount++;
                }
                
                diseaseContainer.appendChild(el);
            });
        }
    }

    // --- Routing and Custom Food Logic ---
    const goToBrainBtn = document.getElementById('go-to-brain');
    const backToMouthBtn = document.getElementById('back-to-mouth');
    
    const brainScene = document.getElementById('brain-scene');
    const gameScene = document.getElementById('game-scene');
    const resultsScene = document.getElementById('results-scene');

    const customFoodName = document.getElementById('custom-food-name');
    const customFoodKcal = document.getElementById('custom-food-kcal');
    const eatCustomFoodBtn = document.getElementById('eat-custom-food');
    const customEatMsg = document.getElementById('custom-eat-msg');

    goToBrainBtn.addEventListener('click', () => {
        gameScene.classList.add('hidden');
        resultsScene.classList.add('hidden');
        brainScene.classList.remove('hidden');
    });

    backToMouthBtn.addEventListener('click', () => {
        brainScene.classList.add('hidden');
        gameScene.classList.remove('hidden');
        resultsScene.classList.remove('hidden');
    });

    eatCustomFoodBtn.addEventListener('click', () => {
        const name = customFoodName.value.trim();
        const kcal = parseInt(customFoodKcal.value);

        if (!name || isNaN(kcal) || kcal < 0) {
            customEatMsg.style.color = '#ff4b2b';
            customEatMsg.textContent = 'Please enter valid name and calories!';
            customEatMsg.style.opacity = '1';
            setTimeout(() => customEatMsg.style.opacity = '0', 2000);
            return;
        }

        // Chewing animation on the button
        eatCustomFoodBtn.classList.add('chewing');
        eatCustomFoodBtn.textContent = '아';
        setTimeout(() => eatCustomFoodBtn.textContent = '냠', 150);
        setTimeout(() => eatCustomFoodBtn.textContent = '아', 300);
        setTimeout(() => eatCustomFoodBtn.textContent = '냠', 450);
        setTimeout(() => {
            eatCustomFoodBtn.classList.remove('chewing');
            eatCustomFoodBtn.textContent = '입';
        }, 600);

        eatFoodLogic(name, kcal);
        
        customEatMsg.style.color = '#00ffaa';
        customEatMsg.textContent = `Ate ${name} (+${kcal} kcal)! Added to game.`;
        customEatMsg.style.opacity = '1';
        setTimeout(() => customEatMsg.style.opacity = '0', 2500);

        // Add the new container dynamically into its proper category
        const category = getCategoryByKcal(kcal);
        const coords = getCategoryCoords(category);
        
        const el = document.createElement('div');
        el.className = 'food-item draggable-item';
        el.style.left = `${coords.x}px`;
        el.style.top = `${coords.y}px`;
        el.innerHTML = `<span class="emoji">🍽️</span><div class="calorie-label">${name} +${kcal}</div>`;
        el.dataset.kcal = kcal;
        el.dataset.name = name;

        document.getElementById('food-container').appendChild(el);
        makeDraggable(el);

        customFoodName.value = '';
        customFoodKcal.value = '';
    });

    // Init Game (called after login)
    function initGame() {
        spawnFoods();
        updateUI(); // run once to show initial empty state
    }

    // Login Transition
    const loginScene = document.getElementById('login-scene');
    const startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', () => {
        playChewSound();
        
        loginScene.classList.add('dissolve-anim');
        
        // prepare descend
        gameScene.classList.remove('hidden');
        gameScene.classList.add('descend-anim');
        
        setTimeout(() => {
            loginScene.classList.add('hidden');
            initGame();
        }, 1200); // matches the dissolve anim duration
    });



});
