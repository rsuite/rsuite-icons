const containers: HTMLElement[] = []; // Store container HTMLElement references
const styleElements: Array<{ prepend?: HTMLElement; append?: HTMLElement }> = []; // Store {prepend: HTMLElement, append: HTMLElement}

// Function to create a <style> element with an optional nonce value
function createStyleElement(nonce?: string): HTMLStyleElement {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('data-insert-css', 'rsuite-icons'); // Mark the element as inserted by insertCss

  // If a nonce is provided, set it on the style element
  if (nonce) {
    styleElement.setAttribute('nonce', nonce);
  }

  return styleElement;
}

// Interface for the options object passed to insertCss
interface InsertCssOptions {
  container?: HTMLElement; // Optional container where the <style> element should be inserted
  prepend?: boolean; // Optional flag to prepend or append the <style> element
  nonce?: string; // Optional CSP nonce value for the <style> element
}

// Function to insert CSS into the document
export function insertCss(css: string, options: InsertCssOptions = {}): HTMLStyleElement {
  // Determine if the style should be prepended or appended
  const position = options.prepend === true ? 'prepend' : 'append';
  // Use the provided container or default to the document head
  const container = options.container || document.querySelector('head');

  if (!container) {
    throw new Error('No container found to insert CSS.');
  }

  // Find the index of the container in the containers array
  let containerId = containers.indexOf(container);

  // If it's the first time encountering this container, initialize it
  if (containerId === -1) {
    containerId = containers.push(container) - 1;
    styleElements[containerId] = {};
  }

  // Try to retrieve the existing style element, or create a new one
  let styleElement: HTMLStyleElement;

  if (styleElements[containerId][position]) {
    styleElement = styleElements[containerId][position] as HTMLStyleElement;
  } else {
    // Create a new style element with an optional nonce
    styleElement = createStyleElement(options.nonce);
    styleElements[containerId][position] = styleElement;

    if (position === 'prepend') {
      container.insertBefore(styleElement, container.firstChild);
    } else {
      container.appendChild(styleElement);
    }
  }

  // Remove potential UTF-8 BOM if css was read from a file
  if (css.charCodeAt(0) === 0xfeff) {
    css = css.slice(1);
  }

  // Insert the CSS into the <style> element
  if ((styleElement as any).styleSheet) {
    (styleElement as any).styleSheet.cssText += css; // IE-specific
  } else {
    styleElement.textContent += css; // Standard approach
  }

  return styleElement;
}
