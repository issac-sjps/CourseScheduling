// =============================================
// data.js — 學校排課系統 靜態設定資料
// 版本: V47.3 (Firebase 版)
// =============================================

const STORAGE_KEY = 'schoolSchedule_v47';

// ── Firebase 設定 ──────────────────────────
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDF1vk1di34RHuCdUAf64oYG8F3EvFHJ3o",
    authDomain: "sjps-coursescheduling.firebaseapp.com",
    projectId: "sjps-coursescheduling",
    storageBucket: "sjps-coursescheduling.firebasestorage.app",
    messagingSenderId: "51144689799",
    appId: "1:51144689799:web:38476e81b3c8abc52a5022",
    measurementId: "G-CEK1EKWL9Q"
};

// Firestore 文件路徑（所有資料存在同一份文件）
const FS_DOC_PATH = 'schedule/main';

const SUBJECTS = [
    { zh: '國語',   alias: '部定' },
    { zh: '數學',   alias: '部定' },
    { zh: '英語',   alias: '部定' },
    { zh: '社會',   alias: '部定' },
    { zh: '自然',   alias: '部定' },
    { zh: '生活',   alias: '部定' },
    { zh: '體育',   alias: '部定' },
    { zh: '綜合',   alias: '部定' },
    { zh: '藝文',   alias: '部定' },
    { zh: '健康',   alias: '部定' },
    { zh: '本土',   alias: '部定' },
    { zh: '走過時代邁向國際', alias: '彈性(合)' },
    { zh: '國際+閱讀',       alias: '彈性(新)' },
    { zh: '閱讀培力',        alias: '彈性' },
    { zh: '世界之窗',        alias: '彈性' },
    { zh: '新莊E學院',       alias: '彈性(資)' },
    { zh: '新莊萬花筒',      alias: '彈性' },
    { zh: '進擊的學吧',      alias: '彈性' },
];

// 預設年級節數矩陣（每科預設節數）
const DEFAULT_GRADE_MATRIX = {
    1: { 國語: 6, 數學: 4, 生活: 6, 體育: 2, 綜合: 1, 藝文: 3, 健康: 1, 本土: 1 },
    2: { 國語: 6, 數學: 4, 生活: 6, 體育: 2, 綜合: 1, 藝文: 3, 健康: 1, 本土: 1 },
    3: { 國語: 5, 數學: 4, 英語: 2, 社會: 3, 自然: 3, 體育: 2, 綜合: 2, 藝文: 3, 健康: 1, 本土: 1 },
    4: { 國語: 5, 數學: 4, 英語: 3, 社會: 3, 自然: 3, 體育: 2, 綜合: 2, 藝文: 3, 健康: 1, 本土: 1 },
    5: { 國語: 5, 數學: 4, 英語: 3, 社會: 3, 自然: 3, 體育: 2, 綜合: 2, 藝文: 3, 健康: 1, 本土: 1 },
    6: { 國語: 5, 數學: 4, 英語: 3, 社會: 3, 自然: 3, 體育: 2, 綜合: 2, 藝文: 3, 健康: 1, 本土: 1 },
};

const DEFAULT_GRADE_CLASS_COUNT = { 1: 6, 2: 6, 3: 7, 4: 9, 5: 8, 6: 8 };

const DAYS = ['一', '二', '三', '四', '五'];
const PERIODS = [
    { idx: 1, label: '第1節' },
    { idx: 2, label: '第2節' },
    { idx: 3, label: '第3節' },
    { idx: 4, label: '第4節' },
    { idx: 5, label: '第5節' },
    { idx: 6, label: '第6節' },
    { idx: 7, label: '第7節' },
];

// 科目顏色 mapping
const SUBJECT_COLOR_MAP = [
    { match: ['英語', '世界之窗'], cls: 'sub-color-eng' },
    { match: ['社會'],             cls: 'sub-color-soc' },
    { match: ['自然'],             cls: 'sub-color-sci' },
    { match: ['生活'],             cls: 'sub-color-life' },
    { match: ['體育'],             cls: 'sub-color-pe' },
    { match: ['藝文'],             cls: 'sub-color-art' },
    { match: ['健康'],             cls: 'sub-color-health' },
    { match: ['本土'],             cls: 'sub-color-native' },
    { match: ['資訊', 'E學院'],    cls: 'sub-color-it' },
];

// 列印科目顏色（用於課表列印的背景色）
const PRINT_SUBJECT_COLORS = {
    '國語': '#fef9c3',
    '數學': '#dbeafe',
    '英語': '#dbeafe',
    '社會': '#fef3c7',
    '自然': '#dcfce7',
    '生活': '#ccfbf1',
    '體育': '#fee2e2',
    '藝文': '#f3e8ff',
    '健康': '#ffe4e6',
    '本土': '#ffedd5',
    '綜合': '#f0fdf4',
    '閱讀培力': '#fafafa',
    '世界之窗': '#dbeafe',
    '新莊E學院': '#e0e7ff',
};

function getDefaultTeachers(gradeConfig) {
    let list = [], tid = 1;
    for (let i = 1; i <= 4; i++)
        list.push({ id: tid++, name: `主任${i}`, role: '主任', classId: '', title_note: `教務主任${i}`, baseLoad: 1, reduction: 0, overtime: 0, priority: 10, constraints: [], isGradeDirector: false });
    for (let i = 1; i <= 9; i++)
        list.push({ id: tid++, name: `組長${i}`, role: '組長', classId: '', title_note: `教學組長${i}`, baseLoad: 11, reduction: 0, overtime: 0, priority: 10, constraints: [], isGradeDirector: false });
    for (let i = 1; i <= 13; i++)
        list.push({ id: tid++, name: `科任${i}`, role: '科任', classId: '', title_note: '專長', baseLoad: 20, reduction: 0, overtime: 0, priority: 10, constraints: [], isGradeDirector: false });
    for (let g = 1; g <= 6; g++) {
        for (let c = 1; c <= gradeConfig[g]; c++) {
            const clsId = `${g}${c.toString().padStart(2, '0')}`;
            list.push({ id: tid++, name: `${clsId}導師`, role: '導師', classId: clsId, title_note: '', baseLoad: 16, reduction: 0, overtime: 0, priority: 99, constraints: [], isGradeDirector: false });
        }
    }
    return list;
}
