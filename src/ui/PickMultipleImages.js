import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple"; // Replace with actual import

export default class PickMultipleImages extends React.Component {
  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
  };

  imagesCallback = (callback) => {
    callback
      .then((photos) => {
        // Assigning all photos selected to an array
        this.Images = photos;
      })
      .catch((e) => console.log(e));
  };

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      headerTitle: count + " selected",
      headerRight: onSubmit,
    });
    console.log("List Of Images" + this.Images);
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  componentDidMount() {
    this._unSubscribe = this.props.navigation.addListener("blur", () => {
      console.log(this.Images);
    });
  }

  UNSAFE_componentWillMount() {
    this._unSubscribe();
  }

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
    const noCameraPermissionComponent = (
      <Text style={styles.emptyStay}>No access to camera</Text>
    );
    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={4}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
          noCameraPermissionComponent={noCameraPermissionComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingTop: 2,
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#ffa45c",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#5d5d5a",
  },
});
