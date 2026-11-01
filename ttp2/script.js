/**
 * ThreadsToolsPro2 Documentation - Interactive Features
 * ベース: 31_xtools-docs-auth / script.js（必要機能のみ）
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
});

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });

    // Close menu when clicking a nav link (mobile)
    sidebar.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) sidebar.classList.remove('active');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const headerOffset = 32 + 48; // 2026-11-01: マーケットの帯（48px・fixed）のぶん
            const offsetPosition =
                target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        });
    });
}

/**
 * Scroll spy - Update active nav link based on scroll position
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

/**
 * Image Lightbox — クリックでスクショを原寸表示
 */
(function initImageLightbox() {
    let overlay, imgEl, captionEl;

    function ensureOverlay() {
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.className = 'image-lightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML = `
            <button type="button" class="image-lightbox__close" aria-label="閉じる">&times;</button>
            <img class="image-lightbox__img" alt="">
            <div class="image-lightbox__caption" hidden></div>
        `;
        document.body.appendChild(overlay);
        imgEl = overlay.querySelector('.image-lightbox__img');
        captionEl = overlay.querySelector('.image-lightbox__caption');

        overlay.addEventListener('click', (e) => {
            if (
                e.target === overlay ||
                e.target.classList.contains('image-lightbox__close') ||
                e.target === imgEl
            ) {
                close();
            }
        });
    }

    function open(src, alt, caption) {
        ensureOverlay();
        imgEl.src = src;
        imgEl.alt = alt || '';
        if (caption) {
            captionEl.textContent = caption;
            captionEl.hidden = false;
        } else {
            captionEl.hidden = true;
        }
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        if (!overlay) return;
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        imgEl.src = '';
    }

    document.addEventListener('click', (e) => {
        const img = e.target.closest('img.screenshot, .screenshot-container img');
        if (!img) return;
        e.preventDefault();
        const container = img.closest('.screenshot-container');
        const captionNode = container && container.querySelector('.screenshot-caption');
        open(img.src, img.alt, captionNode ? captionNode.textContent.trim() : '');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
})();

// ⓘ（インフォメーションマーク）: タップ／クリックで開閉、外側を押すか Esc で閉じる、開くのは1つだけ（2026-11-01）
(function () {
    // 開くたびに位置を測って、吹き出しを画面の内側に収める（スマホ幅では見出しが折り返して ⓘ の位置が変わる）
    function place(wrap) {
        const pop = wrap.querySelector('.info-pop');
        if (!pop) return;
        pop.style.left = '';
        pop.style.right = '';
        const anchor = wrap.getBoundingClientRect();
        const rect = pop.getBoundingClientRect();
        if (!rect.width) return;
        const minX = 8;
        const maxX = document.documentElement.clientWidth - 8 - rect.width;
        const x = Math.min(Math.max(rect.left, minX), Math.max(minX, maxX));
        if (x !== rect.left) {
            pop.style.left = (x - anchor.left) + 'px';
            pop.style.right = 'auto';
        }
    }

    function closeAll(except) {
        document.querySelectorAll('.info.open').forEach((wrap) => {
            if (wrap === except) return;
            wrap.classList.remove('open');
            const btn = wrap.querySelector('.info-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    document.addEventListener('mouseover', (e) => {
        const wrap = e.target.closest && e.target.closest('.info');
        if (wrap) place(wrap);
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.info-btn');
        if (!btn) {
            // 吹き出しの中を押しても閉じる（下にある別の ⓘ を隠したままにしない）
            const wrap = e.target.closest('.info');
            if (!wrap || e.target.closest('.info-pop')) closeAll(null);
            return;
        }
        e.preventDefault();
        const wrap = btn.closest('.info');
        const open = !wrap.classList.contains('open');
        closeAll(wrap);
        wrap.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (open) place(wrap);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll(null);
    });
})();

/*
  Version History
  ver1.1 (2026-11-01) - ⓘ（.info）の開閉を追加（タップ／クリック・外側／Esc で閉じる・1つだけ・画面内に収める）。
*/
