import React from 'react';
import { FlatStoryIllustration } from './FlatStoryIllustration';

interface InfographicCardVisualProps { chapterId: number; index: number; }

export const InfographicCardVisual: React.FC<InfographicCardVisualProps> = ({ chapterId, index }) => (
  <FlatStoryIllustration chapterId={chapterId} index={index} className="aspect-[3/2] w-full" />
);
