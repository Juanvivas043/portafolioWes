'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * El elemento <video> se monta despues que el hook (el modal devuelve null
   * mientras esta cerrado), asi que guardamos el nodo en estado ademas del ref.
   * Sin esto los listeners se registrarian contra un ref vacio y ni la barra de
   * progreso ni la duracion se actualizarian nunca.
   */
  const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);

  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    setVideoNode(node);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback request failed or was interrupted:', err.message);
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(() => {
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback request failed:', err.message);
          setIsPlaying(false);
        });
    }
  }, []);

  const pause = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, []);

  const seek = useCallback((time: number) => {
    if (!videoRef.current || !Number.isFinite(time)) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const startSeeking = useCallback(() => setIsSeeking(true), []);
  const endSeeking = useCallback(() => setIsSeeking(false), []);

  const changeVolume = useCallback((newVolume: number) => {
    if (!videoRef.current) return;
    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    // Al desmutear con el volumen en cero, devolvemos un nivel audible.
    if (!nextMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = 1;
      setVolume(1);
    }
    setIsMuted(nextMuted);
  }, []);

  const toggleFullscreen = useCallback((containerElement?: HTMLElement | null) => {
    const target = containerElement || videoRef.current;
    if (!target) return;

    if (!document.fullscreenElement) {
      target.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  }, []);

  // Mantiene isFullscreen sincronizado incluso si el usuario sale con Escape.
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const video = videoNode;
    if (!video) return;

    // Estado limpio cada vez que se monta un video distinto.
    setCurrentTime(0);
    setDuration(0);
    setIsReady(false);
    setIsPlaying(false);
    setIsBuffering(false);
    setIsMuted(video.muted);
    setVolume(video.volume);

    const readDuration = () => {
      // Algunos WebM llegan sin duracion en el contenedor (duration = Infinity).
      const value = video.duration;
      setDuration(Number.isFinite(value) && value > 0 ? value : 0);
    };

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleCanPlay = () => {
      setIsReady(true);
      setIsBuffering(false);
      readDuration();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const handleStalled = () => setIsBuffering(true);
    const handleVolumeChange = () => {
      setIsMuted(video.muted);
      setVolume(video.volume);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', readDuration);
    video.addEventListener('durationchange', readDuration);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('volumechange', handleVolumeChange);

    // El video pudo cargar metadatos antes de que se registraran los listeners.
    if (video.readyState >= 1) readDuration();
    if (video.readyState >= 3) setIsReady(true);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', readDuration);
      video.removeEventListener('durationchange', readDuration);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoNode]);

  return {
    videoRef,
    attachVideo,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isBuffering,
    isReady,
    isFullscreen,
    isSeeking,
    togglePlay,
    play,
    pause,
    seek,
    startSeeking,
    endSeeking,
    changeVolume,
    toggleMute,
    toggleFullscreen,
  };
}
