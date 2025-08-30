/**
 * Generate deterministic pseudo-random positions for sparkles
 * Uses a simple hash function to ensure same values on server and client
 */
export function getSparklePosition(index: number, seed = 0) {
  // Simple deterministic hash function
  const hash = (index + seed) * 2654435761 % 2147483647;
  const normalized = hash / 2147483647;
  
  return {
    left: ((normalized * 100) % 100),
    top: ((normalized * 73 + index * 11) % 100),
  };
}

/**
 * Generate extra sparkle positions
 */
export function getExtraSparklePosition(index: number) {
  const baseLeft = (index * 12.5 + (index % 3) * 8) % 100;
  const baseTop = (index * 15 + Math.sin(index * 1.2) * 30 + 50) % 100;
  
  return {
    left: baseLeft,
    top: baseTop,
  };
}