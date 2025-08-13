document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // 1. スライドショーのコード
    // ==================================================
    // --- 設定項目 ---
    const images = [
        'images/works/animal_mirror_top.png',       // 作品画像1
        'images/works/ninjya_shippu_blade_top.png', // 作品画像2
        'images/works/the_zeroth_wonder_top.png',   // 作品画像3
        'images/works/delivery_spirits_top.png',    // 作品画像4
        'images/works/astro_shooter_top.png',       // 作品画像5
    ];
    // --- 設定はここまで ---

    const slideArea = document.querySelector('.slide-area');
    const slideButton = document.querySelector('.slide-button');

    // スライドショーの要素が存在する場合のみ処理を実行
    if (slideArea && slideButton) {
        slideArea.innerHTML = '';
        slideButton.innerHTML = '';

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = '作品';
            if (index === 0) img.classList.add('active');
            slideArea.appendChild(img);

            const span = document.createElement('span');
            if (index === 0) span.classList.add('active');
            slideButton.appendChild(span);
        });

        const slides = document.querySelectorAll('.slide-area img');
        const buttons = document.querySelectorAll('.slide-button span');
        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            buttons.forEach(button => button.classList.remove('active'));
            slides[index].classList.add('active');
            buttons[index].classList.add('active');
            currentIndex = index;
        }

        function startSlideShow() {
            slideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                showSlide(nextIndex);
            }, 8000);
        }

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideShow();
            });
        });
        
        startSlideShow();
    }


    // ==================================================
    // 2. クリックで目的地にスクロールするJS
    // ==================================================
    // hrefが "#" から始まるすべてのリンク要素を取得
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // デフォルトのクリックイベント（瞬時にジャンプする動き）をキャンセル
            e.preventDefault();

            // リンク先を示すhref属性の値を取得
            const href = link.getAttribute('href');
            // href属性の値が "#" だけでないことを確認
            if (href === '#') return;

            // スクロール先の要素を取得 (hrefの値から#を取り除いてIDとして使用)
            const target = document.getElementById(href.slice(1));
            
            // ターゲット要素が存在すれば、そこまでスムーズにスクロール
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth', // アニメーションを'smooth'（滑らか）に指定
                    block: 'start'      // ターゲット要素の上端をビューポートの上端に合わせる
                });
            }
        });
    });


    // ==================================================
    // 3. BodyのWidthをコンソールに出力するJS
    // ==================================================
    // Bodyの幅をコンソールに出力する関数を定義
    function logBodyWidth() {
        // document.body.offsetWidth を使ってbody要素の現在の幅を取得
        const bodyWidth = document.body.offsetWidth;
        // 開発者ツールのコンソールに幅を出力
        console.log(`現在のBodyの幅: ${bodyWidth}px`);
    }

    // ページが最初に読み込まれた時に一度、幅を出力
    logBodyWidth();

    // ウィンドウのサイズが変更（リサイズ）された時に、再度幅を出力
    window.addEventListener('resize', logBodyWidth);


// ==================================================
// 4. トップへ戻るボタンのJS（このブロックを追記）
// ==================================================
// HTMLからボタン要素を取得
const toTopButton = document.getElementById('to-top-button');

// スクロールイベントを監視
window.addEventListener('scroll', () => {
    // 現在のスクロール量を取得
    const scrollAmount = window.scrollY;

    // 300pxより多くスクロールされていたら.showクラスを付けて表示
    if (scrollAmount > 300) {
        toTopButton.classList.add('show');
    } else {
        // そうでなければ.showクラスを外して非表示
        toTopButton.classList.remove('show');
    }
});

// ボタンがクリックされた時の処理
toTopButton.addEventListener('click', (e) => {
    // aタグのデフォルトの動作（#がURLにつく）をキャンセル
    e.preventDefault();

    // ページの一番上（top: 0）までスムーズにスクロール
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

});