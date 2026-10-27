/* ============================================================
 * map.js —— "足迹"页面：中国地图 + 点亮省份 + 悬浮卡片
 * 依赖：lib/echarts.min.js（本地化，无 CDN 依赖）
 * 数据：data/china.json（中国省份 GeoJSON，来源阿里 DataV）
 * ============================================================ */

/* ---------- 足迹数据 ---------- */
// 成员常驻省份：卡片显示城市、常驻成员、城市简介
// 旅游足迹：卡片显示城市、旅游时间、行程与欢乐时光
const footprintData = {
    residence: [
        {
            province: '辽宁省',
            city: '沈阳市',
            members: ['DNMZ'],
            intro: '东北第一大城，一朝发祥地、两代帝王都。必逛：沈阳故宫、张氏帅府、中街、北陵公园；必吃：鸡架、西塔烤鳗鱼。冬天的洗浴文化更是灵魂所在。'
        },
        {
            province: '辽宁省',
            city: '朝阳市',
            members: ['VLON', 'FOCUS'],
            intro: '三燕古都，红山文化的故乡。必逛：牛河梁红山文化遗址、朝阳鸟化石国家地质公园、北塔；必吃：上海大里脊、玉和特味。'
        },
        {
            province: '广东省',
            city: '深圳市',
            members: ['YAO'],
            intro: '改革开放的前沿窗口，从渔村到科技之都只用了四十年。必逛：世界之窗、深圳湾公园、大梅沙海滨、莲花山；必吃：椰子鸡、肠粉、烧鹅、潮汕牛肉火锅。'
        },
        {
            province: '广东省',
            city: '广州市',
            members: ['DAO'],
            intro: '千年商都，岭南文化的中心。必逛：广州塔、陈家祠、沙面岛、永庆坊；必吃：早茶点心、肠粉、白切鸡、煲仔饭。一盅两件叹早茶，是广州人的生活哲学。'
        },
        {
            province: '北京市',
            city: '北京市',
            members: ['DOGOD', 'FENG', 'DSYG', 'NENG'],
            intro: '千年古都，皇家气派与市井烟火共存。必逛：故宫、长城、颐和园；必吃：北京烤鸭、炸酱面、涮羊肉。据点：九号温泉'
        },
        {
            province: '上海市',
            city: '上海市',
            members: ['ZUO'],
            intro: '魔都，东方摩登与百年风情交汇。必逛：外滩、上海迪士尼；必吃：小笼包、生煎包、本帮红烧肉、葱油拌面。'
        },
        {
            province: '浙江省',
            city: '杭州市',
            members: ['FAGE'],
            intro: '人间天堂，西湖山水与互联网之城。必逛：西湖、西溪湿地；必吃：西湖醋鱼、东坡肉、龙井虾仁。'
        }
    ],
    trips: [
        {
            province: '陕西省',
            city: '西安市',
            time: '2015年10月',
            color: '#ff6b6b',
            spots: '兵马俑、回民街、大唐不夜城、西安城墙',
            story: '西安城墙租自行车狂飙，夜爬华山半夜山顶抱团闻屁，导演连夜坐火车回成都跑了个一千米再回来。'
        },
        {
            province: '山东省',
            city: '青岛市',
            time: '2016年10月',
            color: '#ff9f43',
            spots: '五四广场、索尼克主题室内公园',
            story: '五四青年公园打卡，反向坐公交越坐人越少；索尼克主题室内公园："我仍然在瞄准"、"我先去厕所吐一会儿"、"积分刷到第一但是兑奖时间过了"。'
        },
        {
            province: '四川省',
            city: '成都市',
            time: '2018年4月',
            color: '#a55eea',
            spots: '大熊猫基地、四川大学',
            story: '大熊猫基地暴雨趟河，成都双雄四年首次面基；出租车司机把"四川大学"听成"师范大学"，带着我们爆兜圈子。'
        },
        {
            province: '浙江省',
            city: '杭州市',
            time: '2019年10月',
            color: '#ffd700',
            spots: '西湖、西溪湿地',
            story: '四二分伙整出味道，车开了4人没上车、4等蹲街边等2人拉屎；TR1激情对线、犯罪现场抽陀螺。'
        }
    ]
};

/* ---------- 点亮色 ---------- */
const FP_COLORS = {
    home: '#4ecdc4'    // 常驻基地统一：青绿色；旅行省份各自使用专属彩色
};

