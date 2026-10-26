/* ============================================================
   DNM Family —— 主脚本
   功能：菜单切换、成员数据渲染
   ============================================================ */

/* ---------- 成员数据（来源：DNM选手角色.xlsx） ---------- */
const members = [
    {
        id: 'DNMZ',
        title: '大头带哥',
        brief: 'DNM团队最强抗压位',
        personality: '沉稳果断，顾全大局，关键时刻永远靠得住',
        games: ['DOTA', '彩六'],
        color: '#ff6b6b'
    },
    {
        id: 'DOGOD',
        title: '团队大脑',
        brief: '冷静的战术指挥',
        personality: '理性冷静，总能找到对手的破绽',
        games: ['DOTA', '手游'],
        color: '#ffd93d'
    },
    {
        id: 'VLON',
        title: '战术大师',
        brief: '复杂战术制定者',
        personality: '分析型选手，擅长制定复杂战术',
        games: ['彩六', '地平线', 'DOTA'],
        color: '#4ecdc4'
    },
    {
        id: 'YAO',
        title: '乱战先锋',
        brief: '团队乐子人，搞笑吉祥物',
        personality: '团队里最会搞笑的那个人，气氛担当',
        games: ['彩六', 'DOTA', '地平线'],
        color: '#a855f7'
    },
    {
        id: 'ZUO',
        title: '稳如老狗',
        brief: '心态沉稳，如石佛一般坚毅',
        personality: '无论局势如何动荡，都能泰然处之',
        games: ['DOTA', '彩六', '单机'],
        color: '#22d3ee'
    },
    {
        id: 'FAGE',
        title: '全能补位',
        brief: '绝活广泛，Carry 全场',
        personality: '团队一块砖，哪里需要哪里搬',
        games: ['DOTA', '彩六', '生存'],
        color: '#f97316'
    },
    {
        id: 'FENG',
        title: '王牌辅助',
        brief: '金牌保镖，保核心安稳发育',
        personality: '对线专注认真，技术操作细腻',
        games: ['DOTA', '原神'],
        color: '#f472b6'
    },
    {
        id: 'FOCUS',
        title: '神秘打手',
        brief: '低调内敛，操作犀利',
        personality: '随和可靠，适应力极强，默默付出不求回报',
        games: ['魔兽', '地平线', '守望'],
        color: '#60a5fa'
    },
    {
        id: 'DAO',
        title: '情感大仙',
        brief: '对情感问题有超出凡人的理解',
        personality: '实力深不可测，神龙见首不见尾',
        games: ['原神', '游乐园'],
        color: '#c084fc'
    },
    {
        id: 'DSYG',
        title: '派对之星',
        brief: 'Switch派对游戏狂热分子',
        personality: 'Switch在手，天下我有',
        games: ['Switch', '日麻'],
        color: '#34d399'
    },
    {
        id: 'NENG',
        title: '逼势大王',
        brief: '逻辑推理类游戏大神',
        personality: '如果有一天能猫不逼势了，那一定是地球毁灭了',
        games: ['日麻', '血染'],
        color: '#fb7185'
    }
];

/* ---------- 团队游戏数据 ---------- */
const games = [
    {
        name: 'DOTA2',
        icon: '⚔️',
        iconImg: 'images/DOTA2_icon.png',
        color: '#d32f2f',
        desc: 'Valve 出品的 5v5 MOBA 竞技巅峰之作，上百位英雄、无限组合的装备体系，从对线运营到团战博弈，是 DNM 家族开黑时间最长的本命游戏。',
        players: ['DNMZ', 'DOGOD', 'FAGE', 'ZUO', 'FENG', 'VLON', 'YAO']
    },
    {
        name: '彩虹六号',
        icon: '🎯',
        iconImg: 'images/R6_icon.png',
        color: '#ff9800',
        desc: '育碧招牌战术射击，攻防双方围绕墙体、道具与干员技能斗智斗勇，一枪毙命的硬核机制下，比拼的是枪法、战术与心理博弈。',
        players: ['VLON', 'YAO', 'DNMZ', 'FAGE', 'ZUO']
    },
    {
        name: '地平线6',
        icon: '🏎️',
        iconImg: 'images/Horizon6_icon.png',
        color: '#3f51b5',
        desc: '《极限竞速：地平线6》开放世界赛车嘉年华，海量豪车、四季变换的赛道与线上竞速，踩下油门就是兄弟们飙车的快乐时光。',
        players: ['VLON', 'FOCUS', 'YAO', 'DOGOD', 'DNMZ']
    },
    {
        name: '血染钟楼',
        icon: '🔔',
        iconImg: 'images/Clocktower_icon.png',
        color: '#9c27b0',
        desc: '社交推理桌游新王，白天发言、夜晚行动，恶魔潜伏在村民之中。信息、谎言与演技交织，每一局都是全员参与的智力修罗场。',
        players: 'ALL'
    },
    {
        name: '雀魂',
        icon: '🀄',
        iconImg: 'images/Mahjong_icon.png',
        color: '#e91e63',
        desc: '二次元风格在线麻将平台，立直、役满、振听，日麻规则下的攻防算牌。家族牌桌上永远的团建项目，输了就发红包。',
        players: 'ALL'
    }
];

