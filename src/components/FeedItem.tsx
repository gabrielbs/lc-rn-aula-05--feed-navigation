import React from 'react'
import styled from 'styled-components/native'
import { position, space, SpaceProps, variant } from 'styled-system'
import LottieView from 'lottie-react-native';

type TFeedItem = {
  imageUrl: string
}
export const FeedItem = ({ imageUrl }: TFeedItem) => {
  const likeAnimation = React.useRef<LottieView>()

  const handleLike = () => {
    likeAnimation?.current?.play(0, 22)
  }

  return (
    <Box width='50%' marginBottom={30} borderWidth={1} borderColor='white'>
      <Box position='absolute' zIndex={1} width='100%' height={150}>
        <LottieView
          ref={likeAnimation}
          loop={false}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../assets/like.json')}
        />
      </Box>
      <StyledImage source={{ uri: imageUrl }} />

      <Box flexDirection='row' justifyContent='space-around' marginTop={10}>
        <CustomButton variant='primary' onPress={() => handleLike()}>
          <ButtonText>Curtir</ButtonText>
        </CustomButton>
        <CustomButton variant='secondary'>
          <ButtonText>Compartilhar</ButtonText>
        </CustomButton>
        <CustomButton variant='icon'>
          <ButtonText>2</ButtonText>
        </CustomButton>
      </Box>
    </Box>
  )
}

const Box = styled.View<SpaceProps>`
  ${space}
  ${position}
`

const CustomButton = styled.TouchableOpacity<SpaceProps>`
  background-color: purple;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  ${space}
  ${variant({
    variants: {
      primary: {
        bg: 'purple',
      },
      secondary: {
        bg: 'green',
      },
      icon: {
        bg: 'purple',
        width: 40,
        height: 40,
      }
    }
  })
}
`

const ButtonText = styled.Text`
  color: white;
`


const StyledImage = styled.Image`
  width: 100%;
  height: 150;
`