// 颜色亮化（用于点亮省份的 hover 高亮）
function fpLighten(hex, percent) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + Math.round(255 * percent));
    const g = Math.min(255, ((n >> 8) & 255) + Math.round(255 * percent));
    const b = Math.min(255, (n & 255) + Math.round(255 * percent));
    return `rgb(${r},${g},${b})`;
}

/* ---------- 成员徽章 HTML（复用成员专属色 + 头像） ---------- */
function fpMemberBadge(id) {
    const color = (typeof getMemberColor === 'function' && getMemberColor(id)) || '#4ecdc4';
    return `<span class="fp-badge" style="border-color:${color};color:${color}">
                <img src="images/${id}.png" alt="" onerror="this.remove()">${id}
            </span>`;
}

/* ---------- 悬浮卡片 HTML（内容层，不含 .fp-card 外壳） ---------- */
function fpCardHTML(name) {
    const rec = window.__fpLitMap__ && window.__fpLitMap__[name];
    if (!rec) return '';
    let html = '';

    if (rec.home && rec.home.cities.length) {
        html += `<div class="fp-card-head fp-head-home">🏠 常驻基地</div>`;
        rec.home.cities.forEach(c => {
            const badges = c.members.map(fpMemberBadge).join('');
            html += `
                <div class="fp-card-title">${c.city}</div>
                <div class="fp-card-row"><span class="fp-label">常驻成员：</span>${badges}</div>
                <div class="fp-card-intro">${c.intro}</div>`;
        });
    }

    (rec.trips || []).forEach(t => {
        html += `
            <div class="fp-card-head fp-head-trip">✈️ 旅游足迹</div>
            <div class="fp-card-title">${t.province} · ${t.city}</div>
            <div class="fp-card-row"><span class="fp-label">时间：</span>${t.time}</div>
            ${t.spots ? `<div class="fp-card-row"><span class="fp-label">行程：</span>${t.spots}</div>` : ''}
            <div class="fp-card-intro">🍻 ${t.story}</div>`;
    });

    return html;
}

/* ---------- 地图初始化（懒加载：切到足迹页时才执行） ---------- */
let fpMapChart = null;