/* ---------- 荣誉墙数据（来源：DNM荣誉墙.xlsx） ---------- */
const honors = [
    { abbr: 'TR1', full: '第一届DOTA2 RandomSolo大赛', champion: 'DOGOD', runnerUp: 'VLON', third: 'FAGE' },
    { abbr: 'TR2', full: '第二届DOTA2 RandomSolo大赛', champion: 'DOGOD', runnerUp: 'DNMZ', third: 'FAGE' },
    { abbr: 'TR3', full: '第三届DOTA2 RandomSolo大赛', champion: 'ZUO', runnerUp: 'YAO', third: 'DOGOD' },
    { abbr: 'TR4', full: '第四届DOTA2 RandomSolo大赛', champion: 'DOGOD', runnerUp: 'DNMZ', third: 'FAGE' },
    { abbr: 'TR5', full: '第一届羽毛球Solo大赛', champion: 'NENG', runnerUp: 'VLON', third: 'DNMZ' }
];

/* ---------- 菜单页面切换 ---------- */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = item.dataset.page;

            // 更新菜单激活状态
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // 切换显示对应页面
            pages.forEach(p => p.classList.remove('active'));
            const target = document.getElementById(`page-${targetPage}`);
            if (target) target.classList.add('active');
        });
    });
}

/* ---------- 渲染成员列表 ---------- */
function renderMembers() {
    const list = document.getElementById('member-list');
    if (!list) return;

    list.innerHTML = members.map(m => `
        <article class="member-card" style="--accent: ${m.color}">
            <!-- 头像：直接显示图片，加载失败则隐藏留底色 -->
            <div class="member-avatar"
                 style="background: linear-gradient(135deg, ${m.color}, ${lighten(m.color, 30)});">
                <img class="member-avatar-img"
                     src="${m.avatar || `images/${m.id}.png`}"
                     alt="${m.id}"
                     onerror="this.remove()">
            </div>

            <div class="member-info">
                <div class="member-header">
                    <span class="member-id">${m.id}</span>
                    <span class="member-tag">${m.title}</span>
                </div>
                <p class="member-brief">${m.brief}</p>

                <div class="member-details">
                    <div class="detail-row">
                        <span class="detail-label">性格：</span>
                        <span>${m.personality}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">擅长：</span>
                        <div class="detail-games">
                            ${m.games.map(g => `<span class="game-chip">${g}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

/* ---------- 团队游戏渲染 ---------- */
function renderGames() {
    const tabsEl = document.getElementById('games-tabs');
    const panelEl = document.getElementById('games-panel');
    if (!tabsEl || !panelEl) return;

    // 选项卡
    tabsEl.innerHTML = games.map((g, i) => `
        <button class="game-tab ${i === 0 ? 'active' : ''}" data-index="${i}">
            <span class="game-tab-icon">
                <img src="${g.iconImg}" alt="" onerror="this.remove()">${g.icon}
            </span>
            <span>${g.name}</span>
        </button>
    `).join('');

    // 面板（默认显示第一个游戏）
    panelEl.innerHTML = buildGamePanel(games[0], 0);

    // 选项卡切换
    tabsEl.querySelectorAll('.game-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            tabsEl.querySelectorAll('.game-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const idx = parseInt(btn.dataset.index, 10);
            panelEl.innerHTML = buildGamePanel(games[idx], idx);
        });
    });
}

function buildGamePanel(g, idx) {
    // players 为 'ALL' 时展示全体成员，否则按给定顺序展示
    const playerIds = g.players === 'ALL' ? members.map(m => m.id) : g.players;
    const playerBadges = playerIds.map(id => {
        const color = getMemberColor(id);
        return `<span class="player-badge" style="border-color: ${color}; color: ${color}">
                    <img src="images/${id}.png" alt="" onerror="this.remove()">
                    ${id}
                </span>`;
    }).join('');

    return `
        <div class="game-info" style="--game-color: ${g.color}">
            <div class="game-icon" style="background: linear-gradient(135deg, ${g.color}, ${lighten(g.color, 35)});">
                <img class="game-icon-img" src="${g.iconImg}" alt="${g.name}" onerror="this.remove()">
                <span class="game-icon-emoji">${g.icon}</span>
            </div>
            <div class="game-text">
                <h3 class="game-name">${g.name}</h3>
                <p class="game-desc">${g.desc}</p>
            </div>
        </div>
        <div class="game-players">
            <div class="game-players-label">擅长该游戏的成员（${playerIds.length}人）：</div>
            <div class="game-players-list">${playerBadges}</div>
        </div>
    `;
}

/* ---------- 荣誉墙渲染 ---------- */
function renderHonors() {
    const listEl = document.getElementById('honor-list');
    if (!listEl) return;

    listEl.innerHTML = honors.map(h => `
        <article class="honor-card">
            <span class="honor-abbr">${h.abbr}</span>
            <span class="honor-full">${h.full}</span>
            <div class="honor-ranks">
                <span class="rank-chip rank-gold">🏆 冠军：${h.champion}</span>
                <span class="rank-chip rank-silver">🥈 亚军：${h.runnerUp}</span>
                <span class="rank-chip rank-bronze">🥉 季军：${h.third}</span>
            </div>
        </article>
    `).join('');
}

/* ---------- 工具函数 ---------- */

// 根据成员 ID 查专属颜色
function getMemberColor(id) {
    const m = members.find(m => m.id === id);
    return m ? m.color : '#888888';
}

// 头像文字：取 ID 的首字母（支持中文则取第一个字符）
function getAvatarText(id) {
    if (!id) return '?';
    return id.charAt(0).toUpperCase();
}

// 颜色提亮（用于头像渐变）
function lighten(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderMembers();
    renderGames();
    renderHonors();
    console.log('🎮 DNM Family 网站已加载！');
});
