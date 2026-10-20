/**
 * SADP Pattern: Value Object (DDD)
 * Immutable surface type representation with business validation
 */

export type PitchSurface = "ARTIFICIAL_TURF" | "RUBBER_INDOOR" | "PARQUET_WOOD" | "HYBRID";

export type PitchSize = "5_A_SIDE" | "7_A_SIDE";

export interface PitchFeatures {
  isIndoor: boolean;
  hasFloodlights: boolean;
  hasAirConditioning: boolean;
  hasScoreboard: boolean;
  hasLiveStreaming: boolean;
}