async function initFootprintMap() {
    const el = document.getElementById('china-map');
    if (!el || !window.echarts || fpMapChart) return;

    try {
        const resp = await fetch('data/china.json');
        const chinaJson = await resp.json();
        // 移除南海诸岛板块，仅展示陆地部分
        chinaJson.features = chinaJson.features.filter(f => {
            const name = f.properties && f.properties.name;
            return name && name !== '南海诸岛';
        });
        echarts.registerMap('china', chinaJson);
    } catch (e) {
        el.innerHTML = '<p style="color:#888;text-align:center;padding:60px 0;">地图数据加载失败：' + e.message + '</p>';
        return;
    }

    // 构建点亮省份映射：省名 -> { home: { cities: [...] }, trips: [...] }
    // 同一省份可能有多个常驻城市（如辽宁省的沈阳+朝阳），按省分组
    const lit = {};
    footprintData.residence.forEach(r => {
        if (!lit[r.province]) lit[r.province] = { home: { cities: [] }, trips: [] };
        lit[r.province].home.cities.push({ city: r.city, members: r.members, intro: r.intro });
    });
    footprintData.trips.forEach(t => {
        if (!lit[t.province]) lit[t.province] = { home: { cities: [] }, trips: [] };
        lit[t.province].trips.push(t);
    });
    window.__fpLitMap__ = lit;

    // series 数据：点亮省份着色 —— 常驻=青绿，旅行=各自专属彩色（常驻+旅行省份取旅行色）
    const seriesData = Object.keys(lit).map(name => {
        const rec = lit[name];
        const hasHome = rec.home.cities.length > 0;
        const hasTrip = rec.trips.length > 0;
        const type = hasHome && hasTrip ? 'both' : (hasHome ? 'home' : 'trip');
        const color = hasTrip ? rec.trips[0].color : FP_COLORS.home;
        return { name, type, color, value: 1 };
    });

    fpMapChart = echarts.init(el);

    /* ---------- 自定义悬浮卡片（替代 ECharts tooltip）----------
     * ECharts tooltip 每次 mousemove 都会重写 innerHTML，导致内层卡片节点
     * 被不断重建、弹出动画反复重启（表现为闪烁刷新）。
     * 改为事件驱动：mouseover 进入省份时弹一次，省内滑动完全不碰卡片，
     * mouseout / 缩放拖动时隐藏 —— 从机制上杜绝刷新。
     */
    let fpCardEl = null;
    let fpShownRegion = null;

    const fpEnsureCard = () => {
        if (!fpCardEl) {
            fpCardEl = document.createElement('div');
            fpCardEl.className = 'fp-card fp-card-layer';
            el.appendChild(fpCardEl);
        }
        return fpCardEl;
    };

    const fpHideCard = () => {
        if (fpCardEl) fpCardEl.style.display = 'none';
        fpShownRegion = null;
    };

    const fpShowCard = params => {
        const card = fpEnsureCard();
        if (fpShownRegion !== params.name) {
            card.innerHTML = fpCardHTML(params.name);   // 仅切换省份时重建内容
        }
        card.style.display = 'block';
        // 定位：以进入省份时的鼠标点为锚，右侧优先（放不下放左侧），垂直居中并钳制在容器内
        const ox = params.event.offsetX, oy = params.event.offsetY;
        const viewW = el.clientWidth, viewH = el.clientHeight;
        const w = card.offsetWidth, h = card.offsetHeight;
        let x = ox + 16;
        if (x + w > viewW - 4) x = ox - w - 16;
        if (x < 4) x = 4;
        let y = oy - h / 2;
        if (y < 4) y = 4;
        if (y + h > viewH - 4) y = viewH - h - 4;
        card.style.left = x + 'px';
        card.style.top = y + 'px';
        // 重播弹出动画（进入新省份时）
        if (fpShownRegion !== params.name) {
            card.style.animation = 'none';
            void card.offsetWidth;      // 强制 reflow 后恢复动画
            card.style.animation = '';
            fpShownRegion = params.name;
        }
    };

    fpMapChart.setOption({
        series: [{
            type: 'map',
            map: 'china',
            roam: true,               // 支持缩放拖动
            zoom: 1.55,               // 再次放大
            center: [103.8, 36.3],    // 以中国陆地几何中心为地图中心，陆地居中显示
            scaleLimit: { min: 0.8, max: 3 },
            selectedMode: false,
            itemStyle: {
                areaColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.18)',
                borderWidth: 0.6
            },
            emphasis: {               // 悬停高亮：变色 + 边框加粗
                label: { show: true, color: '#fff', fontSize: 12 },
                itemStyle: {
                    areaColor: 'rgba(255,255,255,0.22)',
                    borderColor: '#fff',
                    borderWidth: 1.4
                }
            },
            select: { disabled: true },
            data: seriesData.map(d => ({
                name: d.name,
                value: d.value,
                type: d.type,
                itemStyle: { areaColor: d.color },
                emphasis: {
                    itemStyle: {
                        areaColor: fpLighten(d.color, 0.25),
                        borderColor: '#fff',
                        borderWidth: 1.6
                    }
                }
            })),
            label: {
                show: false,
                color: '#ccc',
                fontSize: 10
            }
        }]
    });

    /* ---------- 卡片事件绑定 ----------
     * mouseover：进入省份板块时触发一次 —— 点亮省份弹出卡片，未点亮省份保持隐藏
     * mouseout / georoam / resize：卡片隐藏（再次进入时重新弹出）
     * 省内 mousemove 不绑定任何逻辑 → 卡片静止、动画不重播
     */
    fpMapChart.on('mouseover', params => {
        if (params.componentType !== 'series' || !params.name) return;
        if (!window.__fpLitMap__[params.name]) { fpHideCard(); return; }
        fpShowCard(params);
    });
    fpMapChart.on('mouseout', fpHideCard);
    fpMapChart.on('georoam', fpHideCard);

    window.addEventListener('resize', () => {
        fpHideCard();
        fpMapChart && fpMapChart.resize();
    });
}

/* ---------- 监听菜单切换：进入足迹页时懒加载/自适应 ---------- */
document.addEventListener('click', e => {
    const nav = e.target.closest('.nav-item');
    if (!nav) return;
    if (nav.dataset.page === 'footprint') {
        // 等页面 display 生效后再初始化，保证容器有尺寸
        setTimeout(() => {
            if (fpMapChart) { fpMapChart.resize(); } else { initFootprintMap(); }
        }, 60);
    }
});

console.log('🗺️ 足迹模块已加载（进入"足迹"页面时渲染地图）');
