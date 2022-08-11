import React, { Component, useState } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import screenfull from "screenfull";

import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";
import Duration from "./Duration";
import { useTheme } from "next-themes";

class App extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    info: false,
    full: false,
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

  handleToogleScreen = () => {
    this.setState({ full: !this.state.full});
    console.log(this.state.full)
  };

  ref = (player) => {
    this.player = player;
  };

  componentDidMount() {
    this.showSaveCover();
  }

  showSaveCover() {
    this.setState({
      isWarning: true,
    });
    this.hideSaveCover();
  }

  hideSaveCover() {
    var self = this;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      self.setState({
        isWarning: false,
      });
    }, 8888);
  }

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
      full,
    } = this.state;
    const SEPARATOR = " · ";

    function cn(...classes) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <div>
        <div className={cn("mx-auto mt-8 transition-all duration-500", full === false ? "max-w-2xl sm:max-w-[40%] mx-auto" : "mobile min-h-full min-w-screen sm:min-w-auto bottom-0 sm:left-0 right-0 fixed scale-50")}>
          {played === 0 && loaded < 1 && (
            <>
              <div className="mt-4 sm:mt-8 animate-pulse w-full h-64 sm:h-[480px] bg-zinc-50 dark:bg-neutral-900/50 rounded-lg">
                <div class="animate-pulse"></div>
              </div>
              <div
                className={cn(
                  "transition-all duration-500 flex flex-col space-y-2 z-30 top-[15rem] sm:top-[28.5rem] w-3/4 sm:w-1/3 left-4 right-4 sm:left-36 sm:right-36 mx-auto backdrop-blur-lg absolute px-4  py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900/50"
                )}
              >
                <div className="z-40 mx-auto flex flex-row justify-between space-x-4 sm:space-x-6">
                  <div className="animate-pulse w-1/4">
                    <div className="w-full px-6 sm:px-12 py-3 sm:py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="animate-pulse w-1/2 opacity-75 flex flex-row space-x-2 sm:space-x-4 text-xs sm:text-sm">
                    <div className="w-full px-12 sm:px-24 py-3 sm:py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="animate-pulse w-1/4">
                    <div className="w-full px-6 sm:px-12 py-3 sm:py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                </div>
                <div className="w-full flex flex-row space-x-4 mx-auto max-w-md center justify-between">
                  <div className="animate-pulse mt-[0.15rem]">
                    <div className="w-full px-4 sm:px-8 py-3 sm:py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="animate-pulse w-3/4">
                    <div className="w-full px-18 sm:px-36 py-3 sm:py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="animate-pulse mt-[0.15rem]">
                    <div className="w-full px-4 sm:px-8 py-3 sm:py-4 rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            onTouchEnd={() => this.showSaveCover()}
            onMouseEnter={() => this.showSaveCover()}
            className={cn(
              "animate__animated animate__fadeIn",
              played === 0 && loaded < 1 ? "hidden" : "block"
            )}
          >
            <ReactPlayer
              ref={this.ref}
              className="rounded-lg min-h-full mt-4 sm:mt-8 video react-player"
              style={{ "border-radius": "0.5rem" }}
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
          </div>
          {info === true ? (
            <div className="text-xs sm:text-sm dark:text-zinc-200 text-zinc-800 absolute rounded-br-lg z-50 top-[5.75rem] sm:top-[7.5rem] px-4 sm:px-12 py-3 sm:py-16 leading-relaxed bg-white/30 dark:bg-black/30 backdrop-blur-lg w-2/3 sm:w-1/3">
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
              <p>
                fullscreen: {full ? <>true</> : <>false</>}
              </p>
              <p>
                info: {info ? <>true</> : <>false</>}
              </p>
              <p className="">loop: {loop ? <>true</> : <>false</>}</p>
              <button onClick={this.handleToogleInfo}>
                [x] close this video's detail page
              </button>
            </div>
          ) : (
            <></>
          )}

          <div
            className={cn(
              "animate__animated animate__fadeInUp transition-all duration-500 flex flex-col space-y-1.5 z-30  backdrop-blur-lg absolute px-4 mx-auto left-0 right-0 sm:left-36 sm:right-36 center py-2 rounded-lg bg-white/30 dark:bg-black/30",
              !!this.state.isWarning ? "w-3/4 sm:w-[36%]  block" : "animate__fadeOutDown top-[16rem] sm:top-[30rem]",
              played === 0 && loaded < 1 ? "hidden" : "w-3/4 sm:w-[36%]  block top-[16rem] sm:top-[30rem]",
              full === false ? 'w-3/4 sm:w-[36%] top-[16rem] sm:top-[30rem]' : 'mobile sm:top-[60rem]'
            )}
          >
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
                {playbackRate === 0.5 && (
                  <button>
                    <Icon
                      className="opacity-50 font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:rewind-fill"
                    />
                  </button>
                )}
                {playbackRate === 0.75 && (
                  <button onClick={this.handleSetPlaybackRate} value="0.5">
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:rewind-fill"
                    />
                  </button>
                )}
                {playbackRate === 1 && (
                  <button onClick={this.handleSetPlaybackRate} value="0.75">
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:rewind-fill"
                    />
                  </button>
                )}
                {playbackRate === 1.5 && (
                  <button onClick={this.handleSetPlaybackRate} value="1">
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:rewind-fill"
                    />
                  </button>
                )}
                {playbackRate === 2 && (
                  <button onClick={this.handleSetPlaybackRate} value="1.5">
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:rewind-fill"
                    />
                  </button>
                )}
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
                {playbackRate === 0.5 && (
                  <button onClick={this.handleSetPlaybackRate} value={0.75}>
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:fast-forward-fill"
                    />
                  </button>
                )}
                {playbackRate === 0.75 && (
                  <button onClick={this.handleSetPlaybackRate} value={1}>
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:fast-forward-fill"
                    />
                  </button>
                )}
                {playbackRate === 1 && (
                  <button onClick={this.handleSetPlaybackRate} value={1.5}>
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:fast-forward-fill"
                    />
                  </button>
                )}
                {playbackRate === 1.5 && (
                  <button onClick={this.handleSetPlaybackRate} value={2}>
                    <Icon
                      className="font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:fast-forward-fill"
                    />
                  </button>
                )}
                {playbackRate === 2 && (
                  <button>
                    <Icon
                      className="opacity-50 font-bold w-6 h-6 sm:w-8 sm:h-8"
                      icon="bi:fast-forward-fill"
                    />
                  </button>
                )}
              </div>
              <div className="flex flex-row space-x-1.5 sm:space-x-3">
                <button onClick={this.handleToogleScreen}>
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
                    <Icon
                      className="w-4 h-4 sm:w-6 sm:h-6 mt-0"
                      icon="bi:pip"
                    />
                  </button>
                ) : (
                  <button onClick={this.handleDisablePIP}>
                    <Icon
                      className="w-4 h-4 sm:w-6 sm:h-6 mt-0"
                      icon="bi:pip"
                    />
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
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={this.handleSeekMouseDown}
                  onChange={this.handleSeekChange}
                  onMouseUp={this.handleSeekMouseUp}
                  onTouchMove={this.handleSeekChange}
                  onTouchStart={this.handleSeekMouseDown}
                  onTouchEnd={this.handleSeekMouseUp}
                  className="-mt-2 mb-1.5 sm:mb-3 w-full"
                />
              </div>
              <div className="mt-[0.15rem]">
                -<Duration seconds={duration * (1 - played)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
