
// ==========================================
// 1. ฟังก์ชันกดเข้าเมนูหลัก (อัปเดตเมนูบิลสินค้า)
// ==========================================
function clickMenu(menuName) {
    if (menuName === 'store') {
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.search-bar').style.display = 'none';
        document.querySelector('.stats-container').style.display = 'none';
        document.querySelector('.menu-wrapper').style.display = 'none';
        
        document.getElementById('store-submenu-page').style.display = 'block';
        document.getElementById('top-home-btn').style.display = 'block';
        
        loadAdminProducts(); 
                        
    } else if (menuName === 'bills') {
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.search-bar').style.display = 'none';
        document.querySelector('.stats-container').style.display = 'none';
        document.querySelector('.menu-wrapper').style.display = 'none';
        
        document.getElementById('bills-submenu-page').style.display = 'block';
        document.getElementById('top-home-btn').style.display = 'block';
        
        // 🔥 จุดที่แทรก: สั่งให้ตัวนับเลขทั้ง "ชำระแล้ว" และ "ยกเลิก" ทำงานทันทีที่กดเข้าหน้านี้
        if (typeof updatePaidCountBadgeOnly === 'function') updatePaidCountBadgeOnly();
        if (typeof updateCanceledCountBadgeOnly === 'function') updateCanceledCountBadgeOnly();
        
    } else if (menuName === 'shipping') {
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.search-bar').style.display = 'none';
        document.querySelector('.stats-container').style.display = 'none';
        document.querySelector('.menu-wrapper').style.display = 'none';
        
        document.getElementById('shipping-submenu-page').style.display = 'block';
        document.getElementById('top-home-btn').style.display = 'block';

        // 🔥 จุดที่แทรก: สั่งให้สมองกลนับเลขทำงาน "ทันที" ที่กดเข้ามาหน้านี้!
        if (typeof updatePendingShippingBadgeOnly === 'function') updatePendingShippingBadgeOnly();

    } else if (menuName === 'vip') {
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.search-bar').style.display = 'none';
        document.querySelector('.stats-container').style.display = 'none';
        document.querySelector('.menu-wrapper').style.display = 'none';
        
        document.getElementById('security-page').style.display = 'block';
        document.getElementById('top-home-btn').style.display = 'block';
        
        loadSecurityData();

    } else if (menuName === 'customers') {
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.search-bar').style.display = 'none';
        document.querySelector('.stats-container').style.display = 'none';
        document.querySelector('.menu-wrapper').style.display = 'none';
        
        document.getElementById('customers-submenu-page').style.display = 'block';
        document.getElementById('top-home-btn').style.display = 'block';

    } else if (menuName === 'logout') {
        let confirmLogout = confirm('แน่ใจนะว่าจะออกจากระบบ?');
        if (confirmLogout) {
            alert('ออกจากระบบเรียบร้อย!');
            window.location.reload(); 
        }
    }
}


        // ==========================================
// ฟังก์ชันเปิดหน้า 1. แก้ไขหน้าร้าน
// ==========================================
function openCategoryPage() {
    // ซ่อนหน้าย่อย 2 หัวข้อ
    document.getElementById('store-submenu-page').style.display = 'none';
    
    // โชว์หน้า แก้ไขหน้าร้าน (8 หมวดหมู่)
    document.getElementById('category-management-page').style.display = 'block';
}


// ==========================================
// 3. ฟังก์ชันสร้างและเปิดหน้าสินค้าย่อย (แก้ไขเฉพาะจุด: สั่งให้โหลดข้อมูลทันทีหลังจากสร้างกล่องเสร็จ)
// ==========================================
function openProductPage(catName) {
    // ซ่อนหน้า 8 หมวดหมู่
    document.getElementById('category-management-page').style.display = 'none';
    
    // โชว์กล่องสินค้าย่อย
    document.getElementById('products-page').style.display = 'block';
    
    // เปลี่ยนชื่อหัวข้อตามที่กดมา
    document.getElementById('products-title').innerText = 'หมวดหมู่: ' + catName;
    
    // 🔥 เช็คชื่อหมวดหมู่ เพื่อกำหนดตัวอักษรนำหน้า ID (Prefix) 🔥
    let prefix = 'P'; // ตั้งค่าเริ่มต้น
    if (catName === 'ของใช้ไหว้เช็งเม้ง') { prefix = 'P'; }
    else if (catName === 'น้ำอัดลม น้ำผึ้ง เส้นหมี่') { prefix = 'H'; }
    else if (catName === 'ยาสมุนไพรปรุงอาหาร') { prefix = 'T'; }
    else if (catName === 'มีด จอบ เคียว ตะปู') { prefix = 'O'; }
    else if (catName === 'รองเท้าบูท สตั๊ดดอย') { prefix = 'M'; }
    else if (catName === 'สายไฟ บั๊กไฟ หลอดไฟ') { prefix = 'L'; }
    else if (catName === 'เสื่อน้ำมัน ผ้าใบ เชือก') { prefix = 'S'; }
    else if (catName === 'รวมของใช้อื่น ๆ') { prefix = 'A'; }

    // เริ่มวาดบล็อกสินค้า 50 กล่อง
    const container = document.getElementById('grid-container');
    container.innerHTML = ''; // เคลียร์ของเก่าออกก่อน
    
    let htmlContent = '';
    for (let i = 1; i <= 50; i++) {
        // ใช้ตัวอักษรที่เช็คมาได้ นำหน้าตัวเลข
        let pid = prefix + String(i).padStart(3, '0'); 
        
        htmlContent += `
            <div style="background: white; border-radius: 10px; padding: 10px; border: 2px solid #7ba2cc; box-shadow: 0 2px 4px rgba(0,0,0,0.1); box-sizing: border-box; width: 100%; overflow: hidden;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px dashed #e0e0e0; padding-bottom: 5px;">
                    <span style="font-size: 0.8em; color: #7ba2cc; font-weight: bold;">ID: ${pid}</span>
                    <label style="font-size: 0.75em; color: #16365d; font-weight: bold; display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="status-${pid}" checked style="margin-right: 5px; width: 16px; height: 16px; accent-color: #28a745; cursor: pointer;"> 
                        เปิดขาย
                    </label>
                </div>

                <label style="display: block; text-align: center; margin-bottom: 5px; cursor: pointer;">
                    <div id="preview-${pid}" style="height: 60px; display: flex; align-items: center; justify-content: center; background: #e0e0e0; border-radius: 8px; overflow: hidden; font-size: 2em;">
                        📷
                    </div>
                    <input type="file" id="file-${pid}" accept="image/*" style="display: none;" onchange="previewImage(event, 'preview-${pid}')">
                </label>
                
                <div style="margin-bottom: 5px;">
                    <label style="font-size: 0.75em; color: #16365d; font-weight: bold;">ชื่อสินค้า</label>
                    <input type="text" id="name-${pid}" placeholder="ระบุชื่อ" style="width: 100%; box-sizing: border-box; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 5px;">
                    <label style="font-size: 0.75em; color: #16365d; font-weight: bold;">ราคาปกติ</label>
                    <input type="number" id="price-${pid}" placeholder="0" style="width: 100%; box-sizing: border-box; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 5px;">
                    <label style="font-size: 0.75em; color: #16365d; font-weight: bold;">ราคาส่ง (VIP)</label>
                    <input type="number" id="wholesale-${pid}" placeholder="0" style="width: 100%; box-sizing: border-box; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                
                <button id="btn-${pid}" onclick="saveProduct('${pid}', '${catName}')" style="width: 100%; background: #16365d; color: white; border: none; margin-top: 8px; border-radius: 5px; padding: 8px; font-weight: bold; cursor: pointer;">บันทึก</button>
            </div>
        `;
    }
    // ยัด 50 กล่องลงไปใน HTML (ของเดิมของตี๋)
    container.innerHTML = htmlContent;

    // 🔥 [จุดที่แก้ไขเพิ่มเฉพาะจุด] 🔥 
    // สั่งให้ดึงข้อมูลจาก Firebase มาเติมลงกล่องทันทีหลังจากสร้างกล่อง 50 กล่องเสร็จสมบูรณ์แล้ว!
    if (typeof loadAdminProducts === 'function') {
        loadAdminProducts();
    }
}


// ==========================================
// 📌 ฟังก์ชันใหม่: เอาไว้พรีวิวรูปภาพที่นายเพิ่งถ่าย หรือเลือกมา
// ==========================================
function previewImage(event, previewId) {
    const file = event.target.files[0]; // รับไฟล์รูปที่เลือก
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // เอารูปมาแทนที่ไอคอนกล้อง
            const previewContainer = document.getElementById(previewId);
            previewContainer.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
        reader.readAsDataURL(file); // สั่งให้อ่านไฟล์
    }
}


// ==========================================
// ฟังก์ชันปุ่มย้อนกลับ (ฉบับกันโค้ดพัง กดได้ทุกหน้า 100%)
// ==========================================
function backToMainMenu() {
    // 📌 ตัวช่วยเช็คว่าหน้าไหนเปิดอยู่ (กัน Error เวลาหาชื่อ ID ไม่เจอ)
    const isOpen = (id) => {
        const el = document.getElementById(id);
        return el && el.style.display === 'block';
    };

    // --------------------------------
    // 1. โซน: หน้าร้านค้า
    // --------------------------------
    if (isOpen('products-page')) {
        document.getElementById('products-page').style.display = 'none';
        document.getElementById('category-management-page').style.display = 'block';
    }
    else if (isOpen('category-management-page')) {
        document.getElementById('category-management-page').style.display = 'none';
        document.getElementById('store-submenu-page').style.display = 'block';
    }
    else if (isOpen('store-preview-page')) {
        document.getElementById('store-preview-page').style.display = 'none';
        document.getElementById('store-submenu-page').style.display = 'block';
    }
    else if (isOpen('store-submenu-page')) {
        document.getElementById('store-submenu-page').style.display = 'none';
        backToHomeUI();
    }
    
    // --------------------------------
    // 2. โซน: หน้าบิลสินค้า
    // --------------------------------
    else if (isOpen('bill-pending-page') || isOpen('bill-paid-page') || isOpen('bill-canceled-page')) {
        if (document.getElementById('bill-pending-page')) document.getElementById('bill-pending-page').style.display = 'none';
        if (document.getElementById('bill-paid-page')) document.getElementById('bill-paid-page').style.display = 'none';
        if (document.getElementById('bill-canceled-page')) document.getElementById('bill-canceled-page').style.display = 'none';
        document.getElementById('bills-submenu-page').style.display = 'block';
    }
    else if (isOpen('bills-submenu-page')) {
        document.getElementById('bills-submenu-page').style.display = 'none';
        backToHomeUI();
    }

    // --------------------------------
    // 3. โซน: หน้าจัดส่ง
    // --------------------------------
    else if (isOpen('shipping-pending-page') || isOpen('shipping-history-page')) {
        if (document.getElementById('shipping-pending-page')) document.getElementById('shipping-pending-page').style.display = 'none';
        if (document.getElementById('shipping-history-page')) document.getElementById('shipping-history-page').style.display = 'none';
        document.getElementById('shipping-submenu-page').style.display = 'block';
    }
    else if (isOpen('shipping-submenu-page')) {
        document.getElementById('shipping-submenu-page').style.display = 'none';
        backToHomeUI();
    }

    // --------------------------------
    // 4. โซน: หน้าความปลอดภัย (รหัสแอป / VIP)
    // --------------------------------
    else if (isOpen('security-page')) {
        document.getElementById('security-page').style.display = 'none';
        backToHomeUI();
    }

}

// ==========================================
// 📌 ฟังก์ชันคืนชีพหน้าหลัก (เอามาแยกไว้ จะได้ไม่ต้องเขียนโค้ดซ้ำๆ)
// ==========================================
function backToHomeUI() {
    document.getElementById('top-home-btn').style.display = 'none'; 
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.search-bar').style.display = 'flex'; 
    document.querySelector('.stats-container').style.display = 'flex'; 
    document.querySelector('.menu-wrapper').style.display = 'block';
}


// ==========================================
// ฟังก์ชันเด้งแจ้งเตือนก่อนเปิด/ปิดสวิตช์
// ==========================================
function confirmToggle(checkbox, catName) {
    // เช็คว่าสวิตช์กำลังจะเลื่อนไปทางไหน (true = เปิดโชว์, false = ปิดซ่อน)
    let action = checkbox.checked ? 'เปิดโชว์' : 'ปิดซ่อน';
    
    // เด้งหน้าต่างถามความแน่ใจ
    let isConfirm = confirm(`แน่ใจนะว่าจะ "${action}" หมวดหมู่ ${catName} บนหน้าร้าน?`);
    
    // ถ้ากด "ยกเลิก" (Cancel) ให้คำสั่งถูกยกเลิก สวิตช์จะเด้งกลับที่เดิม
    if (!isConfirm) {
        return false;
    }
    
    // ถ้ากด "ตกลง" (OK) สวิตช์จะเลื่อนเปลี่ยนสีตามปกติ
    return true;
}

// ==========================================
// ฟังก์ชันเปิดหน้าย่อยของบิลสินค้า (เพิ่มใหม่ เอาไว้ล่างสุด)
// ==========================================
function openBillPage(billType) {
    // ซ่อนหน้าเมนูบิลหลัก
    document.getElementById('bills-submenu-page').style.display = 'none';
    
    // เช็คว่ากดปุ่มไหนมา แล้วเปิดหน้านั้น
    if (billType === 'pending') {
        document.getElementById('bill-pending-page').style.display = 'block';
    } else if (billType === 'paid') {
        document.getElementById('bill-paid-page').style.display = 'block';
    } else if (billType === 'canceled') {
        document.getElementById('bill-canceled-page').style.display = 'block';
    }
}

