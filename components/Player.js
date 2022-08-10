import React, { Component, useState } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import screenfull from "screenfull";

import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";
import Duration from "./Duration";

class App extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    info: false,
  };

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handleToggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url)
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (e) => {
    this.setState({ playbackRate: e.target.value });
  };

  handleOnPlaybackRateChange = (speed) => {
    this.setState({ playbackRate: parseFloat(speed) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    console.log("onEnablePIP");
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    console.log("onDisablePIP");
    this.setState({ pip: false });
  };

  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleToogleInfo = () => {
    this.setState({ info: !this.state.info });
  };

  handleEnded = () => {
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const { url } = this.props;
    const {
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
      info,
    } = this.state;
    const SEPARATOR = " · ";

    function cn(...classes) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <div>
        <ReactPlayer
          ref={this.ref}
          className="rounded-lg min-h-full"
          width="100%"
          height="100%"
          url={url}
          pip={pip}
          playing={playing}
          controls={controls}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={() => console.log("onReady")}
          onStart={() => console.log("onStart")}
          onPlay={this.handlePlay}
          onEnablePIP={this.handleEnablePIP}
          onDisablePIP={this.handleDisablePIP}
          onPause={this.handlePause}
          onBuffer={() => console.log("onBuffer")}
          onPlaybackRateChange={this.handleOnPlaybackRateChange}
          onSeek={(e) => console.log("onSeek", e)}
          onEnded={this.handleEnded}
          onError={(e) => console.log("onError", e)}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
        />
        {info === true ? (
          <div className="text-xs sm:text-sm dark:text-zinc-200 text-zinc-800 absolute rounded-br-lg top-[4.5rem] sm:top-[6.75rem] px-6 sm:px-12 py-4 sm:py-16 leading-relaxed bg-white/30 dark:bg-black/30 backdrop-blur-lg w-2/3 sm:w-1/3">
            <p>Video Information:</p>
            <p className="overflow-hidden flex flex-row flex-nowrap select-all">
              {url}
            </p>
            <p className="overflow-hidden flex flex-row flex-nowrap">
              loaded: {loaded}
            </p>
            <p className="overflow-hidden flex flex-row flex-nowrap">
              played: {played}
            </p>
            <p className="overflow-hidden flex flex-row flex-nowrap after:content-['x']">
              speed: {playbackRate}
            </p>
            <p>info: {info}</p>
            <p className="">loop: {loop ? <>true</> : <>false</>}</p>
            <button onClick={this.handleToogleInfo}>
              [x] close this video's detail page
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="resize flex flex-col space-y-2 z-30 top-[16rem] sm:top-[30rem] w-3/4 sm:w-1/3 left-4 right-4 sm:left-36 sm:right-36 mx-auto backdrop-blur-lg absolute px-4  py-2 rounded-lg bg-white/30 dark:bg-black/30">
          <div className="z-40 mx-auto flex flex-row justify-between space-x-4 sm:space-x-6">
            <div className="flex flex-row space-x-2">
              <button onClick={this.handleToggleMuted}>
                {muted ? (
                  <>
                    <Icon
                      className="w-4 h-4 sm:w-6 sm:h-6"
                      icon="foundation:volume-strike"
                    />
                  </>
                ) : (
                  <>
                    <Icon
                      icon="foundation:volume"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={this.handleVolumeChange}
                className="w-12 sm:w-16 mt-2.5 sm:mt-3.5"
              />
            </div>
            <div className="opacity-75 flex flex-row space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <button className="hidden sm:block" onClick={this.handleSetPlaybackRate} value={0.75}>
                0.75x
              </button>
              <button onClick={this.handleSetPlaybackRate} value={1}>
                1x
              </button>
              <button onClick={this.handlePlayPause}>
                {playing ? (
                  <>
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="clarity:pause-solid"
                    />
                  </>
                ) : (
                  <>
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="clarity:play-solid"
                    />
                  </>
                )}
              </button>
              <button className="hidden sm:block" onClick={this.handleSetPlaybackRate} value={1.5}>
                1.5x
              </button>
              <button onClick={this.handleSetPlaybackRate} value={2}>
                2x
              </button>
            </div>
            <div className="flex flex-row space-x-3">
              <button onClick={this.handleClickFullscreen}>
                <Icon
                  className="w-4 h-4 sm:w-6 sm:h-6 mt-0"
                  icon="mdi-light:fullscreen"
                />
              </button>
              <button onClick={this.handleToogleInfo}>
                <Icon
                  className="w-4 h-4 sm:w-6 sm:h-6 mt-0"
                  icon="mdi-light:information"
                />
              </button>
              {pip === false ? (
                <button onClick={this.handleEnablePIP}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 mt-0" icon="bi:pip" />
                </button>
              ) : (
                <button onClick={this.handleDisablePIP}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 mt-0" icon="bi:pip" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full flex flex-row space-x-4 mx-auto max-w-md center justify-between">
            <div className="mt-[0.15rem]">
              <Duration seconds={duration * played} />
            </div>
            <div className="w-3/4">
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={this.handleSeekMouseDown}
                onChange={this.handleSeekChange}
                onMouseUp={this.handleSeekMouseUp}
                className="-mt-2 w-full"
              />
            </div>
            <div className="mt-[0.15rem]">
              -<Duration seconds={duration * (1 - played)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
