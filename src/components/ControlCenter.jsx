import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";
import { Pressable, StyleSheet, View } from "react-native";

const ControlCenter = () => {
    const playBackState = usePlaybackState()
    console.log('Playback State:', playBackState)
    const [iconName, setIconName] = useState('play-arrow');

    // to update the puase play icon/button
    useEffect(() => {
      const updateIcon = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
          const playbackState = await TrackPlayer.getState();
          setIconName(playbackState === State.Playing ? 'pause' : 'play-arrow');
        }
      };
  
      updateIcon();
    }, [playBackState]);
  
    //Next button
    const skipToNext = async ()=>{
           await TrackPlayer.skipToNext()
    }
    //Previous button
    const skipToPrevious = async ()=>{
           await TrackPlayer.skipToPrevious()
    }

    const togglePlayBack = async () => {
      const currentTrack = await TrackPlayer.getCurrentTrack(); 
      if (currentTrack !== null) {
          const playbackState = await TrackPlayer.getState();
          if (playbackState === State.Paused || playbackState === State.Ready) {
              await TrackPlayer.play();
          } else if (playbackState === State.Playing) {
              await TrackPlayer.pause();
          }
      }
  };
  
  return (
    <View style = {styles.container} >
      <Pressable 
      onPress={skipToPrevious}
      >
        <Icon 
        style = {styles.icon}
        name = 'skip-previous'
        size = {40}
        />
      </Pressable>
      <Pressable 
      onPress={() => togglePlayBack()}
      >
        <Icon style={styles.icon} name={iconName} size={70} />
      </Pressable>
      <Pressable 
      onPress={skipToNext}
      >
        <Icon 
        style = {styles.icon}
         name = 'skip-next'
        size = {40}
        />
      </Pressable>
    </View>
  )
}

export default ControlCenter

const styles = StyleSheet.create({
    container : {
        marginBottom : 56,
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center'
    },
    icon : {
        color : '#ffffff'
    }
})