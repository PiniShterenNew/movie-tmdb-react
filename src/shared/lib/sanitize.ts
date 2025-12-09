/**
 * Sanitizes user input to prevent XSS and injection attacks
 * @param input - The input string to sanitize
 * @returns Sanitized string safe for use in queries and URLs
 */
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .trim()
        // Remove HTML tags and script injection attempts
        .replace(/[<>]/g, "")
        // Remove backticks (potential template literal injection)
        .replace(/[`]/g, "")
        // Remove potentially dangerous characters for URL/query injection
        .replace(/[\\/]/g, "")
        // Normalize whitespace (multiple spaces to single)
        .replace(/\s+/g, " ")
        // Limit length to prevent DoS
        .slice(0, 100);
}
  