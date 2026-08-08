/* ============================================================
 * util.js
 * Part of offline_board.html (split for maintainability)
 * Shared pure helpers (no module deps)
 * Load order: util.js -> data.js -> listbox.js -> board.js -> app.js
 * ============================================================ */
        function showToast(msg) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerText = msg;
            container.appendChild(toast);
            setTimeout(() => {
                toast.remove();
            }, 2500);
        }

        // HTML escape helper (prevent broken rendering / injection from data fields)
        function esc(value) {
            return String(value == null ? '' : value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        /* ============================================================
           Custom Color-Coded Dropdown Engine
           Replaces native <select> for status / assignee so the
           open panel can be styled and each option color-coded.
           ============================================================ */
        const STATUS_OPTIONS = ['待开始','进行中','审查中','测试中','已完成','已验收','已退回','已阻塞','已取消'];
        const PERSON_OPTIONS = ['严经理','钱架构','李开发','曹艾','周审查','章测试','李文通','吕改特'];

        // bg = light tint, text = saturated hue (mirrors table .tag aesthetic)
        const STATUS_COLORS = {
            '待开始': { bg:'#f2f3f5', text:'#4e5969' },
            '进行中': { bg:'#e8f0fe', text:'#3370ff' },
            '审查中': { bg:'#e8eaff', text:'#3a5bdb' },
            '测试中': { bg:'#e6fffb', text:'#08979c' },
            '已完成': { bg:'#e8ffea', text:'#00a854' },
            '已验收': { bg:'#e6fae8', text:'#2f9e44' },
            '已退回': { bg:'#fff7e6', text:'#d97706' },
            '已阻塞': { bg:'#fff1f0', text:'#f53f3f' },
            '已取消': { bg:'#f5f5f5', text:'#8c8c8c' }
        };
        const PERSON_COLORS = {
            '严经理': { bg:'#e6f6eb', text:'#248a3d' },
            '钱架构': { bg:'#e1eaff', text:'#3a5bdb' },
            '李开发': { bg:'#fff0e0', text:'#d97706' },
            '曹艾':   { bg:'#f3e8ff', text:'#7c3aed' },
            '周审查': { bg:'#e0f2fe', text:'#0284c7' },
            '章测试': { bg:'#fce8f8', text:'#c21897' },
            '李文通': { bg:'#fff7e6', text:'#b45309' },
            '吕改特': { bg:'#f0f0f0', text:'#595959' }
        };

        function getBadgeStyle(type, value) {
            const map = type === 'status' ? STATUS_COLORS : PERSON_COLORS;
            return map[value] || { bg:'#f2f3f5', text:'#4e5969' };
        }

        function badgeInner(type, value) {
            const st = getBadgeStyle(type, value);
            const caret = `<svg class="ts-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${st.text}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
            return `<span class="ts-dot" style="background:${st.text}"></span><span class="ts-label">${esc(value)}</span>${caret}`;
        }

        // For trigger rendered inside JS template literals (table rows)
        function tagSelectTriggerHTML(type, value, attrs) {
            const st = getBadgeStyle(type, value);
            return `<div class="tag-select" data-type="${type}" ${attrs || ''} data-value="${esc(value)}" style="background:${st.bg};color:${st.text};border-color:rgba(0,0,0,0.06)">${badgeInner(type, value)}</div>`;
        }