// ==========================================
// ฟังก์ชันปุ่มย้อนกลับ (ฉบับสมบูรณ์ แก้บั๊กแดง 100% ครบ 5 โซน)
// ==========================================
function backToMainMenu() {
    
    // 🔥 โซนใหม่ล่าสุด: ดักจับหน้าประวัติการทำงาน (ถ้าเปิดอยู่ให้ถอยไปหน้ารหัส แล้วหยุด)
    if (document.getElementById('action-log-page') && document.getElementById('action-log-page').style.display === 'block') {
        document.getElementById('action-log-page').style.display = 'none';
        document.getElementById('security-page').style.display = 'block';
        return; 
    }

    // --------------------------------
    // 1. โซน: หน้าร้านค้า
    // --------------------------------
    if (document.getElementById('products-page') && document.getElementById('products-page').style.display === 'block') {
        document.getElementById('products-page').style.display = 'none';
        document.getElementById('category-management-page').style.display = 'block';
    }
    else if (document.getElementById('category-management-page') && document.getElementById('category-management-page').style.display === 'block') {
        document.getElementById('category-management-page').style.display = 'none';
        document.getElementById('store-submenu-page').style.display = 'block';
    }
    else if (document.getElementById('store-preview-page') && document.getElementById('store-preview-page').style.display === 'block') {
        document.getElementById('store-preview-page').style.display = 'none';
        document.getElementById('store-submenu-page').style.display = 'block';
    }
    else if (document.getElementById('store-submenu-page') && document.getElementById('store-submenu-page').style.display === 'block') {
        document.getElementById('store-submenu-page').style.display = 'none';
        document.getElementById('top-home-btn').style.display = 'none'; 
        
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.search-bar').style.display = 'flex'; 
        document.querySelector('.stats-container').style.display = 'flex'; 
        document.querySelector('.menu-wrapper').style.display = 'block';
    }
    
    // --------------------------------
    // 2. โซน: หน้าบิลสินค้า
    // --------------------------------
    else if (
        (document.getElementById('bill-pending-page') && document.getElementById('bill-pending-page').style.display === 'block') ||
        (document.getElementById('bill-paid-page') && document.getElementById('bill-paid-page').style.display === 'block') ||
        (document.getElementById('bill-canceled-page') && document.getElementById('bill-canceled-page').style.display === 'block')
    ) {
        if (document.getElementById('bill-pending-page')) document.getElementById('bill-pending-page').style.display = 'none';
        if (document.getElementById('bill-paid-page')) document.getElementById('bill-paid-page').style.display = 'none';
        if (document.getElementById('bill-canceled-page')) document.getElementById('bill-canceled-page').style.display = 'none';
        document.getElementById('bills-submenu-page').style.display = 'block';
    }
    else if (document.getElementById('bills-submenu-page') && document.getElementById('bills-submenu-page').style.display === 'block') {
        document.getElementById('bills-submenu-page').style.display = 'none';
        document.getElementById('top-home-btn').style.display = 'none'; 
        
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.search-bar').style.display = 'flex'; 
        document.querySelector('.stats-container').style.display = 'flex'; 
        document.querySelector('.menu-wrapper').style.display = 'block';
    }

    // --------------------------------
    // 3. โซน: หน้าจัดส่ง (รอส่ง / ประวัติ)
    // --------------------------------
    else if (
        (document.getElementById('shipping-pending-page') && document.getElementById('shipping-pending-page').style.display === 'block') ||
        (document.getElementById('shipping-history-page') && document.getElementById('shipping-history-page').style.display === 'block')
    ) {
        if (document.getElementById('shipping-pending-page')) document.getElementById('shipping-pending-page').style.display = 'none';
        if (document.getElementById('shipping-history-page')) document.getElementById('shipping-history-page').style.display = 'none';
        document.getElementById('shipping-submenu-page').style.display = 'block';
        
        // 🔥 แทรกคำสั่งนับเลขตรงนี้ พอถอยกลับมาหน้าเมนูย่อยปุ๊บ ให้นับเลขใหม่ทันที
        if (typeof updatePendingShippingBadgeOnly === 'function') updatePendingShippingBadgeOnly();
    }
    else if (document.getElementById('shipping-submenu-page') && document.getElementById('shipping-submenu-page').style.display === 'block') {
        document.getElementById('shipping-submenu-page').style.display = 'none';
        document.getElementById('top-home-btn').style.display = 'none'; 
        
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.search-bar').style.display = 'flex'; 
        document.querySelector('.stats-container').style.display = 'flex'; 
        document.querySelector('.menu-wrapper').style.display = 'block';
    }

    // --------------------------------
    // 4. โซน: หน้าความปลอดภัย (รหัสแอป / VIP)
    // --------------------------------
    else if (document.getElementById('security-page') && document.getElementById('security-page').style.display === 'block') {
        document.getElementById('security-page').style.display = 'none';
        document.getElementById('top-home-btn').style.display = 'none'; 
        
        // คืนชีพหน้าหลัก
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.search-bar').style.display = 'flex'; 
        document.querySelector('.stats-container').style.display = 'flex'; 
        document.querySelector('.menu-wrapper').style.display = 'block';
    }

    // --------------------------------
    // 5. โซน: จัดการลูกค้า (อันนี้ของใหม่ชัวร์ป้าด)
    // --------------------------------
    else if (document.getElementById('customers-all-page') && document.getElementById('customers-all-page').style.display === 'block') {
        document.getElementById('customers-all-page').style.display = 'none';
        document.getElementById('customers-submenu-page').style.display = 'block';
    }
    else if (document.getElementById('customers-submenu-page') && document.getElementById('customers-submenu-page').style.display === 'block') {
        document.getElementById('customers-submenu-page').style.display = 'none';
        document.getElementById('top-home-btn').style.display = 'none'; 
        
        // คืนชีพหน้าหลัก
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.search-bar').style.display = 'flex'; 
        document.querySelector('.stats-container').style.display = 'flex'; 
        document.querySelector('.menu-wrapper').style.display = 'block';
    }
}


// ==========================================
// ฟังก์ชันเปิดหน้าย่อยของการจัดส่ง
// ==========================================
function openShippingPage(type) {
    // ซ่อนหน้าเมนูจัดส่งหลัก
    document.getElementById('shipping-submenu-page').style.display = 'none';
    
    // เช็คว่ากดปุ่มไหน
    if (type === 'pending') {
        document.getElementById('shipping-pending-page').style.display = 'block';
    } else if (type === 'history') {
        document.getElementById('shipping-history-page').style.display = 'block';
    }
}

// ==========================================
// ลอจิกระบบความปลอดภัย (VIP, PIN, Admins)
// ==========================================

// ==========================================
// 📌 ฟังก์ชันโหลดข้อมูลตอนเปิดหน้าเมนูรหัส (อัปเดตระบบล็อกสิทธิ์ Staff ห้ามแก้ไข)
// ==========================================
async function loadSecurityData() {
    try {
        // 1. ดึงรหัสเจ้าของร้าน
        const ownerDoc = await db.collection("admins").doc("owner").get();
        if (ownerDoc.exists) {
            document.getElementById('app-pin-input').value = ownerDoc.data().pin || '';
        } else {
            document.getElementById('app-pin-input').value = '';
        }

        // 2. ดึงรหัส VIP
        const vipDoc = await db.collection("admins").doc("vip_code").get();
        if (vipDoc.exists) {
            if (document.getElementById('vip-pin-input')) {
                document.getElementById('vip-pin-input').value = vipDoc.data().pin || '';
            }
        } else {
            if (document.getElementById('vip-pin-input')) {
                document.getElementById('vip-pin-input').value = '';
            }
        }

        // 🔥 3. สั่งให้โหลดรายชื่อผู้ดูแลมาโชว์ใต้ปุ่มเขียว
        loadAdminList();

        // 🔒 4. ลอจิกใหม่: เช็คสิทธิ์เพื่อจัดการหน้าจอ
        const currentRole = sessionStorage.getItem('adminRole');
        
        if (currentRole === 'staff') {
            // --- ถ้าเป็น Staff ให้ล็อกปุ่มและช่องพิมพ์ทั้งหมด ---
            
            // ล็อกช่องพิมพ์ให้เป็นสีเทาและพิมพ์ไม่ได้
            document.getElementById('app-pin-input').disabled = true;
            document.getElementById('app-pin-input').style.background = '#e9ecef';
            
            document.getElementById('vip-pin-input').disabled = true;
            document.getElementById('vip-pin-input').style.background = '#e9ecef';
            
            document.getElementById('new-admin-username').disabled = true;
            document.getElementById('new-admin-username').style.background = '#e9ecef';
            
            document.getElementById('new-admin-password').disabled = true;
            document.getElementById('new-admin-password').style.background = '#e9ecef';

            // ล็อกปุ่มกดให้เป็นสีเทาและกดไม่ได้
            const btnApp = document.querySelector('button[onclick="saveAppPin()"]');
            if (btnApp) { btnApp.disabled = true; btnApp.style.background = '#6c757d'; btnApp.style.cursor = 'not-allowed'; }
            
            const btnVip = document.querySelector('button[onclick="saveVipPin()"]');
            if (btnVip) { btnVip.disabled = true; btnVip.style.background = '#6c757d'; btnVip.style.cursor = 'not-allowed'; }
            
            const btnAddAdmin = document.querySelector('button[onclick="addAdmin()"]');
            if (btnAddAdmin) { btnAddAdmin.disabled = true; btnAddAdmin.style.background = '#6c757d'; btnAddAdmin.style.cursor = 'not-allowed'; }
            
        } else if (currentRole === 'owner') {
            // --- 🔥 โชว์ปุ่มประวัติการทำงาน เฉพาะบอสใหญ่ (Owner) ---
            const logSection = document.getElementById('action-log-section');
            if (logSection) logSection.style.display = 'block';
        }

    } catch (error) {
        console.error("❌ Error loading security data:", error);
    }
}
// ==========================================
// (จบตรงนี้)📌 ฟังก์ชันโหลดข้อมูลตอนเปิดหน้าเมนูรหัส (อัปเดตระบบล็อกสิทธิ์ Staff ห้ามแก้ไข) (จบตรงนี้)
// ==========================================

// ==========================================
// 📌 1. ฟังก์ชันบันทึกรหัสเข้าแอป (สำหรับเจ้าของร้าน) ลง Firebase
// ==========================================
async function saveAppPin() {
    const pinInput = document.getElementById('app-pin-input').value;
    
    // ดักจับรหัสผ่านสั้นเกินไป
    if (pinInput.length < 4) {
        alert('รหัส PIN ต้องมีอย่างน้อย 4 ตัวนะเพื่อน!');
        return;
    }

    try {
        // วิ่งไปสร้าง/อัปเดตข้อมูลในถัง "admins" โดยตั้งชื่อเอกสารให้เลยว่า "owner"
        await db.collection("admins").doc("owner").set({
            username: "เจ้าของร้าน",
            pin: pinInput,
            role: "owner", // ติดป้ายสถานะว่าเป็นบอสใหญ่
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }); // ใส่ merge ไว้กันข้อมูลพัง

        alert('✅ บันทึกรหัสบอสใหญ่สำเร็จแล้ว!');
        
    } catch (error) {
        console.error("❌ Error saving owner PIN:", error);
        alert('เกิดข้อผิดพลาดในการบันทึกรหัส!');
    }
}
// ==========================================
// (จบตรงนี้) 📌 1. ฟังก์ชันบันทึกรหัสเข้าแอป (สำหรับเจ้าของร้าน) ลง Firebase (จบตรงนี้)
// ==========================================

