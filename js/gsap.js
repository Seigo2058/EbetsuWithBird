gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------
// 1. 江別に住むメリット解説セクション
// ---------------------------------------------
function initReasonScroll() {
    const contents = gsap.utils.toArray('.content');

    // 初期状態
    gsap.set(contents, { autoAlpha: 0, y: 50 });
    gsap.set(contents[0], { autoAlpha: 1, y: 0 });

    const SWITCH_DURATION = 0.8;
    const HOLD_DURATION = 1.2;

    const reasonTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.scroll-section',
            start: 'top top',
            end: () => `+=${contents.length * window.innerHeight}`,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true
        }
    });

    // 最初の表示維持
    reasonTl.to({}, { duration: HOLD_DURATION });

    contents.forEach((content, i) => {
        if (i === 0) return;

        reasonTl
            .to(contents[i - 1], {
                autoAlpha: 0,
                y: -50,
                duration: SWITCH_DURATION
            })
            .fromTo(
                content,
                { autoAlpha: 0, y: 50 },
                { autoAlpha: 1, y: 0, duration: SWITCH_DURATION },
                "-=0.1"
            )
            .to({}, { duration: HOLD_DURATION });
    });

    // refresh 対策
    // ※ Slickスライダー等の読み込みで高さが変わるため、ここだけでなく全体のリフレッシュ推奨
    window.addEventListener('resize', ScrollTrigger.refresh);
    window.addEventListener('load', ScrollTrigger.refresh);

    const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
    });

    contents.forEach(content => resizeObserver.observe(content));
}

// ---------------------------------------------
// 2. 子ページ導入セクション
// ---------------------------------------------
function initIntroScroll() {
    document.querySelectorAll(".scroll-block").forEach(block => {
        const img = block.querySelector(".reason-bg");
        const text = block.querySelector(".reason-text");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: block,
                start: "top top", // 必要に応じて "top top+=1" など調整
                end: "+=200%",    // スクロール距離
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });

        tl.fromTo(img,
            { filter: "blur(0px)" },
            { filter: "blur(8px)" }
        )
            .fromTo(text,
                { opacity: 0 },
                { opacity: 1 },
                "<"
            );
    });
}

// ---------------------------------------------
// 3. 汎用フェードインアニメーション
// (h1-h3 は即座に、p, td は少し遅れて表示)
// ---------------------------------------------
function initGeneralFade() {
    // 対象要素
    const targets = gsap.utils.toArray('h1, h2, h3, p, a');

    // 除外設定
    const fadeElements = targets.filter(el => {
        return !el.closest('.scroll-wrapper') &&
            !el.closest('.first-view') &&
            !el.closest('.scroll-block') &&
            !el.closest('header');
    });

    fadeElements.forEach((el) => {
        // タグ名判定：Pタグ または TDタグ なら遅らせるフラグを立てる
        // （tagNameは常に大文字で返ってきます）
        const isText = (el.tagName === 'P' || el.tagName === 'a');

        gsap.fromTo(el,
            {
                autoAlpha: 0,
                y: 30
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",

                // テキスト(p, td)なら 0.4秒遅延、見出し(h系)なら 0秒（即時）
                delay: isText ? 0.4 : 0,

                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}
// ▲▲▲ ここまで ▲▲▲


// ---------------------------------------------
// 初期化実行
// ---------------------------------------------
// ページ読み込み完了後に実行するようにラップするのが安全です
window.addEventListener('load', () => {
    initReasonScroll();
    initIntroScroll();
    initGeneralFade();
    ScrollTrigger.refresh(); // レイアウト確定後に再計算
});