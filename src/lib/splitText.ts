/**
 * Custom SplitText utility - replaces paid GSAP SplitText plugin.
 * Splits text content into individually-animatable <span> elements
 * for words and/or characters.
 */

export interface SplitResult {
  words: HTMLSpanElement[];
  chars: HTMLSpanElement[];
  revert: () => void;
}

export function splitTextIntoSpans(
  element: HTMLElement,
  options: { type?: "words" | "chars" | "both" } = { type: "both" }
): SplitResult {
  const originalHTML = element.innerHTML;
  const text = element.textContent || "";
  const wordsArray: HTMLSpanElement[] = [];
  const charsArray: HTMLSpanElement[] = [];

  element.innerHTML = "";
  element.style.overflow = "hidden";

  const words = text.split(/\s+/).filter(Boolean);

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "split-word";
    wordSpan.style.display = "inline-block";
    wordSpan.style.overflow = "hidden";

    if (options.type === "chars" || options.type === "both") {
      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "split-char";
        charSpan.style.display = "inline-block";
        charSpan.textContent = char;
        charSpan.style.willChange = "transform, opacity";
        wordSpan.appendChild(charSpan);
        charsArray.push(charSpan);
      });
    } else {
      wordSpan.textContent = word;
    }

    wordsArray.push(wordSpan);
    element.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createTextNode("\u00A0");
      element.appendChild(space);
    }
  });

  return {
    words: wordsArray,
    chars: charsArray,
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}
