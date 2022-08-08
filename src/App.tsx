import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { typography, TypographyProps } from 'styled-system'
import styled from 'styled-components/native';
import { FeedItem } from './components/FeedItem';
import { Highlight } from './components/Highligh';
import { StoryItem } from './components/StoryItem';

const stories = ['Programação', 'Lorem', 'Ipsum', 'Aulas', 'Javascript']

const CustomText = styled.Text<TypographyProps>`
  ${typography}
`

// https://api.unsplash.com/photos/?client_id=eroauhNFSRgaJ0ywQBDb8UnKJ6_je9AK0A--6WNuPN8

const CLIENT_ID='eroauhNFSRgaJ0ywQBDb8UnKJ6_je9AK0A--6WNuPN8'

type ImageEndpoint = {
  id: string,
  urls: {
    full: string
  }
}

const fetcher = (endpoint = '') => {
  const params = new URLSearchParams({ client_id: CLIENT_ID })
  const request = fetch(`https://api.unsplash.com/${endpoint}/?${params}`)
    .then<ImageEndpoint[]>(res => res.json())
  return request
}

// TODO: Transformar Header em component
// TODO: Transformar o Profile em component
export default function App() {
  const [images, setImages] = React.useState<ImageEndpoint[]>([])

  React.useEffect(() => {
    fetcher('photos').then(setImages)
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
          <View style={styles.profilePic}>
            <Highlight width={100} height={100} />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileStatus}>
              <View style={styles.profileStatusText}>
                <CustomText fontWeight='bold'>114</CustomText>
                <CustomText>publicações</CustomText>
              </View>
              <View style={styles.profileStatusText}>
                <CustomText fontWeight='bold'>43.4K</CustomText>
                <CustomText>seguidores</CustomText>
              </View>
              <View style={styles.profileStatusText}>
                <CustomText fontWeight='bold'>1</CustomText>
                <CustomText>seguindo</CustomText>
              </View>
            </View>
            <Text>Let's Code</Text>
            <Text>Escola de programação</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          style={styles.storyWrapperScrollView}
          contentContainerStyle={styles.storyWrapper}
        >
          {stories.map(story => (
            <StoryItem key={story}>
              <Text>{story}</Text>
            </StoryItem>
          ))}
        </ScrollView>
        <View style={styles.feedWrapper}>
          {images.map(image => {
            return <FeedItem key={image.id} imageUrl={image.urls.full} />
          })}
        </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'center'
  },
  profileStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileStatusText: {
    alignItems: 'center'
  },
  profilePic: {
    width: '30%',
  },
  profileInfo: {
    width: '70%'
  },
  storyWrapperScrollView: {
    flexGrow: 0,
  },
  storyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedWrapper: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
