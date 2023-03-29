export function getRemainingTracks (tracks, playhead) {
  // filter tracks that already ended
  return tracks.filter(track => {
    return (track.timelineStartAt + track.duration) > playhead
  })
}

export function getTrackInitAndOffset(track, playheadOffset) {
    // Examples:
    // playheadOffset: 60
    // timelineStartAt: 11
    // duration: 95
    // const trackOffset = 60 - 11   => 49
    // const trackInit = 11 - 60 => -49

    // playheadOffset: 60
    // timelineStartAt: 106
    // duration: 136
    // const trackOffset = 60 - 106; = -46
    // trackInit: timelineStartAt - playheadOffset = 46

    const trackOffset = playheadOffset - track.timelineStartAt;
    const trackInit = (track.timelineStartAt - playheadOffset);
    return {
      start: trackInit < 0 ? 0 : trackInit,
      offset: trackOffset > 0 ? trackOffset : 0,
    }
}