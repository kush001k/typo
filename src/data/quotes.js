export const quotes = {
  easy: [
    "The game is afoot.",
    "Elementary my dear Watson.",
    "I see nothing in what is past.",
    "Data! Data! Data!",
    "Crime is common. Logic is rare.",
    "When you have eliminated the impossible.",
    "The truth is rarely pure and simple.",
    "Nothing is more deceptive than an obvious fact.",
    "I never make exceptions.",
    "What one man can invent another can discover.",
  ],
  medium: [
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "There is nothing more deceptive than an obvious fact.",
    "I never make exceptions. An exception disproves the rule.",
    "What one man can invent another can discover.",
    "Nothing clears up a case so much as stating it to another person.",
    "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
    "Mediocrity knows nothing higher than itself; but talent instantly recognizes genius.",
    "The little things are infinitely the most important.",
    "It is a capital mistake to theorize before one has data.",
  ],
  hard: [
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions, it invariably proves to be capable of bearing some other interpretation. I made a blunder, my dear Watson, which I am afraid is inexcusable.",
    "There is an art in poring over a busy man's desk; and it consists in this — never to look at anything, save one specific object which you have in your mind, and which is the very thing for which you have come.",
    "The chief difficulty at present lies in the fact that everything must be done without that much-desired quality of certainty, which is attainable only in the laboratory.",
    "It has long been an axiom of mine that the little things are infinitely the most important. And yet I cannot help feeling that your method of investigation is somewhat wanting in system.",
    "Life is infinitely stranger than anything which the mind of man could invent. We would not dare to conceive the things which are really mere commonplaces of existence.",
    "My mind rebels at stagnation. Give me problems, give me work, give me the most abstruse cryptogram or the most intricate analysis, and I am in my own proper atmosphere.",
    "You know my method. It is founded upon the observation of trifles. When I find a man who keeps his cigars in the coal-scuttle, his tobacco in the toe of a Persian slipper, and his unanswered correspondence transfixed by a Japanese dagger, one can draw one's deductions.",
    "The irregularity of a professional man is more conspicuous than that of a private citizen. And yet you are not satisfied by a mere glance at the shoes and the lace ends which have been worn so long.",
    "It is a mistake to confound strangeness with mystery. The most commonplace crime is often the most mysterious because it presents no new or special features from which deductions may be drawn.",
    "I am a brain, Watson. The rest of me is a mere appendix. Therefore it is the brain that must be consulted, and it is a very extraordinary brain.",
  ],
};

export const difficultyConfig = {
  easy: { label: "EASY", maxWords: 8, hasPunctuation: false },
  medium: { label: "MEDIUM", maxWords: 15, hasPunctuation: true },
  hard: { label: "HARD", maxWords: Infinity, hasPunctuation: true },
};

export const streakThreshold = { up: 3, down: 2 };

export const wpmThresholds = {
  good: { minWpm: 30, minAccuracy: 90 },
};