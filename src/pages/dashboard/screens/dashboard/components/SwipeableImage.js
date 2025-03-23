// Import necessary React and React Native modules
import {useState, useEffect} from 'react';
import {StyleSheet, useWindowDimensions, Image, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

// Define a SwipeableImage component that accepts an array of image URLs through props
const SwipeableImage = ({images}) => {
  const [dimensions, setDimensions] = useState({window, screen});
  const [imageSlides, setImageSlides] = useState(images);
  const [like, setLike] = useState(null);
  const [pass, setPass] = useState(null);
  console.log(dimensions.screen.width, dimensions.screen.height);

  // State to track the current index of the image being displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shared value to animate the swipe gesture (movement of images)
  const position = useSharedValue(0);
  // Dimensions of the device window to handle responsive styling
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // Function to handle what happens after a swipe is complete
  const onSwipeComplete = (currentIndex, setCurrentIndex) => {
    if (position.value === -dimensions.screen.width) {
      console.log('position: ', position.value, 'currentIndex: ', currentIndex);

      setPass('PASS');
      console.log('YOU PASS');
      // handle userpassed
    } else {
      console.log('position: ', position.value, 'currentIndex: ', currentIndex);

      setLike('LIKE');
      console.log('YOU LIKE');
      // handle userliked
    }

    // Increment the current image index to show the next image
    setCurrentIndex(currentIndex + 1);

    // Reset the swipe position after a delay to ensure a smooth transition
    setTimeout(() => {
      position.value = withTiming(0, {duration: 0});
    }, 500); // 500 milliseconds delay for resetting position
  };

  // Gesture handler for swipe actions
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      position.value = e.translationX; // Update the position based on the gesture movement
    })
    .onEnd(e => {
      // Determine if the swipe distance is enough to consider it a swipe (100px threshold)
      if (Math.abs(e.translationX) > 100) {
        // Animate the image out of view and then run the swipe complete function
        position.value = withTiming(
          e.translationX > 0 ? windowWidth : -windowWidth,
          {duration: 300},
          () => {
            runOnJS(onSwipeComplete)(currentIndex, setCurrentIndex);
          },
        );
      } else {
        // If the swipe wasn't far enough, return the image to the center
        position.value = withTiming(0, {duration: 300});
      }
    });

  // Animated styles for moving the image based on the current position
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  // Component render
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.imageContainer,
          {width: windowWidth, height: windowHeight},
        ]}>
        {imageSlides
          .slice(currentIndex, currentIndex + 2)
          .map((image, index) => (
            <Animated.View
              key={currentIndex + index}
              style={[
                styles.imageWrapper,
                {
                  zIndex: index === 0 ? 1 : 0, // Keep the current image on top
                  width: windowWidth,
                  height: windowHeight,
                },
                index === 0 ? animatedStyle : {}, // Apply the animation only to the top-most image
              ]}>
              <Image
                source={{uri: image}}
                style={{
                  borderColor: '#FFFFFF',
                  borderWidth: 7,
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 40,
                  height: dimensions.screen.height / 1.7,
                  // resizeMode: 'cover',
                  // shadowColor: '#000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 4,
                  // elevation: 5,
                }}
              />
            </Animated.View>
          ))}
      </Animated.View>
    </GestureDetector>
  );
};

// Export the SwipeableImage component for use in other parts of the app
export default SwipeableImage;

// Styling for the component
const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Prevents image overflow outside the container
  },
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the space without being stretched
  },
});
