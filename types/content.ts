export type AssetType = 'video' | 'audio' | 'document' | 'image' | 'prompt_script' | 'ar_model';

export interface ContentAsset {
  id: string;
  type: AssetType;
  url?: string;
  metadata?: Record<string, any>;
}

export type MomentType = 'spark_prompt' | 'media_play' | 'micro_observation' | 'interactive_game';

export interface Moment {
  id: string;
  type: MomentType;
  cueText?: string;
  assets: ContentAsset[];
}

export type SceneType = 'opening' | 'animation' | 'song' | 'activity' | 'observation' | 'closing';

export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  type: SceneType;
  moments: Moment[];
}

export interface Episode {
  id: string;
  episodeNumber: string;
  title: string;
  estimatedDurationMinutes: number;
  universe: {
    id: string;
    name: string;
    mission: string;
  };
  story: {
    id: string;
    title: string;
  };
  scenes: Scene[];
}