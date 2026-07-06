const quotes = [
    "Success comes from consistency.",
    "Never stop learning.",
    "Every expert was once a beginner.",
    "Dream big and work hard.",
    "Small progress is still progress."
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    console.log(quotes[randomIndex]);
}

showRandomQuote();