// ======================================================
// DARKBOOK — БАЗА КНИГ
// ======================================================

const books = [

    {
        id: 1,

        title: "Приключения Тома Сойера",

        author: "Марк Твен",

        category: "Приключения",

        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",

        description:
            "Знаменитая история Тома Сойера и его друзей.",

        chapters: [

            {
                title: "Глава 1",

                text: `
                    <p>
                        Здесь находится текст первой главы книги.
                    </p>

                    <p>
                        Ты можешь заменить этот текст своим содержимым.
                    </p>
                `
            },

            {
                title: "Глава 2",

                text: `
                    <p>
                        Текст второй главы.
                    </p>
                `
            }

        ]
    },


    {
        id: 2,

        title: "Таинственный остров",

        author: "Жюль Верн",

        category: "Фантастика",

        image: "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=800&q=80",

        description:
            "Захватывающая история людей, оказавшихся на таинственном острове.",

        chapters: [

            {
                title: "Глава 1",

                text: `
                    <p>
                        Текст первой главы.
                    </p>
                `
            }

        ]
    },


    {
        id: 3,

        title: "Алиса в Стране чудес",

        author: "Льюис Кэрролл",

        category: "Фэнтези",

        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",

        description:
            "Необыкновенное путешествие Алисы в удивительный мир.",

        chapters: [

            {
                title: "Глава 1",

                text: `
                    <p>
                        Текст первой главы.
                    </p>
                `
            }

        ]
    },


    {
        id: 4,

        title: "1984",

        author: "Джордж Оруэлл",

        category: "Классика",

        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80",

        description:
            "Классический роман-антиутопия о мире тотального контроля.",

        chapters: [

            {
                title: "Глава 1",

                text: `
                    <p>
                        Текст первой главы.
                    </p>
                `
            }

        ]
    },


    {
        id: 5,

        title: "Вокруг света за 80 дней",

        author: "Жюль Верн",

        category: "Приключения",

        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",

        description:
            "Знаменитое путешествие вокруг света.",

        chapters: [

            {
                title: "Глава 1",

                text: `
                    <p>
                        Текст первой главы.
                    </p>
                `
            }

        ]
    },


    {
        id: 6,

        title: "Хоббит",

        author: "Дж. Р. Р. Толкин",

        category: "Фэнтези",

        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",

        description:
            "Фэнтезийное путешествие Бильбо Бэггинса.",

        chapters: [

            {
                title: "Глава 1",

                text: `
                    <p>
                        Текст первой главы.
                    </p>
                `
            }

        ]
    }

];


// ======================================================
// ЭЛЕМЕНТЫ
// ======================================================

const bookList = document.getElementById("bookList");

const searchInput = document.getElementById("search");

const clearSearch = document.getElementById("clearSearch");

const noResults = document.getElementById("noResults");

const resetSearch = document.getElementById("resetSearch");

const bookCount = document.getElementById("bookCount");

const statBooks = document.getElementById("statBooks");

const filters = document.querySelectorAll(".filter");


// READER

const reader = document.getElementById("reader");

const closeReader = document.getElementById("closeReader");

const readerTitle = document.getElementById("readerTitle");

const readerBookTitle = document.getElementById("readerBookTitle");

const readerAuthor = document.getElementById("readerAuthor");

const readerText = document.getElementById("readerText");


// ======================================================
// СОСТОЯНИЕ
// ======================================================

let currentCategory = "all";


// ======================================================
// ОТРИСОВКА КНИГ
// ======================================================

function renderBooks() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredBooks = books.filter(book => {

        const matchesCategory =
            currentCategory === "all" ||
            book.category === currentCategory;


        const matchesSearch =
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue) ||
            book.category.toLowerCase().includes(searchValue);


        return matchesCategory && matchesSearch;

    });


    bookList.innerHTML = "";


    filteredBooks.forEach(book => {

        const card = document.createElement("article");

        card.className = "book-card";


        card.innerHTML = `

            <div class="book-cover">

                <img
                    src="${book.image}"
                    alt="Обложка книги ${escapeHTML(book.title)}"
                    loading="lazy"
                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='flex';
                    "
                >

                <div class="book-image-fallback">
                    📖
                </div>

                <div class="book-cover-overlay"></div>

                <span>
                    ${escapeHTML(book.category)}
                </span>

            </div>


            <div class="book-info">

                <div class="book-category">
                    ${escapeHTML(book.category)}
                </div>

                <h3>
                    ${escapeHTML(book.title)}
                </h3>

                <div class="author">
                    ${escapeHTML(book.author)}
                </div>

                <div class="book-description">
                    ${escapeHTML(book.description)}
                </div>

                <button
                    class="read-button"
                    data-id="${book.id}"
                >
                    Читать

                    <span>→</span>
                </button>

            </div>

        `;


        bookList.appendChild(card);

    });


    // Счётчик найденных книг

    bookCount.textContent = filteredBooks.length;


    // Нет результатов

    if (filteredBooks.length === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }


    // Кнопка очистки поиска

    clearSearch.style.display =
        searchInput.value.length > 0
            ? "block"
            : "none";


    // Кнопки Читать

    document
        .querySelectorAll(".read-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                openBook(id);

            });

        });

}