// ==========================================
// 📌 3. ฟังก์ชันบันทึกรหัส VIP (ราคาส่ง) ลง Firebase
// ==========================================
async function saveVipPin() {
    const vipInput = document.getElementById('vip-pin-input').value;
    
    // ดักจับถ้าช่องว่างเปล่า
    if (vipInput.trim() === '') {
        alert('ใส่รหัส VIP ก่อนดิเพื่อน!');
        return;
    }

    try {
        // วิ่งไปสร้าง/อัปเดตข้อมูลในถัง "admins" โดยตั้งชื่อแฟ้มว่า "vip_code"
        await db.collection("admins").doc("vip_code").set({
            pin: vipInput,
            type: "wholesale_vip", // ติดป้ายบอกว่านี่คือรหัสสำหรับราคาส่ง
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        alert('✅ บันทึกรหัส VIP ราคาส่งสำเร็จแล้ว!');
        
    } catch (error) {
        console.error("❌ Error saving VIP PIN:", error);
        alert('เกิดข้อผิดพลาดในการบันทึกรหัส VIP!');
    }
}
// ==========================================
//(จบตรงนี้) 📌 3. ฟังก์ชันบันทึกรหัส VIP (ราคาส่ง) ลง Firebase (จบตรงนี้)
// ==========================================

// ==========================================
// 📌 ฟังก์ชันเพิ่มผู้ดูแลระบบ (บันทึกลง Firebase)
// ==========================================
async function addAdmin() {
    const usernameInput = document.getElementById('new-admin-username').value;
    const passwordInput = document.getElementById('new-admin-password').value;

    // ดักจับถ้ากรอกข้อมูลไม่ครบ หรือ รหัสสั้นไป
    if (usernameInput.trim() === '') {
        alert('ตี๋! พิมพ์ชื่อผู้ดูแลก่อนสิเพื่อน!');
        return;
    }
    if (passwordInput.length < 4) {
        alert('รหัสผ่านต้องมีอย่างน้อย 4 ตัวนะ!');
        return;
    }

    try {
        // วิ่งไปเพิ่มข้อมูลลงถัง "admins" (ให้ Firebase สุ่ม ID แฟ้มให้เลย เพื่อไม่ให้ชื่อซ้ำกัน)
        await db.collection("admins").add({
            username: usernameInput,
            pin: passwordInput,
            role: "staff", // ติดป้ายสถานะว่าคนนี้คือลูกน้อง (ผู้ดูแล)
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('✅ สร้างบัญชีผู้ดูแลสำเร็จแล้ว!');
        
        // เคลียร์ช่องพิมพ์ให้ว่าง เพื่อเตรียมกรอกคนต่อไป
        document.getElementById('new-admin-username').value = '';
        document.getElementById('new-admin-password').value = '';

        // สั่งให้รีเฟรชดึงรายชื่อใหม่มาโชว์ทันที (ถ้ามึงวางฟังก์ชันโหลดรายชื่อแล้วมันจะทำงานออโต้)
        if (typeof loadAdminList === 'function') {
            loadAdminList();
        }
        
    } catch (error) {
        console.error("❌ Error adding admin:", error);
        alert('เกิดข้อผิดพลาดในการเพิ่มผู้ดูแล!');
    }
}
// ==========================================
//(จบตรงนี้) 📌 ฟังก์ชันเพิ่มผู้ดูแลระบบ (บันทึกลง Firebase) (จบตรงนี้)
// ==========================================


// ==========================================
// 📌 ฟังก์ชันดึงรายชื่อผู้ดูแลจาก Firebase มาโชว์ (อัปเดตซ่อนปุ่มลบถ้าเป็น Staff)
// ==========================================
async function loadAdminList() {
    const listContainer = document.getElementById('admin-list');
    if (!listContainer) return;

    listContainer.innerHTML = '<li style="text-align: center; color: #888; padding: 10px;">กำลังโหลดรายชื่อ...</li>';

    try {
        const snapshot = await db.collection("admins").get();
        let html = '';

        // ดึงสิทธิ์คนปัจจุบันมาเช็ค
        const currentRole = sessionStorage.getItem('adminRole');

        snapshot.forEach(doc => {
            // ข้ามแฟ้มรหัส VIP เพราะมันไม่ใช่คน
            if (doc.id === 'vip_code') return; 

            const data = doc.data();
            const displayName = data.username || 'ไม่ระบุชื่อ';

            // ถ้าเป็นเจ้าของร้าน (ป้ายเขียว ไม่มีปุ่มลบ)
            if (data.role === 'owner') {
                html += `
                    <li style="padding: 12px; margin-bottom: 5px; border: 1px solid #c3e6cb; display: flex; justify-content: space-between; align-items: center; background: #d4edda; border-radius: 8px;">
                        <span style="font-weight: bold; color: #155724;">👑 ${displayName}</span> 
                        <span style="color: #155724; font-size: 0.8em; background: #c3e6cb; padding: 4px 10px; border-radius: 20px; font-weight: bold;">เจ้าของ</span>
                    </li>
                `;
            } 
            // ถ้าเป็นลูกน้อง (ป้ายเทา มีปุ่มลบ)
            else if (data.role === 'staff') {
                
                // 🔥 ลอจิกใหม่: ถ้าเป็นบอส โชว์ปุ่มลบ / ถ้าเป็นสตาฟ โชว์ข้อความว่าดูได้อย่างเดียว
                let deleteBtnHtml = '';
                if (currentRole === 'owner') {
                    deleteBtnHtml = `<span style="color: #dc3545; font-size: 0.85em; cursor: pointer; font-weight: bold; text-decoration: underline;" onclick="deleteAdmin('${doc.id}')">ลบออก</span>`;
                } else {
                    deleteBtnHtml = `<span style="color: #ccc; font-size: 0.85em; font-style: italic;">(ดูได้อย่างเดียว)</span>`;
                }

                html += `
                    <li style="padding: 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #333;">👤 ${displayName}</span> 
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="color: #6c757d; font-size: 0.8em; background: #e9ecef; padding: 3px 8px; border-radius: 10px;">ผู้ดูแล</span>
                            ${deleteBtnHtml}
                        </div>
                    </li>
                `;
            }
        });

        listContainer.innerHTML = html;

    } catch (error) {
        console.error("❌ Error loading admin list:", error);
        listContainer.innerHTML = '<li style="color: red; text-align: center;">โหลดข้อมูลล้มเหลว</li>';
    }
}
// ==========================================
//(จบตรงนี้) 📌 ฟังก์ชันดึงรายชื่อผู้ดูแลจาก Firebase มาโชว์ (จบตรงนี้)
// ==========================================


// ==========================================
// ฟังก์ชันเปิดหน้าย่อยของการจัดการลูกค้า
// ==========================================
function openCustomerPage(type) {
    document.getElementById('customers-submenu-page').style.display = 'none';
    if (type === 'all') {
        document.getElementById('customers-all-page').style.display = 'block';

        // เรียกฟังก์ชันโหลดข้อมูลตรงนี้ เพื่อให้มันดึงรายชื่อลูกค้ามาใส่ใน div ที่เราเพิ่งทำไว้
        loadCustomerList();
    }
}

// ==========================================
// 📌 ฟังก์ชันบันทึก/แก้ไขสินค้า (ระบบฝากรูป Cloudinary สมบูรณ์ 100%)
// ==========================================
async function saveProduct(pid, catName) {
    const btn = document.getElementById(`btn-${pid}`);
    const nameInput = document.getElementById(`name-${pid}`).value.trim();
    const priceInput = document.getElementById(`price-${pid}`).value;
    const wholesaleInput = document.getElementById(`wholesale-${pid}`).value;
    
    // เช็คสวิตช์ปิด-เปิด
    const statusInput = document.getElementById(`status-${pid}`);
    const isSelling = statusInput ? statusInput.checked : false;
    
    // เช็ครูปภาพ
    const fileElement = document.getElementById(`file-${pid}`);
    const fileInput = fileElement && fileElement.files.length > 0 ? fileElement.files[0] : null;

    if (!nameInput) {
        alert('ตี๋! ใส่ชื่อสินค้าก่อนกดบันทึกดิเพื่อน!');
        return;
    }

    btn.innerText = "กำลังบันทึก...";
    btn.disabled = true;
    btn.style.background = "#6c757d";

    try {
        let imageUrl = "";

        // 🟢 โซนอัปโหลดรูปขึ้น Cloudinary
        if (fileInput) {
            btn.innerText = "กำลังอัปรูปรอแป๊บ...";
            const formData = new FormData();
            
            // Cloudinary ใช้คำว่า file แทนคำว่า image
            formData.append("file", fileInput); 
            // ใส่ชื่อ Preset ที่มึงตั้งไว้เมื่อกี้
            formData.append("upload_preset", "lovemalee"); 
            
            try {
                // ยิงไปที่ URL ของ Cloudinary รหัสร้านมึง hxpszdn6
                const response = await fetch(`https://api.cloudinary.com/v1_1/hxpszdn6/image/upload`, {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();
                
                if (response.ok) {
                    imageUrl = data.secure_url; // Cloudinary จะส่งลิงก์รูปกลับมาในชื่อ secure_url
                } else {
                    alert("เกิดปัญหาฝากรูป: " + (data.error ? data.error.message : "ไม่ทราบสาเหตุ"));
                    btn.innerText = "บันทึก";
                    btn.style.background = "#16365d";
                    btn.disabled = false;
                    return; 
                }
            } catch (error) {
                alert("การเชื่อมต่อเน็ตมีปัญหา หรือส่งรูปไม่ผ่านครับ");
                btn.innerText = "บันทึก";
                btn.style.background = "#16365d";
                btn.disabled = false;
                return;
            }
        }

        btn.innerText = "กำลังจัดเก็บข้อมูล...";

        // 🟢 โซนจัดเตรียมข้อมูล (ระบบจะส่ง catName ชื่อใหม่ล่าสุดไปทับของเก่าที่นี่)
        let productData = {
            name: nameInput,
            price: parseFloat(priceInput) || 0,
            vipPrice: parseFloat(wholesaleInput) || 0,
            category: catName, // <-- ดึงชื่อภาษาไทยจากปุ่มหน้าเว็บมาใช้
            isSelling: isSelling,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // ถ้ารูปมีการอัปเดตใหม่ ค่อยส่งลิงก์รูปไปทับ
        if (imageUrl !== "") {
            productData.imageUrl = imageUrl;
        }

        // ยิงข้อมูลขึ้น Firebase (merge: true คืออัปเดตเฉพาะค่าที่ส่งไป ค่าอื่นไม่หาย)
        await db.collection("products").doc(pid).set(productData, { merge: true });

        // 🔥 สั่งบันทึกประวัติแบบละเอียด
        if (typeof logAction === 'function') {
            logAction(
                'บันทึก/แก้ไขสินค้า', 
                `อัปเดต "${nameInput}" -> สถานะ: ${isSelling ? 'เปิดขาย' : 'ปิดซ่อน'} | ราคาปกติ: ${priceInput}฿ | ราคาส่ง: ${wholesaleInput}฿`, 
                'product', 
                `${catName}|${pid}`
            );
        }

        btn.innerText = "บันทึกสำเร็จ ✅";
        btn.style.background = "#28a745";
        
        // คืนสภาพปุ่มกลับมาเหมือนเดิม
        setTimeout(() => {
            btn.innerText = "บันทึก";
            btn.style.background = "#16365d";
            btn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error("เกิดข้อผิดพลาด: ", error);
        alert("บันทึกไม่สำเร็จ: " + error.message);
        btn.innerText = "บันทึก";
        btn.style.background = "#16365d";
        btn.disabled = false;
    }
}

// ==========================================
// 📌 ฟังก์ชันดึงข้อมูลสินค้าหลังบ้าน (โหลดเร็ว โหลดชัวร์)
// ==========================================
async function loadAdminProducts() {
    try {
        console.log("กำลังดึงข้อมูลเช็คบล็อกสินค้า...");
        const snapshot = await db.collection("products").get();
        let count = 0;

        snapshot.forEach(doc => {
            const pid = doc.id;      
            const data = doc.data(); 

            const nameInput = document.getElementById(`name-${pid}`);
            const priceInput = document.getElementById(`price-${pid}`);
            const wholesaleInput = document.getElementById(`wholesale-${pid}`);
            const statusInput = document.getElementById(`status-${pid}`);
            const previewContainer = document.getElementById(`preview-${pid}`); 

            // ถ้าเจอช่องของ ID นี้บนหน้าจอ ค่อยเอาข้อมูลไปยัดใส่ (โคตรฉลาด!)
            if (nameInput) {
                nameInput.value = data.name || "";
                if (priceInput) priceInput.value = data.price || "";
                if (wholesaleInput) wholesaleInput.value = data.vipPrice || "";
                if (statusInput) statusInput.checked = (data.isSelling !== false);
                
                // ระบบโหลดรูป (มี Lazy Load ช่วยให้เว็บไม่ค้างตอนโหลดเยอะๆ)
                let finalImg = data.imageUrl || data.img;
                if (previewContainer && finalImg && finalImg !== "📦") {
                    previewContainer.innerHTML = `<img src="${finalImg}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">`;
                }

                count++;
            } else {
                // ถ้าหาไม่เจอ แปลว่าไม่ได้เปิดหมวดหมู่นี้อยู่ ระบบจะข้ามไปเงียบๆ
                console.log("ข้ามการโหลด ID: " + pid + " (ไม่ได้อยู่หน้าหมวดหมู่นี้ หรือเป็นของเก่า)");
            }
        });
        console.log(`✅ โหลดข้อมูลสำเร็จ! ใส่ลงไปทั้งหมด ${count} กล่อง`);
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหลังบ้าน: ", error);
    }
}

// ==========================================
// 📌 ระบบสวิตช์ เปิด/ปิด หมวดหมู่สินค้าหน้าบ้าน (ส่วนที่ 1: ฝั่งหลังบ้าน)
// ==========================================
function confirmToggle(checkboxElem, catName) {
    let isShowing = checkboxElem.checked; 
    let actionText = isShowing ? "เปิดโชว์" : "ซ่อน";

    if (confirm(`คุณต้องการ "${actionText}" หมวดหมู่ [${catName}] ที่หน้าบ้านใช่ไหม?`)) {
        
        db.collection("categoryStatus").doc(catName).set({
            isShowing: isShowing
        }, { merge: true })
        .then(() => {
            console.log(`✅ บันทึกสถานะหมวดหมู่ ${catName} เป็น ${isShowing} เรียบร้อย`);
            
            // 🔥 [แก้ตรงนี้!] เปลี่ยน type เป็น 'category' เพื่อแยกสายไฟไม่ให้ชนกับหน้าย่อยสินค้า
            if (typeof logAction === 'function') {
                logAction(
                    'ตั้งค่าหน้าเว็บ (หมวดหมู่)', 
                    `สั่ง "${actionText}" หมวดหมู่: [${catName}] ที่หน้าร้าน`, 
                    'category', 
                    catName
                );
            }
        })
        .catch((error) => {
            alert("บันทึกไม่สำเร็จ กรุณาลองใหม่");
            checkboxElem.checked = !isShowing; 
        });
        
        return true; 
    } else {
        checkboxElem.checked = !isShowing;
        return false;
    }
}

// 2. ฟังก์ชันโหลดสถานะสวิตช์จาก Firebase มาโชว์ตอนเปิดหน้าหลังบ้าน
async function loadCategoryStatus() {
    try {
        const snapshot = await db.collection("categoryStatus").get();
        snapshot.forEach(doc => {
            const catName = doc.id;
            const data = doc.data();
            
            const checkbox = document.querySelector(`input[onclick*="'${catName}'"]`);
            if (checkbox) {
                checkbox.checked = (data.isShowing !== false); 
            }
        });
    } catch (error) {
        console.error("❌ โหลดสถานะสวิตช์ไม่สำเร็จ: ", error);
    }
}

window.addEventListener('DOMContentLoaded', loadCategoryStatus);



// ==========================================
// 📌 ฟังก์ชันเปิดหน้าย่อยของบิลสินค้า (สะพานเชื่อมดึงข้อมูล)
// ==========================================
function openBillPage(pageType) {
    // 1. ซ่อนหน้าเมนูย่อยบิล (หน้าที่มี 3 ปุ่ม)
    let billsSubmenu = document.getElementById('bills-submenu-page');
    if (billsSubmenu) billsSubmenu.style.display = 'none';
    
    // 2. ซ่อนหน้าบิลทุกหน้าเพื่อเคลียร์จอให้ว่างก่อน
    if (document.getElementById('bill-pending-page')) document.getElementById('bill-pending-page').style.display = 'none';
    if (document.getElementById('bill-paid-page')) document.getElementById('bill-paid-page').style.display = 'none';
    if (document.getElementById('bill-canceled-page')) document.getElementById('bill-canceled-page').style.display = 'none';

    // 3. เช็คว่ากดปุ่มไหนมา -> เปิดหน้านั้น -> และสั่งดึงข้อมูล!
    if (pageType === 'pending') {
        document.getElementById('bill-pending-page').style.display = 'block';
        
        // 🔥 จุดสำคัญที่สุด: สั่งปลุกฟังก์ชันวาดบิลให้วิ่งไปดึงข้อมูลจาก Firebase มาโชว์
        if (typeof loadPendingBills === 'function') {
            loadPendingBills(); 
        } else {
            console.error("❌ ระบบหาฟังก์ชัน loadPendingBills ไม่เจอ กรุณาตรวจสอบโค้ด!");
        }

    } else if (pageType === 'paid') {
        document.getElementById('bill-paid-page').style.display = 'block';
        loadPaidBills(); // สั่งดึงบิลทันทีที่เปิดหน้านี้

    } else if (pageType === 'canceled') {
        document.getElementById('bill-canceled-page').style.display = 'block';
        
        // 🔥 จุดที่แทรกเสร็จสรรพ: สั่งโหลดบิลยกเลิกทันทีที่เปิดหน้านี้
        loadCanceledBills(); 
    }
}


// ==========================================
// 📌 บล็อกที่ 3: ระบบดึงบิล 'รอสรุปยอด' (ขอบพอดีสลิป + ซ่อนปุ่มหลังบ้านตอนถ่ายรูป)
// ==========================================
function loadPendingBills() {
    const container = document.getElementById('pending-bills-container');
    if(!container) return;
    
    // โชว์ข้อความรอกำลังโหลด
    container.innerHTML = '<div style="text-align:center; padding: 20px; color: #888;">กำลังโหลดข้อมูล... ⏳</div>';

    // วิ่งไปดึงบิลที่สถานะ "รอสรุปยอด"
    db.collection("orders").where("status", "==", "รอสรุปยอด").get()
    .then((querySnapshot) => {
        if(querySnapshot.empty) {
            container.innerHTML = '<div style="text-align: center; padding: 30px; color: gray; border: 2px dashed #ffc107; border-radius: 10px;">ยังไม่มีบิลสั่งซื้อใหม่ครับ 📭</div>';
            return;
        }

        // เรียงบิลใหม่ล่าสุดขึ้นก่อน (ลอจิกเดิมของมึงเป๊ะ)
        let orders = [];
        querySnapshot.forEach(doc => orders.push(doc.data()));
        orders.sort((a,b) => b.timestamp - a.timestamp);

        let html = '';
        
        // วนลูปสร้างบิลทีละใบ
        orders.forEach(order => {
            
            // 1. สร้างรายการสินค้า + ใส่ปุ่มกดดูรูป (ลอจิกเดิมเป๊ะ)
            let itemsHtml = '';
            order.items.forEach(item => {
                let img = item.imageUrl || item.img || ''; 
                itemsHtml += `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 10px;">
                    <img src="${img}" crossorigin="anonymous" onclick="showAdminFullImage('${img}')" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #ccc; cursor: pointer;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #333; font-size: 0.9em;">${item.name}</div>
                            <div style="color: #666; font-size: 0.85em;">${item.qty} ชิ้น x ฿${item.price}</div>
                        </div>
                        <div style="font-weight: bold; color: #ff4b2b;">฿${item.qty * item.price}</div>
                    </div>
                `;
            });

            // ตั้งชื่อ ID เฉพาะสำหรับบิลใบนี้ (ของเดิม)
            let detailsId = `bill-details-${order.billId}`;
            let billCardId = `bill-card-${order.billId}`;
            
            // 🔥 [เพิ่มใหม่] สร้าง ID สำหรับเป้าหมายที่จะถ่ายรูปเฉพาะสลิป ไม่เอาปุ่ม
            let receiptSlipId = `receipt-slip-${order.billId}`;

            // 2. ประกอบร่างโครงสร้างบิล
            html += `
                <div id="${billCardId}" style="background: white; border-radius: 15px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border: 1px solid #ddd; overflow: hidden;">
                    
                    <div onclick="toggleBillDetails('${detailsId}')" style="padding: 15px; background: #fff9e6; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 0.8em; color: #888;">รหัสบิล: ${order.billId}</div>
                            <div style="font-weight: bold; color: #1a365d; margin-top: 5px;">👤 ${order.customerName}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 0.8em; background: #ffc107; color: #000; padding: 4px 10px; border-radius: 12px; font-weight: bold;">รอสรุปยอด 🔽</div>
                        </div>
                    </div>

                    <div id="${detailsId}" style="display: none; padding: 15px; background: #f8f9fa;">
                        
                        <div id="${receiptSlipId}" style="background: #fff; padding: 20px; border-radius: 8px; border: 3px solid #ccc; width: 320px; margin: 0 auto; box-sizing: border-box;">
                            
                            <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px dashed #ffc107; padding-bottom: 15px;">
<h3 style="margin: 0; color: #16365d; font-size: 1.25em; font-weight: bold;">MaLee Online</h3>                                
<p style="margin: 4px 0 0 0; color: #3b5998; font-size: 0.9em; font-weight: bold;">ใบแจ้งยอดชำระเงิน (Invoice)</p>
                                <p style="margin: 4px 0 0 0; color: #888; font-size: 0.8em;">รหัสบิล: ${order.billId}</p>
                                <p style="margin: 2px 0 0 0; color: #888; font-size: 0.8em;">ลูกค้า: คุณ ${order.customerName}</p>
                            </div>

                            <div style="margin-bottom: 15px;">
                                ${itemsHtml}
                            </div>

                            <div style="border-top: 1px dashed #ccc; padding-top: 10px; margin-bottom: 5px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <span style="color: #555;">ยอดรวมสินค้า:</span>
                                    <span style="font-weight: bold;">฿${order.productTotal}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                    <span style="color: #555;">ค่าจัดส่ง:</span>
                                    <div style="text-align: right;">
                                        <span id="shipping-text-${order.billId}" style="font-weight: bold; color: #333; font-size: 1.1em;">฿0</span>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-size: 1.1em; font-weight: bold; border-top: 1px solid #eee; padding-top: 5px;">
                                    <span style="color: #333;">ยอดที่ต้องชำระ:</span>
                                    <span id="final-total-${order.billId}" style="color: #ff4b2b;">฿${order.productTotal}</span>
                                </div>
                            </div>
                        </div>
                        <div style="max-width: 450px; margin: 15px auto 0 auto; background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; box-sizing: border-box;">
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <span style="color: #555; font-weight: bold;">ระบุค่าจัดส่งเพิ่ม:</span>
                                <input type="number" id="shipping-input-${order.billId}" oninput="updateBillTotal('${order.billId}', ${order.productTotal})" placeholder="ใส่ค่าส่ง" style="width: 100px; padding: 5px; text-align: right; border: 1px solid #ccc; border-radius: 4px;">
                            </div>

                            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                                <button onclick="captureBill('${receiptSlipId}', '${order.billId}')" style="flex: 1; padding: 10px; border-radius: 8px; background: #17a2b8; border: none; color: white; font-weight: bold; cursor: pointer;">📸 คัดลอกบิลเป็นรูปภาพ</button>
                            </div>
                            
                            <div style="display: flex; gap: 10px;">
                                <button onclick="cancelBill('${order.billId}')" style="flex: 1; padding: 10px; border-radius: 8px; background: #fff; border: 1px solid #dc3545; color: #dc3545; font-weight: bold; cursor: pointer;">❌ ยกเลิกบิล</button>
                                <button onclick="confirmBillPayment('${order.billId}')" style="flex: 1; padding: 10px; border-radius: 8px; background: #28a745; border: none; color: white; font-weight: bold; cursor: pointer;">✅ ยืนยันการชำระเงิน</button>
                            </div>

                        </div>
                        </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    })
    .catch(error => {
        console.error("❌ โหลดบิลพลาด: ", error);
        container.innerHTML = '<div style="color: red; text-align: center;">เกิดข้อผิดพลาดในการโหลดข้อมูลบิล</div>';
    });
}

// ==========================================
// 📌 ระบบแจ้งเตือนบิลใหม่ (ทำงานอัตโนมัติตลอดเวลา)
// ==========================================
function listenForNewBills() {
    // ส่งสายลับ (onSnapshot) ไปเฝ้าแฟ้ม orders เฉพาะที่สถานะ "รอสรุปยอด"
    db.collection("orders").where("status", "==", "รอสรุปยอด")
    .onSnapshot((snapshot) => {
        
        let count = snapshot.size; // นับจำนวนบิลทั้งหมดที่เจอ
        
        // 1. อัปเดตวงกลมสีแดงที่เมนูหลัก
        let mainBadge = document.getElementById('main-bill-badge');
        if(mainBadge) {
            if(count > 0) {
                mainBadge.style.display = 'flex'; // โชว์วงกลมแดง
                mainBadge.innerText = count;      // ใส่ตัวเลข
            } else {
                mainBadge.style.display = 'none'; // ซ่อนวงกลมแดงถ้าไม่มีบิล
            }
        }

        // 2. อัปเดตตัวเลขที่ปุ่มย่อย (1. รอสรุปยอด)
        let subBadge = document.getElementById('sub-pending-badge');
        if(subBadge) {
            subBadge.innerText = count; // ใส่ตัวเลข
        }

        // 🔥 ทริคพิเศษ: ถ้าเปิดหน้า "รอสรุปยอด" ค้างไว้ ให้มันดึงบิลมาวาดใหม่ทันทีที่บิลเข้า
        let pendingPage = document.getElementById('bill-pending-page');
        if (pendingPage && pendingPage.style.display === 'block') {
            if (typeof loadPendingBills === 'function') {
                loadPendingBills();
            }
        }
    });
}

// สั่งให้สายลับเริ่มทำงานทันทีที่เปิดหน้าหลังบ้าน
listenForNewBills();

// ==========================================
// 📌 ฟังก์ชันสวิตช์สำหรับ พับ / กาง รายละเอียดบิล
// ==========================================
function toggleBillDetails(detailsId) {
    const detailsBox = document.getElementById(detailsId);
    if (!detailsBox) return; // ถ้าหากล่องไม่เจอให้หยุดทำงาน

    // เช็คสเตตัสปัจจุบัน: ถ้าซ่อนอยู่ (none) ให้กางออก (block) / ถ้ากางอยู่ให้พับเก็บ (none)
    if (detailsBox.style.display === 'none' || detailsBox.style.display === '') {
        detailsBox.style.display = 'block';
    } else {
        detailsBox.style.display = 'none';
    }
}


// ==========================================
// 📌 ฟังก์ชันกดดูรูปสินค้าขนาดใหญ่ (Popup)
// ==========================================
function showAdminFullImage(imgUrl) {
    const modal = document.getElementById('admin-image-modal');
    const modalImg = document.getElementById('admin-modal-img');
    
    if (modal && modalImg) {
        modalImg.src = imgUrl; // เอารูปลิงก์ที่กดไปใส่ในกล่องใหญ่
        modal.style.display = 'flex'; // สั่งโชว์กล่องดำ (ใช้ flex เพื่อให้รูปอยู่กึ่งกลางจอ)
    }
}


// ==========================================
// 📌 ฟังก์ชัน 1: คำนวณยอดรวมทันทีที่พิมพ์ค่าส่ง
// ==========================================
function updateBillTotal(billId, productTotal) {
    let shippingInput = document.getElementById(`shipping-input-${billId}`);
    let finalTotalSpan = document.getElementById(`final-total-${billId}`);
    let shippingTextSpan = document.getElementById(`shipping-text-${billId}`);

    // ดึงตัวเลขที่พิมพ์ (ถ้าไม่ได้พิมพ์ให้เป็น 0)
    let shippingCost = parseFloat(shippingInput.value) || 0;
    let finalTotal = productTotal + shippingCost;

    // อัปเดตตัวเลขบนจอ
    finalTotalSpan.innerText = `฿${finalTotal}`;
    shippingTextSpan.innerText = `฿${shippingCost}`; // เตรียมข้อความเนียนๆ ไว้รอตอนถ่ายรูป
}

// ==========================================
// 📌 ฟังก์ชัน 2: ถ่ายรูปบิล (ซ่อนกล่องสี่เหลี่ยมชั่วคราว + แก้รูประบบขาวโพลน)
// ==========================================
function captureBill(billCardId, billId) {
    let billCard = document.getElementById(billCardId);
    let shippingInput = document.getElementById(`shipping-input-${billId}`);
    let shippingText = document.getElementById(`shipping-text-${billId}`);

    // 1. สลับร่างก่อนถ่าย: ซ่อนช่องกรอกโชว์ตัวหนังสือ
    if (shippingInput && shippingText) {
        shippingInput.style.display = 'none';
        shippingText.style.display = 'inline';
    }

    // 2. ถ่ายรูปด้วย html2canvas 
    // 🔥 จุดที่แก้: เติม useCORS: true และ allowTaint: true เพื่อให้มันยอมวาดรูปจาก Firebase
    html2canvas(billCard, { 
        backgroundColor: '#ffffff', 
        scale: 2, 
        useCORS: true, 
        allowTaint: true 
    }).then(canvas => {
        canvas.toBlob(blob => {
            // คัดลอกรูปลง Clipboard
            navigator.clipboard.write([new ClipboardItem({'image/png': blob})])
            .then(() => alert('📸 คัดลอกบิลเรียบร้อย! รูปสินค้ามาครบ เอาไปกด "วาง" (Paste) ได้เลยครับ'))
            .catch(err => console.error('คัดลอกรูปภาพล้มเหลว:', err));
        });

        // 3. ถ่ายเสร็จ สลับร่างกลับ: โชว์ช่องกรอกเหมือนเดิม
        if (shippingInput && shippingText) {
            shippingInput.style.display = 'inline-block';
            shippingText.style.display = 'none';
        }
    });
}


// ==========================================
// 📌 ฟังก์ชันจัดการสถานะบิล (ยืนยันชำระเงิน / ยกเลิกบิล)
// ==========================================

// 1. ฟังก์ชันสมองกล: ทำหน้าที่ส่งข้อมูลไปเปลี่ยนสถานะใน Firebase (ฝังระบบประวัติแล้ว)
async function updateBillStatusInFirebase(billId, newStatus, shippingCost = 0) {
    try {
        await db.collection("orders").doc(billId).update({
            status: newStatus,
            shippingCost: shippingCost, 
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert(`✅ อัปเดตสถานะบิลเป็น "${newStatus}" เรียบร้อยแล้ว!`);
        
        // 🔥 [เสียบสายไฟประวัติ] สั่งกล้องวงจรปิดบันทึกการทำรายการบิล
        if (typeof logAction === 'function') {
            let actionDesc = newStatus === 'ชำระแล้ว' 
                ? `ยืนยันรับยอดบิล (ค่าจัดส่ง: ${shippingCost}฿)` 
                : `ยกเลิกบิลนี้แล้ว`;
            
            logAction(
                `จัดการบิล [${newStatus}]`, 
                actionDesc, 
                'bill', // ส่ง type เป็น bill เพื่อให้เด้งไปหน้าบิล
                `${newStatus}|${billId}` // มัดรวมสถานะใหม่ และ ID บิล ส่งไปให้ระบบวาร์ปทำงาน
            );
        }

        // โหลดข้อมูลบิลรอสรุปยอดใหม่ เพื่อให้บิลที่เพิ่งกดหายไปจากหน้าจอ
        loadPendingBills(); 
        
        // สั่งอัปเดตตัวเลขหน้าเมนูย่อย
        if (typeof updatePaidCountBadgeOnly === 'function') updatePaidCountBadgeOnly();
        if (typeof updateCanceledCountBadgeOnly === 'function') updateCanceledCountBadgeOnly();

    } catch (error) {
        console.error("Error updating bill status: ", error);
        alert("❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล: " + error.message);
    }
}

// 2. สวิตช์ปุ่ม ✅ ยืนยันการชำระเงิน
// 💡 สิ่งที่เพิ่ม: ลอจิกวิ่งไปดึงค่าจัดส่ง + ป๊อปอัปดักจับถ้าลืมใส่ค่าส่ง
function confirmBillPayment(billId) {
    // วิ่งไปหาช่องกรอกค่าจัดส่งของบิลนั้น และดึงตัวเลขมา
    const shippingInput = document.getElementById(`shipping-input-${billId}`);
    const shippingCost = shippingInput ? (parseFloat(shippingInput.value) || 0) : 0;

    // 🚨 ลอจิกดักจับ: ถ้าค่าส่งเป็น 0 หรือลืมกรอก ให้เด้งถามก่อน
    if (shippingCost === 0) {
        const confirmNoShipping = confirm('⚠️ คุณยังไม่ได้ใส่ "ค่าจัดส่ง"\n\nต้องการยืนยันการชำระเงินโดยไม่มีค่าจัดส่ง ใช่หรือไม่?');
        if (!confirmNoShipping) {
            return; // ถ้ายกเลิก (กด Cancel) ให้หยุดการทำงานทันที ไม่ส่งข้อมูลไปไฟล์เบส
        }
    }

    // ถามยืนยันยอดเงินเข้าตามปกติ (ถ้ากดผ่านด่านแรกมาได้ หรือมีค่าส่งอยู่แล้ว)
    if (confirm('ยอดเงินเข้าแล้วใช่ไหม? กด "ตกลง" เพื่อยืนยันการชำระเงิน')) {
        updateBillStatusInFirebase(billId, 'ชำระแล้ว', shippingCost); // ส่งค่าจัดส่งห้อยท้ายไปด้วย
        
        // 🔥 จุดที่แทรก: สั่งอัปเดตเลขบิลรอส่งอัตโนมัติ (หน่วงเวลา 1 วิให้ไฟล์เบสบันทึกสถานะบิลให้เสร็จก่อน แล้วค่อยนับเลข)
        setTimeout(() => {
            if (typeof updatePendingShippingBadgeOnly === 'function') updatePendingShippingBadgeOnly();
        }, 1000);
    }
}


// 3. สวิตช์ปุ่ม ❌ ยกเลิกบิล
function cancelBill(billId) {
    if (confirm('คุณแน่ใจนะว่าจะ "ยกเลิก" บิลนี้?')) {
        updateBillStatusInFirebase(billId, 'ยกเลิก', 0); // ยกเลิกบิล ค่าส่งให้เป็น 0 ไปเลย
    }
}

// ==========================================
// 📌 ฟังก์ชันโหลดข้อมูลบิล "ชำระแล้ว" (เวอร์ชันมีปฏิทินเลือกดูย้อนหลังได้)
// ==========================================
async function loadPaidBills() {
    const container = document.getElementById('paid-bills-container');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center; color:#5b7c9e;">กำลังโหลดข้อมูลบิลชำระแล้ว...</p>';

    try {
        const snapshot = await db.collection("orders").where("status", "==", "ชำระแล้ว").get();
        
        // 📅 จัดการวันที่จากปฏิทิน
        const datePicker = document.getElementById('paid-date-picker');
        let targetDate = new Date();

        if (datePicker && datePicker.value) {
            // ถ้ามีการเลือกวันที่จากปฏิทิน ให้ใช้วันนั้น
            targetDate = new Date(datePicker.value);
        } else if (datePicker) {
            // เซ็ตค่าเริ่มต้นให้ปฏิทินโชว์ "วันนี้" ตอนเปิดหน้าครั้งแรก (ปรับให้ตรงกับเวลาไทย)
            const localISOTime = new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            datePicker.value = localISOTime;
        }

        // กำหนดขอบเขตเวลา เริ่มต้น 00:00:00 ถึง 23:59:59 ของวันที่เลือกเท่านั้น
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);

        let paidOrders = [];
        snapshot.forEach(doc => {
            const order = doc.data();
            const updatedAt = order.updatedAt ? order.updatedAt.toDate() : new Date(0);
            
            // 🔥 กรองเอาเฉพาะบิลที่เวลาตรงกับ "วันที่เราเลือก" เป๊ะๆ
            if (updatedAt >= startOfDay && updatedAt <= endOfDay) {
                order.docId = doc.id; 
                order.updatedAtDate = updatedAt; 
                paidOrders.push(order);
            }
        });

        // ถ้าวันนั้นไม่มีบิลเลย ให้โชว์ข้อความว่าไม่มีของวันที่เท่าไหร่
        if (paidOrders.length === 0) {
            const showDateStr = startOfDay.toLocaleDateString('th-TH');
            container.innerHTML = `<p style="color: #5b7c9e; text-align:center;">ไม่มีรายการชำระเงินในวันที่ ${showDateStr}</p>`;
            return;
        }

        // เรียงลำดับเวลาเก่าไปใหม่ เพื่อให้บิลแรกสุดอยู่ล่างสุด
        paidOrders.sort((a, b) => a.updatedAtDate - b.updatedAtDate);

        let html = '';

        // ลูปวาดหน้าตาบิลเหมือนเดิมเป๊ะของมึง
        for (let i = paidOrders.length - 1; i >= 0; i--) {
            const order = paidOrders[i];
            const displayIndex = i + 1; 
            const detailsId = `paid-details-${order.docId}`; 
            
            let itemsHtml = '';
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const imgUrl = item.img || item.imageUrl || item.image || 'https://cdn-icons-png.flaticon.com/512/1170/1170628.png'; 
                    itemsHtml += `
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #eee;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <img src="${imgUrl}" crossorigin="anonymous" onclick="showAdminFullImage('${imgUrl}')" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd; cursor: pointer;">
                                <div>
                                    <div style="font-weight: bold; color: #333; font-size: 0.95em;">${item.name || 'สินค้า'}</div>
                                    <div style="color: #666; font-size: 0.85em;">฿${item.price} x ${item.quantity || 1}</div>
                                </div>
                            </div>
                            <div style="font-weight: bold; color: #333;">฿${(item.price * (item.quantity || 1))}</div>
                        </div>
                    `;
                });
            }

            const shippingCost = order.shippingCost || 0;
            const totalPaid = order.productTotal + shippingCost;

            html += `
                <div class="bill-card" style="margin-bottom: 15px; border: 1px solid #28a745; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    
                    <div onclick="toggleBillDetails('${detailsId}')" style="background: #e8f5e9; padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #c8e6c9;">
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="font-weight: bold; color: #28a745; font-size: 1.05em;">บิล: ${displayIndex}</span>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-weight: bold; color: #333;">คุณ ${order.customerName}</span>
                                <span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold; display: inline-block;">ชำระแล้ว</span>
                            </div>
                        </div>
                        
                        <div style="color: #666; font-size: 0.85em; font-weight: bold; text-align: left;">
                            รหัสบิล: <span style="color: #555; font-weight: normal;">${order.billId || order.docId}</span>
                        </div>
                        
                    </div>

                    <div id="${detailsId}" style="display: none; padding: 20px; background: #fff;">
                        <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px dashed #28a745; padding-bottom: 15px;">
<h3 style="margin: 0; color: #16365d; font-size: 1.25em; font-weight: bold;">MaLee Online</h3>                            <p style="margin: 4px 0 0 0; color: #3b5998; font-size: 0.9em; font-weight: bold;">หลักฐานการชำระเงิน (Proof of Payment)</p>
                            <p style="margin: 2px 0 0 0; color: #999; font-size: 0.8em;">วันที่ชำระ: ${order.updatedAtDate.toLocaleDateString('th-TH')} | เวลา: ${order.updatedAtDate.toLocaleTimeString('th-TH')} น.</p>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <div style="color: #888; font-size: 0.8em; margin-bottom: 8px; font-weight: bold; text-align: center;">สรุปรายการสั่งซื้อ</div>
                            ${itemsHtml}
                        </div>

                        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; border: 1px solid #eee; margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9em;">
                                <span style="color: #666;">ยอดรวมสินค้า:</span>
                                <span style="color: #333; font-weight: bold;">฿${order.productTotal}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9em;">
                                <span style="color: #666;">ค่าจัดส่ง:</span>
                                <span style="color: #333; font-weight: bold;">฿${shippingCost}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.1em; font-weight: bold; border-top: 1px dashed #ddd; padding-top: 8px; margin-top: 4px;">
                                <span style="color: #16365d;">ยอดชำระทั้งสิ้น:</span>
                                <span style="color: #28a745;">฿${totalPaid}</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: center; margin-top: 10px;">
                            <div style="border: 2px solid #28a745; color: #28a745; font-size: 0.9em; font-weight: bold; padding: 6px 16px; transform: rotate(-3deg); border-radius: 8px; background: rgba(40, 167, 69, 0.05);">
                                ✅ ชำระเงินแล้ว
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;

    } catch (error) {
        console.error("Error loading paid bills:", error);
        container.innerHTML = '<p style="color:red; text-align:center;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}


// ==========================================
// 📌 ตัวนับจำนวนบิล "ชำระแล้ว" เพื่ออัปเดตตัวเลขหน้าย่อยแบบเรียลไทม์
// ==========================================
let unsubscribePaidBadge = null; // ตัวแปรนี้ป้องกันการดักฟังซ้ำซ้อน

async function updatePaidCountBadgeOnly() {
    try {
        // ถ้าระบบเคยดักฟังอยู่แล้ว ให้ล้างค่าเก่าทิ้งก่อนเริ่มใหม่
        if (unsubscribePaidBadge) {
            unsubscribePaidBadge();
        }

        // 🔥 เปลี่ยนเป็น .onSnapshot() เพื่อดึงข้อมูลตลอดเวลาแบบ Realtime
        unsubscribePaidBadge = db.collection("orders")
            .where("status", "==", "ชำระแล้ว")
            .onSnapshot(snapshot => {
                let todayPaidCount = 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0); // รีเซ็ตเวลาเป็น 00:00:00 ของวันนี้

                snapshot.forEach(doc => {
                    const order = doc.data();
                    const updatedAt = order.updatedAt ? order.updatedAt.toDate() : new Date(0);
                    
                    // นับเฉพาะบิลของวันนี้
                    if (updatedAt >= today) {
                        todayPaidCount++;
                    }
                });

                // ยัดตัวเลขลงใน Badge
                const subPaidBadge = document.getElementById('sub-paid-badge');
                if (subPaidBadge) {
                    subPaidBadge.innerText = todayPaidCount;
                }
            }, error => {
                console.error("เกิดข้อผิดพลาดในการดักฟังบิลชำระแล้ว:", error);
            });

    } catch (error) {
        console.error("Error updating paid badge:", error);
    }
}

// ==========================================
// 📌 ฟังก์ชันโหลดข้อมูลบิล "ยกเลิกบิล" (เวอร์ชันมีปฏิทินเลือกดูย้อนหลังได้)
// ==========================================
async function loadCanceledBills() {
    const container = document.getElementById('canceled-bills-container');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center; color:#5b7c9e;">กำลังโหลดบิลยกเลิก...</p>';

    try {
        // วิ่งไปดึงบิลทั้งหมดที่สถานะเป็น "ยกเลิก"
        const snapshot = await db.collection("orders").where("status", "==", "ยกเลิก").get();
        
        // 📅 จัดการวันที่จากปฏิทิน
        const datePicker = document.getElementById('canceled-date-picker');
        let targetDate = new Date();

        if (datePicker && datePicker.value) {
            // ถ้ามีการเลือกวันที่จากปฏิทิน ให้ใช้วันนั้น
            targetDate = new Date(datePicker.value);
        } else if (datePicker) {
            // เซ็ตค่าเริ่มต้นให้ปฏิทินโชว์ "วันนี้" ตอนเปิดหน้าครั้งแรก
            const localISOTime = new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            datePicker.value = localISOTime;
        }

        // กำหนดขอบเขตเวลา เริ่มต้น 00:00:00 ถึง 23:59:59 ของวันที่เลือกเท่านั้น
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);

        let canceledOrders = [];
        snapshot.forEach(doc => {
            const order = doc.data();
            const updatedAt = order.updatedAt ? order.updatedAt.toDate() : new Date(0);
            
            // 🔥 กรองเอาเฉพาะบิลที่เวลาตรงกับ "วันที่เราเลือก" เป๊ะๆ
            if (updatedAt >= startOfDay && updatedAt <= endOfDay) {
                order.docId = doc.id;
                order.updatedAtDate = updatedAt; // เก็บค่าเวลาตัวแท้ไว้ใช้จัดเรียง
                canceledOrders.push(order);
            }
        });

        if (canceledOrders.length === 0) {
            const showDateStr = startOfDay.toLocaleDateString('th-TH');
            container.innerHTML = `<p style="color: #5b7c9e; text-align:center;">ไม่มีรายการบิลที่ถูกยกเลิกในวันที่ ${showDateStr}</p>`;
            return;
        }

        // เรียงลำดับเวลาเพื่อให้บิลเก่าสุดอยู่ล่างสุด และบิลใหม่ล่าสุดอยู่ด้านบนสุด
        canceledOrders.sort((a, b) => a.updatedAtDate - b.updatedAtDate);

        let html = '';
        // ลูปดึงข้อมูลย้อนกลับเพื่อดันบิลใหม่ขึ้นบนสุด แต่ลำดับเลข "บิล: 1" จะล็อกอยู่กับบิลแรกสุดด้านล่าง
        for (let i = canceledOrders.length - 1; i >= 0; i--) {
            const order = canceledOrders[i];
            const displayIndex = i + 1; // รันเลขลำดับ บิล1, บิล2, บิล3 ผูกตามลำดับเวลาจริง
            const detailsId = `canceled-details-${order.docId}`;

            // วนลูปวาดรายการสินค้าด้านในบิล
            let itemsHtml = '';
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const imgUrl = item.img || item.imageUrl || item.image || 'https://cdn-icons-png.flaticon.com/512/1170/1170628.png';
                    itemsHtml += `
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #eee;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <img src="${imgUrl}" crossorigin="anonymous" onclick="showAdminFullImage('${imgUrl}')" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd; cursor: pointer;">
                                <div>
                                    <div style="font-weight: bold; color: #333; font-size: 0.95em;">${item.name || 'สินค้า'}</div>
                                    <div style="color: #666; font-size: 0.85em;">฿${item.price} x ${item.quantity || 1}</div>
                                </div>
                            </div>
                            <div style="font-weight: bold; color: #333;">฿${(item.price * (item.quantity || 1))}</div>
                        </div>
                    `;
                });
            }

            const shippingCost = order.shippingCost || 0;
            const totalPaid = order.productTotal + shippingCost;

            // ประกอบร่างโครงสร้างการ์ดบิลยกเลิกสเปกใหม่หัวบิลคู่ขนาน 2 บรรทัด
            html += `
                <div class="bill-card" style="margin-bottom: 15px; border: 1px solid #dc3545; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    
                    <div onclick="toggleBillDetails('${detailsId}')" style="background: #fdf2f2; padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f5c6cb;">
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="font-weight: bold; color: #dc3545; font-size: 1.05em;">บิล: ${displayIndex}</span>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-weight: bold; color: #333;">คุณ ${order.customerName}</span>
                                <span style="background: #dc3545; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold; display: inline-block;">บิลยกเลิก</span>
                            </div>
                        </div>
                        
                        <div style="color: #666; font-size: 0.85em; font-weight: bold; text-align: left;">
                            รหัสบิล: <span style="color: #555; font-weight: normal;">${order.billId || order.docId}</span>
                        </div>
                        
                    </div>

                    <div id="${detailsId}" style="display: none; padding: 20px; background: #fff;">
                        <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px dashed #dc3545; padding-bottom: 15px;">
<h3 style="margin: 0; color: #16365d; font-size: 1.25em; font-weight: bold;">MaLee Online</h3>                            <p style="margin: 4px 0 0 0; color: #dc3545; font-size: 0.9em; font-weight: bold;">บิลนี้ถูกยกเลิก (Cancelled Bill)</p>
                            <p style="margin: 2px 0 0 0; color: #999; font-size: 0.8em;">วันที่ยกเลิก: ${order.updatedAtDate.toLocaleDateString('th-TH')} | เวลา: ${order.updatedAtDate.toLocaleTimeString('th-TH')} น.</p>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <div style="color: #888; font-size: 0.8em; margin-bottom: 8px; font-weight: bold; text-align: center;">รายการสินค้าที่ยกเลิก</div>
                            ${itemsHtml}
                        </div>

                        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; border: 1px solid #eee; margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9em;">
                                <span style="color: #666;">ยอดรวมสินค้า:</span>
                                <span style="color: #333; font-weight: bold;">฿${order.productTotal}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9em;">
                                <span style="color: #666;">ค่าจัดส่ง:</span>
                                <span style="color: #333; font-weight: bold;">฿${shippingCost}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.1em; font-weight: bold; border-top: 1px dashed #ddd; padding-top: 8px; margin-top: 4px;">
                                <span style="color: #16365d;">ยอดสุทธิ:</span>
                                <span style="color: #dc3545;">฿${totalPaid}</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: center; margin-top: 10px;">
                            <div style="border: 2px solid #dc3545; color: #dc3545; font-size: 0.9em; font-weight: bold; padding: 6px 16px; transform: rotate(-3deg); border-radius: 8px; background: rgba(220, 53, 69, 0.05);">
                                ❌ บิลยกเลิก
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;

    } catch (error) {
        console.error("Error loading canceled bills:", error);
        container.innerHTML = '<p style="color:red; text-align:center;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}


// ==========================================
// 📌 ตัวนับจำนวนบิล "ยกเลิก" เพื่ออัปเดตตัวเลขหน้าย่อยแบบเรียลไทม์ (วันต่อวัน)
// ==========================================
async function updateCanceledCountBadgeOnly() {
    try {
        const snapshot = await db.collection("orders").where("status", "==", "ยกเลิก").get();
        let todayCanceledCount = 0;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        snapshot.forEach(doc => {
            const order = doc.data();
            const updatedAt = order.updatedAt ? order.updatedAt.toDate() : new Date(0);
            if (updatedAt >= today) {
                todayCanceledCount++; // นับเฉพาะบิลที่ยกเลิกภายในวันนี้
            }
        });

        // สั่งให้เอาเลขที่นับได้ ไปยัดใส่ ID ของปุ่มยกเลิกบิล
        const subCanceledBadge = document.getElementById('sub-canceled-badge');
        if (subCanceledBadge) {
            subCanceledBadge.innerText = todayCanceledCount;
        }
    } catch (error) {
        console.error("Error updating canceled badge:", error);
    }
}


// ==========================================
// 📌 สเต็ปที่ 2: ฟังก์ชันโหลดข้อมูล "สินค้ารอส่ง" (เวอร์ชันค้างบิลข้ามวันได้ จนกว่าจะกดส่ง)
// ==========================================
async function loadPendingShipping() {
    const container = document.getElementById('shipping-pending-container');
    const badge = document.getElementById('shipping-pending-badge');
    if (!container) return;

    container.innerHTML = '<div style="border-radius: 10px; padding: 30px 20px; text-align: center; color: #5b7c9e; border: 2px dashed #fd7e14;">กำลังโหลดข้อมูลสินค้ารอจัดส่ง... ⏳</div>';

    try {
        const snapshot = await db.collection("orders").where("status", "==", "ชำระแล้ว").get();
        let pendingShippingOrders = [];

        snapshot.forEach(doc => {
            const order = doc.data();
            const updatedAt = order.updatedAt ? (order.updatedAt.toDate ? order.updatedAt.toDate() : new Date(order.updatedAt)) : new Date(0);
            
            // 🔥 [จุดที่แก้] เอาเงื่อนไขดักเวลา (today) ออกไปเลย!
            // สนใจแค่ว่า "ยังไม่ได้กดสถานะจัดส่ง" เท่านั้น บิลจะค้างอยู่ตลอดไปจนกว่าจะเคลียร์
            if (!order.shippingStatus) {
                order.docId = doc.id;
                order.updatedAtDate = updatedAt;
                pendingShippingOrders.push(order);
            }
        });

        if (badge) badge.innerText = pendingShippingOrders.length;

        if (pendingShippingOrders.length === 0) {
            container.innerHTML = '<div style="border-radius: 10px; padding: 30px 20px; text-align: center; color: #5b7c9e; border: 2px dashed #fd7e14;">ไม่มีรายการสินค้ารอจัดส่งแล้วครับเจ้านาย 🎉</div>';
            return;
        }

        // เรียงลำดับบิลตามเวลา (คิวเก่าสุดขึ้นก่อน จะได้รีบแพ็คส่ง)
        pendingShippingOrders.sort((a, b) => a.updatedAtDate - b.updatedAtDate);

        let html = '';

        for (let i = pendingShippingOrders.length - 1; i >= 0; i--) {
            const order = pendingShippingOrders[i];
            const queueNumber = i + 1; 
            const detailsId = `shipping-pending-details-${order.docId}`; // ID สำหรับพับ/กาง

            let itemsHtml = '';
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const imgUrl = item.img || item.imageUrl || item.image || 'https://cdn-icons-png.flaticon.com/512/1170/1170628.png'; 
                    const quantity = item.qty || item.quantity || 1;
                    itemsHtml += `
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #eee;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <img src="${imgUrl}" crossorigin="anonymous" onclick="showAdminFullImage('${imgUrl}')" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd; cursor: pointer;">
                                <div>
                                    <div style="font-weight: bold; color: #333; font-size: 0.95em;">${item.name || 'สินค้า'}</div>
                                    <div style="color: #666; font-size: 0.85em;">฿${item.price} x ${quantity} ชิ้น</div>
                                </div>
                            </div>
                            <div style="font-weight: bold; color: #16365d;">฿${(item.price * quantity)}</div>
                        </div>
                    `;
                });
            }

            const finalTotal = (order.productTotal || 0) + (order.shippingCost || 0);

            html += `
                <div style="background: white; border-radius: 12px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #0dcaf0; overflow: hidden;">
                    
                    <div onclick="toggleShippingDetails('${detailsId}')" style="background: #e0f7fa; padding: 12px 15px; border-bottom: 1px solid #b2ebf2; cursor: pointer;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: bold; color: #00838f; font-size: 1.15em;">คิวที่: ${queueNumber}</span>
                            <span style="font-weight: bold; color: #333; font-size: 0.95em;">คุณ ${order.customerName}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="color: #666; font-size: 0.85em; font-weight: bold;">
                                รหัสบิล: <span style="font-weight: normal;">${order.billId || order.docId}</span>
                            </div>
                            <span style="background: #0dcaf0; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold;">รอส่ง 📦 🔽</span>
                        </div>
                    </div>

                    <div id="${detailsId}" style="display: none; padding: 15px; background: #fff;">
                        <div style="margin-bottom: 15px;">
                            ${itemsHtml}
                        </div>

                        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; border: 1px dashed #ccc; text-align: center; margin-bottom: 15px;">
                            <span style="color: #555; font-size: 0.9em; font-weight: bold;">ยอดชำระแล้ว: </span>
                            <span style="color: #28a745; font-size: 1.1em; font-weight: bold;">฿${finalTotal}</span>
                        </div>

                        <div style="display: flex; gap: 10px;">
                            <button onclick="confirmShippingAction('${order.docId}', 'รับสินค้าเอง')" style="flex: 1; padding: 12px; border-radius: 8px; background: #fff; border: 2px solid #fd7e14; color: #fd7e14; font-weight: bold; font-size: 0.95em; cursor: pointer;">
                                🏠 รับสินค้าเอง
                            </button>
                            <button onclick="confirmShippingAction('${order.docId}', 'ส่งสินค้าสำเร็จ')" style="flex: 1; padding: 12px; border-radius: 8px; background: #007bff; border: 2px solid #007bff; color: white; font-weight: bold; font-size: 0.95em; cursor: pointer; box-shadow: 0 2px 4px rgba(0,123,255,0.2);">
                                🚚 ส่งสินค้าสำเร็จ
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = html;
    } catch (error) {
        console.error("❌ Error loading pending shipping:", error);
        container.innerHTML = '<div style="color:red; text-align:center; padding: 20px;">เกิดข้อผิดพลาดในการโหลดข้อมูลบิลจัดส่ง</div>';
    }
}

// ==========================================
// 📌 สเต็ปที่ 3: ลอจิกการกดปุ่ม "รับสินค้าเอง" และ "ส่งสินค้าสำเร็จ" (ฝังระบบประวัติแล้ว)
// ==========================================
async function confirmShippingAction(docId, actionType) {
    if (!confirm(`เจ้านายแน่ใจนะว่าจะยืนยันสถานะเป็น "${actionType}" ?`)) return;

    try {
        await db.collection("orders").doc(docId).update({
            shippingStatus: actionType,
            shippedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // 🔥 [เสียบสายไฟประวัติ] สั่งกล้องวงจรปิดบันทึกการจัดส่ง
        if (typeof logAction === 'function') {
            logAction(
                'จัดการการจัดส่ง', 
                `อัปเดตสถานะจัดส่งเป็น: "${actionType}"`, 
                'shipping', 
                `${actionType}|${docId}` // มัดรวมสถานะและรหัสบิลส่งไปให้ระบบวาร์ป
            );
        }
        
        alert(`✅ บันทึกสถานะ "${actionType}" เรียบร้อยแล้ว!`);
        loadPendingShipping(); 
        
    } catch (error) {
        console.error("❌ Error updating shipping status:", error);
        alert("เกิดข้อผิดพลาดในการอัปเดตสถานะจัดส่ง");
    }
}

// ==========================================
// 📌 สเต็ปที่ 4: โหลดข้อมูล "ประวัติการส่งสินค้า" (เวอร์ชันมีปฏิทินเลือกดูย้อนหลังได้)
// ==========================================
async function loadHistoryShipping() {
    const container = document.getElementById('shipping-history-container');
    if (!container) return;

    container.innerHTML = '<div style="border-radius: 10px; padding: 30px 20px; text-align: center; color: #5b7c9e; border: 2px dashed #6c757d;">กำลังโหลดประวัติการจัดส่ง... ⏳</div>';

    try {
        const snapshot = await db.collection("orders").where("status", "==", "ชำระแล้ว").get();
        
        // 📅 จัดการวันที่จากปฏิทิน
        const datePicker = document.getElementById('shipping-history-date-picker');
        let targetDate = new Date();

        if (datePicker && datePicker.value) {
            // ถ้ามีการเลือกวันที่จากปฏิทิน ให้ใช้วันนั้น
            targetDate = new Date(datePicker.value);
        } else if (datePicker) {
            // เซ็ตค่าเริ่มต้นให้ปฏิทินโชว์ "วันนี้" ตอนเปิดหน้าครั้งแรก
            const localISOTime = new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            datePicker.value = localISOTime;
        }

        // กำหนดขอบเขตเวลา เริ่มต้น 00:00:00 ถึง 23:59:59 ของวันที่เลือกเท่านั้น
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);

        let historyOrders = [];

        snapshot.forEach(doc => {
            const order = doc.data();
            if (order.shippingStatus) {
                // อิงจากเวลาที่จัดส่งของ (shippedAt) เป็นหลัก
                const shippedDate = order.shippedAt ? (order.shippedAt.toDate ? order.shippedAt.toDate() : new Date(order.shippedAt)) : new Date(0);
                
                // 🔥 กรองเอาเฉพาะบิลที่เวลาจัดส่งตรงกับ "วันที่เราเลือก" เป๊ะๆ
                if (shippedDate >= startOfDay && shippedDate <= endOfDay) {
                    order.docId = doc.id;
                    order.shippedAtDate = shippedDate;
                    historyOrders.push(order);
                }
            }
        });

        if (historyOrders.length === 0) {
            const showDateStr = startOfDay.toLocaleDateString('th-TH');
            container.innerHTML = `<div style="border-radius: 10px; padding: 30px 20px; text-align: center; color: #5b7c9e; border: 2px dashed #6c757d;">ไม่มีประวัติการจัดส่งในวันที่ ${showDateStr} ครับเจ้านาย 📭</div>`;
            return;
        }

        // เรียงลำดับเวลาให้บิลล่าสุดอยู่ด้านบนสุด
        historyOrders.sort((a, b) => b.shippedAtDate - a.shippedAtDate);

        let html = '';

        historyOrders.forEach((order) => {
            const isSelfPickup = (order.shippingStatus === 'รับสินค้าเอง');
            const badgeColor = isSelfPickup ? '#fd7e14' : '#007bff';
            const badgeIcon = isSelfPickup ? '🏠' : '🚚';
            const timeFormatted = order.shippedAtDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
            const dateFormatted = order.shippedAtDate.toLocaleDateString('th-TH');
            
            const detailsId = `shipping-history-details-${order.docId}`; // ID สำหรับพับ/กาง

            let itemsHtml = '';
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const quantity = item.qty || item.quantity || 1;
                    itemsHtml += `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #eee; font-size: 0.9em;">
                            <span style="color: #444;">${item.name || 'สินค้า'} (x${quantity})</span>
                            <span style="font-weight: bold; color: #333;">฿${(item.price * quantity)}</span>
                        </div>
                    `;
                });
            }

            const productTotal = order.productTotal || 0;
            const shippingCost = order.shippingCost || 0;
            const finalTotal = productTotal + shippingCost;

            html += `
                <div style="background: white; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border: 1px solid #e0e0e0; overflow: hidden;">
                    
                    <div onclick="toggleShippingDetails('${detailsId}')" style="background: #f8f9fa; padding: 12px 15px; cursor: pointer;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="font-weight: bold; color: #666; font-size: 1em;">รหัสบิล: ${order.billId || order.docId}</span>
                            <span style="font-weight: bold; color: #333; font-size: 0.95em;">คุณ ${order.customerName}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 0.85em;">เวลาจัดส่ง: ${timeFormatted} น.</span>
                            <span style="background: ${badgeColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold;">${order.shippingStatus} ${badgeIcon} 🔽</span>
                        </div>
                    </div>

                    <div id="${detailsId}" style="display: none; padding: 15px; background: #fff; border-top: 1px solid #eee;">
                        <div style="text-align: center; margin-bottom: 10px; border-bottom: 2px dashed ${badgeColor}; padding-bottom: 10px;">
                            <h4 style="margin: 0; color: #16365d; font-weight: bold;">หลักฐานการจัดส่ง</h4>
                            <p style="margin: 2px 0 0 0; color: #888; font-size: 0.8em;">วันที่: ${dateFormatted} | เวลา: ${timeFormatted} น.</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            ${itemsHtml}
                        </div>
                        <div style="background: #f9f9f9; padding: 10px; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.85em; color: #666;">
                                <span>ยอดรวมสินค้า:</span><span>฿${productTotal}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.85em; color: #666;">
                                <span>ค่าจัดส่ง:</span><span>฿${shippingCost}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-top: 6px; padding-top: 6px; border-top: 1px solid #ddd; font-weight: bold; font-size: 1em; color: #333;">
                                <span>ยอดสุทธิ:</span><span style="color: ${badgeColor};">฿${finalTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        console.error("❌ Error loading shipping history:", error);
        container.innerHTML = '<div style="color:red; text-align:center; padding: 20px;">เกิดข้อผิดพลาดในการโหลดประวัติการจัดส่ง</div>';
    }
}


// ==========================================
// 📌 สเต็ปที่ 4.1: สวิตช์ผูกคำสั่งเปิดหน้าเมนูจัดส่ง
// ==========================================
function openShippingPage(pageType) {
    const submenu = document.getElementById('shipping-submenu-page');
    if (submenu) submenu.style.display = 'none';

    const pendingPage = document.getElementById('shipping-pending-page');
    const historyPage = document.getElementById('shipping-history-page');
    if (pendingPage) pendingPage.style.display = 'none';
    if (historyPage) historyPage.style.display = 'none';

    if (pageType === 'pending') {
        if (pendingPage) pendingPage.style.display = 'block';
        loadPendingShipping(); 
    } else if (pageType === 'history') {
        if (historyPage) historyPage.style.display = 'block';
        loadHistoryShipping(); 
    }
}


// ==========================================
// 📌 สวิตช์เปิด/ปิดหน้าต่างพับบิลสำหรับหน้าจัดส่ง
// ==========================================
window.toggleShippingDetails = function(detailsId) {
    let el = document.getElementById(detailsId);
    if (el) {
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
    }
}


// ==========================================
// 📌 ฟังก์ชันนับเลขบิลรอส่ง (นับรวมบิลค้างเก่าทั้งหมด)
// ==========================================
async function updatePendingShippingBadgeOnly() {
    const badgeSub = document.getElementById('shipping-pending-badge');       // เลขในหน้าย่อย (สีส้ม)
    const badgeMain = document.getElementById('main-shipping-menu-badge');    // เลขหน้าหลัก (สีแดง)

    try {
        const snapshot = await db.collection("orders").where("status", "==", "ชำระแล้ว").get();
        
        let count = 0;
        snapshot.forEach(doc => {
            const order = doc.data();
            
            // 🔥 [จุดที่แก้] ไม่ต้องสนวันที่นับรวมหมด ถ้าบิลนี้ยังไม่ได้กดจัดส่ง!
            if (!order.shippingStatus) {
                count++;
            }
        });

        // 1. อัปเดตตัวเลขหน้าย่อย (โชว์ตลอดเวลา)
        if (badgeSub) badgeSub.innerText = count;

        // 2. อัปเดตตัวเลขหน้าหลัก (ถ้าเป็น 0 ให้ซ่อนวงกลมแดงไว้)
        if (badgeMain) {
            badgeMain.innerText = count;
            badgeMain.style.display = (count > 0) ? 'flex' : 'none';
        }

    } catch (error) {
        console.error("❌ Error updating badge:", error);
    }
}


// 🔥 จุดชนวน: สั่งให้นับเลขทันทีที่เปิดเข้าเว็บ (ไม่ต้องรอคลิก)
window.addEventListener('load', () => {
    if (typeof updatePendingShippingBadgeOnly === 'function') {
        updatePendingShippingBadgeOnly();
    }
});


// ==========================================
// 📌 5. ฟังก์ชันตรวจสอบการเข้าสู่ระบบ (Login) (แก้ไขเพิ่มการจำค่า Role และชื่อ)
// ==========================================
async function checkLogin() {
    const user = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value.trim();

    // ดักจับถ้ากรอกข้อมูลไม่ครบ
    if (user === '' || pass === '') {
        alert('พิมพ์ชื่อและรหัสผ่านให้ครบก่อนสิเพื่อน!');
        return;
    }

    try {
        // 1. เช็คก่อนว่าใช่รหัส "บอสใหญ่" (Owner) หรือไม่
        const ownerDoc = await db.collection("admins").doc("owner").get();
        if (ownerDoc.exists && ownerDoc.data().pin === pass) {
            
            // 🔥 จำค่าใส่สมองระบบ (Session) ว่านี่คือบอสใหญ่
            sessionStorage.setItem('adminRole', 'owner');
            sessionStorage.setItem('adminName', 'เจ้าของร้าน');
            
            document.getElementById('login-overlay').style.display = 'none';
            alert('👑 ยินดีต้อนรับบอสใหญ่!');
            return;
        }

        // 2. ถ้าไม่ใช่บอส ให้ไปหาว่ามี "ผู้ดูแล" (Staff) ชื่อและรหัสตรงตามนี้มั้ย
        const staffDocs = await db.collection("admins")
            .where("username", "==", user)
            .where("pin", "==", pass)
            .where("role", "==", "staff") // ป้องกันเผื่อลูกน้องตั้งชื่อซ้ำกับระบบ
            .get();

        if (!staffDocs.empty) {
            
            // 🔥 จำค่าใส่สมองระบบ (Session) ว่านี่คือผู้ดูแลธรรมดา
            sessionStorage.setItem('adminRole', 'staff');
            sessionStorage.setItem('adminName', user);

            document.getElementById('login-overlay').style.display = 'none';
            alert('👤 เข้าสู่ระบบสำเร็จ!');
            return;
        }

        // 3. ถ้าไม่ตรงกับอะไรเลย
        alert('❌ ชื่อผู้ดูแล หรือ รหัสผ่านไม่ถูกต้อง!');

    } catch (error) {
        console.error("❌ Login Error:", error);
        alert('เกิดข้อผิดพลาดในการตรวจสอบข้อมูล!');
    }
}
// ==========================================
// (จบตรงนี้)📌 5. ฟังก์ชันตรวจสอบการเข้าสู่ระบบ (Login) (จบตรงนี้)
// ==========================================


// ==========================================
// 📌 ฟังก์ชันดึงรายชื่อลูกค้าจาก Firebase มาโชว์ (อัปเกรดสวิตช์เลื่อนข้าง + ป๊อปอัปยืนยัน)
// ==========================================
async function loadCustomerList() {
    const container = document.getElementById('customer-list-container');
    container.innerHTML = '<p style="text-align:center;">กำลังโหลดข้อมูล...</p>';

    try {
        const userSnapshot = await db.collection("users").orderBy("timestamp", "desc").get();
        container.innerHTML = ''; 

        for (const doc of userSnapshot.docs) {
            const data = doc.data();
            const docId = doc.id; 
            const name = data.name || "ไม่ระบุชื่อ";
            const phone = data.phone || "-";
            const memberId = data.memberId; 
            const isVip = data.vipStatus === true || data.vipStatus === "active";
            
            let regDate = "ไม่ระบุ";
            if (data.timestamp) {
                const dateObj = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
                const d = dateObj.getDate().toString().padStart(2, '0');
                const m = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const y = dateObj.getFullYear() + 543; 
                regDate = `${d}/${m}/${y}`;
            }

            let totalBills = 0;
            let totalSpent = 0;

            if (memberId) {
                const billsSnapshot = await db.collection("orders")
                    .where("memberId", "==", memberId)
                    .where("status", "==", "ชำระแล้ว")
                    .get();

                totalBills = billsSnapshot.size; 

                billsSnapshot.forEach(billDoc => {
                    const billData = billDoc.data();
                    const pTotal = billData.productTotal || 0;
                    const sCost = billData.shippingCost || 0;
                    totalSpent += (pTotal + sCost);
                });
            }

            const card = document.createElement('div');
            card.style.cssText = "background: white; border-radius: 10px; padding: 15px; border-left: 5px solid " + (isVip ? "#17a2b8" : "#ccc") + "; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px;";
            
            // 🔥 ลอจิกใหม่: สร้างสวิตช์เลื่อนข้าง (Slider) และส่งค่า this, docId, name ไปที่ฟังก์ชัน
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <span style="font-weight: bold; color: #16365d; font-size: 1.1em;">${name}</span>
                    
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 0.9em; color: ${isVip ? '#00796b' : '#555'}; font-weight: bold;">${isVip ? '✅ VIP' : 'ลูกค้าปกติ'}</span>
                        <label style="position: relative; display: inline-block; width: 44px; height: 24px; margin: 0;">
                            <input type="checkbox" ${isVip ? 'checked' : ''} onchange="toggleVipStatus(this, '${docId}', '${name}')" style="opacity: 0; width: 0; height: 0; position: absolute;">
                            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isVip ? '#28a745;' : '#ccc'}; border-radius: 34px; transition: .3s;">
                                <span style="position: absolute; content: ''; height: 18px; width: 18px; left: ${isVip ? '23px' : '3px'}; bottom: 3px; background-color: white; border-radius: 50%; transition: .3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div style="font-size: 0.85em; color: #555; margin-bottom: 3px;">📞 ${phone}</div>
                <div style="font-size: 0.85em; color: #555; margin-bottom: 3px;">📅 สมัครเมื่อ: ${regDate}</div>
                <div style="font-size: 0.85em; color: #17a2b8; font-weight: bold;">📦 สั่งซื้อแล้ว: ${totalBills} บิล | ยอดรวม: ${totalSpent.toLocaleString()} บาท</div>
            `;
            
            container.appendChild(card);
        }
    } catch (error) {
        console.error("Error loading customers:", error);
        container.innerHTML = '<p style="text-align:center; color:red;">โหลดข้อมูลล้มเหลว (เช็คการเชื่อมต่อ Firebase)</p>';
    }
}

// ==========================================
// 📌 ฟังก์ชันใหม่: ใช้สลับเปิด-ปิดสิทธิ์ VIP (ฝังระบบประวัติแล้ว)
// ==========================================
async function toggleVipStatus(checkboxElem, docId, name) {
    let newStatus = checkboxElem.checked;
    let actionText = newStatus ? "เปิดสิทธิ์ VIP" : "ยกเลิกสิทธิ์ VIP";

    if (confirm(`ยืนยันการ "${actionText}" ให้กับคุณ [${name}] ใช่หรือไม่?`)) {
        try {
            await db.collection("users").doc(docId).update({
                vipStatus: newStatus
            });
            console.log(`✅ อัปเดตสถานะ VIP ของ ${name} เรียบร้อย`);
            
            // 🔥 [เสียบสายไฟประวัติ] สั่งกล้องวงจรปิดบันทึกการตั้งค่าลูกค้า
            if (typeof logAction === 'function') {
                logAction(
                    'จัดการข้อมูลลูกค้า', 
                    `สั่ง "${actionText}" ให้กับลูกค้า: คุณ ${name}`, 
                    'customer', 
                    name // 🔥 ส่งชื่อลูกค้าเป็นรหัสเป้าหมาย เพื่อเอาไปใช้กรอกในช่องค้นหาตอนวาร์ป!
                );
            }
            
            loadCustomerList(); 
        } catch (error) {
            console.error("Error updating VIP status: ", error);
            alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ VIP");
            checkboxElem.checked = !newStatus; 
        }
    } else {
        checkboxElem.checked = !newStatus;
    }
}
// ==========================================
//(จบตรงนี้) 📌 ฟังก์ชันดึงรายชื่อลูกค้าจาก Firebase มาโชว์ (อัปเกรดสวิตช์เลื่อนข้าง + ป๊อปอัปยืนยัน)(จบจรงนี้)
// ==========================================


// ==========================================
// 📌 ฟังก์ชันค้นหาลูกค้าแบบเรียลไทม์ (หน้าย่อยลูกค้าทั้งหมด)
// ==========================================
function filterCustomers() {
    // 1. ดึงข้อความที่พิมพ์ในช่องค้นหามา และแปลงเป็นตัวพิมพ์เล็กทั้งหมดเพื่อเทียบง่ายๆ
    let searchQuery = document.getElementById('customer-search-input').value.toLowerCase();
    
    // 2. ไปดึงการ์ดลูกค้าทั้งหมดที่อยู่ในกล่อง container
    let container = document.getElementById('customer-list-container');
    let customerCards = container.children; // ดึงลูกๆ (การ์ดแต่ละใบ) ออกมาเป็นอาร์เรย์

    // 3. วนลูปเช็คการ์ดทีละใบ
    for (let i = 0; i < customerCards.length; i++) {
        let card = customerCards[i];
        // ดึงข้อความทั้งหมดที่อยู่ในการ์ดใบนั้น (มันจะกวาดมาหมดทั้ง ชื่อ, เบอร์โทร)
        let cardText = card.innerText.toLowerCase();

        // 4. เช็คว่าข้อความในการ์ด มีคำที่พิมพ์ค้นหาอยู่ไหม
        if (cardText.includes(searchQuery)) {
            card.style.display = ""; // ถ้ามี ปล่อยให้โชว์ไว้ปกติ
        } else {
            card.style.display = "none"; // ถ้าไม่มีคำนั้น ซ่อนการ์ดทิ้งไปเลย
        }
    }
}
// ==========================================
//(จบตรงนี้) 📌 ฟังก์ชันค้นหาลูกค้าแบบเรียลไทม์ (หน้าย่อยลูกค้าทั้งหมด) (จบตรงนี้)
// ==========================================


// ==========================================
// 📌 ระบบประวัติการทำงาน (Action Log)
// ==========================================

function openActionLogPage() {
    document.getElementById('security-page').style.display = 'none';
    document.getElementById('action-log-page').style.display = 'block';
    loadActionLogs(); // โหลดข้อมูลมาโชว์
}

function closeActionLogPage() {
    document.getElementById('action-log-page').style.display = 'none';
    document.getElementById('security-page').style.display = 'block';
}

// 📌 ฟังก์ชันดึงประวัติมาโชว์
async function loadActionLogs() {
    const container = document.getElementById('action-log-list');
    container.innerHTML = '<p style="text-align: center; color: #888;">กำลังโหลดประวัติ...</p>';

    try {
        const snapshot = await db.collection("action_logs").orderBy("timestamp", "desc").limit(50).get();
        
        if (snapshot.empty) {
            container.innerHTML = '<p style="text-align: center; color: #888;">ยังไม่มีประวัติการทำงาน</p>';
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const timeString = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }) : 'ไม่ระบุเวลา';
            
            html += `
                <div onclick="warpToAction('${data.type}', '${data.targetId}')" style="background: white; border-left: 4px solid #6f42c1; padding: 12px 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer; transition: 0.2s; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-weight: bold; color: #16365d;">${data.actionTitle}</span>
                        <span style="font-size: 0.8em; color: #999;">${timeString}</span>
                    </div>
                    <div style="font-size: 0.9em; color: #555; margin-bottom: 5px;">${data.description}</div>
                    <div style="font-size: 0.8em; color: #6f42c1; font-weight: bold;">👤 ทำโดย: ${data.adminName}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;

    } catch (error) {
        console.error("❌ Error loading logs:", error);
        container.innerHTML = '<p style="text-align: center; color: red;">โหลดข้อมูลล้มเหลว</p>';
    }
}

// 📌 ฟังก์ชันกดแล้ววาร์ป! (Deep Link) - อัปเกรดแก้บั๊กปฏิทิน + ซ่อนหน้าหลักสมบูรณ์
async function warpToAction(type, targetId) {
    if (!targetId || targetId === 'null') {
        alert("รายการนี้ไม่มีเป้าหมายให้วาร์ปไปดูครับ");
        return;
    }

    // 🔥 ลอจิกใหม่: ปิดซ่อน "เมนูหน้าหลัก" เสมอ เพื่อป้องกันหน้าจอซ้อนทับกัน
    const header = document.querySelector('.header'); if(header) header.style.display = 'none';
    const searchBar = document.querySelector('.search-bar'); if(searchBar) searchBar.style.display = 'none';
    const stats = document.querySelector('.stats-container'); if(stats) stats.style.display = 'none';
    const menu = document.querySelector('.menu-wrapper'); if(menu) menu.style.display = 'none';
    const topHomeBtn = document.getElementById('top-home-btn'); if(topHomeBtn) topHomeBtn.style.display = 'block';

    // ปิดหน้าประวัติก่อนวาร์ป (เผื่อวาร์ปมาจากหน้าประวัติการทำงาน)
    let actionLogPage = document.getElementById('action-log-page');
    if (actionLogPage) actionLogPage.style.display = 'none';

    // ------------------------------------
    // 1. โซนหมวดหมู่
    // ------------------------------------
    if (type === 'category') {
        document.getElementById('category-management-page').style.display = 'block';
    } 
    // ------------------------------------
    // 2. โซนสินค้าย่อย
    // ------------------------------------
    else if (type === 'product') {
        let parts = targetId.split('|');
        let catName = parts[0];
        let pid = parts[1];
        
        if (typeof openProductPage === 'function') {
            openProductPage(catName);
            setTimeout(() => {
                let targetBox = document.getElementById(`btn-${pid}`);
                if(targetBox) targetBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 800);
        }
    } 
    // ------------------------------------
    // 3. โซนบิลสินค้า (แก้บั๊กปฏิทินหมุนตามวันที่ของบิลอัตโนมัติ!)
    // ------------------------------------
    else if (type === 'bill') {
        let parts = targetId.split('|');
        let billStatus = parts[0]; 
        let billId = parts[1];

        document.getElementById('bills-submenu-page').style.display = 'block';
        
        try {
            // 🔥 วิ่งไปดึงข้อมูลบิลใบนี้จากไฟล์เบส เพื่อขอดู "เวลา (updatedAt)" ของมัน
            const docRef = await db.collection("orders").doc(billId).get();
            if(docRef.exists) {
                const orderData = docRef.data();
                const orderDate = orderData.updatedAt ? orderData.updatedAt.toDate() : new Date();
                const localISOTime = new Date(orderDate.getTime() - (orderDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                
                // แอบหมุนปฏิทินให้ตรงกับวันของบิล ก่อนที่จะสั่งโหลดข้อมูล!
                if (billStatus === 'ชำระแล้ว') {
                    let picker = document.getElementById('paid-date-picker');
                    if(picker) picker.value = localISOTime;
                    if (typeof openBillPage === 'function') openBillPage('paid'); 
                    if (typeof loadPaidBills === 'function') await loadPaidBills(); // รอจนโหลดเสร็จ
                } else if (billStatus === 'ยกเลิก') {
                    let picker = document.getElementById('canceled-date-picker');
                    if(picker) picker.value = localISOTime;
                    if (typeof openBillPage === 'function') openBillPage('canceled'); 
                    if (typeof loadCanceledBills === 'function') await loadCanceledBills(); // รอจนโหลดเสร็จ
                }
            }
        } catch(e) {
            console.log("วาร์ปปฏิทินมีปัญหา:", e);
        }
        
        // พอปฏิทินดึงบิลมาโชว์เสร็จแล้ว ค่อยเลื่อนจอไปหาบิลใบนั้น!
        setTimeout(() => {
            let targetIdName = billStatus === 'ชำระแล้ว' ? `paid-details-${billId}` : `canceled-details-${billId}`;
            let targetDetails = document.getElementById(targetIdName);
            
            if (targetDetails) {
                targetDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetDetails.style.display = 'block'; 
            } else {
                alert("บิลนี้อาจถูกลบไปแล้ว หรือระบบดึงข้อมูลไม่ทันครับ");
            }
        }, 1500); 
    } 
    // ------------------------------------
    // 4. โซนจัดส่ง
    // ------------------------------------
    else if (type === 'shipping') {
        let parts = targetId.split('|');
        let docId = parts[1];

        document.getElementById('shipping-submenu-page').style.display = 'block';

        setTimeout(() => {
            if (typeof openShippingPage === 'function') {
                openShippingPage('history');
            }
            
            setTimeout(() => {
                let targetDetails = document.getElementById(`shipping-history-details-${docId}`);
                if (targetDetails) {
                    targetDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetDetails.style.display = 'block'; 
                }
            }, 800);
        }, 500);
    } 
    // ------------------------------------
    // 5. โซนลูกค้า (แก้บั๊กพิมพ์หาแล้วกดสวิตช์ได้เลย)
    // ------------------------------------
    else if (type === 'customer') {
        let customerName = targetId; 
        document.getElementById('customers-submenu-page').style.display = 'block';

        setTimeout(() => {
            if (typeof openCustomerPage === 'function') {
                openCustomerPage('all');
            }
            
            setTimeout(() => {
                let searchInput = document.getElementById('customer-search-input');
                if (searchInput) {
                    searchInput.value = customerName;
                    if (typeof filterCustomers === 'function') {
                        filterCustomers(); // สั่งกรองลูกค้าโชว์เฉพาะคนนี้
                    }
                }
            }, 800);
        }, 500);
    } 
    // ------------------------------------
    // 6. โซนความปลอดภัย
    // ------------------------------------
    else if (type === 'security') {
        document.getElementById('security-page').style.display = 'block';
    } 
    else {
        alert("ไม่รองรับการวาร์ปสำหรับรายการนี้");
        document.getElementById('security-page').style.display = 'block'; 
    }
}


// ==========================================
// 📌 ฟังก์ชันกล้องวงจรปิด (Action Logger) - รอรับคำสั่งเสียบสายตรง
// ==========================================
async function logAction(actionTitle, description, type = 'general', targetId = 'null') {
    try {
        const adminName = sessionStorage.getItem('adminName') || 'แอดมินนิรนาม';
        await db.collection("action_logs").add({
            actionTitle: actionTitle,
            description: description,
            adminName: adminName,
            type: type,
            targetId: targetId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log(`📸 แชะ! บันทึกประวัติ: ${actionTitle} (ID: ${targetId})`);
    } catch (error) {
        console.error("❌ กล้องวงจรปิดมีปัญหา บันทึกไม่ได้:", error);
    }
}
// ==========================================
// 📌(จบตรงนี้) ฟังก์ชันกล้องวงจรปิด (Action Logger) - รอรับคำสั่งเสียบสายตรง (จบตรงนี้)
// ==========================================


// ==========================================
// 📌 ระบบค้นหาหน้าหลัก (ค้นลูกค้า & รหัสบิลเฉพาะส่วนท้ายแบบเป๊ะๆ)
// ==========================================

// 1. ฟังก์ชันดักจับปุ่ม Enter 
function handleMainSearch(event) {
    if (event.key === 'Enter') {
        executeMainSearch();
    }
}

// 2. ฟังก์ชันปิดหน้าต่างป๊อปอัป และเคลียร์ข้อความ
function closeSearchOverlay() {
    const overlay = document.getElementById('search-result-overlay');
    if (overlay) overlay.style.display = 'none';
    const searchInput = document.getElementById('main-search-input');
    if (searchInput) searchInput.value = ''; 
}

// 3. ฟังก์ชันค้นหาหลัก (โปรเวอร์ชัน - เป๊ะ 100%)
async function executeMainSearch() {
    const searchText = document.getElementById('main-search-input').value.trim().toLowerCase();
    const container = document.getElementById('search-result-container');
    const overlay = document.getElementById('search-result-overlay');

    if (searchText === '') {
        alert('พิมพ์ชื่อลูกค้า หรือ รหัสบิล (เฉพาะชุดท้ายสุดให้ครบ) ก่อนสิเพื่อน!');
        return;
    }

    overlay.style.display = 'flex';
    container.innerHTML = '<p style="text-align: center; color: #5b7c9e; font-weight: bold;">กำลังค้นหาข้อมูล... ⏳</p>';

    try {
        let html = '';
        let foundCount = 0;

        // 🎯 ค้นหาลูกค้า
        const userSnapshot = await db.collection("users").get();
        let foundUsers = [];
        userSnapshot.forEach(doc => {
            const data = doc.data();
            const name = (data.name || '').toLowerCase();
            if (name.includes(searchText)) {
                foundUsers.push({ docId: doc.id, ...data });
            }
        });

        if (foundUsers.length > 0) {
            html += `<h4 style="color: #17a2b8; margin-bottom: 10px; border-bottom: 2px solid #17a2b8; padding-bottom: 5px;">👤 ลูกค้าที่พบ</h4>`;
            foundUsers.forEach(user => {
                const isVip = user.vipStatus === true || user.vipStatus === "active";
                html += `
                    <div style="background: white; border: 1px solid #ddd; border-left: 5px solid ${isVip ? '#17a2b8' : '#ccc'}; border-radius: 8px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <span style="font-weight: bold; color: #16365d; font-size: 1.1em;">${user.name || 'ไม่ระบุชื่อ'}</span>
                            <span style="font-size: 0.8em; background: ${isVip ? '#17a2b8' : '#6c757d'}; color: white; padding: 2px 8px; border-radius: 12px;">${isVip ? 'VIP' : 'ปกติ'}</span>
                        </div>
                        <div style="font-size: 0.85em; color: #555; margin-bottom: 8px;">📞 ${user.phone || '-'}</div>
                        <button onclick="warpToAction('customer', '${user.name}'); closeSearchOverlay();" style="background: #e0f7fa; border: 1px solid #0dcaf0; color: #00838f; padding: 8px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; font-size: 0.9em;">
                            🚀 วาร์ปไปตั้งค่าลูกค้าคนนี้
                        </button>
                    </div>
                `;
            });
            foundCount += foundUsers.length;
        }

        // 🎯 ค้นหาบิลแบบโปร
        const orderSnapshot = await db.collection("orders").get();
        let foundOrders = [];
        orderSnapshot.forEach(doc => {
            const order = doc.data();
            const fullBillId = (order.billId || doc.id || '');
            
            let lastPart = fullBillId;
            if (fullBillId.includes('-')) {
                const parts = fullBillId.split('-');
                lastPart = parts[parts.length - 1]; 
            }
            lastPart = lastPart.toLowerCase();

            if (lastPart === searchText) {
                order.docId = doc.id;
                foundOrders.push(order);
            }
        });

        if (foundOrders.length > 0) {
            html += `<h4 style="color: #28a745; margin-top: 20px; margin-bottom: 10px; border-bottom: 2px solid #28a745; padding-bottom: 5px;">🧾 บิลที่พบ</h4>`;
            
            foundOrders.sort((a, b) => {
                const dateA = a.updatedAt ? a.updatedAt.toDate() : new Date(0);
                const dateB = b.updatedAt ? b.updatedAt.toDate() : new Date(0);
                return dateB - dateA;
            });

            foundOrders.forEach((order) => {
                let statusColor = '#ffc107'; 
                if (order.status === 'ชำระแล้ว') statusColor = '#28a745';
                else if (order.status === 'ยกเลิก') statusColor = '#dc3545';

                const finalTotal = (order.productTotal || 0) + (order.shippingCost || 0);
                const orderDate = order.updatedAt ? order.updatedAt.toDate().toLocaleDateString('th-TH') : 'ไม่ระบุ';

                html += `
                    <div style="background: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: bold; color: #16365d; font-size: 1.05em;">คุณ ${order.customerName}</span>
                            <span style="background: ${statusColor}; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold;">${order.status || 'รอชำระเงิน'}</span>
                        </div>
                        <div style="color: #666; font-size: 0.85em; margin-bottom: 4px;">รหัสบิล: <strong style="color: #333;">${order.billId || order.docId}</strong></div>
                        <div style="color: #666; font-size: 0.85em; margin-bottom: 8px;">วันที่อัปเดต: ${orderDate}</div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #ccc; padding-top: 8px;">
                            <span style="font-size: 0.9em; color: #555;">ยอดรวม:</span>
                            <span style="font-weight: bold; color: #333; font-size: 1.1em;">฿${finalTotal}</span>
                        </div>
                        
                        <div style="margin-top: 10px; text-align: center;">
                            <button onclick="warpToAction('bill', '${order.status}|${order.docId}'); closeSearchOverlay();" style="background: #e8f5e9; border: 1px solid #28a745; color: #28a745; padding: 8px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; font-size: 0.9em;">
                                🚀 วาร์ปไปดูบิลนี้
                            </button>
                        </div>
                    </div>
                `;
            });
            foundCount += foundOrders.length;
        }

        if (foundCount === 0) {
            container.innerHTML = `<div style="text-align: center; margin-top: 20px;"><h2 style="color: #dc3545; margin-bottom: 5px;">❌</h2><h3 style="color: #dc3545; margin-top: 0;">ค้นหาไม่พบ!</h3><p style="color: #888; font-size: 0.9em;">ไม่พบชื่อลูกค้า หรือ รหัสบิล "${searchText}" (อย่าลืมพิมพ์รหัสบิลชุดท้ายให้ครบนะ)</p></div>`;
        } else {
            container.innerHTML = html;
        }

    } catch (error) {
        console.error("❌ Error search:", error);
        container.innerHTML = '<p style="color:red; text-align:center;">เกิดข้อผิดพลาดในการดึงข้อมูล</p>';
    }
}
// ==========================================
//(จบตรงนี้) 📌 ระบบค้นหาหน้าหลัก (ค้นลูกค้า & รหัสบิลเฉพาะส่วนท้ายแบบเป๊ะๆ) (จบตรงนี้)
// ==========================================


// ==========================================
// 📌 ระบบสรุปยอดขาย (รายวัน, รายสัปดาห์, รายเดือน) - ไม่รวมค่าส่ง
// ==========================================

// ฟังก์ชันแปลง Date เป็นปี-สัปดาห์ (YYYY-Wxx) สำหรับช่องรายสัปดาห์ (แก้ให้ใช้เวลาไทย/Local)
function getWeekString(d) {
    const date = new Date(d.getTime());
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return `${date.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

// ฟังก์ชันแปลง YYYY-Wxx กลับมาเป็น Date เริ่มต้นและสิ้นสุดสัปดาห์ (จันทร์-อาทิตย์)
function getWeekRange(weekStr) {
    const [year, week] = weekStr.split('-W');
    const simpleDate = new Date(year, 0, 1 + (week - 1) * 7);
    const dayOfWeek = simpleDate.getDay();
    const start = new Date(simpleDate);
    start.setDate(simpleDate.getDate() - dayOfWeek + 1); // วันจันทร์
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // วันอาทิตย์
    end.setHours(23, 59, 59, 999);
    start.setHours(0, 0, 0, 0);
    return { start, end };
}

// 🎯 ฟังก์ชันหลักสำหรับคำนวณยอด
async function calculateRevenue(type) {
    const dateInput = document.getElementById(`${type}-date`).value;
    if (!dateInput) return; // ถ้าไม่ได้เลือกวัน ให้ข้ามไปเลย

    let totalProductRevenue = 0;

    try {
        // ดึงเฉพาะบิลที่ "ชำระแล้ว"
        const snapshot = await db.collection("orders").where("status", "==", "ชำระแล้ว").get();
        
        snapshot.forEach(doc => {
            const data = doc.data();
            // ข้ามถ้าไม่มีวันที่อัปเดต หรือไม่มีราคาสินค้า
            if (!data.updatedAt) return; 

            const orderDate = data.updatedAt.toDate();
            let isMatch = false;

            // ตรวจสอบเงื่อนไขตามประเภท
            if (type === 'daily') {
                // แยกปี เดือน วัน ออกมาสร้าง Date ของ Local Time แก้บั๊กเทียบเวลาคลาดเคลื่อน
                const [y, m, d] = dateInput.split('-');
                const selectedDate = new Date(y, m - 1, d);
                if (orderDate.toDateString() === selectedDate.toDateString()) {
                    isMatch = true;
                }
            } else if (type === 'monthly') {
                const [yyyy, mm] = dateInput.split('-');
                if (orderDate.getFullYear() == yyyy && (orderDate.getMonth() + 1) == mm) {
                    isMatch = true;
                }
            } else if (type === 'weekly') {
                const { start, end } = getWeekRange(dateInput);
                if (orderDate >= start && orderDate <= end) {
                    isMatch = true;
                }
            }

            // ถ้าระยะเวลาตรงเป๊ะ ให้บวก "เฉพาะค่าสินค้า" เท่านั้น! 
            if (isMatch) {
                totalProductRevenue += (data.productTotal || 0);
            }
        });

        // แสดงผลตัวเลข (แปลงเป็นรูปแบบมีลูกน้ำ)
        document.getElementById(`${type}-revenue`).innerText = `฿${totalProductRevenue.toLocaleString('th-TH')}`;

    } catch (error) {
        console.error("❌ Error calculating revenue:", error);
    }
}

// 🎯 ฟังก์ชันเซ็ตค่าเริ่มต้นให้ปฏิทินเป็น "วันปัจจุบัน" ตอนโหลดหน้าเว็บ
function initRevenueStats() {
    const today = new Date();
    
    // ตั้งค่ารายวัน (YYYY-MM-DD) โดยบังคับชดเชยเวลาให้ตรงกับ Local Time เสมอ
    const localISOTime = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    document.getElementById('daily-date').value = localISOTime;
    
    // ตั้งค่ารายเดือน (YYYY-MM)
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    document.getElementById('monthly-date').value = `${yyyy}-${mm}`;
    
    // ตั้งค่ารายสัปดาห์ (YYYY-Wxx)
    document.getElementById('weekly-date').value = getWeekString(today);

    // สั่งคำนวณยอดปัจจุบันขึ้นมาโชว์ทันที
    calculateRevenue('daily');
    calculateRevenue('weekly');
    calculateRevenue('monthly');
}

// 🎯 ฟังก์ชันหน่วงเวลาเพื่อสั่งรีเซ็ตระบบอัตโนมัติเป๊ะๆ ตอนเที่ยงคืน (00:00 น.)
function scheduleMidnightReset() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // ตั้งเวลาเที่ยงคืนของคืนนี้
    
    const msUntilMidnight = midnight.getTime() - now.getTime(); // คำนวณเวลาที่เหลือจนกว่าจะถึงเที่ยงคืน
    
    setTimeout(() => {
        initRevenueStats(); // รีเซ็ตกล่องวัน/สัปดาห์/เดือน ใหม่หมด
        scheduleMidnightReset(); // ตั้งเวลาดักรอเที่ยงคืนของรอบวันถัดไปใหม่
    }, msUntilMidnight);
}

// สั่งให้โหลดค่าเริ่มต้นตอนเปิดหน้าเว็บ และทำระบบอัปเดตแบบ Realtime
document.addEventListener('DOMContentLoaded', () => {
    initRevenueStats();
    scheduleMidnightReset(); // เปิดการทำงานของตัวนับถอยหลังรอรีเซ็ตตอนเที่ยงคืน

    // 🎯 ดักจับการเปลี่ยนแปลงในฐานข้อมูลตลอดเวลา (Realtime Auto-Refresh)
    // พอมียอดชำระเงินเข้ามาใหม่ ตัวเลขในกล่องจะอัปเดตเองทันที!
    db.collection("orders").where("status", "==", "ชำระแล้ว").onSnapshot(() => {
        calculateRevenue('daily');
        calculateRevenue('weekly');
        calculateRevenue('monthly');
    });
});
// ==========================================
//(จบตรงนี้) 📌 ระบบสรุปยอดขาย (รายวัน, รายสัปดาห์, รายเดือน) - ไม่รวมค่าส่ง (จบตรงนี้)
// ==========================================


