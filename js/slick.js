$(function () {

    /* =====================================================
     * gallery slider
     * ===================================================== */
    (function () {

        const $gallerySlider = $('.gallery-slider');

        if (!$gallerySlider.length) return;

        $gallerySlider.slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            centerMode: true,
            slidesToShow: 3,
            centerPadding: '15%',
            cssEase: 'ease-in-out',
            pauseOnFocus: false, // フォーカス時に一時停止させない
            pauseOnHover: false, // マウスホバー時に一時停止させない
            pauseOnDotsHover: false, // ドットナビゲーション（ある場合）ホバー時に停止させない
            swipe: true,         // スワイプ操作を許可（現状のままでOK）
            touchMove: true,     // タッチ移動を許可（現状のままでOK）
        });
    })();


    /* =====================================================
     * about slider
     * ===================================================== */
    (function () {

        const $aboutSliders = $('.about-slider');

        if (!$aboutSliders.length) return;

        /**
         * スライド要素をランダムに並び替える
         */
        function shuffleSlides($slider) {
            const $slides = $slider.children().detach();
            const shuffled = $slides.toArray().sort(() => Math.random() - 0.5);
            $slider.append(shuffled);
        }

        $aboutSliders.each(function (index) {

            const $slider = $(this);

            // slick 初期化済みならスキップ（安全対策）
            if ($slider.hasClass('slick-initialized')) return;

            // ① 画像順をランダム化
            shuffleSlides($slider);

            // ② スライダー間の開始タイミングをずらす
            const initDelay = index * 1500; // 1.5秒ずつ遅延

            setTimeout(function () {

                $slider.slick({
                    vertical: true,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 0,
                    speed: 20000 + (index * 2000), // 流れる速度も差分をつける
                    cssEase: 'linear',
                    slidesToShow: 2,
                    swipe: false,
                    arrows: false,
                    pauseOnFocus: false,
                    pauseOnHover: false,
                });

            }, initDelay);

        });

    })();

    /* =====================================================
     * first slider
     * ===================================================== */
    (function () {

        const $firstSlider = $('.first-slider');

        if (!$firstSlider.length) return;

        $firstSlider.slick({
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            infinite: true,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            pauseOnFocus: false
        });

    })();

    /* =====================================================
     * reason & life slider
     * ===================================================== */
    (function () {
        // 親セクション（.reason と .life）をループして、それぞれの内部にある要素を紐付ける
        $('.reason, .life').each(function () {

            const $section = $(this);
            const $slider = $section.find('.reason-list, .life-list');
            const $prevBtn = $section.find('.arrow-prev');
            const $nextBtn = $section.find('.arrow-next');

            if (!$slider.length) return;

            $slider.slick({
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                variableWidth: true,
                autoplay: true, // 自動再生
                autoplaySpeed: 7000,
                dots: false,
                centerMode: false,

                // HTMLで追加したボタンを操作用に指定
                arrows: true,
                prevArrow: $prevBtn,
                nextArrow: $nextBtn,

                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: true, // スマホでもボタンを有効にする
                            prevArrow: $prevBtn,
                            nextArrow: $nextBtn,
                            centerMode: true,
                            variableWidth: true
                        }
                    }
                ]
            });
        });
    })();

});
