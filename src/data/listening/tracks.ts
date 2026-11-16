import { ListeningTrack } from '@/types/listening';
import allTracks from './allListeningTracks.json';

// Comprehensive 80 listening tracks across all levels (A1, A2, B1, B2, C1) with 10 exercises each (800 exercises total)
export const LISTENING_TRACKS: ListeningTrack[] = allTracks as unknown as ListeningTrack[];

export function getListeningTrackById(id: string): ListeningTrack | undefined {
  return LISTENING_TRACKS.find(
    (t) => t.id === id || t.id.replace('-listen', '') === id.replace('-listen', '')
  );
}

export function getListeningTrackByTopicId(topicId: string): ListeningTrack | undefined {
  return LISTENING_TRACKS.find(
    (t) => t.topicId === topicId || t.id.startsWith(topicId)
  );
}

export function getListeningTracksByLevel(level: string): ListeningTrack[] {
  return LISTENING_TRACKS.filter((t) => t.level === level).sort((a, b) => a.order - b.order);
}