// ======================================================
// ОТКРЫТИЕ КНИГИ
// ======================================================

function openBook(id) {

    const book =
        books.find(item => item.id === id);


    if (!book) {
        return;
    }


    readerTitle.textContent =
        book.title;


    readerBookTitle.textContent =
        book.title;


    readerAuthor.textContent =
        book.author;


    readerText.innerHTML = "";


    if (
        !book.chapters ||
        book.chapters.length === 0
    ) {

        readerText.innerHTML = `
            <p>
                Текст этой книги пока не добавлен.
            </p>
        `;

    } else {

        book.chapters.forEach(chapter => {

            const chapterElement =
                document.createElement("section");


            chapterElement.innerHTML = `

                <h2>
                    ${escapeHTML(chapter.title)}
                </h2>

                ${chapter.text}

            `;


            readerText.appendChild(chapterElement);

        });

    }


    reader.classList.add("active");

    document.body.style.overflow = "hidden";


    // Всегда начинаем сверху

    document
        .querySelector(".reader-content")
        .scrollTop = 0;

}


// ======================================================
// ЗАКРЫТИЕ КНИГИ
// ======================================================

function closeBook() {

    reader.classList.remove("active");

    document.body.style.overflow = "";

}


closeReader.addEventListener(
    "click",
    closeBook
);


// ESC закрывает книгу

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            reader.classList.contains("active")
        ) {

            closeBook();

        }

    }
);


// ======================================================
// ПОИСК
// ======================================================

searchInput.addEventListener(
    "input",
    renderBooks
);


// ======================================================
// ОЧИСТКА ПОИСКА
// ======================================================

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        renderBooks();

        searchInput.focus();

    }
);


// ======================================================
// ФИЛЬТРЫ
// ======================================================

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });


            filter.classList.add("active");


            currentCategory =
                filter.dataset.category;


            renderBooks();

        }
    );

});


// ======================================================
// СБРОС
// ======================================================

resetSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        currentCategory = "all";


        filters.forEach(filter => {

            filter.classList.remove("active");

        });


        document
            .querySelector('[data-category="all"]')
            .classList.add("active");


        renderBooks();

    }
);


// ======================================================
// БЕЗОПАСНЫЙ ВЫВОД ТЕКСТА
// ======================================================

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ======================================================
// СТАТИСТИКА
// ======================================================

bookCount.textContent =
    books.length;


statBooks.textContent =
    books.length;


// ======================================================
// ЗАПУСК
// ======================================================

renderBooks();
// ======================================================
// 4 ПОПУЛЯРНЫЕ КНИГИ НА ГЛАВНОЙ
// ======================================================

const popularBooks = document.getElementById("popularBooks");

function renderPopularBooks() {

    popularBooks.innerHTML = "";

    const popular = books.slice(0, 4);

    popular.forEach(book => {

        const card = document.createElement("article");

        card.className = "book-card";

        card.innerHTML = `
            <div class="book-cover">

                <img
                    class="book-image"
                    src="${book.image}"
                    alt="Обложка ${escapeHTML(book.title)}"
                    loading="lazy"
                >

                <div class="book-cover-overlay"></div>

                <span>
                    ${escapeHTML(book.category)}
                </span>

            </div>

            <div class="book-info">

                <div class="book-category">
                    ${escapeHTML(book.category)}
                </div>

                <h3 class="book-title">
                    ${escapeHTML(book.title)}
                </h3>

                <div class="author">
                    ${escapeHTML(book.author)}
                </div>

                <p class="book-description">
                    ${escapeHTML(book.description)}
                </p>

                <button
                    class="read-button"
                    data-id="${book.id}"
                >
                    Читать
                    <span>→</span>
                </button>

            </div>
        `;

        popularBooks.appendChild(card);

        card.querySelector(".read-button")
            .addEventListener("click", () => {
                openBook(book.id);
            });

    });
}

renderPopularBooks(); 